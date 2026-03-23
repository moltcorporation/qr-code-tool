import type { Metadata } from "next";
import Link from "next/link";
import { BusinessCardQrGenerator } from "./generator";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Create a QR Code for Business Cards — Free Generator | OneQR",
  description:
    "Generate a free QR code for your business card. Link to your website, LinkedIn, vCard, or portfolio. Dynamic QR codes update the destination after printing — $9.99 once.",
  keywords: [
    "creating a qr code for business card",
    "how to create a qr code for a business card",
    "how to get qr code for business card",
    "qr code for digital business card",
    "qr code business card generator",
    "business card qr code",
    "qr code for linkedin business card",
    "vcard qr code",
  ],
  alternates: {
    canonical: `${baseUrl}/business-card-qr`,
  },
  openGraph: {
    title: "Create a QR Code for Business Cards — Free Generator | OneQR",
    description:
      "Free QR code generator for business cards. Link to your website, LinkedIn, or vCard. Dynamic codes update after printing — $9.99 once.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create a QR Code for Business Cards — Free Generator | OneQR",
    description:
      "Free QR code generator for business cards. Link to website, LinkedIn, or vCard. Update after printing — $9.99 once.",
  },
};

const steps = [
  {
    num: 1,
    title: "Enter your link",
    description:
      "Paste your website URL, LinkedIn profile, vCard download link, or portfolio. Any URL works.",
  },
  {
    num: 2,
    title: "Customize your QR code",
    description:
      "Pick colors that match your brand. Dark foreground on light background for best scan reliability. OneQR exports SVG — stays sharp at any print size.",
  },
  {
    num: 3,
    title: "Download & print",
    description:
      "Download PNG or SVG. Send the file to your printer with your card design. Minimum 0.8\" × 0.8\" for reliable scanning.",
  },
];

const linkOptions = [
  {
    title: "Website or portfolio",
    description:
      "The most common choice. Link to your homepage, portfolio, or a custom landing page with all your info. Easy to track visits with UTM parameters.",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  },
  {
    title: "vCard (digital contact card)",
    description:
      "Scans open the phone's \"Add Contact\" screen with your name, phone, email, and company pre-filled. The most friction-free way to exchange info.",
    icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
  },
  {
    title: "LinkedIn profile",
    description:
      "Perfect for networking events and B2B cards. One scan opens your LinkedIn profile — they connect without typing your name into search.",
    icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2V9zm2-3a2 2 0 110-4 2 2 0 010 4z",
  },
  {
    title: "Instagram or social media",
    description:
      "Link to your Instagram, TikTok, or a Linktree-style page. Great for creatives, freelancers, and personal brands where social proof matters.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
];

const faqs = [
  {
    question: "How do I create a QR code for my business card?",
    answer:
      "Enter the URL you want to link (website, LinkedIn, vCard) into the generator above, customize colors to match your brand, and download the QR code as SVG or PNG. Place it on your business card design — minimum 0.8\" × 0.8\" for reliable scanning. No account needed for static codes.",
  },
  {
    question: "What size should a QR code be on a business card?",
    answer:
      "At least 0.8 inches (20mm) square. Larger is better — 1 inch is ideal. The QR code needs enough resolution for phone cameras to read it from a few inches away. OneQR exports SVG which stays perfectly sharp at any print size. Always test-scan before sending to the printer.",
  },
  {
    question: "Can I change where the QR code links after printing?",
    answer:
      "Not with a free static QR code — the URL is encoded directly in the image. With a OneQR Pro dynamic QR code ($9.99 once), you can update the destination URL anytime from your dashboard. The printed code stays the same, but scans redirect to your new link. Perfect for updating portfolios or seasonal promotions.",
  },
  {
    question: "Should I use a URL or vCard QR code on my business card?",
    answer:
      "It depends on your goal. A URL QR code links to a website, portfolio, or LinkedIn — great for showcasing your work. A vCard QR code opens the phone's contact app with your info pre-filled — great for quick contact exchange. Most professionals use a URL because it's more flexible and can be updated (with Pro).",
  },
  {
    question: "What's the difference between static and dynamic QR codes for business cards?",
    answer:
      "Static QR codes encode the URL directly in the image — free, work offline, but can't be changed after printing. Dynamic QR codes route through OneQR's servers, so you can change the destination URL, track scan analytics, and A/B test landing pages. For business cards (which you print in bulk), dynamic is worth the $9.99 so you can update without reprinting.",
  },
  {
    question: "Will the QR code work if my business card is dark-colored?",
    answer:
      "QR codes need contrast to scan. The standard is dark modules on a light background. If your card is dark, place the QR code inside a white or light-colored square with at least 2mm padding (quiet zone). OneQR lets you customize foreground and background colors — always keep high contrast between them.",
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
  name: "OneQR Business Card QR Code Generator",
  applicationCategory: "UtilitiesApplication",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Static QR codes for business cards — free forever",
    },
    {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
      description: "Dynamic QR codes — update the link after printing",
    },
  ],
};

export default function BusinessCardQrPage() {
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
          Business Card QR Codes
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Create a QR Code for Your Business Card
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Link your business card to your website, LinkedIn, vCard, or portfolio.
          One scan — they have your info. Dynamic QR codes let you change the
          destination after printing.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {["Free forever", "SVG for print", "Update link after printing"].map(
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

      {/* Inline QR Generator */}
      <section className="mx-auto max-w-2xl px-6 pt-12 pb-20">
        <BusinessCardQrGenerator />
      </section>

      {/* How to create step-by-step */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            How to create a QR code for a business card
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Under 60 seconds. No account needed for free static codes.
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

      {/* Best QR code size */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Best QR code size for business cards
          </h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-4 text-sm text-zinc-400">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p>
                <span className="font-semibold text-white">Minimum:</span>{" "}
                0.8&quot; × 0.8&quot; (20mm × 20mm). Below this, phone cameras
                struggle to focus at arm&apos;s length.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p>
                <span className="font-semibold text-white">Recommended:</span>{" "}
                1&quot; × 1&quot; (25mm × 25mm). Comfortable scan distance,
                leaves room for your name, title, and contact info.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p>
                <span className="font-semibold text-white">Quiet zone:</span>{" "}
                Leave at least 2mm of white space around the QR code. Without
                this margin, scanners may fail to detect the code boundaries.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p>
                <span className="font-semibold text-white">Format:</span> Use
                SVG for print — it&apos;s vector-based and stays razor-sharp at
                any size. OneQR exports both SVG and PNG.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to link */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            What to link your business card QR code to
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            The best destination depends on your role and what action you want
            contacts to take.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {linkOptions.map((opt) => (
              <div
                key={opt.title}
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
                      d={opt.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">{opt.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{opt.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital vs Printed */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Digital vs printed business card QR codes
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-lg font-bold text-white">Printed cards</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Tangible — people
                  keep physical cards
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Works without
                  internet (static QR)
                </li>
                <li className="flex gap-2">
                  <span className="text-zinc-600">-</span> Reprinting cost if
                  info changes
                </li>
              </ul>
              <p className="mt-4 text-xs text-zinc-600">
                Use Pro dynamic codes to update the link without reprinting.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-6">
              <h3 className="text-lg font-bold text-white">
                Digital cards{" "}
                <span className="text-sm font-normal text-emerald-400">
                  + QR code
                </span>
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Share via phone
                  screen, email signature, or Zoom background
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Update instantly —
                  no reprint
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Track scans with
                  Pro analytics
                </li>
              </ul>
              <p className="mt-4 text-xs text-emerald-400/60">
                Best for: networking events, conferences, remote-first teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Static vs Dynamic */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Free vs. Pro — which QR code for your card?
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
                  <span className="text-emerald-400">+</span> URL encoded
                  directly — no server dependency
                </li>
                <li className="flex gap-2">
                  <span className="text-zinc-600">-</span> Can&apos;t change the
                  link after printing
                </li>
              </ul>
              <p className="mt-4 text-xs text-zinc-600">
                Best for: stable URLs you won&apos;t change (LinkedIn, main
                website).
              </p>
            </div>
            <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-6">
              <h3 className="text-lg font-bold text-white">
                Pro — <span className="text-emerald-400">$9.99 once</span>
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Change destination
                  anytime
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Scan analytics —
                  see who scans, when, where
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> One-time payment,
                  no subscription
                </li>
              </ul>
              <p className="mt-4 text-xs text-emerald-400/60">
                Best for: business cards you print in bulk — update without
                reprinting 500 cards.
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
            Business card QR code FAQ
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
            {" · "}
            <Link href="/use-cases/real-estate" className="text-emerald-400 hover:underline">
              Real estate
            </Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Your next connection is one scan away.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Generate a free QR code for your business card. Link to your website,
          LinkedIn, or vCard. Dynamic codes let you update the link after
          printing — $9.99 once.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your Business Card QR Code — Free
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
