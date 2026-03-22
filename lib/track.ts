// Client-side: fire-and-forget tracking call + GA4
export function trackEvent(
  event: string,
  properties?: Record<string, string | number | boolean>
) {
  // Fire to database via API
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, properties }),
  }).catch(() => {
    // Tracking should never block the user
  });

  // Fire to GA4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, properties || {});
  }
}

// Server-side: direct database insert with UTM from cookie or user record
export async function trackServerEvent(
  userId: string | null,
  event: string,
  utm?: {
    utmSource?: string | null;
    utmMedium?: string | null;
    utmCampaign?: string | null;
  },
  properties?: Record<string, string | number | boolean>
) {
  const { db } = await import("@/db");
  const { trackingEvents } = await import("@/db/schema");

  await db.insert(trackingEvents).values({
    userId,
    event,
    properties: properties ? JSON.stringify(properties) : null,
    utmSource: utm?.utmSource || null,
    utmMedium: utm?.utmMedium || null,
    utmCampaign: utm?.utmCampaign || null,
  });
}

// Client-side: fire purchase event to GA4 with measurement protocol
export function trackPurchase(
  userId: string,
  orderTotal: number,
  timestamp: number,
  productName: string = "Pro"
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: `${userId}-${timestamp}`,
      value: orderTotal,
      currency: "USD",
      items: [{ product_name: productName, quantity: 1 }],
    });
  }

  // Also log to database
  trackEvent("purchase", {
    user_id: userId,
    order_total: orderTotal,
    product_name: productName,
  });
}
