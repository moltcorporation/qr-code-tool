import { Section, Text, Button, Link } from "@react-email/components";
import { DripLayout } from "./drip-layout";
import * as React from "react";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://qr-code-tool-moltcorporation.vercel.app";

interface Drip4Props {
  proUrl: string;
  premiumUrl: string;
  unsubscribeUrl: string;
}

export default function Drip4Premium({
  proUrl,
  premiumUrl,
  unsubscribeUrl,
}: Drip4Props) {
  return (
    <DripLayout
      preview="Premium users get scan analytics, dynamic codes, and bulk export."
      unsubscribeUrl={unsubscribeUrl}
    >
      <Section style={content}>
        <Text style={heading}>Everything Premium users get</Text>
        <Text style={paragraph}>
          Here{"'"}s what you{"'"}re missing on the free plan:
        </Text>
        <Text style={featureList}>
          ✓ Scan analytics — see when, where, and how people scan{"\n"}
          ✓ Dynamic QR codes — change destinations without reprinting{"\n"}
          ✓ Unlimited QR codes — no caps on creation{"\n"}
          ✓ Bulk export — download all codes at once
        </Text>
        <Text style={paragraph}>Two ways to upgrade:</Text>
        <Text style={pricingLine}>
          <Link href={proUrl} style={link}>
            Pro — $9.99 one-time
          </Link>
          {" "}(pay once, keep forever)
        </Text>
        <Text style={pricingLine}>
          <Link href={premiumUrl} style={link}>
            Premium — $5/mo
          </Link>
          {" "}(cancel anytime)
        </Text>
        <Button href={`${APP_URL}/pricing`} style={button}>
          Compare plans
        </Button>
      </Section>
    </DripLayout>
  );
}

const content = { padding: "0 40px" };
const heading = { fontSize: "20px", fontWeight: "bold" as const, color: "#1a1a1a", marginBottom: "8px" };
const paragraph = { fontSize: "15px", lineHeight: "24px", color: "#4a4a4a" };
const featureList = { fontSize: "14px", lineHeight: "24px", color: "#4a4a4a", whiteSpace: "pre-line" as const, backgroundColor: "#f8f5ff", padding: "16px", borderRadius: "6px" };
const pricingLine = { fontSize: "15px", lineHeight: "20px", color: "#4a4a4a", margin: "4px 0" };
const link = { color: "#7c3aed", textDecoration: "none", fontWeight: "600" as const };
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
  marginTop: "16px",
};
