import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET() {
  const dsnOneQR = process.env.DATABASE_URL;
  const dsnStatusPing = process.env.STATUSPING_DATABASE_URL;
  const dsnGovScout = process.env.GOVSCOUT_DATABASE_URL;

  const metrics: Record<string, any> = {
    timestamp: new Date().toISOString(),
    oneqr: { revenue: 0, activations: 0, signups: 0, qrGenerations: 0, status: "pending" },
    statusping: { signups: 0, activated: 0, status: "pending" },
    govscout: { emailsSent: 0, replies: 0, conversions: 0, status: "pending" },
  };

  // OneQR metrics (uses the same DATABASE_URL as host app)
  if (dsnOneQR) {
    try {
      const sql = neon(dsnOneQR);

      const revenueResult = await sql`
        SELECT COALESCE(SUM(CAST(amount AS INTEGER)), 0) as total
        FROM stripe_payment_events
        WHERE event_type = 'payment_intent.succeeded'
        AND processed_at > NOW() - INTERVAL '24 hours'`;
      const revenue = Math.round((Number(revenueResult[0]?.total) || 0) / 100);

      const activationResult = await sql`
        SELECT COUNT(DISTINCT u.id) as count
        FROM users u
        INNER JOIN qr_codes qc ON u.id = qc.user_id
        WHERE u.plan IN ('pro', 'premium')
        AND qc.created_at > NOW() - INTERVAL '24 hours'`;
      const activations = Number(activationResult[0]?.count ?? 0);

      const signupResult = await sql`
        SELECT COUNT(*) as count FROM users
        WHERE created_at > NOW() - INTERVAL '24 hours'`;
      const signups = Number(signupResult[0]?.count ?? 0);

      const qrGenResult = await sql`
        SELECT COUNT(*) as count FROM qr_events
        WHERE event = 'qr_generated'
        AND created_at > NOW() - INTERVAL '24 hours'`;
      const qrGenerations = Number(qrGenResult[0]?.count ?? 0);

      metrics.oneqr = { revenue, activations, signups, qrGenerations, status: "connected" };
    } catch (error) {
      console.error("OneQR metrics error:", error);
      metrics.oneqr.status = "error";
    }
  }

  // StatusPing metrics (requires STATUSPING_DATABASE_URL env var in Vercel)
  if (dsnStatusPing) {
    try {
      const sql = neon(dsnStatusPing);

      const signupsResult = await sql`
        SELECT COUNT(DISTINCT email) as count FROM monitors
        WHERE created_at > NOW() - INTERVAL '24 hours'`;
      const signups = Number(signupsResult[0]?.count ?? 0);

      const activatedResult = await sql`
        SELECT COUNT(DISTINCT monitor_id) as count FROM checks
        WHERE checked_at > NOW() - INTERVAL '24 hours'`;
      const activated = Number(activatedResult[0]?.count ?? 0);

      metrics.statusping = { signups, activated, status: "connected" };
    } catch (error) {
      console.error("StatusPing metrics error:", error);
      metrics.statusping.status = "error";
    }
  }

  // GovScout metrics (requires GOVSCOUT_DATABASE_URL env var in Vercel)
  if (dsnGovScout) {
    try {
      const sql = neon(dsnGovScout);

      const emailsResult = await sql`
        SELECT COUNT(*) as count FROM drip_schedule
        WHERE send_at > NOW() - INTERVAL '4 days' AND send_at <= NOW()`;
      const emailsSent = Number(emailsResult[0]?.count ?? 0);

      const repliesResult = await sql`
        SELECT COUNT(DISTINCT email) as count FROM email_subscribers
        WHERE source IN ('email', 'cold-email', 'sam-gov')
        AND created_at > NOW() - INTERVAL '4 days'`;
      const replies = Number(repliesResult[0]?.count ?? 0);

      const conversionsResult = await sql`
        SELECT COUNT(DISTINCT id) as count FROM users
        WHERE utm_source IN ('email', 'cold-email', 'sam-gov')
        AND created_at > NOW() - INTERVAL '4 days'`;
      const conversions = Number(conversionsResult[0]?.count ?? 0);

      metrics.govscout = { emailsSent, replies, conversions, status: "connected" };
    } catch (error) {
      console.error("GovScout metrics error:", error);
      metrics.govscout.status = "error";
    }
  }

  metrics.summary = {
    totalRevenue: metrics.oneqr.revenue,
    totalActivations: metrics.oneqr.activations + metrics.statusping.activated,
    totalSignups: metrics.oneqr.signups + metrics.statusping.signups + metrics.govscout.conversions,
    totalLeads: metrics.govscout.emailsSent + metrics.govscout.replies,
  };

  return NextResponse.json(metrics);
}
