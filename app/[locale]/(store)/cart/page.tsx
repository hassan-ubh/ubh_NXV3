"use client";

import Link from "next/link";
import Image from "next/image";
import { use } from "react";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { copy, isLocale } from "@/lib/i18n";
import { useCart } from "@/components/store/CartProvider";

import { Container } from "@/components/shared/Container";



/* ==========================================================================
   CART PAGE
   ========================================================================== */

export default function CartPage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = use(params);

  if (!isLocale(locale)) {
    notFound();
  }

  const t = copy[locale].cart;
  const isArabic = locale === "ar";

  /* ========================================================================
     REAL CART
     ======================================================================== */

  const {
    items,
    count: totalItems,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  /* ========================================================================
     TOTALS
     ======================================================================== */

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

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
*/}
<Container>
          <div className="pb-6 pt-4">
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <Link
                href={`/${locale}`}
                className="hover:text-white"
              >
                {t.home}
              </Link>

              <span>›</span>

              <span className="text-white/80">
                {t.cart}
              </span>
            </div>
          </div>
        </Container>
      </header>

      {/* ================================================================== */}
      {/* MAIN                                                               */}
      {/* ================================================================== */}

      <main
        dir={isArabic ? "rtl" : "ltr"}
        className="min-h-[65vh] bg-ubh-canvas"
      >
        <Container>
          <div className="py-8 md:py-12">

            {/* Back to shop */}
            <Link
              href={`/${locale}/shop`}
              className="mb-8 inline-flex items-center gap-2 text-[10px] font-semibold text-ubh-blue-bright hover:text-ubh-gold"
            >
              {isArabic ? (
                <ArrowRight size={14} />
              ) : (
                <ArrowLeft size={14} />
              )}

              {t.continueShopping}
            </Link>

            {/* Page heading */}
            <div className="mb-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ubh-gold">
                {t.shoppingBag}
              </p>

              <h1 className="mt-2 font-serif text-3xl text-ubh-blue md:text-4xl">
                {t.cart}
              </h1>

              {items.length > 0 && (
                <p className="mt-2 text-xs text-ubh-muted">
                  {totalItems} {t.items}
                </p>
              )}
            </div>

            {/* ================================================================== */}
            {/* EMPTY CART                                                         */}
            {/* ================================================================== */}

            {items.length === 0 ? (
              <section className="rounded-lg border border-ubh-border bg-white px-6 py-16 text-center md:px-10">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f0f5f9] text-ubh-gold">
                  <ShoppingBag
                    size={32}
                    strokeWidth={1.4}
                  />
                </div>

                <h2 className="mt-6 font-serif text-2xl text-ubh-blue">
                  {t.emptyCart}
                </h2>

                <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-ubh-muted">
                  {t.emptyCartDescription}
                </p>

                <Link
                  href={`/${locale}/shop`}
                  className="mt-7 inline-flex h-11 items-center gap-2 rounded bg-ubh-blue px-7 text-xs font-bold text-white transition hover:bg-ubh-blue-deep"
                >
                  {t.startShopping}

                  {isArabic ? (
                    <ArrowLeft size={15} />
                  ) : (
                    <ArrowRight size={15} />
                  )}
                </Link>

              </section>
            ) : (

              /* ================================================================== */
              /* CART CONTENT                                                        */
              /* ================================================================== */

              <div className="grid gap-7 lg:grid-cols-[1fr_340px]">

                {/* ================================================================ */}
                {/* ITEMS                                                             */}
                {/* ================================================================ */}

                <section>

                  <div className="overflow-hidden rounded-lg border border-ubh-border bg-white">

                    {items.map((item, index) => (

                      <div
                        key={item.product.id}
                        className={`p-5 md:p-6 ${
                          index !== items.length - 1
                            ? "border-b border-[#edf1f5]"
                            : ""
                        }`}
                      >

                        <div className="flex gap-4 md:gap-6">

                          {/* ====================================================== */}
                          {/* PRODUCT IMAGE                                           */}
                          {/* ====================================================== */}

                          <Link
                            href={`/${locale}/shop/${item.product.slug}`}
                            className="relative flex h-28 w-20 shrink-0 items-center justify-center overflow-hidden rounded border border-[#e4eaf0] bg-ubh-canvas md:h-36 md:w-24"
                          >

                            {item.product.cover ? (
                              <Image
                                src={item.product.cover}
                                alt={item.product.title}
                                fill
                                sizes="96px"
                                className="object-contain p-2"
                              />
                            ) : (
                              <ShoppingBag
                                size={24}
                                className="text-[#a5b4c4]"
                              />
                            )}

                          </Link>

                          {/* ====================================================== */}
                          {/* PRODUCT INFORMATION                                    */}
                          {/* ====================================================== */}

                          <div className="min-w-0 flex-1">

                            {/* Publisher */}
                            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-ubh-gold">
                              {item.product.publisher}
                            </p>

                            {/* Title */}
                            <Link
                              href={`/${locale}/shop/${item.product.slug}`}
                              className="mt-1 block font-serif text-lg leading-snug text-ubh-blue hover:text-ubh-blue-bright"
                            >
                              {item.product.title}
                            </Link>

                            {/* Authors */}
                            {item.product.authors?.length > 0 && (
                              <p className="mt-1 text-[10px] text-ubh-muted">
                                {item.product.authors.join(", ")}
                              </p>
                            )}

                            {/* Price */}
                            <p className="mt-3 text-sm font-bold text-ubh-blue">
                              {item.product.currency}{" "}
                              {item.product.price.toFixed(2)}
                            </p>

                            {/* ==================================================== */}
                            {/* QUANTITY + REMOVE                                   */}
                            {/* ==================================================== */}

                            <div className="mt-4 flex flex-wrap items-center gap-4">

                              {/* Quantity */}
                              <div className="flex h-9 items-center rounded border border-[#d8e1ea] bg-white">

                                {/* Minus */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={
                                    item.quantity <= 1
                                  }
                                  className="flex h-full w-9 items-center justify-center text-ubh-blue-muted hover:text-ubh-gold disabled:opacity-30"
                                >
                                  <Minus size={13} />
                                </button>

                                {/* Quantity */}
                                <span className="w-8 text-center text-xs font-semibold text-ubh-blue">
                                  {item.quantity}
                                </span>

                                {/* Plus */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity + 1
                                    )
                                  }
                                  disabled={
                                    item.quantity >=
                                    item.product.stock
                                  }
                                  className="flex h-full w-9 items-center justify-center text-ubh-blue-muted hover:text-ubh-gold disabled:opacity-30"
                                >
                                  <Plus size={13} />
                                </button>

                              </div>

                              {/* Remove */}
                              <button
                                type="button"
                                onClick={() =>
                                  removeItem(
                                    item.product.id
                                  )
                                }
                                className="flex items-center gap-1.5 text-[10px] font-semibold text-ubh-muted-light hover:text-red-600"
                              >
                                <Trash2 size={13} />

                                {t.remove}
                              </button>

                            </div>

                          </div>

                          {/* ====================================================== */}
                          {/* ITEM TOTAL                                             */}
                          {/* ====================================================== */}

                          <div className="hidden text-right md:block">

                            <p className="text-sm font-bold text-ubh-blue">
                              {item.product.currency}{" "}
                              {(
                                item.product.price *
                                item.quantity
                              ).toFixed(2)}
                            </p>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                  {/* Clear cart */}
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-[10px] font-semibold text-ubh-muted-light hover:text-red-600"
                    >
                      {t.clearCart}
                    </button>
                  </div>

                </section>

                {/* ================================================================ */}
                {/* SUMMARY                                                           */}
                {/* ================================================================ */}

                <aside>

                  <section className="rounded-lg border border-ubh-border bg-white p-6">

                    <h2 className="text-sm font-bold text-ubh-blue">
                      {t.orderSummary}
                    </h2>

                    <div className="mt-5 space-y-4">

                      {/* Subtotal */}
                      <div className="flex justify-between gap-4">

                        <span className="text-xs text-ubh-muted">
                          {t.subtotal}
                        </span>

                        <span className="text-xs font-semibold text-ubh-blue-muted">
                          AED {subtotal.toFixed(2)}
                        </span>

                      </div>

                      {/* Delivery */}
                      <div className="flex justify-between gap-4 border-b border-[#edf1f5] pb-4">

                        <span className="text-xs text-ubh-muted">
                          {t.delivery}
                        </span>

                        <span className="text-xs font-semibold text-ubh-blue-muted">
                          {t.calculatedAtCheckout}
                        </span>

                      </div>

                      {/* Total */}
                      <div className="flex justify-between gap-4">

                        <span className="text-sm font-bold text-ubh-blue">
                          {t.total}
                        </span>

                        <span className="text-lg font-bold text-ubh-blue">
                          AED {subtotal.toFixed(2)}
                        </span>

                      </div>

                    </div>

                    {/* Checkout */}
                    <Link
                      href={`/${locale}/checkout`}
                      className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded bg-ubh-gold-light px-6 text-xs font-bold text-white transition hover:bg-ubh-gold"
                    >
                      {t.proceedToCheckout}

                      {isArabic ? (
                        <ArrowLeft size={15} />
                      ) : (
                        <ArrowRight size={15} />
                      )}
                    </Link>

                    {/* Continue shopping */}
                    <Link
                      href={`/${locale}/shop`}
                      className="mt-3 flex h-11 w-full items-center justify-center rounded border border-[#d8e1ea] bg-white text-xs font-semibold text-ubh-blue-muted transition hover:border-ubh-gold hover:text-ubh-gold"
                    >
                      {t.continueShopping}
                    </Link>

                  </section>

                  {/* ============================================================ */}
                  {/* TRUST                                                         */}
                  {/* ============================================================ */}

                  <div className="mt-4 grid grid-cols-2 gap-2">

                    <div className="rounded border border-ubh-border bg-white p-4 text-center">

                      <ShieldCheck
                        size={18}
                        className="mx-auto text-ubh-gold"
                      />

                      <p className="mt-2 text-[8px] font-bold text-ubh-blue-muted">
                        {t.secureCheckout}
                      </p>

                    </div>

                    <div className="rounded border border-ubh-border bg-white p-4 text-center">

                      <Truck
                        size={18}
                        className="mx-auto text-ubh-gold"
                      />

                      <p className="mt-2 text-[8px] font-bold text-ubh-blue-muted">
                        {t.uaeDelivery}
                      </p>

                    </div>

                  </div>

                </aside>

              </div>
            )}

          </div>
        </Container>
      </main>
</>
  );
}