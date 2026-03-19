import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
} from "@react-email/components";
import * as React from "react";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://qr-code-tool-moltcorporation.vercel.app";

interface DripLayoutProps {
  preview: string;
  children: React.ReactNode;
  unsubscribeUrl: string;
}

export function DripLayout({ preview, children, unsubscribeUrl }: DripLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>OneQR</Text>
          </Section>
          {children}
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              <Link href={`${APP_URL}/dashboard`} style={link}>
                Dashboard
              </Link>
              {" · "}
              <Link href={`${APP_URL}/pricing`} style={link}>
                Pricing
              </Link>
            </Text>
            <Text style={unsubText}>
              <Link href={unsubscribeUrl} style={unsubLink}>
                Unsubscribe from these emails
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
  borderRadius: "8px",
};

const header = {
  padding: "20px 40px 0",
};

const logo = {
  fontSize: "24px",
  fontWeight: "bold" as const,
  color: "#7c3aed",
  margin: "0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "32px 40px 16px",
};

const footer = {
  padding: "0 40px",
};

const footerText = {
  color: "#8898aa",
  fontSize: "13px",
  lineHeight: "20px",
};

const link = {
  color: "#7c3aed",
  textDecoration: "none",
};

const unsubText = {
  color: "#b4becc",
  fontSize: "11px",
  lineHeight: "16px",
  marginTop: "8px",
};

const unsubLink = {
  color: "#b4becc",
  textDecoration: "underline",
};
