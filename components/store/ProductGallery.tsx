
// "use client";

// import Image from "next/image";
// import { useMemo, useState } from "react";
// import { BookOpen, Images } from "lucide-react";
// import { ProductImageMagnifier } from "@/components/store/ProductImageMagnifier";

// type ProductGalleryProps = {
//   title: string;
//   cover?: string | null;
//   images?: (string | null | undefined)[];
// };

// export function ProductGallery({
//   title,
//   cover,
//   images = [],
// }: ProductGalleryProps) {
//   const gallery = useMemo(
//     () =>
//       [...new Set([cover, ...images].filter(
//         (src): src is string =>
//           typeof src === "string" && src.trim().length > 0,
//       ))],
//     [cover, images],
//   );

//   const [selected, setSelected] = useState(gallery[0] ?? "");

//   // Keep the selected image valid if the product changes.
//   const activeImage = gallery.includes(selected)
//     ? selected
//     : gallery[0] ?? "";

//   return (
//     <div className="min-w-0">
//       <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm sm:min-h-[500px] sm:p-10">
//         {gallery.length > 1 && (
//           <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#f1f5f9] px-3 py-1.5 text-xs font-medium text-ubh-blue-muted">
//             <Images size={14} />
//             {gallery.length} images
//           </span>
//         )}

//         {activeImage ? (
//           <div className="relative h-[340px] w-full sm:h-[430px]">
//             <ProductImageMagnifier
//               key={activeImage}
//               src={activeImage}
//               alt={title}
//                priority
//             />
//           </div>
//         ) : (
//           <div className="flex flex-col items-center text-ubh-muted-light">
//             <BookOpen size={54} strokeWidth={1.2} />
//             <p className="mt-3 text-sm">Book cover unavailable</p>
//           </div>
//         )}
//       </div>

//       {gallery.length > 1 && (
//         <div
//           className="mt-4 flex gap-3 overflow-x-auto pb-2"
//           aria-label="Book images"
//         >
//           {gallery.map((src, index) => {
//             const active = src === activeImage;

//             return (
//               <button
//                 key={src}
//                 type="button"
//                 onClick={() => setSelected(src)}
//                 aria-label={`View image ${index + 1}`}
//                 aria-pressed={active}
//                 className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white p-1 transition ${
//                   active
//                     ? "border-ubh-gold ring-2 ring-ubh-gold/15"
//                     : "border-[#e2e8f0] hover:border-[#94a3b8]"
//                 }`}
//               >
//                 <Image
//                   src={src}
//                   alt={`${title} image ${index + 1}`}
//                   fill
//                   sizes="64px"
//                   className="object-contain p-1"
//                 />
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, Images } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { ProductImageMagnifier } from "@/components/store/ProductImageMagnifier";

type ProductGalleryProps = {
  title: string;
  cover?: string | null;
  images?: (string | null | undefined)[];
  locale?: Locale;
};

export function ProductGallery({
  title,
  cover,
  images = [],
  locale = "en",
}: ProductGalleryProps) {
  const isArabic = locale === "ar";

  const gallery = useMemo(
    () =>
      [...new Set([cover, ...images].filter(
        (src): src is string => typeof src === "string" && src.trim().length > 0,
      ))],
    [cover, images],
  );

  const [selected, setSelected] = useState(gallery[0] ?? "");

  useEffect(() => {
    setSelected((current) =>
      gallery.includes(current) ? current : gallery[0] ?? "",
    );
  }, [gallery]);

  const activeImage = gallery.includes(selected) ? selected : gallery[0] ?? "";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      aria-label={isArabic ? "صور الكتاب" : "Book images"}
      className="mx-auto w-full min-w-0 max-w-[320px] sm:max-w-[340px]"
    >
      <div className="relative">
        {gallery.length > 1 && (
          <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/95 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 shadow-sm backdrop-blur">
            <Images size={13} aria-hidden="true" />
            {isArabic
              ? `${new Intl.NumberFormat("ar").format(gallery.length)} ${
                  gallery.length === 1
                    ? "صورة"
                    : gallery.length === 2
                      ? "صورتان"
                      : "صور"
                }`
              : `${gallery.length} ${gallery.length === 1 ? "image" : "images"}`}
          </span>
        )}

        {activeImage ? (
          <ProductImageMagnifier
            key={activeImage}
            src={activeImage}
            alt={title}
            priority
            locale={locale}
          />
        ) : (
          <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-slate-400">
            <BookOpen size={36} strokeWidth={1.4} aria-hidden="true" />
            <p className="mt-3 text-sm">
              {isArabic ? "صورة الغلاف غير متوفرة" : "Book cover unavailable"}
            </p>
          </div>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="mt-3">
          <p className="mb-2 text-xs font-medium text-slate-500">
            {isArabic ? "صور الكتاب" : "Book images"}
          </p>

          <div
            className="flex items-center gap-2 overflow-x-auto pb-1"
            dir={isArabic ? "rtl" : "ltr"}
            aria-label={isArabic ? "اختر صورة الكتاب" : "Choose a book image"}
          >
            {gallery.map((src, index) => {
              const active = src === activeImage;

              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setSelected(src)}
                  aria-label={
                    isArabic ? `عرض الصورة ${index + 1}` : `View image ${index + 1}`
                  }
                  aria-pressed={active}
                  className={[
                    "relative h-[58px] w-[46px] shrink-0 overflow-hidden rounded-lg border bg-white p-0.5",
                    "transition-[border-color,box-shadow] duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2",
                    active
                      ? "border-ubh-gold shadow-[0_0_0_1px_rgba(200,148,56,0.2)]"
                      : "border-slate-200 hover:border-slate-400",
                  ].join(" ")}
                >
                  <Image
                    src={src}
                    alt={
                      isArabic
                        ? `${title} - الصورة ${index + 1}`
                        : `${title} image ${index + 1}`
                    }
                    fill
                    sizes="46px"
                    loading="lazy"
                    className="object-contain p-0.5"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
