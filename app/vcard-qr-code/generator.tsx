"use client";

import { useState, useCallback } from "react";
import QRCode from "qrcode";
import Link from "next/link";

function buildVCard(fields: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  website: string;
  title: string;
}): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${fields.lastName};${fields.firstName};;;`,
    `FN:${fields.firstName}${fields.lastName ? ` ${fields.lastName}` : ""}`,
  ];
  if (fields.company) lines.push(`ORG:${fields.company}`);
  if (fields.title) lines.push(`TITLE:${fields.title}`);
  if (fields.phone) lines.push(`TEL;TYPE=CELL:${fields.phone}`);
  if (fields.email) lines.push(`EMAIL:${fields.email}`);
  if (fields.website) lines.push(`URL:${fields.website}`);
  lines.push("END:VCARD");
  return lines.join("\n");
}

export function VCardQrGenerator() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [fgColor, setFgColor] = useState("#0f172a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [svgHtml, setSvgHtml] = useState("");
  const [generated, setGenerated] = useState(false);
  const [vcardString, setVcardString] = useState("");

  const canGenerate = firstName.trim() || lastName.trim();

  const generate = useCallback(async () => {
    if (!canGenerate) return;

    const vcard = buildVCard({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      company: company.trim(),
      website: website.trim(),
      title: jobTitle.trim(),
    });

    try {
      const svg = await QRCode.toString(vcard, {
        type: "svg",
        color: { dark: fgColor, light: bgColor },
        margin: 2,
        width: 256,
      });
      setSvgHtml(svg);
      setVcardString(vcard);
      setGenerated(true);
    } catch {
      // ignore invalid input
    }
  }, [firstName, lastName, phone, email, company, website, jobTitle, fgColor, bgColor, canGenerate]);

  const downloadSvg = useCallback(() => {
    if (!svgHtml) return;
    const blob = new Blob([svgHtml], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "vcard-qr-code.svg";
    a.click();
    URL.revokeObjectURL(a.href);
  }, [svgHtml]);

  const downloadPng = useCallback(async () => {
    if (!vcardString) return;

    try {
      const dataUrl = await QRCode.toDataURL(vcardString, {
        color: { dark: fgColor, light: bgColor },
        margin: 2,
        width: 512,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "vcard-qr-code.png";
      a.click();
    } catch {
      // ignore
    }
  }, [vcardString, fgColor, bgColor]);

  const inputClass =
    "mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none";

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-lg font-bold text-white">
        vCard QR Code Generator
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        Enter your contact details. Scanning the QR code opens the &ldquo;Add Contact&rdquo; screen with your info pre-filled.
      </p>

      <div className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="vc-first" className="block text-sm font-medium text-zinc-300">
              First name *
            </label>
            <input
              id="vc-first"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Jane"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="vc-last" className="block text-sm font-medium text-zinc-300">
              Last name
            </label>
            <input
              id="vc-last"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Smith"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="vc-company" className="block text-sm font-medium text-zinc-300">
              Company
            </label>
            <input
              id="vc-company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Inc."
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="vc-title" className="block text-sm font-medium text-zinc-300">
              Job title
            </label>
            <input
              id="vc-title"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Marketing Director"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="vc-phone" className="block text-sm font-medium text-zinc-300">
            Phone
          </label>
          <input
            id="vc-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555 123 4567"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="vc-email" className="block text-sm font-medium text-zinc-300">
            Email
          </label>
          <input
            id="vc-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@acme.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="vc-website" className="block text-sm font-medium text-zinc-300">
            Website
          </label>
          <input
            id="vc-website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://acme.com"
            className={inputClass}
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
          onClick={generate}
          disabled={!canGenerate}
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
            Free static vCard QR code. Want dynamic codes with scan analytics?{" "}
            <Link href="/register" className="text-emerald-400 hover:underline">
              Get Pro — $9.99 once
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
