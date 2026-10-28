"use client";

import Link from "next/link";
import Image from "next/image";
import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { copy, isLocale } from "@/lib/i18n";

import { Container } from "@/components/shared/Container";


import { useCart } from "@/components/store/CartProvider";

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  if (!isLocale(locale)) {
    notFound();
  }

  const router = useRouter();

  const t = copy[locale].checkout;
  const isArabic = locale === "ar";

  const {
    items,
    count: totalItems,
    clearCart,
  } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    emirate: "",
    postalCode: "",
  });

  const [submitted, setSubmitted] = useState(false);

  /* ================================================================
     CART TOTALS
  ================================================================ */

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  /*
   * Temporary frontend checkout.
   *
   * Delivery is currently free / calculated at checkout.
   * This can later be replaced with Odoo delivery pricing.
   */
  const delivery = 0;

  const total = subtotal + delivery;

  /* ================================================================
     FORM
  ================================================================ */

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /* ================================================================
     PLACE ORDER
  ================================================================ */

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (items.length === 0) {
      return;
    }

    /*
     * Temporary frontend order.
     *
     * Later this will create the actual Odoo sale order.
     */

    const orderNumber = `UBH-${globalThis.crypto.randomUUID()
  .replace(/-/g, "")
  .slice(0, 8)
  .toUpperCase()}`;

    const order = {
      orderNumber,

      customer: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
      },

      deliveryAddress: {
        address: form.address,
        apartment: form.apartment,
        city: form.city,
        emirate: form.emirate,
        postalCode: form.postalCode,
      },

      items: items.map((item) => ({
        productId: item.product.id,
        slug: item.product.slug,
        title: item.product.title,
        cover: item.product.cover,
        price: item.product.price,
        currency: item.product.currency,
        quantity: item.quantity,
      })),

      subtotal,
      delivery,
      total,

      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "ubh-last-order",
      JSON.stringify(order)
    );

    setSubmitted(true);

    /*
     * Clear cart after successfully creating
     * the temporary order.
     */
    clearCart();

    setTimeout(() => {
      router.push(`/${locale}/order-confirmation`);
    }, 700);
  };

  /* ================================================================
     PAGE
  ================================================================ */

  return (
    <>
      {/* ================================================================
          HEADER
      ================================================================ */}

      <header
        dir={isArabic ? "rtl" : "ltr"}
        className="bg-ubh-navy text-white"
      >
        {/*
*/}
{/* <Container>
          <div className="pb-6 pt-4">
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <Link
                href={`/${locale}`}
                className="transition hover:text-white"
              >
                {t.home}
              </Link>

              <span>›</span>

              <Link
                href={`/${locale}/cart`}
                className="transition hover:text-white"
              >
                {t.cart}
              </Link>

              <span>›</span>

              <span className="text-white/80">
                {t.checkout}
              </span>
            </div>
          </div>
        </Container> */}
      </header>

      {/* ================================================================
          MAIN
      ================================================================ */}

      <main
        dir={isArabic ? "rtl" : "ltr"}
        className="min-h-[70vh] bg-ubh-canvas"
      >
        <Container>
          <div className="py-8 md:py-12">

            {/* ==========================================================
                PAGE HEADER
            ========================================================== */}

            <div className="mb-8">
              <Link
                href={`/${locale}/cart`}
                className="mb-6 inline-flex items-center gap-2 text-[10px] font-semibold text-ubh-blue-bright transition hover:text-ubh-gold"
              >
                {isArabic ? (
                  <ArrowRight size={14} />
                ) : (
                  <ArrowLeft size={14} />
                )}

                {t.backToCart}
              </Link>

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ubh-gold">
                {t.secureCheckout}
              </p>

              <h1 className="mt-2 font-serif text-3xl text-ubh-blue md:text-4xl">
                {t.checkout}
              </h1>

              <p className="mt-2 max-w-xl text-xs leading-6 text-ubh-muted">
                {t.checkoutDescription}
              </p>
            </div>

            {/* ==========================================================
                EMPTY CART
            ========================================================== */}

            {items.length === 0 ? (
              <section className="rounded-lg border border-ubh-border bg-white px-6 py-16 text-center md:px-10 md:py-20">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f0f5f9] text-ubh-gold">
                  <ShoppingBag
                    size={34}
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
                 CHECKOUT
              ========================================================== */

              <form onSubmit={handleSubmit}>

                <div className="grid gap-7 lg:grid-cols-[1fr_360px]">

                  {/* ======================================================
                      LEFT COLUMN
                  ====================================================== */}

                  <div className="space-y-6">

                    {/* ====================================================
                        CONTACT INFORMATION
                    ==================================================== */}

                    <section className="rounded-lg border border-ubh-border bg-white p-6 md:p-7">

                      <div className="mb-6 flex items-start gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0f5f9] text-ubh-gold">
                          <ShieldCheck size={19} />
                        </div>

                        <div>
                          <h2 className="text-sm font-bold text-ubh-blue">
                            {t.contactInformation}
                          </h2>

                          <p className="mt-1 text-[10px] leading-5 text-ubh-muted">
                            {t.contactDescription}
                          </p>
                        </div>

                      </div>

                      <div className="grid gap-5 md:grid-cols-2">

                        {/* Full name */}

                        <div className="md:col-span-2">
                          <label className="mb-2 block text-[10px] font-bold text-ubh-blue-muted">
                            {t.fullName}

                            <span className="ml-1 text-red-500">
                              *
                            </span>
                          </label>

                          <input
                            type="text"
                            required
                            value={form.fullName}
                            onChange={(event) =>
                              updateField(
                                "fullName",
                                event.target.value
                              )
                            }
                            placeholder={t.fullNamePlaceholder}
                            className="h-11 w-full rounded border border-[#d8e1ea] bg-white px-4 text-xs text-ubh-blue outline-none transition placeholder:text-[#a6b3c1] focus:border-ubh-gold focus:ring-1 focus:ring-ubh-gold/20"
                          />
                        </div>

                        {/* Email */}

                        <div>
                          <label className="mb-2 block text-[10px] font-bold text-ubh-blue-muted">
                            {t.email}

                            <span className="ml-1 text-red-500">
                              *
                            </span>
                          </label>

                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(event) =>
                              updateField(
                                "email",
                                event.target.value
                              )
                            }
                            placeholder={t.emailPlaceholder}
                            className="h-11 w-full rounded border border-[#d8e1ea] bg-white px-4 text-xs text-ubh-blue outline-none transition placeholder:text-[#a6b3c1] focus:border-ubh-gold focus:ring-1 focus:ring-ubh-gold/20"
                          />
                        </div>

                        {/* Phone */}

                        <div>
                          <label className="mb-2 block text-[10px] font-bold text-ubh-blue-muted">
                            {t.phone}

                            <span className="ml-1 text-red-500">
                              *
                            </span>
                          </label>

                          <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(event) =>
                              updateField(
                                "phone",
                                event.target.value
                              )
                            }
                            placeholder={t.phonePlaceholder}
                            className="h-11 w-full rounded border border-[#d8e1ea] bg-white px-4 text-xs text-ubh-blue outline-none transition placeholder:text-[#a6b3c1] focus:border-ubh-gold focus:ring-1 focus:ring-ubh-gold/20"
                          />
                        </div>

                      </div>
                    </section>

                    {/* ====================================================
                        DELIVERY ADDRESS
                    ==================================================== */}

                    <section className="rounded-lg border border-ubh-border bg-white p-6 md:p-7">

                      <div className="mb-6 flex items-start gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0f5f9] text-ubh-gold">
                          <MapPin size={19} />
                        </div>

                        <div>
                          <h2 className="text-sm font-bold text-ubh-blue">
                            {t.deliveryAddress}
                          </h2>

                          <p className="mt-1 text-[10px] leading-5 text-ubh-muted">
                            {t.deliveryDescription}
                          </p>
                        </div>

                      </div>

                      <div className="grid gap-5 md:grid-cols-2">

                        {/* Address */}

                        <div className="md:col-span-2">
                          <label className="mb-2 block text-[10px] font-bold text-ubh-blue-muted">
                            {t.address}

                            <span className="ml-1 text-red-500">
                              *
                            </span>
                          </label>

                          <input
                            type="text"
                            required
                            value={form.address}
                            onChange={(event) =>
                              updateField(
                                "address",
                                event.target.value
                              )
                            }
                            placeholder={t.addressPlaceholder}
                            className="h-11 w-full rounded border border-[#d8e1ea] bg-white px-4 text-xs text-ubh-blue outline-none transition placeholder:text-[#a6b3c1] focus:border-ubh-gold focus:ring-1 focus:ring-ubh-gold/20"
                          />
                        </div>

                        {/* Apartment */}

                        <div className="md:col-span-2">
                          <label className="mb-2 block text-[10px] font-bold text-ubh-blue-muted">
                            {t.apartment}
                          </label>

                          <input
                            type="text"
                            value={form.apartment}
                            onChange={(event) =>
                              updateField(
                                "apartment",
                                event.target.value
                              )
                            }
                            placeholder={t.apartmentPlaceholder}
                            className="h-11 w-full rounded border border-[#d8e1ea] bg-white px-4 text-xs text-ubh-blue outline-none transition placeholder:text-[#a6b3c1] focus:border-ubh-gold focus:ring-1 focus:ring-ubh-gold/20"
                          />
                        </div>

                        {/* City */}

                        <div>
                          <label className="mb-2 block text-[10px] font-bold text-ubh-blue-muted">
                            {t.city}

                            <span className="ml-1 text-red-500">
                              *
                            </span>
                          </label>

                          <input
                            type="text"
                            required
                            value={form.city}
                            onChange={(event) =>
                              updateField(
                                "city",
                                event.target.value
                              )
                            }
                            placeholder={t.cityPlaceholder}
                            className="h-11 w-full rounded border border-[#d8e1ea] bg-white px-4 text-xs text-ubh-blue outline-none transition placeholder:text-[#a6b3c1] focus:border-ubh-gold focus:ring-1 focus:ring-ubh-gold/20"
                          />
                        </div>

                        {/* Emirate */}

                        <div>
                          <label className="mb-2 block text-[10px] font-bold text-ubh-blue-muted">
                            {t.emirate}

                            <span className="ml-1 text-red-500">
                              *
                            </span>
                          </label>

                          <select
                            required
                            value={form.emirate}
                            onChange={(event) =>
                              updateField(
                                "emirate",
                                event.target.value
                              )
                            }
                            className="h-11 w-full rounded border border-[#d8e1ea] bg-white px-4 text-xs text-ubh-blue outline-none transition focus:border-ubh-gold focus:ring-1 focus:ring-ubh-gold/20"
                          >
                            <option value="">
                              {t.selectEmirate}
                            </option>

                            <option value="abu-dhabi">
                              {t.abuDhabi}
                            </option>

                            <option value="dubai">
                              {t.dubai}
                            </option>

                            <option value="sharjah">
                              {t.sharjah}
                            </option>

                            <option value="ajman">
                              {t.ajman}
                            </option>

                            <option value="umm-al-quwain">
                              {t.ummAlQuwain}
                            </option>

                            <option value="ras-al-khaimah">
                              {t.rasAlKhaimah}
                            </option>

                            <option value="fujairah">
                              {t.fujairah}
                            </option>
                          </select>
                        </div>

                        {/* Postal code */}

                        <div>
                          <label className="mb-2 block text-[10px] font-bold text-ubh-blue-muted">
                            {t.postalCode}
                          </label>

                          <input
                            type="text"
                            value={form.postalCode}
                            onChange={(event) =>
                              updateField(
                                "postalCode",
                                event.target.value
                              )
                            }
                            placeholder={t.postalCodePlaceholder}
                            className="h-11 w-full rounded border border-[#d8e1ea] bg-white px-4 text-xs text-ubh-blue outline-none transition placeholder:text-[#a6b3c1] focus:border-ubh-gold focus:ring-1 focus:ring-ubh-gold/20"
                          />
                        </div>

                      </div>
                    </section>

                    {/* ====================================================
                        DELIVERY METHOD
                    ==================================================== */}

                    <section className="rounded-lg border border-ubh-border bg-white p-6 md:p-7">

                      <div className="mb-5 flex items-start gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0f5f9] text-ubh-gold">
                          <Truck size={19} />
                        </div>

                        <div>
                          <h2 className="text-sm font-bold text-ubh-blue">
                            {t.deliveryMethod}
                          </h2>

                          <p className="mt-1 text-[10px] leading-5 text-ubh-muted">
                            {t.deliveryMethodDescription}
                          </p>
                        </div>

                      </div>

                      <label className="flex cursor-pointer items-start gap-4 rounded border border-ubh-gold bg-[#fffaf1] p-4">

                        <input
                          type="radio"
                          name="delivery"
                          value="standard"
                          defaultChecked
                          className="mt-1 accent-ubh-gold"
                        />

                        <div className="flex-1">

                          <div className="flex items-center justify-between gap-4">

                            <p className="text-xs font-bold text-ubh-blue">
                              {t.standardDelivery}
                            </p>

                            <p className="text-xs font-bold text-ubh-blue">
                              {t.calculatedAtCheckout}
                            </p>

                          </div>

                          <p className="mt-1 text-[10px] leading-5 text-ubh-muted">
                            {t.standardDeliveryDescription}
                          </p>

                        </div>

                      </label>
                    </section>

                    {/* ====================================================
                        SECURITY
                    ==================================================== */}

                    <div className="flex items-center gap-3 rounded border border-ubh-border bg-white px-5 py-4">

                      <Lock
                        size={16}
                        className="shrink-0 text-ubh-gold"
                      />

                      <p className="text-[9px] leading-5 text-ubh-muted">
                        {t.secureInformation}
                      </p>

                    </div>

                  </div>

                  {/* ======================================================
                      RIGHT COLUMN — ORDER SUMMARY
                  ====================================================== */}

                  <aside className="lg:sticky lg:top-6 lg:self-start">

                    <section className="rounded-lg border border-ubh-border bg-white p-6">

                      <h2 className="text-sm font-bold text-ubh-blue">
                        {t.orderSummary}
                      </h2>

                      <p className="mt-1 text-[10px] text-ubh-muted">
                        {totalItems} {t.items}
                      </p>

                      {/* Product list */}

                      <div className="mt-5 space-y-4">

                        {items.map((item) => (

                          <div
                            key={item.product.id}
                            className="flex gap-3"
                          >

                            <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded border border-[#e3e9ef] bg-ubh-canvas">

                              {item.product.cover ? (
                                <Image
                                  src={item.product.cover}
                                  alt={item.product.title}
                                  fill
                                  sizes="48px"
                                  className="object-contain p-1"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-[#a5b4c4]">
                                  <ShoppingBag size={17} />
                                </div>
                              )}

                              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ubh-blue px-1 text-[8px] font-bold text-white">
                                {item.quantity}
                              </span>

                            </div>

                            <div className="min-w-0 flex-1">

                              <p className="line-clamp-2 text-[10px] font-semibold leading-4 text-ubh-blue-muted">
                                {item.product.title}
                              </p>

                              <p className="mt-1 text-[9px] text-ubh-muted-light">
                                {item.product.currency}{" "}
                                {item.product.price.toFixed(2)}
                              </p>

                            </div>

                            <p className="text-[10px] font-bold text-ubh-blue">
                              {item.product.currency}{" "}
                              {(
                                item.product.price *
                                item.quantity
                              ).toFixed(2)}
                            </p>

                          </div>

                        ))}

                      </div>

                      {/* Totals */}

                      <div className="mt-6 space-y-4 border-t border-[#edf1f5] pt-5">

                        <div className="flex justify-between gap-4">

                          <span className="text-xs text-ubh-muted">
                            {t.subtotal}
                          </span>

                          <span className="text-xs font-semibold text-ubh-blue-muted">
                            AED {subtotal.toFixed(2)}
                          </span>

                        </div>

                        <div className="flex justify-between gap-4">

                          <span className="text-xs text-ubh-muted">
                            {t.delivery}
                          </span>

                         <span className="text-xs font-semibold text-ubh-blue-muted">
  {delivery === 0
    ? t.calculatedAtCheckout
    : `AED ${Number(delivery).toFixed(2)}`}
</span>

                        </div>

                        <div className="border-t border-[#edf1f5] pt-4">

                          <div className="flex justify-between gap-4">

                            <span className="text-sm font-bold text-ubh-blue">
                              {t.total}
                            </span>

                            <span className="text-lg font-bold text-ubh-blue">
                              AED {total.toFixed(2)}
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* Place order */}

                      <button
                        type="submit"
                        disabled={submitted}
                        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded bg-ubh-gold-light px-6 text-xs font-bold text-white transition hover:bg-ubh-gold disabled:cursor-not-allowed disabled:opacity-70"
                      >

                        {submitted ? (
                          <>
                            <Check size={16} />
                            {t.orderPlaced}
                          </>
                        ) : (
                          <>
                            <Lock size={14} />
                            {t.placeOrder}
                          </>
                        )}

                      </button>

                      <p className="mt-4 text-center text-[8px] leading-4 text-ubh-muted-light">
                        {t.termsDescription}
                      </p>

                    </section>

                    {/* Trust indicators */}

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

              </form>
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