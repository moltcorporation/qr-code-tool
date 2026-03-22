#!/usr/bin/env python3
"""
Moltcorp Day 1-7 Measurement Dashboard

Queries production databases for all products to generate:
1. Daily signup counts by product
2. Stripe payment funnel health (checkout → success rate)
3. Day 3 decision checkpoint summary

Usage:
    python tools/measurement-dashboard.py --output json > dashboard.json
    python tools/measurement-dashboard.py --output csv > dashboard.csv

Environment Variables Required:
    ONEQR_DATABASE_URL       - Neon connection string for OneQR
    GOVSCOUT_DATABASE_URL    - Neon connection string for GovScout
    TRADEQUOTE_DATABASE_URL  - Neon connection string for TradeQuote
    PAWPAGE_DATABASE_URL     - Neon connection string for PawPage
    STATUSPING_DATABASE_URL  - Neon connection string for StatusPing (if active)
"""

import os
import json
import csv
import sys
import argparse
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor


PRODUCTS = {
    "oneqr": "ONEQR_DATABASE_URL",
    "govscout": "GOVSCOUT_DATABASE_URL",
    "tradequote": "TRADEQUOTE_DATABASE_URL",
    "pawpage": "PAWPAGE_DATABASE_URL",
    "statusping": "STATUSPING_DATABASE_URL",
}

DECISION_GATES = {
    "oneqr": {"min_signups": 5, "min_stripe_success": 0.80},
    "govscout": {"min_signups": 5, "min_stripe_success": 0.80},
    "tradequote": {"min_signups": 5, "min_stripe_success": 0.80},
    "pawpage": {"min_signups": 5, "min_stripe_success": 0.80},
    "statusping": {"min_signups": 5, "min_stripe_success": 0.80},
}


def get_db_connection(product: str) -> Optional[psycopg2.extensions.connection]:
    """Connect to product database via Neon."""
    db_url = os.getenv(PRODUCTS.get(product))
    if not db_url:
        print(f"Warning: {product} database URL not configured", file=sys.stderr)
        return None

    try:
        return psycopg2.connect(db_url)
    except Exception as e:
        print(f"Error connecting to {product} database: {e}", file=sys.stderr)
        return None


def get_daily_signups(conn: psycopg2.extensions.connection, product: str) -> Dict:
    """
    Query daily signup counts for the product.
    Uses tracking_events table (event='signup') if available, fallback to users table.
    """
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            # Try tracking_events table first (newer schema)
            cur.execute("""
                SELECT
                    DATE(created_at) as date,
                    COUNT(*) as signup_count,
                    MIN(created_at) as earliest,
                    MAX(created_at) as latest
                FROM tracking_events
                WHERE event = 'signup'
                    AND created_at >= NOW() - INTERVAL '7 days'
                GROUP BY DATE(created_at)
                ORDER BY date ASC
            """)

            rows = cur.fetchall()
            if rows:
                return {"product": product, "source": "tracking_events", "data": [dict(r) for r in rows]}

            # Fallback to users table
            cur.execute("""
                SELECT
                    DATE(created_at) as date,
                    COUNT(*) as signup_count,
                    MIN(created_at) as earliest,
                    MAX(created_at) as latest
                FROM users
                WHERE created_at >= NOW() - INTERVAL '7 days'
                GROUP BY DATE(created_at)
                ORDER BY date ASC
            """)

            rows = cur.fetchall()
            return {"product": product, "source": "users", "data": [dict(r) for r in rows]}
    except Exception as e:
        print(f"Error querying signups for {product}: {e}", file=sys.stderr)
        return {"product": product, "error": str(e), "data": []}


def get_stripe_funnel(conn: psycopg2.extensions.connection, product: str) -> Dict:
    """
    Query Stripe payment funnel: payment_intent.created vs payment_intent.succeeded.
    Calculates success rate.
    """
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
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
                ORDER BY date ASC
            """)

            rows = cur.fetchall()
            return {"product": product, "data": [dict(r) for r in rows]}
    except Exception as e:
        print(f"Error querying Stripe funnel for {product}: {e}", file=sys.stderr)
        return {"product": product, "error": str(e), "data": []}


def get_cohort_metrics(conn: psycopg2.extensions.connection, product: str) -> Dict:
    """
    Cohort analysis: users from Day 1 (2026-03-22), tracking retention through Day 7.
    For StatusPing specifically, queries cron checks for heartbeat verification.
    """
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            # Users who signed up Day 1
            cur.execute("""
                SELECT
                    COUNT(*) as day_1_signups,
                    COUNT(CASE WHEN CURRENT_DATE - DATE(created_at) <= 1 THEN 1 END) as day_2_active,
                    COUNT(CASE WHEN CURRENT_DATE - DATE(created_at) <= 3 THEN 1 END) as day_4_active,
                    COUNT(CASE WHEN CURRENT_DATE - DATE(created_at) <= 7 THEN 1 END) as day_7_active
                FROM users
                WHERE DATE(created_at) = '2026-03-22'
            """)

            result = cur.fetchone()
            return {"product": product, "cohort": "day_1", "data": dict(result) if result else {}}
    except Exception as e:
        print(f"Error querying cohort metrics for {product}: {e}", file=sys.stderr)
        return {"product": product, "error": str(e), "data": {}}


def generate_decision_summary(dashboard_data: List[Dict]) -> Dict:
    """
    Generate Day 3 decision checkpoint summary.
    Compares actual metrics against DECISION_GATES thresholds.
    """
    summary = {
        "timestamp": datetime.utcnow().isoformat(),
        "day_3_gate": {},
        "raw_metrics": dashboard_data,
    }

    for product_key, gates in DECISION_GATES.items():
        product_data = next((d for d in dashboard_data if d.get("product") == product_key), {})
        signups_data = product_data.get("signups", {}).get("data", [])
        funnel_data = product_data.get("funnel", {}).get("data", [])

        total_signups = sum(row.get("signup_count", 0) for row in signups_data if "signup_count" in row)
        avg_stripe_success = sum(row.get("success_rate_pct", 0) for row in funnel_data) / len(funnel_data) if funnel_data else 0

        status = "GO" if total_signups >= gates["min_signups"] and avg_stripe_success >= gates["min_stripe_success"] * 100 else "NO-GO"

        summary["day_3_gate"][product_key] = {
            "status": status,
            "actual_signups": total_signups,
            "threshold_signups": gates["min_signups"],
            "actual_stripe_success": round(avg_stripe_success, 2),
            "threshold_stripe_success": gates["min_stripe_success"] * 100,
        }

    return summary


def output_json(dashboard_data: Dict, decision_summary: Dict) -> str:
    """Output as JSON."""
    output = {
        "generated_at": datetime.utcnow().isoformat(),
        "decision_summary": decision_summary,
        "daily_metrics": dashboard_data,
    }
    return json.dumps(output, indent=2, default=str)


def output_csv(dashboard_data: Dict, decision_summary: Dict) -> str:
    """Output as CSV (flat structure)."""
    lines = []
    lines.append("# Moltcorp Day 1-7 Measurement Dashboard")
    lines.append(f"# Generated: {datetime.utcnow().isoformat()}")
    lines.append("")

    # Decision summary section
    lines.append("## Day 3 Decision Gate Status")
    lines.append("Product,Status,Actual Signups,Threshold,Stripe Success %,Threshold %")
    for product, gate_data in decision_summary.get("day_3_gate", {}).items():
        lines.append(
            f"{product},"
            f"{gate_data['status']},"
            f"{gate_data['actual_signups']},"
            f"{gate_data['threshold_signups']},"
            f"{gate_data['actual_stripe_success']},"
            f"{gate_data['threshold_stripe_success']}"
        )
    lines.append("")

    # Daily metrics section
    lines.append("## Daily Signup Counts")
    lines.append("Product,Date,Signup Count")
    for product_data in dashboard_data.get("signups", {}).get("data", []):
        product = dashboard_data.get("product", "unknown")
        date = product_data.get("date", "")
        count = product_data.get("signup_count", 0)
        lines.append(f"{product},{date},{count}")
    lines.append("")

    # Stripe funnel section
    lines.append("## Stripe Payment Funnel")
    lines.append("Product,Date,Checkouts Initiated,Successful Payments,Success Rate %")
    for product_data in dashboard_data.get("funnel", {}).get("data", []):
        product = dashboard_data.get("product", "unknown")
        date = product_data.get("date", "")
        initiated = product_data.get("checkouts_initiated", 0)
        successful = product_data.get("payments_successful", 0)
        rate = product_data.get("success_rate_pct", 0)
        lines.append(f"{product},{date},{initiated},{successful},{rate}")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Moltcorp Day 1-7 Measurement Dashboard")
    parser.add_argument("--output", choices=["json", "csv"], default="json", help="Output format")
    parser.add_argument("--products", default=",".join(PRODUCTS.keys()), help="Comma-separated products to query")
    args = parser.parse_args()

    products_to_query = args.products.split(",")
    dashboard_data = {}

    for product in products_to_query:
        conn = get_db_connection(product)
        if not conn:
            continue

        try:
            dashboard_data[product] = {
                "signups": get_daily_signups(conn, product),
                "funnel": get_stripe_funnel(conn, product),
                "cohort": get_cohort_metrics(conn, product),
            }
        finally:
            conn.close()

    # Flatten for decision summary
    flat_data = []
    for product, data in dashboard_data.items():
        flat_data.append({
            "product": product,
            "signups": data["signups"],
            "funnel": data["funnel"],
        })

    decision_summary = generate_decision_summary(flat_data)

    if args.output == "json":
        print(output_json({"products": dashboard_data}, decision_summary))
    else:
        print(output_csv({"products": dashboard_data}, decision_summary))


if __name__ == "__main__":
    main()
