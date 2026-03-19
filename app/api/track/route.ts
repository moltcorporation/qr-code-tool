import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { qrEvents } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, qrType } = body;

    if (!event || !["qr_generated", "pro_wall_impression"].includes(event)) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }

    if (event === "qr_generated" && !["url", "wifi", "vcard", "text"].includes(qrType)) {
      return NextResponse.json({ error: "Invalid qrType" }, { status: 400 });
    }

    await db.insert(qrEvents).values({
      event,
      qrType: event === "qr_generated" ? qrType : null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}
