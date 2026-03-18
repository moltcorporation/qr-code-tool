import { db } from "@/db";
import { users, passwordResetTokens } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import crypto from "crypto";

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
        message: "If an account exists with that email, a reset link has been generated.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db.insert(passwordResetTokens).values({
      userId: user.id,
      token,
      expiresAt,
    });

    // No email infra yet — return the token in the response for MVP
    // In production, this would send an email instead
    return NextResponse.json({
      message: "If an account exists with that email, a reset link has been generated.",
      resetUrl: `/reset-password?token=${token}`,
    });
  } catch (error) {
    console.error("Reset request error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
