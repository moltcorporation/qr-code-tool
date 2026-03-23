"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { track } from "@vercel/analytics";
import { trackEvent as trackConversion } from "@/lib/track";
import { TrustBar } from "@/lib/components/TrustBar";

type Tab = "url" | "wifi" | "vcard" | "text";

const BRANDING_TEXT = "Made with OneQR";
const BRANDING_URL =
  "https://qr-code-tool-moltcorporation.vercel.app?utm_source=qr_branding&utm_medium=organic&utm_campaign=free_tier";

function addBrandingToSvg(svgStr: string, bgColor: string): string {
  const match = svgStr.match(/viewBox="0 0 (\d+) (\d+)"/);
  if (!match) return svgStr;

  const w = parseInt(match[1]);
  const h = parseInt(match[2]);
  const textArea = Math.max(3, Math.round(h * 0.1));
  const newH = h + textArea;
  const fontSize = Math.max(1.4, Math.round(h * 0.04 * 10) / 10);

  let branded = svgStr.replace(
    `viewBox="0 0 ${w} ${h}"`,
    `viewBox="0 0 ${w} ${newH}"`
  );

  const bg = `<rect x="0" y="${h}" width="${w}" height="${textArea}" fill="${bgColor}"/>`;
  const text = `<text x="${w / 2}" y="${h + textArea * 0.7}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="${fontSize}" fill="#999999">${BRANDING_TEXT}</text>`;

  branded = branded.replace("</svg>", `${bg}${text}</svg>`);
  return branded;
}

function addBrandingToPng(
  dataUrl: string,
  bgColor: string
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const pad = Math.round(img.height * 0.07);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height + pad;
      const ctx = canvas.getContext("2d")!;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const fs = Math.round(img.width * 0.028);
      ctx.font = `${fs}px Arial, Helvetica, sans-serif`;
      ctx.fillStyle = "#999999";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(BRANDING_TEXT, canvas.width / 2, img.height + pad / 2);

      resolve(canvas.toDataURL("image/png"));
    };
    img.src = dataUrl;
  });
}

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
    href: "/use-cases/restaurant-menu",
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
    free: false,
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
  const [upsellDismissed, setUpsellDismissed] = useState(false);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [showProWall, setShowProWall] = useState(false);
  const [livePreviewSvg, setLivePreviewSvg] = useState("");
  const [genCount, setGenCount] = useState(0);
  const [showSignupGate, setShowSignupGate] = useState(false);
  const [wifiDemoSvg, setWifiDemoSvg] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const MAX_FREE_GENERATIONS = 2;

  // Live preview: debounced QR generation as user types
  const updateLivePreview = useCallback((data: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!data.trim()) {
      setLivePreviewSvg("");
      return;
    }
    debounceRef.current = setTimeout(() => {
      QRCode.toString(data.trim(), {
        type: "svg",
        color: { dark: "#000000", light: "#ffffff" },
        errorCorrectionLevel: "M",
        margin: 2,
      })
        .then((svg) => setLivePreviewSvg(svg))
        .catch(() => {});
    }, 300);
  }, []);

  // Trigger live preview when URL input changes
  useEffect(() => {
    if (tab === "url" && url && !svgData) {
      updateLivePreview(url);
    } else if (tab === "wifi" && ssid && !svgData) {
      updateLivePreview(`WIFI:T:${encryption};S:${ssid};P:${wifiPassword};;`);
    } else if (!svgData) {
      setLivePreviewSvg("");
    }
  }, [url, ssid, wifiPassword, encryption, tab, svgData, updateLivePreview]);

  useEffect(() => {
    // Check if upsell was dismissed this session
    if (sessionStorage.getItem("oneqr_upsell_dismissed") === "true") {
      setUpsellDismissed(true);
    }

    // Restore generation count from session
    const stored = sessionStorage.getItem("oneqr_gen_count");
    if (stored) setGenCount(parseInt(stored, 10));

    // Check if user is logged in and on a paid plan
    fetch("/api/auth/me")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => d && setUserPlan(d.plan))
      .catch(() => {});

    fetch("/api/stats")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => d && setTotalCodes(d.totalCodes))
      .catch(() => {});

    // Load demo QR code on mount (client-side)
    QRCode.toString("https://qr-code-tool-moltcorporation.vercel.app", {
      type: "svg",
      color: { dark: "#000000", light: "#ffffff" },
      errorCorrectionLevel: "M",
      margin: 2,
    }).then((svg) => setDemoSvg(svg)).catch(() => {});

    // Generate WiFi demo QR
    QRCode.toString("WIFI:T:WPA;S:CoffeeShop_Guest;P:welcome2024;;", {
      type: "svg",
      color: { dark: "#000000", light: "#ffffff" },
      errorCorrectionLevel: "M",
      margin: 2,
    }).then((svg) => setWifiDemoSvg(svg)).catch(() => {});
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

  function trackEvent(event: string, qrType?: string) {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, qrType }),
    }).catch(() => {});
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

    // Check generation limit for non-logged-in users
    if (!isPaidUser && genCount >= MAX_FREE_GENERATIONS) {
      setShowSignupGate(true);
      return;
    }

    setLoading(true);
    setError("");
    setSvgData("");
    setPngDataUrl("");
    setLivePreviewSvg("");

    const ecLevel = (["L", "M", "Q", "H"].includes(errorCorrection)
      ? errorCorrection
      : "M") as "L" | "M" | "Q" | "H";

    try {
      const [svg, dataUrl] = await Promise.all([
        QRCode.toString(data.trim(), {
          type: "svg",
          color: { dark: fgColor, light: bgColor },
          errorCorrectionLevel: ecLevel,
          margin: 2,
        }),
        QRCode.toDataURL(data.trim(), {
          color: { dark: fgColor, light: bgColor },
          errorCorrectionLevel: ecLevel,
          margin: 2,
          width: 1024,
        }),
      ]);
      setSvgData(svg);
      setPngDataUrl(dataUrl);
      const newCount = genCount + 1;
      setGenCount(newCount);
      sessionStorage.setItem("oneqr_gen_count", String(newCount));
      trackEvent("qr_generated", tab);
      track("qr_generated", { qr_type: tab });
    } catch {
      setError("Failed to generate QR code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function downloadSvg() {
    const branded = addBrandingToSvg(svgData, bgColor);
    const blob = new Blob([branded], { type: "image/svg+xml" });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "oneqr-qr.svg";
    a.click();
    URL.revokeObjectURL(blobUrl);
    track("qr_downloaded", { format: "svg" });
  }

  async function downloadPng() {
    const branded = await addBrandingToPng(pngDataUrl, bgColor);
    const a = document.createElement("a");
    a.href = branded;
    a.download = "oneqr-qr.png";
    a.click();
    track("qr_downloaded", { format: "png" });
  }

  function dismissUpsell() {
    setUpsellDismissed(true);
    sessionStorage.setItem("oneqr_upsell_dismissed", "true");
  }

  const isPaidUser = userPlan === "pro" || userPlan === "premium";
  const showUpsell = !upsellDismissed && !isPaidUser;

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-400">One</span>QR
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
            <a
              href="https://buy.stripe.com/cNidR909l9SpcXP7Mo3Nm04"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { track("pro_checkout_clicked", { source: "header_cta" }); trackConversion("checkout_initiated", { source: "header_cta", plan: "pro" }); }}
              className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-400"
            >
              Try Pro
            </a>
            <Link
              href="/register"
              className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero — compact so generator is above the fold */}
      <section className="mx-auto max-w-3xl px-6 pt-10 text-center">
        <div className="flex items-center justify-center gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Free forever. Pro when you need it.
          </p>
          <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            {totalCodes !== null && totalCodes > 0
              ? `${totalCodes.toLocaleString()} QR codes generated`
              : "Free QR code generator"}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Change where your QR code points —{" "}
          <span className="text-emerald-400">without reprinting it.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
          Free for static codes. Pro $7/mo for dynamic codes, analytics, and more.
        </p>
      </section>

      {/* Generator — above the fold for instant value */}
      <section id="generator" className="mx-auto max-w-lg px-6 pb-10 pt-6">
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

            {/* Options row — Pro features gated */}
            {isPaidUser ? (
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
            ) : (
              <button
                type="button"
                onClick={() => { setShowProWall(true); trackEvent("pro_wall_impression"); }}
                className="flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-400 transition-colors hover:border-emerald-800 hover:text-zinc-300"
              >
                <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Custom colors, analytics &amp; dynamic QR
                <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-xs font-medium text-emerald-400">Pro</span>
              </button>
            )}

            {/* Pro feature wall */}
            {showProWall && !isPaidUser && (
              <div className="rounded-lg border border-emerald-800/50 bg-emerald-950/30 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Unlock Pro features</p>
                    <p className="mt-1 text-xs text-zinc-400">
                      Custom brand colors, dynamic QR codes that update after printing, and scan analytics to track every scan.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowProWall(false)}
                    className="rounded p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
                    aria-label="Close"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <a
                  href="https://buy.stripe.com/8x25kD9JV2pX3nf0jW3Nm0g"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { track("pro_checkout_clicked", { source: "pro_wall" }); trackConversion("checkout_initiated", { source: "pro_wall", plan: "pro" }); }}
                  className="mt-3 inline-block rounded-md bg-emerald-500 px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
                >
                  Unlock Pro — $7/mo
                </a>
              </div>
            )}

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
                className="h-52 w-48 rounded-lg bg-white p-3"
                dangerouslySetInnerHTML={{
                  __html: addBrandingToSvg(svgData, bgColor),
                }}
              />
              <a
                href={BRANDING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-zinc-500 hover:text-zinc-400 transition-colors"
              >
                Made with OneQR
              </a>
              {userPlan ? (
                <>
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
                    Free. No signup. Yours.
                  </p>
                </>
              ) : (
                <div className="w-full rounded-md border border-emerald-800/50 bg-emerald-950/30 p-4 text-center">
                  <p className="text-sm text-zinc-300">
                    Create a free account to download your QR code
                  </p>
                  <Link
                    href="/register"
                    className="mt-3 inline-block rounded-md bg-emerald-500 px-5 py-2 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
                  >
                    Sign up free — takes 10 seconds
                  </Link>
                  <p className="mt-2 text-xs text-zinc-600">
                    No credit card required
                  </p>
                </div>
              )}
              {/* Pro upsell prompt — dismissible, hidden for Pro/Premium */}
              {showUpsell && (
                <div className="relative mt-2 w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-4 py-3">
                  <button
                    onClick={dismissUpsell}
                    className="absolute right-2 top-2 rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
                    aria-label="Dismiss"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <p className="pr-6 text-sm text-zinc-300">
                    Your QR is ready! Want to track who scans it? Unlock Pro — scan analytics, editable destinations, and never reprint.{" "}
                    <span className="font-medium text-zinc-100">From $7/mo.</span>
                  </p>
                  <a
                    href="https://buy.stripe.com/8x25kD9JV2pX3nf0jW3Nm0g"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { track("pro_checkout_clicked", { source: "upsell_prompt" }); trackConversion("checkout_initiated", { source: "upsell_prompt", plan: "pro" }); }}
                    className="mt-2 inline-block rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-500"
                  >
                    Unlock scan analytics →
                  </a>
                </div>
              )}
            </div>
          ) : livePreviewSvg && !loading ? (
            <div className="mt-6 flex flex-col items-center gap-3 rounded-lg border border-dashed border-emerald-800/50 bg-zinc-950/50 p-6">
              <p className="text-xs font-medium text-emerald-400">Live preview</p>
              <div
                className="h-36 w-36 rounded-lg bg-white p-2.5 transition-opacity"
                dangerouslySetInnerHTML={{ __html: livePreviewSvg }}
              />
              <p className="text-xs text-zinc-500">
                Hit Generate to download
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
          {/* Signup gate modal */}
          {showSignupGate && (
            <div className="mt-6 rounded-lg border border-violet-800/50 bg-violet-950/30 p-6 text-center">
              <p className="text-sm font-medium text-white">
                You&apos;ve used your free generations
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Create a free account for unlimited QR codes
              </p>
              <Link
                href="/register"
                className="mt-3 inline-block rounded-md bg-violet-600 px-5 py-2 text-sm font-bold text-white hover:bg-violet-500"
              >
                Sign up free
              </Link>
              <button
                onClick={() => setShowSignupGate(false)}
                className="mt-2 block w-full text-xs text-zinc-500 hover:text-zinc-400"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Competitor comparison + trust bar — below generator */}
      <section className="mx-auto max-w-3xl px-6 pb-8 text-center">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
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
            <span className="font-bold text-emerald-400">$7/mo</span>
          </div>
        </div>
        <TrustBar />
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

      {/* WiFi QR Demo — try it with your phone */}
      {wifiDemoSvg && (
        <section className="border-t border-zinc-800 bg-zinc-900/30">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
              <div className="flex flex-col items-center gap-3">
                <div
                  className="h-44 w-44 rounded-xl bg-white p-3 shadow-lg shadow-emerald-500/10"
                  dangerouslySetInnerHTML={{ __html: wifiDemoSvg }}
                />
                <p className="text-xs text-zinc-500">
                  Network: <span className="text-zinc-300">CoffeeShop_Guest</span>
                </p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  Try it now
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  Scan this WiFi QR code with your phone
                </h2>
                <p className="mt-3 text-sm text-zinc-400">
                  This is a real WiFi QR code. Point your camera at it — your phone
                  will offer to join the network automatically. No typing passwords.
                </p>
                <p className="mt-3 text-sm text-zinc-400">
                  Create your own WiFi QR in seconds using the{" "}
                  <a href="#generator" className="text-emerald-400 hover:text-emerald-300">
                    WiFi tab above
                  </a>. Perfect for cafes, Airbnbs, offices, and home guests.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic QR explainer */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Same QR code. New destination. No reprinting.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            This is what makes dynamic QR codes worth upgrading to Pro.
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
            <a
              href="https://buy.stripe.com/8x25kD9JV2pX3nf0jW3Nm0g"
              className="rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
            >
              Unlock dynamic QR codes — $7/mo
            </a>
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
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Restaurant menus",
                desc: "Update your menu QR without reprinting table cards. Seasonal specials? Just change the link.",
                icon: "M3 3h18v18H3V3zm3 6h12m-12 4h8",
                href: "/use-cases/restaurant-menu",
              },
              {
                title: "Business cards",
                desc: "Switch jobs or update your portfolio? Your QR code still works. Same card, new destination.",
                icon: "M15 9h3m-3 3h3m-3 3h3M6 9h.01M6 12h.01M6 15h.01M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z",
                href: "/use-cases/business-cards",
              },
              {
                title: "Real estate",
                desc: "Add QR codes to property listings and open house flyers. Buyers scan to see photos, pricing, and details instantly.",
                icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4",
                href: "/use-cases/real-estate",
              },
              {
                title: "Event tickets",
                desc: "Generate unique QR codes for event check-in, ticket validation, and attendee tracking.",
                icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z",
                href: "/use-cases/event-tickets",
              },
              {
                title: "WiFi access",
                desc: "Guests scan, they're connected. No spelling out passwords. Perfect for cafes, Airbnbs, and offices.",
                icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0",
                href: "/use-cases/wifi",
              },
              {
                title: "Marketing campaigns",
                desc: "Track which flyers, posters, or ads drive the most scans. Real data, not guesses.",
                icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z",
                href: "/use-cases/marketing",
              },
              {
                title: "Weddings",
                desc: "QR codes for invitations, photo sharing, RSVP, registry, and venue WiFi. Guests scan — no app needed.",
                icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
                href: "/wedding",
              },
            ].map((uc) => {
              const card = (
                <div
                  className={`flex gap-4 rounded-lg border border-zinc-800 bg-zinc-950 p-6${uc.href ? " transition-colors hover:border-emerald-800" : ""}`}
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
                    <h3 className="font-semibold text-white">
                      {uc.title}
                      {uc.href && (
                        <span className="ml-2 text-xs text-emerald-400">→</span>
                      )}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">{uc.desc}</p>
                  </div>
                </div>
              );
              return uc.href ? (
                <Link key={uc.title} href={uc.href}>
                  {card}
                </Link>
              ) : (
                <div key={uc.title}>{card}</div>
              );
            })}
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
                {"href" in feature && feature.href && (
                  <Link
                    href={feature.href}
                    className="mt-3 inline-block text-sm font-medium text-emerald-400 hover:text-emerald-300"
                  >
                    See how it works →
                  </Link>
                )}
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
              Track every scan with real-time analytics
            </p>
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://buy.stripe.com/8x25kD9JV2pX3nf0jW3Nm0g"
              className="inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
            >
              Unlock Pro — $7/mo
            </a>
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Stop paying rent on your QR codes
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Static QR codes are free forever — no account needed. When you
          need to update destinations after printing, track scans, or match your brand,
          Pro starts at $7/mo. Cancel anytime.
        </p>
        <Link
          href="/pricing"
          className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          See pricing
        </Link>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-400">
            Everything you need to know about OneQR codes.
          </p>
          <div className="mt-10 space-y-3">
            {[
              {
                q: "What happens to my QR codes if I cancel Pro?",
                a: "Static QR codes work forever — they don't depend on any subscription. Dynamic QR codes will revert to their last saved destination URL. Your codes never stop scanning.",
              },
              {
                q: "Will my QR codes work on all phones?",
                a: "Yes. OneQR generates standard QR codes compatible with every smartphone camera app — iPhone, Android, tablets. No special app needed to scan.",
              },
              {
                q: "Can I change where a dynamic QR code points?",
                a: "Yes — that's the main benefit of dynamic codes. With Pro, you can update the destination URL unlimited times without reprinting the code.",
              },
              {
                q: "Is there a scan limit?",
                a: "No. All QR codes — free and Pro — support unlimited scans. There's no throttling or per-scan charges.",
              },
              {
                q: "Can I track who scans my codes?",
                a: "Pro includes scan analytics showing location, device type, browser, and timestamp for each scan. Free static codes don't include tracking.",
              },
              {
                q: "What's the difference between static and dynamic codes?",
                a: "Static codes encode the URL directly into the QR pattern — they work forever but can't be changed after printing. Dynamic codes use a short redirect URL you can update anytime, plus they include scan analytics.",
              },
              {
                q: "Can I generate WiFi QR codes?",
                a: "Yes — WiFi QR codes are a free feature. Enter your network name and password, and guests can connect by scanning. Works on all devices.",
              },
              {
                q: "Why pay when I can generate QR codes for free?",
                a: "Free static codes are great for simple links. Paid plans unlock dynamic codes (change the destination without reprinting), scan analytics (location, device, timestamp), custom branding, bulk generation, and WiFi QR codes with advanced options.",
              },
              {
                q: "What's the difference between Free and Pro?",
                a: "Free gives you unlimited static QR codes with no signup required. Pro ($7/mo) unlocks dynamic QR codes you can edit after printing, full scan analytics, branded styles, bulk CSV generation, and priority email support.",
              },
              {
                q: "Can I use OneQR for my business?",
                a: "Absolutely. Commercial use is included on both Free and Pro tiers. Restaurants, retailers, event organizers, and service businesses all use OneQR for menus, marketing, WiFi access, and more.",
              },
              {
                q: "What payment methods do you accept?",
                a: "All major credit and debit cards through Stripe. Your payment info is handled securely — we never see or store your card details.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. No contracts, no cancellation fees. Cancel from your account settings and your subscription ends at the next billing date. Static codes you created keep working.",
              },
              {
                q: "Do you offer bulk generation?",
                a: "Pro includes bulk QR code generation — create multiple codes at once for inventory, products, or events. Each code gets its own tracking and redirect URL.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-lg border border-zinc-800 bg-zinc-900/50"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-white [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>
                  <svg
                    className="h-5 w-5 shrink-0 text-emerald-400 transition-transform duration-200 group-open:rotate-180"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            QR code guides
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-400">
            Learn how businesses use QR codes to save time and connect with customers.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Link
              href="/guides/wifi-qr-code"
              className="rounded-lg border border-zinc-800 p-5 transition hover:border-emerald-500/50 hover:bg-zinc-900/50"
            >
              <h3 className="font-semibold text-white">WiFi QR Codes</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Let guests connect to your network instantly — no typing passwords.
              </p>
            </Link>
            <Link
              href="/guides/qr-codes-for-restaurants"
              className="rounded-lg border border-zinc-800 p-5 transition hover:border-emerald-500/50 hover:bg-zinc-900/50"
            >
              <h3 className="font-semibold text-white">QR Codes for Restaurants</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Digital menus, contactless ordering, and table-side WiFi access.
              </p>
            </Link>
            <Link
              href="/guides/qr-codes-for-events"
              className="rounded-lg border border-zinc-800 p-5 transition hover:border-emerald-500/50 hover:bg-zinc-900/50"
            >
              <h3 className="font-semibold text-white">QR Codes for Events</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Ticketing, check-in, schedule sharing, and attendee WiFi.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-product footer */}
      <section className="border-t border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-600">
            More from Moltcorp
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://federal-contract-tracker-moltcorporation.vercel.app?utm_source=oneqrsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-zinc-800 bg-zinc-950 p-4 transition-colors hover:border-emerald-800"
            >
              <p className="text-sm font-semibold text-white group-hover:text-emerald-400">GovScout</p>
              <p className="mt-1 text-xs text-zinc-500">Federal contract tracking — find and win government contracts.</p>
            </a>
            <a
              href="https://trades-quoting-tool-moltcorporation.vercel.app?utm_source=oneqrsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-zinc-800 bg-zinc-950 p-4 transition-colors hover:border-emerald-800"
            >
              <p className="text-sm font-semibold text-white group-hover:text-emerald-400">TradeQuote</p>
              <p className="mt-1 text-xs text-zinc-500">Simple quoting for tradespeople — send branded quotes in minutes.</p>
            </a>
            <a
              href="https://breeder-platform-moltcorporation.vercel.app?utm_source=oneqrsite&utm_medium=cross_product&utm_campaign=footer"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-zinc-800 bg-zinc-950 p-4 transition-colors hover:border-emerald-800"
            >
              <p className="text-sm font-semibold text-white group-hover:text-emerald-400">PawPage</p>
              <p className="mt-1 text-xs text-zinc-500">Breeder platform — waitlists, galleries, and secure deposit collection.</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-600">
              <span className="font-medium text-emerald-400">One</span>
              <span className="font-medium text-zinc-400">QR</span>
              {" "}— Free QR code generator
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link href="/guides/wifi-qr-code" className="text-zinc-500 hover:text-white">
                WiFi QR Guide
              </Link>
              <Link href="/pricing" className="text-zinc-500 hover:text-white">
                Pricing
              </Link>
              <Link href="/privacy" className="text-zinc-500 hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-zinc-500 hover:text-white">
                Terms
              </Link>
              <Link href="/about" className="text-zinc-500 hover:text-white">
                About
              </Link>
              <Link href="/contact" className="text-zinc-500 hover:text-white">
                Contact
              </Link>
              <Link href="/feedback" className="text-zinc-500 hover:text-white">
                Feedback
              </Link>
              <a
                href="https://moltcorporation.com"
                className="text-zinc-500 hover:text-white"
              >
                Moltcorp
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
