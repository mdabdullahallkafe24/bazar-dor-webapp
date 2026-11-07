import Link from "next/link";
import { formatPrice } from "@/lib/format-price";
import PriceChangeBadge from "./PriceChangeBadge";

const getValue = (product, keys, fallback = "") => {
  for (const key of keys) {
    if (product?.[key] !== undefined && product?.[key] !== null) {
      return product[key];
    }
  }

  return fallback;
};

export default function ProductCard({ product }) {
  const id = getValue(product, ["slug", "id", "_id"]);
  const name = getValue(product, ["name", "title", "product_name"], "পণ্য");
  const unit = getValue(product, ["unit", "unit_name"], "প্রতি কেজি");
  const emoji = getValue(product, ["emoji", "icon"], "🛒");
  const price = getValue(product, [
    "price",
    "current_price",
    "average_price",
    "today_price",
  ], null);

  const change = getValue(product, [
    "change_percent",
    "price_change_percent",
    "change",
  ], null);

  const href = `/product/${encodeURIComponent(String(id))}`;

  return (
    <Link
      href={href}
      className="surface-card group block p-3 transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md sm:p-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
          {emoji}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-ink group-hover:text-brand">
            {name}
          </h3>

          <p className="mt-1 text-[11px] text-muted">
            {unit}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-[10px] text-muted">আজকের দাম</p>
          <p className="mt-1 text-sm font-extrabold text-ink">
            {price !== null ? formatPrice(price) : "দাম পাওয়া যায়নি"}
          </p>
        </div>

        <PriceChangeBadge value={change} />
      </div>
    </Link>
  );
}