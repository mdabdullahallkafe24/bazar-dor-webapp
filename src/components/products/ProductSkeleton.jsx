export default function ProductSkeleton({ count = 6 }) {
  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="পণ্য লোড হচ্ছে"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="surface-card p-4">
          <div className="flex gap-3">
            <div className="skeleton h-11 w-11 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
            </div>
          </div>
          <div className="mt-5 flex justify-between">
            <div className="skeleton h-5 w-24" />
            <div className="skeleton h-5 w-14 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}