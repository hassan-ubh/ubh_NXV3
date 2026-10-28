
import Link from "next/link";
import {
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export type StoreBenefit = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

type StoreBenefitsProps = {
  items: StoreBenefit[];
  locale: "en" | "ar";
};

export function StoreBenefits({
  items,
  locale,
}: StoreBenefitsProps) {
  const isArabic = locale === "ar";

  return (
    <section
      aria-label={isArabic ? "مميزات المتجر" : "Store benefits"}
      dir={isArabic ? "rtl" : "ltr"}
      className="my-6 grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white sm:grid-cols-2 lg:grid-cols-4"
    >
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <Link
            key={`${item.title}-${index}`}
            href={item.href}
            className={[
              "group relative flex min-h-[142px] items-start gap-4 p-5 transition-colors duration-200 sm:p-6",
              "hover:bg-slate-50/80",
              index > 0
                ? "border-t border-slate-100 sm:border-t-0"
                : "",
              index % 2 === 1
                ? "sm:border-l sm:border-slate-100"
                : "",
              index > 0
                ? "lg:border-l lg:border-slate-100"
                : "",
            ].join(" ")}
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ubh-gold/10 transition-colors duration-200 group-hover:bg-ubh-gold/15">
              <Icon
                size={21}
                strokeWidth={1.7}
                className="text-[#a7792d]"
                aria-hidden="true"
              />
            </span>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold leading-6 text-ubh-navy">
                {item.title}
              </h3>

              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                {item.description}
              </p>

              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8c6728]">
                {isArabic ? "اكتشف المزيد" : "Explore"}
                <ArrowRight
                  size={13}
                  strokeWidth={1.8}
                  className={`transition-transform duration-200 group-hover:translate-x-1 ${
                    isArabic
                      ? "rotate-180 group-hover:-translate-x-1"
                      : ""
                  }`}
                />
              </span>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
