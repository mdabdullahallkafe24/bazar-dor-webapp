const tickerItems = [
  { emoji: "🍚", name: "চাল", trend: "up" },
  { emoji: "🫘", name: "ডাল", trend: "down" },
  { emoji: "🧅", name: "পেঁয়াজ", trend: "down" },
  { emoji: "🥔", name: "আলু", trend: "up" },
  { emoji: "🥚", name: "ডিম", trend: "flat" },
  { emoji: "🐟", name: "মাছ", trend: "down" },
  { emoji: "🛢️", name: "তেল", trend: "flat" },
];

function TrendIcon({ trend }) {
  if (trend === "up") {
    return (
      <span className="font-bold text-red-500" aria-label="দাম বাড়ছে">
        ▲
      </span>
    );
  }

  if (trend === "down") {
    return (
      <span className="font-bold text-emerald-600" aria-label="দাম কমছে">
        ▼
      </span>
    );
  }

  return (
    <span className="text-gray-400" aria-label="দাম অপরিবর্তিত">
      —
    </span>
  );
}

function TickerRow({ copyIndex }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={copyIndex === 1 ? "true" : undefined}
    >
      {tickerItems.map((item) => (
        <span
          key={`${copyIndex}-${item.name}`}
          className="mx-4 flex items-center gap-2 whitespace-nowrap text-[11px]"
        >
          <span aria-hidden="true">{item.emoji}</span>

          <span className="font-semibold text-gray-800">{item.name}</span>

          <span className="text-gray-500">বাজারদর দেখুন</span>

          <TrendIcon trend={item.trend} />

          <span className="text-gray-300" aria-hidden="true">
            |
          </span>
        </span>
      ))}
    </div>
  );
}

export default function PriceTicker() {
  return (
    <div
      className="price-ticker overflow-hidden border-t border-line bg-[#f7fbf8] py-2"
      aria-label="বাজারদরের সংক্ষিপ্ত তালিকা"
    >
      {/* দুটি সমান row — একটি শেষ হলে অন্যটি শুরু হয় (seamless loop) */}
      <div className="price-ticker-track">
        <TickerRow copyIndex={0} />
        <TickerRow copyIndex={1} />
      </div>
    </div>
  );
}
