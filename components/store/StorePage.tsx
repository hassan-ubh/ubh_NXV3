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
  type LucideIcon,
} from "lucide-react";


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

type PromoCardProps = {
  locale: Locale;
  title: string;
  description: string;
  action: string;
  href: string;
  kind: "ebook" | "institutions";

  // Optional sizing props — existing style remains the default
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
function BestSellersPanel({ locale, t }: { locale: Locale; t: StoreCopy }) {
  const bestSellers = products
    .filter((product) => product.bestseller)
    .slice(0, 6);

  const isArabic = locale === "ar";

  return (
    <section className="flex h-full min-w-0 flex-col rounded-xl border border-slate-200/80 bg-white p-4 sm:p-5">
      <SectionHeading
        title={t.bestSellers}
        action={t.viewAllBestSellers}
        href={`/${locale}/shop/products?collection=best-sellers`}
        locale={locale}
      />

      {bestSellers.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              noCoverText={t.noCover}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg bg-slate-50 px-4 text-center text-sm leading-6 text-slate-500">
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
  height,
  minHeight,
  padding,
  titleSize,
  descriptionSize,
}: PromoCardProps) {
  const isEbook = kind === "ebook";
  const isArabic = locale === "ar";
  const Icon = isEbook ? BookOpen : GraduationCap;

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className={`relative isolate overflow-hidden rounded-xl border ${
        // Preserve the original default sizing.
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
        } -z-10 opacity-20 ${isEbook ? "text-[#d9b36d]" : "text-ubh-gold-deep"}`}
      >
        <Icon size={isEbook ? 150 : 142} strokeWidth={0.8} />
      </div>

      {/* Secondary decorative artwork */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute ${
          isArabic ? "left-7" : "right-7"
        } top-6 -z-10 ${isEbook ? "text-white/10" : "text-ubh-gold-deep/15"}`}
      >
        {isEbook ? (
          <BookOpen size={78} strokeWidth={0.8} />
        ) : (
          <Landmark size={76} strokeWidth={0.8} />
        )}
      </div>

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
function Promotions({ locale, t }: { locale: Locale; t: StoreCopy }) {
  return (
    <aside className="grid h-full min-w-0 grid-rows-2 gap-4">
      <PromoCard
        locale={locale}
        title={t.ebooksLibrary}
        description={t.ebooksLibraryDescription}
        action={t.exploreEbooks}
        href={`/${locale}/shop/products?type=ebook`}
        kind="ebook"
        minHeight="min-h-0"
        padding="p-4 sm:p-5"
        titleSize="text-lg sm:text-xl"
        descriptionSize="text-xs leading-5"
      />

      <PromoCard
        locale={locale}
        title={t.institutionsTitle}
        description={t.institutionsDescription}
        action={t.learnMore}
        href={`/${locale}/institutions`}
        kind="institutions"
        minHeight="min-h-0"
        padding="p-4 sm:p-5"
        titleSize="text-lg sm:text-xl"
        descriptionSize="text-xs leading-5"
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

export function StorePage({ locale }: StorePageProps) {
  const t = copy[locale].store;
  const isArabic = locale === "ar";
  const ubhPublisherProducts = products
  .filter(
    (product) =>
      product.publisherSlug === "university-book-house" &&
      product.stock > 0
  )
  .slice(0, 12);
  const featuredProducts = products.filter((product) => product.featured);
  const productsForCarousel = featuredProducts.length
    ? featuredProducts
    : products;

  return (
    <main
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-[#fbfbfa] text-ubh-ink"
    >
      <Container className="space-y-5 py-5 sm:space-y-7 sm:py-6">
        {/* Hero */}
        {/* Hero */}
        <StoreHeroSection
          locale={locale}
          title={t.destination}
          description={t.description}
          shopLabel={t.shop}
          ebooksLabel={t.ebooks}
        />
        <BannerCarousel items={bannersByLocale[locale]} />

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
  className="space-y-12 py-8 sm:space-y-16 sm:py-12"
>
  {/* University Book House Publications */}
  <div className="relative">
    <div className="mb-5 flex items-center gap-3 sm:mb-7">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ubh-navy text-ubh-gold-light">
        <BookOpen className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-ubh-gold-deep">
          {isArabic ? "منشوراتنا" : "OUR PUBLICATIONS"}
        </p>

        <h2 className="text-xl font-semibold tracking-tight text-ubh-navy sm:text-2xl lg:text-3xl">
          {isArabic
            ? "إصدارات دار الكتاب الجامعي"
            : "University Book House Publications"}
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {isArabic
            ? "اكتشف إصداراتنا الأكاديمية والمهنية"
            : "Explore academic and professional knowledge."}
        </p>
      </div>
    </div>

    <ProductCarousel
      locale={locale}
      products={ubhPublisherProducts}
      title=""
      viewAllHref={`/${locale}/shop/products?publisher=university-book-house`}
      cardWidth={190}
      cardHeight={370}
      imageHeight={190}
      gap={16}
      autoPlay
      autoPlaySpeed={36}
      pauseOnHover
    />
  </div>

  {/* Featured Products */}
  <div className="relative">
    <div className="mb-5 flex items-center gap-3 sm:mb-7">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-ubh-navy">
        <Sparkles className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-ubh-gold-deep">
          {isArabic ? "مختاراتنا" : "HANDPICKED FOR YOU"}
        </p>

        <h2 className="text-xl font-semibold tracking-tight text-ubh-navy sm:text-2xl lg:text-3xl">
          {isArabic ? "منتجات مميزة" : "Featured Products"}
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {isArabic
            ? "اكتشف كتباً مختارة في مختلف التخصصات"
            : "Discover standout books across popular subjects."}
        </p>
      </div>
    </div>

    <ProductCarousel
      locale={locale}
      products={productsForCarousel}
      title=""
      viewAllHref={`/${locale}/shop/products`}
      cardWidth={190}
      cardHeight={370}
      imageHeight={190}
      gap={16}
      autoPlay
      autoPlaySpeed={32}
      pauseOnHover
    />
  </div>
</section>

        <AboutStore locale={locale} />
      </Container>
    </main>
  );
}
