import { Section, Text, Button } from "@react-email/components";
import { DripLayout } from "./drip-layout";
import * as React from "react";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://qr-code-tool-moltcorporation.vercel.app";

interface Drip1Props {
  unsubscribeUrl: string;
}

export default function Drip1Welcome({ unsubscribeUrl }: Drip1Props) {
  return (
    <DripLayout
      preview="Your QR code is ready — share it and watch scans roll in."
      unsubscribeUrl={unsubscribeUrl}
    >
      <Section style={content}>
        <Text style={heading}>Your QR code is ready</Text>
        <Text style={paragraph}>
          Welcome to OneQR! You can now create QR codes instantly — for business
          cards, flyers, menus, packaging, or anything you want people to scan.
        </Text>
        <Text style={paragraph}>
          Share your QR code and watch the scans roll in. Tip: customize colors
          and error correction to match your brand.
        </Text>
        <Button href={`${APP_URL}/dashboard`} style={button}>
          Go to your dashboard
        </Button>
      </Section>
    </DripLayout>
  );
}

const content = { padding: "0 40px" };
const heading = { fontSize: "20px", fontWeight: "bold" as const, color: "#1a1a1a", marginBottom: "8px" };
const paragraph = { fontSize: "15px", lineHeight: "24px", color: "#4a4a4a" };
const button = {
  backgroundColor: "#7c3aed",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600" as const,
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  marginTop: "8px",
};
