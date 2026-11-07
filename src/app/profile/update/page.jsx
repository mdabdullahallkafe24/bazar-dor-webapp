"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    // input uncontrolled — session থেকে defaultValue আসে, তাই আলাদা
    // effect দিয়ে state sync করার প্রয়োজন নেই।
    const formData = new FormData(event.currentTarget);
    const nextName = String(formData.get("name") ?? "").trim();

    if (!nextName) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: nextName,
      });

      if (result?.error) {
        setError(result.error.message || "তথ্য আপডেট করা যায়নি।");
        return;
      }

      setSuccess("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch {
      setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  if (isPending) {
    return (
      <main className="site-container py-12">
        <div className="skeleton mx-auto h-56 max-w-xl rounded-2xl" />
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="site-container flex min-h-[55vh] flex-col items-center justify-center py-16 text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-3xl"
          aria-hidden="true"
        >
          🔒
        </div>
        <p className="mt-4 text-lg font-bold text-ink">
          এই পৃষ্ঠা দেখতে আগে সাইন ইন করুন।
        </p>
        <Link href="/signin" className="brand-button mt-4">
          সাইন ইন
        </Link>
      </main>
    );
  }

  return (
    <main className="site-container min-h-[65vh] py-6 sm:py-10">
      <section className="surface-card mx-auto max-w-xl p-5 sm:p-7">
        <Link
          href="/profile"
          className="text-sm font-medium text-brand transition-colors hover:text-brand-dark hover:underline"
        >
          ← প্রোফাইলে ফিরে যান
        </Link>

        <h1 className="mt-5 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
          তথ্য আপডেট করুন
        </h1>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="block w-full">
            <span className="mb-1.5 block text-sm font-semibold text-gray-800">
              আপনার নাম
            </span>
            <input
              className="field-input"
              name="name"
              defaultValue={session.user.name ?? ""}
              maxLength={100}
              required
              autoComplete="name"
            />
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700"
            >
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="brand-button w-full"
          >
            {saving ? "আপডেট হচ্ছে..." : "Update Information"}
          </button>
        </form>
      </section>
    </main>
  );
}