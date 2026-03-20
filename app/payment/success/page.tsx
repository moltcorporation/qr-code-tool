"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const [countdown, setCountdown] = useState(10);
  const [syncStatus, setSyncStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/payments/sync", { method: "POST" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setSyncStatus("success");
        setPlan(data.plan || null);
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

  const proFeatures = [
    "Dynamic QR codes",
    "Edit destinations after printing",
    "Scan analytics",
    "WiFi QR codes",
  ];

  const premiumFeatures = [
    ...proFeatures,
    "Priority support",
    "Bulk QR generation",
  ];

  const features = plan === "premium" ? premiumFeatures : proFeatures;
  const title =
    plan === "premium" ? "Welcome to Premium!" : "Welcome to Pro!";

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-black dark:text-white">
            OneQR
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
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

          <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">
            {title}
          </h1>
          <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
            Your payment was successful. Your account has been upgraded.
          </p>

          {syncStatus === "loading" && (
            <p className="mb-6 text-xs text-zinc-400">Syncing your plan...</p>
          )}
          {syncStatus === "error" && (
            <p className="mb-6 text-xs text-red-500">
              Plan sync failed. Don&apos;t worry — it will sync automatically
              when you visit the dashboard.
            </p>
          )}

          <div className="mb-8 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left dark:border-zinc-800 dark:bg-zinc-950">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Now unlocked
            </p>
            <ul className="space-y-2.5">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"
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

          <Link
            href="/dashboard"
            className="block w-full rounded-lg bg-black py-3 text-center text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Go to Dashboard
          </Link>

          <p className="mt-4 text-xs text-zinc-400">
            Redirecting to dashboard in {countdown}s
          </p>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center text-xs text-zinc-400">
          <span>
            A{" "}
            <a
              href="https://moltcorporation.com"
              className="underline transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Moltcorp
            </a>{" "}
            Product
          </span>
          <span className="mx-2">&middot;</span>
          <Link
            href="/privacy"
            className="underline transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            Privacy
          </Link>
          <span className="mx-2">&middot;</span>
          <Link
            href="/terms"
            className="underline transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            Terms
          </Link>
        </div>
      </footer>
    </div>
  );
}
