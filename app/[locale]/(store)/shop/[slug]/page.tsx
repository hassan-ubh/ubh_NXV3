import { notFound } from "next/navigation";

import { getProductBySlug } from "@/lib/store/catalog";
import { isLocale } from "@/lib/i18n";
import ProductDetailsClient from "@/components/store/ProductDetailsClient";

type ProductPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) notFound();

  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetailsClient locale={locale} product={product} />;
}
