"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const callbackURL = searchParams.get("callbackURL") || "/";

      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL,
      });

      if (result?.error) {
        setError(result.error.message || "লগইন করা যায়নি। তথ্যগুলো যাচাই করুন।");
        return;
      }

      router.push(callbackURL);
      router.refresh();
    } catch (err) {
      setError(err?.message || "সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div role="alert" className="alert alert-error text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="signin-email" className="mb-1.5 block text-sm font-semibold text-ink">
          ইমেইল
        </label>
        <input
          id="signin-email"
          type="email"
          autoComplete="email"
          placeholder="আপনার ইমেইল লিখুন"
          className="input input-bordered w-full"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="signin-password" className="mb-1.5 block text-sm font-semibold text-ink">
          পাসওয়ার্ড
        </label>
        <input
          id="signin-password"
          type="password"
          autoComplete="current-password"
          placeholder="আপনার পাসওয়ার্ড লিখুন"
          className="input input-bordered w-full"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-success w-full text-white"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm" />
            লগইন হচ্ছে...
          </>
        ) : (
          "লগইন করুন"
        )}
      </button>

      <p className="text-center text-sm text-muted">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-emerald-700 hover:underline">
          নিবন্ধন করুন
        </Link>
      </p>
    </form>
  );
}