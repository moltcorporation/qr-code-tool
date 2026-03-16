"use client";

import { useState } from "react";
import Link from "next/link";

type Tab = "url" | "wifi";
type Format = "svg" | "png";

const EC_LEVELS = [
  { value: "L", label: "Low (7%)" },
  { value: "M", label: "Medium (15%)" },
  { value: "Q", label: "Quartile (25%)" },
  { value: "H", label: "High (30%)" },
];

const WIFI_ENCRYPTIONS = ["WPA", "WEP", "nopass"];

const features = [
  {
    title: "Static QR Codes",
    description:
      "Generate QR codes for any URL. Download as SVG or PNG. Free, no limits.",
  },
  {
    title: "WiFi QR Codes",
    description:
      "Create QR codes for WiFi networks. Guests scan to connect instantly.",
  },
  {
    title: "Dynamic QR Codes",
    badge: "Pro",
    description:
      "Edit where your QR code points after printing. Never reprint again.",
  },
  {
    title: "Scan Analytics",
    badge: "Pro",
    description:
      "Track every scan: when, where, what device. See which QR codes perform.",
  },
  {
    title: "Custom Colors",
    description:
      "Match your QR code to your brand. Pick foreground and background colors.",
  },
  {
    title: "Print-Ready SVG",
    description:
      "Download as SVG for perfect quality at any size. Business cards to billboards.",
  },
];

export default function Home() {
  const [tab, setTab] = useState<Tab>("url");
  const [url, setUrl] = useState("");
  const [ssid, setSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [svgData, setSvgData] = useState("");
  const [pngDataUrl, setPngDataUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function getData(): string {
    if (tab === "wifi") {
      return `WIFI:T:${encryption};S:${ssid};P:${wifiPassword};;`;
    }
    return url;
  }

  async function handleGenerate() {
    const data = getData();
    if (!data || (tab === "url" && !url.trim()) || (tab === "wifi" && !ssid.trim())) {
      setError(tab === "url" ? "Enter a URL" : "Enter a network name");
      return;
    }

    setLoading(true);
    setError("");
    setSvgData("");
    setPngDataUrl("");

    try {
      // Fetch SVG
      const svgRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          format: "svg",
          fgColor,
          bgColor,
          errorCorrection,
        }),
      });

      if (!svgRes.ok) throw new Error("Generation failed");
      const svg = await svgRes.text();
      setSvgData(svg);

      // Fetch PNG
      const pngRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          format: "png",
          fgColor,
          bgColor,
          errorCorrection,
        }),
      });

      if (!pngRes.ok) throw new Error("PNG generation failed");
      const pngJson = await pngRes.json();
      setPngDataUrl(pngJson.dataUrl);
    } catch {
      setError("Failed to generate QR code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function downloadSvg() {
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qdot-qr.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadPng() {
    const a = document.createElement("a");
    a.href = pngDataUrl;
    a.download = "qdot-qr.png";
    a.click();
  }

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-600">Q</span>dot
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/pricing"
              className="text-sm text-zinc-600 hover:text-zinc-900"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-sm text-zinc-600 hover:text-zinc-900"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero + Generator */}
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Free QR Code Generator
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600">
          Generate QR codes instantly. Static codes are free forever. No signup
          required.
        </p>

        {/* Generator */}
        <div className="mx-auto mt-10 max-w-lg text-left">
          {/* Tabs */}
          <div className="flex border-b border-zinc-200">
            <button
              onClick={() => setTab("url")}
              className={`px-4 py-2.5 text-sm font-medium ${tab === "url" ? "border-b-2 border-emerald-600 text-emerald-600" : "text-zinc-500 hover:text-zinc-700"}`}
            >
              URL
            </button>
            <button
              onClick={() => setTab("wifi")}
              className={`px-4 py-2.5 text-sm font-medium ${tab === "wifi" ? "border-b-2 border-emerald-600 text-emerald-600" : "text-zinc-500 hover:text-zinc-700"}`}
            >
              WiFi
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {/* URL input */}
            {tab === "url" && (
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            )}

            {/* WiFi inputs */}
            {tab === "wifi" && (
              <>
                <input
                  type="text"
                  value={ssid}
                  onChange={(e) => setSsid(e.target.value)}
                  placeholder="Network name (SSID)"
                  className="w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <input
                  type="text"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <select
                  value={encryption}
                  onChange={(e) => setEncryption(e.target.value)}
                  className="w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
                >
                  {WIFI_ENCRYPTIONS.map((enc) => (
                    <option key={enc} value={enc}>
                      {enc === "nopass" ? "No password" : enc}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* Options row */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs text-zinc-500">Color</label>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded border border-zinc-300"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-zinc-500">Background</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded border border-zinc-300"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-zinc-500">Error correction</label>
                <select
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value)}
                  className="rounded border border-zinc-300 px-2 py-1 text-xs outline-none focus:border-emerald-500"
                >
                  {EC_LEVELS.map((ec) => (
                    <option key={ec.value} value={ec.value}>
                      {ec.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate QR Code"}
            </button>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>

          {/* QR Preview + Downloads */}
          {svgData && (
            <div className="mt-6 flex flex-col items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-6">
              <div
                className="h-48 w-48"
                dangerouslySetInnerHTML={{ __html: svgData }}
              />
              <div className="flex gap-3">
                <button
                  onClick={downloadSvg}
                  className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                >
                  Download SVG
                </button>
                {pngDataUrl && (
                  <button
                    onClick={downloadPng}
                    className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                  >
                    Download PNG
                  </button>
                )}
              </div>
              <p className="text-xs text-zinc-400">
                Free. No watermark. Print-ready SVG.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Feature grid */}
      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Everything you need to create QR codes
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-zinc-900">
                    {feature.title}
                  </h3>
                  {feature.badge && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      {feature.badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-zinc-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          No subscription required
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-600">
          Static QR codes are free forever. Upgrade once for $9.99 to unlock
          dynamic codes and analytics. No monthly fees.
        </p>
        <Link
          href="/pricing"
          className="mt-6 inline-block rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
        >
          View pricing
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-950 text-zinc-400">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Moltcorp Products
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <span className="font-medium text-white">Qdot</span>{" "}
                  <span className="text-zinc-600">— QR Code Generator</span>
                </li>
                <li>
                  <a
                    href="https://statusping-moltcorporation.vercel.app"
                    className="hover:text-white"
                  >
                    StatusPing
                  </a>
                </li>
                <li>
                  <a
                    href="https://domain-audit-tool-moltcorporation.vercel.app"
                    className="hover:text-white"
                  >
                    Recon
                  </a>
                </li>
                <li>
                  <a
                    href="https://federal-contract-tracker-moltcorporation.vercel.app"
                    className="hover:text-white"
                  >
                    Federal Contract Tracker
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-sm sm:text-right">
              <p className="text-zinc-500">
                Built by agents at{" "}
                <a
                  href="https://moltcorporation.com"
                  className="text-zinc-300 hover:text-white"
                >
                  Moltcorp
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
