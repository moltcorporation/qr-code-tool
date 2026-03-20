"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  plan: string;
}

export function BillingContent({ user }: { user: User }) {
  const router = useRouter();
  const [downgrading, setDowngrading] = useState(false);
  const [showDowngradeConfirm, setShowDowngradeConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSubscription = user.plan === "premium";
  const isOneTime = user.plan === "pro";
  const isPro = isSubscription || isOneTime;

  async function handleDowngrade() {
    setDowngrading(true);
    setError(null);
    try {
      const response = await fetch("/api/plan/downgrade", {
        method: "POST",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to downgrade plan");
      }
      const data = await response.json();
      setShowDowngradeConfirm(false);
      if (data.had_subscription) {
        alert(
          "Your Premium subscription has been cancelled and your plan has been downgraded to Free. You will not be charged further."
        );
      }
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred"
      );
      setDowngrading(false);
    }
  }

  function getPlanLabel() {
    if (isSubscription) return "Premium — Monthly subscription";
    if (isOneTime) return "Pro — One-time purchase";
    return "Free";
  }

  function getPlanPrice() {
    if (isSubscription) return "$5/mo";
    if (isOneTime) return "$9.99 (paid)";
    return "$0";
  }

  return (
    <div className="space-y-8">
      {/* Current Plan Section */}
      <div className="rounded-lg border border-zinc-200 bg-white p-8">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">
          Current Plan
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-600">Your plan</p>
            <p className="mt-1 text-2xl font-bold text-emerald-600 capitalize">
              {user.plan}
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              {getPlanLabel()}
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-700">
              {getPlanPrice()}
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              {isPro
                ? "You have access to all Pro features"
                : "Unlock Pro for dynamic QR codes"}
            </p>
          </div>
          {isPro ? (
            <div className="flex flex-col gap-2 items-end">
              <button
                onClick={() => setShowDowngradeConfirm(true)}
                disabled={downgrading}
                className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                {downgrading ? "Downgrading..." : "Downgrade to Free"}
              </button>
            </div>
          ) : (
            <a
              href={`https://buy.stripe.com/cNidR909l9SpcXP7Mo3Nm04?prefilled_email=${encodeURIComponent(user.email)}`}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Unlock Pro — $9.99 once
            </a>
          )}
        </div>
        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Downgrade Confirmation Modal */}
      {showDowngradeConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-zinc-900">
              Downgrade to Free?
            </h3>
            {isSubscription ? (
              <div className="mt-3 space-y-3">
                <p className="text-sm text-zinc-600">
                  This will remove your access to Pro features immediately and
                  cancel your Premium subscription.
                </p>
                <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3">
                  <p className="text-sm font-medium text-emerald-800">
                    Your Stripe subscription will be automatically cancelled
                  </p>
                  <p className="mt-1 text-sm text-emerald-700">
                    You will not be charged any further after downgrading. No
                    action on Stripe needed.
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm text-zinc-600">
                This will remove your access to Pro features. Since you
                made a one-time purchase, no recurring charges will apply.
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDowngradeConfirm(false)}
                className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDowngrade}
                disabled={downgrading}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {downgrading ? "Downgrading..." : "Yes, Downgrade"}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Features Comparison */}
      <div className="rounded-lg border border-zinc-200 bg-white p-8">
        <h2 className="text-lg font-semibold text-zinc-900 mb-6">
          Plan Features
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="px-4 py-3 text-left font-medium text-zinc-900">
                  Feature
                </th>
                <th className="px-4 py-3 text-center font-medium text-zinc-900">
                  Free
                </th>
                <th className="px-4 py-3 text-center font-medium text-zinc-900">
                  Pro
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-3 text-zinc-600">Create QR codes</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                </td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-3 text-zinc-600">
                  Edit after creation
                </td>
                <td className="px-4 py-3 text-center text-zinc-400">—</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                </td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-3 text-zinc-600">
                  Scan analytics
                </td>
                <td className="px-4 py-3 text-center text-zinc-400">—</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                </td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-3 text-zinc-600">
                  Download QR codes
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-600">Price</td>
                <td className="px-4 py-3 text-center font-semibold text-zinc-900">
                  Free
                </td>
                <td className="px-4 py-3 text-center font-semibold text-zinc-900">
                  $9.99 once
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Email */}
      <div className="rounded-lg border border-zinc-200 bg-white p-8">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">
          Account
        </h2>
        <div>
          <p className="text-sm text-zinc-600">Email address</p>
          <p className="mt-1 text-zinc-900">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
