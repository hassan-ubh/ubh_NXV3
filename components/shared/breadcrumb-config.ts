
// import type { Locale } from "@/lib/i18n";
// import type { BreadcrumbItem } from "./Breadcrumbs";

// const labels = {
//   en: {
//     about: "About Us",
//     publishers: "Publishers",
//     digitalSolutions: "Digital Solutions",
//     news: "News",
//     shop: "Shop",
//     allBooks: "All Books",
//     cart: "Shopping Cart",
//     wishlist: "Wishlist",
//     categories: "Categories",
//     computerScience: "Computer Science & IT",
//   },
//   ar: {
//     about: "من نحن",
//     publishers: "الناشرون",
//     digitalSolutions: "الحلول الرقمية",
//     news: "الأخبار",
//     shop: "المتجر",
//     allBooks: "جميع الكتب",
//     cart: "سلة التسوق",
//     wishlist: "قائمة الأمنيات",
//     categories: "التصنيفات",
//     computerScience: "علوم الحاسوب وتقنية المعلومات",
//   },
// };

// export function websiteBreadcrumbs(
//   locale: Locale,
//   page: "about" | "publishers" | "digitalSolutions" | "news",
// ): BreadcrumbItem[] {
//   const t = labels[locale];

//   const routes: Record<
//     typeof page,
//     BreadcrumbItem[]
//   > = {
//     about: [{ label: t.about }],
//     publishers: [
//       {
//         label: t.publishers,
//         href: `/${locale}/publishers`,
//       },
//     ],
//     digitalSolutions: [
//       {
//         label: t.digitalSolutions,
//         href: `/${locale}/digital-solutions`,
//       },
//     ],
//     news: [
//       {
//         label: t.news,
//         href: `/${locale}/news`,
//       },
//     ],
//   };

//   return routes[page];
// }

// export function shopBreadcrumbs(
//   locale: Locale,
//   page: "allBooks" | "cart" | "wishlist" | "computerScience",
// ): BreadcrumbItem[] {
//   const t = labels[locale];

//   const shop = {
//     label: t.shop,
//     href: `/${locale}/shop`,
//   };

//   switch (page) {
//     case "allBooks":
//       return [shop, { label: t.allBooks }];

//     case "cart":
//       return [shop, { label: t.cart }];

//     case "wishlist":
//       return [shop, { label: t.wishlist }];

//     case "computerScience":
//       return [
//         shop,
//         {
//           label: t.categories,
//           href: `/${locale}/shop`,
//         },
//         { label: t.computerScience },
//       ];
//   }
// }


import type { Locale } from "@/lib/i18n";
import type { BreadcrumbItem } from "./Breadcrumbs";

type WebsitePage =
  | "about"
  | "publishers"
  | "digitalSolutions"
  | "news"
  | "research"
  | "publications"
  | "contact"
  | "institutions"
  | "aiSolutions";

const labels = {
  en: {
    home: "Home",
    about: "About Us",
    publishers: "Publishers",
    digitalSolutions: "Digital Solutions",
    news: "News",
    research: "Research",
    publications: "Publications",
    contact: "Contact Us",
    institutions: "Institutions",
    aiSolutions: "AI Solutions",
  },
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    publishers: "الناشرون",
    digitalSolutions: "الحلول الرقمية",
    news: "الأخبار",
    research: "الأبحاث",
    publications: "المنشورات",
    contact: "اتصل بنا",
    institutions: "المؤسسات",
    aiSolutions: "حلول الذكاء الاصطناعي",
  },
};

const routes: Record<WebsitePage, string> = {
  about: "/about-us",
  publishers: "/publishers",
  digitalSolutions: "/digital-solutions",
  news: "/news",
  research: "/research",
  publications: "/publications",
  contact: "/contact-us",
  institutions: "/institutions",
  aiSolutions: "/ai-solutions",
};

export function websiteBreadcrumbs(
  locale: Locale,
  page: WebsitePage,
  currentLabel?: string
): BreadcrumbItem[] {
  const t = labels[locale];

  const items: BreadcrumbItem[] = [
    {
      label: t[page],
      href: `/${locale}${routes[page]}`,
    },
  ];

  if (currentLabel) {
    items.push({
      label: currentLabel,
    });
  } else {
    // The current page should not link to itself.
    delete items[0].href;
  }

  return items;
}

export function shopBreadcrumbs(
  locale: Locale,
  page: "allBooks" | "cart" | "wishlist" | "computerScience"
): BreadcrumbItem[] {
  const isArabic = locale === "ar";

  const t = {
    shop: isArabic ? "المتجر" : "Store",
    allBooks: isArabic ? "جميع الكتب" : "All Books",
    cart: isArabic ? "سلة التسوق" : "Shopping Cart",
    wishlist: isArabic ? "قائمة الأمنيات" : "Wishlist",
    categories: isArabic ? "التصنيفات" : "Categories",
    computerScience: isArabic
      ? "علوم الحاسوب وتقنية المعلومات"
      : "Computer Science & IT",
  };

  const shop: BreadcrumbItem = {
    label: t.shop,
    href: `/${locale}/shop`,
  };

  switch (page) {
    case "allBooks":
      return [
        {
          label: t.allBooks,
        },
      ];

    case "cart":
      return [
        shop,
        {
          label: t.cart,
        },
      ];

    case "wishlist":
      return [
        shop,
        {
          label: t.wishlist,
        },
      ];

    case "computerScience":
      return [
        {
          label: t.allBooks,
          href: `/${locale}/shop/products`,
        },
        {
          label: t.categories,
          href: `/${locale}/shop/products`,
        },
        {
          label: t.computerScience,
        },
      ];

    default:
      return [];
  }
}
