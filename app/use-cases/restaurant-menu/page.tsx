import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "QR Menu for Restaurants — $9.99 Once, Not $29/mo | OneQR",
  description:
    "Create a QR code menu for your restaurant. Update your menu anytime without reprinting. One-time $9.99 — competitors charge $29-99/mo. Free to start.",
  alternates: {
    canonical: `${baseUrl}/use-cases/restaurant-menu`,
  },
  openGraph: {
    title: "QR Menu for Restaurants — $9.99 Once | OneQR",
    description:
      "Restaurant QR code menus that update without reprinting. One-time $9.99 vs competitors at $29-99/mo.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Menu for Restaurants — $9.99 Once | OneQR",
    description:
      "Restaurant QR code menus that update without reprinting. One-time $9.99 vs competitors at $29-99/mo.",
  },
};

const competitors = [
  { name: "MenuTiger", price: "$29/mo", annual: "$348/yr", note: "50 menus" },
  { name: "QR Tiger", price: "$7/mo", annual: "$84/yr", note: "Dynamic QR" },
  { name: "Beaconstac", price: "$5/mo", annual: "$60/yr", note: "1 QR code" },
  {
    name: "ScanIt.Menu",
    price: "$49/mo",
    annual: "$588/yr",
    note: "Per location",
  },
];

const steps = [
  {
    num: 1,
    title: "Upload your menu",
    description:
      "Link to your menu PDF, Google Doc, or web page. Any URL works — no special format needed.",
  },
  {
    num: 2,
    title: "Generate your QR code",
    description:
      "Get a print-ready QR code in SVG or PNG. Download it in seconds, no account required for static codes.",
  },
  {
    num: 3,
    title: "Print and place on tables",
    description:
      "Print table cards, tent cards, or stickers. When your menu changes, update the link — same QR code, new menu.",
  },
];

const faqs = [
  {
    question: "Can I update my menu without reprinting QR codes?",
    answer:
      "Yes. With a dynamic QR code (Pro, $9.99 one-time), you can change the destination URL anytime. Your printed QR codes stay the same — customers scan the same code and see the updated menu.",
  },
  {
    question: "What format should my menu be in?",
    answer:
      "Any URL works. Link to a PDF hosted on Google Drive, a page on your website, or a service like Canva. As long as it has a URL, OneQR can point to it.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Static QR codes are free forever. Dynamic QR codes (where you can change the destination after printing) are a one-time $9.99 payment. No monthly fees, no per-location charges.",
  },
  {
    question: "Do I need an account?",
    answer:
      "Not for static QR codes — generate and download instantly. For dynamic codes with scan tracking, create a free account and upgrade to Pro for $9.99 once.",
  },
  {
    question: "How is this different from MenuTiger or QR Tiger?",
    answer:
      "Most restaurant QR tools charge $29-99/mo per location. OneQR charges $9.99 once, total. You get dynamic QR codes and scan analytics without monthly fees.",
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

export default function RestaurantMenuPage() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-400">One</span>QR
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/pricing"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-sm text-zinc-400 hover:text-white"
            >
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
          Restaurant QR Menus
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          QR Menu for Your Restaurant —{" "}
          <span className="text-emerald-400">$9.99 Once</span>, Not $29/mo
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Your seasonal specials change. Your table cards don&apos;t have to.
          Create a QR code that links to your menu — and update the destination
          anytime without reprinting. Most tools charge monthly. OneQR is a
          one-time payment.
        </p>

        {/* Trust bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          <div className="flex items-center gap-2">
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
            <span className="text-sm font-medium text-zinc-300">
              No monthly fees
            </span>
          </div>
          <div className="flex items-center gap-2">
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
            <span className="text-sm font-medium text-zinc-300">
              No per-location charges
            </span>
          </div>
          <div className="flex items-center gap-2">
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
            <span className="text-sm font-medium text-zinc-300">
              Update menu anytime
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your Menu QR Code — Free
        </Link>
      </section>

      {/* Competitor pricing comparison */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Stop paying monthly rent on your menu QR
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
          Restaurant QR code tools charge $29–99/mo. OneQR charges $9.99 once.
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900">
                <th className="px-6 py-4 text-left font-medium text-zinc-400">
                  Tool
                </th>
                <th className="px-6 py-4 text-left font-medium text-zinc-400">
                  Monthly
                </th>
                <th className="px-6 py-4 text-left font-medium text-zinc-400">
                  Annual cost
                </th>
                <th className="px-6 py-4 text-left font-medium text-zinc-400">
                  Limit
                </th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => (
                <tr
                  key={c.name}
                  className="border-b border-zinc-800/50 bg-zinc-950"
                >
                  <td className="px-6 py-4 text-zinc-300">{c.name}</td>
                  <td className="px-6 py-4 text-red-400 line-through">
                    {c.price}
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{c.annual}</td>
                  <td className="px-6 py-4 text-zinc-500">{c.note}</td>
                </tr>
              ))}
              <tr className="bg-emerald-950/30">
                <td className="px-6 py-4 font-semibold text-emerald-400">
                  OneQR
                </td>
                <td className="px-6 py-4 font-bold text-emerald-400">
                  $9.99 once
                </td>
                <td className="px-6 py-4 text-emerald-300">$9.99 total</td>
                <td className="px-6 py-4 text-emerald-300">Unlimited</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-600">
          Prices as of March 2026. All competitors require ongoing subscriptions.
        </p>
      </section>

      {/* 3-step flow */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Menu QR code in 3 steps
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            No design skills needed. Takes under 2 minutes.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-950 text-sm font-bold text-emerald-400">
                  {step.num}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {step.title}
                  </p>
                  <p className="mt-2 text-xs text-zinc-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
            >
              Generate Your Menu QR Code
            </Link>
          </div>
        </div>
      </section>

      {/* Why restaurants switch */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why restaurants switch to OneQR
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Seasonal menus, zero reprints",
                desc: "Change from spring to summer menu by updating a link. Your table cards stay the same.",
              },
              {
                title: "Track which tables scan",
                desc: "Pro includes scan analytics — see how many scans per day and when diners are most active.",
              },
              {
                title: "Works with any menu format",
                desc: "PDF on Google Drive, Canva design, your website — if it has a URL, it works with OneQR.",
              },
              {
                title: "Print-ready downloads",
                desc: "Download as SVG (sharp at any size for print shops) or PNG (quick prints on your own printer).",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Restaurant QR menu FAQ
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

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Your menu changes. Your QR code doesn&apos;t have to.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Static QR codes are free — no account needed. Dynamic codes that
          update after printing are $9.99 once. Not monthly. Not per location.
          Once.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your Menu QR Code — Free
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
              <Link
                href="/"
                className="text-zinc-500 hover:text-white"
              >
                Generator
              </Link>
              <Link
                href="/pricing"
                className="text-zinc-500 hover:text-white"
              >
                Pricing
              </Link>
              <Link
                href="/privacy"
                className="text-zinc-500 hover:text-white"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-zinc-500 hover:text-white"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
