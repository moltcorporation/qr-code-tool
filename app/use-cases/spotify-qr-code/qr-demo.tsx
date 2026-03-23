"use client";

import { useState, useCallback, useRef } from "react";
import QRCode from "qrcode";

export function SpotifyQrDemo() {
  const [url, setUrl] = useState("");
  const [svgData, setSvgData] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePreview = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim()) {
      setSvgData("");
      return;
    }
    debounceRef.current = setTimeout(() => {
      QRCode.toString(value.trim(), {
        type: "svg",
        color: { dark: "#000000", light: "#ffffff" },
        errorCorrectionLevel: "M",
        margin: 2,
      })
        .then((svg) => setSvgData(svg))
        .catch(() => {});
    }, 300);
  }, []);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Try it now
      </p>
      <h3 className="mt-2 text-lg font-bold text-white">
        Create a Spotify QR code in seconds
      </h3>
      <p className="mt-2 text-sm text-zinc-400">
        Paste any Spotify playlist, album, or artist link below.
      </p>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex-1">
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              updatePreview(e.target.value);
            }}
            placeholder="https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
          <p className="mt-2 text-xs text-zinc-600">
            Works with Spotify playlists, albums, artists, tracks, or podcasts
          </p>
        </div>

        {svgData ? (
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-36 w-36 rounded-lg bg-white p-2.5"
              dangerouslySetInnerHTML={{ __html: svgData }}
            />
            <p className="text-xs text-zinc-500">Scan to preview</p>
          </div>
        ) : (
          <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-950/50">
            <p className="px-4 text-center text-xs text-zinc-600">
              QR preview appears here
            </p>
          </div>
        )}
      </div>

      <a
        href="/"
        className="mt-4 inline-block rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
      >
        Create Your Spotify QR Code — Free
      </a>
    </div>
  );
}
