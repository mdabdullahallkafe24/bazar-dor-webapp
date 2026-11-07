import { formatPrice } from "@/lib/format-price";

export default function ProductSummary({ product }) {
  const name =
    product.nameBn ??
    product.name ??
    product.title ??
    "পণ্যের বিবরণ";

  const emoji =
    product.image ?? product.emoji ?? product.icon ?? "🛒";

  const unit =
    product.unit ?? product.unit_name ?? "প্রতি কেজি";

  const category =
    product.categoryNameBn ??
    product.category_name ??
    product.category ??
    "নিত্যপ্রয়োজনীয়";

  const price = Number(
    product.today ??
    product.price ??
    product.current_price ??
    product.average_price ??
    product.today_price ??
    0
  );

  // API থেকে মিন/ম্যাক্স না এলে বাজারভিত্তিক দাম থেকে বের করা হয়।
  const markets = product.markets ?? product.market_prices ?? [];

  const marketMins = markets
    .map((market) => Number(market.min ?? market.price))
    .filter((value) => Number.isFinite(value) && value > 0);

  const marketMaxes = markets
    .map((market) => Number(market.max ?? market.price))
    .filter((value) => Number.isFinite(value) && value > 0);

  const min = Number(
    product.min_price ?? product.minimum_price ??
    (marketMins.length ? Math.min(...marketMins) : price)
  );

  const max = Number(
    product.max_price ?? product.maximum_price ??
    (marketMaxes.length ? Math.max(...marketMaxes) : price)
  );

  const average = Number(product.average_price ?? price);

  return (
    <section className="surface-card overflow-hidden">
      <div className="bg-gradient-to-r from-[#f4fbf6] to-white p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm ring-1 ring-emerald-100 sm:h-20 sm:w-20">
              {emoji}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                {name}
              </h1>

              <p className="mt-1 text-xs text-muted">
                {category} · {unit}
              </p>

              <p className="mt-1.5 text-xs text-muted">
                বাজারভিত্তিক আজকের দামের সারসংক্ষেপ
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-emerald-100 sm:min-w-40">
            <p className="text-xs text-muted">আজকের দাম</p>
            <p className="mt-1 text-2xl font-extrabold text-brand">
              {formatPrice(price)}
            </p>
            <p className="mt-0.5 text-[11px] text-muted">প্রতি {unit}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-3">
        {[
          { label: "সর্বনিম্ন দাম", value: min, color: "text-emerald-700" },
          { label: "সর্বোচ্চ দাম", value: max, color: "text-red-600" },
          { label: "গড় দাম", value: average, color: "text-brand" },
        ].map((item) => (
          <div key={item.label} className="bg-white p-4 sm:p-5">
            <p className="text-xs text-muted">{item.label}</p>
            <p className={`mt-1.5 text-lg font-bold ${item.color}`}>
              {formatPrice(item.value)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
