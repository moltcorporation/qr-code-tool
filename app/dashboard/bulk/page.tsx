import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { BulkUploadForm } from "./bulk-upload-form";

export default async function BulkPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [user] = await db
    .select({ id: users.id, email: users.email, plan: users.plan })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (!user) redirect("/login");

  if (user.plan !== "premium") {
    return (
      <div className="min-h-screen bg-zinc-50">
        <header className="border-b border-zinc-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-emerald-600">One</span>QR
            </Link>
            <Link href="/dashboard" className="text-sm text-zinc-600 hover:text-zinc-900">
              Back to Dashboard
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-zinc-900">Bulk QR Generation</h1>
          <p className="mt-4 text-zinc-600">
            Bulk generation is available on the Pro plan ($7/mo).
          </p>
          <a
            href={`https://buy.stripe.com/8x25kD9JV2pX3nf0jW3Nm0g?prefilled_email=${encodeURIComponent(user.email)}`}
            className="mt-6 inline-block rounded-md bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Upgrade to Pro — $7/mo
          </a>
        </main>
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
            <Link href="/dashboard" className="text-sm text-zinc-600 hover:text-zinc-900">
              Back to Dashboard
            </Link>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 capitalize">
              {user.plan}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-bold text-zinc-900">Bulk QR Generation</h1>
        <p className="mt-2 text-zinc-600">
          Upload a CSV file with URLs to generate multiple dynamic QR codes at once. Maximum 100 per batch.
        </p>

        <BulkUploadForm />

        <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="font-semibold text-zinc-900">CSV Format</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Your CSV should have a <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs">url</code> column
            and an optional <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs">title</code> column.
          </p>
          <pre className="mt-3 overflow-x-auto rounded-md bg-zinc-50 p-4 text-xs text-zinc-700">
{`url,title
https://example.com,My Website
https://menu.restaurant.com,Lunch Menu
https://linkedin.com/in/jsmith,Business Card`}
          </pre>
        </div>
      </main>
    </div>
  );
}
