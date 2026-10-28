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

function BookCover({ product, title, labels }: { product: Product; title: string; labels: typeof copy.en | typeof copy.ar }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasCover = Boolean(product.cover) && !imageFailed;

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#f3f5f7] p-3 sm:p-4">
      {hasCover ? (
        <Image
          src={product.cover!}
          alt={title}
          fill
          sizes="(max-width: 639px) 42vw, (max-width: 1023px) 27vw, (max-width: 1279px) 20vw, 17vw"
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="object-contain p-1 transition-transform duration-300 group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300/80 bg-gradient-to-b from-white/70 to-slate-100/70 px-2 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#b8893e] shadow-sm">
            <BookOpen size={22} strokeWidth={1.35} aria-hidden="true" />
          </span>
          <span className="text-[11px] leading-4 text-slate-500">{labels.noCover}</span>
        </div>
      )}
    </div>
  );
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const ar = locale === "ar";
  const labels = copy[ar ? "ar" : "en"];
  const item = product as CatalogProduct;
  const title = ar && item.titleAr ? item.titleAr : product.title;
  const authors = ar && item.authorsAr?.length ? item.authorsAr : product.authors ?? [];
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [addError, setAddError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    function readWishlist() {
      try {
        const saved = JSON.parse(window.localStorage.getItem("ubh-wishlist") || "[]") as string[];
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
  const hasSale = typeof product.oldPrice === "number" && product.oldPrice > product.price;
  const available = product.stock > 0;

  function handleAddToCart() {
    setAddError(false);
    const success = addToCart(product, 1);
    setAdded(success);
    setAddError(!success);
  }

  return (
    <article className="group flex min-w-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-[0_1px_2px_rgba(6,26,55,0.025)] transition duration-200 hover:-translate-y-0.5 hover:border-ubh-gold/45 hover:shadow-[0_10px_28px_rgba(6,26,55,0.08)] motion-reduce:transform-none motion-reduce:transition-none sm:p-3">
      <div className="relative">
        <Link href={href} aria-label={`${labels.view}: ${title}`} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2">
          <BookCover product={product} title={title} labels={labels} />
        </Link>

        {(product.bestseller || product.newArrival || hasSale) && (
          <div className={`pointer-events-none absolute top-2 flex max-w-[85%] flex-wrap gap-1 ${ar ? "right-2" : "left-2"}`}>
            {product.bestseller && <span className="rounded-full bg-ubh-navy px-2 py-1 text-[9px] font-semibold leading-none text-white shadow-sm">{labels.bestseller}</span>}
            {!product.bestseller && product.newArrival && <span className="rounded-full bg-ubh-gold px-2 py-1 text-[9px] font-semibold leading-none text-white shadow-sm">{labels.newArrival}</span>}
            {hasSale && <span className="rounded-full bg-white px-2 py-1 text-[9px] font-bold leading-none text-rose-700 shadow-sm">{labels.sale}</span>}
          </div>
        )}
        <button
          type="button"
          aria-label={labels.wishlist}
          title={labels.wishlist}
          aria-pressed={isWishlisted}
          onClick={() => {
            try {
              const saved = JSON.parse(window.localStorage.getItem("ubh-wishlist") || "[]") as string[];
              const next = saved.includes(product.id)
                ? saved.filter((id) => id !== product.id)
                : [...saved, product.id];
              window.localStorage.setItem("ubh-wishlist", JSON.stringify(next));
              setIsWishlisted(next.includes(product.id));
              window.dispatchEvent(new Event("ubh-wishlist-updated"));
            } catch {
              setIsWishlisted(false);
            }
          }}
          className={`absolute top-2 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 shadow-sm backdrop-blur transition hover:border-ubh-gold hover:text-ubh-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold ${isWishlisted ? "text-rose-600" : "text-slate-500"} ${ar ? "left-2" : "right-2"}`}
        >
          <Heart size={15} strokeWidth={1.8} fill={isWishlisted ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-0.5 pb-0.5 pt-3">
        <Link href={href} className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold">
          <h2 className="min-h-[2.75rem] line-clamp-2 text-[13px] font-semibold leading-[1.4rem] text-ubh-navy transition-colors group-hover:text-[#9a6c20] sm:text-sm">
            {title}
          </h2>
        </Link>

        <p className="mt-1.5 min-h-4 truncate text-[11px] leading-4 text-slate-500 sm:text-xs">
          {authors.length ? authors.slice(0, 2).join(", ") : product.publisher}
        </p>
        <p className="mt-1 truncate text-[10px] leading-4 text-slate-400 sm:text-[11px]">{product.publisher}</p>

        <div className="mt-auto pt-3">
          <div className="flex min-h-6 flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-sm font-bold tracking-tight text-ubh-navy sm:text-[15px]">
              {product.currency} {product.price.toFixed(2)}
            </span>
            {hasSale && <del className="text-[11px] text-slate-400">{product.currency} {product.oldPrice!.toFixed(2)}</del>}
          </div>
          <p className={`mt-1.5 flex items-center gap-1.5 text-[10px] font-medium ${available ? "text-emerald-700" : "text-rose-600"}`}>
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${available ? "bg-emerald-600" : "bg-rose-500"}`} aria-hidden="true" />
            {available ? labels.stock : labels.out}
          </p>
          <button
            type="button"
            disabled={!available}
            onClick={handleAddToCart}
            className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-ubh-navy px-2.5 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#0a2a55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 sm:text-xs"
          >
            {added ? <Check size={14} aria-hidden="true" /> : <ShoppingCart size={14} aria-hidden="true" />}
            <span className="truncate">{added ? labels.added : labels.add}</span>
          </button>
          {addError && <p role="status" className="mt-2 text-[10px] leading-4 text-rose-600">{labels.addFailed}</p>}
        </div>
      </div>
    </article>
  );
}
