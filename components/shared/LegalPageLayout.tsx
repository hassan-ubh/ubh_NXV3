import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import type { Locale } from "@/lib/i18n";
import { PremiumHeroBackground } from "../ui/BackgroundGraphics";

type LegalPageLayoutProps = {
  locale: Locale;
  source: "website" | "store";
  title: string;
  description: string;
  updatedLabel?: string;
  updatedDate?: string;
  children: ReactNode;
};

export function LegalPageLayout({
  locale,
  source,
  title,
  description,
  updatedLabel,
  updatedDate,
  children,
}: LegalPageLayoutProps) {
  const isArabic = locale === "ar";
  const isStore = source === "store";

  const backHref = isStore
    ? `/${locale}/shop`
    : `/${locale}`;

  const backLabel = isStore
    ? isArabic
      ? "العودة إلى المتجر"
      : "Back to Shop"
    : isArabic
      ? "العودة إلى الرئيسية"
      : "Back to Home";

  const BackIcon = isArabic ? ArrowRight : ArrowLeft;

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      lang={locale}
      className={`min-h-screen bg-[#f7f8fb] text-ubh-navy ${
  isStore ? "" : "pt-13 sm:pt-17 lg:pt-19"
}`}
    >
   
      
{/* Hero */}
<PremiumHeroBackground
  variant={isStore ? "light" : "dark"}
  className="min-h-[280px] md:min-h-[340px]"
  contentClassName="mx-auto flex max-w-7xl items-center px-5 py-12 md:px-8 md:py-16"
>
  <Container>
    <div className="relative py-9 sm:py-11 lg:py-14">
      <div className="flex max-w-3xl items-start gap-4">

        {/* Legal Icon */}
        <div className={`
          hidden h-14 w-14 shrink-0 items-center justify-center
          rounded-2xl border sm:flex
          ${isStore
            ? "border-[#C89438]/25 bg-[#C89438]/[0.07]"
            : "border-ubh-gold-light/30 bg-white/[0.05]"
          }
        `}>
          <ShieldCheck
            size={27}
            className={isStore ? "text-[#B8822C]" : "text-ubh-gold-light"}
            strokeWidth={1.7}
          />
        </div>

        <div className="min-w-0">

          {/* Brand Label */}
          <p className={`
            mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]
            ${isStore ? "text-[#A97826]" : "text-ubh-gold-light"}
          `}>
            {isArabic
              ? "دار الكتب الجامعية"
              : "University Book House"}
          </p>

          {/* Page Title */}
          <h1 className={`
            font-serif text-3xl font-semibold leading-tight tracking-tight
            sm:text-4xl lg:text-5xl
            ${isStore ? "text-[#10243D]" : "text-white"}
          `}>
            {title}
          </h1>

          {/* Description */}
          <p className={`
            mt-4 max-w-2xl text-sm leading-7
            sm:text-base sm:leading-8
            ${isStore ? "text-[#52657B]" : "text-white/70"}
          `}>
            {description}
          </p>

          {/* Last Updated */}
          {updatedLabel && updatedDate && (
            <p className={`
              mt-5 text-xs font-medium sm:text-sm
              ${isStore ? "text-[#718096]" : "text-white/55"}
            `}>
              {updatedLabel}: {updatedDate}
            </p>
          )}

        </div>
      </div>
    </div>
  </Container>
</PremiumHeroBackground>


      {/* Content */}
     
<Container>
  <div className="mx-auto max-w-4xl py-8 sm:py-10 lg:py-12">

    {/* <Link
      href={backHref}
      className="
        mb-6 inline-flex min-h-10 items-center gap-2
        text-sm font-medium text-ubh-blue
        transition-colors hover:text-[#a97826]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-ubh-gold
      "
    >
      <BackIcon size={17} aria-hidden="true" />
      {backLabel}
    </Link> */}

    <article className="
      rounded-xl border border-slate-200
      bg-white p-5
      sm:p-8 lg:p-10
    ">
      <div className="legal-content">
        {children}
      </div>
    </article>

    <div className="mt-6 flex justify-end">
      <Link
        href={backHref}
        className="
          inline-flex min-h-11 items-center gap-2
          rounded-lg bg-ubh-navy
          px-5 py-2.5
          text-sm font-semibold text-white
          transition-colors hover:bg-[#0b2c58]
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-ubh-gold
          focus-visible:ring-offset-2
        "
      >
        {backLabel}
        {isArabic ? (
          <ArrowLeft size={16} aria-hidden="true" />
        ) : (
          <ArrowRight size={16} aria-hidden="true" />
        )}
      </Link>
    </div>

  </div>

  <style>{`
    .legal-content {
      color: #475569;
      font-size: 0.95rem;
      line-height: 1.85;
      overflow-wrap: anywhere;
    }

    .legal-content h2 {
      margin: 2rem 0 0.75rem;
      color: #061a37;
      font-size: 1.2rem;
      font-weight: 700;
      line-height: 1.5;
    }

    .legal-content h2:first-child {
      margin-top: 0;
    }

    .legal-content h3 {
      margin: 1.5rem 0 0.5rem;
      color: #102d4d;
      font-size: 1.05rem;
      font-weight: 650;
    }

    .legal-content p {
      margin: 0.8rem 0;
    }

    .legal-content ul,
    .legal-content ol {
      margin: 0.8rem 0;
      padding-inline-start: 1.5rem;
    }

    .legal-content ul {
      list-style: disc;
    }

    .legal-content ol {
      list-style: decimal;
    }

    .legal-content li {
      margin: 0.4rem 0;
      padding-inline-start: 0.2rem;
    }

    .legal-content li::marker {
      color: #c89438;
    }

    .legal-content a {
      color: #0755a0;
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .legal-content a:hover {
      color: #a97826;
    }

    .legal-content strong {
      color: #061a37;
      font-weight: 650;
    }

    .legal-content :focus-visible {
      outline: 2px solid #c89438;
      outline-offset: 3px;
    }

    @media (max-width: 640px) {
      .legal-content {
        font-size: 0.9rem;
      }

      .legal-content h2 {
        font-size: 1.1rem;
      }
    }
  `}</style>
</Container>
</main>

  );
}
