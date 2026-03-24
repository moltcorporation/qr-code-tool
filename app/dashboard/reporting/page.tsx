"use client";

import { useEffect, useState } from "react";

interface DashboardData {
  timestamp: string;
  funnel: {
    signups: number;
    checkouts: number;
    purchases: number;
    confirmed_payments: number;
  };
  conversion_rates: {
    signup_to_checkout: string;
    checkout_to_purchase: string;
    signup_to_purchase: string;
  };
  by_channel: Array<{
    channel: string;
    signups: number;
    checkouts: number;
    purchases: number;
  }>;
}

export default function ReportingDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      const response = await fetch("/api/reporting/dashboard");
      if (!response.ok) throw new Error("Failed to fetch dashboard data");
      const dashData = await response.json();
      setData(dashData);
      setLastUpdate(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">OneQR Launch Dashboard</h1>
          <p className="text-slate-400">Days 1-2 Conversion Metrics for Aurora</p>
          {lastUpdate && <p className="text-xs text-slate-500">Last updated: {lastUpdate}</p>}
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-8">
            <p className="text-red-300">Error: {error}</p>
          </div>
        )}

        {data && (
          <>
            {/* Main Funnel */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
                <p className="text-slate-400 text-sm mb-2">SIGNUPS</p>
                <p className="text-4xl font-bold">{data.funnel.signups}</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
                <p className="text-slate-400 text-sm mb-2">CHECKOUTS</p>
                <p className="text-4xl font-bold">{data.funnel.checkouts}</p>
                <p className="text-xs text-emerald-400 mt-2">
                  {data.conversion_rates.signup_to_checkout} conversion
                </p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
                <p className="text-slate-400 text-sm mb-2">PURCHASES</p>
                <p className="text-4xl font-bold">{data.funnel.purchases}</p>
                <p className="text-xs text-emerald-400 mt-2">
                  {data.conversion_rates.checkout_to_purchase} checkout→purchase
                </p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
                <p className="text-slate-400 text-sm mb-2">PAYMENTS (Verified)</p>
                <p className="text-4xl font-bold">{data.funnel.confirmed_payments}</p>
                <p className="text-xs text-emerald-400 mt-2">
                  {data.conversion_rates.signup_to_purchase} signup→purchase
                </p>
              </div>
            </div>

            {/* Channel Breakdown */}
            <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
              <h2 className="text-xl font-bold mb-4">By Channel</h2>
              {data.by_channel.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left py-2 px-4">Channel</th>
                        <th className="text-right py-2 px-4">Signups</th>
                        <th className="text-right py-2 px-4">Checkouts</th>
                        <th className="text-right py-2 px-4">Purchases</th>
                        <th className="text-right py-2 px-4">Conv. Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.by_channel.map((channel, idx) => (
                        <tr key={idx} className="border-b border-slate-700">
                          <td className="py-3 px-4">{channel.channel}</td>
                          <td className="text-right py-3 px-4">{channel.signups}</td>
                          <td className="text-right py-3 px-4">{channel.checkouts}</td>
                          <td className="text-right py-3 px-4">{channel.purchases}</td>
                          <td className="text-right py-3 px-4 text-emerald-400">
                            {channel.signups > 0
                              ? ((channel.purchases / channel.signups) * 100).toFixed(1) + "%"
                              : "0%"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-400">No channel data yet</p>
              )}
            </div>

            {/* Reporting Info */}
            <div className="mt-8 bg-slate-700/30 rounded-lg p-4 border border-slate-600 text-sm text-slate-300">
              <p className="mb-2">
                <strong>Hour 24 Reporting:</strong> This dashboard updates every 30 seconds with live conversion data from GA4 and Neon.
              </p>
              <p className="mb-2">
                <strong>Hour 48 Decision Gate:</strong> Aurora reviews cumulative metrics to decide on Days 3-4 launch.
              </p>
              <p>
                <strong>Data Sources:</strong> UTM tracking via cookies, GA4 Measurement Protocol, Stripe webhook sync to Neon.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
