import { formatPrice } from "@/lib/format-price";

export default function ProductSummary({ product }) {
  const name = product.name ?? product.title ?? "পণ্যের বিবরণ";
  const emoji = product.emoji ?? product.icon ?? "🛒";
  const unit = product.unit ?? product.unit_name ?? "প্রতি কেজি";
  const category = product.category_name ?? product.category ?? "নিত্যপ্রয়োজনীয়";

  const price = Number(
    product.price ??
    product.current_price ??
    product.average_price ??
    product.today_price ??
    0
  );

  const min = Number(product.min_price ?? product.minimum_price ?? price);
  const max = Number(product.max_price ?? product.maximum_price ?? price);
  const average = Number(product.average_price ?? price);

  return (
    <section className="surface-card p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-4xl">
            {emoji}
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-ink">
              {name}
            </h1>

            <p className="mt-1 text-xs text-muted">
              {category} · {unit}
            </p>

            <p className="mt-2 text-xs text-muted">
              বাজারভিত্তিক আজকের দামের সারসংক্ষেপ
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[#f0f5f0] p-4 sm:min-w-36">
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="mt-1 text-xl font-extrabold text-brand">
            {formatPrice(price)}
          </p>
          <p className="mt-1 text-[11px] text-muted">{unit}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: "সর্বনিম্ন দাম", value: min, color: "text-green-700" },
          { label: "সর্বোচ্চ দাম", value: max, color: "text-red-600" },
          { label: "গড় দাম", value: average, color: "text-brand" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-line p-4">
            <p className="text-xs text-muted">{item.label}</p>
            <p className={`mt-2 text-lg font-bold ${item.color}`}>
              {formatPrice(item.value)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}