import ProductCard from "./ProductCard";

function ProductSection({ title, products, emptyMessage }) {
  return (
    <section className="mt-8">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="section-title">{title}</h2>
      </div>

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
          {emptyMessage}
        </div>
      )}
    </section>
  );
}

export default function PriceSection({ increased = [], decreased = [] }) {
  return (
    <>
      <ProductSection
        title="🔺 আজ দাম বেড়েছে"
        products={increased}
        emptyMessage="দাম বৃদ্ধির পণ্য পাওয়া যায়নি।"
      />

      <ProductSection
        title="🟢 আজ দাম কমেছে"
        products={decreased}
        emptyMessage="দাম কমার পণ্য পাওয়া যায়নি।"
      />
    </>
  );
}
