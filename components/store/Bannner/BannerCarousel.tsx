
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export type CarouselItem = {
  id: string;
  variant: string;
  eyebrow: string;
  title: string;
  titleAr?: string;
  subtitle?: string; // changed from required to optional
  subtitleAr?: string;
  description: string;
  descriptionAr?: string;
  buttonText: string;
  buttonTextAr?: string;
  buttonLink: string;
  imageUrl: string;
  extraImages?: string[];
  price?: number;
  oldPrice?: number;
  currency?: string;
  badge?: string;
};

type BannerCarouselProps = {
  items: CarouselItem[];
};

export default function BannerCarousel({
  items,
}: BannerCarouselProps) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar") ?? false;

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = items[currentIndex];

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (!items.length || !currentItem) return null;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const previous = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + items.length) % items.length
    );
  };

  const title = isArabic
    ? currentItem.titleAr || currentItem.title
    : currentItem.title;

  const subtitle = isArabic
    ? currentItem.subtitleAr || currentItem.subtitle
    : currentItem.subtitle;

  const description = isArabic
    ? currentItem.descriptionAr || currentItem.description
    : currentItem.description;

  const buttonText = isArabic
    ? currentItem.buttonTextAr || currentItem.buttonText
    : currentItem.buttonText;

  const currency = currentItem.currency || "AED";

  const isPublisher = currentItem.variant === "publisher";
  const isEditorial = ["editorial", "world-history"].includes(
    currentItem.variant
  );
  const isArabicCollection = [
    "arabic",
    "arabic-books",
  ].includes(currentItem.variant);
  const isAcademic = [
    "academic",
    "sociology",
  ].includes(currentItem.variant);

  const isDark = isPublisher || currentItem.variant === "corporate";

  const extraImages = currentItem.extraImages?.filter(Boolean) || [];

  const renderBookImages = () => {
    if (extraImages.length > 0) {
      return (
        <div className="flex h-full w-full items-center justify-center gap-2 sm:gap-4">
          {extraImages.slice(0, 3).map((src, index) => (
            <div
              key={`${src}-${index}`}
              className={`relative h-[190px] w-[115px] shrink-0 overflow-hidden rounded-lg shadow-2xl transition-transform duration-500 sm:h-[260px] sm:w-[155px] ${
                index === 1
                  ? "z-10 -translate-y-5 rotate-0 sm:-translate-y-7"
                  : index === 0
                    ? "-rotate-6 translate-y-3"
                    : "rotate-6 translate-y-3"
              }`}
            >
              <Image
                src={src}
                alt="UBH book cover"
                fill
                unoptimized
                sizes="(max-width: 640px) 115px, 155px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="relative h-[250px] w-[180px] overflow-hidden rounded-lg shadow-2xl sm:h-[330px] sm:w-[235px]">
        <Image
          src={currentItem.imageUrl}
          alt={title}
          fill
          priority
          unoptimized
          sizes="(max-width: 640px) 180px, 235px"
          className="object-contain"
        />
      </div>
    );
  };

  const renderSingleImage = () => (
    <div className="relative h-[250px] w-[180px] overflow-hidden rounded-xl shadow-2xl sm:h-[330px] sm:w-[235px]">
      <Image
        src={currentItem.imageUrl}
        alt={title}
        fill
        priority
        unoptimized
        sizes="(max-width: 640px) 180px, 235px"
        className="object-contain"
      />
    </div>
  );

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative w-full"
      aria-label="Featured books and collections"
    >
      <div
        key={currentItem.id}
        className={`relative h-[560px] overflow-hidden rounded-2xl shadow-sm transition-colors duration-500 sm:h-[460px] lg:h-[490px] ${
          isPublisher
            ? "bg-gradient-to-br from-[#061a37] via-[#102c50] to-[#183c60] text-white"
            : isEditorial
              ? "bg-[#f5efe4] text-[#182b40]"
              : isArabicCollection
                ? "bg-gradient-to-br from-[#e8f0e8] via-[#f5f4e9] to-[#e7eee9] text-[#173b35]"
                : isAcademic
                  ? "bg-gradient-to-br from-[#edf2f8] to-[#dce7f2] text-[#142d4b]"
                  : "bg-gradient-to-br from-[#071b35] via-[#102c4b] to-[#244568] text-white"
        }`}
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {isPublisher && (
            <>
              <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" />
              <div className="absolute -right-12 -top-20 h-72 w-72 rounded-full border border-[#dcae57]/20" />
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#dcae57] to-transparent opacity-70" />
            </>
          )}

          {isEditorial && (
            <>
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#d8c5a5]/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-2 w-full bg-[#c89438]" />
            </>
          )}

          {isArabicCollection && (
            <>
              <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#b9cbb9]/40 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-2 w-full bg-[#b28a48]" />
            </>
          )}

          {isAcademic && (
            <>
              <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/60 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-2 w-full bg-[#c89438]" />
            </>
          )}
        </div>

        <div className="relative z-10 grid h-full grid-cols-1 items-center gap-2 px-5 py-6 sm:px-10 sm:py-8 lg:grid-cols-2 lg:gap-8 lg:px-16">
          {/* Text content */}
          <div
            className={`flex h-full flex-col justify-center text-center lg:text-start ${
              isArabic ? "lg:items-start" : "lg:items-start"
            }`}
          >
            <span
              className={`mb-3 inline-flex w-fit items-center self-center rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] sm:text-xs lg:self-auto ${
                isDark
                  ? "border border-[#dcae57]/40 bg-[#dcae57]/10 text-[#e5bd76]"
                  : "border border-[#c89438]/30 bg-[#c89438]/10 text-[#956a24]"
              }`}
            >
              {currentItem.eyebrow}
            </span>

            <h2
              className={`max-w-xl text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-[48px] ${
                isEditorial
                  ? "font-serif"
                  : "font-sans"
              }`}
            >
              {title}
            </h2>

            {subtitle && (
              <p
                className={`mt-3 text-sm font-semibold sm:text-base ${
                  isDark ? "text-[#e5bd76]" : "text-[#9b702d]"
                }`}
              >
                {subtitle}
              </p>
            )}

            {description && (
              <p
                className={`mx-auto mt-3 max-w-lg text-xs leading-6 sm:text-sm sm:leading-7 lg:mx-0 ${
                  isDark ? "text-white/75" : "text-[#526174]"
                }`}
              >
                {description}
              </p>
            )}

            {/* Price */}
            {currentItem.price !== undefined && (
              <div className="mt-4 flex items-center justify-center gap-3 lg:justify-start">
                {currentItem.badge && (
                  <span className="rounded-full bg-[#c89438] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    {currentItem.badge}
                  </span>
                )}

                <span className="text-xl font-extrabold sm:text-2xl">
                  {currency} {currentItem.price}
                </span>

                {currentItem.oldPrice !== undefined && (
                  <span className="text-sm text-current/50 line-through">
                    {currency} {currentItem.oldPrice}
                  </span>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="mt-5 flex justify-center lg:justify-start">
              <Link
                href={currentItem.buttonLink}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-6 py-3 text-xs font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:text-sm ${
                  isDark
                    ? "bg-[#dcae57] text-[#061a37] hover:bg-[#edc477]"
                    : "bg-[#102d4d] text-white hover:bg-[#1b426b]"
                }`}
              >
                {buttonText}
                <span aria-hidden="true" className="text-base">
                  {isArabic ? "←" : "→"}
                </span>
              </Link>
            </div>
          </div>

          {/* Visual / book artwork */}
          <div className="relative flex h-full min-h-0 items-center justify-center">
            {isPublisher || isArabicCollection
              ? renderBookImages()
              : renderSingleImage()}

            {/* Price/badge on book spotlight */}
            {isEditorial && currentItem.badge && (
              <span className="absolute right-[8%] top-[12%] rotate-6 rounded-full bg-[#c89438] px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-lg sm:right-[15%]">
                {currentItem.badge}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={previous}
            aria-label="Previous banner"
            className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/90 text-lg text-[#061a37] shadow-md transition hover:scale-110 hover:bg-white sm:left-5 sm:h-11 sm:w-11"
          >
            {isArabic ? "›" : "‹"}
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next banner"
            className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/90 text-lg text-[#061a37] shadow-md transition hover:scale-110 hover:bg-white sm:right-5 sm:h-11 sm:w-11"
          >
            {isArabic ? "‹" : "›"}
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-5">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to banner ${index + 1}`}
                aria-current={currentIndex === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-7 bg-[#c89438]"
                    : "w-2 bg-[#8b98a8]/60 hover:bg-[#c89438]"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
