"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    const result = await authClient.signOut();

    if (!result?.error) {
      router.replace("/");
      router.refresh();
    }
  }

  if (isPending) {
    return (
      <main className="site-container py-12">
        <div className="skeleton mx-auto h-48 max-w-xl rounded-2xl" />
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="site-container py-16 text-center">
        <h1 className="text-xl font-bold">প্রোফাইল দেখতে সাইন ইন করুন</h1>
        <Link href="/signin" className="brand-button mt-5">
          সাইন ইন
        </Link>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="site-container min-h-[65vh] py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-xl font-extrabold text-ink">
          আমার প্রোফাইল
        </h1>
        <p className="mt-1 text-sm text-muted">
          আপনার অ্যাকাউন্টের তথ্য দেখুন ও আপডেট করুন।
        </p>

        <section className="surface-card mt-5 flex flex-wrap items-center gap-4 p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e4f3e8] text-2xl font-bold text-brand">
            {(user.name || user.email || "U").charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-ink">
              {user.name || "ব্যবহারকারী"}
            </h2>
            <p className="mt-1 break-all text-sm text-muted">
              {user.email}
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="btn btn-outline btn-sm border-red-200 text-red-600"
          >
            সাইন আউট
          </button>
        </section>

        <section className="surface-card mt-5 p-5">
          <h2 className="font-bold text-ink">ব্যক্তিগত তথ্য</h2>
          <p className="mt-1 text-sm text-muted">
            আপনার নাম পরিবর্তন করতে Update Information নির্বাচন করুন।
          </p>

          <Link
            href="/profile/update"
            className="brand-button mt-4"
          >
            তথ্য আপডেট করুন
          </Link>
        </section>
      </div>
    </main>
  );
}