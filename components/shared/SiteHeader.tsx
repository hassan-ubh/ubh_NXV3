"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, Search, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { Container } from "./Container";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { copy, type Locale } from "@/lib/i18n";

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const t = copy[locale].nav;
  const isArabic = locale === "ar";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigation: NavItem[] = useMemo(
    () => [
      { label: t.about, href: `/${locale}/about-us` },
      { label: t.shop, href: `/${locale}/shop` },
      {
        label: t.publishing,
        children: [
          { label: t.publications, href: `/${locale}/publications` },
          { label: t.publishers, href: `/${locale}/publishers` },
        ],
      },
      {
        label: t.solutions,
        children: [
          { label: t.digital, href: `/${locale}/digital-solutions` },
          { label: t.ai, href: `/${locale}/ai-solutions` },
        ],
      },
      { label: t.research, href: `/${locale}/research` },
      { label: t.institutions, href: `/${locale}/institutions` },
      { label: t.news, href: `/${locale}/news` },
      { label: t.contact, href: `/${locale}/contact-us` },
    ],
    [locale, t],
  );

  // Keep the main row readable on tablet and compact desktop widths.
  // All navigation links remain available through the More dropdown.
  const primaryNavigation = navigation.slice(0, 4);
  const secondaryNavigation = navigation.slice(4);

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileDropdown(null);
    setSearchOpen(false);
  }, []);


  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  useEffect(() => {
    closeMenus();
    setSearchQuery("");
  }, [pathname, locale, closeMenus]);

  useEffect(() => {
    if (!mobileOpen && !searchOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const frame = requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [searchOpen]);

  useEffect(() => {
    if (!mobileOpen && !openDropdown && !searchOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
        setSearchOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, openDropdown, searchOpen, closeMenus]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();
    if (!query) {
      searchInputRef.current?.focus();
      return;
    }

    closeMenus();
    router.push(`/${locale}/shop/products?q=${encodeURIComponent(query)}`);
  };

  const toggleSearch = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
    setOpenDropdown(null);
    setSearchOpen((current) => !current);
  };

  const toggleMobileMenu = () => {
    setSearchOpen(false);
    setOpenDropdown(null);
    setMobileDropdown(null);
    setMobileOpen((current) => !current);
  };

  return (
    <header
      ref={headerRef}
      dir={isArabic ? "rtl" : "ltr"}
      className="fixed inset-x-0 top-0 z-[100]"
    >
      {/* Main navigation bar */}
      <div
  className={`
    border-b transition-all duration-300 ease-in-out
    ${
      isScrolled
        ? "border-white/[0.08] bg-[#041329] shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
        : "border-white/[0.08] bg-ubh-navy shadow-none"
    }
  `}
>
        <Container className="px-3 sm:px-4 lg:px-5 2xl:px-7 py-2">
          <div
  className={`
    flex items-center gap-2 transition-all duration-300 ease-in-out
    lg:gap-2 xl:gap-3 2xl:gap-4
    ${isScrolled ? "h-[72px]" : "h-[77px]"}
  `}
>
            {/* Logo: reserve only the space it needs */}
            <div className="flex w-[105px] shrink-0 items-center sm:w-[125px] lg:w-[115px] xl:w-[145px] 2xl:w-[170px]">
              <Logo size="header" />
            </div>

            {/* Desktop / tablet landscape navigation */}

            <nav
              aria-label={t.menu}
              className="hidden min-w-0 flex-1 items-center justify-between gap-0 lg:flex"
            >
              {navigation.map((item) =>
                item.children ? (
                  <DesktopDropdown
                    key={item.label}
                    item={item}
                    open={openDropdown === item.label}
                    isArabic={isArabic}
                    onToggle={() =>
                      setOpenDropdown((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                    onNavigate={closeMenus}
                  />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={closeMenus}
                    className="flex h-10 shrink-0 items-center whitespace-nowrap rounded-md px-1 text-[10px] font-semibold text-white/80 transition-colors hover:text-ubh-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light xl:px-1.5 xl:text-[12px] 2xl:px-2 2xl:text-[13px]"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Right-side actions */}
            <div className="ms-auto flex shrink-0 items-center gap-1 sm:gap-1.5">
              <div className="hidden shrink-0 xl:block">
                <LanguageSwitcher locale={locale} />
              </div>

              <button
                type="button"
                onClick={toggleSearch}
                aria-label={
                  searchOpen
                    ? isArabic
                      ? "إغلاق البحث"
                      : "Close search"
                    : t.search
                }
                aria-expanded={searchOpen}
                aria-controls="site-search-panel"
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-ubh-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light"
              >
                {searchOpen ? <X size={19} /> : <Search size={19} />}
              </button>

              {/* Institutions CTA remains visible on desktop */}
              <Link
                href={`/${locale}/institutions`}
                onClick={closeMenus}
                className="hidden lg:inline-flex min-h-9 shrink-0 items-center justify-center gap-1 rounded-md border border-ubh-gold/70 bg-ubh-gold/[0.08] px-2 text-[10px] font-semibold text-white whitespace-nowrap transition-colors hover:border-ubh-gold-light hover:bg-ubh-gold-light hover:text-ubh-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light xl:px-3 xl:text-xs"
              >
                <span>{t.institutionCta}</span>
                <ArrowUpRight size={13} />
              </Link>

              {/* Mobile / tablet portrait menu */}
              <button
                type="button"
                onClick={toggleMobileMenu}
                aria-label={mobileOpen ? t.closeMenu : t.openMenu}
                aria-expanded={mobileOpen}
                aria-controls="site-mobile-menu"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-ubh-gold/60 hover:text-ubh-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light lg:hidden"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Search panel */}
      <div
        id="site-search-panel"
        aria-hidden={!searchOpen}
        className={`absolute inset-x-0 top-full border-b border-white/10 bg-ubh-navy shadow-2xl transition-[opacity,transform,visibility] duration-200 ${
          searchOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <Container className="px-4 py-5 sm:px-6 sm:py-6">
          <form
            onSubmit={submitSearch}
            className="mx-auto flex max-w-3xl items-center gap-3"
          >
            <Search size={20} className="shrink-0 text-ubh-gold-light" />
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={
                isArabic
                  ? "ابحث عن الكتب والمنشورات..."
                  : "Search books, publications and more..."
              }
              aria-label={t.search}
              tabIndex={searchOpen ? 0 : -1}
              className="min-w-0 flex-1 border-0 border-b border-white/20 bg-transparent px-1 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-ubh-gold-light"
            />
            <button
              type="submit"
              className="min-h-11 shrink-0 rounded-lg bg-ubh-gold px-5 text-sm font-semibold text-ubh-navy transition-colors hover:bg-ubh-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {isArabic ? "بحث" : "Search"}
            </button>
          </form>
        </Container>
      </div>

      {/* Mobile backdrop */}
      <button
        type="button"
        tabIndex={mobileOpen ? 0 : -1}
        aria-label={isArabic ? "إغلاق القائمة" : "Close navigation"}
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 top-[72px] z-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden sm:top-[76px] ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile and tablet portrait menu */}
      <div
        id="site-mobile-menu"
        aria-hidden={!mobileOpen}
        className={`fixed inset-x-0 top-[72px] z-10 max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-b border-white/10 bg-ubh-navy shadow-2xl transition-[opacity,transform,visibility] duration-200 lg:hidden sm:top-[76px] sm:max-h-[calc(100dvh-76px)] ${
          mobileOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <Container className="px-4 py-5 sm:px-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ubh-gold-light">
              {t.menu}
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <nav
            aria-label={t.menu}
            className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.025]"
          >
            {navigation.map((item, index) => (
              <div
                key={item.label}
                className={
                  index < navigation.length - 1
                    ? "border-b border-white/[0.08]"
                    : ""
                }
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileDropdown((current) =>
                          current === item.label ? null : item.label,
                        )
                      }
                      aria-expanded={mobileDropdown === item.label}
                      className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 text-start text-sm font-medium text-white/85 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ubh-gold-light"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={17}
                        className={`shrink-0 text-white/55 transition-transform duration-200 ${
                          mobileDropdown === item.label
                            ? "rotate-180 text-ubh-gold-light"
                            : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-200 ${
                        mobileDropdown === item.label
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-1 border-t border-white/[0.06] bg-black/10 p-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={closeMenus}
                              tabIndex={mobileDropdown === item.label ? 0 : -1}
                              className="flex min-h-11 items-center justify-between rounded-lg px-4 py-2 text-[13px] text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ubh-gold-light"
                            >
                              {child.label}
                              <ArrowUpRight
                                size={14}
                                className="shrink-0 text-ubh-gold-light/70"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={closeMenus}
                    className="flex min-h-[52px] items-center px-4 text-sm font-medium text-white/85 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ubh-gold-light"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex min-h-11 shrink-0 items-center rounded-lg border border-white/10 bg-white/[0.04] px-3">
              <LanguageSwitcher locale={locale} />
            </div>

            <Link
              href={`/${locale}/institutions`}
              onClick={closeMenus}
              className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-ubh-gold/70 bg-ubh-gold/[0.08] px-3 py-3 text-center text-xs font-semibold text-white transition-colors hover:bg-ubh-gold hover:text-ubh-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light"
            >
              {t.institutionCta}
              <ArrowUpRight
                size={14}
                className={isArabic ? "rotate-[-90deg]" : ""}
              />
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}

type DesktopDropdownProps = {
  item: NavItem;
  open: boolean;
  isArabic: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  dropdownId?: string;
};

function DesktopDropdown({
  item,
  open,
  isArabic,
  onToggle,
  onNavigate,
  dropdownId,
}: DesktopDropdownProps) {
  const id = dropdownId ?? item.label;

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex h-10 shrink-0 items-center gap-0.5 whitespace-nowrap rounded-md px-1.5 text-[11px] font-medium text-white/80 transition-colors hover:text-ubh-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light xl:gap-1 xl:px-2 xl:text-xs 2xl:px-2.5 2xl:text-[13px]"
      >
        {item.label}
        <ChevronDown
          size={13}
          className={`shrink-0 text-white/50 transition-transform duration-200 ${
            open ? "rotate-180 text-ubh-gold-light" : ""
          }`}
        />
      </button>

      <div
        aria-hidden={!open}
        className={`absolute top-full z-50 w-[230px] overflow-hidden rounded-xl border border-white/10 bg-[#071d3b] shadow-[0_18px_50px_rgba(0,0,0,0.30)] transition-[opacity,transform,visibility] duration-150 ${
          isArabic ? "right-0" : "left-0"
        } ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="h-0.5 bg-gradient-to-r from-transparent via-ubh-gold-light/80 to-transparent" />
        <div className="p-2">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              tabIndex={open ? 0 : -1}
              onClick={onNavigate}
              className="group/link flex min-h-11 items-center justify-between gap-3 rounded-lg px-3.5 py-2.5 text-[13px] font-medium text-white/75 transition-colors hover:bg-white/[0.055] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ubh-gold-light"
            >
              <span>{child.label}</span>
              <ArrowUpRight
                size={14}
                className={`shrink-0 text-ubh-gold-light/0 transition-all duration-150 group-hover/link:text-ubh-gold-light ${
                  isArabic
                    ? "group-hover/link:-translate-x-0.5"
                    : "group-hover/link:translate-x-0.5"
                }`}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
