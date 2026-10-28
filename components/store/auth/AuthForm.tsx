
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type AuthFormProps = {
  locale: Locale;
  mode: "login" | "signup";
};

const content = {
  en: {
    loginTitle: "Welcome back",
    signupTitle: "Create your account",
    loginSubtitle: "Sign in to access your UBH account and orders.",
    signupSubtitle: "Create an account to make your shopping easier.",
    name: "Full name",
    email: "Email address",
    password: "Password",
    confirmPassword: "Confirm password",
    forgot: "Forgot password?",
    login: "Sign in",
    signup: "Create account",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    loginLink: "Sign in",
    signupLink: "Create an account",
    passwordMismatch: "Your passwords do not match.",
    demoNotice:
      "Demo mode: your form is validated, but authentication is not connected yet. No account was created and you are not signed in.",
    benefitsTitle: "Your UBH account",
    benefits: [
      "View your order history",
      "Track your deliveries",
      "Submit return requests",
    ],
    required: "Please complete all required fields.",
  },
  ar: {
    loginTitle: "مرحباً بعودتك",
    signupTitle: "أنشئ حسابك",
    loginSubtitle: "سجّل الدخول للوصول إلى حسابك وطلباتك في UBH.",
    signupSubtitle: "أنشئ حساباً لتجربة تسوق أسهل.",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    forgot: "هل نسيت كلمة المرور؟",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    noAccount: "ليس لديك حساب؟",
    hasAccount: "لديك حساب بالفعل؟",
    loginLink: "تسجيل الدخول",
    signupLink: "إنشاء حساب",
    passwordMismatch: "كلمتا المرور غير متطابقتين.",
    demoNotice:
      "وضع تجريبي: تم التحقق من الحقول، لكن تسجيل الدخول غير متصل حالياً. لم يتم إنشاء حساب أو تسجيل الدخول.",
    benefitsTitle: "حسابك في UBH",
    benefits: [
      "عرض سجل الطلبات",
      "تتبع عمليات التوصيل",
      "تقديم طلبات الإرجاع",
    ],
    required: "يرجى إكمال الحقول المطلوبة.",
  },
} as const;

export function AuthForm({ locale, mode }: AuthFormProps) {
  const t = content[locale];
  const isArabic = locale === "ar";
  const isLogin = mode === "login";

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!isLogin && password !== confirmPassword) {
      setMessage(t.passwordMismatch);
      return;
    }

    // UI demo only. Connect this form to your authenticated
    // backend before using it for real customer accounts.
    setMessage(t.demoNotice);
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-ubh-navy outline-none transition placeholder:text-slate-400 focus:border-ubh-blue-bright focus:ring-4 focus:ring-blue-900/5";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-[75vh] bg-ubh-canvas px-4 py-10 sm:px-6 sm:py-16"
    >
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
        <section className="px-6 py-9 sm:px-10 sm:py-12 lg:px-12">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ubh-blue-bright hover:text-ubh-navy"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ubh-navy text-sm font-bold text-ubh-gold-light">
              UBH
            </span>
            University Book House
          </Link>

          <div className="mt-9">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-ubh-navy sm:text-4xl">
              {isLogin ? t.loginTitle : t.signupTitle}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {isLogin ? t.loginSubtitle : t.signupSubtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {!isLogin && (
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {t.name}
                </label>
                <div className="relative">
                  <UserRound
                    aria-hidden="true"
                    className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${
                      isArabic ? "right-4" : "left-4"
                    }`}
                  />
                  <input
                    id="fullName"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    placeholder={t.name}
                    className={`${inputClass} ${
                      isArabic ? "pr-11" : "pl-11"
                    }`}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                {t.email}
              </label>
              <div className="relative">
                <Mail
                  aria-hidden="true"
                  className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${
                    isArabic ? "right-4" : "left-4"
                  }`}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className={`${inputClass} ${
                    isArabic ? "pr-11" : "pl-11"
                  }`}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  {t.password}
                </label>

                {isLogin && (
                  <Link
                    href={`/${locale}/forgot-password`}
                    className="text-xs font-medium text-ubh-blue-bright hover:underline"
                  >
                    {t.forgot}
                  </Link>
                )}
              </div>

              <div className="relative">
                <LockKeyhole
                  aria-hidden="true"
                  className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${
                    isArabic ? "right-4" : "left-4"
                  }`}
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={
                    isLogin ? "current-password" : "new-password"
                  }
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className={`${inputClass} ${
                    isArabic ? "pr-11 pl-12" : "pl-11 pr-12"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className={`absolute top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-ubh-navy ${
                    isArabic ? "left-3" : "right-3"
                  }`}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {!isLogin && (
                <p className="mt-2 text-xs text-slate-500">
                  Use at least 8 characters.
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {t.confirmPassword}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
            )}

            {message && (
              <p
                role="status"
                aria-live="polite"
                className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-ubh-navy px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0a2b55] focus:outline-none focus:ring-4 focus:ring-blue-900/15"
            >
              {isLogin ? t.login : t.signup}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            {isLogin ? t.noAccount : t.hasAccount}{" "}
            <Link
              href={`/${locale}/${isLogin ? "signup" : "login"}`}
              className="font-semibold text-ubh-blue-bright hover:underline"
            >
              {isLogin ? t.signupLink : t.loginLink}
            </Link>
          </p>
        </section>

        <aside className="relative hidden flex-col justify-between overflow-hidden bg-ubh-navy p-10 text-white lg:flex lg:p-12">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full border border-ubh-gold-light/25"
          />

          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ubh-gold-light">
              UNIVERSITY BOOK HOUSE
            </span>
            <h2 className="mt-7 max-w-sm font-serif text-4xl leading-tight">
              {t.benefitsTitle}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
              {isArabic
                ? "كل ما تحتاجه لإدارة تجربة التسوق والطلبات في مكان واحد."
                : "A simpler way to manage your shopping, orders, and deliveries in one place."}
            </p>
          </div>

          <ul className="relative mt-12 space-y-5">
            {t.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ubh-gold-light/15 text-ubh-gold-light">
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <p className="relative mt-12 text-xs text-slate-400">
            Academic knowledge. Delivered with care.
          </p>
        </aside>
      </div>
    </main>
  );
}