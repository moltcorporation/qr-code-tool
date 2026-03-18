import Link from "next/link";

const comparisonRows = [
  { feature: "QR code pricing", oneqr: "Free / $9.99 one-time", competitor: "$35+/mo (bundled with link shortener)" },
  { feature: "Standalone QR tool", oneqr: "Yes — dedicated QR generator", competitor: "QR is add-on to link shortening" },
  { feature: "Static QR", oneqr: "Unlimited, free", competitor: "Limited on free" },
  { feature: "Dynamic QR", oneqr: "$9.99 one-time", competitor: "$35+/mo subscription" },
  { feature: "Link shortener", oneqr: "Not included", competitor: "Core product" },
  { feature: "Scan analytics", oneqr: "Pro tier", competitor: "All paid plans" },
  { feature: "Custom domains", oneqr: "Not yet", competitor: "Available" },
  { feature: "Setup", oneqr: "Instant, no account", competitor: "Account required" },
];

const faqs = [
  {
    question: "Why is Bitly so expensive for QR codes?",
    answer:
      "Bitly is primarily a link shortening platform. QR codes are bundled into their paid plans starting at $35/mo. You're paying for the full link management suite, not just QR codes. If you only need QR codes, OneQR is significantly cheaper.",
  },
  {
    question: "Does Bitly offer anything OneQR doesn't?",
    answer:
      "Yes. Bitly includes a powerful link shortener, custom branded domains, and deep link analytics across both shortened URLs and QR codes. If you need both link shortening and QR codes in one platform, Bitly may be worth the cost.",
  },
  {
    question: "Can I use OneQR alongside Bitly?",
    answer:
      "Absolutely. Many users use Bitly for link shortening and OneQR for QR codes. You can generate a Bitly short link and paste it into OneQR to create a QR code — getting the best of both tools.",
  },
  {
    question: "How much would I save switching from Bitly to OneQR for QR codes?",
    answer:
      "Bitly's cheapest plan with QR codes is $35/mo ($420/year). OneQR Pro is $9.99 one-time. That's a savings of over $410 in the first year alone, and $420/year every year after.",
  },
];

export default function BitlyQrComparePage() {
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
          Bitly QR Alternative — One-Time QR Code Generator
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600">
          Bitly charges $35+/mo for QR codes bundled with link shortening. If you just need QR codes,
          OneQR gives you unlimited static codes for free and dynamic codes for $9.99 one-time.
        </p>
      </section>

      {/* Honest comparison */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h2 className="text-2xl font-bold tracking-tight text-center">
          OneQR vs Bitly — Honest Comparison
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600">
          Bitly is primarily a link shortener with QR as an add-on. If you need both, Bitly may be
          worth it. If you just need QR codes, OneQR is far cheaper.
        </p>

        {/* Comparison table */}
        <div className="mt-10 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-zinc-200">
                <th className="py-3 pr-4 text-left font-semibold text-zinc-900">Feature</th>
                <th className="px-4 py-3 text-left font-semibold text-emerald-600">OneQR</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-500">Bitly</th>
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
                  You only need QR codes, not link shortening
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  You want to avoid $35+/mo for a feature you can get for $9.99 once
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  You want instant QR generation with no account
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  You want a dedicated QR tool, not a link management suite
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-8">
              <h3 className="text-lg font-semibold text-zinc-700">When to use Bitly</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  You need link shortening and QR codes in one platform
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  You want custom branded short domains (e.g., yourbrand.link)
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  You need unified analytics across links and QR codes
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Your team already uses Bitly for link management
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
          <Link href="/compare/qr-tiger" className="rounded-md border border-zinc-200 px-4 py-2 text-sm text-zinc-600 hover:border-zinc-300 hover:text-zinc-900">
            OneQR vs QR TIGER
          </Link>
          <Link href="/compare/uniqode" className="rounded-md border border-zinc-200 px-4 py-2 text-sm text-zinc-600 hover:border-zinc-300 hover:text-zinc-900">
            OneQR vs Uniqode
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
                  <a href="https://statuspinghq.com" className="hover:text-white">StatusPing</a>
                </li>
                <li>
                  <a href="https://federalcontracttracker.com" className="hover:text-white">GovScout</a>
                </li>
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
