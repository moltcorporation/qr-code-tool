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
import { PAYMENT_LINKS } from "@/lib/payments";

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
          </div>
        )}

        {(user.plan === "pro" || user.plan === "premium") ? (
          <CreateQRForm />
        ) : (
          <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-5 text-center text-sm text-zinc-500">
            Upgrade to Pro to create dynamic QR codes with editable destinations and scan analytics.
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
        {/* Upgrade nudges for free users with QR codes */}
        {user.plan === "free" && codes.length > 0 && (
          <div className="mt-6 flex flex-col gap-3">
            {/* Analytics teaser — show scan count preview with upgrade CTA */}
            {codes.some((qr) => Number(qr.scanCount) > 0) && (
              <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-emerald-900">
                      {codes.reduce((sum, qr) => sum + Number(qr.scanCount), 0)} scans detected
                    </span>
                    <span className="text-xs text-emerald-700">Unlock full analytics — see who, when, and where with Pro.</span>
                  </div>
                </div>
                <a
                  href={`${PAYMENT_LINKS.pro.url}?prefilled_email=${encodeURIComponent(user.email)}`}
                  className="shrink-0 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                >
                  Upgrade
                </a>
              </div>
            )}

            {/* Dynamic QR callout */}
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.182-3.182" />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-900">Your QR codes are static</span>
                  <span className="text-xs text-zinc-500">Pro dynamic codes let you change the destination without reprinting.</span>
                </div>
              </div>
              <a
                href={`${PAYMENT_LINKS.pro.url}?prefilled_email=${encodeURIComponent(user.email)}`}
                className="shrink-0 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
              >
                Upgrade
              </a>
            </div>

            {/* Scan activity hook — when QR codes have scans */}
            {codes.some((qr) => Number(qr.scanCount) > 0) && (
              <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-900">People are scanning your code</span>
                    <span className="text-xs text-zinc-500">See who, when, and where with Pro analytics.</span>
                  </div>
                </div>
                <a
                  href={`${PAYMENT_LINKS.pro.url}?prefilled_email=${encodeURIComponent(user.email)}`}
                  className="shrink-0 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                >
                  Upgrade
                </a>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
