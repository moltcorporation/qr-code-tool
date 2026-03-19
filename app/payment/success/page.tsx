"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [syncing, setSyncing] = useState(true);
  const [plan, setPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    async function syncPlan() {
      try {
        const res = await fetch("/api/payments/sync", { method: "POST" });
        if (!res.ok) throw new Error("Failed to sync plan");
        const data = await res.json();
        setPlan(data.plan);
      } catch {
        setError("We couldn't confirm your plan right now. Don't worry — your payment was received. Head to your dashboard and it should appear shortly.");
      } finally {
        setSyncing(false);
      }
    }
    syncPlan();
  }, []);

  useEffect(() => {
    if (syncing) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [syncing, router]);

  const planLabel =
    plan === "premium" ? "Premium" : plan === "pro" ? "Pro" : plan ?? "Pro";

  const features = [
    "Dynamic QR codes — edit the destination after printing",
    "Scan analytics — count, timestamps, and referrer data",
    "Remove OneQR branding from downloads",
    "Custom colors with live preview",
    ...(plan === "premium"
      ? ["Cancel anytime — no commitment", "Priority support"]
      : []),
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            <span className="text-emerald-600">One</span>QR
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center">
            {syncing ? (
              <>
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-emerald-600" />
                <p className="text-sm text-zinc-600">Confirming your payment...</p>
              </>
            ) : (
              <>
                {/* Success checkmark */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                  <svg
                    className="h-8 w-8 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>

                <h1 className="mb-2 text-2xl font-bold text-zinc-900">
                  Upgrade Successful!
                </h1>
                <p className="mb-6 text-sm text-zinc-600">
                  Welcome to {planLabel}! Here's what you've unlocked:
                </p>

                {error && (
                  <p className="mb-4 rounded-md bg-amber-50 p-3 text-xs text-amber-700">
                    {error}
                  </p>
                )}

                {/* Unlocked features */}
                <ul className="mb-8 space-y-3 text-left">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-zinc-600">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/dashboard"
                  className="inline-block w-full rounded-lg bg-emerald-600 px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Create Your First Dynamic QR
                </Link>

                <p className="mt-4 text-xs text-zinc-400">
                  Redirecting to dashboard in {countdown}s...
                </p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
