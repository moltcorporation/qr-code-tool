"use client";

import { useEffect, useState } from "react";

interface MeasurementMetrics {
  signups_day1_2: number;
  stripe_payment_success_rate: number;
  stripe_success_count: number;
  stripe_attempted_count: number;
  pending_emails: number;
  generated_at: string;
}

export default function MeasurementDashboard() {
  const [metrics, setMetrics] = useState<MeasurementMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const adminSecret = prompt(
        "Enter ADMIN_SECRET to view metrics:"
      );
      if (!adminSecret) {
        setError("Authentication required");
        return;
      }

      const res = await fetch("/api/admin/metrics", {
        headers: { Authorization: `Bearer ${adminSecret}` },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }

      const data = await res.json();
      setMetrics(data);
      setLastRefresh(new Date());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch metrics"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const decision_gate_pass = (metrics?.signups_day1_2 ?? 0) >= 5;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Day 3 Decision Gate</h1>
          <p className="text-gray-600 mt-2">
            Unified measurement dashboard for Day 1-2 launch metrics
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={fetchMetrics}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? "Refreshing..." : "Refresh Metrics"}
          </button>
          {lastRefresh && (
            <div className="flex items-center text-sm text-gray-500">
              <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {metrics && (
          <>
            {/* Decision Gate Alert */}
            <div
              className={`rounded-lg p-6 mb-8 border-2 ${
                decision_gate_pass
                  ? "bg-green-50 border-green-300"
                  : "bg-amber-50 border-amber-300"
              }`}
            >
              <h2
                className={`text-lg font-bold mb-2 ${
                  decision_gate_pass
                    ? "text-green-900"
                    : "text-amber-900"
                }`}
              >
                {decision_gate_pass ? "✓ GATE OPEN" : "⚠ GATE REVIEW"}
              </h2>
              <p
                className={
                  decision_gate_pass
                    ? "text-green-800"
                    : "text-amber-800"
                }
              >
                {decision_gate_pass
                  ? "Day 1-2 signups >= 5. Proceeding to Day 3."
                  : `Day 1-2 signups: ${metrics.signups_day1_2} (target: 5+)`}
              </p>
            </div>

            {/* Three Critical Metrics */}
            <div className="grid gap-6">
              {/* Metric 1: Day 1-2 Signups */}
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Day 1-2 Signups
                </div>
                <div className="mt-2 flex items-baseline">
                  <div className="text-4xl font-bold text-blue-600">
                    {metrics.signups_day1_2}
                  </div>
                  <div className="ml-3 text-sm text-gray-500">
                    users signed up
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  Gate threshold: 5+ signups
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{
                      width: `${Math.min((metrics.signups_day1_2 / 5) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Metric 2: Stripe Success Rate */}
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Stripe Payment Success Rate
                </div>
                <div className="mt-2 flex items-baseline">
                  <div className="text-4xl font-bold text-green-600">
                    {metrics.stripe_payment_success_rate.toFixed(1)}%
                  </div>
                  <div className="ml-3 text-sm text-gray-500">
                    success rate
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  {metrics.stripe_success_count} succeeded / {metrics.stripe_attempted_count} attempted
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{
                      width: `${metrics.stripe_payment_success_rate}%`,
                    }}
                  />
                </div>
              </div>

              {/* Metric 3: Email Delivery Status */}
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Email Delivery Status
                </div>
                <div className="mt-2 flex items-baseline">
                  <div className="text-4xl font-bold text-purple-600">
                    {metrics.pending_emails}
                  </div>
                  <div className="ml-3 text-sm text-gray-500">
                    pending emails
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  {metrics.pending_emails === 0
                    ? "All scheduled emails sent"
                    : "Emails scheduled for sending"}
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 transition-all"
                    style={{
                      width: metrics.pending_emails > 0 ? "50%" : "100%",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-8 text-center text-xs text-gray-400">
              <p>Dashboard auto-loads in &lt;60 seconds • {new Date(metrics.generated_at).toLocaleString()}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
