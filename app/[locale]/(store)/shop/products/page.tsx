
import { ProductShow } from "@/components/store/ProductShow";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SHOP_CATEGORIES } from "@/lib/store/categories";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const ALLOWED_CATEGORIES: readonly string[] = SHOP_CATEGORIES.map(
  (category) => category.slug,
);

const ALLOWED_COLLECTIONS = [
  "new-releases",
  "ubh",
  "best-sellers",
  "offers",
  "open-access",
  "series",
] as const;

const ALLOWED_TYPES = ["ebook", "textbook"] as const;

export async function generateMetadata({
  params,
}: Pick<PageProps, "params">): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "ar") {
    return {
      title: "جميع الكتب | متجر UBH",
      description:
        "استكشف الكتب الأكاديمية والكتب الدراسية والكتب الإلكترونية في متجر UBH.",
    };
  }

  return {
    title: "All Books | UBH Store",
    description:
      "Browse academic books, textbooks and eBooks from UBH and leading publishers.",
  };
}

export default async function ProductsPage({
  params,
  searchParams,
}: PageProps) {
  const [{ locale }, queryParams] = await Promise.all([
    params,
    searchParams,
  ]);

  if (!isLocale(locale)) {
    notFound();
  }

  function getTextParam(key: string): string {
    const value = queryParams[key];

    return typeof value === "string"
      ? value.trim().slice(0, 120)
      : "";
  }

  function getAllowedParam(
    key: string,
    allowed: readonly string[],
  ): string {
    const value = getTextParam(key);

    return allowed.includes(value) ? value : "";
  }

  const initialFilters = {
    q: getTextParam("q"),
    category: getAllowedParam(
      "category",
      ALLOWED_CATEGORIES,
    ),
    collection: getAllowedParam(
      "collection",
      ALLOWED_COLLECTIONS,
    ),
    type: getAllowedParam("type", ALLOWED_TYPES),
    publisher: getTextParam("publisher"),
    author: getTextParam("author"),
  };

  return (
    <main className="min-h-screen bg-[#fbfbfa]">
      <ProductShow
        key={JSON.stringify(initialFilters)}
        locale={locale}
        initialFilters={initialFilters}
      />
    </main>
  );
}
