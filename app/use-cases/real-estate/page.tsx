import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "QR Code for Property Listings — $9.99 Once | OneQR",
  description:
    "Add QR codes to property yard signs, flyers, and brochures. Link to virtual tours, listing pages, or agent contact info. Update per listing — $9.99 once, no monthly fees.",
  alternates: {
    canonical: `${baseUrl}/use-cases/real-estate`,
  },
  openGraph: {
    title: "QR Code for Real Estate Listings — $9.99 Once | OneQR",
    description:
      "Property listing QR codes for yard signs and flyers. Reuse across listings. One-time $9.99.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code for Real Estate Listings — $9.99 Once | OneQR",
    description:
      "Property listing QR codes for yard signs and flyers. Reuse across listings. One-time $9.99.",
  },
};

const competitors = [
  { name: "QR Code Generator Pro", price: "$6.99/mo", annual: "$84/yr", note: "5 dynamic QR" },
  { name: "Beaconstac", price: "$5/mo", annual: "$60/yr", note: "1 QR code" },
  { name: "Curb Hero", price: "$30/mo", annual: "$360/yr", note: "Real estate specific" },
  { name: "QR Tiger", price: "$7/mo", annual: "$84/yr", note: "Dynamic QR" },
];

const steps = [
  {
    num: 1,
    title: "Link your listing",
    description:
      "Paste your Zillow, Realtor.com, MLS listing page, virtual tour, or any URL buyers should see.",
  },
  {
    num: 2,
    title: "Generate and download",
    description:
      "Get a print-ready QR code as SVG or PNG. High resolution for yard signs, flyers, and postcards.",
  },
  {
    num: 3,
    title: "Place on signs and flyers",
    description:
      "When the property sells and you get a new listing, update the link. Same QR code sign, new property.",
  },
];

const faqs = [
  {
    question: "Can I reuse the same QR code for different listings?",
    answer:
      "Yes. With a dynamic QR code (Pro, $9.99 one-time), update the destination URL when you get a new listing. Your yard sign QR code stays the same — it just points to the new property page.",
  },
  {
    question: "What should I link my property QR code to?",
    answer:
      "Best options: a virtual tour (Matterport, Zillow 3D Home), your MLS listing page, a dedicated landing page with photos and details, or your agent contact page. Any URL works.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Static QR codes are free forever. Dynamic QR codes (where you can change the listing link after printing) are a one-time $9.99 payment. No monthly fees, no per-listing charges.",
  },
  {
    question: "How big should the QR code be on a yard sign?",
    answer:
      "At least 3 x 3 inches for yard signs (scannable from 3-4 feet). For flyers and postcards, 1.5 x 1.5 inches minimum. Download as SVG for sharp printing at any size.",
  },
  {
    question: "Can I track how many people scan it?",
    answer:
      "Yes. Pro includes scan analytics — see total scans per day. Know exactly how many drive-by buyers are engaging with your listing.",
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

export default function RealEstatePage() {
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
          Real Estate QR Codes
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          QR Codes for Property Listings —{" "}
          <span className="text-emerald-400">$9.99 Once</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Listings change. Your yard signs don&apos;t have to. Add a QR code
          that links buyers to your virtual tour or listing page — then update
          the link when you get a new property. One payment, every listing.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {["No per-listing fees", "Reuse across listings", "Track buyer scans"].map((text) => (
            <div key={text} className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-zinc-300">{text}</span>
            </div>
          ))}
        </div>

        <Link href="/" className="mt-8 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400">
          Create Your Property QR Code — Free
        </Link>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Real estate QR tools charge monthly. You sell one house at a time.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
          Most QR tools bill per month even when your listing sits idle. OneQR is $9.99 once.
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
            Property QR code in 3 steps
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            From listing link to yard sign in under 2 minutes.
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
              Generate Your Property QR Code
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why agents use QR codes on property signs
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "New listing, same sign",
                desc: "Update the QR code link when the property sells. Reuse your sign rider or flyer template for the next listing.",
              },
              {
                title: "Drive-by to virtual tour",
                desc: "Buyers scan from the sidewalk and instantly see your virtual tour, photos, or listing details.",
              },
              {
                title: "Know your foot traffic",
                desc: "Pro scan analytics show how many potential buyers engaged with each listing sign.",
              },
              {
                title: "Works on everything",
                desc: "Yard signs, brochure boxes, postcards, door hangers, MLS printouts — any printed material.",
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
            Real estate QR code FAQ
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
          Listings change. Your QR code keeps working.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Static QR codes are free — no account needed. Dynamic codes that update
          per listing are $9.99 once. Not monthly. Not per listing. Once.
        </p>
        <Link href="/" className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400">
          Create Your Property QR Code — Free
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
