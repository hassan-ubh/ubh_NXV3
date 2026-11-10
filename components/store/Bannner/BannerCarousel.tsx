// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
//   type TouchEvent,
// } from "react";
// import { usePathname } from "next/navigation";

// export type CarouselItem = {
//   id: string;
//   variant: string;
//   eyebrow: string;
//   eyebrowAr?: string;
//   title: string;
//   titleAr?: string;
//   subtitle?: string;
//   subtitleAr?: string;
//   description: string;
//   descriptionAr?: string;
//   buttonText: string;
//   buttonTextAr?: string;
//   buttonLink: string;
//   imageUrl: string;
//   extraImages?: string[];
//   price?: number;
//   oldPrice?: number;
//   currency?: string;
//   badge?: string;
//   badgeAr?: string;
// };

// type BannerCarouselProps = {
//   items: CarouselItem[];
// };

// const themes: Record<
//   string,
//   {
//     background: string;
//     foreground: string;
//     muted: string;
//     accent: string;
//     button: string;
//   }
// > = {
//   publisher: {
//     background: "bg-[#edf2f7]",
//     foreground: "text-[#173653]",
//     muted: "text-[#62758a]",
//     accent: "bg-[#c4934d]",
//     button: "bg-[#173653] text-white hover:bg-[#294d70]",
//   },
//   editorial: {
//     background: "bg-[#f5f0e7]",
//     foreground: "text-[#44382b]",
//     muted: "text-[#796b5b]",
//     accent: "bg-[#a98250]",
//     button: "bg-[#51402e] text-white hover:bg-[#6b543c]",
//   },
//   "world-history": {
//     background: "bg-[#f3ede2]",
//     foreground: "text-[#493b2b]",
//     muted: "text-[#796b5b]",
//     accent: "bg-[#a98250]",
//     button: "bg-[#51402e] text-white hover:bg-[#6b543c]",
//   },
//   arabic: {
//     background: "bg-[#edf3ed]",
//     foreground: "text-[#24483d]",
//     muted: "text-[#65786b]",
//     accent: "bg-[#78977e]",
//     button: "bg-[#315b49] text-white hover:bg-[#426e5a]",
//   },
//   "arabic-books": {
//     background: "bg-[#edf3ed]",
//     foreground: "text-[#24483d]",
//     muted: "text-[#65786b]",
//     accent: "bg-[#78977e]",
//     button: "bg-[#315b49] text-white hover:bg-[#426e5a]",
//   },
//   academic: {
//     background: "bg-[#eef1f6]",
//     foreground: "text-[#263d58]",
//     muted: "text-[#65758a]",
//     accent: "bg-[#8298b5]",
//     button: "bg-[#304d6d] text-white hover:bg-[#416184]",
//   },
//   sociology: {
//     background: "bg-[#eef1f6]",
//     foreground: "text-[#263d58]",
//     muted: "text-[#65758a]",
//     accent: "bg-[#8298b5]",
//     button: "bg-[#304d6d] text-white hover:bg-[#416184]",
//   },
//   corporate: {
//     background: "bg-[#f1f0eb]",
//     foreground: "text-[#344354]",
//     muted: "text-[#66717c]",
//     accent: "bg-[#a99b80]",
//     button: "bg-[#354a5f] text-white hover:bg-[#49627a]",
//   },
// };

// const defaultTheme = {
//   background: "bg-[#f1f3f5]",
//   foreground: "text-[#253a50]",
//   muted: "text-[#627184]",
//   accent: "bg-[#c89438]",
//   button: "bg-[#263f5a] text-white hover:bg-[#385673]",
// };

// export default function BannerCarousel({
//   items,
// }: BannerCarouselProps) {
//   const pathname = usePathname();
//   const isArabic = pathname?.startsWith("/ar") ?? false;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   const touchStart = useRef<number | null>(null);

//   const currentItem = items.length
//     ? items[currentIndex % items.length]
//     : null;

//   const goTo = useCallback(
//     (index: number) => {
//       if (!items.length) return;
//       setCurrentIndex((index + items.length) % items.length);
//     },
//     [items.length]
//   );

//   const next = useCallback(
//     () => goTo(currentIndex + 1),
//     [currentIndex, goTo]
//   );

//   const previous = useCallback(
//     () => goTo(currentIndex - 1),
//     [currentIndex, goTo]
//   );

//   useEffect(() => {
//     if (items.length <= 1 || isPaused) return;

//     const timer = window.setInterval(next, 6500);

//     return () => window.clearInterval(timer);
//   }, [items.length, isPaused, next]);

//   if (!currentItem) return null;

//   const variant = currentItem.variant;
//   const theme = themes[variant] || defaultTheme;

//   const isPublisher = variant === "publisher";

//   const isEditorial = [
//     "editorial",
//     "world-history",
//   ].includes(variant);

//   const isArabicCollection = [
//     "arabic",
//     "arabic-books",
//   ].includes(variant);

//   const isAcademic = [
//     "academic",
//     "sociology",
//   ].includes(variant);

//   const isCorporate = variant === "corporate";

//   const title = isArabic
//     ? currentItem.titleAr || currentItem.title
//     : currentItem.title;

//   const eyebrow = isArabic
//     ? currentItem.eyebrowAr || currentItem.eyebrow
//     : currentItem.eyebrow;

//   const subtitle = isArabic
//     ? currentItem.subtitleAr || currentItem.subtitle
//     : currentItem.subtitle;

//   const description = isArabic
//     ? currentItem.descriptionAr || currentItem.description
//     : currentItem.description;

//   const buttonText = isArabic
//     ? currentItem.buttonTextAr || currentItem.buttonText
//     : currentItem.buttonText;

//   const badge = isArabic
//     ? currentItem.badgeAr || currentItem.badge
//     : currentItem.badge;

//   const images =
//     currentItem.extraImages?.filter(Boolean).slice(0, 3) || [];

//   const displayImages = images.length
//     ? images
//     : [currentItem.imageUrl];

//   const handleTouchEnd = (
//     event: TouchEvent<HTMLElement>
//   ) => {
//     if (touchStart.current === null) return;

//     const end =
//       event.changedTouches[0]?.clientX ??
//       touchStart.current;

//     const difference = touchStart.current - end;

//     if (Math.abs(difference) > 45) {
//       if (isArabic ? difference < 0 : difference > 0) {
//         next();
//       } else {
//         previous();
//       }
//     }

//     touchStart.current = null;
//   };

//   // Shared banner text
//   const Copy = ({
//     centered = false,
//   }: {
//     centered?: boolean;
//   }) => (
//     <div
//       className={`banner-copy relative z-10 flex min-w-0 flex-col ${
//         centered
//           ? "items-center text-center"
//           : "items-center text-center lg:items-start lg:text-start"
//       }`}
//     >
//       <span
//         className={`inline-flex items-center gap-2 rounded-full border border-current/15 bg-white/65 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] sm:text-[10px] ${theme.foreground}`}
//       >
//         <span
//           className={`h-1.5 w-1.5 rounded-full ${theme.accent}`}
//         />
//         {eyebrow}
//       </span>

//       <h2
//         className={`mt-3 max-w-[590px] text-balance font-bold leading-[1.16] tracking-tight ${theme.foreground} ${
//           isEditorial
//             ? "font-serif text-[29px] sm:text-4xl lg:text-[43px]"
//             : "text-[27px] sm:text-4xl lg:text-[42px]"
//         }`}
//       >
//         {title}
//       </h2>

//       {subtitle && (
//         <p
//           className={`mt-2 text-sm font-semibold sm:text-base ${theme.muted}`}
//         >
//           {subtitle}
//         </p>
//       )}

//       {description && (
//         <p
//           className={`mt-3 max-w-[440px] text-xs leading-6 sm:text-sm sm:leading-7 ${theme.muted}`}
//         >
//           {description}
//         </p>
//       )}

//       {currentItem.price !== undefined && (
//         <div className="mt-3 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
//           {badge && (
//             <span className="rounded-full bg-[#c89438] px-3 py-1 text-[10px] font-bold text-white">
//               {badge}
//             </span>
//           )}

//           <span className={`text-xl font-extrabold ${theme.foreground}`}>
//             {currentItem.currency || "AED"} {currentItem.price}
//           </span>

//           {currentItem.oldPrice !== undefined && (
//             <span className={`text-sm line-through ${theme.muted}`}>
//               {currentItem.currency || "AED"} {currentItem.oldPrice}
//             </span>
//           )}
//         </div>
//       )}

//       <Link
//         href={currentItem.buttonLink}
//         className={`banner-button group mt-5 inline-flex min-h-11 items-center justify-center gap-3 rounded-lg px-6 py-3 text-xs font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] focus-visible:ring-offset-2 sm:text-sm ${theme.button}`}
//       >
//         {buttonText}

//         <span
//           aria-hidden="true"
//           className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
//         >
//           {isArabic ? "←" : "→"}
//         </span>
//       </Link>
//     </div>
//   );

//   // Optimized book image
//   const Book = ({
//     src,
//     alt,
//     className = "",
//     priority = false,
//   }: {
//     src: string;
//     alt: string;
//     className?: string;
//     priority?: boolean;
//   }) => (
//     <div className={`banner-book relative shrink-0 ${className}`}>
//       <Image
//         src={src}
//         alt={alt}
//         fill
//         priority={priority}
//         sizes="(max-width: 640px) 115px, (max-width: 1024px) 170px, 220px"
//         className="object-contain drop-shadow-[0_14px_16px_rgba(20,35,50,0.2)]"
//       />
//     </div>
//   );

//   // Multiple book composition
//   const BookGroup = ({
//     framed = false,
//   }: {
//     framed?: boolean;
//   }) => (
//     <div
//       className={`relative flex h-full w-full items-center justify-center ${
//         framed
//           ? "rounded-2xl border border-white/70 bg-white/50"
//           : ""
//       }`}
//     >
//       {displayImages.map((src, index) => (
//         <Book
//           key={`${src}-${index}`}
//           src={src}
//           alt={`${title} ${index + 1}`}
//           priority={currentIndex === 0}
//           className={`h-[145px] w-[100px] sm:h-[190px] sm:w-[130px] lg:h-[245px] lg:w-[165px] ${
//             displayImages.length === 1
//               ? ""
//               : index === 1
//                 ? "relative z-10 -translate-y-3"
//                 : index === 0
//                   ? "-mr-5 -rotate-6 translate-y-2 sm:-mr-7"
//                   : "-ml-5 rotate-6 translate-y-2 sm:-ml-7"
//           }`}
//         />
//       ))}
//     </div>
//   );

//   // 1. Publisher layout
//   const PublisherLayout = () => (
//     <div className="relative grid h-full grid-rows-[1fr_190px] lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-1">
//       <div className="flex items-center justify-center px-7 py-6 sm:px-12 lg:px-14 xl:px-16">
//         <Copy />
//       </div>

//       <div className="relative flex items-center justify-center overflow-hidden bg-white/35 px-5 py-4">
//         <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border-[28px] border-white/50" />

//         <div className="relative h-full w-full max-w-[440px]">
//           <BookGroup />
//         </div>

//         <span className="pointer-events-none absolute bottom-5 left-1/2 h-8 w-2/3 -translate-x-1/2 rounded-full bg-[#173653]/10 blur-xl" />
//       </div>
//     </div>
//   );

//   // 2. Editorial layout
//   const EditorialLayout = () => (
//     <div className="relative grid h-full grid-rows-[1fr_185px] overflow-hidden px-6 sm:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-1">
//       <div className="pointer-events-none absolute inset-4 rounded-xl border border-[#bda982]/40 sm:inset-6" />

//       <div className="relative z-10 flex items-center justify-center py-6 lg:py-8">
//         <Copy />
//       </div>

//       <div className="relative flex items-center justify-center">
//         <div className="absolute bottom-8 h-20 w-[70%] rounded-full bg-white/70 blur-2xl" />

//         <Book
//           src={currentItem.imageUrl}
//           alt={title}
//           priority={currentIndex === 0}
//           className="relative z-10 h-[165px] w-[125px] sm:h-[205px] sm:w-[155px] lg:h-[285px] lg:w-[210px]"
//         />

//         {badge && (
//           <span className="absolute right-[12%] top-5 z-20 rounded-full bg-[#a98250] px-3 py-2 text-[9px] font-bold text-white sm:text-xs">
//             {badge}
//           </span>
//         )}
//       </div>
//     </div>
//   );

//   // 3. Arabic collection layout
//   const ArabicLayout = () => (
//     <div className="relative grid h-full grid-rows-[1fr_175px] overflow-hidden px-6 sm:px-12 lg:grid-cols-[1fr_1fr] lg:grid-rows-1">
//       <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-[#9eb6a2]/50" />

//       <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-[#9eb6a2]/40" />

//       <div className="relative z-10 flex items-center justify-center py-6">
//         <Copy centered />
//       </div>

//       <div className="relative flex items-center justify-center pb-3 lg:pb-0">
//         <div className="relative h-full w-full max-w-[420px]">
//           <BookGroup />
//         </div>
//       </div>
//     </div>
//   );

//   // 4. Academic layout
//   const AcademicLayout = () => (
//     <div className="relative grid h-full grid-rows-[1fr_185px] lg:grid-cols-[1.1fr_0.9fr] lg:grid-rows-1">
//       <div className="flex items-center justify-center px-7 py-6 sm:px-12 lg:px-14">
//         <Copy />
//       </div>

//       <div className="relative flex items-center justify-center px-6 py-5">
//         <div className="relative flex h-full w-full max-w-[350px] items-center justify-center rounded-2xl border border-[#d4dce7] bg-white/60 shadow-sm lg:max-h-[330px]">
//           <div className="absolute left-4 top-4 h-7 w-7 border-l border-t border-[#a8b9cd]" />

//           <div className="absolute bottom-4 right-4 h-7 w-7 border-b border-r border-[#a8b9cd]" />

//           <Book
//             src={currentItem.imageUrl}
//             alt={title}
//             priority={currentIndex === 0}
//             className="h-[150px] w-[115px] sm:h-[185px] sm:w-[140px] lg:h-[245px] lg:w-[185px]"
//           />

//           {badge && (
//             <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#8298b5] px-3 py-1.5 text-[9px] font-bold text-white">
//               {badge}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   // 5. Corporate layout
//   const CorporateLayout = () => (
//     <div className="relative grid h-full grid-rows-[190px_1fr] overflow-hidden px-6 py-5 sm:grid-rows-[220px_1fr] sm:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-1 lg:items-center">
//       <div className="pointer-events-none absolute inset-x-0 top-0 h-[58%] bg-white/45 lg:inset-y-0 lg:left-0 lg:h-full lg:w-[48%]" />

//       <div className="relative z-10 flex items-center justify-center">
//         <Book
//           src={currentItem.imageUrl}
//           alt={title}
//           priority={currentIndex === 0}
//           className="h-[165px] w-[125px] sm:h-[195px] sm:w-[150px] lg:h-[285px] lg:w-[210px]"
//         />
//       </div>

//       <div className="relative z-10 flex items-center justify-center py-2 lg:px-8">
//         <div className="w-full max-w-[620px] rounded-xl border border-white/80 bg-white/75 px-5 py-5 shadow-sm backdrop-blur-md sm:px-8 sm:py-7">
//           <Copy centered />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <section
//       dir={isArabic ? "rtl" : "ltr"}
//       aria-label={
//         isArabic
//           ? "الكتب والمجموعات المميزة"
//           : "Featured books and collections"
//       }
//       aria-roledescription="carousel"
//       className="relative w-full"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//       onFocusCapture={() => setIsPaused(true)}
//       onBlurCapture={(event) => {
//         if (
//           !event.currentTarget.contains(
//             event.relatedTarget as Node | null
//           )
//         ) {
//           setIsPaused(false);
//         }
//       }}
//       onTouchStart={(event) => {
//         touchStart.current =
//           event.touches[0]?.clientX ?? null;
//       }}
//       onTouchEnd={handleTouchEnd}
//     >
//       <div
//         key={currentItem.id}
//         className={`banner-slide relative isolate h-[510px] overflow-hidden rounded-2xl border border-black/[0.045] sm:h-[490px] lg:h-[410px] lg:rounded-3xl ${theme.background}`}
//         aria-live="polite"
//       >
//         {isPublisher ? (
//           <PublisherLayout />
//         ) : isEditorial ? (
//           <EditorialLayout />
//         ) : isArabicCollection ? (
//           <ArabicLayout />
//         ) : isAcademic ? (
//           <AcademicLayout />
//         ) : isCorporate ? (
//           <CorporateLayout />
//         ) : (
//           <PublisherLayout />
//         )}

//         {badge &&
//           !isEditorial &&
//           !isAcademic &&
//           currentItem.price === undefined && (
//             <span
//               className={`pointer-events-none absolute top-4 z-20 rounded-full px-3 py-1.5 text-[9px] font-bold text-white ${theme.accent} ${
//                 isArabic ? "left-4" : "right-4"
//               }`}
//             >
//               {badge}
//             </span>
//           )}
//       </div>

//       {items.length > 1 && (
//         <>
//           <button
//             type="button"
//             onClick={previous}
//             aria-label={
//               isArabic ? "الشريحة السابقة" : "Previous banner"
//             }
//             className={`absolute top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-lg text-[#263f5a] shadow-md backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] sm:h-10 sm:w-10 ${
//               isArabic
//                 ? "right-2 sm:right-4"
//                 : "left-2 sm:left-4"
//             }`}
//           >
//             {isArabic ? "→" : "←"}
//           </button>

//           <button
//             type="button"
//             onClick={next}
//             aria-label={
//               isArabic ? "الشريحة التالية" : "Next banner"
//             }
//             className={`absolute top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-lg text-[#263f5a] shadow-md backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] sm:h-10 sm:w-10 ${
//               isArabic
//                 ? "left-2 sm:left-4"
//                 : "right-2 sm:right-4"
//             }`}
//           >
//             {isArabic ? "←" : "→"}
//           </button>

//           <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-2 shadow-sm backdrop-blur sm:bottom-4">
//             {items.map((item, index) => (
//               <button
//                 key={item.id}
//                 type="button"
//                 onClick={() => goTo(index)}
//                 aria-label={
//                   isArabic
//                     ? `الانتقال إلى الشريحة ${index + 1}`
//                     : `Go to banner ${index + 1}`
//                 }
//                 aria-current={
//                   currentIndex === index ? "true" : undefined
//                 }
//                 className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] ${
//                   currentIndex === index
//                     ? "w-7 bg-[#b88a43]"
//                     : "w-1.5 bg-[#263f5a]/25 hover:bg-[#b88a43]/70"
//                 }`}
//               />
//             ))}
//           </div>
//         </>
//       )}

//       <style jsx>{`
//         .banner-slide {
//           animation: slide-enter 550ms
//             cubic-bezier(0.2, 0.7, 0.2, 1) both;
//         }

//         .banner-copy {
//           animation: copy-enter 650ms 80ms
//             cubic-bezier(0.2, 0.7, 0.2, 1) both;
//         }

//         .banner-book {
//           animation: book-enter 700ms 100ms
//             cubic-bezier(0.2, 0.7, 0.2, 1) both;
//           transition: transform 350ms ease;
//         }

//         .banner-book:hover {
//           transform: translateY(-5px);
//         }

//         .banner-button {
//           transition:
//             transform 220ms ease,
//             box-shadow 220ms ease,
//             background-color 220ms ease;
//         }

//         @keyframes slide-enter {
//           from {
//             opacity: 0.65;
//           }
//           to {
//             opacity: 1;
//           }
//         }

//         @keyframes copy-enter {
//           from {
//             opacity: 0;
//             transform: translateY(12px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes book-enter {
//           from {
//             opacity: 0;
//             transform: translateY(13px) scale(0.97);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .banner-slide,
//           .banner-copy,
//           .banner-book {
//             animation: none !important;
//           }

//           .banner-book,
//           .banner-button {
//             transition: none !important;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { usePathname } from "next/navigation";

export type CarouselItem = {
  id: string;
  variant: string;
  eyebrow: string;
  eyebrowAr?: string;
  title: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  description: string;
  descriptionAr?: string;
  buttonText: string;
  buttonTextAr?: string;
  buttonLink: string;
  imageUrl: string;
  extraImages?: string[];
  price?: number;
  oldPrice?: number;
  currency?: string;
  badge?: string;
  badgeAr?: string;
};

type BannerCarouselProps = {
  items: CarouselItem[];
};

const variantLabels: Record<string, { en: string; ar: string }> = {
  publisher: { en: "UBH Publications", ar: "إصدارات دار الكتب الجامعية" },
  editorial: { en: "Editor's choice", ar: "اختيار المحرر" },
  "world-history": { en: "Editor's choice", ar: "اختيار المحرر" },
  arabic: { en: "Arabic collection", ar: "المجموعة العربية" },
  "arabic-books": { en: "Arabic collection", ar: "المجموعة العربية" },
  academic: { en: "Academic collection", ar: "المجموعة الأكاديمية" },
  sociology: { en: "Academic collection", ar: "المجموعة الأكاديمية" },
  corporate: { en: "Business & leadership", ar: "الأعمال والقيادة" },
};

export default function BannerCarousel({ items }: BannerCarouselProps) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar") ?? false;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const currentItem = items.length
    ? items[currentIndex % items.length]
    : null;

  const goTo = useCallback(
    (index: number) => {
      if (!items.length) return;
      setCurrentIndex((index + items.length) % items.length);
    },
    [items.length],
  );

  const next = useCallback(() => {
    setCurrentIndex((index) => (index + 1) % items.length);
  }, [items.length]);

  const previous = useCallback(() => {
    setCurrentIndex((index) => (index - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;
    const timer = window.setInterval(next, 6500);
    return () => window.clearInterval(timer);
  }, [items.length, isPaused, next]);

  if (!currentItem) return null;

  const title = isArabic
    ? currentItem.titleAr || currentItem.title
    : currentItem.title;
  const eyebrow = isArabic
    ? currentItem.eyebrowAr || currentItem.eyebrow
    : currentItem.eyebrow;
  const subtitle = isArabic
    ? currentItem.subtitleAr || currentItem.subtitle
    : currentItem.subtitle;
  const description = isArabic
    ? currentItem.descriptionAr || currentItem.description
    : currentItem.description;
  const buttonText = isArabic
    ? currentItem.buttonTextAr || currentItem.buttonText
    : currentItem.buttonText;
  const badge = isArabic
    ? currentItem.badgeAr || currentItem.badge
    : currentItem.badge;

  const collectionLabel =
    variantLabels[currentItem.variant]?.[isArabic ? "ar" : "en"] ??
    (isArabic ? "مجموعة مميزة" : "Featured collection");

  const covers = (
    currentItem.extraImages?.filter(Boolean).slice(0, 3) ?? []
  ).length
    ? currentItem.extraImages!.filter(Boolean).slice(0, 3)
    : [currentItem.imageUrl];

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStart.current === null) return;
    const end = event.changedTouches[0]?.clientX ?? touchStart.current;
    const difference = touchStart.current - end;

    if (Math.abs(difference) > 45) {
      if (isArabic ? difference < 0 : difference > 0) next();
      else previous();
    }
    touchStart.current = null;
  };

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      aria-label={
        isArabic ? "الكتب والمجموعات المميزة" : "Featured books and collections"
      }
      aria-roledescription="carousel"
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={handleTouchEnd}
    >
      <div
        key={currentItem.id}
        aria-live="polite"
        className="relative isolate min-h-[570px] overflow-hidden rounded-[22px] border border-[#d9e0e9] bg-[#f5f7fa] shadow-[0_18px_55px_rgba(6,26,55,0.08)] sm:min-h-[500px] lg:min-h-[430px] lg:rounded-[28px]"
      >
        {/* Quiet, layered background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-32 h-[340px] w-[340px] rounded-full border border-[#c89438]/20 sm:h-[460px] sm:w-[460px]" />
          <div className="absolute -right-10 -top-16 h-[250px] w-[250px] rounded-full border border-[#c89438]/15 sm:h-[350px] sm:w-[350px]" />
          <div className="absolute -bottom-36 left-[28%] h-[300px] w-[300px] rounded-full bg-[#dce5ef]/65 blur-3xl" />
          <div className="absolute inset-y-0 right-0 hidden w-[48%] bg-gradient-to-l from-white/75 via-white/35 to-transparent lg:block" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#c89438]/50 to-transparent" />
        </div>

        <div className="relative z-10 grid min-h-[570px] grid-rows-[auto_220px] sm:min-h-[500px] sm:grid-rows-[auto_235px] lg:min-h-[430px] lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-1">
          {/* Text content */}
          <div className="flex min-w-0 items-center justify-center px-7 pb-2 pt-10 sm:px-12 sm:pt-12 lg:px-14 lg:py-12 xl:px-[76px]">
            <div className="banner-copy w-full max-w-[590px] text-center lg:text-start">
              <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#c89438]/25 bg-white/75 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#52657a] shadow-sm backdrop-blur sm:text-[10px]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c89438] shadow-[0_0_0_3px_rgba(200,148,56,0.13)]" />
                <span className="truncate">{eyebrow}</span>
              </div>

              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a47a35] sm:text-xs">
                {collectionLabel}
              </p>

              <h2 className="mx-auto max-w-[620px] text-balance text-[30px] font-semibold leading-[1.13] tracking-[-0.045em] text-[#061a37] sm:text-[40px] lg:mx-0 lg:text-[clamp(38px,4vw,54px)]">
                {title}
              </h2>

              {subtitle && (
                <p className="mt-3 text-sm font-semibold text-[#53677f] sm:text-base">
                  {subtitle}
                </p>
              )}

              {description && (
                <p className="mx-auto mt-3 max-w-[490px] text-xs leading-6 text-[#69798b] sm:text-sm sm:leading-7 lg:mx-0">
                  {description}
                </p>
              )}

              {(currentItem.price !== undefined || badge) && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  {badge && (
                    <span className="rounded-full bg-[#061a37] px-3 py-1.5 text-[10px] font-semibold text-white">
                      {badge}
                    </span>
                  )}
                  {currentItem.price !== undefined && (
                    <>
                      <span className="text-lg font-bold tracking-tight text-[#061a37] sm:text-xl">
                        {currentItem.currency || "AED"} {currentItem.price}
                      </span>
                      {currentItem.oldPrice !== undefined && (
                        <span className="text-sm text-[#8b96a4] line-through">
                          {currentItem.currency || "AED"} {currentItem.oldPrice}
                        </span>
                      )}
                    </>
                  )}
                </div>
              )}

              <div className="mt-6 flex justify-center lg:justify-start">
                <Link
                  href={currentItem.buttonLink}
                  className="group inline-flex min-h-12 items-center justify-center gap-4 rounded-xl bg-[#061a37] px-6 py-3 text-xs font-semibold text-white shadow-[0_8px_22px_rgba(6,26,55,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#102c50] hover:shadow-[0_12px_28px_rgba(6,26,55,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] focus-visible:ring-offset-2 sm:text-sm"
                >
                  {buttonText}
                  <span
                    aria-hidden="true"
                    className="text-base transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                  >
                    {isArabic ? "←" : "→"}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Product cover composition */}
          <div className="relative flex min-h-0 items-center justify-center px-8 pb-9 pt-1 sm:px-12 lg:px-8 lg:py-10">
            <div className="pointer-events-none absolute bottom-10 left-1/2 h-8 w-[65%] -translate-x-1/2 rounded-[50%] bg-[#061a37]/15 blur-2xl lg:bottom-16" />

            <div className="relative flex h-full w-full max-w-[480px] items-center justify-center">
              <div className="absolute h-[175px] w-[175px] rounded-full border border-[#c89438]/25 bg-white/45 shadow-[0_0_70px_rgba(200,148,56,0.12)] sm:h-[215px] sm:w-[215px] lg:h-[285px] lg:w-[285px]" />
              <div className="absolute h-[145px] w-[145px] rounded-full border border-white/90 sm:h-[180px] sm:w-[180px] lg:h-[235px] lg:w-[235px]" />

              {covers.map((src, index) => {
                const count = covers.length;
                const isCenter = count === 1 || index === Math.floor(count / 2);
                const position =
                  count === 1
                    ? "z-20"
                    : isCenter
                      ? "z-20 -translate-y-1"
                      : index === 0
                        ? "z-10 -translate-x-5 -rotate-[9deg] translate-y-3 sm:-translate-x-8"
                        : "z-10 translate-x-5 rotate-[9deg] translate-y-3 sm:translate-x-8";

                return (
                  <div
                    key={`${src}-${index}`}
                    className={`relative h-[175px] w-[120px] shrink-0 transition-transform duration-500 sm:h-[205px] sm:w-[140px] lg:h-[270px] lg:w-[185px] ${position}`}
                  >
                    <Image
                      src={src}
                      alt={`${title} ${index + 1}`}
                      fill
                      priority={currentIndex === 0}
                      sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 185px"
                      className="object-contain drop-shadow-[0_18px_18px_rgba(6,26,55,0.24)]"
                    />
                  </div>
                );
              })}
            </div>

            {currentItem.variant === "publisher" && (
              <span className="absolute bottom-5 hidden rounded-full border border-white/80 bg-white/65 px-4 py-2 text-[9px] font-semibold tracking-[0.16em] text-[#52657a] shadow-sm backdrop-blur sm:block lg:bottom-7">
                ADVANCING KNOWLEDGE SINCE 1986
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={previous}
            aria-label={isArabic ? "الشريحة السابقة" : "Previous banner"}
            className={`absolute top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-lg text-[#061a37] shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] sm:flex ${
              isArabic ? "right-3 lg:right-5" : "left-3 lg:left-5"
            }`}
          >
            {isArabic ? "→" : "←"}
          </button>

          <button
            type="button"
            onClick={next}
            aria-label={isArabic ? "الشريحة التالية" : "Next banner"}
            className={`absolute top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-lg text-[#061a37] shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] sm:flex ${
              isArabic ? "left-3 lg:left-5" : "right-3 lg:right-5"
            }`}
          >
            {isArabic ? "←" : "→"}
          </button>

          <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/80 bg-white/85 px-3 py-2 shadow-md backdrop-blur sm:bottom-4">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={
                  isArabic
                    ? `الانتقال إلى الشريحة ${index + 1}`
                    : `Go to banner ${index + 1}`
                }
                aria-current={currentIndex === index ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] ${
                  currentIndex === index
                    ? "w-7 bg-[#c89438]"
                    : "w-1.5 bg-[#061a37]/25 hover:bg-[#c89438]/70"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        .banner-copy {
          animation: copy-in 650ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        @keyframes copy-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .banner-copy {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
