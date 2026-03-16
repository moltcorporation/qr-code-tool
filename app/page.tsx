"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Tab = "url" | "wifi";

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
      "Paste a URL, get a QR code. Download as SVG or PNG. Unlimited. Free.",
    free: true,
  },
  {
    title: "WiFi QR Codes",
    description:
      "Guests scan, they're connected. No more spelling out passwords.",
    free: true,
  },
  {
    title: "Dynamic QR Codes",
    description:
      "Change where it points after you print. The QR stays the same. The destination doesn't have to.",
    free: false,
  },
  {
    title: "Scan Analytics",
    description:
      "Every scan logged: when, where, what device. Know which codes actually get used.",
    free: false,
  },
  {
    title: "Your Colors",
    description:
      "Match your brand. Pick any foreground and background color. It's your code.",
    free: true,
  },
  {
    title: "Print-Ready SVG",
    description:
      "Vector output that looks sharp on a business card or a billboard. No pixels, no problems.",
    free: true,
  },
];

const competitors = [
  { name: "QR TIGER", price: "$7/mo", annual: "$84/yr" },
  { name: "Uniqode", price: "$5/mo", annual: "$60/yr" },
  { name: "Bitly QR", price: "$35/mo", annual: "$420/yr" },
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
  const [totalCodes, setTotalCodes] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => d && setTotalCodes(d.totalCodes))
      .catch(() => {});
  }, []);

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
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "qdot-qr.svg";
    a.click();
    URL.revokeObjectURL(blobUrl);
  }

  function downloadPng() {
    const a = document.createElement("a");
    a.href = pngDataUrl;
    a.download = "qdot-qr.png";
    a.click();
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-400">Q</span>dot
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/pricing"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-400"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-20 text-center">
        <div className="flex items-center justify-center gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            No subscription. Ever.
          </p>
          {totalCodes !== null && totalCodes > 0 && (
            <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
              {totalCodes.toLocaleString()} QR codes generated
            </span>
          )}
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          QR codes without the{" "}
          <span className="text-zinc-500 line-through">monthly bill</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Other tools charge you every month for something that should be free.
          Qdot gives you unlimited static QR codes at no cost. Need dynamic
          codes? Pay once. Done.
        </p>

        {/* Competitor comparison */}
        <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
          {competitors.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5"
            >
              <span className="text-zinc-500">{c.name}</span>
              <span className="font-medium text-red-400 line-through">
                {c.price}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2 rounded-full border border-emerald-800 bg-emerald-950 px-4 py-1.5">
            <span className="text-emerald-300">Qdot</span>
            <span className="font-bold text-emerald-400">$9.99 once</span>
          </div>
        </div>
      </section>

      {/* Generator */}
      <section className="mx-auto max-w-lg px-6 pb-20 pt-12">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-emerald-500/5">
          {/* Tabs */}
          <div className="flex border-b border-zinc-800">
            <button
              onClick={() => setTab("url")}
              className={`px-4 py-2.5 text-sm font-medium ${tab === "url" ? "border-b-2 border-emerald-400 text-emerald-400" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              URL
            </button>
            <button
              onClick={() => setTab("wifi")}
              className={`px-4 py-2.5 text-sm font-medium ${tab === "wifi" ? "border-b-2 border-emerald-400 text-emerald-400" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              WiFi
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {tab === "url" && (
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            )}

            {tab === "wifi" && (
              <>
                <input
                  type="text"
                  value={ssid}
                  onChange={(e) => setSsid(e.target.value)}
                  placeholder="Network name (SSID)"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <input
                  type="text"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <select
                  value={encryption}
                  onChange={(e) => setEncryption(e.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
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
                  className="h-8 w-8 cursor-pointer rounded border border-zinc-700 bg-zinc-800"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-zinc-500">Background</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded border border-zinc-700 bg-zinc-800"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-zinc-500">Error correction</label>
                <select
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value)}
                  className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-white outline-none focus:border-emerald-500"
                >
                  {EC_LEVELS.map((ec) => (
                    <option key={ec.value} value={ec.value}>
                      {ec.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate QR Code"}
            </button>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
          </div>

          {/* QR Preview + Downloads */}
          {svgData && (
            <div className="mt-6 flex flex-col items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950 p-6">
              <div
                className="h-48 w-48 rounded-lg bg-white p-3"
                dangerouslySetInnerHTML={{ __html: svgData }}
              />
              <div className="flex gap-3">
                <button
                  onClick={downloadSvg}
                  className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
                >
                  Download SVG
                </button>
                {pngDataUrl && (
                  <button
                    onClick={downloadPng}
                    className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
                  >
                    Download PNG
                  </button>
                )}
              </div>
              <p className="text-xs text-zinc-600">
                Free. No watermark. No signup. Yours.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Trust badges */}
      <section className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-4 px-6 pb-16">
        <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
          <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          No signup required
        </div>
        <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
          <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          One-time payment, not monthly
        </div>
        <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
          <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          No watermark on downloads
        </div>
      </section>

      {/* Use cases */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            QR codes that work after you print them
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Dynamic QR codes let you change the destination anytime. No
            reprinting. No wasted materials.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Restaurant menus",
                desc: "Update your menu QR without reprinting table cards. Seasonal specials? Just change the link.",
                icon: "M3 3h18v18H3V3zm3 6h12m-12 4h8",
              },
              {
                title: "Business cards",
                desc: "Switch jobs or update your portfolio? Your QR code still works. Same card, new destination.",
                icon: "M15 9h3m-3 3h3m-3 3h3M6 9h.01M6 12h.01M6 15h.01M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z",
              },
              {
                title: "Event marketing",
                desc: "Track which flyers, posters, or ads drive the most scans. Real data, not guesses.",
                icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z",
              },
              {
                title: "Product packaging",
                desc: "Redirect to seasonal campaigns, new product launches, or updated instructions. One code, infinite uses.",
                icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
              },
            ].map((uc) => (
              <div
                key={uc.title}
                className="flex gap-4 rounded-lg border border-zinc-800 bg-zinc-950 p-6"
              >
                <svg
                  className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={uc.icon}
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-white">{uc.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="border-t border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Everything. No gotchas.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-zinc-500">
            Most QR tools gate basic features behind paywalls. We don't.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-6"
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">
                    {feature.title}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      feature.free
                        ? "bg-emerald-950 text-emerald-400"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {feature.free ? "Free" : "Pro"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-500">
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
          Pay once. Use forever.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Static QR codes are free. Unlimited. No account needed. When you
          want dynamic codes and scan analytics, it&apos;s a one-time $9.99
          upgrade. Not $9.99/month. Not $9.99/year. Once.
        </p>
        <Link
          href="/pricing"
          className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          See pricing
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Moltcorp Products
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <span className="font-medium text-emerald-400">Qdot</span>{" "}
                  <span className="text-zinc-600">— QR Code Generator</span>
                </li>
                <li>
                  <a
                    href="https://statusping-moltcorporation.vercel.app"
                    className="text-zinc-500 hover:text-white"
                  >
                    StatusPing
                  </a>
                </li>
                <li>
                  <a
                    href="https://domain-audit-tool-moltcorporation.vercel.app"
                    className="text-zinc-500 hover:text-white"
                  >
                    Recon
                  </a>
                </li>
                <li>
                  <a
                    href="https://federal-contract-tracker-moltcorporation.vercel.app"
                    className="text-zinc-500 hover:text-white"
                  >
                    Federal Contract Tracker
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-sm sm:text-right">
              <p className="text-zinc-600">
                Built by agents at{" "}
                <a
                  href="https://moltcorporation.com"
                  className="text-zinc-400 hover:text-white"
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
