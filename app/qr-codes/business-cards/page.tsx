import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "QR Code for Business Cards — Free Generator | OneQR",
  description:
    "Create QR codes for business cards. Link to your website, vCard, LinkedIn, or portfolio. Free static codes. Dynamic codes $9.99 once — update the link anytime. Print-ready SVG.",
  alternates: {
    canonical: `${baseUrl}/qr-codes/business-cards`,
  },
  openGraph: {
    title: "QR Code for Business Cards — Free Generator | OneQR",
    description:
      "Generate QR codes for business cards. Link to vCard, LinkedIn, portfolio, or any URL. Free static codes. Dynamic codes $9.99 once.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code for Business Cards — Free | OneQR",
    description:
      "Generate QR codes for business cards. vCard, LinkedIn, portfolio — any link. Free static. Dynamic $9.99 once.",
  },
};

const pricingRows = [
  {
    feature: "Static QR codes",
    oneqr: "Free forever",
    qrtiger: "$7/mo ($84/yr)",
    beaconstac: "$5/mo ($60/yr)",
  },
  {
    feature: "Dynamic QR codes",
    oneqr: "$9.99 once",
    qrtiger: "$7/mo ($84/yr)",
    beaconstac: "$14/mo ($168/yr)",
  },
  {
    feature: "SVG export (print-ready)",
    oneqr: "Included",
    qrtiger: "Paid plans only",
    beaconstac: "Paid plans only",
  },
  {
    feature: "Custom colors",
    oneqr: "Free",
    qrtiger: "Free",
    beaconstac: "Paid plans",
  },
  {
    feature: "No account required",
    oneqr: "Yes (static)",
    qrtiger: "No",
    beaconstac: "No",
  },
];

const useCases = [
  {
    title: "Digital business card",
    description:
      "Link your QR code to a vCard file. One scan saves your name, phone, email, and company directly to the contact list — no typing, no mistakes.",
    icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0",
  },
  {
    title: "LinkedIn profile",
    description:
      "Skip the \"search for me on LinkedIn\" conversation. A QR code on your card opens your profile instantly — connect on the spot at conferences and meetups.",
    icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    title: "Portfolio or website",
    description:
      "Point prospects to your work. Designers, photographers, freelancers — let your portfolio speak before the follow-up email.",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9",
  },
  {
    title: "Scheduling link",
    description:
      "Link to Calendly, Cal.com, or any booking page. Prospects scan your card and book a meeting without the back-and-forth emails.",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    title: "Company landing page",
    description:
      "Send prospects to a custom landing page with your latest offer, product demo, or case study. Update the destination anytime with a dynamic code.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "WiFi network",
    description:
      "Add a WiFi QR code on the back of your card. Clients visiting your office connect instantly — a small touch that signals professionalism.",
    icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0",
  },
];

const faqs = [
  {
    question: "What is the best QR code generator for business cards?",
    answer:
      "OneQR is purpose-built for business card QR codes: free static codes (no account needed), SVG export for crisp printing at any size, custom colors to match your brand, and $9.99 one-time dynamic codes that let you update the destination if you change jobs or websites. No monthly subscriptions.",
  },
  {
    question: "How do I put a QR code on my business card?",
    answer:
      "Generate your QR code on OneQR, download as SVG, and place it on the back of your card in Canva, Adobe Illustrator, or your print shop's design tool. Size it at least 0.8 inches (2 cm) square. Leave a quiet zone (white border) around the code for reliable scanning. Test before printing the full batch.",
  },
  {
    question: "Should I use a static or dynamic QR code on my business card?",
    answer:
      "Dynamic ($9.99 once). Business cards last years. With a dynamic code, you can update the destination when you change roles, companies, or websites — without reprinting. You also get scan analytics to see how often your card gets scanned.",
  },
  {
    question: "What should a business card QR code link to?",
    answer:
      "The most common choices: a vCard file (instant contact save), your LinkedIn profile, a personal website or portfolio, or a scheduling link (Calendly). With a dynamic code, you can start with LinkedIn and switch to a portfolio later.",
  },
  {
    question: "What size should a QR code be on a business card?",
    answer:
      "Minimum 0.8 inches (2 cm) square for standard business cards. 1 inch (2.5 cm) is ideal. OneQR exports SVG files that stay perfectly sharp at any print size — no pixelation, even on premium thick-stock cards.",
  },
  {
    question: "Can people scan QR codes without an app?",
    answer:
      "Yes. All modern smartphones (iPhone iOS 11+ and Android) scan QR codes with the built-in camera. Point, tap the notification, done. No special app needed — your contacts will have zero friction.",
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

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OneQR Business Card QR Code Generator",
  applicationCategory: "BusinessApplication",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Static QR codes — free forever",
    },
    {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
      description: "Dynamic QR codes — one-time payment, update link anytime",
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create a QR Code for Your Business Card",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter your URL",
      text: "Paste the link you want on your business card — vCard, LinkedIn, website, portfolio, or scheduling page.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Customize and download",
      text: "Match your brand colors. Export as SVG for crisp, print-ready quality at any size.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Add to your card and print",
      text: "Place the QR code on the back of your business card. With a dynamic code, update the link anytime without reprinting.",
    },
  ],
};

export default function BusinessCardQrCodePage() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
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
            <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white">
              Pricing
            </Link>
            <Link href="/login" className="text-sm text-zinc-400 hover:text-white">
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
          Business Card QR Code Generator
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Create QR Codes for Business Cards —{" "}
          <span className="text-emerald-400">Free</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Link your business card to a vCard, LinkedIn, website, or portfolio.
          One scan saves your contact info — no typing, no lost cards. Update
          the link anytime for $9.99 once.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {["No credit card required", "Cancel anytime", "Print-ready SVG"].map(
            (text) => (
              <div key={text} className="flex items-center gap-2">
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
                <span className="text-sm font-medium text-zinc-300">{text}</span>
              </div>
            )
          )}
        </div>

        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your Business Card QR Code — Free
        </Link>
      </section>

      {/* Problem / Solution */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 mt-20">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why QR codes on business cards work
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-lg font-bold text-zinc-400">Without a QR code</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-500">
                <li className="flex gap-2">
                  <span className="text-zinc-600">&#x2717;</span> Hand out card, hope they type your URL
                </li>
                <li className="flex gap-2">
                  <span className="text-zinc-600">&#x2717;</span> Card sits in a drawer, contact lost
                </li>
                <li className="flex gap-2">
                  <span className="text-zinc-600">&#x2717;</span> Job change = reprint everything
                </li>
                <li className="flex gap-2">
                  <span className="text-zinc-600">&#x2717;</span> No way to know if anyone followed up
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-6">
              <h3 className="text-lg font-bold text-emerald-400">With a QR code</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">&#x2713;</span> One scan saves your full contact info
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">&#x2713;</span> Direct link to LinkedIn, portfolio, or booking
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">&#x2713;</span> Dynamic code updates without reprinting
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">&#x2713;</span> Scan analytics show who engaged
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Use Cases */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            6 ways to use QR codes on business cards
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            A QR code turns a static card into a digital gateway — connect,
            share, and convert in one scan.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-950">
                  <svg
                    className="h-5 w-5 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={useCase.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">{useCase.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Business card QR code pricing — OneQR vs. competitors
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Most QR tools charge monthly. Your business card lasts years — why
            pay every month for the code on it?
          </p>

          <div className="mt-10 overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <th className="px-4 py-4 text-left font-medium text-zinc-400">
                    Feature
                  </th>
                  <th className="px-4 py-4 text-left font-medium text-emerald-400">
                    OneQR
                  </th>
                  <th className="px-4 py-4 text-left font-medium text-zinc-400">
                    QR Tiger
                  </th>
                  <th className="px-4 py-4 text-left font-medium text-zinc-400">
                    Beaconstac
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-zinc-800/50 bg-zinc-950"
                  >
                    <td className="px-4 py-3 text-zinc-300">{row.feature}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-400">
                      {row.oneqr}
                    </td>
                    <td className="px-4 py-3 text-zinc-500">{row.qrtiger}</td>
                    <td className="px-4 py-3 text-zinc-500">{row.beaconstac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-xs text-zinc-600">
            Prices as of March 2026. Dynamic QR = link can be changed after printing.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Add a QR code to your business card in 60 seconds
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                num: 1,
                title: "Enter your URL",
                desc: "vCard, LinkedIn, website, portfolio, Calendly — any link works.",
              },
              {
                num: 2,
                title: "Customize & download",
                desc: "Match your brand colors. Export as SVG for crisp printing on any card stock.",
              },
              {
                num: 3,
                title: "Print & network",
                desc: "Place the code on the back of your card. With dynamic QR, swap the link when you change roles.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-950 text-sm font-bold text-emerald-400">
                  {step.num}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-xs text-zinc-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
            >
              Generate Your Business Card QR Code
            </Link>
          </div>
        </div>
      </section>

      {/* Static vs Dynamic */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Static vs. dynamic — which for your business card?
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-lg font-bold text-white">
                Static QR Code — <span className="text-emerald-400">Free</span>
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Free forever, no
                  account needed
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Works instantly —
                  generate and download
                </li>
                <li className="flex gap-2">
                  <span className="text-zinc-600">-</span> Link is permanent — can&apos;t
                  change after printing
                </li>
              </ul>
              <p className="mt-4 text-xs text-zinc-600">
                Best for: established websites and LinkedIn profiles that
                won&apos;t change.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-6">
              <h3 className="text-lg font-bold text-white">
                Dynamic QR Code —{" "}
                <span className="text-emerald-400">$9.99 once</span>
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Change the
                  destination without reprinting cards
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> New job? Update
                  the link, keep the same cards
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Scan analytics —
                  see how many people scanned
                </li>
              </ul>
              <p className="mt-4 text-xs text-emerald-400/60">
                Best for: professionals who may change roles, freelancers with
                rotating portfolios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Business card QR code FAQ
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

      {/* Internal links */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <p className="text-center text-sm text-zinc-600">
            More QR code use cases:{" "}
            <Link href="/qr-codes/wifi" className="text-emerald-400 hover:underline">
              WiFi QR signs
            </Link>
            {" · "}
            <Link href="/qr-codes/wedding" className="text-emerald-400 hover:underline">
              Wedding QR codes
            </Link>
            {" · "}
            <Link href="/qr-codes/payment" className="text-emerald-400 hover:underline">
              Payment QR codes
            </Link>
            {" · "}
            <Link href="/restaurant-menu-qr" className="text-emerald-400 hover:underline">
              Restaurant menus
            </Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Your next connection is one scan away.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Free static codes for links that won&apos;t change. $9.99 once for
          dynamic codes you can update when you switch roles. No monthly fees,
          no app required.
        </p>
        <Link
          href="/register"
          className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Get Started Free
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
