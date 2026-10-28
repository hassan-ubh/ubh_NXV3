import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, isLocale, Locale } from "@/lib/i18n";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title:
      locale === "ar"
        ? "دار الكتاب الجامعي | المعرفة الأكاديمية"
        : "University Book House | Academic Knowledge",
    alternates: { languages: { en: "/en", ar: "/ar" } },
  };
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <ScrollToTop locale={locale}/>
      {children}
    </div>
  );
}
