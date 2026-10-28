"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type CartNotificationProps = {
  locale: Locale;
  productTitle: string;
  visible: boolean;
  onClose: () => void;
};

export function CartNotification({
  locale,
  productTitle,
  visible,
  onClose,
}: CartNotificationProps) {
  const isArabic = locale === "ar";

  useEffect(() => {
    if (!visible) return;

    const timer = window.setTimeout(onClose, 3000);

    return () => window.clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      dir={isArabic ? "rtl" : "ltr"}
      className={`fixed bottom-5 z-[100] flex w-[calc(100%-2rem)] max-w-[380px] items-center gap-3 rounded-xl border border-white/10 bg-ubh-blue p-4 text-white shadow-[0_16px_50px_rgba(6,26,55,0.28)] animate-in fade-in slide-in-from-bottom-3 duration-300 ${
        isArabic ? "left-4 sm:left-6" : "right-4 sm:right-6"
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ubh-gold-light text-ubh-navy shadow-sm">
        <Check size={19} strokeWidth={2.5} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">
          {isArabic ? "تمت الإضافة إلى السلة" : "Added to cart"}
        </p>

        <p className="mt-1 truncate text-xs text-white/65">
          {productTitle}
        </p>
      </div>

      <Link
        href={`/${locale}/cart`}
        className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-2 text-xs font-bold text-[#e7bd72] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light"
      >
        {isArabic ? "عرض السلة" : "View cart"}
        {isArabic ? (
          <ArrowLeft size={14} />
        ) : (
          <ArrowRight size={14} />
        )}
      </Link>
    </div>
  );
}