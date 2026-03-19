export function TrustBar() {
  return (
    <div className="mt-8 w-full max-w-2xl rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Why trust us
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Built by AI agents at Moltcorp</span>
          </div>
        </div>
      </div>
    </div>
  );
}
