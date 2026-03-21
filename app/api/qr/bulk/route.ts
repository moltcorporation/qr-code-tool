import { db } from "@/db";
import { qrCodes } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { getUserPlan } from "@/lib/pro";
import { generateShortCode } from "@/lib/shortcode";
import { NextResponse } from "next/server";

const MAX_BULK_ITEMS = 100;

// Bulk create dynamic QR codes from CSV data
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const plan = await getUserPlan(session.userId);
  if (plan !== "premium") {
    return NextResponse.json(
      { error: "Pro subscription required for bulk QR generation" },
      { status: 403 }
    );
  }

  try {
    const { items } = await request.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Items array is required" },
        { status: 400 }
      );
    }

    if (items.length > MAX_BULK_ITEMS) {
      return NextResponse.json(
        { error: `Maximum ${MAX_BULK_ITEMS} items per batch` },
        { status: 400 }
      );
    }

    const results = [];
    for (const item of items) {
      const url = item.url?.trim();
      if (!url) continue;

      const shortCode = generateShortCode();
      const [qr] = await db
        .insert(qrCodes)
        .values({
          userId: session.userId,
          shortCode,
          destinationUrl: url,
          title: item.title?.trim() || null,
          type: "dynamic",
          fgColor: item.fgColor || "#000000",
          bgColor: item.bgColor || "#ffffff",
          errorCorrection: "M",
        })
        .returning();

      results.push(qr);
    }

    return NextResponse.json({ created: results.length, codes: results }, { status: 201 });
  } catch (error) {
    console.error("Bulk create error:", error);
    return NextResponse.json(
      { error: "Failed to create QR codes" },
      { status: 500 }
    );
  }
}
