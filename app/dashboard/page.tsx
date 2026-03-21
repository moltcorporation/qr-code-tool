import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users, qrCodes, scans } from "@/db/schema";
import { eq, desc, count } from "drizzle-orm";
import { LogoutButton } from "./logout-button";
import { CreateQRForm } from "./create-qr-form";
import { EditDestination } from "./edit-destination";
import { UpgradeBanner } from "./upgrade-banner";
import { QRPreview } from "./qr-preview";
import { CopyLinkButton, DownloadButtons, DeleteButton } from "./qr-actions";
import { BillingSyncButton } from "./billing-sync-button";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [user] = await db
    .select({ id: users.id, email: users.email, plan: users.plan })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (!user) redirect("/login");

  const codes = await db
    .select({
      id: qrCodes.id,
      shortCode: qrCodes.shortCode,
      destinationUrl: qrCodes.destinationUrl,
      title: qrCodes.title,
      fgColor: qrCodes.fgColor,
      bgColor: qrCodes.bgColor,
      createdAt: qrCodes.createdAt,
      scanCount: count(scans.id),
    })
    .from(qrCodes)
    .leftJoin(scans, eq(scans.qrCodeId, qrCodes.id))
    .where(eq(qrCodes.userId, user.id))
    .groupBy(qrCodes.id)
    .orderBy(desc(qrCodes.createdAt));

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-600">One</span>QR
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-500">{user.email}</span>
            <Link
              href="/dashboard/billing"
              className="text-sm text-zinc-600 hover:text-zinc-900"
            >
              Billing
            </Link>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 capitalize">
              {user.plan}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900">
            Dynamic QR Codes
          </h1>
          {user.plan === "premium" && (
            <Link
              href="/dashboard/bulk"
              className="rounded-md border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50"
            >
              Bulk Generate
            </Link>
          )}
        </div>

        <Suspense fallback={null}>
          <UpgradeBanner plan={user.plan} email={user.email} />
        </Suspense>

        {(user.plan === "pro" || user.plan === "premium") && (
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-zinc-500">
              Plan: <span className="font-medium text-emerald-700 capitalize">{user.plan}</span>
            </span>
            <BillingSyncButton />
            {process.env.NEXT_PUBLIC_STRIPE_PORTAL_LINK && (
              <a
                href={process.env.NEXT_PUBLIC_STRIPE_PORTAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-emerald-600 hover:text-emerald-700"
              >
                Manage Subscription
              </a>
            )}
          </div>
        )}

        {(user.plan === "pro" || user.plan === "premium") ? (
          <CreateQRForm plan={user.plan} />
        ) : (
          <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-5 text-center text-sm text-zinc-500">
            Unlock Pro to create dynamic QR codes with editable destinations and scan analytics.
          </div>
        )}

        {codes.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-zinc-300 bg-white p-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900">
              Create your first dynamic QR code
            </h3>
            <p className="mt-1 text-sm text-zinc-500 max-w-sm mx-auto">
              Dynamic QR codes let you change the destination URL anytime without reprinting. Enter a URL above to get started.
            </p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-4">
            {codes.map((qr) => (
              <div
                key={qr.id}
                className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-white p-5"
              >
                {/* QR Preview */}
                <QRPreview
                  shortCode={qr.shortCode}
                  fgColor={qr.fgColor || "#000000"}
                  bgColor={qr.bgColor || "#ffffff"}
                />

                {/* Info */}
                <div className="flex flex-1 flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-zinc-900">
                      {qr.title || qr.shortCode}
                    </span>
                  </div>
                  {(user.plan === "pro" || user.plan === "premium") ? (
                    <EditDestination id={qr.id} currentUrl={qr.destinationUrl} />
                  ) : (
                    <span className="truncate text-sm text-zinc-500">{qr.destinationUrl}</span>
                  )}
                  <CopyLinkButton shortCode={qr.shortCode} />
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-zinc-400">
                      Created{" "}
                      {qr.createdAt
                        ? new Date(qr.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                    <DownloadButtons
                      shortCode={qr.shortCode}
                      fgColor={qr.fgColor || "#000000"}
                      bgColor={qr.bgColor || "#ffffff"}
                      title={qr.title || qr.shortCode}
                    />
                  </div>
                </div>

                {/* Right side: stats + actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <span className="text-2xl font-bold text-zinc-900">
                      {qr.scanCount}
                    </span>
                    <span className="ml-1 text-xs text-zinc-500">scans</span>
                  </div>
                  {(user.plan === "pro" || user.plan === "premium") ? (
                    <Link
                      href={`/dashboard/${qr.id}`}
                      className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                    >
                      Analytics
                    </Link>
                  ) : (
                    <span className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs text-zinc-400">
                      Pro
                    </span>
                  )}
                  <DeleteButton
                    id={qr.id}
                    title={qr.title || qr.shortCode}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Contact support */}
      <div className="mx-auto mt-8 max-w-5xl px-6">
        <div className="rounded-lg border border-zinc-200 bg-white p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-700">Need help?</p>
            <p className="text-xs text-zinc-400">We respond within 48 hours</p>
          </div>
          <Link
            href="/contact"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            Contact Support &rarr;
          </Link>
        </div>
      </div>

      {/* Cross-product footer */}
      <footer className="mt-12 border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            More from Moltcorp
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://federal-contract-tracker-moltcorporation.vercel.app?utm_source=oneqrsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-zinc-200 bg-white p-3 transition-colors hover:border-emerald-300"
            >
              <p className="text-sm font-medium text-zinc-900 group-hover:text-emerald-600">GovScout</p>
              <p className="mt-0.5 text-xs text-zinc-500">Find federal contracts</p>
            </a>
            <a
              href="https://trades-quoting-tool-moltcorporation.vercel.app?utm_source=oneqrsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-zinc-200 bg-white p-3 transition-colors hover:border-emerald-300"
            >
              <p className="text-sm font-medium text-zinc-900 group-hover:text-emerald-600">TradeQuote</p>
              <p className="mt-0.5 text-xs text-zinc-500">Simple quoting for tradespeople</p>
            </a>
            <a
              href="https://breeder-platform-moltcorporation.vercel.app?utm_source=oneqrsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-zinc-200 bg-white p-3 transition-colors hover:border-emerald-300"
            >
              <p className="text-sm font-medium text-zinc-900 group-hover:text-emerald-600">PawPage</p>
              <p className="mt-0.5 text-xs text-zinc-500">Breeder waitlists &amp; deposits</p>
            </a>
          </div>
          <div className="mt-6 flex items-center gap-6 text-xs text-zinc-400">
            <Link href="/privacy" className="hover:text-zinc-700">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-zinc-700">
              Terms
            </Link>
            <Link href="/feedback" className="hover:text-zinc-700">
              Feedback
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
