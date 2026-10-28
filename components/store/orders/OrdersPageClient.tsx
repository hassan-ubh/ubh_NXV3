"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Search, PackageSearch, RefreshCw, ShoppingBag } from "lucide-react";

import type { CustomerOrder, OrderStatus } from "@/lib/odoo/order-types";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { Container } from "@/components/shared/Container";

type Locale = "en" | "ar";
type Filter = "all" | OrderStatus;

export function OrdersPageClient({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  async function loadOrders(signal?: AbortSignal) {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/shop/orders", {
        credentials: "same-origin", cache: "no-store", signal,
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || (isArabic ? "تعذر تحميل الطلبات." : "Unable to load your orders. Please sign in or try again later."));
      }
      const data = (await response.json()) as { orders?: CustomerOrder[] };
      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : (isArabic ? "حدث خطأ غير متوقع." : "Something went wrong."));
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    void loadOrders(controller.signal);
    return () => controller.abort();
    // load once per locale; reload button calls the same loader directly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArabic]);

  const money = (amount: number, currency: string) => new Intl.NumberFormat(isArabic ? "ar-AE" : "en-AE", { style: "currency", currency }).format(amount);
  const date = (value: string) => {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : new Intl.DateTimeFormat(isArabic ? "ar-AE" : "en-AE", { dateStyle: "medium" }).format(parsed);
  };
  const filteredOrders = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return orders.filter((order) => {
      const matchesFilter = filter === "all" || order.status === filter;
      const matchesQuery = !needle || `${order.name} ${order.lines.map((line) => line.name).join(" ")}`.toLocaleLowerCase().includes(needle);
      return matchesFilter && matchesQuery;
    });
  }, [orders, query, filter]);

  const filters: { value: Filter; en: string; ar: string }[] = [
    { value: "all", en: "All orders", ar: "كل الطلبات" },
    { value: "confirmed", en: "Confirmed", ar: "مؤكد" },
    { value: "processing", en: "Processing", ar: "قيد التجهيز" },
    { value: "shipped", en: "Shipped", ar: "تم الشحن" },
    { value: "delivered", en: "Delivered", ar: "تم التوصيل" },
    { value: "cancelled", en: "Cancelled", ar: "ملغي" },
  ];

  return (
    <main dir={isArabic ? "rtl" : "ltr"} lang={locale} className="min-h-screen bg-[#f7f9fc] py-8 sm:py-12">
      <Container>
        <Link href={`/${locale}/profile`} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-ubh-gold-deep">
          {isArabic ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}{isArabic ? "العودة إلى حسابي" : "Back to my account"}
        </Link>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-ubh-gold-deep">{isArabic ? "حسابك" : "Your account"}</p>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-ubh-navy sm:text-4xl">{isArabic ? "طلباتي" : "My Orders"}</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">{isArabic ? "راجع مشترياتك، وتابع حالة الطلب، واعرف تفاصيل كل شحنة." : "Review your purchases, follow order progress, and find delivery details in one place."}</p>
          </div>
          <Link href={`/${locale}/shop`} className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-ubh-navy shadow-sm transition hover:border-ubh-gold-deep">
            <ShoppingBag size={17} />{isArabic ? "متابعة التسوق" : "Continue shopping"}
          </Link>
        </div>

        {!loading && !error && orders.length > 0 && (
          <div className="mb-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <label className="relative block">
              <Search className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${isArabic ? "right-4" : "left-4"}`} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isArabic ? "ابحث برقم الطلب أو اسم الكتاب" : "Search by order number or book title"} className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm outline-none transition focus:border-ubh-gold-deep focus:bg-white focus:ring-4 focus:ring-ubh-gold-deep/10 ${isArabic ? "pr-11 pl-4" : "pl-11 pr-4"}`} />
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map((item) => (
                <button key={item.value} type="button" onClick={() => setFilter(item.value)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${filter === item.value ? "bg-ubh-navy text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>
                  {isArabic ? item.ar : item.en}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && <div className="space-y-4" aria-live="polite">{[1, 2, 3].map((item) => <div key={item} className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white" />)}</div>}

        {!loading && error && <div role="alert" className="rounded-2xl border border-red-200 bg-white p-6 sm:p-8"><p className="font-semibold text-red-800">{isArabic ? "تعذر تحميل الطلبات" : "We couldn’t load your orders"}</p><p className="mt-2 text-sm leading-6 text-slate-600">{error}</p><button onClick={() => void loadOrders()} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-ubh-navy px-4 py-3 text-sm font-semibold text-white hover:bg-[#0b2b53]"><RefreshCw size={16} />{isArabic ? "إعادة المحاولة" : "Try again"}</button></div>}

        {!loading && !error && orders.length === 0 && <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm"><PackageSearch className="mx-auto h-12 w-12 text-slate-400" /><h2 className="mt-5 text-xl font-semibold text-ubh-navy">{isArabic ? "لا توجد طلبات بعد" : "No orders yet"}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{isArabic ? "ستظهر مشترياتك هنا بعد إتمام طلبك." : "Once you place an order, you’ll find its status and details here."}</p><Link href={`/${locale}/shop`} className="mt-6 inline-flex rounded-xl bg-ubh-navy px-6 py-3 text-sm font-semibold text-white hover:bg-[#0b2b53]">{isArabic ? "تصفح الكتب" : "Browse books"}</Link></div>}

        {!loading && !error && orders.length > 0 && filteredOrders.length === 0 && <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center"><Search className="mx-auto h-9 w-9 text-slate-400" /><h2 className="mt-3 font-semibold text-ubh-navy">{isArabic ? "لم يتم العثور على طلبات" : "No matching orders"}</h2><p className="mt-1 text-sm text-slate-500">{isArabic ? "جرّب تغيير البحث أو حالة الطلب." : "Try another search term or order status."}</p><button onClick={() => { setQuery(""); setFilter("all"); }} className="mt-4 text-sm font-semibold text-ubh-blue-bright underline">{isArabic ? "مسح عوامل التصفية" : "Clear filters"}</button></div>}

        {!loading && !error && filteredOrders.length > 0 && <div className="space-y-4">{filteredOrders.map((order) => (
          <article key={order.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md">
            <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="min-w-0"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{isArabic ? "رقم الطلب" : "Order number"}</p><h2 className="mt-1 break-words text-lg font-bold text-ubh-navy">{order.name}</h2><p className="mt-1 text-sm text-slate-500">{isArabic ? "تاريخ الطلب: " : "Placed on "}{date(order.date)}</p></div>
              <OrderStatusBadge status={order.status} locale={locale} />
            </div>
            <div className="p-5 sm:p-6">
              <div className="space-y-4">{order.lines.slice(0, 2).map((line) => <div key={line.id} className="flex items-center gap-3"><div className="flex h-14 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-100">{line.image ? <Image src={line.image} alt={line.name} width={48} height={56} sizes="48px" className="h-full w-full object-cover" loading="lazy" /> : <PackageSearch className="h-5 w-5 text-slate-400" />}</div><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-semibold text-slate-800">{line.name}</p><p className="mt-1 text-xs text-slate-500">{isArabic ? "الكمية" : "Qty"}: {line.quantity}</p></div><p className="shrink-0 text-sm font-semibold text-ubh-navy">{money(line.subtotal, order.currency)}</p></div>)}{order.lines.length > 2 && <p className="text-xs font-medium text-slate-500">{isArabic ? `و ${order.lines.length - 2} منتجات أخرى` : `+ ${order.lines.length - 2} more item(s)`}</p>}</div>
              <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs text-slate-500">{isArabic ? "إجمالي الطلب" : "Order total"}</p><p className="mt-1 text-xl font-bold text-ubh-navy">{money(order.total, order.currency)}</p><div className="mt-2 flex flex-wrap items-center gap-2"><span className="text-xs text-slate-500">{isArabic ? "الدفع" : "Payment"}</span><OrderStatusBadge status={order.paymentStatus} locale={locale} /></div></div><Link href={`/${locale}/profile/orders/${order.id}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-ubh-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2b53]">{isArabic ? "عرض تفاصيل الطلب" : "View order details"}{isArabic ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}</Link></div>
            </div>
          </article>
        ))}</div>}
      </Container>
    </main>
  );
}
