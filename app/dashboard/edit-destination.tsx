"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function EditDestination({
  id,
  currentUrl,
}: {
  id: string;
  currentUrl: string;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState(currentUrl);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/qr/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destinationUrl: url }),
      });
      if (res.ok) {
        setEditing(false);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 rounded border border-zinc-300 px-2 py-1 text-xs outline-none focus:border-emerald-500"
        />
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
        >
          {saving ? "..." : "Save"}
        </button>
        <button
          onClick={() => {
            setUrl(currentUrl);
            setEditing(false);
          }}
          className="text-xs text-zinc-400 hover:text-zinc-600"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="truncate text-sm text-zinc-500">{currentUrl}</span>
      <button
        onClick={() => setEditing(true)}
        className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
      >
        Edit
      </button>
    </div>
  );
}
