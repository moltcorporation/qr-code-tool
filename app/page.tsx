"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TrustBar } from "@/lib/components/TrustBar";

type Tab = "url" | "wifi" | "vcard" | "text";

const EC_LEVELS = [
  { value: "L", label: "Low (7%)" },
  { value: "M", label: "Medium (15%)" },
  { value: "Q", label: "Quartile (25%)" },
  { value: "H", label: "High (30%)" },
];

const WIFI_ENCRYPTIONS = ["WPA", "WEP", "nopass"];

const features = [
  {
    title: "Restaurant menus that update",
    description:
      "Change your seasonal menu without reprinting table cards. One QR code, unlimited menu updates.",
    free: false,
  },
  {
    title: "WiFi without the awkward ask",
    description:
      "Guests scan, they're connected. No spelling out passwords. Perfect for cafes, Airbnbs, and offices.",
    free: true,
  },
  {
    title: "Business cards that never expire",
    description:
      "Switch jobs or update your portfolio? Same card, new destination. Your QR code follows your career.",
    free: false,
  },
  {
    title: "Know which flyers actually work",
    description:
      "Every scan logged: when, where, what device. Stop guessing which marketing materials drive foot traffic.",
    free: false,
  },
  {
    title: "Brand colors, not generic black",
    description:
      "Match your brand. Your QR code should look like it belongs on your packaging, not a lab report.",
    free: true,
  },
  {
    title: "Billboard to business card",
    description:
      "Print-ready SVG that looks sharp at any size. No pixels, no blurry scans, no reprints.",
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
  const [vcFirstName, setVcFirstName] = useState("");
  const [vcLastName, setVcLastName] = useState("");
  const [vcPhone, setVcPhone] = useState("");
  const [vcEmail, setVcEmail] = useState("");
  const [vcCompany, setVcCompany] = useState("");
  const [vcTitle, setVcTitle] = useState("");
  const [vcWebsite, setVcWebsite] = useState("");
  const [plainText, setPlainText] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [svgData, setSvgData] = useState("");
  const [pngDataUrl, setPngDataUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalCodes, setTotalCodes] = useState<number | null>(null);
  const [demoSvg, setDemoSvg] = useState("");

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => d && setTotalCodes(d.totalCodes))
      .catch(() => {});

    // Load demo QR code on mount
    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: "https://oneqr.sh",
        format: "svg",
        fgColor: "#000000",
        bgColor: "#ffffff",
        errorCorrection: "M",
      }),
    })
      .then((r) => r.ok ? r.text() : null)
      .then((svg) => svg && setDemoSvg(svg))
      .catch(() => {});
  }, []);

  function getData(): string {
    if (tab === "wifi") {
      return `WIFI:T:${encryption};S:${ssid};P:${wifiPassword};;`;
    }
    if (tab === "vcard") {
      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${vcLastName};${vcFirstName};;;`,
        `FN:${vcFirstName} ${vcLastName}`,
      ];
      if (vcPhone) lines.push(`TEL:${vcPhone}`);
      if (vcEmail) lines.push(`EMAIL:${vcEmail}`);
      if (vcCompany) lines.push(`ORG:${vcCompany}`);
      if (vcTitle) lines.push(`TITLE:${vcTitle}`);
      if (vcWebsite) lines.push(`URL:${vcWebsite}`);
      lines.push("END:VCARD");
      return lines.join("\n");
    }
    if (tab === "text") {
      return plainText;
    }
    return url;
  }

  async function handleGenerate() {
    const data = getData();
    const isEmpty =
      (tab === "url" && !url.trim()) ||
      (tab === "wifi" && !ssid.trim()) ||
      (tab === "vcard" && !vcFirstName.trim() && !vcLastName.trim()) ||
      (tab === "text" && !plainText.trim()) ||
      !data;
    if (isEmpty) {
      const messages: Record<Tab, string> = {
        url: "Enter a URL",
        wifi: "Enter a network name",
        vcard: "Enter at least a first or last name",
        text: "Enter some text",
      };
      setError(messages[tab]);
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
    a.download = "oneqr-qr.svg";
    a.click();
    URL.revokeObjectURL(blobUrl);
  }

  function downloadPng() {
    const a = document.createElement("a");
    a.href = pngDataUrl;
    a.download = "oneqr-qr.png";
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
          Print once.{" "}
          <span className="text-emerald-400">Update forever.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Your restaurant menu changes. Your business card doesn&apos;t have to.
          Create QR codes that point wherever you need — and change the
          destination anytime, even after printing. Free for static codes.
          One-time $9.99 for dynamic.
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
            <span className="text-emerald-300">OneQR</span>
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
            <button
              onClick={() => setTab("vcard")}
              className={`px-4 py-2.5 text-sm font-medium ${tab === "vcard" ? "border-b-2 border-emerald-400 text-emerald-400" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              vCard
            </button>
            <button
              onClick={() => setTab("text")}
              className={`px-4 py-2.5 text-sm font-medium ${tab === "text" ? "border-b-2 border-emerald-400 text-emerald-400" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              Text
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

            {tab === "vcard" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={vcFirstName}
                    onChange={(e) => setVcFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <input
                    type="text"
                    value={vcLastName}
                    onChange={(e) => setVcLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <input
                  type="tel"
                  value={vcPhone}
                  onChange={(e) => setVcPhone(e.target.value)}
                  placeholder="Phone"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <input
                  type="email"
                  value={vcEmail}
                  onChange={(e) => setVcEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={vcCompany}
                    onChange={(e) => setVcCompany(e.target.value)}
                    placeholder="Company"
                    className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <input
                    type="text"
                    value={vcTitle}
                    onChange={(e) => setVcTitle(e.target.value)}
                    placeholder="Job title"
                    className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <input
                  type="url"
                  value={vcWebsite}
                  onChange={(e) => setVcWebsite(e.target.value)}
                  placeholder="Website (optional)"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </>
            )}

            {tab === "text" && (
              <textarea
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="Enter text to encode..."
                rows={3}
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
              />
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
          {svgData ? (
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
          ) : demoSvg && !loading ? (
            <div className="mt-6 flex flex-col items-center gap-3 rounded-lg border border-dashed border-zinc-700 bg-zinc-950/50 p-6">
              <p className="text-xs font-medium text-zinc-500">Preview</p>
              <div
                className="h-36 w-36 rounded-lg bg-white p-2.5 opacity-75"
                dangerouslySetInnerHTML={{ __html: demoSvg }}
              />
              <p className="text-xs text-zinc-600">
                Enter a URL above and hit Generate to create yours
              </p>
            </div>
          ) : null}
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

      {/* Dynamic QR explainer */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Same QR code. New destination. No reprinting.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            This is what makes dynamic QR codes worth $9.99.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-950 text-sm font-bold text-emerald-400">
                1
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white">
                <svg className="h-10 w-10 text-zinc-800" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="3" height="3" />
                  <rect x="18" y="14" width="3" height="3" />
                  <rect x="14" y="18" width="3" height="3" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Print the QR code</p>
                <p className="mt-1 text-xs text-zinc-500">
                  On menus, flyers, business cards — anywhere
                </p>
              </div>
              <div className="rounded-md bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400">
                Points to → <span className="text-emerald-400">spring-menu.pdf</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-4 rounded-xl border border-emerald-800/50 bg-emerald-950/30 p-6 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-950 text-sm font-bold text-emerald-400">
                2
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800">
                <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Update the URL</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Change the destination in your OneQR dashboard. Takes 5 seconds.
                </p>
              </div>
              <div className="rounded-md bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400">
                <span className="text-zinc-600 line-through">spring-menu.pdf</span>
                {" → "}
                <span className="text-emerald-400">summer-menu.pdf</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-950 text-sm font-bold text-emerald-400">
                3
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white">
                <svg className="h-10 w-10 text-zinc-800" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="3" height="3" />
                  <rect x="18" y="14" width="3" height="3" />
                  <rect x="14" y="18" width="3" height="3" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Same code, new page</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Customers scan the same printed QR — it now opens the new destination.
                </p>
              </div>
              <div className="rounded-md bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400">
                Points to → <span className="text-emerald-400">summer-menu.pdf</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <p className="text-sm text-zinc-400">
              No reprinting. No new QR code. Just update the link.
            </p>
            <Link
              href="/pricing"
              className="rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
            >
              Get dynamic QR codes — $9.99 once
            </Link>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            One code. Infinite updates.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Print your QR code on menus, flyers, packaging, or business cards.
            When things change, update the destination — not the print run.
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
            Built for how you actually use QR codes
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-zinc-500">
            Real use cases, not feature checkboxes. Free features stay free.
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

      {/* Analytics preview — show what Pro includes */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Track every scan. Know what&apos;s working.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Pro includes scan analytics so you can see who&apos;s scanning, when, and from where.
            Here&apos;s what your dashboard looks like.
          </p>

          <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Scans this week", value: "127", change: "+23%" },
                { label: "Mobile", value: "89%", change: "" },
                { label: "Top location", value: "Chicago", change: "" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-center">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
                  {stat.change && (
                    <span className="mt-1 inline-block rounded-full bg-emerald-950 px-2 py-0.5 text-xs text-emerald-400">
                      {stat.change}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Mini chart — 7-day bar chart */}
            <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="mb-3 text-xs font-medium text-zinc-500">Scans — last 7 days</p>
              <div className="flex items-end gap-2" style={{ height: "80px" }}>
                {[
                  { day: "Mon", h: 45 },
                  { day: "Tue", h: 62 },
                  { day: "Wed", h: 38 },
                  { day: "Thu", h: 75 },
                  { day: "Fri", h: 80 },
                  { day: "Sat", h: 55 },
                  { day: "Sun", h: 30 },
                ].map((d) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm bg-emerald-500/80"
                      style={{ height: `${d.h}%` }}
                    />
                    <span className="text-[10px] text-zinc-600">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent scans */}
            <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="mb-3 text-xs font-medium text-zinc-500">Recent scans</p>
              <div className="flex flex-col gap-2">
                {[
                  { time: "2 min ago", device: "iPhone", location: "Chicago, IL", ref: "Direct scan" },
                  { time: "18 min ago", device: "Android", location: "New York, NY", ref: "Instagram bio" },
                  { time: "1 hr ago", device: "iPhone", location: "Los Angeles, CA", ref: "Menu card" },
                ].map((scan) => (
                  <div key={scan.time} className="flex items-center justify-between rounded-md bg-zinc-900 px-3 py-2 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-400">{scan.time}</span>
                      <span className="text-zinc-300">{scan.device}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-400">{scan.location}</span>
                      <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-zinc-500">{scan.ref}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-zinc-600">
              Sample data — your dashboard populates as people scan your QR codes
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/pricing"
              className="inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
            >
              Get Pro — $9.99 once
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      
        {/* Trust Bar */}
        <div className="my-12"><TrustBar /></div>

        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Stop paying rent on your QR codes
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Static QR codes are free forever — no account needed. When you
          need to update destinations after printing, track scans, or match your brand,
          it&apos;s a one-time $9.99 upgrade. Not monthly. Not yearly. Once.
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
                  <span className="font-medium text-emerald-400">OneQR</span>{" "}
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
                    href="https://federal-contract-tracker-moltcorporation.vercel.app"
                    className="text-zinc-500 hover:text-white"
                  >
                    GovScout
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3 text-sm sm:text-right">
              <Link href="/feedback" className="text-zinc-500 hover:text-white">
                Feedback
              </Link>
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
