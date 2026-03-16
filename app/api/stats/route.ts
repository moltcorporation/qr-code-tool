import { db } from "@/db";
import { qrCodes } from "@/db/schema";
import { count } from "drizzle-orm";
import { NextResponse } from "next/server";

export const revalidate = 300; // cache 5 minutes

export async function GET() {
  try {
    const [result] = await db.select({ total: count() }).from(qrCodes);
    return NextResponse.json({ totalCodes: result.total });
  } catch {
    return NextResponse.json({ totalCodes: 0 });
  }
}
