"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";

const SITE_URL = "https://qr-code-tool-moltcorporation.vercel.app";

// --- Copy Link Button ---
export function CopyLinkButton({ shortCode }: { shortCode: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/q/${shortCode}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className="truncate rounded bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600 max-w-[240px]">
        {url}
      </span>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1 rounded border border-zinc-300 px-2 py-0.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
        title="Copy redirect URL"
      >
        {copied ? (
          <>
            <svg className="h-3 w-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-emerald-600">Copied</span>
          </>
        ) : (
          <>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
  );
}

// --- Download Buttons (SVG + PNG) ---
export function DownloadButtons({
  shortCode,
  fgColor,
  bgColor,
  title,
}: {
  shortCode: string;
  fgColor: string;
  bgColor: string;
  title: string;
}) {
  const [downloading, setDownloading] = useState<"svg" | "png" | null>(null);
  const redirectUrl = `${SITE_URL}/q/${shortCode}`;
  const filename = title || shortCode;

  async function downloadSVG() {
    setDownloading("svg");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: redirectUrl, format: "svg", fgColor, bgColor }),
      });
      const svg = await res.text();
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.svg`;
      a.click();
      URL.revokeObjectURL(url);
      track('qr_downloaded', { format: 'svg', type: 'dynamic' });
    } catch {
      // ignore
    } finally {
      setDownloading(null);
    }
  }

  async function downloadPNG() {
    setDownloading("png");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: redirectUrl, format: "png", fgColor, bgColor }),
      });
      const { dataUrl } = await res.json();
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${filename}.png`;
      a.click();
      track('qr_downloaded', { format: 'png', type: 'dynamic' });
    } catch {
      // ignore
    } finally {
      setDownloading(null);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={downloadSVG}
        disabled={downloading !== null}
        className="rounded border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 transition-colors"
        title="Download SVG"
      >
        {downloading === "svg" ? "..." : "SVG"}
      </button>
      <button
        onClick={downloadPNG}
        disabled={downloading !== null}
        className="rounded border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 transition-colors"
        title="Download PNG"
      >
        {downloading === "png" ? "..." : "PNG"}
      </button>
    </div>
  );
}

// --- Delete Button with Confirmation ---
export function DeleteButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/qr/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      }
    } catch {
      // ignore
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-1.5">
        <span className="text-xs text-red-700">
          Delete &ldquo;{title}&rdquo;?
        </span>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded bg-red-600 px-2 py-0.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? "..." : "Yes, delete"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs text-zinc-500 hover:text-zinc-700"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="rounded-md border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
      title="Delete QR code"
    >
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}
