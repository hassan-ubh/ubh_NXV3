import Image from "next/image";
import {
  BookOpen,
  Truck,
  ShieldCheck,
  RotateCcw,
  GraduationCap,
} from "lucide-react";

import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/shared/Button";

type StoreHeroSectionProps = {
  locale: Locale;
  title: string;
  description: string;
  shopLabel: string;
  ebooksLabel: string;
};

export function StoreHeroSection({
  locale,
  title,
  description,
  shopLabel,
  ebooksLabel,
}: StoreHeroSectionProps) {
  const isArabic = locale === "ar";

  const benefits = [
    {
      icon: BookOpen,
      title: isArabic ? "تشكيلة واسعة" : "Vast Selection",
      description: isArabic
        ? "آلاف العناوين الأكاديمية"
        : "Thousands of academic titles",
    },
    {
      icon: Truck,
      title: isArabic ? "توصيل سريع" : "Fast Delivery",
      description: isArabic ? "عبر الخليج والعالم" : "Worldwide delivery",
    },
    {
      icon: ShieldCheck,
      title: isArabic ? "دفع آمن" : "Secure Payment",
      description: isArabic ? "دفع آمن وموثوق" : "Secure checkout",
    },
    {
      icon: RotateCcw,
      title: isArabic ? "إرجاع سهل" : "Easy Returns",
      description: isArabic
        ? "إجراءات إرجاع ميسرة"
        : "Easy returns",
    },
    {
      icon: GraduationCap,
      title: isArabic ? "حلول للمؤسسات" : "For Institutions",
      description: isArabic
        ? "أسعار خاصة وحلول مخصصة"
        : "Special pricing & Solutions",
    },
  ];

  return (
    <section
      dir="ltr"
      aria-label={isArabic ? "متجر الكتب الجامعية" : "UBH bookstore"}
      className="w-full"
    >
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_190px] lg:items-center lg:gap-4 xl:grid-cols-[minmax(0,1fr)_205px]">
        {/* Compact hero banner */}
        <div
          dir={isArabic ? "rtl" : "ltr"}
          className="group relative isolate order-1 flex min-h-[220px] min-w-0 flex-col justify-center overflow-hidden rounded-xl bg-ubh-navy p-5 sm:min-h-[240px] sm:p-6 lg:min-h-[250px] lg:p-7 xl:p-8"
        >
          <Image
            src="/images/store/storehero.jpg"
            alt={
              isArabic
                ? "كتب أكاديمية في متجر دار الكتب الجامعية"
                : "Academic books at UBH Store"
            }
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 80vw"
            className={`-z-20 object-cover transition-transform duration-700 group-hover:scale-[1.02] `}
          />

          {/* Refined navy overlay */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 -z-10 ${
              isArabic
                ? "bg-gradient-to-l from-[#031329]/95 via-ubh-navy/85 to-ubh-navy/45"
                : "bg-gradient-to-r from-[#031329]/95 via-ubh-navy/80 to-ubh-navy/30"
            }`}
          />

          {/* Subtle gold accent */}
          <div
            aria-hidden="true"
            className={`absolute top-0 h-[2px] w-20 bg-ubh-gold ${
              isArabic ? "right-0" : "left-0"
            }`}
          />

          <div className="relative z-10 max-w-xl">
            <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#e0b666] sm:text-[10px]">
              <span className="h-px w-5 bg-ubh-gold" />
              {isArabic
                ? "متجر دار الكتب الجامعية"
                : "University Book House"}
            </p>

            <h1 className="mt-2 whitespace-pre-line font-serif text-2xl font-semibold leading-[1.15] tracking-tight text-white sm:text-3xl lg:text-[34px]">
              {title}
            </h1>

            <p className="mt-2 max-w-lg text-xs leading-5 text-white/80 sm:text-sm sm:leading-6">
              {description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
              <Button
                href={`/${locale}/shop`}
                showArrow={false}
              >
                {shopLabel}
              </Button>

              <Button
                href={`/${locale}/shop/products?type=ebook`}
                variant="outline"
                showArrow={false}
              >
                {ebooksLabel}
              </Button>
            </div>
          </div>

          {/* Decorative detail */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -bottom-12 h-36 w-36 rounded-full border border-white/10 sm:h-44 sm:w-44 ${
              isArabic ? "-left-8" : "-right-8"
            }`}
          />
        </div>

        {/* Static benefits: no links or buttons */}
        <aside
          dir={isArabic ? "rtl" : "ltr"}
          aria-label={isArabic ? "مميزات المتجر" : "Store benefits"}
          className={`order-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-slate-200/80 ${
            isArabic ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex min-w-0 items-center gap-2.5 rounded-lg border border-slate-200/70 bg-white px-3 py-2.5 transition-colors duration-200 hover:border-ubh-gold/30 hover:bg-[#fcfaf6] sm:px-3.5 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-2 lg:py-[9px] lg:hover:bg-[#fcfaf6]"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ubh-gold/10 text-[#a87625]">
                <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-[11px] font-semibold leading-4 text-ubh-navy sm:text-xs">
                  {title}
                </h2>

                <p className="mt-0.5 text-[10px] leading-[15px] text-slate-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
