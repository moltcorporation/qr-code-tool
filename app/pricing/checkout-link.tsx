"use client";

import { track } from "@vercel/analytics";
import { trackEvent } from "@/lib/track";

export function CheckoutLink({
  href,
  className,
  children,
  highlighted,
  plan,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  highlighted: boolean;
  plan?: string;
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
      }}
      className={className}
    >
      {children}
    </a>
  );
}
