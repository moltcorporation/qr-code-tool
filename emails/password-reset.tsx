import { Section, Text, Button } from "@react-email/components";
import { DripLayout } from "./drip-layout";
import * as React from "react";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://qr-code-tool-moltcorporation.vercel.app";

interface PasswordResetProps {
  resetUrl: string;
}

export default function PasswordReset({ resetUrl }: PasswordResetProps) {
  return (
    <DripLayout
      preview="Reset your OneQR password"
      unsubscribeUrl={`${APP_URL}/dashboard`}
    >
      <Section style={content}>
        <Text style={heading}>Reset your password</Text>
        <Text style={paragraph}>
          We received a request to reset the password for your OneQR account.
          Click the button below to choose a new password.
        </Text>
        <Button href={resetUrl} style={button}>
          Reset password
        </Button>
        <Text style={small}>
          This link expires in 1 hour. If you didn&apos;t request a password
          reset, you can safely ignore this email.
        </Text>
      </Section>
    </DripLayout>
  );
}

const content = { padding: "0 40px" };
const heading = {
  fontSize: "20px",
  fontWeight: "bold" as const,
  color: "#1a1a1a",
  marginBottom: "8px",
};
const paragraph = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#4a4a4a",
};
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
const small = {
  fontSize: "13px",
  lineHeight: "20px",
  color: "#8898aa",
  marginTop: "16px",
};
