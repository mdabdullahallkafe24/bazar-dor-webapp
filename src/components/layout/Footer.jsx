import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-white">
      <div className="site-container flex flex-col gap-3 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="font-bold text-ink">
            বাজার দর
          </Link>

          <p className="mt-1">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        <p className="max-w-xl sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে
          পরিবর্তিত হতে পারে।
        </p>
      </div>
    </footer>
  );
}