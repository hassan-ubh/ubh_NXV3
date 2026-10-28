// // "use client";
// // import { usePathname, useRouter } from "next/navigation";
// // import { Globe2 } from "lucide-react";
// // import { Locale } from "@/lib/i18n";

// // export function LanguageSwitcher({ locale }: { locale: Locale }) {
// //   const router = useRouter();
// //   const pathname = usePathname();
// //   const nextLocale = locale === "en" ? "ar" : "en";
// //   const target = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${nextLocale}`);
// //   return (
// //     <button onClick={() => router.push(target || `/${nextLocale}`)} className="inline-flex items-center gap-2 text-sm hover:text-ubh-gold-light transition" aria-label="Change language">
// //       <Globe2 size={16} /> {locale === "en" ? "العربية" : "English"}
// //     </button>
// //   );
// // }
// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import { Globe2 } from "lucide-react";
// import { Locale } from "@/lib/i18n";

// export function LanguageSwitcher({ locale }: { locale: Locale }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const nextLocale = locale === "en" ? "ar" : "en";

//   const target = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${nextLocale}`);

//   return (
//     <button
//       type="button"
//       onClick={() => router.push(target || `/${nextLocale}`)}
//       className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[11px] text-white transition hover:text-ubh-gold-light"
//       aria-label="Change language"
//     >
//       <Globe2 size={14} strokeWidth={1.8} />

//       {/* Tablet */}
//       <span className="2xl:hidden">{locale === "en" ? "AR" : "EN"}</span>

//       <span className="hidden 2xl:inline">
//         {locale === "en" ? "العربية" : "English"}
//       </span>
//     </button>
//   );
// }


"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { Locale } from "@/lib/i18n";

type Position = {
  top: number;
  left: number;
  width: number;
  placement: "top" | "bottom";
};

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isArabic = locale === "ar";

  useEffect(() => {
    setMounted(true);
  }, []);

const updatePosition = useCallback(() => {
  const trigger = triggerRef.current;
  if (!trigger) return;

  const rect = trigger.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isDesktop = window.matchMedia("(min-width: 1280px)").matches;

  const width = Math.min(
    viewportWidth < 640 ? 176 : 184,
    viewportWidth - 24
  );

  const estimatedHeight = 116;
  const gap = 8;

  // Anchor the dropdown to the language button.
  // Desktop header is 72px tall.
  const desiredTop = isDesktop
    ? Math.max(80, rect.bottom + gap)
    : rect.bottom + gap;

  let top = desiredTop;
  let placement: "top" | "bottom" = "bottom";

  // Only open above the trigger if the menu would exceed
  // the viewport and there is sufficient space above it.
  if (
    top + estimatedHeight > viewportHeight - 8 &&
    rect.top > estimatedHeight + gap
  ) {
    top = rect.top - estimatedHeight - gap;
    placement = "top";
  }

  // Clamp horizontally so the popup never leaves the screen.
  const left = Math.max(
    12,
    Math.min(rect.right - width, viewportWidth - width - 12)
  );

  // Keep the popup within the viewport vertically.
  top = Math.max(
    8,
    Math.min(top, viewportHeight - estimatedHeight - 8)
  );

  setPosition({ top, left, width, placement });
}, []);


  useEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }

    updatePosition();

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        !rootRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handleViewportChange = () => updatePosition();

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    setOpen(false);
  }, [locale, pathname]);

  const changeLanguage = (nextLocale: Locale) => {
    setOpen(false);

    if (nextLocale === locale) return;

    const currentPath = pathname || `/${locale}`;
    const target = currentPath.replace(
      /^\/(en|ar)(?=\/|$)/,
      `/${nextLocale}`
    );

    router.push(target || `/${nextLocale}`);
  };

  const menu =
    mounted && open && position
      ? createPortal(
          <div
            ref={menuRef}
            role="group"
            aria-label={isArabic ? "اختر اللغة" : "Choose language"}
            className={`
              fixed z-[9999] overflow-hidden rounded-xl
              border border-white/10 bg-[#071a35]
              p-1.5 text-white
              shadow-[0_16px_45px_rgba(0,0,0,0.35)]
              ring-1 ring-black/10
              motion-safe:animate-in
              motion-safe:fade-in
              motion-safe:duration-150
              ${
                position.placement === "top"
                  ? "origin-bottom"
                  : "origin-top"
              }
            `}
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
            }}
          >
            <div className="px-3 pb-2 pt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-ubh-gold-light/80">
              {isArabic ? "اللغة" : "LANGUAGE"}
            </div>

            {(
              [
                {
                  value: "en",
                  label: "English",
                  native: "English",
                },
                {
                  value: "ar",
                  label: "العربية",
                  native: "Arabic",
                },
              ] as const
            ).map((option) => {
              const selected = locale === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  lang={option.value}
                  dir={option.value === "ar" ? "rtl" : "ltr"}
                  aria-pressed={selected}
                  onClick={() =>
                    changeLanguage(option.value as Locale)
                  }
                  className={`
                    flex min-h-10 w-full items-center
                    justify-between gap-3 rounded-lg
                    px-3 py-2.5 text-xs font-medium
                    transition-colors duration-150
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-inset
                    focus-visible:ring-ubh-gold-light
                    ${
                      selected
                        ? "bg-ubh-gold-light/10 text-[#e4b95f]"
                        : "text-white/80 hover:bg-white/[0.06] hover:text-white"
                    }
                  `}
                >
                  <span>{option.label}</span>

                  {selected && (
                    <Check
                      size={14}
                      strokeWidth={2}
                      className="shrink-0 text-ubh-gold-light"
                    />
                  )}
                </button>
              );
            })}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div ref={rootRef} className="shrink-0">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={isArabic ? "تغيير اللغة" : "Change language"}
          aria-expanded={open}
          aria-haspopup="true"
          className="
            group inline-flex h-8 shrink-0 items-center
            gap-1.5 rounded-full
            border border-white/10
            bg-white/[0.035] px-2
            text-[10px] font-semibold tracking-wide
            text-white/85
            transition-all duration-200
            hover:border-ubh-gold-light/45
            hover:bg-ubh-gold-light/[0.07]
            hover:text-[#e4b95f]
            active:scale-[0.97]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-ubh-gold-light/70
          "
        >
          <Globe2
            size={13}
            strokeWidth={1.8}
            className="shrink-0 text-ubh-gold-light"
          />

          <span>{isArabic ? "AR" : "EN"}</span>

          <ChevronDown
            size={11}
            strokeWidth={1.8}
            className={`
              shrink-0 text-white/45
              transition-transform duration-200
              ${open ? "rotate-180 text-ubh-gold-light" : ""}
            `}
          />
        </button>
      </div>

      {menu}
    </>
  );
}
