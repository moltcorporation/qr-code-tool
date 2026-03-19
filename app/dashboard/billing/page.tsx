import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { BillingContent } from "./billing-content";

export default async function BillingPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [user] = await db
    .select({ id: users.id, email: users.email, plan: users.plan })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-600">One</span>QR
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm text-zinc-600 hover:text-zinc-900"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">Billing & Plan</h1>
          <p className="mt-2 text-zinc-600">
            Manage your subscription and view your current plan
          </p>
        </div>

        <BillingContent user={user} />
      </main>
    </div>
  );
}
