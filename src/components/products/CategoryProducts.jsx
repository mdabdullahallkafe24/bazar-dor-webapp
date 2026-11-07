"use client";

import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";

function toNumber(value) {
  if (typeof value === "number") return value;

  const bengaliDigits = "০১২৩৪৫৬৭৮৯";
  const normalized = String(value ?? "")
    .replace(/[০-৯]/g, (digit) => bengaliDigits.indexOf(digit))
    .replace(/[^\d.-]/g, "");

  const number = Number(normalized);

  return Number.isFinite(number) ? number : 0;
}

function getPrice(product) {
  return (
    product.price ??
    product.current_price ??
    product.average_price ??
    product.today_price ??
    0
  );
}

export default function CategoryProducts({ products }) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const list = [...products];

    if (sort === "low") {
      list.sort((a, b) => toNumber(getPrice(a)) - toNumber(getPrice(b)));
    }

    if (sort === "high") {
      list.sort((a, b) => toNumber(getPrice(b)) - toNumber(getPrice(a)));
    }

    return list;
  }, [products, sort]);

  return (
    <div>
      <div className="surface-card mb-4 flex flex-wrap items-center justify-between gap-3 p-3">
        <p className="text-xs text-muted">
          মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য
        </p>

        <label className="flex items-center gap-2 text-xs text-ink">
          সাজান:
          <select
            className="select select-bordered select-sm max-w-[190px] bg-white"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <ProductGrid products={sortedProducts} />
    </div>
  );
}