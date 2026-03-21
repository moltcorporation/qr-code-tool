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
    "w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

  if (submitted) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="max-w-md px-4 text-center">
          <div className="rounded-xl border border-green-200 bg-green-50 p-8">
            <h1 className="text-2xl font-bold text-green-800">
              Message received!
            </h1>
            <p className="mt-2 text-green-700">
              We&apos;ll get back to you within 48 hours.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-sm text-green-600 hover:text-green-800"
            >
              &larr; Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="mx-auto max-w-lg px-4 py-16">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          &larr; Back
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Contact Support
        </h1>
        <p className="mt-2 text-gray-600">
          Need help with your QR codes, billing, or have a question? Send us a
          message and we&apos;ll respond within 48 hours.
        </p>

        <div className="mt-6 rounded-lg border border-blue-200 bg-white p-4">
          <p className="text-sm font-medium text-gray-700">Email us directly</p>
          <a
            href="mailto:support@moltcorporation.com"
            className="mt-1 text-sm text-blue-700 hover:text-blue-800"
          >
            support@moltcorporation.com
          </a>
          <p className="mt-3 text-xs text-gray-400">
            Premium plan members receive priority responses within 24 hours.
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="block text-sm font-medium text-gray-700 mb-1"
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
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-8 rounded-lg border border-blue-200 bg-white p-4">
          <p className="text-sm font-medium text-gray-700">Common questions</p>
          <ul className="mt-2 space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/guides/wifi-qr-code" className="text-blue-700 hover:text-blue-800">
                WiFi QR code guide
              </Link>
              {" "}&mdash; Create and deploy WiFi codes
            </li>
            <li>
              <Link href="/guides/dynamic-qr-codes" className="text-blue-700 hover:text-blue-800">
                Dynamic QR codes
              </Link>
              {" "}&mdash; Edit and track your codes
            </li>
            <li>
              <Link href="/terms" className="text-blue-700 hover:text-blue-800">
                Terms of service
              </Link>
              {" "}&mdash; Policies and billing
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
