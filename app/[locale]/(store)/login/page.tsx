import type { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false, follow: false } };

import { notFound } from "next/navigation";
import { AuthForm } from "@/components/store/auth/AuthForm";
import { isLocale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <AuthForm locale={locale} mode="login" />;
}