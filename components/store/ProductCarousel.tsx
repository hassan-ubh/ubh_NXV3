"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

import type { Locale } from "@/lib/i18n";
import type { Product } from "@/data/products";
import { useCart } from "@/components/store/CartProvider";

type ProductCarouselProps = {
  locale: Locale;
  products: Product[];
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
  cardWidth?: number;
  cardHeight?: number;
  imageHeight?: number;
  gap?: number;
  maxProducts?: number;
  sectionPaddingY?: number;
  headingSize?: string;
  titleSize?: string;
  priceSize?: string;
  showSubtitle?: boolean;
  showAuthors?: boolean;
  showPublisher?: boolean;
  showBadges?: boolean;
  showOldPrice?: boolean;
  showViewAll?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  pauseOnHover?: boolean;
  imageBackground?: string;
  className?: string;
  showDiscountBadge?: boolean;
};

const CART_FEEDBACK_MS = 1800;
const INTERACTION_PAUSE_MS = 2200;

export function ProductCarousel({
  locale,
  products,
  title,
  subtitle,
  viewAllHref,
  cardWidth = 180,
  cardHeight = 370,
  imageHeight = 180,
  gap = 14,
  maxProducts = 12,
  sectionPaddingY = 18,
  headingSize = "24px",
  titleSize = "14px",
  priceSize = "15px",
  showSubtitle = false,
  showAuthors = false,
  showPublisher = false,
  showBadges = false,
  showOldPrice = false,
  showViewAll = true,
  showArrows = true,
  autoPlay = true,
  autoPlaySpeed = 28,
  pauseOnHover = true,
  imageBackground = "#f8f7f3",
  className = "",
  showDiscountBadge = false,
}: ProductCarouselProps) {
  const isArabic = locale === "ar";
  const { addToCart } = useCart();

  const items = useMemo(
    () =>
      products
        .filter((product) => Boolean(product.slug))
        .filter(
          (product, index, all) =>
            all.findIndex((candidate) => candidate.id === product.id) === index,
        )
        .slice(0, Math.max(0, maxProducts)),
    [products, maxProducts],
  );

  // Keep source order intact. The viewport's dir controls visual ordering:
  // in Arabic, the first product is placed at the right-hand edge.
  const trackItems = items;

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const previousFrameTimeRef = useRef<number | null>(null);
  const loopWidthRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseRef = useRef(false);
  const feedbackTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [addedProductIds, setAddedProductIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [duplicateSets, setDuplicateSets] = useState(3);

  const shouldPause = isInteracting || (pauseOnHover && isHovered);

  useEffect(() => {
    pauseRef.current = shouldPause;
  }, [shouldPause]);

  const getTitle = useCallback(
    (product: Product) => {
      const localized = product as Product & { titleAr?: string };
      return (isArabic && localized.titleAr) || product.title || "";
    },
    [isArabic],
  );

  const getAuthors = useCallback(
    (product: Product) => {
      const localized = product as Product & { authorsAr?: string | string[] };
      const authors =
        isArabic && localized.authorsAr ? localized.authorsAr : product.authors;
      return Array.isArray(authors) ? authors.join(", ") : authors || "";
    },
    [isArabic],
  );

  const formatPrice = useCallback(
    (value: number | string | undefined, currency = "AED") => {
      const amount = Number(value);
      if (!Number.isFinite(amount)) return `${value ?? ""} ${currency}`.trim();

      try {
        return new Intl.NumberFormat(isArabic ? "ar-AE" : "en-AE", {
          style: "currency",
          currency: currency || "AED",
          maximumFractionDigits: 2,
        }).format(amount);
      } catch {
        return `${amount.toFixed(2)} ${currency || "AED"}`;
      }
    },
    [isArabic],
  );

  const pauseTemporarily = useCallback(() => {
    pauseRef.current = true;
    setIsInteracting(true);

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
      resumeTimerRef.current = null;
    }, INTERACTION_PAUSE_MS);
  }, []);

  const measureLoopWidth = useCallback(() => {
    const track = trackRef.current;

    if (!track || !autoPlay || items.length < 2) {
      loopWidthRef.current = 0;
      return;
    }

    const first = track.children[0] as HTMLElement | undefined;
    const firstDuplicate = track.children[items.length] as
      | HTMLElement
      | undefined;

    if (!first || !firstDuplicate) return;

    loopWidthRef.current = Math.abs(
      firstDuplicate.offsetLeft - first.offsetLeft,
    );
  }, [autoPlay, items.length]);

  const scrollByCards = useCallback(
    (direction: "left" | "right") => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      pauseTemporarily();
      // In RTL, scrolling toward the next product (left) makes scrollLeft
      // more negative in Chromium; previous (right) moves it toward zero.
      const scrollDirection = isArabic
        ? direction === "right" ? 1 : -1
        : direction === "right" ? 1 : -1;

      viewport.scrollBy({
        left: scrollDirection * (cardWidth + gap) * 2,
        behavior: "smooth",
      });
    },
    [cardWidth, gap, isArabic, pauseTemporarily],
  );

  // Add enough copies to cover the viewport and leave room for continuous motion.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !autoPlay || items.length < 2) {
      setDuplicateSets(1);
      loopWidthRef.current = 0;
      return;
    }

    const updateDuplicateCount = () => {
      const oneSetWidth = items.length * (cardWidth + gap);
      const required = Math.ceil(viewport.clientWidth / Math.max(oneSetWidth, 1)) + 2;
      setDuplicateSets(Math.max(3, required));
    };

    updateDuplicateCount();
    const observer = new ResizeObserver(updateDuplicateCount);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [autoPlay, cardWidth, gap, items.length]);

  // Native direction-aware scrolling: LTR uses positive scrollLeft, while
  // Chromium RTL uses negative scrollLeft. Duplicate sets let us wrap by one
  // set without changing the visible sequence.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !autoPlay || items.length < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let disposed = false;

    const measure = () => {
      measureLoopWidth();
      const loopWidth = loopWidthRef.current;
      if (loopWidth <= 0) return;

      // Start at the right edge in RTL, and one repeated set into the track in LTR.
      viewport.scrollLeft = isArabic ? 0 : loopWidth;
    };

    // Wait for the duplicate sets to render before measuring their positions.
    const initialFrame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    if (trackRef.current) observer.observe(trackRef.current);

    const animate = (time: number) => {
      if (disposed) return;

      const previousTime = previousFrameTimeRef.current;
      previousFrameTimeRef.current = time;
      const delta = previousTime === null ? 0 : Math.min(time - previousTime, 40);

      if (pauseRef.current || document.hidden) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const loopWidth = loopWidthRef.current;
      if (loopWidth > 0) {
        const distance = (Math.max(0, autoPlaySpeed) * delta) / 1000;

        if (isArabic) {
          // RTL: move from the right toward the left.
          viewport.scrollLeft -= distance;
          if (viewport.scrollLeft <= -loopWidth) {
            viewport.scrollLeft += loopWidth;
          }
        } else {
          viewport.scrollLeft += distance;
          if (viewport.scrollLeft >= loopWidth * 2) {
            viewport.scrollLeft -= loopWidth;
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(initialFrame);
      observer.disconnect();
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = null;
      previousFrameTimeRef.current = null;
    };
  }, [autoPlay, autoPlaySpeed, isArabic, items.length, measureLoopWidth, duplicateSets]);

  useEffect(
    () => () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      feedbackTimersRef.current.forEach((timer) => clearTimeout(timer));
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    },
    [],
  );

  const handleAddToCart = useCallback(
    (product: Product, duplicate: boolean) => {
      if (duplicate) return;

      addToCart(product, 1);
      const id = String(product.id);
      setAddedProductIds((current) => new Set(current).add(id));

      const existingTimer = feedbackTimersRef.current.get(id);
      if (existingTimer) clearTimeout(existingTimer);

      const timer = setTimeout(() => {
        setAddedProductIds((current) => {
          const next = new Set(current);
          next.delete(id);
          return next;
        });
        feedbackTimersRef.current.delete(id);
      }, CART_FEEDBACK_MS);

      feedbackTimersRef.current.set(id, timer);
    },
    [addToCart],
  );

  if (items.length === 0) return null;

  const renderCard = (product: Product, index: number, duplicate = false) => {
    const productTitle = getTitle(product);
    const productId = String(product.id);
    const isAdded = addedProductIds.has(productId);
    const authors = getAuthors(product);


    const currentPrice = Number(product.price);
const originalPrice = Number(product.oldPrice);

const discountPercentage =
  Number.isFinite(currentPrice) &&
  Number.isFinite(originalPrice) &&
  originalPrice > currentPrice &&
  originalPrice > 0
    ? Math.round(
        ((originalPrice - currentPrice) / originalPrice) * 100,
      )
    : 0;

    return (
      <article
        key={`${duplicate ? "copy" : "item"}-${productId}-${index}`}
        aria-hidden={duplicate || undefined}
        className="group relative flex shrink-0 flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#d6b46f] hover:shadow-[0_12px_28px_-12px_rgba(90,65,30,0.2)]"
        style={{
          width: `${cardWidth}px`,
          height: `${Math.max(cardHeight, imageHeight + 185)}px`,
        }}
      >
        <Link
          href={`/${locale}/shop/${product.slug}`}
          tabIndex={duplicate ? -1 : undefined}
          aria-label={productTitle}
          draggable={false}
          className="relative block shrink-0 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ubh-gold"
          style={{ height: `${imageHeight}px`, backgroundColor: imageBackground }}
        >
          {showDiscountBadge && discountPercentage > 0 && (
  <span
    className={`absolute top-2 ${
      isArabic ? "right-2" : "left-2"
    } z-10 rounded-md bg-[#a9782e] px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm`}
  >
    {isArabic
      ? `خصم ${discountPercentage}%`
      : `-${discountPercentage}%`}
  </span>
)}
          {product.cover ? (
            <Image
              src={product.cover}
              alt={productTitle}
              fill
              sizes={`${cardWidth}px`}
              draggable={false}
              className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              {isArabic ? "لا توجد صورة" : "No image"}
            </div>
          )}

          {showBadges && product.bestseller && (
            <span className="absolute left-2 top-2 rounded-md bg-ubh-navy px-2 py-1 text-[10px] font-semibold text-white">
              {isArabic ? "الأكثر مبيعًا" : "Bestseller"}
            </span>
          )}
          {showBadges && product.newArrival && (
            <span className="absolute right-2 top-2 rounded-md bg-ubh-gold px-2 py-1 text-[10px] font-semibold text-white">
              {isArabic ? "جديد" : "New"}
            </span>
          )}
        </Link>

        <div
          className={`flex min-h-0 flex-1 flex-col px-3 pb-3 pt-3 ${
            isArabic ? "text-right" : "text-left"
          }`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <Link
            href={`/${locale}/shop/${product.slug}`}
            tabIndex={duplicate ? -1 : undefined}
            className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold"
          >
            <h3
              className="line-clamp-2 min-h-[40px] overflow-hidden font-semibold leading-5 text-ubh-navy transition-colors duration-200 group-hover:text-ubh-blue-bright"
              style={{ fontSize: titleSize, overflowWrap: "anywhere" }}
              title={productTitle}
            >
              {productTitle || (isArabic ? "بدون عنوان" : "Untitled product")}
            </h3>
          </Link>

          {showAuthors && authors && (
            <p className="mt-1 line-clamp-1 text-xs text-slate-500">{authors}</p>
          )}
          {showPublisher && product.publisher && (
            <p className="mt-1 line-clamp-1 text-xs text-slate-500">
              {product.publisher}
            </p>
          )}

          <div className="mt-auto pt-3">
            <div className="flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1">
  <span
    className="font-extrabold leading-5 text-[#061a37]"
    style={{ fontSize: priceSize }}
  >
    {formatPrice(product.price, product.currency)}
  </span>

  {showOldPrice && product.oldPrice != null && (
    <span className="text-xs font-medium leading-5 text-slate-400 line-through">
      {formatPrice(product.oldPrice, product.currency)}
    </span>
  )}
</div>

            <button
              type="button"
              tabIndex={duplicate ? -1 : undefined}
              disabled={duplicate}
              onClick={() => handleAddToCart(product, duplicate)}
              aria-label={
                isArabic
                  ? isAdded
                    ? `تمت إضافة ${productTitle} إلى السلة`
                    : `أضف ${productTitle} إلى السلة`
                  : isAdded
                    ? `${productTitle} added to cart`
                    : `Add ${productTitle} to cart`
              }
              className={`mt-2 flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-lg px-2 text-xs font-semibold leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2 disabled:cursor-default sm:text-sm ${
                isAdded
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-ubh-navy text-white hover:bg-ubh-gold"
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={16} aria-hidden="true" className="shrink-0" />
                  <span className="truncate">
                    {isArabic ? "تمت الإضافة إلى السلة" : "Added to cart"}
                  </span>
                </>
              ) : (
                <>
                  <ShoppingCart size={16} aria-hidden="true" className="shrink-0" />
                  <span className="truncate">
                    {isArabic ? "أضف إلى السلة" : "Add to Cart"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section
      className={`w-full ${className}`}
      style={{ paddingTop: `${sectionPaddingY}px`, paddingBottom: `${sectionPaddingY}px` }}
      dir={isArabic ? "rtl" : "ltr"}
      aria-label={title || (isArabic ? "المنتجات" : "Products")}
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          {title && (
            <h2 className="font-bold tracking-tight text-ubh-navy" style={{ fontSize: headingSize }}>
              {title}
            </h2>
          )}
          {showSubtitle && subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {showViewAll && viewAllHref && (
            <Link
              href={viewAllHref}
              className="whitespace-nowrap text-sm font-semibold text-ubh-blue-bright transition-colors hover:text-ubh-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold"
            >
              {isArabic ? "عرض الكل" : "View all"}
            </Link>
          )}

          {showArrows && items.length > 1 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollByCards("left")}
                aria-label={isArabic ? "المنتجات السابقة" : "Previous products"}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-ubh-navy transition-colors hover:border-ubh-gold hover:bg-ubh-gold hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold"
              >
                {isArabic ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
              <button
                type="button"
                onClick={() => scrollByCards("right")}
                aria-label={isArabic ? "المنتجات التالية" : "Next products"}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-ubh-navy transition-colors hover:border-ubh-gold hover:bg-ubh-gold hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold"
              >
                {isArabic ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        ref={viewportRef}
        dir={isArabic ? "rtl" : "ltr"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsHovered(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsHovered(false);
          }
        }}
        onPointerDown={pauseTemporarily}
        onWheel={pauseTemporarily}
        className="ubh-product-carousel w-full overflow-x-auto overscroll-x-contain"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          cursor: "grab",
        }}
      >
        <div ref={trackRef} dir={isArabic ? "rtl" : "ltr"} className="flex w-max items-stretch" style={{ gap: `${gap}px` }}>
          {trackItems.map((product, index) => renderCard(product, index))}
          {autoPlay &&
            items.length > 1 &&
            Array.from({ length: duplicateSets }, (_, setIndex) =>
              trackItems.map((product, index) =>
                renderCard(product, setIndex * trackItems.length + index, true),
              ),
            )}
        </div>
      </div>

      <style jsx>{`
        .ubh-product-carousel::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .ubh-product-carousel :global(*) {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
