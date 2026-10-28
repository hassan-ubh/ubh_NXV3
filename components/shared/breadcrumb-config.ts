
import type { Locale } from "@/lib/i18n";
import type { BreadcrumbItem } from "./Breadcrumbs";

const labels = {
  en: {
    about: "About Us",
    publishers: "Publishers",
    digitalSolutions: "Digital Solutions",
    news: "News",
    shop: "Shop",
    allBooks: "All Books",
    cart: "Shopping Cart",
    wishlist: "Wishlist",
    categories: "Categories",
    computerScience: "Computer Science & IT",
  },
  ar: {
    about: "من نحن",
    publishers: "الناشرون",
    digitalSolutions: "الحلول الرقمية",
    news: "الأخبار",
    shop: "المتجر",
    allBooks: "جميع الكتب",
    cart: "سلة التسوق",
    wishlist: "قائمة الأمنيات",
    categories: "التصنيفات",
    computerScience: "علوم الحاسوب وتقنية المعلومات",
  },
};

export function websiteBreadcrumbs(
  locale: Locale,
  page: "about" | "publishers" | "digitalSolutions" | "news",
): BreadcrumbItem[] {
  const t = labels[locale];

  const routes: Record<
    typeof page,
    BreadcrumbItem[]
  > = {
    about: [{ label: t.about }],
    publishers: [
      {
        label: t.publishers,
        href: `/${locale}/publishers`,
      },
    ],
    digitalSolutions: [
      {
        label: t.digitalSolutions,
        href: `/${locale}/digital-solutions`,
      },
    ],
    news: [
      {
        label: t.news,
        href: `/${locale}/news`,
      },
    ],
  };

  return routes[page];
}

export function shopBreadcrumbs(
  locale: Locale,
  page: "allBooks" | "cart" | "wishlist" | "computerScience",
): BreadcrumbItem[] {
  const t = labels[locale];

  const shop = {
    label: t.shop,
    href: `/${locale}/shop`,
  };

  switch (page) {
    case "allBooks":
      return [shop, { label: t.allBooks }];

    case "cart":
      return [shop, { label: t.cart }];

    case "wishlist":
      return [shop, { label: t.wishlist }];

    case "computerScience":
      return [
        shop,
        {
          label: t.categories,
          href: `/${locale}/shop`,
        },
        { label: t.computerScience },
      ];
  }
}
