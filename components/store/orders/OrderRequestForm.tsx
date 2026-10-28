"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Locale = "en" | "ar";
type RequestType = "cancel" | "return";

export function OrderRequestForm({
  locale,
  orderId,
  type,
}: {
  locale: Locale;
  orderId: string;
  type: RequestType;
}) {
  const isArabic = locale === "ar";
  const router = useRouter();

  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isCancel = type === "cancel";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!reason) {
      setError(
        isArabic ? "يرجى اختيار السبب." : "Please select a reason."
      );
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `/api/shop/orders/${encodeURIComponent(orderId)}/${type}`,
        {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason, details }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            (isArabic
              ? "تعذر إرسال الطلب."
              : "Unable to submit your request.")
        );
      }

      setSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : isArabic
            ? "حدث خطأ غير متوقع."
            : "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const reasons = isCancel
    ? [
        ["changed_mind", "I changed my mind", "غيرت رأيي"],
        ["wrong_item", "I ordered the wrong item", "طلبت منتجًا خاطئًا"],
        ["duplicate", "Duplicate order", "طلب مكرر"],
        ["other", "Other", "سبب آخر"],
      ]
    : [
        ["damaged", "Book arrived damaged", "وصل الكتاب تالفًا"],
        ["wrong_item", "Wrong item received", "استلمت منتجًا خاطئًا"],
        ["missing_item", "Item missing from order", "منتج مفقود من الطلب"],
        ["other", "Other", "سبب آخر"],
      ];

  if (success) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
      >
        <h2 className="text-lg font-semibold text-emerald-900">
          {isArabic ? "تم إرسال طلبك" : "Request submitted"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-emerald-800">
          {isArabic
            ? "تم استلام طلبك. يمكنك متابعة حالته من حسابك."
            : "Your request has been received. You can check its status from your account."}
        </p>
        <button
          onClick={() => router.push(`/${locale}/profile/orders/${orderId}`)}
          className="mt-5 rounded-xl bg-ubh-navy px-5 py-3 text-sm font-semibold text-white"
        >
          {isArabic ? "العودة إلى الطلب" : "Return to order"}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
    >
      <div>
        <h2 className="text-xl font-semibold text-ubh-navy">
          {isCancel
            ? isArabic
              ? "سبب الإلغاء"
              : "Cancellation reason"
            : isArabic
              ? "سبب الإرجاع"
              : "Return reason"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {isCancel
            ? isArabic
              ? "سيتم التحقق من أهلية الطلب للإلغاء قبل اتخاذ أي إجراء."
              : "Your order's cancellation eligibility will be checked before any action is taken."
            : isArabic
              ? "سيتم مراجعة طلب الإرجاع وفقًا لسياسة الإرجاع."
              : "Your request will be reviewed according to the return policy."}
        </p>
      </div>

      <fieldset className="space-y-3">
        <legend className="mb-3 text-sm font-semibold text-slate-700">
          {isArabic ? "اختر السبب" : "Select a reason"}
        </legend>

        {reasons.map(([value, english, arabic]) => (
          <label
            key={value}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
          >
            <input
              type="radio"
              name="reason"
              value={value}
              checked={reason === value}
              onChange={() => setReason(value)}
              required
            />
            <span className="text-sm text-slate-700">
              {isArabic ? arabic : english}
            </span>
          </label>
        ))}
      </fieldset>

      <div>
        <label
          htmlFor="request-details"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {isArabic
            ? "تفاصيل إضافية (اختياري)"
            : "Additional details (optional)"}
        </label>
        <textarea
          id="request-details"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          maxLength={1000}
          rows={4}
          className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-ubh-blue-bright focus:ring-2 focus:ring-ubh-blue-bright/15"
          placeholder={
            isArabic
              ? "أضف أي معلومات تساعدنا في مراجعة طلبك."
              : "Add any information that may help us review your request."
          }
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || !reason}
        className="w-full rounded-xl bg-ubh-navy px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-ubh-blue-bright disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting
          ? isArabic
            ? "جارٍ الإرسال..."
            : "Submitting..."
          : isCancel
            ? isArabic
              ? "إرسال طلب الإلغاء"
              : "Submit cancellation request"
            : isArabic
              ? "إرسال طلب الإرجاع"
              : "Submit return request"}
      </button>
    </form>
  );
}