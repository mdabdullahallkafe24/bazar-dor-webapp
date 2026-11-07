import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-container flex min-h-[65vh] flex-col items-center justify-center py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
        🛒
      </div>

      <p className="mt-5 text-sm font-semibold text-brand">
        404 — পৃষ্ঠা খুঁজে পাওয়া যায়নি
      </p>

      <h1 className="mt-2 text-2xl font-extrabold text-ink">
        দুঃখিত! এই পৃষ্ঠাটি পাওয়া যায়নি
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-muted">
        পৃষ্ঠাটি সরানো হয়েছে অথবা ঠিকানাটি সঠিক নয়।
      </p>

      <Link href="/" className="brand-button mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}