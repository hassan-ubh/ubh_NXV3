"use client";

import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

type NotFoundStateProps = {
  locale?: string;
  store?: boolean;
};

export function NotFoundState({
  locale = "en",
  store = false,
}: NotFoundStateProps) {
  const ar = locale === "ar";

  const home = `/${locale}`;
  const shop = `/${locale}/shop`;

  return (
    <main
      dir={ar ? "rtl" : "ltr"}
      className="flex min-h-[calc(100vh-76px)] items-center justify-center px-5 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-ubh-navy/5">
          <SearchX className="h-9 w-9 text-ubh-gold" strokeWidth={1.5} />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-ubh-gold">
          404
        </p>

        <h1 className="font-serif text-4xl font-semibold text-ubh-navy sm:text-5xl">
          {ar ? "الصفحة غير موجودة" : "Page Not Found"}
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-600">
          {ar
            ? store
              ? "عذراً، لم نتمكن من العثور على المنتج أو الصفحة التي تبحث عنها."
              : "عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها."
            : store
              ? "Sorry, we couldn't find the product or page you're looking for."
              : "Sorry, we couldn't find the page you're looking for."}
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={home}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ubh-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-ubh-blue"
          >
            <Home className="h-4 w-4" />
            {ar ? "العودة للرئيسية" : "Back to Home"}
          </Link>

          {store && (
            <Link
              href={shop}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ubh-navy/15 px-6 py-3 text-sm font-semibold text-ubh-navy transition hover:bg-ubh-navy/5"
            >
              <ArrowLeft className="h-4 w-4" />
              {ar ? "العودة للمتجر" : "Back to Shop"}
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
