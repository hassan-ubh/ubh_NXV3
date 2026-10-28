"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  Clock3,
  Cpu,
  Globe2,
  GraduationCap,
  Handshake,
  Laptop,
  Library,
  Lightbulb,
  Network,
  ShoppingBag,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/shared/Button";
import { Locale, copy } from "@/lib/i18n";
import { SafeImage } from "../shared/SafeImage";
import {
  homeStats,
  publishers,
  institutions,
  books,
  ecosystemItems,
} from "@/lib/data";

const icons = [
  Library,
  Globe2,
  GraduationCap,
  Users,
  Handshake,
  BookOpen,
  Building2,
  Globe2,
];

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale].home;
  const impactStats: [string, string][] = [
    ["25M+", t.impactStats.books],
    ["8M+", t.impactStats.digital],
    ["5,000+", t.impactStats.libraries],
    ["1,200+", t.impactStats.universities],
    ["500K+", t.impactStats.researchers],
    ["1.5M+", t.impactStats.titles],
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const publicationCategories = [
    { key: "all", label: t.publicationCategories.all },
    { key: "Engineering", label: t.publicationCategories.engineering },
    { key: "Medicine", label: t.publicationCategories.medicine },
    { key: "Law", label: t.publicationCategories.law },
    { key: "Business", label: t.publicationCategories.business },
  ];

  const filteredBooks =
    activeCategory === "all"
      ? books
      : books.filter((book) => book.category === activeCategory);
  const formatStatValue = (value: string) => {
    if (locale !== "ar") return value;

    return value
      .replace("10M", "10م")
      .replace("1.5M", "1.5م")
      .replace("24/7", "٢٤/٧")
      .replace(/\d+/g, (num) =>
        num.replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]),
      );
  };
  return (
    <div className="bg-white text-ubh-ink">
      {/* <section className="relative min-h-[650px] overflow-hidden bg-ubh-navy">
        <Image
          src="/images/home/hero.png"
          alt="University Book House headquarters"
          fill
                    sizes="100vw"
          priority
          className="object-cover object-center opacity-90"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-ubh-navy-deep/95 via-ubh-navy/65 to-transparent" />
        <Container className="relative z-10 flex min-h-[650px] items-center pt-20">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl leading-[1.03] text-white sm:text-6xl lg:text-7xl">
              {t.heroTitle}
            </h1>

            <p className="mt-4 font-serif text-2xl text-ubh-gold-light">
              {t.eyebrow}
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-white/80">
              {t.heroText}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={`/${locale}/digital-solutions`}>{t.explore}</Button>

              <Button href={`/${locale}/institutions`} variant="outline">
                {t.institutions}
              </Button>
            </div>
          </div>
        </Container>
      </section> */}

      <section className="relative isolate flex min-h-[540px] items-center overflow-hidden bg-ubh-navy sm:min-h-[600px] lg:min-h-[680px]">
        <Image
          src="/images/home/hero.png"
          alt="University Book House headquarters"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />

        {/* Layered overlays keep the heading readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#031329]/95 via-ubh-navy/75 to-ubh-navy/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ubh-navy/55 via-transparent to-ubh-navy/15"
        />

        <Container className="relative z-10 w-full py-20 sm:py-24 lg:py-28">
          <div
            dir={locale === "ar" ? "rtl" : "ltr"}
            className={`w-full max-w-3xl ${
              locale === "ar" ? "ml-auto text-right" : "mr-auto text-left"
            }`}
          >
            <div className="home-reveal mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-ubh-gold-light" />
              <span className="text-xs font-medium tracking-[0.12em] text-white/85 sm:text-sm">
                {t.eyebrow}
              </span>
            </div>

            <h1 className="home-reveal home-delay-1 max-w-3xl font-serif text-[clamp(2.65rem,7vw,5.6rem)] font-medium leading-[1.08] tracking-tight text-white [text-wrap:balance]">
              {t.heroTitle}
            </h1>

            <p className="home-reveal home-delay-2 mt-6 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8 lg:text-lg">
              {t.heroText}
            </p>

            <div className="home-reveal home-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={`/${locale}/digital-solutions`}>{t.explore}</Button>

              <Button href={`/${locale}/institutions`} variant="outline">
                {t.institutions}
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-3 text-xs text-white/65 sm:text-sm">
              <span className="h-px w-8 bg-ubh-gold-light" />
              <span>
                {locale === "ar"
                  ? "شريككم في المعرفة منذ 1986"
                  : "Advancing Knowledge Since 1986"}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats - overlaps hero and next section */}
      {/* <div className="relative z-20 -mt-12 mx-auto max-w-[1320px] px-5">
        <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl sm:grid-cols-4 lg:grid-cols-8">
          {homeStats.map((key, i) => {
            const Icon = icons[i];

            return (
              <div
                key={key}
                className="border-b border-r border-slate-200 p-4 text-center last:border-r-0 lg:border-b-0"
              >
                <Icon className="mx-auto text-ubh-gold" size={28} />

                <div className="mt-2 text-xl font-bold text-[#081e44]">
                  {t.statsValues[key]}
                </div>

                <div className="mt-1 text-[11px] leading-4 text-slate-500">
                  {t.statsLabels[key]}
                </div>
              </div>
            );
          })}
        </div>
      </div> */}

      <div className="relative z-20 mx-auto -mt-8 w-full max-w-[1320px] px-4 sm:-mt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_16px_50px_rgba(6,26,55,0.10)] sm:grid-cols-4 lg:grid-cols-8">
          {homeStats.map((key, i) => {
            const Icon = icons[i];

            return (
              <div
                key={key}
                className="group flex min-w-0 flex-col items-center justify-center border-b border-e border-slate-100 px-2 py-5 text-center transition-colors duration-200 hover:bg-ubh-gold/[0.05] sm:px-3 sm:py-6 lg:border-b-0"
              >
                {Icon && (
                  <Icon
                    aria-hidden="true"
                    size={24}
                    strokeWidth={1.6}
                    className="text-ubh-gold transition-transform duration-300 group-hover:-translate-y-1"
                  />
                )}

                <div className="mt-3 break-words text-lg font-semibold tracking-tight text-ubh-navy sm:text-xl">
                  {t.statsValues[key]}
                </div>

                <div className="mt-1 max-w-full text-[11px] leading-4 text-slate-500 sm:text-xs">
                  {t.statsLabels[key]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <section className="pt-16 pb-14">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[280px_1fr_190px]">
            <div>
              <h2 className="font-serif text-3xl leading-tight">
                {t.reachTitle}
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {t.reachText}
              </p>

              <Link
                className="mt-6 inline-flex items-center gap-3 rounded bg-ubh-navy px-5 py-3 text-sm font-semibold text-white"
                href={`/${locale}/institutions`}
              >
                {t.reachCta}
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="relative h-64 overflow-hidden rounded-xl">
              <Image
                src="/images/home/world map.png"
                alt="UBH global reach map"
                fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div
              className="
    group
    flex
    h-full
    min-h-[255px]
    w-full
    flex-col
    rounded-2xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-[0_4px_20px_rgba(15,23,42,0.05)]
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-ubh-gold-light/50
    hover:shadow-[0_12px_30px_rgba(15,23,42,0.10)]
  "
            >
              {/* Country */}
              <div className="flex min-h-[52px] items-center gap-3">
                <div
                  className="
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        rounded-xl
        bg-slate-50
        ring-1
        ring-slate-200
      "
                >
                  <span className="fi fi-ae text-lg" aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold leading-5 text-slate-900 sm:text-base">
                    {t.publisherRegion.country}
                  </h3>

                  <p className="mt-1 text-[9px] font-semibold uppercase leading-3 tracking-[0.12em] text-[#b5842d]">
                    {t.publisherRegion.regionalReach}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 h-px shrink-0 bg-slate-100" />

              {/* Stats */}
              <div className="grid flex-1 grid-cols-2">
                {/* Universities */}
                <div className="flex min-h-[76px] flex-col justify-center border-b border-slate-100 pe-4">
                  <span className="min-h-[32px] text-[11px] leading-4 text-slate-400">
                    {t.publisherRegion.universitiesServed}
                  </span>

                  <span className="mt-1 text-lg font-semibold leading-5 tracking-tight text-slate-900">
                    62+
                  </span>
                </div>

                {/* Institutions */}
                <div className="flex min-h-[76px] flex-col justify-center border-b border-slate-100 ps-4">
                  <span className="min-h-[32px] text-[11px] leading-4 text-slate-400">
                    {t.publisherRegion.institutions}
                  </span>

                  <span className="mt-1 text-lg font-semibold leading-5 tracking-tight text-slate-900">
                    215+
                  </span>
                </div>

                {/* Titles */}
                <div className="flex min-h-[76px] flex-col justify-center pe-4 pt-3">
                  <span className="min-h-[32px] text-[11px] leading-4 text-slate-400">
                    {t.publisherRegion.titlesSupplied}
                  </span>

                  <span className="mt-1 text-lg font-semibold leading-5 tracking-tight text-slate-900">
                    250K+
                  </span>
                </div>

                {/* Years */}
                <div className="flex min-h-[76px] flex-col justify-center ps-4 pt-3">
                  <span className="min-h-[32px] text-[11px] leading-4 text-slate-400">
                    {t.publisherRegion.yearsActive}
                  </span>

                  <span className="mt-1 text-lg font-semibold leading-5 tracking-tight text-[#b5842d]">
                    40+
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="mt-12 text-center font-serif text-2xl">{t.impact}</h2>

          {/* <div className="mt-5 grid grid-cols-2 border-y border-slate-200 sm:grid-cols-3 lg:grid-cols-6">
      {impactStats.map(([v, l]) => (
        <div
          key={l}
          className="border-r border-slate-200 p-5 text-center"
        >
          <div className="text-xl font-bold">{v}</div>
          <div className="mt-1 text-xs text-slate-500">{l}</div>
        </div>
      ))}
    </div> */}
          {/* section that is here */}
          <div
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="
    mt-6
    overflow-hidden
    rounded-2xl
    border border-slate-200/80
    bg-white
    shadow-[0_4px_24px_rgba(8,30,68,0.04)]
  "
          >
            {/* Small header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {locale === "ar" ? "أثرنا" : "Our Impact"}
              </span>

              <span className="flex items-center gap-2 text-[10px] font-medium text-[#b5842d]">
                <span className="h-1.5 w-1.5 rounded-full bg-ubh-gold" />
                {locale === "ar" ? "منذ 1986" : "Since 1986"}
              </span>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {impactStats.map(([value, label], i) => (
                <div
                  key={label}
                  className={`
          flex min-h-[82px] flex-col justify-center
          px-4 py-3
          transition-colors duration-200
          hover:bg-[#081e44]/[0.02]
          ${i % 2 === 0 ? "border-e border-slate-100" : ""}
          ${i < 4 ? "border-b border-slate-100" : ""}
          sm:border-b-0
          sm:nth-[3n+1]:border-e
          sm:nth-[3n+2]:border-e
          lg:border-e
          lg:last:border-e-0
        `}
                >
                  <div className="text-xl font-semibold leading-tight tracking-tight text-[#081e44] sm:text-2xl">
                    {value}
                  </div>

                  <div className="mt-1 flex min-h-8 items-start text-[10px] leading-4 text-slate-500 sm:text-[11px]">
                    {label}
                  </div>

                  <div className="mt-2 h-0.5 w-6 rounded-full bg-ubh-gold/70" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      {/* <section className="relative min-h-[650px] overflow-hidden bg-ubh-navy">
        <Image
          src="/images/home/hero.png"
          alt="University Book House headquarters"
          fill
                    sizes="100vw"
          priority
          className="object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ubh-navy-deep/95 via-ubh-navy/65 to-transparent" />
<Container className="relative z-10 flex min-h-[650px] items-center pt-20">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl leading-[1.03] text-white sm:text-6xl lg:text-7xl">
              {t.heroTitle}
            </h1>
            <p className="mt-4 font-serif text-2xl text-ubh-gold-light">
              {t.eyebrow}
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/80">
              {t.heroText}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={`/${locale}/digital-solutions`}>{t.explore}</Button>
              <Button href={`/${locale}/institutions`} variant="outline">
                {t.institutions}
              </Button>
            </div>
          </div>
        </Container>
        <div className="relative z-20 -mb-12 mx-auto max-w-[1320px] px-5">
          <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl sm:grid-cols-4 lg:grid-cols-8">
            {homeStats.map(([value, label], i) => {
              const Icon = icons[i];
              return (
                <div
                  key={label}
                  className="border-b border-r border-slate-200 p-4 text-center  last:border-r-0 lg:border-b-0"
                >
                  <Icon className="mx-auto text-ubh-gold" size={28} />
                  <div className="mt-2 text-2xl font-bold text-[#081e44]">
                    {value}
                  </div>
                  <div className="mt-1 text-[11px] leading-4 text-slate-500">
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pt-28 pb-14">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[280px_1fr_190px]">
            <div>
              <h2 className="font-serif text-3xl leading-tight">
                {t.reachTitle}
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {t.reachText}
              </p>
              <Link
                className="mt-6 inline-flex items-center gap-3 rounded bg-ubh-navy px-5 py-3 text-sm font-semibold text-white"
                href={`/${locale}/institutions`}
              >
                {t.reachCta}
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="relative h-64 overflow-hidden rounded-xl">
              <Image
                src="/images/home/world map.png"
                alt="UBH global reach map"
                fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-lg border border-slate-200 p-5 shadow-sm">
              <div className="font-semibold">
                <span className="fi fi-ae"></span> United Arab Emirates
              </div>
              <div className="mt-4 grid gap-3 text-xs text-slate-500">
                <span>
                  Universities Served{" "}
                  <b className="float-right text-slate-900">62+</b>
                </span>
                <span>
                  Institutions{" "}
                  <b className="float-right text-slate-900">215+</b>
                </span>
                <span>
                  Titles Supplied{" "}
                  <b className="float-right text-slate-900">250,000+</b>
                </span>
                <span>
                  Years Active <b className="float-right text-slate-900">40+</b>
                </span>
              </div>
            </div>
          </div>
          <h2 className="mt-12 text-center font-serif text-2xl">{t.impact}</h2>
          <div className="mt-5 grid grid-cols-2 border-y border-slate-200 sm:grid-cols-3 lg:grid-cols-6">
            {impactStats.map(([v, l], i) => (
              <div
                key={l}
                className="border-r border-slate-200 p-5 text-center"
              >
                <div className="text-xl font-bold">{v}</div>
                <div className="mt-1 text-xs text-slate-500">{l}</div>
              </div>
            ))}
          </div>
        </Container>
      </section> */}

      {/* <section className="pb-14">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-2xl">{t.publishersTitle}</h2>
            <Link
              className="text-sm font-semibold"
              href={`/${locale}/publishers`}
            >
              View All Publishers →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
  {publishers.map((publisher) => (
    <div
      key={publisher.name}
      title={publisher.name}
      className="
        group flex h-24 w-full items-center justify-center
        rounded-xl
        border border-slate-200/80
        bg-white
        px-3
        shadow-[0_2px_10px_rgba(15,23,42,0.04)]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-slate-300
        hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]
      "
    >
      <div className="relative flex h-14 w-full items-center justify-center">
        <Image
          src={publisher.logo}
          alt={`${publisher.name} logo`}
          fill
          sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 12vw"
          className="
            object-contain
            grayscale
            opacity-70
            transition-all duration-300
            group-hover:scale-105
            group-hover:grayscale-0
            group-hover:opacity-100
          "
        />
      </div>
    </div>
  ))}
</div>
        </Container>
      </section> */}
      <section
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="relative overflow-hidden bg-white py-16 sm:py-20"
      >
        <Container>
          {/* Header */}
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-start">
              {/* Eyebrow */}
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 shrink-0 bg-ubh-gold-light" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b88632]">
                  {t.publishersEyebrow}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl font-medium tracking-tight text-ubh-navy sm:text-4xl">
                {t.publishersTitle}
              </h2>

              {/* Description */}
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                {t.publishersDescription}
              </p>
            </div>

            {/* View All */}
            <Link
              href={`/${locale}/publishers`}
              className="
          group
          inline-flex
          w-fit
          shrink-0
          items-center
          gap-2
          rounded-full
          border
          border-slate-200
          bg-white
          px-5
          py-2.5
          text-sm
          font-semibold
          text-ubh-navy
          shadow-sm
          transition-all
          duration-300
          hover:border-ubh-gold-light
          hover:bg-ubh-navy
          hover:text-white
          hover:shadow-md
          focus:outline-none
          focus:ring-2
          focus:ring-ubh-gold-light
          focus:ring-offset-2
        "
            >
              <span>{t.publishersViewAll}</span>

              <span
                aria-hidden="true"
                className={`
    transition-transform
    duration-300
    ${
      locale === "ar"
        ? "group-hover:-translate-x-1"
        : "group-hover:translate-x-1"
    }
  `}
              >
                {locale === "ar" ? "←" : "→"}
              </span>
            </Link>
          </div>

          {/* Publisher marquee */}
          <div
            className="relative -mx-4 overflow-hidden px-4 sm:-mx-6 sm:px-6"
            dir="ltr"
          >
            {/* Left fade */}
            <div
              aria-hidden="true"
              className="
      pointer-events-none
      absolute
      inset-y-0
      left-0
      z-20
      w-16
      bg-gradient-to-r
      from-white
      via-white/90
      to-transparent
      sm:w-24
    "
            />

            {/* Right fade */}
            <div
              aria-hidden="true"
              className="
      pointer-events-none
      absolute
      inset-y-0
      right-0
      z-20
      w-16
      bg-gradient-to-l
      from-white
      via-white/90
      to-transparent
      sm:w-24
    "
            />

            {/* Marquee track */}
            <div className="publisher-track py-3" dir="ltr">
              {/* FIRST GROUP */}
              <div className="publisher-group">
                {publishers.map((publisher) => (
                  <Link
                    key={`first-${publisher.name}`}
                    href={`/${locale}/publishers/${publisher.slug}`}
                    title={publisher.name}
                    className="
            publisher-card
            group
            relative
            flex
            h-28
            w-44
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            border
            border-slate-200/80
            bg-white
            px-6
            shadow-[0_4px_18px_rgba(15,23,42,0.04)]
            transition-all
            duration-300
            hover:-translate-y-1.5
            hover:border-ubh-gold-light/60
            hover:shadow-[0_12px_30px_rgba(15,23,42,0.10)]
            focus:outline-none
            focus:ring-2
            focus:ring-ubh-gold-light
            focus:ring-offset-2
          "
                  >
                    {/* Gold glow */}
                    <div
                      aria-hidden="true"
                      className="
              pointer-events-none
              absolute
              -right-8
              -top-8
              h-20
              w-20
              rounded-full
              bg-ubh-gold-light/10
              blur-2xl
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
                    />

                    {/* Logo */}
                    <div className="publisher-logo-wrapper relative z-10">
                      <SafeImage
                        src={publisher.logo}
                        alt={`${publisher.name} logo`}
                        fill
                        sizes="176px"
                        className="
      publisher-logo
      object-contain
      transition-transform
      duration-300
      group-hover:scale-105
    "
                        fallback={
                          <div className="flex h-full w-full items-center justify-center p-3 text-center">
                            <span className="text-sm font-semibold text-white">
                              {publisher.name}
                            </span>
                          </div>
                        }
                      />
                    </div>

                    {/* Gold bottom line */}
                    <span
                      aria-hidden="true"
                      className="
              absolute
              bottom-0
              left-1/2
              h-0.5
              w-0
              -translate-x-1/2
              bg-ubh-gold-light
              transition-all
              duration-300
              group-hover:w-12
            "
                    />
                  </Link>
                ))}
              </div>

              {/* SECOND GROUP
        Exact duplicate for seamless looping.
    */}
              <div className="publisher-group" aria-hidden="true">
                {publishers.map((publisher) => (
                  <Link
                    key={`second-${publisher.name}`}
                    href={`/${locale}/publishers/${publisher.slug}`}
                    tabIndex={-1}
                    className="
            publisher-card
            group
            relative
            flex
            h-28
            w-44
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            border
            border-slate-200/80
            bg-white
            px-6
            shadow-[0_4px_18px_rgba(15,23,42,0.04)]
            transition-all
            duration-300
            hover:-translate-y-1.5
            hover:border-ubh-gold-light/60
            hover:shadow-[0_12px_30px_rgba(15,23,42,0.10)]
          "
                  >
                    {/* Logo */}
                    <div className="publisher-logo-wrapper relative z-10">
                      <SafeImage
                        src={publisher.logo}
                        alt={`${publisher.name} logo`}
                        fill
                        sizes="176px"
                        className="
      publisher-logo
      object-contain
      transition-transform
      duration-300
      group-hover:scale-105
    "
                        fallback={
                          <div className="flex h-full w-full items-center justify-center p-3 text-center">
                            <span className="text-sm font-semibold text-white">
                              {publisher.name}
                            </span>
                          </div>
                        }
                      />
                    </div>

                    {/* Gold bottom line */}
                    <span
                      aria-hidden="true"
                      className="
              absolute
              bottom-0
              left-1/2
              h-0.5
              w-0
              -translate-x-1/2
              bg-ubh-gold-light
              transition-all
              duration-300
              group-hover:w-12
            "
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Footer label */}
          <div className="mt-8 flex items-center justify-center gap-3 text-xs text-slate-400">
            <span className="h-px w-8 bg-slate-200" />

            <span>{t.publishersTrusted}</span>

            <span className="h-px w-8 bg-slate-200" />
          </div>
        </Container>
      </section>
      <section className="bg-ubh-navy py-8 text-white">
        <Container>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl">{t.institutionsTitle}</h2>

            <Link
              href={`/${locale}/institutions`}
              className="
          group
          inline-flex
          w-fit
          shrink-0
          items-center
          gap-2
          rounded-full
          border
          border-slate-200
          bg-white
          px-5
          py-2.5
          text-sm
          font-semibold
          text-ubh-navy
          shadow-sm
          transition-all
          duration-300
          hover:border-ubh-gold-light
          hover:bg-ubh-navy
          hover:text-white
          hover:shadow-md
          focus:outline-none
          focus:ring-2
          focus:ring-ubh-gold-light
          focus:ring-offset-2
        "
            >
              <span>{t.viewAllInstitutions}</span>

              <span
                aria-hidden="true"
                className={`
    transition-transform
    duration-300
    ${
      locale === "ar"
        ? "group-hover:-translate-x-1"
        : "group-hover:translate-x-1"
    }
  `}
              >
                {locale === "ar" ? "←" : "→"}
              </span>
            </Link>

            {/* <Link
              className="text-sm text-ubh-gold-light"
              href={`/${locale}/institutions`}
            >
              
              <span
                aria-hidden="true"
                className={`
    transition-transform
    duration-300
    ${
      locale === "ar"
        ? "group-hover:-translate-x-1"
        : "group-hover:translate-x-1"
    }
  `}
              >
                {locale === "ar" ? "←" : "→"}
              </span>
            </Link> */}
          </div>

          <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-md bg-white text-ubh-ink sm:grid-cols-3 lg:grid-cols-6">
            {institutions.map((institution) => (
              <div
                key={institution.name}
                className="flex min-h-20 items-center justify-center border-r border-slate-200 p-4"
              >
                <Image
                  src={institution.logo}
                  alt={institution.name}
                  width={160}
                  height={60}
                  className="max-h-12 w-auto max-w-[140px] object-contain"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* <section className="bg-ubh-navy py-8 text-white">
        <Container>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl">{t.institutionsTitle}</h2>
            <Link
              className="text-sm text-ubh-gold-light"
              href={`/${locale}/institutions`}
            >
              View All Institutions →
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-md bg-white text-ubh-ink sm:grid-cols-3 lg:grid-cols-6">
            {institutions.map((x) => (
              <div
                key={x}
                className="flex min-h-20 items-center justify-center border-r border-slate-200 p-4 text-center text-xs font-bold"
              >
                {x}
              </div>
            ))}
          </div>
        </Container>
      </section> */}

      <section
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="border-t border-slate-100 bg-white py-14 sm:py-16"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {/* ─────────────────────────────────────
          ECOSYSTEM
      ───────────────────────────────────── */}
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ubh-gold/10">
                  <Network
                    size={17}
                    strokeWidth={1.8}
                    className="text-ubh-gold"
                  />
                </div>

                <h3 className="text-sm font-semibold tracking-wide text-slate-900">
                  {t.ecosystemTitle}
                </h3>
              </div>

              <p className="max-w-xs text-sm leading-6 text-slate-500">
                {t.ecosystemDescription}
              </p>

              <div className="mt-5 space-y-3">
                {ecosystemItems.map(({ name, icon: Icon }) => (
                  <div
                    key={name.en}
                    className="flex items-center gap-3 text-sm text-slate-700"
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.8}
                      className="shrink-0 text-ubh-gold"
                    />

                    <span>{name[locale]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ─────────────────────────────────────
          OUR JOURNEY
      ───────────────────────────────────── */}
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ubh-gold/10">
                  <Clock3
                    size={17}
                    strokeWidth={1.8}
                    className="text-ubh-gold"
                  />
                </div>

                <h3 className="text-sm font-semibold tracking-wide text-slate-900">
                  {t.journeyTitle}
                </h3>
              </div>

              <div
                className={
                  locale === "ar"
                    ? "border-r border-slate-200 pr-5"
                    : "border-l border-slate-200 pl-5"
                }
              >
                {t.journeyItems.map(({ year, description }) => (
                  <div key={year} className="group relative mb-4 last:mb-0">
                    <span
                      aria-hidden="true"
                      className={`absolute top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-ubh-gold shadow-[0_0_0_2px_rgba(200,148,56,0.35)] transition-transform duration-200 group-hover:scale-110 ${
                        locale === "ar" ? "-right-[26px]" : "-left-[26px]"
                      }`}
                    />

                    <div className="text-sm leading-5">
                      <span className="font-semibold text-slate-900">
                        {year}
                      </span>

                      <span className="mx-1.5 text-ubh-gold">—</span>

                      <span className="text-slate-500">{description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─────────────────────────────────────
          PUBLICATIONS
      ───────────────────────────────────── */}
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ubh-gold/10">
                  <BookOpen
                    size={17}
                    strokeWidth={1.8}
                    className="text-ubh-gold"
                  />
                </div>

                <h3 className="text-sm font-semibold tracking-wide text-slate-900">
                  {t.publicationsTitle}
                </h3>
              </div>

              {/* BOOKS + VIEW ALL */}
              <div className="flex min-h-[245px] flex-col">
                {/* CATEGORY FILTER */}
                <div
                  className="mb-3 flex flex-wrap gap-1"
                  dir={locale === "ar" ? "rtl" : "ltr"}
                >
                  {publicationCategories.map((category) => {
                    const isActive = activeCategory === category.key;

                    return (
                      <button
                        key={category.key}
                        type="button"
                        onClick={() => setActiveCategory(category.key)}
                        className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
                          isActive
                            ? "bg-[#081e44] text-white"
                            : "border border-slate-200 text-slate-500 hover:border-ubh-gold hover:text-ubh-gold"
                        }`}
                      >
                        {category.label}
                      </button>
                    );
                  })}
                </div>

                {/* BOOKS */}
                {/* <div className="min-h-[175px]">
                  {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {filteredBooks.slice(0, 4).map((book) => (
                        <div key={book.id} className="group min-w-0">
                          <div className="relative mx-auto aspect-[3/4] w-[70px] overflow-hidden rounded-sm bg-slate-100">
                            {book.image ? (
                              <Image
                                src={book.image}
                                alt={book.title}
                                fill
                                sizes="70px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <BookOpen
                                  size={15}
                                  className="text-slate-300"
                                />
                              </div>
                            )}
                          </div>

                          <div className="pt-1.5 text-center">
                            <h4 className="line-clamp-2 text-[10px] font-medium leading-3.5 text-slate-800">
                              {book.title}
                            </h4>

                            {book.publisher && (
                              <p className="mt-0.5 line-clamp-1 text-[8px] leading-3 text-slate-400">
                                {book.publisher}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-[175px] items-center justify-center">
                      <p className="text-[9px] text-slate-400">
                        {t.noBooksFound}
                      </p>
                    </div>
                  )}
                </div> */}

                {/* BOOKS */}
                <div className="min-h-[175px]">
                  {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {filteredBooks.slice(0, 4).map((book) => (
                        <Link
                          key={book.id}
                          href={`/${locale}/shop/${book.slug}`}
                          className="group min-w-0 rounded-lg p-1 transition hover:bg-slate-50"
                          aria-label={`View ${book.title}`}
                        >
                          {/* BOOK COVER */}
                          <div className="relative mx-auto aspect-[3/4] w-[70px] overflow-hidden rounded-sm bg-slate-100 shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:shadow-md">
                            {book.cover ? (
                              <Image
                                src={book.cover}
                                alt={book.title}
                                fill
                                sizes="70px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full flex-col items-center justify-center gap-1">
                                <BookOpen
                                  size={18}
                                  className="text-slate-300"
                                />
                                <span className="text-[7px] text-slate-400">
                                  UBH
                                </span>
                              </div>
                            )}
                          </div>

                          {/* BOOK DETAILS */}
                          <div className="pt-2 text-center">
                            <h4 className="line-clamp-2 text-[10px] font-medium leading-3.5 text-slate-800 transition group-hover:text-ubh-gold">
                              {book.title}
                            </h4>

                            {book.publisher && (
                              <p className="mt-0.5 line-clamp-1 text-[8px] leading-3 text-slate-400">
                                {book.publisher}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-[175px] items-center justify-center">
                      <p className="text-[9px] text-slate-400">
                        {t.noBooksFound}
                      </p>
                    </div>
                  )}
                </div>

                {/* VIEW ALL */}
                <div className="mt-auto">
                  <Link
                    href={`/${locale}/shop`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-ubh-gold hover:text-[#a87929]"
                  >
                    {t.viewAllPublications}
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.8}
                      className={locale === "ar" ? "rotate-[-90deg]" : ""}
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* ─────────────────────────────────────
          INSIGHTS
      ───────────────────────────────────── */}
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ubh-gold/10">
                  <Lightbulb
                    size={17}
                    strokeWidth={1.8}
                    className="text-ubh-gold"
                  />
                </div>

                <h3 className="text-sm font-semibold tracking-wide text-slate-900">
                  {t.insightsTitle}
                </h3>
              </div>

              <div className="space-y-4">
                {t.insightItems.map((title, index) => (
                  <Link
                    key={title}
                    href={`/${locale}/research`}
                    className="group block"
                  >
                    <div className="flex gap-3">
                      <span className="mt-0.5 shrink-0 text-[11px] font-semibold text-ubh-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <h4 className="text-sm font-medium leading-5 text-slate-800 transition-colors group-hover:text-ubh-gold">
                          {title}
                        </h4>

                        <p className="mt-1 text-xs text-slate-400">
                          {t.insightDate}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href={`/${locale}/research`}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-ubh-gold transition-colors hover:text-[#a87929]"
              >
                {t.viewAllInsights}

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.8}
                  className={locale === "ar" ? "rotate-[-90deg]" : ""}
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ubh-navy py-20 text-white">
        {/* <Image src="/images/home/cta.jpg" alt="" fill
                    sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover opacity-45"/> */}
        <div className="absolute inset-0 bg-ubh-navy-deep/55" />
        <Container className="relative text-center">
          <h2 className="mx-auto max-w-3xl font-serif text-4xl">
            {t.partnerTitle}
          </h2>
          <p className="mt-3 text-white/75">{t.partnerText}</p>
          <div className="mt-7 flex justify-center gap-3">
            <Button href={`/${locale}/institutions`}>{t.institutions}</Button>
            <Button href={`/${locale}/contact-us`} variant="outline">
              {t.contact}
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
