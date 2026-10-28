
"use client";

import { ShoppingCart } from "lucide-react";

type Props = {
  locale: "en" | "ar";
  price: number;
  currency: string;
  stock: number;
  onAddToCart: () => void;
  disabled?: boolean;
};

export function StickyMobilePurchaseBar({
  locale,
  price,
  currency,
  stock,
  onAddToCart,
  disabled = false,
}: Props) {
  const isArabic = locale === "ar";
  const unavailable = stock < 1 || disabled;

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ubh-border bg-white/95 p-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(6,26,55,0.08)] backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex max-w-2xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-ubh-muted">
            {isArabic ? "السعر" : "Price"}
          </p>
          <p className="truncate text-lg font-bold text-ubh-blue">
            {currency} {price.toFixed(2)}
          </p>
        </div>

        <button
          type="button"
          onClick={onAddToCart}
          disabled={unavailable}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-ubh-blue px-4 text-sm font-bold text-white transition hover:bg-ubh-blue-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart size={17} />
          {unavailable
            ? isArabic ? "غير متوفر" : "Unavailable"
            : isArabic ? "أضف إلى السلة" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
