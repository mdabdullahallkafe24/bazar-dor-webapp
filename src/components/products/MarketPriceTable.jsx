import { formatPrice } from "@/lib/format-price";

export default function MarketPriceTable({ product }) {
  const markets =
    product.market_prices ??
    product.markets ??
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
          <table className="table table-zebra table-sm w-full">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>পণ্য</th>
                <th>একক</th>
                <th className="text-right">দাম</th>
              </tr>
            </thead>

            <tbody>
              {markets.map((market, index) => {
                const price =
                  market.price ??
                  market.current_price ??
                  market.average_price ??
                  0;

                return (
                  <tr key={market.id ?? market._id ?? index}>
                    <td>
                      {market.market_name ??
                        market.bazar_name ??
                        market.name ??
                        "বাজার"}
                    </td>
                    <td>
                      {market.product_name ??
                        product.name ??
                        product.title ??
                        "পণ্য"}
                    </td>
                    <td>
                      {market.unit ??
                        product.unit ??
                        product.unit_name ??
                        "প্রতি কেজি"}
                    </td>
                    <td className="text-right font-semibold">
                      {formatPrice(price)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="p-6 text-sm text-muted">
          API থেকে বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}