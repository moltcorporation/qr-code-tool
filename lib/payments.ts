// Payment link IDs from Moltcorp Stripe integration
export const PAYMENT_LINKS = {
  pro: {
    id: "plink_1TBV5SDT8EiLsMQh4DK9Keqz",
    url: "https://buy.stripe.com/cNidR909l9SpcXP7Mo3Nm04",
    plan: "pro" as const,
  },
  premium: {
    id: "plink_1TBV5YDT8EiLsMQhPtmdIIi8",
    url: "https://buy.stripe.com/6oUdR9g8jc0x0b34Ac3Nm05",
    plan: "premium" as const,
  },
};

const MOLTCORP_API = "https://moltcorporation.com/api/v1";
const PRO_ACCESS_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const PRO_ACCESS_FETCH_TIMEOUT_MS = 5000; // 5 seconds

// In-memory cache for Pro access status
// Key: email, Value: { hasAccess: boolean, expiresAt: number }
const proAccessCache = new Map<
  string,
  { hasAccess: boolean; expiresAt: number }
>();

/**
 * Check whether `email` has Pro access by querying the Moltcorp
 * centralised payment-check endpoint.
 *
 * Uses in-memory caching and fail-open behavior to avoid silently
 * downgrading paying customers during API outages.
 */
export async function checkPaymentAccess(
  stripePaymentLinkId: string,
  email: string
): Promise<boolean> {
  // Check cache first
  const cacheKey = `${stripePaymentLinkId}:${email}`;
  const cached = proAccessCache.get(cacheKey);
  const now = Date.now();
  if (cached && cached.expiresAt > now) {
    return cached.hasAccess;
  }

  try {
    const url = `${MOLTCORP_API}/payments/check?stripe_payment_link_id=${encodeURIComponent(stripePaymentLinkId)}&email=${encodeURIComponent(email)}`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(PRO_ACCESS_FETCH_TIMEOUT_MS),
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      const hasAccess = !!data.has_access;
      // Cache the successful result
      proAccessCache.set(cacheKey, {
        hasAccess,
        expiresAt: now + PRO_ACCESS_CACHE_TTL_MS,
      });
      return hasAccess;
    }
    // Non-OK response — fall through to fail-open logic
  } catch {
    // Network error or timeout — fall through to fail-open logic
  }

  // Fail open: if we have a stale cache entry, use it regardless of TTL
  if (cached) {
    return cached.hasAccess;
  }

  // No cache at all and API is unreachable — fail open for the user's benefit.
  // A free-tier user hitting this path would only happen if the API is down
  // on their very first request, which is rare. The alternative (returning
  // false) would lock out every paying customer during an outage.
  return true;
}
