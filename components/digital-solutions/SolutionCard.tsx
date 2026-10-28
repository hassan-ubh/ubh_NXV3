"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  Globe2,
  GraduationCap,
  Layers3,
  Lightbulb,
} from "lucide-react";

import type {
  DigitalSolution,
  Locale,
} from "@/lib/digital-solutions";

type SolutionCardProps = {
  solution: DigitalSolution;
  locale: Locale;
};

const icons = {
  "book-open": BookOpen,
  building: Building2,
  layers: Layers3,
  globe: Globe2,
  "graduation-cap": GraduationCap,
  lightbulb: Lightbulb,
};

export function SolutionCard({
  solution,
  locale,
}: SolutionCardProps) {
  const Icon = icons[solution.icon as keyof typeof icons];

  const isArabic = locale === "ar";

  return (
    <Link
      href={`/${locale}/digital-solutions/${solution.slug}`}
      dir={isArabic ? "rtl" : "ltr"}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-ubh-gold/40 hover:shadow-xl"
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ubh-navy text-white transition duration-300 group-hover:bg-ubh-blue-bright">
          <Icon className="h-6 w-6" />
        </div>

        <ArrowUpRight
          className={`h-5 w-5 text-slate-400 transition duration-300 group-hover:text-ubh-blue-bright ${
            isArabic ? "rotate-[-90deg]" : ""
          }`}
        />
      </div>

      <h3 className="font-serif text-2xl text-ubh-navy">
        {solution.title[locale]}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
        {solution.shortDescription[locale]}
      </p>

      <div className="mt-6 text-sm font-semibold text-ubh-blue-bright">
        {isArabic ? "اكتشف الحل" : "Explore Solution"}
      </div>
    </Link>
  );
}