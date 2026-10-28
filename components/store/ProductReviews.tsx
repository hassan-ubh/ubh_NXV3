
"use client";

import { useState } from "react";
import { Star, MessageSquareText } from "lucide-react";

type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
};

type ProductReviewsProps = {
  locale: "en" | "ar";
  reviews?: Review[];
  demo?: boolean;
};

const demoReviews: Review[] = [
  {
    id: "demo-1",
    name: "Academic reader",
    rating: 5,
    date: "Demo review",
    title: "Clear and useful reference",
    comment:
      "Sample review for preview purposes. Replace this with verified customer feedback when the review backend is available.",
  },
  {
    id: "demo-2",
    name: "University student",
    rating: 4,
    date: "Demo review",
    title: "Helpful for studying",
    comment:
      "This is placeholder content to demonstrate how a customer review will appear. It is not a verified purchase or real customer review.",
  },
];

function RatingStars({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <span
      className="inline-flex items-center gap-0.5 text-ubh-gold"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={star <= rating ? "currentColor" : "none"}
          strokeWidth={1.7}
        />
      ))}
    </span>
  );
}

export function ProductReviews({
  locale,
  reviews,
  demo = false,
}: ProductReviewsProps) {
  const isArabic = locale === "ar";
  const [formOpen, setFormOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [notice, setNotice] = useState(false);

  // An empty real review list must not fall back to demo reviews.
  const items = reviews ?? (demo ? demoReviews : []);
  const count = items.length;
  const average = count
    ? items.reduce((sum, review) => sum + review.rating, 0) / count
    : 0;

  const text = {
    heading: isArabic ? "تقييمات العملاء" : "Customer reviews",
    subtitle: isArabic
      ? "آراء القراء حول هذا الكتاب"
      : "What readers say about this book",
    noReviews: isArabic
      ? "لا توجد تقييمات لهذا الكتاب بعد."
      : "There are no reviews for this book yet.",
    leaveReview: isArabic ? "أضف تقييماً" : "Write a review",
    yourRating: isArabic ? "تقييمك" : "Your rating",
    name: isArabic ? "الاسم" : "Your name",
    title: isArabic ? "عنوان التقييم" : "Review title",
    comment: isArabic ? "اكتب تقييمك" : "Your review",
    submit: isArabic ? "إرسال التقييم" : "Submit review",
    cancel: isArabic ? "إلغاء" : "Cancel",
    demoNotice: isArabic
      ? "هذه بيانات تجريبية وليست تقييمات حقيقية."
      : "Demo content only — these are not real customer reviews.",
    pending: isArabic
      ? "نموذج التقييم تجريبي حالياً. لن يتم حفظ التقييم حتى ربط النظام الخلفي."
      : "The review form is a demo. Your review has not been saved. Connect a backend to enable submissions.",
  };

  return (
    <section
      id="product-reviews"
      className="scroll-mt-24 rounded-2xl border border-ubh-border bg-white p-5 sm:p-8"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ubh-gold">
            {isArabic ? "آراء القراء" : "READER FEEDBACK"}
          </p>
          <h2 className="mt-2 font-serif text-2xl text-ubh-blue">
            {text.heading}
          </h2>
          <p className="mt-2 text-sm text-ubh-muted">{text.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormOpen((value) => !value);
            setNotice(false);
          }}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-ubh-border px-4 py-2 text-sm font-semibold text-ubh-blue transition hover:border-ubh-gold"
        >
          <MessageSquareText size={17} />
          {text.leaveReview}
        </button>
      </div>

      {demo && (
        <p className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-900">
          {text.demoNotice}
        </p>
      )}

      <div className="mt-7 grid gap-6 border-b border-[#edf1f5] pb-7 sm:grid-cols-[160px_1fr]">
        <div>
          <p className="text-5xl font-semibold tracking-tight text-ubh-blue">
            {count ? average.toFixed(1) : "—"}
          </p>
          <div className="mt-3">
            <RatingStars rating={Math.round(average)} />
          </div>
          <p className="mt-2 text-xs text-ubh-muted">
            {count} {isArabic ? "تقييمات" : "reviews"}
          </p>
        </div>

        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((stars) => {
            const total = items.filter(
              (review) => review.rating === stars,
            ).length;
            const percentage = count ? (total / count) * 100 : 0;

            return (
              <div
                key={stars}
                className="grid grid-cols-[42px_1fr_32px] items-center gap-3 text-xs"
              >
                <span className="text-ubh-blue-muted">
                  {stars} <span aria-hidden="true">★</span>
                </span>
                <div
                  className="h-2 overflow-hidden rounded-full bg-[#edf1f5]"
                  role="progressbar"
                  aria-label={`${stars} star reviews`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(percentage)}
                >
                  <div
                    className="h-full rounded-full bg-ubh-gold transition-[width]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-right text-ubh-muted">{total}</span>
              </div>
            );
          })}
        </div>
      </div>

      {formOpen && (
        <form
          className="mt-6 space-y-4 rounded-xl bg-[#f8fafc] p-4 sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            setNotice(true);
          }}
        >
          <h3 className="font-semibold text-ubh-blue">
            {text.leaveReview}
          </h3>

          <fieldset>
            <legend className="mb-2 text-sm text-ubh-blue-muted">
              {text.yourRating}
            </legend>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  aria-label={`${value} stars`}
                  aria-pressed={rating === value}
                  className="rounded p-1 text-ubh-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold"
                >
                  <Star
                    size={24}
                    fill={value <= rating ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block text-sm text-ubh-blue-muted">
            {text.name}
            <input
              required
              maxLength={100}
              className="mt-2 min-h-11 w-full rounded-lg border border-ubh-border bg-white px-3 text-sm outline-none focus:border-ubh-gold"
            />
          </label>

          <label className="block text-sm text-ubh-blue-muted">
            {text.title}
            <input
              required
              maxLength={150}
              className="mt-2 min-h-11 w-full rounded-lg border border-ubh-border bg-white px-3 text-sm outline-none focus:border-ubh-gold"
            />
          </label>

          <label className="block text-sm text-ubh-blue-muted">
            {text.comment}
            <textarea
              required
              maxLength={3000}
              rows={4}
              className="mt-2 w-full rounded-lg border border-ubh-border bg-white p-3 text-sm outline-none focus:border-ubh-gold"
            />
          </label>

          {notice && (
            <p role="status" className="text-sm leading-6 text-amber-800">
              {text.pending}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="min-h-11 rounded-lg bg-ubh-blue px-5 text-sm font-semibold text-white hover:bg-ubh-blue-deep"
            >
              {text.submit}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormOpen(false);
                setNotice(false);
              }}
              className="min-h-11 rounded-lg px-4 text-sm font-semibold text-ubh-blue-muted hover:bg-white"
            >
              {text.cancel}
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 space-y-5">
        {items.length === 0 ? (
          <p className="rounded-lg bg-[#f8fafc] p-5 text-sm text-ubh-muted">
            {text.noReviews}
          </p>
        ) : (
          items.map((review) => (
            <article
              key={review.id}
              className="border-b border-[#edf1f5] pb-5 last:border-0 last:pb-0"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-ubh-blue">
                  {review.title}
                </h3>
                <RatingStars rating={review.rating} size={14} />
              </div>

              <p className="mt-2 text-xs text-ubh-muted">
                {review.name} · {review.date}
              </p>

              <p className="mt-3 text-sm leading-7 text-ubh-blue-muted">
                {review.comment}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
