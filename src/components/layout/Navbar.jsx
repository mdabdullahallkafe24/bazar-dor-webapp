"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarDate from "@/components/NavbarDate";

const categories = [
  { name: "সব", slug: "", icon: "🛒" },
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🛢️" },
  { name: "সবজি", slug: "sobji", icon: "🥬" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🍗" },
  { name: "ডিম-দুধ", slug: "dim-dui", icon: "🥛" },
  { name: "মসলা", slug: "mosla", icon: "🌶️" },
];

const tickerItems = [
  { emoji: "🍚", name: "চাল", trend: "up" },
  { emoji: "🫘", name: "ডাল", trend: "down" },
  { emoji: "🧅", name: "পেঁয়াজ", trend: "down" },
  { emoji: "🥔", name: "আলু", trend: "up" },
  { emoji: "🥚", name: "ডিম", trend: "flat" },
  { emoji: "🐟", name: "মাছ", trend: "down" },
  { emoji: "🛢️", name: "তেল", trend: "flat" },
];

function TrendIcon({ trend }) {
  if (trend === "up") {
    return (
      <span className="font-bold text-red-500" aria-label="দাম বাড়ছে">
        ▲
      </span>
    );
  }

  if (trend === "down") {
    return (
      <span className="font-bold text-emerald-600" aria-label="দাম কমছে">
        ▼
      </span>
    );
  }

  return (
    <span className="text-gray-400" aria-label="দাম অপরিবর্তিত">
      —
    </span>
  );
}

function CategoryNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="flex items-center gap-2 overflow-x-auto border-t border-gray-200 py-2"
    >
      {categories.map((category) => {
        const href = category.slug
          ? `/category/${category.slug}`
          : "/";

        // বর্তমান URL অনুযায়ী active category নির্ধারণ
        const isActive = category.slug
          ? pathname === href || pathname.startsWith(`${href}/`)
          : pathname === "/";

        return (
          <Link
            key={category.slug || "all"}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={[
              "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2",
              "text-xs font-medium transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
              isActive
                ? "bg-emerald-600 text-white"
                : "bg-transparent text-gray-700 hover:bg-emerald-50 hover:text-emerald-700",
            ].join(" ")}
          >
            <span aria-hidden="true">{category.icon}</span>
            <span>{category.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function PriceTicker() {
  return (
    <div
      className="overflow-hidden border-t border-gray-200 bg-[#f8faf8] py-2"
      aria-label="বাজারদরের সংক্ষিপ্ত তালিকা"
    >
      <div className="price-ticker-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {tickerItems.map((item) => (
              <span
                key={`${copy}-${item.name}`}
                className="mx-4 flex items-center gap-2 whitespace-nowrap text-[11px]"
              >
                <span aria-hidden="true">{item.emoji}</span>

                <span className="font-medium text-gray-800">
                  {item.name}
                </span>

                <span className="text-gray-500">বাজারদর দেখুন</span>

                <TrendIcon trend={item.trend} />

                <span className="text-gray-300">|</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="site-container mx-auto">
        {/* Logo এবং authentication links */}
        <div className="flex min-h-[62px] items-center justify-between gap-3">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="বাজার দর হোম পেজ"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-xl text-white">
              🛒
            </span>

            <span className="flex flex-col">
              <span className="text-base font-extrabold text-gray-900">
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
                  ? "bg-emerald-100 text-emerald-800"
                  : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              aria-current={pathname === "/signup" ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                pathname === "/signup"
                  ? "bg-emerald-700 text-white"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        {/* Category navigation */}
        <CategoryNavigation />
      </div>

      {/* Scrolling market ticker */}
      <PriceTicker />
    </header>
  );
}