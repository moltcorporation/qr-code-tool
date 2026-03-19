import { db } from "@/db";
import { users, dripSchedule } from "@/db/schema";
import { hashPassword, createSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, password, utm_source } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase().trim()))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const utmSource = utm_source ? String(utm_source).trim().slice(0, 200) : null;

    const [user] = await db
      .insert(users)
      .values({
        email: email.toLowerCase().trim(),
        passwordHash,
        ...(utmSource && { utmSource }),
      })
      .returning({ id: users.id });

    await createSession(user.id);

    // Schedule 5 drip emails: Day 0, 3, 5, 7, 10
    const dripDays = [0, 3, 5, 7, 10];
    const now = new Date();
    await db.insert(dripSchedule).values(
      dripDays.map((days, i) => ({
        userId: user.id,
        emailNumber: (i + 1) as 1 | 2 | 3 | 4 | 5,
        sendAt: new Date(now.getTime() + days * 24 * 60 * 60 * 1000),
      }))
    );

    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
