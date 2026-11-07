"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="no-scrollbar -mx-1 flex items-center gap-1.5 overflow-x-auto px-1 py-2.5 sm:gap-2"
    >
      {categories.map((category) => {
        const href = category.slug ? `/category/${category.slug}` : "/";

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
              "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5",
              "text-xs font-semibold transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
              isActive
                ? "bg-brand text-white shadow-sm shadow-emerald-600/25"
                : "border border-transparent text-gray-600 hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700",
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
