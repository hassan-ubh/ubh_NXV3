import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Globe2,
  LibraryBig,
  Sparkles,
} from "lucide-react";

import { ResearchCard } from "@/components/research/ResearchCard";
import {
  getFeaturedResearch,
  getResearchByLocale,
  type Locale,
} from "@/lib/research";

type ResearchPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function ResearchPage({
  params,
}: ResearchPageProps) {
  const { locale: rawLocale } = await params;

  const locale: Locale = rawLocale === "ar" ? "ar" : "en";
  const isArabic = locale === "ar";

  const research = getResearchByLocale(locale);
  const featured = getFeaturedResearch()[0];

  const remaining = research.filter(
    (item) => item.slug !== featured?.slug,
  );

  const content = {
    en: {
      eyebrow: "RESEARCH · KNOWLEDGE · PERSPECTIVES",
      title: "Ideas That Shape the Future of Knowledge",
      description:
        "Explore perspectives on academic publishing, educational resources, digital learning, and the changing landscape of knowledge.",
      primary: "Explore Insights",
      secondary: "Discover Our Publishers",

      featuredLabel: "EDITOR'S PICK",
      latestLabel: "KNOWLEDGE & PERSPECTIVES",
      latestTitle: "Research & Insights",
      latestDescription:
        "Discover ideas, perspectives, and developments relevant to academic institutions, publishers, researchers, and educators.",
      readArticle: "Read Article",
      exploreMore: "Explore More Insights",
      publishers: "Explore Our Publishers",
      emptyTitle: "More insights are on the way",
      emptyDescription:
        "Check back soon for more research, articles, and perspectives from University Book House.",
      numberLabel: "INSIGHTS",
      discoverTitle: "Knowledge Moves Us Forward",
      discoverDescription:
        "Discover academic publishers, educational resources, and knowledge services that support learning and research.",
      discoverButton: "Discover Our Network",
    },

    ar: {
      eyebrow: "البحث · المعرفة · الرؤى",
      title: "أفكار تسهم في تشكيل مستقبل المعرفة",
      description:
        "اكتشف رؤى حول النشر الأكاديمي والمصادر التعليمية والتعلم الرقمي والتحولات في عالم المعرفة.",
      primary: "استكشف الرؤى",
      secondary: "اكتشف الناشرين",

      featuredLabel: "اختيار المحرر",
      latestLabel: "المعرفة والرؤى",
      latestTitle: "الأبحاث والرؤى",
      latestDescription:
        "اكتشف الأفكار والتطورات التي تهم المؤسسات الأكاديمية والناشرين والباحثين والمعلمين.",
      readArticle: "اقرأ المقال",
      exploreMore: "اكتشف المزيد من الرؤى",
      publishers: "استكشف الناشرين",
      emptyTitle: "المزيد من الرؤى قريبًا",
      emptyDescription:
        "تابعنا للاطلاع على المزيد من الأبحاث والمقالات والرؤى من دار الكتاب الجامعي.",
      numberLabel: "رؤى معرفية",
      discoverTitle: "المعرفة تدفعنا إلى الأمام",
      discoverDescription:
        "اكتشف الناشرين الأكاديميين والمصادر التعليمية والخدمات المعرفية الداعمة للتعلم والبحث.",
      discoverButton: "اكتشف شبكة الناشرين",
    },
  }[locale];

  return (
    <main
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className="overflow-hidden bg-ubh-canvas text-ubh-navy"
    >
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative isolate overflow-hidden bg-ubh-navy text-white">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/research/academic-publishing.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ubh-navy/95 via-ubh-navy/85 to-ubh-navy/65" />

        <div
          aria-hidden="true"
          className="absolute -end-24 -top-24 -z-10 h-72 w-72 rounded-full border border-white/[0.08] sm:h-96 sm:w-96"
        />

        <div
          aria-hidden="true"
          className="absolute -end-12 top-0 -z-10 h-56 w-56 rounded-full bg-ubh-gold/10 blur-3xl sm:h-72 sm:w-72"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-2 text-xs font-semibold tracking-wide text-slate-200 backdrop-blur-sm sm:text-sm">
              <BookOpen
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-ubh-gold-light"
              />
              {content.eyebrow}
            </div>

            <h1 className="mt-6 font-serif text-4xl leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
              {content.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#research"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ubh-gold-light px-6 py-3 text-sm font-semibold text-ubh-navy transition-colors duration-200 hover:bg-ubh-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy"
              >
                {content.primary}

                <ArrowRight
                  aria-hidden="true"
                  className={`h-4 w-4 ${
                    isArabic ? "rotate-180" : ""
                  }`}
                />
              </a>

              <Link
                href={`/${locale}/publishers`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light"
              >
                {content.secondary}

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </Link>
            </div>

            <div className="mt-7 flex items-start gap-3 text-xs leading-6 text-slate-300 sm:text-sm">
              <Sparkles
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0 text-ubh-gold-light"
              />

              <span>{content.latestDescription}</span>
            </div>
          </div>

          {/* HERO SIDE PANEL */}
          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-md rounded-3xl border border-white/15 bg-white/[0.06] p-7 shadow-2xl shadow-black/20 backdrop-blur-md xl:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-ubh-gold-light/25 bg-ubh-gold-light/10 text-ubh-gold-soft">
                <LibraryBig
                  aria-hidden="true"
                  className="h-7 w-7"
                  strokeWidth={1.5}
                />
              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-ubh-gold-soft">
                {content.latestLabel}
              </p>

              <h2 className="mt-3 font-serif text-3xl leading-tight text-white">
                {content.latestTitle}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                {content.description}
              </p>

              <div className="mt-7 h-px bg-white/15" />

              <div className="mt-5 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-300">
                  {content.numberLabel}
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ubh-gold-soft">
                  <Globe2
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RESEARCH CONTENT
      ===================================================== */}
      <section
        id="research"
        className="scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-8 lg:py-24">
          {/* SECTION HEADER */}
          <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ubh-gold-deep sm:text-sm">
                {content.latestLabel}
              </p>

              <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-ubh-navy sm:text-4xl">
                {content.latestTitle}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {content.latestDescription}
              </p>
            </div>

            <Link
              href={`/${locale}/publishers`}
              className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-ubh-blue-bright transition-colors hover:text-ubh-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-4"
            >
              {content.publishers}

              <ArrowRight
                aria-hidden="true"
                className={`h-4 w-4 ${
                  isArabic ? "rotate-180" : ""
                }`}
              />
            </Link>
          </div>

          {/* FEATURED ARTICLE */}
          {featured && (
            <article className="mb-14 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-ubh-navy/[0.06] motion-reduce:transition-none sm:mb-16 sm:rounded-3xl">
              <div className="grid lg:grid-cols-2">
                <Link
                  href={`/${locale}/research/${featured.slug}`}
                  aria-label={`${content.readArticle}: ${featured.title[locale]}`}
                  className="group relative block aspect-[5/4] overflow-hidden bg-slate-100 sm:aspect-[16/10] lg:aspect-auto lg:min-h-[440px]"
                >
                  <Image
                    src={featured.image}
                    alt={featured.title[locale]}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-ubh-navy/55 via-transparent to-transparent" />

                  <span className="absolute start-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-ubh-navy/75 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm sm:start-6 sm:top-6">
                    <Sparkles
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-ubh-gold-soft"
                    />
                    {content.featuredLabel}
                  </span>
                </Link>

                <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10 xl:p-12">
                  <span className="w-fit rounded-full bg-ubh-gold/10 px-3 py-1.5 text-xs font-semibold text-[#94651e]">
                    {featured.category[locale]}
                  </span>

                  <h3 className="mt-5 font-serif text-2xl leading-tight text-ubh-navy sm:text-3xl lg:text-4xl">
                    {featured.title[locale]}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                    {featured.excerpt[locale]}
                  </p>

                  <Link
                    href={`/${locale}/research/${featured.slug}`}
                    className="mt-7 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-xl bg-ubh-navy px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ubh-blue-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2"
                  >
                    {content.readArticle}

                    <ArrowRight
                      aria-hidden="true"
                      className={`h-4 w-4 ${
                        isArabic ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* REMAINING ARTICLES */}
          {remaining.length > 0 ? (
            <>
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ubh-navy/[0.05] text-ubh-blue-bright">
                  <BookOpen
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </div>

                <h2 className="font-serif text-xl font-semibold text-ubh-navy sm:text-2xl">
                  {content.exploreMore}
                </h2>
              </div>

              <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {remaining.map((item) => (
                  <ResearchCard
                    key={item.slug}
                    item={item}
                    locale={locale}
                  />
                ))}
              </div>
            </>
          ) : (
            !featured && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center sm:py-16">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-ubh-navy/[0.05] text-ubh-blue-bright">
                  <BookOpen
                    aria-hidden="true"
                    className="h-6 w-6"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-ubh-navy">
                  {content.emptyTitle}
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
                  {content.emptyDescription}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* =====================================================
          PUBLISHER CTA
      ===================================================== */}
      <section className="relative isolate overflow-hidden border-t border-white/10 bg-ubh-navy text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(200,148,56,0.14),transparent_55%)]"
        />

        <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-ubh-gold-light/25 bg-ubh-gold-light/10 text-ubh-gold-soft">
            <Globe2
              aria-hidden="true"
              className="h-5 w-5"
            />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-ubh-gold-soft sm:text-sm">
            {content.latestLabel}
          </p>

          <h2 className="mx-auto mt-3 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {content.discoverTitle}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            {content.discoverDescription}
          </p>

          <Link
            href={`/${locale}/publishers`}
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ubh-gold-light px-7 py-3 text-sm font-semibold text-ubh-navy transition-colors duration-200 hover:bg-ubh-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy sm:w-auto"
          >
            {content.discoverButton}

            <ArrowRight
              aria-hidden="true"
              className={`h-4 w-4 ${
                isArabic ? "rotate-180" : ""
              }`}
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
