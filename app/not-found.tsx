
"use client";

import { usePathname } from "next/navigation";

import { NotFoundState } from "@/components/shared/NotFoundState";
import { StoreShell } from "@/components/layout/StoreShell";
import { WebsiteShell } from "@/components/layout/WebsiteShell";
import { isLocale, type Locale } from "@/lib/i18n";

export default function NotFound() {
  const pathname = usePathname();

  const firstSegment = pathname?.split("/")[1] ?? "";

  const locale: Locale = isLocale(firstSegment)
    ? firstSegment
    : "en";

  /*
   * Anything under /shop belongs to the store.
   *
   * Examples:
   * /en/shop
   * /en/shop/catepubl
   * /en/shop/some-product
   *
   * All of these should use StoreShell,
   * but the 404 itself remains generic.
   */
  const isStoreRoute =
    pathname === `/${locale}/shop` ||
    pathname?.startsWith(`/${locale}/shop/`);

  const content = (
    <NotFoundState
      locale={locale}
      store={Boolean(isStoreRoute)}
    />
  );

  if (isStoreRoute) {
    return (
      <StoreShell locale={locale}>
        {content}
      </StoreShell>
    );
  }

  return (
    <WebsiteShell locale={locale}>
      {content}
    </WebsiteShell>
  );
}