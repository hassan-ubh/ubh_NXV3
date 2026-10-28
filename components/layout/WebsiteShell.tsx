
import { Suspense } from "react";
import { ContextualHeader } from "@/components/layout/ContextualHeader";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { Footer } from "@/components/shared/Footer";
import type { Locale } from "@/lib/i18n";

export function WebsiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<SiteHeader locale={locale} />}>
        <ContextualHeader locale={locale} />
      </Suspense>

      {children}

      <Footer locale={locale} />
    </>
  );
}
