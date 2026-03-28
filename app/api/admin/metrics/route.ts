import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, qrCodes, qrEvents } from "@/db/schema";
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

    // QR codes created
    const [totalQRCodes] = await db
      .select({ total: count() })
      .from(qrCodes);

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

    return NextResponse.json({
      signups_total: totalSignups.total,
      signups_today: signupsToday.total,
      signups_by_source: bySource.reduce(
        (acc, row) => ({ ...acc, [row.source]: row.total }),
        {} as Record<string, number>
      ),
      payments_total: payments.total,
      qr_codes_created: totalQRCodes.total,
      users_with_qr: activatedCount,
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
