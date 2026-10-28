
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  MapPin,
} from "lucide-react";

import { copy, type Locale } from "@/lib/i18n";
import { SafeImage } from "@/components/shared/SafeImage";
import type { Publisher } from "@/data/publishers";

const PAGE_SIZE = 8;

type PublisherDirectoryProps = {
  publishers: readonly Publisher[];
  locale: Locale;
};

export function PublisherDirectory({
  publishers,
  locale,
}: PublisherDirectoryProps) {
  const t = copy[locale].publishers;
  const isArabic = locale === "ar";

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"az" | "za">("az");
  const [page, setPage] = useState(1);

  const filteredPublishers = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLocaleLowerCase(isArabic ? "ar" : "en");

    return [...publishers]
      .filter((publisher) => {
        const searchableText = [
          publisher.name,
          publisher.description,
          publisher.country,
          ...publisher.subjects,
        ]
          .join(" ")
          .toLocaleLowerCase(isArabic ? "ar" : "en");

        return searchableText.includes(normalizedQuery);
      })
      .sort((a, b) => {
        const comparison = a.name.localeCompare(
          b.name,
          isArabic ? "ar" : "en",
          { sensitivity: "base" }
        );

        return sort === "za" ? -comparison : comparison;
      });
  }, [publishers, query, sort, isArabic]);

  const totalPages = Math.ceil(
    filteredPublishers.length / PAGE_SIZE
  );

  const currentPage = Math.min(
    page,
    Math.max(totalPages, 1)
  );

  const visiblePublishers = filteredPublishers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const start =
    filteredPublishers.length === 0
      ? 0
      : (currentPage - 1) * PAGE_SIZE + 1;

  const end = Math.min(
    currentPage * PAGE_SIZE,
    filteredPublishers.length
  );

  function handleSearch(value: string) {
    setQuery(value);
    setPage(1);
  }

  function handleSort(value: "az" | "za") {
    setSort(value);
    setPage(1);
  }

  return (
    <section dir={isArabic ? "rtl" : "ltr"}>
      {/* Search and sorting */}
      <div className="mb-6 rounded-lg border border-ubh-border bg-white p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-md border border-[#dce5ef] px-3 transition-colors focus-within:border-ubh-gold focus-within:ring-2 focus-within:ring-ubh-gold/15">
            <Search
              size={17}
              aria-hidden="true"
              className="shrink-0 text-ubh-muted"
            />

            <input
              type="search"
              value={query}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-sm text-ubh-blue-deep outline-none placeholder:text-[#8194aa]"
            />
          </label>

          <label className="flex h-11 items-center gap-3 rounded-md border border-[#dce5ef] px-3 sm:w-48">
            <span className="shrink-0 text-xs text-[#496481]">
              {t.sortBy}
            </span>

            <select
              value={sort}
              onChange={(event) =>
                handleSort(event.target.value as "az" | "za")
              }
              className="min-w-0 flex-1 bg-transparent text-xs text-ubh-blue-deep outline-none"
              aria-label={t.sortBy}
            >
              <option value="az">{t.sortAZ}</option>
              <option value="za">
                {isArabic ? "من ي إلى أ" : "Z to A"}
              </option>
            </select>
          </label>
        </div>

        <p
          aria-live="polite"
          className="mt-3 text-xs text-ubh-blue-muted"
        >
          {t.results} {start}–{end} {t.of}{" "}
          {filteredPublishers.length} {t.publisherCount}
        </p>
      </div>

      {/* Publisher cards */}
      {visiblePublishers.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {visiblePublishers.map((publisher) => (
            <article
              key={publisher.slug}
              className="group flex min-h-[285px] min-w-0 flex-col rounded-md border border-[#dce5ef] bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-[#c8d8e8] hover:shadow-[0_12px_30px_rgba(6,38,76,0.08)]"
            >
              <Link
                href={`/${locale}/publishers/${publisher.slug}`}
                aria-label={`${t.viewPublisher}: ${publisher.name}`}
                className="flex h-[72px] items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ubh-gold"
              >
                <div className="relative h-[58px] w-full max-w-[170px]">
                  <SafeImage
                    src={publisher.logo}
                    alt={`${publisher.name} logo`}
                    fill
                    sizes="(max-width: 639px) 80vw, 170px"
                    className="object-contain object-left rtl:object-right"
                  />
                </div>
              </Link>

              <h2 className="mt-3 text-sm font-semibold leading-5 text-ubh-blue">
                {publisher.name}
              </h2>

              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ubh-blue-muted">
                {publisher.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {publisher.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="rounded-full bg-[#f0f5f9] px-2 py-1 text-[10px] font-medium text-[#46617f]"
                  >
                    {subject}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-[11px] text-[#4f6887]">
                <MapPin
                  size={13}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span>{publisher.country}</span>
              </div>

              <Link
                href={`/${locale}/publishers/${publisher.slug}`}
                className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-semibold text-ubh-blue-bright transition-colors hover:text-ubh-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ubh-gold"
              >
                {t.viewPublisher}
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className={`transition-transform duration-200 group-hover:translate-x-1 ${
                    isArabic
                      ? "rotate-180 group-hover:-translate-x-1"
                      : ""
                  }`}
                />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-[#dce5ef] bg-white px-5 py-14 text-center">
          <Search
            size={26}
            className="mx-auto mb-3 text-[#8194aa]"
            aria-hidden="true"
          />

          <h2 className="text-base font-semibold text-ubh-blue">
            {isArabic
              ? "لم يتم العثور على ناشرين"
              : "No publishers found"}
          </h2>

          <p className="mt-2 text-sm text-ubh-blue-muted">
            {isArabic
              ? "جرّب البحث باسم ناشر آخر أو بلد مختلف."
              : "Try another publisher name, country, or subject."}
          </p>

          <button
            type="button"
            onClick={() => handleSearch("")}
            className="mt-4 rounded-md bg-ubh-navy px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#123765]"
          >
            {isArabic ? "مسح البحث" : "Clear search"}
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label={
            isArabic ? "صفحات الناشرين" : "Publisher pages"
          }
          className="mt-7 flex flex-wrap items-center justify-center gap-1.5"
        >
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              setPage((p) => Math.max(1, p - 1))
            }
            aria-label={
              isArabic ? "الصفحة السابقة" : "Previous page"
            }
            className="flex h-9 w-9 items-center justify-center rounded border border-[#dce5ef] bg-white text-[#46617f] hover:border-ubh-blue-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isArabic ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              aria-current={
                pageNumber === currentPage ? "page" : undefined
              }
              onClick={() => setPage(pageNumber)}
              className={`flex h-9 min-w-9 items-center justify-center rounded border px-2 text-xs ${
                pageNumber === currentPage
                  ? "border-ubh-blue bg-ubh-blue text-white"
                  : "border-[#dce5ef] bg-white text-[#46617f] hover:border-ubh-blue-deep"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setPage((p) => Math.min(totalPages, p + 1))
            }
            aria-label={
              isArabic ? "الصفحة التالية" : "Next page"
            }
            className="flex h-9 w-9 items-center justify-center rounded border border-[#dce5ef] bg-white text-[#46617f] hover:border-ubh-blue-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isArabic ? (
              <ChevronLeft size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        </nav>
      )}
    </section>
  );
}
