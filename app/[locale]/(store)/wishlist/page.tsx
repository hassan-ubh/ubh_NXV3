"use client";

import Link from "next/link";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShoppingBag,
  Trash2,
  ShoppingCart,
  Check,
} from "lucide-react";

import { copy, isLocale } from "@/lib/i18n";
import { Container } from "@/components/shared/Container";
import { products } from "@/lib/store/catalog";
import { useCart } from "@/components/store/CartProvider";

export default function WishlistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  if (!isLocale(locale)) {
    notFound();
  }

  const t = copy[locale].wishlist;
  const isArabic = locale === "ar";

  const [items, setItems] = useState<WishlistItem[]>([]);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const { addToCart: addProductToCart } = useCart();

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("ubh-wishlist") || "[]",
      ) as string[];
      const resolved = products
        .filter((product) => saved.includes(product.id))
        .map((product) => ({
          id: product.id,
          slug: product.slug,
          title: product.title,
          publisher: product.publisher,
          authors: product.authors?.join(", "),
          cover: product.cover,
          price: product.price,
          currency: product.currency,
          stock: product.stock,
        }));
      setItems(resolved);
    } catch {
      setItems([]);
    }
  }, []);

  const persistWishlist = (nextItems: WishlistItem[]) => {
    setItems(nextItems);
    try {
      localStorage.setItem(
        "ubh-wishlist",
        JSON.stringify(nextItems.map((item) => item.id)),
      );
    } catch {
      /* Storage may be disabled. */
    }
  };

  const removeItem = (id: string) => {
    persistWishlist(items.filter((item) => item.id !== id));

    setAddedItems((currentItems) =>
      currentItems.filter((itemId) => itemId !== id),
    );
  };

  const clearWishlist = () => {
    persistWishlist([]);
    setAddedItems([]);
  };

  const addToCart = (id: string) => {
    const product = products.find((item) => item.id === id);
    if (!product || !addProductToCart(product)) return;
    setAddedItems((currentItems) =>
      currentItems.includes(id) ? currentItems : [...currentItems, id],
    );

    setTimeout(() => {
      setAddedItems((currentItems) =>
        currentItems.filter((itemId) => itemId !== id),
      );
    }, 2500);
  };

  return (
    <>
      {/* ================================================================
          HEADER
      ================================================================ */}

      {/* <header dir={isArabic ? "rtl" : "ltr"} className="bg-ubh-navy text-white">
        <Container>
          <div className="pb-6 pt-4">
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <Link href={`/${locale}`} className="transition hover:text-white">
                {t.home}
              </Link>

              <span>›</span>

              <span className="text-white/80">{t.wishlist}</span>
            </div>
          </div>
        </Container>
      </header> */}

      {/* ================================================================
          MAIN
      ================================================================ */}

      <main
        dir={isArabic ? "rtl" : "ltr"}
        className="min-h-[65vh] bg-ubh-canvas"
      >
        <Container>
          <div className="py-8 md:py-12">
            {/* Back to shop */}

            <Link
              href={`/${locale}/shop`}
              className="mb-8 inline-flex items-center gap-2 text-[10px] font-semibold text-ubh-blue-bright transition hover:text-ubh-gold"
            >
              {isArabic ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}

              {t.continueShopping}
            </Link>

            {/* Page heading */}

            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ubh-gold">
                  {t.savedBooks}
                </p>

                <h1 className="mt-2 font-serif text-3xl text-ubh-blue md:text-4xl">
                  {t.wishlist}
                </h1>

                {items.length > 0 && (
                  <p className="mt-2 text-xs text-ubh-muted">
                    {items.length} {t.items}
                  </p>
                )}
              </div>

              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clearWishlist}
                  className="inline-flex items-center gap-2 self-start text-[10px] font-semibold text-ubh-muted-light transition hover:text-red-600 sm:self-auto"
                >
                  <Trash2 size={13} />
                  {t.clearWishlist}
                </button>
              )}
            </div>

            {/* ============================================================
                EMPTY WISHLIST
            ============================================================ */}

            {items.length === 0 ? (
              <section className="rounded-lg border border-ubh-border bg-white px-6 py-16 text-center md:px-10 md:py-20">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f0f5f9] text-ubh-gold">
                  <Heart size={34} strokeWidth={1.4} />
                </div>

                <h2 className="mt-6 font-serif text-2xl text-ubh-blue">
                  {t.emptyWishlist}
                </h2>

                <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-ubh-muted">
                  {t.emptyWishlistDescription}
                </p>

                <Link
                  href={`/${locale}/shop`}
                  className="mt-7 inline-flex h-11 items-center gap-2 rounded bg-ubh-blue px-7 text-xs font-bold text-white transition hover:bg-ubh-blue-deep"
                >
                  {t.browseBooks}

                  {isArabic ? (
                    <ArrowLeft size={15} />
                  ) : (
                    <ArrowRight size={15} />
                  )}
                </Link>
              </section>
            ) : (
              /* ==========================================================
                 WISHLIST PRODUCTS
              ========================================================== */

              <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item) => {
                  const isAdded = addedItems.includes(item.id);

                  return (
                    <article
                      key={item.id}
                      className="group relative flex flex-col overflow-hidden rounded-lg border border-ubh-border bg-white transition duration-300 hover:border-[#cbd8e5] hover:shadow-[0_14px_35px_rgba(6,26,55,0.08)]"
                    >
                      {/* ==================================================
                          REMOVE BUTTON
                      ================================================== */}

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={t.remove}
                        className={`absolute top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#e5ebf1] bg-white text-ubh-muted-light shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 ${
                          isArabic ? "left-4" : "right-4"
                        }`}
                      >
                        <Trash2 size={14} />
                      </button>

                      {/* ==================================================
                          PRODUCT IMAGE
                      ================================================== */}

                      <Link
                        href={`/${locale}/shop/${item.slug}`}
                        className="relative block h-[280px] overflow-hidden bg-[#f8fafc]"
                      >
                        {item.cover ? (
                          <Image
                            src={item.cover}
                            alt={item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-contain p-7 transition duration-300 group-hover:scale-[1.02]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[#a5b4c4]">
                            <ShoppingBag size={40} strokeWidth={1.2} />
                          </div>
                        )}

                        {/* Wishlist badge */}

                        <div
                          className={`absolute bottom-4 flex items-center gap-1.5 rounded-full border border-ubh-border bg-white/95 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-ubh-gold shadow-sm ${
                            isArabic ? "right-4" : "left-4"
                          }`}
                        >
                          <Heart size={11} fill="currentColor" />

                          {t.saved}
                        </div>
                      </Link>

                      {/* ==================================================
                          PRODUCT INFORMATION
                      ================================================== */}

                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-ubh-gold">
                          {item.publisher}
                        </p>

                        <Link
                          href={`/${locale}/shop/${item.slug}`}
                          className="mt-2 line-clamp-2 min-h-[48px] font-serif text-[17px] leading-snug text-ubh-blue transition hover:text-ubh-blue-bright"
                        >
                          {item.title}
                        </Link>

                        {item.authors && (
                          <p className="mt-2 line-clamp-1 text-[10px] text-ubh-muted">
                            {item.authors}
                          </p>
                        )}

                        {/* Price */}

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <p className="text-sm font-bold text-ubh-blue">
                            {item.currency} {item.price.toFixed(2)}
                          </p>

                          {item.stock > 0 ? (
                            <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-[#4f8062]">
                              {t.inStock}
                            </span>
                          ) : (
                            <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-red-500">
                              {t.outOfStock}
                            </span>
                          )}
                        </div>

                        {/* ==================================================
                            ACTIONS
                        ================================================== */}

                        <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
                          <button
                            type="button"
                            onClick={() => addToCart(item.id)}
                            disabled={item.stock <= 0}
                            className={`flex h-10 items-center justify-center gap-2 rounded px-3 text-[10px] font-bold transition ${
                              item.stock <= 0
                                ? "cursor-not-allowed bg-[#edf1f5] text-[#a4b0bd]"
                                : isAdded
                                  ? "bg-[#4f8062] text-white"
                                  : "bg-ubh-blue text-white hover:bg-ubh-blue-deep"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check size={14} />
                                {t.addedToCart}
                              </>
                            ) : (
                              <>
                                <ShoppingCart size={14} />
                                {t.addToCart}
                              </>
                            )}
                          </button>

                          <Link
                            href={`/${locale}/shop/${item.slug}`}
                            className="flex h-10 w-10 items-center justify-center rounded border border-[#d8e1ea] text-ubh-blue-muted transition hover:border-ubh-gold hover:text-ubh-gold"
                            aria-label={t.viewProduct}
                          >
                            {isArabic ? (
                              <ArrowLeft size={15} />
                            ) : (
                              <ArrowRight size={15} />
                            )}
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>
            )}
          </div>
        </Container>
      </main>

      {/* ================================================================
          FOOTER
      ================================================================ */}
    </>
  );
}

/* ======================================================================
   TYPES
====================================================================== */

type WishlistItem = {
  id: string;
  slug: string;
  title: string;
  publisher: string;
  authors?: string;
  cover?: string;
  price: number;
  currency: string;
  stock: number;
};
