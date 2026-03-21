import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | OneQR",
  description:
    "OneQR terms of service — acceptable use, accounts, payments, and liability for our QR code generation and analytics platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-emerald-400 hover:text-emerald-300"
        >
          &larr; Back to OneQR
        </Link>

        <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Last updated: March 21, 2026
        </p>

        <div className="mt-8 space-y-8 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2">
              By creating an account or using OneQR, you agree to these Terms of
              Service. If you do not agree, do not use the service. OneQR is
              operated by Moltcorp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. Description of Service
            </h2>
            <p className="mt-2">
              OneQR provides QR code generation for URLs and WiFi networks. The
              service includes a free tier for static QR codes and paid tiers
              (Starter and Pro) offering dynamic QR codes, scan analytics, and
              additional features.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. Account Responsibilities
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                You must provide accurate information when creating your account.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                login credentials.
              </li>
              <li>
                You are responsible for all activity that occurs under your
                account.
              </li>
              <li>
                You must be at least 13 years old to create an account.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Acceptable Use
            </h2>
            <p className="mt-2">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Use the service for any unlawful purpose.</li>
              <li>
                Generate QR codes that link to malicious, fraudulent, or
                deceptive content.
              </li>
              <li>
                Use QR codes for phishing, malware distribution, or any form of
                fraud.
              </li>
              <li>
                Attempt to interfere with or disrupt the service or its
                infrastructure.
              </li>
              <li>
                Resell or redistribute access to the service without
                authorization.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. QR Code Content
            </h2>
            <p className="mt-2">
              You retain ownership of all content you encode in QR codes. By
              using OneQR, you grant us a license to store and serve this content
              as necessary to provide the service, including redirecting scanners
              to your destination URLs. See our{" "}
              <Link
                href="/privacy"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                Privacy Policy
              </Link>{" "}
              for details on how we handle personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. Payments
            </h2>
            <p className="mt-2">
              Starter access is available as a one-time purchase of $9.99. Pro
              plans are billed monthly at $7.00/month. You may cancel Pro at
              any time; your access continues until the end of the current
              billing period. Refunds are not provided for partial billing
              periods or one-time purchases after 7 days. OneQR reserves the
              right to change pricing with 30 days&apos; notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Free Tier
            </h2>
            <p className="mt-2">
              Free QR codes are static and do not require an account. Free QR
              codes may include a &ldquo;Made with OneQR&rdquo; watermark. Free
              tier features may change at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              8. Account Termination
            </h2>
            <p className="mt-2">
              You may delete your account at any time through your account
              settings. We may suspend or terminate your account if you violate
              these terms or engage in abusive behavior. Upon termination, your
              QR codes will stop redirecting and your data will be deleted in
              accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              9. Limitation of Liability
            </h2>
            <p className="mt-2">
              OneQR is provided &quot;as is&quot; without warranties of any kind.
              To the maximum extent permitted by law, Moltcorp shall not be
              liable for any indirect, incidental, special, or consequential
              damages arising from your use of the service, including but not
              limited to lost profits, data loss, or business interruption.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              10. Changes to Terms
            </h2>
            <p className="mt-2">
              We may update these terms from time to time. We will notify you of
              material changes via email or through the service. Continued use
              after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              11. Contact
            </h2>
            <p className="mt-2">
              Questions about these terms? Use the{" "}
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
