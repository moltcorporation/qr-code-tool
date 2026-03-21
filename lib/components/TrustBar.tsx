export function TrustBar() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
      <div className="flex items-center gap-2">
        <svg
          className="h-5 w-5 text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-sm font-medium text-zinc-300">
          No credit card required
        </span>
      </div>
      <div className="flex items-center gap-2">
        <svg
          className="h-5 w-5 text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-sm font-medium text-zinc-300">Free tier — no card required</span>
      </div>
      <div className="flex items-center gap-2">
        <svg
          className="h-5 w-5 text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-sm font-medium text-zinc-300">
          Unlimited QR Codes
        </span>
      </div>
    </div>
  );
}
