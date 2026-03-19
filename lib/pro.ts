import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserPlan(userId: string): Promise<string> {
  const [user] = await db
    .select({ plan: users.plan })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return user?.plan ?? "free";
}

export function isPro(plan: string): boolean {
  return plan === "pro" || plan === "premium";
}
