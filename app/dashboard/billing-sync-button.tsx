"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BillingSyncButton() {
  const router = useRouter();
  const [syncing, setSyncing] = useState(false);

  async function handleSync() {
    setSyncing(true);
    try {
      await fetch("/api/payments/sync", { method: "POST" });
      router.refresh();
    } finally {
      setSyncing(false);
    }
  }

  return (
    <button
      onClick={handleSync}
      disabled={syncing}
      className="text-sm font-medium text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
    >
      {syncing ? "Syncing..." : "Refresh billing status"}
    </button>
  );
}
