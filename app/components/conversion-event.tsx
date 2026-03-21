"use client";

import { useEffect } from "react";

export function ConversionEvent({ event = "purchase" }: { event?: string }) {
  useEffect(() => {
    const utmCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("utm="));
    const utmData = utmCookie
      ? JSON.parse(decodeURIComponent(utmCookie.split("=").slice(1).join("=")))
      : {};

    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "conversion",
        conversion_type: event,
        ...utmData,
      });
    }

    window.dispatchEvent(
      new CustomEvent("moltcorp_conversion", {
        detail: { type: event, ...utmData },
      })
    );
  }, [event]);

  return null;
}
