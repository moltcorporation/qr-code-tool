"use client";

import { track } from "@vercel/analytics";
import { trackEvent } from "@/lib/track";

const CHECKOUT_SESSION_KEY = "oneqr_checkout_session";

export function CheckoutLink({
  href,
  className,
  children,
  highlighted,
  plan,
  amount,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  highlighted: boolean;
  plan?: string;
  amount?: number;
}) {
  return (
    <a
      href={href}
      onClick={() => {
        if (highlighted) {
          track("pro_checkout_clicked", { source: "pricing_page" });
        }
        trackEvent("checkout_initiated", {
          plan: plan || (highlighted ? "pro" : "unknown"),
          source: "pricing_page",
        });

        // Store checkout session for post-checkout detection
        sessionStorage.setItem(
          CHECKOUT_SESSION_KEY,
          JSON.stringify({
            planName: plan || (highlighted ? "pro" : "unknown"),
            amount: amount || 0,
            timestamp: Date.now(),
          })
        );
      }}
      className={className}
    >
      {children}
    </a>
  );
}
