"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Package, Truck, CheckCircle2, Clock3 } from "lucide-react";

import type { CustomerOrder } from "@/lib/odoo/order-types";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { Container } from "@/components/shared/Container";

type Locale = "en" | "ar";

export function OrderDetailsClient({
  locale,
  orderId,
}: {
  locale: Locale;
  orderId: string;
}) {
  const isArabic = locale === "ar";

  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadOrder() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/shop/orders/${encodeURIComponent(orderId)}`,
          {
            credentials: "same-origin",
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (response.status === 404) {
          setError(isArabic ? "لم يتم العثور على الطلب." : "Order not found.");
          return;
        }

        if (!response.ok) {
          throw new Error(
            isArabic
              ? "تعذر تحميل تفاصيل الطلب."
              : "Unable to load order details."
          );
        }

        const data = (await response.json()) as {
          order: CustomerOrder;
        };

        setOrder(data.order);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;

        setError(
          error instanceof Error
            ? error.message
            : isArabic
              ? "حدث خطأ غير متوقع."
              : "Something went wrong."
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadOrder();

    return () => controller.abort();
  }, [isArabic, orderId]);

  const money = (amount: number, currency: string) =>
    new Intl.NumberFormat(isArabic ? "ar-AE" : "en-AE", {
      style: "currency",
      currency,
    }).format(amount);

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      lang={locale}
      className="min-h-screen bg-ubh-canvas py-12 sm:py-16"
    >
      <Container>
        <Link
          href={`/${locale}/profile/orders`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-ubh-gold-deep"
        >
          {isArabic ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          {isArabic ? "العودة إلى الطلبات" : "Back to orders"}
        </Link>

        {loading && (
          <div className="h-72 animate-pulse rounded-2xl bg-white" />
        )}

        {!loading && error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-800"
          >
            {error}
          </div>
        )}

        {!loading && !error && order && (
          <>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {isArabic ? "رقم الطلب" : "Order number"}
                </p>
                <h1 className="mt-1 font-serif text-3xl font-semibold text-ubh-navy">
                  {order.name}
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  {isArabic ? "تاريخ الطلب: " : "Placed on: "}
                  {new Intl.DateTimeFormat(
                    isArabic ? "ar-AE" : "en-AE",
                    { dateStyle: "long" }
                  ).format(new Date(order.date))}
                </p>
              </div>

              <OrderStatusBadge status={order.status} locale={locale} />
            </div>

            <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-ubh-navy">{isArabic ? "تقدم الطلب" : "Order progress"}</h2>
                  <p className="mt-1 text-sm text-slate-500">{isArabic ? "آخر حالة مسجلة لطلبك" : "The latest recorded status of your order"}</p>
                </div>
                <OrderStatusBadge status={order.status} locale={locale} />
              </div>
              {order.status === "cancelled" ? (
                <div className="mt-5 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800"><Clock3 size={19} />{isArabic ? "تم إلغاء هذا الطلب." : "This order has been cancelled."}</div>
              ) : (
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[{ key: "confirmed", en: "Confirmed", ar: "مؤكد" }, { key: "processing", en: "Processing", ar: "قيد التجهيز" }, { key: "shipped", en: "Shipped", ar: "تم الشحن" }, { key: "delivered", en: "Delivered", ar: "تم التوصيل" }].map((step) => {
                    const rank: Record<string, number> = { draft: 0, confirmed: 1, processing: 2, shipped: 3, delivered: 4, cancelled: 0 };
                    const complete = rank[order.status] >= rank[step.key];
                    const current = order.status === step.key;
                    return <div key={step.key} className={`rounded-xl border p-3 ${complete ? "border-[#d9bd82] bg-[#fcf8ef]" : "border-slate-200 bg-slate-50"}`}>
                      <div className="flex items-center gap-2">{complete ? <CheckCircle2 size={17} className="shrink-0 text-[#9a6a1c]" /> : <Clock3 size={17} className="shrink-0 text-slate-400" />}<span className={`text-xs font-semibold ${current ? "text-ubh-navy" : "text-slate-600"}`}>{isArabic ? step.ar : step.en}</span></div>
                    </div>;
                  })}
                </div>
              )}
            </section>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                <h2 className="text-lg font-semibold text-ubh-navy">
                  {isArabic ? "الكتب المطلوبة" : "Items ordered"}
                </h2>

                <div className="mt-5 divide-y divide-slate-100">
                  {order.lines.map((line) => (
                    <div
                      key={line.id}
                      className="flex items-start justify-between gap-4 py-5 first:pt-0 last:pb-0"
                    >
                      <div className="flex min-w-0 gap-3">
                        <div className="flex h-16 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                          {line.image ? (
                            <Image src={line.image} alt={line.name} width={56} height={64} sizes="56px" loading="lazy" className="h-full w-full object-cover" />
                          ) : (
                            <Package className="h-5 w-5 text-slate-500" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-800">
                            {line.name}
                          </p>
                          {line.sku && (
                            <p className="mt-1 text-xs text-slate-500">
                              ISBN / SKU: {line.sku}
                            </p>
                          )}
                          <p className="mt-1 text-sm text-slate-500">
                            {isArabic ? "الكمية: " : "Quantity: "}
                            {line.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="shrink-0 text-sm font-semibold text-ubh-navy">
                        {money(line.subtotal, order.currency)}
                      </p>
                    </div>
                  ))}
                </div>

                {(order.trackingUrl || order.trackingNumber) && (
                  <div className="mt-7 border-t border-slate-100 pt-5">
                    {order.trackingUrl ? (
                      <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-ubh-blue-bright hover:underline">
                        <Truck size={18} />{isArabic ? "تتبع الشحنة" : "Track shipment"}
                      </a>
                    ) : (
                      <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700"><Truck size={18} />{isArabic ? "معلومات التتبع" : "Shipment tracking"}</p>
                    )}
                    {order.trackingNumber && (
                      <p className="mt-2 text-sm text-slate-500">
                        {isArabic ? "رقم التتبع: " : "Tracking number: "}
                        {order.trackingNumber}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-7 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                  {order.status !== "cancelled" &&
                    order.status !== "delivered" && (
                      <Link
                        href={`/${locale}/profile/orders/${order.id}/cancel`}
                        className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        {isArabic ? "طلب إلغاء" : "Request cancellation"}
                      </Link>
                    )}

                  {order.status === "delivered" && (
                    <Link
                      href={`/${locale}/profile/orders/${order.id}/return`}
                      className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      {isArabic ? "طلب إرجاع" : "Request a return"}
                    </Link>
                  )}
                </div>
              </section>

              <aside className="space-y-6">
                <section className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h2 className="font-semibold text-ubh-navy">
                    {isArabic ? "ملخص الطلب" : "Order summary"}
                  </h2>

                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between gap-3 text-slate-600">
                      <span>{isArabic ? "المجموع الفرعي" : "Subtotal"}</span>
                      <span>{money(order.subtotal, order.currency)}</span>
                    </div>
                    <div className="flex justify-between gap-3 text-slate-600">
                      <span>{isArabic ? "الشحن" : "Shipping"}</span>
                      <span>{money(order.shipping, order.currency)}</span>
                    </div>
                    <div className="flex justify-between gap-3 border-t border-slate-100 pt-4 font-bold text-ubh-navy">
                      <span>{isArabic ? "الإجمالي" : "Total"}</span>
                      <span>{money(order.total, order.currency)}</span>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-5">
                    <p className="mb-2 text-sm text-slate-500">
                      {isArabic ? "حالة الدفع" : "Payment status"}
                    </p>
                    <OrderStatusBadge
                      status={order.paymentStatus}
                      locale={locale}
                    />
                  </div>
                </section>

                {order.shippingAddress && (
                  <section className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h2 className="font-semibold text-ubh-navy">
                      {isArabic ? "عنوان التوصيل" : "Delivery address"}
                    </h2>
                    <div className="mt-4 space-y-1 text-sm leading-6 text-slate-600">
                      <p className="font-medium text-slate-800">
                        {order.shippingAddress.name}
                      </p>
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}</p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </section>
                )}
              </aside>
            </div>
          </>
        )}
      </Container>
    </main>
  );
}