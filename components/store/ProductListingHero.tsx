
"use client";

import { useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getCategoryLabel } from "@/lib/store/categories";

type Props = {
  locale: Locale;
};

type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
};

const collectionContent: Record<
  string,
  { en: HeroContent; ar: HeroContent }
> = {
  "new-releases": {
    en: {
      eyebrow: "FRESH FROM THE PUBLISHERS",
      title: "New Releases",
      description:
        "Discover the latest academic and professional publications, bringing fresh ideas and new perspectives to your reading.",
    },
    ar: {
      eyebrow: "أحدث إصدارات دور النشر",
      title: "أحدث الإصدارات",
      description:
        "اكتشف أحدث الإصدارات الأكاديمية والمهنية التي تقدم أفكارًا جديدة وآفاقًا معرفية متنوعة.",
    },
  },
  ubh: {
    en: {
      eyebrow: "PUBLISHED BY UBH",
      title: "UBH Publications",
      description:
        "Explore publications from University Book House, carefully selected to support academic learning, research and professional development.",
    },
    ar: {
      eyebrow: "إصدارات دار الكتب الجامعية",
      title: "منشورات UBH",
      description:
        "اكتشف إصدارات دار الكتب الجامعية المختارة لدعم التعلم الأكاديمي والبحث والتطوير المهني.",
    },
  },
  "best-sellers": {
    en: {
      eyebrow: "READER FAVOURITES",
      title: "Best Sellers",
      description:
        "Explore popular academic and professional books selected by readers and institutions.",
    },
    ar: {
      eyebrow: "اختيارات القراء",
      title: "الأكثر مبيعًا",
      description:
        "تعرّف على الكتب الأكاديمية والمهنية الأكثر إقبالًا لدى القراء والمؤسسات.",
    },
  },
  offers: {
    en: {
      eyebrow: "EXCLUSIVE SAVINGS",
      title: "Special Offers",
      description:
        "Discover selected books at special prices and find valuable additions to your academic library.",
    },
    ar: {
      eyebrow: "عروض وخصومات حصرية",
      title: "عروض خاصة",
      description:
        "اكتشف مجموعة مختارة من الكتب بأسعار خاصة وأضف مصادر قيّمة إلى مكتبتك الأكاديمية.",
    },
  },
  "open-access": {
    en: {
      eyebrow: "KNOWLEDGE WITHOUT BARRIERS",
      title: "Open Access Books",
      description:
        "Explore freely accessible academic publications and discover knowledge available to everyone.",
    },
    ar: {
      eyebrow: "المعرفة للجميع",
      title: "كتب الوصول المفتوح",
      description:
        "اكتشف المنشورات الأكاديمية المتاحة مجانًا واستفد من مصادر معرفية مفتوحة للجميع.",
    },
  },
  series: {
    en: {
      eyebrow: "EXPLORE OUR COLLECTIONS",
      title: "Book Series",
      description:
        "Browse curated book series covering a wide range of academic subjects and professional interests.",
    },
    ar: {
      eyebrow: "اكتشف مجموعاتنا",
      title: "سلاسل الكتب",
      description:
        "تصفح سلاسل الكتب المختارة التي تغطي مجموعة واسعة من التخصصات الأكاديمية والاهتمامات المهنية.",
    },
  },
};

const defaultContent: Record<"en" | "ar", HeroContent> = {
  en: {
    eyebrow: "UNIVERSITY BOOK HOUSE STORE",
    title: "Explore Our Books",
    description:
      "Discover academic, educational and professional books from leading publishers around the world.",
  },
  ar: {
    eyebrow: "متجر دار الكتب الجامعية",
    title: "اكتشف كتبنا",
    description:
      "اكتشف مجموعة متنوعة من الكتب الأكاديمية والتعليمية والمهنية من دور النشر الرائدة حول العالم.",
  },
};


export function ProductListingHero({ locale }: Props) {
  const searchParams = useSearchParams();

  const language = locale === "ar" ? "ar" : "en";
  const isArabic = language === "ar";

  const category = searchParams.get("category");
  const collection = searchParams.get("collection");
  const type = searchParams.get("type");
  const publisher = searchParams.get("publisher");
  const query = searchParams.get("q");

  let content: HeroContent = defaultContent[language];

  if (category) {
    const categoryName = getCategoryLabel(category, locale);

    content = {
      eyebrow: isArabic ? "تصفح حسب التخصص" : "EXPLORE BY SUBJECT",
      title: categoryName,
      description: isArabic
        ? `اكتشف مجموعة الكتب الأكاديمية والمهنية المتخصصة في ${categoryName}.`
        : `Explore academic and professional books covering ${categoryName}, from trusted publishers and authors.`,
    };
  } else if (collection && collectionContent[collection]) {
    content = collectionContent[collection][language];
  } else if (publisher) {
    content = {
      eyebrow: isArabic ? "منشورات دور النشر" : "PUBLISHER COLLECTION",
      title: publisher,
      description: isArabic
        ? `اكتشف الكتب والمنشورات المتاحة من ${publisher}.`
        : `Explore available academic and professional publications from ${publisher}.`,
    };
  } else if (type === "ebook") {
    content = {
      eyebrow: isArabic ? "اقرأ رقميًا" : "READ DIGITALLY",
      title: isArabic ? "الكتب الإلكترونية" : "eBooks",
      description: isArabic
        ? "استكشف الكتب الإلكترونية والمصادر الأكاديمية الرقمية."
        : "Explore digital books and academic resources, ready for convenient reading.",
    };
  } else if (type === "textbook") {
    content = {
      eyebrow: isArabic ? "مصادر التعلم" : "LEARNING RESOURCES",
      title: isArabic ? "الكتب الدراسية" : "Textbooks",
      description: isArabic
        ? "اكتشف الكتب الدراسية والمراجع التعليمية لمختلف التخصصات."
        : "Find textbooks and educational references across a wide range of subjects.",
    };
  } else if (query) {
    content = {
      eyebrow: isArabic ? "نتائج البحث" : "SEARCH RESULTS",
      title: isArabic ? `نتائج: ${query}` : "Search results",
      description: isArabic
        ? `الكتب والموارد المتاحة المتعلقة ببحثك عن "${query}".`
        : `Explore books and resources matching your search for "${query}".`,
    };
  }

  return (
    <header
      key={`${category}-${collection}-${type}-${publisher}-${query}`}
      dir={isArabic ? "rtl" : "ltr"}
      className="
        group relative isolate overflow-hidden
        rounded-2xl sm:rounded-[22px]
        border border-white/[0.07]
        bg-[#071A32]
        px-5 py-7
        text-white
        shadow-[0_12px_35px_rgba(6,26,55,0.10)]
        sm:px-8 sm:py-9
        lg:px-10 lg:py-10
      "
    >
      {/* Premium background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#102C4D] via-[#071A32] to-[#041020]" />

        {/* Soft gold atmospheric lighting */}
        <div className="absolute -top-36 right-[8%] h-72 w-72 rounded-full bg-[#C89438]/[0.10] blur-[100px] transition-opacity duration-700 group-hover:bg-[#C89438]/[0.16]" />

        {/* Blue atmospheric lighting */}
        <div className="absolute -bottom-40 left-[25%] h-72 w-72 rounded-full bg-[#32618E]/20 blur-[100px]" />

        {/* Subtle architectural line */}
        <div className="absolute inset-y-0 start-0 w-[3px] bg-gradient-to-b from-transparent via-[#D6A64D] to-transparent opacity-90" />

        {/* Decorative circular outline */}
        <div className="absolute -right-24 -top-40 h-[340px] w-[340px] rounded-full border border-white/[0.045]" />

        <div className="absolute -right-12 -top-28 h-[250px] w-[250px] rounded-full border border-[#D6A64D]/[0.10]" />

        {/* Fine highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      <div className="relative flex min-h-[125px] items-center justify-between gap-5 sm:min-h-[135px]">
        {/* Text content */}
        <div className="min-w-0 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 shrink-0 bg-[#D6A64D]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E0B968] sm:text-[11px]">
              {content.eyebrow}
            </p>
          </div>

          <h1 className="
            font-serif
            text-[29px] font-medium leading-[1.15]
            tracking-[-0.035em]
            text-white
            sm:text-[36px]
            lg:text-[42px]
          ">
            {content.title}
          </h1>

          <p className="
            mt-3 max-w-2xl
            text-[13px] leading-[1.8]
            text-slate-300/75
            sm:text-[14px]
            sm:leading-7
          ">
            {content.description}
          </p>
        </div>

        {/* Minimal book emblem */}
        <div
          aria-hidden="true"
          className="
            relative hidden shrink-0
            sm:flex sm:items-center sm:justify-center
            sm:h-[88px] sm:w-[88px]
            lg:h-[104px] lg:w-[104px]
          "
        >
          {/* Outer ring */}
          <div className="
            absolute inset-0 rounded-full
            border border-[#D6A64D]/20
            transition-transform duration-700
            group-hover:rotate-12
          " />

          {/* Inner circle */}
          <div className="
            absolute inset-[9px] rounded-full
            border border-white/[0.07]
            bg-white/[0.025]
            backdrop-blur-sm
          " />

          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="relative h-9 w-9 text-[#D9AE61] lg:h-10 lg:w-10"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5.5c2.8-1 5.5-.5 8 1.2v13c-2.5-1.7-5.2-2.2-8-1.2z" />
            <path d="M20 5.5c-2.8-1-5.5-.5-8 1.2v13c2.5-1.7 5.2-2.2 8-1.2z" />
            <path d="M12 6.7v13" />
          </svg>
        </div>
      </div>
    </header>
  );
}


// export function ProductListingHero({ locale }: Props) {
//   const searchParams = useSearchParams();

//   const language = locale === "ar" ? "ar" : "en";

//   const category = searchParams.get("category");
//   const collection = searchParams.get("collection");
//   const type = searchParams.get("type");
//   const publisher = searchParams.get("publisher");
//   const query = searchParams.get("q");

//   let content: HeroContent = defaultContent[language];

//   if (category) {
//     const categoryName = getCategoryLabel(category, locale);

//     content = {
//       eyebrow:
//         language === "ar" ? "تصفح حسب التخصص" : "EXPLORE BY SUBJECT",
//       title: categoryName,
//       description:
//         language === "ar"
//           ? `اكتشف مجموعة الكتب الأكاديمية والمهنية المتخصصة في ${categoryName}.`
//           : `Explore academic and professional books covering ${categoryName}, from trusted publishers and authors.`,
//     };
//   } else if (collection && collectionContent[collection]) {
//     content = collectionContent[collection][language];
//   } else if (publisher) {
//     content = {
//       eyebrow:
//         language === "ar" ? "منشورات دور النشر" : "PUBLISHER COLLECTION",
//       title: publisher,
//       description:
//         language === "ar"
//           ? `اكتشف الكتب والمنشورات المتاحة من ${publisher}.`
//           : `Explore available academic and professional publications from ${publisher}.`,
//     };
//   } else if (type === "ebook") {
//     content = {
//       eyebrow: language === "ar" ? "اقرأ رقميًا" : "READ DIGITALLY",
//       title: language === "ar" ? "الكتب الإلكترونية" : "eBooks",
//       description:
//         language === "ar"
//           ? "استكشف الكتب الإلكترونية والمصادر الأكاديمية الرقمية."
//           : "Explore digital books and academic resources, ready for convenient reading.",
//     };
//   } else if (type === "textbook") {
//     content = {
//       eyebrow: language === "ar" ? "مصادر التعلم" : "LEARNING RESOURCES",
//       title: language === "ar" ? "الكتب الدراسية" : "Textbooks",
//       description:
//         language === "ar"
//           ? "اكتشف الكتب الدراسية والمراجع التعليمية لمختلف التخصصات."
//           : "Find textbooks and educational references across a wide range of subjects.",
//     };
//   } else if (query) {
//     content = {
//       eyebrow: language === "ar" ? "نتائج البحث" : "SEARCH RESULTS",
//       title:
//         language === "ar"
//           ? `نتائج: ${query}`
//           : `Search results`,
//       description:
//         language === "ar"
//           ? `الكتب والموارد المتاحة المتعلقة ببحثك عن "${query}".`
//           : `Explore books and resources matching your search for "${query}".`,
//     };
//   }

//   return (
//     <header
//       key={`${category}-${collection}-${type}-${publisher}-${query}`}
//       dir={language === "ar" ? "rtl" : "ltr"}
//       className="group relative isolate overflow-hidden rounded-2xl bg-ubh-navy px-5 py-7 text-white shadow-sm sm:px-8 sm:py-9 lg:px-10 lg:py-10"
//     >
//       {/* Background decoration */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
//       >
//         <div className="absolute -right-20 -top-28 h-64 w-64 rounded-full border border-white/[0.07] transition-transform duration-700 group-hover:scale-110 sm:h-80 sm:w-80" />

//         <div className="absolute -right-8 -top-16 h-48 w-48 rounded-full border border-ubh-gold/20 sm:h-60 sm:w-60" />

//         <div className="absolute -bottom-24 left-[35%] h-52 w-52 rounded-full bg-ubh-blue/30 blur-3xl" />

//         <div className="absolute inset-y-0 start-0 w-1 bg-ubh-gold/80" />
//       </div>

//       <div className="relative flex items-center justify-between gap-5">
//         <div className="max-w-3xl min-w-0">
//           <div className="mb-4 flex items-center gap-3">
//             <span className="h-px w-7 shrink-0 bg-ubh-gold" />

//             <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ubh-gold-soft sm:text-[11px]">
//               {content.eyebrow}
//             </p>
//           </div>

//           <h1 className="font-serif text-[28px] font-medium leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-[42px]">
//             {content.title}
//           </h1> 

//           <p className="mt-3 max-w-2xl text-[13px] leading-6 text-white/70 sm:text-sm sm:leading-7">
//             {content.description}
//           </p>
//         </div>

//         {/* Book illustration */}
//         <div
//           aria-hidden="true"
//           className="hidden shrink-0 sm:flex"
//         >
//           <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-all duration-500 group-hover:border-ubh-gold/40 group-hover:bg-white/[0.07] lg:h-[76px] lg:w-[76px]">
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               className="h-6 w-6 text-ubh-gold-soft lg:h-7 lg:w-7"
//               stroke="currentColor"
//               strokeWidth="1.4"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M4 5.5c2.8-1 5.5-.5 8 1.2v13c-2.5-1.7-5.2-2.2-8-1.2z" />
//               <path d="M20 5.5c-2.8-1-5.5-.5-8 1.2v13c2.5-1.7 5.2-2.2 8-1.2z" />
//               <path d="M12 6.7v13" />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
