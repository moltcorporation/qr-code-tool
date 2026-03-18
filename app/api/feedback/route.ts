import { db } from "@/db";
import { feedback } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, category, intent, message } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const validCategories = ["bug", "feature", "general"];
    const safeCategory = validCategories.includes(category) ? category : "general";

    await db.insert(feedback).values({
      email: email && typeof email === "string" ? email.trim().slice(0, 255) : null,
      category: safeCategory,
      intent: intent && typeof intent === "string" ? intent.trim().slice(0, 500) : null,
      message: message.trim().slice(0, 2000),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
