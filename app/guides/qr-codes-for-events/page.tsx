import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Create QR Codes for Events & Conferences | OneQR",
  description:
    "Free guide: create QR codes for event tickets, conference badges, flyers, and RSVPs. Dynamic QR codes update after printing — no reprinting needed.",
  keywords: [
    "event qr code",
    "qr code for events",
    "conference qr code",
    "event ticket qr code",
    "qr code for flyers",
    "qr code conference badge",
    "wedding rsvp qr code",
    "trade show qr code",
  ],
  openGraph: {
    title: "How to Create QR Codes for Events & Conferences",
    description:
      "Free guide: create QR codes for event tickets, conference badges, flyers, and RSVPs.",
    type: "article",
  },
};

const faqs = [
  {
    question: "How do I create a QR code for my event?",
    answer:
      "Create a landing page or registration link for your event, copy the URL, paste it into OneQR, and click Generate. Download as SVG for print or PNG for digital use. Takes under 30 seconds.",
  },
  {
    question: "Can I update the QR code destination after printing tickets?",
    answer:
      "Yes — use a dynamic QR code ($9.99 one-time with OneQR Pro). Dynamic codes let you change the destination URL anytime. Print your tickets once, then redirect to schedule updates, venue changes, or post-event content.",
  },
  {
    question: "How much does an event QR code cost?",
    answer:
      "Static QR codes are completely free with OneQR — unlimited, no signup, no watermark. Dynamic codes that you can update after printing are a one-time $9.99 payment. No monthly fees.",
  },
  {
    question: "What size should a QR code be on a flyer or poster?",
    answer:
      "For flyers viewed up close, at least 2x2 cm (0.8 inches). For posters or banners viewed from a distance, go larger — 10x10 cm or more. Always download as SVG for print to ensure crisp quality at any size.",
  },
  {
    question: "Can I track how many people scan my event QR code?",
    answer:
      "Yes. OneQR Pro includes scan analytics — see how many people scanned, when, from what device, and where. Great for measuring which flyers or channels drive the most registrations.",
  },
];

const useCases = [
  {
    title: "Event tickets",
    description:
      "Print QR codes on tickets that link to the event schedule. After the event, redirect to recordings, photos, or a feedback survey — same ticket, new destination.",
  },
  {
    title: "Conference badges",
    description:
      "Link badges to speaker bios, session schedules, or networking profiles. Attendees scan each other's badges to connect — no business card exchange needed.",
  },
  {
    title: "Flyers & posters",
    description:
      "Add QR codes to local event flyers. Track which locations drive the most scans. Update the destination if event details change after posting.",
  },
  {
    title: "Wedding RSVPs",
    description:
      "Print a QR code on save-the-dates or invitations linking to your RSVP form. Guests scan and respond in seconds — no mailing back cards.",
  },
  {
    title: "Trade show booths",
    description:
      "Display a QR code at your booth linking to product demos, catalogs, or lead capture forms. After the show, redirect to follow-up content.",
  },
  {
    title: "Post-event follow-up",
    description:
      "Dynamic QR codes printed on any event materials can be redirected after the event to surveys, photo galleries, recordings, or next-event announcements.",
  },
];

export default function EventQRGuide() {
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
    name: "How to Create QR Codes for Events & Conferences",
    description:
      "Create a free QR code for your event in under 30 seconds.",
    step: [
      {
        "@type": "HowToStep",
        name: "Create your event page",
        text: "Set up a registration page, schedule, or landing page for your event. Copy the URL.",
      },
      {
        "@type": "HowToStep",
        name: "Generate the QR code",
        text: "Paste the URL into OneQR and click Generate. Customize colors to match your event branding.",
      },
      {
        "@type": "HowToStep",
        name: "Print and distribute",
        text: "Download as SVG for print. Add to tickets, flyers, posters, badges, or invitations.",
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
            <span className="text-emerald-600">One</span>QR
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
          How to Create QR Codes for Events & Conferences
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Put a QR code on every ticket, badge, flyer, and poster. Update where
          it points after the event — redirect to recordings, surveys, or your
          next event. No reprinting. Here&apos;s how, in under 30 seconds.
        </p>

        {/* Step by step */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">
            3 steps to an event QR code
          </h2>
          <div className="mt-6 flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                1
              </div>
              <div>
                <h3 className="font-semibold">Create your event page</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Set up a registration page, schedule, or landing page for your
                  event on Eventbrite, Luma, your own website, or even a Google
                  Form. Copy the public URL.
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
                  Paste your event URL into{" "}
                  <Link href="/" className="text-emerald-600 hover:underline">
                    OneQR&apos;s free generator
                  </Link>
                  . Pick colors that match your event branding. Use high error
                  correction for printed materials that might get crumpled or
                  folded.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                3
              </div>
              <div>
                <h3 className="font-semibold">Print and distribute</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Download as SVG for print (scales perfectly to any size) or
                  PNG for digital use. Add to tickets, flyers, posters, badges,
                  email invitations, or social media posts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why dynamic matters */}
        <section className="mt-16 rounded-xl border border-emerald-200 bg-emerald-50 p-8">
          <h2 className="text-xl font-bold text-emerald-900">
            Why dynamic QR codes are essential for events
          </h2>
          <p className="mt-3 text-sm text-emerald-800">
            Events change. Venues move, schedules shift, speakers cancel. With a
            static QR code, you&apos;d need to reprint every ticket and flyer. With a
            dynamic QR code, you update the destination and every printed code
            automatically points to the new information.
          </p>
          <p className="mt-3 text-sm text-emerald-800">
            Even better: after the event ends, redirect the same QR code to
            post-event content — recordings, photo galleries, feedback surveys,
            or your next event&apos;s registration page. One code, unlimited uses.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-4">
              <p className="text-xs font-semibold uppercase text-zinc-500">
                Reprinting 500 flyers
              </p>
              <p className="mt-1 text-2xl font-bold text-red-600">
                $150-400+
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Every time event details change
              </p>
            </div>
            <div className="rounded-lg bg-white p-4">
              <p className="text-xs font-semibold uppercase text-zinc-500">
                Dynamic QR code
              </p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">$9.99</p>
              <p className="mt-1 text-xs text-zinc-500">
                One-time. Update the link as many times as you need.
              </p>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">
            6 ways to use QR codes at events
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
            Create your event QR code now
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
          <div className="mb-4 flex justify-center gap-6">
            <Link href="/privacy" className="text-zinc-500 hover:text-zinc-900">Privacy</Link>
            <Link href="/terms" className="text-zinc-500 hover:text-zinc-900">Terms</Link>
          </div>
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
