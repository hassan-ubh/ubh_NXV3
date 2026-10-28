
"use client";

import Link from "next/link";
import { AlertCircle, Home, RefreshCw } from "lucide-react";

type ErrorStateProps = {
  reset: () => void;
  locale?: string;
  store?: boolean;
};

export function ErrorState({
  reset,
  locale = "en",
  store = false,
}: ErrorStateProps) {
  const ar = locale === "ar";

  return (
    <main
      dir={ar ? "rtl" : "ltr"}
      className="flex min-h-[70vh] items-center justify-center px-6 py-20"
    >
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-ubh-navy/5">
          <AlertCircle
            className="h-9 w-9 text-ubh-gold"
            strokeWidth={1.5}
          />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-ubh-gold">
          {ar ? "حدث خطأ" : "Something went wrong"}
        </p>

        <h1 className="font-serif text-4xl font-semibold text-ubh-navy sm:text-5xl">
          {ar
            ? "حدث خطأ غير متوقع"
            : store
              ? "We couldn't load the store"
              : "We couldn't load this page"}
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-600">
          {ar
            ? "يرجى المحاولة مرة أخرى. إذا استمرت المشكلة، حاول العودة لاحقاً."
            : "Please try again. If the problem continues, please try again later."}
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ubh-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-ubh-blue"
          >
            <RefreshCw className="h-4 w-4" />
            {ar ? "حاول مرة أخرى" : "Try Again"}
          </button>

          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-ubh-navy/15 px-6 py-3 text-sm font-semibold text-ubh-navy transition hover:bg-ubh-navy/5"
          >
            <Home className="h-4 w-4" />
            {ar ? "الرئيسية" : "Home"}
          </Link>
        </div>
      </div>
    </main>
  );
}