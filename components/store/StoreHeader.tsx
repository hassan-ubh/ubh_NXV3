"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Building2,
  X,
  Truck,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Check,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";

import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { copy, type Locale } from "@/lib/i18n";
import { useCart } from "@/components/store/CartProvider";
import { products } from "@/lib/store/catalog";
import type { Product } from "@/lib/store/catalog";
import { resolveCategorySlug } from "@/lib/store/categories";

type StoreHeaderProps = {
  locale: Locale;
};

type NavItem = {
  key: string;
  label: string;
  href: string;
};

type SearchSuggestion = {
  id: string;
  title: string;
  meta: string;
  href: string;
  kind: "book" | "author" | "publisher";
  cover?: string;
  price?: number;
};

type SearchFormProps = {
  placeholder: string;
  searchLabel: string;
  compact?: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  showCategorySelector?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  locale?: "en" | "ar";
  suggestions?: SearchSuggestion[];
  onSuggestionClick?: (href: string) => void;
};

type CategoryDropdownProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  locale?: "en" | "ar";
  compact?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Reusable category dropdown                                                  */
/* -------------------------------------------------------------------------- */

function CategoryDropdown({
  categories,
  selectedCategory,
  onCategoryChange,
  locale = "en",
  compact = false,
}: CategoryDropdownProps) {
  const [open, setOpen] = useState(false);
  const isArabic = locale === "ar";

  const allCategoriesLabel = isArabic ? "جميع الفئات" : "All categories";

  return (
    <div className="relative z-50 shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
        className={`group flex ${
          compact ? "h-9" : "h-11"
        } max-w-[145px] shrink-0 items-center justify-between gap-2 border-e border-slate-200 bg-transparent px-2.5 text-xs font-semibold text-ubh-navy transition-[height] duration-200 sm:max-w-[175px] sm:gap-3 sm:px-3`}
      >
        <span className="min-w-0 truncate rounded-lg px-2 py-1 transition-colors group-hover:bg-ubh-gold-wash">
          {selectedCategory || allCategoriesLabel}
        </span>

        <ChevronDown
          size={15}
          className={`shrink-0 text-ubh-gold transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label={isArabic ? "إغلاق القائمة" : "Close menu"}
            tabIndex={-1}
            className="fixed inset-0 z-[60] cursor-default"
            onClick={() => setOpen(false)}
          />

          <div
            dir={isArabic ? "rtl" : "ltr"}
            role="listbox"
            aria-label={isArabic ? "فئات البحث" : "Search categories"}
            className="absolute start-0 top-[calc(100%+8px)] z-[70] max-h-72 w-64 max-w-[85vw] overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-ubh-navy/15"
          >
            <button
              type="button"
              role="option"
              aria-selected={!selectedCategory}
              onClick={() => {
                onCategoryChange("");
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-start text-sm ${
                !selectedCategory
                  ? "bg-ubh-navy font-semibold text-white"
                  : "text-slate-700 hover:bg-ubh-gold-wash hover:text-ubh-navy"
              }`}
            >
              <span>{allCategoriesLabel}</span>
              {!selectedCategory && <Check size={15} />}
            </button>

            <div className="my-1 border-t border-slate-100" />

            {categories.map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onCategoryChange(category);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-start text-sm ${
                    isSelected
                      ? "bg-ubh-gold-wash font-semibold text-[#8b6121]"
                      : "text-slate-700 hover:bg-slate-50 hover:text-ubh-navy"
                  }`}
                >
                  <span className="truncate">{category}</span>
                  {isSelected && (
                    <Check size={15} className="shrink-0 text-ubh-gold" />
                  )}
                </button>
              );
            })}

            {categories.length === 0 && (
              <p className="px-3 py-3 text-sm text-slate-500">
                {isArabic ? "لا توجد فئات متاحة" : "No categories available"}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Reusable search form                                                        */
/* -------------------------------------------------------------------------- */

export function SearchForm({
  placeholder,
  searchLabel,
  compact = false,
  query,
  onQueryChange,
  onSubmit,
  categories,
  selectedCategory,
  onCategoryChange,
  showCategorySelector = false,
  inputRef,
  className = "",
  inputClassName = "",
  buttonClassName = "",
  locale = "en",
  suggestions = [],
  onSuggestionClick,
}: SearchFormProps) {
  const isArabic = locale === "ar";
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const visibleSuggestions =
    suggestionsOpen && query.trim().length >= 2 ? suggestions.slice(0, 6) : [];

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div ref={rootRef} className={`relative min-w-0 flex-1 ${className}`}>
      <form
        role="search"
        onSubmit={(event) => {
          setSuggestionsOpen(false);
          onSubmit(event);
        }}
        dir={isArabic ? "rtl" : "ltr"}
        className={`relative flex min-w-0 overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm transition-[border-color,box-shadow] duration-200 focus-within:border-ubh-gold focus-within:ring-4 focus-within:ring-ubh-gold/10 ${className}`}
      >
        {showCategorySelector && (
          <CategoryDropdown
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            locale={locale}
            compact={compact}
          />
        )}

        <input
          ref={inputRef}
          type="search"
          value={query}
          autoComplete="off"
          role="combobox"
          aria-label={searchLabel}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-controls="store-search-suggestions"
          aria-expanded={visibleSuggestions.length > 0}
          placeholder={placeholder}
          onFocus={() => setSuggestionsOpen(true)}
          onChange={(event) => {
            onQueryChange(event.target.value);
            setSuggestionsOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setSuggestionsOpen(false);
          }}
          className={`${compact ? "h-9" : "h-11"} min-w-0 flex-1 bg-transparent px-3 text-sm text-ubh-navy outline-none placeholder:text-slate-400 sm:px-4 ${inputClassName}`}
        />

        {query && (
          <button
            type="button"
            aria-label={isArabic ? "مسح البحث" : "Clear search"}
            onClick={() => {
              onQueryChange("");
              setSuggestionsOpen(false);
              inputRef?.current?.focus();
            }}
            className="my-auto me-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-ubh-navy"
          >
            <X size={15} />
          </button>
        )}

        <button
          type="submit"
          aria-label={searchLabel}
          className={`group flex ${compact ? "h-9" : "h-11"} w-12 shrink-0 items-center justify-center rounded-e-[11px] bg-ubh-gold text-white transition-colors duration-200 hover:bg-[#b5822e] active:bg-[#9f7025] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ubh-navy ${buttonClassName}`}
        >
          <Search
            size={19}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:scale-110"
          />
        </button>
      </form>

      {visibleSuggestions.length > 0 && (
        <div
          dir={isArabic ? "rtl" : "ltr"}
          id="store-search-suggestions"
          role="listbox"
          aria-label={isArabic ? "اقتراحات البحث" : "Search suggestions"}
          className="absolute inset-x-0 top-full z-[120] mt-2 max-h-[min(420px,65vh)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-ubh-navy/20"
        >
          {visibleSuggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={false}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setSuggestionsOpen(false);
                onSuggestionClick?.(item.href);
              }}
              className="flex w-full items-center gap-3 rounded-xl p-2.5 text-start transition-colors hover:bg-ubh-gold-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ubh-gold"
            >
              <span className="flex h-14 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                {item.cover ? (
                  // Remote covers are already present in the product catalogue.
                  <Image
                    src={item.cover}
                    alt=""
                    width={44}
                    height={56}
                    sizes="44px"
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                ) : item.kind === "author" ? (
                  <UserRound size={21} className="text-ubh-gold" />
                ) : item.kind === "publisher" ? (
                  <Building2 size={21} className="text-ubh-gold" />
                ) : (
                  <span className="text-[9px] font-semibold text-slate-400">
                    UBH
                  </span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block line-clamp-2 text-sm font-semibold leading-5 text-ubh-navy">
                  {item.title}
                </span>
                <span className="mt-1 block truncate text-xs text-slate-500">
                  {item.meta}
                </span>
                {item.price !== undefined && (
                  <span className="mt-1 block text-xs font-bold text-ubh-gold-deep">
                    AED {item.price.toFixed(2)}
                  </span>
                )}
              </span>
              <ArrowRight
                size={15}
                className={`shrink-0 text-slate-300 ${isArabic ? "rotate-180" : ""}`}
              />
            </button>
          ))}
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setSuggestionsOpen(false);
              const form = rootRef.current?.querySelector("form");
              form?.requestSubmit();
            }}
            className="mt-1 flex min-h-10 w-full items-center justify-center rounded-xl border-t border-slate-100 px-3 pt-2 text-xs font-bold text-[#8b6121] transition hover:bg-[#fcfaf6]"
          >
            {isArabic ? "عرض جميع نتائج البحث" : "View all search results"}
          </button>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main store header                                                           */
/* -------------------------------------------------------------------------- */

export function StoreHeader({ locale }: StoreHeaderProps) {
  const router = useRouter();
  const t = copy[locale].store;
  const isArabic = locale === "ar";
  const { count: cartCount } = useCart();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [desktopMenuPosition, setDesktopMenuPosition] = useState({
    top: 0,
    left: 0,
    right: 0,
  });
  const [desktopMenuReady, setDesktopMenuReady] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showStickyCategories, setShowStickyCategories] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const navRef = useRef<HTMLElement | null>(null);
  const navScrollRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchRef = useRef<HTMLInputElement | null>(null);

  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);

  // const updateNavScrollState = useCallback(() => {
  //   const viewport = navScrollRef.current;
  //   if (!viewport) return;

  //   const maxScroll = viewport.scrollWidth - viewport.clientWidth;
  //   const hasOverflow = maxScroll > 2;

  //   // The scroll viewport uses LTR in both languages.
  //   const currentScroll = Math.max(0, Math.min(viewport.scrollLeft, maxScroll));

  //   setCanScrollStart(hasOverflow && currentScroll > 2);
  //   setCanScrollEnd(hasOverflow && currentScroll < maxScroll - 2);
  // }, []);
  const updateNavScrollState = useCallback(() => {
    const viewport = navScrollRef.current;
    if (!viewport) return;

    const navRow = viewport.parentElement;
    const content = viewport.firstElementChild as HTMLElement | null;

    if (!navRow || !content) return;

    // Check whether all categories fit in the full navigation row.
    const hasOverflow =
      content.getBoundingClientRect().width > navRow.clientWidth + 2;

    if (!hasOverflow) {
      setCanScrollStart(false);
      setCanScrollEnd(false);
      return;
    }

    // Actual scrollable distance after the arrows are displayed.
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;

    const currentScroll = isArabic
      ? Math.abs(viewport.scrollLeft)
      : viewport.scrollLeft;

    if (isArabic) {
      setCanScrollStart(currentScroll < maxScroll - 2);
      setCanScrollEnd(currentScroll > 2);
    } else {
      setCanScrollStart(currentScroll > 2);
      setCanScrollEnd(currentScroll < maxScroll - 2);
    }
  }, [isArabic]);

  useEffect(() => {
    const viewport = navScrollRef.current;
    if (!viewport) return;

    let frameId = 0;
    const measureOnNextFrame = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateNavScrollState();
      });
    };

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measureOnNextFrame)
        : null;

    const navRow = viewport.parentElement;

    observer?.observe(viewport);

    if (navRow) {
      observer?.observe(navRow);
    }

    if (viewport.firstElementChild) {
      observer?.observe(viewport.firstElementChild);
    }

    viewport.addEventListener("scroll", measureOnNextFrame, { passive: true });
    window.addEventListener("resize", measureOnNextFrame, { passive: true });
    measureOnNextFrame();

    return () => {
      observer?.disconnect();
      viewport.removeEventListener("scroll", measureOnNextFrame);
      window.removeEventListener("resize", measureOnNextFrame);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [updateNavScrollState, locale]);

  // const scrollNavigation = useCallback((direction: "left" | "right") => {
  //   const viewport = navScrollRef.current;
  //   if (!viewport) return;

  //   const distance = Math.max(220, Math.round(viewport.clientWidth * 0.7));

  //   const reduceMotion = window.matchMedia(
  //     "(prefers-reduced-motion: reduce)",
  //   ).matches;

  //   viewport.scrollBy({
  //     left: direction === "left" ? -distance : distance,
  //     behavior: reduceMotion ? "auto" : "smooth",
  //   });
  // }, []);
  const scrollNavigation = useCallback((direction: "left" | "right") => {
    const viewport = navScrollRef.current;
    if (!viewport) return;

    const distance = Math.max(220, Math.round(viewport.clientWidth * 0.7));

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    viewport.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, []);
  useEffect(() => {
    const viewport = navScrollRef.current;
    if (!viewport) return;

    const frameId = window.requestAnimationFrame(() => {
      // Both LTR and RTL start at scrollLeft = 0.
      // In RTL, this is the rightmost edge where Categories appears first.
      viewport.scrollLeft = 0;

      updateNavScrollState();
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isArabic, updateNavScrollState]);

  const normalizeSearch = useCallback(
    (value: unknown) =>
      String(value ?? "")
        .normalize("NFC")
        .toLocaleLowerCase(locale === "ar" ? "ar" : "en")
        .replace(/[^\p{L}\p{N}]+/gu, " ")
        .trim()
        .replace(/\s+/g, " "),
    [locale],
  );

  //   const suggestions = useMemo<SearchSuggestion[]>(() => {
  //     const query = normalizeSearch(searchQuery);
  //     const terms = query.split(" ").filter(Boolean);
  //     if (terms.length === 0 || query.length < 2) return [];

  //     return products
  //       .filter((product: Product) => {
  //         // const searchable = normalizeSearch(
  //         //   [
  //         //     product.title,
  //         //     product.titleAr,
  //         //     product.subtitle,
  //         //     product.description,
  //         //     product.descriptionAr,
  //         //     ...(product.authors ?? []),
  //         //     product.publisher,
  //         //     product.publisherSlug,
  //         //     product.isbn,
  //         //     product.isbn10,
  //         //     product.barcode,
  //         //     product.sku,
  //         //     ...(product.subjects ?? []),
  //         //     product.category,
  //         //     product.series,
  //         //     product.language,
  //         //     product.format,
  //         //   ]
  //         //     .filter(Boolean)
  //         //     .join(" "),
  //         // );
  //         const searchable = normalizeSearch(
  //   [
  //     product.title,
  //     product.titleAr,
  //     product.subtitle,
  //     product.description,
  //     product.descriptionAr,
  //     ...(product.authors ?? []),
  //     ...(product.authorsAr ?? []),
  //     product.publisher,
  //     product.publisherSlug,
  //     product.isbn,
  //     product.isbn10,
  //     product.barcode,
  //     product.sku,
  //     ...(product.subjects ?? []),
  //     product.category,
  //     product.series,
  //     product.language,
  //     product.format,
  //   ]
  //     .filter(Boolean)
  //     .join(" "),
  // );
  //         return terms.every((term) => searchable.includes(term));
  //       })
  //       .slice(0, 6)
  //       .map((product) => ({
  //         id: product.id,
  //         title:
  //           locale === "ar" ? product.titleAr || product.title : product.title,
  //         meta: [
  //   locale === "ar"
  //     ? product.authorsAr?.join("، ") || product.authors?.join(", ")
  //     : product.authors?.join(", "),
  //   product.publisher,
  //   product.isbn,
  // ]
  //   .filter(Boolean)
  //   .join(" · "),
  //         href: `/${locale}/shop/${encodeURIComponent(product.slug)}`,
  //         cover: product.cover,
  //         price: product.price,
  //       }));
  //   }, [locale, normalizeSearch, searchQuery]);
  const suggestions = useMemo<SearchSuggestion[]>(() => {
    const query = normalizeSearch(searchQuery);
    const terms = query.split(" ").filter(Boolean);

    if (terms.length === 0 || query.length < 2) return [];

    const matchesQuery = (value: string) => {
      const normalized = normalizeSearch(value);
      return terms.every((term) => normalized.includes(term));
    };

    // Book suggestions
    const bookSuggestions = products
      .filter((product: Product) => {
        const searchable = normalizeSearch(
          [
            product.title,
            product.titleAr,
            product.subtitle,
            product.description,
            product.descriptionAr,
            ...(product.authors ?? []),
            product.publisher,
            product.publisherSlug,
            product.isbn,
            product.isbn10,
            product.barcode,
            product.sku,
            ...(product.subjects ?? []),
            product.category,
            product.series,
            product.language,
            product.format,
          ]
            .filter(Boolean)
            .join(" "),
        );

        return terms.every((term) => searchable.includes(term));
      })
      .slice(0, 4)
      .map((product) => ({
        id: `book-${product.id}`,
        kind: "book" as const,
        title:
          locale === "ar" ? product.titleAr || product.title : product.title,
        meta: [product.authors?.join(", "), product.publisher, product.isbn]
          .filter(Boolean)
          .join(" · "),
        href: `/${locale}/shop/${encodeURIComponent(product.slug)}`,
        cover: product.cover,
        price: product.price,
      }));

    // Unique authors
    const authors = Array.from(
      new Set(products.flatMap((product) => product.authors ?? [])),
    );

    const authorSuggestions = authors
      .filter(matchesQuery)
      .slice(0, 1)
      .map((author) => ({
        id: `author-${normalizeSearch(author)}`,
        kind: "author" as const,
        title: author,
        meta: locale === "ar" ? "مؤلف — عرض الكتب" : "Author · View books",
        href: `/${locale}/shop/products?q=${encodeURIComponent(author)}`,
      }));

    // Unique publishers
    const publishers = Array.from(
      new Set(
        products
          .map((product) => product.publisher)
          .filter((publisher): publisher is string => Boolean(publisher)),
      ),
    );

    const publisherSuggestions = publishers
      .filter(matchesQuery)
      .slice(0, 1)
      .map((publisher) => ({
        id: `publisher-${normalizeSearch(publisher)}`,
        kind: "publisher" as const,
        title: publisher,
        meta: locale === "ar" ? "ناشر — عرض الكتب" : "Publisher · View books",
        href: `/${locale}/shop/products?q=${encodeURIComponent(publisher)}`,
      }));

    return [
      ...bookSuggestions,
      ...authorSuggestions,
      ...publisherSuggestions,
    ].slice(0, 6);
  }, [locale, normalizeSearch, searchQuery]);

  /* ------------------------------------------------------------------------ */
  /* Stable scroll behavior                                                    */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    let lastY = window.scrollY;
    let upDistance = 0;
    let downDistance = 0;
    let frameId = 0;

    let compact = window.scrollY >= 120;
    let categoriesVisible = false;

    const TOP_EXIT = 40;
    const COMPACT_ENTER = 120;
    const SHOW_AFTER_UP = 60;
    const HIDE_AFTER_DOWN = 40;
    const NOISE = 3;

    const handleScroll = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;

        const y = Math.max(0, window.scrollY);
        const delta = y - lastY;
        lastY = y;

        // Use separate enter/exit thresholds to prevent flickering.
        if (y < TOP_EXIT) {
          compact = false;
          categoriesVisible = false;
          upDistance = 0;
          downDistance = 0;

          setIsScrolled(false);
          setShowStickyCategories(false);
          return;
        }

        if (y > COMPACT_ENTER) {
          compact = true;
        }

        if (Math.abs(delta) < NOISE) return;

        if (delta < 0) {
          upDistance += -delta;
          downDistance = 0;

          if (upDistance >= SHOW_AFTER_UP) {
            categoriesVisible = true;
            upDistance = 0;
          }
        } else {
          downDistance += delta;
          upDistance = 0;

          if (downDistance >= HIDE_AFTER_DOWN) {
            categoriesVisible = false;
            downDistance = 0;
          }
        }

        setIsScrolled(compact);
        setShowStickyCategories(categoriesVisible);
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Navigation data                                                           */
  /* ------------------------------------------------------------------------ */

  const navItems: NavItem[] = useMemo(
    () => [
      {
        key: "categories",
        label: t.categoriesNav,
        href: `/${locale}/shop`,
      },
      {
        key: "newReleases",
        label: t.newReleasesNav,
        href: `/${locale}/shop/products?collection=new-releases`,
      },
      {
        key: "ubh",
        label: t.ubh,
        href: `/${locale}/shop/products?collection=ubh`,
      },
      {
        key: "bestSellers",
        label: t.bestSellersNav,
        href: `/${locale}/shop/products?collection=best-sellers`,
      },
      {
        key: "ebooks",
        label: t.ebooksNav,
        href: `/${locale}/shop/products?type=ebook`,
      },
      {
        key: "textbooks",
        label: t.textbooksNav,
        href: `/${locale}/shop/products?type=textbook`,
      },
      {
        key: "series",
        label: t.series,
        href: `/${locale}/shop/products?collection=series`,
      },
      {
        key: "publishers",
        label: t.publishersNav,
        href: `/${locale}/shop/publishers`,
      },
      {
        key: "offers",
        label: t.offersNav,
        href: `/${locale}/shop/products?collection=offers`,
      },
      {
        key: "openAccess",
        label: t.openAccessNav,
        href: `/${locale}/shop/products?collection=open-access`,
      },
      {
        key: "institutions",
        label: t.institutionsNav,
        href: `/${locale}/institutions`,
      },
    ],
    [locale, t],
  );

  const getSubItems = useCallback(
    (key: string): string[] => {
      if (key === "institutions") return [];

      if (key === "publishers") {
        return locale === "ar"
          ? [
              "دوليون – الإنجليزية",
              "دوليون – العربية",
              "محليون – الإنجليزية",
              "محليون – العربية",
            ]
          : [
              "International – English",
              "International – Arabic",
              "Local – English",
              "Local – Arabic",
            ];
      }

      const items = t.navItems[key as keyof typeof t.navItems];

      if (!Array.isArray(items)) return [];

      return items.filter((item): item is string => typeof item === "string");
    },
    [locale, t],
  );
  const categories = useMemo(() => getSubItems("categories"), [getSubItems]);

  /* ------------------------------------------------------------------------ */
  /* Shared handlers                                                           */
  /* ------------------------------------------------------------------------ */

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setMobileSearchOpen(false);
    setMobileSubmenu(null);
    setActiveNav(null);
  }, []);

  const toggleMobileSubmenu = useCallback((key: string) => {
    setMobileSubmenu((current) => (current === key ? null : key));
  }, []);

  // const handleSearch = useCallback(
  //   (event: FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     const params = new URLSearchParams();
  //     const query = searchQuery.trim();

  //     if (query) params.set("q", query);
  //     if (selectedCategory) {
  //       const categorySlug = resolveCategorySlug(selectedCategory);
  //       if (categorySlug) params.set("category", categorySlug);
  //     }

  //     closeMenus();
  //     setSearchQuery("");

  //     const queryString = params.toString();

  //     router.push(
  //       `/${locale}/shop/products${queryString ? `?${queryString}` : ""}`,
  //     );
  //   },
  //   [closeMenus, locale, router, searchQuery, selectedCategory],
  // );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      closeMenus();

      if (!category) {
        router.push(`/${locale}/shop/products`);
        return;
      }

      const categorySlug = resolveCategorySlug(category);

      if (categorySlug) {
        router.push(
          `/${locale}/shop/products?category=${encodeURIComponent(categorySlug)}`,
        );
      }
    },
    [closeMenus, locale, router],
  );

  const handleSearch = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const params = new URLSearchParams();
      const query = searchQuery.trim();

      if (query) {
        params.set("q", query);
      }

      if (selectedCategory) {
        const categorySlug = resolveCategorySlug(selectedCategory);

        if (!categorySlug) {
          console.warn("Could not resolve category slug:", selectedCategory);
        } else {
          params.set("category", categorySlug);
        }
      }

      closeMenus();
      setSearchQuery("");

      const queryString = params.toString();

      router.push(
        `/${locale}/shop/products${queryString ? `?${queryString}` : ""}`,
      );
    },
    [closeMenus, locale, router, searchQuery, selectedCategory],
  );

  const getSubItemHref = (item: NavItem, subItem: string): string => {
    if (item.key === "publishers") {
      const publisherFilters: Record<
        string,
        { market: "local" | "international"; language: "en" | "ar" }
      > = {
        "international-en": {
          market: "international",
          language: "en",
        },
        "international-ar": {
          market: "international",
          language: "ar",
        },
        "local-en": {
          market: "local",
          language: "en",
        },
        "local-ar": {
          market: "local",
          language: "ar",
        },
      };

      const filter = publisherFilters[subItem];

      if (filter) {
        return `/${locale}/shop/publishers?market=${filter.market}&language=${filter.language}`;
      }
    }

    const params = new URLSearchParams();
    const existingQuery = item.href.split("?")[1];

    if (existingQuery) {
      new URLSearchParams(existingQuery).forEach((value, key) => {
        params.set(key, value);
      });
    }
    if (item.key === "publishers") {
      const publisherSubItems = getSubItems("publishers");
      const selectedIndex = publisherSubItems.indexOf(subItem);

      const publisherFilters = [
        { market: "international", language: "en" },
        { market: "international", language: "ar" },
        { market: "local", language: "en" },
        { market: "local", language: "ar" },
      ];

      const selectedFilter = publisherFilters[selectedIndex];

      if (selectedFilter) {
        return `/${locale}/shop/publishers?market=${selectedFilter.market}&language=${selectedFilter.language}`;
      }

      return item.href;
    }

    const categorySlug = resolveCategorySlug(subItem);

    if (categorySlug) {
      params.set("category", categorySlug);
      return `/${locale}/shop/products?${params.toString()}`;
    }

    return item.href;
  };

  /* ------------------------------------------------------------------------ */
  /* Overlay and keyboard behavior                                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (mobileOpen || mobileSearchOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen, mobileSearchOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeMenus]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Element;
      if (
        !navRef.current?.contains(target) &&
        !target.closest('[role="menu"]')
      ) {
        setActiveNav(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (!mobileSearchOpen) return;

    const frame = window.requestAnimationFrame(() => {
      mobileSearchRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [mobileSearchOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSearchOpen(false);
    setMobileSubmenu(null);
    setActiveNav(null);
  }, [locale]);

  const openDesktopSubmenu = (
    event: ReactPointerEvent<HTMLDivElement>,
    key: string,
  ) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    setDesktopMenuPosition({
      top: rect.bottom + 2,
      left: isArabic ? Math.max(8, rect.right - 288) : Math.max(8, rect.left),
      right: isArabic ? Math.max(8, window.innerWidth - rect.right) : 0,
    });
    setDesktopMenuReady(true);
    setActiveNav(key);
  };

  const toggleDesktopSubmenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    key: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = event.currentTarget.parentElement?.getBoundingClientRect();
    if (!rect) return;
    if (activeNav === key) {
      setActiveNav(null);
      return;
    }
    setDesktopMenuPosition({
      top: rect.bottom + 2,
      left: isArabic ? Math.max(8, rect.right - 288) : Math.max(8, rect.left),
      right: isArabic ? Math.max(8, window.innerWidth - rect.right) : 0,
    });
    setDesktopMenuReady(true);
    setActiveNav(key);
  };

  const handleNavPointerLeave = (_event: ReactPointerEvent<HTMLElement>) => {
    // Keep the portal menu open while the pointer moves from a nav item to its panel.
  };

  /* ------------------------------------------------------------------------ */
  /* Render                                                                    */
  /* ------------------------------------------------------------------------ */

  return (
    <>
      {/* Utility bar: scrolls away naturally */}
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="relative z-[70] bg-ubh-navy text-white"
      >
        <Container className="flex min-h-9 items-center justify-between gap-3">
          <div className="hidden min-w-0 items-center gap-4 text-[11px] sm:flex lg:gap-7">
            <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
              <Truck size={13} strokeWidth={1.8} />
              <span>{t.fastDelivery}</span>
            </span>

            <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
              <ShieldCheck size={13} strokeWidth={1.8} />
              <span>{t.securePayment}</span>
            </span>

            <span className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap lg:flex">
              <Headphones size={13} strokeWidth={1.8} />
              <span>{t.dedicatedSupport}</span>
            </span>
          </div>

          <div className="ms-auto flex shrink-0 items-center gap-2.5 text-[11px] sm:gap-3 lg:gap-4">
            <Link
              href={`/${locale}/institutions`}
              className="whitespace-nowrap transition-opacity hover:opacity-70"
            >
              {t.forInstitutions}
            </Link>

            <span className="hidden opacity-30 lg:inline">|</span>

            <Link
              href={`/${locale}/help`}
              className="hidden whitespace-nowrap transition-opacity hover:opacity-70 lg:inline"
            >
              {t.helpCenter}
            </Link>

            <span className="opacity-30">|</span>

            <LanguageSwitcher locale={locale} />

            <span className="opacity-30">|</span>

            <span
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap"
              aria-label={t.uaeCurrency}
            >
              <img
                src="/images/flags/uae.svg"
                alt="UAE"
                width={17}
                height={11}
                className="h-[11px] w-[17px] shrink-0 object-cover"
              />
              <span className="lg:hidden">AED</span>
              <span className="hidden lg:inline">{t.uaeCurrency}</span>
            </span>
          </div>
        </Container>
      </div>

      {/* Sticky header: stays at the top after the utility bar scrolls away */}
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="sticky top-0 z-[80] w-full bg-white shadow-md text-ubh-ink"
      >
        {/* Main header */}
        <div
          className="relative z-[80] bg-white"
          // className={`relative z-[80] bg-white transition-shadow duration-200 ease-out ${
          //   isScrolled
          //     ? "shadow-[0_4px_14px_rgba(6,26,55,0.07)]"
          //     : "shadow-none"
          // }`}
        >
          <Container
            className={`flex min-w-0 items-center gap-2 transition-[min-height] duration-200 ease-out sm:gap-3 lg:gap-5 xl:gap-6 ${
              isScrolled
                ? "min-h-[54px] sm:min-h-[60px] lg:min-h-[64px]"
                : "min-h-[68px] sm:min-h-[76px] lg:min-h-[82px] xl:min-h-[88px]"
            }`}
          >
            {/* Logo */}
            <div
              className={`w-fit max-w-[118px] shrink-0 origin-start transition-transform duration-200 sm:max-w-[145px] lg:max-w-[165px] xl:max-w-[180px] ${
                isScrolled ? "scale-[0.88]" : "scale-100"
              }`}
            >
              <Logo store />
            </div>

            {/* Destination */}
            <div className="hidden 2xl:flex shrink-0 items-center border-s border-slate-200 ps-4">
  <span className="whitespace-pre-line text-[10px] font-medium leading-[1.5] tracking-wide text-[#061A37]">
    {t.destination}
  </span>
</div>

            {/* Desktop / tablet search */}
            <SearchForm
              locale={locale}
              compact={isScrolled}
              placeholder={t.search}
              searchLabel={t.search}
              query={searchQuery}
              onQueryChange={setSearchQuery}
              onSubmit={handleSearch}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              showCategorySelector
              suggestions={suggestions}
              onSuggestionClick={(href) => {
                setSearchQuery("");
                closeMenus();
                router.push(href);
              }}
              className="hidden min-w-[120px] flex-1 md:flex"
            />

            {/* Mobile search toggle */}
            <button
              type="button"
              className="ms-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ubh-ink transition-colors hover:bg-slate-100 active:bg-slate-200 md:hidden"
              onClick={() => {
                setMobileSearchOpen((current) => !current);
                setMobileOpen(false);
                setMobileSubmenu(null);
              }}
              aria-label={t.search}
              aria-expanded={mobileSearchOpen}
              aria-controls="store-mobile-search"
            >
              {mobileSearchOpen ? (
                <X size={21} strokeWidth={2} />
              ) : (
                <Search size={21} strokeWidth={2} />
              )}
            </button>

            {/* Desktop account / wishlist / cart */}
            <div className="hidden shrink-0 items-center gap-1 md:flex lg:gap-2">
              <Link
                href={`/${locale}/profile`}
                className={`flex ${
                  isScrolled ? "h-9 w-9" : "h-10 w-10"
                } items-center justify-center rounded-full transition-colors hover:bg-slate-100 hover:text-ubh-gold-deep`}
                aria-label={t.account}
                title={t.account}
              >
                <UserRound size={20} strokeWidth={1.8} />
              </Link>

              <Link
                href={`/${locale}/wishlist`}
                className={`flex ${
                  isScrolled ? "h-9 w-9" : "h-10 w-10"
                } items-center justify-center rounded-full transition-colors hover:bg-slate-100 hover:text-ubh-gold-deep`}
                aria-label={t.wishlist}
                title={t.wishlist}
              >
                <Heart size={20} strokeWidth={1.8} />
              </Link>

              <Link
                href={`/${locale}/cart`}
                className={`relative flex ${
                  isScrolled ? "h-9 w-9" : "h-10 w-10"
                } items-center justify-center rounded-full transition-colors hover:bg-slate-100 hover:text-ubh-gold-deep`}
                aria-label={t.cart}
                title={t.cart}
              >
                <ShoppingCart size={20} strokeWidth={1.8} />

                {cartCount > 0 && (
                  <span className="absolute -end-0.5 -top-0.5 min-w-4 rounded-full bg-ubh-gold px-1 text-center text-[10px] font-bold leading-4 text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile / tablet drawer toggle */}
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-slate-100 active:bg-slate-200 xl:hidden"
              onClick={() => {
                setMobileOpen((current) => !current);
                setMobileSearchOpen(false);
                setMobileSubmenu(null);
              }}
              aria-label={
                mobileOpen
                  ? copy[locale].nav.closeMenu
                  : copy[locale].nav.openMenu
              }
              aria-expanded={mobileOpen}
              aria-controls="store-mobile-drawer"
            >
              {mobileOpen ? (
                <X size={23} strokeWidth={2} />
              ) : (
                <Menu size={23} strokeWidth={2} />
              )}
            </button>
          </Container>
        </div>

        {/* Desktop category navigation */}
        <div
          className={`grid transition-[grid-template-rows] duration-200 ease-out ${
            !isScrolled || showStickyCategories
              ? "grid-rows-[1fr]"
              : "grid-rows-[0fr]"
          }`}
        >
          <div
            className={`min-h-0 ${
              !isScrolled || showStickyCategories
                ? "overflow-visible"
                : "overflow-hidden"
            }`}
          >
            <nav
              ref={navRef}
              aria-label={t.categoriesNav}
              onPointerLeave={handleNavPointerLeave}
              aria-hidden={isScrolled && !showStickyCategories}
              className={`relative block w-full min-w-0 max-w-full overflow-x-clip bg-white transition-opacity duration-200 ${
                !isScrolled || showStickyCategories
                  ? "border-t border-slate-100 opacity-100"
                  : "pointer-events-none border-t border-transparent opacity-0"
              }`}
            >
              <div className="mx-auto w-full min-w-0 max-w-none px-3 sm:px-4 lg:px-6 2xl:px-10">
                <div
                  dir="ltr"
                  className="flex w-full min-w-0 items-center gap-1 overflow-hidden"
                >
                  {/* Physical left arrow: right side in Arabic */}
                  <div
                    aria-hidden={!canScrollStart}
                    className={`grid shrink-0 overflow-hidden transition-[grid-template-columns,opacity,margin] duration-300 ease-in-out motion-reduce:transition-none ${
                      canScrollStart
                        ? "me-1 grid-cols-[24px] opacity-100"
                        : "me-0 grid-cols-[0px] opacity-0"
                    }`}
                  >
                    <button
                      type="button"
                      tabIndex={canScrollStart ? 0 : -1}
                      disabled={!canScrollStart}
                      onClick={() => scrollNavigation("left")}
                      aria-label={
                        isArabic ? "التمرير لليسار" : "Scroll categories left"
                      }
                      className="flex h-9 w-6 items-center justify-center text-ubh-navy transition-colors duration-200 hover:text-ubh-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold disabled:pointer-events-none"
                    >
                      {isArabic ? (
                        <ChevronLeft
                          size={22}
                          strokeWidth={2.5}
                          className="transition-transform duration-300 ease-in-out motion-reduce:transition-none"
                        />
                      ) : (
                        <ChevronLeft
                          size={22}
                          strokeWidth={2.5}
                          className="transition-transform duration-300 ease-in-out motion-reduce:transition-none"
                        />
                      )}
                    </button>
                  </div>

                  {/* Scrollable navigation: always LTR for consistent scrollLeft */}
                  <div
                    ref={navScrollRef}
                    dir={isArabic ? "rtl" : "ltr"}
                    onScroll={updateNavScrollState}
                    className="w-0 min-w-0 flex-1 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    style={{
                      WebkitOverflowScrolling: "touch",
                      scrollbarWidth: "none",
                    }}
                  >
                    <div
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`flex w-max min-w-max flex-nowrap items-center gap-1 px-1 ${
                        !canScrollStart && !canScrollEnd ? "mx-auto" : ""
                      }`}
                    >
                      {navItems.map((item) => {
                        const subItems = getSubItems(item.key);
                        const hasSubmenu = subItems.length > 0;
                        const isActive = activeNav === item.key;

                        return (
                          <div
                            key={item.key}
                            className="relative flex shrink-0 items-center"
                            onPointerEnter={(event) =>
                              openDesktopSubmenu(event, item.key)
                            }
                          >
                            <Link
                              href={item.href}
                              aria-haspopup={hasSubmenu ? true : undefined}
                              aria-expanded={hasSubmenu ? isActive : undefined}
                              className={`flex min-h-11 shrink-0 items-center whitespace-nowrap px-3 text-[13px] font-medium transition-colors duration-200 ${
                                isActive
                                  ? "text-ubh-gold-deep"
                                  : "text-ubh-navy hover:text-ubh-gold-deep"
                              }`}
                            >
                              <span>{item.label}</span>
                            </Link>

                            {hasSubmenu && (
                              <button
                                type="button"
                                aria-label={`${item.label} submenu`}
                                aria-expanded={isActive}
                                onClick={(event) =>
                                  toggleDesktopSubmenu(event, item.key)
                                }
                                className="me-1 flex h-7 w-6 shrink-0 items-center justify-center rounded text-ubh-gold transition-colors duration-200 hover:bg-ubh-gold-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold"
                              >
                                <ChevronDown
                                  size={14}
                                  className={`transition-transform duration-200 ${
                                    isActive ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Physical right arrow: left side in Arabic */}
                  <div
                    aria-hidden={!canScrollEnd}
                    className={`grid shrink-0 overflow-hidden transition-[grid-template-columns,opacity,margin] duration-300 ease-in-out motion-reduce:transition-none ${
                      canScrollEnd
                        ? "ms-1 grid-cols-[24px] opacity-100"
                        : "ms-0 grid-cols-[0px] opacity-0"
                    }`}
                  >
                    <button
                      type="button"
                      tabIndex={canScrollEnd ? 0 : -1}
                      disabled={!canScrollEnd}
                      onClick={() => scrollNavigation("right")}
                      aria-label={
                        isArabic ? "التمرير لليمين" : "Scroll categories right"
                      }
                      className="flex h-9 w-6 items-center justify-center text-ubh-navy transition-colors duration-200 hover:text-ubh-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold disabled:pointer-events-none"
                    >
                      {isArabic ? (
                        <ChevronRight
                          size={22}
                          strokeWidth={2.5}
                          className={`transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
                            canScrollEnd ? "translate-x-0" : "-translate-x-2"
                          }`}
                        />
                      ) : (
                        <ChevronRight
                          size={22}
                          strokeWidth={2.5}
                          className={`transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
                            canScrollEnd ? "translate-x-0" : "translate-x-2"
                          }`}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {desktopMenuReady &&
        activeNav &&
        typeof document !== "undefined" &&
        (() => {
          const item = navItems.find((entry) => entry.key === activeNav);
          const subItems = item ? getSubItems(item.key) : [];
          if (
            !item ||
            subItems.length === 0 ||
            (isScrolled && !showStickyCategories)
          )
            return null;
          return createPortal(
            <div
              dir={isArabic ? "rtl" : "ltr"}
              role="menu"
              onMouseEnter={() => setActiveNav(item.key)}
              onMouseLeave={() => setActiveNav(null)}
              style={{
                top: desktopMenuPosition.top,
                left: desktopMenuPosition.left,
              }}
              className="fixed z-[9999] min-w-56 max-w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-ubh-navy/15"
            >
              {subItems.map((subItem, index) => (
                <Link
                  key={`${item.key}-${index}`}
                  role="menuitem"
                  href={getSubItemHref(item, subItem)}
                  onClick={() => setActiveNav(null)}
                  className="flex min-h-10 items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-ubh-gold-wash hover:text-ubh-navy"
                >
                  <span>
                    {item.key === "publishers"
                      ? ({
                          "international-en":
                            locale === "ar"
                              ? "دوليون – إنجليزي"
                              : "International – English",
                          "international-ar":
                            locale === "ar"
                              ? "دوليون – عربي"
                              : "International – Arabic",
                          "local-en":
                            locale === "ar"
                              ? "محليون – إنجليزي"
                              : "Local – English",
                          "local-ar":
                            locale === "ar"
                              ? "محليون – عربي"
                              : "Local – Arabic",
                        }[subItem] ?? subItem)
                      : subItem}
                  </span>
                  <ArrowRight
                    size={14}
                    className={`shrink-0 text-ubh-gold ${isArabic ? "rotate-180" : ""}`}
                  />
                </Link>
              ))}
            </div>,
            document.body,
          );
        })()}

      {/* Mobile search panel */}
      {mobileSearchOpen && (
        <div
          id="store-mobile-search"
          dir={isArabic ? "rtl" : "ltr"}
          className="relative z-[75] border-b border-slate-200 bg-white px-4 py-3 shadow-sm md:hidden"
        >
          <SearchForm
            locale={locale}
            placeholder={t.search}
            searchLabel={t.search}
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onSubmit={handleSearch}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            inputRef={mobileSearchRef}
            suggestions={suggestions}
            onSuggestionClick={(href) => {
              setSearchQuery("");
              closeMenus();
              router.push(href);
            }}
            className="h-12"
            inputClassName="h-12"
            buttonClassName="h-12 w-12"
          />
        </div>
      )}

      {/* Mobile / tablet backdrop */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[90] cursor-default bg-ubh-navy/35 backdrop-blur-[2px] xl:hidden"
          onClick={closeMenus}
          aria-label={copy[locale].nav.closeMenu}
        />
      )}

      {/* Mobile / tablet drawer */}
      <aside
        id="store-mobile-drawer"
        dir={isArabic ? "rtl" : "ltr"}
        className={`fixed inset-y-0 start-0 z-[100] flex w-[min(88vw,400px)] flex-col bg-white shadow-[8px_0_40px_rgba(7,27,56,0.18)] transition-transform duration-300 ease-out motion-reduce:transition-none xl:hidden ${
          mobileOpen
            ? "translate-x-0"
            : isArabic
              ? "translate-x-full"
              : "-translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        {/* Drawer header */}
        <div className="flex min-h-[72px] shrink-0 items-center justify-between border-b border-slate-200 px-5">
          <Logo store />

          <button
            type="button"
            onClick={closeMenus}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-slate-100 active:bg-slate-200"
            aria-label={copy[locale].nav.closeMenu}
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer search */}
        <div className="shrink-0 border-b border-slate-100 p-4">
          <SearchForm
            locale={locale}
            placeholder={t.search}
            searchLabel={t.search}
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onSubmit={handleSearch}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            suggestions={suggestions}
            onSuggestionClick={(href) => {
              setSearchQuery("");
              closeMenus();
              router.push(href);
            }}
            className="h-11"
          />
        </div>

        {/* Drawer navigation */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="py-2">
            {navItems.map((item) => {
              const subItems = getSubItems(item.key);
              const hasSubmenu = subItems.length > 0;
              const isActive = mobileSubmenu === item.key;

              return (
                <div
                  key={item.key}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <div className="flex items-stretch">
                    <Link
                      href={item.href}
                      className="flex min-h-14 flex-1 items-center px-5 text-[15px] font-semibold text-ubh-ink transition-colors hover:text-ubh-gold-deep"
                      onClick={closeMenus}
                    >
                      {item.label}
                    </Link>

                    {hasSubmenu && (
                      <button
                        type="button"
                        className="flex min-h-14 w-14 shrink-0 items-center justify-center border-s border-slate-100 transition-colors hover:bg-slate-50 active:bg-slate-100"
                        onClick={() => toggleMobileSubmenu(item.key)}
                        aria-label={item.label}
                        aria-expanded={isActive}
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${
                            isActive ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {hasSubmenu && isActive && (
                    <div className="bg-slate-50 px-5 pb-3">
                      {subItems.map((subItem, subIndex) => (
                        <Link
                          key={`${item.key}-${subIndex}`}
                          href={getSubItemHref(item, subItem)}
                          className="flex min-h-11 items-center justify-between gap-4 border-b border-slate-200 py-2.5 text-sm text-slate-600 transition-colors last:border-b-0 hover:text-ubh-gold-deep"
                          onClick={closeMenus}
                        >
                          <span>
                            {item.key === "publishers"
                              ? ({
                                  "international-en":
                                    locale === "ar"
                                      ? "دوليون – إنجليزي"
                                      : "International – English",
                                  "international-ar":
                                    locale === "ar"
                                      ? "دوليون – عربي"
                                      : "International – Arabic",
                                  "local-en":
                                    locale === "ar"
                                      ? "محليون – إنجليزي"
                                      : "Local – English",
                                  "local-ar":
                                    locale === "ar"
                                      ? "محليون – عربي"
                                      : "Local – Arabic",
                                }[subItem] ?? subItem)
                              : subItem}
                          </span>
                          <ArrowRight
                            size={14}
                            className={`shrink-0 ${isArabic ? "rotate-180" : ""}`}
                          />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile account actions */}
          <div className="border-t border-slate-200 p-4">
            <div className="grid grid-cols-3 gap-2">
              <Link
                href={`/${locale}/profile`}
                onClick={closeMenus}
                className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-xl bg-slate-50 text-xs font-medium transition-colors hover:bg-slate-100 hover:text-ubh-gold-deep"
              >
                <UserRound size={19} />
                <span>{t.account}</span>
              </Link>

              <Link
                href={`/${locale}/wishlist`}
                onClick={closeMenus}
                className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-xl bg-slate-50 text-xs font-medium transition-colors hover:bg-slate-100 hover:text-ubh-gold-deep"
              >
                <Heart size={19} />
                <span>{t.wishlist}</span>
              </Link>

              <Link
                href={`/${locale}/cart`}
                onClick={closeMenus}
                className="relative flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-xl bg-slate-50 text-xs font-medium transition-colors hover:bg-slate-100 hover:text-ubh-gold-deep"
              >
                <ShoppingCart size={19} />
                <span>{t.cart}</span>

                {cartCount > 0 && (
                  <span className="absolute end-3 top-2 min-w-4 rounded-full bg-ubh-gold px-1 text-center text-[9px] font-bold leading-4 text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile service information */}
          <div className="border-t border-slate-100 px-5 py-5">
            <div className="space-y-3 text-xs text-slate-500">
              <div className="flex items-center gap-2.5">
                <Truck size={16} className="shrink-0 text-ubh-gold-deep" />
                <span>{t.fastDelivery}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck
                  size={16}
                  className="shrink-0 text-ubh-gold-deep"
                />
                <span>{t.securePayment}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Headphones size={16} className="shrink-0 text-ubh-gold-deep" />
                <span>{t.dedicatedSupport}</span>
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <Link
                href={`/${locale}/help`}
                onClick={closeMenus}
                className="text-sm text-slate-600 transition-colors hover:text-ubh-gold-deep"
              >
                {t.helpCenter}
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
