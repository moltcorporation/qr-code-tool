import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/db";
import { dripSchedule, users, qrCodes, scans } from "@/db/schema";
import { eq, and, isNull, lte, sql, count } from "drizzle-orm";
import { PAYMENT_LINKS } from "@/lib/payments";
import Drip1Welcome from "@/emails/drip-1-welcome";
import Drip2Scans from "@/emails/drip-2-scans";
import Drip3Dynamic from "@/emails/drip-3-dynamic";
import Drip4Premium from "@/emails/drip-4-premium";
import Drip5Fomo from "@/emails/drip-5-fomo";
import { createElement } from "react";

export const maxDuration = 30;

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://qr-code-tool-moltcorporation.vercel.app";

function buildUnsubscribeUrl(userId: string): string {
  return `${APP_URL}/api/drip/unsubscribe?uid=${encodeURIComponent(userId)}`;
}

async function getScanCountForUser(userId: string): Promise<number> {
  const userQrCodes = await db
    .select({ id: qrCodes.id })
    .from(qrCodes)
    .where(eq(qrCodes.userId, userId));

  if (userQrCodes.length === 0) return 0;

  const qrIds = userQrCodes.map((q) => q.id);
  const [result] = await db
    .select({ total: count() })
    .from(scans)
    .where(
      sql`${scans.qrCodeId} IN (${sql.join(
        qrIds.map((id) => sql`${id}`),
        sql`, `
      )})`
    );

  return result?.total ?? 0;
}

function getEmailElement(
  emailNumber: number,
  userId: string,
  scanCount: number
): { subject: string; element: React.ReactElement } | null {
  const unsubscribeUrl = buildUnsubscribeUrl(userId);

  switch (emailNumber) {
    case 1:
      return {
        subject: "[OneQR] Your QR code is ready",
        element: createElement(Drip1Welcome, { unsubscribeUrl }),
      };
    case 2:
      return {
        subject:
          scanCount > 0
            ? `[OneQR] Your code was scanned ${scanCount} time${scanCount === 1 ? "" : "s"}`
            : "[OneQR] Unlock scan analytics for your QR codes",
        element: createElement(Drip2Scans, { scanCount, unsubscribeUrl }),
      };
    case 3:
      return {
        subject: "[OneQR] Change your QR destination without reprinting",
        element: createElement(Drip3Dynamic, { unsubscribeUrl }),
      };
    case 4:
      return {
        subject: "[OneQR] Everything Premium users get",
        element: createElement(Drip4Premium, {
          proUrl: PAYMENT_LINKS.pro.url,
          premiumUrl: PAYMENT_LINKS.premium.url,
          unsubscribeUrl,
        }),
      };
    case 5:
      return {
        subject: "[OneQR] Still using free? Here's what you're missing",
        element: createElement(Drip5Fomo, { unsubscribeUrl }),
      };
    default:
      return null;
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[OneQR Drip] No RESEND_API_KEY configured — skipping.");
    return NextResponse.json({ sent: 0, skipped: 0, reason: "no_api_key" });
  }

  const resend = new Resend(apiKey);
  const from = process.env.EMAIL_FROM ?? "OneQR <hello@oneqr.dev>";

  // Get all unsent drip emails where send_at is in the past
  const pendingDrips = await db
    .select({
      dripId: dripSchedule.id,
      userId: dripSchedule.userId,
      emailNumber: dripSchedule.emailNumber,
      userEmail: users.email,
      userPlan: users.plan,
    })
    .from(dripSchedule)
    .innerJoin(users, eq(dripSchedule.userId, users.id))
    .where(
      and(isNull(dripSchedule.sentAt), lte(dripSchedule.sendAt, sql`now()`))
    )
    .limit(100);

  let sent = 0;
  let skipped = 0;

  for (const drip of pendingDrips) {
    // Skip if user has upgraded from free
    if (drip.userPlan !== "free") {
      // Mark as sent so we don't re-process
      await db
        .update(dripSchedule)
        .set({ sentAt: sql`now()` })
        .where(eq(dripSchedule.id, drip.dripId));
      skipped++;
      continue;
    }

    const scanCount =
      drip.emailNumber === 2
        ? await getScanCountForUser(drip.userId)
        : 0;

    const email = getEmailElement(drip.emailNumber, drip.userId, scanCount);
    if (!email) {
      skipped++;
      continue;
    }

    try {
      await resend.emails.send({
        from,
        to: drip.userEmail,
        subject: email.subject,
        react: email.element,
      });

      await db
        .update(dripSchedule)
        .set({ sentAt: sql`now()` })
        .where(eq(dripSchedule.id, drip.dripId));

      sent++;
    } catch (err) {
      console.error(
        `[OneQR Drip] Failed to send email #${drip.emailNumber} to ${drip.userEmail}:`,
        err
      );
    }
  }

  return NextResponse.json({
    sent,
    skipped,
    total: pendingDrips.length,
  });
}
