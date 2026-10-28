
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "outline" | "dark";
  showArrow?: boolean;
};

export function Button({
  href,
  children,
  variant = "gold",
  showArrow = true,
}: ButtonProps) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-3 rounded-sm px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
        variant === "gold"
          ? "bg-ubh-gold text-white hover:bg-ubh-gold-deep"
          : variant === "dark"
            ? "bg-ubh-navy text-white hover:bg-[#0b2852]"
            : "border border-white/60 text-white hover:bg-white hover:text-ubh-ink"
      }`}
    >
      {children}
      {showArrow && <ArrowIcon size={16} />}
    </Link>
  );
}
