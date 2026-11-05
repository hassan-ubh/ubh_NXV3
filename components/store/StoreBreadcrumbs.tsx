// "use client";

// import { usePathname, useSearchParams } from "next/navigation";
// import { Breadcrumbs, type BreadcrumbItem } from "@/components/shared/Breadcrumbs";
// import { getProductBySlug } from "@/lib/store/catalog";
// import type { Locale } from "@/lib/i18n";
// import { getCategoryLabel } from "@/lib/store/categories";

// type Props = { locale: Locale };

// /** Compact, bilingual breadcrumbs shared by every store route. */
// export function StoreBreadcrumbs({ locale }: Props) {
//   const pathname = usePathname() || `/${locale}/shop`;
//   const searchParams = useSearchParams();
//   const segments = pathname.split("/").filter(Boolean).slice(1);
//   const ar = locale === "ar";
//   const shopHref = `/${locale}/shop`;
//   const label = (en: string, arabic: string) => ar ? arabic : en;
//   let items: BreadcrumbItem[] = [];

//   if (segments.length === 1 && segments[0] === "shop") return null;

//   if (segments[0] === "shop" && segments[1] === "products") {
//     const category = searchParams.get("category");
//     const collection = searchParams.get("collection");
//     const type = searchParams.get("type");
//     const query = searchParams.get("q");
//     const collections: Record<string, [string, string]> = {
//       "new-releases": ["New releases", "أحدث الإصدارات"],
//       ubh: ["UBH publications", "منشورات UBH"],
//       "best-sellers": ["Best sellers", "الأكثر مبيعًا"],
//       offers: ["Special offers", "عروض خاصة"],
//       "open-access": ["Open access", "الوصول المفتوح"],
//       series: ["Book series", "سلاسل الكتب"],
//     };
//     items = [{ label: label("All books", "جميع الكتب"), href: shopHref }];
//     if (category) items.push({ label: getCategoryLabel(category, locale) });
//     else if (collection && collections[collection]) items.push({ label: label(...collections[collection]) });
//     else if (type === "ebook") items.push({ label: label("eBooks", "الكتب الإلكترونية") });
//     else if (type === "textbook") items.push({ label: label("Textbooks", "الكتب الدراسية") });
//     else if (query) items.push({ label: label(`Search: ${query.slice(0, 50)}`, `بحث: ${query.slice(0, 50)}`) });
//   } else if (segments[0] === "shop" && segments[1]) {
//     const product = getProductBySlug(decodeURIComponent(segments[1]));
//     items = [
//       { label: label("All books", "جميع الكتب"), href: `${shopHref}/products` },
//       { label: product ? (ar && (product as { titleAr?: string }).titleAr ? (product as { titleAr?: string }).titleAr! : product.title) : label("Product details", "تفاصيل المنتج") },
//     ];
//   } else {
//     const routes: Record<string, [string, string]> = {
//       cart: ["Shopping cart", "سلة التسوق"],
//       checkout: ["Checkout", "إتمام الشراء"],
//       wishlist: ["Wishlist", "قائمة الأمنيات"],
//       profile: ["My account", "حسابي"],
//       addresses: ["Addresses", "العناوين"],
//       login: ["Sign in", "تسجيل الدخول"],
//       signup: ["Create account", "إنشاء حساب"],
//       "forgot-password": ["Reset password", "إعادة تعيين كلمة المرور"],
//       "order-confirmation": ["Order confirmation", "تأكيد الطلب"],
//       authors: ["Authors", "المؤلفون"],
//     };
//     const route = segments[0];
//     if (route && routes[route]) {
//       const current = routes[route];
//       if (route === "profile" && segments[1] === "orders") {
//         items = [
//           { label: label("My account", "حسابي"), href: `/${locale}/profile` },
//           { label: label("Orders", "الطلبات"), ...(segments[2] ? { href: `/${locale}/profile/orders` } : {}) },
//           ...(segments[2] ? [{ label: label("Order details", "تفاصيل الطلب") }] : []),
//         ];
//       } else if (route === "authors" && segments[1]) {
//         items = [
//           { label: label("Authors", "المؤلفون"), href: shopHref },
//           { label: decodeURIComponent(segments[1]).replace(/[-_]+/g, " ") },
//         ];
//       } else {
//         items = [{ label: label(current[0], current[1]) }];
//       }
//     }
//   }

//   if (!items.length) return null;
//   return (
//     <div className="border-b border-slate-100 bg-white">
//       <div className="mx-auto w-full max-w-[1280px] px-4 py-3 sm:px-6 lg:px-8">
//         <Breadcrumbs locale={locale} items={items} homeHref={shopHref} homeLabel={label("Store", "المتجر")} />
//       </div>
//     </div>
//   );
// }



"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/shared/Breadcrumbs";
import { getProductBySlug } from "@/lib/store/catalog";
import type { Locale } from "@/lib/i18n";
import { getCategoryLabel } from "@/lib/store/categories";

type Props = { locale: Locale };

export function StoreBreadcrumbs({ locale }: Props) {
  const pathname = usePathname() || `/${locale}/shop`;
  const searchParams = useSearchParams();

  const segments = pathname.split("/").filter(Boolean).slice(1);
  const ar = locale === "ar";
  const shopHref = `/${locale}/shop`;

  const label = (en: string, arabic: string) => (ar ? arabic : en);

  const items: BreadcrumbItem[] = [];

  const collections: Record<string, [string, string]> = {
    "new-releases": ["New releases", "أحدث الإصدارات"],
    ubh: ["UBH publications", "منشورات UBH"],
    "best-sellers": ["Best sellers", "الأكثر مبيعًا"],
    offers: ["Special offers", "عروض خاصة"],
    "open-access": ["Open access", "الوصول المفتوح"],
    series: ["Book series", "سلاسل الكتب"],
  };

  const routes: Record<string, [string, string]> = {
    cart: ["Shopping cart", "سلة التسوق"],
    checkout: ["Checkout", "إتمام الشراء"],
    wishlist: ["Wishlist", "قائمة الأمنيات"],
    profile: ["My account", "حسابي"],
    addresses: ["Addresses", "العناوين"],
    login: ["Sign in", "تسجيل الدخول"],
    signup: ["Create account", "إنشاء حساب"],
    "forgot-password": ["Reset password", "إعادة تعيين كلمة المرور"],
    "order-confirmation": ["Order confirmation", "تأكيد الطلب"],
    authors: ["Authors", "المؤلفون"],
  };

  const currentRoute = segments[0];
  const secondSegment = segments[1];

  // Store homepage: /shop
  if (currentRoute === "shop" && !secondSegment) {
    return null;
  }

  // Publisher directory: /shop/publishers
  if (currentRoute === "shop" && secondSegment === "publishers") {
    const market = searchParams.get("market");
    const language = searchParams.get("language");

    const marketLabels: Record<string, [string, string]> = {
      international: ["International publishers", "الناشرون الدوليون"],
      local: ["Local publishers", "الناشرون المحليون"],
    };

    const languageLabels: Record<string, [string, string]> = {
      en: ["English", "الإنجليزية"],
      ar: ["Arabic", "العربية"],
    };

    items.push({
      label: label("Publishers", "الناشرون"),
      href: `${shopHref}/publishers`,
    });

    if (market && marketLabels[market]) {
      items.push({
        label: label(...marketLabels[market]),
        href: language
          ? `${shopHref}/publishers?market=${market}`
          : undefined,
      });
    }

    if (language && languageLabels[language]) {
      items.push({
        label: label(...languageLabels[language]),
      });
    }
  }

  // Product listing: /shop/products
  else if (currentRoute === "shop" && secondSegment === "products") {
    const category = searchParams.get("category");
    const collection = searchParams.get("collection");
    const type = searchParams.get("type");
    const query = searchParams.get("q");
    const publisher = searchParams.get("publisher");

    items.push({
      label: label("All books", "جميع الكتب"),
      href: shopHref,
    });

    if (publisher) {
      items.push({
        label: label("Publishers", "الناشرون"),
        href: `${shopHref}/publishers`,
      });
      items.push({
        label: publisher,
      });
    } else if (category) {
      items.push({
        label: getCategoryLabel(category, locale),
      });
    } else if (collection && collections[collection]) {
      items.push({
        label: label(...collections[collection]),
      });
    } else if (type === "ebook") {
      items.push({ label: label("eBooks", "الكتب الإلكترونية") });
    } else if (type === "textbook") {
      items.push({ label: label("Textbooks", "الكتب الدراسية") });
    } else if (query) {
      items.push({
        label: label(
          `Search: ${query.slice(0, 50)}`,
          `بحث: ${query.slice(0, 50)}`
        ),
      });
    }
  }

  // Product details: /shop/[slug]
  else if (
    currentRoute === "shop" &&
    secondSegment &&
    secondSegment !== "products" &&
    secondSegment !== "publishers"
  ) {
    const product = getProductBySlug(decodeURIComponent(secondSegment));

    items.push(
      {
        label: label("All books", "جميع الكتب"),
        href: `${shopHref}/products`,
      },
      {
        label: product
          ? ar && (product as { titleAr?: string }).titleAr
            ? (product as { titleAr?: string }).titleAr!
            : product.title
          : label("Product details", "تفاصيل المنتج"),
      }
    );
  }

  // Other store routes
  else if (currentRoute && routes[currentRoute]) {
    if (currentRoute === "profile" && secondSegment === "orders") {
      items.push(
        {
          label: label("My account", "حسابي"),
          href: `/${locale}/profile`,
        },
        {
          label: label("Orders", "الطلبات"),
          href: segments[2] ? `/${locale}/profile/orders` : undefined,
        }
      );

      if (segments[2]) {
        items.push({
          label: label("Order details", "تفاصيل الطلب"),
        });
      }
    } else if (currentRoute === "authors" && secondSegment) {
      items.push(
        {
          label: label("Authors", "المؤلفون"),
          href: shopHref,
        },
        {
          label: decodeURIComponent(secondSegment).replace(/[-_]+/g, " "),
        }
      );
    } else {
      items.push({
        label: label(...routes[currentRoute]),
      });
    }
  }

  if (!items.length) return null;

  
return (
  <div className="relative border-b border-slate-200/70 bg-white">
    <div className="mx-auto flex w-full max-w-[1280px] items-center px-4 py-3 sm:px-6 lg:px-8">
      <Breadcrumbs
        locale={locale}
        items={items}
        homeHref={shopHref}
        homeLabel={label("Store", "المتجر")}
      />
    </div>
  </div>
);

}
