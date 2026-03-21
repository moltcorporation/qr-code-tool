"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export function UtmTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const utmData: Record<string, string> = {};
    let hasUtm = false;

    for (const param of UTM_PARAMS) {
      const value = searchParams.get(param);
      if (value) {
        utmData[param] = value;
        hasUtm = true;
      }
    }

    if (hasUtm) {
      document.cookie = `utm=${encodeURIComponent(JSON.stringify(utmData))};path=/;max-age=${60 * 60 * 24 * 30};SameSite=Lax`;
    }
  }, [searchParams]);

  return null;
}
