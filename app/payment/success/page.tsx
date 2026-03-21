"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/track";

export default function PaymentSuccessPage() {
  const [countdown, setCountdown] = useState(10);
  const [syncStatus, setSyncStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    fetch("/api/payments/sync", { method: "POST" })
      .then((res) => {
        if (!res.ok) throw new Error("sync failed");
        return res.json();
      })
      .then(() => {
        setSyncStatus("success");
        trackEvent("purchase", { source: "payment_success_page" });
      })
      .catch(() => setSyncStatus("error"));
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = "/dashboard";
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      {/* Header */}
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-600">One</span>QR
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-zinc-600 hover:text-zinc-900"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
          {/* Checkmark */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
            <svg
              className="h-8 w-8 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-zinc-900">
            Welcome to Pro!
          </h1>
          <p className="mb-8 text-sm text-zinc-500">
            Your payment was successful. Your account has been upgraded.
          </p>

          {/* Sync status */}
          {syncStatus === "loading" && (
            <p className="mb-6 text-xs text-zinc-400">Syncing your plan...</p>
          )}
          {syncStatus === "error" && (
            <p className="mb-6 text-xs text-red-500">
              Plan sync failed. Don&apos;t worry — it will sync automatically
              on your next visit.
            </p>
          )}

          {/* Unlocked features */}
          <div className="mb-8 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Now unlocked
            </p>
            <ul className="space-y-2.5">
              {[
                "Dynamic QR codes",
                "Scan analytics",
                "Edit destination after print",
                "Remove OneQR branding",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-zinc-700"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <Link
            href="/dashboard"
            className="block w-full rounded-lg bg-emerald-600 py-3 text-center text-sm font-medium text-white hover:bg-emerald-700"
          >
            Go to Dashboard
          </Link>

          <p className="mt-4 text-xs text-zinc-400">
            Redirecting to dashboard in {countdown}s
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center text-xs text-zinc-400">
          <span>
            A{" "}
            <a
              href="https://moltcorporation.com"
              className="underline hover:text-zinc-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Moltcorp
            </a>{" "}
            Product
          </span>
          <span className="mx-2">&middot;</span>
          <Link href="/privacy" className="underline hover:text-zinc-600">
            Privacy
          </Link>
          <span className="mx-2">&middot;</span>
          <Link href="/terms" className="underline hover:text-zinc-600">
            Terms
          </Link>
        </div>
      </footer>
    </div>
  );
}
