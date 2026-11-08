"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authClient, friendlyAuthError } from "@/lib/auth-client";
import SocialLogin from "@/components/auth/SocialLogin";

// useSearchParams ব্যবহারের জন্য Next একটি Suspense boundary চায়।
export default function SignInPage() {
  return (
    <Suspense fallback={<SignInFallback />}>
      <SignInView />
    </Suspense>
  );
}

function SignInFallback() {
  return (
    <main className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-gradient-to-b from-[#f4fbf6] to-page px-4 py-10">
      <div className="skeleton h-[32rem] w-full max-w-md rounded-2xl" />
    </main>
  );
}

function SignInView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // নতুন অ্যাকাউন্ট নিয়ে signup থেকে আসা ইউজারকে নিশ্চিত করানো হয়।
  const justRegistered = searchParams.get("registered") === "true";

  // শুধু নিজ সাইটের path-এ redirect করা হবে (external URL ব্লক)।
  const requestedCallback = searchParams.get("callbackURL") || "/";
  const callbackURL =
    requestedCallback.startsWith("/") && !requestedCallback.startsWith("//")
      ? requestedCallback
      : "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // signup থেকে আসা নতুন ইউজারকে দেখানো নিশ্চিতকরণ বার্তা।
  const notice = justRegistered
    ? "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এখন লগইন করুন।"
    : "";

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

    if (!form.email.trim() || !form.password) {
      const message = "ইমেইল ও পাসওয়ার্ড লিখুন।";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: form.email.trim(),
        password: form.password,
        callbackURL,
      });

      if (result?.error) {
        // ব্যর্থ হলে শুধু এরর দেখানো হয় — কোনো রিডাইরেক্ট করা হয় না।
        const message =
          friendlyAuthError(result.error.message) ||
          "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।";
        setError(message);
        toast.error(message);
        return;
      }

      // সফল হলে হোম পেজে (বা callbackURL-এ) নিয়ে যাওয়া হয়।
      toast.success("সফলভাবে সাইন ইন হয়েছেন!");
      router.push(callbackURL);
      router.refresh();
    } catch {
      const message = "সাইন ইন করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন।";
      setError(message);
      toast.error(message);
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
            সাইন ইন করুন
          </h2>

          <p className="mt-1.5 text-sm text-gray-500">
            আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="signin-email"
              className="mb-1.5 block text-sm font-semibold text-gray-800"
            >
              ইমেইল
            </label>

            <input
              id="signin-email"
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
              htmlFor="signin-password"
              className="mb-1.5 block text-sm font-semibold text-gray-800"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="signin-password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              value={form.password}
              onChange={handleChange}
              required
              className="field-input"
            />
          </div>

          {notice && (
            <p
              role="status"
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700"
            >
              {notice}
            </p>
          )}

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
                প্রবেশ করা হচ্ছে...
              </>
            ) : (
              "সাইন ইন করুন"
            )}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-line" />
          <span className="text-xs text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-line" />
        </div>

        <SocialLogin />

        <p className="mt-5 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-bold text-brand underline-offset-4 hover:text-brand-dark hover:underline"
          >
            নিবন্ধন করুন
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
