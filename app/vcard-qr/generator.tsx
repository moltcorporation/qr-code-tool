"use client";

import { useState, useCallback } from "react";
import QRCode from "qrcode";
import Link from "next/link";

export function VcardQrGenerator() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
  });
  const [fgColor, setFgColor] = useState("#0f172a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [svgHtml, setSvgHtml] = useState("");
  const [generated, setGenerated] = useState(false);

  const generateVcard = useCallback(() => {
    const { firstName, lastName, email, phone, company } = formData;
    if (!firstName && !email && !phone) return;

    const fullName = `${firstName}${lastName ? " " + lastName : ""}`.trim();
    let vcard = "BEGIN:VCARD\r\nVERSION:3.0\r\n";

    if (fullName) vcard += `FN:${fullName}\r\n`;
    if (firstName || lastName) {
      vcard += `N:${lastName || ""};${firstName || ""};;;\r\n`;
    }
    if (email) vcard += `EMAIL:${email}\r\n`;
    if (phone) vcard += `TEL:${phone}\r\n`;
    if (company) vcard += `ORG:${company}\r\n`;

    vcard += "END:VCARD";

    generateQr(vcard);
  }, [formData]);

  const generateQr = useCallback(
    async (data: string) => {
      try {
        const svg = await QRCode.toString(data, {
          type: "svg",
          color: { dark: fgColor, light: bgColor },
          margin: 2,
          width: 256,
        });
        setSvgHtml(svg);
        setGenerated(true);
      } catch {
        // ignore invalid input
      }
    },
    [fgColor, bgColor]
  );

  const downloadSvg = useCallback(() => {
    if (!svgHtml) return;
    const blob = new Blob([svgHtml], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "vcard-qr.svg";
    a.click();
    URL.revokeObjectURL(a.href);
  }, [svgHtml]);

  const downloadPng = useCallback(async () => {
    const { firstName, lastName, email, phone, company } = formData;
    if (!firstName && !email && !phone) return;

    const fullName = `${firstName}${lastName ? " " + lastName : ""}`.trim();
    let vcard = "BEGIN:VCARD\r\nVERSION:3.0\r\n";

    if (fullName) vcard += `FN:${fullName}\r\n`;
    if (firstName || lastName) {
      vcard += `N:${lastName || ""};${firstName || ""};;;\r\n`;
    }
    if (email) vcard += `EMAIL:${email}\r\n`;
    if (phone) vcard += `TEL:${phone}\r\n`;
    if (company) vcard += `ORG:${company}\r\n`;

    vcard += "END:VCARD";

    try {
      const dataUrl = await QRCode.toDataURL(vcard, {
        color: { dark: fgColor, light: bgColor },
        margin: 2,
        width: 512,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "vcard-qr.png";
      a.click();
    } catch {
      // ignore
    }
  }, [formData, fgColor, bgColor]);

  const isComplete = formData.firstName || formData.email || formData.phone;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-lg font-bold text-white">vCard QR Code Generator</h2>
      <p className="mt-1 text-sm text-zinc-500">
        Enter your contact info. Scanning this QR code opens the phone's "Add Contact" screen with your info pre-filled.
      </p>

      <div className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="vc-first" className="block text-sm font-medium text-zinc-300">
              First Name
            </label>
            <input
              id="vc-first"
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="John"
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="vc-last" className="block text-sm font-medium text-zinc-300">
              Last Name
            </label>
            <input
              id="vc-last"
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Doe"
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="vc-email" className="block text-sm font-medium text-zinc-300">
            Email
          </label>
          <input
            id="vc-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="vc-phone" className="block text-sm font-medium text-zinc-300">
            Phone
          </label>
          <input
            id="vc-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="vc-company" className="block text-sm font-medium text-zinc-300">
            Company / Organization
          </label>
          <input
            id="vc-company"
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Acme Inc"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="vc-fg" className="block text-sm font-medium text-zinc-300">
              Foreground
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                id="vc-fg"
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-zinc-700 bg-zinc-950"
              />
              <span className="text-xs text-zinc-500">{fgColor}</span>
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="vc-bg" className="block text-sm font-medium text-zinc-300">
              Background
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                id="vc-bg"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-zinc-700 bg-zinc-950"
              />
              <span className="text-xs text-zinc-500">{bgColor}</span>
            </div>
          </div>
        </div>

        <button
          onClick={generateVcard}
          disabled={!isComplete}
          className="w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-bold text-zinc-950 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Generate vCard QR Code
        </button>
      </div>

      {generated && svgHtml && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div
            className="rounded-lg border border-zinc-700 bg-white p-4"
            dangerouslySetInnerHTML={{ __html: svgHtml }}
          />
          <div className="flex gap-3">
            <button
              onClick={downloadSvg}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-emerald-500 hover:text-white"
            >
              Download SVG
            </button>
            <button
              onClick={downloadPng}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-emerald-500 hover:text-white"
            >
              Download PNG
            </button>
          </div>
          <p className="text-xs text-zinc-600">
            Free static QR code. Want to change your info after printing?{" "}
            <Link href="/register" className="text-emerald-400 hover:underline">
              Get Pro — $9.99 once
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
