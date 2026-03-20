import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "WiFi QR Code Generator — Free, No App Needed | OneQR",
  description:
    "Create a QR code for your WiFi network. Guests scan and connect instantly — no typing passwords. Free for static codes. Dynamic WiFi QR codes $9.99 once.",
  alternates: {
    canonical: `${baseUrl}/use-cases/wifi`,
  },
  openGraph: {
    title: "WiFi QR Code Generator — Free | OneQR",
    description:
      "WiFi QR codes for guests. Scan to connect, no password typing. Free to create.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "WiFi QR Code Generator — Free | OneQR",
    description:
      "WiFi QR codes for guests. Scan to connect, no password typing. Free to create.",
  },
};

const competitors = [
  { name: "QiFi", price: "Free", annual: "Free", note: "No analytics, no dynamic" },
  { name: "QR Code Generator Pro", price: "$6.99/mo", annual: "$84/yr", note: "Dynamic WiFi QR" },
  { name: "Beaconstac", price: "$5/mo", annual: "$60/yr", note: "1 QR code" },
  { name: "QR Tiger", price: "$7/mo", annual: "$84/yr", note: "Dynamic QR" },
];

const steps = [
  {
    num: 1,
    title: "Enter your WiFi details",
    description:
      "Type your network name (SSID), password, and encryption type (WPA/WPA2). That's it.",
  },
  {
    num: 2,
    title: "Generate your QR code",
    description:
      "Download as SVG for print or PNG for digital. The QR code encodes your WiFi credentials directly — no URL needed.",
  },
  {
    num: 3,
    title: "Display for guests",
    description:
      "Print a card for your front desk, Airbnb, cafe counter, or office wall. Guests scan and connect — no asking for the password.",
  },
];

const faqs = [
  {
    question: "How does a WiFi QR code work?",
    answer:
      "The QR code encodes your network name, password, and encryption type directly. When someone scans it with their phone camera, their device auto-connects to your WiFi. No URL involved — it works offline.",
  },
  {
    question: "Is it free to create a WiFi QR code?",
    answer:
      "Yes. Static WiFi QR codes are completely free — no account needed. Generate and download instantly. If you want to update the password later without reprinting, upgrade to a dynamic QR code for $9.99 once.",
  },
  {
    question: "Can I update the WiFi password without reprinting?",
    answer:
      "With a static WiFi QR code (free), you'd need to generate a new QR code if your password changes. With a dynamic QR code (Pro, $9.99 once), you can update the password anytime and the same printed QR code keeps working.",
  },
  {
    question: "Does it work on iPhone and Android?",
    answer:
      "Yes. Both iPhone (iOS 11+) and Android phones can scan WiFi QR codes with their built-in camera app. No special app needed.",
  },
  {
    question: "Is my WiFi password secure?",
    answer:
      "Your password is encoded in the QR code image itself, not stored on any server. Anyone who can scan the QR code can connect — so display it where you'd normally share the password (lobby, guest room, counter).",
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

export default function WifiPage() {
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
          WiFi QR Codes
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          WiFi QR Code Generator —{" "}
          <span className="text-emerald-400">Free</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Stop spelling out your WiFi password. Create a QR code that connects
          guests to your network instantly — they scan, they&apos;re online. Works
          on iPhone and Android with no app needed.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {["Free forever", "No app needed", "Works on all phones"].map((text) => (
            <div key={text} className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-zinc-300">{text}</span>
            </div>
          ))}
        </div>

        <Link href="/" className="mt-8 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400">
          Create Your WiFi QR Code — Free
        </Link>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Most WiFi QR tools are free. But updating costs $84/yr.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
          Static WiFi QR codes are free everywhere. If you ever change your password, OneQR Pro lets you update for $9.99 once — not $7/mo.
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900">
                <th className="px-6 py-4 text-left font-medium text-zinc-400">Tool</th>
                <th className="px-6 py-4 text-left font-medium text-zinc-400">Static</th>
                <th className="px-6 py-4 text-left font-medium text-zinc-400">Dynamic (updatable)</th>
                <th className="px-6 py-4 text-left font-medium text-zinc-400">Note</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => (
                <tr key={c.name} className="border-b border-zinc-800/50 bg-zinc-950">
                  <td className="px-6 py-4 text-zinc-300">{c.name}</td>
                  <td className="px-6 py-4 text-zinc-400">{c.price}</td>
                  <td className="px-6 py-4 text-red-400 line-through">{c.annual}</td>
                  <td className="px-6 py-4 text-zinc-500">{c.note}</td>
                </tr>
              ))}
              <tr className="bg-emerald-950/30">
                <td className="px-6 py-4 font-semibold text-emerald-400">OneQR</td>
                <td className="px-6 py-4 font-bold text-emerald-400">Free</td>
                <td className="px-6 py-4 text-emerald-300">$9.99 once</td>
                <td className="px-6 py-4 text-emerald-300">Unlimited</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-600">
          Prices as of March 2026. Dynamic QR = updatable after printing.
        </p>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            WiFi QR code in 3 steps
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Under 60 seconds. No account needed.
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
              Generate Your WiFi QR Code
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Where to use a WiFi QR code
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Airbnb & vacation rentals",
                desc: "Print a card near the router. Guests connect without messaging you for the password at midnight.",
              },
              {
                title: "Cafes & restaurants",
                desc: "Table card or wall sign. Customers scan and connect — no asking staff, no chalkboard passwords.",
              },
              {
                title: "Office & coworking",
                desc: "Display in the lobby or meeting rooms. New visitors connect instantly without IT help.",
              },
              {
                title: "Home guests",
                desc: "Fridge magnet or entryway card. Friends and family connect without you reading out 16 characters.",
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
            WiFi QR code FAQ
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
          Stop spelling out your WiFi password.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Static WiFi QR codes are free — no account needed. If you change your
          password later, a dynamic QR code lets you update without reprinting — $9.99 once.
        </p>
        <Link href="/" className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400">
          Create Your WiFi QR Code — Free
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
