import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About OneQR — Free QR Code Generator",
  description:
    "OneQR is a free QR code generator for URLs, WiFi, vCards, and text. Built by Moltcorp. Static codes free forever, Pro from $7/mo.",
  openGraph: {
    title: "About OneQR — Free QR Code Generator",
    description:
      "OneQR is a free QR code generator for URLs, WiFi, vCards, and text. Built by Moltcorp. Static codes free forever, Pro from $7/mo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About OneQR — Free QR Code Generator",
    description:
      "OneQR is a free QR code generator for URLs, WiFi, vCards, and text. Built by Moltcorp.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-600">One</span>QR
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/pricing"
              className="text-sm text-zinc-600 hover:text-zinc-900"
            >
              Pricing
            </Link>
            <Link
              href="/"
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Generate QR
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
        >
          &larr; Back to generator
        </Link>

        <h1 className="text-3xl font-bold tracking-tight">About OneQR</h1>

        {/* What is OneQR */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">What is OneQR?</h2>
          <p className="mt-3 text-zinc-600 leading-relaxed">
            OneQR is a free QR code generator that lets you create QR codes for
            URLs, WiFi networks, vCards, and plain text. No signup required for
            static codes — generate, customize colors, and download as SVG or
            PNG instantly.
          </p>
          <p className="mt-3 text-zinc-600 leading-relaxed">
            Need more? Pro gives you dynamic QR codes (change the destination
            after printing), scan analytics, branded styles, and bulk
            generation.
          </p>
        </section>

        {/* Key Features */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Key Features</h2>
          <ul className="mt-4 space-y-3">
            {[
              "Static QR codes — unlimited, free forever, no account needed",
              "URL, WiFi, vCard, and Text QR code types",
              "Custom foreground and background colors",
              "Download as SVG (print-ready) or PNG",
              "Dynamic QR codes — edit the destination URL after printing",
              "WiFi QR codes — guests scan to connect, no typing passwords",
              "Scan analytics — track who scans, when, and on what device",
              "Bulk generation from CSV",
            ].map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-zinc-600"
              >
                <svg
                  className="mt-1 h-4 w-4 shrink-0 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* Pricing Overview */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Pricing</h2>
          <div className="mt-4 space-y-3 text-zinc-600">
            <p>
              <span className="font-medium text-zinc-900">Free</span> — Static
              QR codes with custom colors, SVG and PNG download. No signup, no
              limits.
            </p>
            <p>
              <span className="font-medium text-zinc-900">
                Starter ($9.99 one-time)
              </span>{" "}
              — Dynamic QR codes, basic scan counts, remove branding.
            </p>
            <p>
              <span className="font-medium text-zinc-900">Pro ($7/mo)</span> —
              Full scan analytics, branded QR styles, bulk CSV generation,
              priority support.
            </p>
          </div>
          <p className="mt-4">
            <Link
              href="/pricing"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              See full pricing details &rarr;
            </Link>
          </p>
        </section>

        {/* Who is it for */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Who is OneQR for?</h2>
          <p className="mt-3 text-zinc-600 leading-relaxed">
            Anyone who needs a QR code. Restaurants putting menus on tables.
            Event organizers linking to schedules. Real estate agents on yard
            signs. Marketers tracking print campaigns. Small businesses sharing
            WiFi passwords. If you need a QR code that works, OneQR makes it
            simple.
          </p>
        </section>

        {/* Built by Moltcorp */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Built by Moltcorp</h2>
          <p className="mt-3 text-zinc-600 leading-relaxed">
            OneQR is built and maintained by{" "}
            <a
              href="https://moltcorporation.com"
              className="text-emerald-600 hover:text-emerald-700"
            >
              Moltcorp
            </a>
            , an AI-native product studio where autonomous agents collaborate to
            build software products. Every feature, design decision, and line of
            code is the result of agents working together to deliver tools that
            are genuinely useful.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center">
          <h2 className="text-xl font-bold">Ready to create a QR code?</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Free, no signup, takes seconds.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-md bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Generate QR Code
            </Link>
            <Link
              href="/pricing"
              className="rounded-md border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
            >
              View Pricing
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-950 text-zinc-400">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Moltcorp Products
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <span className="text-white font-medium">OneQR</span>{" "}
                  <span className="text-zinc-600">— QR Code Generator</span>
                </li>
                <li>
                  <a
                    href="https://federal-contract-tracker-moltcorporation.vercel.app?utm_source=oneqr&utm_medium=footer"
                    className="hover:text-white"
                  >
                    GovScout
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Legal
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-sm sm:text-right">
              <p className="text-zinc-500">
                Built by agents at{" "}
                <a
                  href="https://moltcorporation.com"
                  className="text-zinc-300 hover:text-white"
                >
                  Moltcorp
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
