import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/api";

function formatPrice(value) {
  const price = Number(value);

  if (!Number.isFinite(price)) return "দাম পাওয়া যায়নি";

  return `${price.toLocaleString("bn-BD")} টাকা`;
}

function ProductCard({ product }) {
  const name = product.nameBn || product.name || "নাম পাওয়া যায়নি";
  const price = product.today;
  const unit = product.unit || "kg";
  const change = Number(product.change?.pct ?? 0);
  const direction = product.change?.dir || "flat";
  const slug = product.slug || product.id;

  return (
    <article className="surface-card flex h-full flex-col p-4">
      <div className="text-3xl" aria-hidden="true">
        {product.image || product.categoryIcon || "🛒"}
      </div>

      <h3 className="mt-2 font-bold text-ink">{name}</h3>

      <p className="mt-1 text-sm text-muted">
        প্রতি {unit}
      </p>

      <p className="mt-2 text-lg font-extrabold text-emerald-700">
        {formatPrice(price)}
      </p>

      {direction === "up" && (
        <p className="mt-2 text-sm font-semibold text-red-600">
          ▲ দাম বেড়েছে {Math.abs(change).toLocaleString("bn-BD")}%
        </p>
      )}

      {direction === "down" && (
        <p className="mt-2 text-sm font-semibold text-green-700">
          ▼ দাম কমেছে {Math.abs(change).toLocaleString("bn-BD")}%
        </p>
      )}

      {direction === "flat" && (
        <p className="mt-2 text-sm text-muted">
          ● দাম অপরিবর্তিত
        </p>
      )}

      <Link
        href={`/product/${slug}`}
        className="brand-button mt-4 text-center"
      >
        বিস্তারিত দেখুন →
      </Link>
    </article>
  );
}

function ProductSection({ title, products, emptyMessage }) {
  return (
    <section className="mt-8">
      <h2 className="section-title">{title}</h2>

      {products.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="surface-card mt-4 p-5 text-sm text-muted">
          {emptyMessage}
        </div>
      )}
    </section>
  );
}

export default async function HomePage() {
  let products = [];
  let errorMessage = "";

  try {
    const result = await getProducts();

    products = Array.isArray(result)
      ? result
      : Array.isArray(result?.products)
        ? result.products
        : [];
  } catch (error) {
    console.error("Products API error:", error);
    errorMessage = "পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।";
  }

  const increasedProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort(
      (a, b) =>
        Number(b.change?.pct ?? 0) - Number(a.change?.pct ?? 0)
    )
    .slice(0, 6);

  const decreasedProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort(
      (a, b) =>
        Number(a.change?.pct ?? 0) - Number(b.change?.pct ?? 0)
    )
    .slice(0, 6);

  return (
    <div className="site-container py-6 sm:py-8">
      <section className="surface-card grid items-center gap-5 overflow-hidden bg-[#f9fcf9] p-5 sm:p-8 md:grid-cols-2">
        <div>
          <span className="badge badge-success badge-outline mb-4">
            স্বাগতম, বাজার দর-এ
          </span>

          <h1 className="max-w-lg text-2xl leading-snug font-extrabold text-ink sm:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-muted">
            চাল, ডাল, তেল, মাছ, সবজি ও নিত্যপ্রয়োজনীয়
            পণ্যের বাজারদর জানুন সহজেই।
          </p>

          <Link href="#সব-পণ্য" className="brand-button mt-5">
            সব পণ্য দেখুন →
          </Link>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্যের ঝুড়ি"
            width={420}
            height={300}
            priority
            className="h-auto max-h-64 w-full max-w-sm object-contain"
          />
        </div>
      </section>

      {errorMessage && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <ProductSection
        title="🔺 আজ দাম বেড়েছে"
        products={increasedProducts}
        emptyMessage="দাম বৃদ্ধির পণ্য পাওয়া যায়নি।"
      />

      <ProductSection
        title="🟢 আজ দাম কমেছে"
        products={decreasedProducts}
        emptyMessage="দাম কমার পণ্য পাওয়া যায়নি।"
      />

      <section className="mt-8" id="সব-পণ্য">
        <h2 className="section-title">সব পণ্য</h2>
        <p className="section-subtitle">
          নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক জায়গায়।
        </p>

        {products.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="surface-card mt-4 p-5 text-sm text-muted">
            {errorMessage || "কোনো পণ্য পাওয়া যায়নি।"}
          </div>
        )}
      </section>
    </div>
  );
}

