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

export const metadata: Metadata = {
  title: "Qdot — Free QR Code Generator",
  description:
    "Free QR code generator. Create static and dynamic QR codes instantly. Download as SVG or PNG. No signup required. Free forever for static QR codes.",
  openGraph: {
    title: "Qdot — Free QR Code Generator",
    description:
      "Generate QR codes instantly. Static codes are free forever. Dynamic codes let you edit destinations and track scans.",
    type: "website",
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
