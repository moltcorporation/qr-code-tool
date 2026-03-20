import type { Metadata } from "next";

const title = "Bitly QR Alternative — OneQR One-Time QR Code Generator";
const description =
  "Compare OneQR vs Bitly QR codes. Bitly bundles QR with link shortening at $35+/mo. OneQR is a dedicated QR generator with free static codes and $9.99 one-time dynamic codes.";
const canonicalUrl = "https://qr-code-tool-moltcorporation.vercel.app/compare/bitly-qr";

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
    question: "Why is Bitly so expensive for QR codes?",
    answer:
      "Bitly is primarily a link shortening platform. QR codes are bundled into their paid plans starting at $35/mo. You're paying for the full link management suite, not just QR codes. If you only need QR codes, OneQR is significantly cheaper.",
  },
  {
    question: "Does Bitly offer anything OneQR doesn't?",
    answer:
      "Yes. Bitly includes a powerful link shortener, custom branded domains, and deep link analytics across both shortened URLs and QR codes. If you need both link shortening and QR codes in one platform, Bitly may be worth the cost.",
  },
  {
    question: "Can I use OneQR alongside Bitly?",
    answer:
      "Absolutely. Many users use Bitly for link shortening and OneQR for QR codes. You can generate a Bitly short link and paste it into OneQR to create a QR code — getting the best of both tools.",
  },
  {
    question: "How much would I save switching from Bitly to OneQR for QR codes?",
    answer:
      "Bitly's cheapest plan with QR codes is $35/mo ($420/year). OneQR Pro is $9.99 one-time. That's a savings of over $410 in the first year alone, and $420/year every year after.",
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

export default function BitlyQrCompareLayout({
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
