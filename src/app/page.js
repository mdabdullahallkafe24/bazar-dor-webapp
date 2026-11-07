import { getProducts } from "@/lib/api";
import HeroSection from "@/components/home/HeroSection";
import PriceSection from "@/components/home/PriceSection";
import AllProducts from "@/components/home/AllProducts";

// বাজারদর প্রতিনিয়়ত আপডেট হয় — তাই প্রতিবার রিকোয়েস্টে লোড হয় (static shell নয়)।
export const instant = false;

export default async function HomePage() {
  let products = [];
  let errorMessage = "";

  try {
    const result = await getProducts();

    products = Array.isArray(result)
      ? result
      : Array.isArray(result?.products)
        ? result.products
        : [];
  } catch (error) {
    console.error("Products API error:", error);
    errorMessage = "পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।";
  }

  const increasedProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort(
      (a, b) =>
        Number(b.change?.pct ?? 0) - Number(a.change?.pct ?? 0)
    )
    .slice(0, 6);

  const decreasedProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort(
      (a, b) =>
        Number(a.change?.pct ?? 0) - Number(b.change?.pct ?? 0)
    )
    .slice(0, 6);

  return (
    <div className="site-container py-6 sm:py-8">
      <HeroSection />

      {errorMessage && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      )}

      <PriceSection
        increased={increasedProducts}
        decreased={decreasedProducts}
      />

      <AllProducts products={products} errorMessage={errorMessage} />
    </div>
  );
}
