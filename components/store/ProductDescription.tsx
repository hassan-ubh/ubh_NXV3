
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
  const text = description?.trim() || (
    isArabic
      ? "لا يتوفر وصف لهذا الكتاب حالياً."
      : "A detailed description is not available yet."
  );

  const shouldCollapse = text.length > 350;
  const visibleText =
    !expanded && shouldCollapse
      ? `${text.slice(0, 350).trimEnd()}…`
      : text;

  return (
    <section
      id="product-description"
      className="scroll-mt-24 rounded-2xl border border-ubh-border bg-white p-5 sm:p-8"
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ubh-gold">
        {isArabic ? "معلومات الكتاب" : "BOOK INFORMATION"}
      </p>

      <h2 className="mt-2 font-serif text-2xl text-ubh-blue">
        {title}
      </h2>

      <p className="mt-5 whitespace-pre-line text-sm leading-8 text-ubh-blue-muted">
        {visibleText}
      </p>

      {shouldCollapse && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-4 inline-flex items-center gap-2 rounded-md font-semibold text-ubh-blue-bright transition hover:text-ubh-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold"
        >
          {expanded
            ? isArabic ? "عرض أقل" : "Show less"
            : isArabic ? "قراءة الوصف كاملاً" : "Read full description"}

          {expanded ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
      )}
    </section>
  );
}
