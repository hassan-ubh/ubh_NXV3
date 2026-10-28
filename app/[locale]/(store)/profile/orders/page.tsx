import type { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false, follow: false } };
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { OrdersPageClient } from "@/components/store/orders/OrdersPageClient";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return <OrdersPageClient locale={locale} />;
}