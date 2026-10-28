import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import type { NewsArticle, Locale } from "@/lib/news";

type NewsCardProps = {
  article: NewsArticle;
  locale: Locale;
};

export function NewsCard({
  article,
  locale,
}: NewsCardProps) {
  const isArabic = locale === "ar";

  return (
    <article
      dir={isArabic ? "rtl" : "ltr"}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#e3e9f0] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
    >
      {/* Image */}
      <Link
        href={`/${locale}/news/${article.slug}`}
        className="relative block aspect-[16/9] overflow-hidden bg-[#f3f6f9]"
      >
        <Image
          src={article.image}
          alt={article.title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {/* Category + Date */}
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#f2f6fa] px-3 py-1 text-[9px] font-semibold uppercase tracking-wide text-ubh-blue-muted">
            {article.category[locale]}
          </span>

          <div className="flex items-center gap-1.5 text-[9px] text-[#8a9bb0]">
            <CalendarDays size={12} />

            <time dateTime={article.date}>
              {new Intl.DateTimeFormat(
                locale === "ar" ? "ar-AE" : "en-AE",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                },
              ).format(new Date(article.date))}
            </time>
          </div>
        </div>

        {/* Title */}
        <Link
          href={`/${locale}/news/${article.slug}`}
          className="mt-4"
        >
          <h2 className="font-serif text-xl leading-[1.25] text-ubh-blue transition-colors group-hover:text-ubh-blue-bright">
            {article.title[locale]}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="mt-3 line-clamp-3 text-[12px] leading-[1.7] text-[#637894]">
          {article.excerpt[locale]}
        </p>

        {/* Read more */}
        <div className="mt-auto pt-5">
          <Link
            href={`/${locale}/news/${article.slug}`}
            className="inline-flex items-center gap-2 text-[10px] font-bold text-ubh-blue-bright transition-colors hover:text-ubh-gold"
          >
            {isArabic ? "اقرأ المزيد" : "Read Article"}

            <ArrowRight
              size={13}
              className={
                isArabic
                  ? "rotate-180 transition-transform duration-200 group-hover:-translate-x-1"
                  : "transition-transform duration-200 group-hover:translate-x-1"
              }
            />
          </Link>
        </div>
      </div>
    </article>
  );
}