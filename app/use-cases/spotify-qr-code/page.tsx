import type { Metadata } from "next";
import Link from "next/link";
import { SpotifyQrDemo } from "./qr-demo";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Free Spotify QR Code Generator — Share Playlists Instantly | OneQR",
  description:
    "Create a free QR code for any Spotify playlist, album, or artist. Guests scan to listen instantly — no typing, no searching. Perfect for parties, events, and social media.",
  alternates: {
    canonical: `${baseUrl}/use-cases/spotify-qr-code`,
  },
  openGraph: {
    title: "Free Spotify QR Code Generator | OneQR",
    description:
      "QR codes for Spotify playlists, albums, and artists. Scan to listen instantly. Free to create.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Spotify QR Code Generator | OneQR",
    description:
      "QR codes for Spotify playlists, albums, and artists. Scan to listen instantly. Free to create.",
  },
};

const useCases = [
  {
    title: "Party playlists",
    description:
      "Print a QR code on the party invite or display it at the entrance. Guests scan and the playlist starts playing on their phone — everyone vibes to the same music.",
  },
  {
    title: "DJ sets & live events",
    description:
      "Share your setlist or after-party playlist with the crowd. Post the QR code on event flyers, merch tables, or venue screens. Fans follow the music after the show.",
  },
  {
    title: "Wedding reception music",
    description:
      "Place a QR code on table cards linking to your reception playlist. Guests can listen along, or add it to their own library for memories of your big day.",
  },
  {
    title: "Cafe & restaurant ambiance",
    description:
      "Display a QR code at the counter so customers can listen to the same playlist playing in-store. Builds brand atmosphere they take home with them.",
  },
  {
    title: "Social media sharing",
    description:
      "Add a QR code to your Instagram story, TikTok video, or YouTube thumbnail. Followers scan to open your playlist directly in Spotify — zero friction.",
  },
];

const steps = [
  {
    num: 1,
    title: "Copy your Spotify link",
    description:
      "Open Spotify, tap Share on any playlist, album, or artist page, and copy the link.",
  },
  {
    num: 2,
    title: "Generate your QR code",
    description:
      "Paste the link into OneQR. Download as SVG for print or PNG for digital. Custom colors to match your branding.",
  },
  {
    num: 3,
    title: "Print or share",
    description:
      "Add to flyers, social posts, table cards, or merch. With dynamic QR, swap the playlist later without reprinting.",
  },
];

const faqs = [
  {
    question: "Can I create a QR code for a Spotify playlist?",
    answer:
      "Yes. Copy the share link from any Spotify playlist, album, or artist page. Paste it into OneQR to generate a scannable QR code. When someone scans it, Spotify opens directly to that playlist — no searching required.",
  },
  {
    question: "Do people need Spotify to scan the QR code?",
    answer:
      "The QR code opens a Spotify link. If the person has Spotify installed, it opens in the app. If not, it opens in their browser where they can still preview the playlist. Free Spotify accounts work fine.",
  },
  {
    question: "Can I change the playlist after printing the QR code?",
    answer:
      "Yes, with a dynamic QR code. Point it to your pre-party playlist now, then swap it to the after-party mix later. Same printed code, new destination. Dynamic codes are $9.99 one-time.",
  },
  {
    question: "What size should a Spotify QR code be?",
    answer:
      "At least 1 inch (2.5 cm) square for reliable scanning. For social media posts, 200x200 pixels minimum. OneQR exports as SVG so it stays sharp at any size — no pixelation on posters or flyers.",
  },
  {
    question: "Is this different from Spotify's built-in codes?",
    answer:
      "Spotify has its own proprietary codes (Spotify Codes) that only work inside the Spotify app's camera. A standard QR code works with any phone camera — no app needed to scan. It's more universal and works on printed materials where people won't open Spotify first to scan.",
  },
  {
    question: "Is it free to create a Spotify QR code?",
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

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create a QR Code for a Spotify Playlist",
  description:
    "Generate a free QR code that links to any Spotify playlist, album, or artist page.",
  step: steps.map((s) => ({
    "@type": "HowToStep",
    name: s.title,
    text: s.description,
  })),
};

export default function SpotifyQrCodePage() {
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
          Spotify QR Codes
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Free Spotify QR Code Generator
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Turn any Spotify playlist, album, or artist into a scannable QR code.
          Print it on party invites, event flyers, or social posts. Guests scan
          and the music starts — no searching, no typing.
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
              Works with any phone
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
          Create Your Spotify QR Code — Free
        </Link>
      </section>

      {/* Inline QR Demo */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <SpotifyQrDemo />
      </section>

      {/* Use cases */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            5 ways to share music with QR codes
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            From house parties to cafe playlists — one scan and the music plays.
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
            Spotify QR code in 3 steps
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            No design skills needed. Match your brand colors.
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
              Generate Your Spotify QR Code
            </Link>
          </div>
        </div>
      </section>

      {/* Why OneQR */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why use OneQR for Spotify codes
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Universal scanning",
                desc: "Spotify's built-in codes require the Spotify app camera. A standard QR code works with any phone camera — more universal for printed materials.",
              },
              {
                title: "Swap playlists after printing",
                desc: "Dynamic QR codes let you change the linked playlist. Pre-party mix now, chill playlist later. Same printed code, new music.",
              },
              {
                title: "Custom colors",
                desc: "Match your event branding, album art, or social media aesthetic. Your QR code fits your design — not the other way around.",
              },
              {
                title: "No monthly fees",
                desc: "Static codes are free forever. Dynamic codes are $9.99 once — not a subscription that charges you every month.",
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
            How QR codes work with Spotify
          </h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-6 text-sm leading-relaxed text-zinc-400">
            <p>
              Sharing a Spotify playlist used to mean texting a long link or
              hoping people search the right name. A QR code makes it
              instant — scan with any phone camera, tap the notification, and
              the playlist opens in Spotify. No typing, no searching, no
              friction.
            </p>
            <p>
              The most popular use case is party playlists. Print a QR code on
              the invitation or display it at the entrance. Guests scan and
              everyone listens to the same curated mix. DJs use them on flyers
              and merch tables so fans can follow their setlists after the show.
            </p>
            <p>
              Cafes and restaurants are another growing use case. Display a QR
              code at the counter that links to the playlist currently playing
              in-store. Customers take the vibe home with them, and your brand
              stays in their Spotify library.
            </p>
            <p>
              For social media, add a QR code to your Instagram story, TikTok
              video, or YouTube thumbnail. Followers screenshot or scan to open
              the playlist directly — much easier than &quot;link in bio&quot;
              for music sharing.
            </p>
            <p>
              The difference between Spotify&apos;s built-in codes and a
              standard QR code matters. Spotify Codes (the barcode-style images
              inside the app) only work when scanned with Spotify&apos;s camera.
              A standard QR code works with any phone camera, making it far more
              practical for printed materials where people won&apos;t think to
              open Spotify first.
            </p>
            <p>
              For events where the playlist might change, use a dynamic QR code.
              Before the event, link it to the pre-party mix. During the event,
              swap it to the main playlist. After, change it to the chill
              wind-down set. Same printed QR code, different music each time.
              Dynamic codes are $9.99 one-time — no subscription.
            </p>
          </div>
        </div>
      </section>

      {/* Related use cases */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            More QR code use cases
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Wedding QR Codes", href: "/wedding" },
              { title: "Restaurant Menu QR", href: "/restaurant-menu-qr" },
              { title: "WiFi QR Codes", href: "/use-cases/wifi" },
              { title: "Event Tickets", href: "/use-cases/event-tickets" },
              { title: "Business Cards", href: "/use-cases/business-cards" },
              { title: "Marketing QR", href: "/use-cases/marketing" },
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
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Spotify QR code FAQ
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
          Share your music with a single scan
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Free QR codes for Spotify playlists, albums, and artists. Dynamic
          codes that update after printing are $9.99 once — not a subscription.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your Spotify QR Code — Free
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
