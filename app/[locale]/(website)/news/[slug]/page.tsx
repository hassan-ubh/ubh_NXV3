import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Newspaper,
} from "lucide-react";
import { notFound } from "next/navigation";

import { isLocale } from "@/lib/i18n";
import { getNewsBySlug, newsArticles } from "@/lib/news";
import { Container } from "@/components/shared/Container";

type NewsArticlePageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return newsArticles.flatMap((article) => [
    { locale: "en", slug: article.slug },
    { locale: "ar", slug: article.slug },
  ]);
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const article = getNewsBySlug(slug);

  if (!article) {
    return {};
  }

  const title = article.title[locale];
  const description = article.excerpt[locale];

  return {
    title,
    description,
    alternates: {
      languages: {
        en: `/en/news/${slug}`,
        ar: `/ar/news/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      images: [
        {
          url: article.image,
          alt: title,
        },
      ],
    },
  };
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const isArabic = locale === "ar";
  const BackArrow = isArabic ? ArrowRight : ArrowLeft;
  const ForwardArrow = isArabic ? ArrowLeft : ArrowRight;

  const content = {
    home: isArabic ? "الرئيسية" : "Home",
    news: isArabic ? "الأخبار" : "News",
    backToNews: isArabic ? "العودة إلى الأخبار" : "Back to News",
    publishedOn: isArabic ? "تاريخ النشر" : "Published",
    moreStories: isArabic ? "تابع أخبارنا" : "Explore More Stories",
    moreDescription: isArabic
      ? "اكتشف المزيد من الأخبار والمستجدات من دار الكتب الجامعية."
      : "Discover more updates and stories from University Book House.",
    exploreNews: isArabic ? "جميع الأخبار" : "All News",
  };

  const formattedDate = new Intl.DateTimeFormat(
    isArabic ? "ar-AE" : "en-AE",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    },
  ).format(new Date(article.date));

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      lang={locale}
      className="min-h-screen bg-ubh-canvas text-[#17243a]"
    >
      {/* Article hero */}
      <section className="relative isolate overflow-hidden bg-ubh-navy text-white">
        <Image
    src={article.image}
    alt=""
    fill
    priority
    sizes="100vw"
    className="object-cover object-center"
  />

  {/* Navy overlay for readable text */}
  <div
    aria-hidden="true"
    className="absolute inset-0 bg-gradient-to-r from-ubh-navy/95 via-ubh-navy/85 to-ubh-navy/65"
  />

  {/* Additional top and bottom shading */}
  <div
    aria-hidden="true"
    className="absolute inset-0 bg-gradient-to-b from-ubh-navy/30 via-transparent to-ubh-navy/75"
  />

  {/* Gold ambient accent */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -right-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-ubh-gold/10 blur-3xl"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-40 -left-24 h-[26rem] w-[26rem] rounded-full bg-blue-500/10 blur-3xl"
  />

        <Container className="relative py-10 sm:py-14 lg:py-16">
          {/* Breadcrumb */}
          {/* <nav
            aria-label={isArabic ? "مسار التنقل" : "Breadcrumb"}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-6 text-slate-400 sm:text-sm"
          >
            <Link
              href={`/${locale}`}
              className="rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light"
            >
              {content.home}
            </Link>

            <span aria-hidden="true" className="text-white/30">
              /
            </span>

            <Link
              href={`/${locale}/news`}
              className="rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light"
            >
              {content.news}
            </Link>

            <span aria-hidden="true" className="text-white/30">
              /
            </span>

            <span className="max-w-full text-white/75">
              {article.title[locale]}
            </span>
          </nav> */}

          <div className="mt-9 max-w-4xl sm:mt-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-ubh-gold-light/25 bg-ubh-gold-light/10 px-3.5 py-2 text-xs font-semibold text-[#e4ba6e]">
                <Newspaper className="h-4 w-4" aria-hidden="true" />
                {article.category[locale]}
              </span>

              <span className="inline-flex items-center gap-2 text-xs text-slate-300 sm:text-sm">
                <CalendarDays
                  className="h-4 w-4 shrink-0 text-ubh-gold-light"
                  aria-hidden="true"
                />

                <span className="sr-only">{content.publishedOn}: </span>
                <time dateTime={article.date}>{formattedDate}</time>
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl text-balance font-serif text-3xl font-medium leading-[1.2] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.15]">
              {article.title[locale]}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              {article.excerpt[locale]}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="mt-10 h-px bg-gradient-to-r from-ubh-gold-light/50 via-white/10 to-transparent sm:mt-14"
          />
        </Container>
      </section>

      {/* Article body */}
      <section className="py-10 sm:py-14 lg:py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            {/* Main image */}
            <figure className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef2f6] shadow-[0_16px_45px_-30px_rgba(6,26,55,0.35)] sm:rounded-3xl">
              <div className="relative aspect-[16/9]">
                <Image
                  src={article.image}
                  alt={article.title[locale]}
                  fill
                  priority
                  sizes="(max-width: 640px) calc(100vw - 2.5rem), (max-width: 1024px) calc(100vw - 4rem), 1024px"
                  className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.02]"
                />
              </div>
            </figure>

            {/* Reading column */}
            <article className="mx-auto mt-9 max-w-3xl sm:mt-12">
              <div className="mb-8 border-s-2 border-ubh-gold ps-5 sm:mb-10 sm:ps-6">
                <p className="text-lg font-medium leading-8 text-[#263b56] sm:text-xl sm:leading-9">
                  {article.excerpt[locale]}
                </p>
              </div>

              <div className="space-y-6 text-base leading-8 text-[#526781] sm:space-y-7 sm:text-[17px] sm:leading-9">
                {article.content[locale].map((paragraph, index) => (
                  <p key={`${article.slug}-${index}`}>{paragraph}</p>
                ))}
              </div>

              {/* Return link */}
              <div className="mt-12 border-t border-[#e3e9f0] pt-7 sm:mt-16 sm:pt-9">
                <Link
                  href={`/${locale}/news`}
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-ubh-blue-bright shadow-sm transition-all duration-200 hover:border-ubh-blue-bright/30 hover:bg-blue-50/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-blue-bright focus-visible:ring-offset-2"
                >
                  <BackArrow
                    className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                  {content.backToNews}
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* Related navigation CTA */}
      <section className="border-t border-slate-200/80 bg-white">
        <Container>
          <div className="flex flex-col gap-6 py-10 sm:py-12 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ubh-gold-deep sm:text-sm">
                {content.moreStories}
              </p>

              <p className="mt-3 font-serif text-2xl leading-tight text-ubh-navy sm:text-3xl">
                {content.moreDescription}
              </p>
            </div>

            <Link
              href={`/${locale}/news`}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-ubh-navy px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ubh-blue-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-blue-bright focus-visible:ring-offset-2 md:self-auto"
            >
              {content.exploreNews}
              <ForwardArrow
                className="h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}