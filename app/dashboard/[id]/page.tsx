"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Analytics {
  qr: {
    id: string;
    shortCode: string;
    destinationUrl: string;
    title: string | null;
    createdAt: string;
  };
  totalScans: number;
  devices: Record<string, number>;
  languages: Record<string, number>;
  referrers: Record<string, number>;
  dailyCounts: Record<string, number>;
}

function BreakdownCard({
  title,
  data,
}: {
  title: string;
  data: Record<string, number>;
}) {
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const total = sorted.reduce((sum, [, v]) => sum + v, 0);

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
      {sorted.length === 0 ? (
        <p className="mt-3 text-sm text-zinc-400">No data yet</p>
      ) : (
        <div className="mt-3 flex flex-col gap-2">
          {sorted.slice(0, 8).map(([key, count]) => (
            <div key={key} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-700">{key}</span>
                  <span className="text-zinc-400">
                    {count} ({total > 0 ? Math.round((count / total) * 100) : 0}
                    %)
                  </span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-zinc-100">
                  <div
                    className="h-1.5 rounded-full bg-emerald-500"
                    style={{
                      width: `${total > 0 ? (count / total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    fetch(`/api/qr/${params.id}`)
      .then((res) => {
        if (res.status === 401) {
          router.push("/login");
          return null;
        }
        if (res.status === 403) {
          setBlocked(true);
          return null;
        }
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((d) => d && setData(d))
      .catch(() => router.push("/dashboard"))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">Loading analytics...</p>
      </div>
    );
  }

  if (blocked) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-zinc-700 font-medium">Scan analytics require a Pro plan</p>
        <Link href="/dashboard" className="text-sm text-emerald-600 hover:text-emerald-700">
          Back to dashboard
        </Link>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-600">Q</span>dot
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-zinc-500 hover:text-zinc-700"
          >
            &larr; Back to dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-zinc-900">
            {data.qr.title || data.qr.shortCode}
          </h1>
          <span className="rounded bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-500">
            /q/{data.qr.shortCode}
          </span>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          → {data.qr.destinationUrl}
        </p>

        {/* Total scans */}
        <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
          <span className="text-4xl font-bold text-zinc-900">
            {data.totalScans}
          </span>
          <span className="ml-2 text-sm text-zinc-500">total scans</span>
        </div>

        {/* Daily chart (simple text-based) */}
        {Object.keys(data.dailyCounts).length > 0 && (
          <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-zinc-900">
              Scans by day
            </h3>
            <div className="mt-3 flex flex-col gap-1">
              {Object.entries(data.dailyCounts)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([day, count]) => {
                  const max = Math.max(...Object.values(data.dailyCounts));
                  return (
                    <div key={day} className="flex items-center gap-3">
                      <span className="w-24 text-xs text-zinc-500">{day}</span>
                      <div className="flex-1">
                        <div
                          className="h-4 rounded bg-emerald-500"
                          style={{
                            width: `${max > 0 ? (count / max) * 100 : 0}%`,
                            minWidth: count > 0 ? "4px" : "0",
                          }}
                        />
                      </div>
                      <span className="w-8 text-right text-xs text-zinc-500">
                        {count}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Breakdowns */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <BreakdownCard title="Devices" data={data.devices} />
          <BreakdownCard title="Languages" data={data.languages} />
          <BreakdownCard title="Referrers" data={data.referrers} />
        </div>
      </main>
    </div>
  );
}
