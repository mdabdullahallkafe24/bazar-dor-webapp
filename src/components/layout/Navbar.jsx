"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarDate from "@/components/NavbarDate";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="site-container">
        {/* Logo এবং authentication links */}
        <div className="flex min-h-[64px] items-center justify-between gap-3 py-2">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="বাজার দর হোম পেজ"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-xl text-white shadow-sm shadow-emerald-600/30 transition-transform duration-200 group-hover:scale-105">
              🛒
            </span>

            <span className="flex flex-col leading-tight">
              <span className="text-base font-extrabold tracking-tight text-gray-900">
                বাজার দর
              </span>

              <NavbarDate />
            </span>
          </Link>

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
        </div>

        {/* Category navigation */}
        <div className="border-t border-line/70">
          <CategoryNav />
        </div>
      </div>

      {/* Scrolling market ticker */}
      <PriceTicker />
    </header>
  );
}
