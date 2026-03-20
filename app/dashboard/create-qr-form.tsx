"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";

export function CreateQRForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destinationUrl: url.trim(), title: title.trim() || undefined }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create");
        return;
      }

      track('qr_generated', { type: 'dynamic' });
      setUrl("");
      setTitle("");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleCreate} className="mt-6 flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex gap-3">
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Label (optional)"
          className="w-40 rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create dynamic QR"}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
