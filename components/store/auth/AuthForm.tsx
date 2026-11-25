

// "use client";

// import Link from "next/link";
// import { useState, type FormEvent } from "react";
// import {
//   Eye,
//   EyeOff,
//   LockKeyhole,
//   Mail,
//   UserRound,
// } from "lucide-react";
// import type { Locale } from "@/lib/i18n";

// type AuthFormProps = {
//   locale: Locale;
//   mode: "login" | "signup";
// };

// const content = {
//   en: {
//     loginTitle: "Welcome back",
//     signupTitle: "Create your account",
//     loginSubtitle: "Sign in to access your UBH account and orders.",
//     signupSubtitle: "Create an account for a better shopping experience.",
//     name: "Full name",
//     email: "Email address",
//     password: "Password",
//     confirmPassword: "Confirm password",
//     forgot: "Forgot password?",
//     login: "Sign in",
//     signup: "Create account",
//     noAccount: "Don't have an account?",
//     hasAccount: "Already have an account?",
//     loginLink: "Sign in",
//     signupLink: "Create an account",
//     passwordMismatch: "Your passwords do not match.",
//     demoNotice:
//       "Demo mode: authentication is not connected yet. No account was created.",
//     passwordHint: "Use at least 8 characters.",
//   },
//   ar: {
//     loginTitle: "مرحباً بعودتك",
//     signupTitle: "إنشاء حساب جديد",
//     loginSubtitle: "سجّل الدخول للوصول إلى حسابك وطلباتك في UBH.",
//     signupSubtitle: "أنشئ حساباً لتجربة تسوق أفضل.",
//     name: "الاسم الكامل",
//     email: "البريد الإلكتروني",
//     password: "كلمة المرور",
//     confirmPassword: "تأكيد كلمة المرور",
//     forgot: "هل نسيت كلمة المرور؟",
//     login: "تسجيل الدخول",
//     signup: "إنشاء حساب",
//     noAccount: "ليس لديك حساب؟",
//     hasAccount: "لديك حساب بالفعل؟",
//     loginLink: "تسجيل الدخول",
//     signupLink: "إنشاء حساب",
//     passwordMismatch: "كلمتا المرور غير متطابقتين.",
//     demoNotice: "الوضع التجريبي: المصادقة غير متصلة حالياً.",
//     passwordHint: "استخدم 8 أحرف على الأقل.",
//   },
// } as const;

// export function AuthForm({ locale, mode }: AuthFormProps) {
//   const t = content[locale];
//   const isArabic = locale === "ar";
//   const isLogin = mode === "login";

//   const [showPassword, setShowPassword] = useState(false);
//   const [message, setMessage] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     setMessage("");

//     if (!isLogin && password !== confirmPassword) {
//       setMessage(t.passwordMismatch);
//       return;
//     }

//     setMessage(t.demoNotice);
//   }

//   const inputClass =
//     "h-[50px] w-full rounded-xl border border-slate-200 bg-[#F9FAFC] text-sm text-[#102B4E] outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#B8822C] focus:bg-white focus:ring-4 focus:ring-[#B8822C]/10";

//   const iconClass =
//     "absolute top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-slate-400";

//   return (
//     <main
//       dir={isArabic ? "rtl" : "ltr"}
//       className="flex min-h-[65vh] items-center justify-center bg-[#F5F7FA] px-4 py-12 sm:py-16"
//     >
//       <div className="w-full max-w-[440px]">

//         {/* Form card */}
//         <div className="rounded-2xl border border-slate-200/80 bg-white px-6 py-9 shadow-[0_12px_45px_-25px_rgba(6,26,55,0.18)] sm:px-10 sm:py-11">

//           {/* Heading */}
//           <div className="mb-8 text-center">
//             {/* <span className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#061A37] text-sm font-bold tracking-tight text-[#DCAE57]">
//               UBH
//             </span> */}

//             <h1 className="font-serif text-[30px] font-semibold tracking-tight text-[#061A37]">
//               {isLogin ? t.loginTitle : t.signupTitle}
//             </h1>

//             <p className="mt-2 text-sm leading-6 text-slate-500">
//               {isLogin ? t.loginSubtitle : t.signupSubtitle}
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">

//             {!isLogin && (
//               <div>
//                 <label
//                   htmlFor="fullName"
//                   className="mb-2 block text-xs font-semibold text-[#263D59]"
//                 >
//                   {t.name}
//                 </label>

//                 <div className="relative">
//                   <UserRound
//                     className={`${iconClass} ${isArabic ? "right-4" : "left-4"}`}
//                   />
//                   <input
//                     id="fullName"
//                     name="name"
//                     type="text"
//                     autoComplete="name"
//                     required
//                     minLength={2}
//                     placeholder={t.name}
//                     className={`${inputClass} ${isArabic ? "pr-11 pl-4" : "pl-11 pr-4"}`}
//                   />
//                 </div>
//               </div>
//             )}

//             <div>
//               <label
//                 htmlFor="email"
//                 className="mb-2 block text-xs font-semibold text-[#263D59]"
//               >
//                 {t.email}
//               </label>

//               <div className="relative">
//                 <Mail
//                   className={`${iconClass} ${isArabic ? "right-4" : "left-4"}`}
//                 />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   placeholder="you@example.com"
//                   className={`${inputClass} ${isArabic ? "pr-11 pl-4" : "pl-11 pr-4"}`}
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="mb-2 flex items-center justify-between gap-2">
//                 <label
//                   htmlFor="password"
//                   className="text-xs font-semibold text-[#263D59]"
//                 >
//                   {t.password}
//                 </label>

//                 {isLogin && (
//                   <Link
//                     href={`/${locale}/forgot-password`}
//                     className="text-xs font-medium text-[#A87523] hover:underline"
//                   >
//                     {t.forgot}
//                   </Link>
//                 )}
//               </div>

//               <div className="relative">
//                 <LockKeyhole
//                   className={`${iconClass} ${isArabic ? "right-4" : "left-4"}`}
//                 />

//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete={isLogin ? "current-password" : "new-password"}
//                   required
//                   minLength={8}
//                   value={password}
//                   onChange={(event) => setPassword(event.target.value)}
//                   placeholder="••••••••"
//                   className={`${inputClass} ${isArabic ? "pr-11 pl-12" : "pl-11 pr-12"}`}
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                   className={`absolute top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 hover:text-[#061A37] ${isArabic ? "left-3" : "right-3"}`}
//                 >
//                   {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
//                 </button>
//               </div>

//               {!isLogin && (
//                 <p className="mt-2 text-[11px] text-slate-400">
//                   {t.passwordHint}
//                 </p>
//               )}
//             </div>

//             {!isLogin && (
//               <div>
//                 <label
//                   htmlFor="confirmPassword"
//                   className="mb-2 block text-xs font-semibold text-[#263D59]"
//                 >
//                   {t.confirmPassword}
//                 </label>

//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="new-password"
//                   required
//                   minLength={8}
//                   value={confirmPassword}
//                   onChange={(event) => setConfirmPassword(event.target.value)}
//                   placeholder="••••••••"
//                   className={`${inputClass} px-4`}
//                 />
//               </div>
//             )}

//             {message && (
//               <p
//                 role="status"
//                 aria-live="polite"
//                 className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900"
//               >
//                 {message}
//               </p>
//             )}

//             <button
//               type="submit"
//               className="flex h-[50px] w-full items-center justify-center rounded-xl bg-[#061A37] px-5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#0B2B50] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#061A37]/15 active:scale-[0.99]"
//             >
//               {isLogin ? t.login : t.signup}
//             </button>
//           </form>

//           {/* Login / signup switch */}
//           <div className="mt-7 border-t border-slate-100 pt-6 text-center">
//             <p className="text-xs text-slate-500">
//               {isLogin ? t.noAccount : t.hasAccount}{" "}
//               <Link
//                 href={`/${locale}/${isLogin ? "signup" : "login"}`}
//                 className="font-semibold text-[#A87523] hover:text-[#061A37] hover:underline"
//               >
//                 {isLogin ? t.signupLink : t.loginLink}
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";

type AuthFormProps = {
  locale: Locale;
  mode: "login" | "signup";
};

const content = {
  en: {
    loginTitle: "Welcome back",
    signupTitle: "Create your account",
    loginSubtitle: "Sign in to continue to your UBH store account.",
    signupSubtitle: "Join UBH for a better shopping experience.",
    name: "Full name",
    email: "Email address",
    password: "Password",
    confirmPassword: "Confirm password",
    forgot: "Forgot password?",
    login: "Sign in",
    signup: "Create account",
    noAccount: "New to UBH?",
    hasAccount: "Already have an account?",
    loginLink: "Sign in",
    signupLink: "Create an account",
    passwordMismatch: "Your passwords do not match.",
    demoNotice:
      "Demo mode: Authentication is not connected yet. No account was created.",
    passwordHint: "At least 8 characters.",
    showPassword: "Show password",
    hidePassword: "Hide password",
  },
  ar: {
    loginTitle: "مرحباً بعودتك",
    signupTitle: "إنشاء حساب جديد",
    loginSubtitle: "سجّل الدخول للمتابعة إلى حسابك في متجر UBH.",
    signupSubtitle: "انضم إلينا واستمتع بتجربة تسوق أفضل.",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    forgot: "نسيت كلمة المرور؟",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    noAccount: "جديد في UBH؟",
    hasAccount: "لديك حساب بالفعل؟",
    loginLink: "تسجيل الدخول",
    signupLink: "إنشاء حساب",
    passwordMismatch: "كلمتا المرور غير متطابقتين.",
    demoNotice: "الوضع التجريبي: المصادقة غير متصلة حالياً.",
    passwordHint: "8 أحرف على الأقل.",
    showPassword: "إظهار كلمة المرور",
    hidePassword: "إخفاء كلمة المرور",
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

    setMessage(t.demoNotice);
  }

  const inputClass =
    "h-12 w-full rounded-lg border border-slate-200 bg-white text-sm text-[#102B4E] outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#B8822C] focus:ring-3 focus:ring-[#B8822C]/10";

  const iconClass =
    "absolute top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-slate-400";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="flex min-h-[calc(100vh-76px)] items-start justify-center bg-[#FAFBFD] px-4 py-10 sm:py-14"
    >
      <div className="w-full max-w-[420px]">
        <div className="rounded-xl border border-slate-200/80 bg-white px-5 py-7 shadow-[0_8px_30px_-20px_rgba(6,26,55,0.22)] sm:px-9 sm:py-9">

          {/* Heading */}
          <div className="mb-7">
            <div className="mb-4 h-[3px] w-9 rounded-full bg-[#C89438]" />

            <h1 className="font-serif text-[27px] font-semibold tracking-tight text-[#061A37]">
              {isLogin ? t.loginTitle : t.signupTitle}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {isLogin ? t.loginSubtitle : t.signupSubtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {!isLogin && (
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-xs font-semibold text-[#263D59]"
                >
                  {t.name}
                </label>

                <div className="relative">
                  <UserRound
                    className={`${iconClass} ${isArabic ? "right-3.5" : "left-3.5"}`}
                  />
                  <input
                    id="fullName"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    placeholder={t.name}
                    className={`${inputClass} ${isArabic ? "pr-10 pl-3" : "pl-10 pr-3"}`}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold text-[#263D59]"
              >
                {t.email}
              </label>

              <div className="relative">
                <Mail
                  className={`${iconClass} ${isArabic ? "right-3.5" : "left-3.5"}`}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className={`${inputClass} ${isArabic ? "pr-10 pl-3" : "pl-10 pr-3"}`}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-[#263D59]"
                >
                  {t.password}
                </label>

                {isLogin && (
                  <Link
                    href={`/${locale}/forgot-password`}
                    className="text-xs font-medium text-[#A87523] transition hover:text-[#061A37] hover:underline"
                  >
                    {t.forgot}
                  </Link>
                )}
              </div>

              <div className="relative">
                <LockKeyhole
                  className={`${iconClass} ${isArabic ? "right-3.5" : "left-3.5"}`}
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className={`${inputClass} ${isArabic ? "pr-10 pl-11" : "pl-10 pr-11"}`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? t.hidePassword : t.showPassword}
                  className={`absolute top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 transition hover:text-[#061A37] ${isArabic ? "left-3" : "right-3"}`}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {!isLogin && (
                <p className="mt-2 text-[11px] text-slate-400">
                  {t.passwordHint}
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-semibold text-[#263D59]"
                >
                  {t.confirmPassword}
                </label>

                <div className="relative">
                  <LockKeyhole
                    className={`${iconClass} ${isArabic ? "right-3.5" : "left-3.5"}`}
                  />
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
                    className={`${inputClass} ${isArabic ? "pr-10 pl-3" : "pl-10 pr-3"}`}
                  />
                </div>
              </div>
            )}

            {message && (
              <p
                role="status"
                aria-live="polite"
                className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-lg bg-[#061A37] px-5 text-sm font-semibold text-white transition duration-200 hover:bg-[#0B2B50] focus:outline-none focus:ring-4 focus:ring-[#061A37]/15 active:scale-[0.99]"
            >
              {isLogin ? t.login : t.signup}
            </button>
          </form>

          {/* Account switch */}
          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <p className="text-xs text-slate-500">
              {isLogin ? t.noAccount : t.hasAccount}{" "}
              <Link
                href={`/${locale}/${isLogin ? "signup" : "login"}`}
                className="font-semibold text-[#A87523] transition hover:text-[#061A37] hover:underline"
              >
                {isLogin ? t.signupLink : t.loginLink}
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-[11px] text-slate-400">
          University Book House · UBH Store
        </p>
      </div>
    </main>
  );
}
