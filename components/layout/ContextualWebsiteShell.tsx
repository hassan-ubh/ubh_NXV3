
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { StoreHeader } from "@/components/store/StoreHeader";
import { Footer } from "@/components/shared/Footer";
import type { Locale } from "@/lib/i18n";

export function ContextualWebsiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isPublisherProfile =
    pathname?.startsWith(`/${locale}/publishers/`) ?? false;

  const useStoreHeader =
    isPublisherProfile && searchParams.get("source") === "store";

  return (
    <>
      {useStoreHeader ? (
        <StoreHeader locale={locale} />
      ) : (
        <SiteHeader locale={locale} />
      )}

      {children}

      <Footer locale={locale} />
    </>
  );
}
