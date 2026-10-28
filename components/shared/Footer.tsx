"use client";

import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { usePathname, useSearchParams } from "next/navigation";

export function Footer({ locale }: { locale: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isArabic = locale === "ar";

  const isPublisherProfile =
    pathname?.startsWith(`/${locale}/publishers/`) ?? false;

  const isStorePage =
    pathname?.startsWith(`/${locale}/shop`) ||
    pathname?.startsWith(`/${locale}/cart`) ||
    pathname?.startsWith(`/${locale}/checkout`) ||
    pathname?.startsWith(`/${locale}/wishlist`) ||
    pathname?.startsWith(`/${locale}/profile`) ||
    pathname?.startsWith(`/${locale}/login`) ||
    pathname?.startsWith(`/${locale}/signup`) ||
    pathname?.startsWith(`/${locale}/addresses`) ||
    pathname?.startsWith(`/${locale}/order-confirmation`) ||
    (isPublisherProfile && searchParams.get("source") === "store");

  const isLegalPage =
    pathname === `/${locale}/privacy-policy` ||
    pathname === `/${locale}/terms` ||
    pathname === `/${locale}/accessibility`;

  // Preserve the original section when navigating between legal pages.
  const requestedSource = searchParams.get("source");

  const source = isLegalPage
    ? requestedSource === "store"
      ? "store"
      : "website"
    : isStorePage
      ? "store"
      : "website";

  const storeLink = source === "store" ? `/${locale}` : `/${locale}/shop`;

  const storeLinkLabel =
    source === "store"
      ? isArabic
        ? "العودة إلى الرئيسية ←"
        : "View Home →"
      : isArabic
        ? "زيارة المتجر ←"
        : "Visit Store →";

  const links = {
    company: [
      {
        label: isArabic ? "من نحن" : "About Us",
        href: `/${locale}/about-us`,
      },
      {
        label: isArabic ? "الناشرون" : "Publishers",
        href: `/${locale}/publishers`,
      },
      {
        label: isArabic ? "المؤسسات" : "Institutions",
        href: `/${locale}/institutions`,
      },
      {
        label: isArabic ? "الأخبار" : "News",
        href: `/${locale}/news`,
      },
    ],

    solutions: [
      {
        label: isArabic ? "الحلول الرقمية" : "Digital Solutions",
        href: `/${locale}/digital-solutions`,
      },
      {
        label: isArabic ? "حلول الذكاء الاصطناعي" : "AI Solutions",
        href: `/${locale}/ai-solutions`,
      },
      {
        label: isArabic ? "البحث والرؤى" : "Research & Insights",
        href: `/${locale}/research`,
      },
      {
        label: isArabic ? "تواصل معنا" : "Contact Us",
        href: `/${locale}/contact-us`,
      },
    ],
  };

  return (
    <footer className="bg-ubh-navy-deep text-white" dir={isArabic ? "rtl" : "ltr"}>
      {/* ============================================================
          MAIN FOOTER
      ============================================================ */}

      <Container className="py-14 sm:py-16 lg:py-20">
        <div
          className="
            grid
            grid-cols-1
            gap-12
            sm:grid-cols-2
            lg:grid-cols-[1.5fr_1fr_1fr_1.25fr]
            lg:gap-0
          "
        >
          {/* ========================================================
              BRAND
          ======================================================== */}

          <div
            className="
              pe-0
              sm:col-span-2
              lg:col-span-1
              lg:pe-12
              xl:pe-20
            "
          >
            <div className="flex flex-col items-start">
              <div className="w-full max-w-[100px]">
                <Logo size="footer" />
              </div>

              <p
                className="
                  mt-6
                  max-w-sm
                  text-sm
                  leading-7
                  text-white/60
                "
              >
                {isArabic
                  ? "نعمل على تطوير المعرفة الأكاديمية ونشرها في العالم العربي منذ عام 1986."
                  : "Advancing academic knowledge across the Arab world since 1986."}
              </p>
            </div>
          </div>

          {/* ========================================================
              COMPANY
          ======================================================== */}

          <div
            className="
              lg:border-s
              lg:border-white/10
              lg:ps-10
              xl:ps-12
            "
          >
            <h3 className="text-sm font-semibold tracking-wide text-white">
              {isArabic ? "الشركة" : "Company"}
            </h3>

            <nav
              className="mt-5 flex flex-col gap-3.5"
              aria-label={isArabic ? "الشركة" : "Company"}
            >
              {links.company.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    w-fit
                    text-sm
                    text-white/55
                    transition-colors
                    duration-200
                    hover:text-ubh-gold-light
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ========================================================
              SOLUTIONS
          ======================================================== */}

          <div
            className="
              lg:border-s
              lg:border-white/10
              lg:ps-10
              xl:ps-12
            "
          >
            <h3 className="text-sm font-semibold tracking-wide text-white">
              {isArabic ? "الحلول" : "Solutions"}
            </h3>

            <nav
              className="mt-5 flex flex-col gap-3.5"
              aria-label={isArabic ? "الحلول" : "Solutions"}
            >
              {links.solutions.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    w-fit
                    text-sm
                    text-white/55
                    transition-colors
                    duration-200
                    hover:text-ubh-gold-light
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ========================================================
              STORE
          ======================================================== */}

          <div
            className="
              lg:border-s
              lg:border-white/10
              lg:ps-10
              xl:ps-12
            "
          >
            <h3 className="text-sm font-semibold tracking-wide text-white">
              {isArabic ? "متجر UBH" : "UBH Store"}
            </h3>

            <p
              className="
                mt-5
                max-w-xs
                text-sm
                leading-7
                text-white/55
              "
            >
              {isArabic
                ? "كتب أكاديمية وكتب إلكترونية وحلول للمؤسسات التعليمية في المنطقة."
                : "Academic books, eBooks and institutional solutions for the region."}
            </p>

            <div className="mt-5 flex flex-col items-start gap-4">
              <Link
                href={storeLink}
                className="inline-flex items-center gap-1 text-sm font-medium text-ubh-gold-light transition-colors hover:text-white"
              >
                {storeLinkLabel}
              </Link>

              <Link
                href={`/${locale}/publish-with-us`}
                className="inline-flex items-center justify-center gap-2 border border-ubh-gold-light bg-ubh-gold-light px-4 py-3 text-sm font-semibold text-ubh-navy-deep transition-colors hover:bg-transparent hover:text-ubh-gold-light"
              >
                {isArabic ? "انشر معنا" : "Publish With Us"}
                <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* ============================================================
          BOTTOM BAR
      ============================================================ */}

      <div className="border-t border-white/10">
        <Container
          className="
            flex
            flex-col
            gap-4
            py-5
            text-xs
            text-white/45
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Copyright */}

          <span className="leading-5">
            © {new Date().getFullYear()} University Book House.{" "}
            {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </span>

          {/* Legal */}

          <nav
            className="
              flex
              flex-wrap
              gap-x-5
              gap-y-2
            "
            aria-label={isArabic ? "روابط قانونية" : "Legal"}
          >
            <Link
              href={`/${locale}/privacy-policy?source=${source}`}
              className="transition-colors hover:text-white"
            >
              {isArabic ? "الخصوصية" : "Privacy"}
            </Link>

            <Link
              href={`/${locale}/terms?source=${source}`}
              className="transition-colors hover:text-white"
            >
              {isArabic ? "الشروط" : "Terms"}
            </Link>

            <Link
              href={`/${locale}/accessibility?source=${source}`}
              className="transition-colors hover:text-white"
            >
              {isArabic ? "إمكانية الوصول" : "Accessibility"}
            </Link>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
