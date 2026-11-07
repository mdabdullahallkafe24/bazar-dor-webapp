import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import ProductSummary from "@/components/products/ProductSummary";
import MarketPriceTable from "@/components/products/MarketPriceTable";

// সেশন ও বাজারদর দুটোই runtime data — প্রতিবার রিকোয়েস্টে যাচাই ও লোড হয়।
export const instant = false;

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  let product;

  try {
    product = await getProduct(slug);
  } catch (error) {
    console.error("Product API error:", error);
    notFound();
  }

  if (!product || typeof product !== "object") {
    notFound();
  }

  return (
    <main className="site-container min-h-[65vh] py-6 sm:py-8">
      <div className="mb-5">
        <Link
          href="/"
          className="text-sm font-medium text-brand transition-colors hover:text-brand-dark hover:underline"
        >
          ← হোম পেজ
        </Link>
      </div>

      <ProductSummary product={product} />
      <MarketPriceTable product={product} />
    </main>
  );
}
