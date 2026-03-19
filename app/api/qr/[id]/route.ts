import { db } from "@/db";
import { qrCodes, scans, users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { PAYMENT_LINKS, checkPaymentAccess } from "@/lib/payments";
import { eq, and, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

// Update destination URL
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Get user email for payment verification
  const [user] = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Check Pro status: verify via Moltcorp API (which checks actual payment)
  const hasPro = await checkPaymentAccess(PAYMENT_LINKS.pro.id, user.email);
  if (!hasPro) {
    return NextResponse.json(
      { error: "Pro plan required to edit QR codes" },
      { status: 403 }
    );
  }

  const { id } = await params;
  const { destinationUrl, title } = await request.json();

  const [updated] = await db
    .update(qrCodes)
    .set({
      ...(destinationUrl !== undefined && { destinationUrl }),
      ...(title !== undefined && { title }),
    })
    .where(and(eq(qrCodes.id, id), eq(qrCodes.userId, session.userId)))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "QR code not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// Get scan analytics for a QR code
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Get user email for payment verification
  const [user] = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Check Pro status: verify via Moltcorp API (which checks actual payment)
  const hasPro = await checkPaymentAccess(PAYMENT_LINKS.pro.id, user.email);
  if (!hasPro) {
    return NextResponse.json(
      { error: "Pro plan required to view scan analytics" },
      { status: 403 }
    );
  }

  const { id } = await params;

  // Verify ownership
  const [qr] = await db
    .select()
    .from(qrCodes)
    .where(and(eq(qrCodes.id, id), eq(qrCodes.userId, session.userId)))
    .limit(1);

  if (!qr) {
    return NextResponse.json({ error: "QR code not found" }, { status: 404 });
  }

  // Get recent scans
  const recentScans = await db
    .select({
      scannedAt: scans.scannedAt,
      userAgent: scans.userAgent,
      acceptLanguage: scans.acceptLanguage,
      referrer: scans.referrer,
    })
    .from(scans)
    .where(eq(scans.qrCodeId, id))
    .orderBy(desc(scans.scannedAt))
    .limit(100);

  // Parse analytics
  const devices: Record<string, number> = {};
  const languages: Record<string, number> = {};
  const referrers: Record<string, number> = {};
  const dailyCounts: Record<string, number> = {};

  for (const scan of recentScans) {
    // Device
    const ua = scan.userAgent || "Unknown";
    const device = /Mobile|Android|iPhone/i.test(ua) ? "Mobile" : "Desktop";
    devices[device] = (devices[device] || 0) + 1;

    // Language
    const lang = scan.acceptLanguage?.split(",")[0]?.split("-")[0] || "Unknown";
    languages[lang] = (languages[lang] || 0) + 1;

    // Referrer
    const ref = scan.referrer
      ? new URL(scan.referrer).hostname
      : "Direct";
    referrers[ref] = (referrers[ref] || 0) + 1;

    // Daily
    const day = scan.scannedAt
      ? new Date(scan.scannedAt).toISOString().split("T")[0]
      : "Unknown";
    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
  }

  return NextResponse.json({
    qr,
    totalScans: recentScans.length,
    devices,
    languages,
    referrers,
    dailyCounts,
    recentScans: recentScans.slice(0, 20),
  });
}

// Delete a QR code
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;

  // Verify ownership
  const [qr] = await db
    .select({ id: qrCodes.id })
    .from(qrCodes)
    .where(and(eq(qrCodes.id, id), eq(qrCodes.userId, session.userId)))
    .limit(1);

  if (!qr) {
    return NextResponse.json({ error: "QR code not found" }, { status: 404 });
  }

  // Delete associated scans first, then the QR code
  await db.delete(scans).where(eq(scans.qrCodeId, id));
  await db.delete(qrCodes).where(eq(qrCodes.id, id));

  return NextResponse.json({ success: true });
}
