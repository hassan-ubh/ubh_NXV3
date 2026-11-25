
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export function ForgotPasswordForm({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const copy = {
    en: {
      eyebrow: "ACCOUNT RECOVERY",
      title: "Forgot your password?",
      description:
        "Enter the email address associated with your account. We'll help you get back in.",
      email: "Email address",
      placeholder: "you@example.com",
      button: "Continue",
      back: "Back to sign in",
      notice:
        "This is a demonstration form. No reset email has been sent because authentication is not connected yet.",
      success: "Demo submission received.",
      successDescription:
        "The form is working, but password recovery must be connected to a secure authentication provider.",
      secure: "Your account security matters",
    },
    ar: {
      eyebrow: "استعادة الحساب",
      title: "هل نسيت كلمة المرور؟",
      description:
        "أدخل البريد الإلكتروني المرتبط بحسابك للبدء في استعادة إمكانية الوصول.",
      email: "البريد الإلكتروني",
      placeholder: "you@example.com",
      button: "متابعة",
      back: "العودة إلى تسجيل الدخول",
      notice:
        "هذا نموذج تجريبي. لم يتم إرسال بريد لإعادة تعيين كلمة المرور لأن نظام المصادقة غير متصل بعد.",
      success: "تم استلام النموذج التجريبي.",
      successDescription:
        "النموذج يعمل، ولكن يجب ربط استعادة كلمة المرور بمزود مصادقة آمن.",
      secure: "أمان حسابك يهمنا",
    },
  }[locale];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="mx-auto w-full max-w-md"
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(6,26,55,0.07)] sm:p-8">
        <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-[#061a37]/[0.06] text-[#061a37]">
          <Mail size={23} strokeWidth={1.8} />
        </div>

        <p className="mb-2 text-[11px] font-bold tracking-[0.18em] text-[#b8822c]">
          {copy.eyebrow}
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-[#061a37] sm:text-3xl">
          {copy.title}
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          {copy.description}
        </p>

        {submitted ? (
          <div
            role="status"
            className="mt-7 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
          >
            <div className="flex items-center gap-2 font-semibold text-emerald-800">
              <ShieldCheck size={18} />
              {copy.success}
            </div>
            <p className="mt-2 text-sm leading-6 text-emerald-800/80">
              {copy.successDescription}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="recovery-email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                {copy.email}
              </label>

              <input
                id="recovery-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={copy.placeholder}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#b8822c] focus:bg-white focus:ring-4 focus:ring-[#b8822c]/10"
              />
            </div>

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#061a37] px-5 text-sm font-semibold text-white transition hover:bg-[#0b2b55] focus:outline-none focus:ring-4 focus:ring-[#061a37]/15"
            >
              {copy.button}
              {isArabic ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
            </button>
          </form>
        )}

        <div className="mt-6 border-t border-slate-100 pt-5">
          <Link
            href={`/${locale}/login`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#061a37] transition hover:text-[#b8822c]"
          >
            {isArabic ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            {copy.back}
          </Link>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3 px-2 text-xs leading-6 text-slate-500">
        <ShieldCheck size={17} className="mt-0.5 shrink-0 text-[#b8822c]" />
        <p>{copy.notice}</p>
      </div>
    </section>
  );
}
