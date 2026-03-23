import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "WiFi QR Code Sign Generator — Free Printable Signs for Business | OneQR",
  description:
    "Create a free WiFi QR code sign for your business, cafe, Airbnb, or office. Guests scan to connect — no typing passwords. Print-ready designs. Dynamic codes update when passwords change.",
  alternates: {
    canonical: `${baseUrl}/qr-codes/wifi`,
  },
  openGraph: {
    title: "WiFi QR Code Sign Generator — Free | OneQR",
    description:
      "Free printable WiFi QR code signs. Guests scan to connect — no passwords. Perfect for cafes, Airbnbs, and offices.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "WiFi QR Code Sign Generator — Free | OneQR",
    description:
      "Free printable WiFi QR code signs. Guests scan to connect — no passwords. Perfect for cafes, Airbnbs, offices.",
  },
};

const signTemplates = [
  {
    title: "Cafe & restaurant counter sign",
    description:
      "\"Scan to connect\" table tent or counter card. Place near the register or on each table. Customers connect without interrupting staff.",
    bestFor: "Coffee shops, restaurants, bars",
    icon: "M3 3h18v18H3V3zm4 4v2h10V7H7zm0 4v2h10v-2H7zm0 4v2h6v-2H7z",
  },
  {
    title: "Airbnb & vacation rental card",
    description:
      "Welcome card with WiFi QR code, network name, and password backup. Leave near the router or on the kitchen counter. Guests connect on arrival.",
    bestFor: "Short-term rentals, hotels, B&Bs",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    title: "Office lobby sign",
    description:
      "Professional wall-mount or desk sign for guest WiFi. Visitors and clients connect without IT support. Update the password without reprinting (Pro).",
    bestFor: "Offices, coworking spaces, clinics",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Event & conference badge",
    description:
      "Include a WiFi QR code on lanyards, programs, or wayfinding signage. Attendees connect the moment they walk in.",
    bestFor: "Conferences, meetups, workshops",
    icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z",
  },
];

const howItWorks = [
  {
    num: 1,
    title: "Enter your WiFi details",
    description:
      "Network name (SSID), password, and encryption (WPA/WPA2). The QR code encodes credentials directly — no URL involved.",
  },
  {
    num: 2,
    title: "Download your sign",
    description:
      "Get a print-ready SVG or PNG. The QR code works offline — it connects devices directly to your network, no internet detour.",
  },
  {
    num: 3,
    title: "Print & display",
    description:
      "Print on cardstock, laminate for durability, or frame it. Place where guests naturally look — counter, wall, or table.",
  },
];

const faqs = [
  {
    question: "How does a WiFi QR code sign work?",
    answer:
      "The QR code encodes your network name, password, and encryption type. When someone scans it with their phone camera, their device auto-joins your WiFi. It works offline — no URL, no internet connection needed to connect.",
  },
  {
    question: "Is a WiFi QR code sign free to make?",
    answer:
      "Yes. Static WiFi QR codes are completely free on OneQR — no account required. Generate, download, print. If you want to update the password later without reprinting the sign, upgrade to a dynamic QR code for $9.99 once.",
  },
  {
    question: "What if I change my WiFi password?",
    answer:
      "With a free static code, you generate a new QR code and reprint the sign. With a OneQR Pro dynamic code ($9.99 once), you update the password in your dashboard and the same printed sign keeps working. Ideal for businesses that rotate passwords.",
  },
  {
    question: "Does it work on all phones?",
    answer:
      "Yes. iPhone (iOS 11+) and Android phones scan WiFi QR codes natively with the built-in camera app. No special app needed. When scanned, the phone prompts to join the network automatically.",
  },
  {
    question: "Is my WiFi password safe on the sign?",
    answer:
      "Your password is encoded in the QR code image itself — it never touches a server (for static codes). Anyone who can scan the sign can connect, just like anyone who can see a written password. Place the sign where you would normally share the password.",
  },
  {
    question: "What size should I print the WiFi QR code?",
    answer:
      "Counter cards: 3-4 inches. Wall signs: 6-8 inches. Table tents: 2-3 inches. OneQR exports SVG, which stays perfectly sharp at any size. For laminated signs, use a matte finish to avoid glare that blocks scanning.",
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
  name: "OneQR WiFi QR Code Sign Generator",
  applicationCategory: "UtilitiesApplication",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Static WiFi QR codes — free forever",
    },
    {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
      description: "Dynamic WiFi QR codes — update password without reprinting",
    },
  ],
};

export default function WifiQrSignPage() {
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
          WiFi QR Code Signs
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Free WiFi QR Code Sign Generator
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Stop writing your WiFi password on a sticky note. Generate a QR code sign
          that connects guests to your network instantly — they scan, they&apos;re
          online. Print-ready. Works on every phone.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {["Free forever", "No app for guests", "Update password without reprinting"].map(
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
          Create Your WiFi QR Sign — Free
        </Link>
      </section>

      {/* Sign templates / use cases */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 mt-20">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            WiFi QR code sign ideas for your business
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Print once, use forever. Dynamic codes let you change the password without
            reprinting.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {signTemplates.map((template) => (
              <div
                key={template.title}
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
                      d={template.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">{template.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  {template.description}
                </p>
                <p className="mt-3 text-xs text-emerald-400/60">
                  Best for: {template.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why businesses need WiFi QR signs */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why businesses switch to WiFi QR code signs
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "No more password questions",
                desc: "Staff don't get interrupted. Guests don't feel awkward asking. One scan — connected.",
              },
              {
                title: "Works with any router",
                desc: "WiFi QR codes use a universal standard (WPA). Any WiFi network, any router brand — it just works.",
              },
              {
                title: "Rotate passwords safely",
                desc: "With Pro ($9.99 once), update the password in your dashboard. The printed sign keeps working — no reprinting.",
              },
              {
                title: "Professional appearance",
                desc: "A clean QR code sign looks better than a handwritten password on a napkin. Matches your brand with custom colors.",
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

      {/* How it works */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Create your WiFi QR code sign in 3 steps
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Under 60 seconds. No account needed for free codes.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {howItWorks.map((step) => (
              <div
                key={step.num}
                className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-950 text-sm font-bold text-emerald-400">
                  {step.num}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-xs text-zinc-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
            >
              Generate Your WiFi QR Sign
            </Link>
          </div>
        </div>
      </section>

      {/* Static vs Dynamic for businesses */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Free vs. Pro — which WiFi QR code is right?
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-lg font-bold text-white">
                Static — <span className="text-emerald-400">Free</span>
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Free forever, no
                  account
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Works offline — no
                  internet needed to connect
                </li>
                <li className="flex gap-2">
                  <span className="text-zinc-600">-</span> Need to reprint if
                  password changes
                </li>
              </ul>
              <p className="mt-4 text-xs text-zinc-600">
                Best for: home WiFi, fixed passwords, one-time events.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-6">
              <h3 className="text-lg font-bold text-white">
                Pro — <span className="text-emerald-400">$9.99 once</span>
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Update password
                  without reprinting
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Scan analytics —
                  see how many guests connect
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> One-time payment,
                  no subscription
                </li>
              </ul>
              <p className="mt-4 text-xs text-emerald-400/60">
                Best for: businesses, Airbnbs, offices — anywhere passwords
                rotate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Printing tips */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Printing tips for WiFi QR code signs
          </h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-4 text-sm text-zinc-400">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p>
                <span className="font-semibold text-white">Size:</span> At least 2
                inches for table cards, 4+ inches for wall signs. OneQR exports SVG —
                scales perfectly to any size.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p>
                <span className="font-semibold text-white">Material:</span> Laminate
                for durability in kitchens and bathrooms. Use matte finish — glossy
                laminate can cause glare that blocks scanning.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p>
                <span className="font-semibold text-white">Placement:</span> Near
                where people sit or wait — front desk, each table, nightstand in
                Airbnbs. Eye-level on walls. Always include &quot;Scan to connect to
                WiFi&quot; text.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p>
                <span className="font-semibold text-white">Backup text:</span> Print
                the network name and password below the QR code for guests with older
                phones. Not everyone has iOS 11+ or a recent Android.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            WiFi QR code sign FAQ
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
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <p className="text-center text-sm text-zinc-600">
            More QR code use cases:{" "}
            <Link href="/qr-codes/wedding" className="text-emerald-400 hover:underline">
              Wedding QR codes
            </Link>
            {" · "}
            <Link href="/restaurant-menu-qr" className="text-emerald-400 hover:underline">
              Restaurant menus
            </Link>
            {" · "}
            <Link href="/use-cases/real-estate" className="text-emerald-400 hover:underline">
              Real estate
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
          Your guests deserve better than a sticky note.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Free WiFi QR code signs — generate, print, display. Dynamic codes let
          you update passwords without reprinting, $9.99 once.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your WiFi QR Sign — Free
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
