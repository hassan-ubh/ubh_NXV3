// // // "use client";

// // // import Link from "next/link";
// // // import Image from "next/image";
// // // import { useEffect, useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { slugifyCatalogName, products as allProducts } from "@/lib/store/catalog";
// // // import type { Product } from "@/lib/store/catalog";
// // // import { ProductCarousel } from "@/components/store/ProductCarousel";

// // // import {
// // //   ArrowLeft,
// // //   ArrowRight,
// // //   Heart,
// // //   Minus,
// // //   Plus,
// // //   ShoppingCart,
// // //   Truck,
// // //   ShieldCheck,
// // //   RotateCcw,
// // //   Share2,
// // //   MapPin,
// // //   BookOpen,
// // // } from "lucide-react";

// // // import { copy, type Locale } from "@/lib/i18n";
// // // import { publishers as knownPublishers } from "@/lib/data";

// // // import { Container } from "@/components/shared/Container";
// // // import { useCart } from "@/components/store/CartProvider";

// // // import { ProductGallery } from "@/components/store/ProductGallery";
// // // import { ProductDescription } from "@/components/store/ProductDescription";
// // // import { ProductReviews } from "@/components/store/ProductReviews";
// // // import { StickyMobilePurchaseBar } from "@/components/store/StickyMobilePurchaseBar";
// // // import { CartNotification } from "@/components/store/CartNotification";

// // // /* ==========================================================================
// // //    PRODUCT PAGE
// // //    ========================================================================== */

// // // export default function ProductDetailsClient({
// // //   locale,
// // //   product,
// // // }: {
// // //   locale: Locale;
// // //   product: Product;
// // // }) {
// // //   const router = useRouter();
// // //   const t = copy[locale].product;
// // //   const isArabic = locale === "ar";

// // //   const samePublisherProducts = allProducts
// // //     .filter((item) => {
// // //       if (item.id === product.id) return false;
// // //       if (product.publisherSlug && item.publisherSlug) {
// // //         return item.publisherSlug === product.publisherSlug;
// // //       }
// // //       return (
// // //         item.publisher.trim().toLocaleLowerCase() ===
// // //         product.publisher.trim().toLocaleLowerCase()
// // //       );
// // //     })
// // //     .slice(0, 8);

// // //   const authorKeys = new Set(
// // //     product.authors
// // //       .map((author) => author.trim().toLocaleLowerCase())
// // //       .filter(Boolean),
// // //   );
// // //   const sameAuthorProducts = allProducts
// // //     .filter(
// // //       (item) =>
// // //         item.id !== product.id &&
// // //         !samePublisherProducts.some((book) => book.id === item.id) &&
// // //         item.authors.some((author) =>
// // //           authorKeys.has(author.trim().toLocaleLowerCase()),
// // //         ),
// // //     )
// // //     .slice(0, 8);

// // //   const subjectKeys = new Set(
// // //     product.subjects
// // //       .map((subject) => subject.trim().toLocaleLowerCase())
// // //       .filter(Boolean),
// // //   );
// // //   const relatedProducts = allProducts
// // //     .filter(
// // //       (item) =>
// // //         item.id !== product.id &&
// // //         !samePublisherProducts.some((book) => book.id === item.id) &&
// // //         !sameAuthorProducts.some((book) => book.id === item.id) &&
// // //         item.subjects.some((subject) =>
// // //           subjectKeys.has(subject.trim().toLocaleLowerCase()),
// // //         ),
// // //     )
// // //     .slice(0, 8);

// // //   /* ------------------------------------------------------------------------
// // //      STATE
// // //      ------------------------------------------------------------------------ */

// // //   /* ------------------------------------------------------------------------
// // //    STATE
// // //    ------------------------------------------------------------------------ */
// // //   const [quantity, setQuantity] = useState(1);
// // //   const [wishlist, setWishlist] = useState(false);
// // //   useEffect(() => {
// // //     try {
// // //       const saved = JSON.parse(
// // //         localStorage.getItem("ubh-wishlist") || "[]",
// // //       ) as string[];
// // //       setWishlist(saved.includes(product.id));
// // //     } catch {
// // //       setWishlist(false);
// // //     }
// // //   }, [product.id]);
// // //   const toggleWishlist = () => {
// // //     try {
// // //       const saved = JSON.parse(
// // //         localStorage.getItem("ubh-wishlist") || "[]",
// // //       ) as string[];
// // //       const next = saved.includes(product.id)
// // //         ? saved.filter((id) => id !== product.id)
// // //         : [...saved, product.id];
// // //       localStorage.setItem("ubh-wishlist", JSON.stringify(next));
// // //       setWishlist(next.includes(product.id));
// // //       window.dispatchEvent(new Event("ubh-wishlist-updated"));
// // //     } catch {
// // //       setWishlist((current) => !current);
// // //     }
// // //   };
// // //   const [cartMessage, setCartMessage] = useState(false);

// // //   const { addToCart: addProductToCart } = useCart();

// // //   // const handleAddToCart = () => {
// // //   //   const added = addProductToCart(product, quantity);

// // //   //   if (!added) {
// // //   //     return;
// // //   //   }

// // //   //   setCartMessage(true);

// // //   //   setTimeout(() => {
// // //   //     setCartMessage(false);
// // //   //   }, 3000);
// // //   // };
// // //   const handleAddToCart = () => {
// // //     const added = addProductToCart(product, quantity);

// // //     if (added) {
// // //       setCartMessage(true);
// // //     }
// // //   };

// // //   const handleBuyNow = () => {
// // //     if (product.stock < quantity || product.stock < 1) return;
// // //     const added = addProductToCart(product, quantity);
// // //     if (added) router.push(`/${locale}/checkout`);
// // //   };

// // //   const handleShare = async () => {
// // //     const url = window.location.href;
// // //     try {
// // //       if (navigator.share) {
// // //         await navigator.share({ title: product.title, url });
// // //         return;
// // //       }
// // //       await navigator.clipboard.writeText(url);
// // //       setCartMessage(false);
// // //     } catch (error) {
// // //       if (error instanceof Error && error.name === "AbortError") return;
// // //       try {
// // //         await navigator.clipboard.writeText(url);
// // //       } catch {
// // //         /* Clipboard may be unavailable. */
// // //       }
// // //     }
// // //   };

// // //   /* ------------------------------------------------------------------------
// // //      DISCOUNT
// // //      ------------------------------------------------------------------------ */

// // //   const discount =
// // //     product.oldPrice && product.oldPrice > product.price
// // //       ? Math.round(
// // //           ((product.oldPrice - product.price) / product.oldPrice) * 100,
// // //         )
// // //       : 0;

// // //   /* ------------------------------------------------------------------------
// // //      CART
// // //      ------------------------------------------------------------------------ */

// // //   /* ------------------------------------------------------------------------
// // //      QUANTITY
// // //      ------------------------------------------------------------------------ */

// // //   const decreaseQuantity = () => {
// // //     setQuantity((current) => Math.max(1, current - 1));
// // //   };

// // //   const increaseQuantity = () => {
// // //     setQuantity((current) => Math.min(product.stock, current + 1));
// // //   };

// // //   /* ------------------------------------------------------------------------
// // //      RENDER
// // //      ------------------------------------------------------------------------ */

// // //   return (
// // //     <>
// // //       {/* ================================================================== */}
// // //       {/* HEADER                                                             */}
// // //       {/* ================================================================== */}

// // //       <header
// // //         dir={isArabic ? "rtl" : "ltr"}
// // //         className="bg-ubh-navy text-white"
// // //       >
// // //         {/*
// // //         <Container>
// // //           <div className="pb-6 pt-4">
// // //             <div className="flex items-center gap-2 text-[10px] text-white/50">
// // //               <Link href={`/${locale}`} className="hover:text-white">
// // //                 {t.home}
// // //               </Link>

// // //               <span>›</span>

// // //               <Link href={`/${locale}/shop`} className="hover:text-white">
// // //                 {t.shop}
// // //               </Link>

// // //               <span>›</span>

// // //               <span className="max-w-[250px] truncate text-white/80">
// // //                 {product.title}
// // //               </span>
// // //             </div>
// // //           </div>
// // //         </Container>
// // //          */}

// // //       </header>

// // //       {/* ================================================================== */}
// // //       {/* MAIN                                                               */}
// // //       {/* ================================================================== */}

// // //       <main
// // //         dir={isArabic ? "rtl" : "ltr"}
// // //         className="bg-ubh-canvas pb-20 lg:pb-0"
// // //       >
// // //         <Container>
// // //           <div className="py-8 md:py-12">
// // //             {/* Back */}
// // //             {/* <Link
// // //               href={`/${locale}/shop`}
// // //               className="mb-8 inline-flex items-center gap-2 text-[10px] font-semibold text-ubh-blue-bright hover:text-ubh-gold"
// // //             >
// // //               {isArabic ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}

// // //               {t.backToShop}
// // //             </Link> */}

// // //             {/* ============================================================ */}
// // //             {/* PRODUCT AREA                                                  */}
// // //             {/* ============================================================ */}

// // //             {/* <div className="grid gap-10 lg:grid-cols-[460px_1fr] xl:grid-cols-[980px_minmax(0,1fr)]"> */}
// // //             <div className="grid gap-10 lg:grid-cols-[500px_1fr]">
// // //               {/* ========================================================== */}
// // //               {/* IMAGE                                                       */}
// // //               {/* ========================================================== */}

// // //               <div className="min-w-0">
// // //                 <div className="relative">
// // //                   {discount > 0 && (
// // //                     <span
// // //                       className={`absolute top-4 z-20 rounded-full bg-ubh-gold px-3 py-1.5 text-xs font-bold text-white ${
// // //                         isArabic ? "right-4" : "left-4"
// // //                       }`}
// // //                     >
// // //                       -{discount}%
// // //                     </span>
// // //                   )}

// // //                   <button
// // //                     type="button"
// // //                     onClick={toggleWishlist}
// // //                     aria-label={wishlist ? t.removeFromWishlist : t.addToWishlist}
// // //                     className={`absolute top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-ubh-border bg-white text-ubh-muted shadow-sm transition hover:text-ubh-gold ${
// // //                       isArabic ? "left-4" : "right-4"
// // //                     }`}
// // //                   >
// // //                     <Heart size={18} fill={wishlist ? "currentColor" : "none"} />
// // //                   </button>

// // //                   <ProductGallery
// // //   locale={locale}
// // //   title={product.title}
// // //   cover={product.cover}
// // //   images={product.images}
// // // />
// // //                 </div>

// // //                 <div className="mt-4 grid grid-cols-3 gap-2">
// // //                   <TrustCard icon={<ShieldCheck size={17} />} title={t.genuine} />
// // //                   <TrustCard icon={<Truck size={17} />} title={t.uaeDelivery} />
// // //                   <TrustCard icon={<RotateCcw size={17} />} title={t.support} />
// // //                 </div>
// // //               </div>

// // //               {/* ========================================================== */}
// // //               {/* INFORMATION                                                  */}
// // //               {/* ========================================================== */}

// // //               <div className="lg:pt-2">
// // //                 {/* Publisher */}
// // //                 {/* <div className="flex items-center gap-2">
// // //                   <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ubh-gold">
// // //                     {product.publisher}
// // //                   </span>

// // //                   <span className="h-1 w-1 rounded-full bg-ubh-gold" />

// // //                   <span className="text-[10px] text-ubh-muted-light">
// // //                     {t.academicBook}
// // //                   </span>
// // //                 </div> */}
// // //                 {/* Publisher */}
// // //                 <div className="flex items-center gap-2">
// // //                   <Link
// // //                     href={`/${locale}/publishers/${product.publisherSlug}?source=store`}
// // //                     className="text-[10px] font-bold uppercase tracking-[0.18em] text-ubh-gold transition-colors hover:text-ubh-blue"
// // //                   >
// // //                     {product.publisher}
// // //                   </Link>

// // //                   <span className="h-1 w-1 rounded-full bg-ubh-gold" />

// // //                   <span className="text-[10px] text-ubh-muted-light">
// // //                     {t.academicBook}
// // //                   </span>
// // //                 </div>

// // //                 {/* Title */}
// // //                 <h1 className="mt-3 font-serif text-3xl leading-tight text-ubh-blue md:text-4xl xl:text-[46px]">
// // //                   {product.title}
// // //                 </h1>

// // //                 {/* Subtitle */}
// // //                 {product.subtitle && (
// // //                   <p className="mt-4 max-w-2xl text-sm leading-7 text-ubh-muted">
// // //                     {product.subtitle}
// // //                   </p>
// // //                 )}

// // //                 {/* Authors */}
// // //                 {/* <div className="mt-5">
// // //                   <span className="text-[9px] font-semibold uppercase tracking-wider text-ubh-muted-light">
// // //                     {t.authors}
// // //                   </span>

// // //                   <p className="mt-1 text-xs leading-6 text-ubh-blue-muted">
// // //                     {product.authors.join(", ")}
// // //                   </p>
// // //                 </div> */}
// // //                 {/* Authors */}
// // //                 <div className="mt-5">
// // //                   <span className="text-[9px] font-semibold uppercase tracking-wider text-ubh-muted-light">
// // //                     {t.authors}
// // //                   </span>

// // //                   <p className="mt-1 text-xs leading-6 text-ubh-blue-muted">
// // //                     {product.authors.map((author, index) => (
// // //                       <span key={author}>
// // //                         {index > 0 && ", "}

// // //                         <Link
// // //                           href={`/${locale}/authors/${slugifyCatalogName(author)}`}
// // //                           className="transition-colors hover:text-ubh-gold hover:underline"
// // //                         >
// // //                           {author}
// // //                         </Link>
// // //                       </span>
// // //                     ))}
// // //                   </p>
// // //                 </div>

// // //                 {/* ISBN / Edition */}
// // //                 <div className="mt-5 flex flex-wrap gap-5 border-y border-[#e4eaf0] py-4">
// // //                   <span className="text-[10px] text-ubh-muted">
// // //                     {t.isbn}:{" "}
// // //                     <strong className="text-ubh-blue-muted">{product.isbn}</strong>
// // //                   </span>

// // //                   {product.edition && (
// // //                     <span className="text-[10px] text-ubh-muted">
// // //                       {t.edition}:{" "}
// // //                       <strong className="text-ubh-blue-muted">
// // //                         {product.edition}
// // //                       </strong>
// // //                     </span>
// // //                   )}
// // //                 </div>

// // //                 {/* Price */}
// // //                 <div className="mt-7">
// // //                   <div className="flex items-end gap-3">
// // //                     <span className="text-3xl font-bold text-ubh-blue">
// // //                       {product.currency} {product.price.toFixed(2)}
// // //                     </span>

// // //                     {product.oldPrice && product.oldPrice > product.price && (
// // //                       <span className="pb-1 text-sm text-[#9aabc0] line-through">
// // //                         {product.currency} {product.oldPrice.toFixed(2)}
// // //                       </span>
// // //                     )}
// // //                   </div>

// // //                   {discount > 0 && product.oldPrice && (
// // //                     <p className="mt-1 text-[10px] font-semibold text-[#3c7b58]">
// // //                       {t.save} {product.currency}{" "}
// // //                       {(product.oldPrice - product.price).toFixed(2)}
// // //                     </p>
// // //                   )}
// // //                 </div>

// // //                 {/* Stock */}
// // //                 <div className="mt-5">
// // //                   {product.stock > 0 ? (
// // //                     <div className="flex items-center gap-2 text-[10px] font-semibold text-[#3c7b58]">
// // //                       <span className="h-2 w-2 rounded-full bg-[#3c7b58]" />

// // //                       {t.inStock}

// // //                       <span className="font-normal text-ubh-muted-light">
// // //                         — {product.stock} {t.available}
// // //                       </span>
// // //                     </div>
// // //                   ) : (
// // //                     <span className="text-xs font-semibold text-red-600">
// // //                       {t.outOfStock}
// // //                     </span>
// // //                   )}
// // //                 </div>

// // //                 {/* ======================================================== */}
// // //                 {/* BUYING AREA                                                */}
// // //                 {/* ======================================================== */}

// // //                 {product.stock > 0 && (
// // //                   <div className="mt-6">
// // //                     <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-ubh-muted">
// // //                       {t.quantity}
// // //                     </p>

// // //                     <div className="flex flex-col gap-3 sm:flex-row">
// // //                       {/* Quantity */}
// // //                       <div className="flex h-12 w-fit items-center rounded border border-[#d8e1ea] bg-white">
// // //                         <button
// // //                           type="button"
// // //                           onClick={decreaseQuantity}
// // //                           disabled={quantity === 1}
// // //                           aria-label="Decrease quantity"
// // //                           className="flex h-full w-11 items-center justify-center text-ubh-blue-muted hover:text-ubh-gold disabled:opacity-30"
// // //                         >
// // //                           <Minus size={15} />
// // //                         </button>

// // //                         <span className="w-10 text-center text-sm font-semibold text-ubh-blue">
// // //                           {quantity}
// // //                         </span>

// // //                         <button
// // //                           type="button"
// // //                           onClick={increaseQuantity}
// // //                           disabled={quantity >= product.stock}
// // //                           aria-label="Increase quantity"
// // //                           className="flex h-full w-11 items-center justify-center text-ubh-blue-muted hover:text-ubh-gold disabled:opacity-30"
// // //                         >
// // //                           <Plus size={15} />
// // //                         </button>
// // //                       </div>

// // //                       {/* Add to Cart */}
// // //                       <button
// // //                         type="button"
// // //                         onClick={handleAddToCart}
// // //                         className="flex h-12 flex-1 items-center justify-center gap-2 rounded bg-ubh-blue px-7 text-xs font-bold text-white transition hover:bg-ubh-blue-deep"
// // //                       >
// // //                         <ShoppingCart size={17} />

// // //                         {cartMessage ? t.addedToCart : t.addToCart}
// // //                       </button>

// // //                       {/* Buy Now */}
// // //                       <button
// // //                         type="button"
// // //                         onClick={handleBuyNow}
// // //                         className="flex h-12 flex-1 items-center justify-center gap-2 rounded bg-ubh-gold-light px-7 text-xs font-bold text-white transition hover:bg-ubh-gold disabled:cursor-not-allowed disabled:opacity-50"
// // //                       >
// // //                         {t.buyNow}
// // //                         {isArabic ? (
// // //                           <ArrowLeft size={15} />
// // //                         ) : (
// // //                           <ArrowRight size={15} />
// // //                         )}
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 )}

// // //                 {/* Wishlist / Share */}
// // //                 <div className="mt-4 flex gap-5">
// // //                   <button
// // //                     type="button"
// // //                     onClick={toggleWishlist}
// // //                     className="flex items-center gap-2 text-[10px] font-semibold text-ubh-muted hover:text-ubh-gold"
// // //                   >
// // //                     <Heart
// // //                       size={14}
// // //                       fill={wishlist ? "currentColor" : "none"}
// // //                     />

// // //                     {wishlist ? t.addedToWishlist : t.addToWishlist}
// // //                   </button>

// // //                   <button
// // //                     type="button"
// // //                     onClick={handleShare}
// // //                     className="flex items-center gap-2 text-[10px] font-semibold text-ubh-muted hover:text-ubh-blue-bright"
// // //                   >
// // //                     <Share2 size={14} />
// // //                     {t.share}
// // //                   </button>
// // //                 </div>

// // //                 {/* Delivery */}
// // //                 <div className="mt-7 overflow-hidden rounded-lg border border-ubh-border bg-white">
// // //                   <div className="flex gap-4 border-b border-[#edf1f5] p-5">
// // //                     <Truck size={20} className="shrink-0 text-ubh-gold" />

// // //                     <div>
// // //                       <p className="text-xs font-bold text-ubh-blue">
// // //                         {t.deliveryTitle}
// // //                       </p>

// // //                       <p className="mt-1 text-[10px] leading-5 text-ubh-muted">
// // //                         {t.deliveryDescription}
// // //                       </p>
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex gap-4 p-5">
// // //                     <MapPin size={20} className="shrink-0 text-ubh-gold" />

// // //                     <div>
// // //                       <p className="text-xs font-bold text-ubh-blue">
// // //                         {t.ubh}
// // //                       </p>

// // //                       <p className="mt-1 text-[10px] text-ubh-muted">
// // //                         {t.location}
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* ============================================================ */}
// // //             {/* LOWER INFORMATION                                             */}
// // //             {/* ============================================================ */}

// // //             <div className="mt-14 grid gap-7 lg:grid-cols-[1fr_320px]">
// // //               <div className="space-y-6">
// // //                 {/* Expandable book description */}
// // //                 <ProductDescription
// // //                   title={t.aboutBook}
// // //                   description={product.description}
// // //                   locale={locale}
// // //                 />

// // //                 {/* Subjects */}
// // //                 <section className="rounded-lg border border-ubh-border bg-white p-6 md:p-8">
// // //                   <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-ubh-gold">
// // //                     {t.academicCoverage}
// // //                   </span>

// // //                   <h2 className="mt-2 font-serif text-2xl text-ubh-blue">
// // //                     {t.subjectAreas}
// // //                   </h2>

// // //                   <div className="mt-5 flex flex-wrap gap-2">
// // //                     {product.subjects.map((subject) => (
// // //                       <span
// // //                         key={subject}
// // //                         className="rounded-full bg-[#f0f5f9] px-4 py-2 text-[10px] font-medium text-[#46617f]"
// // //                       >
// // //                         {subject}
// // //                       </span>
// // //                     ))}
// // //                   </div>
// // //                 </section>
// // //               </div>

// // //               {/* Details */}
// // //               <aside className="space-y-6">
// // //                 <section className="rounded-lg border border-ubh-border bg-white p-6">
// // //                   <h3 className="text-sm font-bold text-ubh-blue">
// // //                     {t.bookDetails}
// // //                   </h3>

// // //                   <div className="mt-5 space-y-4">
// // //                     <Detail label={t.isbn} value={product.isbn ?? "—"} />

// // //                     {product.edition && (
// // //                       <Detail label={t.edition} value={product.edition} />
// // //                     )}

// // //                     <Detail
// // //                       label={t.published}
// // //                       value={product.publicationYear?.toString() || "—"}
// // //                     />

// // //                     <Detail
// // //                       label={t.language}
// // //                       value={product.language ?? "—"}
// // //                     />

// // //                     <Detail
// // //                       label={t.pages}
// // //                       value={product.pages?.toString() ?? "—"}
// // //                     />

// // //                     <Detail label={t.format} value={product.format ?? "—"} />
// // //                   </div>
// // //                 </section>

// // //                 {/* Publisher */}
// // //                 <section className="rounded-lg border border-ubh-border bg-white p-6">
// // //                   <h3 className="text-sm font-bold text-ubh-blue">
// // //                     {t.publisher}
// // //                   </h3>

// // //                   <div className="mt-4 flex h-24 items-center justify-center rounded bg-ubh-canvas">
// // //                     {product.publisherLogo ? (
// // //                       <div className="relative h-16 w-36">
// // //                         <Image
// // //                           src={product.publisherLogo}
// // //                           alt={product.publisher}
// // //                           fill
// // //                           sizes="144px"
// // //                           className="object-contain"
// // //                         />
// // //                       </div>
// // //                     ) : (
// // //                       <span className="px-4 text-center text-sm font-semibold text-ubh-blue-muted">
// // //                         {product.publisher}
// // //                       </span>
// // //                     )}
// // //                   </div>

// // //                   <Link
// // //                     href={
// // //                       knownPublishers.some(
// // //                         (publisher) => publisher.slug === product.publisherSlug,
// // //                       )
// // //                         ? `/${locale}/publishers/${product.publisherSlug}`
// // //                         : `/${locale}/shop/products?publisher=${encodeURIComponent(product.publisher)}`
// // //                     }
// // //                     className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-ubh-blue-bright hover:text-ubh-gold"
// // //                   >
// // //                     {t.viewPublisher}

// // //                     {isArabic ? (
// // //                       <ArrowLeft size={12} />
// // //                     ) : (
// // //                       <ArrowRight size={12} />
// // //                     )}
// // //                   </Link>
// // //                 </section>
// // //               </aside>
// // //             </div>

// // //             <div className="mt-8">
// // //               <ProductReviews locale={locale} demo />
// // //             </div>

// // //             {samePublisherProducts.length > 0 && (
// // //               <ProductCarousel
// // //                 locale={locale}
// // //                 products={samePublisherProducts}
// // //                 title={
// // //                   isArabic
// // //                     ? `المزيد من ${product.publisher}`
// // //                     : `More from ${product.publisher}`
// // //                 }
// // //                 subtitle={
// // //                   isArabic
// // //                     ? "اكتشف المزيد من إصدارات هذا الناشر"
// // //                     : "Explore more titles from this publisher."
// // //                 }
// // //                 maxProducts={8}
// // //                 showAuthors
// // //                 showPublisher={false}
// // //                 showBadges
// // //                 showOldPrice
// // //                 showArrows
// // //                 autoPlay={false}
// // //                 showViewAll
// // //                 viewAllHref={`/${locale}/shop/products?publisher=${encodeURIComponent(product.publisher)}`}
// // //                 className="mt-12"
// // //               />
// // //             )}

// // //             {sameAuthorProducts.length > 0 && (
// // //               <ProductCarousel
// // //                 locale={locale}
// // //                 products={sameAuthorProducts}
// // //                 title={
// // //                   isArabic ? "المزيد من المؤلف" : "More by the same author"
// // //                 }
// // //                 subtitle={
// // //                   isArabic
// // //                     ? "اكتشف كتباً أخرى للمؤلف نفسه"
// // //                     : "Discover other books by the same author."
// // //                 }
// // //                 maxProducts={8}
// // //                 showAuthors
// // //                 showPublisher
// // //                 showBadges
// // //                 showOldPrice
// // //                 showArrows
// // //                 autoPlay={false}
// // //                 showViewAll={false}
// // //                 className="mt-12"
// // //               />
// // //             )}

// // //             {relatedProducts.length > 0 && (
// // //               <ProductCarousel
// // //                 locale={locale}
// // //                 products={relatedProducts}
// // //                 title={isArabic ? "كتب ذات صلة" : "Related books"}
// // //                 subtitle={
// // //                   isArabic
// // //                     ? "كتب أخرى في المجالات نفسها"
// // //                     : "Explore more books in the same subject areas."
// // //                 }
// // //                 maxProducts={8}
// // //                 showAuthors
// // //                 showPublisher
// // //                 showBadges
// // //                 showOldPrice
// // //                 showArrows
// // //                 autoPlay={false}
// // //                 showViewAll={false}
// // //                 className="mt-12"
// // //               />
// // //             )}
// // //           </div>
// // //         </Container>
// // //       </main>

// // //       {/* ================================================================== */}
// // //       {/* FOOTER                                                             */}
// // //       {/* ================================================================== */}
// // //       {/* ================================================================== */}
// // //       {/* CART NOTIFICATION                                                  */}
// // //       {/* ================================================================== */}
// // //       <StickyMobilePurchaseBar
// // //         locale={locale}
// // //         price={product.price}
// // //         currency={product.currency}
// // //         stock={product.stock}
// // //         disabled={product.stock < quantity}
// // //         onAddToCart={handleAddToCart}
// // //       />

// // //       <CartNotification
// // //         locale={locale}
// // //         productTitle={product.title}
// // //         visible={cartMessage}
// // //         onClose={() => setCartMessage(false)}
// // //       />

// // //       {/* {cartMessage && (
// // //         <div
// // //           className={`fixed bottom-5 z-50 flex max-w-[360px] items-center gap-3 rounded-lg bg-ubh-blue px-5 py-4 text-white shadow-2xl ${
// // //             isArabic ? "left-5" : "right-5"
// // //           }`}
// // //         >
// // //           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ubh-gold-light">
// // //             <Check size={17} />
// // //           </div>

// // //           <div>
// // //             <p className="text-xs font-bold">
// // //               {t.cartNotification}
// // //             </p>

// // //             <p className="mt-1 text-[10px] text-white/60">
// // //               {product.title}
// // //             </p>
// // //           </div>

// // //           <Link
// // //             href={`/${locale}/cart`}
// // //             className="ml-auto whitespace-nowrap text-[10px] font-bold text-ubh-gold-light hover:text-white"
// // //           >
// // //             {t.viewCart} →
// // //           </Link>
// // //         </div>
// // //       )} */}
// // //     </>
// // //   );
// // // }

// // // /* ==========================================================================
// // //    TRUST CARD
// // //    ========================================================================== */

// // // function TrustCard({ icon, title }: { icon: React.ReactNode; title: string }) {
// // //   return (
// // //     <div className="rounded border border-ubh-border bg-white p-3 text-center">
// // //       <div className="flex justify-center text-ubh-gold">{icon}</div>

// // //       <p className="mt-2 text-[8px] font-bold text-ubh-blue-muted">{title}</p>
// // //     </div>
// // //   );
// // // }

// // // /* ==========================================================================
// // //    DETAIL
// // //    ========================================================================== */

// // // function Detail({ label, value }: { label: string; value: string }) {
// // //   return (
// // //     <div className="flex justify-between gap-5 border-b border-[#edf1f5] pb-3 last:border-0 last:pb-0">
// // //       <span className="text-[10px] text-ubh-muted-light">{label}</span>

// // //       <span className="text-right text-[10px] font-semibold text-ubh-blue-muted">
// // //         {value}
// // //       </span>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import Link from "next/link";
// // import Image from "next/image";
// // import {
// //   useCallback,
// //   useEffect,
// //   useMemo,
// //   useState,
// // } from "react";
// // import { useRouter } from "next/navigation";
// // import type { ReactNode } from "react";

// // import {
// //   ArrowLeft,
// //   ArrowRight,
// //   BookOpen,
// //   Check,
// //   Heart,
// //   Info,
// //   MapPin,
// //   Minus,
// //   Plus,
// //   RotateCcw,
// //   Share2,
// //   ShieldCheck,
// //   ShoppingCart,
// //   Truck,
// // } from "lucide-react";

// // import {
// //   slugifyCatalogName,
// //   products as allProducts,
// // } from "@/lib/store/catalog";

// // import type { Product } from "@/lib/store/catalog";
// // import { copy, type Locale } from "@/lib/i18n";

// // import { Container } from "@/components/shared/Container";
// // import { useCart } from "@/components/store/CartProvider";

// // import { ProductCarousel } from "@/components/store/ProductCarousel";
// // import { ProductGallery } from "@/components/store/ProductGallery";
// // import { ProductDescription } from "@/components/store/ProductDescription";
// // import { StickyMobilePurchaseBar } from "@/components/store/StickyMobilePurchaseBar";
// // import { CartNotification } from "@/components/store/CartNotification";

// // /* ==========================================================================
// //    CONSTANTS
// //    ========================================================================== */

// // const WISHLIST_STORAGE_KEY = "ubh-wishlist";

// // const MAX_RECOMMENDED_PRODUCTS = 8;

// // /* ==========================================================================
// //    TYPES
// //    ========================================================================== */

// // type ProductDetailsClientProps = {
// //   locale: Locale;
// //   product: Product;
// // };

// // type DetailRowProps = {
// //   label: string;
// //   value: string;
// // };

// // type TrustCardProps = {
// //   icon: ReactNode;
// //   title: string;
// // };

// // type InformationCardProps = {
// //   icon: ReactNode;
// //   title: string;
// //   description: string;
// // };

// // type SectionHeadingProps = {
// //   eyebrow?: string;
// //   title: string;
// //   description?: string;
// // };

// // type PriceDisplayProps = {
// //   price: number;
// //   oldPrice?: number;
// //   currency: string;
// //   locale: Locale;
// //   saveLabel: string;
// // };

// // type QuantitySelectorProps = {
// //   quantity: number;
// //   stock: number;
// //   onDecrease: () => void;
// //   onIncrease: () => void;
// // };

// // /* ==========================================================================
// //    HELPERS
// //    ========================================================================== */

// // function getSavedWishlist(): string[] {
// //   try {
// //     const saved = JSON.parse(
// //       localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]",
// //     );

// //     return Array.isArray(saved)
// //       ? saved.filter(
// //           (item): item is string => typeof item === "string",
// //         )
// //       : [];
// //   } catch {
// //     return [];
// //   }
// // }

// // function calculateDiscount(
// //   price: number,
// //   oldPrice?: number,
// // ): number {
// //   if (
// //     !oldPrice ||
// //     oldPrice <= 0 ||
// //     oldPrice <= price ||
// //     price < 0
// //   ) {
// //     return 0;
// //   }

// //   return Math.round(
// //     ((oldPrice - price) / oldPrice) * 100,
// //   );
// // }

// // function formatPrice(
// //   price: number,
// //   currency: string,
// //   locale: Locale,
// // ): string {
// //   return new Intl.NumberFormat(
// //     locale === "ar" ? "ar-AE" : "en-AE",
// //     {
// //       style: "currency",
// //       currency: currency || "AED",
// //       minimumFractionDigits: 2,
// //       maximumFractionDigits: 2,
// //     },
// //   ).format(price);
// // }

// // function getPublisherHref(
// //   locale: Locale,
// //   publisher: string,
// //   publisherSlug: string,
// // ): string {
// //   if (publisherSlug?.trim()) {
// //     return `/${locale}/publishers/${encodeURIComponent(
// //       publisherSlug,
// //     )}?source=store`;
// //   }

// //   return `/${locale}/shop/products?publisher=${encodeURIComponent(
// //     publisher,
// //   )}`;
// // }

// // function getPublisherProducts(product: Product): Product[] {
// //   const publisherName = product.publisher
// //     .trim()
// //     .toLocaleLowerCase();

// //   return allProducts
// //     .filter((item) => {
// //       if (item.id === product.id) return false;

// //       if (
// //         product.publisherSlug &&
// //         item.publisherSlug
// //       ) {
// //         return item.publisherSlug === product.publisherSlug;
// //       }

// //       return (
// //         item.publisher.trim().toLocaleLowerCase() ===
// //         publisherName
// //       );
// //     })
// //     .slice(0, MAX_RECOMMENDED_PRODUCTS);
// // }

// // function getAuthorProducts(
// //   product: Product,
// //   excludedIds: Set<string>,
// // ): Product[] {
// //   const authors = new Set(
// //     (product.authors ?? [])
// //       .map((author) => author.trim().toLocaleLowerCase())
// //       .filter(Boolean),
// //   );

// //   if (authors.size === 0) return [];

// //   return allProducts
// //     .filter(
// //       (item) =>
// //         !excludedIds.has(item.id) &&
// //         (item.authors ?? []).some((author) =>
// //           authors.has(author.trim().toLocaleLowerCase()),
// //         ),
// //     )
// //     .slice(0, MAX_RECOMMENDED_PRODUCTS);
// // }

// // function getRelatedProducts(
// //   product: Product,
// //   excludedIds: Set<string>,
// // ): Product[] {
// //   const subjects = new Set(
// //     (product.subjects ?? [])
// //       .map((subject) => subject.trim().toLocaleLowerCase())
// //       .filter(Boolean),
// //   );

// //   if (subjects.size === 0) return [];

// //   return allProducts
// //     .filter(
// //       (item) =>
// //         !excludedIds.has(item.id) &&
// //         (item.subjects ?? []).some((subject) =>
// //           subjects.has(subject.trim().toLocaleLowerCase()),
// //         ),
// //     )
// //     .slice(0, MAX_RECOMMENDED_PRODUCTS);
// // }

// // /* ==========================================================================
// //    PRODUCT PAGE
// //    ========================================================================== */

// // export default function ProductDetailsClient({
// //   locale,
// //   product,
// // }: ProductDetailsClientProps) {
// //   const router = useRouter();

// //   const t = copy[locale].product;

// //   const isArabic = locale === "ar";

// //   const direction = isArabic ? "rtl" : "ltr";

// //   const stock = Math.max(
// //     0,
// //     Number(product.stock) || 0,
// //   );

// //   const hasStock = stock > 0;

// //   const publisherHref = getPublisherHref(
// //     locale,
// //     product.publisher,
// //     product.publisherSlug,
// //   );

// //   const discount = calculateDiscount(
// //     product.price,
// //     product.oldPrice,
// //   );

// //   /* ------------------------------------------------------------------------
// //      STATE
// //      ------------------------------------------------------------------------ */

// //   const [quantity, setQuantity] = useState(1);

// //   const [wishlist, setWishlist] = useState(false);

// //   const [wishlistReady, setWishlistReady] = useState(false);

// //   const [cartMessage, setCartMessage] = useState(false);

// //   const [shareMessage, setShareMessage] = useState(false);

// //   const { addToCart } = useCart();

// //   /* ------------------------------------------------------------------------
// //      RESET WHEN PRODUCT CHANGES
// //      ------------------------------------------------------------------------ */

// //   useEffect(() => {
// //     setQuantity(1);
// //     setCartMessage(false);
// //     setShareMessage(false);
// //   }, [product.id]);

// //   /* ------------------------------------------------------------------------
// //      WISHLIST INITIALIZATION
// //      ------------------------------------------------------------------------ */

// //   useEffect(() => {
// //     const saved = getSavedWishlist();

// //     setWishlist(saved.includes(product.id));
// //     setWishlistReady(true);
// //   }, [product.id]);

// //   /* ------------------------------------------------------------------------
// //      WISHLIST
// //      ------------------------------------------------------------------------ */

// //   const toggleWishlist = useCallback(() => {
// //     if (!wishlistReady) return;

// //     const saved = getSavedWishlist();

// //     const alreadySaved = saved.includes(product.id);

// //     const next = alreadySaved
// //       ? saved.filter((id) => id !== product.id)
// //       : [...saved, product.id];

// //     try {
// //       localStorage.setItem(
// //         WISHLIST_STORAGE_KEY,
// //         JSON.stringify(next),
// //       );

// //       setWishlist(!alreadySaved);

// //       window.dispatchEvent(
// //         new Event("ubh-wishlist-updated"),
// //       );
// //     } catch {
// //       setWishlist((current) => !current);
// //     }
// //   }, [product.id, wishlistReady]);

// //   /* ------------------------------------------------------------------------
// //      QUANTITY
// //      ------------------------------------------------------------------------ */

// //   const decreaseQuantity = useCallback(() => {
// //     setQuantity((current) =>
// //       Math.max(1, current - 1),
// //     );
// //   }, []);

// //   const increaseQuantity = useCallback(() => {
// //     setQuantity((current) =>
// //       Math.min(stock, current + 1),
// //     );
// //   }, [stock]);

// //   /* ------------------------------------------------------------------------
// //      CART
// //      ------------------------------------------------------------------------ */

// //   const handleAddToCart = useCallback(() => {
// //     if (!hasStock || quantity > stock) return;

// //     const added = addToCart(product, quantity);

// //     if (added) {
// //       setCartMessage(true);
// //     }
// //   }, [
// //     addToCart,
// //     hasStock,
// //     product,
// //     quantity,
// //     stock,
// //   ]);

// //   const handleBuyNow = useCallback(() => {
// //     if (!hasStock || quantity > stock) return;

// //     const added = addToCart(product, quantity);

// //     if (added) {
// //       router.push(`/${locale}/checkout`);
// //     }
// //   }, [
// //     addToCart,
// //     hasStock,
// //     locale,
// //     product,
// //     quantity,
// //     router,
// //     stock,
// //   ]);

// //   /* ------------------------------------------------------------------------
// //      SHARE
// //      ------------------------------------------------------------------------ */

// //   const handleShare = useCallback(async () => {
// //     const url = window.location.href;

// //     try {
// //       if (navigator.share) {
// //         await navigator.share({
// //           title: product.title,
// //           url,
// //         });

// //         return;
// //       }

// //       if (navigator.clipboard?.writeText) {
// //         await navigator.clipboard.writeText(url);

// //         setShareMessage(true);

// //         return;
// //       }

// //       throw new Error("Clipboard unavailable");
// //     } catch (error) {
// //       if (
// //         error instanceof Error &&
// //         error.name === "AbortError"
// //       ) {
// //         return;
// //       }

// //       try {
// //         const textArea = document.createElement("textarea");

// //         textArea.value = url;
// //         textArea.style.position = "fixed";
// //         textArea.style.opacity = "0";

// //         document.body.appendChild(textArea);

// //         textArea.select();

// //         const copied = document.execCommand("copy");

// //         document.body.removeChild(textArea);

// //         if (copied) {
// //           setShareMessage(true);
// //         }
// //       } catch {
// //         setShareMessage(false);
// //       }
// //     }
// //   }, [product.title]);

// //   /* ------------------------------------------------------------------------
// //      RECOMMENDATIONS
// //      ------------------------------------------------------------------------ */

// //   const samePublisherProducts = useMemo(
// //     () => getPublisherProducts(product),
// //     [product],
// //   );

// //   const sameAuthorProducts = useMemo(() => {
// //     const excludedIds = new Set([
// //       product.id,
// //       ...samePublisherProducts.map((item) => item.id),
// //     ]);

// //     return getAuthorProducts(product, excludedIds);
// //   }, [product, samePublisherProducts]);

// //   const relatedProducts = useMemo(() => {
// //     const excludedIds = new Set([
// //       product.id,
// //       ...samePublisherProducts.map((item) => item.id),
// //       ...sameAuthorProducts.map((item) => item.id),
// //     ]);

// //     return getRelatedProducts(product, excludedIds);
// //   }, [
// //     product,
// //     samePublisherProducts,
// //     sameAuthorProducts,
// //   ]);

// //   /* ------------------------------------------------------------------------
// //      SPECIFICATIONS
// //      ------------------------------------------------------------------------ */

// //   const specifications = useMemo(() => {
// //     const items: Array<{
// //       label: string;
// //       value: string | undefined;
// //     }> = [
// //       {
// //         label: t.isbn,
// //         value: product.isbn || undefined,
// //       },
// //       {
// //         label: t.edition,
// //         value: product.edition || undefined,
// //       },
// //       {
// //         label: t.published,
// //         value: product.publicationYear
// //           ? String(product.publicationYear)
// //           : undefined,
// //       },
// //       {
// //         label: t.language,
// //         value: product.language || undefined,
// //       },
// //       {
// //         label: t.pages,
// //         value: product.pages
// //           ? String(product.pages)
// //           : undefined,
// //       },
// //       {
// //         label: t.format,
// //         value: product.format || undefined,
// //       },
// //     ];

// //     return items.filter(
// //       (item): item is { label: string; value: string } =>
// //         Boolean(item.value?.trim()),
// //     );
// //   }, [product, t]);

// //   /* ------------------------------------------------------------------------
// //      RENDER
// //      ------------------------------------------------------------------------ */

// //   return (
// //     <>
// //       <main
// //         dir={direction}
// //         className="min-h-screen bg-[#fbfcfe] pb-24 lg:pb-0"
// //       >
// //         {/* ================================================================
// //             BREADCRUMB
// //         ================================================================= */}

// //         {/* <ProductBreadcrumb
// //           locale={locale}
// //           title={product.title}
// //           homeLabel={t.home}
// //           shopLabel={t.shop}
// //         /> */}

// //         <Container>
// //           <div className="py-6 sm:py-8 lg:py-10">

// //             {/* ============================================================
// //                 BACK TO SHOP
// //             ============================================================ */}

// //             {/* <Link
// //               href={`/${locale}/shop`}
// //               className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-[#064a98] transition hover:text-[#c89438]"
// //             >
// //               {isArabic ? (
// //                 <ArrowRight size={15} />
// //               ) : (
// //                 <ArrowLeft size={15} />
// //               )}

// //               {t.backToShop}
// //             </Link> */}

// //             {/* ============================================================
// //                 PRODUCT OVERVIEW
// //             ============================================================ */}

// //             <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">

// //               {/* --------------------------------------------------------
// //                   PRODUCT GALLERY
// //               -------------------------------------------------------- */}

// //               <div className="min-w-0 lg:sticky lg:top-28">

// //                 <div className="relative overflow-hidden rounded-2xl border border-[#e8edf2] bg-white">

// //                   {discount > 0 && (
// //                     <DiscountBadge
// //                       discount={discount}
// //                       isArabic={isArabic}
// //                     />
// //                   )}

// //                   <button
// //                     type="button"
// //                     onClick={toggleWishlist}
// //                     disabled={!wishlistReady}
// //                     aria-label={
// //                       wishlist
// //                         ? t.removeFromWishlist
// //                         : t.addToWishlist
// //                     }
// //                     aria-pressed={wishlist}
// //                     className={`absolute top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#e5ebf1] bg-white text-[#71869f] shadow-sm transition hover:border-[#c89438] hover:text-[#c89438] disabled:opacity-50 ${
// //                       isArabic ? "left-4" : "right-4"
// //                     }`}
// //                   >
// //                     <Heart
// //                       size={19}
// //                       fill={
// //                         wishlist ? "currentColor" : "none"
// //                       }
// //                     />
// //                   </button>

// //                   <div className="p-3 sm:p-6 lg:p-8">
// //                     <ProductGallery
// //                       title={product.title}
// //                       cover={product.cover}
// //                       images={product.images}
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* TRUST FEATURES */}

// //                 <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">

// //                   <TrustCard
// //                     icon={<ShieldCheck size={19} />}
// //                     title={t.genuine}
// //                   />

// //                   <TrustCard
// //                     icon={<Truck size={19} />}
// //                     title={t.uaeDelivery}
// //                   />

// //                   <TrustCard
// //                     icon={<RotateCcw size={19} />}
// //                     title={t.support}
// //                   />

// //                 </div>
// //               </div>

// //               {/* --------------------------------------------------------
// //                   PRODUCT INFORMATION
// //               -------------------------------------------------------- */}

// //               <div className="min-w-0">

// //                 {/* PUBLISHER */}

// //                 <div className="flex flex-wrap items-center gap-2">

// //                   <Link
// //                     href={publisherHref}
// //                     className="text-xs font-bold uppercase tracking-wider text-[#b8822c] transition hover:text-[#06295a]"
// //                   >
// //                     {product.publisher}
// //                   </Link>

// //                   <span className="h-1 w-1 rounded-full bg-[#c89438]" />

// //                   <span className="text-[10px] font-medium text-[#91a2b6]">
// //                     {t.academicBook}
// //                   </span>

// //                 </div>

// //                 {/* TITLE */}

// //                 <h1 className="mt-4 break-words font-serif text-2xl font-semibold leading-tight text-[#06295a] sm:text-3xl lg:text-4xl xl:text-[42px]">
// //                   {product.title}
// //                 </h1>

// //                 {/* SUBTITLE */}

// //                 {product.subtitle && (
// //                   <p className="mt-4 max-w-2xl text-sm leading-7 text-[#71869f]">
// //                     {product.subtitle}
// //                   </p>
// //                 )}

// //                 {/* AUTHORS */}

// //                 {(product.authors ?? []).length > 0 && (
// //                   <div className="mt-5">

// //                     <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#91a2b6]">
// //                       {t.authors}
// //                     </p>

// //                     <div className="flex flex-wrap gap-x-2 gap-y-2 text-sm leading-6 text-[#385477]">

// //                       {product.authors.map(
// //                         (author, index) => (
// //                           <span
// //                             key={`${author}-${index}`}
// //                             className="inline-flex items-center gap-2"
// //                           >
// //                             <Link
// //                               href={`/${locale}/authors/${slugifyCatalogName(author)}`}
// //                               className="transition hover:text-[#c89438] hover:underline"
// //                             >
// //                               {author}
// //                             </Link>

// //                             {index <
// //                               product.authors.length - 1 && (
// //                               <span className="text-[#c5cfda]">
// //                                 ·
// //                               </span>
// //                             )}
// //                           </span>
// //                         ),
// //                       )}

// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* QUICK METADATA */}

// //                 {(product.isbn || product.edition) && (
// //                   <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-y border-[#e8edf2] py-4">

// //                     {product.isbn && (
// //                       <QuickMetadata
// //                         label={t.isbn}
// //                         value={product.isbn}
// //                       />
// //                     )}

// //                     {product.edition && (
// //                       <QuickMetadata
// //                         label={t.edition}
// //                         value={product.edition}
// //                       />
// //                     )}

// //                   </div>
// //                 )}

// //                 {/* PRICE */}

// //                 <div className="mt-6">
// //                   <PriceDisplay
// //                     price={product.price}
// //                     oldPrice={product.oldPrice}
// //                     currency={product.currency}
// //                     locale={locale}
// //                     saveLabel={t.save}
// //                   />
// //                 </div>

// //                 {/* STOCK */}

// //                 <StockStatus
// //                   stock={stock}
// //                   inStockLabel={t.inStock}
// //                   outOfStockLabel={t.outOfStock}
// //                   availableLabel={t.available}
// //                 />

// //                 {/* PURCHASE PANEL */}

// //                 {hasStock ? (
// //                   <div className="mt-6 rounded-2xl border border-[#e3eaf1] bg-white p-4 sm:p-5">

// //                     <div className="mb-4 flex items-center justify-between gap-3">

// //                       <p className="text-xs font-bold text-[#06295a]">
// //                         {t.quantity}
// //                       </p>

// //                       <span className="text-[10px] text-[#91a2b6]">
// //                         {stock} {t.available}
// //                       </span>

// //                     </div>

// //                     <div className="flex flex-col gap-3 sm:flex-row">

// //                       <div className="sm:w-[125px]">
// //                         <QuantitySelector
// //                           quantity={quantity}
// //                           stock={stock}
// //                           onDecrease={decreaseQuantity}
// //                           onIncrease={increaseQuantity}
// //                         />
// //                       </div>

// //                       <button
// //                         type="button"
// //                         onClick={handleAddToCart}
// //                         disabled={quantity > stock}
// //                         className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#06295a] px-4 text-xs font-bold text-white transition hover:bg-[#0a356b] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
// //                       >
// //                         <ShoppingCart size={17} />

// //                         {cartMessage
// //                           ? t.addedToCart
// //                           : t.addToCart}
// //                       </button>

// //                       <button
// //                         type="button"
// //                         onClick={handleBuyNow}
// //                         disabled={quantity > stock}
// //                         className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#dcae57] px-4 text-xs font-bold text-[#06295a] transition hover:bg-[#c89438] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
// //                       >
// //                         {t.buyNow}

// //                         {isArabic ? (
// //                           <ArrowLeft size={16} />
// //                         ) : (
// //                           <ArrowRight size={16} />
// //                         )}
// //                       </button>

// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-5">
// //                     <p className="text-sm font-semibold text-red-700">
// //                       {t.outOfStock}
// //                     </p>
// //                   </div>
// //                 )}

// //                 {/* SECONDARY ACTIONS */}

// //                 <div className="mt-5 flex flex-wrap items-center gap-5">

// //                   <button
// //                     type="button"
// //                     onClick={toggleWishlist}
// //                     disabled={!wishlistReady}
// //                     aria-pressed={wishlist}
// //                     className="inline-flex items-center gap-2 text-xs font-semibold text-[#71869f] transition hover:text-[#c89438] disabled:opacity-50"
// //                   >
// //                     <Heart
// //                       size={16}
// //                       fill={
// //                         wishlist ? "currentColor" : "none"
// //                       }
// //                     />

// //                     {wishlist
// //                       ? t.addedToWishlist
// //                       : t.addToWishlist}
// //                   </button>

// //                   <button
// //                     type="button"
// //                     onClick={handleShare}
// //                     className="inline-flex items-center gap-2 text-xs font-semibold text-[#71869f] transition hover:text-[#064a98]"
// //                   >
// //                     {shareMessage ? (
// //                       <Check size={16} />
// //                     ) : (
// //                       <Share2 size={16} />
// //                     )}

// //                     {shareMessage
// //                       ? isArabic
// //                         ? "تم نسخ الرابط"
// //                         : "Link copied"
// //                       : t.share}
// //                   </button>

// //                 </div>

// //                 {/* DELIVERY INFORMATION */}

// //                 <div className="mt-7 overflow-hidden rounded-xl border border-[#e3eaf1] bg-white">

// //                   <InformationCard
// //                     icon={<Truck size={21} />}
// //                     title={t.deliveryTitle}
// //                     description={t.deliveryDescription}
// //                   />

// //                   <div className="h-px bg-[#edf1f5]" />

// //                   <InformationCard
// //                     icon={<MapPin size={21} />}
// //                     title={t.ubh}
// //                     description={t.location}
// //                   />

// //                 </div>

// //               </div>
// //             </div>

// //             {/* ============================================================
// //                 LOWER PRODUCT INFORMATION
// //             ============================================================ */}

// //             <div className="mt-12 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">

// //               {/* MAIN CONTENT */}

// //               <div className="min-w-0 space-y-6">

// //                 {/* DESCRIPTION */}

// //                 {product.description && (
// //                   <section className="rounded-2xl border border-[#e3eaf1] bg-white p-5 sm:p-7">

// //                     <ProductDescription
// //                       title={t.aboutBook}
// //                       description={product.description}
// //                       locale={locale}
// //                     />

// //                   </section>
// //                 )}

// //                 {/* SUBJECT AREAS */}

// //                 {(product.subjects ?? []).length > 0 && (
// //                   <section className="rounded-2xl border border-[#e3eaf1] bg-white p-5 sm:p-7">

// //                     <SectionHeading
// //                       eyebrow={t.academicCoverage}
// //                       title={t.subjectAreas}
// //                     />

// //                     <div className="mt-5 flex flex-wrap gap-2">

// //                       {product.subjects.map((subject) => (
// //                         <span
// //                           key={subject}
// //                           className="rounded-full border border-[#e5edf4] bg-[#f5f8fb] px-3 py-2 text-[11px] font-medium text-[#46617f]"
// //                         >
// //                           {subject}
// //                         </span>
// //                       ))}

// //                     </div>
// //                   </section>
// //                 )}

// //               </div>

// //               {/* SIDEBAR */}

// //               <aside className="space-y-5">

// //                 {/* BOOK DETAILS */}

// //                 {specifications.length > 0 && (
// //                   <section className="rounded-2xl border border-[#e3eaf1] bg-white p-5 sm:p-6">

// //                     <div className="mb-5 flex items-center gap-3">

// //                       <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1f5f9] text-[#064a98]">
// //                         <BookOpen size={19} />
// //                       </div>

// //                       <h2 className="text-sm font-bold text-[#06295a]">
// //                         {t.bookDetails}
// //                       </h2>

// //                     </div>

// //                     <div className="space-y-4">

// //                       {specifications.map((item) => (
// //                         <DetailRow
// //                           key={item.label}
// //                           label={item.label}
// //                           value={item.value}
// //                         />
// //                       ))}

// //                     </div>

// //                   </section>
// //                 )}

// //                 {/* PUBLISHER */}

// //                 <PublisherCard
// //                   locale={locale}
// //                   title={t.publisher}
// //                   publisher={product.publisher}
// //                   publisherLogo={product.publisherLogo}
// //                   viewPublisherLabel={t.viewPublisher}
// //                   href={publisherHref}
// //                   isArabic={isArabic}
// //                 />

// //                 {/* AVAILABILITY NOTE */}

// //                 <div className="rounded-xl border border-[#e3eaf1] bg-[#f5f8fb] p-5">

// //                   <div className="flex items-start gap-3">

// //                     <Info
// //                       size={18}
// //                       className="mt-0.5 shrink-0 text-[#b8822c]"
// //                     />

// //                     <div>

// //                       <h3 className="text-xs font-bold text-[#06295a]">
// //                         {t.academicBook}
// //                       </h3>

// //                       <p className="mt-2 text-[11px] leading-6 text-[#71869f]">
// //                         {t.deliveryDescription}
// //                       </p>

// //                     </div>

// //                   </div>

// //                 </div>

// //               </aside>
// //             </div>

// //             {/* ============================================================
// //                 RECOMMENDATIONS
// //             ============================================================ */}

// //             {samePublisherProducts.length > 0 && (
// //               <ProductCarousel
// //                 locale={locale}
// //                 products={samePublisherProducts}
// //                 title={
// //                   isArabic
// //                     ? `المزيد من ${product.publisher}`
// //                     : `More from ${product.publisher}`
// //                 }
// //                 subtitle={
// //                   isArabic
// //                     ? "اكتشف المزيد من إصدارات هذا الناشر"
// //                     : "Explore more titles from this publisher."
// //                 }
// //                 maxProducts={MAX_RECOMMENDED_PRODUCTS}
// //                 showAuthors
// //                 showPublisher={false}
// //                 showBadges
// //                 showOldPrice
// //                 showArrows
// //                 autoPlay={false}
// //                 showViewAll
// //                 viewAllHref={`/${locale}/shop/products?publisher=${encodeURIComponent(
// //                   product.publisher,
// //                 )}`}
// //                 className="mt-12"
// //               />
// //             )}

// //             {sameAuthorProducts.length > 0 && (
// //               <ProductCarousel
// //                 locale={locale}
// //                 products={sameAuthorProducts}
// //                 title={
// //                   isArabic
// //                     ? "المزيد من المؤلف"
// //                     : "More by the same author"
// //                 }
// //                 subtitle={
// //                   isArabic
// //                     ? "اكتشف كتباً أخرى للمؤلف نفسه"
// //                     : "Discover other books by the same author."
// //                 }
// //                 maxProducts={MAX_RECOMMENDED_PRODUCTS}
// //                 showAuthors
// //                 showPublisher
// //                 showBadges
// //                 showOldPrice
// //                 showArrows
// //                 autoPlay={false}
// //                 showViewAll={false}
// //                 className="mt-12"
// //               />
// //             )}

// //             {relatedProducts.length > 0 && (
// //               <ProductCarousel
// //                 locale={locale}
// //                 products={relatedProducts}
// //                 title={
// //                   isArabic ? "كتب ذات صلة" : "Related books"
// //                 }
// //                 subtitle={
// //                   isArabic
// //                     ? "اكتشف كتباً أخرى في المجالات نفسها"
// //                     : "Discover more books in the same subject areas."
// //                 }
// //                 maxProducts={MAX_RECOMMENDED_PRODUCTS}
// //                 showAuthors
// //                 showPublisher
// //                 showBadges
// //                 showOldPrice
// //                 showArrows
// //                 autoPlay={false}
// //                 showViewAll={false}
// //                 className="mt-12"
// //               />
// //             )}

// //           </div>
// //         </Container>
// //       </main>

// //       {/* ================================================================
// //           MOBILE PURCHASE BAR
// //       ================================================================= */}

// //       <StickyMobilePurchaseBar
// //         locale={locale}
// //         price={product.price}
// //         currency={product.currency}
// //         stock={stock}
// //         disabled={!hasStock || quantity > stock}
// //         onAddToCart={handleAddToCart}
// //       />

// //       {/* ================================================================
// //           CART NOTIFICATION
// //       ================================================================= */}

// //       <CartNotification
// //         locale={locale}
// //         productTitle={product.title}
// //         visible={cartMessage}
// //         onClose={() => setCartMessage(false)}
// //       />
// //     </>
// //   );
// // }

// // /* ==========================================================================
// //    PRODUCT BREADCRUMB
// //    ========================================================================== */

// // function ProductBreadcrumb({
// //   locale,
// //   title,
// //   homeLabel,
// //   shopLabel,
// // }: {
// //   locale: Locale;
// //   title: string;
// //   homeLabel: string;
// //   shopLabel: string;
// // }) {
// //   return (
// //     <div className="border-b border-[#e8edf2] bg-white">

// //       <Container>

// //         <nav
// //           aria-label="Breadcrumb"
// //           className="flex min-h-12 items-center gap-2 overflow-hidden text-[10px] text-[#91a2b6]"
// //         >

// //           <Link
// //             href={`/${locale}`}
// //             className="shrink-0 transition hover:text-[#064a98]"
// //           >
// //             {homeLabel}
// //           </Link>

// //           <span aria-hidden="true">/</span>

// //           <Link
// //             href={`/${locale}/shop`}
// //             className="shrink-0 transition hover:text-[#064a98]"
// //           >
// //             {shopLabel}
// //           </Link>

// //           <span aria-hidden="true">/</span>

// //           <span
// //             aria-current="page"
// //             className="min-w-0 truncate font-medium text-[#385477]"
// //           >
// //             {title}
// //           </span>

// //         </nav>

// //       </Container>

// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    DISCOUNT BADGE
// //    ========================================================================== */

// // function DiscountBadge({
// //   discount,
// //   isArabic,
// // }: {
// //   discount: number;
// //   isArabic: boolean;
// // }) {
// //   return (
// //     <span
// //       className={`absolute top-4 z-20 rounded-full bg-[#c89438] px-3 py-1.5 text-xs font-bold text-white shadow-sm ${
// //         isArabic ? "right-4" : "left-4"
// //       }`}
// //     >
// //       -{discount}%
// //     </span>
// //   );
// // }

// // /* ==========================================================================
// //    TRUST CARD
// //    ========================================================================== */

// // function TrustCard({
// //   icon,
// //   title,
// // }: TrustCardProps) {
// //   return (
// //     <div className="flex min-h-[76px] items-center justify-center gap-2 rounded-xl border border-[#e8edf2] bg-white px-2 py-3 sm:flex-col sm:gap-2">

// //       <div className="shrink-0 text-[#c89438]">
// //         {icon}
// //       </div>

// //       <p className="text-center text-[9px] font-semibold leading-4 text-[#385477] sm:text-[10px]">
// //         {title}
// //       </p>

// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    QUICK METADATA
// //    ========================================================================== */

// // function QuickMetadata({
// //   label,
// //   value,
// // }: DetailRowProps) {
// //   return (
// //     <div className="flex flex-wrap items-center gap-2 text-[10px]">

// //       <span className="text-[#91a2b6]">
// //         {label}
// //       </span>

// //       <strong className="break-all font-semibold text-[#385477]">
// //         {value}
// //       </strong>

// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    PRICE DISPLAY
// //    ========================================================================== */

// // function PriceDisplay({
// //   price,
// //   oldPrice,
// //   currency,
// //   locale,
// //   saveLabel,
// // }: PriceDisplayProps) {
// //   const discount = calculateDiscount(price, oldPrice);

// //   const hasDiscount = discount > 0 && Boolean(oldPrice);

// //   return (
// //     <div>

// //       <div className="flex flex-wrap items-end gap-x-3 gap-y-2">

// //         <span className="text-3xl font-bold tracking-tight text-[#06295a] sm:text-4xl">
// //           {formatPrice(price, currency, locale)}
// //         </span>

// //         {hasDiscount && oldPrice && (
// //           <span className="pb-1 text-sm text-[#9aabc0] line-through">
// //             {formatPrice(oldPrice, currency, locale)}
// //           </span>
// //         )}

// //         {hasDiscount && (
// //           <span className="mb-1 rounded-full bg-[#edf7f0] px-2.5 py-1 text-[10px] font-bold text-[#3c7b58]">
// //             -{discount}%
// //           </span>
// //         )}

// //       </div>

// //       {hasDiscount && oldPrice && (
// //         <p className="mt-2 text-[11px] font-semibold text-[#3c7b58]">
// //           {saveLabel}{" "}
// //           {formatPrice(
// //             oldPrice - price,
// //             currency,
// //             locale,
// //           )}
// //         </p>
// //       )}

// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    STOCK STATUS
// //    ========================================================================== */

// // function StockStatus({
// //   stock,
// //   inStockLabel,
// //   outOfStockLabel,
// //   availableLabel,
// // }: {
// //   stock: number;
// //   inStockLabel: string;
// //   outOfStockLabel: string;
// //   availableLabel: string;
// // }) {
// //   if (stock <= 0) {
// //     return (
// //       <div className="mt-6 flex items-center gap-2">

// //         <span className="h-2 w-2 rounded-full bg-red-500" />

// //         <span className="text-xs font-semibold text-red-600">
// //           {outOfStockLabel}
// //         </span>

// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="mt-6 flex flex-wrap items-center gap-2">

// //       <span className="h-2 w-2 rounded-full bg-[#3c7b58]" />

// //       <span className="text-xs font-semibold text-[#3c7b58]">
// //         {inStockLabel}
// //       </span>

// //       <span className="text-[10px] text-[#91a2b6]">
// //         · {stock} {availableLabel}
// //       </span>

// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    QUANTITY SELECTOR
// //    ========================================================================== */

// // function QuantitySelector({
// //   quantity,
// //   stock,
// //   onDecrease,
// //   onIncrease,
// // }: QuantitySelectorProps) {
// //   return (
// //     <div
// //       className="flex h-12 w-full items-center justify-between rounded-lg border border-[#d8e1ea] bg-white"
// //       aria-label="Quantity selector"
// //     >

// //       <button
// //         type="button"
// //         onClick={onDecrease}
// //         disabled={quantity <= 1}
// //         aria-label="Decrease quantity"
// //         className="flex h-full w-10 items-center justify-center text-[#385477] transition hover:text-[#c89438] disabled:cursor-not-allowed disabled:opacity-30"
// //       >
// //         <Minus size={15} />
// //       </button>

// //       <span
// //         aria-live="polite"
// //         className="min-w-8 text-center text-sm font-bold tabular-nums text-[#06295a]"
// //       >
// //         {quantity}
// //       </span>

// //       <button
// //         type="button"
// //         onClick={onIncrease}
// //         disabled={quantity >= stock}
// //         aria-label="Increase quantity"
// //         className="flex h-full w-10 items-center justify-center text-[#385477] transition hover:text-[#c89438] disabled:cursor-not-allowed disabled:opacity-30"
// //       >
// //         <Plus size={15} />
// //       </button>

// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    INFORMATION CARD
// //    ========================================================================== */

// // function InformationCard({
// //   icon,
// //   title,
// //   description,
// // }: InformationCardProps) {
// //   return (
// //     <div className="flex items-start gap-4 p-5">

// //       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fbf6eb] text-[#c89438]">
// //         {icon}
// //       </div>

// //       <div className="min-w-0">

// //         <h3 className="text-xs font-bold text-[#06295a]">
// //           {title}
// //         </h3>

// //         <p className="mt-1 text-[10px] leading-5 text-[#71869f]">
// //           {description}
// //         </p>

// //       </div>

// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    SECTION HEADING
// //    ========================================================================== */

// // function SectionHeading({
// //   eyebrow,
// //   title,
// //   description,
// // }: SectionHeadingProps) {
// //   return (
// //     <div>

// //       {eyebrow && (
// //         <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#b8822c]">
// //           {eyebrow}
// //         </p>
// //       )}

// //       <h2 className="mt-2 font-serif text-xl text-[#06295a] sm:text-2xl">
// //         {title}
// //       </h2>

// //       {description && (
// //         <p className="mt-2 text-xs leading-6 text-[#71869f]">
// //           {description}
// //         </p>
// //       )}

// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    DETAIL ROW
// //    ========================================================================== */

// // function DetailRow({
// //   label,
// //   value,
// // }: DetailRowProps) {
// //   return (
// //     <div className="flex items-start justify-between gap-4 border-b border-[#edf1f5] pb-3 last:border-0 last:pb-0">

// //       <span className="shrink-0 text-[10px] text-[#91a2b6]">
// //         {label}
// //       </span>

// //       <span className="break-words text-end text-[10px] font-semibold text-[#385477]">
// //         {value}
// //       </span>

// //     </div>
// //   );
// // }

// // /* ==========================================================================
// //    PUBLISHER CARD
// //    ========================================================================== */

// // function PublisherCard({
// //   title,
// //   publisher,
// //   publisherLogo,
// //   viewPublisherLabel,
// //   href,
// //   isArabic,
// // }: {
// //   locale: Locale;
// //   title: string;
// //   publisher: string;
// //   publisherLogo?: string;
// //   viewPublisherLabel: string;
// //   href: string;
// //   isArabic: boolean;
// // }) {
// //   return (
// //     <section className="rounded-2xl border border-[#e3eaf1] bg-white p-5 sm:p-6">

// //       <h2 className="text-sm font-bold text-[#06295a]">
// //         {title}
// //       </h2>

// //       <div className="mt-4 flex min-h-[112px] items-center justify-center rounded-lg border border-[#edf1f5] bg-[#fbfcfe] p-5">

// //         {publisherLogo ? (
// //           <div className="relative h-16 w-full max-w-[180px]">

// //             <Image
// //               src={publisherLogo}
// //               alt={`${publisher} logo`}
// //               fill
// //               sizes="180px"
// //               className="object-contain"
// //             />

// //           </div>
// //         ) : (
// //           <span className="text-center text-sm font-semibold text-[#385477]">
// //             {publisher}
// //           </span>
// //         )}

// //       </div>

// //       <Link
// //         href={href}
// //         className="mt-5 flex items-center justify-center gap-2 text-[10px] font-bold text-[#064a98] transition hover:text-[#c89438]"
// //       >
// //         {viewPublisherLabel}

// //         {isArabic ? (
// //           <ArrowLeft size={13} />
// //         ) : (
// //           <ArrowRight size={13} />
// //         )}

// //       </Link>

// //     </section>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import {
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { useRouter } from "next/navigation";
// import type { ReactNode } from "react";

// import {
//   ArrowLeft,
//   ArrowRight,
//   BookOpen,
//   Check,
//   Heart,
//   ImageOff,
//   MapPin,
//   Minus,
//   Plus,
//   RotateCcw,
//   Share2,
//   ShieldCheck,
//   ShoppingCart,
//   Truck,
//   Globe2,
//   CreditCard,
//   LockKeyhole,
//   Headset,
//   PackageCheck,
//   BadgeCheck,
//   ChevronRight,
// } from "lucide-react";

// import {
//   slugifyCatalogName,
//   products as allProducts,
// } from "@/lib/store/catalog";

// import type { Product } from "@/lib/store/catalog";
// import { copy, type Locale } from "@/lib/i18n";

// import { Container } from "@/components/shared/Container";
// import { useCart } from "@/components/store/CartProvider";

// import { ProductCarousel } from "@/components/store/ProductCarousel";
// import { ProductDescription } from "@/components/store/ProductDescription";
// import { StickyMobilePurchaseBar } from "@/components/store/StickyMobilePurchaseBar";
// import { CartNotification } from "@/components/store/CartNotification";
// import { ProductGallery } from "@/components/store/ProductGallery";
// import { ProductReviews } from "@/components/store/ProductReviews";
// import { publishers as knownPublishers } from "@/lib/data";

// /* ==========================================================================
//    CONSTANTS
//    ========================================================================== */

// const WISHLIST_STORAGE_KEY = "ubh-wishlist";

// const MAX_RECOMMENDED_PRODUCTS = 8;

// /* ==========================================================================
//    TYPES
//    ========================================================================== */

// type ProductDetailsClientProps = {
//   locale: Locale;
//   product: Product;
// };

// type DetailRowProps = {
//   label: string;
//   value: string;
// };

// type TrustCardProps = {
//   icon: ReactNode;
//   title: string;
// };

// type InformationCardProps = {
//   icon: ReactNode;
//   title: string;
//   description: string;
// };

// type SectionHeadingProps = {
//   eyebrow?: string;
//   title: string;
//   description?: string;
// };

// type PriceDisplayProps = {
//   price: number;
//   oldPrice?: number;
//   currency: string;
//   locale: Locale;
//   saveLabel: string;
// };

// type QuantitySelectorProps = {
//   quantity: number;
//   stock: number;
//   onDecrease: () => void;
//   onIncrease: () => void;
// };

// /* ==========================================================================
//    HELPERS
//    ========================================================================== */

// function getSavedWishlist(): string[] {
//   try {
//     const saved = JSON.parse(
//       localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]",
//     );

//     return Array.isArray(saved)
//       ? saved.filter(
//           (item): item is string => typeof item === "string",
//         )
//       : [];
//   } catch {
//     return [];
//   }
// }

// function Detail({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
//       <span className="shrink-0 text-[11px] text-slate-400">
//         {label}
//       </span>

//       <span className="min-w-0 break-words text-right text-[11px] font-semibold text-slate-700">
//         {value}
//       </span>
//     </div>
//   );
// }

// function calculateDiscount(
//   price: number,
//   oldPrice?: number,
// ): number {
//   if (
//     !oldPrice ||
//     oldPrice <= 0 ||
//     oldPrice <= price ||
//     price < 0
//   ) {
//     return 0;
//   }

//   return Math.round(
//     ((oldPrice - price) / oldPrice) * 100,
//   );
// }

// function formatPrice(
//   price: number,
//   currency: string,
//   locale: Locale,
// ): string {
//   return new Intl.NumberFormat(
//     locale === "ar" ? "ar-AE" : "en-AE",
//     {
//       style: "currency",
//       currency: currency || "AED",
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     },
//   ).format(price);
// }

// function getPublisherHref(
//   locale: Locale,
//   publisher: string,
//   publisherSlug: string,
// ): string {
//   if (publisherSlug?.trim()) {
//     return `/${locale}/publishers/${encodeURIComponent(
//       publisherSlug,
//     )}?source=store`;
//   }

//   return `/${locale}/shop/products?publisher=${encodeURIComponent(
//     publisher,
//   )}`;
// }

// function getPublisherProducts(product: Product): Product[] {
//   const publisherName = product.publisher
//     .trim()
//     .toLocaleLowerCase();

//   return allProducts
//     .filter((item) => {
//       if (item.id === product.id) return false;

//       if (
//         product.publisherSlug &&
//         item.publisherSlug
//       ) {
//         return item.publisherSlug === product.publisherSlug;
//       }

//       return (
//         item.publisher.trim().toLocaleLowerCase() ===
//         publisherName
//       );
//     })
//     .slice(0, MAX_RECOMMENDED_PRODUCTS);
// }

// function getAuthorProducts(
//   product: Product,
//   excludedIds: Set<string>,
// ): Product[] {
//   const authors = new Set(
//     (product.authors ?? [])
//       .map((author) => author.trim().toLocaleLowerCase())
//       .filter(Boolean),
//   );

//   if (authors.size === 0) return [];

//   return allProducts
//     .filter(
//       (item) =>
//         !excludedIds.has(item.id) &&
//         (item.authors ?? []).some((author) =>
//           authors.has(author.trim().toLocaleLowerCase()),
//         ),
//     )
//     .slice(0, MAX_RECOMMENDED_PRODUCTS);
// }

// function getRelatedProducts(
//   product: Product,
//   excludedIds: Set<string>,
// ): Product[] {
//   const subjects = new Set(
//     (product.subjects ?? [])
//       .map((subject) => subject.trim().toLocaleLowerCase())
//       .filter(Boolean),
//   );

//   if (subjects.size === 0) return [];

//   return allProducts
//     .filter(
//       (item) =>
//         !excludedIds.has(item.id) &&
//         (item.subjects ?? []).some((subject) =>
//           subjects.has(subject.trim().toLocaleLowerCase()),
//         ),
//     )
//     .slice(0, MAX_RECOMMENDED_PRODUCTS);
// }

// /* ==========================================================================
//    PRODUCT PAGE
//    ========================================================================== */

// export default function ProductDetailsClient({
//   locale,
//   product,
// }: ProductDetailsClientProps) {
//   const router = useRouter();

//   const t = copy[locale].product;

//   const isArabic = locale === "ar";

//   const direction = isArabic ? "rtl" : "ltr";
//   const displayTitle = isArabic
//     ? product.titleAr || product.title
//     : product.title;
//   const displayDescription = isArabic
//     ? product.descriptionAr || product.description
//     : product.description;
//   const displayAuthors =
//     isArabic && product.authorsAr?.length
//       ? product.authorsAr
//       : product.authors ?? [];

//   const stock = Math.max(
//     0,
//     Number(product.stock) || 0,
//   );

//   const hasStock = stock > 0;

//   const publisherHref = getPublisherHref(
//     locale,
//     product.publisher,
//     product.publisherSlug,
//   );

//   const discount = calculateDiscount(
//     product.price,
//     product.oldPrice,
//   );

//   /* ------------------------------------------------------------------------
//      STATE
//      ------------------------------------------------------------------------ */

//   const [quantity, setQuantity] = useState(1);

//   const [wishlist, setWishlist] = useState(false);

//   const [wishlistReady, setWishlistReady] = useState(false);

//   const [cartMessage, setCartMessage] = useState(false);

//   const [shareMessage, setShareMessage] = useState(false);

//   const { addToCart } = useCart();

//   /* ------------------------------------------------------------------------
//      RESET WHEN PRODUCT CHANGES
//      ------------------------------------------------------------------------ */

//   useEffect(() => {
//     setQuantity(1);
//     setCartMessage(false);
//     setShareMessage(false);
//   }, [product.id]);

//   /* ------------------------------------------------------------------------
//      WISHLIST INITIALIZATION
//      ------------------------------------------------------------------------ */

//   useEffect(() => {
//     const saved = getSavedWishlist();

//     setWishlist(saved.includes(product.id));
//     setWishlistReady(true);
//   }, [product.id]);

//   /* ------------------------------------------------------------------------
//      WISHLIST
//      ------------------------------------------------------------------------ */

//   const toggleWishlist = useCallback(() => {
//     if (!wishlistReady) return;

//     const saved = getSavedWishlist();

//     const alreadySaved = saved.includes(product.id);

//     const next = alreadySaved
//       ? saved.filter((id) => id !== product.id)
//       : [...saved, product.id];

//     try {
//       localStorage.setItem(
//         WISHLIST_STORAGE_KEY,
//         JSON.stringify(next),
//       );

//       setWishlist(!alreadySaved);

//       window.dispatchEvent(
//         new Event("ubh-wishlist-updated"),
//       );
//     } catch {
//       setWishlist((current) => !current);
//     }
//   }, [product.id, wishlistReady]);

//   /* ------------------------------------------------------------------------
//      QUANTITY
//      ------------------------------------------------------------------------ */

//   const decreaseQuantity = useCallback(() => {
//     setQuantity((current) =>
//       Math.max(1, current - 1),
//     );
//   }, []);

//   const increaseQuantity = useCallback(() => {
//     setQuantity((current) =>
//       Math.min(stock, current + 1),
//     );
//   }, [stock]);

//   /* ------------------------------------------------------------------------
//      CART
//      ------------------------------------------------------------------------ */

//   const handleAddToCart = useCallback(() => {
//     if (!hasStock || quantity > stock) return;

//     const added = addToCart(product, quantity);

//     if (added) {
//       setCartMessage(true);
//     }
//   }, [
//     addToCart,
//     hasStock,
//     product,
//     quantity,
//     stock,
//   ]);

//   const handleBuyNow = useCallback(() => {
//     if (!hasStock || quantity > stock) return;

//     const added = addToCart(product, quantity);

//     if (added) {
//       router.push(`/${locale}/checkout`);
//     }
//   }, [
//     addToCart,
//     hasStock,
//     locale,
//     product,
//     quantity,
//     router,
//     stock,
//   ]);

//   /* ------------------------------------------------------------------------
//      SHARE
//      ------------------------------------------------------------------------ */

//   const handleShare = useCallback(async () => {
//     const url = window.location.href;

//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: product.title,
//           url,
//         });

//         return;
//       }

//       if (navigator.clipboard?.writeText) {
//         await navigator.clipboard.writeText(url);

//         setShareMessage(true);

//         return;
//       }

//       throw new Error("Clipboard unavailable");
//     } catch (error) {
//       if (
//         error instanceof Error &&
//         error.name === "AbortError"
//       ) {
//         return;
//       }

//       try {
//         const textArea = document.createElement("textarea");

//         textArea.value = url;
//         textArea.style.position = "fixed";
//         textArea.style.opacity = "0";

//         document.body.appendChild(textArea);

//         textArea.select();

//         const copied = document.execCommand("copy");

//         document.body.removeChild(textArea);

//         if (copied) {
//           setShareMessage(true);
//         }
//       } catch {
//         setShareMessage(false);
//       }
//     }
//   }, [product.title]);

//   /* ------------------------------------------------------------------------
//      RECOMMENDATIONS
//      ------------------------------------------------------------------------ */

//   const samePublisherProducts = useMemo(
//     () => getPublisherProducts(product),
//     [product],
//   );

//   const sameAuthorProducts = useMemo(() => {
//     const excludedIds = new Set([
//       product.id,
//       ...samePublisherProducts.map((item) => item.id),
//     ]);

//     return getAuthorProducts(product, excludedIds);
//   }, [product, samePublisherProducts]);

//   const relatedProducts = useMemo(() => {
//     const excludedIds = new Set([
//       product.id,
//       ...samePublisherProducts.map((item) => item.id),
//       ...sameAuthorProducts.map((item) => item.id),
//     ]);

//     return getRelatedProducts(product, excludedIds);
//   }, [
//     product,
//     samePublisherProducts,
//     sameAuthorProducts,
//   ]);

//   /* ------------------------------------------------------------------------
//      SPECIFICATIONS
//      ------------------------------------------------------------------------ */

//   const specifications = useMemo(() => {
//     const items: Array<{
//       label: string;
//       value: string | undefined;
//     }> = [
//       {
//         label: t.isbn,
//         value: product.isbn || undefined,
//       },
//       {
//         label: t.edition,
//         value: product.edition || undefined,
//       },
//       {
//         label: t.published,
//         value: product.publicationYear
//           ? String(product.publicationYear)
//           : undefined,
//       },
//       {
//         label: t.language,
//         value: product.language || undefined,
//       },
//       {
//         label: t.pages,
//         value: product.pages
//           ? String(product.pages)
//           : undefined,
//       },
//       {
//         label: t.format,
//         value: product.format || undefined,
//       },
//       {
//         label: isArabic ? "رقم ISBN-13" : "ISBN-13",
//         value: product.isbn13 || undefined,
//       },
//       {
//         label: isArabic ? "الناشر" : "Publisher",
//         value: product.publisher || undefined,
//       },
//       {
//         label: isArabic ? "نوع التجليد" : "Binding",
//         value: product.binding || undefined,
//       },
//       {
//         label: isArabic ? "نوع الغلاف" : "Cover type",
//         value: product.coverType || undefined,
//       },
//       {
//         label: isArabic ? "عدد المجلدات" : "Volume",
//         value: product.volume || undefined,
//       },
//       {
//         label: isArabic ? "السلسلة" : "Series",
//         value: product.series || undefined,
//       },
//       {
//         label: isArabic ? "المستوى الأكاديمي" : "Academic level",
//         value: product.academicLevel || undefined,
//       },
//       {
//         label: isArabic ? "بلد النشر" : "Publication country",
//         value: product.publicationCountry || undefined,
//       },
//       {
//         label: isArabic ? "تاريخ النشر" : "Publication date",
//         value: product.publicationDate || undefined,
//       },
//       {
//         label: isArabic ? "الأبعاد" : "Dimensions",
//         value: product.dimensions || undefined,
//       },
//       {
//         label: isArabic ? "الوزن" : "Weight",
//         value:
//           product.weight != null
//             ? `${product.weight} ${product.weightUnit || "g"}`
//             : undefined,
//       },
//       {
//         label: isArabic ? "الرمز الشريطي" : "Barcode",
//         value: product.barcode || undefined,
//       },
//       {
//         label: isArabic ? "رمز المنتج" : "SKU",
//         value: product.sku || undefined,
//       },
//     ];

//     return items.filter(
//       (item): item is { label: string; value: string } =>
//         Boolean(item.value?.trim()),
//     );
//   }, [product, t, isArabic]);

//   /* ------------------------------------------------------------------------
//      RENDER
//      ------------------------------------------------------------------------ */

// return (
//   <>
//     <main
//       dir={isArabic ? "rtl" : "ltr"}
//       className="min-h-screen overflow-hidden bg-[#f7f8fa] pb-24 lg:pb-12"
//     >
//       <Container>
//         <div className="py-5 sm:py-7 lg:py-10">

//           {/* Breadcrumb */}
//           {/* <nav className="mb-6 flex min-w-0 items-center gap-2 overflow-hidden text-[11px] text-slate-400 sm:mb-9">
//             <Link href={`/${locale}`} className="shrink-0 transition hover:text-[#b8822c]">
//               {t.home}
//             </Link>
//             <span>/</span>
//             <Link href={`/${locale}/shop`} className="shrink-0 transition hover:text-[#b8822c]">
//               {t.shop}
//             </Link>
//             <span>/</span>
//             <span className="truncate font-medium text-slate-600">
//               {product.title}
//             </span>
//           </nav> */}

//           {/* Main product */}
//           <section className="grid min-w-0 grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">

//             {/* Book gallery */}
//             <div className="min-w-0">
//               <div className="relative overflow-hidden rounded-2xl bg-[#eef0f3] p-4 sm:p-7 lg:p-9">
//                 {discount > 0 && (
//                   <span
//                     className={`absolute top-4 z-20 rounded-md bg-[#b8822c] px-3 py-1.5 text-[11px] font-bold text-white ${
//                       isArabic ? "right-4" : "left-4"
//                     }`}
//                   >
//                     -{discount}%
//                   </span>
//                 )}

//                 <button
//                   type="button"
//                   onClick={toggleWishlist}
//                   aria-label={wishlist ? t.removeFromWishlist : t.addToWishlist}
//                   className={`absolute top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition hover:text-[#b8822c] ${
//                     isArabic ? "left-4" : "right-4"
//                   }`}
//                 >
//                   <Heart
//                     size={18}
//                     fill={wishlist ? "currentColor" : "none"}
//                   />
//                 </button>

//                 <div className="mx-auto w-full max-w-[520px]">
//                   <ProductGallery
//                     locale={locale}
//                     title={product.title}
//                     cover={product.cover}
//                     images={product.images}
//                   />
//                 </div>
//               </div>

//               {/* Small product identifiers */}
//               <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
//                 <span className="text-[10px] text-slate-400">
//                   {t.isbn}:{" "}
//                   <span className="font-medium text-slate-600">
//                     {product.isbn || "—"}
//                   </span>
//                 </span>

//                 {product.edition && (
//                   <span className="text-[10px] text-slate-400">
//                     {t.edition}:{" "}
//                     <span className="font-medium text-slate-600">
//                       {product.edition}
//                     </span>
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Product information */}
//             <div className="min-w-0 lg:pt-2">

//               {/* Publisher */}
//               <Link
//                 href={`/${locale}/publishers/${product.publisherSlug}?source=store`}
//                 className="inline-flex max-w-full items-center gap-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#a87825] transition hover:text-[#061a37]"
//               >
//                 <span className="truncate">{product.publisher}</span>
//                 <span className="h-1 w-1 shrink-0 rounded-full bg-[#c89438]" />
//                 <span className="shrink-0 font-medium tracking-normal text-slate-400">
//                   {t.academicBook}
//                 </span>
//               </Link>

//               {/* Title */}
//               <h1 className="mt-4 break-words font-serif text-[28px] font-semibold leading-[1.2] tracking-tight text-[#10243d] sm:text-3xl md:text-4xl xl:text-[42px]">
//                 {product.title}
//               </h1>

//               {product.subtitle && (
//                 <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
//                   {product.subtitle}
//                 </p>
//               )}

//               {/* Authors */}
//               {product.authors.length > 0 && (
//                 <div className="mt-5">
//                   <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                     {t.authors}
//                   </p>

//                   <p className="flex flex-wrap gap-x-1 text-sm leading-6 text-slate-600">
//                     {product.authors.map((author, index) => (
//                       <span key={author}>
//                         {index > 0 && ", "}
//                         <Link
//                           href={`/${locale}/authors/${slugifyCatalogName(author)}`}
//                           className="transition hover:text-[#a87825] hover:underline"
//                         >
//                           {author}
//                         </Link>
//                       </span>
//                     ))}
//                   </p>
//                 </div>
//               )}

//               {/* Divider */}
//               <div className="my-6 h-px bg-slate-200" />

//               {/* Price */}
//               <div>
//                 <div className="flex flex-wrap items-center gap-3">
//                   <span className="text-3xl font-bold tracking-tight text-[#10243d] sm:text-4xl">
//                     {product.currency} {product.price.toFixed(2)}
//                   </span>

//                   {product.oldPrice && product.oldPrice > product.price && (
//                     <span className="text-base text-slate-400 line-through">
//                       {product.currency} {product.oldPrice.toFixed(2)}
//                     </span>
//                   )}

//                   {discount > 0 && (
//                     <span className="rounded bg-[#edf6ef] px-2 py-1 text-[10px] font-bold text-[#34734a]">
//                       {discount}% OFF
//                     </span>
//                   )}
//                 </div>

//                 {discount > 0 && product.oldPrice && (
//                   <p className="mt-1.5 text-xs text-[#34734a]">
//                     {t.save} {product.currency}{" "}
//                     {(product.oldPrice - product.price).toFixed(2)}
//                   </p>
//                 )}
//               </div>

//               {/* Availability */}
//               <div className="mt-5">
//                 {product.stock > 0 ? (
//                   <div className="inline-flex items-center gap-2 text-xs font-medium text-[#34734a]">
//                     <span className="h-2 w-2 rounded-full bg-[#398653]" />
//                     {t.inStock}
//                     <span className="text-slate-400">
//                       · {product.stock} {t.available}
//                     </span>
//                   </div>
//                 ) : (
//                   <span className="text-xs font-semibold text-red-600">
//                     {t.outOfStock}
//                   </span>
//                 )}
//               </div>

//               {/* Purchase controls */}
//               {product.stock > 0 && (
//                 <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
//                   <label className="mb-3 block text-[11px] font-semibold text-slate-600">
//                     {t.quantity}
//                   </label>

//                   <div className="flex flex-col gap-3 sm:flex-row">
//                     {/* Quantity */}
//                     <div className="flex h-12 w-full items-center justify-between rounded-lg border border-slate-200 sm:w-[132px]">
//                       <button
//                         type="button"
//                         onClick={decreaseQuantity}
//                         disabled={quantity <= 1}
//                         aria-label="Decrease quantity"
//                         className="flex h-full w-10 items-center justify-center text-slate-600 transition hover:text-[#b8822c] disabled:opacity-30"
//                       >
//                         <Minus size={15} />
//                       </button>

//                       <span className="text-sm font-semibold text-[#10243d]">
//                         {quantity}
//                       </span>

//                       <button
//                         type="button"
//                         onClick={increaseQuantity}
//                         disabled={quantity >= product.stock}
//                         aria-label="Increase quantity"
//                         className="flex h-full w-10 items-center justify-center text-slate-600 transition hover:text-[#b8822c] disabled:opacity-30"
//                       >
//                         <Plus size={15} />
//                       </button>
//                     </div>

//                     {/* Add to cart */}
//                     <button
//                       type="button"
//                       onClick={handleAddToCart}
//                       className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#10243d] px-5 text-xs font-bold text-white transition hover:bg-[#1b3658]"
//                     >
//                       <ShoppingCart size={16} />
//                       {cartMessage ? t.addedToCart : t.addToCart}
//                     </button>
//                   </div>

//                   {/* Buy now */}
//                   <button
//                     type="button"
//                     onClick={handleBuyNow}
//                     className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#c89438] px-5 text-xs font-bold text-white transition hover:bg-[#aa7929]"
//                   >
//                     {t.buyNow}
//                     {isArabic ? (
//                       <ArrowLeft size={15} />
//                     ) : (
//                       <ArrowRight size={15} />
//                     )}
//                   </button>
//                 </div>
//               )}

//               {/* Secondary actions */}
//               <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
//                 <button
//                   type="button"
//                   onClick={toggleWishlist}
//                   className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-[#b8822c]"
//                 >
//                   <Heart
//                     size={15}
//                     fill={wishlist ? "currentColor" : "none"}
//                   />
//                   {wishlist ? t.addedToWishlist : t.addToWishlist}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleShare}
//                   className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-[#10243d]"
//                 >
//                   <Share2 size={15} />
//                   {t.share}
//                 </button>
//               </div>

//               {/* Compact product information */}
//               <div className="mt-7 border-t border-slate-200 pt-5">
//                 <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3">
//                   {product.isbn && (
//                     <div className="min-w-0">
//                       <p className="text-[10px] text-slate-400">{t.isbn}</p>
//                       <p className="mt-1 break-all text-xs font-semibold text-slate-700">
//                         {product.isbn}
//                       </p>
//                     </div>
//                   )}

//                   {product.edition && (
//                     <div className="min-w-0">
//                       <p className="text-[10px] text-slate-400">{t.edition}</p>
//                       <p className="mt-1 text-xs font-semibold text-slate-700">
//                         {product.edition}
//                       </p>
//                     </div>
//                   )}

//                   {product.publicationYear && (
//                     <div>
//                       <p className="text-[10px] text-slate-400">{t.published}</p>
//                       <p className="mt-1 text-xs font-semibold text-slate-700">
//                         {product.publicationYear}
//                       </p>
//                     </div>
//                   )}

//                   {product.language && (
//                     <div>
//                       <p className="text-[10px] text-slate-400">{t.language}</p>
//                       <p className="mt-1 text-xs font-semibold text-slate-700">
//                         {product.language}
//                       </p>
//                     </div>
//                   )}

//                   {product.pages && (
//                     <div>
//                       <p className="text-[10px] text-slate-400">{t.pages}</p>
//                       <p className="mt-1 text-xs font-semibold text-slate-700">
//                         {product.pages}
//                       </p>
//                     </div>
//                   )}

//                   {product.format && (
//                     <div>
//                       <p className="text-[10px] text-slate-400">{t.format}</p>
//                       <p className="mt-1 text-xs font-semibold text-slate-700">
//                         {product.format}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Book description and subjects */}
//           <section className="mt-14 grid min-w-0 gap-8 border-t border-slate-200 pt-9 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">

//             <div className="min-w-0">
//               <div className="mb-5">
//                 <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b8822c]">
//                   {t.academicCoverage}
//                 </p>
//                 <h2 className="mt-2 font-serif text-2xl font-semibold text-[#10243d] sm:text-3xl">
//                   {t.aboutBook}
//                 </h2>
//               </div>

//               <ProductDescription
//                 title={t.aboutBook}
//                 description={product.description}
//                 locale={locale}
//               />

//               {product.subjects.length > 0 && (
//                 <div className="mt-9">
//                   <h3 className="text-sm font-bold text-[#10243d]">
//                     {t.subjectAreas}
//                   </h3>

//                   <div className="mt-4 flex flex-wrap gap-2">
//                     {product.subjects.map((subject) => (
//                       <span
//                         key={subject}
//                         className="rounded-md border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-600"
//                       >
//                         {subject}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Book details */}
//             <aside className="min-w-0">
//               <div className="border-t-2 border-[#c89438] bg-white p-5 sm:p-6">
//                 <h3 className="text-sm font-bold text-[#10243d]">
//                   {t.bookDetails}
//                 </h3>

//                 <div className="mt-5 space-y-4">
//                   <Detail label={t.isbn} value={product.isbn || "—"} />

//                   {product.edition && (
//                     <Detail label={t.edition} value={product.edition} />
//                   )}

//                   <Detail
//                     label={t.published}
//                     value={product.publicationYear?.toString() || "—"}
//                   />

//                   <Detail
//                     label={t.language}
//                     value={product.language || "—"}
//                   />

//                   <Detail
//                     label={t.pages}
//                     value={product.pages?.toString() || "—"}
//                   />

//                   <Detail
//                     label={t.format}
//                     value={product.format || "—"}
//                   />
//                 </div>

//                 <div className="mt-6 border-t border-slate-100 pt-5">
//                   <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                     {t.publisher}
//                   </p>

//                   <p className="mt-2 text-sm font-semibold text-[#10243d]">
//                     {product.publisher}
//                   </p>

//                   <Link
//                     href={
//                       knownPublishers.some(
//   (publisher: { slug: string }) =>
//     publisher.slug === product.publisherSlug,
// )
//                         ? `/${locale}/publishers/${product.publisherSlug}`
//                         : `/${locale}/shop/products?publisher=${encodeURIComponent(product.publisher)}`
//                     }
//                     className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#a87825] transition hover:text-[#10243d]"
//                   >
//                     {t.viewPublisher}
//                     {isArabic ? (
//                       <ArrowLeft size={13} />
//                     ) : (
//                       <ArrowRight size={13} />
//                     )}
//                   </Link>
//                 </div>
//               </div>
//             </aside>
//           </section>

//           {/* Reviews */}
//           <div className="mt-12 border-t border-slate-200 pt-10">
//             <ProductReviews locale={locale} demo />
//           </div>

//           {/* Recommendations */}
//           {samePublisherProducts.length > 0 && (
//             <ProductCarousel
//               locale={locale}
//               products={samePublisherProducts}
//               title={
//                 isArabic
//                   ? `المزيد من ${product.publisher}`
//                   : `More from ${product.publisher}`
//               }
//               subtitle={
//                 isArabic
//                   ? "اكتشف المزيد من إصدارات هذا الناشر"
//                   : "Explore more titles from this publisher."
//               }
//               maxProducts={8}
//               showAuthors
//               showPublisher={false}
//               showBadges
//               showOldPrice
//               showArrows
//               autoPlay={false}
//               showViewAll
//               viewAllHref={`/${locale}/shop/products?publisher=${encodeURIComponent(product.publisher)}`}
//               className="mt-14"
//             />
//           )}

//           {sameAuthorProducts.length > 0 && (
//             <ProductCarousel
//               locale={locale}
//               products={sameAuthorProducts}
//               title={isArabic ? "المزيد من المؤلف" : "More by the same author"}
//               subtitle={
//                 isArabic
//                   ? "اكتشف كتباً أخرى للمؤلف نفسه"
//                   : "Discover other books by the same author."
//               }
//               maxProducts={8}
//               showAuthors
//               showPublisher
//               showBadges
//               showOldPrice
//               showArrows
//               autoPlay={false}
//               showViewAll={false}
//               className="mt-14"
//             />
//           )}

//           {relatedProducts.length > 0 && (
//             <ProductCarousel
//               locale={locale}
//               products={relatedProducts}
//               title={isArabic ? "كتب ذات صلة" : "Related books"}
//               subtitle={
//                 isArabic
//                   ? "كتب أخرى في المجالات نفسها"
//                   : "Explore more books in the same subject areas."
//               }
//               maxProducts={8}
//               showAuthors
//               showPublisher
//               showBadges
//               showOldPrice
//               showArrows
//               autoPlay={false}
//               showViewAll={false}
//               className="mt-14"
//             />
//           )}
//         </div>
//       </Container>
//     </main>

//     <StickyMobilePurchaseBar
//       locale={locale}
//       price={product.price}
//       currency={product.currency}
//       stock={product.stock}
//       disabled={product.stock < quantity}
//       onAddToCart={handleAddToCart}
//     />

//     <CartNotification
//       locale={locale}
//       productTitle={product.title}
//       visible={cartMessage}
//       onClose={() => setCartMessage(false)}
//     />
//   </>
// );

// }

// /* ==========================================================================
//    PRODUCT IMAGE GALLERY
//    Handles missing ISBN covers and remote image failures gracefully.
//    ========================================================================== */

// type ProductImageGalleryProps = {
//   title: string;
//   locale: Locale;
//   cover?: string;
//   images?: string[];
//   gallery?: Array<{
//     url: string;
//     alt?: string;
//     type?: "cover" | "back-cover" | "spine" | "inside" | "other";
//   }>;
// };

// function ProductImageGallery({
//   title,
//   locale,
//   cover,
//   images = [],
//   gallery = [],
// }: ProductImageGalleryProps) {
//   const imageSources = useMemo(() => {
//     const candidates = [
//       ...gallery.map((item) => item.url),
//       ...images,
//       cover,
//     ]
//       .filter((item): item is string => Boolean(item?.trim()))
//       .map((src) => {
//         if (
//           src.includes("covers.openlibrary.org/") &&
//           !/[?&]default=/.test(src)
//         ) {
//           return `${src}${src.includes("?") ? "&" : "?"}default=false`;
//         }
//         return src;
//       });

//     return Array.from(new Set(candidates));
//   }, [cover, gallery, images]);

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [failedSources, setFailedSources] = useState<string[]>([]);

//   useEffect(() => {
//     setActiveIndex(0);
//     setFailedSources([]);
//   }, [title, imageSources.join("|")]);

//   const activeSource = imageSources[activeIndex];
//   const imageFailed = !activeSource || failedSources.includes(activeSource);

//   const markImageFailed = (src: string) => {
//     setFailedSources((current) =>
//       current.includes(src) ? current : [...current, src],
//     );
//   };

//   return (
//     <div className="mx-auto w-full max-w-[520px]">
//       <div className="relative aspect-[4/5] max-h-[620px] min-h-[300px] w-full overflow-hidden rounded-lg bg-[#f5f7fa] sm:min-h-[380px] lg:min-h-[420px]">
//         {!imageFailed ? (
//           <Image
//             key={activeSource}
//             src={activeSource}
//             alt={gallery.find((item) => item.url === activeSource)?.alt || title}
//             fill
//             unoptimized
//             priority
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 520px"
//             className="object-contain p-4 sm:p-6"
//             onError={() => markImageFailed(activeSource)}
//           />
//         ) : (
//           <div
//             role="img"
//             aria-label={locale === "ar" ? "الصورة غير موجودة" : "Image not found"}
//             className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#9aa8b8]"
//           >
//             <ImageOff size={38} strokeWidth={1.35} aria-hidden="true" />
//             <span className="text-sm font-medium text-[#718096]">
//               {locale === "ar" ? "الصورة غير موجودة" : "Image not found"}
//             </span>
//           </div>
//         )}
//       </div>

//       {imageSources.length > 1 && (
//         <div className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1">
//           {imageSources.map((src, index) => {
//             const failed = failedSources.includes(src);
//             return (
//               <button
//                 key={`${src}-${index}`}
//                 type="button"
//                 onClick={() => setActiveIndex(index)}
//                 aria-label={locale === "ar" ? `عرض صورة المنتج ${index + 1}` : `View product image ${index + 1}`}
//                 aria-pressed={activeIndex === index}
//                 className={`relative h-[68px] w-[54px] shrink-0 overflow-hidden rounded-md border bg-white p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] ${
//                   activeIndex === index
//                     ? "border-[#c89438] ring-1 ring-[#c89438]/30"
//                     : "border-[#e3eaf1] hover:border-[#9aabc0]"
//                 }`}
//               >
//                 {!failed ? (
//                   <Image
//                     src={src}
//                     alt=""
//                     fill
//                     unoptimized
//                     sizes="54px"
//                     className="object-contain"
//                     onError={() => markImageFailed(src)}
//                   />
//                 ) : (
//                   <span className="flex h-full items-center justify-center text-[#9aabc0]">
//                     <ImageOff size={17} />
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// /* ==========================================================================
//    PRODUCT BREADCRUMB
//    ========================================================================== */

// function ProductBreadcrumb({
//   locale,
//   title,
//   homeLabel,
//   shopLabel,
// }: {
//   locale: Locale;
//   title: string;
//   homeLabel: string;
//   shopLabel: string;
// }) {
//   return (
//     <div className="border-b border-[#e8edf2] bg-white">

//       <Container>

//         <nav
//           aria-label="Breadcrumb"
//           className="flex min-h-12 items-center gap-2 overflow-hidden text-[10px] text-[#91a2b6]"
//         >

//           <Link
//             href={`/${locale}`}
//             className="shrink-0 transition hover:text-[#064a98]"
//           >
//             {homeLabel}
//           </Link>

//           <span aria-hidden="true">/</span>

//           <Link
//             href={`/${locale}/shop`}
//             className="shrink-0 transition hover:text-[#064a98]"
//           >
//             {shopLabel}
//           </Link>

//           <span aria-hidden="true">/</span>

//           <span
//             aria-current="page"
//             className="min-w-0 truncate font-medium text-[#385477]"
//           >
//             {title}
//           </span>

//         </nav>

//       </Container>

//     </div>
//   );
// }

// /* ==========================================================================
//    DISCOUNT BADGE
//    ========================================================================== */

// function DiscountBadge({
//   discount,
//   isArabic,
// }: {
//   discount: number;
//   isArabic: boolean;
// }) {
//   return (
//     <span
//       className={`absolute top-4 z-20 rounded-full bg-[#c89438] px-3 py-1.5 text-xs font-bold text-white shadow-sm ${
//         isArabic ? "right-4" : "left-4"
//       }`}
//     >
//       -{discount}%
//     </span>
//   );
// }

// /* ==========================================================================
//    TRUST CARD
//    ========================================================================== */

// function TrustCard({
//   icon,
//   title,
// }: TrustCardProps) {
//   return (
//     <div className="flex min-h-[76px] items-center justify-center gap-2 rounded-xl border border-[#e8edf2] bg-white px-2 py-3 sm:flex-col sm:gap-2">

//       <div className="shrink-0 text-[#c89438]">
//         {icon}
//       </div>

//       <p className="text-center text-[9px] font-semibold leading-4 text-[#385477] sm:text-[10px]">
//         {title}
//       </p>

//     </div>
//   );
// }

// /* ==========================================================================
//    QUICK METADATA
//    ========================================================================== */

// function QuickMetadata({
//   label,
//   value,
// }: DetailRowProps) {
//   return (
//     <div className="flex flex-wrap items-center gap-2 text-[10px]">

//       <span className="text-[#91a2b6]">
//         {label}
//       </span>

//       <strong className="break-all font-semibold text-[#385477]">
//         {value}
//       </strong>

//     </div>
//   );
// }

// /* ==========================================================================
//    PRICE DISPLAY
//    ========================================================================== */

// function PriceDisplay({
//   price,
//   oldPrice,
//   currency,
//   locale,
//   saveLabel,
// }: PriceDisplayProps) {
//   const discount = calculateDiscount(price, oldPrice);

//   const hasDiscount = discount > 0 && Boolean(oldPrice);

//   return (
//     <div>

//       <div className="flex flex-wrap items-end gap-x-3 gap-y-2">

//         <span className="text-3xl font-bold tracking-tight text-[#06295a] sm:text-4xl">
//           {formatPrice(price, currency, locale)}
//         </span>

//         {hasDiscount && oldPrice && (
//           <span className="pb-1 text-sm text-[#9aabc0] line-through">
//             {formatPrice(oldPrice, currency, locale)}
//           </span>
//         )}

//         {hasDiscount && (
//           <span className="mb-1 rounded-full bg-[#edf7f0] px-2.5 py-1 text-[10px] font-bold text-[#3c7b58]">
//             -{discount}%
//           </span>
//         )}

//       </div>

//       {hasDiscount && oldPrice && (
//         <p className="mt-2 text-[11px] font-semibold text-[#3c7b58]">
//           {saveLabel}{" "}
//           {formatPrice(
//             oldPrice - price,
//             currency,
//             locale,
//           )}
//         </p>
//       )}

//     </div>
//   );
// }

// /* ==========================================================================
//    STOCK STATUS
//    ========================================================================== */

// function StockStatus({
//   stock,
//   inStockLabel,
//   outOfStockLabel,
//   availableLabel,
// }: {
//   stock: number;
//   inStockLabel: string;
//   outOfStockLabel: string;
//   availableLabel: string;
// }) {
//   if (stock <= 0) {
//     return (
//       <div className="mt-6 flex items-center gap-2">

//         <span className="h-2 w-2 rounded-full bg-red-500" />

//         <span className="text-xs font-semibold text-red-600">
//           {outOfStockLabel}
//         </span>

//       </div>
//     );
//   }

//   return (
//     <div className="mt-6 flex flex-wrap items-center gap-2">

//       <span className="h-2 w-2 rounded-full bg-[#3c7b58]" />

//       <span className="text-xs font-semibold text-[#3c7b58]">
//         {inStockLabel}
//       </span>

//       <span className="text-[10px] text-[#91a2b6]">
//         · {stock} {availableLabel}
//       </span>

//     </div>
//   );
// }

// /* ==========================================================================
//    QUANTITY SELECTOR
//    ========================================================================== */

// function QuantitySelector({
//   quantity,
//   stock,
//   onDecrease,
//   onIncrease,
// }: QuantitySelectorProps) {
//   return (
//     <div
//       className="flex h-12 w-full items-center justify-between rounded-lg border border-[#d8e1ea] bg-white"
//       aria-label="Quantity selector"
//     >

//       <button
//         type="button"
//         onClick={onDecrease}
//         disabled={quantity <= 1}
//         aria-label="Decrease quantity"
//         className="flex h-full w-10 items-center justify-center text-[#385477] transition hover:text-[#c89438] disabled:cursor-not-allowed disabled:opacity-30"
//       >
//         <Minus size={15} />
//       </button>

//       <span
//         aria-live="polite"
//         className="min-w-8 text-center text-sm font-bold tabular-nums text-[#06295a]"
//       >
//         {quantity}
//       </span>

//       <button
//         type="button"
//         onClick={onIncrease}
//         disabled={quantity >= stock}
//         aria-label="Increase quantity"
//         className="flex h-full w-10 items-center justify-center text-[#385477] transition hover:text-[#c89438] disabled:cursor-not-allowed disabled:opacity-30"
//       >
//         <Plus size={15} />
//       </button>

//     </div>
//   );
// }

// /* ==========================================================================
//    INFORMATION CARD
//    ========================================================================== */

// function InformationCard({
//   icon,
//   title,
//   description,
// }: InformationCardProps) {
//   return (
//     <div className="flex items-start gap-4 p-5">

//       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fbf6eb] text-[#c89438]">
//         {icon}
//       </div>

//       <div className="min-w-0">

//         <h3 className="text-xs font-bold text-[#06295a]">
//           {title}
//         </h3>

//         <p className="mt-1 text-[10px] leading-5 text-[#71869f]">
//           {description}
//         </p>

//       </div>

//     </div>
//   );
// }

// /* ==========================================================================
//    SECTION HEADING
//    ========================================================================== */

// function SectionHeading({
//   eyebrow,
//   title,
//   description,
// }: SectionHeadingProps) {
//   return (
//     <div>

//       {eyebrow && (
//         <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#b8822c]">
//           {eyebrow}
//         </p>
//       )}

//       <h2 className="mt-2 font-serif text-xl text-[#06295a] sm:text-2xl">
//         {title}
//       </h2>

//       {description && (
//         <p className="mt-2 text-xs leading-6 text-[#71869f]">
//           {description}
//         </p>
//       )}

//     </div>
//   );
// }

// /* ==========================================================================
//    DETAIL ROW
//    ========================================================================== */

// function DetailRow({
//   label,
//   value,
// }: DetailRowProps) {
//   return (
//     <div className="flex items-start justify-between gap-4 border-b border-[#edf1f5] pb-3 last:border-0 last:pb-0">

//       <span className="shrink-0 text-[10px] text-[#91a2b6]">
//         {label}
//       </span>

//       <span className="break-words text-end text-[10px] font-semibold text-[#385477]">
//         {value}
//       </span>

//     </div>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Heart,
  ImageOff,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  ShieldCheck,
  Star,
  ShoppingCart,
  Truck,
} from "lucide-react";

import {
  slugifyCatalogName,
  products as allProducts,
} from "@/lib/store/catalog";

import type { Product } from "@/lib/store/catalog";
import { copy, type Locale } from "@/lib/i18n";

import { Container } from "@/components/shared/Container";
import { useCart } from "@/components/store/CartProvider";

import { ProductCarousel } from "@/components/store/ProductCarousel";
import { ProductDescription } from "@/components/store/ProductDescription";
import { StickyMobilePurchaseBar } from "@/components/store/StickyMobilePurchaseBar";
import { CartNotification } from "@/components/store/CartNotification";
import ProductDelivery from "@/components/store/product/ProductDelivery";
import { ProductReviews } from "./product/ProductReviews";

/* ==========================================================================
   CONSTANTS
   ========================================================================== */

const WISHLIST_STORAGE_KEY = "ubh-wishlist";

const MAX_RECOMMENDED_PRODUCTS = 8;

/* ==========================================================================
   TYPES
   ========================================================================== */

type ProductDetailsClientProps = {
  locale: Locale;
  product: Product;
};

type DetailRowProps = {
  label: string;
  value: string;
};

type TrustCardProps = {
  icon: ReactNode;
  title: string;
};

type InformationCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

type PriceDisplayProps = {
  price: number;
  oldPrice?: number;
  currency: string;
  locale: Locale;
  saveLabel: string;
};

type QuantitySelectorProps = {
  quantity: number;
  stock: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

/* ==========================================================================
   HELPERS
   ========================================================================== */

function getSavedWishlist(): string[] {
  try {
    const saved = JSON.parse(
      localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]",
    );

    return Array.isArray(saved)
      ? saved.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function calculateDiscount(price: number, oldPrice?: number): number {
  if (!oldPrice || oldPrice <= 0 || oldPrice <= price || price < 0) {
    return 0;
  }

  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function formatPrice(price: number, currency: string, locale: Locale): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-AE" : "en-AE", {
    style: "currency",
    currency: currency || "AED",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function getPublisherHref(
  locale: Locale,
  publisher: string,
  publisherSlug: string,
): string {
  if (publisherSlug?.trim()) {
    return `/${locale}/publishers/${encodeURIComponent(
      publisherSlug,
    )}?source=store`;
  }

  return `/${locale}/shop/products?publisher=${encodeURIComponent(publisher)}`;
}

function getPublisherProducts(product: Product): Product[] {
  const publisherName = product.publisher.trim().toLocaleLowerCase();

  return allProducts
    .filter((item) => {
      if (item.id === product.id) return false;

      if (product.publisherSlug && item.publisherSlug) {
        return item.publisherSlug === product.publisherSlug;
      }

      return item.publisher.trim().toLocaleLowerCase() === publisherName;
    })
    .slice(0, MAX_RECOMMENDED_PRODUCTS);
}

function getAuthorProducts(
  product: Product,
  excludedIds: Set<string>,
): Product[] {
  const authors = new Set(
    (product.authors ?? [])
      .map((author) => author.trim().toLocaleLowerCase())
      .filter(Boolean),
  );

  if (authors.size === 0) return [];

  return allProducts
    .filter(
      (item) =>
        !excludedIds.has(item.id) &&
        (item.authors ?? []).some((author) =>
          authors.has(author.trim().toLocaleLowerCase()),
        ),
    )
    .slice(0, MAX_RECOMMENDED_PRODUCTS);
}

function getRelatedProducts(
  product: Product,
  excludedIds: Set<string>,
): Product[] {
  const subjects = new Set(
    (product.subjects ?? [])
      .map((subject) => subject.trim().toLocaleLowerCase())
      .filter(Boolean),
  );

  if (subjects.size === 0) return [];

  return allProducts
    .filter(
      (item) =>
        !excludedIds.has(item.id) &&
        (item.subjects ?? []).some((subject) =>
          subjects.has(subject.trim().toLocaleLowerCase()),
        ),
    )
    .slice(0, MAX_RECOMMENDED_PRODUCTS);
}

/* ==========================================================================
   PRODUCT PAGE
   ========================================================================== */

export default function ProductDetailsClient({
  locale,
  product,
}: ProductDetailsClientProps) {
  const router = useRouter();

  const t = copy[locale].product;
  const isArabic = locale === "ar";
  const direction = isArabic ? "rtl" : "ltr";

  const displayTitle = isArabic
    ? product.titleAr || product.title
    : product.title;

  const displayDescription = isArabic
    ? product.descriptionAr || product.description
    : product.description;

  const displayAuthors =
    isArabic && product.authorsAr?.length
      ? product.authorsAr
      : (product.authors ?? []);

  const stock = Math.max(0, Number(product.stock) || 0);

  const hasStock =
    stock > 0 &&
    product.active !== false &&
    product.availabilityStatus !== "out-of-stock" &&
    product.availabilityStatus !== "inactive";

  const publisherHref = getPublisherHref(
    locale,
    product.publisher,
    product.publisherSlug,
  );

  const discount = calculateDiscount(product.price, product.oldPrice);

  /* ------------------------------------------------------------------------
     STATE
  ------------------------------------------------------------------------ */

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [wishlistReady, setWishlistReady] = useState(false);
  const [cartMessage, setCartMessage] = useState(false);
  const [shareMessage, setShareMessage] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    setQuantity(1);
    setCartMessage(false);
    setShareMessage(false);
  }, [product.id]);

  useEffect(() => {
    const saved = getSavedWishlist();
    setWishlist(saved.includes(product.id));
    setWishlistReady(true);
  }, [product.id]);

  /* ------------------------------------------------------------------------
     WISHLIST
  ------------------------------------------------------------------------ */

  const toggleWishlist = useCallback(() => {
    if (!wishlistReady) return;

    const saved = getSavedWishlist();
    const alreadySaved = saved.includes(product.id);

    const next = alreadySaved
      ? saved.filter((id) => id !== product.id)
      : [...saved, product.id];

    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(next));

      setWishlist(!alreadySaved);

      window.dispatchEvent(new Event("ubh-wishlist-updated"));
    } catch {
      setWishlist((current) => !current);
    }
  }, [product.id, wishlistReady]);

  /* ------------------------------------------------------------------------
     QUANTITY
  ------------------------------------------------------------------------ */

  const decreaseQuantity = useCallback(() => {
    setQuantity((current) => Math.max(1, current - 1));
  }, []);

  const increaseQuantity = useCallback(() => {
    setQuantity((current) => Math.min(stock, current + 1));
  }, [stock]);

  /* ------------------------------------------------------------------------
     CART
  ------------------------------------------------------------------------ */

  const handleAddToCart = useCallback(() => {
    if (!hasStock || quantity > stock) return;

    const added = addToCart(product, quantity);

    if (added) {
      setCartMessage(true);
    }
  }, [addToCart, hasStock, product, quantity, stock]);

  const handleBuyNow = useCallback(() => {
    if (!hasStock || quantity > stock) return;

    const added = addToCart(product, quantity);

    if (added) {
      router.push(`/${locale}/checkout`);
    }
  }, [addToCart, hasStock, locale, product, quantity, router, stock]);

  /* ------------------------------------------------------------------------
     SHARE
  ------------------------------------------------------------------------ */

  const handleShare = useCallback(async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          url,
        });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShareMessage(true);
        return;
      }

      throw new Error("Clipboard unavailable");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      try {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";

        document.body.appendChild(textArea);
        textArea.select();

        const copied = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (copied) setShareMessage(true);
      } catch {
        setShareMessage(false);
      }
    }
  }, [product.title]);

  /* ------------------------------------------------------------------------
     RECOMMENDATIONS
  ------------------------------------------------------------------------ */

  const samePublisherProducts = useMemo(
    () => getPublisherProducts(product),
    [product],
  );

  const sameAuthorProducts = useMemo(() => {
    const excludedIds = new Set([
      product.id,
      ...samePublisherProducts.map((item) => item.id),
    ]);

    return getAuthorProducts(product, excludedIds);
  }, [product, samePublisherProducts]);

  const relatedProducts = useMemo(() => {
    const excludedIds = new Set([
      product.id,
      ...samePublisherProducts.map((item) => item.id),
      ...sameAuthorProducts.map((item) => item.id),
    ]);

    return getRelatedProducts(product, excludedIds);
  }, [product, samePublisherProducts, sameAuthorProducts]);

  /* ------------------------------------------------------------------------
     SPECIFICATIONS
  ------------------------------------------------------------------------ */

  const specifications = useMemo(() => {
    const items: Array<{
      label: string;
      value: string | undefined;
    }> = [
      { label: isArabic ? "الناشر" : "Publisher", value: product.publisher },
      {
        label: isArabic ? "المؤلفون" : "Author(s)",
        value: displayAuthors.join(", ") || undefined,
      },
      { label: t.isbn, value: product.isbn || product.isbn13 || undefined },
      { label: "ISBN-13", value: product.isbn13 || undefined },
      { label: "ISBN-10", value: product.isbn10 || undefined },
      {
        label: isArabic ? "رقم المنتج" : "SKU",
        value: product.sku || undefined,
      },
      {
        label: isArabic ? "الرمز الشريطي" : "Barcode",
        value: product.barcode || undefined,
      },
      {
        label: t.edition,
        value: product.editionStatement || product.edition || undefined,
      },
      {
        label: isArabic ? "تاريخ النشر" : "Publication date",
        value:
          product.publicationDate ||
          (product.publicationYear
            ? String(product.publicationYear)
            : undefined),
      },
      {
        label: isArabic ? "بلد النشر" : "Publication country",
        value: product.publicationCountry || undefined,
      },
      { label: t.language, value: product.language || undefined },
      {
        label: t.pages,
        value: product.pages != null ? String(product.pages) : undefined,
      },
      {
        label: t.format,
        value: product.format || product.productTypeLabel || undefined,
      },
      {
        label: isArabic ? "التجليد" : "Binding",
        value: product.binding || undefined,
      },
      {
        label: isArabic ? "نوع الغلاف" : "Cover type",
        value: product.coverType || undefined,
      },
      {
        label: isArabic ? "نوع الورق" : "Paper type",
        value: product.paperType || undefined,
      },
      {
        label: isArabic ? "نوع المحتوى الداخلي" : "Interior type",
        value: product.interiorType || undefined,
      },
      {
        label: isArabic ? "السلسلة" : "Series",
        value: product.series || undefined,
      },
      {
        label: isArabic ? "رقم المجلد في السلسلة" : "Series volume",
        value: product.seriesVolume || product.volume || undefined,
      },
      {
        label: isArabic ? "المستوى الأكاديمي" : "Academic level",
        value: product.academicLevel || undefined,
      },
      {
        label: isArabic ? "الفئة المستهدفة" : "Target audience",
        value: product.targetAudience?.join(", ") || undefined,
      },
      {
        label: isArabic ? "الأبعاد" : "Dimensions",
        value: product.dimensions || undefined,
      },
      {
        label: isArabic ? "الوزن" : "Weight",
        value:
          product.weight != null
            ? `${product.weight} ${product.weightUnit || "g"}`
            : undefined,
      },
      {
        label: isArabic ? "نوع المنتج" : "Product type",
        value: product.productTypeLabel || product.productType || undefined,
      },
      {
        label: isArabic ? "الحالة" : "Condition",
        value:
          product.condition === "new"
            ? isArabic
              ? "جديد"
              : "New"
            : product.condition === "used"
              ? isArabic
                ? "مستعمل"
                : "Used"
              : undefined,
      },
    ];

    return items.filter((item): item is { label: string; value: string } =>
      Boolean(item.value?.trim()),
    );
  }, [product, t, isArabic, displayAuthors]);

  const shortDescription = isArabic
    ? product.shortDescriptionAr || product.shortDescription
    : product.shortDescription;

  /* ------------------------------------------------------------------------
     RENDER
  ------------------------------------------------------------------------ */

  return (
    <>
      <main dir={direction} className="min-h-screen bg-white pb-24 lg:pb-12">
        <Container>
          <div className="mx-auto max-w-[1280px]">
            {/* MAIN PRODUCT LAYOUT */}
            <div className="grid grid-cols-1 items-start gap-8 py-6 sm:py-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 lg:py-9">
              {/* ==========================================================
                  LEFT COLUMN
                  Gallery + book information
              ========================================================== */}

              <div className="min-w-0 space-y-8">
                {/* PRODUCT GALLERY */}
                <section
                  aria-label={isArabic ? "صور المنتج" : "Product images"}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-[#f7f8fa] p-3 sm:p-5">
                    {discount > 0 && (
                      <span
                        className={`absolute top-5 z-20 rounded-full bg-[#b8822c] px-3 py-1.5 text-xs font-bold text-white shadow-sm ${
                          isArabic ? "right-5" : "left-5"
                        }`}
                      >
                        -{discount}%
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={toggleWishlist}
                      disabled={!wishlistReady}
                      aria-label={
                        wishlist ? t.removeFromWishlist : t.addToWishlist
                      }
                      aria-pressed={wishlist}
                      className={`absolute top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-600 shadow-sm transition hover:border-rose-100 hover:text-rose-500 ${
                        isArabic ? "left-4" : "right-4"
                      }`}
                    >
                      <Heart
                        size={18}
                        fill={wishlist ? "currentColor" : "none"}
                      />
                    </button>

                    <ProductImageGallery
                      title={displayTitle}
                      locale={locale}
                      cover={product.cover}
                      images={product.images}
                      gallery={product.gallery}
                    />
                  </div>

                  {/* TRUST INFORMATION */}
                  {/* <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-100 px-2 py-3">
                      <ShieldCheck
                        size={17}
                        className="shrink-0 text-[#b8822c]"
                      />
                      <span className="text-center text-[10px] font-medium text-slate-600 sm:text-xs">
                        {t.genuine}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-100 px-2 py-3">
                      <Truck size={17} className="shrink-0 text-[#b8822c]" />
                      <span className="text-center text-[10px] font-medium text-slate-600 sm:text-xs">
                        {t.uaeDelivery}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-100 px-2 py-3">
                      <RotateCcw
                        size={17}
                        className="shrink-0 text-[#b8822c]"
                      />
                      <span className="text-center text-[10px] font-medium text-slate-600 sm:text-xs">
                        {t.support}
                      </span>
                    </div>
                  </div> */}
                </section>

                {/* BOOK DESCRIPTION */}
                {product.description && (
                  <section className="border-t border-slate-200 pt-7">
                    <div className="mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b8822c]">
                        {isArabic ? "نظرة عامة" : "OVERVIEW"}
                      </p>

                      {/* <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#102b4e] sm:text-2xl">
                        {t.aboutBook}
                      </h2> */}
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-white">
                      <ProductDescription
                        title={t.aboutBook}
                        description={displayDescription}
                        locale={locale}
                      />
                    </div>
                  </section>
                )}

                {/* KEY HIGHLIGHTS */}
                {product.highlights?.length || product.keyFeatures?.length ? (
                  <section className="border-t border-slate-200 pt-7">
                    <h2 className="text-lg font-semibold text-[#102b4e]">
                      {isArabic ? "أبرز المميزات" : "Key highlights"}
                    </h2>

                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {(product.highlights?.length
                        ? product.highlights
                        : product.keyFeatures || []
                      ).map((item, index) => (
                        <li
                          key={`${item}-${index}`}
                          className="flex items-start gap-3 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-600"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f6eddd] text-[#a87522]">
                            <Check size={12} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {/* TOPICS */}
                {product.topics?.length ? (
                  <section className="border-t border-slate-200 pt-7">
                    <h2 className="text-lg font-semibold text-[#102b4e]">
                      {isArabic
                        ? "الموضوعات التي يغطيها الكتاب"
                        : "Topics covered"}
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.topics.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </section>
                ) : null}

                {/* TARGET AUDIENCE */}
                {product.targetAudience?.length ? (
                  <section className="border-t border-slate-200 pt-7">
                    <h2 className="text-lg font-semibold text-[#102b4e]">
                      {isArabic ? "لمن هذا الكتاب؟" : "Who this book is for"}
                    </h2>

                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {product.targetAudience.map((audience) => (
                        <li
                          key={audience}
                          className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                        >
                          <Check
                            size={16}
                            className="mt-1 shrink-0 text-[#b8822c]"
                          />
                          {audience}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {/* DIGITAL EDITION */}
                {product.digitalFormat?.length ||
                product.fileSize ||
                product.accessType ||
                product.openAccess != null ||
                product.drmProtected != null ? (
                  <section className="border-t border-slate-200 pt-7">
                    <h2 className="text-lg font-semibold text-[#102b4e]">
                      {isArabic
                        ? "تفاصيل النسخة الرقمية"
                        : "Digital edition details"}
                    </h2>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {product.digitalFormat?.length ? (
                        <InfoTile
                          label={isArabic ? "الصيغ الرقمية" : "Digital formats"}
                          value={product.digitalFormat.join(", ")}
                        />
                      ) : null}

                      {product.fileSize ? (
                        <InfoTile
                          label={isArabic ? "حجم الملف" : "File size"}
                          value={product.fileSize}
                        />
                      ) : null}

                      {product.accessType ? (
                        <InfoTile
                          label={isArabic ? "طريقة الوصول" : "Access type"}
                          value={product.accessType}
                        />
                      ) : null}

                      {product.openAccess != null ? (
                        <InfoTile
                          label={isArabic ? "الوصول المفتوح" : "Open access"}
                          value={
                            product.openAccess
                              ? isArabic
                                ? "نعم"
                                : "Yes"
                              : isArabic
                                ? "لا"
                                : "No"
                          }
                        />
                      ) : null}

                      {product.drmProtected != null ? (
                        <InfoTile
                          label={isArabic ? "حماية DRM" : "DRM protection"}
                          value={
                            product.drmProtected
                              ? isArabic
                                ? "مفعلة"
                                : "Protected"
                              : isArabic
                                ? "غير محمي"
                                : "Not protected"
                          }
                        />
                      ) : null}
                    </div>
                  </section>
                ) : null}

                {/* TABLE OF CONTENTS */}
                {product.tableOfContents?.length ? (
                  <section className="border-t border-slate-200 pt-7">
                    <h2 className="text-lg font-semibold text-[#102b4e]">
                      {isArabic ? "جدول المحتويات" : "Table of contents"}
                    </h2>

                    <div className="mt-4 divide-y divide-slate-100 border-y border-slate-100">
                      {product.tableOfContents.map((entry, index) => {
                        const chapter =
                          typeof entry === "string" ? entry : entry.title;

                        const sections =
                          typeof entry === "string"
                            ? []
                            : (entry.sections ?? []);

                        return (
                          <div key={`${chapter}-${index}`} className="py-4">
                            <h3 className="text-sm font-medium text-slate-700">
                              <span className="text-xs text-[#b8822c]">
                                {String(index + 1).padStart(2, "0")}
                              </span>

                              <span className="ms-3">{chapter}</span>
                            </h3>

                            {sections.length > 0 && (
                              <ul className="mt-3 grid gap-2 ps-8 sm:grid-cols-2">
                                {sections.map((section, sectionIndex) => (
                                  <li
                                    key={`${section}-${sectionIndex}`}
                                    className="text-xs leading-5 text-slate-500"
                                  >
                                    {section}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ) : null}

                {/* SUBJECT AREAS */}
                {(product.subjects ?? []).length > 0 && (
                  <section className="border-t border-slate-200 pt-7">
                    <h2 className="text-lg font-semibold text-[#102b4e]">
                      {t.subjectAreas}
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.category ? (
                        <span className="rounded-full bg-[#fbf6eb] px-3 py-2 text-xs font-medium text-[#8b641f]">
                          {product.category}
                        </span>
                      ) : null}

                      {product.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="rounded-full bg-slate-100 px-3 py-2 text-xs text-slate-600"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* BOOK SPECIFICATIONS */}

                {specifications.length > 0 && (
                  <section className="border-t border-slate-200 pt-5 sm:pt-6">
                    <div className="mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#b8822c]">
                        {isArabic ? "المواصفات" : "SPECIFICATIONS"}
                      </p>

                      <h2 className="mt-1 text-lg font-semibold text-[#102b4e]">
                        {t.bookDetails}
                      </h2>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white px-3 sm:px-4">
                      {specifications.map((item) => (
                        <DetailRow
                          key={item.label}
                          label={item.label}
                          value={item.value}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* ==========================================================
                  RIGHT COLUMN
                  Product details + purchase panel
              ========================================================== */}

              <div className="min-w-0 lg:sticky lg:top-24">
                {/* PUBLISHER AND PRODUCT TYPE */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <Link
                    href={publisherHref}
                    className="font-semibold text-[#a87522] transition hover:underline"
                  >
                    {product.publisher}
                  </Link>

                  <span className="text-slate-300">/</span>

                  <span className="text-slate-500">
                    {product.productTypeLabel || t.academicBook}
                  </span>

                  {product.condition && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                      {product.condition === "new"
                        ? isArabic
                          ? "جديد"
                          : "New"
                        : isArabic
                          ? "مستعمل"
                          : "Used"}
                    </span>
                  )}
                </div>

                {/* TITLE */}
                <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-[#102b4e] sm:text-3xl xl:text-[36px]">
                  {displayTitle}
                </h1>

                {/* SUBTITLE */}
                {(isArabic
                  ? product.subtitleAr || product.subtitle
                  : product.subtitle) && (
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {isArabic
                      ? product.subtitleAr || product.subtitle
                      : product.subtitle}
                  </p>
                )}

                {/* AUTHORS */}
                {displayAuthors.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-x-2 text-sm text-slate-600">
                    <span className="text-slate-400">{t.authors}:</span>

                    {displayAuthors.map((author, index) => (
                      <span key={`${author}-${index}`}>
                        <Link
                          href={`/${locale}/authors/${slugifyCatalogName(author)}`}
                          className="font-medium text-[#315477] hover:underline"
                        >
                          {author}
                        </Link>

                        {index < displayAuthors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                )}

                {/* RATINGS */}
                {/* Product Rating */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <div className="inline-flex items-center gap-1" dir="ltr">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={15}
                        className={
                          index < Math.round(product.rating ?? 4.7)
                            ? "fill-[#C89A48] text-[#C89A48]"
                            : "text-slate-300"
                        }
                      />
                    ))}
                  </div>

                  <span className="font-semibold text-[#9a6b1e]" dir="ltr">
                    {(product.rating ?? 4.7).toFixed(1)}
                  </span>

                  <span>
                    ({product.reviewCount ?? 24}{" "}
                    {isArabic ? "تقييم" : "reviews"})
                  </span>

                  <a
                    href="#product-reviews"
                    className="font-medium text-ubh-blue-bright transition-colors hover:text-ubh-gold"
                  >
                    {isArabic ? "عرض التقييمات" : "Read reviews"}
                  </a>
                </div>
                {/* {(product.rating != null || product.reviewCount != null) && (
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    {product.rating != null && (
                      <span className="inline-flex items-center gap-1 font-semibold text-[#9a6b1e]">
                        <Star size={15} fill="currentColor" />
                        {product.rating.toFixed(1)}
                      </span>
                    )}

                    {product.reviewCount != null && (
                      <span>
                        {product.reviewCount} {isArabic ? "تقييم" : "reviews"}
                      </span>
                    )}
                  </div>
                )} */}

                {/* SHORT DESCRIPTION */}
                {shortDescription && (
                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    {shortDescription}
                  </p>
                )}

                {/* QUICK BOOK METADATA */}
                {(product.isbn ||
                  product.edition ||
                  product.publicationYear) && (
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-y border-slate-100 py-4">
                    {product.isbn && (
                      <QuickMetadata label={t.isbn} value={product.isbn} />
                    )}

                    {product.edition && (
                      <QuickMetadata
                        label={t.edition}
                        value={product.edition}
                      />
                    )}

                    {product.publicationYear && (
                      <QuickMetadata
                        label={t.published}
                        value={String(product.publicationYear)}
                      />
                    )}
                  </div>
                )}

                {/* PRICE AND AVAILABILITY */}
                <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                  <PriceDisplay
                    price={product.price}
                    oldPrice={product.oldPrice}
                    currency={product.currency}
                    locale={locale}
                    saveLabel={t.save}
                  />

                  <div className="mt-3">
                    <StockStatus
                      stock={hasStock ? stock : 0}
                      inStockLabel={t.inStock}
                      outOfStockLabel={t.outOfStock}
                    />
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <ProductDelivery locale={locale} />
                  </div>
                </div>

                {/* PURCHASE CONTROLS */}
                {hasStock ? (
                  <div className="mt-5">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[112px_minmax(0,1fr)]">
                      <QuantitySelector
                        quantity={quantity}
                        stock={stock}
                        onDecrease={decreaseQuantity}
                        onIncrease={increaseQuantity}
                      />

                      <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={quantity > stock}
                        className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0b2b50] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#173f6b] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <ShoppingCart size={17} />
                        {cartMessage ? t.addedToCart : t.addToCart}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleBuyNow}
                      disabled={quantity > stock}
                      className="mt-3 flex h-12 w-full items-center justify-center rounded-lg bg-[#d5a64e] px-5 text-sm font-bold text-[#102b4e] shadow-sm transition hover:bg-[#c39237] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {t.buyNow}
                    </button>

                    <p className="mt-3 text-center text-xs text-slate-400">
                      {isArabic
                        ? "دفع آمن • توصيل داخل الإمارات"
                        : "Secure checkout • UAE delivery"}
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 rounded-lg border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
                    {t.outOfStock}
                  </div>
                )}

                {/* WISHLIST AND SHARE */}
                <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-slate-100 pt-4 text-sm text-slate-500">
                  <button
                    type="button"
                    onClick={toggleWishlist}
                    disabled={!wishlistReady}
                    aria-pressed={wishlist}
                    className="inline-flex items-center gap-2 transition hover:text-rose-500"
                  >
                    <Heart
                      size={17}
                      fill={wishlist ? "currentColor" : "none"}
                    />
                    {wishlist ? t.addedToWishlist : t.addToWishlist}
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 transition hover:text-[#0b2b50]"
                  >
                    {shareMessage ? <Check size={16} /> : <Share2 size={16} />}

                    {shareMessage
                      ? isArabic
                        ? "تم نسخ الرابط"
                        : "Link copied"
                      : t.share}
                  </button>
                </div>
              </div>
            </div>

            {/* PRODUCT REVIEWS */}
            <ProductReviews locale={locale} productId={product.id} />

            {/* ==========================================================
                PRODUCT RECOMMENDATIONS
            ========================================================== */}

            {samePublisherProducts.length > 0 && (
              <ProductCarousel
                locale={locale}
                products={samePublisherProducts}
                title={
                  isArabic
                    ? `المزيد من ${product.publisher}`
                    : `More from ${product.publisher}`
                }
                subtitle={
                  isArabic
                    ? "اكتشف المزيد من إصدارات هذا الناشر"
                    : "Explore more titles from this publisher."
                }
                maxProducts={MAX_RECOMMENDED_PRODUCTS}
                showAuthors
                showPublisher={false}
                showBadges
                showOldPrice
                showArrows
                autoPlay={false}
                showViewAll
                viewAllHref={`/${locale}/shop/products?publisher=${encodeURIComponent(product.publisher)}`}
                className="mt-12 border-t border-slate-100 pt-8"
              />
            )}

            {sameAuthorProducts.length > 0 && (
              <ProductCarousel
                locale={locale}
                products={sameAuthorProducts}
                title={
                  isArabic ? "المزيد من المؤلف" : "More by the same author"
                }
                subtitle={
                  isArabic
                    ? "اكتشف كتباً أخرى للمؤلف نفسه"
                    : "Discover other books by the same author."
                }
                maxProducts={MAX_RECOMMENDED_PRODUCTS}
                showAuthors
                showPublisher
                showBadges
                showOldPrice
                showArrows
                autoPlay={false}
                showViewAll={false}
                className="mt-12"
              />
            )}

            {relatedProducts.length > 0 && (
              <ProductCarousel
                locale={locale}
                products={relatedProducts}
                title={isArabic ? "كتب ذات صلة" : "Related books"}
                subtitle={
                  isArabic
                    ? "اكتشف كتباً أخرى في المجالات نفسها"
                    : "Discover more books in the same subject areas."
                }
                maxProducts={MAX_RECOMMENDED_PRODUCTS}
                showAuthors
                showPublisher
                showBadges
                showOldPrice
                showArrows
                autoPlay={false}
                showViewAll={false}
                className="mt-12"
              />
            )}
          </div>
        </Container>
      </main>

      {/* MOBILE PURCHASE BAR */}
      <StickyMobilePurchaseBar
        locale={locale}
        price={product.price}
        currency={product.currency}
        stock={stock}
        disabled={!hasStock || quantity > stock}
        onAddToCart={handleAddToCart}
      />

      {/* CART NOTIFICATION */}
      <CartNotification
        locale={locale}
        productTitle={product.title}
        visible={cartMessage}
        onClose={() => setCartMessage(false)}
      />
    </>
  );
}

/* ==========================================================================
   PRODUCT IMAGE GALLERY
   Handles missing ISBN covers and remote image failures gracefully.
   ========================================================================== */

type ProductImageGalleryProps = {
  title: string;
  locale: Locale;
  cover?: string;
  images?: string[];
  gallery?: Array<{
    url: string;
    alt?: string;
    type?: "cover" | "back-cover" | "spine" | "inside" | "other";
  }>;
};

function ProductImageGallery({
  title,
  locale,
  cover,
  images = [],
  gallery = [],
}: ProductImageGalleryProps) {
  const imageSources = useMemo(() => {
    const candidates = [...gallery.map((item) => item.url), ...images, cover]
      .filter((item): item is string => Boolean(item?.trim()))
      .map((src) => {
        if (
          src.includes("covers.openlibrary.org/") &&
          !/[?&]default=/.test(src)
        ) {
          return `${src}${src.includes("?") ? "&" : "?"}default=false`;
        }
        return src;
      });

    return Array.from(new Set(candidates));
  }, [cover, gallery, images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [failedSources, setFailedSources] = useState<string[]>([]);

  useEffect(() => {
    setActiveIndex(0);
    setFailedSources([]);
  }, [title, imageSources.join("|")]);

  const activeSource = imageSources[activeIndex];
  const imageFailed = !activeSource || failedSources.includes(activeSource);

  const markImageFailed = (src: string) => {
    setFailedSources((current) =>
      current.includes(src) ? current : [...current, src],
    );
  };

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="relative aspect-[4/5] min-h-[380px] w-full overflow-hidden rounded-lg bg-[#f5f7fa] sm:min-h-[460px] lg:min-h-[540px]">
        {!imageFailed ? (
          <Image
            key={activeSource}
            src={activeSource}
            alt={
              gallery.find((item) => item.url === activeSource)?.alt || title
            }
            fill
            unoptimized
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 520px"
            className="object-contain p-3 sm:p-5 lg:p-6"
            onError={() => markImageFailed(activeSource)}
          />
        ) : (
          <div
            role="img"
            aria-label={
              locale === "ar" ? "الصورة غير موجودة" : "Image not found"
            }
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#9aa8b8]"
          >
            <ImageOff size={38} strokeWidth={1.35} aria-hidden="true" />
            <span className="text-sm font-medium text-[#718096]">
              {locale === "ar" ? "الصورة غير موجودة" : "Image not found"}
            </span>
          </div>
        )}
      </div>

      {imageSources.length > 1 && (
        <div className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1">
          {imageSources.map((src, index) => {
            const failed = failedSources.includes(src);
            return (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={
                  locale === "ar"
                    ? `عرض صورة المنتج ${index + 1}`
                    : `View product image ${index + 1}`
                }
                aria-pressed={activeIndex === index}
                className={`relative h-[68px] w-[54px] shrink-0 overflow-hidden rounded-md border bg-white p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c89438] ${
                  activeIndex === index
                    ? "border-[#c89438] ring-1 ring-[#c89438]/30"
                    : "border-[#e3eaf1] hover:border-[#9aabc0]"
                }`}
              >
                {!failed ? (
                  <Image
                    src={src}
                    alt=""
                    fill
                    unoptimized
                    sizes="54px"
                    className="object-contain"
                    onError={() => markImageFailed(src)}
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-[#9aabc0]">
                    <ImageOff size={17} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   PRODUCT BREADCRUMB
   ========================================================================== */

function ProductBreadcrumb({
  locale,
  title,
  homeLabel,
  shopLabel,
}: {
  locale: Locale;
  title: string;
  homeLabel: string;
  shopLabel: string;
}) {
  return (
    <div className="border-b border-[#e8edf2] bg-white">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="flex min-h-12 items-center gap-2 overflow-hidden text-[10px] text-[#91a2b6]"
        >
          <Link
            href={`/${locale}`}
            className="shrink-0 transition hover:text-[#064a98]"
          >
            {homeLabel}
          </Link>

          <span aria-hidden="true">/</span>

          <Link
            href={`/${locale}/shop`}
            className="shrink-0 transition hover:text-[#064a98]"
          >
            {shopLabel}
          </Link>

          <span aria-hidden="true">/</span>

          <span
            aria-current="page"
            className="min-w-0 truncate font-medium text-[#385477]"
          >
            {title}
          </span>
        </nav>
      </Container>
    </div>
  );
}

/* ==========================================================================
   DISCOUNT BADGE
   ========================================================================== */

function DiscountBadge({
  discount,
  isArabic,
}: {
  discount: number;
  isArabic: boolean;
}) {
  return (
    <span
      className={`absolute top-4 z-20 rounded-full bg-[#c89438] px-3 py-1.5 text-xs font-bold text-white shadow-sm ${
        isArabic ? "right-4" : "left-4"
      }`}
    >
      -{discount}%
    </span>
  );
}

/* ==========================================================================
   TRUST CARD
   ========================================================================== */

function TrustCard({ icon, title }: TrustCardProps) {
  return (
    <div className="flex min-h-[76px] items-center justify-center gap-2 rounded-xl border border-[#e8edf2] bg-white px-2 py-3 sm:flex-col sm:gap-2">
      <div className="shrink-0 text-[#c89438]">{icon}</div>

      <p className="text-center text-[9px] font-semibold leading-4 text-[#385477] sm:text-[10px]">
        {title}
      </p>
    </div>
  );
}

/* ==========================================================================
   QUICK METADATA
   ========================================================================== */

function QuickMetadata({ label, value }: DetailRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[10px]">
      <span className="text-[#91a2b6]">{label}</span>

      <strong className="break-all font-semibold text-[#385477]">
        {value}
      </strong>
    </div>
  );
}

/* ==========================================================================
   PRICE DISPLAY
   ========================================================================== */

function PriceDisplay({
  price,
  oldPrice,
  currency,
  locale,
  saveLabel,
}: PriceDisplayProps) {
  const discount = calculateDiscount(price, oldPrice);

  const hasDiscount = discount > 0 && Boolean(oldPrice);

  return (
    <div>
      <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
        <span className="text-3xl font-bold tracking-tight text-[#06295a] sm:text-4xl">
          {formatPrice(price, currency, locale)}
        </span>

        {hasDiscount && oldPrice && (
          <span className="pb-1 text-sm text-[#9aabc0] line-through">
            {formatPrice(oldPrice, currency, locale)}
          </span>
        )}

        {hasDiscount && (
          <span className="mb-1 rounded-full bg-[#edf7f0] px-2.5 py-1 text-[10px] font-bold text-[#3c7b58]">
            -{discount}%
          </span>
        )}
      </div>

      {hasDiscount && oldPrice && (
        <p className="mt-2 text-[11px] font-semibold text-[#3c7b58]">
          {saveLabel} {formatPrice(oldPrice - price, currency, locale)}
        </p>
      )}
    </div>
  );
}

/* ==========================================================================
   STOCK STATUS
   ========================================================================== */

function StockStatus({
  stock,
  inStockLabel,
  outOfStockLabel,
}: {
  stock: number;
  inStockLabel: string;
  outOfStockLabel: string;
}) {
  if (stock <= 0) {
    return (
      <div className="mt-6 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-red-500" />

        <span className="text-xs font-semibold text-red-600">
          {outOfStockLabel}
        </span>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-[#3c7b58]" />

      <span className="text-xs font-semibold text-[#3c7b58]">
        {inStockLabel}
      </span>
    </div>
  );
}

/* ==========================================================================
   QUANTITY SELECTOR
   ========================================================================== */

function QuantitySelector({
  quantity,
  stock,
  onDecrease,
  onIncrease,
}: QuantitySelectorProps) {
  return (
    <div
      className="flex h-12 w-full items-center justify-between rounded-lg border border-[#d8e1ea] bg-white"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="flex h-full w-10 items-center justify-center text-[#385477] transition hover:text-[#c89438] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Minus size={15} />
      </button>

      <span
        aria-live="polite"
        className="min-w-8 text-center text-sm font-bold tabular-nums text-[#06295a]"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= stock}
        aria-label="Increase quantity"
        className="flex h-full w-10 items-center justify-center text-[#385477] transition hover:text-[#c89438] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}

/* ==========================================================================
   INFORMATION CARD
   ========================================================================== */

function InformationCard({ icon, title, description }: InformationCardProps) {
  return (
    <div className="flex items-start gap-4 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fbf6eb] text-[#c89438]">
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="text-xs font-bold text-[#06295a]">{title}</h3>

        <p className="mt-1 text-[10px] leading-5 text-[#71869f]">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   SECTION HEADING
   ========================================================================== */

function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div>
      {eyebrow && (
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#b8822c]">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-2 font-serif text-xl text-[#06295a] sm:text-2xl">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-xs leading-6 text-[#71869f]">{description}</p>
      )}
    </div>
  );
}

/* ==========================================================================
   INFORMATION TILE
   ========================================================================== */

function InfoTile({ label, value }: DetailRowProps) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
      <p className="text-[10px] text-slate-400">{label}</p>
      <p className="mt-1 break-words text-xs font-semibold text-[#385477]">
        {value}
      </p>
    </div>
  );
}

/* ==========================================================================
   DETAIL ROW
   ========================================================================== */

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-2.5 last:border-0">
      <span className="text-xs text-slate-500">{label}</span>

      <span className="min-w-0 break-words text-end text-xs font-medium leading-5 text-[#385477]">
        {value}
      </span>
    </div>
  );
}
