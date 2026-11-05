import Link from "next/link";
import { notFound } from "next/navigation";

import { copy, isLocale } from "@/lib/i18n";
import { Container } from "@/components/shared/Container";
import {
  publishers,
  type PublisherMarket,
  type PublisherLanguage,
} from "@/data/publishers";
import { PublisherDirectory } from "@/components/publishers/PublisherDirectory";

type SearchParams = {
  market?: string | string[];
  language?: string | string[];
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function StorePublishersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const query = await searchParams;

  if (!isLocale(locale)) {
    notFound();
  }

  const marketValue = getSingleValue(query.market);
  const languageValue = getSingleValue(query.language);

  const market: PublisherMarket | undefined =
    marketValue === "local" || marketValue === "international"
      ? marketValue
      : undefined;

  const language: PublisherLanguage | undefined =
    languageValue === "ar" || languageValue === "en"
      ? languageValue
      : undefined;

  const filteredPublishers = publishers.filter((publisher) => {
    const matchesMarket = !market || publisher.market === market;
    const matchesLanguage = !language || publisher.languages.includes(language);

    return matchesMarket && matchesLanguage;
  });

  const isArabic = locale === "ar";
  const t = copy[locale].publishers;

  // const isArabic = locale === "ar";

  const heroContent = {
    all: {
      en: {
        eyebrow: "OUR PUBLISHING PARTNERS",
        title: "Our Publishers",
        description:
          "Explore our publishing partners and discover academic books, professional resources and knowledge from around the world.",
      },
      ar: {
        eyebrow: "شركاء النشر",
        title: "الناشرون",
        description:
          "اكتشف شركاء النشر لدينا وتعرّف على مجموعة واسعة من الكتب الأكاديمية والمراجع المهنية من مختلف أنحاء العالم.",
      },
    },
    international: {
      en: {
        eyebrow: "GLOBAL PUBLISHING PARTNERS",
        title: "International Publishers",
        description:
          "Explore leading international publishers and discover academic and professional publications from across the world.",
      },
      ar: {
        eyebrow: "شركاء النشر الدوليون",
        title: "الناشرون الدوليون",
        description:
          "اكتشف دور النشر الدولية ومجموعة مختارة من الكتب الأكاديمية والمهنية باللغة العربية.",
      },
    },
    local: {
      en: {
        eyebrow: "REGIONAL PUBLISHING PARTNERS",
        title: "Local Publishers",
        description:
          "Discover local publishing houses and explore publications that support regional education, research and knowledge.",
      },
      ar: {
        eyebrow: "شركاء النشر المحليون",
        title: "الناشرون المحليون",
        description:
          "تعرّف على دور النشر المحلية واكتشف إصدارات تدعم التعليم والبحث والمعرفة في المنطقة.",
      },
    },
  };

  const selectedMarket = market ?? "all";
  const content = heroContent[selectedMarket][isArabic ? "ar" : "en"];

  const pageTitle = content.title;
  const pageDescription = content.description;
  const eyebrow = content.eyebrow;

  // const pageTitle = isArabic ? "ناشرونا" : "Our Publishers";
  // const pageDescription = isArabic
  //   ? "اكتشف دور النشر المحلية والدولية ومجموعة الكتب الأكاديمية المتاحة."
  //   : "Explore local and international publishers and discover their academic publications.";

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-ubh-canvas">
      {/* Page introduction */}
      <section className="relative overflow-hidden bg-ubh-navy text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-ubh-blue/40 blur-3xl" />
          <div className="absolute -bottom-40 left-1/4 h-72 w-72 rounded-full bg-ubh-gold/10 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="py-12 sm:py-16 md:py-20">
            {/* <nav
              aria-label={isArabic ? "مسار التنقل" : "Breadcrumb"}
              className="mb-7 flex items-center gap-2 text-xs text-white/60"
            >
              <Link
                href={`/${locale}`}
                className="transition-colors hover:text-white"
              >
                {t.breadcrumbHome}
              </Link>

              <span aria-hidden="true">/</span>

              <Link
                href={`/${locale}/shop`}
                className="transition-colors hover:text-white"
              >
                {isArabic ? "المتجر" : "Store"}
              </Link>

              <span aria-hidden="true">/</span>

              <span aria-current="page" className="text-white">
                {pageTitle}
              </span>
            </nav> */}

            <div className="max-w-3xl">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-8 rounded-full bg-ubh-gold" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ubh-gold sm:text-xs">
                  {eyebrow}
                </span>
              </div>

              <h1 className="font-serif text-3xl font-medium leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl">
                {pageTitle}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                {pageDescription}
              </p>

              <div className="mt-7 flex items-center gap-2">
                <span className="h-1 w-8 rounded-full bg-ubh-gold" />
                <span className="h-1 w-2 rounded-full bg-white/30" />
                <span className="h-1 w-2 rounded-full bg-white/20" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Publisher directory */}
      <section className="py-8 sm:py-10 md:py-12">
        <Container>
          {/* Active filter information */}
          {(market || language) && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-ubh-border bg-white px-4 py-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-ubh-blue-muted">
                <span className="font-semibold text-ubh-navy">
                  {isArabic ? "التصفية:" : "Filtered by:"}
                </span>

                {market && (
                  <span className="rounded-full bg-[#edf3f8] px-3 py-1.5">
                    {market === "international"
                      ? isArabic
                        ? "دولي"
                        : "International"
                      : isArabic
                        ? "محلي"
                        : "Local"}
                  </span>
                )}

                {language && (
                  <span className="rounded-full bg-[#edf3f8] px-3 py-1.5">
                    {language === "en"
                      ? isArabic
                        ? "الإنجليزية"
                        : "English"
                      : isArabic
                        ? "العربية"
                        : "Arabic"}
                  </span>
                )}
              </div>

              <Link
                href={`/${locale}/shop/publishers`}
                className="text-xs font-semibold text-ubh-blue-bright transition-colors hover:text-ubh-gold"
              >
                {isArabic ? "مسح التصفية" : "Clear filters"}
              </Link>
            </div>
          )}

          <PublisherDirectory
            publishers={filteredPublishers}
            locale={locale}
            variant="store"
          />

          {filteredPublishers.length === 0 && (
            <div className="mt-8 rounded-lg border border-dashed border-ubh-border bg-white px-6 py-14 text-center">
              <h2 className="text-lg font-semibold text-ubh-navy">
                {isArabic
                  ? "لا يوجد ناشرون ضمن هذه التصفية"
                  : "No publishers found"}
              </h2>

              <p className="mt-2 text-sm text-ubh-blue-muted">
                {isArabic
                  ? "جرّب اختيار لغة أو تصنيف آخر."
                  : "Try selecting a different market or language."}
              </p>

              <Link
                href={`/${locale}/shop/publishers`}
                className="mt-5 inline-flex items-center justify-center rounded-md bg-ubh-navy px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-ubh-blue"
              >
                {isArabic ? "عرض جميع الناشرين" : "View all publishers"}
              </Link>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
