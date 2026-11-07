export default function ProductLoading() {
  return (
    <main className="site-container py-8">
      <div className="skeleton h-56 w-full rounded-2xl" />
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="skeleton h-24 rounded-xl" />
        <div className="skeleton h-24 rounded-xl" />
        <div className="skeleton h-24 rounded-xl" />
      </div>
      <div className="skeleton mt-5 h-64 w-full rounded-2xl" />
    </main>
  );
}