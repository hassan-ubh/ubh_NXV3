"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LogoProps = {
  store?: boolean;
  size?: "header" | "footer";
};

export function Logo({
  store = false,
  size = "header",
}: LogoProps) {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/ar") ? "ar" : "en";
  const isArabic = locale === "ar";
  const isFooter = size === "footer" && !store;

  const label = store
    ? isArabic
      ? "دار الكتب الجامعية - المتجر"
      : "University Book House Store"
    : isArabic
      ? "دار الكتب الجامعية"
      : "University Book House";

  // Responsive dimensions for the main website and store.
  const dimensions = isFooter
    ? {
        width: 360,
        height: 100,
        className:
          "max-w-[320px] sm:max-w-[360px]",
        sizes: "(max-width: 640px) 260px, 360px",
      }
    : store
      ? {
          width: 240,
          height: 80,
          className:
            "max-h-[68px] max-w-[220px] sm:max-h-[76px] sm:max-w-[250px]",
          sizes: "(max-width: 640px) 180px, 250px",
        }
      : {
          width: 280,
          height: 90,
          className:
            "max-h-[72px] max-w-[250px] sm:max-h-[82px] sm:max-w-[290px]",
          sizes:
            "(max-width: 380px) 190px, (max-width: 640px) 220px, 290px",
        };

  return (
    <Link
      href={store ? `/${locale}/shop` : `/${locale}`}
      aria-label={label}
      dir={isArabic ? "rtl" : "ltr"}
      className={[
  "group inline-flex min-w-0 shrink-0 items-center",
  "rounded-md transition-opacity duration-200",
  "hover:opacity-90",
  "focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-ubh-gold focus-visible:ring-offset-2",

  isFooter
    ? "w-full"
    : [
        "h-full max-w-full",
        // Push logo to the outer edge in both languages
        "me-auto",
      ].join(" "),
].join(" ")}
      
// className={[
//   "group inline-flex min-w-0 shrink-0 items-center",
//   "rounded-md transition-opacity duration-200",
//   "hover:opacity-90",
//   "focus-visible:outline-none focus-visible:ring-2",
//   "focus-visible:ring-ubh-gold focus-visible:ring-offset-2",
//   isFooter
//     ? "w-full"
//     : [
//         "h-full",
//         "max-w-full",
//         // Keep the logo close to the outer edge on mobile.
//         // Restore the existing auto-margin behavior on desktop.
//         "mx-0 sm:mx-0",
//         isArabic ? "sm:ms-auto" : "sm:me-auto",
//       ].join(" "),
// ].join(" ")}

    >
      <Image
        src="/images/logo/ubh-logo.svg"
        alt={label}
        width={dimensions.width}
        height={dimensions.height}
        priority={size === "header"}
        loading={size === "header" ? "eager" : "lazy"}
        fetchPriority={size === "header" ? "high" : "auto"}
        draggable={false}
        className={[
          "block h-auto w-auto shrink-0 object-contain",
          "object-center",
          dimensions.className,
          isFooter ? "w-full" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        sizes={dimensions.sizes}
      />
    </Link>
  );
}