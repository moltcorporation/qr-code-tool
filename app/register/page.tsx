"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { track } from "@vercel/analytics";

export default function RegisterPage() {
  const router = useRouter();
  const utmSource =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("utm_source")
      : null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, ...(utmSource && { utm_source: utmSource }) }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      track("signup_completed");
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 block text-center text-xl font-bold tracking-tight">
          <span className="text-emerald-600">One</span>QR
        </Link>

        <h1 className="text-center text-2xl font-bold text-zinc-900">
          Create an account
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-500">
          Start with free static QR codes and unlimited scans
        </p>

        {/* Trust badges */}
        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            No credit card
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Free forever
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Upgrade anytime
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          {error && (
            <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              placeholder="At least 8 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create free account"}
          </button>
        </form>

        {/* What happens next */}
        <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <p className="mb-3 text-center text-xs font-medium text-zinc-600">
            After signup you'll access:
          </p>
          <div className="space-y-2 text-xs text-zinc-600">
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">1</span>
              <span>Generate unlimited free static QR codes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">2</span>
              <span>View detailed scan analytics and insights</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">3</span>
              <span>Upgrade to dynamic QR codes when ready</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
