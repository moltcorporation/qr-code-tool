import Link from "next/link";

const features = [
  {
    title: "Static QR Codes",
    description:
      "Generate QR codes for any URL. Download as SVG or PNG. Free, no limits.",
  },
  {
    title: "WiFi QR Codes",
    description:
      "Create QR codes for WiFi networks. Guests scan to connect instantly.",
  },
  {
    title: "Dynamic QR Codes",
    badge: "Pro",
    description:
      "Edit where your QR code points after printing. Never reprint again.",
  },
  {
    title: "Scan Analytics",
    badge: "Pro",
    description:
      "Track every scan: when, where, what device. See which QR codes perform.",
  },
  {
    title: "Custom Colors",
    description:
      "Match your QR code to your brand. Pick foreground and background colors.",
  },
  {
    title: "Print-Ready SVG",
    description:
      "Download as SVG for perfect quality at any size. Business cards to billboards.",
  },
];

const steps = [
  {
    number: "1",
    title: "Enter your URL or WiFi details",
    description: "Paste a link or fill in your WiFi network info.",
  },
  {
    number: "2",
    title: "Customize colors and download",
    description: "Pick your colors, then download as SVG or PNG.",
  },
  {
    number: "3",
    title: "Scan and track",
    description: "Share your QR code. With Pro, track every scan.",
    badge: "Pro",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Qdot",
  url: "https://qdot.sh",
  description:
    "Free QR code generator. Create static and dynamic QR codes instantly. Download as SVG or PNG.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier — unlimited static QR codes",
    },
    {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
      description: "Pro — one-time payment for dynamic QR codes and analytics",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white font-sans text-zinc-900">
        {/* Header */}
        <header className="border-b border-zinc-200">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-emerald-600">Q</span>dot
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/pricing"
                className="text-sm text-zinc-600 hover:text-zinc-900"
              >
                Pricing
              </Link>
              {/* TODO: link to /generate once that page exists */}
              <Link
                href="/"
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Generate QR
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-3xl px-6 pb-20 pt-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Free QR Code Generator
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600">
            Generate QR codes instantly. Static codes are free forever. Dynamic
            codes let you edit destinations after printing and track every scan.
          </p>

          {/* Placeholder input — actual generation built in a separate task */}
          <div className="mx-auto mt-10 max-w-lg">
            <div className="flex overflow-hidden rounded-lg border border-zinc-300 shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
              <input
                type="url"
                placeholder="Enter a URL to generate a QR code..."
                className="flex-1 px-4 py-3 text-sm outline-none placeholder:text-zinc-400"
                /* Placeholder — generation logic will be added in another task */
                readOnly
              />
              <button
                type="button"
                className="bg-emerald-600 px-5 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Generate
              </button>
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              No signup required. Free forever for static QR codes.
            </p>
          </div>
        </section>

        {/* Feature grid */}
        <section className="border-t border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-center text-2xl font-bold tracking-tight">
              Everything you need to create QR codes
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-lg bg-white p-6 shadow-sm border border-zinc-200">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-zinc-900">
                      {feature.title}
                    </h3>
                    {feature.badge && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-zinc-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            No subscription required
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-600">
            Static QR codes are free forever. Upgrade once for $9.99 to unlock
            dynamic codes and analytics. No monthly fees.
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-block rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            View pricing
          </Link>
        </section>

        {/* How it works */}
        <section className="border-t border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              {steps.map((step) => (
                <div key={step.number}>
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                    {step.number}
                  </div>
                  <h3 className="mt-4 font-semibold text-zinc-900">
                    {step.title}
                    {step.badge && (
                      <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        {step.badge}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Start generating QR codes
          </h2>
          <p className="mt-3 text-zinc-600">
            Free. No signup. Instant download.
          </p>
          {/* TODO: link to /generate once that page exists */}
          <Link
            href="/"
            className="mt-6 inline-block rounded-md bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Generate a QR code
          </Link>
        </section>

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
                    <span className="text-white font-medium">Qdot</span>{" "}
                    <span className="text-zinc-600">— QR Code Generator</span>
                  </li>
                  <li>
                    <a
                      href="https://statuspinghq.com"
                      className="hover:text-white"
                    >
                      StatusPing
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://reconapp.io"
                      className="hover:text-white"
                    >
                      Recon
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://federalcontracttracker.com"
                      className="hover:text-white"
                    >
                      Federal Contract Tracker
                    </a>
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
    </>
  );
}
