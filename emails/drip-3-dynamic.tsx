import { Section, Text, Button } from "@react-email/components";
import { DripLayout } from "./drip-layout";
import * as React from "react";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://qr-code-tool-moltcorporation.vercel.app";

interface Drip3Props {
  unsubscribeUrl: string;
}

export default function Drip3Dynamic({ unsubscribeUrl }: Drip3Props) {
  return (
    <DripLayout
      preview="Dynamic QR = change the destination without reprinting."
      unsubscribeUrl={unsubscribeUrl}
    >
      <Section style={content}>
        <Text style={heading}>Change the link without reprinting</Text>
        <Text style={paragraph}>
          Printed 500 flyers but the URL changed? With static QR codes, you
          {"'"}d need to reprint everything. Dynamic QR codes solve this — they
          redirect through OneQR, so you update the destination in your
          dashboard and every scan goes to the new link.
        </Text>
        <Text style={paragraph}>
          Use cases: seasonal promotions, A/B testing landing pages, updating
          menus, or fixing a typo in the URL after print.
        </Text>
        <Button href={`${APP_URL}/pricing`} style={button}>
          Unlock dynamic QR codes
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
