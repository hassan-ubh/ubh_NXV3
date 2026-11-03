"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, Check, Heart, ShoppingCart } from "lucide-react";

import { useCart } from "@/components/store/CartProvider";
import type { Locale } from "@/lib/i18n";
import type { Product } from "@/data/products";

type CatalogProduct = Product & {
  titleAr?: string;
  authorsAr?: string[];
  productType?: "ebook" | "textbook" | "physical";
  series?: string;
};

type ProductCardProps = {
  product: Product;
  locale: Locale;
  viewMode?: "grid" | "list";
};

const copy = {
  en: {
    noCover: "No Image Found",
    bestseller: "Best seller",
    newArrival: "New",
    sale: "Offer",
    stock: "In stock",
    out: "Out of stock",
    view: "View book",
    add: "Add to cart",
    added: "Added to cart",
    addFailed: "Unable to add this item. Please check availability.",
    wishlist: "Add to wishlist",
  },
  ar: {
    noCover: "لا صور",
    bestseller: "الأكثر مبيعًا",
    newArrival: "جديد",
    sale: "عرض",
    stock: "متوفر",
    out: "غير متوفر",
    view: "عرض الكتاب",
    add: "أضف إلى السلة",
    added: "أُضيف إلى السلة",
    addFailed: "تعذرت إضافة الكتاب. يرجى التحقق من توفره.",
    wishlist: "أضف إلى قائمة الأمنيات",
  },
} as const;
function BookCover({
  product,
  title,
  labels,
  viewMode,
}: {
  product: Product;
  title: string;
  labels: typeof copy.en | typeof copy.ar;
  viewMode: "grid" | "list";
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasCover = Boolean(product.cover) && !imageFailed;

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[#f3f5f7] ${
        viewMode === "list"
          ? "h-32 w-24 shrink-0 p-1.5 sm:h-36 sm:w-28"
          : "aspect-[3/4] w-full p-3 sm:p-4"
      }`}
    >
      {hasCover ? (
        <Image
          src={product.cover!}
          alt={title}
          fill
          sizes={
            viewMode === "list"
              ? "(max-width: 639px) 96px, 112px"
              : "(max-width: 639px) 50vw, 25vw"
          }
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="object-contain p-1 transition-transform duration-300 group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300/80 bg-white/70 px-2 text-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#b8893e] shadow-sm">
            <BookOpen size={20} strokeWidth={1.35} aria-hidden="true" />
          </span>
          <span className="text-[11px] leading-4 text-slate-500">
            {labels.noCover}
          </span>
        </div>
      )}
    </div>
  );
}

// export function ProductCard({
//   product,
//   locale,
//   viewMode = "grid",
// }: ProductCardProps) {
//   const ar = locale === "ar";
//   const labels = copy[ar ? "ar" : "en"];
//   const item = product as CatalogProduct;
//   const title = ar && item.titleAr ? item.titleAr : product.title;
//   const authors =
//     ar && item.authorsAr?.length ? item.authorsAr : (product.authors ?? []);
//   const { addToCart } = useCart();
//   const [added, setAdded] = useState(false);
//   const [addError, setAddError] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   useEffect(() => {
//     function readWishlist() {
//       try {
//         const saved = JSON.parse(
//           window.localStorage.getItem("ubh-wishlist") || "[]",
//         ) as string[];
//         setIsWishlisted(saved.includes(product.id));
//       } catch {
//         setIsWishlisted(false);
//       }
//     }
//     readWishlist();
//     window.addEventListener("ubh-wishlist-updated", readWishlist);
//     window.addEventListener("storage", readWishlist);
//     return () => {
//       window.removeEventListener("ubh-wishlist-updated", readWishlist);
//       window.removeEventListener("storage", readWishlist);
//     };
//   }, [product.id]);
//   const href = `/${locale}/shop/${product.slug}`;
//   const hasSale =
//     typeof product.oldPrice === "number" && product.oldPrice > product.price;
//   const available = product.stock > 0;

//   function handleAddToCart() {
//     setAddError(false);
//     const success = addToCart(product, 1);
//     setAdded(success);
//     setAddError(!success);
//   }

//   return (
//     <article
//       className={`group flex min-w-0 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_1px_2px_rgba(6,26,55,0.025)] transition duration-200 hover:border-ubh-gold/45 hover:shadow-[0_10px_28px_rgba(6,26,55,0.08)] motion-reduce:transform-none motion-reduce:transition-none ${
//         viewMode === "list"
//           ? "flex-row items-start gap-3 sm:gap-4 sm:p-4"
//           : "flex-col sm:p-3"
//       }`}
//     >
//       <div className="relative">
//         <Link
//           href={href}
//           aria-label={`${labels.view}: ${title}`}
//           className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2"
//         >
//           <BookCover
//             product={product}
//             title={title}
//             labels={labels}
//             viewMode={viewMode}
//           />
//         </Link>

//         {(product.bestseller || product.newArrival || hasSale) && (
//           <div
//             className={`pointer-events-none absolute top-2 flex max-w-[85%] flex-wrap gap-1 ${ar ? "right-2" : "left-2"}`}
//           >
//             {product.bestseller && (
//               <span className="rounded-full bg-ubh-navy px-2 py-1 text-[9px] font-semibold leading-none text-white shadow-sm">
//                 {labels.bestseller}
//               </span>
//             )}
//             {!product.bestseller && product.newArrival && (
//               <span className="rounded-full bg-ubh-gold px-2 py-1 text-[9px] font-semibold leading-none text-white shadow-sm">
//                 {labels.newArrival}
//               </span>
//             )}
//             {hasSale && (
//               <span className="rounded-full bg-white px-2 py-1 text-[9px] font-bold leading-none text-rose-700 shadow-sm">
//                 {labels.sale}
//               </span>
//             )}
//           </div>
//         )}
//         <button
//           type="button"
//           aria-label={labels.wishlist}
//           title={labels.wishlist}
//           aria-pressed={isWishlisted}
//           onClick={() => {
//             try {
//               const saved = JSON.parse(
//                 window.localStorage.getItem("ubh-wishlist") || "[]",
//               ) as string[];
//               const next = saved.includes(product.id)
//                 ? saved.filter((id) => id !== product.id)
//                 : [...saved, product.id];
//               window.localStorage.setItem("ubh-wishlist", JSON.stringify(next));
//               setIsWishlisted(next.includes(product.id));
//               window.dispatchEvent(new Event("ubh-wishlist-updated"));
//             } catch {
//               setIsWishlisted(false);
//             }
//           }}
//           className={`absolute top-2 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 shadow-sm backdrop-blur transition hover:border-ubh-gold hover:text-ubh-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold ${isWishlisted ? "text-rose-600" : "text-slate-500"} ${ar ? "left-2" : "right-2"}`}
//         >
//           <Heart
//             size={15}
//             strokeWidth={1.8}
//             fill={isWishlisted ? "currentColor" : "none"}
//             aria-hidden="true"
//           />
//         </button>
//       </div>

//       <div className="flex flex-1 flex-col px-0.5 pb-0.5 pt-3">
//         <Link
//           href={href}
//           className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold"
//         >
//           <h2 className="min-h-[2.75rem] line-clamp-2 text-[13px] font-semibold leading-[1.4rem] text-ubh-navy transition-colors group-hover:text-[#9a6c20] sm:text-sm">
//             {title}
//           </h2>
//         </Link>

//         <p className="mt-1.5 min-h-4 truncate text-[11px] leading-4 text-slate-500 sm:text-xs">
//           {authors.length ? authors.slice(0, 2).join(", ") : product.publisher}
//         </p>
//         <p className="mt-1 truncate text-[10px] leading-4 text-slate-400 sm:text-[11px]">
//           {product.publisher}
//         </p>

//         <div className="mt-auto pt-3">
//           <div className="flex min-h-6 flex-wrap items-baseline gap-x-2 gap-y-0.5">
//             <span className="text-sm font-bold tracking-tight text-ubh-navy sm:text-[15px]">
//               {product.currency} {product.price.toFixed(2)}
//             </span>
//             {hasSale && (
//               <del className="text-[11px] text-slate-400">
//                 {product.currency} {product.oldPrice!.toFixed(2)}
//               </del>
//             )}
//           </div>
//           <p
//             className={`mt-1.5 flex items-center gap-1.5 text-[10px] font-medium ${available ? "text-emerald-700" : "text-rose-600"}`}
//           >
//             <span
//               className={`h-1.5 w-1.5 shrink-0 rounded-full ${available ? "bg-emerald-600" : "bg-rose-500"}`}
//               aria-hidden="true"
//             />
//             {available ? labels.stock : labels.out}
//           </p>

//           <button
//             type="button"
//             disabled={!available}
//             onClick={handleAddToCart}
//             className={`mt-3 inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-ubh-navy px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0a2a55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 ${
//               viewMode === "list"
//                 ? "w-fit min-w-32 self-start sm:min-w-36"
//                 : "w-full sm:min-h-10"
//             }`}
//           >
//             {added ? (
//               <Check size={14} aria-hidden="true" />
//             ) : (
//               <ShoppingCart size={14} aria-hidden="true" />
//             )}

//             <span className="truncate">
//               {added ? labels.added : labels.add}
//             </span>
//           </button>
//           {addError && (
//             <p
//               role="status"
//               className="mt-2 text-[10px] leading-4 text-rose-600"
//             >
//               {labels.addFailed}
//             </p>
//           )}
//         </div>
//       </div>
//     </article>
//   );
// }


export function ProductCard({
  product,
  locale,
  viewMode = "grid",
}: ProductCardProps) {
  const ar = locale === "ar";
  const labels = copy[ar ? "ar" : "en"];
  const item = product as CatalogProduct;

  const title = ar && item.titleAr ? item.titleAr : product.title;
  const authors =
    ar && item.authorsAr?.length ? item.authorsAr : (product.authors ?? []);

  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);
  const [addError, setAddError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    try {
      const saved = JSON.parse(
        window.localStorage.getItem("ubh-wishlist") || "[]",
      ) as string[];

      const next = saved.includes(product.id)
        ? saved.filter((id) => id !== product.id)
        : [...saved, product.id];

      window.localStorage.setItem("ubh-wishlist", JSON.stringify(next));
      setIsWishlisted(next.includes(product.id));
      window.dispatchEvent(new Event("ubh-wishlist-updated"));
    } catch {
      setIsWishlisted((current) => !current);
    }
  };

  useEffect(() => {
    function readWishlist() {
      try {
        const saved = JSON.parse(
          window.localStorage.getItem("ubh-wishlist") || "[]",
        ) as string[];

        setIsWishlisted(saved.includes(product.id));
      } catch {
        setIsWishlisted(false);
      }
    }

    readWishlist();

    window.addEventListener("ubh-wishlist-updated", readWishlist);
    window.addEventListener("storage", readWishlist);

    return () => {
      window.removeEventListener("ubh-wishlist-updated", readWishlist);
      window.removeEventListener("storage", readWishlist);
    };
  }, [product.id]);

  const href = `/${locale}/shop/${product.slug}`;

  const hasSale =
    typeof product.oldPrice === "number" &&
    product.oldPrice > product.price;

  const available = product.stock > 0;

  function handleAddToCart() {
    setAddError(false);

    const success = addToCart(product, 1);

    setAdded(success);
    setAddError(!success);
  }

  return (
    <article
      dir={ar ? "rtl" : "ltr"}
      className={`group relative flex h-full min-w-0 rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:border-[#c89438]/50 hover:shadow-[0_10px_28px_rgba(6,26,55,0.08)] motion-reduce:transition-none ${
        viewMode === "list"
          ? "flex-row items-stretch gap-3 p-3 sm:gap-5 sm:p-4 lg:gap-6"
          : "flex-col p-2.5 sm:p-3"
      }`}
    >
      {/* Book cover */}
      <div
        className={`relative shrink-0 ${
          viewMode === "list"
            ? "w-[88px] sm:w-32 lg:w-36"
            : "w-full"
        }`}
      >
        <Link
          href={href}
          aria-label={`${labels.view}: ${title}`}
          className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] focus-visible:ring-offset-2"
        >
          <BookCover
            product={product}
            title={title}
            labels={labels}
            viewMode={viewMode}
          />
        </Link>

        {/* Product badges */}
        {(product.bestseller || product.newArrival || hasSale) && (
          <div
            className={`pointer-events-none absolute top-2 flex max-w-[90%] flex-wrap gap-1 ${
              ar ? "right-2" : "left-2"
            }`}
          >
            {product.bestseller && (
              <span className="rounded-full bg-[#061a37] px-2 py-1 text-[9px] font-semibold leading-none text-white shadow-sm">
                {labels.bestseller}
              </span>
            )}

            {!product.bestseller && product.newArrival && (
              <span className="rounded-full bg-[#c89438] px-2 py-1 text-[9px] font-semibold leading-none text-white shadow-sm">
                {labels.newArrival}
              </span>
            )}

            {hasSale && (
              <span className="rounded-full bg-white px-2 py-1 text-[9px] font-bold leading-none text-rose-700 shadow-sm">
                {labels.sale}
              </span>
            )}
          </div>
        )}

        {/* Grid wishlist */}
        {viewMode === "grid" && (
          <button
            type="button"
            aria-label={labels.wishlist}
            title={labels.wishlist}
            aria-pressed={isWishlisted}
            onClick={toggleWishlist}
            className={`absolute end-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 shadow-sm transition hover:border-[#c89438] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] ${
              isWishlisted
                ? "text-rose-600"
                : "text-slate-500 hover:text-[#9a6c20]"
            }`}
          >
            <Heart
              size={16}
              strokeWidth={1.8}
              fill={isWishlisted ? "currentColor" : "none"}
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      {/* Product information */}
      <div
        className={`flex min-w-0 flex-1 ${
          viewMode === "list"
            ? "flex-col justify-between gap-3 py-0.5"
            : "flex-col pt-3"
        }`}
      >
        {/* Title and information */}
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={href}
              className="min-w-0 flex-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438]"
            >
              <h2
                className={`line-clamp-2 font-semibold leading-5 text-[#061a37] transition-colors group-hover:text-[#9a6c20] ${
                  viewMode === "list"
                    ? "text-sm sm:text-base sm:leading-6"
                    : "min-h-10 text-[13px] sm:text-sm"
                }`}
              >
                {title}
              </h2>
            </Link>

            {/* List wishlist */}
            {viewMode === "list" && (
              <button
                type="button"
                aria-label={labels.wishlist}
                title={labels.wishlist}
                aria-pressed={isWishlisted}
                onClick={toggleWishlist}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:border-[#c89438] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] ${
                  isWishlisted
                    ? "text-rose-600"
                    : "text-slate-500 hover:text-[#9a6c20]"
                }`}
              >
                <Heart
                  size={17}
                  strokeWidth={1.8}
                  fill={isWishlisted ? "currentColor" : "none"}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>

          {/* Authors */}
          <p className="mt-1.5 line-clamp-1 text-xs leading-5 text-slate-500">
            {authors.length
              ? authors.slice(0, 2).join(", ")
              : product.publisher}
          </p>

          {/* Publisher */}
          <p className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-slate-400">
            {product.publisher}
          </p>

          {/* Book metadata */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {product.language && (
              <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-600">
                {product.language}
              </span>
            )}

            {product.format && (
              <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-600">
                {product.format}
              </span>
            )}
          </div>
        </div>

        {/* Product footer */}
        {viewMode === "list" ? (
          /* LIST VIEW */
          <div className="flex min-w-0 flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p
                className={`flex items-center gap-1.5 text-[11px] font-medium ${
                  available ? "text-emerald-700" : "text-rose-600"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    available ? "bg-emerald-600" : "bg-rose-500"
                  }`}
                  aria-hidden="true"
                />
                {available ? labels.stock : labels.out}
              </p>

              <button
                type="button"
                disabled={!available}
                onClick={handleAddToCart}
                className="mt-2 inline-flex min-h-9 w-fit items-center justify-center gap-2 rounded-lg bg-[#061a37] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#0a2a55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
              >
                {added ? (
                  <Check size={14} aria-hidden="true" />
                ) : (
                  <ShoppingCart size={14} aria-hidden="true" />
                )}
                {added ? labels.added : labels.add}
              </button>
            </div>

            <div className="shrink-0 sm:text-end">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-lg font-bold text-[#061a37] sm:text-xl">
                  {product.currency} {product.price.toFixed(2)}
                </span>

                {hasSale && (
                  <del className="text-xs text-slate-400">
                    {product.currency} {product.oldPrice!.toFixed(2)}
                  </del>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* GRID VIEW */
          <div className="mt-auto border-t border-slate-100 pt-3">
            {/* Availability */}
            <div className="flex items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-medium ${
                  available ? "text-emerald-700" : "text-rose-600"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    available ? "bg-emerald-600" : "bg-rose-500"
                  }`}
                  aria-hidden="true"
                />
                {available ? labels.stock : labels.out}
              </span>

              {hasSale && (
                <span className="rounded-md bg-rose-50 px-2 py-1 text-[9px] font-semibold text-rose-600">
                  {labels.sale}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mt-2.5 flex min-h-9 items-center">
              <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-xl font-bold tracking-tight text-[#061a37]">
                  {product.currency} {product.price.toFixed(2)}
                </span>

                {hasSale && (
                  <del className="text-xs text-slate-400">
                    {product.currency} {product.oldPrice!.toFixed(2)}
                  </del>
                )}
              </div>
            </div>

            {/* Full-width Add to Cart */}
            <button
              type="button"
              disabled={!available}
              onClick={handleAddToCart}
              className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#061a37] px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition duration-200 hover:bg-[#0a2a55] hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
            >
              {added ? (
                <Check size={15} aria-hidden="true" />
              ) : (
                <ShoppingCart size={15} aria-hidden="true" />
              )}
              <span>{added ? labels.added : labels.add}</span>
            </button>
          </div>
        )}

        {/* Add to Cart error */}
        {addError && (
          <p
            role="status"
            className="mt-2 text-[10px] leading-4 text-rose-600"
          >
            {labels.addFailed}
          </p>
        )}
      </div>
    </article>
  );
}
