import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  if (!products.length) {
    return (
      <div className="surface-card px-5 py-12 text-center">
        <p className="text-3xl">🛒</p>
        <h3 className="mt-3 font-bold text-ink">
          কোনো পণ্য পাওয়া যায়নি
        </h3>
        <p className="mt-2 text-sm text-muted">
          অন্য ক্যাটাগরি নির্বাচন করে দেখুন।
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard
          key={product.id ?? product._id ?? product.slug ?? index}
          product={product}
        />
      ))}
    </div>
  );
}