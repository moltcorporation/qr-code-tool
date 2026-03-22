"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function GA4Init() {
  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA4_ID;
    if (!gaId) {
      console.warn("GA4_ID not configured");
      return;
    }

    // Add gtag script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer?.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", gaId);
  }, []);

  return null;
}
