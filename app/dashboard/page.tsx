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
            <span className="text-emerald-600">Q</span>dot
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-500">{user.email}</span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
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

        <UpgradeBanner plan={user.plan} />
        <CreateQRForm />

        {codes.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center">
            <p className="text-sm text-zinc-500">
              No dynamic QR codes yet. Create one above.
            </p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-4">
            {codes.map((qr) => (
              <div
                key={qr.id}
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-5"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-zinc-900">
                      {qr.title || qr.shortCode}
                    </span>
                    <span className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-500">
                      /q/{qr.shortCode}
                    </span>
                  </div>
                  <EditDestination id={qr.id} currentUrl={qr.destinationUrl} />
                  <span className="text-xs text-zinc-400">
                    Created{" "}
                    {qr.createdAt
                      ? new Date(qr.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-2xl font-bold text-zinc-900">
                      {qr.scanCount}
                    </span>
                    <span className="ml-1 text-xs text-zinc-500">scans</span>
                  </div>
                  <Link
                    href={`/dashboard/${qr.id}`}
                    className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                  >
                    Analytics
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
