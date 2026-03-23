import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "QR Code Generator for Wedding — Free Invitations, RSVP & Photos | OneQR",
  description:
    "Generate free QR codes for your wedding. Link invitations to RSVP, photo albums, or your registry. Dynamic QR codes update after printing — $9.99 once. No monthly fees.",
  alternates: {
    canonical: `${baseUrl}/qr-codes/wedding`,
  },
  openGraph: {
    title: "QR Code Generator for Wedding — Free | OneQR",
    description:
      "Generate QR codes for wedding invitations, RSVP, photo sharing, and gift registries. Free static codes. Dynamic codes $9.99 once.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator for Wedding — Free | OneQR",
    description:
      "Generate QR codes for wedding invitations, RSVP, photo sharing, and gift registries. Free static. Dynamic $9.99 once.",
  },
};

const pricingRows = [
  {
    feature: "Static QR codes",
    oneqr: "Free forever",
    qrtiger: "$7/mo ($84/yr)",
    beaconstac: "$5/mo ($60/yr)",
  },
  {
    feature: "Dynamic QR codes",
    oneqr: "$9.99 once",
    qrtiger: "$7/mo ($84/yr)",
    beaconstac: "$14/mo ($168/yr)",
  },
  {
    feature: "SVG export (print-ready)",
    oneqr: "Included",
    qrtiger: "Paid plans only",
    beaconstac: "Paid plans only",
  },
  {
    feature: "Custom colors",
    oneqr: "Free",
    qrtiger: "Free",
    beaconstac: "Paid plans",
  },
  {
    feature: "No account required",
    oneqr: "Yes (static)",
    qrtiger: "No",
    beaconstac: "No",
  },
];

const weddingIdeas = [
  {
    title: "Save-the-date cards",
    description:
      "Add a QR code linking to your wedding website. Guests get all the details — venue, accommodation, dress code — with one scan.",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    title: "Invitation RSVP",
    description:
      "Link directly to your RSVP form — Google Forms, Zola, The Knot, or any URL. Guests respond from their phone in seconds.",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Reception photo sharing",
    description:
      "Table cards with a QR code to a shared photo album. Every guest uploads their shots — you get the full story by Monday morning.",
    icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Gift registry",
    description:
      "Point guests to your Amazon, Zola, or custom registry. One scan opens your wish list — no fumbling with URLs at the bridal shower.",
    icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
  },
  {
    title: "Venue WiFi access",
    description:
      "A WiFi QR code at the reception lets guests connect instantly. No hunting for the password, no asking the bartender.",
    icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0",
  },
  {
    title: "Ceremony program",
    description:
      "Replace printed programs with a QR code on the ceremony seat. Guests scan to see the full order of service, readings, and song lyrics.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
];

const faqs = [
  {
    question: "What is the best QR code generator for weddings?",
    answer:
      "OneQR is built for wedding use cases: free static QR codes (no account needed), SVG export for crisp printing on invitations, custom colors to match your theme, and $9.99 one-time dynamic codes that let you change the link after printing. No monthly subscriptions to cancel after the honeymoon.",
  },
  {
    question: "How do I add a QR code to a wedding invitation?",
    answer:
      "Generate your QR code, download as SVG, and place it on the back of your invitation or on an insert card using Canva, Adobe InDesign, or your stationer's design tool. Size it at least 1 inch (2.5 cm) square for reliable scanning. Test it before printing the full run.",
  },
  {
    question: "Static vs dynamic — which should I use for my wedding?",
    answer:
      "Static is free and works if your link won't change. Dynamic ($9.99 once) lets you swap the destination after printing — use RSVP before the wedding, switch to photo album after. For most couples, dynamic is worth the $10 for the flexibility.",
  },
  {
    question: "Can guests scan without downloading an app?",
    answer:
      "Yes. iPhone (iOS 11+) and Android phones scan QR codes with the built-in camera. Point the camera at the code, tap the notification, done. No special app needed.",
  },
  {
    question: "What size should a wedding QR code be?",
    answer:
      "Minimum 1 inch (2.5 cm) for invitation inserts. 2-3 inches for table cards. 6+ inches for reception signage. OneQR exports SVG — it stays sharp at any size, no pixelation.",
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
  name: "OneQR Wedding QR Code Generator",
  applicationCategory: "DesignApplication",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Static QR codes — free forever",
    },
    {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
      description: "Dynamic QR codes — one-time payment, update link after printing",
    },
  ],
};

export default function WeddingQrCodePage() {
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
          Wedding QR Code Generator
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Generate QR Codes for Your Wedding —{" "}
          <span className="text-emerald-400">Free</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Invitations, RSVP, photo sharing, registry, venue WiFi — one QR code
          handles it all. Guests scan with their phone camera. No app needed. Change
          the link after printing for $9.99 once.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {["No credit card required", "Cancel anytime", "Print-ready SVG"].map(
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
          Create Your Wedding QR Code — Free
        </Link>
      </section>

      {/* 6 Wedding QR Ideas */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 mt-20">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            6 ways to use QR codes at your wedding
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            From save-the-date to thank-you cards — a QR code replaces every
            awkward URL.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {weddingIdeas.map((idea) => (
              <div
                key={idea.title}
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
                      d={idea.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">{idea.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{idea.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Wedding QR code pricing — OneQR vs. competitors
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Most QR tools charge monthly. You&apos;re planning a wedding, not a
            recurring subscription.
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
                    Beaconstac
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
                    <td className="px-4 py-3 text-zinc-500">{row.beaconstac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-xs text-zinc-600">
            Prices as of March 2026. Dynamic QR = link can be changed after printing.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Generate a wedding QR code in 60 seconds
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                num: 1,
                title: "Paste your URL",
                desc: "RSVP form, photo album, registry, wedding website — any link works.",
              },
              {
                num: 2,
                title: "Customize & download",
                desc: "Match your wedding colors. Export as SVG for crisp printing on any material.",
              },
              {
                num: 3,
                title: "Print & share",
                desc: "Add to invitations, place cards, or signage. With dynamic QR, swap the link anytime.",
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
              Generate Your Wedding QR Code
            </Link>
          </div>
        </div>
      </section>

      {/* Pro tip: static vs dynamic */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Static vs. dynamic — which is right for your wedding?
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
                  <span className="text-emerald-400">+</span> Works instantly —
                  generate and download
                </li>
                <li className="flex gap-2">
                  <span className="text-zinc-600">-</span> Link is permanent — can&apos;t
                  change after printing
                </li>
              </ul>
              <p className="mt-4 text-xs text-zinc-600">
                Best for: registry links, venue maps, Spotify playlists — URLs
                that won&apos;t change.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-6">
              <h3 className="text-lg font-bold text-white">
                Dynamic QR Code —{" "}
                <span className="text-emerald-400">$9.99 once</span>
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Change the
                  destination after printing
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> RSVP before →
                  photo album after
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Scan analytics —
                  see how many guests scanned
                </li>
              </ul>
              <p className="mt-4 text-xs text-emerald-400/60">
                Best for: invitations and save-the-dates where you want
                flexibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Wedding QR code FAQ
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
            <Link href="/use-cases/event-tickets" className="text-emerald-400 hover:underline">
              Event tickets
            </Link>
            {" · "}
            <Link href="/restaurant-menu-qr" className="text-emerald-400 hover:underline">
              Restaurant menus
            </Link>
            {" · "}
            <Link href="/qr-codes/wifi" className="text-emerald-400 hover:underline">
              WiFi QR signs
            </Link>
            {" · "}
            <Link href="/business-card-qr" className="text-emerald-400 hover:underline">
              Business cards
            </Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Your guests already know how to scan a QR code.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Free static codes for links that won&apos;t change. $9.99 once for
          dynamic codes you can update after printing. No monthly fees, no app
          for guests.
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
