// Reporting dashboard endpoint for Day 1-2 metrics
// Returns aggregated funnel and conversion data for Aurora's go/no-go decision

import { NextResponse } from "next/server";
import { db } from "@/db";
import { trackingEvents, stripePaymentEvents } from "@/db/schema";
import { sql, count, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Funnel: signup -> checkout -> purchase
    const signupCount = await db
      .select({ count: count() })
      .from(trackingEvents)
      .where(eq(trackingEvents.event, "signup"));

    const checkoutCount = await db
      .select({ count: count() })
      .from(trackingEvents)
      .where(eq(trackingEvents.event, "checkout_initiated"));

    const purchaseCount = await db
      .select({ count: count() })
      .from(trackingEvents)
      .where(eq(trackingEvents.event, "purchase"));

    const paymentCount = await db
      .select({ count: count() })
      .from(stripePaymentEvents)
      .where(eq(stripePaymentEvents.eventType, "payment_intent.succeeded"));

    // Channel breakdown
    const channelData = await db
      .select({
        utmSource: trackingEvents.utmSource,
        utmMedium: trackingEvents.utmMedium,
        utmCampaign: trackingEvents.utmCampaign,
        signups: sql<number>`count(case when ${trackingEvents.event} = 'signup' then 1 end)`,
        checkouts: sql<number>`count(case when ${trackingEvents.event} = 'checkout_initiated' then 1 end)`,
        purchases: sql<number>`count(case when ${trackingEvents.event} = 'purchase' then 1 end)`,
      })
      .from(trackingEvents)
      .groupBy(
        trackingEvents.utmSource,
        trackingEvents.utmMedium,
        trackingEvents.utmCampaign
      );

    const totalSignups = signupCount[0]?.count || 0;
    const totalCheckouts = checkoutCount[0]?.count || 0;
    const totalPurchases = purchaseCount[0]?.count || 0;
    const totalPayments = paymentCount[0]?.count || 0;

    const dashboard = {
      timestamp: new Date().toISOString(),
      funnel: {
        signups: totalSignups,
        checkouts: totalCheckouts,
        purchases: totalPurchases,
        confirmed_payments: totalPayments,
      },
      conversion_rates: {
        signup_to_checkout: totalSignups > 0
          ? ((totalCheckouts / totalSignups) * 100).toFixed(2) + "%"
          : "0%",
        checkout_to_purchase: totalCheckouts > 0
          ? ((totalPurchases / totalCheckouts) * 100).toFixed(2) + "%"
          : "0%",
        signup_to_purchase: totalSignups > 0
          ? ((totalPurchases / totalSignups) * 100).toFixed(2) + "%"
          : "0%",
      },
      by_channel: channelData.map(row => ({
        channel: [
          row.utmSource || "direct",
          row.utmMedium || "organic",
          row.utmCampaign || "launch"
        ].filter(x => x !== "none").join(" / "),
        signups: row.signups,
        checkouts: row.checkouts,
        purchases: row.purchases,
      })).sort((a, b) => b.signups - a.signups),
    };

    return NextResponse.json(dashboard);
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data", details: String(error) },
      { status: 500 }
    );
  }
}
