import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="surface-card relative overflow-hidden bg-gradient-to-br from-[#f4fbf6] via-white to-[#ecf7ef] p-5 sm:p-8 md:p-10">
      {/* decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div className="relative grid items-center gap-6 md:grid-cols-2">
        <div>
          <span className="badge badge-success badge-outline mb-4 rounded-full px-3 py-2 text-xs font-semibold">
            স্বাগতম, বাজার দর-এ
          </span>

          <h1 className="max-w-lg text-2xl leading-snug font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-muted sm:text-[15px]">
            চাল, ডাল, তেল, মাছ, সবজি ও নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন
            সহজেই।
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="#সব-পণ্য" className="brand-button">
              সব পণ্য দেখুন →
            </Link>

            <Link
              href="/signup"
              className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              অ্যাকাউন্ট খুলুন
            </Link>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্যের ঝুড়ি"
            width={420}
            height={300}
            priority
            className="h-auto max-h-64 w-full max-w-sm object-contain drop-shadow-sm sm:max-h-72"
          />
        </div>
      </div>
    </section>
  );
}
