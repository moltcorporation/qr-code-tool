import type { Metadata } from "next";
import Link from "next/link";
import { WeddingQrDemo } from "./qr-demo";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Free Wedding QR Code Generator — Invitations, Photos & RSVP | OneQR",
  description:
    "Create free QR codes for wedding invitations, photo sharing, RSVP links, and registry pages. Guests scan to access everything instantly. No app needed.",
  alternates: {
    canonical: `${baseUrl}/wedding`,
  },
  openGraph: {
    title: "Free Wedding QR Code Generator | OneQR",
    description:
      "QR codes for wedding invitations, photos, RSVP, and registry. Guests scan — no app needed. Free to create.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Wedding QR Code Generator | OneQR",
    description:
      "QR codes for wedding invitations, photos, RSVP, and registry. Guests scan — no app needed.",
  },
};

const useCases = [
  {
    title: "Wedding invitations",
    description:
      "Add a QR code to your invitation that links to your wedding website, RSVP form, or event details. Guests scan instead of typing long URLs.",
    keyword: "qr code for wedding invitations",
  },
  {
    title: "Photo sharing",
    description:
      "Place QR codes on table cards or near the photo booth. Guests scan to upload their photos to a shared album — no app downloads, no login walls.",
    keyword: "qr code for wedding photos",
  },
  {
    title: "RSVP collection",
    description:
      "Link your QR code to a Google Form, Zola RSVP, or any online form. Guests scan and respond in seconds from their phone.",
    keyword: "qr code for wedding rsvp",
  },
  {
    title: "Gift registry",
    description:
      "Point guests to your registry on Amazon, Zola, or any site. One scan opens your full registry — no fumbling with URLs at the shower.",
  },
  {
    title: "Venue WiFi",
    description:
      "Create a WiFi QR code so guests connect to the venue network instantly. No asking the bartender for the password.",
  },
];

const steps = [
  {
    num: 1,
    title: "Paste your link",
    description:
      "Your photo album URL, RSVP form, registry page, or wedding website. Any link works.",
  },
  {
    num: 2,
    title: "Generate your QR code",
    description:
      "Get a print-ready QR code in SVG or PNG. Custom colors to match your wedding theme.",
  },
  {
    num: 3,
    title: "Add to your stationery",
    description:
      "Print on invitations, place cards, menus, or signage. With dynamic QR, update the link after printing.",
  },
];

const faqs = [
  {
    question: "Can I put a QR code on my wedding invitations?",
    answer:
      "Yes. Add a small QR code to the back of your invitation or on an insert card. It can link to your wedding website, RSVP form, or photo album. Guests scan with their phone camera — no app needed.",
  },
  {
    question: "How do guests share wedding photos with a QR code?",
    answer:
      "Create a QR code that links to a shared Google Photos album or Dropbox folder. Print it on table cards or display it near the photo booth. Guests scan, open the album, and upload their photos directly.",
  },
  {
    question: "Can I change where the QR code points after printing?",
    answer:
      "Yes, with a dynamic QR code. Before the wedding, point it to your RSVP form. After the wedding, change it to your photo album. Same printed QR code, new destination. Dynamic codes are a one-time $9.99.",
  },
  {
    question: "What size should a QR code be on an invitation?",
    answer:
      "At least 1 inch (2.5 cm) square for reliable scanning. OneQR exports as SVG, so it stays sharp at any print size — no pixelation even on large signage.",
  },
  {
    question: "Is it free to create a wedding QR code?",
    answer:
      "Static QR codes are free forever — no account needed. Dynamic QR codes (where you can update the destination after printing) are $9.99 one-time. No monthly fees.",
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

export default function WeddingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
          Wedding QR Codes
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Free Wedding QR Code Generator
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          One QR code on your invitation. Guests scan to RSVP, view your
          registry, share photos, or connect to venue WiFi. No app needed — just
          point and scan.
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
              Free to create
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
              No app for guests
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
              Print-ready SVG
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your Wedding QR Code — Free
        </Link>
      </section>

      {/* Inline QR Demo */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <WeddingQrDemo />
      </section>

      {/* Use cases */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            5 ways to use QR codes at your wedding
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            From the save-the-date to the last dance — QR codes make every
            detail accessible with a single scan.
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

      {/* 3-step flow */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Wedding QR code in 3 steps
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            No design skills needed. Match your wedding colors.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center"
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
              Generate Your Wedding QR Code
            </Link>
          </div>
        </div>
      </section>

      {/* Why OneQR for weddings */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why couples choose OneQR
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Update after printing",
                desc: "Dynamic QR codes let you change the destination. Before the wedding: RSVP form. After: photo album. Same printed code.",
              },
              {
                title: "Match your wedding colors",
                desc: "Custom foreground and background colors. Your QR code fits your stationery — not the other way around.",
              },
              {
                title: "Sharp at any size",
                desc: "SVG export stays crisp on everything from place cards to welcome signs. No pixels, no blur.",
              },
              {
                title: "No monthly fees",
                desc: "Static codes are free forever. Dynamic codes are $9.99 once — not a subscription you forget to cancel after the honeymoon.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-6"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            The complete guide to QR codes for weddings
          </h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-6 text-sm leading-relaxed text-zinc-400">
            <p>
              QR codes have become a staple of modern wedding planning. Instead
              of printing long URLs on invitations or explaining to guests how to
              find your photo album, a single scannable code does the work. Your
              guests already know how — every smartphone camera reads QR codes
              natively since 2017.
            </p>
            <p>
              The most popular use is adding a QR code for wedding invitations
              that links to your wedding website or RSVP form. Print it on the
              back of your invitation, on an insert card, or on your
              save-the-date. Guests scan with their phone camera, tap the link,
              and they&apos;re at your RSVP page in seconds.
            </p>
            <p>
              QR codes for wedding photos solve the biggest reception headache:
              collecting everyone&apos;s pictures. Create a shared Google Photos
              or iCloud album, generate a QR code linking to it, and display it
              on table cards or near the photo booth. Guests scan, upload, and
              you have every angle of the first dance by Monday morning.
            </p>
            <p>
              For the ceremony or rehearsal dinner, a WiFi QR code lets guests
              connect to the venue network without hunting for the password. And
              a QR code for your wedding registry means guests can browse your
              wish list from their phone during the shower or engagement party.
            </p>
            <p>
              The key decision is static vs. dynamic. A static QR code is free
              and permanent — the link is baked into the code itself. A dynamic
              QR code ($9.99 one-time with OneQR) lets you change where it
              points after printing. This is valuable for weddings: before the
              event, link to your RSVP form. After the event, change it to your
              photo album. Same printed code, new destination.
            </p>
            <p>
              For print quality, always download your QR code as SVG. This
              vector format stays perfectly sharp whether it&apos;s 1 inch on a
              place card or 3 feet on a welcome sign. PNG works for digital use
              or home printing, but SVG is the professional choice for
              stationery and signage.
            </p>
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

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Your big day deserves a simple scan
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Free QR codes for invitations, photos, RSVP, and more. Dynamic codes
          that update after printing are $9.99 once — not a subscription.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your Wedding QR Code — Free
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
