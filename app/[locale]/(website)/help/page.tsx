import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { InfoPage } from "@/components/shared/InfoPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "Help and support" : "Help and support | University Book House";
  return { title, description: "Find answers about browsing, ordering, delivery and returns." };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ar = locale === "ar";
  return <InfoPage locale={locale} eyebrow={ar ? "المساعدة والدعم" : "Help & Support"} title={ar ? "المساعدة والدعم" : "Help and support"} description={ar ? "اعثر على إجابات حول تصفح الكتب والطلبات والتوصيل والإرجاع." : "Find answers about browsing, ordering, delivery and returns."} notice={ar ? "للحصول على مساعدة بشأن الطلبات، يجب إعداد تسجيل دخول آمن وربط خدمة الطلبات في أودو قبل الإطلاق." : "For order-specific assistance, secure account access and the Odoo order service must be connected before launch."} bullets={ar ? ['تصفح الفهرس وتفاصيل الكتب قبل الطلب.', 'تُحفظ سلة التسوق التجريبية في هذا المتصفح فقط.', 'يرجى تأكيد شروط التوصيل والإرجاع مع دعم UBH.'] : ['Browse the catalogue and product details before ordering.', 'Your cart is stored in this demo browser only.', 'Delivery and return eligibility must be confirmed by UBH support.']} primaryHref={`/${locale}/shop`} primaryLabel={ar ? "تصفح الكتب" : "Browse books"} />;
}
