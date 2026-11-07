"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setError("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      router.push("/signin?registered=true");
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
        <label htmlFor="signup-name" className="mb-1.5 block text-sm font-semibold text-ink">
          আপনার নাম
        </label>
        <input
          id="signup-name"
          type="text"
          autoComplete="name"
          placeholder="আপনার পুরো নাম"
          className="input input-bordered w-full"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="signup-email" className="mb-1.5 block text-sm font-semibold text-ink">
          ইমেইল
        </label>
        <input
          id="signup-email"
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
        <label htmlFor="signup-password" className="mb-1.5 block text-sm font-semibold text-ink">
          পাসওয়ার্ড
        </label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          className="input input-bordered w-full"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={8}
          required
        />
      </div>

      <div>
        <label htmlFor="signup-confirm-password" className="mb-1.5 block text-sm font-semibold text-ink">
          পাসওয়ার্ড নিশ্চিত করুন
        </label>
        <input
          id="signup-confirm-password"
          type="password"
          autoComplete="new-password"
          placeholder="আবার পাসওয়ার্ড লিখুন"
          className="input input-bordered w-full"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          minLength={8}
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
            অ্যাকাউন্ট তৈরি হচ্ছে...
          </>
        ) : (
          "অ্যাকাউন্ট তৈরি করুন"
        )}
      </button>

      <p className="text-center text-sm text-muted">
        নিবন্ধন করে আপনি আমাদের সেবা ব্যবহারে সম্মত হচ্ছেন।
      </p>

      <p className="text-center text-sm text-muted">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-emerald-700 hover:underline">
          লগইন করুন
        </Link>
      </p>
    </form>
  );
}