// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import {
//   ArrowLeft,
//   ArrowRight,
//   BookOpen,
//   UserRound,
// } from "lucide-react";

// import { Container } from "@/components/shared/Container";
// import { isLocale } from "@/lib/i18n";
// import { products, slugifyCatalogName } from "@/lib/store/catalog";
// import { authorProfiles } from "@/data/authors";

// const BOOKS_PREVIEW_LIMIT = 8;

// export default async function AuthorDetailsPage({
//   params,
// }: {
//   params: Promise<{ locale: string; slug: string }>;
// }) {
//   const { locale, slug } = await params;

//   if (!isLocale(locale)) notFound();

//   const isArabic = locale === "ar";
//   const normalizedSlug = slugifyCatalogName(
//     decodeURIComponent(slug)
//   );

//   // Find books by this author and avoid duplicate product cards.
//   const matchingProducts = products.filter((product) =>
//     product.authors?.some(
//       (author) => slugifyCatalogName(author) === normalizedSlug
//     )
//   );

//   const seenProductKeys = new Set<string>();

//   const authorBooks = matchingProducts.filter((product) => {
//     const key = product.slug?.trim() || String(product.id);

//     if (seenProductKeys.has(key)) return false;

//     seenProductKeys.add(key);
//     return true;
//   });

//   const authorName = authorBooks
//     .flatMap((product) => product.authors ?? [])
//     .find(
//       (author) => slugifyCatalogName(author) === normalizedSlug
//     );

//   if (!authorName) notFound();
//   const profile = authorProfiles[slugifyCatalogName(authorName)];

//   const visibleBooks = authorBooks.slice(0, BOOKS_PREVIEW_LIMIT);
//   const hasMoreBooks = authorBooks.length > BOOKS_PREVIEW_LIMIT;

//   const allBooksHref =
//     `/${locale}/shop/products?author=${encodeURIComponent(normalizedSlug)}`;

//   return (
//     <main
//       dir={isArabic ? "rtl" : "ltr"}
//       className="min-h-screen bg-ubh-canvas text-ubh-navy"
//     >
//       <Container>
//         <div className="py-6 sm:py-8 md:py-12">
//           <Link
//             href={`/${locale}/shop`}
//             className="mb-6 inline-flex min-h-10 items-center gap-2 rounded-md text-sm font-medium text-ubh-blue-bright transition-colors hover:text-ubh-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2"
//           >
//             {isArabic ? (
//               <ArrowRight size={16} aria-hidden="true" />
//             ) : (
//               <ArrowLeft size={16} aria-hidden="true" />
//             )}
//             {isArabic ? "العودة إلى المتجر" : "Back to store"}
//           </Link>

//           {/* Author profile */}
//           <section className="relative overflow-hidden rounded-2xl border border-[#e3eaf1] bg-white p-5 shadow-sm sm:p-8 md:p-10">
//             <div
//               aria-hidden="true"
//               className="absolute inset-y-0 start-0 w-1 bg-ubh-gold"
//             />

//             <div className="flex items-center gap-4 sm:gap-6">
//               <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0f4f8] text-ubh-blue-bright sm:h-20 sm:w-20">
//                 <UserRound
//                   size={34}
//                   strokeWidth={1.4}
//                   aria-hidden="true"
//                 />
//               </div>

//               <div className="min-w-0">
//                 <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ubh-gold sm:text-xs">
//                   {isArabic ? "المؤلف" : "AUTHOR"}
//                 </p>

//                 <h1 className="break-words font-serif text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
//                   {authorName}
//                 </h1>

//                 <p className="mt-2 text-sm text-slate-500">
//                   {authorBooks.length}{" "}
//                   {isArabic
//                     ? "كتاب متاح في الكتالوج"
//                     : authorBooks.length === 1
//                       ? "book in our catalogue"
//                       : "books in our catalogue"}
//                 </p>
//               </div>
//             </div>
//             {profile && (
//   <div className="mt-6 border-t border-[#e3eaf1] pt-6">
//     <p className="text-sm leading-7 text-slate-600">
//       {profile.bio}
//     </p>

//     <div className="mt-4 flex flex-wrap gap-2">
//       {profile.expertise.map((item) => (
//         <span
//           key={item}
//           className="rounded-full border border-[#e3eaf1] bg-[#f5f7fa] px-3 py-1.5 text-xs font-medium text-ubh-blue-bright"
//         >
//           {item}
//         </span>
//       ))}
//     </div>
//   </div>
// )}
//           </section>

//           {/* Author's books */}
//           <section className="mt-9 sm:mt-12">
//             <div className="mb-5 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
//               <div>
//                 <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ubh-gold sm:text-xs">
//                   {isArabic
//                     ? "اكتشف المنشورات"
//                     : "EXPLORE PUBLICATIONS"}
//                 </p>

//                 <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
//                   {isArabic
//                     ? `كتب ${authorName}`
//                     : `Books by ${authorName}`}
//                 </h2>

//                 <p className="mt-2 text-sm leading-6 text-slate-500">
//                   {isArabic
//                     ? "اكتشف الكتب والمؤلفات المتاحة لهذا المؤلف."
//                     : "Explore available books and publications by this author."}
//                 </p>
//               </div>

//               {hasMoreBooks && (
//                 <Link
//                   href={allBooksHref}
//                   className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-[#d9e3ee] bg-white px-4 py-2 text-sm font-semibold text-ubh-blue-bright transition-colors hover:border-ubh-gold hover:text-ubh-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2 sm:self-auto"
//                 >
//                   {isArabic ? "عرض جميع الكتب" : "View all books"}
//                   {isArabic ? (
//                     <ArrowLeft size={15} aria-hidden="true" />
//                   ) : (
//                     <ArrowRight size={15} aria-hidden="true" />
//                   )}
//                 </Link>
//               )}
//             </div>

//             {visibleBooks.length > 0 ? (
//               <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-4">
//                 {visibleBooks.map((product) => (
//                   <Link
//                     key={product.slug || String(product.id)}
//                     href={`/${locale}/shop/${product.slug}`}
//                     aria-label={
//                       isArabic
//                         ? `عرض الكتاب ${product.title}`
//                         : `View ${product.title}`
//                     }
//                     className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#e3eaf1] bg-white transition duration-200 hover:-translate-y-0.5 hover:border-ubh-gold/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2"
//                   >
//                     <div className="flex h-44 items-center justify-center overflow-hidden bg-[#f5f7fa] p-3 sm:h-60 sm:p-5">
//                       {product.cover ? (
//                         <Image
//                           src={product.cover}
//                           alt={product.title}
//                           width={180}
//                           height={240}
//                           sizes="(max-width: 639px) 40vw, (max-width: 1023px) 25vw, 180px"
//                           loading="lazy"
//                           className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
//                         />
//                       ) : (
//                         <BookOpen
//                           size={36}
//                           strokeWidth={1.3}
//                           className="text-slate-300"
//                           aria-hidden="true"
//                         />
//                       )}
//                     </div>

//                     <div className="flex flex-1 flex-col p-3 sm:p-4">
//                       <h3 className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 transition-colors group-hover:text-ubh-blue-bright sm:text-sm">
//                         {product.title}
//                       </h3>

//                       {product.publisher && (
//                         <p className="mt-2 line-clamp-1 text-[11px] text-slate-500 sm:text-xs">
//                           {product.publisher}
//                         </p>
//                       )}

//                       <p className="mt-auto pt-4 text-sm font-semibold text-ubh-blue-bright">
//                         {product.currency}{" "}
//                         {Number(product.price).toFixed(2)}
//                       </p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <div className="rounded-xl border border-dashed border-[#d9e2ec] bg-white px-5 py-12 text-center">
//                 <BookOpen
//                   size={32}
//                   strokeWidth={1.3}
//                   className="mx-auto text-slate-300"
//                   aria-hidden="true"
//                 />
//                 <p className="mt-4 text-sm text-slate-500">
//                   {isArabic
//                     ? "لا توجد كتب متاحة لهذا المؤلف حالياً."
//                     : "There are no books currently available for this author."}
//                 </p>
//               </div>
//             )}

//             {hasMoreBooks && (
//               <div className="mt-7 flex justify-center">
//                 <Link
//                   href={allBooksHref}
//                   className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-ubh-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0b2b55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2 sm:w-auto"
//                 >
//                   {isArabic
//                     ? `عرض جميع الكتب (${authorBooks.length})`
//                     : `View all ${authorBooks.length} books`}
//                   {isArabic ? (
//                     <ArrowLeft size={16} aria-hidden="true" />
//                   ) : (
//                     <ArrowRight size={16} aria-hidden="true" />
//                   )}
//                 </Link>
//               </div>
//             )}
//           </section>
//         </div>
//       </Container>
//     </main>
//   );
// }


import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  UserRound,
  LibraryBig,
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
  const normalizedSlug = slugifyCatalogName(decodeURIComponent(slug));

  // Find books by author.
  const matchingProducts = products.filter((product) =>
    product.authors?.some(
      (author) => slugifyCatalogName(author) === normalizedSlug
    )
  );

  // Remove duplicate products.
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

  const backHref = `/${locale}/shop`;

  const text = {
    back: isArabic ? "العودة إلى المتجر" : "Back to store",
    author: isArabic ? "ملف المؤلف" : "AUTHOR PROFILE",
    collection: isArabic ? "منشورات المؤلف" : "AUTHOR COLLECTION",
    books: isArabic ? "الكتب والمؤلفات" : "Books & Publications",
    description: isArabic
      ? "استكشف مجموعة الكتب والمؤلفات المتاحة لهذا المؤلف."
      : "Discover books and publications by this author.",
    book: isArabic ? "كتاب" : "Books",
    available: isArabic ? "في الكتالوج" : "Available in our catalogue",
    viewAll: isArabic ? "عرض جميع الكتب" : "View all books",
    viewBook: isArabic ? "عرض الكتاب" : "View book",
    noBooks: isArabic
      ? "لا توجد كتب متاحة لهذا المؤلف حالياً."
      : "No books are currently available for this author.",
    expertise: isArabic ? "مجالات الخبرة" : "AREAS OF EXPERTISE",
  };

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-[#f7f9fc] text-ubh-navy"
    >
      <Container>
        <div className="py-6 sm:py-8 md:py-10">

          {/* Breadcrumb / Back */}
          {/* <Link
            href={backHref}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-ubh-gold"
          >
            {isArabic ? (
              <ArrowRight size={15} />
            ) : (
              <ArrowLeft size={15} />
            )}
            {text.back}
          </Link> */}

          {/* Author Hero */}
          <section className="relative isolate overflow-hidden rounded-2xl border border-[#e4eaf1] bg-white shadow-sm">

            {/* Decorative background */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 end-0 w-1/2 overflow-hidden"
            >
              <div className="absolute -end-20 -top-32 h-80 w-80 rounded-full bg-[#f3eee4]/70 blur-3xl" />
              <div className="absolute -bottom-32 end-20 h-72 w-72 rounded-full bg-[#edf3f9] blur-3xl" />
            </div>

            <div className="absolute inset-y-0 start-0 w-1 bg-ubh-gold" />

            <div className="relative grid gap-7 p-5 sm:p-8 md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-10">

              {/* Author details */}
              <div className="min-w-0">

                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e9dfca] bg-[#faf7f0] px-3 py-1.5">
                  <UserRound
                    size={13}
                    className="text-[#a8792c]"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#94702f]">
                    {text.author}
                  </span>
                </div>

                <h1 className="max-w-3xl break-words font-serif text-3xl font-semibold leading-tight tracking-tight text-[#102b4e] sm:text-4xl md:text-5xl">
                  {authorName}
                </h1>

                {profile?.bio && (
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                    {profile.bio}
                  </p>
                )}

                {/* Expertise */}
                {profile?.expertise?.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      {text.expertise}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {profile.expertise.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#e2e9f0] bg-white/80 px-3 py-1.5 text-xs font-medium text-[#315477]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Author statistics */}
              <div className="flex items-center gap-4 rounded-xl border border-[#e7edf3] bg-white/85 p-4 shadow-sm backdrop-blur-sm sm:p-5 md:min-w-[190px] md:flex-col md:items-start md:gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f5f0e6] text-[#a8792c]">
                  <LibraryBig size={21} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="font-serif text-3xl font-semibold leading-none text-[#102b4e] sm:text-4xl">
                    {authorBooks.length}
                  </p>

                  <p className="mt-2 text-xs font-medium text-slate-500">
                    {text.available}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Books Collection */}
          <section className="mt-12 sm:mt-16">

            {/* Section Heading */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-px w-7 bg-ubh-gold" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#a8792c] sm:text-xs">
                    {text.collection}
                  </p>
                </div>

                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#102b4e] sm:text-3xl">
                  {text.books}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {text.description}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">

                <span className="rounded-lg border border-[#e2e9f0] bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                  {authorBooks.length} {text.book}
                </span>

                {hasMoreBooks && (
                  <Link
                    href={allBooksHref}
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#dce5ee] bg-white px-4 text-xs font-semibold text-[#244a72] transition hover:border-ubh-gold hover:text-[#a8792c]"
                  >
                    {text.viewAll}
                    {isArabic ? (
                      <ArrowLeft size={14} />
                    ) : (
                      <ArrowRight size={14} />
                    )}
                  </Link>
                )}
              </div>
            </div>

            {/* Product Grid */}
            {visibleBooks.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">

                {visibleBooks.map((product) => (
                  <Link
                    key={product.slug || String(product.id)}
                    href={`/${locale}/shop/${product.slug}`}
                    aria-label={`${text.viewBook}: ${product.title}`}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#e5eaf0] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#d7bd8b] hover:shadow-lg hover:shadow-[#102b4e]/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2"
                  >

                    {/* Book Cover */}
                    <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#f5f7fa] p-4 sm:p-6">

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-[#e9edf3]/40"
                      />

                      {product.cover ? (
                        <Image
                          src={product.cover}
                          alt={product.title}
                          width={240}
                          height={300}
                          sizes="(max-width: 639px) 42vw, (max-width: 1023px) 28vw, 230px"
                          className="relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.05]"
                        />
                      ) : (
                        <BookOpen
                          size={42}
                          strokeWidth={1.2}
                          className="relative z-10 text-slate-300"
                          aria-hidden="true"
                        />
                      )}

                      {/* View indicator */}
                      <span className="absolute bottom-3 end-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[#244a72] opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
                        <ArrowUpRight
                          size={15}
                          className={isArabic ? "-rotate-90" : ""}
                        />
                      </span>
                    </div>

                    {/* Book Information */}
                    <div className="flex flex-1 flex-col p-3.5 sm:p-4">

                      <h3 className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-[#102b4e] transition-colors group-hover:text-[#a8792c] sm:text-sm">
                        {product.title}
                      </h3>

                      {product.publisher && (
                        <p className="mt-2 line-clamp-1 text-[10px] font-medium text-slate-400 sm:text-xs">
                          {product.publisher}
                        </p>
                      )}

                      <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3 mt-4">
                        <p className="text-sm font-bold text-[#244a72]">
                          {product.currency}{" "}
                          {Number(product.price).toFixed(2)}
                        </p>

                        <BookOpen
                          size={15}
                          className="shrink-0 text-slate-300 transition-colors group-hover:text-[#b8822c]"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#dce5ee] bg-white px-5 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f6f9] text-slate-400">
                  <BookOpen size={25} strokeWidth={1.4} />
                </div>

                <p className="mt-5 text-sm font-medium text-slate-600">
                  {text.noBooks}
                </p>
              </div>
            )}

            {/* View All */}
            {hasMoreBooks && (
              <div className="mt-9 flex justify-center">
                <Link
                  href={allBooksHref}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#102b4e] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#193e68] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2 sm:w-auto"
                >
                  {isArabic
                    ? `استكشف جميع الكتب (${authorBooks.length})`
                    : `Explore all ${authorBooks.length} books`}

                  {isArabic ? (
                    <ArrowLeft size={16} />
                  ) : (
                    <ArrowRight size={16} />
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
