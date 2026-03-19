import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | OneQR",
  description:
    "OneQR privacy policy — how we collect, use, and protect your data when you generate QR codes and use scan analytics.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-emerald-400 hover:text-emerald-300"
        >
          &larr; Back to OneQR
        </Link>

        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Last updated: March 19, 2026
        </p>

        <div className="mt-8 space-y-8 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white">
              1. Information We Collect
            </h2>

            <h3 className="mt-4 font-medium text-white">
              Account Information
            </h3>
            <p className="mt-1">
              When you create an account, we collect your email address and
              password (stored in hashed form). Account creation is optional
              &mdash; free QR code generation does not require an account.
            </p>

            <h3 className="mt-4 font-medium text-white">
              QR Code Content
            </h3>
            <p className="mt-1">
              We store the URLs, WiFi network details, or other content you
              encode in QR codes. For dynamic QR codes (Pro tier), this content
              is stored so you can update destinations without reprinting.
            </p>

            <h3 className="mt-4 font-medium text-white">
              Scan Analytics
            </h3>
            <p className="mt-1">
              For Pro and Premium QR codes, we collect scan data including
              approximate location (city/country level from IP address), device
              type, browser, and timestamp. This data is used to provide scan
              analytics in your dashboard.
            </p>

            <h3 className="mt-4 font-medium text-white">
              Payment Information
            </h3>
            <p className="mt-1">
              Payment processing is handled by Stripe. We do not store credit
              card numbers. We receive confirmation of payment status and
              subscription details from Stripe.
            </p>

            <h3 className="mt-4 font-medium text-white">Usage Data</h3>
            <p className="mt-1">
              We automatically collect basic usage data such as pages visited,
              browser type, and IP address to improve the service and diagnose
              issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. How We Use Your Information
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                To generate, store, and serve your QR codes.
              </li>
              <li>
                To provide scan analytics for Pro and Premium QR codes.
              </li>
              <li>
                To process payments through our payment provider (Stripe).
              </li>
              <li>
                To send transactional emails (account verification, password
                resets, purchase confirmations).
              </li>
              <li>To improve the service based on usage patterns.</li>
              <li>
                To enforce our{" "}
                <Link
                  href="/terms"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  Terms of Service
                </Link>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. How We Share Your Information
            </h2>
            <p className="mt-2">
              We do not sell your personal information. We share data only in
              these cases:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong className="text-white">QR code scans:</strong> When
                someone scans your QR code, they are redirected to the
                destination URL you set. The scanner&apos;s device information is
                collected for your analytics dashboard.
              </li>
              <li>
                <strong className="text-white">Payment processing:</strong> We
                share necessary payment information with Stripe to process
                purchases.
              </li>
              <li>
                <strong className="text-white">Legal requirements:</strong> We
                may disclose information if required by law or to protect the
                rights and safety of our users.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Data Retention
            </h2>
            <p className="mt-2">
              We retain your account data and QR codes for as long as your
              account is active. Free QR codes generated without an account are
              not stored. If you delete your account, we will delete your
              personal data within 30 days, except where retention is required by
              law or for legitimate business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. Data Security
            </h2>
            <p className="mt-2">
              We use industry-standard security measures to protect your data,
              including encrypted connections (HTTPS), hashed passwords, and
              secure database hosting. However, no method of transmission or
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. Your Rights
            </h2>
            <p className="mt-2">You have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>
                Request deletion of your account and associated data.
              </li>
              <li>Export your QR code data.</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, use the{" "}
              <Link
                href="/feedback"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                feedback form
              </Link>{" "}
              or contact us through your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Cookies
            </h2>
            <p className="mt-2">
              We use essential cookies to maintain your login session and
              remember your preferences. We do not use third-party advertising or
              tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              8. Children&apos;s Privacy
            </h2>
            <p className="mt-2">
              OneQR is not intended for use by anyone under the age of 13. We
              do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              9. Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this policy from time to time. We will notify you of
              material changes via email or through the service. Continued use
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              10. Contact
            </h2>
            <p className="mt-2">
              Questions about this policy? Use the{" "}
              <Link
                href="/feedback"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                feedback form
              </Link>{" "}
              to reach us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
