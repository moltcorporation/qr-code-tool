import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "QR Code for Payments — Accept Payments with QR Codes | OneQR",
  description:
    "Create QR codes to accept payments via Zelle, Venmo, PayPal, and Square. Customers scan to pay instantly. No POS system needed.",
  alternates: {
    canonical: `${baseUrl}/payment-qr-code`,
  },
  openGraph: {
    title: "QR Code for Payments — Accept Payments Instantly | OneQR",
    description:
      "Generate payment QR codes for Zelle, Venmo, PayPal, Square, and more. Accept payments with a single scan.",
    type: "website",
    siteName: "OneQR",
    url: `${baseUrl}/payment-qr-code`,
    images: [
      {
        url: `${baseUrl}/api/og?title=Payment%20QR%20Codes&desc=Accept%20Payments%20with%20QR%20Codes`,
        width: 1200,
        height: 630,
        alt: "OneQR - Payment QR Codes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code for Payments | OneQR",
    description:
      "Accept payments via QR code. Zelle, Venmo, PayPal, Square — your choice.",
  },
};

const useCases = [
  {
    title: "Small business payments",
    description:
      "Display a payment QR code at checkout. Customers scan to pay via their preferred app (Venmo, PayPal, Square Cash). No card reader, no fees — just a QR code.",
    keyword: "qr code for business payments",
  },
  {
    title: "Freelancer invoicing",
    description:
      "Send a QR code with your invoice. Clients scan to pay directly to your Venmo or PayPal. Same instant confirmation you get from bank transfers.",
    keyword: "qr code payment freelance",
  },
  {
    title: "Tip collection",
    description:
      "Put a payment QR code at your counter or service point. Customers scan to add a tip to your Venmo, Square Cash, or PayPal. Works for restaurants, salons, rideshare.",
    keyword: "payment qr code tips",
  },
  {
    title: "Event ticketing & donations",
    description:
      "Print QR codes on flyers or display them at your event. Attendees scan to buy tickets or donate via PayPal or Stripe. Instant payment confirmation.",
    keyword: "qr code payment events",
  },
  {
    title: "Zelle payments",
    description:
      "For bank-to-bank transfers, create a Zelle QR code pointing to your username. Works across all major U.S. banks — no new apps for your customers.",
    keyword: "zelle qr code payment",
  },
];

const steps = [
  {
    num: 1,
    title: "Choose your payment method",
    description:
      "Zelle, Venmo, PayPal, Square, or any payment link. Get your payment username or link.",
  },
  {
    num: 2,
    title: "Generate your QR code",
    description:
      "Paste your payment link into OneQR. Get a print-ready or digital QR code in seconds.",
  },
  {
    num: 3,
    title: "Display and start accepting payments",
    description:
      "Print on signage, add to invoices, or display on your phone. Customers scan to pay instantly.",
  },
];

const faqs = [
  {
    question: "Can I put a QR code on my invoice for payment?",
    answer:
      "Yes. Generate a QR code pointing to your PayPal, Venmo, or Zelle payment page. Add it to your invoice. Clients scan and pay in seconds — no typing long payment links.",
  },
  {
    question: "Does the customer need an app to pay via QR?",
    answer:
      "No for Zelle and most payment apps. Customers scan with their phone camera and tap the link. If they have Venmo, PayPal, or Square already installed, they'll be routed there. Otherwise, they can pay via browser.",
  },
  {
    question: "Can I track payments made via a payment QR code?",
    answer:
      "Yes — all payments go directly to your Zelle, Venmo, PayPal, or Square account. Your transaction history there shows who paid and when. With dynamic QR codes ($9.99), you can also track scans and redirects.",
  },
  {
    question: "Is a payment QR code secure?",
    answer:
      "Yes. A payment QR code simply links to your verified payment account (Zelle username, PayPal.me link, or Square Cash handle). Customers see your payment method before completing the transaction — same as clicking a payment link.",
  },
  {
    question: "What's the difference between a static and dynamic payment QR?",
    answer:
      "Static QR codes are free and permanent — the payment link is baked into the code. Dynamic QR codes ($9.99 one-time) let you change the destination without reprinting. Switch from Venmo to PayPal or update your payment link — same printed code, new destination.",
  },
  {
    question: "Can I use a QR code for Zelle payments?",
    answer:
      "Yes. Create a Zelle QR code pointing to your Zelle username or phone number. When customers scan, they can send you money via Zelle without leaving their banking app. Works with all major U.S. banks.",
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

export default function PaymentQRPage() {
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
          Payment QR Codes
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          QR Code for Payments — Accept Payments with QR Codes
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Create a QR code for Zelle, Venmo, PayPal, or Square. Customers scan
          to pay instantly. No card reader, no fees, no waiting. Print on
          signage or add to your invoice.
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
              All payment apps
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
              Instant setup
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your Payment QR Code — Free
        </Link>
      </section>

      {/* Use cases */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            5 ways to accept payments with QR codes
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            From invoices to counters to events — QR codes turn any touchpoint
            into an instant payment.
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
            Payment QR code in 3 steps
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            From payment link to working QR code in under a minute.
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
              Generate Your Payment QR Code
            </Link>
          </div>
        </div>
      </section>

      {/* Why OneQR for payments */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Why businesses choose OneQR for payments
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Works with any payment app",
                desc: "Zelle, Venmo, PayPal, Square, Stripe — point your QR code anywhere. No new account needed.",
              },
              {
                title: "Instant setup",
                desc: "Paste your payment link, generate the QR code, and start sharing. No integrations, no developer keys.",
              },
              {
                title: "Track customer payments",
                desc: "Dynamic QR codes ($9.99) let you see how many people scanned and paid — simple analytics for your business.",
              },
              {
                title: "Update your payment method anytime",
                desc: "With dynamic codes, switch from Venmo to PayPal without reprinting. Same code, new destination.",
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

      {/* Platform setup guides */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Step-by-step setup for popular payment platforms
          </h2>

          <div className="mx-auto mt-12 max-w-2xl space-y-8">
            {[
              {
                name: "Zelle",
                steps: [
                  "Open your bank app and find your Zelle username or phone number",
                  "Copy that username/phone into OneQR's QR generator",
                  "Generate your QR code — customers scan and send money via their bank app",
                  "No new app install required — Zelle works inside all major U.S. banks",
                ],
              },
              {
                name: "Venmo",
                steps: [
                  "Go to venmo.com and sign in to your account",
                  "Copy your Venmo username",
                  "Paste it into OneQR. Generate QR code for venmo.com/yourname",
                  "When customers scan, they can send you money directly to your Venmo account",
                ],
              },
              {
                name: "PayPal",
                steps: [
                  "Sign into PayPal and go to Settings → Transfer money",
                  "Create a PayPal.Me link (paypal.me/yourname)",
                  "Paste that link into OneQR and generate your QR code",
                  "Customers scan and pay via their PayPal account or card",
                ],
              },
              {
                name: "Square Cash",
                steps: [
                  "Open Square Cash and tap your profile",
                  "Copy your Square Cash $tag (e.g., $johnsmith)",
                  "Paste into OneQR: cash.app/$yourname",
                  "Customers scan and pay directly to your Cash account",
                ],
              },
            ].map((platform) => (
              <div
                key={platform.name}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="text-lg font-semibold text-white">
                  {platform.name}
                </h3>
                <ol className="mt-4 space-y-3 text-sm text-zinc-400">
                  {platform.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-950 text-xs font-bold text-emerald-400">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            How to set up a QR code for payment
          </h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-6 text-sm leading-relaxed text-zinc-400">
            <p>
              Payment QR codes are becoming the fastest way for businesses to
              accept money without a physical card reader or POS system. A
              single scan lets your customer choose their payment app — Zelle,
              Venmo, PayPal, or Square — and complete the transaction.
            </p>
            <p>
              The most common use is for small business owners and
              service providers. Add a payment QR code to your invoice, print it
              at your counter, or include it in your email signature. Clients
              scan and pay instantly. No typing long payment links. No waiting
              for bank transfers.
            </p>
            <p>
              For online businesses, a payment QR code works for invoices,
              newsletters, and event registration. Freelancers use them on
              invoices to accept instant Venmo or PayPal payments from clients.
              Restaurants and retail shops display them at checkout for
              contactless tipping and payment. Event organizers print them on
              flyers for ticket sales and donations.
            </p>
            <p>
              The most popular payment method via QR code is Zelle for business
              transfers and Venmo for peer-to-peer payments. Zelle offers the
              advantage of bank-to-bank security — no middleman, no fees,
              instant clearing. Venmo appeals to younger audiences and social
              payment habits. PayPal and Square Cash are universal fallbacks.
            </p>
            <p>
              When you create a payment QR code, you have two options: static or
              dynamic. A static QR code is free forever. The payment link is
              baked into the code — it never changes. A dynamic QR code ($9.99
              one-time) lets you update where the QR points after it&apos;s
              printed or shared. Switch from Zelle to Venmo, or change your
              payment account without reprinting signage or invoices.
            </p>
            <p>
              For business use, dynamic QR codes are worth the investment. Print
              your QR code once on signage, business cards, or invoices. If you
              change payment platforms — or your business account — simply
              update the destination in your OneQR dashboard. The printed code
              keeps working with zero waste.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Payment QR code FAQ
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
          Turn any touchpoint into a payment
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Create a free payment QR code for Zelle, Venmo, PayPal, or Square.
          Customers scan to pay. Dynamic codes that track scans are $9.99
          once — not a subscription.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
        >
          Create Your Payment QR Code — Free
        </Link>
      </section>

      {/* Internal links to related guides */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            More QR code guides
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <Link
              href="/business-card-qr"
              className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 hover:border-emerald-400"
            >
              <h3 className="font-semibold text-white">
                Business Card QR Codes
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                Add a QR code to your business card to share contact info
              </p>
            </Link>
            <Link
              href="/qr-codes/wedding"
              className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 hover:border-emerald-400"
            >
              <h3 className="font-semibold text-white">Wedding QR Codes</h3>
              <p className="mt-2 text-sm text-zinc-500">
                QR codes for invitations, RSVP, photos, and registry
              </p>
            </Link>
            <Link
              href="/restaurant-menu-qr"
              className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 hover:border-emerald-400"
            >
              <h3 className="font-semibold text-white">Menu QR Codes</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Digital menus that let customers order without paper
              </p>
            </Link>
          </div>
        </div>
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
