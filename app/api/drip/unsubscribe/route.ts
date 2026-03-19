import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { dripSchedule } from "@/db/schema";
import { eq, and, isNull } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const uid = request.nextUrl.searchParams.get("uid");

  if (!uid) {
    return new NextResponse(html("Missing parameters."), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  // Delete all unsent drip emails for this user
  const result = await db
    .delete(dripSchedule)
    .where(and(eq(dripSchedule.userId, uid), isNull(dripSchedule.sentAt)));

  return new NextResponse(
    html("You have been unsubscribed from OneQR onboarding emails."),
    {
      status: 200,
      headers: { "Content-Type": "text/html" },
    }
  );
}

function html(message: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>OneQR — Unsubscribe</title>
<style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#f6f9fc}
.card{background:#fff;padding:40px;border-radius:8px;text-align:center;max-width:400px}
h1{font-size:24px;color:#7c3aed;margin:0 0 16px}p{color:#4a4a4a;font-size:15px;line-height:24px}</style>
</head>
<body><div class="card"><h1>OneQR</h1><p>${message}</p></div></body>
</html>`;
}
