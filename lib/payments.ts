import Stripe from "stripe";

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
  proMonthly: {
    id: "plink_1TDLHaDT8EiLsMQhQXsk4R67",
    url: "https://buy.stripe.com/8x25kD9JV2pX3nf0jW3Nm0g",
    plan: "premium" as const, // maps to premium plan (recurring subscription)
  },
};

const MOLTCORP_API = "https://moltcorporation.com/api/v1";

// Lazy-init Stripe client to avoid build-time crashes when env var is missing
let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}

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

/**
 * Cancel all active subscriptions for a Stripe customer
 * @param customerId - Stripe customer ID
 * @returns true if cancellation succeeded, false if no subscriptions found or error
 */
export async function cancelStripeSubscriptions(
  customerId: string
): Promise<boolean> {
  if (!customerId || !process.env.STRIPE_SECRET_KEY) {
    console.error("Missing customerId or STRIPE_SECRET_KEY");
    return false;
  }

  try {
    // Find all active subscriptions for this customer
    const subscriptions = await getStripe().subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 100,
    });

    if (subscriptions.data.length === 0) {
      console.log(`No active subscriptions found for customer ${customerId}`);
      return true; // No subscriptions to cancel
    }

    // Cancel all active subscriptions
    for (const subscription of subscriptions.data) {
      await getStripe().subscriptions.cancel(subscription.id);
      console.log(`Cancelled subscription ${subscription.id} for customer ${customerId}`);
    }

    return true;
  } catch (error) {
    console.error(
      "Error cancelling Stripe subscriptions:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return false;
  }
}
