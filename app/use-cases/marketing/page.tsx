import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "QR Code for Flyers & Brochures — $9.99 Once | OneQR",
  description:
    "Add QR codes to flyers, brochures, and print marketing. Link to landing pages, offers, or videos. Update per campaign. One-time $9.99 — no monthly fees.",
  alternates: {
    canonical: `${baseUrl}/use-cases/marketing`,
  },
  openGraph: {
    title: "QR Code for Flyers & Brochures — $9.99 Once | OneQR",
    description:
      "Marketing QR codes for print campaigns. Track scans, update links per campaign. One-time $9.99.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code for Flyers & Brochures — $9.99 Once | OneQR",
    description:
      "Marketing QR codes for print campaigns. Track scans, update links per campaign. One-time $9.99.",
  },
};

const competitors = [
  { name: "QR Code Generator Pro", price: "$6.99/mo", annual: "$84/yr", note: "5 dynamic QR" },
  { name: "Bitly QR", price: "$8/mo", annual: "$96/yr", note: "5 QR codes" },
  { name: "Uniqode", price: "$15/mo", annual: "$180/yr", note: "5 QR codes" },
  { name: "Flowcode", price: "$7/mo", annual: "$84/yr", note: "1 dynamic QR" },
];

const steps = [
  {
    num: 1,
    title: "Paste your campaign link",
    description:
      "Link to your landing page, special offer, YouTube video, Google Form, or any URL you want readers to visit.",
  },
  {
    num: 2,
    title: "Download your QR code",
    description:
      "Get a print-ready QR code as SVG (sharp on any flyer or brochure) or PNG. No account needed for static codes.",
  },
  {
    num: 3,
    title: "Add to your print design",
    description:
      "Drop into Canva, InDesign, or any design tool. For the next campaign, update the link — same QR code, new destination.",
  },
];

const faqs = [
  {
    question: "Can I change the QR code destination between campaigns?",
    answer:
      "Yes. With a dynamic QR code (Pro, $9.99 one-time), you can update the destination URL anytime. Run a spring sale, then switch to summer — same printed QR code, different landing page.",
  },
  {
    question: "Can I track how many people scan my flyer?",
    answer:
      "Yes. Pro includes scan analytics — see total scans per day. Compare which flyer locations, designs, or distribution methods drive the most scans.",
  },
  {
    question: "What should I link my marketing QR code to?",
    answer:
      "Best options: a campaign landing page, a special offer or coupon, a product demo video, a booking or signup form, or your Google Business profile. Any URL works.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Static QR codes are free forever. Dynamic QR codes with scan tracking and updatable links are a one-time $9.99 payment. No monthly fees, no per-campaign charges.",
  },
  {
    question: "How big should the QR code be on a flyer?",
    answer:
      "At least 1 x 1 inch (2.5 x 2.5 cm) for a standard flyer. For posters, go larger — 2-3 inches minimum. Always test by scanning the printed version from arm's length before distributing.",
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

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-400">One</span>QR
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white">Pricing</Link>
            <Link href="/login" className="text-sm text-zinc-400 hover:text-white">Sign in</Link>
            <Link href="/register" className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-400">Get started</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 pt-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Marketing QR Codes
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          QR Codes for Flyers & Brochures —{" "}
          <span className="text-emerald-400">$9.99 Once</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Your print campaign runs for a week. Your QR code subscription runs
          forever. Create a QR code that links readers to your offer — update the
          destination per campaign without reprinting.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {["No monthly fees", "Track scans", "Update per campaign"].map((text) => (
            <div key={text} className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-zinc-300">{text}</span>
            </div>
          ))}
        </div>

        <Link href="/" className="mt-8 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400">
          Create Your Marketing QR Code — Free
        </Link>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Marketing QR tools charge $84-180/yr. Your campaign lasts a week.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
          Why subscribe monthly for a QR code on a seasonal flyer?
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900">
                <th className="px-6 py-4 text-left font-medium text-zinc-400">Tool</th>
                <th className="px-6 py-4 text-left font-medium text-zinc-400">Monthly</th>
                <th className="px-6 py-4 text-left font-medium text-zinc-400">Annual cost</th>
                <th className="px-6 py-4 text-left font-medium text-zinc-400">Limit</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => (
                <tr key={c.name} className="border-b border-zinc-800/50 bg-zinc-950">
                  <td className="px-6 py-4 text-zinc-300">{c.name}</td>
                  <td className="px-6 py-4 text-red-400 line-through">{c.price}</td>
                  <td className="px-6 py-4 text-zinc-500">{c.annual}</td>
                  <td className="px-6 py-4 text-zinc-500">{c.note}</td>
                </tr>
              ))}
              <tr className="bg-emerald-950/30">
                <td className="px-6 py-4 font-semibold text-emerald-400">OneQR</td>
                <td className="px-6 py-4 font-bold text-emerald-400">$9.99 once</td>
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

      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            QR code on your flyer in 3 steps
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            From campaign link to print-ready QR in under 2 minutes.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-center">
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
            <Link href="/" className="inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400">
              Generate Your Marketing QR Code
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Where to put QR codes in print marketing
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Flyers & door hangers",
                desc: "Link to your offer page or booking form. Readers scan instead of typing a long URL.",
              },
              {
                title: "Brochures & catalogs",
                desc: "One QR code per product section linking to details, videos, or purchase pages.",
              },
              {
                title: "Direct mail & postcards",
                desc: "Track response rates by linking to a campaign-specific landing page with scan analytics.",
              },
              {
                title: "Packaging & inserts",
                desc: "Link to setup guides, warranty registration, or a feedback survey. Update the link per product run.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Print marketing QR code FAQ
          </h2>
          <div className="mt-10 flex flex-col gap-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 text-sm text-zinc-500">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Your campaign ends. Your QR code doesn&apos;t expire.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Static QR codes are free — no account needed. Dynamic codes with scan
          tracking and updatable links are $9.99 once. Not monthly. Once.
        </p>
        <Link href="/" className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400">
          Create Your Marketing QR Code — Free
        </Link>
      </section>

      <footer className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-600">
              <span className="font-medium text-emerald-400">One</span>
              <span className="font-medium text-zinc-400">QR</span>
              {" "}— Free QR code generator
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-zinc-500 hover:text-white">Generator</Link>
              <Link href="/pricing" className="text-zinc-500 hover:text-white">Pricing</Link>
              <Link href="/privacy" className="text-zinc-500 hover:text-white">Privacy</Link>
              <Link href="/terms" className="text-zinc-500 hover:text-white">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
