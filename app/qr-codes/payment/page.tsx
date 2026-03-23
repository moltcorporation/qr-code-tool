import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Payment QR Code Generator — Accept Payments Instantly | OneQR",
  description:
    "Generate payment QR codes for your business. Customers scan to pay via Venmo, PayPal, Cash App, or any payment link. Dynamic QR codes $9.99 once — no monthly fees.",
  alternates: {
    canonical: `${baseUrl}/qr-codes/payment`,
  },
  openGraph: {
    title: "Payment QR Code Generator — Accept Payments Instantly | OneQR",
    description:
      "Create QR codes that link to your payment page. Restaurants, vendors, invoices, service businesses. Free static codes. Dynamic $9.99 once.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment QR Code Generator — Accept Payments | OneQR",
    description:
      "Create QR codes that link to your payment page. Free static codes. Dynamic $9.99 once — no monthly fees.",
  },
};

const pricingRows = [
  {
    feature: "Static payment QR codes",
    oneqr: "Free forever",
    qrtiger: "$7/mo ($84/yr)",
    square: "2.6% + 10¢ per txn",
  },
  {
    feature: "Dynamic QR codes",
    oneqr: "$9.99 once",
    qrtiger: "$7/mo ($84/yr)",
    square: "Included w/ processing",
  },
  {
    feature: "Works with any payment link",
    oneqr: "Yes",
    qrtiger: "Yes",
    square: "Square only",
  },
  {
    feature: "Scan analytics",
    oneqr: "Included (Pro)",
    qrtiger: "Paid plans only",
    square: "Square dashboard",
  },
  {
    feature: "No processing fees",
    oneqr: "Yes — link to any provider",
    qrtiger: "Yes",
    square: "No (2.6% + 10¢)",
  },
];

const paymentUseCases = [
  {
    title: "Restaurant table payments",
    description:
      "Place a QR code on each table. Customers scan to pay via Venmo, PayPal, or your POS payment link — no waiting for the check.",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z",
  },
  {
    title: "Market & pop-up vendors",
    description:
      "Print a payment QR on your booth sign. Accept contactless payments without a card reader. Works with Venmo, Zelle, Cash App, or PayPal.me.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Invoice payments",
    description:
      "Add a QR code to printed invoices. Your client scans and lands on your payment page — no typing account numbers or searching for your Venmo handle.",
    icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z",
  },
  {
    title: "Service businesses",
    description:
      "Plumbers, cleaners, landscapers — leave a payment QR on the job completion sheet. Customers pay on the spot without cash or card readers.",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Donations & tips",
    description:
      "Street performers, nonprofits, tip jars — a QR code lets people give instantly. No fumbling for cash, no awkward Venmo searches.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    title: "Subscription & recurring billing",
    description:
      "Link your QR code to a Stripe payment link or recurring invoice. Customers scan once to set up autopay — great for memberships and retainers.",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
];

const faqs = [
  {
    question: "What is a payment QR code?",
    answer:
      "A payment QR code links to a payment page — Venmo, PayPal, Cash App, Stripe, Square, or any URL where customers can pay you. They scan with their phone camera and land directly on your payment page. No app download needed.",
  },
  {
    question: "Which payment providers work with OneQR?",
    answer:
      "Any provider with a payment link. Venmo, PayPal.me, Cash App, Zelle, Stripe payment links, Square invoices, GoFundMe — if it has a URL, OneQR can point to it. We don't process payments, so there are no processing fees from us.",
  },
  {
    question: "Static vs dynamic — which should I use for payments?",
    answer:
      "Static is free and works if your payment link won't change. Dynamic ($9.99 once) lets you swap the destination — useful if you switch payment providers, update invoice amounts, or want scan analytics to track how many customers pay via QR.",
  },
  {
    question: "How do I create a payment QR code?",
    answer:
      "Copy your payment link (e.g. venmo.com/yourname or a Stripe payment link), paste it into OneQR, customize the color, and download as SVG or PNG. Print it on receipts, table cards, invoices, or signage. Takes under 60 seconds.",
  },
  {
    question: "Is it secure?",
    answer:
      "OneQR generates a QR code that points to your payment URL — we never handle money or payment data. Security depends on your payment provider (Venmo, PayPal, Stripe, etc.), all of which use bank-grade encryption. The QR code is just a link.",
  },
  {
    question: "Can I track how many people scan my payment QR?",
    answer:
      "Yes, with Pro ($9.99 once). Dynamic QR codes include scan analytics — see total scans, scans per day, and device types. Great for measuring how many customers use QR to pay vs. other methods.",
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

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OneQR Payment QR Code Generator",
  applicationCategory: "BusinessApplication",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Static payment QR codes — free forever",
    },
    {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
      description: "Dynamic payment QR codes — one-time payment, update link anytime",
    },
  ],
};

export default function PaymentQrCodePage() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-400">One</span>QR
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white">
              Pricing
            </Link>
            <Link href="/login" className="text-sm text-zinc-400 hover:text-white">
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-400"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Payment QR Code Generator
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Accept Payments with QR Codes —{" "}
          <span className="text-emerald-400">Free</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Create a QR code that links to your Venmo, PayPal, Cash App, Stripe, or any
          payment page. Customers scan and pay in seconds — no card reader, no cash, no
          app download. Dynamic codes update the link anytime for $9.99 once.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {["No processing fees", "Works with any payment app", "Print-ready SVG"].map(
            (text) => (
              <div key={text} className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm font-medium text-zinc-300">{text}</span>
              </div>
            )
          )}
        </div>

        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your Payment QR Code — Free
        </Link>
      </section>

      {/* Use Cases */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 mt-20">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            6 ways businesses use payment QR codes
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            From table payments to invoice collection — one QR code replaces card
            readers, cash, and &quot;what&apos;s your Venmo?&quot;
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paymentUseCases.map((useCase) => (
              <div
                key={useCase.title}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-950">
                  <svg
                    className="h-5 w-5 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={useCase.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">{useCase.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Payment QR pricing — OneQR vs. alternatives
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Most payment QR tools charge monthly or take a cut of every transaction.
            OneQR is a one-time payment — your margins stay yours.
          </p>

          <div className="mt-10 overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <th className="px-4 py-4 text-left font-medium text-zinc-400">
                    Feature
                  </th>
                  <th className="px-4 py-4 text-left font-medium text-emerald-400">
                    OneQR
                  </th>
                  <th className="px-4 py-4 text-left font-medium text-zinc-400">
                    QR Tiger
                  </th>
                  <th className="px-4 py-4 text-left font-medium text-zinc-400">
                    Square QR
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-zinc-800/50 bg-zinc-950"
                  >
                    <td className="px-4 py-3 text-zinc-300">{row.feature}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-400">
                      {row.oneqr}
                    </td>
                    <td className="px-4 py-3 text-zinc-500">{row.qrtiger}</td>
                    <td className="px-4 py-3 text-zinc-500">{row.square}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-xs text-zinc-600">
            Prices as of March 2026. OneQR generates QR codes linking to your payment provider — no transaction fees.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Create a payment QR code in 3 steps
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                num: 1,
                title: "Paste your payment link",
                desc: "Venmo, PayPal.me, Cash App, Stripe payment link, Zelle — any payment URL works.",
              },
              {
                num: 2,
                title: "Customize & download",
                desc: "Match your brand colors. Export as SVG for crisp signage or PNG for quick prints.",
              },
              {
                num: 3,
                title: "Print & collect payments",
                desc: "Add to table cards, invoices, receipts, or signage. Customers scan and pay instantly.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-950 text-sm font-bold text-emerald-400">
                  {step.num}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-xs text-zinc-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
            >
              Generate Your Payment QR Code
            </Link>
          </div>
        </div>
      </section>

      {/* Free vs Pro comparison */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Free vs. Pro — which is right for your business?
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-lg font-bold text-white">
                Static QR Code — <span className="text-emerald-400">Free</span>
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Free forever, no
                  account needed
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Links to any payment
                  page instantly
                </li>
                <li className="flex gap-2">
                  <span className="text-zinc-600">-</span> Payment link is permanent
                  — can&apos;t change after printing
                </li>
              </ul>
              <p className="mt-4 text-xs text-zinc-600">
                Best for: fixed payment links like Venmo profiles, PayPal.me pages,
                or stable Stripe links.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-6">
              <h3 className="text-lg font-bold text-white">
                Dynamic QR Code —{" "}
                <span className="text-emerald-400">$9.99 once</span>
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Change the payment
                  destination anytime
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Switch providers
                  without reprinting
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Scan analytics —
                  track how many customers pay via QR
                </li>
              </ul>
              <p className="mt-4 text-xs text-emerald-400/60">
                Best for: businesses that may switch payment providers or want to
                track QR payment adoption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Payment QR code FAQ
          </h2>
          <div className="mt-10 flex flex-col gap-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-6"
              >
                <h3 className="font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 text-sm text-zinc-500">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <p className="text-center text-sm text-zinc-600">
            More QR code use cases:{" "}
            <Link href="/use-cases/restaurant-menu" className="text-emerald-400 hover:underline">
              Restaurant menus
            </Link>
            {" · "}
            <Link href="/use-cases/business-cards" className="text-emerald-400 hover:underline">
              Business cards
            </Link>
            {" · "}
            <Link href="/use-cases/real-estate" className="text-emerald-400 hover:underline">
              Real estate
            </Link>
            {" · "}
            <Link href="/qr-codes/wedding" className="text-emerald-400 hover:underline">
              Wedding QR codes
            </Link>
            {" · "}
            <Link href="/use-cases/event-tickets" className="text-emerald-400 hover:underline">
              Event tickets
            </Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Your customers already know how to scan a QR code.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Free static codes for payment links that won&apos;t change. $9.99 once for
          dynamic codes you can update anytime. No monthly fees, no transaction cuts,
          no card reader needed.
        </p>
        <Link
          href="/register"
          className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Get Started Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-600">
              <span className="font-medium text-emerald-400">One</span>
              <span className="font-medium text-zinc-400">QR</span>
              {" "}— Free QR code generator
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-zinc-500 hover:text-white">
                Generator
              </Link>
              <Link href="/pricing" className="text-zinc-500 hover:text-white">
                Pricing
              </Link>
              <Link href="/privacy" className="text-zinc-500 hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-zinc-500 hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
