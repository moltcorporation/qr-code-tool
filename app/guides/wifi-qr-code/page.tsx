import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free WiFi QR Code Generator | Create WiFi QR Codes Instantly | Qdot",
  description:
    "Create a free WiFi QR code so guests connect instantly — no typing passwords. Works for restaurants, offices, Airbnbs, and events. No signup required.",
  keywords: [
    "wifi qr code",
    "wifi qr code generator",
    "qr code for wifi",
    "wifi qr code free",
    "wifi password qr code",
    "wifi network qr code",
    "share wifi with qr code",
  ],
  openGraph: {
    title: "Free WiFi QR Code Generator — Connect Guests Instantly",
    description:
      "Create a WiFi QR code so guests connect with one scan. No typing passwords. Free, no signup.",
    type: "article",
  },
};

const faqs = [
  {
    question: "What is a WiFi QR code?",
    answer:
      "A WiFi QR code encodes your network name (SSID), password, and encryption type into a scannable code. When someone scans it with their phone camera, their device connects to the network automatically — no typing required.",
  },
  {
    question: "Is it free to create a WiFi QR code?",
    answer:
      "Yes. Qdot generates WiFi QR codes completely free — unlimited, no signup, no watermark. You can download as SVG for print or PNG for digital use.",
  },
  {
    question: "Is sharing my WiFi password via QR code safe?",
    answer:
      "The password is encoded in the QR code data, so anyone who scans it gets access. This is the same as telling someone your password — the QR code just makes it faster. Use WPA2 or WPA3 encryption, and consider creating a separate guest network so visitors can't access your main devices.",
  },
  {
    question: "Does it work on iPhone and Android?",
    answer:
      "Yes. iPhones running iOS 11+ and Android phones running Android 10+ can scan WiFi QR codes natively with their camera app. Older devices may need a QR scanner app.",
  },
  {
    question: "What if I change my WiFi password?",
    answer:
      "You'll need to generate a new QR code with the updated password. If you have the QR code printed, you'll need to reprint it. Tip: set a stable guest password that you rarely change and use a dedicated guest network.",
  },
  {
    question: "What encryption type should I choose?",
    answer:
      "Choose WPA/WPA2 — it's the standard for modern networks and the most widely supported. WPA3 is newer and more secure but not all devices support it yet. Never use WEP (it's insecure and outdated). If your network has no password, select 'None'.",
  },
];

const useCases = [
  {
    title: "Restaurants & cafes",
    description:
      "Print the QR code on table tents, menus, or the counter. Guests connect without asking staff for the password. Reduces interruptions and improves the experience.",
  },
  {
    title: "Airbnbs & vacation rentals",
    description:
      "Put a framed QR code by the router or on the welcome card. Guests connect in seconds — no hunting for the password on the fridge or in a welcome binder.",
  },
  {
    title: "Offices & coworking spaces",
    description:
      "Mount near the entrance or in meeting rooms. Visitors and contractors connect to the guest network without IT support. Saves time for everyone.",
  },
  {
    title: "Events & conferences",
    description:
      "Display on signage, badges, or projector slides. Hundreds of attendees connect simultaneously without a help desk bottleneck.",
  },
  {
    title: "Retail stores",
    description:
      "Offer free WiFi to keep customers browsing longer. A QR code at the entrance or checkout makes connecting effortless.",
  },
  {
    title: "Hotels & lobbies",
    description:
      "Replace the 'ask at front desk' experience. Place QR codes in rooms, the lobby, and common areas so guests self-serve.",
  },
];

export default function WifiQRGuide() {
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
    name: "How to Create a WiFi QR Code",
    description:
      "Create a free WiFi QR code that lets guests connect to your network instantly.",
    step: [
      {
        "@type": "HowToStep",
        name: "Open the WiFi QR generator",
        text: "Go to Qdot and click the WiFi tab at the top of the generator.",
      },
      {
        "@type": "HowToStep",
        name: "Enter your network details",
        text: "Type your network name (SSID), password, and select your encryption type (WPA/WPA2 for most networks).",
      },
      {
        "@type": "HowToStep",
        name: "Generate and download",
        text: "Click Generate. Download as SVG for print or PNG for digital. Print and place where guests need WiFi access.",
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
            <span className="text-emerald-600">Q</span>dot
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
          WiFi QR Code Generator: Let Guests Connect Instantly
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Stop spelling out your WiFi password. Create a QR code that connects
          phones to your network with a single scan. Free, no signup, takes 10
          seconds.
        </p>

        {/* Inline CTA */}
        <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <p className="text-sm font-medium text-emerald-800">
            Ready to create your WiFi QR code?
          </p>
          <Link
            href="/"
            className="mt-3 inline-block rounded-md bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
          >
            Open WiFi QR Generator
          </Link>
          <p className="mt-2 text-xs text-emerald-600">
            Click the &quot;WiFi&quot; tab after opening
          </p>
        </div>

        {/* Step by step */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">
            How to create a WiFi QR code in 3 steps
          </h2>
          <div className="mt-6 flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                1
              </div>
              <div>
                <h3 className="font-semibold">Open the WiFi tab</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Go to{" "}
                  <Link href="/" className="text-emerald-600 hover:underline">
                    Qdot
                  </Link>{" "}
                  and click the <strong>WiFi</strong> tab at the top of the
                  generator. This switches to WiFi QR mode.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                2
              </div>
              <div>
                <h3 className="font-semibold">Enter your network details</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Type your <strong>network name</strong> (SSID) exactly as it
                  appears on your router. Enter the <strong>password</strong>.
                  Select your <strong>encryption type</strong> — WPA/WPA2 for
                  most modern networks. If your network has no password, select
                  &quot;None&quot;.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                3
              </div>
              <div>
                <h3 className="font-semibold">Generate and download</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Click <strong>Generate</strong>. Download as SVG for print
                  (perfect at any size) or PNG for digital. Print and place
                  wherever guests need WiFi — tables, walls, welcome cards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mt-16 rounded-xl border border-amber-200 bg-amber-50 p-8">
          <h2 className="text-xl font-bold text-amber-900">
            WiFi QR code security: what you should know
          </h2>
          <div className="mt-4 space-y-3 text-sm text-amber-800">
            <p>
              <strong>Use WPA2 or WPA3.</strong> These are the current security
              standards. Never use WEP — it can be cracked in minutes.
            </p>
            <p>
              <strong>Create a guest network.</strong> Most routers let you set
              up a separate guest network. Share that via QR instead of your main
              network, so visitors can&apos;t access your printers, NAS, or
              other devices.
            </p>
            <p>
              <strong>The password is in the QR code.</strong> Anyone who scans
              it gets access. This is intentional — the QR code replaces telling
              people the password verbally. If you change the password,
              you&apos;ll need a new QR code.
            </p>
          </div>
        </section>

        {/* Use cases */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">
            Where to use WiFi QR codes
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

        {/* Comparison */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">
            WiFi QR codes vs. typing the password
          </h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="px-4 py-3 font-semibold"></th>
                  <th className="px-4 py-3 font-semibold">QR code</th>
                  <th className="px-4 py-3 font-semibold">Typing manually</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr>
                  <td className="px-4 py-3 font-medium">Time to connect</td>
                  <td className="px-4 py-3 text-emerald-600">~2 seconds</td>
                  <td className="px-4 py-3 text-zinc-500">30-60 seconds</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Typo risk</td>
                  <td className="px-4 py-3 text-emerald-600">None</td>
                  <td className="px-4 py-3 text-zinc-500">High (especially complex passwords)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Staff involvement</td>
                  <td className="px-4 py-3 text-emerald-600">None</td>
                  <td className="px-4 py-3 text-zinc-500">Asked every time</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Works at scale</td>
                  <td className="px-4 py-3 text-emerald-600">Hundreds of guests</td>
                  <td className="px-4 py-3 text-zinc-500">One at a time</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-xl bg-zinc-950 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">
            Create your WiFi QR code now
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400">
            Free. No signup. No watermark. Takes 10 seconds.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
          >
            Generate a free WiFi QR code
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
