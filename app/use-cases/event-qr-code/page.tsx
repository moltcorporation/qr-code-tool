import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "QR Codes for Events: Check-In, Registration & More | OneQR",
  description:
    "Create QR codes for event check-in, registration, calendar links, and venue programs. Dynamic codes update per event — $9.99 once, no monthly fees.",
  alternates: {
    canonical: `${baseUrl}/use-cases/event-qr-code`,
  },
  openGraph: {
    title: "QR Codes for Events: Check-In & Registration | OneQR",
    description:
      "Event QR codes for check-in, registration, calendar adds, and venue info. One-time $9.99 — no subscriptions.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Codes for Events: Check-In & Registration | OneQR",
    description:
      "Event QR codes for check-in, registration, calendar adds, and venue info. One-time $9.99 — no subscriptions.",
  },
};

const useCases = [
  {
    title: "Event check-in",
    description:
      "Replace paper guest lists with a QR code at the door. Attendees scan to confirm arrival — faster lines, accurate headcounts, and a digital record of who showed up.",
  },
  {
    title: "Event registration",
    description:
      "Put a QR code on flyers, posters, or social posts that links directly to your registration form. One scan opens the signup page — no typing URLs or searching for the event.",
  },
  {
    title: "Calendar add",
    description:
      "Link your QR code to a Google Calendar or .ics file. Attendees scan and the event drops into their calendar with date, time, and location. No manual entry, no missed events.",
  },
  {
    title: "Venue info & programs",
    description:
      "Display QR codes at the venue linking to the event schedule, speaker bios, floor maps, or Wi-Fi credentials. Update the linked page between sessions — same printed code.",
  },
  {
    title: "Post-event follow-up",
    description:
      "After the event, update your dynamic QR code to link to a feedback survey, photo gallery, or next event signup. Attendees who saved the code can scan again for follow-up content.",
  },
];

const steps = [
  {
    num: 1,
    title: "Enter your event link",
    description:
      "Paste the URL for your registration page, calendar event, check-in form, or venue info page. Any URL works.",
  },
  {
    num: 2,
    title: "Generate your QR code",
    description:
      "Download as SVG for print (sharp at any size) or PNG for digital. Match your event branding with custom colors.",
  },
  {
    num: 3,
    title: "Print and display",
    description:
      "Add to event flyers, name badges, signage, or social posts. With dynamic QR, update the link for your next event — same code.",
  },
];

const competitors = [
  { name: "QR Code Generator Pro", price: "$6.99/mo", annual: "$84/yr", note: "5 dynamic QR" },
  { name: "Beaconstac", price: "$5/mo", annual: "$60/yr", note: "1 QR code" },
  { name: "Uniqode", price: "$5/mo", annual: "$60/yr", note: "Per code" },
  { name: "QR Tiger", price: "$7/mo", annual: "$84/yr", note: "Dynamic QR" },
];

const faqs = [
  {
    question: "Can I use a QR code for event check-in?",
    answer:
      "Yes. Create a QR code that links to your check-in page, Google Form, or attendance tracker. Display it at the entrance — attendees scan to confirm arrival. With dynamic QR codes, you can reuse the same printed code for different events by updating the destination link.",
  },
  {
    question: "How do I create a QR code for event registration?",
    answer:
      "Copy the URL of your registration page (Eventbrite, Google Forms, Luma, or your own site). Paste it into OneQR to generate a scannable QR code. Print it on flyers, posters, or event invitations. Attendees scan and land directly on the signup page.",
  },
  {
    question: "Can a QR code add an event to someone's calendar?",
    answer:
      "Yes. Link your QR code to a Google Calendar event URL or a downloadable .ics file. When attendees scan, the event opens in their calendar app with the date, time, location, and description pre-filled. No manual entry needed.",
  },
  {
    question: "Can I update the QR code between events?",
    answer:
      "Yes, with a dynamic QR code ($9.99 one-time). Change the destination URL anytime — point it to this week's event page, then next week's. Same printed code on your permanent signage, different content each time.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Static QR codes are free forever — no account needed. Dynamic QR codes (where you can change the destination after printing) are a one-time $9.99 payment. No monthly fees, no per-event charges. Most event QR tools charge $5-7/mo per code.",
  },
  {
    question: "What size should an event QR code be?",
    answer:
      "At least 1 inch (2.5 cm) square for close-up scanning (name badges, table cards). For signage scanned from a distance, go larger — 4+ inches for wall posters. OneQR exports as SVG so it stays sharp at any size.",
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

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create a QR Code for an Event",
  description:
    "Generate a QR code for event check-in, registration, calendar links, or venue information.",
  step: steps.map((s) => ({
    "@type": "HowToStep",
    name: s.title,
    text: s.description,
  })),
};

export default function EventQrCodePage() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
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
          Event QR Codes
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          QR Codes for Events: Check-In, Registration{" "}
          <span className="text-emerald-400">&amp; More</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          One QR code handles check-in, registration, calendar adds, and venue
          info. Update the destination between events — same printed code, new
          content. Most tools charge monthly. OneQR is{" "}
          <span className="font-semibold text-emerald-400">$9.99 once</span>.
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
              No monthly fees
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
              Reuse across events
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
              Scan analytics included
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your Event QR Code — Free
        </Link>
      </section>

      {/* Use cases */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            5 ways to use QR codes at events
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            From registration to follow-up — one scan handles it all.
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

      {/* Competitor pricing comparison */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Stop paying monthly for event QR codes
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Event QR tools charge $5–7/mo per code. OneQR charges $9.99 once.
          </p>

          <div className="mt-10 overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <th className="px-6 py-4 text-left font-medium text-zinc-400">
                    Tool
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-zinc-400">
                    Monthly
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-zinc-400">
                    Annual cost
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-zinc-400">
                    Limit
                  </th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c) => (
                  <tr
                    key={c.name}
                    className="border-b border-zinc-800/50 bg-zinc-950"
                  >
                    <td className="px-6 py-4 text-zinc-300">{c.name}</td>
                    <td className="px-6 py-4 text-red-400 line-through">
                      {c.price}
                    </td>
                    <td className="px-6 py-4 text-zinc-500">{c.annual}</td>
                    <td className="px-6 py-4 text-zinc-500">{c.note}</td>
                  </tr>
                ))}
                <tr className="bg-emerald-950/30">
                  <td className="px-6 py-4 font-semibold text-emerald-400">
                    OneQR
                  </td>
                  <td className="px-6 py-4 font-bold text-emerald-400">
                    $9.99 once
                  </td>
                  <td className="px-6 py-4 text-emerald-300">$9.99 total</td>
                  <td className="px-6 py-4 text-emerald-300">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-xs text-zinc-600">
            Prices as of March 2026. All competitors require ongoing subscriptions.
          </p>
        </div>
      </section>

      {/* 3-step flow */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Event QR code in 3 steps
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            No design skills needed. Takes under 2 minutes.
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
              Generate Your Event QR Code
            </Link>
          </div>
        </div>
      </section>

      {/* Why event organizers switch */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why event organizers switch to OneQR
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Reuse codes across events",
                desc: "Dynamic QR codes let you change the destination between events. Same signage, new event page. Save on printing costs every time.",
              },
              {
                title: "Track scan analytics",
                desc: "See how many people scanned your check-in code, when peak scanning happens, and which placement locations drive the most engagement.",
              },
              {
                title: "Works with any platform",
                desc: "Eventbrite, Luma, Google Forms, Calendly, your own website — if your registration or check-in page has a URL, it works with OneQR.",
              },
              {
                title: "Print-ready downloads",
                desc: "Download as SVG (sharp at any size for banners and signage) or PNG (quick prints for badges and handouts). Custom colors to match your event branding.",
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

      {/* SEO content */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            How QR codes transform event management
          </h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-6 text-sm leading-relaxed text-zinc-400">
            <p>
              Event check-in used to mean clipboards, printed guest lists, and
              long lines at the door. A QR code replaces all of that. Display
              one at the entrance — attendees scan with their phone camera, tap
              the link, and they&apos;re checked in. The event organizer gets a
              digital record of who arrived and when.
            </p>
            <p>
              For event registration, QR codes eliminate the friction of typing
              long URLs. Print a QR code on your poster, flyer, or social media
              graphic. One scan takes the person directly to the signup page.
              This is especially effective for in-person promotion — conference
              booths, community boards, and campus flyers where people won&apos;t
              stop to type a URL.
            </p>
            <p>
              Calendar integration is an underused feature. Link your QR code to
              a Google Calendar event or .ics file. When someone scans, the event
              appears in their calendar with the correct date, time, and
              location. This solves the &quot;I forgot about it&quot; problem
              that plagues free events with high registration but low attendance.
            </p>
            <p>
              During the event, QR codes serve as information hubs. Place them on
              signage to link to the schedule, speaker bios, floor maps, or
              Wi-Fi login. Update the destination between sessions — morning
              workshops link to one page, afternoon panels to another. Attendees
              scan the same code and get current information.
            </p>
            <p>
              The real power is reusability. A dynamic QR code ($9.99 one-time
              with OneQR) lets you change the destination URL after printing.
              Your monthly meetup uses the same printed signage every time —
              just update the link to this month&apos;s registration page.
              Recurring events save hundreds on reprinting costs.
            </p>
            <p>
              After the event, update the QR code to link to a feedback survey,
              photo gallery, or your next event&apos;s registration page.
              Attendees who saved the code — on a badge, program, or screenshot
              — can scan again and stay engaged with your event series.
            </p>
          </div>
        </div>
      </section>

      {/* Related use cases */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            More QR code use cases
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Wedding QR Codes", href: "/wedding" },
              { title: "Restaurant Menu QR", href: "/use-cases/restaurant-menu" },
              { title: "WiFi QR Codes", href: "/use-cases/wifi" },
              { title: "Business Cards", href: "/use-cases/business-cards" },
              { title: "Marketing QR", href: "/use-cases/marketing" },
              { title: "Spotify QR Codes", href: "/use-cases/spotify-qr-code" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-center text-sm font-medium text-zinc-300 hover:border-emerald-500/30 hover:text-white"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Event QR code FAQ
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
          Your next event deserves a smarter check-in
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Static QR codes are free — no account needed. Dynamic codes that
          update between events are $9.99 once. Not monthly. Not per event.
          Once.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your Event QR Code — Free
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
