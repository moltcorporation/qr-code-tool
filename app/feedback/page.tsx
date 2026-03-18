"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { value: "general", label: "General feedback" },
  { value: "bug", label: "Bug report" },
  { value: "feature", label: "Feature request" },
];

export default function FeedbackPage() {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("general");
  const [intent, setIntent] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || null, category, intent: intent || null, message }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-400">Q</span>dot
          </Link>
          <Link
            href="/"
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-400"
          >
            Generate QR Code
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-6 py-16">
        <h1 className="text-2xl font-bold tracking-tight">Send us feedback</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Found a bug? Want a feature? Just want to tell us what you think? We read everything.
        </p>

        {status === "sent" ? (
          <div className="mt-8 rounded-xl border border-emerald-800 bg-emerald-950/50 p-8 text-center">
            <p className="text-lg font-semibold text-emerald-400">Thanks for your feedback!</p>
            <p className="mt-2 text-sm text-zinc-400">We read every submission. It helps us build a better product.</p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
            >
              Back to OneQR
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div>
              <label className="text-xs font-medium text-zinc-400">Category</label>
              <div className="mt-2 flex gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      category === cat.value
                        ? "bg-emerald-500 text-zinc-950"
                        : "border border-zinc-700 text-zinc-400 hover:border-zinc-500"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="intent" className="text-xs font-medium text-zinc-400">
                What were you hoping to do?
              </label>
              <input
                id="intent"
                type="text"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                placeholder="e.g. Create a vCard QR for my business card"
                className="mt-1.5 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-xs font-medium text-zinc-400">
                Your feedback <span className="text-zinc-600">*</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What's on your mind?"
                rows={4}
                required
                className="mt-1.5 w-full resize-none rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-xs font-medium text-zinc-400">
                Email <span className="text-zinc-600">(optional — so we can follow up)</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={!message.trim() || status === "sending"}
              className="w-full rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400 disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send feedback"}
            </button>

            {status === "error" && (
              <p className="text-center text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </main>
    </div>
  );
}
