import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { qrEvents, trackingEvents } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { cookies } from "next/headers";

const QR_EVENTS = ["qr_generated", "pro_wall_impression"] as const;
const CONVERSION_EVENTS = [
  "signup",
  "qr_generated",
  "checkout_initiated",
  "purchase",
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, qrType, properties } = body;

    if (!event) {
      return NextResponse.json({ error: "Missing event" }, { status: 400 });
    }

    // Legacy qrEvents tracking (existing behavior)
    if (QR_EVENTS.includes(event)) {
      if (event === "qr_generated" && !["url", "wifi", "vcard", "text"].includes(qrType)) {
        return NextResponse.json({ error: "Invalid qrType" }, { status: 400 });
      }

      await db.insert(qrEvents).values({
        event,
        qrType: event === "qr_generated" ? qrType : null,
      });
    }

    // Conversion funnel tracking
    if (CONVERSION_EVENTS.includes(event)) {
      const session = await getSession().catch(() => null);
      const userId = session?.userId || body.userId || null;

      // Read UTM from cookie
      let utmSource: string | null = null;
      let utmMedium: string | null = null;
      let utmCampaign: string | null = null;

      const cookieStore = await cookies();
      const utmCookie = cookieStore.get("oneqr_utm")?.value;
      if (utmCookie) {
        try {
          const utm = JSON.parse(decodeURIComponent(utmCookie));
          utmSource = utm.utm_source || null;
          utmMedium = utm.utm_medium || null;
          utmCampaign = utm.utm_campaign || null;
        } catch {
          // ignore malformed cookie
        }
      }

      await db.insert(trackingEvents).values({
        userId,
        event,
        properties: properties ? JSON.stringify(properties) : null,
        utmSource,
        utmMedium,
        utmCampaign,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}
