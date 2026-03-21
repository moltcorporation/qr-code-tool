"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const COLOR_PRESETS = [
  { name: "Classic", fg: "#000000", bg: "#ffffff" },
  { name: "Emerald", fg: "#059669", bg: "#ecfdf5" },
  { name: "Navy", fg: "#1e3a5f", bg: "#f0f4f8" },
  { name: "Crimson", fg: "#dc2626", bg: "#fff1f2" },
  { name: "Purple", fg: "#7c3aed", bg: "#f5f3ff" },
  { name: "Sunset", fg: "#ea580c", bg: "#fff7ed" },
];

export function CreateQRForm({ plan }: { plan: string }) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showStyles, setShowStyles] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isPremium = plan === "premium";

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinationUrl: url.trim(),
          title: title.trim() || undefined,
          fgColor,
          bgColor,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create");
        return;
      }

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

      {/* Branded style options */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowStyles(!showStyles)}
          className="text-xs text-emerald-600 hover:text-emerald-700"
        >
          {showStyles ? "Hide styles" : "Customize colors"}
          {!isPremium && " (Pro)"}
        </button>
      </div>

      {showStyles && (
        <div className="rounded-md border border-zinc-100 bg-zinc-50 p-4">
          {!isPremium ? (
            <p className="text-xs text-zinc-500">
              Custom branded styles require the Pro plan ($7/mo).{" "}
              <a href="/pricing" className="text-emerald-600 hover:underline">Upgrade</a>
            </p>
          ) : (
            <>
              <p className="text-xs font-medium text-zinc-600 mb-3">Color presets</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => { setFgColor(preset.fg); setBgColor(preset.bg); }}
                    className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs ${
                      fgColor === preset.fg && bgColor === preset.bg
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-sm border border-zinc-200"
                      style={{ backgroundColor: preset.fg }}
                    />
                    {preset.name}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs text-zinc-600">
                  Foreground
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="h-7 w-7 rounded border border-zinc-200 p-0.5"
                  />
                  <span className="font-mono text-zinc-400">{fgColor}</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-zinc-600">
                  Background
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-7 w-7 rounded border border-zinc-200 p-0.5"
                  />
                  <span className="font-mono text-zinc-400">{bgColor}</span>
                </label>
              </div>
            </>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
