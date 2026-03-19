import { NextRequest } from "next/server";
import { db } from "@/db";
import { pageViews } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const path = typeof body.path === "string" ? body.path.slice(0, 500) : "/";
    const utmSource =
      typeof body.utm_source === "string" ? body.utm_source.slice(0, 200) : null;

    await db.insert(pageViews).values({ path, utmSource });

    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 204 });
  }
}
