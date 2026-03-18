"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetUrl, setResetUrl] = useState("");
  const [done, setDone] = useState(false);

  async function handleRequestReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setResetUrl("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setMessage(data.message);
      if (data.resetUrl) {
        setResetUrl(data.resetUrl);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setDone(true);
      setMessage("Password updated successfully!");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-8 block text-center text-xl font-bold tracking-tight"
        >
          <span className="text-emerald-600">Q</span>dot
        </Link>

        {token ? (
          // Step 2: Set new password
          <>
            <h1 className="text-center text-2xl font-bold text-zinc-900">
              Set new password
            </h1>
            <p className="mt-2 text-center text-sm text-zinc-500">
              Enter your new password below
            </p>

            {done ? (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {message}
                </div>
                <Link
                  href="/login"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Sign in with your new password
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleResetPassword}
                className="mt-8 flex flex-col gap-4"
              >
                {error && (
                  <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-700"
                  >
                    New password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    placeholder="At least 6 characters"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-zinc-700"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass}
                    placeholder="Repeat your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update password"}
                </button>
              </form>
            )}
          </>
        ) : (
          // Step 1: Request reset
          <>
            <h1 className="text-center text-2xl font-bold text-zinc-900">
              Reset password
            </h1>
            <p className="mt-2 text-center text-sm text-zinc-500">
              Enter your email to get a reset link
            </p>

            <form
              onSubmit={handleRequestReset}
              className="mt-8 flex flex-col gap-4"
            >
              {error && (
                <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {message && (
                <div className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {message}
                </div>
              )}

              {resetUrl && (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <p className="text-xs font-medium text-emerald-800">
                    Reset link (no email infra yet):
                  </p>
                  <a
                    href={resetUrl}
                    className="mt-1 block text-sm font-medium text-emerald-600 underline break-all"
                  >
                    Click here to reset your password
                  </a>
                </div>
              )}

              {!resetUrl && (
                <>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-zinc-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send reset link"}
                  </button>
                </>
              )}
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-zinc-500">
          <Link
            href="/login"
            className="font-medium text-emerald-600 hover:text-emerald-700"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
