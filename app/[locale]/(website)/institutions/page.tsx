import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, BookOpen, Handshake } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/Container";
import { isLocale } from "@/lib/i18n";
import { institutions } from "@/lib/data";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? "المؤسسات | دار الكتب الجامعية"
      : "Institutions | University Book House",
    description: isArabic
      ? "اكتشف خدمات الكتب والموارد والحلول الأكاديمية للمؤسسات التعليمية والجامعات."
      : "Discover academic books, educational resources and tailored solutions for universities and educational institutions.",
    alternates: {
      languages: {
        en: "/en/institutions",
        ar: "/ar/institutions",
      },
    },
  };
}

export default async function InstitutionsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const isArabic = locale === "ar";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  const content = {
    eyebrow: isArabic ? "شراكات أكاديمية" : "Academic Partnerships",
    title: isArabic
      ? "شريككم في بناء المعرفة"
      : "Supporting the Institutions That Shape Tomorrow",
    description: isArabic
      ? "ندعم المؤسسات التعليمية والأكاديمية بالكتب والموارد والحلول التي تساعد على إثراء التعليم والبحث والمعرفة."
      : "We support educational and academic institutions with books, learning resources and solutions that help advance teaching, research and knowledge.",
    contact: isArabic ? "ناقش احتياجات مؤسستك" : "Discuss Your Requirements",
    shop: isArabic ? "استكشف المتجر" : "Explore the Store",
    network: isArabic ? "شبكة المؤسسات" : "Our Network",
    networkTitle: isArabic
      ? "نعمل مع مجتمع أكاديمي متنوع"
      : "Connected to the Academic Community",
    networkDescription: isArabic
      ? "استكشف المؤسسات التعليمية والأكاديمية التي نعمل معها."
      : "Discover the educational and academic institutions represented in our network.",
    services: isArabic ? "كيف ندعم المؤسسات" : "How We Support Institutions",
    servicesTitle: isArabic
      ? "موارد تدعم أهدافكم التعليمية"
      : "Resources for Your Educational Goals",
    servicesDescription: isArabic
      ? "حلول مرنة لتلبية الاحتياجات الأكاديمية والتعليمية."
      : "Flexible support for the changing needs of academic and educational organizations.",
    booksTitle: isArabic ? "الكتب الأكاديمية" : "Academic Books",
    booksDescription: isArabic
      ? "الوصول إلى الكتب والمراجع عبر مجموعة من التخصصات الأكاديمية."
      : "Access academic books and references across a wide range of subjects.",
    resourcesTitle: isArabic ? "موارد تعليمية" : "Learning Resources",
    resourcesDescription: isArabic
      ? "موارد تدعم التدريس والتعلم والبحث الأكاديمي."
      : "Resources to support teaching, learning and academic research.",
    solutionsTitle: isArabic ? "حلول للمؤسسات" : "Institutional Solutions",
    solutionsDescription: isArabic
      ? "ناقش احتياجات مؤسستك لاستكشاف الموارد والخدمات المناسبة."
      : "Discuss your institution's needs to explore relevant resources and services.",
    ctaEyebrow: isArabic ? "للمؤسسات التعليمية" : "For Educational Institutions",
    ctaTitle: isArabic
      ? "لنعمل معًا على دعم المعرفة"
      : "Let's Support Knowledge, Together",
    ctaDescription: isArabic
      ? "تواصل مع فريقنا لمناقشة احتياجات مؤسستك واستكشاف فرص التعاون."
      : "Contact our team to discuss your institution's requirements and explore opportunities to work together.",
    ctaButton: isArabic ? "تواصل مع فريقنا" : "Talk to Our Team",
  };

  return (
    <main dir={isArabic ? "rtl" : "ltr"} lang={locale}>
      {/* Hero */}
      {/* <section className="relative isolate overflow-hidden bg-ubh-navy text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-ubh-gold/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -left-24 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-3xl"
        />

        <Container className="relative py-16 sm:py-20 lg:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-ubh-gold-light/25 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#e4ba6e] sm:text-sm">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              {content.eyebrow}
            </div>

            <h1 className="mt-6 max-w-4xl text-balance font-serif text-4xl leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              {content.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={`/${locale}/contact-us`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ubh-gold px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ubh-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy"
              >
                {content.contact}
                <Arrow className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href={`/${locale}/shop`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                {content.shop}
              </Link>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mt-14 h-px bg-gradient-to-r from-ubh-gold-light/50 via-white/10 to-transparent sm:mt-20"
          />
        </Container>
      </section> */}
      
<section className="relative isolate overflow-hidden bg-ubh-navy text-white">
  {/* Background image */}
  <div
    aria-hidden="true"
    className="absolute inset-0 -z-10"
  >
    <Image
      src="/images/main_images/sharjah_university.jpg"
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
    />
  </div>

  {/* Dark overlay for readable text */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ubh-navy/95 via-ubh-navy/85 to-ubh-navy/55"
  />

  {/* Subtle gold and blue accents */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-ubh-gold/10 blur-3xl"
  />
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-48 -left-24 -z-10 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-3xl"
  />

  <Container className="relative py-16 sm:py-20 lg:py-28">
    <div className="max-w-4xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-ubh-gold-light/25 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#e4ba6e] backdrop-blur-sm sm:text-sm">
        <Building2 className="h-4 w-4" aria-hidden="true" />
        {content.eyebrow}
      </div>

      <h1 className="mt-6 max-w-4xl text-balance font-serif text-4xl leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
        {content.title}
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg sm:leading-9">
        {content.description}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={`/${locale}/contact-us`}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ubh-gold px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ubh-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy"
        >
          {content.contact}
          <Arrow className="h-4 w-4" aria-hidden="true" />
        </Link>

        <Link
          href={`/${locale}/shop`}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy"
        >
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          {content.shop}
        </Link>
      </div>
    </div>

    <div
      aria-hidden="true"
      className="mt-14 h-px bg-gradient-to-r from-ubh-gold-light/50 via-white/10 to-transparent sm:mt-20"
    />
  </Container>
</section>


      {/* Institution network */}
      <section className="bg-ubh-canvas py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ubh-gold-deep sm:text-sm">
              {content.network}
            </p>

            <h2 className="mt-4 font-serif text-3xl leading-tight text-ubh-navy sm:text-4xl lg:text-5xl">
              {content.networkTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ubh-blue-muted sm:text-base sm:leading-8">
              {content.networkDescription}
            </p>
          </div>

          {institutions.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {institutions.map((institution) => (
                <div
                  key={institution.name}
                  className="group flex min-h-32 items-center justify-center rounded-xl border border-[#e1e8f0] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-ubh-gold/50 hover:shadow-[0_12px_30px_-20px_rgba(6,26,55,0.35)] sm:min-h-40 sm:rounded-2xl sm:p-6 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <Image
                    src={institution.logo}
                    alt={institution.name}
                    width={220}
                    height={100}
                    sizes="(max-width: 639px) 40vw, (max-width: 1023px) 28vw, 190px"
                    className="h-auto max-h-16 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:max-h-20 motion-reduce:transition-none"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-sm text-slate-500">
              {isArabic
                ? "سيتم عرض المؤسسات قريبًا."
                : "Institution listings will be available soon."}
            </p>
          )}
        </Container>
      </section>

      {/* Institutional support */}
      <section className="border-y border-slate-200/80 bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ubh-gold-deep sm:text-sm">
              {content.services}
            </p>

            <h2 className="mt-4 font-serif text-3xl leading-tight text-ubh-navy sm:text-4xl">
              {content.servicesTitle}
            </h2>

            <p className="mt-4 text-sm leading-7 text-ubh-blue-muted sm:text-base">
              {content.servicesDescription}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            <SupportCard
              icon={<BookOpen className="h-5 w-5" aria-hidden="true" />}
              title={content.booksTitle}
              description={content.booksDescription}
            />

            <SupportCard
              icon={<Building2 className="h-5 w-5" aria-hidden="true" />}
              title={content.resourcesTitle}
              description={content.resourcesDescription}
            />

            <SupportCard
              icon={<Handshake className="h-5 w-5" aria-hidden="true" />}
              title={content.solutionsTitle}
              description={content.solutionsDescription}
            />
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#f1f5f9] px-5 py-14 sm:px-8 sm:py-20">
        <Container>
          <div className="relative isolate overflow-hidden rounded-2xl bg-ubh-navy px-6 py-10 text-center text-white sm:rounded-3xl sm:px-12 sm:py-14 lg:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-32 -z-10 h-72 w-72 rounded-full bg-ubh-gold/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-40 -left-20 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ubh-gold-light sm:text-sm">
              {content.ctaEyebrow}
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {content.ctaTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              {content.ctaDescription}
            </p>

            <Link
              href={`/${locale}/contact-us`}
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ubh-gold px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ubh-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy"
            >
              {content.ctaButton}
              <Arrow className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

function SupportCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-ubh-canvas p-6 transition-colors duration-200 hover:border-ubh-gold/40 hover:bg-white sm:p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ubh-gold/10 text-[#a87520]">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-ubh-navy">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-ubh-blue-muted">{description}</p>
    </div>
  );
}