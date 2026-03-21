import { db } from "@/db";
import { stripePaymentEvents } from "@/db/schema";
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

// Webhook handler for Stripe payment events
export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

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
    if (
      event.type === "payment_intent.created" ||
      event.type === "payment_intent.succeeded" ||
      event.type === "payment_intent.failed" ||
      event.type === "payment_intent.canceled"
    ) {
      const pi = event.data.object as Stripe.PaymentIntent;
      paymentIntentId = pi.id;
      email = pi.receipt_email || pi.customer?.toString() || null;
      amount = pi.amount.toString();
      currency = pi.currency;
      status = pi.status;
    } else if (
      event.type === "charge.succeeded" ||
      event.type === "charge.failed"
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
