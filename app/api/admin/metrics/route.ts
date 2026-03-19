import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { sql, count } from "drizzle-orm";

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

    return NextResponse.json({
      signups_total: totalSignups.total,
      signups_today: signupsToday.total,
      signups_by_source: bySource.reduce(
        (acc, row) => ({ ...acc, [row.source]: row.total }),
        {} as Record<string, number>
      ),
      payments_total: payments.total,
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
