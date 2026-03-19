import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const [user] = await db
      .select({ plan: users.plan })
      .from(users)
      .where(eq(users.id, session.userId))
      .limit(1);

    if (!user || user.plan === "free") {
      return NextResponse.json({ success: true, had_subscription: false });
    }

    const hadSubscription = user.plan === "premium";

    await db
      .update(users)
      .set({ plan: "free" })
      .where(eq(users.id, session.userId));

    return NextResponse.json({
      success: true,
      had_subscription: hadSubscription,
    });
  } catch (error) {
    console.error("Downgrade error:", error);
    return NextResponse.json(
      { error: "Failed to downgrade plan" },
      { status: 500 }
    );
  }
}
