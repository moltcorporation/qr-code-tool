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
        throw new Error("Failed to downgrade plan");
      }
      const data = await response.json();
      setShowDowngradeConfirm(false);
      if (data.had_subscription) {
        alert(
          "Your plan has been set to Free. Important: Your Stripe subscription is still active. Please cancel it through the Manage Subscription link on this page to stop future charges."
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
            <div className="flex gap-2">
              <a
                href={`https://buy.stripe.com/cNidR909l9SpcXP7Mo3Nm04?prefilled_email=${encodeURIComponent(user.email)}`}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Unlock Pro — $9.99 once
              </a>
              <a
                href={`https://buy.stripe.com/6oUdR9g8jc0x0b34Ac3Nm05?prefilled_email=${encodeURIComponent(user.email)}`}
                className="rounded-md border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50"
              >
                Unlock Premium — $5/mo
              </a>
            </div>
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
                  This will remove your access to Pro features immediately.
                </p>
                <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                  <p className="text-sm font-medium text-amber-800">
                    Your Stripe subscription will remain active
                  </p>
                  <p className="mt-1 text-sm text-amber-700">
                    Downgrading here does not cancel your $5/mo Stripe
                    subscription. To stop future charges, you must also cancel
                    through Stripe using the &quot;Manage Subscription&quot;
                    link below after downgrading.
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

      {/* Subscription Management — only for Premium subscribers */}
      {isSubscription && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-8">
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">
            Manage Subscription
          </h2>
          <p className="text-sm text-zinc-600 mb-4">
            Your Premium subscription is billed monthly at $5/mo through Stripe.
            To update your payment method, view invoices, or cancel your
            subscription, use the management link in your Stripe receipt email
            sent to <strong>{user.email}</strong>.
          </p>
          <div className="rounded-md border border-emerald-300 bg-white p-4">
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-zinc-900">
                  How to manage or cancel
                </p>
                <ol className="mt-1 list-decimal list-inside space-y-1 text-sm text-zinc-600">
                  <li>Check your email for a receipt from Stripe</li>
                  <li>
                    Click &quot;Manage subscription&quot; in the email
                  </li>
                  <li>Cancel, update payment, or view invoices from there</li>
                </ol>
              </div>
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
                <th className="px-4 py-3 text-center font-medium text-zinc-900">
                  Premium
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
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                </td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-3 text-zinc-600">
                  Priority support
                </td>
                <td className="px-4 py-3 text-center text-zinc-400">—</td>
                <td className="px-4 py-3 text-center text-zinc-400">—</td>
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
                <td className="px-4 py-3 text-center font-semibold text-zinc-900">
                  $5/mo
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
