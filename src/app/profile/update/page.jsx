"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
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
      <main className="site-container py-16 text-center">
        <p>এই পৃষ্ঠা দেখতে আগে সাইন ইন করুন।</p>
        <Link href="/signin" className="brand-button mt-4">
          সাইন ইন
        </Link>
      </main>
    );
  }

  return (
    <main className="site-container min-h-[65vh] py-10">
      <section className="surface-card mx-auto max-w-xl p-5 sm:p-7">
        <Link href="/profile" className="text-sm text-brand">
          ← প্রোফাইলে ফিরে যান
        </Link>

        <h1 className="mt-5 text-xl font-extrabold text-ink">
          তথ্য আপডেট করুন
        </h1>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="form-control w-full">
            <span className="label-text mb-2">আপনার নাম</span>
            <input
              className="input input-bordered w-full"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={100}
              required
              autoComplete="name"
            />
          </label>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="text-sm text-green-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="brand-button w-full disabled:opacity-60"
          >
            {saving ? "আপডেট হচ্ছে..." : "Update Information"}
          </button>
        </form>
      </section>
    </main>
  );
}