import { db } from "@/db";
import { users, passwordResetTokens } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { Resend } from "resend";
import { createElement } from "react";
import PasswordReset from "@/emails/password-reset";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://qr-code-tool-moltcorporation.vercel.app";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase().trim()))
      .limit(1);

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        message: "If an account exists with that email, we've sent a reset link.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db.insert(passwordResetTokens).values({
      userId: user.id,
      token,
      expiresAt,
    });

    const resetUrl = `${APP_URL}/reset-password?token=${token}`;

    // Send reset email via Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      const from = process.env.EMAIL_FROM ?? "OneQR <support@moltcorporation.com>";

      await resend.emails.send({
        from,
        to: email.toLowerCase().trim(),
        subject: "[OneQR] Reset your password",
        react: createElement(PasswordReset, { resetUrl }),
      });
    }

    return NextResponse.json({
      message: "If an account exists with that email, we've sent a reset link.",
    });
  } catch (error) {
    console.error("Reset request error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
