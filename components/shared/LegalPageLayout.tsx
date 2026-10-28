import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import type { Locale } from "@/lib/i18n";

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
      className="min-h-screen bg-[#f7f8fb] text-ubh-navy "
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-ubh-navy">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ubh-gold/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
        />

        <Container>
          <div className="relative py-12 sm:py-16 lg:py-20">
            <div className="mb-6 flex items-center gap-2 text-sm text-white/60">
              <Link
                href={backHref}
                className="transition-colors hover:text-ubh-gold-light"
              >
                {isStore
                  ? isArabic
                    ? "المتجر"
                    : "Store"
                  : isArabic
                    ? "الرئيسية"
                    : "Home"}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-ubh-gold-light">
                {isArabic ? "المعلومات القانونية" : "Legal"}
              </span>
            </div>

            <div className="flex max-w-3xl items-start gap-4">
              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-ubh-gold-light/30 bg-white/5 sm:flex">
                <ShieldCheck
                  size={27}
                  className="text-ubh-gold-light"
                  strokeWidth={1.7}
                />
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ubh-gold-light">
                  {isArabic
                    ? "دار الكتب الجامعية"
                    : "University Book House"}
                </p>

                <h1 className="font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {title}
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                  {description}
                </p>

                {updatedLabel && updatedDate && (
                  <p className="mt-5 text-xs text-white/55 sm:text-sm">
                    {updatedLabel}: {updatedDate}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <Container>
        <div className="mx-auto max-w-4xl py-8 sm:py-12">
          <Link
            href={backHref}
            className="mb-6 inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-semibold text-ubh-blue transition-colors hover:text-[#a97826] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold"
          >
            <BackIcon size={17} aria-hidden="true" />
            {backLabel}
          </Link>

          <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            <div className="legal-content">{children}</div>
          </article>

          <div className="mt-6 flex justify-end">
            <Link
              href={backHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-ubh-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0b2c58] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2"
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
      </Container>

      <style>{`
        .legal-content {
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.9;
          overflow-wrap: anywhere;
        }
        .legal-content h2 {
          margin: 2rem 0 0.75rem;
          color: #061a37;
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.5;
        }
        .legal-content h2:first-child {
          margin-top: 0;
        }
        .legal-content h3 {
          margin: 1.5rem 0 0.5rem;
          color: #061a37;
          font-size: 1.05rem;
          font-weight: 650;
        }
        .legal-content p {
          margin: 0.75rem 0;
        }
        .legal-content ul,
        .legal-content ol {
          margin: 0.75rem 0;
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
      `}</style>
    </main>
  );
}
