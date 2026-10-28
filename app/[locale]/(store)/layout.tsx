import { StoreShell } from "@/components/layout/StoreShell";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <StoreShell locale={locale}>{children}</StoreShell>;
}
