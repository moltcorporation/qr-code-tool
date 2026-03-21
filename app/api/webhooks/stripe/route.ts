import { db } from "@/db";
import { stripePaymentEvents, users } from "@/db/schema";
import { trackServerEvent } from "@/lib/track";
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });
}

// Webhook handler for Stripe payment events
export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  const stripe = getStripe();

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Track only payment-related events
  const trackedEventTypes = [
    "payment_intent.created",
    "payment_intent.succeeded",
    "payment_intent.failed",
    "payment_intent.canceled",
    "charge.succeeded",
    "charge.failed",
  ];

  if (!trackedEventTypes.includes(event.type)) {
    return NextResponse.json({ received: true });
  }

  try {
    let paymentIntentId: string | null = null;
    let email: string | null = null;
    let amount: string | null = null;
    let currency: string | null = null;
    let status: string | null = null;

    // Extract relevant data based on event type
    const eventType = event.type as string;
    if (
      eventType === "payment_intent.created" ||
      eventType === "payment_intent.succeeded" ||
      eventType === "payment_intent.failed" ||
      eventType === "payment_intent.canceled"
    ) {
      const pi = event.data.object as Stripe.PaymentIntent;
      paymentIntentId = pi.id;
      email = pi.receipt_email || pi.customer?.toString() || null;
      amount = pi.amount.toString();
      currency = pi.currency;
      status = pi.status;
    } else if (
      eventType === "charge.succeeded" ||
      eventType === "charge.failed"
    ) {
      const charge = event.data.object as Stripe.Charge;
      paymentIntentId = charge.payment_intent?.toString() || null;
      email = charge.receipt_email || null;
      amount = charge.amount.toString();
      currency = charge.currency;
      status = charge.status;
    }

    // Log the event to the database
    await db.insert(stripePaymentEvents).values({
      stripeEventId: event.id,
      eventType: event.type,
      paymentIntentId,
      email,
      amount,
      currency,
      status,
      rawPayload: JSON.stringify(event.data.object),
    });

    // Track purchase conversion event on successful payment
    if (event.type === "payment_intent.succeeded" && email) {
      const [user] = await db
        .select({ id: users.id, utmSource: users.utmSource, utmMedium: users.utmMedium, utmCampaign: users.utmCampaign })
        .from(users)
        .where(eq(users.email, email.toLowerCase()))
        .limit(1);

      if (user) {
        await trackServerEvent(user.id, "purchase", {
          utmSource: user.utmSource,
          utmMedium: user.utmMedium,
          utmCampaign: user.utmCampaign,
        }, { amount: amount || "0", currency: currency || "usd" });
      }
    }

    console.log(`Logged Stripe event: ${event.type} (${event.id})`);
  } catch (err) {
    console.error("Error processing webhook:", err);
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
