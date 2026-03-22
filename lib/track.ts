// Client-side: fire-and-forget tracking call
export function trackEvent(
  event: string,
  properties?: Record<string, string | number | boolean>
) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, properties }),
  }).catch(() => {
    // Tracking should never block the user
  });
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
  const { sendToGA4 } = await import("@/lib/ga4");

  // Log to database
  await db.insert(trackingEvents).values({
    userId,
    event,
    properties: properties ? JSON.stringify(properties) : null,
    utmSource: utm?.utmSource || null,
    utmMedium: utm?.utmMedium || null,
    utmCampaign: utm?.utmCampaign || null,
  });

  // Send to GA4 (fire-and-forget)
  await sendToGA4({
    event_type: event,
    user_id: userId || undefined,
    timestamp: Date.now(),
    product_name: "OneQR",
    utm_source: utm?.utmSource,
    utm_medium: utm?.utmMedium,
    utm_campaign: utm?.utmCampaign,
    ...properties,
  });
}
