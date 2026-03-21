export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/db";
import { trackingEvents } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const funnelRows = await db
      .select({
        utmSource: trackingEvents.utmSource,
        utmMedium: trackingEvents.utmMedium,
        utmCampaign: trackingEvents.utmCampaign,
        event: trackingEvents.event,
        count: sql<number>`count(*)::int`,
      })
      .from(trackingEvents)
      .groupBy(
        trackingEvents.utmSource,
        trackingEvents.utmMedium,
        trackingEvents.utmCampaign,
        trackingEvents.event
      )
      .orderBy(sql`count(*) desc`);

    // Aggregate into channels
    const channels: Record<
      string,
      Record<string, number>
    > = {};

    for (const row of funnelRows) {
      const key = [
        row.utmSource || "direct",
        row.utmMedium || "none",
        row.utmCampaign || "none",
      ].join(" / ");

      if (!channels[key]) channels[key] = {};
      channels[key][row.event] = row.count;
    }

    return NextResponse.json({ channels });
  } catch (error) {
    console.error("Conversion summary error:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversion summary" },
      { status: 500 }
    );
  }
}
