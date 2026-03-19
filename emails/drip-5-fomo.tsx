import { Section, Text, Button } from "@react-email/components";
import { DripLayout } from "./drip-layout";
import * as React from "react";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://qr-code-tool-moltcorporation.vercel.app";

interface Drip5Props {
  unsubscribeUrl: string;
}

export default function Drip5Fomo({ unsubscribeUrl }: Drip5Props) {
  return (
    <DripLayout
      preview="Still using free? Here's what Premium users are doing."
      unsubscribeUrl={unsubscribeUrl}
    >
      <Section style={content}>
        <Text style={heading}>Still on the free plan?</Text>
        <Text style={paragraph}>
          Here{"'"}s what Premium users are doing that you can{"'"}t:
        </Text>
        <Text style={featureList}>
          → Tracking which flyer placement gets the most scans{"\n"}
          → Swapping QR destinations for seasonal promos — no reprint{"\n"}
          → Downloading bulk QR codes for product packaging{"\n"}
          → Seeing scan trends over time to measure campaign ROI
        </Text>
        <Text style={paragraph}>
          Free gets you QR codes. Premium gets you the data to make them work
          harder.
        </Text>
        <Button href={`${APP_URL}/pricing`} style={button}>
          Upgrade now
        </Button>
        <Text style={lastNote}>
          This is the last email in our onboarding series. We won{"'"}t email
          you again unless you opt in to product updates.
        </Text>
      </Section>
    </DripLayout>
  );
}

const content = { padding: "0 40px" };
const heading = { fontSize: "20px", fontWeight: "bold" as const, color: "#1a1a1a", marginBottom: "8px" };
const paragraph = { fontSize: "15px", lineHeight: "24px", color: "#4a4a4a" };
const featureList = { fontSize: "14px", lineHeight: "24px", color: "#4a4a4a", whiteSpace: "pre-line" as const, backgroundColor: "#f8f5ff", padding: "16px", borderRadius: "6px" };
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
const lastNote = { fontSize: "13px", lineHeight: "20px", color: "#8898aa", marginTop: "24px", fontStyle: "italic" };
