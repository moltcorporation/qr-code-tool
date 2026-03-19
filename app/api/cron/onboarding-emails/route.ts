import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, qrCodes, scans, onboardingEmails } from "@/db/schema";
import { eq, sql, count } from "drizzle-orm";
import { PAYMENT_LINKS } from "@/lib/payments";

export const maxDuration = 10;

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://qr-code-tool-moltcorporation.vercel.app";

type EmailContent = {
  subject: string;
  body: string;
};

function getEmailForStep(
  step: number,
  scanCount: number
): EmailContent | null {
  switch (step) {
    case 1:
      return {
        subject: "[OneQR] Welcome — your QR code is ready",
        body: [
          "Welcome to OneQR!",
          "",
          "Your QR code is ready to use. Share it anywhere — business cards, flyers, menus, packaging — and watch the scans roll in.",
          "",
          `View your dashboard: ${APP_URL}/dashboard`,
          "",
          "Tip: You can customize colors and error correction levels to match your brand.",
          "",
          "— OneQR",
        ].join("\n"),
      };

    case 2: {
      const scanLine =
        scanCount > 0
          ? `Your QR codes have been scanned ${scanCount} time${scanCount === 1 ? "" : "s"} so far. Unlock detailed scan analytics — see when, where, and how people scan — with Premium.`
          : "Unlock scan analytics, dynamic QR codes, and more with Premium.";

      return {
        subject: scanCount > 0
          ? `[OneQR] Your QR code was scanned ${scanCount} time${scanCount === 1 ? "" : "s"}`
          : "[OneQR] Get more from your QR codes",
        body: [
          "Hey!",
          "",
          scanLine,
          "",
          "Premium includes:",
          "- Scan analytics (time, device, location trends)",
          "- Dynamic QR codes (change the destination without reprinting)",
          "- Unlimited QR codes",
          "",
          `One-time Pro: $9.99 — ${PAYMENT_LINKS.pro.url}`,
          `Premium subscription: $5/mo — ${PAYMENT_LINKS.premium.url}`,
          "",
          "— OneQR",
        ].join("\n"),
      };
    }

    case 3:
      return {
        subject: "[OneQR] Did you know? Change your QR destination anytime",
        body: [
          "Quick tip: Dynamic QR codes let you change where they point — without reprinting a single thing.",
          "",
          "Printed 500 flyers but need to update the URL? No problem. Dynamic QR codes redirect through OneQR, so you update the destination in your dashboard and every scan goes to the new link.",
          "",
          "Available with:",
          `- Pro (one-time $9.99): ${PAYMENT_LINKS.pro.url}`,
          `- Premium ($5/mo): ${PAYMENT_LINKS.premium.url}`,
          "",
          "— OneQR",
        ].join("\n"),
      };

    default:
      return null;
  }
}

function getStepForDay(daysSinceSignup: number): number | null {
  if (daysSinceSignup === 0) return 1; // Day 0: welcome
  if (daysSinceSignup >= 3 && daysSinceSignup < 5) return 2; // Day 3: value + social proof
  if (daysSinceSignup >= 5) return 3; // Day 5: feature education
  return null;
}

async function sendOnboardingEmail(to: string, subject: string, body: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "OneQR <hello@oneqr.dev>";

  if (!apiKey) {
    console.log(
      `[OneQR] Onboarding email skipped (no RESEND_API_KEY): to=${to} subject="${subject}"`
    );
    return;
  }

  const unsubscribeNote = `\n\n---\nDon't want onboarding emails? Reply "unsubscribe" to opt out.`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text: body + unsubscribeNote,
      }),
    });
  } catch {
    console.error(`[OneQR] Failed to send onboarding email to ${to}`);
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all users on free plan
  const freeUsers = await db
    .select({ id: users.id, email: users.email, createdAt: users.createdAt })
    .from(users)
    .where(eq(users.plan, "free"));

  let sent = 0;
  let skipped = 0;

  for (const user of freeUsers) {
    if (!user.createdAt) {
      skipped++;
      continue;
    }

    const signupDate = new Date(user.createdAt);
    const now = new Date();
    const daysSinceSignup = Math.floor(
      (now.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const targetStep = getStepForDay(daysSinceSignup);
    if (!targetStep) {
      skipped++;
      continue;
    }

    // Upsert onboarding record
    await db
      .insert(onboardingEmails)
      .values({ email: user.email })
      .onConflictDoNothing({ target: onboardingEmails.email });

    // Get current state
    const [record] = await db
      .select()
      .from(onboardingEmails)
      .where(eq(onboardingEmails.email, user.email));

    if (!record || record.unsubscribed || (record.lastStepSent ?? 0) >= targetStep) {
      skipped++;
      continue;
    }

    // Get scan count for this user's QR codes (for step 2 personalization)
    const userQrCodes = await db
      .select({ id: qrCodes.id })
      .from(qrCodes)
      .where(eq(qrCodes.userId, user.id));

    let scanCount = 0;
    if (userQrCodes.length > 0) {
      const qrIds = userQrCodes.map((q) => q.id);
      const [scanResult] = await db
        .select({ total: count() })
        .from(scans)
        .where(sql`${scans.qrCodeId} IN (${sql.join(qrIds.map(id => sql`${id}`), sql`, `)})`);
      scanCount = scanResult?.total ?? 0;
    }

    const emailContent = getEmailForStep(targetStep, scanCount);
    if (!emailContent) {
      skipped++;
      continue;
    }

    await sendOnboardingEmail(user.email, emailContent.subject, emailContent.body);

    // Update last step sent
    await db
      .update(onboardingEmails)
      .set({ lastStepSent: targetStep, updatedAt: sql`now()` })
      .where(eq(onboardingEmails.email, user.email));

    sent++;
  }

  return NextResponse.json({ sent, skipped, total: freeUsers.length });
}
