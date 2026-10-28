"use client";

import Link from "next/link";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Heart,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Pencil,
  Package,
  ShieldCheck,
} from "lucide-react";

import { copy, isLocale } from "@/lib/i18n";
import { Container } from "@/components/shared/Container";



export default function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  if (!isLocale(locale)) {
    notFound();
  }

  const t = copy[locale].profile;
  const isArabic = locale === "ar";

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaved(true);
    setEditing(false);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <>
      {/* ================================================================
          HEADER
      ================================================================ */}

      {/* <header
        dir={isArabic ? "rtl" : "ltr"}
        className="bg-ubh-navy text-white"
      >
        
<Container>
          <div className="pb-6 pt-4">
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <Link
                href={`/${locale}`}
                className="transition hover:text-white"
              >
                {t.home}
              </Link>

              <span>›</span>

              <span className="text-white/80">
                {t.profile}
              </span>
            </div>
          </div>
        </Container>
      </header> */}

      {/* ================================================================
          MAIN
      ================================================================ */}

      <main
        dir={isArabic ? "rtl" : "ltr"}
        className="min-h-[70vh] bg-ubh-canvas"
      >
        <Container>
          <div className="py-8 md:py-12">

            {/* ==========================================================
                PAGE HEADER
            ========================================================== */}

            <div className="mb-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ubh-gold">
                {t.myAccount}
              </p>

              <h1 className="mt-2 font-serif text-3xl text-ubh-blue md:text-4xl">
                {t.profile}
              </h1>

              <p className="mt-2 max-w-xl text-xs leading-6 text-ubh-muted">
                {t.profileDescription}
              </p>
            </div>

            {/* ==========================================================
                ACCOUNT LAYOUT
            ========================================================== */}

            <div className="grid gap-7 lg:grid-cols-[250px_1fr]">

              {/* ========================================================
                  SIDEBAR
              ======================================================== */}

              <aside className="h-fit overflow-hidden rounded-lg border border-ubh-border bg-white">

                {/* User summary */}

                <div className="border-b border-[#edf1f5] p-6 text-center">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f0f5f9] text-ubh-blue">
                    <User
                      size={32}
                      strokeWidth={1.4}
                    />
                  </div>

                  <h2 className="mt-4 font-serif text-lg text-ubh-blue">
                    {t.accountHolder}
                  </h2>

                  <p className="mt-1 text-[9px] text-ubh-muted-light">
                    {t.member}
                  </p>
                </div>

                {/* Navigation */}

                <nav className="p-2">

                  <Link
                    href={`/${locale}/profile`}
                    className="flex items-center gap-3 rounded bg-[#f5f8fb] px-4 py-3 text-[10px] font-bold text-ubh-blue"
                  >
                    <User size={15} />
                    <span className="flex-1">
                      {t.profile}
                    </span>

                    {isArabic ? (
                      <ChevronLeft size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </Link>

                  <Link
                    href={`/${locale}/profile/orders`}
                    className="mt-1 flex items-center gap-3 rounded px-4 py-3 text-[10px] font-semibold text-ubh-muted transition hover:bg-[#f5f8fb] hover:text-ubh-blue"
                  >
                    <Package size={15} />
                    <span className="flex-1">
                      {t.orders}
                    </span>

                    {isArabic ? (
                      <ChevronLeft size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </Link>

                  <Link
                    href={`/${locale}/wishlist`}
                    className="mt-1 flex items-center gap-3 rounded px-4 py-3 text-[10px] font-semibold text-ubh-muted transition hover:bg-[#f5f8fb] hover:text-ubh-blue"
                  >
                    <Heart size={15} />
                    <span className="flex-1">
                      {t.wishlist}
                    </span>

                    {isArabic ? (
                      <ChevronLeft size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </Link>

                  <Link
                    href={`/${locale}/cart`}
                    className="mt-1 flex items-center gap-3 rounded px-4 py-3 text-[10px] font-semibold text-ubh-muted transition hover:bg-[#f5f8fb] hover:text-ubh-blue"
                  >
                    <ShoppingBag size={15} />
                    <span className="flex-1">
                      {t.cart}
                    </span>

                    {isArabic ? (
                      <ChevronLeft size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </Link>

                </nav>

                {/* Logout */}

                <div className="border-t border-[#edf1f5] p-2">

                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded px-4 py-3 text-[10px] font-semibold text-ubh-muted-light transition hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut size={15} />

                    {t.logout}
                  </button>

                </div>
              </aside>

              {/* ========================================================
                  CONTENT
              ======================================================== */}

              <div className="space-y-6">

                {/* ======================================================
                    PROFILE INFORMATION
                ====================================================== */}

                <section className="rounded-lg border border-ubh-border bg-white">

                  <div className="flex items-center justify-between border-b border-[#edf1f5] px-6 py-5 md:px-7">

                    <div className="flex items-center gap-4">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f5f9] text-ubh-gold">
                        <User size={18} />
                      </div>

                      <div>
                        <h2 className="text-sm font-bold text-ubh-blue">
                          {t.personalInformation}
                        </h2>

                        <p className="mt-1 text-[9px] text-ubh-muted-light">
                          {t.personalInformationDescription}
                        </p>
                      </div>

                    </div>

                    {!editing && (
                      <button
                        type="button"
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-2 text-[10px] font-bold text-ubh-blue-bright transition hover:text-ubh-gold"
                      >
                        <Pencil size={13} />
                        {t.edit}
                      </button>
                    )}

                  </div>

                  {editing ? (
                    <form
                      onSubmit={handleSave}
                      className="p-6 md:p-7"
                    >
                      <div className="grid gap-5 md:grid-cols-2">

                        {/* First name */}

                        <div>
                          <label className="mb-2 block text-[10px] font-bold text-ubh-blue-muted">
                            {t.firstName}
                          </label>

                          <input
                            type="text"
                            value={form.firstName}
                            onChange={(event) =>
                              updateField(
                                "firstName",
                                event.target.value
                              )
                            }
                            placeholder={t.firstNamePlaceholder}
                            className="h-11 w-full rounded border border-[#d8e1ea] bg-white px-4 text-xs text-ubh-blue outline-none transition placeholder:text-[#a6b3c1] focus:border-ubh-gold focus:ring-1 focus:ring-ubh-gold/20"
                          />
                        </div>

                        {/* Last name */}

                        <div>
                          <label className="mb-2 block text-[10px] font-bold text-ubh-blue-muted">
                            {t.lastName}
                          </label>

                          <input
                            type="text"
                            value={form.lastName}
                            onChange={(event) =>
                              updateField(
                                "lastName",
                                event.target.value
                              )
                            }
                            placeholder={t.lastNamePlaceholder}
                            className="h-11 w-full rounded border border-[#d8e1ea] bg-white px-4 text-xs text-ubh-blue outline-none transition placeholder:text-[#a6b3c1] focus:border-ubh-gold focus:ring-1 focus:ring-ubh-gold/20"
                          />
                        </div>

                        {/* Email */}

                        <div>
                          <label className="mb-2 block text-[10px] font-bold text-ubh-blue-muted">
                            {t.email}
                          </label>

                          <input
                            type="email"
                            value={form.email}
                            onChange={(event) =>
                              updateField(
                                "email",
                                event.target.value
                              )
                            }
                            placeholder={t.emailPlaceholder}
                            className="h-11 w-full rounded border border-[#d8e1ea] bg-white px-4 text-xs text-ubh-blue outline-none transition placeholder:text-[#a6b3c1] focus:border-ubh-gold focus:ring-1 focus:ring-ubh-gold/20"
                          />
                        </div>

                        {/* Phone */}

                        <div>
                          <label className="mb-2 block text-[10px] font-bold text-ubh-blue-muted">
                            {t.phone}
                          </label>

                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(event) =>
                              updateField(
                                "phone",
                                event.target.value
                              )
                            }
                            placeholder={t.phonePlaceholder}
                            className="h-11 w-full rounded border border-[#d8e1ea] bg-white px-4 text-xs text-ubh-blue outline-none transition placeholder:text-[#a6b3c1] focus:border-ubh-gold focus:ring-1 focus:ring-ubh-gold/20"
                          />
                        </div>

                      </div>

                      {/* Buttons */}

                      <div className="mt-6 flex flex-wrap gap-3">

                        <button
                          type="submit"
                          className="h-10 rounded bg-ubh-blue px-6 text-[10px] font-bold text-white transition hover:bg-ubh-blue-deep"
                        >
                          {t.saveChanges}
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditing(false)}
                          className="h-10 rounded border border-[#d8e1ea] bg-white px-6 text-[10px] font-semibold text-ubh-blue-muted transition hover:border-ubh-gold hover:text-ubh-gold"
                        >
                          {t.cancel}
                        </button>

                      </div>
                    </form>
                  ) : (

                    /* ==================================================
                       DISPLAY INFORMATION
                    ================================================== */

                    <div className="grid md:grid-cols-2">

                      <InfoRow
                        icon={<User size={16} />}
                        label={t.name}
                        value={t.accountHolder}
                        isLast={false}
                      />

                      <InfoRow
                        icon={<Mail size={16} />}
                        label={t.email}
                        value="—"
                        isLast={false}
                      />

                      <InfoRow
                        icon={<Phone size={16} />}
                        label={t.phone}
                        value="—"
                        isLast={false}
                      />

                      <InfoRow
                        icon={<ShieldCheck size={16} />}
                        label={t.accountStatus}
                        value={t.active}
                        isLast={true}
                      />

                    </div>
                  )}

                </section>

                {/* ======================================================
                    ADDRESS
                ====================================================== */}

                <section className="rounded-lg border border-ubh-border bg-white">

                  <div className="flex items-center justify-between border-b border-[#edf1f5] px-6 py-5 md:px-7">

                    <div className="flex items-center gap-4">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f5f9] text-ubh-gold">
                        <MapPin size={18} />
                      </div>

                      <div>
                        <h2 className="text-sm font-bold text-ubh-blue">
                          {t.addresses}
                        </h2>

                        <p className="mt-1 text-[9px] text-ubh-muted-light">
                          {t.addressDescription}
                        </p>
                      </div>

                    </div>

                    <Link
                      href={`/${locale}/addresses`}
                      className="text-[10px] font-bold text-ubh-blue-bright transition hover:text-ubh-gold"
                    >
                      {t.manage}
                    </Link>

                  </div>

                  <div className="p-6 md:p-7">

                    <div className="rounded border border-ubh-border bg-ubh-canvas p-5">

                      <div className="flex items-start justify-between gap-4">

                        <div className="flex items-start gap-3">

                          <MapPin
                            size={16}
                            className="mt-0.5 shrink-0 text-ubh-gold"
                          />

                          <div>
                            <p className="text-xs font-bold text-ubh-blue">
                              {t.defaultAddress}
                            </p>

                            <p className="mt-2 text-[10px] leading-5 text-ubh-muted">
                              {t.noAddress}
                            </p>
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                </section>

                {/* ======================================================
                    QUICK LINKS
                ====================================================== */}

                <section>

                  <h2 className="mb-4 text-sm font-bold text-ubh-blue">
                    {t.quickLinks}
                  </h2>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                    <QuickLink
                      href={`/${locale}/profile/orders`}
                      icon={<Package size={19} />}
                      title={t.orders}
                      description={t.ordersDescription}
                      isArabic={isArabic}
                    />

                    <QuickLink
                      href={`/${locale}/wishlist`}
                      icon={<Heart size={19} />}
                      title={t.wishlist}
                      description={t.wishlistDescription}
                      isArabic={isArabic}
                    />

                    <QuickLink
                      href={`/${locale}/cart`}
                      icon={<ShoppingBag size={19} />}
                      title={t.cart}
                      description={t.cartDescription}
                      isArabic={isArabic}
                    />

                  </div>
                </section>

                {/* ======================================================
                    SUCCESS MESSAGE
                ====================================================== */}

                {saved && (
                  <div className="flex items-center gap-3 rounded border border-[#b9d8c4] bg-[#f1faf4] px-5 py-4 text-[10px] font-semibold text-[#39704b]">
                    <ShieldCheck size={16} />
                    {t.changesSaved}
                  </div>
                )}

              </div>
            </div>
          </div>
        </Container>
      </main>

      {/* ================================================================
          FOOTER
      ================================================================ */}
</>
  );
}

/* ======================================================================
   INFO ROW
====================================================================== */

function InfoRow({
  icon,
  label,
  value,
  isLast,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLast: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-4 p-6 ${
        !isLast ? "border-b border-[#edf1f5] md:border-b-0" : ""
      }`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#f5f8fb] text-ubh-gold">
        {icon}
      </div>

      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-ubh-muted-light">
          {label}
        </p>

        <p className="mt-1 text-xs font-semibold text-ubh-blue-muted">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ======================================================================
   QUICK LINK
====================================================================== */

function QuickLink({
  href,
  icon,
  title,
  description,
  isArabic,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  isArabic: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-lg border border-ubh-border bg-white p-5 transition hover:border-[#cbd8e5] hover:shadow-[0_10px_30px_rgba(6,26,55,0.06)]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0f5f9] text-ubh-gold transition group-hover:bg-[#fff8eb]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-xs font-bold text-ubh-blue">
          {title}
        </h3>

        <p className="mt-1 text-[9px] leading-4 text-ubh-muted-light">
          {description}
        </p>
      </div>

      {isArabic ? (
        <ChevronLeft
          size={15}
          className="shrink-0 text-ubh-muted-light transition group-hover:text-ubh-gold"
        />
      ) : (
        <ChevronRight
          size={15}
          className="shrink-0 text-ubh-muted-light transition group-hover:text-ubh-gold"
        />
      )}
    </Link>
  );
}