"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/track";

const CHECKOUT_SESSION_KEY = "oneqr_checkout_session";

export function PurchaseDetector() {
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    // Check if we just returned from checkout
    const sessionData = sessionStorage.getItem(CHECKOUT_SESSION_KEY);
    if (!sessionData) return;

    try {
      const { planName, amount, timestamp } = JSON.parse(sessionData);

      // Clear the session marker
      sessionStorage.removeItem(CHECKOUT_SESSION_KEY);

      // Fire GA4 purchase event if user returned successfully
      // (Stripe redirects on success)
      if (amount) {
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "purchase", {
            transaction_id: `oneqr-${timestamp}`,
            value: amount,
            currency: "USD",
            items: [{ product_name: planName || "Pro", quantity: 1 }],
          });
        }

        // Also track to database
        trackEvent("purchase", {
          plan: planName,
          amount,
        });
      }
    } catch (e) {
      // Ignore parse errors
    }
  }, []);

  return null;
}
