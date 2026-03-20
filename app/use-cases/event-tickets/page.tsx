import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "QR Code for Events & Tickets — $9.99 Once | OneQR",
  description:
    "Create QR codes for event tickets, check-in, or linking attendees to schedules and maps. Update per event. One-time $9.99 — no monthly fees.",
  alternates: {
    canonical: `${baseUrl}/use-cases/event-tickets`,
  },
  openGraph: {
    title: "QR Code for Events & Tickets — $9.99 Once | OneQR",
    description:
      "Event QR codes for tickets, check-in, and schedules. Reuse across events. One-time $9.99.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code for Events & Tickets — $9.99 Once | OneQR",
    description:
      "Event QR codes for tickets, check-in, and schedules. Reuse across events. One-time $9.99.",
  },
};

const competitors = [
  { name: "QR Code Generator Pro", price: "$6.99/mo", annual: "$84/yr", note: "5 dynamic QR" },
  { name: "Beaconstac", price: "$5/mo", annual: "$60/yr", note: "1 QR code" },
  { name: "Uniqode", price: "$15/mo", annual: "$180/yr", note: "5 QR codes" },
  { name: "Eventbrite QR", price: "$0 + fees", annual: "3.7% + $1.79/ticket", note: "Ticketing platform" },
];

const steps = [
  {
    num: 1,
    title: "Link your event page",
    description:
      "Paste your event schedule, registration form, venue map, or any URL attendees need.",
  },
  {
    num: 2,
    title: "Generate your QR code",
    description:
      "Download as SVG for posters and banners or PNG for digital tickets. Instant, no account needed for static codes.",
  },
  {
    num: 3,
    title: "Print on materials",
    description:
      "Add to tickets, posters, table cards, or lanyards. For recurring events, update the link — same QR code, next event.",
  },
];

const faqs = [
  {
    question: "Can I reuse the same QR code for recurring events?",
    answer:
      "Yes. With a dynamic QR code (Pro, $9.99 one-time), update the destination URL before each event. Same printed poster or banner, new event details every time.",
  },
  {
    question: "What should I link my event QR code to?",
    answer:
      "Popular choices: event schedule or agenda page, registration or RSVP form, venue map, a Google Form for feedback, or a landing page with all event details.",
  },
  {
    question: "Can I use this for ticket check-in?",
    answer:
      "OneQR generates QR codes that link to URLs. For basic check-in, link to a Google Sheet or form where staff mark attendance. For full ticketing with barcode scanning, a dedicated platform like Eventbrite is better suited.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Static QR codes are free forever. Dynamic QR codes (where you can change the destination between events) are a one-time $9.99 payment. No monthly fees, no per-event charges.",
  },
  {
    question: "How big should the QR code be on a poster?",
    answer:
      "At least 2 x 2 inches for handheld materials, 4 x 4 inches for wall posters, and 8+ inches for banners. Download as SVG for sharp printing at any size.",
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

export default function EventTicketsPage() {
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
          Event QR Codes
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          QR Codes for Events —{" "}
          <span className="text-emerald-400">$9.99 Once</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Your next event has a different venue, schedule, and speaker list. Your
          posters can stay the same. Create a QR code that links to event details
          — and update the destination for each new event.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {["No per-event fees", "Reuse for recurring events", "Track attendee scans"].map((text) => (
            <div key={text} className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-zinc-300">{text}</span>
            </div>
          ))}
        </div>

        <Link href="/" className="mt-8 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400">
          Create Your Event QR Code — Free
        </Link>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Event tools charge monthly or per ticket. You need a QR code.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
          If you just need a QR code on posters and tickets, you don&apos;t need a $30/mo platform.
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900">
                <th className="px-6 py-4 text-left font-medium text-zinc-400">Tool</th>
                <th className="px-6 py-4 text-left font-medium text-zinc-400">Monthly</th>
                <th className="px-6 py-4 text-left font-medium text-zinc-400">Annual cost</th>
                <th className="px-6 py-4 text-left font-medium text-zinc-400">Note</th>
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
          Prices as of March 2026. Eventbrite pricing is per-ticket fees.
        </p>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Event QR code in 3 steps
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            From event link to printed poster in under 2 minutes.
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
              Generate Your Event QR Code
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why event organizers use OneQR
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Recurring events, one QR code",
                desc: "Weekly meetups, monthly networking, annual conferences — update the link before each event. Same materials, new details.",
              },
              {
                title: "Link to any event page",
                desc: "Google Calendar invite, Eventbrite registration, Luma, Lu.ma, a Notion page, or your own website. Any URL works.",
              },
              {
                title: "Measure engagement",
                desc: "Pro scan analytics show how many people scanned your poster or ticket. Compare locations and formats.",
              },
              {
                title: "Print any size",
                desc: "SVG downloads for banners and posters. PNG for digital tickets and email invites. Sharp at every size.",
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
            Event QR code FAQ
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
          Events change. Your QR code adapts.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Static QR codes are free — no account needed. Dynamic codes that update
          per event are $9.99 once. Not monthly. Not per event. Once.
        </p>
        <Link href="/" className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400">
          Create Your Event QR Code — Free
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
