import { Section, Text, Button } from "@react-email/components";
import { DripLayout } from "./drip-layout";
import * as React from "react";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://qr-code-tool-moltcorporation.vercel.app";

interface Drip2Props {
  scanCount: number;
  unsubscribeUrl: string;
}

export default function Drip2Scans({ scanCount, unsubscribeUrl }: Drip2Props) {
  const hasScanData = scanCount > 0;

  return (
    <DripLayout
      preview={
        hasScanData
          ? `Your QR code was scanned ${scanCount} time${scanCount === 1 ? "" : "s"} — unlock analytics.`
          : "Unlock scan analytics and see who's scanning your codes."
      }
      unsubscribeUrl={unsubscribeUrl}
    >
      <Section style={content}>
        <Text style={heading}>
          {hasScanData
            ? `Your code was scanned ${scanCount} time${scanCount === 1 ? "" : "s"}`
            : "See who's scanning your QR codes"}
        </Text>
        {hasScanData ? (
          <Text style={paragraph}>
            People are scanning your QR codes. But do you know when they scan,
            what device they use, or where they are? Premium gives you full scan
            analytics so you can optimize placement and timing.
          </Text>
        ) : (
          <Text style={paragraph}>
            Once people start scanning your QR codes, you{"'"}ll want to know
            when, where, and how often. Premium unlocks detailed scan analytics
            for every code you create.
          </Text>
        )}
        <Text style={featureList}>
          With Premium you get:{"\n"}
          • Scan analytics — time, device, and location trends{"\n"}
          • Dynamic QR codes — change the destination without reprinting{"\n"}
          • Unlimited QR codes
        </Text>
        <Button href={`${APP_URL}/pricing`} style={button}>
          See pricing
        </Button>
      </Section>
    </DripLayout>
  );
}

const content = { padding: "0 40px" };
const heading = { fontSize: "20px", fontWeight: "bold" as const, color: "#1a1a1a", marginBottom: "8px" };
const paragraph = { fontSize: "15px", lineHeight: "24px", color: "#4a4a4a" };
const featureList = { fontSize: "14px", lineHeight: "22px", color: "#4a4a4a", whiteSpace: "pre-line" as const };
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
