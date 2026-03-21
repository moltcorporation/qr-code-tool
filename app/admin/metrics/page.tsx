"use client";

import { useEffect, useState } from "react";

interface ProductMetrics {
  signups: number;
  activated: number;
  paid: number;
  activationRate: number;
  conversionRate: number;
  revenue: number;
  transactions: number;
  arpu: number;
  utmSources: Record<string, number>;
  status: string;
}

interface Metrics {
  timestamp: string;
  oneqr: ProductMetrics;
  govscout: ProductMetrics;
  tradequote: ProductMetrics;
  pawpage: ProductMetrics;
  summary: {
    totalRevenue: number;
    totalTransactions: number;
    totalSignups: number;
    totalPaid: number;
    overallConversionRate: number;
  };
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

function FunnelBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>{label}</span>
        <span>{value} ({pct}%)</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function UtmTable({ sources }: { sources: Record<string, number> }) {
  const entries = Object.entries(sources).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return <p className="text-xs text-gray-400">No UTM data</p>;
  return (
    <div className="mt-2">
      {entries.map(([src, count]) => (
        <div key={src} className="flex justify-between text-xs py-1 border-b border-gray-50 last:border-0">
          <span className="text-gray-600 font-mono">{src}</span>
          <span className="font-semibold text-gray-800">{count}</span>
        </div>
      ))}
    </div>
  );
}

function ProductCard({ name, m }: { name: string; m: ProductMetrics }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h3 className="font-semibold text-gray-900 mb-3">
        {name} <StatusBadge status={m.status} />
      </h3>

      {/* Conversion Funnel */}
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-500 uppercase mb-2">Conversion Funnel</p>
        <FunnelBar label="Signups" value={m.signups} max={m.signups} />
        <FunnelBar label="Activated" value={m.activated} max={m.signups} />
        <FunnelBar label="Paid" value={m.paid} max={m.signups} />
      </div>

      {/* Revenue */}
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-500 uppercase mb-2">Revenue</p>
        <MetricRow label="Revenue" value={`$${m.revenue}`} />
        <MetricRow label="Transactions" value={m.transactions} />
        <MetricRow label="ARPU" value={`$${m.arpu}`} />
      </div>

      {/* UTM Attribution */}
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase mb-2">Traffic Sources</p>
        <UtmTable sources={m.utmSources} />
      </div>
    </div>
  );
}

export default function AdminMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [adSpend, setAdSpend] = useState("");

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

  const spend = parseFloat(adSpend) || 0;
  const totalPaid = metrics?.summary.totalPaid ?? 0;
  const cac = totalPaid > 0 && spend > 0 ? Math.round((spend / totalPaid) * 100) / 100 : null;
  const totalRevenue = metrics?.summary.totalRevenue ?? 0;
  const ltv = totalPaid > 0 ? Math.round((totalRevenue / totalPaid) * 100) / 100 : null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Ad Economics Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Conversion funnels, revenue, and CAC/LTV per product
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
              <h2 className="text-sm font-semibold text-blue-900 mb-4">Company Totals</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <div className="text-2xl font-bold text-blue-700">${metrics.summary.totalRevenue}</div>
                  <div className="text-xs text-blue-600">Revenue</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">{metrics.summary.totalTransactions}</div>
                  <div className="text-xs text-blue-600">Transactions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">{metrics.summary.totalSignups}</div>
                  <div className="text-xs text-blue-600">Signups</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">{metrics.summary.totalPaid}</div>
                  <div className="text-xs text-blue-600">Paid Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">{metrics.summary.overallConversionRate}%</div>
                  <div className="text-xs text-blue-600">Conversion Rate</div>
                </div>
              </div>
            </div>

            {/* CAC / LTV Calculator */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6">
              <h2 className="text-sm font-semibold text-amber-900 mb-3">Ad Economics Calculator</h2>
              <div className="flex flex-wrap items-end gap-4">
                <div>
                  <label className="block text-xs text-amber-700 mb-1">Ad Spend ($)</label>
                  <input
                    type="number"
                    value={adSpend}
                    onChange={(e) => setAdSpend(e.target.value)}
                    placeholder="Enter total ad spend"
                    className="px-3 py-2 border border-amber-300 rounded-md text-sm w-48 bg-white"
                  />
                </div>
                <div className="px-4 py-2 bg-white rounded-md border border-amber-200">
                  <div className="text-xs text-amber-600">CAC</div>
                  <div className="text-lg font-bold text-amber-800">
                    {cac !== null ? `$${cac}` : "—"}
                  </div>
                </div>
                <div className="px-4 py-2 bg-white rounded-md border border-amber-200">
                  <div className="text-xs text-amber-600">LTV (current)</div>
                  <div className="text-lg font-bold text-amber-800">
                    {ltv !== null ? `$${ltv}` : "—"}
                  </div>
                </div>
                <div className="px-4 py-2 bg-white rounded-md border border-amber-200">
                  <div className="text-xs text-amber-600">LTV/CAC Ratio</div>
                  <div className={`text-lg font-bold ${cac && ltv && ltv / cac >= 3 ? "text-green-700" : cac && ltv && ltv / cac >= 1 ? "text-amber-700" : "text-red-700"}`}>
                    {cac !== null && ltv !== null ? `${Math.round((ltv / cac) * 10) / 10}x` : "—"}
                  </div>
                </div>
              </div>
              <p className="text-xs text-amber-600 mt-3">
                Target: LTV/CAC &ge; 3x for sustainable ad spend. Manual input until ad tools are integrated.
              </p>
            </div>

            {/* Product Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <ProductCard name="OneQR" m={metrics.oneqr} />
              <ProductCard name="GovScout" m={metrics.govscout} />
              <ProductCard name="TradeQuote" m={metrics.tradequote} />
              <ProductCard name="PawPage" m={metrics.pawpage} />
            </div>

            <div className="text-xs text-gray-400">
              Auto-refreshes every 5 minutes &middot; {metrics.timestamp}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
