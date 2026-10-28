"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { MouseEvent } from "react";
import { ZoomIn } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type ProductImageMagnifierProps = {
  src: string;
  alt: string;
  priority?: boolean;
  zoom?: number;
  locale?: Locale;
};

type ZoomPosition = { x: number; y: number };
type PreviewPosition = { left: number; top: number };

const PREVIEW_WIDTH = 320;
const PREVIEW_HEIGHT = 360;
const GAP = 12;
const EDGE = 12;

export function ProductImageMagnifier({
  src,
  alt,
  priority = true,
  zoom = 2,
  locale = "en",
}: ProductImageMagnifierProps) {
  const isArabic = locale === "ar";
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState<ZoomPosition>({ x: 50, y: 50 });
  const [preview, setPreview] = useState<PreviewPosition>({ left: 0, top: 0 });

  useEffect(() => setMounted(true), []);

  const updateZoom = useCallback((clientX: number, clientY: number) => {
    const node = imageContainerRef.current;
    const canHover =
      window.innerWidth >= 1280 &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!node || !canHover) {
      setIsHovering(false);
      return;
    }

    const rect = node.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));

    setPosition({ x, y });

    const roomRight = window.innerWidth - rect.right - GAP;
    const desiredLeft =
      roomRight >= PREVIEW_WIDTH
        ? rect.right + GAP
        : rect.left - PREVIEW_WIDTH - GAP;
    const maxLeft = Math.max(EDGE, window.innerWidth - PREVIEW_WIDTH - EDGE);
    const maxTop = Math.max(EDGE, window.innerHeight - PREVIEW_HEIGHT - EDGE);

    setPreview({
      left: Math.max(EDGE, Math.min(desiredLeft, maxLeft)),
      top: Math.max(EDGE, Math.min(rect.top, maxTop)),
    });
  }, []);

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const canHover =
      window.innerWidth >= 1280 &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!canHover) return;
    setIsHovering(true);
    updateZoom(event.clientX, event.clientY);
  };

  return (
    <>
      <div
        ref={imageContainerRef}
        className="group/magnifier relative isolate aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_28px_rgba(6,26,55,0.045)] [@media(hover:hover)_and_(min-width:1280px)]:cursor-crosshair"
        onMouseEnter={handleMouseEnter}
        onMouseMove={(event) => updateZoom(event.clientX, event.clientY)}
        onMouseLeave={() => setIsHovering(false)}
        aria-label={alt}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 42vw, 340px"
          draggable={false}
          className="select-none object-contain p-3 sm:p-4 transition-transform duration-200 ease-out group-hover/magnifier:scale-[1.01] motion-reduce:transition-none"
        />

        <div className="pointer-events-none absolute bottom-3 right-3 hidden items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/95 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 shadow-sm backdrop-blur xl:flex">
          <ZoomIn size={14} className="text-ubh-gold-deep" aria-hidden="true" />
          <span>{isArabic ? "مرّر المؤشر للتكبير" : "Hover to zoom"}</span>
        </div>

        {isHovering && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 hidden h-20 w-20 rounded-full border border-ubh-gold-deep/80 bg-white/15 shadow-[0_0_0_1px_rgba(255,255,255,.7)] xl:block"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>

      {mounted &&
        isHovering &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="img"
            aria-label={isArabic ? `تكبير ${alt}` : `Zoomed view of ${alt}`}
            className="pointer-events-none fixed z-[99999] hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_48px_rgba(6,26,55,.18)] xl:block"
            style={{
              left: preview.left,
              top: preview.top,
              width: PREVIEW_WIDTH,
              height: PREVIEW_HEIGHT,
              backgroundImage: `url("${src.replace(/(["\\])/g, "\\$1")}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${zoom * 100}%`,
              backgroundPosition: `${position.x}% ${position.y}%`,
            }}
          >
            <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-slate-100 bg-white/95 px-3 py-2.5 backdrop-blur">
              <span className="text-[11px] font-semibold tracking-wide text-ubh-navy">
                {isArabic ? "معاينة الكتاب" : "BOOK PREVIEW"}
              </span>
              <span className="text-[11px] text-slate-500">
                {zoom}× {isArabic ? "تكبير" : "zoom"}
              </span>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
