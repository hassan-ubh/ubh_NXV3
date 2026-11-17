
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type ProductDescriptionProps = {
  title: string;
  description?: string | null;
  locale: "en" | "ar";
};

export function ProductDescription({
  title,
  description,
  locale,
}: ProductDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  const isArabic = locale === "ar";

  const text =
    description?.trim() ||
    (isArabic
      ? "لا يتوفر وصف لهذا الكتاب حالياً."
      : "A detailed description is not available yet.");

  const shouldCollapse = text.length > 350;

  const visibleText =
    !expanded && shouldCollapse
      ? `${text.slice(0, 350).trimEnd()}…`
      : text;

  return (
    <section
      id="product-description"
      dir={isArabic ? "rtl" : "ltr"}
      className="scroll-mt-24 rounded-2xl border border-ubh-border bg-white p-5 sm:p-7 lg:p-8"
    >
      {/* Section heading */}
      <div className="flex items-center gap-3">
        <span className="h-7 w-1 rounded-full bg-ubh-gold" />

        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ubh-gold">
          {isArabic ? "معلومات الكتاب" : "BOOK INFORMATION"}
        </p>
      </div>

      {/* Book title */}
      <h2 className="mt-4 font-serif text-xl font-semibold leading-snug text-ubh-blue sm:text-2xl">
        {title}
      </h2>

      <div className="my-5 h-px bg-ubh-border" />

      {/* Description */}
      <div
        className={`text-sm leading-7 text-ubh-blue-muted sm:text-[15px] sm:leading-8 ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        <p className="whitespace-pre-line">{visibleText}</p>
      </div>

      {/* Expand / collapse */}
      {shouldCollapse && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls="product-description-content"
          className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-semibold text-ubh-blue-bright transition-colors hover:text-ubh-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2"
        >
          <span>
            {expanded
              ? isArabic
                ? "عرض أقل"
                : "Show less"
              : isArabic
                ? "قراءة الوصف كاملاً"
                : "Read full description"}
          </span>

          {expanded ? (
            <ChevronUp size={16} aria-hidden="true" />
          ) : (
            <ChevronDown size={16} aria-hidden="true" />
          )}
        </button>
      )}
    </section>
  );
}
