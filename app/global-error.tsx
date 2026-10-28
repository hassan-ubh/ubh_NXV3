
"use client";



export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-ubh-canvas text-ubh-navy">
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ubh-gold">
              UBH
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold">
              Something went wrong
            </h1>

            <p className="mt-4 text-slate-600">
              Please try again later.
            </p>

            <button
              onClick={() => reset()}
              className="mt-7 rounded-full bg-ubh-navy px-6 py-3 text-sm font-semibold text-white hover:bg-ubh-blue"
            >
              Try Again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
