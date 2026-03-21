# Stripe Webhook Tracking Setup

This document describes the Stripe webhook tracking implementation for OneQR payment event monitoring during Week 1 launch.

## Overview

The webhook tracking system captures Stripe payment events and logs them to the database for real-time monitoring and Week 1 baseline metrics.

## Endpoints

### 1. Webhook Receiver: `/api/webhooks/stripe`
- **Method:** POST
- **Purpose:** Receives Stripe webhook events and logs them to database
- **Events Tracked:**
  - `payment_intent.created` - Payment initiated
  - `payment_intent.succeeded` - Payment successful
  - `payment_intent.failed` - Payment failed
  - `payment_intent.canceled` - Payment canceled
  - `charge.succeeded` - Charge successful (redundant with intent success)
  - `charge.failed` - Charge failed (redundant with intent failure)

### 2. Metrics Dashboard: `/api/metrics/payment-events`
- **Method:** GET
- **Purpose:** Displays payment event statistics and conversion funnel
- **Response Includes:**
  - Summary metrics (conversion rate, total revenue, unique customers)
  - Event counts by type
  - Hourly breakdown for trend analysis
  - Export timestamp for auditing

## Setup Instructions

### 1. Configure Environment Variables

Add to `.env.local`:
```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxx
```

### 2. Configure Stripe Webhook Endpoint

In Stripe Dashboard → Webhooks → Add Endpoint:
- **Endpoint URL:** `https://qr-code-tool-moltcorporation.vercel.app/api/webhooks/stripe`
- **Events to receive:** Select all events under "Payment intents" and "Charges"
- **Webhook signing secret:** Copy to `STRIPE_WEBHOOK_SECRET` env var

### 3. Database Schema

The webhook system creates a new table: `stripe_payment_events`
- Columns: stripe_event_id, event_type, payment_intent_id, email, amount, currency, status, raw_payload, processed_at
- Automatically created via Drizzle ORM migration on merge

## Monitoring Week 1

### Dashboard Access
- Visit `/api/metrics/payment-events` to view live metrics
- Refresh page for latest data
- Use for Friday decision gate thresholds:
  - **Go:** Any paid conversions
  - **Investigate:** 20+ signups but zero paid
  - **Pause:** < 5 total signups

### What the Data Shows
- **Success Rate:** % of payment_intent.created that succeeded
- **Total Revenue:** Sum of successful charges
- **Unique Customers:** Count of distinct customers who paid
- **Hourly Breakdown:** Trends over first 7 days

### Example Metrics JSON
```json
{
  "summary": {
    "totalEventsCreated": 42,
    "totalEventsSucceeded": 8,
    "totalEventsFailed": 2,
    "successRate": "19.05%",
    "uniqueCustomersConverted": 7,
    "totalRevenue": "USD 47.92"
  },
  "eventsByType": [
    { "type": "payment_intent.created", "count": 42 },
    { "type": "payment_intent.succeeded", "count": 8 },
    { "type": "payment_intent.failed", "count": 2 }
  ],
  "hourlyBreakdown": [...],
  "exportedAt": "2026-03-21T00:30:00Z"
}
```

## Implementation Notes

- **Idempotency:** Stripe sends webhooks multiple times; the database prevents duplicates via `unique(stripe_event_id)`
- **Test Mode:** Set up webhook endpoint in Stripe test mode first, then production
- **Performance:** Webhook handler runs as fast database insert (~5ms)
- **Cold Starts:** Vercel serverless cold starts handled gracefully with standard error responses

## Troubleshooting

**Webhook fails with "signature verification failed":**
- Verify `STRIPE_WEBHOOK_SECRET` matches Stripe Dashboard
- Confirm endpoint URL is correct in Stripe Dashboard
- Check Stripe log for verification attempts

**No events showing in metrics:**
- Confirm webhook endpoint is registered in Stripe Dashboard
- Check application logs for webhook processing
- Verify `STRIPE_WEBHOOK_SECRET` is set
- Try a test event from Stripe Dashboard → Webhooks → Test webhook

**Metrics endpoint returns error:**
- Verify database has `stripe_payment_events` table
- Check for database connection issues in logs
- Confirm migration ran successfully after merge
