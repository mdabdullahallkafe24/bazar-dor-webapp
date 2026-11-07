"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("সবগুলো ঘর পূরণ করুন।");
      return;
    }

    if (form.password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      if (result?.error) {
        setError(
          result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-gradient-to-b from-[#f4fbf6] to-page px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-lg shadow-emerald-900/5 sm:p-8">
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-2xl text-white shadow-sm shadow-emerald-600/30"
            aria-label="বাজার দর হোম"
          >
            🛒
          </Link>

          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
            বাজার দর
          </h1>

          <h2 className="mt-3 text-lg font-bold text-gray-800">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h2>

          <p className="mt-1.5 text-sm text-gray-500">
            বাজারদর জানতে আপনার অ্যাকাউন্ট খুলুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="signup-name"
              className="mb-1.5 block text-sm font-semibold text-gray-800"
            >
              আপনার নাম
            </label>

            <input
              id="signup-name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="আপনার নাম লিখুন"
              value={form.name}
              onChange={handleChange}
              required
              className="field-input"
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="mb-1.5 block text-sm font-semibold text-gray-800"
            >
              ইমেইল
            </label>

            <input
              id="signup-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="আপনার ইমেইল লিখুন"
              value={form.email}
              onChange={handleChange}
              required
              className="field-input"
            />
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="mb-1.5 block text-sm font-semibold text-gray-800"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="signup-password"
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="কমপক্ষে ৮ অক্ষর লিখুন"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              required
              className="field-input"
            />
          </div>

          <div>
            <label
              htmlFor="signup-confirm-password"
              className="mb-1.5 block text-sm font-semibold text-gray-800"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <input
              id="signup-confirm-password"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="পাসওয়ার্ড আবার লিখুন"
              value={form.confirmPassword}
              onChange={handleChange}
              minLength={8}
              required
              className="field-input"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="brand-button w-full"
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
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-line" />
          <span className="text-xs text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-line" />
        </div>

        <p className="text-center text-sm text-gray-600">
          নিবন্ধন করে আপনি আমাদের সেবা ব্যবহারে সম্মত হচ্ছেন।
        </p>

        <p className="mt-3 text-center text-sm text-gray-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-bold text-brand underline-offset-4 hover:text-brand-dark hover:underline"
          >
            লগইন করুন
          </Link>
        </p>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition-colors hover:text-brand"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </section>
    </main>
  );
}
