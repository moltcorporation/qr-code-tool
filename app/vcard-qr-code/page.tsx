import type { Metadata } from "next";
import Link from "next/link";
import { VCardQrGenerator } from "./generator";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "vCard QR Code Generator — Create Digital Contact Cards | OneQR",
  description:
    "Generate a free vCard QR code. Scanning adds your name, phone, email, and company to any phone's contacts instantly. Create your digital contact card in seconds.",
  keywords: [
    "vcard format for qr code",
    "vcard qr code generator",
    "what is a vcard qr code",
    "how to make vcard qr code",
    "digital contact card qr code",
    "qr code business card vcard",
    "vcard qr code free",
  ],
  alternates: {
    canonical: `${baseUrl}/vcard-qr-code`,
  },
  openGraph: {
    title: "vCard QR Code Generator — Create Digital Contact Cards | OneQR",
    description:
      "Free vCard QR code generator. One scan adds your contact info to any phone. No app required.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "vCard QR Code Generator — Digital Contact Cards | OneQR",
    description:
      "Free vCard QR code generator. One scan adds your contact info to any phone instantly.",
  },
};

const steps = [
  {
    num: 1,
    title: "Enter your contact details",
    description:
      "Fill in your name, phone, email, company, and website. Only name is required — add as many fields as you want.",
  },
  {
    num: 2,
    title: "Generate your vCard QR code",
    description:
      "Click generate to create a QR code that encodes your contact info in vCard 3.0 format. Customize colors to match your brand.",
  },
  {
    num: 3,
    title: "Download & share",
    description:
      "Download SVG for print or PNG for digital. Add it to your business card, email signature, or event badge. Anyone who scans sees \"Add Contact\" with your info pre-filled.",
  },
];

const useCases = [
  {
    title: "Business cards",
    description:
      "Print the QR code on the back of your card. Contacts scan and save your info without typing. Eliminates data entry errors from handwritten notes.",
    icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
  },
  {
    title: "Email signatures",
    description:
      "Embed the QR code image in your email signature. Recipients on mobile can scan right from the email to save your contact info.",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Trade shows & conferences",
    description:
      "Display your vCard QR on your badge, booth banner, or presentation slides. Attendees save your info in seconds — no card swap needed.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Networking events",
    description:
      "Pull up the QR code on your phone screen. The other person scans it — your name, number, email, and company land directly in their contacts.",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  },
];

const faqs = [
  {
    question: "What is a vCard QR code?",
    answer:
      "A vCard QR code encodes your contact information (name, phone, email, company, website) in a standardized vCard format. When someone scans it with their phone camera, their device opens the \"Add Contact\" screen with all your details pre-filled. No app download needed — it works with the built-in camera on both iPhone and Android.",
  },
  {
    question: "How is a vCard QR code different from a URL QR code?",
    answer:
      "A URL QR code links to a webpage — the scanner opens a browser. A vCard QR code triggers the phone's native contact app and pre-fills your info for instant saving. vCard is better for quick contact exchange; URL is better when you want to showcase a portfolio, LinkedIn, or landing page with more detail.",
  },
  {
    question: "What is the vCard format for QR codes?",
    answer:
      "vCard (also called VCF) is a standard file format for electronic business cards. The QR code encodes a text block starting with BEGIN:VCARD and ending with END:VCARD, with fields like FN (full name), TEL (phone), EMAIL, ORG (company), and URL. OneQR uses vCard 3.0, which is universally supported across all modern smartphones.",
  },
  {
    question: "Can I include a photo in my vCard QR code?",
    answer:
      "Technically yes, but it's not practical. Photos encoded in vCard format (Base64) massively increase the QR code's data density, making it physically larger and harder to scan. Most vCard QR generators — including OneQR — omit photos. Instead, link to a webpage with your photo using the URL field, or use a dynamic QR code that points to a contact page with your headshot.",
  },
  {
    question: "How do I create a vCard QR code?",
    answer:
      "Use the generator above: enter your name, phone, email, company, and website. Click \"Generate vCard QR Code\" to create your code instantly. Download it as SVG (for print) or PNG (for digital). The entire process takes under 30 seconds and requires no account.",
  },
  {
    question: "Do vCard QR codes work on both iPhone and Android?",
    answer:
      "Yes. Both iOS and Android natively support vCard format. When scanned with the built-in camera app, the phone detects the contact data and offers to save it. No third-party app is required. vCard 3.0 (used by OneQR) has the broadest compatibility across devices.",
  },
  {
    question: "What's the difference between vCard and MECARD format?",
    answer:
      "Both encode contact information, but vCard (VCF) is the industry standard with broader device support and more fields (job title, website, notes). MECARD is a simpler format used by some older Android devices. OneQR uses vCard 3.0 because it works reliably across all modern smartphones.",
  },
  {
    question: "Can I update my vCard QR code after printing?",
    answer:
      "Not with a free static vCard QR code — the contact data is encoded directly in the image. With OneQR Pro ($9.99 once), you can create a dynamic QR code that redirects to an updatable contact page. Change your phone number, email, or company anytime without reprinting.",
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
  name: "OneQR vCard QR Code Generator",
  applicationCategory: "UtilitiesApplication",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Static vCard QR codes — free forever",
    },
    {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
      description: "Dynamic QR codes with scan analytics — update anytime",
    },
  ],
};

export default function VCardQrCodePage() {
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
          vCard QR Codes
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          vCard QR Code Generator — Create Digital Contact Cards
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Turn your contact details into a scannable QR code. One scan adds your
          name, phone, email, and company directly to any phone&apos;s contacts.
          No app needed.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {["Free forever", "vCard 3.0 format", "Works on all phones"].map(
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
      </section>

      {/* Inline vCard QR Generator */}
      <section className="mx-auto max-w-2xl px-6 pt-12 pb-20">
        <VCardQrGenerator />
      </section>

      {/* What is a vCard QR code */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            What is a vCard QR code?
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-sm text-zinc-400">
            <p>
              A vCard QR code encodes your contact information in a standardized
              electronic business card format. Unlike a URL QR code that opens a
              webpage, a vCard QR code triggers the phone&apos;s native contact
              app and pre-fills your name, phone number, email, company, and
              website — ready to save with one tap.
            </p>
            <p>
              The vCard format (also called VCF — Virtual Contact File) has been
              an industry standard since 1995. It&apos;s supported by every
              modern smartphone, email client, and contact management tool. When
              you encode contact data as a vCard inside a QR code, you create
              the fastest possible way to exchange contact information.
            </p>
            <p>
              Think of it as a digital business card that never runs out. Print
              it on paper cards, display it on a screen at events, or embed it
              in your email signature. Anyone with a phone camera can save your
              info in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* vCard format explained */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            The vCard format explained
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Understanding the data structure behind your vCard QR code.
          </p>

          <div className="mx-auto mt-10 max-w-xl rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <pre className="overflow-x-auto text-sm text-zinc-300">
              <code>{`BEGIN:VCARD
VERSION:3.0
N:Smith;Jane;;;
FN:Jane Smith
ORG:Acme Inc.
TITLE:Marketing Director
TEL;TYPE=CELL:+15551234567
EMAIL:jane@acme.com
URL:https://acme.com
END:VCARD`}</code>
            </pre>
          </div>

          <div className="mx-auto mt-8 max-w-2xl space-y-3">
            {[
              { field: "N", desc: "Structured name — last;first format" },
              { field: "FN", desc: "Display name shown in the contact app" },
              { field: "ORG", desc: "Company or organization name" },
              { field: "TITLE", desc: "Job title or role" },
              { field: "TEL", desc: "Phone number with type (cell, work, home)" },
              { field: "EMAIL", desc: "Email address" },
              { field: "URL", desc: "Website URL" },
            ].map((item) => (
              <div
                key={item.field}
                className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3"
              >
                <code className="shrink-0 rounded bg-emerald-950 px-2 py-0.5 text-xs font-bold text-emerald-400">
                  {item.field}
                </code>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-zinc-600">
            OneQR uses vCard 3.0 — the most widely supported version across
            iPhone, Android, and desktop contact apps.
          </p>
        </div>
      </section>

      {/* How to create step-by-step */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            How to create a vCard QR code
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Under 30 seconds. No account needed for free static codes.
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
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-xs text-zinc-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* vCard QR with photo */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            vCard QR code with photo — limitations & workarounds
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-sm text-zinc-400">
            <p>
              The vCard 3.0 standard supports embedding photos using Base64
              encoding. In theory, you can include a headshot directly in the
              QR code. In practice, this creates problems:
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                <p>
                  <span className="font-semibold text-white">Data explosion:</span>{" "}
                  Even a small 100×100 JPEG adds 10–15 KB of Base64 text. QR codes
                  encode data visually — more data means a denser, larger code
                  that&apos;s harder to scan from a business card.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                <p>
                  <span className="font-semibold text-white">Scan reliability:</span>{" "}
                  A vCard with a photo may require a QR code so large it
                  won&apos;t fit on a standard business card. Phone cameras
                  struggle with high-density codes at close range.
                </p>
              </div>
              <div className="rounded-lg border border-emerald-800/50 bg-emerald-950/20 p-4">
                <p>
                  <span className="font-semibold text-white">Better approach:</span>{" "}
                  Skip the embedded photo. Instead, include a URL field pointing
                  to a personal page or LinkedIn profile with your headshot.
                  Or use a{" "}
                  <Link href="/register" className="text-emerald-400 hover:underline">
                    dynamic QR code
                  </Link>{" "}
                  that links to a contact page with your photo, bio, and social links.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Where to use your vCard QR code
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Any place where you exchange contact information — physical or digital.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {useCases.map((uc) => (
              <div
                key={uc.title}
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
                      d={uc.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">{uc.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* vCard vs URL comparison */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            vCard QR vs URL QR — which should you use?
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-6">
              <h3 className="text-lg font-bold text-white">
                vCard QR code
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Opens &ldquo;Add Contact&rdquo;
                  instantly
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> No internet needed
                  to save contact
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Zero friction — one
                  scan, one tap
                </li>
                <li className="flex gap-2">
                  <span className="text-zinc-600">-</span> Can&apos;t include
                  photos practically
                </li>
              </ul>
              <p className="mt-4 text-xs text-emerald-400/60">
                Best for: quick contact exchange at events, networking, business cards.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-lg font-bold text-white">
                URL QR code
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Links to any webpage
                  — full control over content
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Can include photos,
                  portfolio, social links
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Trackable with
                  analytics
                </li>
                <li className="flex gap-2">
                  <span className="text-zinc-600">-</span> Requires internet to
                  load the page
                </li>
              </ul>
              <p className="mt-4 text-xs text-zinc-600">
                Best for: portfolios, LinkedIn profiles, landing pages with more detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Static vs Dynamic CTA */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Free vs. Pro — which vCard QR code?
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
                  <span className="text-emerald-400">+</span> Contact data encoded
                  directly — works offline
                </li>
                <li className="flex gap-2">
                  <span className="text-zinc-600">-</span> Can&apos;t update info
                  after printing
                </li>
              </ul>
              <p className="mt-4 text-xs text-zinc-600">
                Best for: stable contact info you won&apos;t change soon.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-6">
              <h3 className="text-lg font-bold text-white">
                Pro — <span className="text-emerald-400">$9.99 once</span>
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Update contact
                  details anytime
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Scan analytics — who
                  scanned, when, where
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> One-time payment, no
                  subscription
                </li>
              </ul>
              <p className="mt-4 text-xs text-emerald-400/60">
                Best for: business cards printed in bulk — update without reprinting.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/register"
              className="inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
            >
              Get OneQR Pro — $9.99 Once
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            vCard QR code FAQ
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
            More QR code tools:{" "}
            <Link href="/business-card-qr" className="text-emerald-400 hover:underline">
              Business card QR codes
            </Link>
            {" · "}
            <Link href="/qr-codes/wifi" className="text-emerald-400 hover:underline">
              WiFi QR signs
            </Link>
            {" · "}
            <Link href="/qr-codes/wedding" className="text-emerald-400 hover:underline">
              Wedding QR codes
            </Link>
            {" · "}
            <Link href="/restaurant-menu-qr" className="text-emerald-400 hover:underline">
              Restaurant menus
            </Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Your contact info, one scan away.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Generate a free vCard QR code. One scan adds your name, phone, email,
          and company to any phone&apos;s contacts. Dynamic codes let you update
          your info after printing — $9.99 once.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your vCard QR Code — Free
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
