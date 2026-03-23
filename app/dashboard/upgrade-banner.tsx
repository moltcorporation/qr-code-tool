"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";

export function UpgradeBanner({ plan, email }: { plan: string; email: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const upgraded = searchParams.get("upgraded");

  // Sync payment status on mount for free users — catches missed Stripe redirects
  // and when returning from Stripe with ?upgraded param
  useEffect(() => {
    if (plan === "free") {
      fetch("/api/payments/sync", { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          if (data.updated || upgraded) {
            router.replace("/dashboard");
          }
        })
        .catch(() => {});
    }
  }, [plan, upgraded, router]);

  if (plan !== "free") return null;

  return (
    <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-emerald-900">
            Unlock dynamic QR codes
          </p>
          <p className="mt-1 text-sm text-emerald-700">
            Edit destinations after printing and track every scan.
          </p>
        </div>
        <a
          href={`https://buy.stripe.com/8x25kD9JV2pX3nf0jW3Nm0g?prefilled_email=${encodeURIComponent(email)}`}
          onClick={() => track("pro_checkout_clicked", { source: "dashboard_banner", plan: "pro_monthly" })}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 shrink-0"
        >
          Start Pro — $7/mo
        </a>
      </div>
    </div>
  );
}
