import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutLink } from "./checkout-link";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Pricing — OneQR QR Code Generator",
  description:
    "OneQR pricing. Free static QR codes forever. Pro $7/mo for dynamic codes, analytics, branded styles, and bulk generation.",
  alternates: { canonical: `${baseUrl}/pricing` },
  openGraph: {
    title: "Pricing — OneQR QR Code Generator",
    description:
      "Free static QR codes forever. Pro $7/mo for dynamic codes, analytics, branded styles, and bulk generation.",
    url: `${baseUrl}/pricing`,
    images: [{ url: `${baseUrl}/opengraph-image` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — OneQR QR Code Generator",
    description:
      "Free static QR codes forever. Pro $7/mo for dynamic codes, analytics, branded styles, and bulk generation.",
    images: [`${baseUrl}/opengraph-image`],
  },
};

const tiers = [
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
  {
    name: "Pro",
    price: "$7",
    period: "/mo",
    description: "Full analytics, branded styles, and bulk generation.",
    cta: "Start Pro — $7/mo",
    href: "https://buy.stripe.com/8x25kD9JV2pX3nf0jW3Nm0g",
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
  },
];

const faqs = [
  {
    question: "Is the free tier really unlimited?",
    answer:
      "Yes. Generate as many static QR codes as you want. No signup, no credit card, no trial.",
  },
  {
    question: "What's a dynamic QR code?",
    answer:
      "A QR code whose destination can be changed after printing. The QR code itself stays the same, but where it points can be updated anytime. Perfect for menus, business cards, or any print material.",
  },
  {
    question: "What's the difference between Starter and Pro?",
    answer:
      "Starter ($9.99 one-time) gives you dynamic QR codes and basic scan counts. Pro ($7/mo) adds full analytics with device and referrer tracking, branded QR styles, and bulk CSV generation. Pro is best for businesses running campaigns.",
  },
  {
    question: "Can I cancel Pro anytime?",
    answer:
      "Yes. Cancel your Pro subscription anytime from your billing page. You'll keep access until the end of your billing period.",
  },
  {
    question: "What formats can I download?",
    answer:
      "SVG (vector, perfect for print at any size) and PNG (raster, great for digital use).",
  },
  {
    question: "Can I use OneQR QR codes commercially?",
    answer:
      "Yes. All generated QR codes are yours to use however you like, including commercial use.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-white font-sans text-zinc-900">
        {/* Header */}
        <header className="border-b border-zinc-200">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-emerald-600">One</span>QR
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/pricing"
                className="text-sm text-zinc-600 hover:text-zinc-900"
              >
                Pricing
              </Link>
              <Link
                href="/"
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Generate QR
              </Link>
            </nav>
          </div>
        </header>

        {/* Pricing section */}
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-zinc-600">
            Start free. Upgrade when you need dynamic codes and analytics.
          </p>

          <div className="mt-14 mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-xl border p-8 text-left ${
                  tier.highlighted
                    ? "border-emerald-600 shadow-lg shadow-emerald-100 ring-1 ring-emerald-600"
                    : "border-zinc-200"
                }`}
              >
                {tier.badge && (
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
                <p className="mt-3 text-sm text-zinc-600">
                  {tier.description}
                </p>
                <CheckoutLink
                  href={tier.href}
                  highlighted={tier.highlighted ?? false}
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
        </section>

        {/* Analytics preview */}
        <section className="mx-auto max-w-3xl px-6 pb-16">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
            <h3 className="text-center text-lg font-bold text-zinc-900">
              What Pro analytics looks like
            </h3>
            <p className="mt-1 text-center text-sm text-zinc-500">
              Track every scan — who, when, and where.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Scans this week", value: "127" },
                { label: "Mobile", value: "89%" },
                { label: "Top location", value: "Chicago" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-zinc-200 bg-white p-3 text-center">
                  <p className="text-xl font-bold text-zinc-900">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-end gap-1.5" style={{ height: "60px" }}>
              {[45, 62, 38, 75, 80, 55, 30].map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-sm bg-emerald-500"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[9px] text-zinc-400">
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-zinc-400">
              Track every scan with real-time analytics
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <h2 className="text-center text-2xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
            <dl className="mt-12 space-y-8">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-semibold text-zinc-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-sm text-zinc-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-200 bg-zinc-950 text-zinc-400">
          <div className="mx-auto max-w-5xl px-6 py-12">
            <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Moltcorp Products
                </p>
                <ul className="mt-3 flex flex-col gap-2 text-sm">
                  <li>
                    <span className="text-white font-medium">OneQR</span>{" "}
                    <span className="text-zinc-600">— QR Code Generator</span>
                  </li>
                  <li>
                    <a
                      href="https://federal-contract-tracker-moltcorporation.vercel.app?utm_source=oneqr&utm_medium=footer"
                      className="hover:text-white"
                    >
                      GovScout
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Legal
                </p>
                <ul className="mt-3 flex flex-col gap-2 text-sm">
                  <li>
                    <Link href="/privacy" className="hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="text-sm sm:text-right">
                <p className="text-zinc-500">
                  Built by agents at{" "}
                  <a
                    href="https://moltcorporation.com"
                    className="text-zinc-300 hover:text-white"
                  >
                    Moltcorp
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
