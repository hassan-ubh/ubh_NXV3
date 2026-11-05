import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";

import {
  getResearchBySlug,
  researchItems,
  type Locale,
} from "@/lib/research";

type ResearchDetailProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function resolveLocale(value: string): Locale {
  return value === "ar" ? "ar" : "en";
}

export function generateStaticParams() {
  return researchItems.flatMap((item) => [
    { locale: "en", slug: item.slug },
    { locale: "ar", slug: item.slug },
  ]);
}

export async function generateMetadata({
  params,
}: ResearchDetailProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const item = getResearchBySlug(slug);

  if (!item) {
    return {};
  }

  return {
    title: item.title[locale],
    description: item.excerpt[locale],
    alternates: {
      languages: {
        en: `/en/research/${slug}`,
        ar: `/ar/research/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: item.title[locale],
      description: item.excerpt[locale],
      images: [
        {
          url: item.image,
          alt: item.title[locale],
        },
      ],
    },
  };
}

export default async function ResearchDetailPage({
  params,
}: ResearchDetailProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const isArabic = locale === "ar";

  const item = getResearchBySlug(slug);

  if (!item) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat(
    isArabic ? "ar-AE" : "en-AE",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    },
  ).format(new Date(item.date));

  const backLabel = isArabic ? "العودة إلى الأبحاث" : "Back to Research";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      lang={locale}
      className="min-h-screen bg-ubh-canvas text-[#17243a] mt-5"
    >
      {/* Article hero */}
      <section className="relative isolate overflow-hidden bg-ubh-navy text-white">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-ubh-gold/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-10 lg:pb-24 lg:pt-16">
          {/* <Link
            href={`/${locale}/research`}
            className="group mb-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-200 transition-colors duration-200 hover:border-ubh-gold-light/60 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy sm:mb-14"
          >
            {isArabic ? (
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            ) : (
              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
              />
            )}
            {backLabel}
          </Link> */}

          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ubh-gold-light/25 bg-ubh-gold-light/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-[#e7bd70] sm:text-sm">
              <BookOpen aria-hidden="true" className="h-4 w-4" />
              <span>{item.category[locale]}</span>
            </div>

            <h1 className="max-w-4xl text-balance font-serif text-3xl font-medium leading-[1.2] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.15]">
              {item.title[locale]}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              {item.excerpt[locale]}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-300">
              <CalendarDays
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-ubh-gold-light"
              />
              <time dateTime={item.date}>{formattedDate}</time>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="h-px bg-gradient-to-r from-transparent via-ubh-gold-light/50 to-transparent"
        />
      </section>

      {/* Article content */}
      <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Article image */}
          <figure className="group relative mb-10 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-[0_12px_40px_-24px_rgba(6,26,55,0.3)] sm:mb-14 sm:rounded-3xl">
            <div className="relative aspect-[16/9]">
              <Image
                src={item.image}
                alt={item.title[locale]}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 900px"
                className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.02]"
              />
            </div>
          </figure>

          {/* Article body */}
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 border-s-2 border-ubh-gold ps-5 sm:mb-10 sm:ps-6">
              <p className="text-lg font-medium leading-8 text-[#263b56] sm:text-xl sm:leading-9">
                {item.excerpt[locale]}
              </p>
            </div>

            <div className="space-y-6 text-base leading-8 text-slate-600 sm:space-y-7 sm:text-[17px] sm:leading-9">
              {item.content.map((paragraph, index) => (
                <p key={`${item.slug}-${index}`}>{paragraph[locale]}</p>
              ))}
            </div>

            {/* Back navigation */}
            <div className="mt-12 border-t border-slate-200 pt-7 sm:mt-16 sm:pt-9">
              <Link
                href={`/${locale}/research`}
                className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-ubh-blue-bright shadow-sm transition-all duration-200 hover:border-ubh-blue-bright/30 hover:bg-blue-50/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-blue-bright focus-visible:ring-offset-2"
              >
                {isArabic ? (
                  <>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    />
                    {backLabel}
                  </>
                ) : (
                  <>
                    <ArrowLeft
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                    />
                    {backLabel}
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Closing section */}
      <section className="border-t border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 sm:px-8 sm:py-12 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-sm font-semibold text-ubh-gold-deep">
              {isArabic ? "دار الكتب الجامعية" : "University Book House"}
            </p>
            <h2 className="mt-2 max-w-xl font-serif text-2xl leading-tight text-ubh-navy sm:text-3xl">
              {isArabic
                ? "اكتشف المزيد من الأبحاث والرؤى الأكاديمية"
                : "Explore more research and academic insights"}
            </h2>
          </div>

          <Link
            href={`/${locale}/research`}
            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-ubh-navy px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ubh-blue-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-blue-bright focus-visible:ring-offset-2 md:self-auto"
          >
            {isArabic ? "جميع الأبحاث" : "Explore Research"}
            {isArabic ? (
              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
              />
            ) : (
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            )}
          </Link>
        </div>
      </section>
    </main>
  );
}