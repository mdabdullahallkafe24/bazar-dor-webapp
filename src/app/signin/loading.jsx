export default function SignInLoading() {
  return (
    <main className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-gradient-to-b from-[#f4fbf6] to-page px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-lg shadow-emerald-900/5 sm:p-8">
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="skeleton h-12 w-12 rounded-2xl" />
          <div className="skeleton h-5 w-32" />
          <div className="skeleton h-4 w-44" />
        </div>

        <div className="space-y-4">
          <div className="skeleton h-10 w-full rounded-lg" />
          <div className="skeleton h-10 w-full rounded-lg" />
          <div className="skeleton h-11 w-full rounded-lg" />
        </div>

        <div className="mt-5 flex justify-center">
          <div className="skeleton h-4 w-40" />
        </div>
      </section>
    </main>
  );
}
