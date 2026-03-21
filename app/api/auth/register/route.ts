import { db } from "@/db";
import { users, dripSchedule } from "@/db/schema";
import { hashPassword, createSession } from "@/lib/auth";
import { trackServerEvent } from "@/lib/track";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
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

    // Read UTM from cookie (set by UtmCapture component)
    let utmSource = utm_source ? String(utm_source).trim().slice(0, 200) : null;
    let utmMedium: string | null = null;
    let utmCampaign: string | null = null;

    const cookieStore = await cookies();
    const utmCookie = cookieStore.get("oneqr_utm")?.value;
    if (utmCookie) {
      try {
        const utm = JSON.parse(decodeURIComponent(utmCookie));
        utmSource = utmSource || utm.utm_source || null;
        utmMedium = utm.utm_medium || null;
        utmCampaign = utm.utm_campaign || null;
      } catch {
        // ignore malformed cookie
      }
    }

    const [user] = await db
      .insert(users)
      .values({
        email: email.toLowerCase().trim(),
        passwordHash,
        ...(utmSource && { utmSource }),
        ...(utmMedium && { utmMedium }),
        ...(utmCampaign && { utmCampaign }),
      })
      .returning({ id: users.id });

    await createSession(user.id);

    // Track signup conversion event
    await trackServerEvent(user.id, "signup", {
      utmSource,
      utmMedium,
      utmCampaign,
    });

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
