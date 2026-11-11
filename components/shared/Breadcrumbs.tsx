// import Link from "next/link";
// import { ChevronRight, House } from "lucide-react";
// import type { Locale } from "@/lib/i18n";

// export type BreadcrumbItem = {
//   label: string;
//   href?: string;
// };

// type BreadcrumbsProps = {
//   locale: Locale;
//   items: BreadcrumbItem[];
//   className?: string;
//   variant?: "light" | "dark";
//   homeHref?: string;
//   homeLabel?: string;
// };

// const SITE_URL = "https://www.ubh.ae";

// export function Breadcrumbs({
//   locale,
//   items,
//   className = "",
//   variant = "light",
//   homeHref,
//   homeLabel: customHomeLabel,
// }: BreadcrumbsProps) {
//   const isArabic = locale === "ar";

//   if (items.length === 0) return null;

//   const homeLabel = customHomeLabel ?? (isArabic ? "الرئيسية" : "Home");
//   const breadcrumbLabel = isArabic
//     ? "مسار التنقل"
//     : "Breadcrumb";

//   const colors = {
//     light: {
//       muted: "text-slate-500",
//       link: "hover:text-ubh-blue-bright",
//       current: "text-ubh-navy",
//     },
//     dark: {
//       muted: "text-white/65",
//       link: "hover:text-white",
//       current: "text-white",
//     },
//   }[variant];

//   const allItems: BreadcrumbItem[] = [
//     { label: homeLabel, href: homeHref ?? `/${locale}` },
//     ...items,
//   ];

//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     itemListElement: allItems.map((item, index) => ({
//       "@type": "ListItem",
//       position: index + 1,
//       name: item.label,
//       ...(item.href
//         ? {
//             item: new URL(item.href, SITE_URL).toString(),
//           }
//         : {}),
//     })),
//   };

//   return (
//     <div
//       dir={isArabic ? "rtl" : "ltr"}
//       className={`min-w-0 ${className}`}
//     >
//       <nav aria-label={breadcrumbLabel}>
//         <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
//           {allItems.map((item, index) => {
//             const isLast = index === allItems.length - 1;
//             const isHome = index === 0;

//             return (
//               <li
//                 key={`${item.label}-${index}`}
//                 className="flex min-w-0 items-center gap-2"
//               >
//                 {index > 0 && (
//                   <ChevronRight
//                     aria-hidden="true"
//                     className={`h-3.5 w-3.5 shrink-0 ${
//                       isArabic ? "rotate-180" : ""
//                     } ${colors.muted}`}
//                   />
//                 )}

//                 {isLast || !item.href ? (
//                   <span
//                     aria-current={isLast ? "page" : undefined}
//                     title={item.label}
//                     className={`min-w-0 max-w-[180px] truncate font-medium sm:max-w-[280px] ${colors.current}`}
//                   >
//                     {isHome && (
//                       <House
//                         aria-hidden="true"
//                         className="me-1 inline h-3.5 w-3.5"
//                       />
//                     )}
//                     {item.label}
//                   </span>
//                 ) : (
//                   <Link
//                     href={item.href}
//                     className={`inline-flex shrink-0 items-center transition-colors duration-150 ${colors.muted} ${colors.link}`}
//                   >
//                     {isHome && (
//                       <House
//                         aria-hidden="true"
//                         className="me-1 h-3.5 w-3.5"
//                       />
//                     )}
//                     {item.label}
//                   </Link>
//                 )}
//               </li>
//             );
//           })}
//         </ol>
//       </nav>

//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(structuredData).replace(
//             /</g,
//             "\\u003c",
//           ),
//         }}
//       />
//     </div>
//   );
// }


import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  locale: Locale;
  items: BreadcrumbItem[];
  className?: string;
  variant?: "light" | "dark";
  homeHref?: string;
  homeLabel?: string;
  compact?: boolean;
};

const SITE_URL = "https://www.ubh.ae";

export function Breadcrumbs({
  locale,
  items,
  className = "",
  variant = "light",
  homeHref,
  homeLabel,
  compact = false,
}: BreadcrumbsProps) {
  const isArabic = locale === "ar";

  if (!items.length) return null;

  const homeText =
    homeLabel ?? (isArabic ? "الرئيسية" : "Home");

  const allItems: BreadcrumbItem[] = [
    {
      label: homeText,
      href: homeHref ?? `/${locale}`,
    },
    ...items,
  ];

  const colors =
    variant === "dark"
      ? {
          link: "text-white/65 hover:text-white",
          current: "text-white",
          separator: "text-white/30",
          focus: "focus-visible:ring-white/70",
        }
      : {
          link: "text-slate-500 hover:text-[#064a98]",
          current: "text-[#061a37]",
          separator: "text-slate-300",
          focus: "focus-visible:ring-[#064a98]/40",
        };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? {
            item: new URL(item.href, SITE_URL).toString(),
          }
        : {}),
    })),
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={`min-w-0 w-full ${className}`}
    >
      <nav
        aria-label={isArabic ? "مسار التنقل" : "Breadcrumb"}
        className="min-w-0"
      >
        <ol
          className={`
            flex min-w-0 items-center
            gap-1.5 sm:gap-2
            overflow-hidden whitespace-nowrap
            ${compact ? "text-[11px] sm:text-xs" : "text-xs sm:text-[13px]"}
          `}
        >
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const isHome = index === 0;

            return (
              <li
                key={`${item.href ?? item.label}-${index}`}
                className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2"
              >
                {index > 0 && (
                  <ChevronRight
                    aria-hidden="true"
                    className={`
                      h-3 w-3 shrink-0
                      ${isArabic ? "rotate-180" : ""}
                      ${colors.separator}
                    `}
                  />
                )}

                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    title={item.label}
                    className={`
                      block min-w-0 max-w-[145px]
                      truncate font-semibold
                      sm:max-w-[260px]
                      ${colors.current}
                    `}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    title={item.label}
                    className={`
                      inline-flex min-w-0 shrink-0
                      items-center gap-1.5
                      rounded-sm font-medium
                      transition-colors duration-200
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-offset-2
                      ${colors.link}
                      ${colors.focus}
                    `}
                  >
                    {isHome && (
                      <House
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0"
                      />
                    )}

                    <span
                      className={
                        isHome
                          ? "hidden sm:inline"
                          : "max-w-[130px] truncate sm:max-w-[220px]"
                      }
                    >
                      {isHome ? item.label : item.label}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </div>
  );
}
