import type { Metadata } from "next";
import Link from "next/link";
import { RestaurantQrDemo } from "./qr-demo";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Restaurant Menu QR Code Generator — Free for Any Menu | OneQR",
  description:
    "Create a free QR code for your restaurant menu. Guests scan to view your menu on their phone — no app needed. Update your menu without reprinting QR codes.",
  alternates: {
    canonical: `${baseUrl}/restaurant-menu-qr`,
  },
  openGraph: {
    title: "Restaurant Menu QR Code Generator | OneQR",
    description:
      "Free QR codes for restaurant menus. Guests scan to view your menu — no app needed. Update without reprinting.",
    type: "website",
    siteName: "OneQR",
    url: `${baseUrl}/restaurant-menu-qr`,
    images: [
      {
        url: `${baseUrl}/api/og?title=Restaurant%20Menu%20QR&desc=Free%20QR%20Generator%20for%20Menus`,
        width: 1200,
        height: 630,
        alt: "OneQR - Restaurant Menu QR Code Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant Menu QR Code Generator | OneQR",
    description:
      "Free QR codes for restaurant menus. Guests scan to view your menu — no app needed.",
  },
};

const useCases = [
  {
    title: "Dine-in table menus",
    description:
      "Print a QR code on table tents or stickers. Guests scan to view your full menu on their phone — no waiting for a server to bring a paper menu.",
    keyword: "qr code menu for restaurant",
  },
  {
    title: "Seasonal menu updates",
    description:
      "Change your specials or prices without reprinting anything. Dynamic QR codes point to whatever URL you set — update your menu PDF and every table sees the new version instantly.",
    keyword: "restaurant qr code menu",
  },
  {
    title: "Outdoor seating & food trucks",
    description:
      "Weatherproof QR stickers on outdoor tables or truck windows. Customers scan from the line and know what they want before they reach the counter.",
  },
  {
    title: "Multi-location menus",
    description:
      "Different locations, different menus? One dynamic QR code per location. Change each independently without touching the printed codes.",
  },
  {
    title: "Online ordering",
    description:
      "Link your QR code to Square Online, Toast, or any ordering page. Guests scan to order and pay from their phone — faster table turns, fewer order errors.",
  },
];

const steps = [
  {
    num: 1,
    title: "Upload or link your menu",
    description:
      "Paste a URL to your menu PDF, Google Doc, online ordering page, or any link. Works with Square, Toast, Clover, or a simple PDF.",
  },
  {
    num: 2,
    title: "Generate your QR code",
    description:
      "Get a print-ready QR code in SVG or PNG. High-resolution output that stays sharp on table tents, window decals, or A-frame signs.",
  },
  {
    num: 3,
    title: "Print and place on tables",
    description:
      "Print on table tents, stickers, or laminated cards. With dynamic QR, swap out your menu link anytime — no reprinting needed.",
  },
];

const faqs = [
  {
    question: "How do I create a QR code for my restaurant menu?",
    answer:
      "Upload your menu as a PDF or paste a link to your online menu. OneQR generates a scannable QR code you can print on table tents, stickers, or signage. Static codes are free forever. Dynamic codes ($9.99 one-time) let you change the menu link without reprinting.",
  },
  {
    question: "Can I update my menu without reprinting the QR code?",
    answer:
      "Yes, with a dynamic QR code. The printed code stays the same — you change where it points from your OneQR dashboard. Update prices, add seasonal specials, or swap to a completely new menu. Guests always see the latest version.",
  },
  {
    question: "Do customers need to download an app to view the menu?",
    answer:
      "No. Every smartphone camera (iPhone and Android) reads QR codes natively. Customers point their camera, tap the notification, and your menu opens in their browser. No app, no download, no friction.",
  },
  {
    question: "What format should my menu be in?",
    answer:
      "Any format works. Host a PDF on Google Drive or Dropbox, use an online ordering page (Square, Toast, Clover), or link to a simple webpage. The QR code just points to a URL — whatever loads at that URL is what guests see.",
  },
  {
    question: "How do I track how many people scan my menu QR code?",
    answer:
      "Dynamic QR codes include scan analytics — see how many scans per day, which locations get the most traffic, and peak hours. Use this data to optimize table placement and menu timing.",
  },
  {
    question: "Is the restaurant menu QR code free?",
    answer:
      "Static QR codes are free forever — no account required. Dynamic QR codes (with scan tracking and the ability to change the menu link) are $9.99 one-time. No monthly fees, no per-scan charges.",
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

export default function RestaurantMenuQrPage() {
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
          Restaurant QR Codes
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Restaurant Menu QR Code Generator
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          One QR code on every table. Guests scan to view your menu on their
          phone — no app needed. Update your menu without reprinting a single
          code.
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
              Free to create
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
              No app for guests
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
              Update menu without reprinting
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

      {/* Inline QR Demo */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <RestaurantQrDemo />
      </section>

      {/* Use cases */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            5 ways restaurants use QR code menus
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            From table tents to food trucks — QR menus save printing costs and
            keep every guest on the latest version.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-6"
              >
                <h3 className="font-semibold text-white">{uc.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-step flow */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Menu QR code in 3 steps
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            No design skills needed. Print-ready in under a minute.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center"
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

      {/* Why OneQR for restaurants */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why restaurants choose OneQR
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Update menu without reprinting",
                desc: "Dynamic QR codes let you change the destination anytime. New seasonal menu? Updated prices? Just swap the link — every table sees the new version instantly.",
              },
              {
                title: "Track scans per location",
                desc: "See how many guests scan each day, which tables get the most engagement, and peak hours. Data to optimize your floor layout and menu timing.",
              },
              {
                title: "Works on any phone",
                desc: "Every iPhone and Android camera reads QR codes natively since 2017. No app download, no WiFi required to scan — guests just point and tap.",
              },
              {
                title: "No monthly fees",
                desc: "Static codes are free forever. Dynamic codes are $9.99 once — not a monthly subscription. Print once, use forever, update anytime.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-6"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            The complete guide to QR code menus for restaurants
          </h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-6 text-sm leading-relaxed text-zinc-400">
            <p>
              QR code menus became standard during the pandemic, and
              they&apos;re here to stay. Restaurants of every size — from
              single-location cafes to multi-unit chains — use QR codes to
              replace printed menus, reduce costs, and give guests instant
              access to the latest offerings.
            </p>
            <p>
              The setup is simple: upload your menu as a PDF to Google Drive or
              Dropbox, generate a QR code pointing to the share link, and print
              it on table tents, stickers, or laminated cards. Guests scan with
              their phone camera (no app needed) and your menu opens in their
              browser.
            </p>
            <p>
              The biggest advantage is update speed. When you change prices,
              add a seasonal special, or 86 a dish, you update the PDF or
              webpage — not every printed menu in the building. With a dynamic
              QR code, you don&apos;t even need to reprint the codes. Change
              the destination URL from your dashboard and every table
              automatically points to the new menu.
            </p>
            <p>
              For restaurants with multiple locations, dynamic QR codes solve
              the menu divergence problem. Each location gets its own code
              pointing to its own menu. Corporate updates one location&apos;s
              pricing without touching the others. No cross-contamination, no
              printing delays.
            </p>
            <p>
              Food trucks and pop-ups benefit even more. A weatherproof QR
              sticker on the truck window means customers scan from the line
              and know their order before they reach the counter. Faster
              service, fewer order changes, higher throughput.
            </p>
            <p>
              For print quality, download your QR code as SVG. This vector
              format stays perfectly sharp whether it&apos;s on a 3-inch table
              tent or a 2-foot window decal. PNG works for digital screens, but
              SVG is the right choice for anything printed.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Restaurant menu QR code FAQ
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
          Your menu deserves a modern upgrade
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Free QR codes for restaurant menus. Dynamic codes that update without
          reprinting are $9.99 once — not a subscription.
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
