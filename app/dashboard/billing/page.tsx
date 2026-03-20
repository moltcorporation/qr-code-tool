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

  let user;

  try {
    const users_result = await db
      .select({ id: users.id, email: users.email, plan: users.plan })
      .from(users)
      .where(eq(users.id, session.userId))
      .limit(1);
    [user] = users_result;

    if (!user) redirect("/login");
  } catch (error) {
    console.error("Billing page data fetch error:", error);
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Service Temporarily Unavailable</h1>
          <p className="text-zinc-600 mb-4">We're experiencing a brief issue. Please try again in a moment.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
            Manage your plan and billing details
          </p>
        </div>

        <BillingContent user={user} />
      </main>
    </div>
  );
}
