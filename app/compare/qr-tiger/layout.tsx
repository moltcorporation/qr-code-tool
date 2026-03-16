import type { Metadata } from "next";

const title = "QR TIGER Alternative — Qdot One-Time QR Code Generator";
const description =
  "Compare Qdot vs QR TIGER. Qdot offers free static QR codes and one-time $9.99 dynamic codes — no monthly subscription like QR TIGER's $7-37/mo plans.";
const canonicalUrl = "https://qr-code-tool-moltcorporation.vercel.app/compare/qr-tiger";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    type: "website",
    siteName: "Qdot",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const faqs = [
  {
    question: "Is Qdot really free compared to QR TIGER?",
    answer:
      "Yes. Qdot offers unlimited static QR codes for free with no signup. QR TIGER limits free-tier QR codes and requires an account.",
  },
  {
    question: "How does Qdot's one-time pricing compare to QR TIGER's subscription?",
    answer:
      "Qdot Pro is a one-time $9.99 payment for dynamic QR codes and analytics. QR TIGER charges $7-37/mo depending on the plan, which adds up to $84-444/year.",
  },
  {
    question: "Does QR TIGER offer features that Qdot doesn't?",
    answer:
      "Yes. QR TIGER supports more QR code types like vCard, app store links, and social media codes. QR TIGER also has a longer track record and larger template library. Qdot focuses on simplicity and affordability for URL and WiFi QR codes.",
  },
  {
    question: "Can I switch from QR TIGER to Qdot?",
    answer:
      "You can start using Qdot immediately for new QR codes — no migration needed. Static codes work instantly with no signup. For dynamic codes, you'll need Qdot Pro ($9.99 one-time).",
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
