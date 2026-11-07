import Link from "next/link";

export function formatPrice(value) {
  const price = Number(value);

  if (!Number.isFinite(price)) return "দাম পাওয়া যায়নি";

 
}

export default function ProductCard({ product }) {
  const name = product.nameBn || product.name || "নাম পাওয়া যায়নি";
  const price = product.today;
  const unit = product.unit || "kg";
  const change = Number(product.change?.pct ?? 0);
  const direction = product.change?.dir || "flat";
  const slug = product.slug || product.id;

  return (
    <article className="surface-card is-clickable flex h-full flex-col p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-2xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-ink">{name}</h3>

          <p className="mt-0.5 text-xs text-muted">প্রতি {unit}</p>
        </div>
      </div>

      <p className="mt-3 text-lg font-extrabold text-brand">
        {formatPrice(price)}
      </p>

      <div className="mt-auto pt-3">
        {direction === "up" && (
          <p className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
            ▲ দাম বেড়েছে {Math.abs(change).toLocaleString("bn-BD")}%
          </p>
        )}

        {direction === "down" && (
          <p className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            ▼ দাম কমেছে {Math.abs(change).toLocaleString("bn-BD")}%
          </p>
        )}

        {direction === "flat" && (
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
