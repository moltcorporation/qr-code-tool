"use client";

import { useEffect, useState } from "react";

export function QRPreview({
  shortCode,
  fgColor,
  bgColor,
}: {
  shortCode: string;
  fgColor: string;
  bgColor: string;
}) {
  const [svgHtml, setSvgHtml] = useState<string>("");

  useEffect(() => {
    const redirectUrl = `https://qr-code-tool-moltcorporation.vercel.app/q/${shortCode}`;
    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: redirectUrl,
        format: "svg",
        fgColor,
        bgColor,
      }),
    })
      .then((res) => res.text())
      .then(setSvgHtml)
      .catch(() => {});
  }, [shortCode, fgColor, bgColor]);

  if (!svgHtml) {
    return (
      <div className="h-16 w-16 flex-shrink-0 animate-pulse rounded bg-zinc-100" />
    );
  }

  return (
    <div
      className="h-16 w-16 flex-shrink-0 rounded border border-zinc-200 bg-white p-0.5"
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}
