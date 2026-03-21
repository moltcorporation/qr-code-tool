import { db } from "@/db";
import { stripePaymentEvents } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get event counts by type
    const eventsByType = await db
      .select({
        eventType: stripePaymentEvents.eventType,
        count: sql<number>`count(*)`,
      })
      .from(stripePaymentEvents)
      .groupBy(stripePaymentEvents.eventType);

    // Get success rate (payment_intent.succeeded / payment_intent.created)
    const totalCreated = await db
      .select({ count: sql<number>`count(*)` })
      .from(stripePaymentEvents)
      .where(sql`${stripePaymentEvents.eventType} = 'payment_intent.created'`);

    const totalSucceeded = await db
      .select({ count: sql<number>`count(*)` })
      .from(stripePaymentEvents)
      .where(sql`${stripePaymentEvents.eventType} = 'payment_intent.succeeded'`);

    const totalFailed = await db
      .select({ count: sql<number>`count(*)` })
      .from(stripePaymentEvents)
      .where(sql`${stripePaymentEvents.eventType} = 'payment_intent.failed'`);

    // Get hourly breakdown for Week 1 baseline
    const hourlyEvents = await db
      .select({
        hour: sql<string>`date_trunc('hour', ${stripePaymentEvents.processedAt})`,
        eventType: stripePaymentEvents.eventType,
        count: sql<number>`count(*)`,
      })
      .from(stripePaymentEvents)
      .groupBy(
        sql`date_trunc('hour', ${stripePaymentEvents.processedAt})`,
        stripePaymentEvents.eventType
      )
      .orderBy(
        sql`date_trunc('hour', ${stripePaymentEvents.processedAt})`,
        stripePaymentEvents.eventType
      );

    // Get total revenue (sum of successful payments)
    const totalRevenue = await db
      .select({
        totalAmount: sql<string>`sum(${stripePaymentEvents.amount})`,
        currency: stripePaymentEvents.currency,
      })
      .from(stripePaymentEvents)
      .where(sql`${stripePaymentEvents.eventType} = 'payment_intent.succeeded'`);

    // Get unique customers who succeeded
    const uniqueCustomers = await db
      .select({ count: sql<number>`count(distinct ${stripePaymentEvents.email})` })
      .from(stripePaymentEvents)
      .where(sql`${stripePaymentEvents.eventType} = 'payment_intent.succeeded'`);

    const createdCount = totalCreated[0]?.count || 0;
    const succeededCount = totalSucceeded[0]?.count || 0;
    const failedCount = totalFailed[0]?.count || 0;
    const successRate = createdCount > 0
      ? ((succeededCount / createdCount) * 100).toFixed(2)
      : 0;

    return NextResponse.json({
      summary: {
        totalEventsCreated: createdCount,
        totalEventsSucceeded: succeededCount,
        totalEventsFailed: failedCount,
        successRate: `${successRate}%`,
        uniqueCustomersConverted: uniqueCustomers[0]?.count || 0,
        totalRevenue: totalRevenue[0]?.totalAmount
          ? `${totalRevenue[0].currency?.toUpperCase()} ${(parseInt(totalRevenue[0].totalAmount) / 100).toFixed(2)}`
          : "No data",
      },
      eventsByType: eventsByType.map(({ eventType, count }) => ({
        type: eventType,
        count,
      })),
      hourlyBreakdown: hourlyEvents.map(({ hour, eventType, count }) => ({
        hour,
        type: eventType,
        count,
      })),
      exportedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching payment metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
