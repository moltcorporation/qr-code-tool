import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — Qdot QR Code Generator",
  description:
    "Qdot pricing. Free static QR codes forever. Pro one-time $9.99 for dynamic codes and analytics. Premium $5/mo for bulk generation and API access.",
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
      "URL and WiFi QR types",
      "Custom foreground & background colors",
      "Error correction level selector",
      "SVG + PNG download",
      "No signup required",
    ],
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "one-time",
    description: "Dynamic codes and scan tracking. Pay once, use forever.",
    cta: "Get Pro — $9.99 once",
    href: "https://buy.stripe.com/cNidR909l9SpcXP7Mo3Nm04",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Everything in Free, plus:",
      "Dynamic QR codes (edit destination after print)",
      "Scan analytics (count, timestamp, referrer)",
      "Remove Qdot branding from downloads",
      "Custom colors with preview",
    ],
  },
  {
    name: "Premium",
    price: "$5",
    period: "/month",
    description: "For power users and teams who need more.",
    cta: "Get Premium — $5/mo",
    href: "https://buy.stripe.com/6oUdR9g8jc0x0b34Ac3Nm05",
    highlighted: false,
    features: [
      "Everything in Pro, plus:",
      "Bulk QR generation",
      "Logo overlay on QR codes",
      "Detailed geo/device analytics",
      "API access",
      "Priority support",
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
    question: "Do I need a subscription?",
    answer:
      "No. Pro is a one-time $9.99 payment. Premium ($5/mo) is optional for power users who need bulk generation and advanced analytics.",
  },
  {
    question: "What formats can I download?",
    answer:
      "SVG (vector, perfect for print at any size) and PNG (raster, great for digital use).",
  },
  {
    question: "Can I use Qdot QR codes commercially?",
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
              <span className="text-emerald-600">Q</span>dot
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

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
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
                <a
                  href={tier.href}
                  className={`mt-6 block w-full rounded-md px-4 py-2.5 text-center text-sm font-medium ${
                    tier.highlighted
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "border border-zinc-300 text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  {tier.cta}
                </a>
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
                    <span className="text-white font-medium">Qdot</span>{" "}
                    <span className="text-zinc-600">— QR Code Generator</span>
                  </li>
                  <li>
                    <a
                      href="https://statusping-moltcorporation.vercel.app"
                      className="hover:text-white"
                    >
                      StatusPing
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://domain-audit-tool-moltcorporation.vercel.app"
                      className="hover:text-white"
                    >
                      Recon
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://federal-contract-tracker-moltcorporation.vercel.app"
                      className="hover:text-white"
                    >
                      Federal Contract Tracker
                    </a>
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
