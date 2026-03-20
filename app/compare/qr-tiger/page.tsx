import Link from "next/link";

const comparisonRows = [
  { feature: "Pricing (basic)", oneqr: "Free (static) / $9.99 one-time (dynamic)", competitor: "$7/mo (Starter)" },
  { feature: "Pricing (advanced)", oneqr: "$9.99 one-time (Pro)", competitor: "$37/mo (Advanced)" },
  { feature: "Static QR codes", oneqr: "Unlimited, free forever", competitor: "Limited on free tier" },
  { feature: "Dynamic QR codes", oneqr: "$9.99 one-time unlock", competitor: "Monthly subscription required" },
  { feature: "WiFi QR", oneqr: "Free", competitor: "Available on paid plans" },
  { feature: "Scan analytics", oneqr: "Included with Pro ($9.99 one-time)", competitor: "Monthly subscription tiers" },
  { feature: "Custom colors", oneqr: "Free", competitor: "Paid plans" },
  { feature: "Bulk generation", oneqr: "Included with Pro ($9.99)", competitor: "Higher-tier plans" },
  { feature: "Setup", oneqr: "No signup for static, instant", competitor: "Account required" },
];

const faqs = [
  {
    question: "Is OneQR really free compared to QR TIGER?",
    answer:
      "Yes. OneQR offers unlimited static QR codes for free with no signup. QR TIGER limits free-tier QR codes and requires an account.",
  },
  {
    question: "How does OneQR's one-time pricing compare to QR TIGER's subscription?",
    answer:
      "OneQR Pro is a one-time $9.99 payment for dynamic QR codes and analytics. QR TIGER charges $7-37/mo depending on the plan, which adds up to $84-444/year.",
  },
  {
    question: "Does QR TIGER offer features that OneQR doesn't?",
    answer:
      "Yes. QR TIGER supports more QR code types like vCard, app store links, and social media codes. QR TIGER also has a longer track record and larger template library. OneQR focuses on simplicity and affordability for URL and WiFi QR codes.",
  },
  {
    question: "Can I switch from QR TIGER to OneQR?",
    answer:
      "You can start using OneQR immediately for new QR codes — no migration needed. Static codes work instantly with no signup. For dynamic codes, you'll need OneQR Pro ($9.99 one-time).",
  },
];

export default function QrTigerComparePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold tracking-tight">OneQR</Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-zinc-600 hover:text-zinc-900">Pricing</Link>
            <Link href="/" className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">Generate QR free</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          QR TIGER Alternative — One-Time QR Code Generator
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600">
          QR TIGER charges $7-37/mo for dynamic QR codes. OneQR gives you unlimited static codes
          for free and dynamic codes for a one-time $9.99 payment. No monthly bills.
        </p>
      </section>

      {/* Honest comparison */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h2 className="text-2xl font-bold tracking-tight text-center">
          OneQR vs QR TIGER — Honest Comparison
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600">
          Both tools generate QR codes, but they take very different approaches to pricing and features.
        </p>

        {/* Comparison table */}
        <div className="mt-10 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-zinc-200">
                <th className="py-3 pr-4 text-left font-semibold text-zinc-900">Feature</th>
                <th className="px-4 py-3 text-left font-semibold text-emerald-600">OneQR</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-500">QR TIGER</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b border-zinc-100">
                  <td className="py-3 pr-4 font-medium text-zinc-900">{row.feature}</td>
                  <td className="px-4 py-3 text-zinc-700">{row.oneqr}</td>
                  <td className="px-4 py-3 text-zinc-500">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* When to use cards */}
      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-white p-8">
              <h3 className="text-lg font-semibold text-emerald-600">When to use OneQR</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  You need simple URL or WiFi QR codes
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  You want to avoid monthly subscriptions
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  You want instant generation with no account
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Budget is a priority — pay once, not monthly
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-8">
              <h3 className="text-lg font-semibold text-zinc-700">When to use QR TIGER</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  You need vCard, app store, or social media QR types
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  You want a wide range of QR code templates
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  You prefer an established brand with a longer track record
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  You need advanced QR code customization (shapes, eyes, frames)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Frequently asked questions
        </h2>
        <dl className="mt-12 space-y-8">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-semibold text-zinc-900">{faq.question}</dt>
              <dd className="mt-2 text-sm text-zinc-600">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Start generating QR codes
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-600">
            Free static QR codes, no signup. Dynamic codes for a one-time $9.99.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-md bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Generate QR codes free
          </Link>
        </div>
      </section>

      {/* Cross-links */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-zinc-400">
          More comparisons
        </h3>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/compare/uniqode" className="rounded-md border border-zinc-200 px-4 py-2 text-sm text-zinc-600 hover:border-zinc-300 hover:text-zinc-900">
            OneQR vs Uniqode
          </Link>
          <Link href="/compare/bitly-qr" className="rounded-md border border-zinc-200 px-4 py-2 text-sm text-zinc-600 hover:border-zinc-300 hover:text-zinc-900">
            OneQR vs Bitly QR
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-950 text-zinc-400">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Moltcorp Products
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <span className="text-white font-medium">OneQR</span>{" "}
                  <span className="text-zinc-600">— QR Code Generator</span>
                </li>
                <li>
                  <a href="https://statusping-moltcorporation.vercel.app?utm_source=oneqr&utm_medium=footer" className="hover:text-white">StatusPing</a>
                </li>
                <li>
                  <a href="https://federal-contract-tracker-moltcorporation.vercel.app?utm_source=oneqr&utm_medium=footer" className="hover:text-white">GovScout</a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Legal</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div className="text-sm sm:text-right">
              <p className="text-zinc-500">
                Built by agents at{" "}
                <a href="https://moltcorporation.com" className="text-zinc-300 hover:text-white">Moltcorp</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
