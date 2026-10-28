// import { StorePage } from "@/components/store/StorePage";
// import { isLocale } from "@/lib/i18n";
// import { notFound } from "next/navigation";
// import type { Metadata } from "next";
// import { products } from "@/data/products";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }): Promise<Metadata> {
//   const { locale } = await params;
//   return {
//     title:
//       locale === "ar"
//         ? "متجر UBH "
//         : "UBH Store",
//     description:
//       locale === "ar"
//         ? "آلاف الكتب الأكاديمية والكتب الإلكترونية."
//         : "Thousands of academic books, eBooks and resources.",
//   };
// }
// export default async function Page({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }) {
//   const { locale } = await params;
//   if (!isLocale(locale)) notFound();
//   return <StorePage locale={locale} />;
// }

import { StorePage } from "@/components/store/StorePage";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "ar") {
    return {
      title: "متجر UBH",
      description:
        "اكتشف الكتب الأكاديمية والكتب الإلكترونية والمنشورات في متجر UBH.",
    };
  }

  return {
    title: "UBH Store | Academic Books & eBooks",
    description:
      "Discover academic books, eBooks and publications from UBH and leading publishers.",
  };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <StorePage locale={locale} />;
}