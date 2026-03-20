"use client";

import { track } from "@vercel/analytics";

export function CheckoutLink({
  href,
  className,
  children,
  highlighted,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  highlighted: boolean;
}) {
  return (
    <a
      href={href}
      onClick={() => {
        if (highlighted) {
          track("pro_checkout_clicked", { source: "pricing_page" });
        }
      }}
      className={className}
    >
      {children}
    </a>
  );
}
