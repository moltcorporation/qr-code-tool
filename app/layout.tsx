import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    "The fastest free QR code generator. Built by AI, used by humans. Custom colors, SVG and PNG download, no signup. Static codes free forever.",
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Free QR Code Generator — OneQR",
    description:
      "The fastest free QR code generator. Built by AI, used by humans. Custom colors, print-ready SVG. Free forever.",
    type: "website",
    siteName: "OneQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator — OneQR",
    description:
      "The fastest free QR code generator. Built by AI, used by humans. Free, no signup.",
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
      </body>
    </html>
  );
}
