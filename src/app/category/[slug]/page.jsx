import Link from "next/link";
import { getProducts } from "@/lib/api";

// বাজারদর প্রতিনিয়়ত আপডেট হয় — তাই প্রতিবার রিকোয়েস্টে লোড হয় (static shell নয়)।
export const instant = false;

const CATEGORIES = {
  chal: { name: "চাল", icon: "🍚" },
  dal: { name: "ডাল", icon: "🫘" },
  tel: { name: "তেল", icon: "🛢️" },
  sobji: { name: "সবজি", icon: "🥬" },
  mach: { name: "মাছ", icon: "🐟" },
  mangsho: { name: "মাংস", icon: "🍗" },
  "dim-dui": { name: "ডিম-দুধ", icon: "🥛" },
  mosla: { name: "মসলা", icon: "🌶️" },
};

function formatPrice(value) {
  if (value === null || value === undefined || value === "") {
    return "দাম পাওয়া যায়নি";
  }

  const price = Number(value);

  if (!Number.isFinite(price)) {
    return "দাম পাওয়া যায়নি";
  }

  return `${price.toLocaleString("bn-BD")} টাকা`;
}

function ProductCard({ product }) {
  const name =
    product.nameBn || product.name || "নাম পাওয়া যায়নি";

  const price = product.today;
  const unit = product.unit || "kg";
  const direction = product.change?.dir || "flat";
  const change = Number(product.change?.pct ?? 0);
  const slug = product.slug || product.id;

  return (
    <article className="surface-card is-clickable flex h-full flex-col p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-2xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-ink">{name}</h2>
          <p className="mt-0.5 text-xs text-muted">প্রতি {unit}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-muted">আজকের দাম</p>
        <p className="mt-0.5 text-xl font-extrabold text-brand">
          {formatPrice(price)}
        </p>
        {price !== null && price !== undefined && price !== "" && (
          <p className="text-xs text-muted">প্রতি {unit}</p>
        )}
      </div>

      <div className="mt-3">
        {direction === "up" ? (
          <p className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
            ▲ দাম বেড়েছে {Math.abs(change).toLocaleString("bn-BD")}%
          </p>
        ) : direction === "down" ? (
          <p className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            ▼ দাম কমেছে {Math.abs(change).toLocaleString("bn-BD")}%
          </p>
        ) : (
          <p className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-muted">
            ● দাম অপরিবর্তিত
          </p>
        )}
      </div>

      <Link
        href={`/product/${slug}`}
        className="brand-button mt-4 w-full text-center"
      >
        বিস্তারিত দেখুন →
      </Link>
    </article>
  );
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = CATEGORIES[slug];

  if (!category) {
    return (
      <main className="site-container py-8">
        <section className="surface-card p-6 text-center">
          <div className="text-4xl" aria-hidden="true">
            🔍
          </div>
          <h1 className="mt-3 text-xl font-bold text-ink">
            ক্যাটাগরি পাওয়া যায়নি
          </h1>
          <p className="mt-2 text-sm text-muted">
            লিংকটি সম্ভবত সঠিক নয়।
          </p>
          <Link href="/" className="brand-button mt-4 inline-block">
            হোম পেজে ফিরে যান
          </Link>
        </section>
      </main>
    );
  }

  let products = [];
  let errorMessage = "";

  try {
    // সব পণ্য এনে category অনুযায়ী ফিল্টার করা হচ্ছে
    const allProducts = await getProducts();

    products = allProducts.filter(
      (product) =>
        String(product.category || "").toLowerCase() ===
        slug.toLowerCase()
    );
  } catch (error) {
    console.error("Category products error:", error);
    errorMessage = "পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।";
  }

  return (
    <main className="site-container py-6 sm:py-8">
      <section className="surface-card flex items-center gap-4 overflow-hidden bg-gradient-to-r from-[#f4fbf6] to-white p-5 sm:p-7">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm ring-1 ring-emerald-100 sm:h-16 sm:w-16">
          {category.icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-brand uppercase">
            ক্যাটাগরি
          </p>
          <h1 className="mt-0.5 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
            {category.name} পণ্যের বাজারদর
          </h1>
          <p className="mt-1 text-sm text-muted">
            আজকের দাম ও দামের পরিবর্তন দেখুন।
          </p>
        </div>
      </section>

      <section className="surface-card mt-4 flex flex-wrap items-center justify-between gap-3 p-4">
        <p className="text-sm text-muted">
          মোট{" "}
          <span className="font-bold text-ink">
            {products.length.toLocaleString("bn-BD")}
          </span>
          টি পণ্য
        </p>

        <Link
          href="/"
          className="text-sm font-semibold text-brand transition-colors hover:text-brand-dark hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </section>

      {errorMessage ? (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      ) : products.length > 0 ? (
        <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.id ?? product.slug ?? index}
              product={product}
            />
          ))}
        </section>
      ) : (
        <section className="surface-card mt-5 p-8 text-center">
          <div className="text-4xl" aria-hidden="true">
            {category.icon}
          </div>
          <h2 className="mt-3 font-bold text-ink">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="mt-2 text-sm text-muted">
            API-তে এই ক্যাটাগরির পণ্য আছে কি না যাচাই করতে হবে।
          </p>
          <Link href="/" className="brand-button mt-4 inline-block">
            হোম পেজে ফিরে যান
          </Link>
        </section>
      )}
    </main>
  );
}
