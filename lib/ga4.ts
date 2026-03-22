/**
 * GA4 Measurement Protocol client for server-side event tracking
 * Sends conversion events to Google Analytics 4
 */

const GA4_ENDPOINT = "https://www.google-analytics.com/mp/collect";

export interface GA4EventPayload {
  event_type:
    | "signup"
    | "profile_created"
    | "checkout_initiated"
    | "purchase"
    | string;
  user_id?: string;
  timestamp?: number; // milliseconds
  product_name?: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  [key: string]: any;
}

/**
 * Send a conversion event to GA4 via Measurement Protocol
 * Fire-and-forget: errors are logged but don't block execution
 */
export async function sendToGA4(event: GA4EventPayload): Promise<void> {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  // Skip if GA4 not configured
  if (!measurementId || !apiSecret) {
    console.warn(
      "[GA4] Measurement ID or API secret not configured, skipping GA4 event"
    );
    return;
  }

  try {
    // GA4 Measurement Protocol payload structure
    const payload = {
      client_id: event.user_id || "anonymous", // GA4 requires a client_id
      timestamp_micros: (event.timestamp || Date.now()) * 1000, // Convert ms to microseconds
      events: [
        {
          name: event.event_type,
          params: {
            product_name: event.product_name,
            utm_source: event.utm_source,
            utm_medium: event.utm_medium,
            utm_campaign: event.utm_campaign,
            // Include all other event properties
            ...Object.entries(event).reduce(
              (acc, [key, value]) => {
                if (
                  ![
                    "event_type",
                    "user_id",
                    "timestamp",
                    "product_name",
                    "utm_source",
                    "utm_medium",
                    "utm_campaign",
                  ].includes(key) &&
                  value != null
                ) {
                  acc[key] = value;
                }
                return acc;
              },
              {} as Record<string, any>
            ),
          },
        },
      ],
    };

    // Send to GA4
    const response = await fetch(
      `${GA4_ENDPOINT}?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      console.error(
        `[GA4] Error sending event: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    // Never block on GA4 errors
    console.error("[GA4] Failed to send event:", error);
  }
}
