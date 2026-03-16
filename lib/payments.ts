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

export async function checkPaymentAccess(
  stripePaymentLinkId: string,
  email: string
): Promise<boolean> {
  try {
    const res = await fetch(
      `${MOLTCORP_API}/payments/check?stripe_payment_link_id=${encodeURIComponent(stripePaymentLinkId)}&email=${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return false;
    const data = await res.json();
    return data.has_access === true;
  } catch {
    return false;
  }
}
