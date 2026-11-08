// "use client";

// import Link from "next/link";
// import { Container } from "./Container";
// import { Logo } from "./Logo";
// import { usePathname, useSearchParams } from "next/navigation";

// import {
//   Facebook,
//   Instagram,
//   Linkedin,
//   Youtube,
//   CreditCard,
//   ShieldCheck,
// } from "lucide-react";
// import { FaXTwitter } from "react-icons/fa6";

// export function Footer({ locale }: { locale: string }) {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const isArabic = locale === "ar";

//   const isPublisherProfile =
//     pathname?.startsWith(`/${locale}/publishers/`) ?? false;

//   const isStorePage =
//     pathname?.startsWith(`/${locale}/shop`) ||
//     pathname?.startsWith(`/${locale}/cart`) ||
//     pathname?.startsWith(`/${locale}/checkout`) ||
//     pathname?.startsWith(`/${locale}/wishlist`) ||
//     pathname?.startsWith(`/${locale}/profile`) ||
//     pathname?.startsWith(`/${locale}/login`) ||
//     pathname?.startsWith(`/${locale}/signup`) ||
//     pathname?.startsWith(`/${locale}/addresses`) ||
//     pathname?.startsWith(`/${locale}/order-confirmation`) ||
//     (isPublisherProfile && searchParams.get("source") === "store");

//   const isLegalPage =
//     pathname === `/${locale}/privacy-policy` ||
//     pathname === `/${locale}/terms` ||
//     pathname === `/${locale}/accessibility`;

//   // Preserve the original section when navigating between legal pages.
//   const requestedSource = searchParams.get("source");

//   const source = isLegalPage
//     ? requestedSource === "store"
//       ? "store"
//       : "website"
//     : isStorePage
//       ? "store"
//       : "website";

//   const storeLink = source === "store" ? `/${locale}` : `/${locale}/shop`;

//   const storeLinkLabel =
//     source === "store"
//       ? isArabic
//         ? "العودة إلى الرئيسية ←"
//         : "View Home →"
//       : isArabic
//         ? "زيارة المتجر ←"
//         : "Visit Store →";

//   const links = {
//     company: [
//       {
//         label: isArabic ? "من نحن" : "About Us",
//         href: `/${locale}/about-us`,
//       },
//       {
//         label: isArabic ? "الناشرون" : "Publishers",
//         href: `/${locale}/publishers`,
//       },
//       {
//         label: isArabic ? "المؤسسات" : "Institutions",
//         href: `/${locale}/institutions`,
//       },
//       {
//         label: isArabic ? "الأخبار" : "News",
//         href: `/${locale}/news`,
//       },
//     ],

//     solutions: [
//       {
//         label: isArabic ? "الحلول الرقمية" : "Digital Solutions",
//         href: `/${locale}/digital-solutions`,
//       },
//       {
//         label: isArabic ? "حلول الذكاء الاصطناعي" : "AI Solutions",
//         href: `/${locale}/ai-solutions`,
//       },
//       {
//         label: isArabic ? "البحث والرؤى" : "Research & Insights",
//         href: `/${locale}/research`,
//       },
//       {
//         label: isArabic ? "تواصل معنا" : "Contact Us",
//         href: `/${locale}/contact-us`,
//       },
//     ],
//   };

//   return (
//     <footer
//       className="bg-ubh-navy-deep text-white"
//       dir={isArabic ? "rtl" : "ltr"}
//     >
//       {/* ============================================================
//           MAIN FOOTER
//       ============================================================ */}

//       <Container className="py-14 sm:py-16 lg:py-20">
//         <div
//           className="
//             grid
//             grid-cols-1
//             gap-12
//             sm:grid-cols-2
//             lg:grid-cols-[1.5fr_1fr_1fr_1.25fr]
//             lg:gap-0
//           "
//         >
//           {/* ========================================================
//               BRAND
//           ======================================================== */}

//           <div
//             className="
//               pe-0
//               sm:col-span-2
//               lg:col-span-1
//               lg:pe-12
//               xl:pe-20
//             "
//           >
//             <div className="flex flex-col items-start">
//               <div className="w-full max-w-[100px]">
//                 <Logo size="footer" />
//               </div>

//               <p
//                 className="
//                   mt-6
//                   max-w-sm
//                   text-sm
//                   leading-7
//                   text-white/60
//                 "
//               >
//                 {isArabic
//                   ? "نعمل على تطوير المعرفة الأكاديمية ونشرها في العالم العربي منذ عام 1986."
//                   : "Advancing academic knowledge across the Arab world since 1986."}
//               </p>
//             </div>
//           </div>

//           {/* ========================================================
//               COMPANY
//           ======================================================== */}

//           <div
//             className="
//               lg:border-s
//               lg:border-white/10
//               lg:ps-10
//               xl:ps-12
//             "
//           >
//             <h3 className="text-sm font-semibold tracking-wide text-white">
//               {isArabic ? "الشركة" : "Company"}
//             </h3>

//             <nav
//               className="mt-5 flex flex-col gap-3.5"
//               aria-label={isArabic ? "الشركة" : "Company"}
//             >
//               {links.company.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="
//                     w-fit
//                     text-sm
//                     text-white/55
//                     transition-colors
//                     duration-200
//                     hover:text-ubh-gold-light
//                   "
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </nav>
//           </div>

//           {/* ========================================================
//               SOLUTIONS
//           ======================================================== */}

//           <div
//             className="
//               lg:border-s
//               lg:border-white/10
//               lg:ps-10
//               xl:ps-12
//             "
//           >
//             <h3 className="text-sm font-semibold tracking-wide text-white">
//               {isArabic ? "الحلول" : "Solutions"}
//             </h3>

//             <nav
//               className="mt-5 flex flex-col gap-3.5"
//               aria-label={isArabic ? "الحلول" : "Solutions"}
//             >
//               {links.solutions.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="
//                     w-fit
//                     text-sm
//                     text-white/55
//                     transition-colors
//                     duration-200
//                     hover:text-ubh-gold-light
//                   "
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </nav>
//           </div>

//           {/* ========================================================
//               STORE
//           ======================================================== */}

//           <div
//             className="
//               lg:border-s
//               lg:border-white/10
//               lg:ps-10
//               xl:ps-12
//             "
//           >
//             <h3 className="text-sm font-semibold tracking-wide text-white">
//               {isArabic ? "متجر UBH" : "UBH Store"}
//             </h3>

//             <p
//               className="
//                 mt-5
//                 max-w-xs
//                 text-sm
//                 leading-7
//                 text-white/55
//               "
//             >
//               {isArabic
//                 ? "كتب أكاديمية وكتب إلكترونية وحلول للمؤسسات التعليمية في المنطقة."
//                 : "Academic books, eBooks and institutional solutions for the region."}
//             </p>

//             <div className="mt-5 flex flex-col items-start gap-4">
//               <Link
//                 href={storeLink}
//                 className="inline-flex items-center gap-1 text-sm font-medium text-ubh-gold-light transition-colors hover:text-white"
//               >
//                 {storeLinkLabel}
//               </Link>

//               <Link
//                 href={`/${locale}/publish-with-us`}
//                 className="inline-flex items-center justify-center gap-2 border border-ubh-gold-light bg-ubh-gold-light px-4 py-3 text-sm font-semibold text-ubh-navy-deep transition-colors hover:bg-transparent hover:text-ubh-gold-light"
//               >
//                 {isArabic ? "انشر معنا" : "Publish With Us"}
//                 <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </Container>

//       {/* SOCIAL MEDIA & PAYMENT METHODS */}
//       <div className="border-t border-white/[0.08]">
//         <Container className="py-8 sm:py-10">
//           <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
//             {/* Social Media */}
//             <div className="space-y-4">
//               <h3 className="text-sm font-semibold text-white">
//                 {isArabic ? "تابعونا" : "Follow Us"}
//               </h3>

//               <div className="flex items-center gap-3">
//   {[
//     {
//       name: "Facebook",
//       icon: Facebook,
//       href: "https://www.facebook.com/people/Universitybookhouse/100055666305409/?epa=SEARCH_BOX#",
//     },
//     {
//       name: "Instagram",
//       icon: Instagram,
//       href: "https://www.instagram.com/universitybookhouse",
//     },
//     {
//       name: "LinkedIn",
//       icon: Linkedin,
//       href: "YOUR_LINKEDIN_URL",
//     },
//     {
//       name: "X",
//       icon: FaXTwitter,
//       href: "https://x.com/ubh_uae",
//     },
//   ].map(({ name, icon: Icon, href }) => (
//     <a
//       key={name}
//       href={href}
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label={name}
//       className="
//         flex size-10 items-center justify-center
//         rounded-xl border border-white/10
//         bg-white/[0.04] text-white/65
//         transition-all duration-300
//         hover:-translate-y-1
//         hover:border-ubh-gold/50
//         hover:bg-ubh-gold/10
//         hover:text-ubh-gold-light
//       "
//     >
//       <Icon size={18} />
//     </a>
//   ))}
// </div>
//             </div>

//             {/* Payment Methods */}
//             <div className="space-y-4">
//               <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
//                 <ShieldCheck size={16} className="text-ubh-gold-light" />
//                 {isArabic ? "طرق الدفع الآمنة" : "Secure Payment Methods"}
//               </h3>

//               <div className="flex flex-wrap items-center gap-2">
//                 {["VISA", "Mastercard", "Apple Pay", "Google Pay"].map(
//                   (method) => (
//                     <div
//                       key={method}
//                       className="
//                   flex h-10 min-w-[76px] items-center justify-center
//                   rounded-lg border border-white/10
//                   bg-white/[0.06] px-3
//                   text-xs font-bold tracking-wide text-white/75
//                   transition-all duration-200
//                   hover:border-ubh-gold/40 hover:bg-white/[0.09]
//                 "
//                     >
//                       {method}
//                     </div>
//                   ),
//                 )}
//               </div>

//               <p className="text-xs text-white/40">
//                 {isArabic
//                   ? "مدفوعات آمنة ومشفرة"
//                   : "Secure and encrypted transactions"}
//               </p>
//             </div>
//           </div>
//         </Container>
//       </div>

//       {/* ============================================================
//           BOTTOM BAR
//       ============================================================ */}

//       <div className="border-t border-white/10">
//         <Container
//           className="
//             flex
//             flex-col
//             gap-4
//             py-5
//             text-xs
//             text-white/45
//             sm:flex-row
//             sm:items-center
//             sm:justify-between
//           "
//         >
//           {/* Copyright */}

//           <span className="leading-5">
//             © {new Date().getFullYear()} University Book House.{" "}
//             {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
//           </span>

//           {/* Legal */}

//           <nav
//             className="
//               flex
//               flex-wrap
//               gap-x-5
//               gap-y-2
//             "
//             aria-label={isArabic ? "روابط قانونية" : "Legal"}
//           >
//             <Link
//               href={`/${locale}/privacy-policy?source=${source}`}
//               className="transition-colors hover:text-white"
//             >
//               {isArabic ? "الخصوصية" : "Privacy"}
//             </Link>

//             <Link
//               href={`/${locale}/terms?source=${source}`}
//               className="transition-colors hover:text-white"
//             >
//               {isArabic ? "الشروط" : "Terms"}
//             </Link>

//             <Link
//               href={`/${locale}/accessibility?source=${source}`}
//               className="transition-colors hover:text-white"
//             >
//               {isArabic ? "إمكانية الوصول" : "Accessibility"}
//             </Link>
//           </nav>
//         </Container>
//       </div>
//     </footer>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  ChevronDown,
  ShieldCheck,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

import { Container } from "./Container";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Locale = "en" | "ar";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }:FooterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isArabic = locale === "ar";

  const [openSection, setOpenSection] = useState<string | null>(null);

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
        ? "العودة إلى الرئيسية"
        : "Back to Home"
      : isArabic
        ? "زيارة المتجر"
        : "Explore Our Store";

  const companyLinks = [
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
  ];

  const solutionLinks = [
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
  ];

  const footerSections = [
    {
      id: "company",
      title: isArabic ? "الشركة" : "Company",
      links: companyLinks,
    },
    {
      id: "solutions",
      title: isArabic ? "الحلول" : "Solutions",
      links: solutionLinks,
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/people/Universitybookhouse/100055666305409/?epa=SEARCH_BOX#",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/universitybookhouse",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "YOUR_LINKEDIN_URL",
    },
    {
      name: "X",
      icon: FaXTwitter,
      href: "https://x.com/ubh_uae",
    },
  ];

  const paymentMethods = ["VISA", "Mastercard", "Apple Pay", "Google Pay"];

  const toggleSection = (id: string) => {
    setOpenSection((current) => (current === id ? null : id));
  };

  return (
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="overflow-hidden bg-[#061a37] text-white"
    >
      {/* Main footer */}
      <div className="relative">
        {/* Subtle background decoration */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full border border-white/[0.035]" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/[0.035]" />

        <Container className="relative py-12 sm:py-16 lg:py-[76px]">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.15fr] lg:gap-8 xl:gap-14">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="w-[125px] sm:w-[140px]">
  <Logo size="footer" />
</div>

              <p className="mt-6 max-w-[330px] text-[13px] leading-7 text-white/55 sm:text-sm">
                {isArabic
                  ? "نعمل على تطوير المعرفة الأكاديمية ونشرها في العالم العربي منذ عام 1986."
                  : "Advancing academic knowledge across the Arab world since 1986."}
              </p>

              <div className="mt-6 flex items-center gap-2">
                <span className="h-px w-8 bg-[#c89438]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#dcae57]">
                  {isArabic ? "المعرفة بلا حدود" : "Knowledge Without Limits"}
                </span>
              </div>
            </div>

            {/* Company and Solutions */}
            {footerSections.map((section) => (
              <div
                key={section.id}
                className="border-t border-white/10 pt-5 sm:border-0 sm:pt-0"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={openSection === section.id}
                  className="flex w-full items-center justify-between text-start lg:pointer-events-none"
                >
                  <h3 className="text-[13px] font-bold tracking-wide text-white sm:text-sm">
                    {section.title}
                  </h3>

                  <ChevronDown
                    size={16}
                    className={`text-white/50 transition-transform duration-300 lg:hidden ${
                      openSection === section.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <nav
                  aria-label={section.title}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 lg:mt-6 lg:grid-rows-[1fr] lg:opacity-100 ${
                    openSection === section.id
                      ? "mt-5 grid-rows-[1fr] opacity-100"
                      : "mt-0 grid-rows-[0fr] opacity-0 lg:mt-6"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-4 pb-1">
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="group flex w-fit items-center gap-1 text-[13px] text-white/55 transition-colors duration-200 hover:text-[#dcae57]"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight
                            size={12}
                            className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 rtl:rotate-[-90deg]"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            ))}

            {/* Store */}
            <div className="border-t border-white/10 pt-6 sm:col-span-2 lg:col-span-1 lg:border-0 lg:pt-0">
              <h3 className="text-[13px] font-bold tracking-wide text-white sm:text-sm">
                {isArabic ? "متجر UBH" : "UBH Store"}
              </h3>

              <p className="mt-5 max-w-[300px] text-[13px] leading-7 text-white/55">
                {isArabic
                  ? "كتب أكاديمية وكتب إلكترونية وحلول للمؤسسات التعليمية في المنطقة."
                  : "Academic books, eBooks and institutional solutions for the region."}
              </p>

              <Link
                href={storeLink}
                className="group mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#dcae57] transition-colors hover:text-white"
              >
                {storeLinkLabel}

                <span className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  {isArabic ? "←" : "→"}
                </span>
              </Link>

              <div className="mt-6">
                <Link
                  href={`/${locale}/publish-with-us`}
                  className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg border border-[#dcae57] bg-[#dcae57] px-5 py-3 text-[12px] font-bold text-[#061a37] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#edc77e] hover:bg-[#edc77e] hover:shadow-[0_8px_25px_rgba(200,148,56,0.16)]"
                >
                  {isArabic ? "انشر معنا" : "Publish With Us"}

                  <span className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    {isArabic ? "←" : "→"}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Social and payments */}
      <div className="border-t border-white/[0.08] bg-[#04152d]/50">
        <Container className="py-8 sm:py-10">
          <div className="grid grid-cols-1 gap-9 md:grid-cols-2 md:items-center md:gap-8">
            {/* Social */}
            <div>
              <h3 className="text-[13px] font-bold text-white">
                {isArabic ? "تابعونا" : "Follow Us"}
              </h3>

              <p className="mt-1 text-xs text-white/40">
                {isArabic
                  ? "ابقوا على اطلاع بآخر أخبارنا"
                  : "Stay connected with our latest updates"}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                {socialLinks.map(({ name, icon: Icon, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="group flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-[#c89438]/50 hover:bg-[#c89438]/10 hover:text-[#dcae57]"
                  >
                    <Icon
                      size={17}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Payments */}
            <div className="md:justify-self-end">
              <h3 className="flex items-center gap-2 text-[13px] font-bold text-white">
                <ShieldCheck size={16} className="text-[#dcae57]" />
                {isArabic ? "طرق الدفع الآمنة" : "Secure Payment Methods"}
              </h3>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="flex h-10 min-w-[76px] items-center justify-center rounded-lg border border-white/10 bg-white/[0.055] px-3 text-[10px] font-bold tracking-wide text-white/70 transition-colors duration-200 hover:border-[#c89438]/40 hover:bg-white/10"
                  >
                    {method}
                  </div>
                ))}
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-[11px] text-white/35">
                <CreditCard size={13} />
                {isArabic
                  ? "مدفوعات آمنة ومشفرة"
                  : "Secure and encrypted transactions"}
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      {/* <div className="border-t border-white/[0.08]">
        <Container className="flex flex-col gap-4 py-5 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="leading-5">
            © {new Date().getFullYear()} University Book House.{" "}
            {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          

          <nav
            aria-label={isArabic ? "روابط قانونية" : "Legal"}
            className="flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <Link
              href={`/${locale}/privacy-policy?source=${source}`}
              className="transition-colors hover:text-[#dcae57]"
            >
              {isArabic ? "الخصوصية" : "Privacy"}
            </Link>

            <Link
              href={`/${locale}/terms?source=${source}`}
              className="transition-colors hover:text-[#dcae57]"
            >
              {isArabic ? "الشروط" : "Terms"}
            </Link>

            <Link
              href={`/${locale}/accessibility?source=${source}`}
              className="transition-colors hover:text-[#dcae57]"
            >
              {isArabic ? "إمكانية الوصول" : "Accessibility"}
            </Link>
          </nav>
        </Container>
      </div> */}
      {/* Bottom bar */}
<div className="border-t border-white/[0.08]">
  <Container className="flex flex-col gap-5 py-5 text-[11px] text-white/40 lg:flex-row lg:items-center lg:justify-between">

    {/* Copyright */}
   <p className="text-center leading-5 lg:text-start">
  © {new Date().getFullYear()}{" "}
  {isArabic
    ? "دار الكتب الجامعية. جميع الحقوق محفوظة."
    : "University Book House. All rights reserved."}
</p>

    {/* Legal links and language */}
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-end">

      <nav
        aria-label={isArabic ? "روابط قانونية" : "Legal"}
        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
      >
        <Link
          href={`/${locale}/privacy-policy?source=${source}`}
          className="transition-colors hover:text-[#dcae57]"
        >
          {isArabic ? "الخصوصية" : "Privacy"}
        </Link>

        <Link
          href={`/${locale}/terms?source=${source}`}
          className="transition-colors hover:text-[#dcae57]"
        >
          {isArabic ? "الشروط" : "Terms"}
        </Link>

        <Link
          href={`/${locale}/accessibility?source=${source}`}
          className="transition-colors hover:text-[#dcae57]"
        >
          {isArabic ? "إمكانية الوصول" : "Accessibility"}
        </Link>
      </nav>

      {/* Language switcher */}
      <div className="flex items-center gap-3 border-t border-white/10 pt-4 sm:border-s sm:border-t-0 sm:pt-0 sm:ps-5">
        <span className="text-[11px] text-white/40">
          {isArabic ? "اللغة" : "Language"}
        </span>

        <LanguageSwitcher locale={locale} />
      </div>

    </div>
  </Container>
</div>
    </footer>
  );
}
