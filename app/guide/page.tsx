import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "QR Code Guide for Small Business | OneQR",
  description:
    "Everything small businesses need to know about QR codes in 2026. Static vs dynamic, WiFi codes, tracking scans, sizing, placement, and best practices. Free guide from OneQR.",
  keywords: [
    "qr code guide",
    "qr code for business",
    "qr code small business",
    "qr code best practices",
    "static vs dynamic qr code",
    "how to use qr codes",
    "qr code marketing",
    "qr code tracking",
    "qr code size guide",
  ],
  alternates: { canonical: `${baseUrl}/guide` },
  openGraph: {
    title: "QR Code Guide for Small Business — OneQR",
    description:
      "Everything you need to know about QR codes for your business. Static vs dynamic, tracking, sizing, placement, and real-world use cases.",
    type: "article",
    url: `${baseUrl}/guide`,
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Guide for Small Business — OneQR",
    description:
      "Static vs dynamic, WiFi codes, scan tracking, sizing & placement. The complete QR code guide for small businesses.",
  },
};

const faqs = [
  {
    question: "How much does it cost to create a QR code?",
    answer:
      "Basic static QR codes are free on OneQR — no signup, no watermark, no limits. Dynamic QR codes with scan analytics and editable URLs are available with OneQR Pro from $7/mo. There are no monthly fees for static codes.",
  },
  {
    question: "Do QR codes expire?",
    answer:
      "Static QR codes never expire. They encode data directly, so they work forever as long as the destination URL stays live. Dynamic QR codes depend on a redirect service — they work as long as the provider is active. OneQR dynamic codes have no expiration date.",
  },
  {
    question: "What's the minimum size for a printed QR code?",
    answer:
      "The minimum recommended size is 2 cm x 2 cm (about 0.8 inches) for close-range scanning like business cards and product labels. For posters and signage, use the 10:1 rule — the QR code should be at least 1/10th of the scanning distance. A code on a wall scanned from 3 meters away should be at least 30 cm wide.",
  },
  {
    question: "Can I change the URL after printing?",
    answer:
      "Only with dynamic QR codes. Static QR codes encode the URL directly — once printed, the destination is permanent. Dynamic codes use a redirect URL, so you can change the destination anytime without reprinting. This is why dynamic codes are recommended for printed materials.",
  },
  {
    question: "Do QR codes work without internet?",
    answer:
      "QR codes that link to websites require internet to load the destination. However, QR codes that encode text, WiFi credentials, or contact cards (vCards) work offline — the data is embedded directly in the code pattern. WiFi QR codes connect devices to networks without needing an active internet connection on the scanning device.",
  },
  {
    question: "How do I track QR code scans?",
    answer:
      "Use dynamic QR codes, which route through a tracking URL. OneQR Pro provides scan analytics including scan count, timestamps, and referrer data. For additional tracking, append UTM parameters to your destination URL (e.g., ?utm_source=flyer&utm_medium=qr) and monitor in your analytics platform.",
  },
  {
    question: "What file format should I use for printing?",
    answer:
      "SVG is best for print — it's a vector format that stays sharp at any size without pixelation. Use PNG for digital applications like websites, emails, and social media posts. OneQR lets you download in both formats for free.",
  },
  {
    question:
      "Are QR codes still relevant in 2026?",
    answer:
      "Yes. QR code usage continues to grow as smartphone cameras have built-in scanning (no app needed on iOS and Android). Statista projects 100 million US smartphone users will scan QR codes in 2026. Restaurants, retail, events, real estate, and healthcare all use them as standard practice.",
  },
];

const sections = [
  {
    id: "why-qr-codes",
    title: "Why QR codes matter for small businesses in 2026",
    content: [
      "QR codes bridge the gap between physical and digital. A customer sees your flyer, scans the code, and lands on your booking page. No typing URLs, no searching, no friction. For small businesses competing with larger brands online, QR codes create a direct path from the real world to your digital storefront.",
      "Three things changed since the early QR code era. First, every modern smartphone scans QR codes natively — no app download required. iPhone cameras have done this since iOS 11 (2017), and Android followed with Android 10 (2019). The adoption barrier that killed QR codes in 2013 no longer exists.",
      "Second, COVID-era contactless menus normalized QR code usage. Customers now expect to see them. A 2024 survey by Square found that 72% of consumers had scanned a QR code at a restaurant in the prior 6 months. That learned behavior transfers to retail, services, and events.",
      "Third, QR codes are free. Unlike paid ads, they cost nothing to generate and almost nothing to deploy. Print a QR code on a business card, a receipt, or a window sticker and you have a permanent link to your website, menu, booking page, or special offer. The ROI is asymmetric — minimal cost, direct measurable traffic.",
    ],
  },
  {
    id: "static-vs-dynamic",
    title: "Static vs dynamic QR codes explained",
    content: [
      "This is the most important distinction in QR codes, and most guides overcomplicate it. Here's the simple version:",
    ],
    subsections: [
      {
        title: "Static QR codes",
        points: [
          "The URL is encoded directly in the code pattern",
          "Cannot be changed after creation — what you encode is permanent",
          "No scan tracking — you can't see how many people scanned it",
          "Work forever, even if the generator service disappears",
          "Free on OneQR with no limits",
          "Best for: stable links (your website homepage, Google Maps listing, WiFi credentials)",
        ],
      },
      {
        title: "Dynamic QR codes",
        points: [
          "The code points to a short redirect URL, not the final destination",
          "You can change the destination URL anytime without reprinting",
          "Scan analytics: see how many scans, when, and from where",
          "Depend on the redirect service staying online",
          "Available with OneQR Pro (from $7/mo)",
          "Best for: printed materials where the destination might change (menus, flyers, business cards with seasonal offers)",
        ],
      },
    ],
    afterContent: [
      "Rule of thumb: if you're printing it and might need to update the link later, use dynamic. If the URL is permanent (your homepage, a Google Maps link), static is fine and simpler.",
    ],
  },
  {
    id: "wifi-qr-codes",
    title: "WiFi QR codes for restaurants and retail",
    content: [
      "WiFi QR codes are a separate category. Instead of encoding a URL, they encode your network name (SSID), password, and encryption type. When a customer scans the code, their phone connects to the WiFi automatically — no typing the password.",
      "This solves a real problem. The most common question staff hear in restaurants, cafes, hotels, and coworking spaces is 'What's the WiFi password?' A QR code on the table, wall, or welcome card eliminates that interaction entirely.",
    ],
    subsections: [
      {
        title: "How to set up WiFi QR codes",
        points: [
          "Open OneQR and select the WiFi tab",
          "Enter your network name exactly as it appears on your router",
          "Enter the password",
          "Select WPA/WPA2 encryption (standard for modern networks)",
          "Generate and download — SVG for print, PNG for digital",
          "Print and place near the entrance, on tables, or on welcome materials",
        ],
      },
    ],
    afterContent: [
      "Security tip: create a separate guest network on your router. Share the guest network via QR code so visitors can't access your business devices, printers, or POS systems. Most modern routers support guest networks — check your router admin page or ask your ISP.",
    ],
  },
  {
    id: "best-practices",
    title: "QR code best practices: sizing, placement, and testing",
    content: [
      "A QR code only works if people can find it and scan it successfully. These best practices come from real-world deployment across restaurants, retail, events, and marketing campaigns.",
    ],
    subsections: [
      {
        title: "Sizing",
        points: [
          "Minimum size: 2 cm x 2 cm (0.8 in) for business cards and close-range items",
          "Use the 10:1 rule for distance: code width should be at least 1/10th of the expected scan distance",
          "Poster at 1 meter: minimum 10 cm wide. Billboard at 10 meters: minimum 1 meter wide",
          "More data = more complex pattern = larger minimum size. Short URLs produce cleaner, more scannable codes",
        ],
      },
      {
        title: "Placement",
        points: [
          "Place at natural pause points: checkout counters, waiting areas, table surfaces, receipts",
          "Keep codes at scanning height — chest to eye level for wall-mounted codes",
          "Avoid curved surfaces that distort the pattern (bottles, rounded pillars)",
          "Always include a short call-to-action: 'Scan for menu', 'Scan to connect WiFi', 'Scan for 10% off'",
          "Leave white space (quiet zone) around the code — at least the width of one module (one small square)",
        ],
      },
      {
        title: "Testing",
        points: [
          "Test with at least 3 different phones before deploying (iPhone, Android, older model)",
          "Test in the actual lighting conditions — dim restaurants and bright outdoor signage are different",
          "Test at the expected scanning distance, not just up close",
          "Verify the destination URL loads correctly on mobile (not just desktop)",
          "If the QR code links to a website, make sure it's mobile-responsive — 95%+ of scans come from phones",
        ],
      },
    ],
  },
  {
    id: "tracking",
    title: "How to track QR code scans",
    content: [
      "Measurement turns a QR code from a convenience feature into a marketing tool. Without tracking, you're guessing whether your codes get scanned at all.",
      "There are two layers of tracking: QR-level and destination-level.",
    ],
    subsections: [
      {
        title: "QR-level tracking (dynamic codes)",
        points: [
          "Dynamic QR codes route through a redirect URL that logs each scan",
          "OneQR Pro tracks scan count, timestamps, and basic device info",
          "You can see which codes perform best without touching your website analytics",
          "Useful for comparing placements: does the table tent outperform the receipt?",
        ],
      },
      {
        title: "Destination-level tracking (UTM parameters)",
        points: [
          "Append UTM parameters to your destination URL for analytics integration",
          "Example: yoursite.com/menu?utm_source=table_tent&utm_medium=qr&utm_campaign=spring_2026",
          "Shows up in Google Analytics, Plausible, or any analytics tool as a distinct traffic source",
          "Lets you measure not just scans but conversions — bookings, purchases, signups",
          "Use different UTM values for different placements to compare performance",
        ],
      },
    ],
    afterContent: [
      "Combine both layers for full visibility: dynamic QR codes tell you how many people scanned, UTM parameters tell you what they did after scanning. This data drives better placement decisions and helps you calculate the ROI of physical marketing materials.",
    ],
  },
  {
    id: "use-cases",
    title: "QR code use cases by industry",
    content: [
      "QR codes are flexible, but the highest-impact use cases depend on your business type. Here are the most effective applications by industry, based on actual deployment patterns.",
    ],
  },
];

const useCases = [
  {
    industry: "Restaurants & cafes",
    uses: [
      "Digital menus — replace or supplement paper menus, update prices instantly with dynamic codes",
      "WiFi access — table tents or wall signs with WiFi QR codes",
      "Online ordering — link to your ordering platform from table markers",
      "Google Reviews — post-meal QR code on the receipt linking directly to your review page",
    ],
  },
  {
    industry: "Retail stores",
    uses: [
      "Product info — shelf-edge codes linking to detailed specs, videos, or reviews",
      "Loyalty programs — scan to join, no app download required",
      "In-store promotions — dynamic codes on displays that change with the season",
      "Contactless payments — direct link to your payment page for market stalls and pop-ups",
    ],
  },
  {
    industry: "Service businesses",
    uses: [
      "Booking pages — business cards and flyers that link directly to your calendar",
      "Estimates & quotes — QR codes on physical quotes linking to detailed breakdowns online",
      "Review collection — follow-up cards with QR codes to your Google or Yelp listing",
      "Portfolio — contractors and designers can link to photo galleries from vehicle wraps and yard signs",
    ],
  },
  {
    industry: "Real estate",
    uses: [
      "Property listings — yard sign QR codes linking to full listing pages with photos and virtual tours",
      "Open house registration — scan to sign in, capture contact info digitally",
      "Document access — codes on printed materials linking to disclosures, floor plans, and neighborhood data",
    ],
  },
  {
    industry: "Events & conferences",
    uses: [
      "Ticketing and check-in — attendees show QR codes for fast entry",
      "WiFi access — large-format codes on signage for conference networks",
      "Schedule and maps — link to the live event schedule instead of printing programs",
      "Speaker slides — QR codes on presentation slides linking to resources and follow-up materials",
    ],
  },
  {
    industry: "Healthcare & wellness",
    uses: [
      "Patient intake forms — waiting room QR codes linking to digital forms",
      "Appointment booking — business cards linking to your scheduling page",
      "Educational resources — codes on printed materials linking to health guides and videos",
    ],
  },
];

export default function QRCodeGuide() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "QR Code Guide for Small Business",
    description:
      "Everything small businesses need to know about QR codes in 2026. Static vs dynamic, WiFi codes, tracking scans, sizing, placement, and best practices.",
    author: {
      "@type": "Organization",
      name: "OneQR",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "OneQR",
      url: baseUrl,
    },
    datePublished: "2026-03-21",
    dateModified: "2026-03-21",
    mainEntityOfPage: `${baseUrl}/guide`,
  };

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

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-emerald-600">One</span>QR
          </Link>
          <Link
            href="/?utm_source=guide&utm_medium=header&utm_campaign=seo_guide"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Generate QR Code
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Hero */}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          QR Code Guide for Small Business
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Everything you need to know about using QR codes to connect customers
          to your business. Static vs dynamic codes, WiFi QR codes, scan
          tracking, sizing for print, and real-world best practices — all in one
          place.
        </p>

        {/* Table of contents */}
        <nav className="mt-10 rounded-lg border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            In this guide
          </h2>
          <ol className="mt-3 flex flex-col gap-2 text-sm">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-emerald-600 hover:underline"
                >
                  {i + 1}. {section.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#faq" className="text-emerald-600 hover:underline">
                {sections.length + 1}. Frequently asked questions
              </a>
            </li>
          </ol>
        </nav>

        {/* Inline CTA */}
        <div className="mt-10 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <p className="text-sm font-medium text-emerald-800">
            Want to create a QR code right now?
          </p>
          <Link
            href="/?utm_source=guide&utm_medium=cta_top&utm_campaign=seo_guide"
            className="mt-3 inline-block rounded-md bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
          >
            Open Free QR Code Generator
          </Link>
          <p className="mt-2 text-xs text-emerald-600">
            No signup required. Free static codes, unlimited.
          </p>
        </div>

        {/* Main content sections */}
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="mt-16">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            {section.content.map((para, i) => (
              <p key={i} className="mt-4 text-zinc-700 leading-relaxed">
                {para}
              </p>
            ))}
            {section.subsections?.map((sub) => (
              <div key={sub.title} className="mt-8">
                <h3 className="text-lg font-semibold">{sub.title}</h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {sub.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm text-zinc-700"
                    >
                      <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {section.afterContent?.map((para, i) => (
              <p key={i} className="mt-4 text-zinc-700 leading-relaxed">
                {para}
              </p>
            ))}

            {/* Use cases grid — rendered under the use-cases section */}
            {section.id === "use-cases" && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {useCases.map((uc) => (
                  <div
                    key={uc.industry}
                    className="rounded-lg border border-zinc-200 p-5"
                  >
                    <h3 className="font-semibold">{uc.industry}</h3>
                    <ul className="mt-3 flex flex-col gap-2">
                      {uc.uses.map((use, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm text-zinc-600"
                        >
                          <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Mid-page CTA */}
        <section className="mt-16 rounded-xl bg-zinc-950 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to create your first QR code?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400">
            Static QR codes are free forever. No signup. No watermark. Download
            as SVG for print or PNG for digital.
          </p>
          <Link
            href="/?utm_source=guide&utm_medium=cta_mid&utm_campaign=seo_guide"
            className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-emerald-400"
          >
            Generate a free QR code
          </Link>
          <p className="mt-3 text-xs text-zinc-500">
            Need dynamic codes with tracking?{" "}
            <Link
              href="/pricing?utm_source=guide&utm_medium=cta_mid&utm_campaign=seo_guide"
              className="text-emerald-400 hover:underline"
            >
              See OneQR Pro
            </Link>{" "}
            — from $7/mo for dynamic codes and analytics.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-16">
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

        {/* Related guides */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">More QR code guides</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Link
              href="/guides/wifi-qr-code"
              className="rounded-lg border border-zinc-200 p-5 transition hover:border-emerald-300 hover:bg-emerald-50/50"
            >
              <h3 className="font-semibold">WiFi QR Codes</h3>
              <p className="mt-1 text-sm text-zinc-600">
                Let guests connect to your WiFi with a single scan.
              </p>
            </Link>
            <Link
              href="/guides/qr-codes-for-restaurants"
              className="rounded-lg border border-zinc-200 p-5 transition hover:border-emerald-300 hover:bg-emerald-50/50"
            >
              <h3 className="font-semibold">QR Codes for Restaurants</h3>
              <p className="mt-1 text-sm text-zinc-600">
                Digital menus, contactless ordering, and table-side WiFi.
              </p>
            </Link>
            <Link
              href="/guides/qr-codes-for-events"
              className="rounded-lg border border-zinc-200 p-5 transition hover:border-emerald-300 hover:bg-emerald-50/50"
            >
              <h3 className="font-semibold">QR Codes for Events</h3>
              <p className="mt-1 text-sm text-zinc-600">
                Ticketing, check-in, schedule sharing, and conference WiFi.
              </p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-4xl px-6 py-8 text-center text-sm text-zinc-500">
          <div className="mb-4 flex justify-center gap-6">
            <Link
              href="/privacy"
              className="text-zinc-500 hover:text-zinc-900"
            >
              Privacy
            </Link>
            <Link href="/terms" className="text-zinc-500 hover:text-zinc-900">
              Terms
            </Link>
            <Link href="/guide" className="text-zinc-500 hover:text-zinc-900">
              QR Code Guide
            </Link>
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
