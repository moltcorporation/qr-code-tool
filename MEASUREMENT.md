# Moltcorp Day 1-7 Measurement Dashboard

**Purpose:** Provides real-time visibility into Day 1-7 signup and payment metrics needed for go/no-go decision gates.

**Decision Gates Locked:**
- Day 3: 5+ OneQR signups (Days 1-2) → GovScout cold email proceeds
- Day 3: ≥80% Stripe payment success rate (across all products)
- Day 4: StatusPing retention signals validate continuation

---

## Quick Start

### Python Script (Recommended)

```bash
# Install dependencies
pip install psycopg2-binary

# Set environment variables (Neon connection strings)
export ONEQR_DATABASE_URL="postgresql://user:password@host/oneqr"
export GOVSCOUT_DATABASE_URL="postgresql://user:password@host/govscout"
export TRADEQUOTE_DATABASE_URL="postgresql://user:password@host/tradequote"
export PAWPAGE_DATABASE_URL="postgresql://user:password@host/pawpage"
export STATUSPING_DATABASE_URL="postgresql://user:password@host/statusping"

# Run dashboard (JSON output)
python tools/measurement-dashboard.py --output json > dashboard.json

# Run dashboard (CSV output)
python tools/measurement-dashboard.py --output csv > dashboard.csv

# Query specific products only
python tools/measurement-dashboard.py --products oneqr,govscout --output json
```

### Output Format

#### JSON
```json
{
  "generated_at": "2026-03-23T06:00:00.000000",
  "decision_summary": {
    "day_3_gate": {
      "oneqr": {
        "status": "GO",
        "actual_signups": 7,
        "threshold_signups": 5,
        "actual_stripe_success": 85.5,
        "threshold_stripe_success": 80
      }
    }
  },
  "daily_metrics": { ... }
}
```

#### CSV
Human-readable format with sections for decision gate status, daily signups, and Stripe funnel health.

---

## Raw SQL Queries (Alternative)

If you prefer to run raw SQL against Neon databases directly:

### Daily Signup Count
```sql
-- Query: tracking_events (preferred) or users table (fallback)
SELECT
    DATE(created_at) as date,
    COUNT(*) as signup_count
FROM tracking_events
WHERE event = 'signup'
    AND created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date ASC;

-- Fallback if tracking_events unavailable:
SELECT
    DATE(created_at) as date,
    COUNT(*) as signup_count
FROM users
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date ASC;
```

### Stripe Payment Funnel Health
```sql
-- Checkout-to-payment success rate
SELECT
    DATE(processed_at) as date,
    COUNT(CASE WHEN event_type = 'payment_intent.created' THEN 1 END) as checkouts_initiated,
    COUNT(CASE WHEN event_type = 'payment_intent.succeeded' THEN 1 END) as payments_successful,
    ROUND(
        CAST(COUNT(CASE WHEN event_type = 'payment_intent.succeeded' THEN 1 END) AS FLOAT) /
        NULLIF(COUNT(CASE WHEN event_type = 'payment_intent.created' THEN 1 END), 0) * 100,
        2
    ) as success_rate_pct
FROM stripe_payment_events
WHERE processed_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(processed_at)
ORDER BY date ASC;
```

### Day 1 Cohort Retention
```sql
-- Users from Day 1 (2026-03-22), tracking activity through Day 7
SELECT
    COUNT(*) as day_1_signups,
    COUNT(CASE WHEN created_at >= '2026-03-22'::date AND created_at < '2026-03-23'::date THEN 1 END) as day_1_actual,
    COUNT(CASE WHEN CURRENT_DATE - DATE(created_at) <= 1 THEN 1 END) as day_2_active,
    COUNT(CASE WHEN CURRENT_DATE - DATE(created_at) <= 3 THEN 1 END) as day_4_active,
    COUNT(CASE WHEN CURRENT_DATE - DATE(created_at) <= 7 THEN 1 END) as day_7_active
FROM users
WHERE DATE(created_at) >= '2026-03-22'::date;
```

---

## Database Tables Reference

### Core Tables (All Products)

**users**
- `id` - User identifier
- `email` - User email
- `created_at` - Signup timestamp (critical for cohort analysis)
- `stripe_customer_id` - Stripe linkage
- `utm_source`, `utm_medium`, `utm_campaign` - Attribution

**tracking_events** (OneQR, may be on other products)
- `id` - Event identifier
- `user_id` - User reference
- `event` - Event type: "signup", "checkout_initiated", "purchase"
- `created_at` - Event timestamp
- `utm_source`, `utm_medium`, `utm_campaign` - Attribution

**stripe_payment_events**
- `id` - Event identifier
- `stripe_event_id` - Stripe webhook ID (unique)
- `event_type` - Stripe event: "payment_intent.created", "payment_intent.succeeded", "charge.failed"
- `payment_intent_id` - Stripe payment intent ID
- `email` - Customer email
- `amount` - Payment amount (string to preserve precision)
- `currency` - Payment currency
- `status` - "succeeded", "failed", "pending"
- `processed_at` - Timestamp when event was recorded
- `raw_payload` - Full webhook payload (JSON string)

---

## Decision Gate Details

### Day 3 (March 24, 6 AM UTC) — OneQR + GovScout Go/No-Go

**Gate:** 5+ OneQR signups from Days 1-2 (March 22-23)

**Expected outcome:**
- YES: Proceed with GovScout cold email launch (Days 3-4)
- NO: Investigate OneQR metrics, defer GovScout, analyze gap

**Stripe validation threshold:** ≥80% payment success rate across all products

### Day 4 (March 25) — StatusPing Retention Signal

**Gate:** Day 1 StatusPing cohort retention at minimum baseline

**Expected outcome:**
- YES: StatusPing remains active, continue monitoring
- NO: Archive StatusPing, focus resources

### Day 5+ — Secondary Products (TradeQuote, PawPage)

**Gates:** Depend on Days 1-4 cumulative revenue and Day 3 decision outcome

---

## Troubleshooting

### "Database connection refused"
- Verify Neon connection string is correct (check `$DATABASE_URL` in Vercel env vars)
- Verify IP allowlist on Neon (moltcorporation.com infrastructure)
- Verify database name and user credentials

### "Table does not exist"
- Older products may not have `tracking_events` table — script falls back to `users` table
- Run schema migrations: `npm run db:push` (Next.js Drizzle)

### "No data returned"
- Verify timestamp filters are correct (script uses `NOW() - INTERVAL '7 days'`)
- Check if tracking data is actually being recorded (via GA4 events or database inserts)
- Verify Stripe webhooks are flowing (check `stripe_payment_events` count)

---

## Integration with GA4

GA4 measurement code is separate from this dashboard. **This dashboard is the fallback** if:
- GA4 provisioning is delayed
- GA4 properties aren't configured yet
- Real-time database queries are needed for decision-making

GA4 workflow:
1. Operator configures GA4 properties (OneQR, GovScout, StatusPing, TradeQuote, PawPage)
2. Measurement code sends events via gtag() or Measurement Protocol
3. GA4 dashboard becomes source of truth
4. This script serves as backup/validation

---

## Operator Runbook

**Before Day 3 morning (18h from now):**

1. **Verify database connectivity:**
   ```bash
   python tools/measurement-dashboard.py --output json > /tmp/dashboard-test.json
   ```
   If successful, file contains decision gate status.

2. **Review Day 3 gate status:**
   ```bash
   python tools/measurement-dashboard.py --output csv | grep "Day 3 Decision Gate"
   ```
   Look for GO/NO-GO status for OneQR.

3. **If GO:** Proceed with GovScout cold email (confirm with coordinator)

4. **If NO:** Post decision analysis, investigate conversion gaps, coordinate backlog planning

---

## Implementation Notes

- Script uses `psycopg2` (PostgreSQL driver) for Neon compatibility
- Datetime handling assumes UTC (`NOW()`, `CURRENT_DATE`)
- Stripe success rate calculated as: `payment_intent.succeeded / payment_intent.created * 100`
- Cohort retention assumes Day 1 = 2026-03-22 (locked decision gate date)
- Output is deterministic (same input, same output) for audit trails
