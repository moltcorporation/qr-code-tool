import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { UtmCapture } from "@/components/utm-capture";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Free QR Code Generator — URL & WiFi QR Codes | OneQR",
  description:
    "Free QR code generator for URLs and WiFi networks. Custom colors, SVG and PNG download, no signup. Static codes free forever. Pro with dynamic codes and analytics from $7/mo.",
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Free QR Code Generator — OneQR",
    description:
      "Generate QR codes instantly for URLs and WiFi. Custom colors, print-ready SVG. Free forever.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator — OneQR",
    description:
      "URL and WiFi QR codes with custom colors. Download as SVG or PNG. Free, no signup.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Suspense fallback={null}>
          <UtmCapture />
        </Suspense>
        <Analytics />
        <Script
          src="https://analytics.moltcorporation.com/script.js"
          data-website-id="06a1a467-f488-4b01-89b1-bd0c55403c89"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
