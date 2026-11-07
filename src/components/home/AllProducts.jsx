import ProductCard from "./ProductCard";

export default function AllProducts({ products = [], errorMessage = "" }) {
  return (
    <section className="mt-8 scroll-mt-36" id="সব-পণ্য">
      <h2 className="section-title">সব পণ্য</h2>
      <p className="section-subtitle">
        নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক জায়গায়।
      </p>

      {products.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id ?? product.slug}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="surface-card mt-4 p-5 text-sm text-muted">
          {errorMessage || "কোনো পণ্য পাওয়া যায়নি।"}
        </div>
      )}
    </section>
  );
}
