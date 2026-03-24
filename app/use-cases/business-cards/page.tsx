import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "QR Code for Business Cards — $9.99 Once, No Subscription | OneQR",
  description:
    "Add a QR code to your business card that links to your portfolio, LinkedIn, or contact info. Update the link anytime. One-time $9.99 — no monthly fees.",
  alternates: {
    canonical: `${baseUrl}/use-cases/business-cards`,
  },
  openGraph: {
    title: "QR Code for Business Cards — $9.99 Once | OneQR",
    description:
      "Business card QR codes that link to your portfolio or contact info. Update anytime. One-time $9.99.",
    type: "website",
    siteName: "OneQR",
    url: `${baseUrl}/use-cases/business-cards`,
    images: [
      {
        url: `${baseUrl}/api/og?title=Business%20Card%20QR%20Codes&desc=$9.99%20Once,%20Update%20Anytime`,
        width: 1200,
        height: 630,
        alt: "OneQR - Business Card QR Codes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code for Business Cards — $9.99 Once | OneQR",
    description:
      "Business card QR codes that link to your portfolio or contact info. Update anytime. One-time $9.99.",
  },
};

const competitors = [
  { name: "QR Code Generator Pro", price: "$6.99/mo", annual: "$84/yr", note: "5 dynamic QR" },
  { name: "Beaconstac", price: "$5/mo", annual: "$60/yr", note: "1 QR code" },
  { name: "Uniqode (Beaconstac)", price: "$15/mo", annual: "$180/yr", note: "5 QR codes" },
  { name: "QR Tiger", price: "$7/mo", annual: "$84/yr", note: "Dynamic QR" },
];

const steps = [
  {
    num: 1,
    title: "Enter your link",
    description:
      "Paste your LinkedIn profile, portfolio site, vCard, or any URL you want contacts to reach.",
  },
  {
    num: 2,
    title: "Generate and download",
    description:
      "Get a high-resolution QR code as SVG (print-shop ready) or PNG. No account needed for static codes.",
  },
  {
    num: 3,
    title: "Print on your cards",
    description:
      "Send to your printer or upload to Vistaprint, Moo, or Canva. With Pro, update the link later — same QR code, new destination.",
  },
];

const faqs = [
  {
    question: "Can I change what the QR code links to after printing my cards?",
    answer:
      "Yes. With a dynamic QR code (Pro, $9.99 one-time), you can change the destination URL anytime. Got a new portfolio? New job? Update the link — your printed cards keep working.",
  },
  {
    question: "What should I link my business card QR code to?",
    answer:
      "Popular choices: your LinkedIn profile, personal website, a digital vCard (contact file), a portfolio, or a Calendly booking page. Any URL works.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Static QR codes are free forever. Dynamic QR codes (where you can change the destination after printing) are a one-time $9.99 payment. No monthly fees.",
  },
  {
    question: "What size should the QR code be on a business card?",
    answer:
      "At least 0.8 x 0.8 inches (2 x 2 cm) for reliable scanning. Download as SVG for the sharpest print quality at any size. Most printers recommend placing it on the back of the card.",
  },
  {
    question: "Do I need an account?",
    answer:
      "Not for static QR codes — generate and download instantly. For dynamic codes with scan tracking, create a free account and upgrade to Pro for $9.99 once.",
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

export default function BusinessCardsPage() {
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
          Business Card QR Codes
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          QR Code for Business Cards —{" "}
          <span className="text-emerald-400">$9.99 Once</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Your job title changes. Your cards are already printed. Add a dynamic
          QR code that links to your portfolio, LinkedIn, or contact page — and
          update the destination anytime without reprinting.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {["No monthly fees", "Update link anytime", "Print-shop quality SVG"].map((text) => (
            <div key={text} className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-zinc-300">{text}</span>
            </div>
          ))}
        </div>

        <Link href="/" className="mt-8 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400">
          Create Your Business Card QR — Free
        </Link>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Other tools charge monthly for what should cost $9.99
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
          You print business cards once. Why pay monthly for the QR code on them?
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
            QR code on your business card in 3 steps
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Takes under 2 minutes. No design skills needed.
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
              Generate Your Business Card QR
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why professionals use QR codes on business cards
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "New role? Same cards.",
                desc: "Changed jobs or updated your portfolio? Update the QR code link — your existing cards still work.",
              },
              {
                title: "Track who scans",
                desc: "Pro includes scan analytics — see how many new contacts scanned your card and when.",
              },
              {
                title: "Link to anything",
                desc: "LinkedIn, personal site, vCard download, Calendly, or a custom landing page. Any URL works.",
              },
              {
                title: "Print-shop quality",
                desc: "Download as SVG for crisp printing at any size. Works with Vistaprint, Moo, Canva, or your local printer.",
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
            Business card QR code FAQ
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
          Your career evolves. Your QR code keeps up.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Static QR codes are free — no account needed. Dynamic codes that update
          after printing are $9.99 once. Not monthly. Once.
        </p>
        <Link href="/" className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400">
          Create Your Business Card QR — Free
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
