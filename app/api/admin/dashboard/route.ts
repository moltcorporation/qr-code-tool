import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

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

function emptyProduct(): ProductMetrics {
  return {
    signups: 0,
    activated: 0,
    paid: 0,
    activationRate: 0,
    conversionRate: 0,
    revenue: 0,
    transactions: 0,
    arpu: 0,
    utmSources: {},
    status: "pending",
  };
}

function calcRates(m: ProductMetrics): ProductMetrics {
  m.activationRate = m.signups > 0 ? Math.round((m.activated / m.signups) * 1000) / 10 : 0;
  m.conversionRate = m.signups > 0 ? Math.round((m.paid / m.signups) * 1000) / 10 : 0;
  m.arpu = m.paid > 0 ? Math.round((m.revenue / m.paid) * 100) / 100 : 0;
  return m;
}

export async function GET() {
  const metrics: Record<string, any> = {
    timestamp: new Date().toISOString(),
    oneqr: emptyProduct(),
    govscout: emptyProduct(),
    tradequote: emptyProduct(),
    pawpage: emptyProduct(),
  };

  // OneQR
  const dsnOneQR = process.env.DATABASE_URL;
  if (dsnOneQR) {
    try {
      const sql = neon(dsnOneQR);

      const [signups] = await sql`SELECT COUNT(*) as c FROM users`;
      const [activated] = await sql`SELECT COUNT(DISTINCT user_id) as c FROM qr_codes WHERE user_id IS NOT NULL`;
      const [paid] = await sql`SELECT COUNT(*) as c FROM users WHERE plan != 'free'`;

      const revResult = await sql`
        SELECT COALESCE(SUM(CAST(amount AS INTEGER)), 0) as total, COUNT(*) as txns
        FROM stripe_payment_events
        WHERE event_type = 'payment_intent.succeeded'`;
      const revenue = Math.round((Number(revResult[0]?.total) || 0) / 100);
      const transactions = Number(revResult[0]?.txns ?? 0);

      const utmRows = await sql`
        SELECT COALESCE(utm_source, 'direct') as src, COUNT(*) as c
        FROM users GROUP BY COALESCE(utm_source, 'direct')`;
      const utmSources: Record<string, number> = {};
      for (const row of utmRows) utmSources[row.src] = Number(row.c);

      metrics.oneqr = calcRates({
        signups: Number(signups[0]?.c ?? 0),
        activated: Number(activated[0]?.c ?? 0),
        paid: Number(paid[0]?.c ?? 0),
        activationRate: 0,
        conversionRate: 0,
        revenue,
        transactions,
        arpu: 0,
        utmSources,
        status: "connected",
      });
    } catch (error) {
      console.error("OneQR metrics error:", error);
      metrics.oneqr.status = "error";
    }
  }

  // GovScout
  const dsnGovScout = process.env.GOVSCOUT_DATABASE_URL;
  if (dsnGovScout) {
    try {
      const sql = neon(dsnGovScout);

      // GovScout may have users table with utm_source
      const [signups] = await sql`SELECT COUNT(*) as c FROM users`;
      const [activated] = await sql`
        SELECT COUNT(DISTINCT id) as c FROM users
        WHERE id IN (SELECT DISTINCT user_id FROM saved_searches WHERE user_id IS NOT NULL)`;
      const [paid] = await sql`SELECT COUNT(*) as c FROM users WHERE plan != 'free'`;

      // Revenue from stripe_payment_events if exists
      let revenue = 0, transactions = 0;
      try {
        const revResult = await sql`
          SELECT COALESCE(SUM(CAST(amount AS INTEGER)), 0) as total, COUNT(*) as txns
          FROM stripe_payment_events
          WHERE event_type = 'payment_intent.succeeded'`;
        revenue = Math.round((Number(revResult[0]?.total) || 0) / 100);
        transactions = Number(revResult[0]?.txns ?? 0);
      } catch { /* table may not exist */ }

      const utmSources: Record<string, number> = {};
      try {
        const utmRows = await sql`
          SELECT COALESCE(utm_source, 'direct') as src, COUNT(*) as c
          FROM users GROUP BY COALESCE(utm_source, 'direct')`;
        for (const row of utmRows) utmSources[row.src] = Number(row.c);
      } catch { /* utm_source column may not exist */ }

      metrics.govscout = calcRates({
        signups: Number(signups[0]?.c ?? 0),
        activated: Number(activated[0]?.c ?? 0),
        paid: Number(paid[0]?.c ?? 0),
        activationRate: 0,
        conversionRate: 0,
        revenue,
        transactions,
        arpu: 0,
        utmSources,
        status: "connected",
      });
    } catch (error) {
      console.error("GovScout metrics error:", error);
      metrics.govscout.status = "error";
    }
  }

  // TradeQuote
  const dsnTradeQuote = process.env.TRADEQUOTE_DATABASE_URL;
  if (dsnTradeQuote) {
    try {
      const sql = neon(dsnTradeQuote);

      const [signups] = await sql`SELECT COUNT(*) as c FROM users`;
      let activated = 0;
      try {
        const [act] = await sql`
          SELECT COUNT(DISTINCT id) as c FROM users
          WHERE id IN (SELECT DISTINCT user_id FROM quotes WHERE user_id IS NOT NULL)`;
        activated = Number(act?.c ?? 0);
      } catch { /* quotes table may not exist */ }

      let paid = 0;
      try {
        const [p] = await sql`SELECT COUNT(*) as c FROM users WHERE plan != 'free'`;
        paid = Number(p?.c ?? 0);
      } catch { /* plan column may not exist */ }

      let revenue = 0, transactions = 0;
      try {
        const revResult = await sql`
          SELECT COALESCE(SUM(CAST(amount AS INTEGER)), 0) as total, COUNT(*) as txns
          FROM stripe_payment_events
          WHERE event_type = 'payment_intent.succeeded'`;
        revenue = Math.round((Number(revResult[0]?.total) || 0) / 100);
        transactions = Number(revResult[0]?.txns ?? 0);
      } catch { /* table may not exist */ }

      const utmSources: Record<string, number> = {};
      try {
        const utmRows = await sql`
          SELECT COALESCE(utm_source, 'direct') as src, COUNT(*) as c
          FROM users GROUP BY COALESCE(utm_source, 'direct')`;
        for (const row of utmRows) utmSources[row.src] = Number(row.c);
      } catch { /* column may not exist */ }

      metrics.tradequote = calcRates({
        signups: Number(signups[0]?.c ?? 0),
        activated,
        paid,
        activationRate: 0,
        conversionRate: 0,
        revenue,
        transactions,
        arpu: 0,
        utmSources,
        status: "connected",
      });
    } catch (error) {
      console.error("TradeQuote metrics error:", error);
      metrics.tradequote.status = "error";
    }
  }

  // PawPage
  const dsnPawPage = process.env.PAWPAGE_DATABASE_URL;
  if (dsnPawPage) {
    try {
      const sql = neon(dsnPawPage);

      const [signups] = await sql`SELECT COUNT(*) as c FROM users`;
      let activated = 0;
      try {
        const [act] = await sql`
          SELECT COUNT(DISTINCT id) as c FROM users
          WHERE id IN (SELECT DISTINCT user_id FROM litters WHERE user_id IS NOT NULL)`;
        activated = Number(act?.c ?? 0);
      } catch { /* litters table may not exist */ }

      let paid = 0;
      try {
        const [p] = await sql`SELECT COUNT(*) as c FROM users WHERE plan != 'free'`;
        paid = Number(p?.c ?? 0);
      } catch { /* plan column may not exist */ }

      let revenue = 0, transactions = 0;
      try {
        const revResult = await sql`
          SELECT COALESCE(SUM(CAST(amount AS INTEGER)), 0) as total, COUNT(*) as txns
          FROM stripe_payment_events
          WHERE event_type = 'payment_intent.succeeded'`;
        revenue = Math.round((Number(revResult[0]?.total) || 0) / 100);
        transactions = Number(revResult[0]?.txns ?? 0);
      } catch { /* table may not exist */ }

      const utmSources: Record<string, number> = {};
      try {
        const utmRows = await sql`
          SELECT COALESCE(utm_source, 'direct') as src, COUNT(*) as c
          FROM users GROUP BY COALESCE(utm_source, 'direct')`;
        for (const row of utmRows) utmSources[row.src] = Number(row.c);
      } catch { /* column may not exist */ }

      metrics.pawpage = calcRates({
        signups: Number(signups[0]?.c ?? 0),
        activated,
        paid,
        activationRate: 0,
        conversionRate: 0,
        revenue,
        transactions,
        arpu: 0,
        utmSources,
        status: "connected",
      });
    } catch (error) {
      console.error("PawPage metrics error:", error);
      metrics.pawpage.status = "error";
    }
  }

  // Summary across all products
  const products = [metrics.oneqr, metrics.govscout, metrics.tradequote, metrics.pawpage];
  metrics.summary = {
    totalRevenue: products.reduce((s, p) => s + p.revenue, 0),
    totalTransactions: products.reduce((s, p) => s + p.transactions, 0),
    totalSignups: products.reduce((s, p) => s + p.signups, 0),
    totalPaid: products.reduce((s, p) => s + p.paid, 0),
    overallConversionRate: 0,
  };
  const totalSig = metrics.summary.totalSignups;
  if (totalSig > 0) {
    metrics.summary.overallConversionRate =
      Math.round((metrics.summary.totalPaid / totalSig) * 1000) / 10;
  }

  return NextResponse.json(metrics);
}
