import type { Metadata } from "next";
import Link from "next/link";
import { VcardQrGenerator } from "./generator";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "vCard QR Code Generator — Create Digital Contact Cards | OneQR",
  description:
    "Generate a free vCard QR code. Scanning opens the phone's contact app with your name, email, phone, and company pre-filled. No typing needed. Dynamic codes update after printing — $9.99 once.",
  keywords: [
    "vcard qr code generator",
    "vcard qr code",
    "vcard generator",
    "create vcard",
    "contact qr code",
    "digital contact card",
    "vcard qr code free",
    "vcard scanner",
  ],
  alternates: {
    canonical: `${baseUrl}/vcard-qr`,
  },
  openGraph: {
    title: "vCard QR Code Generator — Create Digital Contact Cards | OneQR",
    description:
      "Free vCard QR code generator. Scans open the contact app with your info pre-filled. Dynamic codes update after printing — $9.99 once.",
    type: "website",
    siteName: "OneQR",
    url: `${baseUrl}/vcard-qr`,
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "vCard QR Code Generator — OneQR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "vCard QR Code Generator — Create Digital Contact Cards | OneQR",
    description:
      "Free vCard QR generator. Scans open contact app with your info pre-filled. Update after printing — $9.99 once.",
    images: [`${baseUrl}/opengraph-image`],
  },
};

const steps = [
  {
    num: 1,
    title: "Enter your contact info",
    description:
      "Name, email, phone, company. Only required fields generate a QR code — minimum one field needed.",
  },
  {
    num: 2,
    title: "Customize colors",
    description:
      "Match your brand. Dark foreground on light background for best scanning. OneQR exports SVG — sharp at any print size.",
  },
  {
    num: 3,
    title: "Download & share",
    description:
      "Download PNG or SVG. Print it, email it, or share on your phone. One scan — they save your contact instantly.",
  },
];

const vcardBenefits = [
  {
    title: "Zero friction contact exchange",
    description:
      "They scan, tap \"Add Contact\", done. Your info auto-populates their phone. No typing, no mistakes.",
    icon: "M12 19l9-2m0 0l-8-4m8 4l-9-9m-8 4l9 2m0 0l8-4m-8 4l-9 9",
  },
  {
    title: "Works offline",
    description:
      "Static vCard QR codes encode your contact data directly in the image. Scan works even without internet.",
    icon: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Perfect for networking",
    description:
      "Conferences, trade shows, events. Much faster than exchanging paper cards or typing contact details.",
    icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
  },
  {
    title: "Update your info anytime",
    description:
      "With OneQR Pro, change your phone, email, or company without reprinting cards. Same QR code works forever.",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  },
];

const faqs = [
  {
    question: "What is a vCard QR code?",
    answer:
      "A vCard is a digital contact card format (RFC 6350) that phones understand. When someone scans a vCard QR code, their phone opens the \"Add Contact\" screen with your name, email, phone, and company pre-filled. They tap once to save — no typing.",
  },
  {
    question: "How is a vCard QR code different from a URL QR code?",
    answer:
      "URL QR codes link to a website (LinkedIn, portfolio, etc.). vCard QR codes let someone save your contact info directly to their phone. URL codes are better for driving traffic; vCard codes are better for direct contact exchange.",
  },
  {
    question: "Will a vCard QR code work on all phones?",
    answer:
      "Yes. vCard is the universal contact format. iPhones, Android phones, Windows phones — all support it. When scanned, the QR code opens the phone's built-in contact app, and the vCard data auto-fills the form.",
  },
  {
    question: "Can I scan a vCard QR code without internet?",
    answer:
      "Yes. Unlike URL QR codes (which need internet to open a link), vCard QR codes encode the contact data directly in the image. Your phone can scan and process it completely offline.",
  },
  {
    question: "How do I create a vCard QR code with a photo?",
    answer:
      "OneQR's free vCard QR tool doesn't embed photos, but Pro dynamic codes can link to a vCard file that includes a PHOTO field. For basic contact info (name, email, phone, company), the free static code works perfectly.",
  },
  {
    question: "Can I update a vCard QR code after printing?",
    answer:
      "Static QR codes (free) encode your info permanently — reprinting is the only way to change it. OneQR Pro dynamic codes let you update your contact info anytime. The printed code stays the same, but scans fetch your latest info from the server.",
  },
  {
    question: "What's the best use case for vCard QR codes?",
    answer:
      "Conferences, networking events, trade shows, or anywhere you exchange contact info. Much faster than trading business cards or typing details into phones. Also great for email signatures, digital business cards, and team directories.",
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
  name: "OneQR vCard QR Code Generator",
  applicationCategory: "UtilitiesApplication",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Static vCard QR codes — free forever",
    },
    {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
      description: "Dynamic vCard QR codes — update your contact info after printing",
    },
  ],
};

export default function VcardQrPage() {
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
          vCard QR Codes
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Create a vCard QR Code for Your Contact
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Share your contact info in one scan. Generate a free vCard QR code with
          your name, email, phone, and company. Scans open the contact app with
          your info pre-filled.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {["Free forever", "SVG for print", "Works offline"].map((text) => (
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
          ))}
        </div>
      </section>

      {/* Inline vCard Generator */}
      <section className="mx-auto max-w-2xl px-6 pt-12 pb-20">
        <VcardQrGenerator />
      </section>

      {/* How to create step-by-step */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            How to create a vCard QR code
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Three simple steps. Takes under 60 seconds. No account needed for free codes.
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
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-xs text-zinc-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why vCard */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why use a vCard QR code?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Faster, easier, and more memorable than traditional contact exchange.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {vcardBenefits.map((benefit) => (
              <div
                key={benefit.title}
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
                      d={benefit.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">{benefit.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* vCard use cases */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Use cases for vCard QR codes
          </h2>
          <div className="mt-10 space-y-4 text-sm text-zinc-400">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p>
                <span className="font-semibold text-white">Networking events:</span> Print your vCard QR code on a business card or badge lanyard. People scan, save your contact in one tap.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p>
                <span className="font-semibold text-white">Email signatures:</span> Add your vCard QR code to your email footer. Recipients can scan and save your contact instantly.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p>
                <span className="font-semibold text-white">Team directories:</span> Publish your company directory with vCard QR codes. Employees and customers scan to add team members.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p>
                <span className="font-semibold text-white">Digital business cards:</span> Display your vCard QR code on your phone, Zoom background, or LinkedIn. Share your contact without paper.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Static vs Dynamic */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Free vs. Pro — which vCard QR code for you?
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-lg font-bold text-white">
                Static — <span className="text-emerald-400">Free</span>
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Free forever, no account
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Works offline, no server needed
                </li>
                <li className="flex gap-2">
                  <span className="text-zinc-600">-</span> Can't update your info after printing
                </li>
              </ul>
              <p className="mt-4 text-xs text-zinc-600">
                Best for: contact info that rarely changes (main phone, primary email).
              </p>
            </div>
            <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-6">
              <h3 className="text-lg font-bold text-white">
                Pro — <span className="text-emerald-400">$9.99 once</span>
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Update your info anytime
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> Scan analytics — see who scans
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">+</span> One-time payment, no subscription
                </li>
              </ul>
              <p className="mt-4 text-xs text-emerald-400/60">
                Best for: printed cards, badges, or materials you'll reuse long-term.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/register"
              className="inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
            >
              Get OneQR Pro — $9.99 Once
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            vCard QR code FAQ
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

      {/* Related tools */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <p className="text-center text-sm text-zinc-600">
            More QR code tools:{" "}
            <Link href="/business-card-qr" className="text-emerald-400 hover:underline">
              Business card QR codes
            </Link>
            {" · "}
            <Link href="/qr-codes/wifi" className="text-emerald-400 hover:underline">
              WiFi QR codes
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
          Exchange your contact info in one scan.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Generate a free vCard QR code with your name, email, phone, and company.
          No typing needed — they scan and save. Dynamic codes update anytime — $9.99 once.
        </p>
        <Link
          href="/vcard-qr"
          className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your vCard QR Code — Free
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
