"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          category: data.get("category"),
          intent: null,
          message: data.get("message"),
          page: "contact",
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500";

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="max-w-md px-4 text-center">
          <div className="rounded-xl border border-emerald-800 bg-emerald-950 p-8">
            <h1 className="text-2xl font-bold text-emerald-200">
              Message received!
            </h1>
            <p className="mt-2 text-emerald-300">
              We&apos;ll get back to you within 48 hours.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-sm text-emerald-400 hover:text-emerald-300"
            >
              &larr; Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-lg px-4 py-16">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-300"
        >
          &larr; Back
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-zinc-100">
          Contact Support
        </h1>
        <p className="mt-2 text-zinc-400">
          Need help with your account, billing, or QR codes? Send us a message
          and we&apos;ll respond within 48 hours.
        </p>

        <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm font-medium text-zinc-300">Email us directly</p>
          <a
            href="mailto:support@moltcorporation.com"
            className="mt-1 text-sm text-emerald-400 hover:text-emerald-300"
          >
            support@moltcorporation.com
          </a>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-800 bg-red-950 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Your name"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              What do you need help with?
            </label>
            <select name="category" id="category" required className={inputClass}>
              <option value="general">General question</option>
              <option value="billing">Billing &amp; subscription</option>
              <option value="bug">Something isn&apos;t working</option>
              <option value="feature">Feature request</option>
              <option value="account">Account &amp; login</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={4}
              placeholder="Tell us what you need help with..."
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm font-medium text-zinc-300">Common questions</p>
          <ul className="mt-2 space-y-2 text-sm text-zinc-400">
            <li>
              <Link href="/guides/wifi-qr-code" className="text-emerald-400 hover:text-emerald-300">
                WiFi QR guide
              </Link>
              {" "}&mdash; Generate WiFi QR codes
            </li>
            <li>
              <Link href="/pricing" className="text-emerald-400 hover:text-emerald-300">
                Pricing
              </Link>
              {" "}&mdash; Plans and billing
            </li>
            <li>
              <Link href="/terms" className="text-emerald-400 hover:text-emerald-300">
                Terms of service
              </Link>
              {" "}&mdash; Policies and subscriptions
            </li>
          </ul>
        </div>

        <div className="mt-8 border-t border-zinc-700 pt-6">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-3">
            More from Moltcorp
          </p>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <a
              href="https://federal-contract-tracker-moltcorporation.vercel.app"
              className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 hover:bg-zinc-800"
            >
              <p className="font-medium text-white">GovScout</p>
              <p className="text-xs text-zinc-400">Contract search</p>
            </a>
            <a
              href="https://breeder-platform-moltcorporation.vercel.app"
              className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 hover:bg-zinc-800"
            >
              <p className="font-medium text-white">PawPage</p>
              <p className="text-xs text-zinc-400">Breeder tools</p>
            </a>
            <a
              href="https://trades-quoting-tool-moltcorporation.vercel.app"
              className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 hover:bg-zinc-800"
            >
              <p className="font-medium text-white">TradeQuote</p>
              <p className="text-xs text-zinc-400">Quotes</p>
            </a>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/" className="text-sm text-zinc-400 hover:text-white">
              ← Back to OneQR
            </Link>
            <a
              href="mailto:support@moltcorporation.com"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Email: support@moltcorporation.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
