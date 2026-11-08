"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";


function UserAvatar({ user, size = "h-8 w-8" }) {
  if (user.image) {
    return (
      <Image
        src={user.image}
        alt=""
        width={32}
        height={32}
        unoptimized
        className={`${size} shrink-0 rounded-full object-cover ring-2 ring-emerald-100`}
      />
    );
  }

  return (
    <span
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-sm font-bold text-white ring-2 ring-emerald-100`}
      aria-hidden="true"
    >
      {(user.name || user.email || "U").charAt(0).toUpperCase()}
    </span>
  );
}

export default function UserMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const user = session?.user;


  useEffect(() => {
    if (!open) return undefined;

    function handlePointerDown(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  async function handleSignOut() {
    setOpen(false);

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

  
  if (isPending) {
    return (
      <span className="skeleton block h-9 w-36 rounded-lg" aria-hidden="true" />
    );
  }


  if (!user) {
    return (
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="/signin"
          aria-current={pathname === "/signin" ? "page" : undefined}
          className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
            pathname === "/signin"
              ? "bg-emerald-50 text-emerald-800"
              : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
          }`}
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          aria-current={pathname === "/signup" ? "page" : undefined}
          className={`rounded-lg px-3.5 py-2 text-xs font-semibold shadow-sm transition-colors ${
            pathname === "/signup"
              ? "bg-brand-dark text-white"
              : "bg-brand text-white hover:bg-brand-dark"
          }`}
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const displayName = user.name || "ব্যবহারকারী";

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="অ্যাকাউন্ট মেনু"
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-emerald-50"
      >
        <UserAvatar user={user} />
        <span className="hidden text-xs font-bold text-gray-800 sm:inline">
          {displayName.split(" ")[0]}
        </span>
        <svg
          viewBox="0 0 12 12"
          className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path
            d="M2 4.5 6 8.5 10 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-xl shadow-gray-900/10"
        >
          <div className="px-3 py-2">
            <p className="truncate text-sm font-bold text-gray-900">
              {displayName}
            </p>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>

          <div className="mx-2 h-px bg-line" />

          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
          >
            <span aria-hidden="true">👤</span>
            আমার প্রোফাইল
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            role="menuitem"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            <span aria-hidden="true">↪</span>
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}
