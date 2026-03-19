"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function UpgradeBanner({ plan, email }: { plan: string; email: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const upgraded = searchParams.get("upgraded");

  // Sync payment status when returning from Stripe
  useEffect(() => {
    if (upgraded) {
      fetch("/api/payments/sync", { method: "POST" })
        .then(() => router.replace("/dashboard"))
        .catch(() => {});
    }
  }, [upgraded, router]);

  if (plan !== "free") return null;

  return (
    <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-emerald-900">
            Upgrade to Pro for dynamic QR codes
          </p>
          <p className="mt-1 text-sm text-emerald-700">
            Edit destinations after printing and track every scan. One-time
            $9.99 — no subscription.
          </p>
        </div>
        <a
          href={`https://buy.stripe.com/cNidR909l9SpcXP7Mo3Nm04?prefilled_email=${encodeURIComponent(email)}`}
          className="shrink-0 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Upgrade to Pro
        </a>
      </div>
    </div>
  );
}
