
"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

const inputClass =
  "mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-ubh-navy outline-none transition placeholder:text-slate-400 focus:border-ubh-gold focus:ring-2 focus:ring-ubh-gold/15";

const labelClass = "block text-sm font-semibold text-ubh-navy";

export function PublishWithUsForm({ locale }: Props) {
  const ar = locale === "ar";
  const [notice, setNotice] = useState("");

  const text = {
    name: ar ? "الاسم الكامل" : "Full Name",
    position: ar ? "المسمى الوظيفي" : "Job Position",
    phone: ar ? "رقم الهاتف" : "Phone Number",
    email: ar ? "البريد الإلكتروني" : "Email Address",
    company: ar ? "الشركة أو المؤسسة" : "Company or Institution",
    book: ar ? "عنوان الكتاب" : "Book Title",
    type: ar ? "نوع المنشور" : "Publication Type",
    publishing: ar ? "طريقة النشر المفضلة" : "Preferred Publishing Option",
    toc: ar ? "فهرس المحتويات" : "Table of Contents",
    description: ar ? "نبذة عن الكتاب" : "Brief Book Description",
    author: ar ? "نبذة عن المؤلف" : "About the Author",
    cv: ar ? "السيرة الذاتية للمؤلف" : "Author CV",
    required: ar ? "مطلوب" : "Required",
    optional: ar ? "اختياري" : "Optional",
    submit: ar ? "إرسال مقترح الكتاب" : "Submit Book Proposal",
    note: ar
      ? "واجهة النموذج جاهزة، لكن إرسال المقترحات غير مفعّل بعد. لن يتم إرسال بياناتك أو ملفاتك."
      : "The form interface is ready, but proposal submission is not connected yet. Your information and files will not be sent.",
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(text.note);
  }

  return (
    <form
      onSubmit={handleSubmit}
      dir={ar ? "rtl" : "ltr"}
      className="rounded-2xl border border-slate-200 bg-ubh-canvas p-5 sm:p-8"
    >
      <div className="mb-8 border-b border-slate-200 pb-5">
        <h3 className="text-lg font-semibold">
          {ar ? "معلومات مقدم الطلب" : "Your Information"}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {ar
            ? "أخبرنا عنك وعن المؤسسة التي تمثلها."
            : "Tell us about yourself and the organization you represent."}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          {text.name} *
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            className={inputClass}
            placeholder={ar ? "الاسم الكامل" : "Enter your full name"}
          />
        </label>

        <label className={labelClass}>
          {text.position} *
          <input
            name="position"
            required
            maxLength={120}
            className={inputClass}
            placeholder={ar ? "المسمى الوظيفي" : "e.g. Author, Editor"}
          />
        </label>

        <label className={labelClass}>
          {text.email} *
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={254}
            className={inputClass}
            placeholder="name@example.com"
          />
        </label>

        <label className={labelClass}>
          {text.phone}
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            maxLength={30}
            className={inputClass}
            placeholder="+971"
          />
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          {text.company}
          <input
            name="company"
            autoComplete="organization"
            maxLength={180}
            className={inputClass}
            placeholder={ar ? "اسم المؤسسة" : "Organization name"}
          />
        </label>
      </div>

      <div className="mb-8 mt-10 border-b border-slate-200 pb-5">
        <h3 className="text-lg font-semibold">
          {ar ? "تفاصيل الكتاب" : "Book Details"}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {ar
            ? "شاركنا المعلومات الأساسية حول مشروعك."
            : "Share the essential information about your book project."}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={`${labelClass} sm:col-span-2`}>
          {text.book} *
          <input
            name="bookTitle"
            required
            maxLength={250}
            className={inputClass}
            placeholder={ar ? "عنوان الكتاب المقترح" : "Proposed book title"}
          />
        </label>

        <label className={labelClass}>
          {text.type} *
          <select name="publicationType" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              {ar ? "اختر النوع" : "Select publication type"}
            </option>
            <option value="textbook">{ar ? "كتاب دراسي" : "Textbook"}</option>
            <option value="academic">{ar ? "كتاب أكاديمي" : "Academic Book"}</option>
            <option value="reference">{ar ? "كتاب مرجعي" : "Reference Book"}</option>
            <option value="general">{ar ? "كتاب عام" : "General Book"}</option>
            <option value="other">{ar ? "أخرى" : "Other"}</option>
          </select>
        </label>

        <label className={labelClass}>
          {text.publishing} *
          <select name="publishingOption" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              {ar ? "اختر طريقة النشر" : "Select an option"}
            </option>
            <option value="ubh">
              {ar ? "النشر مع دار الكتب الجامعية" : "Publish with UBH"}
            </option>
            <option value="self">
              {ar ? "النشر الذاتي" : "Self-publish"}
            </option>
            <option value="other">{ar ? "أخرى" : "Other"}</option>
          </select>
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          {text.description} *
          <textarea
            name="description"
            required
            minLength={20}
            maxLength={5000}
            rows={5}
            className={inputClass}
            placeholder={
              ar
                ? "موضوع الكتاب والجمهور المستهدف وأهدافه..."
                : "Describe the subject, intended audience, and purpose of your book..."
            }
          />
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          {text.author} *
          <textarea
            name="authorBiography"
            required
            minLength={10}
            maxLength={3000}
            rows={4}
            className={inputClass}
            placeholder={
              ar
                ? "الخبرات الأكاديمية والمهنية للمؤلف..."
                : "Summarize the author's academic and professional background..."
            }
          />
        </label>
      </div>

      <div className="mb-8 mt-10 border-b border-slate-200 pb-5">
        <h3 className="text-lg font-semibold">
          {ar ? "المستندات المطلوبة" : "Supporting Documents"}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {ar
            ? "جهّز فهرس المحتويات والسيرة الذاتية للمؤلف."
            : "Prepare the table of contents and the author's CV."}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          {text.toc} *
          <input
            type="file"
            name="tableOfContents"
            required
            accept=".pdf,.doc,.docx"
            className={`${inputClass} file:me-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-semibold`}
          />
          <span className="mt-2 block text-xs font-normal text-slate-500">
            {ar ? "PDF أو Word" : "PDF or Word document"}
          </span>
        </label>

        <label className={labelClass}>
          {text.cv} *
          <input
            type="file"
            name="authorCv"
            required
            accept=".pdf,.doc,.docx"
            className={`${inputClass} file:me-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-semibold`}
          />
          <span className="mt-2 block text-xs font-normal text-slate-500">
            {ar ? "PDF أو Word" : "PDF or Word document"}
          </span>
        </label>
      </div>
{/* 
      <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        {text.note}
      </div> */}

      {notice && (
        <p role="status" aria-live="polite" className="mt-4 text-sm text-slate-700">
          {notice}
        </p>
      )}

      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-ubh-navy px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0b3267] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2 sm:w-auto"
      >
        {text.submit}
      </button>
    </form>
  );
}
