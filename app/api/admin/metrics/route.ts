import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, qrCodes, qrEvents, stripePaymentEvents, onboardingEmails, dripSchedule } from "@/db/schema";
import { sql, count, countDistinct } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Total signups
    const [totalSignups] = await db
      .select({ total: count() })
      .from(users);

    // Signups today
    const [signupsToday] = await db
      .select({ total: count() })
      .from(users)
      .where(sql`${users.createdAt} >= current_date`);

    // Signups by source
    const bySource = await db
      .select({
        source: sql<string>`coalesce(${users.utmSource}, 'direct')`,
        total: count(),
      })
      .from(users)
      .groupBy(sql`coalesce(${users.utmSource}, 'direct')`);

    // Total paid users (plan != 'free')
    const [payments] = await db
      .select({ total: count() })
      .from(users)
      .where(sql`${users.plan} != 'free'`);

    // Activated users = users who created at least 1 QR code
    const [activated] = await db
      .select({ total: countDistinct(qrCodes.userId) })
      .from(qrCodes)
      .where(sql`${qrCodes.userId} is not null`);

    const activatedCount = activated.total;
    const activationRate =
      totalSignups.total > 0
        ? Math.round((activatedCount / totalSignups.total) * 1000) / 10
        : 0;

    // Free QR generation events
    const [totalGenerated] = await db
      .select({ total: count() })
      .from(qrEvents)
      .where(sql`${qrEvents.event} = 'qr_generated'`);

    const [generatedToday] = await db
      .select({ total: count() })
      .from(qrEvents)
      .where(sql`${qrEvents.event} = 'qr_generated' AND ${qrEvents.createdAt} >= current_date`);

    // QR generation by type
    const byType = await db
      .select({
        type: qrEvents.qrType,
        total: count(),
      })
      .from(qrEvents)
      .where(sql`${qrEvents.event} = 'qr_generated' AND ${qrEvents.qrType} IS NOT NULL`)
      .groupBy(qrEvents.qrType);

    // Pro feature wall impressions
    const [proWallTotal] = await db
      .select({ total: count() })
      .from(qrEvents)
      .where(sql`${qrEvents.event} = 'pro_wall_impression'`);

    const [proWallToday] = await db
      .select({ total: count() })
      .from(qrEvents)
      .where(sql`${qrEvents.event} = 'pro_wall_impression' AND ${qrEvents.createdAt} >= current_date`);

    // Day 1-2 Signups (for decision gate)
    const [day1_2Signups] = await db
      .select({ total: count() })
      .from(users)
      .where(sql`${users.createdAt} >= NOW() - INTERVAL '2 days'`);

    // Stripe payment success rate
    const [stripeCreated] = await db
      .select({ total: count() })
      .from(stripePaymentEvents)
      .where(sql`${stripePaymentEvents.eventType} = 'payment_intent.created'`);

    const [stripeSucceeded] = await db
      .select({ total: count() })
      .from(stripePaymentEvents)
      .where(sql`${stripePaymentEvents.eventType} = 'payment_intent.succeeded'`);

    const stripeSuccessRate =
      stripeCreated.total > 0
        ? Math.round((stripeSucceeded.total / stripeCreated.total) * 10000) / 100
        : 0;

    // Email delivery status (pending emails in drip schedule)
    const [pendingEmails] = await db
      .select({ total: count() })
      .from(dripSchedule)
      .where(sql`${dripSchedule.sentAt} IS NULL AND ${dripSchedule.sendAt} <= NOW()`);

    return NextResponse.json({
      signups_total: totalSignups.total,
      signups_today: signupsToday.total,
      signups_day1_2: day1_2Signups.total,
      signups_by_source: bySource.reduce(
        (acc, row) => ({ ...acc, [row.source]: row.total }),
        {} as Record<string, number>
      ),
      payments_total: payments.total,
      stripe_payment_success_rate: stripeSuccessRate,
      stripe_success_count: stripeSucceeded.total,
      stripe_attempted_count: stripeCreated.total,
      pending_emails: pendingEmails.total,
      activated_users: activatedCount,
      activation_rate: activationRate,
      qr_generated_total: totalGenerated.total,
      qr_generated_today: generatedToday.total,
      qr_by_type: byType.reduce(
        (acc, row) => ({ ...acc, [row.type ?? "unknown"]: row.total }),
        {} as Record<string, number>
      ),
      pro_wall_impressions_total: proWallTotal.total,
      pro_wall_impressions_today: proWallToday.total,
      generated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Metrics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
