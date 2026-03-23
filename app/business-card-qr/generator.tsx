"use client";

import { useState, useCallback } from "react";
import QRCode from "qrcode";
import Link from "next/link";

export function BusinessCardQrGenerator() {
  const [url, setUrl] = useState("");
  const [fgColor, setFgColor] = useState("#0f172a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [svgHtml, setSvgHtml] = useState("");
  const [generated, setGenerated] = useState(false);

  const generate = useCallback(async () => {
    const value = url.trim();
    if (!value) return;

    try {
      const svg = await QRCode.toString(value, {
        type: "svg",
        color: { dark: fgColor, light: bgColor },
        margin: 2,
        width: 256,
      });
      setSvgHtml(svg);
      setGenerated(true);
    } catch {
      // ignore invalid input
    }
  }, [url, fgColor, bgColor]);

  const downloadSvg = useCallback(() => {
    if (!svgHtml) return;
    const blob = new Blob([svgHtml], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "business-card-qr.svg";
    a.click();
    URL.revokeObjectURL(a.href);
  }, [svgHtml]);

  const downloadPng = useCallback(async () => {
    const value = url.trim();
    if (!value) return;

    try {
      const dataUrl = await QRCode.toDataURL(value, {
        color: { dark: fgColor, light: bgColor },
        margin: 2,
        width: 512,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "business-card-qr.png";
      a.click();
    } catch {
      // ignore
    }
  }, [url, fgColor, bgColor]);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-lg font-bold text-white">
        Business Card QR Code Generator
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        Enter the URL you want your business card QR code to link to.
      </p>

      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="bc-url" className="block text-sm font-medium text-zinc-300">
            Destination URL
          </label>
          <input
            id="bc-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://linkedin.com/in/yourname"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && generate()}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="bc-fg" className="block text-sm font-medium text-zinc-300">
              Foreground
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                id="bc-fg"
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-zinc-700 bg-zinc-950"
              />
              <span className="text-xs text-zinc-500">{fgColor}</span>
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="bc-bg" className="block text-sm font-medium text-zinc-300">
              Background
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                id="bc-bg"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-zinc-700 bg-zinc-950"
              />
              <span className="text-xs text-zinc-500">{bgColor}</span>
            </div>
          </div>
        </div>

        <button
          onClick={generate}
          disabled={!url.trim()}
          className="w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-bold text-zinc-950 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Generate QR Code
        </button>
      </div>

      {generated && svgHtml && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div
            className="rounded-lg border border-zinc-700 bg-white p-4"
            dangerouslySetInnerHTML={{ __html: svgHtml }}
          />
          <div className="flex gap-3">
            <button
              onClick={downloadSvg}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-emerald-500 hover:text-white"
            >
              Download SVG
            </button>
            <button
              onClick={downloadPng}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-emerald-500 hover:text-white"
            >
              Download PNG
            </button>
          </div>
          <p className="text-xs text-zinc-600">
            Free static QR code. Want to change the link after printing?{" "}
            <Link href="/register" className="text-emerald-400 hover:underline">
              Get Pro — $9.99 once
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
