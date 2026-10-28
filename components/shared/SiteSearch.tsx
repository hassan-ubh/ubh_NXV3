
"use client";

import { useEffect, useRef } from "react";
import { X, Search } from "lucide-react";

type SiteSearchProps = {
  isOpen: boolean;
  onClose: () => void;
  locale: "en" | "ar";
  children: React.ReactNode;
};

export function SiteSearch({
  isOpen,
  onClose,
  locale,
  children,
}: SiteSearchProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isArabic = locale === "ar";

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const firstInput =
      panelRef.current?.querySelector<HTMLInputElement>("input");

    firstInput?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-slate-950/45"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={isArabic ? "البحث" : "Search"}
        dir={isArabic ? "rtl" : "ltr"}
        className="
          absolute inset-x-0 top-0
          border-b border-slate-200
          bg-white px-4 pb-6 pt-5 shadow-2xl
          sm:px-6 sm:pb-8 sm:pt-6
        "
      >
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search
                size={20}
                className="text-ubh-gold-deep"
                aria-hidden="true"
              />
              <h2 className="text-lg font-semibold text-ubh-navy">
                {isArabic ? "ابحث في UBH" : "Search UBH"}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label={isArabic ? "إغلاق البحث" : "Close search"}
              className="
                inline-flex size-10 items-center justify-center
                rounded-full text-slate-600
                transition hover:bg-slate-100 hover:text-ubh-navy
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ubh-gold-deep
              "
            >
              <X size={22} />
            </button>
          </div>

          {children}

          <p className="mt-4 text-xs text-slate-500">
            {isArabic
              ? "اضغط Escape أو زر الإغلاق لإنهاء البحث."
              : "Press Escape or use the close button to dismiss search."}
          </p>
        </div>
      </section>
    </div>
  );
}
