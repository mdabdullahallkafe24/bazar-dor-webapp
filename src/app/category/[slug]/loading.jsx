import ProductSkeleton from "@/components/products/ProductSkeleton";

export default function CategoryLoading() {
  return (
    <main className="site-container min-h-[65vh] py-8">
      <div className="skeleton mb-5 h-24 w-full rounded-2xl" />
      <ProductSkeleton count={6} />
    </main>
  );
}