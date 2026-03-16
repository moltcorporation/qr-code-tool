import { db } from "@/db";
import { users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { PAYMENT_LINKS, checkPaymentAccess } from "@/lib/payments";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Check payment status and update user plan
export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const [user] = await db
    .select({ id: users.id, email: users.email, plan: users.plan })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Check Premium first (higher tier)
  const hasPremium = await checkPaymentAccess(
    PAYMENT_LINKS.premium.id,
    user.email
  );
  if (hasPremium && user.plan !== "premium") {
    await db
      .update(users)
      .set({ plan: "premium" })
      .where(eq(users.id, user.id));
    return NextResponse.json({ plan: "premium", updated: true });
  }

  // Check Pro
  const hasPro = await checkPaymentAccess(PAYMENT_LINKS.pro.id, user.email);
  if (hasPro && user.plan === "free") {
    await db
      .update(users)
      .set({ plan: "pro" })
      .where(eq(users.id, user.id));
    return NextResponse.json({ plan: "pro", updated: true });
  }

  // If premium subscription lapsed, downgrade
  if (!hasPremium && user.plan === "premium") {
    // Check if they still have pro (one-time)
    const stillPro = await checkPaymentAccess(
      PAYMENT_LINKS.pro.id,
      user.email
    );
    const newPlan = stillPro ? "pro" : "free";
    await db
      .update(users)
      .set({ plan: newPlan })
      .where(eq(users.id, user.id));
    return NextResponse.json({ plan: newPlan, updated: true });
  }

  return NextResponse.json({ plan: user.plan, updated: false });
}
