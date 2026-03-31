import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OneQR — Free QR Code Generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#09090b",
          padding: "48px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              backgroundColor: "#18181b",
              border: "2px solid #22c55e",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "32px",
                height: "32px",
                backgroundColor: "#22c55e",
                borderRadius: "4px",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            OneQR
          </span>
        </div>

        <span
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          Free QR Code Generator — URL &amp; WiFi
        </span>

        <div
          style={{
            display: "flex",
            gap: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#22c55e" }}>
              Free
            </span>
            <span style={{ fontSize: 16, color: "#71717a" }}>
              Static QR Codes
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#3b82f6" }}>
              $7/mo
            </span>
            <span style={{ fontSize: 16, color: "#71717a" }}>
              Pro Plan
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#eab308" }}>
              Scan
            </span>
            <span style={{ fontSize: 16, color: "#71717a" }}>
              Analytics
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: 18,
            color: "#52525b",
            marginTop: "48px",
          }}
        >
          No signup required · Works on any device
        </span>
      </div>
    ),
    { ...size }
  );
}
