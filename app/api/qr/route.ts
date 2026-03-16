import { db } from "@/db";
import { qrCodes, scans } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { generateShortCode } from "@/lib/shortcode";
import { eq, desc, count } from "drizzle-orm";
import { NextResponse } from "next/server";

// List user's QR codes
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const codes = await db
    .select({
      id: qrCodes.id,
      shortCode: qrCodes.shortCode,
      destinationUrl: qrCodes.destinationUrl,
      title: qrCodes.title,
      type: qrCodes.type,
      fgColor: qrCodes.fgColor,
      bgColor: qrCodes.bgColor,
      createdAt: qrCodes.createdAt,
      scanCount: count(scans.id),
    })
    .from(qrCodes)
    .leftJoin(scans, eq(scans.qrCodeId, qrCodes.id))
    .where(eq(qrCodes.userId, session.userId))
    .groupBy(qrCodes.id)
    .orderBy(desc(qrCodes.createdAt));

  return NextResponse.json(codes);
}

// Create a dynamic QR code
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { destinationUrl, title, fgColor, bgColor, errorCorrection } =
      await request.json();

    if (!destinationUrl) {
      return NextResponse.json(
        { error: "Destination URL is required" },
        { status: 400 }
      );
    }

    const shortCode = generateShortCode();

    const [qr] = await db
      .insert(qrCodes)
      .values({
        userId: session.userId,
        shortCode,
        destinationUrl,
        title: title || null,
        type: "dynamic",
        fgColor: fgColor || "#000000",
        bgColor: bgColor || "#ffffff",
        errorCorrection: errorCorrection || "M",
      })
      .returning();

    return NextResponse.json(qr, { status: 201 });
  } catch (error) {
    console.error("Create QR error:", error);
    return NextResponse.json(
      { error: "Failed to create QR code" },
      { status: 500 }
    );
  }
}
