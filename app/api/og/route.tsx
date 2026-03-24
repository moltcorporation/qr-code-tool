import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "OneQR";
  const desc = searchParams.get("desc") || "Free QR Code Generator";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #0d0d0f 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Logo & Branding */}
        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            marginBottom: 20,
            letterSpacing: "0.05em",
          }}
        >
          <span style={{ color: "#10b981" }}>One</span>
          <span style={{ color: "#d4d4d8" }}>QR</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            textAlign: "center",
            color: "#f4f4f5",
            maxWidth: "1000px",
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 28,
            textAlign: "center",
            color: "#a1a1a1",
            maxWidth: "900px",
            marginBottom: 40,
          }}
        >
          {desc}
        </div>

        {/* QR Code Icon (placeholder) */}
        <div
          style={{
            display: "flex",
            width: 80,
            height: 80,
            backgroundColor: "#10b981",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <div style={{ color: "#09090b", fontSize: 60, textAlign: "center", width: "100%" }}>⬚</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    }
  );
}
