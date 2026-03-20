import type { Metadata } from "next";

const title = "Uniqode Alternative — OneQR One-Time QR Code Generator";
const description =
  "Compare OneQR vs Uniqode (formerly Beaconstac). OneQR offers free static QR codes and one-time $9.99 dynamic codes — no monthly subscription like Uniqode's $5-75/mo plans.";
const canonicalUrl = "https://qr-code-tool-moltcorporation.vercel.app/compare/uniqode";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const faqs = [
  {
    question: "How does OneQR compare to Uniqode's pricing?",
    answer:
      "Uniqode (formerly Beaconstac) charges $5-75/mo for QR code features. OneQR offers free static QR codes and a one-time $9.99 payment for dynamic codes. Over a year, even Uniqode's cheapest plan costs $60 compared to OneQR's $9.99 one-time fee.",
  },
  {
    question: "Does Uniqode have features OneQR doesn't?",
    answer:
      "Yes. Uniqode offers enterprise features like team management, SSO, and integrations with Zapier, HubSpot, and Google Analytics. Uniqode also has a longer track record. OneQR is focused on simplicity and affordability.",
  },
  {
    question: "Can I use OneQR without creating an account?",
    answer:
      "Yes. OneQR lets you generate unlimited static QR codes instantly without any signup. Uniqode requires account creation for all features.",
  },
  {
    question: "Is OneQR good enough for business use?",
    answer:
      "For straightforward QR code needs (URLs, WiFi, custom colors, scan tracking), OneQR works well for businesses. If you need deep CRM integrations or enterprise SSO, Uniqode may be a better fit.",
  },
];

const jsonLd = [
  {
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
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonicalUrl,
  },
];

export default function UniqodeCompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
