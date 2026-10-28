import { Suspense } from "react";
import { StoreHeader } from "@/components/store/StoreHeader";
import { Footer } from "@/components/shared/Footer";
import type { Locale } from "@/lib/i18n";
import { StoreBreadcrumbs } from "@/components/store/StoreBreadcrumbs";

export function StoreShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <>
      <StoreHeader locale={locale} />
      <Suspense fallback={null}>
        <StoreBreadcrumbs locale={locale} />
      </Suspense>
      {children}
      <Footer locale={locale} />
    </>
  );
}
