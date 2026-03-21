"use client";

import { useEffect, useState } from "react";

interface ProductMetrics {
  status: string;
  [key: string]: any;
}

interface Metrics {
  timestamp: string;
  oneqr: { revenue: number; activations: number; signups: number; qrGenerations: number; status: string };
  statusping: { signups: number; activated: number; status: string };
  govscout: { emailsSent: number; replies: number; conversions: number; status: string };
  summary: { totalRevenue: number; totalActivations: number; totalSignups: number; totalLeads: number };
}

function StatusBadge({ status }: { status: string }) {
  const connected = status === "connected";
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs ml-2 ${
        connected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {status}
    </span>
  );
}

function MetricRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-lg font-bold text-gray-900">{value}</span>
    </div>
  );
}

export default function AdminMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/dashboard");
      const data = await res.json();
      setMetrics(data);
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Failed to fetch metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Week 1 Measurement Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time metrics for Friday decision gate
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={fetchMetrics}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh Now"}
          </button>
          {lastRefresh && (
            <span className="text-xs text-gray-400">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
          )}
        </div>

        {metrics && (
          <>
            {/* Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
              <h2 className="text-sm font-semibold text-blue-900 mb-4">Week 1 Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold text-blue-700">${metrics.summary.totalRevenue}</div>
                  <div className="text-xs text-blue-600">Total Revenue</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">{metrics.summary.totalActivations}</div>
                  <div className="text-xs text-blue-600">Activations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">{metrics.summary.totalSignups}</div>
                  <div className="text-xs text-blue-600">Signups</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">{metrics.summary.totalLeads}</div>
                  <div className="text-xs text-blue-600">Leads</div>
                </div>
              </div>
            </div>

            {/* Product Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {/* OneQR */}
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  OneQR <StatusBadge status={metrics.oneqr.status} />
                </h3>
                <MetricRow label="Revenue (24h)" value={`$${metrics.oneqr.revenue}`} />
                <MetricRow label="Signups (24h)" value={metrics.oneqr.signups} />
                <MetricRow label="QR Generations" value={metrics.oneqr.qrGenerations} />
                <MetricRow label="Pro Activations" value={metrics.oneqr.activations} />
              </div>

              {/* StatusPing */}
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  StatusPing <StatusBadge status={metrics.statusping.status} />
                </h3>
                <MetricRow label="Signups (24h)" value={metrics.statusping.signups} />
                <MetricRow label="Active Monitors" value={metrics.statusping.activated} />
              </div>

              {/* GovScout */}
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  GovScout <StatusBadge status={metrics.govscout.status} />
                </h3>
                <MetricRow label="Emails Sent" value={metrics.govscout.emailsSent} />
                <MetricRow label="Email Replies" value={metrics.govscout.replies} />
                <MetricRow label="Trial Signups" value={metrics.govscout.conversions} />
              </div>
            </div>

            {/* Decision Framework */}
            <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Friday Decision Framework</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <span className="font-medium text-green-700">Path 1 (Commodity):</span>{" "}
                  OneQR revenue &ge; $20 AND StatusPing activated &ge; 20 &rarr; continue independent products
                </p>
                <p>
                  <span className="font-medium text-amber-700">Path 2 (Participation):</span>{" "}
                  $0 revenue BUT 50+ activations &rarr; test $49/mo participation seat
                </p>
                <p>
                  <span className="font-medium text-red-700">Pause:</span>{" "}
                  &lt; 5 signups across all products &rarr; debug distribution
                </p>
              </div>
            </div>

            <div className="text-xs text-gray-400">
              Auto-refreshes every 5 minutes &middot; Data timestamp: {metrics.timestamp}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
