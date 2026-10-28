import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { InfoPage } from "@/components/shared/InfoPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "Address book" : "Address book | University Book House";
  return { title, description: "Manage delivery addresses after signing in." };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ar = locale === "ar";
  return <InfoPage locale={locale} eyebrow={ar ? "حسابي" : "My account"} title={ar ? "دفتر العناوين" : "Address book"} description={ar ? "أدر عناوين التوصيل بعد تسجيل الدخول." : "Manage delivery addresses after signing in."} notice={ar ? "لا تُحفظ العناوين في هذه النسخة التجريبية. اربطها بسجل العميل المصادق عليه في أودو قبل قبول الطلبات الفعلية." : "Address management is not persisted in this frontend demo. Connect it to the authenticated customer record in Odoo before accepting real orders."} bullets={ar ? ['تحقق من حقول العنوان داخل الإمارات على الخادم.', 'اسمح للعميل المسجل فقط بعرض عناوينه أو تعديلها.'] : ['Validate UAE address fields on the server.', 'Only allow the signed-in customer to read or update their addresses.']} primaryHref={`/${locale}/shop`} primaryLabel={ar ? "تصفح الكتب" : "Browse books"} />;
}
