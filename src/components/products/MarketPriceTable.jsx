import { formatPrice } from "@/lib/format-price";

export default function MarketPriceTable({ product }) {
  const markets =
    product.markets ??
    product.market_prices ??
    product.prices_by_market ??
    [];

  return (
    <section className="surface-card mt-5 overflow-hidden">
      <div className="border-b border-line p-5">
        <h2 className="font-bold text-ink">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <p className="mt-1 text-xs text-muted">
          বিভিন্ন বাজারের দামের তুলনা
        </p>
      </div>

      {markets.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra table-sm w-full min-w-[560px]">
            <thead>
              <tr className="text-xs">
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th>পণ্য</th>
                <th>একক</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বোচ্চ</th>
              </tr>
            </thead>

            <tbody>
              {markets.map((market, index) => {
                const min =
                  market.min ??
                  market.price ??
                  market.current_price ??
                  0;

                const max =
                  market.max ??
                  market.price ??
                  market.average_price ??
                  min;

                return (
                  <tr key={market.id ?? market._id ?? index}>
                    <td className="font-medium">
                      {market.market ??
                        market.market_name ??
                        market.bazar_name ??
                        market.name ??
                        "বাজার"}
                    </td>
                    <td className="text-muted">
                      {market.division ?? "—"}
                    </td>
                    <td>
                      {market.product_name ??
                        product.nameBn ??
                        product.name ??
                        product.title ??
                        "পণ্য"}
                    </td>
                    <td className="text-muted">
                      {market.unit ??
                        product.unit ??
                        product.unit_name ??
                        "প্রতি কেজি"}
                    </td>
                    <td className="text-right font-semibold text-emerald-700">
                      {formatPrice(min)}
                    </td>
                    <td className="text-right font-semibold text-red-600">
                      {formatPrice(max)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="p-6 text-sm text-muted">
          API থেকে বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
