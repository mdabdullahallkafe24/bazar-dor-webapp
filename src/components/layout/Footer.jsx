import Link from "next/link";

const footerLinks = [
  { name: "সব", slug: "" },
  { name: "চাল", slug: "chal" },
  { name: "ডাল", slug: "dal" },
  { name: "সবজি", slug: "sobji" },
  { name: "মাছ", slug: "mach" },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-white">
      <div className="site-container grid gap-6 py-8 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-extrabold text-ink"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 text-base text-white">
              🛒
            </span>
            বাজার দর
          </Link>

          <p className="mt-2 text-xs text-muted">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        <nav aria-label="ফুটার ক্যাটাগরি">
          <h2 className="text-xs font-bold tracking-wide text-ink uppercase">
            ক্যাটাগরি
          </h2>

          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted sm:grid-cols-1 lg:grid-cols-2">
            {footerLinks.map((category) => (
              <li key={category.slug || "all"}>
                <Link
                  href={
                    category.slug ? `/category/${category.slug}` : "/"
                  }
                  className="transition-colors hover:text-brand"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="rounded-xl bg-page p-3.5 text-xs leading-5 text-muted sm:col-span-2 lg:col-span-1">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হতে পারে।
        </p>
      </div>

      <div className="border-t border-line/70">
        <div className="site-container flex flex-col gap-1 py-4 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© বাজার দর — সর্বশেষ বাজারদর এক ঠিকানায়।</p>

          <p>বাংলাদেশের বাজারভিত্তিক দামের উপর ভিত্তি করে তৈরি।</p>
        </div>
      </div>
    </footer>
  );
}
