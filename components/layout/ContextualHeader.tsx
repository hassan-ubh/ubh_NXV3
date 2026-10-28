
"use client";

import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { StoreHeader } from "@/components/store/StoreHeader";
import type { Locale } from "@/lib/i18n";

export function ContextualHeader({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();

  if (searchParams.get("source") === "store") {
    return <StoreHeader locale={locale} />;
  }

  return <SiteHeader locale={locale} />;
}
