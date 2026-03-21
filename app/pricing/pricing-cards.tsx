"use client";

import { useState } from "react";
import { CheckoutLink } from "./checkout-link";

const PRO_MONTHLY_URL = "https://buy.stripe.com/8x25kD9JV2pX3nf0jW3Nm0g";
const PRO_ANNUAL_URL = process.env.NEXT_PUBLIC_STRIPE_PRO_ANNUAL_URL || "";

const baseTiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need for static QR codes.",
    cta: "Start for free",
    href: "/",
    highlighted: false,
    features: [
      "Unlimited static QR codes",
      "URL, WiFi, vCard, and Text QR types",
      "Custom foreground & background colors",
      "SVG + PNG download",
      "No signup required",
    ],
  },
  {
    name: "Starter",
    price: "$9.99",
    period: "one-time",
    description: "Dynamic codes and scan counts. Pay once, use forever.",
    cta: "Unlock Starter — $9.99",
    href: "https://buy.stripe.com/cNidR909l9SpcXP7Mo3Nm04",
    highlighted: false,
    features: [
      "Everything in Free, plus:",
      "Dynamic QR codes (edit destination after print)",
      "Basic scan count tracking",
      "Remove OneQR branding from downloads",
    ],
  },
];

export function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(false);

  const proTier = {
    name: "Pro",
    price: isAnnual ? "$5" : "$7",
    period: isAnnual ? "/mo" : "/mo",
    description: "Full analytics, branded styles, and bulk generation.",
    cta: isAnnual ? "Start Pro — $5/mo" : "Start Pro — $7/mo",
    href: isAnnual ? (PRO_ANNUAL_URL || PRO_MONTHLY_URL) : PRO_MONTHLY_URL,
    highlighted: true,
    badge: "Best Value",
    features: [
      "Everything in Starter, plus:",
      "Scan analytics (devices, referrers, daily trends)",
      "Branded QR styles (custom colors & dot patterns)",
      "Bulk QR generation from CSV",
      "Priority support",
      "Cancel anytime",
    ],
  };

  const tiers = [...baseTiers, proTier];

  return (
    <>
      {/* Billing toggle */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <span className={`text-sm font-medium ${!isAnnual ? "text-zinc-900" : "text-zinc-400"}`}>Monthly</span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAnnual ? "bg-emerald-600" : "bg-zinc-300"}`}
          aria-label="Toggle annual billing"
        >
          <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${isAnnual ? "translate-x-6" : "translate-x-1"}`} />
        </button>
        <span className={`text-sm font-medium ${isAnnual ? "text-zinc-900" : "text-zinc-400"}`}>Annual</span>
        {isAnnual && (
          <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">
            Save 29%
          </span>
        )}
      </div>

      <div className="mt-10 mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-xl border p-8 text-left ${
              tier.highlighted
                ? "border-emerald-600 shadow-lg shadow-emerald-100 ring-1 ring-emerald-600"
                : "border-zinc-200"
            }`}
          >
            {"badge" in tier && tier.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                {tier.badge}
              </span>
            )}
            <h2 className="text-lg font-semibold">{tier.name}</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">
                {tier.price}
              </span>
              <span className="text-sm text-zinc-500">{tier.period}</span>
            </div>
            {tier.highlighted && isAnnual && (
              <p className="mt-1 text-xs text-emerald-600">$60/yr — save $24 vs monthly</p>
            )}
            <p className="mt-3 text-sm text-zinc-600">
              {tier.description}
            </p>
            <CheckoutLink
              href={tier.href}
              highlighted={tier.highlighted ?? false}
              plan={tier.name.toLowerCase()}
              className={`mt-6 block w-full rounded-md px-4 py-2.5 text-center text-sm font-medium ${
                tier.highlighted
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "border border-zinc-300 text-zinc-900 hover:bg-zinc-50"
              }`}
            >
              {tier.cta}
            </CheckoutLink>
            <ul className="mt-6 space-y-3">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-zinc-700"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
