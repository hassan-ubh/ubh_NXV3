
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
} from "lucide-react";

import {
  digitalSolutions,
  getDigitalSolutionBySlug,
} from "@/lib/digital-solutions";
import { isLocale } from "@/lib/i18n";
import { Container } from "@/components/shared/Container";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

/* -------------------------------------------------------------------------- */
/* STATIC PARAMS                                                             */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return digitalSolutions.flatMap((solution) =>
    (["en", "ar"] as const).map((locale) => ({
      locale,
      slug: solution.slug,
    })),
  );
}

/* -------------------------------------------------------------------------- */
/* METADATA                                                                  */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const solution = getDigitalSolutionBySlug(slug);

  if (!solution) {
    return {};
  }

  const title = solution.title[locale];
  const description = solution.shortDescription[locale];

  return {
    title: `${title} | University Book House`,
    description,

    alternates: {
      canonical: `/${locale}/digital-solutions/${slug}`,
      languages: {
        en: `/en/digital-solutions/${slug}`,
        ar: `/ar/digital-solutions/${slug}`,
      },
    },

    openGraph: {
      title: `${title} | University Book House`,
      description,
      type: "article",
      url: `/${locale}/digital-solutions/${slug}`,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                      */
/* -------------------------------------------------------------------------- */

export default async function DigitalSolutionDetailPage({
  params,
}: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const solution = getDigitalSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const isArabic = locale === "ar";

  const otherSolutions = digitalSolutions.filter(
    (item) => item.slug !== solution.slug,
  );

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      lang={locale}
      className="min-h-screen bg-ubh-canvas"
    >
      {/* ================================================================== */}
      {/* HERO                                                              */}
      {/* ================================================================== */}

      <section className="relative overflow-hidden bg-ubh-navy text-white">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-ubh-blue-bright/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-ubh-gold/10 blur-3xl" />
        </div>

        <Container>
          <div className="relative py-16 sm:py-20 lg:py-24">
            {/* Breadcrumb */}
            <nav
              aria-label={isArabic ? "مسار التنقل" : "Breadcrumb"}
              className="mb-8 flex items-center gap-2 text-sm text-white/60"
            >
              <Link
                href={`/${locale}`}
                className="transition-colors hover:text-white"
              >
                {isArabic ? "الرئيسية" : "Home"}
              </Link>

              <ChevronRight
                className={`h-4 w-4 ${
                  isArabic ? "rotate-180" : ""
                }`}
              />

              <Link
                href={`/${locale}/digital-solutions`}
                className="transition-colors hover:text-white"
              >
                {isArabic ? "الحلول الرقمية" : "Digital Solutions"}
              </Link>

              <ChevronRight
                className={`h-4 w-4 ${
                  isArabic ? "rotate-180" : ""
                }`}
              />

              <span className="truncate text-white/90">
                {solution.title[locale]}
              </span>
            </nav>

            {/* Hero content */}
            <div className="max-w-4xl">
              {/* Icon */}
              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur">
                <Lightbulb className="h-8 w-8 text-ubh-gold-light" />
              </div>

              {/* Title */}
              <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {solution.title[locale]}
              </h1>

              {/* Short description */}
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl">
                {solution.shortDescription[locale]}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* MAIN CONTENT                                                       */}
      {/* ================================================================== */}

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
            {/* ------------------------------------------------------------ */}
            {/* DESCRIPTION                                                  */}
            {/* ------------------------------------------------------------ */}

            <article>
              <div className="max-w-3xl">
                <p className="text-lg leading-9 text-slate-600 sm:text-xl">
                  {solution.description[locale]}
                </p>
              </div>

              {/* Features */}
              <div className="mt-12">
                <div className="mb-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ubh-gold">
                    {isArabic ? "المزايا الرئيسية" : "Key Features"}
                  </p>

                  <h2 className="mt-2 font-serif text-3xl font-medium text-ubh-navy sm:text-4xl">
                    {isArabic
                      ? "ما الذي نقدمه؟"
                      : "What this solution can support"}
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {solution.features.map((feature, index) => (
                    <div
                      key={`${feature[locale]}-${index}`}
                      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ubh-gold/40 hover:shadow-md"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ubh-gold/10">
                          <CheckCircle2 className="h-4 w-4 text-[#b07d25]" />
                        </div>

                        <p className="text-[15px] font-medium leading-7 text-slate-700">
                          {feature[locale]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------ */}
            {/* SIDEBAR                                                      */}
            {/* ------------------------------------------------------------ */}

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* Accent */}
                <div className="h-1.5 bg-ubh-gold" />

                <div className="p-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ubh-gold">
                    {isArabic ? "الحلول الرقمية" : "Digital Solutions"}
                  </p>

                  <h2 className="mt-3 font-serif text-2xl font-medium text-ubh-navy">
                    {isArabic
                      ? "استكشف حلولنا الأخرى"
                      : "Explore other solutions"}
                  </h2>

                  <div className="mt-6 space-y-2">
                    {otherSolutions.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${locale}/digital-solutions/${item.slug}`}
                        className="group flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-slate-50"
                      >
                        <span className="pr-4 text-sm font-medium leading-6 text-slate-700 group-hover:text-ubh-navy">
                          {item.title[locale]}
                        </span>

                        <ArrowRight
                          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:text-ubh-gold ${
                            isArabic
                              ? "rotate-180 group-hover:-translate-x-1"
                              : "group-hover:translate-x-1"
                          }`}
                        />
                      </Link>
                    ))}
                  </div>

                  {/* Contact CTA */}
                  <div className="mt-7 border-t border-slate-100 pt-7">
                    <p className="text-sm leading-6 text-slate-500">
                      {isArabic
                        ? "هل ترغب في معرفة المزيد عن حلولنا؟ تواصل مع فريقنا."
                        : "Interested in learning more? Talk to our team about your requirements."}
                    </p>

                    <Link
                      href={`/${locale}/contact-us`}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ubh-navy px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-ubh-blue-bright"
                    >
                      {isArabic ? "تواصل معنا" : "Contact Us"}

                      {isArabic ? (
                        <ArrowLeft className="h-4 w-4" />
                      ) : (
                        <ArrowRight className="h-4 w-4" />
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* BOTTOM CTA                                                        */}
      {/* ================================================================== */}

      <section className="border-t border-slate-200 bg-white">
        <Container>
          <div className="flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ubh-gold">
                {isArabic
                  ? "هل لديك متطلبات خاصة؟"
                  : "Have a specific requirement?"}
              </p>

              <h2 className="mt-2 max-w-2xl font-serif text-3xl font-medium text-ubh-navy">
                {isArabic
                  ? "دعنا نستكشف كيف يمكننا دعم مؤسستك."
                  : "Let’s explore how we can support your institution."}
              </h2>
            </div>

            <Link
              href={`/${locale}/contact-us`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-ubh-gold px-6 py-3.5 text-sm font-semibold text-ubh-navy transition-all duration-300 hover:bg-ubh-gold-light"
            >
              {isArabic ? "ابدأ محادثة" : "Start a Conversation"}

              {isArabic ? (
                <ArrowLeft className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
