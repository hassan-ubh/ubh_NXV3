"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
} from "lucide-react";

import { Container } from "@/components/shared/Container";
import type { Locale } from "@/lib/i18n";
import { products } from "@/lib/store/catalog";
import type { Product } from "@/lib/store/catalog";
import { ProductCard } from "@/components/store/catalog/productCard";
import { getCategoryKeywords, getCategoryLabel, resolveCategorySlug } from "@/lib/store/categories";


type Collection =
  | "new-releases"
  | "best-sellers"
  | "ubh"
  | "series"
  | "offers"
  | "open-access";
type ProductType = "ebook" | "textbook";
type InitialFilters = {
  q: string;
  category: string;
  collection: string;
  type: string;
  publisher?: string;
  author?: string;
};
type ProductShowProps = {
  locale: Locale;
  initialFilters: InitialFilters;
};
type ExtendedProduct = Product & {
  titleAr?: string;
  descriptionAr?: string;
  authorsAr?: string[];
  productType?: "ebook" | "textbook" | "physical";
  series?: string;
  openAccess?: boolean;
};
type FilterOption = { value: string; label: string };
type FilterPanelProps = {
  locale: Locale;
  subjects: string[];
  publishers: string[];
  languages: string[];
  formats: string[];
  subject: string;
  publisher: string;
  language: string;
  format: string;
  hasFilters: boolean;
  onSubjectChange: (value: string) => void;
  onPublisherChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onFormatChange: (value: string) => void;
  onClear: () => void;
};

const PRODUCTS_PER_PAGE = 12;
const COLLECTIONS = new Set<Collection>([
  "new-releases", "best-sellers", "ubh", "series", "offers", "open-access",
]);
const PRODUCT_TYPES = new Set<ProductType>(["ebook", "textbook"]);

function normalize(value: unknown): string {
  return String(value ?? "")
    .normalize("NFC")
    .toLocaleLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function getLocalizedTitle(product: Product, locale: Locale): string {
  const item = product as ExtendedProduct;
  return locale === "ar" && item.titleAr ? item.titleAr : product.title;
}
function getLocalizedAuthors(product: Product, locale: Locale): string[] {
  const item = product as ExtendedProduct;
  return locale === "ar" && item.authorsAr?.length
    ? item.authorsAr
    : product.authors ?? [];
}
function productMatchesCategory(product: Product, category: string): boolean {
  const slug = resolveCategorySlug(category);
  if (!slug) return false;
  const keywords = getCategoryKeywords(slug).map(normalize);
  const item = product as ExtendedProduct;
  const searchable = normalize([
    ...(product.subjects ?? []), product.category, product.title, item.titleAr,
    product.subtitle, product.description, item.descriptionAr, product.publisher,
    ...(product.authors ?? []),
  ].filter(Boolean).join(" "));
  const tokens = new Set(searchable.split(" "));
  return keywords.some((keyword) => {
    if (!keyword) return false;
    if (keyword.length <= 3) return tokens.has(keyword);
    return searchable.includes(keyword);
  });
}
function isUbhProduct(product: Product): boolean {
  const publisher = normalize(product.publisher);
  return publisher.includes("ubh") ||
    publisher.includes("university book house") ||
    publisher.includes("دار الكتاب الجامعي") ||
    publisher.includes("دار الكتب الجامعية");
}
function matchesProductType(product: Product, type: ProductType): boolean {
  const item = product as ExtendedProduct;
  const explicitType = normalize(item.productType);
  const format = normalize(product.format);
  if (explicitType === type) return true;
  if (type === "ebook") {
    return ["ebook", "e book", "electronic book", "digital book"].some((v) => format.includes(v));
  }
  return false;
}
function isCollectionProduct(product: Product, collection: Collection): boolean {
  const item = product as ExtendedProduct;
  switch (collection) {
    case "new-releases": return Boolean(product.newArrival);
    case "best-sellers": return Boolean(product.bestseller);
    case "ubh": return isUbhProduct(product);
    case "series": return Boolean(item.series?.trim());
    case "offers": return typeof product.oldPrice === "number" && product.oldPrice > product.price;
    case "open-access": return Boolean(item.openAccess);
  }
}
function getSortScore(product: Product): number {
  return Number(Boolean(product.featured)) + Number(Boolean(product.bestseller)) + Number(Boolean(product.newArrival));
}

function FilterSelect({
  id, label, value, options, allLabel, locale, onChange,
}: {
  id: string; label: string; value: string; options: FilterOption[];
  allLabel: string; locale: Locale; onChange: (value: string) => void;
}) {
  const isArabic = locale === "ar";
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</label>
      <div className="relative mt-2">
        <select
          id={id} value={value} onChange={(event) => onChange(event.target.value)}
          className={`h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 text-sm text-ubh-navy outline-none transition focus:border-ubh-gold focus:ring-2 focus:ring-ubh-gold/15 ${isArabic ? "pl-9 pr-3" : "pl-3 pr-9"}`}
        >
          <option value="all">{allLabel}</option>
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <ChevronDown size={15} aria-hidden="true" className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 ${isArabic ? "left-3" : "right-3"}`} />
      </div>
    </div>
  );
}

function FilterPanel(props: FilterPanelProps) {
  const { locale, subjects, publishers, languages, formats, subject, publisher, language, format,
    hasFilters, onSubjectChange, onPublisherChange, onLanguageChange, onFormatChange, onClear } = props;
  const ar = locale === "ar";
  const t = {
    filters: ar ? "التصفية" : "Filters", subject: ar ? "الموضوع" : "Subject",
    publisher: ar ? "الناشر" : "Publisher", language: ar ? "اللغة" : "Language",
    format: ar ? "الصيغة" : "Format", all: ar ? "الكل" : "All",
    clear: ar ? "مسح الكل" : "Clear all",
  };
  const options = (values: string[]) => values.map((value) => ({ value, label: value }));
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-ubh-navy">{t.filters}</h3>
        {hasFilters && <button type="button" onClick={onClear} className="text-xs font-semibold text-ubh-gold-deep hover:text-ubh-navy">{t.clear}</button>}
      </div>
      <div className="mt-5 space-y-5">
        <FilterSelect id={`subject-${locale}`} label={t.subject} value={subject} options={options(subjects)} allLabel={t.all} locale={locale} onChange={onSubjectChange} />
        <FilterSelect id={`publisher-${locale}`} label={t.publisher} value={publisher} options={options(publishers)} allLabel={t.all} locale={locale} onChange={onPublisherChange} />
        <FilterSelect id={`language-${locale}`} label={t.language} value={language} options={options(languages)} allLabel={t.all} locale={locale} onChange={onLanguageChange} />
        <FilterSelect id={`format-${locale}`} label={t.format} value={format} options={options(formats)} allLabel={t.all} locale={locale} onChange={onFormatChange} />
      </div>
    </div>
  );
}


function Pagination({ page, totalPages, locale, onChange }: {
  page: number; totalPages: number; locale: Locale; onChange: (page: number) => void;
}) {
  const ar = locale === "ar";
  if (totalPages <= 1) return null;
  const pages: (number | "…")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 4) pages.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 3) pages.push("…");
    pages.push(totalPages);
  }
  const buttonClass = "flex h-10 min-w-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-ubh-navy transition hover:border-ubh-gold disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <nav aria-label={ar ? "صفحات الكتب" : "Book pages"} className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <button type="button" disabled={page <= 1} onClick={() => onChange(Math.max(1, page - 1))} aria-label={ar ? "السابق" : "Previous page"} className={buttonClass}>{ar ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}</button>
      {pages.map((value, index) => value === "…" ? <span key={`ellipsis-${index}`} className="px-1 text-slate-400">…</span> : (
        <button key={value} type="button" onClick={() => onChange(value)} aria-current={page === value ? "page" : undefined} className={`${buttonClass} ${page === value ? "border-ubh-navy bg-ubh-navy text-white hover:border-ubh-navy" : ""}`}>{value}</button>
      ))}
      <button type="button" disabled={page >= totalPages} onClick={() => onChange(Math.min(totalPages, page + 1))} aria-label={ar ? "التالي" : "Next page"} className={buttonClass}>{ar ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}</button>
    </nav>
  );
}

export function ProductShow({ locale, initialFilters }: ProductShowProps) {
  const isArabic = locale === "ar";
  const [search, setSearch] = useState(initialFilters.q);
  const [categoryFilter, setCategoryFilter] = useState(initialFilters.category);
  const [collection, setCollection] = useState<Collection | "">(
    COLLECTIONS.has(initialFilters.collection as Collection) ? initialFilters.collection as Collection : "",
  );
  const [productType, setProductType] = useState<ProductType | "">(
    PRODUCT_TYPES.has(initialFilters.type as ProductType) ? initialFilters.type as ProductType : "",
  );
  const [subject, setSubject] = useState("all");
  const [publisher, setPublisher] = useState(initialFilters.publisher || "all");
  const [author, setAuthor] = useState(initialFilters.author || "");
  const [language, setLanguage] = useState("all");
  const [format, setFormat] = useState("all");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const t = {
    eyebrow: isArabic ? "كتالوج UBH" : "THE UBH BOOKSTORE",
    title: isArabic ? "جميع الكتب" : "Explore all books",
    description: isArabic
      ? "اكتشف الكتب الأكاديمية والكتب الدراسية والإصدارات من UBH والناشرين الرائدين."
      : "Discover academic books, textbooks and specialist titles from UBH and leading publishers.",
    searchLabel: isArabic ? "ابحث في الكتب" : "Search the catalogue",
    searchPlaceholder: isArabic ? "ابحث بالعنوان أو المؤلف أو الناشر أو ISBN..." : "Search by title, author, publisher or ISBN...",
    filters: isArabic ? "التصفية" : "Filters",
    sort: isArabic ? "ترتيب حسب" : "Sort by",
    featured: isArabic ? "الكتب المميزة" : "Featured",
    newest: isArabic ? "الأحدث" : "Newest",
    priceLow: isArabic ? "السعر: من الأقل إلى الأعلى" : "Price: Low to High",
    priceHigh: isArabic ? "السعر: من الأعلى إلى الأقل" : "Price: High to Low",
    titleSort: isArabic ? "العنوان" : "Title",
    showing: isArabic ? "عرض" : "Showing",
    of: isArabic ? "من" : "of",
    books: isArabic ? "كتابًا" : "books",
    noResults: isArabic ? "لم نعثر على كتب مطابقة" : "No books found",
    noResultsDescription: isArabic ? "جرّب كلمات بحث مختلفة أو أزل بعض عوامل التصفية." : "Try another search term or remove one or more filters to find what you need.",
    clearFilters: isArabic ? "مسح جميع عوامل التصفية" : "Clear all filters",
    closeFilters: isArabic ? "إغلاق التصفية" : "Close filters",
    viewResults: isArabic ? "عرض النتائج" : "Show results",
    activeFilters: isArabic ? "عوامل التصفية النشطة" : "Active filters",
    allBooks: isArabic ? "كل الكتب" : "All books",
    category: isArabic ? "التصنيف" : "Category",
    collection: isArabic ? "المجموعة" : "Collection",
    type: isArabic ? "النوع" : "Type",
    ebook: isArabic ? "كتاب إلكتروني" : "eBook",
    textbook: isArabic ? "كتاب دراسي" : "Textbook",
    newReleases: isArabic ? "إصدارات جديدة" : "New releases",
    bestSellers: isArabic ? "الأكثر مبيعًا" : "Best sellers",
    ubh: isArabic ? "إصدارات UBH" : "UBH titles",
    series: isArabic ? "السلاسل" : "Series",
    offers: isArabic ? "العروض" : "Offers",
    openAccess: isArabic ? "الوصول المفتوح" : "Open access",
    results: isArabic ? "نتيجة" : "results",
  };

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileFiltersOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileFiltersOpen]);

  const subjects = useMemo(() => Array.from(new Set(products.flatMap((p) => p.subjects ?? []))).sort((a, b) => a.localeCompare(b, isArabic ? "ar" : "en")), [isArabic]);
  const publishers = useMemo(() => Array.from(new Set(products.map((p) => p.publisher).filter((v): v is string => Boolean(v)))).sort((a, b) => a.localeCompare(b, isArabic ? "ar" : "en")), [isArabic]);
  const languages = useMemo(() => Array.from(new Set(products.map((p) => p.language).filter((v): v is string => Boolean(v)))).sort((a, b) => a.localeCompare(b, isArabic ? "ar" : "en")), [isArabic]);
  const formats = useMemo(() => Array.from(new Set(products.map((p) => p.format).filter((v): v is string => Boolean(v)))).sort((a, b) => a.localeCompare(b, isArabic ? "ar" : "en")), [isArabic]);

  const filteredProducts = useMemo(() => {
    const query = normalize(search);
    const queryTerms = query.split(" ").filter(Boolean);
    return products.filter((product) => {
      const item = product as ExtendedProduct;
      const searchable = normalize([
        product.title, item.titleAr, product.subtitle, product.description, item.descriptionAr,
        ...(product.authors ?? []), ...(item.authorsAr ?? []), product.publisher, product.publisherSlug,
        product.isbn, product.isbn10, product.barcode, product.sku, ...(product.subjects ?? []),
        product.category, product.language, product.format, item.series,
      ].filter(Boolean).join(" "));
      // Match all query words, allowing e.g. an author name plus a book keyword.
      const matchesSearch = queryTerms.length === 0 || queryTerms.every((term) => searchable.includes(term));
      const categoryMatches = !categoryFilter || productMatchesCategory(product, categoryFilter) ||
        normalize(product.category ?? "") === normalize(categoryFilter) ||
        normalize(product.category ?? "") === normalize(resolveCategorySlug(categoryFilter));
      const subjectMatches = subject === "all" || (product.subjects ?? []).some((value) => normalize(value) === normalize(subject));
      const publisherMatches = publisher === "all" || normalize(product.publisher) === normalize(publisher);
      const languageMatches = language === "all" || normalize(product.language) === normalize(language);
      const formatMatches = format === "all" || normalize(product.format) === normalize(format);
      const collectionMatches = !collection || isCollectionProduct(product, collection);
      const typeMatches = !productType || matchesProductType(product, productType);
      const authorMatches = !author || [...(product.authors ?? []), ...(item.authorsAr ?? [])].some((name) => normalize(name).includes(normalize(author)));
      return matchesSearch && categoryMatches && subjectMatches && publisherMatches && authorMatches && languageMatches && formatMatches && collectionMatches && typeMatches;
    }).sort((a, b) => {
      switch (sort) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "newest": return (b.publicationYear ?? 0) - (a.publicationYear ?? 0);
        case "title": return getLocalizedTitle(a, locale).localeCompare(getLocalizedTitle(b, locale), isArabic ? "ar" : "en");
        default: return getSortScore(b) - getSortScore(a) || getLocalizedTitle(a, locale).localeCompare(getLocalizedTitle(b, locale), isArabic ? "ar" : "en");
      }
    });
  }, [search, categoryFilter, subject, publisher, author, language, format, collection, productType, sort, locale, isArabic]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginatedProducts = useMemo(() => filteredProducts.slice((safePage - 1) * PRODUCTS_PER_PAGE, safePage * PRODUCTS_PER_PAGE), [filteredProducts, safePage]);
  const startItem = filteredProducts.length ? (safePage - 1) * PRODUCTS_PER_PAGE + 1 : 0;
  const endItem = Math.min(safePage * PRODUCTS_PER_PAGE, filteredProducts.length);
  const hasFilters = Boolean(search || categoryFilter || collection || productType || subject !== "all" || publisher !== "all" || author || language !== "all" || format !== "all");

  function resetPage() { setPage(1); }
  function clearFilters() {
    setSearch(""); setCategoryFilter(""); setCollection(""); setProductType("");
    setSubject("all"); setPublisher("all"); setAuthor(""); setLanguage("all"); setFormat("all");
    setSort("featured"); setPage(1);
  }
  const filterPanelProps: FilterPanelProps = {
    locale, subjects, publishers, languages, formats, subject, publisher, language, format, hasFilters,
    onSubjectChange: (value) => { setSubject(value); resetPage(); },
    onPublisherChange: (value) => { setPublisher(value); resetPage(); },
    onLanguageChange: (value) => { setLanguage(value); resetPage(); },
    onFormatChange: (value) => { setFormat(value); resetPage(); },
    onClear: clearFilters,
  };

  const collectionLabels: Record<Collection, string> = {
    "new-releases": t.newReleases, "best-sellers": t.bestSellers, ubh: t.ubh,
    series: t.series, offers: t.offers, "open-access": t.openAccess,
  };
  const activeChips: { key: string; label: string; clear: () => void }[] = [];
  if (search) activeChips.push({ key: "search", label: `${isArabic ? "بحث" : "Search"}: ${search}`, clear: () => { setSearch(""); resetPage(); } });
  if (categoryFilter) activeChips.push({ key: "category", label: `${t.category}: ${getCategoryLabel(categoryFilter, locale)}`, clear: () => { setCategoryFilter(""); resetPage(); } });
  if (collection) activeChips.push({ key: "collection", label: collectionLabels[collection], clear: () => { setCollection(""); resetPage(); } });
  if (productType) activeChips.push({ key: "type", label: productType === "ebook" ? t.ebook : t.textbook, clear: () => { setProductType(""); resetPage(); } });
  if (subject !== "all") activeChips.push({ key: "subject", label: subject, clear: () => { setSubject("all"); resetPage(); } });
  if (publisher !== "all") activeChips.push({ key: "publisher", label: publisher, clear: () => { setPublisher("all"); resetPage(); } });
  if (author) activeChips.push({ key: "author", label: `${isArabic ? "المؤلف" : "Author"}: ${author}`, clear: () => { setAuthor(""); resetPage(); } });
  if (language !== "all") activeChips.push({ key: "language", label: language, clear: () => { setLanguage("all"); resetPage(); } });
  if (format !== "all") activeChips.push({ key: "format", label: format, clear: () => { setFormat("all"); resetPage(); } });

  return (
    <section id="all-books" dir={isArabic ? "rtl" : "ltr"} className="min-h-[70vh] bg-ubh-canvas pb-16 pt-8 sm:pb-20 sm:pt-12">
      <Container>
        <header className="relative overflow-hidden rounded-3xl bg-ubh-navy px-5 py-8 text-white sm:px-9 sm:py-10 lg:px-12 lg:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10 sm:h-80 sm:w-80" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-5 -top-14 h-48 w-48 rounded-full border border-ubh-gold/35 sm:h-64 sm:w-64" />
          <div className="relative max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ubh-gold-soft">{t.eyebrow}</p>
            <h1 className="mt-3 font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">{t.title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">{t.description}</p>

          </div>
        </header>

        <div className="mt-7 flex flex-wrap gap-2" aria-label={isArabic ? "تصفح المجموعات" : "Browse collections"}>
          {([
            ["", t.allBooks], ["new-releases", t.newReleases], ["best-sellers", t.bestSellers],
            ["ubh", t.ubh], ["offers", t.offers], ["open-access", t.openAccess],
          ] as [string, string][]).map(([value, label]) => (
            <button key={value || "all"} type="button" onClick={() => { setCollection(value as Collection | ""); resetPage(); }} className={`rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${collection === value ? "border-ubh-navy bg-ubh-navy text-white" : "border-slate-200 bg-white text-slate-600 hover:border-ubh-gold hover:text-ubh-navy"}`}>{label}</button>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => setMobileFiltersOpen(true)} aria-expanded={mobileFiltersOpen} aria-controls="mobile-catalog-filters" className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-ubh-navy transition hover:border-ubh-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold lg:hidden"><Filter size={16} />{t.filters}</button>
            <p aria-live="polite" className="text-sm text-slate-500">{t.showing} <span className="font-bold text-ubh-navy">{startItem}–{endItem}</span> {t.of} <span className="font-bold text-ubh-navy">{filteredProducts.length}</span> {t.books}</p>
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} aria-hidden="true" className="shrink-0 text-slate-400" />
            <label htmlFor="product-sort" className="shrink-0 text-xs text-slate-500">{t.sort}</label>
            <div className="relative min-w-0 flex-1 sm:flex-none">
              <select id="product-sort" value={sort} onChange={(event) => { setSort(event.target.value); resetPage(); }} className={`h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 text-sm font-medium text-ubh-navy outline-none focus:border-ubh-gold ${isArabic ? "pl-9 pr-3" : "pl-3 pr-9"}`}>
                <option value="featured">{t.featured}</option><option value="newest">{t.newest}</option><option value="price-low">{t.priceLow}</option><option value="price-high">{t.priceHigh}</option><option value="title">{t.titleSort}</option>
              </select>
              <ChevronDown size={15} aria-hidden="true" className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 ${isArabic ? "left-3" : "right-3"}`} />
            </div>
          </div>
        </div>

        {activeChips.length > 0 && <div className="mt-4" aria-label={t.activeFilters}>
          <div className="mb-2 flex items-center justify-between gap-3"><p className="text-xs font-semibold text-slate-500">{t.activeFilters}</p><button type="button" onClick={clearFilters} className="text-xs font-semibold text-ubh-gold-deep hover:text-ubh-navy">{t.clearFilters}</button></div>
          <div className="flex flex-wrap gap-2">{activeChips.map((chip) => <button key={chip.key} type="button" onClick={chip.clear} className="inline-flex max-w-full items-center gap-2 rounded-full border border-ubh-gold/35 bg-ubh-gold/10 px-3 py-1.5 text-xs font-medium text-ubh-navy hover:bg-ubh-gold/20"><span className="truncate">{chip.label}</span><X size={13} className="shrink-0" /></button>)}</div>
        </div>}

        <div className="mt-7 grid gap-7 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><FilterPanel {...filterPanelProps} /></div>
          </aside>
          <div className="min-w-0">
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 items-stretch gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-8 xl:grid-cols-4 xl:gap-x-5 xl:gap-y-9">
                {paginatedProducts.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center sm:py-20">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500"><Search size={24} /></div>
                <h2 className="mt-5 font-serif text-2xl text-ubh-navy">{t.noResults}</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">{t.noResultsDescription}</p>
                <button type="button" onClick={clearFilters} className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-ubh-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0a2a55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2"><RotateCcw size={15} />{t.clearFilters}</button>
              </div>
            )}
            <Pagination page={safePage} totalPages={totalPages} locale={locale} onChange={setPage} />
          </div>
        </div>
      </Container>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button type="button" aria-label={t.closeFilters} className="absolute inset-0 bg-ubh-navy/55 backdrop-blur-[2px]" onClick={() => setMobileFiltersOpen(false)} />
          <section id="mobile-catalog-filters" role="dialog" aria-modal="true" aria-label={t.filters} dir={isArabic ? "rtl" : "ltr"} className={`absolute bottom-0 top-0 flex w-[min(390px,92vw)] flex-col overflow-hidden bg-white shadow-2xl ${isArabic ? "left-0" : "right-0"}`}>
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div><h2 className="font-serif text-2xl text-ubh-navy">{t.filters}</h2><p className="mt-1 text-xs text-slate-500">{filteredProducts.length} {t.results}</p></div>
              <button type="button" onClick={() => setMobileFiltersOpen(false)} aria-label={t.closeFilters} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-ubh-navy hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain p-6"><FilterPanel {...filterPanelProps} /></div>
            <div className="flex gap-3 border-t border-slate-200 p-5">
              <button type="button" onClick={clearFilters} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-ubh-navy hover:border-ubh-gold">{t.clearFilters}</button>
              <button type="button" onClick={() => setMobileFiltersOpen(false)} className="flex-1 rounded-xl bg-ubh-navy px-4 py-3 text-sm font-semibold text-white hover:bg-[#0a2a55]">{t.viewResults}</button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
