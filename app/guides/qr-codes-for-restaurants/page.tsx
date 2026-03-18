import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Create a QR Code for Your Restaurant Menu | OneQR",
  description:
    "Free guide: create QR codes for restaurant menus, WiFi, Google reviews, and ordering. Step-by-step with OneQR — no subscription needed.",
  keywords: [
    "restaurant qr code menu",
    "qr code menu maker",
    "how to create a qr code for a restaurant menu",
    "restaurant qr code",
    "qr code for restaurant",
    "digital menu qr code",
  ],
  openGraph: {
    title: "How to Create a QR Code for Your Restaurant Menu",
    description:
      "Free guide: create QR codes for restaurant menus, WiFi, Google reviews, and ordering.",
    type: "article",
  },
};

const faqs = [
  {
    question: "How do I create a QR code for my restaurant menu?",
    answer:
      "Upload your menu to your website or a PDF hosting service, copy the URL, paste it into OneQR, and click Generate. Download the QR code as SVG for print or PNG for digital use. The whole process takes under 30 seconds.",
  },
  {
    question: "Can I update my menu without reprinting the QR code?",
    answer:
      "Yes — use a dynamic QR code ($9.99 one-time with OneQR Pro). Dynamic codes let you change the destination URL anytime. Update your menu online and the same printed QR code points to the new version.",
  },
  {
    question: "How much does a restaurant QR code cost?",
    answer:
      "Static QR codes are completely free with OneQR — unlimited, no signup, no watermark. If you want dynamic codes that you can update after printing, it's a one-time $9.99 payment. No monthly fees.",
  },
  {
    question: "What size should I print a QR code for table tents?",
    answer:
      "At least 2x2 cm (about 0.8 inches) for close-range scanning like table tents. For posters or signage viewed from further away, go larger — 10x10 cm or more. Always download as SVG for print to ensure crisp quality at any size.",
  },
  {
    question: "Can I create a QR code for my restaurant WiFi?",
    answer:
      "Yes. OneQR has a dedicated WiFi QR tab. Enter your network name, password, and encryption type. When customers scan it, their phone connects automatically — no typing required.",
  },
];

const useCases = [
  {
    title: "Digital menu",
    description:
      "Link to your online menu or a PDF. Customers scan at the table and browse on their phone. Update prices or seasonal items without reprinting anything.",
  },
  {
    title: "Google Reviews",
    description:
      "Link directly to your Google Business review page. Place the QR code on receipts or table cards. More reviews = better local search ranking.",
  },
  {
    title: "WiFi access",
    description:
      "Create a WiFi QR code so guests connect instantly — no asking for the password. Works for cafes, bars, and waiting areas.",
  },
  {
    title: "Online ordering",
    description:
      "Link to your ordering page (DoorDash, UberEats, your own site). Put the QR on takeout bags, flyers, or window signs.",
  },
  {
    title: "Reservation page",
    description:
      "Link to OpenTable, Resy, or your booking form. Add to business cards, flyers, or your front window.",
  },
  {
    title: "Social media",
    description:
      "Link to your Instagram, TikTok, or Facebook page. Great for building a following from in-person customers.",
  },
];

export default function RestaurantQRGuide() {
  const jsonLd = {
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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create a QR Code for Your Restaurant Menu",
    description:
      "Create a free QR code for your restaurant menu in under 30 seconds.",
    step: [
      {
        "@type": "HowToStep",
        name: "Get your menu URL",
        text: "Upload your menu to your website or a service like Google Drive, then copy the link.",
      },
      {
        "@type": "HowToStep",
        name: "Generate the QR code",
        text: "Paste the URL into OneQR and click Generate. Customize colors to match your brand.",
      },
      {
        "@type": "HowToStep",
        name: "Download and print",
        text: "Download as SVG for print quality. Add to table tents, menus, window stickers, or receipts.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-600">Q</span>dot
          </Link>
          <Link
            href="/"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Generate QR Code
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Hero */}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          How to Create a QR Code for Your Restaurant Menu
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Replace printed menus with a single QR code. Update prices, add
          seasonal items, and track how many customers scan — all without
          reprinting. Here&apos;s how to do it in under 30 seconds, for free.
        </p>

        {/* Step by step */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">
            3 steps to a restaurant QR code
          </h2>
          <div className="mt-6 flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                1
              </div>
              <div>
                <h3 className="font-semibold">Get your menu URL</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Upload your menu as a PDF to your website, Google Drive, or
                  any file hosting service. Copy the public link. If you use a
                  service like Square, Toast, or your own website, you already
                  have a URL.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                2
              </div>
              <div>
                <h3 className="font-semibold">Generate the QR code</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Paste your menu URL into{" "}
                  <Link href="/" className="text-emerald-600 hover:underline">
                    OneQR&apos;s free generator
                  </Link>
                  . Pick colors that match your brand. Choose high error
                  correction if the QR will be printed small or on textured
                  surfaces.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                3
              </div>
              <div>
                <h3 className="font-semibold">Download and print</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Download as SVG for print (scales perfectly to any size) or
                  PNG for digital use. Add to table tents, laminated cards,
                  window stickers, receipts, or your takeout bags.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why dynamic matters */}
        <section className="mt-16 rounded-xl border border-emerald-200 bg-emerald-50 p-8">
          <h2 className="text-xl font-bold text-emerald-900">
            Why dynamic QR codes save restaurants money
          </h2>
          <p className="mt-3 text-sm text-emerald-800">
            A static QR code points to one URL forever. If you change your menu
            URL, you need a new QR code — which means reprinting everything.
          </p>
          <p className="mt-3 text-sm text-emerald-800">
            A <strong>dynamic QR code</strong> lets you change the destination
            anytime. Update your menu, change the link, and every printed QR
            code automatically points to the new version. No reprinting.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-4">
              <p className="text-xs font-semibold uppercase text-zinc-500">
                Reprinting menus
              </p>
              <p className="mt-1 text-2xl font-bold text-red-600">
                $200-500+
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Per reprint for 50-100 table tents/cards
              </p>
            </div>
            <div className="rounded-lg bg-white p-4">
              <p className="text-xs font-semibold uppercase text-zinc-500">
                Dynamic QR code
              </p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">$9.99</p>
              <p className="mt-1 text-xs text-zinc-500">
                One-time. Update the link as many times as you want.
              </p>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">
            6 ways restaurants use QR codes
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="rounded-lg border border-zinc-200 p-5"
              >
                <h3 className="font-semibold">{uc.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{uc.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-xl bg-zinc-950 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">
            Create your restaurant QR code now
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400">
            Free. No signup. No watermark. Takes 30 seconds.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
          >
            Generate a free QR code
          </Link>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-6 flex flex-col gap-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="border-b border-zinc-200 pb-6"
              >
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-zinc-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-4xl px-6 py-8 text-center text-sm text-zinc-500">
          Built by agents at{" "}
          <a
            href="https://moltcorporation.com"
            className="text-zinc-700 hover:text-zinc-900"
          >
            Moltcorp
          </a>
        </div>
      </footer>
    </div>
  );
}
