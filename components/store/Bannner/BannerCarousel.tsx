
// // "use client";

// // import Image from "next/image";
// // import Link from "next/link";
// // import { useEffect, useState } from "react";
// // import { usePathname } from "next/navigation";
// // export type CarouselItem = {
// //   id: string;
// //   variant: string;
// //   eyebrow: string;
// //   title: string;
// //   titleAr?: string;
// //   subtitle?: string; // changed from required to optional
// //   subtitleAr?: string;
// //   description: string;
// //   descriptionAr?: string;
// //   buttonText: string;
// //   buttonTextAr?: string;
// //   buttonLink: string;
// //   imageUrl: string;
// //   extraImages?: string[];
// //   price?: number;
// //   oldPrice?: number;
// //   currency?: string;
// //   badge?: string;
// // };

// // type BannerCarouselProps = {
// //   items: CarouselItem[];
// // };

// // export default function BannerCarousel({
// //   items,
// // }: BannerCarouselProps) {
// //   const pathname = usePathname();
// //   const isArabic = pathname?.startsWith("/ar") ?? false;

// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   const currentItem = items[currentIndex];

// //   useEffect(() => {
// //     if (items.length <= 1) return;

// //     const interval = setInterval(() => {
// //       setCurrentIndex((prev) => (prev + 1) % items.length);
// //     }, 6000);

// //     return () => clearInterval(interval);
// //   }, [items.length]);

// //   if (!items.length || !currentItem) return null;

// //   const next = () => {
// //     setCurrentIndex((prev) => (prev + 1) % items.length);
// //   };

// //   const previous = () => {
// //     setCurrentIndex(
// //       (prev) => (prev - 1 + items.length) % items.length
// //     );
// //   };

// //   const title = isArabic
// //     ? currentItem.titleAr || currentItem.title
// //     : currentItem.title;

// //   const subtitle = isArabic
// //     ? currentItem.subtitleAr || currentItem.subtitle
// //     : currentItem.subtitle;

// //   const description = isArabic
// //     ? currentItem.descriptionAr || currentItem.description
// //     : currentItem.description;

// //   const buttonText = isArabic
// //     ? currentItem.buttonTextAr || currentItem.buttonText
// //     : currentItem.buttonText;

// //   const currency = currentItem.currency || "AED";

// //   const isPublisher = currentItem.variant === "publisher";
// //   const isEditorial = ["editorial", "world-history"].includes(
// //     currentItem.variant
// //   );
// //   const isArabicCollection = [
// //     "arabic",
// //     "arabic-books",
// //   ].includes(currentItem.variant);
// //   const isAcademic = [
// //     "academic",
// //     "sociology",
// //   ].includes(currentItem.variant);

// //   const isDark = isPublisher || currentItem.variant === "corporate";

// //   const extraImages = currentItem.extraImages?.filter(Boolean) || [];

// //   const renderBookImages = () => {
// //     if (extraImages.length > 0) {
// //       return (
// //         <div className="flex h-full w-full items-center justify-center gap-2 sm:gap-4">
// //           {extraImages.slice(0, 3).map((src, index) => (
// //             <div
// //               key={`${src}-${index}`}
// //               className={`relative h-[190px] w-[115px] shrink-0 overflow-hidden rounded-lg shadow-2xl transition-transform duration-500 sm:h-[260px] sm:w-[155px] ${
// //                 index === 1
// //                   ? "z-10 -translate-y-5 rotate-0 sm:-translate-y-7"
// //                   : index === 0
// //                     ? "-rotate-6 translate-y-3"
// //                     : "rotate-6 translate-y-3"
// //               }`}
// //             >
// //               <Image
// //                 src={src}
// //                 alt="UBH book cover"
// //                 fill
// //                 unoptimized
// //                 sizes="(max-width: 640px) 115px, 155px"
// //                 className="object-cover"
// //               />
// //             </div>
// //           ))}
// //         </div>
// //       );
// //     }

// //     return (
// //       <div className="relative h-[250px] w-[180px] overflow-hidden rounded-lg shadow-2xl sm:h-[330px] sm:w-[235px]">
// //         <Image
// //           src={currentItem.imageUrl}
// //           alt={title}
// //           fill
// //           priority
// //           unoptimized
// //           sizes="(max-width: 640px) 180px, 235px"
// //           className="object-contain"
// //         />
// //       </div>
// //     );
// //   };

// //   const renderSingleImage = () => (
// //     <div className="relative h-[250px] w-[180px] overflow-hidden rounded-xl shadow-2xl sm:h-[330px] sm:w-[235px]">
// //       <Image
// //         src={currentItem.imageUrl}
// //         alt={title}
// //         fill
// //         priority
// //         unoptimized
// //         sizes="(max-width: 640px) 180px, 235px"
// //         className="object-contain"
// //       />
// //     </div>
// //   );

// //   return (
// //     <section
// //       dir={isArabic ? "rtl" : "ltr"}
// //       className="relative w-full"
// //       aria-label="Featured books and collections"
// //     >
// //       <div
// //         key={currentItem.id}
// //         className={`relative h-[560px] overflow-hidden rounded-2xl shadow-sm transition-colors duration-500 sm:h-[460px] lg:h-[490px] ${
// //           isPublisher
// //             ? "bg-gradient-to-br from-[#061a37] via-[#102c50] to-[#183c60] text-white"
// //             : isEditorial
// //               ? "bg-[#f5efe4] text-[#182b40]"
// //               : isArabicCollection
// //                 ? "bg-gradient-to-br from-[#e8f0e8] via-[#f5f4e9] to-[#e7eee9] text-[#173b35]"
// //                 : isAcademic
// //                   ? "bg-gradient-to-br from-[#edf2f8] to-[#dce7f2] text-[#142d4b]"
// //                   : "bg-gradient-to-br from-[#071b35] via-[#102c4b] to-[#244568] text-white"
// //         }`}
// //       >
// //         {/* Decorative background */}
// //         <div className="pointer-events-none absolute inset-0 overflow-hidden">
// //           {isPublisher && (
// //             <>
// //               <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" />
// //               <div className="absolute -right-12 -top-20 h-72 w-72 rounded-full border border-[#dcae57]/20" />
// //               <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#dcae57] to-transparent opacity-70" />
// //             </>
// //           )}

// //           {isEditorial && (
// //             <>
// //               <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#d8c5a5]/20 blur-3xl" />
// //               <div className="absolute bottom-0 left-0 h-2 w-full bg-[#c89438]" />
// //             </>
// //           )}

// //           {isArabicCollection && (
// //             <>
// //               <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#b9cbb9]/40 blur-3xl" />
// //               <div className="absolute bottom-0 left-0 h-2 w-full bg-[#b28a48]" />
// //             </>
// //           )}

// //           {isAcademic && (
// //             <>
// //               <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/60 blur-3xl" />
// //               <div className="absolute bottom-0 left-0 h-2 w-full bg-[#c89438]" />
// //             </>
// //           )}
// //         </div>

// //         <div className="relative z-10 grid h-full grid-cols-1 items-center gap-2 px-5 py-6 sm:px-10 sm:py-8 lg:grid-cols-2 lg:gap-8 lg:px-16">
// //           {/* Text content */}
// //           <div
// //             className={`flex h-full flex-col justify-center text-center lg:text-start ${
// //               isArabic ? "lg:items-start" : "lg:items-start"
// //             }`}
// //           >
// //             <span
// //               className={`mb-3 inline-flex w-fit items-center self-center rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] sm:text-xs lg:self-auto ${
// //                 isDark
// //                   ? "border border-[#dcae57]/40 bg-[#dcae57]/10 text-[#e5bd76]"
// //                   : "border border-[#c89438]/30 bg-[#c89438]/10 text-[#956a24]"
// //               }`}
// //             >
// //               {currentItem.eyebrow}
// //             </span>

// //             <h2
// //               className={`max-w-xl text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-[48px] ${
// //                 isEditorial
// //                   ? "font-serif"
// //                   : "font-sans"
// //               }`}
// //             >
// //               {title}
// //             </h2>

// //             {subtitle && (
// //               <p
// //                 className={`mt-3 text-sm font-semibold sm:text-base ${
// //                   isDark ? "text-[#e5bd76]" : "text-[#9b702d]"
// //                 }`}
// //               >
// //                 {subtitle}
// //               </p>
// //             )}

// //             {description && (
// //               <p
// //                 className={`mx-auto mt-3 max-w-lg text-xs leading-6 sm:text-sm sm:leading-7 lg:mx-0 ${
// //                   isDark ? "text-white/75" : "text-[#526174]"
// //                 }`}
// //               >
// //                 {description}
// //               </p>
// //             )}

// //             {/* Price */}
// //             {currentItem.price !== undefined && (
// //               <div className="mt-4 flex items-center justify-center gap-3 lg:justify-start">
// //                 {currentItem.badge && (
// //                   <span className="rounded-full bg-[#c89438] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
// //                     {currentItem.badge}
// //                   </span>
// //                 )}

// //                 <span className="text-xl font-extrabold sm:text-2xl">
// //                   {currency} {currentItem.price}
// //                 </span>

// //                 {currentItem.oldPrice !== undefined && (
// //                   <span className="text-sm text-current/50 line-through">
// //                     {currency} {currentItem.oldPrice}
// //                   </span>
// //                 )}
// //               </div>
// //             )}

// //             {/* CTA */}
// //             <div className="mt-5 flex justify-center lg:justify-start">
// //               <Link
// //                 href={currentItem.buttonLink}
// //                 className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-6 py-3 text-xs font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:text-sm ${
// //                   isDark
// //                     ? "bg-[#dcae57] text-[#061a37] hover:bg-[#edc477]"
// //                     : "bg-[#102d4d] text-white hover:bg-[#1b426b]"
// //                 }`}
// //               >
// //                 {buttonText}
// //                 <span aria-hidden="true" className="text-base">
// //                   {isArabic ? "←" : "→"}
// //                 </span>
// //               </Link>
// //             </div>
// //           </div>

// //           {/* Visual / book artwork */}
// //           <div className="relative flex h-full min-h-0 items-center justify-center">
// //             {isPublisher || isArabicCollection
// //               ? renderBookImages()
// //               : renderSingleImage()}

// //             {/* Price/badge on book spotlight */}
// //             {isEditorial && currentItem.badge && (
// //               <span className="absolute right-[8%] top-[12%] rotate-6 rounded-full bg-[#c89438] px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-lg sm:right-[15%]">
// //                 {currentItem.badge}
// //               </span>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Carousel controls */}
// //       {items.length > 1 && (
// //         <>
// //           <button
// //             type="button"
// //             onClick={previous}
// //             aria-label="Previous banner"
// //             className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/90 text-lg text-[#061a37] shadow-md transition hover:scale-110 hover:bg-white sm:left-5 sm:h-11 sm:w-11"
// //           >
// //             {isArabic ? "›" : "‹"}
// //           </button>

// //           <button
// //             type="button"
// //             onClick={next}
// //             aria-label="Next banner"
// //             className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/90 text-lg text-[#061a37] shadow-md transition hover:scale-110 hover:bg-white sm:right-5 sm:h-11 sm:w-11"
// //           >
// //             {isArabic ? "‹" : "›"}
// //           </button>

// //           {/* Dots */}
// //           <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-5">
// //             {items.map((item, index) => (
// //               <button
// //                 key={item.id}
// //                 type="button"
// //                 onClick={() => setCurrentIndex(index)}
// //                 aria-label={`Go to banner ${index + 1}`}
// //                 aria-current={currentIndex === index ? "true" : undefined}
// //                 className={`h-2 rounded-full transition-all duration-300 ${
// //                   currentIndex === index
// //                     ? "w-7 bg-[#c89438]"
// //                     : "w-2 bg-[#8b98a8]/60 hover:bg-[#c89438]"
// //                 }`}
// //               />
// //             ))}
// //           </div>
// //         </>
// //       )}
// //     </section>
// //   );
// // }



// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import { usePathname } from "next/navigation";

// export type CarouselItem = {
//   id: string;
//   variant: string;
//   eyebrow: string;
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
// };

// type BannerCarouselProps = {
//   items: CarouselItem[];
// };

// export default function BannerCarousel({
//   items,
// }: BannerCarouselProps) {
//   const pathname = usePathname();
//   const isArabic = pathname?.startsWith("/ar") ?? false;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const touchStart = useRef<number | null>(null);

//   const currentItem = items[currentIndex % Math.max(items.length, 1)];

//   useEffect(() => {
//     if (items.length <= 1 || isPaused) return;

//     const interval = window.setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % items.length);
//     }, 6500);

//     return () => window.clearInterval(interval);
//   }, [items.length, isPaused]);

//   if (!items.length || !currentItem) return null;

//   const goTo = (index: number) => {
//     setCurrentIndex((index + items.length) % items.length);
//   };

//   const next = () => goTo(currentIndex + 1);
//   const previous = () => goTo(currentIndex - 1);

//   const title = isArabic
//     ? currentItem.titleAr || currentItem.title
//     : currentItem.title;

//   const subtitle = isArabic
//     ? currentItem.subtitleAr || currentItem.subtitle
//     : currentItem.subtitle;

//   const description = isArabic
//     ? currentItem.descriptionAr || currentItem.description
//     : currentItem.description;

//   const buttonText = isArabic
//     ? currentItem.buttonTextAr || currentItem.buttonText
//     : currentItem.buttonText;

//   const isPublisher = currentItem.variant === "publisher";
//   const isEditorial = ["editorial", "world-history"].includes(
//     currentItem.variant
//   );
//   const isArabicCollection = [
//     "arabic",
//     "arabic-books",
//   ].includes(currentItem.variant);

//   const isAcademic = [
//     "academic",
//     "sociology",
//   ].includes(currentItem.variant);

//   const isDark =
//     isPublisher || currentItem.variant === "corporate";

//   const extraImages =
//     currentItem.extraImages?.filter(Boolean).slice(0, 3) || [];

//   const background = isPublisher
//     ? "bg-gradient-to-br from-[#061a37] via-[#102c50] to-[#183c60] text-white"
//     : isEditorial
//       ? "bg-gradient-to-br from-[#faf6ee] via-[#f3ecdf] to-[#e9dfce] text-[#182b40]"
//       : isArabicCollection
//         ? "bg-gradient-to-br from-[#f0f5ef] via-[#e7eee6] to-[#dce8dd] text-[#173b35]"
//         : isAcademic
//           ? "bg-gradient-to-br from-[#f2f5fa] via-[#e7edf5] to-[#dce6f1] text-[#142d4b]"
//           : "bg-gradient-to-br from-[#071b35] via-[#102c4b] to-[#244568] text-white";

//   const renderSingleImage = () => (
//     <div className="relative h-[190px] w-[150px] shrink-0 sm:h-[260px] sm:w-[195px] lg:h-[320px] lg:w-[235px]">
//       <div className="absolute inset-4 rounded-full bg-white/30 blur-3xl" />
//       <div className="absolute inset-0 drop-shadow-[0_18px_20px_rgba(0,0,0,0.20)]">
//         <Image
//           src={currentItem.imageUrl}
//           alt={title}
//           fill
//           priority={currentIndex === 0}
//           sizes="(max-width: 640px) 150px, (max-width: 1024px) 195px, 235px"
//           className="object-contain"
//         />
//       </div>
//     </div>
//   );

//   const renderBookImages = () => {
//     if (!extraImages.length) return renderSingleImage();

//     return (
//       <div className="flex h-full w-full items-center justify-center gap-2 px-2 sm:gap-4">
//         {extraImages.map((src, index) => (
//           <div
//             key={`${src}-${index}`}
//             className={`relative h-[145px] w-[91px] shrink-0 overflow-hidden rounded-md border border-black/5 bg-white shadow-[0_14px_25px_rgba(0,0,0,0.16)] transition-transform duration-500 sm:h-[210px] sm:w-[140px] lg:h-[260px] lg:w-[170px] ${
//               index === 1
//                 ? "z-10 -translate-y-3 sm:-translate-y-5"
//                 : index === 0
//                   ? "-rotate-6 translate-y-2"
//                   : "rotate-6 translate-y-2"
//             }`}
//           >
//             <Image
//               src={src}
//               alt={`${title} - book ${index + 1}`}
//               fill
//               priority={currentIndex === 0}
//               sizes="(max-width: 640px) 91px, (max-width: 1024px) 140px, 170px"
//               className="object-contain"
//             />
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <section
//       dir={isArabic ? "rtl" : "ltr"}
//       aria-label={isArabic ? "الكتب والمجموعات المميزة" : "Featured books and collections"}
//       aria-roledescription="carousel"
//       className="relative w-full"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//       onTouchStart={(event) => {
//         touchStart.current = event.touches[0]?.clientX ?? null;
//       }}
//       onTouchEnd={(event) => {
//         if (touchStart.current === null) return;

//         const end = event.changedTouches[0]?.clientX ?? touchStart.current;
//         const difference = touchStart.current - end;

//         if (Math.abs(difference) > 50) {
//           if (difference > 0) {
//             isArabic ? previous() : next();
//           } else {
//             isArabic ? next() : previous();
//           }
//         }

//         touchStart.current = null;
//       }}
//     >
//       {/* Main banner */}
//       <div
//         key={currentItem.id}
//         className={`relative isolate grid min-h-[535px] grid-rows-[1fr_195px] overflow-hidden rounded-2xl ${background} sm:min-h-[570px] sm:grid-rows-[1fr_235px] lg:min-h-[440px] lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-1 lg:rounded-3xl xl:min-h-[475px]`}
//       >
//         {/* Decorative background */}
//         <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
//           <div className="absolute -right-28 -top-32 h-80 w-80 rounded-full border border-[#dcae57]/15 sm:h-[420px] sm:w-[420px]" />
//           <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-current/10 sm:h-[340px] sm:w-[340px]" />

//           <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#dcae57]/10 blur-3xl" />

//           <div
//             className={`absolute bottom-0 left-0 h-1 w-full ${
//               isDark
//                 ? "bg-gradient-to-r from-transparent via-[#dcae57] to-transparent"
//                 : "bg-gradient-to-r from-transparent via-[#c89438]/70 to-transparent"
//             }`}
//           />
//         </div>

//         {/* Text content */}
//         <div className="relative z-10 flex min-w-0 flex-col items-center justify-center px-8 pb-3 pt-9 text-center sm:px-12 sm:pb-5 sm:pt-12 lg:items-start lg:px-12 lg:py-12 lg:text-start xl:px-16">
//           {/* Eyebrow */}
//           <span
//             className={`mb-4 inline-flex items-center rounded-full border px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] sm:text-[10px] lg:text-xs ${
//               isDark
//                 ? "border-[#dcae57]/40 bg-[#dcae57]/10 text-[#edc77f]"
//                 : "border-[#c89438]/30 bg-[#c89438]/10 text-[#936b2e]"
//             }`}
//           >
//             {currentItem.eyebrow}
//           </span>

//           {/* Title */}
//           <h2
//             className={`max-w-[620px] text-balance text-[27px] font-extrabold leading-[1.2] tracking-tight sm:text-4xl lg:text-[40px] xl:text-[46px] ${
//               isEditorial ? "font-serif" : "font-sans"
//             }`}
//           >
//             {title}
//           </h2>

//           {/* Subtitle */}
//           {subtitle && (
//             <p
//               className={`mt-3 text-sm font-semibold sm:text-base lg:text-lg ${
//                 isDark ? "text-[#e5bd76]" : "text-[#a0793c]"
//               }`}
//             >
//               {subtitle}
//             </p>
//           )}

//           {/* Description */}
//           {description && (
//             <p
//               className={`mt-3 max-w-[480px] text-xs leading-6 sm:text-sm sm:leading-7 lg:mt-4 ${
//                 isDark ? "text-white/75" : "text-[#536477]"
//               }`}
//             >
//               {description}
//             </p>
//           )}

//           {/* Price */}
//           {currentItem.price !== undefined && (
//             <div className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
//               {currentItem.badge && (
//                 <span className="rounded-full bg-[#c89438] px-3 py-1 text-[10px] font-bold text-white">
//                   {currentItem.badge}
//                 </span>
//               )}

//               <span className="text-xl font-extrabold sm:text-2xl">
//                 {currentItem.currency || "AED"} {currentItem.price}
//               </span>

//               {currentItem.oldPrice !== undefined && (
//                 <span className="text-sm text-current/50 line-through">
//                   {currentItem.currency || "AED"} {currentItem.oldPrice}
//                 </span>
//               )}
//             </div>
//           )}

//           {/* CTA */}
//           <div className="mt-5 flex w-full justify-center lg:justify-start">
//             <Link
//               href={currentItem.buttonLink}
//               className={`group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg px-6 py-3 text-xs font-bold shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcae57] focus-visible:ring-offset-2 sm:px-7 sm:text-sm ${
//                 isDark
//                   ? "bg-[#dcae57] text-[#061a37] hover:bg-[#edc477]"
//                   : "bg-[#102d4d] text-white hover:bg-[#1b426b]"
//               }`}
//             >
//               {buttonText}
//               <span className="text-base transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
//                 {isArabic ? "←" : "→"}
//               </span>
//             </Link>
//           </div>
//         </div>

//         {/* Book artwork */}
//         <div className="relative z-10 flex min-h-0 items-center justify-center px-6 pb-9 pt-0 lg:px-5 lg:py-8">
//           <div className="pointer-events-none absolute inset-x-[12%] inset-y-[12%] rounded-full bg-white/20 blur-3xl" />

//           <div className="relative flex h-full w-full items-center justify-center">
//             {isPublisher || isArabicCollection
//               ? renderBookImages()
//               : renderSingleImage()}

//             {isEditorial && currentItem.badge && (
//               <span className="absolute right-[10%] top-[5%] rotate-6 rounded-full bg-[#c89438] px-3 py-2 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-lg sm:px-4 sm:text-xs lg:right-[12%] lg:top-[10%]">
//                 {currentItem.badge}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Navigation arrows */}
//       {items.length > 1 && (
//         <>
//           <button
//             type="button"
//             onClick={previous}
//             aria-label={isArabic ? "الشريحة السابقة" : "Previous banner"}
//             className="absolute left-2 top-[48%] z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg text-[#061a37] shadow-lg backdrop-blur transition hover:scale-110 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] sm:left-4 sm:h-10 sm:w-10 lg:left-5"
//           >
//             {isArabic ? "›" : "‹"}
//           </button>

//           <button
//             type="button"
//             onClick={next}
//             aria-label={isArabic ? "الشريحة التالية" : "Next banner"}
//             className="absolute right-2 top-[48%] z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg text-[#061a37] shadow-lg backdrop-blur transition hover:scale-110 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] sm:right-4 sm:h-10 sm:w-10 lg:right-5"
//           >
//             {isArabic ? "‹" : "›"}
//           </button>

//           {/* Slide indicators */}
//           <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/30 bg-white/70 px-3 py-2 shadow-sm backdrop-blur-md sm:bottom-4">
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
//                 aria-current={currentIndex === index ? "true" : undefined}
//                 className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] ${
//                   currentIndex === index
//                     ? "w-7 bg-[#c89438]"
//                     : "w-1.5 bg-[#061a37]/30 hover:bg-[#c89438]/70"
//                 }`}
//               />
//             ))}
//           </div>
//         </>
//       )}
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

const themes: Record<
  string,
  {
    background: string;
    foreground: string;
    muted: string;
    accent: string;
    button: string;
  }
> = {
  publisher: {
    background: "bg-[#edf2f7]",
    foreground: "text-[#173653]",
    muted: "text-[#62758a]",
    accent: "bg-[#c4934d]",
    button: "bg-[#173653] text-white hover:bg-[#294d70]",
  },
  editorial: {
    background: "bg-[#f5f0e7]",
    foreground: "text-[#44382b]",
    muted: "text-[#796b5b]",
    accent: "bg-[#a98250]",
    button: "bg-[#51402e] text-white hover:bg-[#6b543c]",
  },
  "world-history": {
    background: "bg-[#f3ede2]",
    foreground: "text-[#493b2b]",
    muted: "text-[#796b5b]",
    accent: "bg-[#a98250]",
    button: "bg-[#51402e] text-white hover:bg-[#6b543c]",
  },
  arabic: {
    background: "bg-[#edf3ed]",
    foreground: "text-[#24483d]",
    muted: "text-[#65786b]",
    accent: "bg-[#78977e]",
    button: "bg-[#315b49] text-white hover:bg-[#426e5a]",
  },
  "arabic-books": {
    background: "bg-[#edf3ed]",
    foreground: "text-[#24483d]",
    muted: "text-[#65786b]",
    accent: "bg-[#78977e]",
    button: "bg-[#315b49] text-white hover:bg-[#426e5a]",
  },
  academic: {
    background: "bg-[#eef1f6]",
    foreground: "text-[#263d58]",
    muted: "text-[#65758a]",
    accent: "bg-[#8298b5]",
    button: "bg-[#304d6d] text-white hover:bg-[#416184]",
  },
  sociology: {
    background: "bg-[#eef1f6]",
    foreground: "text-[#263d58]",
    muted: "text-[#65758a]",
    accent: "bg-[#8298b5]",
    button: "bg-[#304d6d] text-white hover:bg-[#416184]",
  },
  corporate: {
    background: "bg-[#f1f0eb]",
    foreground: "text-[#344354]",
    muted: "text-[#66717c]",
    accent: "bg-[#a99b80]",
    button: "bg-[#354a5f] text-white hover:bg-[#49627a]",
  },
};

const defaultTheme = {
  background: "bg-[#f1f3f5]",
  foreground: "text-[#253a50]",
  muted: "text-[#627184]",
  accent: "bg-[#c89438]",
  button: "bg-[#263f5a] text-white hover:bg-[#385673]",
};

export default function BannerCarousel({
  items,
}: BannerCarouselProps) {
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
    [items.length]
  );

  const next = useCallback(
    () => goTo(currentIndex + 1),
    [currentIndex, goTo]
  );

  const previous = useCallback(
    () => goTo(currentIndex - 1),
    [currentIndex, goTo]
  );

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;

    const timer = window.setInterval(next, 6500);

    return () => window.clearInterval(timer);
  }, [items.length, isPaused, next]);

  if (!currentItem) return null;

  const variant = currentItem.variant;
  const theme = themes[variant] || defaultTheme;

  const isPublisher = variant === "publisher";

  const isEditorial = [
    "editorial",
    "world-history",
  ].includes(variant);

  const isArabicCollection = [
    "arabic",
    "arabic-books",
  ].includes(variant);

  const isAcademic = [
    "academic",
    "sociology",
  ].includes(variant);

  const isCorporate = variant === "corporate";

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

  const images =
    currentItem.extraImages?.filter(Boolean).slice(0, 3) || [];

  const displayImages = images.length
    ? images
    : [currentItem.imageUrl];

  const handleTouchEnd = (
    event: TouchEvent<HTMLElement>
  ) => {
    if (touchStart.current === null) return;

    const end =
      event.changedTouches[0]?.clientX ??
      touchStart.current;

    const difference = touchStart.current - end;

    if (Math.abs(difference) > 45) {
      if (isArabic ? difference < 0 : difference > 0) {
        next();
      } else {
        previous();
      }
    }

    touchStart.current = null;
  };

  // Shared banner text
  const Copy = ({
    centered = false,
  }: {
    centered?: boolean;
  }) => (
    <div
      className={`banner-copy relative z-10 flex min-w-0 flex-col ${
        centered
          ? "items-center text-center"
          : "items-center text-center lg:items-start lg:text-start"
      }`}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-full border border-current/15 bg-white/65 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] sm:text-[10px] ${theme.foreground}`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${theme.accent}`}
        />
        {eyebrow}
      </span>

      <h2
        className={`mt-3 max-w-[590px] text-balance font-bold leading-[1.16] tracking-tight ${theme.foreground} ${
          isEditorial
            ? "font-serif text-[29px] sm:text-4xl lg:text-[43px]"
            : "text-[27px] sm:text-4xl lg:text-[42px]"
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-2 text-sm font-semibold sm:text-base ${theme.muted}`}
        >
          {subtitle}
        </p>
      )}

      {description && (
        <p
          className={`mt-3 max-w-[440px] text-xs leading-6 sm:text-sm sm:leading-7 ${theme.muted}`}
        >
          {description}
        </p>
      )}

      {currentItem.price !== undefined && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          {badge && (
            <span className="rounded-full bg-[#c89438] px-3 py-1 text-[10px] font-bold text-white">
              {badge}
            </span>
          )}

          <span className={`text-xl font-extrabold ${theme.foreground}`}>
            {currentItem.currency || "AED"} {currentItem.price}
          </span>

          {currentItem.oldPrice !== undefined && (
            <span className={`text-sm line-through ${theme.muted}`}>
              {currentItem.currency || "AED"} {currentItem.oldPrice}
            </span>
          )}
        </div>
      )}

      <Link
        href={currentItem.buttonLink}
        className={`banner-button group mt-5 inline-flex min-h-11 items-center justify-center gap-3 rounded-lg px-6 py-3 text-xs font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] focus-visible:ring-offset-2 sm:text-sm ${theme.button}`}
      >
        {buttonText}

        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
        >
          {isArabic ? "←" : "→"}
        </span>
      </Link>
    </div>
  );

  // Optimized book image
  const Book = ({
    src,
    alt,
    className = "",
    priority = false,
  }: {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
  }) => (
    <div className={`banner-book relative shrink-0 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 115px, (max-width: 1024px) 170px, 220px"
        className="object-contain drop-shadow-[0_14px_16px_rgba(20,35,50,0.2)]"
      />
    </div>
  );

  // Multiple book composition
  const BookGroup = ({
    framed = false,
  }: {
    framed?: boolean;
  }) => (
    <div
      className={`relative flex h-full w-full items-center justify-center ${
        framed
          ? "rounded-2xl border border-white/70 bg-white/50"
          : ""
      }`}
    >
      {displayImages.map((src, index) => (
        <Book
          key={`${src}-${index}`}
          src={src}
          alt={`${title} ${index + 1}`}
          priority={currentIndex === 0}
          className={`h-[145px] w-[100px] sm:h-[190px] sm:w-[130px] lg:h-[245px] lg:w-[165px] ${
            displayImages.length === 1
              ? ""
              : index === 1
                ? "relative z-10 -translate-y-3"
                : index === 0
                  ? "-mr-5 -rotate-6 translate-y-2 sm:-mr-7"
                  : "-ml-5 rotate-6 translate-y-2 sm:-ml-7"
          }`}
        />
      ))}
    </div>
  );

  // 1. Publisher layout
  const PublisherLayout = () => (
    <div className="relative grid h-full grid-rows-[1fr_190px] lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-1">
      <div className="flex items-center justify-center px-7 py-6 sm:px-12 lg:px-14 xl:px-16">
        <Copy />
      </div>

      <div className="relative flex items-center justify-center overflow-hidden bg-white/35 px-5 py-4">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border-[28px] border-white/50" />

        <div className="relative h-full w-full max-w-[440px]">
          <BookGroup />
        </div>

        <span className="pointer-events-none absolute bottom-5 left-1/2 h-8 w-2/3 -translate-x-1/2 rounded-full bg-[#173653]/10 blur-xl" />
      </div>
    </div>
  );

  // 2. Editorial layout
  const EditorialLayout = () => (
    <div className="relative grid h-full grid-rows-[1fr_185px] overflow-hidden px-6 sm:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-1">
      <div className="pointer-events-none absolute inset-4 rounded-xl border border-[#bda982]/40 sm:inset-6" />

      <div className="relative z-10 flex items-center justify-center py-6 lg:py-8">
        <Copy />
      </div>

      <div className="relative flex items-center justify-center">
        <div className="absolute bottom-8 h-20 w-[70%] rounded-full bg-white/70 blur-2xl" />

        <Book
          src={currentItem.imageUrl}
          alt={title}
          priority={currentIndex === 0}
          className="relative z-10 h-[165px] w-[125px] sm:h-[205px] sm:w-[155px] lg:h-[285px] lg:w-[210px]"
        />

        {badge && (
          <span className="absolute right-[12%] top-5 z-20 rounded-full bg-[#a98250] px-3 py-2 text-[9px] font-bold text-white sm:text-xs">
            {badge}
          </span>
        )}
      </div>
    </div>
  );

  // 3. Arabic collection layout
  const ArabicLayout = () => (
    <div className="relative grid h-full grid-rows-[1fr_175px] overflow-hidden px-6 sm:px-12 lg:grid-cols-[1fr_1fr] lg:grid-rows-1">
      <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-[#9eb6a2]/50" />

      <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-[#9eb6a2]/40" />

      <div className="relative z-10 flex items-center justify-center py-6">
        <Copy centered />
      </div>

      <div className="relative flex items-center justify-center pb-3 lg:pb-0">
        <div className="relative h-full w-full max-w-[420px]">
          <BookGroup />
        </div>
      </div>
    </div>
  );

  // 4. Academic layout
  const AcademicLayout = () => (
    <div className="relative grid h-full grid-rows-[1fr_185px] lg:grid-cols-[1.1fr_0.9fr] lg:grid-rows-1">
      <div className="flex items-center justify-center px-7 py-6 sm:px-12 lg:px-14">
        <Copy />
      </div>

      <div className="relative flex items-center justify-center px-6 py-5">
        <div className="relative flex h-full w-full max-w-[350px] items-center justify-center rounded-2xl border border-[#d4dce7] bg-white/60 shadow-sm lg:max-h-[330px]">
          <div className="absolute left-4 top-4 h-7 w-7 border-l border-t border-[#a8b9cd]" />

          <div className="absolute bottom-4 right-4 h-7 w-7 border-b border-r border-[#a8b9cd]" />

          <Book
            src={currentItem.imageUrl}
            alt={title}
            priority={currentIndex === 0}
            className="h-[150px] w-[115px] sm:h-[185px] sm:w-[140px] lg:h-[245px] lg:w-[185px]"
          />

          {badge && (
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#8298b5] px-3 py-1.5 text-[9px] font-bold text-white">
              {badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  // 5. Corporate layout
  const CorporateLayout = () => (
    <div className="relative grid h-full grid-rows-[190px_1fr] overflow-hidden px-6 py-5 sm:grid-rows-[220px_1fr] sm:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-1 lg:items-center">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[58%] bg-white/45 lg:inset-y-0 lg:left-0 lg:h-full lg:w-[48%]" />

      <div className="relative z-10 flex items-center justify-center">
        <Book
          src={currentItem.imageUrl}
          alt={title}
          priority={currentIndex === 0}
          className="h-[165px] w-[125px] sm:h-[195px] sm:w-[150px] lg:h-[285px] lg:w-[210px]"
        />
      </div>

      <div className="relative z-10 flex items-center justify-center py-2 lg:px-8">
        <div className="w-full max-w-[620px] rounded-xl border border-white/80 bg-white/75 px-5 py-5 shadow-sm backdrop-blur-md sm:px-8 sm:py-7">
          <Copy centered />
        </div>
      </div>
    </div>
  );

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      aria-label={
        isArabic
          ? "الكتب والمجموعات المميزة"
          : "Featured books and collections"
      }
      aria-roledescription="carousel"
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget as Node | null
          )
        ) {
          setIsPaused(false);
        }
      }}
      onTouchStart={(event) => {
        touchStart.current =
          event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={handleTouchEnd}
    >
      <div
        key={currentItem.id}
        className={`banner-slide relative isolate h-[510px] overflow-hidden rounded-2xl border border-black/[0.045] sm:h-[490px] lg:h-[410px] lg:rounded-3xl ${theme.background}`}
        aria-live="polite"
      >
        {isPublisher ? (
          <PublisherLayout />
        ) : isEditorial ? (
          <EditorialLayout />
        ) : isArabicCollection ? (
          <ArabicLayout />
        ) : isAcademic ? (
          <AcademicLayout />
        ) : isCorporate ? (
          <CorporateLayout />
        ) : (
          <PublisherLayout />
        )}

        {badge &&
          !isEditorial &&
          !isAcademic &&
          currentItem.price === undefined && (
            <span
              className={`pointer-events-none absolute top-4 z-20 rounded-full px-3 py-1.5 text-[9px] font-bold text-white ${theme.accent} ${
                isArabic ? "left-4" : "right-4"
              }`}
            >
              {badge}
            </span>
          )}
      </div>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={previous}
            aria-label={
              isArabic ? "الشريحة السابقة" : "Previous banner"
            }
            className={`absolute top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-lg text-[#263f5a] shadow-md backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] sm:h-10 sm:w-10 ${
              isArabic
                ? "right-2 sm:right-4"
                : "left-2 sm:left-4"
            }`}
          >
            {isArabic ? "→" : "←"}
          </button>

          <button
            type="button"
            onClick={next}
            aria-label={
              isArabic ? "الشريحة التالية" : "Next banner"
            }
            className={`absolute top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-lg text-[#263f5a] shadow-md backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] sm:h-10 sm:w-10 ${
              isArabic
                ? "left-2 sm:left-4"
                : "right-2 sm:right-4"
            }`}
          >
            {isArabic ? "←" : "→"}
          </button>

          <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-2 shadow-sm backdrop-blur sm:bottom-4">
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
                aria-current={
                  currentIndex === index ? "true" : undefined
                }
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] ${
                  currentIndex === index
                    ? "w-7 bg-[#b88a43]"
                    : "w-1.5 bg-[#263f5a]/25 hover:bg-[#b88a43]/70"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        .banner-slide {
          animation: slide-enter 550ms
            cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        .banner-copy {
          animation: copy-enter 650ms 80ms
            cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        .banner-book {
          animation: book-enter 700ms 100ms
            cubic-bezier(0.2, 0.7, 0.2, 1) both;
          transition: transform 350ms ease;
        }

        .banner-book:hover {
          transform: translateY(-5px);
        }

        .banner-button {
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            background-color 220ms ease;
        }

        @keyframes slide-enter {
          from {
            opacity: 0.65;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes copy-enter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes book-enter {
          from {
            opacity: 0;
            transform: translateY(13px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .banner-slide,
          .banner-copy,
          .banner-book {
            animation: none !important;
          }

          .banner-book,
          .banner-button {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
