import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowUpRight } from "lucide-react";

import type { Locale, ResearchItem } from "@/lib/research";

type ResearchCardProps = {
  item: ResearchItem;
  locale: Locale;
};

export function ResearchCard({ item, locale }: ResearchCardProps) {
  const isArabic = locale === "ar";

  return (
    <article
      dir={isArabic ? "rtl" : "ltr"}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <Link href={`/${locale}/research/${item.slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title?.[locale] || item.title?.en || "Research article"}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ubh-navy shadow-sm">
            {item.category[locale]}
          </span>
        </div>

        <div className="p-6">
          <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={item.date}>
              {new Intl.DateTimeFormat(locale === "ar" ? "ar-AE" : "en-AE", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(item.date))}
            </time>
          </div>

          <h3 className="text-xl font-semibold leading-snug text-ubh-navy transition-colors group-hover:text-ubh-blue-bright">
            {item.title[locale]}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
            {item.excerpt[locale]}
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-ubh-blue-bright">
            <span>{isArabic ? "اقرأ المزيد" : "Read More"}</span>

            <ArrowUpRight
              className={`h-4 w-4 transition-transform duration-300 ${
                isArabic
                  ? "rotate-[-90deg] group-hover:-translate-x-1"
                  : "group-hover:translate-x-1"
              }`}
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
