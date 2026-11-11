import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

import { copy, isLocale } from "@/lib/i18n";
import { Container } from "@/components/shared/Container";
import { publishers } from "@/data/publishers";
import { PublisherDirectory } from "@/components/publishers/PublisherDirectory";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { websiteBreadcrumbs } from "@/components/shared/breadcrumb-config";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const t = copy[locale].publishers;
  const isArabic = locale === "ar";

  return (
    <>
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}


      
<section className="relative isolate overflow-hidden bg-ubh-navy text-white">
  {/* Background image */}
  <div className="absolute inset-0">
    <Image
      src="/images/main_images/rain-bennett-i3-dBKC9ZnM-unsplash.jpg"
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
    />

    {/* Overall contrast overlay */}
    <div className="absolute inset-0 bg-ubh-navy/35" />

    {/* Direction-aware gradient */}
    <div
      className={`absolute inset-0 bg-gradient-to-r ${
        isArabic
          ? "from-transparent via-ubh-navy/45 to-ubh-navy/85"
          : "from-ubh-navy/85 via-ubh-navy/45 to-transparent"
      }`}
    />

    {/* Subtle bottom fade */}
    <div className="absolute inset-0 bg-gradient-to-t from-ubh-navy/30 via-transparent to-transparent" />
  </div>

  <Container className="relative z-10">
    <div className="flex min-h-[340px] flex-col justify-center pb-10 pt-24 sm:min-h-[400px] sm:pb-12 md:min-h-[440px] md:pt-[105px]">
      {/* Breadcrumb */}
      {/* Premium Breadcrumb */}
{/* <div className="mb-7">
  <Breadcrumbs
    locale={locale}
    items={websiteBreadcrumbs(locale, "publishers")}
    variant="dark"
  />
</div> */}
      {/* <nav
        aria-label={isArabic ? "مسار التنقل" : "Breadcrumb"}
        className="flex items-center gap-2 text-[11px] text-white/75 sm:text-xs"
      >
        <Link
          href={`/${locale}`}
          className="transition-colors hover:text-ubh-gold-light"
        >
          {t.breadcrumbHome}
        </Link>

        <span aria-hidden="true">/</span>

        <span aria-current="page" className="text-white">
          {t.breadcrumbPublishers}
        </span>
      </nav> */}

      {/* Hero content */}
      <div className="mt-8 max-w-[560px]">
        <div className="mb-4 h-[3px] w-12 rounded-full bg-ubh-gold" />

        <h1 className="font-serif text-3xl leading-tight sm:text-4xl md:text-[48px] md:leading-[1.15]">
          {t.title}
        </h1>

        <p className="mt-4 max-w-[500px] text-[13px] leading-6 text-white/85 sm:text-sm sm:leading-7">
          {t.description}
        </p>

         {/* Hero search */}
              {/* <form
                action={`/${locale}/publishers`}
                method="get"
                role="search"
                className="mt-5 flex h-11 w-full max-w-[450px] overflow-hidden rounded-[5px] bg-white shadow-lg sm:h-[46px]"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3 px-3.5">
                  <Search
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-ubh-muted"
                  />

                  <input
                    type="search"
                    name="q"
                    placeholder={t.searchPlaceholder}
                    aria-label={t.search}
                    className="w-full min-w-0 bg-transparent text-xs text-ubh-blue-deep outline-none placeholder:text-[#8194aa] sm:text-[13px]"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-12 shrink-0 items-center justify-center bg-ubh-gold text-white transition-colors hover:bg-[#b8832e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
                  aria-label={t.search}
                >
                  <ArrowRight
                    size={18}
                    className={isArabic ? "rotate-180" : ""}
                  />
                </button>
              </form> */}

        {/* Add the search form here if you want search inside the hero */}
      </div>
    </div>
  </Container>
</section>


      {/* ================================================================ */}
      {/* PUBLISHER DIRECTORY                                              */}
      {/* ================================================================ */}

      <main
        dir={isArabic ? "rtl" : "ltr"}
        className="bg-ubh-canvas"
      >
        <Container>
          <div className="py-7 sm:py-8 md:py-10">
            <PublisherDirectory
              publishers={publishers}
              locale={locale}
            />
          </div>
        </Container>
      </main>

      {/* ================================================================ */}
      {/* CTA                                                              */}
      {/* ================================================================ */}

      <section className="relative overflow-hidden bg-ubh-navy text-white">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/publishers/publishers-cta.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-ubh-navy/80" />

          <div
            className={`absolute inset-0 bg-gradient-to-r ${
              isArabic
                ? "from-transparent via-ubh-navy/90 to-ubh-navy"
                : "from-ubh-navy via-ubh-navy/90 to-ubh-navy/55"
            }`}
          />
        </div>

        <Container className="relative z-10">
          <div className="flex min-h-[190px] flex-col items-start justify-center gap-6 py-8 md:flex-row md:items-center md:justify-between md:gap-8">
            {/* CTA text */}
            <div className="max-w-full md:max-w-[600px]">
              <h2 className="font-serif text-2xl leading-tight sm:text-3xl md:text-[34px] md:leading-[1.1]">
                {t.ctaTitle}
                <br />
                {t.ctaTitleSecondLine}
              </h2>

              <p className="mt-3 text-xs leading-relaxed text-white/75 sm:text-[13px]">
                {t.ctaDescription}
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[160px]">
              <Link
                href={`/${locale}/institutions`}
                className="flex min-h-10 items-center justify-center gap-2 rounded-[4px] bg-ubh-gold-light px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-ubh-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ubh-gold-light"
              >
                {t.institutions}

                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className={isArabic ? "rotate-180" : ""}
                />
              </Link>

              <Link
                href={`/${locale}/contact-us`}
                className="flex min-h-10 items-center justify-center rounded-[4px] border border-ubh-gold-light px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t.contact}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
