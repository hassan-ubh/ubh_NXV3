// import { WebsiteShell } from "@/components/layout/WebsiteShell";
// import { isLocale } from "@/lib/i18n";
// import { notFound } from "next/navigation";

// export default async function WebsiteLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: Promise<{ locale: string }>;
// }) {
//   const { locale } = await params;
//   if (!isLocale(locale)) notFound();

//   return <WebsiteShell locale={locale}>{children}</WebsiteShell>;
// }

import { ContextualWebsiteShell } from "@/components/layout/ContextualWebsiteShell";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function WebsiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

 return (
  <Suspense fallback={null}>
    <ContextualWebsiteShell locale={locale}>
      {children}
    </ContextualWebsiteShell>
  </Suspense>
);
}
