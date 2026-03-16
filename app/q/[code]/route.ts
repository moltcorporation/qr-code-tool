import { db } from "@/db";
import { qrCodes, scans } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs"; // neon serverless needs node, not edge

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const [qr] = await db
    .select({ id: qrCodes.id, destinationUrl: qrCodes.destinationUrl })
    .from(qrCodes)
    .where(eq(qrCodes.shortCode, code))
    .limit(1);

  if (!qr) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Log scan asynchronously — don't block the redirect
  const userAgent = request.headers.get("user-agent") || null;
  const acceptLanguage = request.headers.get("accept-language") || null;
  const referrer = request.headers.get("referer") || null;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);

  // Fire and forget — don't await
  db.insert(scans)
    .values({
      qrCodeId: qr.id,
      userAgent,
      acceptLanguage,
      referrer,
      ipHash,
    })
    .catch((err) => console.error("Failed to log scan:", err));

  return NextResponse.redirect(qr.destinationUrl, 302);
}
