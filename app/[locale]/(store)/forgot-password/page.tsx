import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { InfoPage } from "@/components/shared/InfoPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "Forgot your password?" : "Forgot your password? | University Book House";
  return { title, description: "Password recovery is a demo placeholder until a secure authentication provider is configured.", robots: { index: false, follow: false } };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ar = locale === "ar";
  return <InfoPage locale={locale} eyebrow={ar ? "الوصول إلى الحساب" : "Account access"} title={ar ? "هل نسيت كلمة المرور؟" : "Forgot your password?"} description={ar ? "استعادة كلمة المرور صفحة تجريبية إلى حين إعداد مزود مصادقة آمن." : "Password recovery is a demo placeholder until a secure authentication provider is configured."} notice={ar ? "لم يتم إرسال أي بريد إلكتروني. يجب ربط مزود هوية موثوق أو آلية آمنة لرموز إعادة التعيين على الخادم قبل استخدام الصفحة فعلياً." : "No email has been sent. Connect a verified identity provider or server-side reset-token flow before using this page in production."} bullets={ar ? ['لا تحفظ كلمات المرور أو رموز إعادة التعيين في تخزين المتصفح.', 'استخدم رموز إعادة تعيين لمرة واحدة ومحدودة المدة مع تحديد معدل الطلبات.'] : ['Never send passwords or reset tokens to client-side storage.', 'Use single-use, time-limited reset tokens and rate limits.']} primaryHref={`/${locale}/shop`} primaryLabel={ar ? "تصفح الكتب" : "Browse books"} />;
}
