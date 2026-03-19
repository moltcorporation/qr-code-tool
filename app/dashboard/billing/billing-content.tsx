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
  const [error, setError] = useState<string | null>(null);

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
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred"
      );
      setDowngrading(false);
    }
  }

  const isPro = user.plan === "pro" || user.plan === "premium";

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
            <p className="mt-2 text-sm text-zinc-600">
              {isPro
                ? "You have access to all Pro features"
                : "Upgrade to Pro to unlock dynamic QR codes"}
            </p>
          </div>
          {isPro ? (
            <button
              onClick={handleDowngrade}
              disabled={downgrading}
              className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              {downgrading ? "Downgrading..." : "Downgrade to Free"}
            </button>
          ) : (
            <div className="flex gap-2">
              <a
                href={`https://buy.stripe.com/cNidR909l9SpcXP7Mo3Nm04?prefilled_email=${encodeURIComponent(user.email)}`}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Pro — $9.99 once
              </a>
              <a
                href={`https://buy.stripe.com/6oUdR9g8jc0x0b34Ac3Nm05?prefilled_email=${encodeURIComponent(user.email)}`}
                className="rounded-md border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50"
              >
                Premium — $5/mo
              </a>
            </div>
          )}
        </div>
        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
      </div>

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
