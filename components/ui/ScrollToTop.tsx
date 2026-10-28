
"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

type ScrollToTopProps = {
  locale?: "en" | "ar";
};

export function ScrollToTop({ locale = "en" }: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);
  const isArabic = locale === "ar";

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      aria-label={isArabic ? "العودة إلى الأعلى" : "Go to top"}
      title={isArabic ? "العودة إلى الأعلى" : "Go to top"}
      className={[
        "fixed bottom-6 z-50",
        isArabic ? "left-6" : "right-6",
        "flex h-12 w-12 items-center justify-center",
        "rounded-full border border-ubh-gold-light/40",
        "bg-ubh-navy text-ubh-gold-light",
        "shadow-lg shadow-black/15",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:bg-[#0b2a50]",
        "hover:shadow-xl",
        "focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-ubh-gold-light",
        "focus-visible:ring-offset-2",
        "motion-reduce:transition-none",
      ].join(" ")}
    >
      <ArrowUp size={21} strokeWidth={2.2} />
    </button>
  );
}
