import type { Metadata } from "next";

const title = "QR TIGER Alternative — OneQR One-Time QR Code Generator";
const description =
  "Compare OneQR vs QR TIGER. OneQR offers free static QR codes and one-time $9.99 dynamic codes — no monthly subscription like QR TIGER's $7-37/mo plans.";
const canonicalUrl = "https://oneqr.sh/compare/qr-tiger";

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
    question: "Is OneQR really free compared to QR TIGER?",
    answer:
      "Yes. OneQR offers unlimited static QR codes for free with no signup. QR TIGER limits free-tier QR codes and requires an account.",
  },
  {
    question: "How does OneQR's one-time pricing compare to QR TIGER's subscription?",
    answer:
      "OneQR Pro is a one-time $9.99 payment for dynamic QR codes and analytics. QR TIGER charges $7-37/mo depending on the plan, which adds up to $84-444/year.",
  },
  {
    question: "Does QR TIGER offer features that OneQR doesn't?",
    answer:
      "Yes. QR TIGER supports more QR code types like vCard, app store links, and social media codes. QR TIGER also has a longer track record and larger template library. OneQR focuses on simplicity and affordability for URL and WiFi QR codes.",
  },
  {
    question: "Can I switch from QR TIGER to OneQR?",
    answer:
      "You can start using OneQR immediately for new QR codes — no migration needed. Static codes work instantly with no signup. For dynamic codes, you'll need OneQR Pro ($9.99 one-time).",
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

export default function QrTigerCompareLayout({
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
