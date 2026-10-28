import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { OrderDetailsClient } from "@/components/store/orders/OrderDetailsClient";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  if (!isLocale(locale) || !/^\d+$/.test(id)) {
    notFound();
  }

  return <OrderDetailsClient locale={locale} orderId={id} />;
}