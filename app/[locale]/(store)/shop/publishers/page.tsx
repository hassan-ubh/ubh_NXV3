// import Link from "next/link";
// import { notFound } from "next/navigation";

// import { copy, isLocale } from "@/lib/i18n";
// import { Container } from "@/components/shared/Container";
// import {
//   publishers,
//   type PublisherMarket,
//   type PublisherLanguage,
// } from "@/data/publishers";
// import { PublisherDirectory } from "@/components/publishers/PublisherDirectory";

// type SearchParams = {
//   market?: string | string[];
//   language?: string | string[];
// };

// function getSingleValue(value: string | string[] | undefined) {
//   return Array.isArray(value) ? value[0] : value;
// }

// export default async function StorePublishersPage({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ locale: string }>;
//   searchParams: Promise<SearchParams>;
// }) {
//   const { locale } = await params;
//   const query = await searchParams;

//   if (!isLocale(locale)) {
//     notFound();
//   }

//   const marketValue = getSingleValue(query.market);
//   const languageValue = getSingleValue(query.language);

//   const market: PublisherMarket | undefined =
//     marketValue === "local" || marketValue === "international"
//       ? marketValue
//       : undefined;

//   const language: PublisherLanguage | undefined =
//     languageValue === "ar" || languageValue === "en"
//       ? languageValue
//       : undefined;

//   const filteredPublishers = publishers.filter((publisher) => {
//     const matchesMarket = !market || publisher.market === market;
//     const matchesLanguage = !language || publisher.languages.includes(language);

//     return matchesMarket && matchesLanguage;
//   });

//   const isArabic = locale === "ar";
//   const t = copy[locale].publishers;

//   // const isArabic = locale === "ar";

//   const heroContent = {
//     all: {
//       en: {
//         eyebrow: "OUR PUBLISHING PARTNERS",
//         title: "Our Publishers",
//         description:
//           "Explore our publishing partners and discover academic books, professional resources and knowledge from around the world.",
//       },
//       ar: {
//         eyebrow: "شركاء النشر",
//         title: "الناشرون",
//         description:
//           "اكتشف شركاء النشر لدينا وتعرّف على مجموعة واسعة من الكتب الأكاديمية والمراجع المهنية من مختلف أنحاء العالم.",
//       },
//     },
//     international: {
//       en: {
//         eyebrow: "GLOBAL PUBLISHING PARTNERS",
//         title: "International Publishers",
//         description:
//           "Explore leading international publishers and discover academic and professional publications from across the world.",
//       },
//       ar: {
//         eyebrow: "شركاء النشر الدوليون",
//         title: "الناشرون الدوليون",
//         description:
//           "اكتشف دور النشر الدولية ومجموعة مختارة من الكتب الأكاديمية والمهنية باللغة العربية.",
//       },
//     },
//     local: {
//       en: {
//         eyebrow: "REGIONAL PUBLISHING PARTNERS",
//         title: "Local Publishers",
//         description:
//           "Discover local publishing houses and explore publications that support regional education, research and knowledge.",
//       },
//       ar: {
//         eyebrow: "شركاء النشر المحليون",
//         title: "الناشرون المحليون",
//         description:
//           "تعرّف على دور النشر المحلية واكتشف إصدارات تدعم التعليم والبحث والمعرفة في المنطقة.",
//       },
//     },
//   };

//   const selectedMarket = market ?? "all";
//   const content = heroContent[selectedMarket][isArabic ? "ar" : "en"];

//   const pageTitle = content.title;
//   const pageDescription = content.description;
//   const eyebrow = content.eyebrow;

//   // const pageTitle = isArabic ? "ناشرونا" : "Our Publishers";
//   // const pageDescription = isArabic
//   //   ? "اكتشف دور النشر المحلية والدولية ومجموعة الكتب الأكاديمية المتاحة."
//   //   : "Explore local and international publishers and discover their academic publications.";

//   return (
//     <main dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-ubh-canvas">
//       {/* Page introduction */}
//       <section className="relative overflow-hidden bg-ubh-navy text-white">
        
//   {/* Premium UBH2 Background */}
//   <div
//     aria-hidden="true"
//     className="pointer-events-none absolute inset-0 overflow-hidden"
//   >
//     {/* Deep navy foundation */}
//     <div className="absolute inset-0 bg-gradient-to-br from-[#102D4D] via-[#071D38] to-[#031329]" />

//     {/* Ambient lighting */}
//     <div className="absolute -right-32 -top-44 h-[520px] w-[650px] rounded-full bg-[#12619B]/15 blur-[130px]" />
//     <div className="absolute -bottom-56 -left-32 h-[480px] w-[480px] rounded-full bg-[#C89438]/[0.08] blur-[120px]" />

//     {/* Architectural grid */}
//     <div
//       className="absolute inset-0 opacity-[0.045]"
//       style={{
//         backgroundImage: `
//           linear-gradient(to right, #9BBBD5 1px, transparent 1px),
//           linear-gradient(to bottom, #9BBBD5 1px, transparent 1px)
//         `,
//         backgroundSize: "82px 82px",
//         maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
//       }}
//     />

//     {/* Right architectural geometry */}
//     <div className="absolute -right-32 -top-40 h-[490px] w-[510px] rotate-[42deg] border border-[#5D91BA]/[0.14] bg-gradient-to-br from-[#164A73]/20 to-transparent" />

//     <div className="absolute -right-20 top-20 h-[300px] w-[300px] rotate-45 border border-[#C89438]/[0.09]" />

//     {/* Dotted texture */}
//     <div
//       className="absolute right-12 top-12 h-48 w-56 opacity-[0.16]"
//       style={{
//         backgroundImage: "radial-gradient(#8EB6D5 1px, transparent 1px)",
//         backgroundSize: "20px 20px",
//         maskImage: "linear-gradient(to left, black, transparent)",
//       }}
//     />

//     {/* Bottom geometry */}
//     <div className="absolute -bottom-56 -right-20 h-[440px] w-[490px] rotate-[-42deg] border border-[#4382AE]/[0.12]" />

//     {/* Gold finishing line */}
//     <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C89438]/55 to-transparent" />
//     <div className="absolute bottom-0 left-1/2 h-[2px] w-24 -translate-x-1/2 bg-[#D6AD67] shadow-[0_0_14px_2px_rgba(200,148,56,0.25)]" />
//   </div>
//         <div className="pointer-events-none absolute inset-0">
//           <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-ubh-blue/40 blur-3xl" />
//           <div className="absolute -bottom-40 left-1/4 h-72 w-72 rounded-full bg-ubh-gold/10 blur-3xl" />
//         </div>

//         <Container className="relative z-10">
//           <div className="py-12 sm:py-16 md:py-20">
//             {/* <nav
//               aria-label={isArabic ? "مسار التنقل" : "Breadcrumb"}
//               className="mb-7 flex items-center gap-2 text-xs text-white/60"
//             >
//               <Link
//                 href={`/${locale}`}
//                 className="transition-colors hover:text-white"
//               >
//                 {t.breadcrumbHome}
//               </Link>

//               <span aria-hidden="true">/</span>

//               <Link
//                 href={`/${locale}/shop`}
//                 className="transition-colors hover:text-white"
//               >
//                 {isArabic ? "المتجر" : "Store"}
//               </Link>

//               <span aria-hidden="true">/</span>

//               <span aria-current="page" className="text-white">
//                 {pageTitle}
//               </span>
//             </nav> */}

//             <div className="max-w-3xl">
//               <div className="mb-5 flex items-center gap-3">
//                 <span className="h-[2px] w-8 rounded-full bg-ubh-gold" />
//                 <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ubh-gold sm:text-xs">
//                   {eyebrow}
//                 </span>
//               </div>

//               <h1 className="font-serif text-3xl font-medium leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl">
//                 {pageTitle}
//               </h1>

//               <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
//                 {pageDescription}
//               </p>

//               <div className="mt-7 flex items-center gap-2">
//                 <span className="h-1 w-8 rounded-full bg-ubh-gold" />
//                 <span className="h-1 w-2 rounded-full bg-white/30" />
//                 <span className="h-1 w-2 rounded-full bg-white/20" />
//               </div>
//             </div>
//           </div>
//         </Container>
//       </section>

//       {/* Publisher directory */}
//       <section className="py-8 sm:py-10 md:py-12">
//         <Container>
//           {/* Active filter information */}
//           {(market || language) && (
//             <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-ubh-border bg-white px-4 py-3">
//               <div className="flex flex-wrap items-center gap-2 text-xs text-ubh-blue-muted">
//                 <span className="font-semibold text-ubh-navy">
//                   {isArabic ? "التصفية:" : "Filtered by:"}
//                 </span>

//                 {market && (
//                   <span className="rounded-full bg-[#edf3f8] px-3 py-1.5">
//                     {market === "international"
//                       ? isArabic
//                         ? "دولي"
//                         : "International"
//                       : isArabic
//                         ? "محلي"
//                         : "Local"}
//                   </span>
//                 )}

//                 {language && (
//                   <span className="rounded-full bg-[#edf3f8] px-3 py-1.5">
//                     {language === "en"
//                       ? isArabic
//                         ? "الإنجليزية"
//                         : "English"
//                       : isArabic
//                         ? "العربية"
//                         : "Arabic"}
//                   </span>
//                 )}
//               </div>

//               <Link
//                 href={`/${locale}/shop/publishers`}
//                 className="text-xs font-semibold text-ubh-blue-bright transition-colors hover:text-ubh-gold"
//               >
//                 {isArabic ? "مسح التصفية" : "Clear filters"}
//               </Link>
//             </div>
//           )}

//           <PublisherDirectory
//             publishers={filteredPublishers}
//             locale={locale}
//             variant="store"
//           />

//           {filteredPublishers.length === 0 && (
//             <div className="mt-8 rounded-lg border border-dashed border-ubh-border bg-white px-6 py-14 text-center">
//               <h2 className="text-lg font-semibold text-ubh-navy">
//                 {isArabic
//                   ? "لا يوجد ناشرون ضمن هذه التصفية"
//                   : "No publishers found"}
//               </h2>

//               <p className="mt-2 text-sm text-ubh-blue-muted">
//                 {isArabic
//                   ? "جرّب اختيار لغة أو تصنيف آخر."
//                   : "Try selecting a different market or language."}
//               </p>

//               <Link
//                 href={`/${locale}/shop/publishers`}
//                 className="mt-5 inline-flex items-center justify-center rounded-md bg-ubh-navy px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-ubh-blue"
//               >
//                 {isArabic ? "عرض جميع الناشرين" : "View all publishers"}
//               </Link>
//             </div>
//           )}
//         </Container>
//       </section>
//     </main>
//   );
// }


import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Globe2,
  LibraryBig,
} from "lucide-react";

import { isLocale } from "@/lib/i18n";
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

const heroContent = {
  all: {
    en: {
      eyebrow: "OUR PUBLISHING PARTNERS",
      title: "Discover Our Publishers",
      description:
        "Explore our publishing partners and discover academic books, professional resources and knowledge from around the world.",
      label: "Our publishing network",
    },
    ar: {
      eyebrow: "شركاء النشر",
      title: "اكتشف دور النشر",
      description:
        "تعرّف على شركاء النشر لدينا واكتشف مجموعة واسعة من الكتب الأكاديمية والمراجع المهنية من مختلف أنحاء العالم.",
      label: "شبكة شركاء النشر",
    },
  },
  international: {
    en: {
      eyebrow: "GLOBAL PUBLISHING PARTNERS",
      title: "International Publishers",
      description:
        "Explore international publishing houses and discover academic and professional publications from leading publishers worldwide.",
      label: "Global publishing network",
    },
    ar: {
      eyebrow: "شركاء النشر الدوليون",
      title: "الناشرون الدوليون",
      description:
        "اكتشف دور النشر الدولية وإصداراتها الأكاديمية والمهنية من مختلف أنحاء العالم.",
      label: "شبكة النشر الدولية",
    },
  },
  local: {
    en: {
      eyebrow: "REGIONAL PUBLISHING PARTNERS",
      title: "Local Publishers",
      description:
        "Discover regional publishing houses and explore publications supporting education, research and knowledge across the region.",
      label: "Regional publishing network",
    },
    ar: {
      eyebrow: "شركاء النشر المحليون",
      title: "الناشرون المحليون",
      description:
        "اكتشف دور النشر المحلية وإصداراتها التي تدعم التعليم والبحث والمعرفة في المنطقة.",
      label: "شبكة النشر الإقليمية",
    },
  },
};

export default async function StorePublishersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const query = await searchParams;

  if (!isLocale(locale)) notFound();

  const isArabic = locale === "ar";

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

  // Filter publishers.
  const filteredPublishers = publishers.filter((publisher) => {
    const matchesMarket =
      !market || publisher.market === market;

    const matchesLanguage =
      !language || publisher.languages.includes(language);

    return matchesMarket && matchesLanguage;
  });

  // Dynamic hero content.
  const selectedMarket = market ?? "all";
  const content = heroContent[selectedMarket][locale];

  const clearFiltersHref = `/${locale}/shop/publishers`;

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-ubh-canvas"
    >
      {/* Light Publisher Hero */}
      <section className="relative isolate overflow-hidden border-b border-[#e9edf2] bg-[#f6f8fb]">

        {/* Subtle background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-36 end-[-5rem] h-80 w-80 rounded-full border border-[#dce5ee]/70" />

          <div className="absolute -top-20 end-[-1rem] h-64 w-64 rounded-full border border-[#dce5ee]/60" />

          <div className="absolute -bottom-32 start-[15%] h-72 w-72 rounded-full bg-[#e8edf4]/60 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(#a9b9ca 0.8px, transparent 0.8px)",
              backgroundSize: "24px 24px",
              maskImage:
                "linear-gradient(to left, black, transparent 65%)",
            }}
          />
        </div>

        <Container className="relative z-10">
          <div className="py-10 sm:py-12 md:py-14">

            <div className="max-w-3xl">

              {/* Eyebrow */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-8 rounded-full bg-ubh-gold" />

                <span className="text-[10px] font-bold uppercase tracking-[0.19em] text-[#a8792c] sm:text-xs">
                  {content.eyebrow}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-[#102b4e] sm:text-4xl md:text-5xl">
                {content.title}
              </h1>

              {/* Description */}
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {content.description}
              </p>

              {/* Directory information */}
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">

                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e3e9ef] bg-white text-[#a8792c] shadow-sm">
                    {market === "international" ? (
                      <Globe2 size={17} />
                    ) : (
                      <LibraryBig size={17} />
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#102b4e]">
                      {filteredPublishers.length}
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {isArabic
                        ? "دار نشر"
                        : filteredPublishers.length === 1
                          ? "Publisher"
                          : "Publishers"}
                    </p>
                  </div>
                </div>

                <span className="hidden h-8 w-px bg-[#dce3eb] sm:block" />

                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e3e9ef] bg-white text-[#a8792c] shadow-sm">
                    <BookOpen size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#102b4e]">
                      {content.label}
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {isArabic
                        ? "اكتشف مجموعات النشر"
                        : "Explore publishing collections"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Container>

        {/* Gold finishing line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c89438]/40 to-transparent" />
      </section>

      {/* Publisher Directory */}
      <section className="py-8 sm:py-10 md:py-12">
        <Container>

          {/* Active Filters */}
          {(market || language) && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e3e9ef] bg-white px-4 py-3">

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">

                <span className="font-semibold text-[#102b4e]">
                  {isArabic ? "التصفية:" : "Filtered by:"}
                </span>

                {market && (
                  <span className="rounded-full bg-[#f1f5f9] px-3 py-1.5 font-medium text-[#315477]">
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
                  <span className="rounded-full bg-[#f1f5f9] px-3 py-1.5 font-medium text-[#315477]">
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
                href={clearFiltersHref}
                className="text-xs font-semibold text-[#315477] transition-colors hover:text-ubh-gold"
              >
                {isArabic ? "مسح التصفية" : "Clear filters"}
              </Link>
            </div>
          )}

          {/* Publisher Listing */}
          {filteredPublishers.length > 0 ? (
            <PublisherDirectory
              publishers={filteredPublishers}
              locale={locale}
              variant="store"
            />
          ) : (
            <div className="rounded-xl border border-dashed border-[#d9e2ec] bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f2f5f8] text-slate-400">
                <LibraryBig size={25} strokeWidth={1.5} />
              </div>

              <h2 className="mt-5 text-base font-semibold text-[#102b4e]">
                {isArabic
                  ? "لا يوجد ناشرون ضمن هذه التصفية"
                  : "No publishers found"}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {isArabic
                  ? "جرّب اختيار لغة أو تصنيف آخر."
                  : "Try selecting a different market or language."}
              </p>

              <Link
                href={clearFiltersHref}
                className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#102b4e] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#193e68]"
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
