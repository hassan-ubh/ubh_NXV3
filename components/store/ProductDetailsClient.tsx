
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { slugifyCatalogName, products as allProducts } from "@/lib/store/catalog";
import type { Product } from "@/lib/store/catalog";
import { ProductCarousel } from "@/components/store/ProductCarousel";

import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Share2,
  MapPin,
  BookOpen,
} from "lucide-react";

import { copy, type Locale } from "@/lib/i18n";
import { publishers as knownPublishers } from "@/lib/data";

import { Container } from "@/components/shared/Container";
import { useCart } from "@/components/store/CartProvider";

import { ProductGallery } from "@/components/store/ProductGallery";
import { ProductDescription } from "@/components/store/ProductDescription";
import { ProductReviews } from "@/components/store/ProductReviews";
import { StickyMobilePurchaseBar } from "@/components/store/StickyMobilePurchaseBar";
import { CartNotification } from "@/components/store/CartNotification";

/* ==========================================================================
   PRODUCT PAGE
   ========================================================================== */

export default function ProductDetailsClient({
  locale,
  product,
}: {
  locale: Locale;
  product: Product;
}) {
  const router = useRouter();
  const t = copy[locale].product;
  const isArabic = locale === "ar";

  const samePublisherProducts = allProducts
    .filter((item) => {
      if (item.id === product.id) return false;
      if (product.publisherSlug && item.publisherSlug) {
        return item.publisherSlug === product.publisherSlug;
      }
      return (
        item.publisher.trim().toLocaleLowerCase() ===
        product.publisher.trim().toLocaleLowerCase()
      );
    })
    .slice(0, 8);

  const authorKeys = new Set(
    product.authors
      .map((author) => author.trim().toLocaleLowerCase())
      .filter(Boolean),
  );
  const sameAuthorProducts = allProducts
    .filter(
      (item) =>
        item.id !== product.id &&
        !samePublisherProducts.some((book) => book.id === item.id) &&
        item.authors.some((author) =>
          authorKeys.has(author.trim().toLocaleLowerCase()),
        ),
    )
    .slice(0, 8);

  const subjectKeys = new Set(
    product.subjects
      .map((subject) => subject.trim().toLocaleLowerCase())
      .filter(Boolean),
  );
  const relatedProducts = allProducts
    .filter(
      (item) =>
        item.id !== product.id &&
        !samePublisherProducts.some((book) => book.id === item.id) &&
        !sameAuthorProducts.some((book) => book.id === item.id) &&
        item.subjects.some((subject) =>
          subjectKeys.has(subject.trim().toLocaleLowerCase()),
        ),
    )
    .slice(0, 8);

  /* ------------------------------------------------------------------------
     STATE
     ------------------------------------------------------------------------ */

  /* ------------------------------------------------------------------------
   STATE
   ------------------------------------------------------------------------ */
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("ubh-wishlist") || "[]",
      ) as string[];
      setWishlist(saved.includes(product.id));
    } catch {
      setWishlist(false);
    }
  }, [product.id]);
  const toggleWishlist = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("ubh-wishlist") || "[]",
      ) as string[];
      const next = saved.includes(product.id)
        ? saved.filter((id) => id !== product.id)
        : [...saved, product.id];
      localStorage.setItem("ubh-wishlist", JSON.stringify(next));
      setWishlist(next.includes(product.id));
      window.dispatchEvent(new Event("ubh-wishlist-updated"));
    } catch {
      setWishlist((current) => !current);
    }
  };
  const [cartMessage, setCartMessage] = useState(false);

  const { addToCart: addProductToCart } = useCart();

  // const handleAddToCart = () => {
  //   const added = addProductToCart(product, quantity);

  //   if (!added) {
  //     return;
  //   }

  //   setCartMessage(true);

  //   setTimeout(() => {
  //     setCartMessage(false);
  //   }, 3000);
  // };
  const handleAddToCart = () => {
    const added = addProductToCart(product, quantity);

    if (added) {
      setCartMessage(true);
    }
  };

  const handleBuyNow = () => {
    if (product.stock < quantity || product.stock < 1) return;
    const added = addProductToCart(product, quantity);
    if (added) router.push(`/${locale}/checkout`);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCartMessage(false);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        /* Clipboard may be unavailable. */
      }
    }
  };

  /* ------------------------------------------------------------------------
     DISCOUNT
     ------------------------------------------------------------------------ */

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100,
        )
      : 0;

  /* ------------------------------------------------------------------------
     CART
     ------------------------------------------------------------------------ */

  /* ------------------------------------------------------------------------
     QUANTITY
     ------------------------------------------------------------------------ */

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(product.stock, current + 1));
  };

  /* ------------------------------------------------------------------------
     RENDER
     ------------------------------------------------------------------------ */

  return (
    <>
      {/* ================================================================== */}
      {/* HEADER                                                             */}
      {/* ================================================================== */}

      <header
        dir={isArabic ? "rtl" : "ltr"}
        className="bg-ubh-navy text-white"
      >
        {/*
        <Container>
          <div className="pb-6 pt-4">
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <Link href={`/${locale}`} className="hover:text-white">
                {t.home}
              </Link>

              <span>›</span>

              <Link href={`/${locale}/shop`} className="hover:text-white">
                {t.shop}
              </Link>

              <span>›</span>

              <span className="max-w-[250px] truncate text-white/80">
                {product.title}
              </span>
            </div>
          </div>
        </Container>
         */}
        
      </header>

      {/* ================================================================== */}
      {/* MAIN                                                               */}
      {/* ================================================================== */}

      <main
        dir={isArabic ? "rtl" : "ltr"}
        className="bg-ubh-canvas pb-20 lg:pb-0"
      >
        <Container>
          <div className="py-8 md:py-12">
            {/* Back */}
            <Link
              href={`/${locale}/shop`}
              className="mb-8 inline-flex items-center gap-2 text-[10px] font-semibold text-ubh-blue-bright hover:text-ubh-gold"
            >
              {isArabic ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}

              {t.backToShop}
            </Link>

            {/* ============================================================ */}
            {/* PRODUCT AREA                                                  */}
            {/* ============================================================ */}

            {/* <div className="grid gap-10 lg:grid-cols-[460px_1fr] xl:grid-cols-[980px_minmax(0,1fr)]"> */}
            <div className="grid gap-10 lg:grid-cols-[500px_1fr]">
              {/* ========================================================== */}
              {/* IMAGE                                                       */}
              {/* ========================================================== */}

              <div className="min-w-0">
                <div className="relative">
                  {discount > 0 && (
                    <span
                      className={`absolute top-4 z-20 rounded-full bg-ubh-gold px-3 py-1.5 text-xs font-bold text-white ${
                        isArabic ? "right-4" : "left-4"
                      }`}
                    >
                      -{discount}%
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={toggleWishlist}
                    aria-label={wishlist ? t.removeFromWishlist : t.addToWishlist}
                    className={`absolute top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-ubh-border bg-white text-ubh-muted shadow-sm transition hover:text-ubh-gold ${
                      isArabic ? "left-4" : "right-4"
                    }`}
                  >
                    <Heart size={18} fill={wishlist ? "currentColor" : "none"} />
                  </button>

                  <ProductGallery
  locale={locale}
  title={product.title}
  cover={product.cover}
  images={product.images}
/>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <TrustCard icon={<ShieldCheck size={17} />} title={t.genuine} />
                  <TrustCard icon={<Truck size={17} />} title={t.uaeDelivery} />
                  <TrustCard icon={<RotateCcw size={17} />} title={t.support} />
                </div>
              </div>

              {/* ========================================================== */}
              {/* INFORMATION                                                  */}
              {/* ========================================================== */}

              <div className="lg:pt-2">
                {/* Publisher */}
                {/* <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ubh-gold">
                    {product.publisher}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-ubh-gold" />

                  <span className="text-[10px] text-ubh-muted-light">
                    {t.academicBook}
                  </span>
                </div> */}
                {/* Publisher */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/${locale}/publishers/${product.publisherSlug}?source=store`}
                    className="text-[10px] font-bold uppercase tracking-[0.18em] text-ubh-gold transition-colors hover:text-ubh-blue"
                  >
                    {product.publisher}
                  </Link>

                  <span className="h-1 w-1 rounded-full bg-ubh-gold" />

                  <span className="text-[10px] text-ubh-muted-light">
                    {t.academicBook}
                  </span>
                </div>

                {/* Title */}
                <h1 className="mt-3 font-serif text-3xl leading-tight text-ubh-blue md:text-4xl xl:text-[46px]">
                  {product.title}
                </h1>

                {/* Subtitle */}
                {product.subtitle && (
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-ubh-muted">
                    {product.subtitle}
                  </p>
                )}

                {/* Authors */}
                {/* <div className="mt-5">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-ubh-muted-light">
                    {t.authors}
                  </span>

                  <p className="mt-1 text-xs leading-6 text-ubh-blue-muted">
                    {product.authors.join(", ")}
                  </p>
                </div> */}
                {/* Authors */}
                <div className="mt-5">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-ubh-muted-light">
                    {t.authors}
                  </span>

                  <p className="mt-1 text-xs leading-6 text-ubh-blue-muted">
                    {product.authors.map((author, index) => (
                      <span key={author}>
                        {index > 0 && ", "}

                        <Link
                          href={`/${locale}/authors/${slugifyCatalogName(author)}`}
                          className="transition-colors hover:text-ubh-gold hover:underline"
                        >
                          {author}
                        </Link>
                      </span>
                    ))}
                  </p>
                </div>

                {/* ISBN / Edition */}
                <div className="mt-5 flex flex-wrap gap-5 border-y border-[#e4eaf0] py-4">
                  <span className="text-[10px] text-ubh-muted">
                    {t.isbn}:{" "}
                    <strong className="text-ubh-blue-muted">{product.isbn}</strong>
                  </span>

                  {product.edition && (
                    <span className="text-[10px] text-ubh-muted">
                      {t.edition}:{" "}
                      <strong className="text-ubh-blue-muted">
                        {product.edition}
                      </strong>
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mt-7">
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-bold text-ubh-blue">
                      {product.currency} {product.price.toFixed(2)}
                    </span>

                    {product.oldPrice && product.oldPrice > product.price && (
                      <span className="pb-1 text-sm text-[#9aabc0] line-through">
                        {product.currency} {product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {discount > 0 && product.oldPrice && (
                    <p className="mt-1 text-[10px] font-semibold text-[#3c7b58]">
                      {t.save} {product.currency}{" "}
                      {(product.oldPrice - product.price).toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Stock */}
                <div className="mt-5">
                  {product.stock > 0 ? (
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-[#3c7b58]">
                      <span className="h-2 w-2 rounded-full bg-[#3c7b58]" />

                      {t.inStock}

                      <span className="font-normal text-ubh-muted-light">
                        — {product.stock} {t.available}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-red-600">
                      {t.outOfStock}
                    </span>
                  )}
                </div>

                {/* ======================================================== */}
                {/* BUYING AREA                                                */}
                {/* ======================================================== */}

                {product.stock > 0 && (
                  <div className="mt-6">
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-ubh-muted">
                      {t.quantity}
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      {/* Quantity */}
                      <div className="flex h-12 w-fit items-center rounded border border-[#d8e1ea] bg-white">
                        <button
                          type="button"
                          onClick={decreaseQuantity}
                          disabled={quantity === 1}
                          aria-label="Decrease quantity"
                          className="flex h-full w-11 items-center justify-center text-ubh-blue-muted hover:text-ubh-gold disabled:opacity-30"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="w-10 text-center text-sm font-semibold text-ubh-blue">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={increaseQuantity}
                          disabled={quantity >= product.stock}
                          aria-label="Increase quantity"
                          className="flex h-full w-11 items-center justify-center text-ubh-blue-muted hover:text-ubh-gold disabled:opacity-30"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      {/* Add to Cart */}
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="flex h-12 flex-1 items-center justify-center gap-2 rounded bg-ubh-blue px-7 text-xs font-bold text-white transition hover:bg-ubh-blue-deep"
                      >
                        <ShoppingCart size={17} />

                        {cartMessage ? t.addedToCart : t.addToCart}
                      </button>

                      {/* Buy Now */}
                      <button
                        type="button"
                        onClick={handleBuyNow}
                        className="flex h-12 flex-1 items-center justify-center gap-2 rounded bg-ubh-gold-light px-7 text-xs font-bold text-white transition hover:bg-ubh-gold disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {t.buyNow}
                        {isArabic ? (
                          <ArrowLeft size={15} />
                        ) : (
                          <ArrowRight size={15} />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Wishlist / Share */}
                <div className="mt-4 flex gap-5">
                  <button
                    type="button"
                    onClick={toggleWishlist}
                    className="flex items-center gap-2 text-[10px] font-semibold text-ubh-muted hover:text-ubh-gold"
                  >
                    <Heart
                      size={14}
                      fill={wishlist ? "currentColor" : "none"}
                    />

                    {wishlist ? t.addedToWishlist : t.addToWishlist}
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex items-center gap-2 text-[10px] font-semibold text-ubh-muted hover:text-ubh-blue-bright"
                  >
                    <Share2 size={14} />
                    {t.share}
                  </button>
                </div>

                {/* Delivery */}
                <div className="mt-7 overflow-hidden rounded-lg border border-ubh-border bg-white">
                  <div className="flex gap-4 border-b border-[#edf1f5] p-5">
                    <Truck size={20} className="shrink-0 text-ubh-gold" />

                    <div>
                      <p className="text-xs font-bold text-ubh-blue">
                        {t.deliveryTitle}
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-ubh-muted">
                        {t.deliveryDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-5">
                    <MapPin size={20} className="shrink-0 text-ubh-gold" />

                    <div>
                      <p className="text-xs font-bold text-ubh-blue">
                        {t.ubh}
                      </p>

                      <p className="mt-1 text-[10px] text-ubh-muted">
                        {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* LOWER INFORMATION                                             */}
            {/* ============================================================ */}

            <div className="mt-14 grid gap-7 lg:grid-cols-[1fr_320px]">
              <div className="space-y-6">
                {/* Expandable book description */}
                <ProductDescription
                  title={t.aboutBook}
                  description={product.description}
                  locale={locale}
                />

                {/* Subjects */}
                <section className="rounded-lg border border-ubh-border bg-white p-6 md:p-8">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-ubh-gold">
                    {t.academicCoverage}
                  </span>

                  <h2 className="mt-2 font-serif text-2xl text-ubh-blue">
                    {t.subjectAreas}
                  </h2>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="rounded-full bg-[#f0f5f9] px-4 py-2 text-[10px] font-medium text-[#46617f]"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              {/* Details */}
              <aside className="space-y-6">
                <section className="rounded-lg border border-ubh-border bg-white p-6">
                  <h3 className="text-sm font-bold text-ubh-blue">
                    {t.bookDetails}
                  </h3>

                  <div className="mt-5 space-y-4">
                    <Detail label={t.isbn} value={product.isbn ?? "—"} />

                    {product.edition && (
                      <Detail label={t.edition} value={product.edition} />
                    )}

                    <Detail
                      label={t.published}
                      value={product.publicationYear?.toString() || "—"}
                    />

                    <Detail
                      label={t.language}
                      value={product.language ?? "—"}
                    />

                    <Detail
                      label={t.pages}
                      value={product.pages?.toString() ?? "—"}
                    />

                    <Detail label={t.format} value={product.format ?? "—"} />
                  </div>
                </section>

                {/* Publisher */}
                <section className="rounded-lg border border-ubh-border bg-white p-6">
                  <h3 className="text-sm font-bold text-ubh-blue">
                    {t.publisher}
                  </h3>

                  <div className="mt-4 flex h-24 items-center justify-center rounded bg-ubh-canvas">
                    {product.publisherLogo ? (
                      <div className="relative h-16 w-36">
                        <Image
                          src={product.publisherLogo}
                          alt={product.publisher}
                          fill
                          sizes="144px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span className="px-4 text-center text-sm font-semibold text-ubh-blue-muted">
                        {product.publisher}
                      </span>
                    )}
                  </div>

                  <Link
                    href={
                      knownPublishers.some(
                        (publisher) => publisher.slug === product.publisherSlug,
                      )
                        ? `/${locale}/publishers/${product.publisherSlug}`
                        : `/${locale}/shop/products?publisher=${encodeURIComponent(product.publisher)}`
                    }
                    className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-ubh-blue-bright hover:text-ubh-gold"
                  >
                    {t.viewPublisher}

                    {isArabic ? (
                      <ArrowLeft size={12} />
                    ) : (
                      <ArrowRight size={12} />
                    )}
                  </Link>
                </section>
              </aside>
            </div>

            <div className="mt-8">
              <ProductReviews locale={locale} demo />
            </div>

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
                maxProducts={8}
                showAuthors
                showPublisher={false}
                showBadges
                showOldPrice
                showArrows
                autoPlay={false}
                showViewAll
                viewAllHref={`/${locale}/shop/products?publisher=${encodeURIComponent(product.publisher)}`}
                className="mt-12"
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
                maxProducts={8}
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
                    ? "كتب أخرى في المجالات نفسها"
                    : "Explore more books in the same subject areas."
                }
                maxProducts={8}
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

      {/* ================================================================== */}
      {/* FOOTER                                                             */}
      {/* ================================================================== */}
      {/* ================================================================== */}
      {/* CART NOTIFICATION                                                  */}
      {/* ================================================================== */}
      <StickyMobilePurchaseBar
        locale={locale}
        price={product.price}
        currency={product.currency}
        stock={product.stock}
        disabled={product.stock < quantity}
        onAddToCart={handleAddToCart}
      />

      <CartNotification
        locale={locale}
        productTitle={product.title}
        visible={cartMessage}
        onClose={() => setCartMessage(false)}
      />

      {/* {cartMessage && (
        <div
          className={`fixed bottom-5 z-50 flex max-w-[360px] items-center gap-3 rounded-lg bg-ubh-blue px-5 py-4 text-white shadow-2xl ${
            isArabic ? "left-5" : "right-5"
          }`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ubh-gold-light">
            <Check size={17} />
          </div>

          <div>
            <p className="text-xs font-bold">
              {t.cartNotification}
            </p>

            <p className="mt-1 text-[10px] text-white/60">
              {product.title}
            </p>
          </div>

          <Link
            href={`/${locale}/cart`}
            className="ml-auto whitespace-nowrap text-[10px] font-bold text-ubh-gold-light hover:text-white"
          >
            {t.viewCart} →
          </Link>
        </div>
      )} */}
    </>
  );
}

/* ==========================================================================
   TRUST CARD
   ========================================================================== */

function TrustCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="rounded border border-ubh-border bg-white p-3 text-center">
      <div className="flex justify-center text-ubh-gold">{icon}</div>

      <p className="mt-2 text-[8px] font-bold text-ubh-blue-muted">{title}</p>
    </div>
  );
}

/* ==========================================================================
   DETAIL
   ========================================================================== */

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-5 border-b border-[#edf1f5] pb-3 last:border-0 last:pb-0">
      <span className="text-[10px] text-ubh-muted-light">{label}</span>

      <span className="text-right text-[10px] font-semibold text-ubh-blue-muted">
        {value}
      </span>
    </div>
  );
}
