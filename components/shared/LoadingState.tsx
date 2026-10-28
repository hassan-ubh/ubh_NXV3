
export function LoadingState({ store = false }: { store?: boolean }) {
  return (
    <main className="min-h-[70vh] px-6 py-20">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mx-auto h-4 w-24 rounded bg-slate-200" />

        <div className="mx-auto mt-5 h-10 max-w-md rounded bg-slate-200" />

        <div className="mx-auto mt-4 h-4 max-w-lg rounded bg-slate-100" />

        <div
          className={`mt-12 grid gap-6 ${
            store ? "sm:grid-cols-2 lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-slate-100"
            >
              <div className="aspect-[4/3] bg-slate-100" />

              <div className="space-y-3 p-5">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-2/3 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}