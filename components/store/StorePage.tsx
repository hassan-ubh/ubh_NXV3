"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Computer,
  GraduationCap,
  Headphones,
  Landmark,
  Microscope,
  Percent,
  Scale,
  ShieldCheck,
  Tag,
  Truck,
  ArrowUpRight,
  Building2,
  Boxes,
  LibraryBig,
  BriefcaseBusiness,
  Sparkles,
  Unlock,
  Library,
  BookMarked,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { useState, useEffect } from "react";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/shared/Button";
import { copy } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { categories } from "@/lib/data";
import { products } from "@/lib/store/catalog";
import { ProductCarousel } from "@/components/store/ProductCarousel";
import { StoreBenefits } from "../shared/StoreBenefits";

import { StoreHeroSection } from "./StoreHero";

type StorePageProps = { locale: Locale };
type Product = (typeof products)[number];
type StoreCopy = (typeof copy)[Locale]["store"];

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type PromoCardProps = {
  locale: Locale;
  title: string;
  description: string;
  action: string;
  href: string;
  kind?: "ebook" | "institutions" | "open-access";
  icon: LucideIcon;
  decorativeIcon?: LucideIcon;
  height?: string;
  minHeight?: string;
  padding?: string;
  titleSize?: string;
  descriptionSize?: string;
};

const CATEGORY_ICONS: LucideIcon[] = [
  GraduationCap,
  Microscope,
  Calculator,
  Landmark,
  Computer,
  BookOpen,
  Scale,
  Calculator,
];

const FEATURES: (Feature & { titleAr: string; descriptionAr: string })[] = [
  {
    icon: BookOpen,
    title: "Books & eBooks",
    description: "Academic knowledge in every discipline",
    titleAr: "الكتب والكتب الإلكترونية",
    descriptionAr: "معرفة أكاديمية متنوعة",
  },
  {
    icon: Tag,
    title: "Competitive Prices",
    description: "Great value on every title",
    titleAr: "أسعار تنافسية",
    descriptionAr: "قيمة مميزة لكل عنوان",
  },
  {
    icon: Percent,
    title: "Special Offers",
    description: "More value for your money",
    titleAr: "عروض مميزة",
    descriptionAr: "وفّر على اختياراتك",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Publishers",
    description: "Quality academic content",
    titleAr: "مصادر موثوقة",
    descriptionAr: "محتوى من ناشرين موثوقين",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "We're here to help",
    titleAr: "دعم العملاء",
    descriptionAr: "نحن هنا للمساعدة",
  },
];

function SectionHeading({
  title,
  href,
  action,
  locale,
}: {
  title: string;
  href: string;
  action: string;
  locale: Locale;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="font-serif text-xl font-semibold tracking-tight text-ubh-navy sm:text-2xl">
        {title}
      </h2>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#9a6a25] transition-colors hover:text-ubh-navy sm:text-sm"
      >
        {action}
        <ArrowRight
          size={14}
          aria-hidden="true"
          className={locale === "ar" ? "rotate-180" : undefined}
        />
      </Link>
    </div>
  );
}

function StoreFeatureStrip({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";

  return (
    <section
      aria-label={isArabic ? "مميزات المتجر" : "Store benefits"}
      className="grid grid-cols-2 gap-y-5 rounded-xl border border-slate-200/80 bg-white p-4 sm:grid-cols-3 sm:p-5 lg:grid-cols-5 lg:gap-0 lg:p-6"
    >
      {FEATURES.map(
        ({ icon: Icon, title, description, titleAr, descriptionAr }, index) => (
          <div
            key={title}
            className={`flex items-start gap-3 ${
              index > 0
                ? "sm:max-lg:border-s lg:border-s lg:border-slate-100 sm:max-lg:ps-4 lg:ps-5"
                : ""
            }`}
          >
            <Icon
              size={22}
              strokeWidth={1.7}
              className="mt-0.5 shrink-0 text-ubh-gold-deep"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <h3 className="text-[13px] font-semibold leading-5 text-ubh-navy">
                {isArabic ? titleAr : title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {isArabic ? descriptionAr : description}
              </p>
            </div>
          </div>
        ),
      )}
    </section>
  );
}

function CategoryPanel({ locale, t }: { locale: Locale; t: StoreCopy }) {
  const isArabic = locale === "ar";

  return (
    <section className="flex h-full min-w-0 flex-col rounded-xl border border-slate-200/80 bg-white p-4 sm:p-5">
      <SectionHeading
        title={t.categories}
        action={t.viewAll}
        href={`/${locale}/shop`}
        locale={locale}
      />

      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="grid flex-1 grid-cols-2 content-start gap-2.5"
      >
        {categories.map((category, index) => {
          const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length];
          const name = isArabic ? category.ar : category.en;

          return (
            <Link
              href={`/${locale}/shop/products?category=${category.slug}`}
              key={category.slug}
              className="group flex min-h-[100px] flex-col items-start justify-center rounded-lg border border-slate-100 bg-slate-50/50 p-3 transition-all duration-200 hover:border-ubh-gold/50 hover:bg-[#fffdfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold sm:p-3.5"
            >
              <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-ubh-gold/10 text-[#a87625] transition-colors group-hover:bg-ubh-gold/15">
                <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
              </span>

              <span className="text-xs font-semibold leading-5 text-ubh-navy">
                {name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function ProductCard({
  product,
  locale,
  noCoverText,
}: {
  product: Product;
  locale: Locale;
  noCoverText: string;
}) {
  const href = `/${locale}/shop/${product.slug}`;
  const authors = product.authors?.filter(Boolean).join(", ");

  return (
    <article className="flex min-w-0 flex-col">
      <Link
        href={href}
        aria-label={product.title}
        className="group overflow-hidden rounded-lg bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          {product.cover ? (
            <Image
              src={product.cover}
              alt={product.title}
              fill
              sizes="(max-width: 639px) 42vw, (max-width: 1023px) 22vw, 160px"
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full min-h-32 flex-col items-center justify-center gap-2 text-xs text-slate-400">
              <BookOpen size={25} strokeWidth={1.5} aria-hidden="true" />
              <span>{noCoverText}</span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-3">
        <Link
          href={href}
          className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-ubh-navy hover:text-[#9a6a25]"
        >
          {product.title}
        </Link>
        <p className="mt-1 line-clamp-2 min-h-8 text-xs leading-4 text-slate-500">
          {authors || product.publisher || ""}
        </p>
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-3">
          <span className="text-sm font-bold text-ubh-navy">
            {product.currency} {Number(product.price).toFixed(2)}
          </span>
          {product.oldPrice != null && product.oldPrice > product.price && (
            <del className="text-xs font-normal text-slate-400">
              {product.currency} {Number(product.oldPrice).toFixed(2)}
            </del>
          )}
        </div>
      </div>
    </article>
  );
}

// function BestSellersPanel({ locale, t }: { locale: Locale; t: StoreCopy }) {
//   const bestSellers = products
//     .filter((product) => product.bestseller)
//     .slice(0, 6);

//   const isArabic = locale === "ar";

//   return (
//     <section className="flex h-full min-w-0 flex-col rounded-xl border border-slate-200/80 bg-white p-4 sm:p-5">
//       <SectionHeading
//         title={t.bestSellers}
//         action={t.viewAllBestSellers}
//         href={`/${locale}/shop/products?collection=best-sellers`}
//         locale={locale}
//       />

//       {bestSellers.length ? (
//         <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
//           {bestSellers.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               locale={locale}
//               noCoverText={t.noCover}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-1 items-center justify-center rounded-lg bg-slate-50 px-4 text-center text-sm leading-6 text-slate-500">
//           {isArabic
//             ? "ستظهر الكتب الأكثر مبيعًا هنا عند توفرها."
//             : "Bestsellers will appear here when available."}
//         </div>
//       )}
//     </section>
//   );
// }

function BestSellersPanel({ locale, t }: { locale: Locale; t: StoreCopy }) {
  const allBestSellers = products
    .filter((product) => product.bestseller)
    .slice(0, 12);

  const isArabic = locale === "ar";
  const DISPLAY_COUNT = 6;

  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const canRotate = allBestSellers.length > DISPLAY_COUNT;

  useEffect(() => {
    if (!canRotate || isPaused) return;

    const interval = window.setInterval(() => {
      setStartIndex((current) => (current + 1) % allBestSellers.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [canRotate, isPaused, allBestSellers.length]);

  const visibleProducts = Array.from(
    { length: Math.min(DISPLAY_COUNT, allBestSellers.length) },
    (_, index) => allBestSellers[(startIndex + index) % allBestSellers.length],
  );

  const goTo = (index: number) => {
    setStartIndex(index);
    setIsPaused(true);
  };

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-shadow duration-500 hover:shadow-lg sm:p-5 lg:p-6"
    >
      {/* SUBTLE TOP ACCENT */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#c89438] to-transparent opacity-80" />

      {/* HEADER */}
      <div className="mb-5 flex w-full items-center justify-between gap-3 border-b border-slate-100 pb-4 sm:mb-6 sm:pb-5">
        {/* TITLE */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c89438]/10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 text-[#b8822c]"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 3 2.2 5.2 5.6.5-4.3 3.7 1.3 5.5-4.8-2.9-4.8 2.9 1.3-5.5-4.3-3.7 5.6-.5L12 3Z" />
              <path d="M5 21h14" />
            </svg>
          </div>

          <div className="min-w-0">
            <div className="mb-0.5 flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#b8822c]">
                {isArabic ? "الأكثر رواجاً" : "POPULAR COLLECTION"}
              </span>
              <span className="h-1 w-1 rounded-full bg-[#c89438]" />
            </div>

            <h2 className="truncate text-base font-bold tracking-tight text-[#061a37] sm:text-lg">
              {t.bestSellers}
            </h2>
          </div>
        </div>

        {/* VIEW ALL */}
        <Link
          href={`/${locale}/shop/products?collection=best-sellers`}
          className="group/link inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-semibold text-[#061a37] transition-all duration-300 hover:bg-[#c89438]/10 hover:text-[#a4772c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] sm:px-3 sm:text-xs"
        >
          <span>{t.viewAllBestSellers}</span>

          <svg
            viewBox="0 0 20 20"
            fill="none"
            className={`h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 ${
              isArabic ? "rotate-180" : ""
            }`}
          >
            <path
              d="M4 10h12M10 4l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* PRODUCTS */}
      {allBestSellers.length > 0 ? (
        <>
          <div
            key={startIndex}
            className="bestseller-products-enter grid flex-1 grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-7"
            aria-live="off"
          >
            {visibleProducts.map((product, index) => (
              <div
                key={product.id}
                className="bestseller-card-enter min-w-0"
                style={{
                  animationDelay: `${index * 75}ms`,
                }}
              >
                <ProductCard
                  product={product}
                  locale={locale}
                  noCoverText={t.noCover}
                />
              </div>
            ))}
          </div>

          {/* CAROUSEL CONTROLS */}
          {canRotate && (
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              {/* COUNTER */}
              <div className="flex items-center gap-2 text-[11px] font-semibold tabular-nums">
                <span className="text-[#061a37]">
                  {String(startIndex + 1).padStart(2, "0")}
                </span>

                <span className="text-slate-300">/</span>

                <span className="text-slate-400">
                  {String(allBestSellers.length).padStart(2, "0")}
                </span>
              </div>

              {/* DOT NAVIGATION */}
              <div
                className="flex items-center gap-1.5"
                role="group"
                aria-label={
                  isArabic
                    ? "التنقل بين الكتب الأكثر مبيعًا"
                    : "Bestseller navigation"
                }
              >
                {allBestSellers.map((product, index) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={
                      isArabic
                        ? `عرض المجموعة ${index + 1}`
                        : `Show bestseller position ${index + 1}`
                    }
                    aria-current={startIndex === index ? "true" : undefined}
                    className={`h-1.5 rounded-full transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] focus-visible:ring-offset-2 ${
                      startIndex === index
                        ? "w-8 bg-[#c89438]"
                        : "w-1.5 bg-slate-200 hover:w-3 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
          {isArabic
            ? "ستظهر الكتب الأكثر مبيعًا هنا عند توفرها."
            : "Bestsellers will appear here when available."}
        </div>
      )}
    </section>
  );
}

export function PromoCard({
  locale,
  title,
  description,
  action,
  href,
  kind,
  icon: Icon,
  decorativeIcon: DecorativeIcon,
  height,
  minHeight,
  padding,
  titleSize,
  descriptionSize,
}: PromoCardProps) {
  const isEbook = kind === "ebook";
  const isArabic = locale === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className={`relative isolate overflow-hidden rounded-xl border ${
        height ?? minHeight ?? "min-h-[220px]"
      } ${padding ?? "p-6 sm:p-7"} ${
        isEbook
          ? "border-ubh-navy bg-ubh-navy text-white"
          : "border-slate-200 bg-white text-ubh-navy"
      }`}
    >
      {/* Large decorative artwork */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-5 ${
          isArabic ? "left-0" : "right-0"
        } -z-10 opacity-20 ${
          isEbook ? "text-[#d9b36d]" : "text-ubh-gold-deep"
        }`}
      >
        <Icon size={142} strokeWidth={0.8} />
      </div>

      {/* Secondary decorative artwork */}
      {DecorativeIcon && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute ${
            isArabic ? "left-7" : "right-7"
          } top-6 -z-10 ${isEbook ? "text-white/10" : "text-ubh-gold-deep/15"}`}
        >
          <DecorativeIcon size={76} strokeWidth={0.8} />
        </div>
      )}

      {/* Main icon */}
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${
          isEbook ? "bg-white/10 text-[#e0b56b]" : "bg-[#fbf5e9] text-[#a87529]"
        }`}
      >
        <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
      </span>

      <h2 className={`mt-4 font-serif ${titleSize ?? "text-2xl"}`}>{title}</h2>

      <p className={`mt-3 ${descriptionSize ?? "text-sm"}`}>{description}</p>

      <Link
        href={href}
        className={`mt-5 inline-flex min-h-10 items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold ${
          isEbook
            ? "border-white/50 text-white hover:bg-white/10"
            : "border-slate-300 text-ubh-navy hover:border-ubh-gold hover:bg-[#fffdfa]"
        }`}
      >
        {action}
        <ArrowRight
          size={15}
          aria-hidden="true"
          className={isArabic ? "rotate-180" : undefined}
        />
      </Link>
    </section>
  );
}

// function Promotions({ locale, t }: { locale: Locale; t: StoreCopy }) {
//   return (
//     <aside className="grid h-full min-w-0 grid-rows-2 gap-4">
//       <PromoCard
//         locale={locale}
//         title={t.ebooksLibrary}
//         description={t.ebooksLibraryDescription}
//         action={t.exploreEbooks}
//         href={`/${locale}/shop/products?type=ebook`}
//         kind="ebook"
//         minHeight="min-h-0"
//         padding="p-4 sm:p-5"
//         titleSize="text-lg sm:text-xl"
//         descriptionSize="text-xs leading-5"
//       />

//       <PromoCard
//         locale={locale}
//         title={t.institutionsTitle}
//         description={t.institutionsDescription}
//         action={t.learnMore}
//         href={`/${locale}/institutions`}
//         kind="institutions"
//         minHeight="min-h-0"
//         padding="p-4 sm:p-5"
//         titleSize="text-lg sm:text-xl"
//         descriptionSize="text-xs leading-5"
//       />
//       <PromoCard
//   locale={locale}
//   title={t.openAccessTitle}
//   description={t.openAccessDescription}
//   action={t.exploreOpenAccess}
//   href={`/${locale}/shop/products?collection=open-access`}
//   kind="open-access"
//   minHeight="min-h-0"
//   padding="p-4 sm:p-5"
//   titleSize="text-lg sm:text-xl"
//   descriptionSize="text-xs leading-5"
// />
//     </aside>
//   );
// }

function Promotions({ locale, t }: { locale: Locale; t: StoreCopy }) {
  return (
    <aside className="grid h-full min-h-0 min-w-0 grid-rows-3 gap-3 sm:gap-4">
      <PromoCard
        locale={locale}
        title={t.ebooksLibrary}
        description={t.ebooksLibraryDescription}
        action={t.exploreEbooks}
        href={`/${locale}/shop/products?type=ebook`}
        kind="ebook"
        icon={BookOpen}
        decorativeIcon={Library}
        minHeight="min-h-0"
        padding="p-3 sm:p-4"
        titleSize="text-base sm:text-lg"
        descriptionSize="text-xs leading-4 sm:leading-5"
      />

      <PromoCard
        locale={locale}
        title={t.institutionsTitle}
        description={t.institutionsDescription}
        action={t.learnMore}
        href={`/${locale}/institutions`}
        kind="institutions"
        icon={Building2}
        decorativeIcon={Landmark}
        minHeight="min-h-0"
        padding="p-3 sm:p-4"
        titleSize="text-base sm:text-lg"
        descriptionSize="text-xs leading-4 sm:leading-5"
      />

      <PromoCard
        locale={locale}
        title={t.openAccessTitle}
        description={t.openAccessDescription}
        action={t.exploreOpenAccess}
        href={`/${locale}/shop/products?collection=open-access`}
        kind="open-access"
        icon={Unlock}
        decorativeIcon={BookMarked}
        minHeight="min-h-0"
        padding="p-3 sm:p-4"
        titleSize="text-base sm:text-lg"
        descriptionSize="text-xs leading-4 sm:leading-5"
      />
    </aside>
  );
}

function StoreCollectionBenefits({
  locale,
  t,
}: {
  locale: Locale;
  t: StoreCopy;
}) {
  return (
    <StoreBenefits
      locale={locale}
      items={[
        {
          icon: Truck,
          title: t.newReleases,
          description: t.newReleasesDescription,
          href: `/${locale}/shop/products?collection=new-releases`,
        },
        {
          icon: GraduationCap,
          title: t.textbooks,
          description: t.textbooksDescription,
          href: `/${locale}/shop/products?type=textbook`,
        },
        {
          icon: ShieldCheck,
          title: t.openAccess,
          description: t.openAccessDescription,
          href: `/${locale}/shop/products?collection=open-access`,
        },
        {
          icon: Percent,
          title: t.offers,
          description: t.offersDescription,
          href: `/${locale}/shop/products?collection=offers`,
        },
      ]}
    />
  );
}

function AboutStore({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";

  return (
    <section className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:gap-6 sm:p-6">
      <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#fbf5e9] text-[#a87529] sm:flex">
        <BookOpen size={30} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a87529]">
          {isArabic ? "عن دار الكتب الجامعية" : "About UBH"}
        </p>
        <h2 className="mt-1 font-serif text-lg font-semibold text-ubh-navy sm:text-xl">
          {isArabic
            ? "اكتشف الكتب الأكاديمية في دار الكتب الجامعية"
            : "Discover Academic Books at University Book House"}
        </h2>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
          {isArabic
            ? "تصفح مجموعة من الكتب الأكاديمية والكتب الإلكترونية والموارد التعليمية لمختلف التخصصات، واكتشف عناوين تدعم التعلم والتدريس والبحث."
            : "Explore academic books, eBooks, and learning resources across a range of disciplines, with titles selected to support learning, teaching, and research."}
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   POPULAR SUBJECTS
   ========================================================= */

type PopularSubject = {
  title: { en: string; ar: string };
  slug: string;
  icon: LucideIcon;
};

const popularSubjects: PopularSubject[] = [
  {
    title: { en: "Business & Management", ar: "الأعمال والإدارة" },
    slug: "business-economics",
    icon: BriefcaseBusiness,
  },
  {
    title: { en: "Computer Science", ar: "علوم الحاسوب" },
    slug: "computer-science-it",
    icon: BookOpen,
  },
  {
    title: { en: "Medicine & Health", ar: "الطب والصحة" },
    slug: "medicine-health",
    icon: GraduationCap,
  },
  {
    title: { en: "Education", ar: "التعليم" },
    slug: "education",
    icon: LibraryBig,
  },
];

function PopularSubjects({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="mt-6 border-t border-slate-100 pt-5"
      aria-labelledby="popular-subjects-title"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3
          id="popular-subjects-title"
          className="text-sm font-semibold text-ubh-navy"
        >
          {isArabic ? "تخصصات شائعة" : "Popular Subjects"}
        </h3>

        <span className="text-xs text-slate-400">
          {isArabic ? "اكتشف المزيد" : "Explore"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {popularSubjects.map(({ title, slug, icon: Icon }) => (
          <Link
            key={slug}
            href={`/${locale}/shop/products?category=${slug}`}
            className="group flex min-w-0 items-center gap-2 rounded-lg border border-slate-200/80 p-3 transition-colors hover:border-ubh-gold/70 hover:bg-[#fffdfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold"
          >
            <Icon
              size={17}
              strokeWidth={1.7}
              className="shrink-0 text-ubh-gold-deep"
              aria-hidden="true"
            />

            <span className="min-w-0 text-xs font-medium leading-4 text-ubh-navy">
              {title[locale]}
            </span>

            <ArrowUpRight
              size={13}
              className="ms-auto shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

import BannerCarousel from "@/components/store/Bannner/BannerCarousel";
import { bannersByLocale } from "@/data/carousel";
import { HeroContainer } from "./ui/HeroContainer";
/* =========================================================
   INSTITUTIONAL SERVICES
   ========================================================= */

type InstitutionalService = {
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: LucideIcon;
  service: string;
};

const institutionalServices: InstitutionalService[] = [
  {
    title: {
      en: "Bulk Book Orders",
      ar: "طلبات الكتب بالجملة",
    },
    description: {
      en: "For schools and universities",
      ar: "للمدارس والجامعات",
    },
    icon: Boxes,
    service: "bulk-orders",
  },
  {
    title: {
      en: "Library Collections",
      ar: "مجموعات المكتبات",
    },
    description: {
      en: "Academic titles for libraries",
      ar: "عناوين أكاديمية للمكتبات",
    },
    icon: LibraryBig,
    service: "library-collections",
  },
  {
    title: {
      en: "University Partnerships",
      ar: "شراكات جامعية",
    },
    description: {
      en: "Resources for institutions",
      ar: "موارد للمؤسسات التعليمية",
    },
    icon: Building2,
    service: "university-partnerships",
  },
];

function InstitutionalServices({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="rounded-xl border border-slate-200 bg-white p-5"
      aria-labelledby="institutional-services-title"
    >
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ubh-gold-deep">
          {isArabic ? "حلول للمؤسسات" : "UBH FOR INSTITUTIONS"}
        </p>

        <h3
          id="institutional-services-title"
          className="mt-1 font-serif text-lg font-semibold text-ubh-navy"
        >
          {isArabic ? "كيف يمكننا مساعدتكم؟" : "How Can We Help?"}
        </h3>
      </div>

      <div className="divide-y divide-slate-100">
        {institutionalServices.map(
          ({ title, description, icon: Icon, service }) => (
            <Link
              key={service}
              href={`/${locale}/institutions?service=${service}`}
              className="group flex items-center gap-3 py-3 first:pt-0 last:pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#fbf7ef] text-[#a7792d] transition-colors group-hover:bg-[#f4ead7]">
                <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ubh-navy">
                  {title[locale]}
                </span>

                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  {description[locale]}
                </span>
              </span>

              <ArrowUpRight
                size={15}
                className="shrink-0 text-slate-400 transition-colors group-hover:text-ubh-gold-deep"
                aria-hidden="true"
              />
            </Link>
          ),
        )}
      </div>

      <Link
        href={`/${locale}/institutions`}
        className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-ubh-gold/70 px-4 py-2 text-sm font-semibold text-ubh-navy transition-colors hover:bg-[#fbf7ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold"
      >
        {isArabic ? "جميع خدمات المؤسسات" : "Explore All Services"}
        <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
    </section>
  );
}

const FLASH_SALE_END_DATE = "2026-11-31T23:59:59+04:00";

function FlashSaleCountdown({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";

  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const endTime = new Date(FLASH_SALE_END_DATE).getTime();

    const updateCountdown = () => {
      const difference = Math.max(0, endTime - Date.now());
      setRemaining(difference);
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (remaining === null) {
    return <div className="h-16" aria-hidden="true" />;
  }

  if (remaining <= 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-500">
        {isArabic ? "انتهى العرض" : "Sale has ended"}
      </div>
    );
  }

  const totalSeconds = Math.floor(remaining / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const units = [
    {
      value: days,
      label: isArabic ? "يوم" : "Days",
    },
    {
      value: hours,
      label: isArabic ? "ساعة" : "Hours",
    },
    {
      value: minutes,
      label: isArabic ? "دقيقة" : "Minutes",
    },
    {
      value: seconds,
      label: isArabic ? "ثانية" : "Seconds",
    },
  ];

  return (
    <div
      className="flex items-center gap-2 sm:gap-3"
      dir={isArabic ? "rtl" : "ltr"}
      aria-label={
        isArabic ? "الوقت المتبقي للعرض" : "Time remaining for the sale"
      }
    >
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex min-w-[48px] flex-col items-center justify-center rounded-lg border border-amber-200/80 bg-white px-2 py-2 shadow-sm sm:min-w-[58px] sm:px-3"
        >
          <span className="font-mono text-lg font-bold tabular-nums text-ubh-navy sm:text-xl">
            {String(unit.value).padStart(2, "0")}
          </span>

          <span className="text-[9px] font-medium text-slate-500 sm:text-[10px]">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function StorePage({ locale }: StorePageProps) {
  const t = copy[locale].store;
  const isArabic = locale === "ar";
  const ubhPublisherProducts = products
    .filter(
      (product) =>
        product.publisherSlug === "university-book-house" && product.stock > 0,
    )
    .slice(0, 12);
  const featuredProducts = products.filter((product) => product.featured);
  const productsForCarousel = featuredProducts.length
    ? featuredProducts
    : products;

  const flashSaleProducts = products
    .filter(
      (product) =>
        product.stock > 0 &&
        typeof product.oldPrice === "number" &&
        product.oldPrice > product.price,
    )
    .slice(0, 12);

  return (
    <main
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-[#fbfbfa] text-ubh-ink"
    >
      {/* Hero and Banner */}
      <HeroContainer className="space-y-3 pt-3 sm:space-y-4 sm:pt-4">
        <StoreHeroSection
          locale={locale}
          title={t.destination}
          description={t.description}
          shopLabel={t.shop}
          ebooksLabel={t.ebooks}
        />

        <BannerCarousel items={bannersByLocale[locale]} />
      </HeroContainer>
      <Container className="space-y-5 py-5 sm:space-y-7 sm:py-6">
        {/* Hero */}
        {/* <StoreHeroSection
          locale={locale}
          title={t.destination}
          description={t.description}
          shopLabel={t.shop}
          ebooksLabel={t.ebooks}
        />
        <BannerCarousel items={bannersByLocale[locale]} /> */}

        <StoreFeatureStrip locale={locale} />

        {/* Main discovery area: category / bestseller / promo cards */}
        {/* Main discovery area: category / bestseller / promo cards */}
        <section className="grid items-stretch gap-4 lg:grid-cols-[minmax(230px,0.95fr)_minmax(0,1.65fr)_minmax(245px,0.95fr)]">
          <CategoryPanel locale={locale} t={t} />
          <BestSellersPanel locale={locale} t={t} />
          <Promotions locale={locale} t={t} />
        </section>

        <StoreCollectionBenefits locale={locale} t={t} />

        
<section
  aria-label={isArabic ? "المنتجات المميزة" : "Featured products"}
  dir={isArabic ? "rtl" : "ltr"}
  className="space-y-14 py-8 sm:space-y-20 sm:py-12"
>
  {/* ==========================================
      UBH PUBLICATIONS
  ========================================== */}
  <section className="relative">
    <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
      <div className="min-w-0">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-[2px] w-8 bg-ubh-gold" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ubh-gold-deep sm:text-xs">
            {isArabic ? "منشوراتنا" : "THE UBH COLLECTION"}
          </span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-ubh-navy sm:text-3xl">
          {isArabic
            ? "إصدارات دار الكتاب الجامعي"
            : "University Book House"}
        </h2>

        <p className="mt-2 max-w-xl text-xs leading-6 text-slate-500 sm:text-sm">
          {isArabic
            ? "معرفة أكاديمية ومهنية من إصداراتنا المختارة."
            : "Academic excellence and professional knowledge from our own publications."}
        </p>
      </div>

      <Link
        href={`/${locale}/shop/products?publisher=university-book-house`}
        className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ubh-navy/15 px-4 py-2.5 text-xs font-semibold text-ubh-navy transition-all duration-300 hover:border-ubh-gold hover:bg-ubh-navy hover:text-white sm:px-5 sm:text-sm"
      >
        {isArabic ? "عرض الكل" : "Explore all"}
        <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
          ↗
        </span>
      </Link>
    </div>

    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-[#f7f9fc] via-white to-[#f5f1e9] p-3 sm:p-5 lg:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-20 -top-24 h-64 w-64 rounded-full bg-ubh-gold/10 blur-3xl"
      />

      <div className="relative">
        <ProductCarousel
          locale={locale}
          products={ubhPublisherProducts}
          title=""
          viewAllHref={`/${locale}/shop/products?publisher=university-book-house`}
          cardWidth={190}
          cardHeight={370}
          imageHeight={190}
          gap={16}
        />
      </div>
    </div>
  </section>


  {/* ==========================================
      FLASH DEALS - MAIN PROMOTIONAL FEATURE
  ========================================== */}
 
{/* ==========================================
    FLASH DEALS - PREMIUM LIGHT GOLD THEME
========================================== */}

{/* FLASH DEALS */}
{flashSaleProducts.length > 0 && (
  <section className="relative isolate overflow-hidden rounded-[24px] border border-[#dfc18a] bg-gradient-to-br from-[#f8efd9] via-[#f3e2bf] to-[#e9c991] shadow-[0_16px_45px_-26px_rgba(130,91,35,0.38)]">

    {/* Background decorations */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute -end-20 -top-28 h-80 w-80 rounded-full bg-[#e5b85f]/25 blur-[85px]" />

      <div className="absolute -start-24 bottom-0 h-64 w-64 rounded-full bg-[#fffaf0]/70 blur-[75px]" />

      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(#a77b36 0.7px, transparent 0.7px)",
          backgroundSize: "22px 22px",
        }}
      />
    </div>

    {/* Header */}
    <div className="relative z-10 px-4 pb-5 pt-6 sm:px-7 sm:pb-7 sm:pt-8 lg:px-9">

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        {/* Promotional content */}
        <div className="min-w-0 flex-1">

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d8b776] bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#886329] sm:text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#bd852e]" />
              {isArabic ? "عروض لفترة محدودة" : "LIMITED TIME OFFERS"}
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#92774b]">
              {isArabic ? "عروض حصرية" : "EXCLUSIVE UBH DEALS"}
            </span>
          </div>

          <div className="flex items-start gap-3">

            <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#e1c58f] bg-white/75 text-3xl text-[#b68132] shadow-sm sm:flex">
              ⚡
            </div>

            <div className="min-w-0">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#061a37] sm:text-4xl lg:text-[42px]">
                {isArabic ? "عروض خاطفة" : "Flash Deals"}
              </h2>

              <p className="mt-2 text-sm font-bold text-[#976b2b] sm:text-base">
                {isArabic
                  ? "كتب مميزة. أسعار استثنائية."
                  : "Exceptional books. Special prices."}
              </p>

              <p className="mt-2 max-w-lg text-xs leading-6 text-[#69583d] sm:text-sm">
                {isArabic
                  ? "اكتشف عروضاً مميزة على مجموعة مختارة من الكتب الأكاديمية والمهنية."
                  : "Discover exclusive offers on selected academic and professional titles."}
              </p>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="relative shrink-0 rounded-2xl border border-[#dfc99f] bg-[#fffdf8]/90 p-4 shadow-[0_8px_24px_-15px_rgba(110,75,25,0.3)] sm:min-w-[270px] sm:p-5">

          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#80602c] sm:text-xs">
              {isArabic ? "ينتهي العرض خلال" : "OFFER ENDS IN"}
            </p>

            <span className="text-xl text-[#b68132]">◷</span>
          </div>

          <div className="rounded-xl border border-[#eee1c6] bg-[#f8efdf] p-2.5 sm:p-3">
            <FlashSaleCountdown locale={locale} />
          </div>

          <p className="mt-3 text-center text-[10px] text-[#806e52]">
            {isArabic
              ? "لا تفوّت فرصة الاستفادة من العروض"
              : "Don't miss these exclusive offers."}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#d9c49c]/80 pt-4">

        <div className="flex items-center gap-2 text-xs font-medium text-[#715c3b]">
          <span className="text-[#a77b32]">✦</span>
          {isArabic
            ? "مجموعة مختارة من الكتب بأسعار خاصة"
            : "Handpicked titles at special prices"}
        </div>

        <Link
          href={`/${locale}/shop/products?collection=offers`}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a9782e] to-[#c69645] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#936522]/15 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#956522] hover:to-[#b58336] hover:shadow-lg sm:text-sm"
        >
          {isArabic ? "تسوق العروض" : "Shop deals"}
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
            ↗
          </span>
        </Link>
      </div>
    </div>

    {/* Product showcase */}
    <div className="relative z-10 border-t border-[#ddc69e] bg-[#fffaf1]/95 px-3 pb-5 pt-5 sm:px-6 sm:pb-7 sm:pt-6 lg:px-8">

      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-[#061a37] sm:text-base">
            {isArabic ? "تسوق الكتب المخفضة" : "Explore the deals"}
          </h3>

          <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
            {isArabic
              ? "اكتشف الكتب المتاحة ضمن العروض"
              : "Discover books included in this promotion."}
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-[#e4cfaa] bg-white px-3 py-1.5 text-[10px] font-bold text-[#8e682d] sm:text-xs">
          {flashSaleProducts.length} {isArabic ? "منتجات" : "DEALS"}
        </span>
      </div>

      <div className="rounded-xl border border-[#e9dfcd] bg-white p-2 shadow-[0_4px_18px_-12px_rgba(50,40,20,0.2)] sm:p-4">
        <ProductCarousel
          locale={locale}
          products={flashSaleProducts}
          title=""
          viewAllHref={`/${locale}/shop/products?collection=offers`}
          cardWidth={190}
          cardHeight={370}
          imageHeight={190}
          gap={16}
          autoPlay={true}
          showViewAll={false}
          showOldPrice
          showDiscountBadge
        />
      </div>
    </div>
  </section>
)}



  {/* ==========================================
      FEATURED PRODUCTS
  ========================================== */}
  <section className="relative">

    <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
      <div className="min-w-0">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-[2px] w-8 bg-ubh-gold" />

          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ubh-gold-deep sm:text-xs">
            {isArabic ? "مختاراتنا" : "CURATED FOR YOU"}
          </span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-ubh-navy sm:text-3xl">
          {isArabic ? "منتجات مميزة" : "Featured Products"}
        </h2>

        <p className="mt-2 max-w-xl text-xs leading-6 text-slate-500 sm:text-sm">
          {isArabic
            ? "اكتشف كتباً مختارة بعناية في مختلف التخصصات."
            : "Explore carefully selected books across leading academic and professional subjects."}
        </p>
      </div>

      <Link
        href={`/${locale}/shop/products`}
        className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ubh-navy/15 px-4 py-2.5 text-xs font-semibold text-ubh-navy transition-all duration-300 hover:border-ubh-gold hover:bg-ubh-navy hover:text-white sm:px-5 sm:text-sm"
      >
        {isArabic ? "تصفح الكل" : "Explore all"}
        <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
          ↗
        </span>
      </Link>
    </div>

    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm shadow-slate-200/30 sm:p-5 lg:p-6">
      <div className="pointer-events-none absolute -end-24 -top-24 h-64 w-64 rounded-full bg-blue-50/80 blur-3xl" />

      <div className="relative">
        <ProductCarousel
          locale={locale}
          products={productsForCarousel}
          title=""
          viewAllHref={`/${locale}/shop/products`}
          cardWidth={190}
          cardHeight={370}
          imageHeight={190}
          gap={16}
        />
      </div>
    </div>
  </section>
</section>


        <AboutStore locale={locale} />
      </Container>
    </main>
  );
}
