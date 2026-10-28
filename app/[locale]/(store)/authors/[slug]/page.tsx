import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  UserRound,
} from "lucide-react";

import { Container } from "@/components/shared/Container";
import { isLocale } from "@/lib/i18n";
import { products, slugifyCatalogName } from "@/lib/store/catalog";
import { authorProfiles } from "@/data/authors";

const BOOKS_PREVIEW_LIMIT = 8;

export default async function AuthorDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) notFound();

  const isArabic = locale === "ar";
  const normalizedSlug = slugifyCatalogName(
    decodeURIComponent(slug)
  );

  // Find books by this author and avoid duplicate product cards.
  const matchingProducts = products.filter((product) =>
    product.authors?.some(
      (author) => slugifyCatalogName(author) === normalizedSlug
    )
  );

  const seenProductKeys = new Set<string>();

  const authorBooks = matchingProducts.filter((product) => {
    const key = product.slug?.trim() || String(product.id);

    if (seenProductKeys.has(key)) return false;

    seenProductKeys.add(key);
    return true;
  });

  const authorName = authorBooks
    .flatMap((product) => product.authors ?? [])
    .find(
      (author) => slugifyCatalogName(author) === normalizedSlug
    );

  if (!authorName) notFound();
  const profile = authorProfiles[slugifyCatalogName(authorName)];

  const visibleBooks = authorBooks.slice(0, BOOKS_PREVIEW_LIMIT);
  const hasMoreBooks = authorBooks.length > BOOKS_PREVIEW_LIMIT;

  const allBooksHref =
    `/${locale}/shop/products?author=${encodeURIComponent(normalizedSlug)}`;

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-ubh-canvas text-ubh-navy"
    >
      <Container>
        <div className="py-6 sm:py-8 md:py-12">
          <Link
            href={`/${locale}/shop`}
            className="mb-6 inline-flex min-h-10 items-center gap-2 rounded-md text-sm font-medium text-ubh-blue-bright transition-colors hover:text-ubh-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2"
          >
            {isArabic ? (
              <ArrowRight size={16} aria-hidden="true" />
            ) : (
              <ArrowLeft size={16} aria-hidden="true" />
            )}
            {isArabic ? "العودة إلى المتجر" : "Back to store"}
          </Link>

          {/* Author profile */}
          <section className="relative overflow-hidden rounded-2xl border border-[#e3eaf1] bg-white p-5 shadow-sm sm:p-8 md:p-10">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 start-0 w-1 bg-ubh-gold"
            />

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0f4f8] text-ubh-blue-bright sm:h-20 sm:w-20">
                <UserRound
                  size={34}
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ubh-gold sm:text-xs">
                  {isArabic ? "المؤلف" : "AUTHOR"}
                </p>

                <h1 className="break-words font-serif text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  {authorName}
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  {authorBooks.length}{" "}
                  {isArabic
                    ? "كتاب متاح في الكتالوج"
                    : authorBooks.length === 1
                      ? "book in our catalogue"
                      : "books in our catalogue"}
                </p>
              </div>
            </div>
            {profile && (
  <div className="mt-6 border-t border-[#e3eaf1] pt-6">
    <p className="text-sm leading-7 text-slate-600">
      {profile.bio}
    </p>

    <div className="mt-4 flex flex-wrap gap-2">
      {profile.expertise.map((item) => (
        <span
          key={item}
          className="rounded-full border border-[#e3eaf1] bg-[#f5f7fa] px-3 py-1.5 text-xs font-medium text-ubh-blue-bright"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
)}
          </section>

          {/* Author's books */}
          <section className="mt-9 sm:mt-12">
            <div className="mb-5 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ubh-gold sm:text-xs">
                  {isArabic
                    ? "اكتشف المنشورات"
                    : "EXPLORE PUBLICATIONS"}
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                  {isArabic
                    ? `كتب ${authorName}`
                    : `Books by ${authorName}`}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {isArabic
                    ? "اكتشف الكتب والمؤلفات المتاحة لهذا المؤلف."
                    : "Explore available books and publications by this author."}
                </p>
              </div>

              {hasMoreBooks && (
                <Link
                  href={allBooksHref}
                  className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-[#d9e3ee] bg-white px-4 py-2 text-sm font-semibold text-ubh-blue-bright transition-colors hover:border-ubh-gold hover:text-ubh-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2 sm:self-auto"
                >
                  {isArabic ? "عرض جميع الكتب" : "View all books"}
                  {isArabic ? (
                    <ArrowLeft size={15} aria-hidden="true" />
                  ) : (
                    <ArrowRight size={15} aria-hidden="true" />
                  )}
                </Link>
              )}
            </div>

            {visibleBooks.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-4">
                {visibleBooks.map((product) => (
                  <Link
                    key={product.slug || String(product.id)}
                    href={`/${locale}/shop/${product.slug}`}
                    aria-label={
                      isArabic
                        ? `عرض الكتاب ${product.title}`
                        : `View ${product.title}`
                    }
                    className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#e3eaf1] bg-white transition duration-200 hover:-translate-y-0.5 hover:border-ubh-gold/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2"
                  >
                    <div className="flex h-44 items-center justify-center overflow-hidden bg-[#f5f7fa] p-3 sm:h-60 sm:p-5">
                      {product.cover ? (
                        <Image
                          src={product.cover}
                          alt={product.title}
                          width={180}
                          height={240}
                          sizes="(max-width: 639px) 40vw, (max-width: 1023px) 25vw, 180px"
                          loading="lazy"
                          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <BookOpen
                          size={36}
                          strokeWidth={1.3}
                          className="text-slate-300"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-3 sm:p-4">
                      <h3 className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 transition-colors group-hover:text-ubh-blue-bright sm:text-sm">
                        {product.title}
                      </h3>

                      {product.publisher && (
                        <p className="mt-2 line-clamp-1 text-[11px] text-slate-500 sm:text-xs">
                          {product.publisher}
                        </p>
                      )}

                      <p className="mt-auto pt-4 text-sm font-semibold text-ubh-blue-bright">
                        {product.currency}{" "}
                        {Number(product.price).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#d9e2ec] bg-white px-5 py-12 text-center">
                <BookOpen
                  size={32}
                  strokeWidth={1.3}
                  className="mx-auto text-slate-300"
                  aria-hidden="true"
                />
                <p className="mt-4 text-sm text-slate-500">
                  {isArabic
                    ? "لا توجد كتب متاحة لهذا المؤلف حالياً."
                    : "There are no books currently available for this author."}
                </p>
              </div>
            )}

            {hasMoreBooks && (
              <div className="mt-7 flex justify-center">
                <Link
                  href={allBooksHref}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-ubh-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0b2b55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2 sm:w-auto"
                >
                  {isArabic
                    ? `عرض جميع الكتب (${authorBooks.length})`
                    : `View all ${authorBooks.length} books`}
                  {isArabic ? (
                    <ArrowLeft size={16} aria-hidden="true" />
                  ) : (
                    <ArrowRight size={16} aria-hidden="true" />
                  )}
                </Link>
              </div>
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}
