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
import { newsArticles } from "@/lib/news";
import { Container } from "@/components/shared/Container";
import { NewsCard } from "@/components/news/NewsCard";

type NewsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? "الأخبار والمستجدات | دار الكتب الجامعية"
      : "News & Insights | University Book House",
    description: isArabic
      ? "تابع آخر أخبار دار الكتب الجامعية ومستجداتها ورؤاها في مجال النشر والمعرفة الأكاديمية."
      : "Explore the latest University Book House news, updates and insights across academic publishing and knowledge.",
    alternates: {
      languages: {
        en: "/en/news",
        ar: "/ar/news",
      },
    },
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const isArabic = locale === "ar";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  const featured =
    newsArticles.find((article) => article.featured) ??
    newsArticles[0];

  const remaining = featured
    ? newsArticles.filter((article) => article.slug !== featured.slug)
    : [];

  const content = {
    breadcrumbHome: isArabic ? "الرئيسية" : "Home",
    breadcrumbNews: isArabic ? "الأخبار" : "News",
    eyebrow: isArabic ? "الأخبار والمستجدات" : "News & Insights",
    title: isArabic
      ? "أخبار دار الكتب الجامعية"
      : "Stories That Move Knowledge Forward",
    description: isArabic
      ? "تابع آخر أخبارنا ومبادراتنا ومستجداتنا في عالم الكتب والنشر والمعرفة الأكاديمية."
      : "Discover the latest updates, initiatives and stories from University Book House and the world of academic knowledge.",
    featuredLabel: isArabic ? "خبر مميز" : "Featured Story",
    latestTitle: isArabic ? "آخر المستجدات" : "Latest from UBH",
    latestDescription: isArabic
      ? "اكتشف أبرز الأخبار والمستجدات من دار الكتب الجامعية."
      : "Explore the latest updates and stories from University Book House.",
    allLabel: isArabic ? "من أخبارنا" : "From Our Newsroom",
    allTitle: isArabic ? "المزيد من الأخبار" : "More Stories",
    readArticle: isArabic ? "اقرأ الخبر" : "Read Story",
    emptyTitle: isArabic ? "لا توجد أخبار حاليًا" : "No news stories yet",
    emptyDescription: isArabic
      ? "نعمل على تحديث هذا القسم. يرجى العودة قريبًا للاطلاع على آخر المستجدات."
      : "We're preparing our latest updates. Please check back soon for new stories.",
    contact: isArabic ? "تواصل معنا" : "Contact UBH",
  };

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(isArabic ? "ar-AE" : "en-AE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(date));

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      lang={locale}
      className="min-h-screen bg-ubh-canvas"
    >
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ubh-navy text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-ubh-gold/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-24 h-[26rem] w-[26rem] rounded-full bg-blue-500/10 blur-3xl"
        />

        <Container className="relative py-14 sm:py-20 lg:py-24">
          {/* <nav
            aria-label={isArabic ? "مسار التنقل" : "Breadcrumb"}
            className="flex items-center gap-2 text-xs text-slate-400 sm:text-sm"
          >
            <Link
              href={`/${locale}`}
              className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light"
            >
              {content.breadcrumbHome}
            </Link>

            <span aria-hidden="true" className="text-white/30">
              /
            </span>

            <span aria-current="page" className="text-white">
              {content.breadcrumbNews}
            </span>
          </nav> */}

          <div className="mt-10 max-w-4xl sm:mt-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-ubh-gold-light/25 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#e4ba6e] sm:text-sm">
              <Newspaper className="h-4 w-4" aria-hidden="true" />
              {content.eyebrow}
            </div>

            <h1 className="mt-6 max-w-4xl text-balance font-serif text-4xl leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              {content.description}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="mt-12 h-px bg-gradient-to-r from-ubh-gold-light/50 via-white/10 to-transparent sm:mt-16"
          />
        </Container>
      </section>

      {/* Featured story */}
      {featured ? (
        <section className="py-14 sm:py-18 lg:py-20">
          <Container>
            <SectionHeading
              eyebrow={content.featuredLabel}
              title={content.latestTitle}
              description={content.latestDescription}
            />

            <article className="group mt-8 overflow-hidden rounded-2xl border border-[#e1e8f0] bg-white shadow-[0_12px_40px_-28px_rgba(6,26,55,0.3)] transition-shadow duration-300 hover:shadow-[0_20px_55px_-30px_rgba(6,26,55,0.35)] sm:mt-10 sm:rounded-3xl">
              <div className="grid lg:grid-cols-2">
                <Link
                  href={`/${locale}/news/${featured.slug}`}
                  aria-label={`${content.readArticle}: ${featured.title[locale]}`}
                  className="relative block aspect-[16/10] overflow-hidden bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ubh-blue-bright lg:aspect-auto lg:min-h-[400px]"
                >
                  <Image
                    src={featured.image}
                    alt={featured.title[locale]}
                    fill
                    priority
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ubh-navy/25 via-transparent to-transparent"
                  />
                </Link>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#f5f0e7] px-3 py-1.5 text-xs font-semibold text-[#8c6323]">
                      {featured.category[locale]}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                      <CalendarDays
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <time dateTime={featured.date}>
                        {formatDate(featured.date)}
                      </time>
                    </span>
                  </div>

                  <h2 className="mt-5 font-serif text-2xl leading-snug text-ubh-navy sm:text-3xl lg:text-4xl">
                    <Link
                      href={`/${locale}/news/${featured.slug}`}
                      className="rounded-sm transition-colors hover:text-ubh-blue-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-blue-bright"
                    >
                      {featured.title[locale]}
                    </Link>
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-ubh-blue-muted sm:text-base sm:leading-8">
                    {featured.excerpt[locale]}
                  </p>

                  <div className="mt-7">
                    <Link
                      href={`/${locale}/news/${featured.slug}`}
                      className="group/link inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ubh-navy px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ubh-blue-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-blue-bright focus-visible:ring-offset-2"
                    >
                      {content.readArticle}
                      <Arrow
                        className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </Container>
        </section>
      ) : (
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center sm:px-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ubh-gold/10 text-[#a87520]">
                <Newspaper className="h-6 w-6" aria-hidden="true" />
              </div>

              <h2 className="mt-5 font-serif text-2xl text-ubh-navy sm:text-3xl">
                {content.emptyTitle}
              </h2>

              <p className="mt-3 text-sm leading-7 text-ubh-blue-muted sm:text-base">
                {content.emptyDescription}
              </p>

              <Link
                href={`/${locale}/contact-us`}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-ubh-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ubh-blue-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-blue-bright focus-visible:ring-offset-2"
              >
                {content.contact}
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Remaining news */}
      {remaining.length > 0 && (
        <section className="border-t border-[#e4eaf1] bg-white py-14 sm:py-18 lg:py-20">
          <Container>
            <SectionHeading
              eyebrow={content.allLabel}
              title={content.allTitle}
            />

            <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {remaining.map((article) => (
                <NewsCard
                  key={article.slug}
                  article={article}
                  locale={locale}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ubh-gold-deep sm:text-sm">
        {eyebrow}
      </p>

      <h2 className="mt-3 font-serif text-2xl leading-tight text-ubh-navy sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-ubh-blue-muted sm:text-base sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}