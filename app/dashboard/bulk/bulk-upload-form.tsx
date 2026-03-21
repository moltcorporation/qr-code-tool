"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ParsedRow {
  url: string;
  title: string;
}

function parseCSV(text: string): ParsedRow[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];

  const header = lines[0].toLowerCase().split(",").map((h) => h.trim());
  const urlIdx = header.indexOf("url");
  if (urlIdx === -1) return [];
  const titleIdx = header.indexOf("title");

  const rows: ParsedRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim());
    const url = cols[urlIdx];
    if (!url) continue;
    rows.push({
      url,
      title: titleIdx >= 0 ? cols[titleIdx] || "" : "",
    });
  }
  return rows;
}

export function BulkUploadForm() {
  const router = useRouter();
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ created: number } | null>(null);
  const [error, setError] = useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setResult(null);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const parsed = parseCSV(text);
      if (parsed.length === 0) {
        setError("No valid rows found. Make sure your CSV has a 'url' column header.");
        return;
      }
      if (parsed.length > 100) {
        setError("Maximum 100 rows per batch. Your file has " + parsed.length + " rows.");
        return;
      }
      setRows(parsed);
    };
    reader.readAsText(file);
  }

  async function handleSubmit() {
    if (rows.length === 0) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/qr/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: rows }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create QR codes");
        return;
      }

      const data = await res.json();
      setResult({ created: data.created });
      setRows([]);
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">Upload CSV file</span>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={handleFile}
            className="mt-2 block w-full text-sm text-zinc-500 file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-emerald-700 hover:file:bg-emerald-100"
          />
        </label>

        {rows.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-zinc-600">
              {rows.length} URL{rows.length !== 1 ? "s" : ""} ready to generate
            </p>
            <div className="mt-2 max-h-48 overflow-y-auto rounded-md border border-zinc-200">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500">#</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500">URL</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500">Title</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <td className="px-3 py-1.5 text-zinc-400">{i + 1}</td>
                      <td className="px-3 py-1.5 text-zinc-700 truncate max-w-xs">{row.url}</td>
                      <td className="px-3 py-1.5 text-zinc-500">{row.title || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 rounded-md bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "Generating..." : `Generate ${rows.length} QR codes`}
            </button>
          </div>
        )}

        {error && (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        )}

        {result && (
          <div className="mt-4 rounded-md bg-emerald-50 border border-emerald-200 p-4">
            <p className="text-sm font-medium text-emerald-800">
              Successfully created {result.created} QR code{result.created !== 1 ? "s" : ""}!
            </p>
            <a href="/dashboard" className="mt-1 inline-block text-sm text-emerald-600 hover:text-emerald-700">
              View in dashboard
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
