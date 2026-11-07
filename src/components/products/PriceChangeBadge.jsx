import {
  formatBengaliNumber,
  formatPercent,
} from "@/lib/format-price";

export default function PriceChangeBadge({ value }) {
  const change = Number(value);
  const valid = Number.isFinite(change);

  const className = !valid || change === 0
    ? "bg-gray-100 text-gray-600"
    : change > 0
      ? "bg-red-50 text-red-600"
      

  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${className}`}>
      {valid ? formatPercent(change) : "—"}
    </span>
  );
}