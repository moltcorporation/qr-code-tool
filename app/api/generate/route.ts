import QRCode from "qrcode";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      data,
      format = "svg",
      fgColor = "#000000",
      bgColor = "#ffffff",
      errorCorrection = "M",
    } = body;

    if (!data || typeof data !== "string" || data.trim().length === 0) {
      return NextResponse.json(
        { error: "Data is required" },
        { status: 400 }
      );
    }

    const ecLevel = ["L", "M", "Q", "H"].includes(errorCorrection)
      ? (errorCorrection as "L" | "M" | "Q" | "H")
      : "M";

    if (format === "svg") {
      const svg = await QRCode.toString(data.trim(), {
        type: "svg",
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: ecLevel,
        margin: 2,
      });
      return new Response(svg, {
        headers: { "Content-Type": "image/svg+xml" },
      });
    }

    // PNG as base64 data URL
    const dataUrl = await QRCode.toDataURL(data.trim(), {
      color: { dark: fgColor, light: bgColor },
      errorCorrectionLevel: ecLevel,
      margin: 2,
      width: 1024,
    });

    return NextResponse.json({ dataUrl });
  } catch (error) {
    console.error("QR generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}
