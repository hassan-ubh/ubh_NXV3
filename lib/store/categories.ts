import type { Locale } from "@/lib/i18n";

/** Canonical category IDs shared by header navigation, search, and catalogue filters. */
export const SHOP_CATEGORIES = [
  { slug: "academic-professional", en: "Academic & Professional", ar: "الأكاديمية والمهنية", keywords: ["academic", "professional", "university", "reference"] },
  { slug: "business-economics", en: "Business & Economics", ar: "الأعمال والاقتصاد", keywords: ["business", "economics", "finance", "management", "marketing", "accounting", "business"] },
  { slug: "computer-science-it", en: "Computer Science & IT", ar: "علوم الحاسوب وتقنية المعلومات", keywords: ["computer science", "information technology", "software", "programming", "algorithm", "data", "it"] },
  { slug: "engineering", en: "Engineering", ar: "الهندسة", keywords: ["engineering", "mechanical", "civil engineering", "electrical", "robotics"] },
  { slug: "medicine-health", en: "Medicine & Health Sciences", ar: "الطب والعلوم الصحية", keywords: ["medicine", "medical", "health", "nursing", "clinical", "pharmacy", "medicine"] },
  { slug: "law", en: "Law", ar: "القانون", keywords: ["law", "legal", "jurisprudence"] },
  { slug: "education", en: "Education", ar: "التعليم", keywords: ["education", "teaching", "pedagogy", "learning", "education"] },
  { slug: "social-sciences", en: "Social Sciences", ar: "العلوم الاجتماعية", keywords: ["social sciences", "sociology", "psychology", "political science", "anthropology", "psychology"] },
  { slug: "arts-humanities", en: "Arts & Humanities", ar: "الفنون والعلوم الإنسانية", keywords: ["arts", "humanities", "history", "literature", "philosophy", "language", "media", "communication", "media communication", "media and communication"] },
  { slug: "science-mathematics", en: "Science & Mathematics", ar: "العلوم والرياضيات", keywords: ["science", "mathematics", "physics", "chemistry", "biology", "statistics", "science"] },
] as const;

export type ShopCategorySlug = (typeof SHOP_CATEGORIES)[number]["slug"];

function normalizeCategoryLabel(value: string): string {
  return value.normalize("NFC").toLocaleLowerCase().replace(/&/g, "and").replace(/[^\p{L}\p{N}]+/gu, " ").trim().replace(/\s+/g, " ");
}

export function resolveCategorySlug(value?: string | null): ShopCategorySlug | "" {
  if (!value) return "";
  const normalized = normalizeCategoryLabel(value);
  const match = SHOP_CATEGORIES.find((category) =>
    category.slug === value ||
    normalizeCategoryLabel(category.en) === normalized ||
    normalizeCategoryLabel(category.ar) === normalized ||
    category.keywords.some((keyword) => normalizeCategoryLabel(keyword) === normalized),
  );
  return match?.slug ?? "";
}

export function getCategoryLabel(slug: string, locale: Locale): string {
  const category = SHOP_CATEGORIES.find((item) => item.slug === slug);
  if (!category) return slug;
  return locale === "ar" ? category.ar : category.en;
}

export function getCategoryKeywords(slug: string): readonly string[] {
  return SHOP_CATEGORIES.find((item) => item.slug === slug)?.keywords ?? [];
}
