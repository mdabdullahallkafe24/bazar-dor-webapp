"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const joinedFormatter = new Intl.DateTimeFormat("bn-BD", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

function formatJoinedDate(value) {
  if (!value) return "";

  try {
    return joinedFormatter.format(new Date(value));
  } catch {
    return "";
  }
}

function ProfileAvatar({ profile, fallbackName }) {
  if (profile?.image) {
    return (
      <Image
        src={profile.image}
        alt=""
        width={56}
        height={56}
        unoptimized
        className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-emerald-100"
      />
    );
  }

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-2xl font-bold text-white shadow-sm shadow-emerald-600/30">
      {(profile?.name || fallbackName || "U").charAt(0).toUpperCase()}
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const user = session?.user;
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return undefined;

    let cancelled = false;

    async function loadProfile() {
      try {
        const response = await fetch("/api/profile", { cache: "no-store" });
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.error || "প্রোফাইল লোড করা যায়নি।");
        }

        if (!data?.profile) {
          throw new Error("প্রোফাইল পাওয়া যায়নি। আবার চেষ্টা করুন।");
        }

        if (!cancelled) {
          setProfile(data.profile);
          setError("");
        }
      } catch (loadError) {
        if (!cancelled) {
          const message =
            loadError?.message ||
            "প্রোফাইল লোড করা যায়নি। আবার চেষ্টা করুন।";
          setError(message);
          toast.error(message);
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [userId, reloadKey]);

  async function handleSignOut() {
    const result = await authClient.signOut();

    if (result?.error) {
      toast.error(
        result.error.message || "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।"
      );
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছেন।");
    router.replace("/");
    router.refresh();
  }

  
  const currentProfile = profile?.userId === userId ? profile : null;
  const isLoading = isPending || (Boolean(user) && !currentProfile && !error);

  if (isLoading) {
    return (
      <main className="site-container py-12">
        <div className="skeleton mx-auto h-48 max-w-2xl rounded-2xl" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="site-container flex min-h-[55vh] flex-col items-center justify-center py-16 text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-3xl"
          aria-hidden="true"
        >
          👤
        </div>
        <h1 className="mt-4 text-xl font-bold text-ink">
          প্রোফাইল দেখতে সাইন ইন করুন
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          আপনার অ্যাকাউন্টের তথ্য দেখতে প্রবেশ করুন।
        </p>
        <Link href="/signin" className="brand-button mt-5">
          সাইন ইন
        </Link>
      </main>
    );
  }

  const name = currentProfile?.name || user.name || "ব্যবহারকারী";
  const email = currentProfile?.email || user.email;
  const joinedAt = formatJoinedDate(currentProfile?.createdAt);
  const emailVerified = Boolean(
    currentProfile?.emailVerified ?? user.emailVerified
  );

  return (
    <main className="site-container min-h-[65vh] py-6 sm:py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
          আমার প্রোফাইল
        </h1>
        <p className="mt-1 text-sm text-muted">
          আপনার অ্যাকাউন্টের তথ্য দেখুন ও আপডেট করুন।
        </p>

        {error && (
          <div
            role="alert"
            className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              className="rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {currentProfile && (
          <section className="surface-card mt-5 flex flex-wrap items-center gap-4 p-5">
            <ProfileAvatar profile={currentProfile} fallbackName={user.name} />

            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-ink">{name}</h2>
              <p className="mt-0.5 break-all text-sm text-muted">{email}</p>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span
                  className={`rounded-full px-2 py-0.5 font-semibold ${
                    emailVerified
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {emailVerified ? "ইমেইল যাচাইকৃত" : "ইমেইল যাচাই হয়নি"}
                </span>

                {joinedAt && <span className="text-muted">সদস্য: {joinedAt}</span>}
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="rounded-lg border border-red-200 bg-white px-3.5 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              সাইন আউট
            </button>
          </section>
        )}

        <section className="surface-card mt-5 p-5">
          <h2 className="font-bold text-ink">ব্যক্তিগত তথ্য</h2>
          <p className="mt-1 text-sm text-muted">
            আপনার নাম পরিবর্তন করতে Update Information নির্বাচন করুন। পরিবর্তন
            হলে প্রোফাইলেও সেটি স্বয়ংক্রিয়ভাবে আপডেট হবে।
          </p>

          <Link href="/profile/update" className="brand-button mt-4">
            তথ্য আপডেট করুন
          </Link>
        </section>
      </div>
    </main>
  );
}
