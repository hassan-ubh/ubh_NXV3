
// "use client";

// import { Star } from "lucide-react";
// import type { Locale } from "@/lib/i18n";

// type Review = {
//   id: string;
//   name: string;
//   rating: number;
//   date: string;
//   title: string;
//   comment: string;
// };

// type ProductReviewsProps = {
//   locale: Locale;
//   productId: string;
// };

// const sampleReviews: Review[] = [
//   {
//     id: "1",
//     name: "Academic Reader",
//     rating: 5,
//     date: "2026-10-12",
//     title: "Excellent academic reference",
//     comment:
//       "A useful reference with clear explanations and well-organized content.",
//   },
//   {
//     id: "2",
//     name: "University Student",
//     rating: 4,
//     date: "2026-09-28",
//     title: "Very helpful for studying",
//     comment:
//       "The material is comprehensive and useful for understanding the subject.",
//   },
//   {
//     id: "3",
//     name: "Research Reader",
//     rating: 5,
//     date: "2026-09-10",
//     title: "A valuable addition",
//     comment:
//       "Good quality content. I would recommend this book for further reading.",
//   },
// ];

// export function ProductReviews({
//   locale,
//   productId,
// }: ProductReviewsProps) {
//   const isArabic = locale === "ar";

//   // Replace sample data with product-specific review data later.
//   const reviews = sampleReviews;

//   const averageRating =
//     reviews.reduce((sum, review) => sum + review.rating, 0) /
//     reviews.length;

//   const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
//     rating,
//     count: reviews.filter((review) => review.rating === rating).length,
//   }));

//   return (
//     <section
//       id="product-reviews"
//       dir={isArabic ? "rtl" : "ltr"}
//       aria-labelledby="reviews-heading"
//       className="border-t border-slate-200 pt-8"
//     >
//       <div className="flex flex-wrap items-end justify-between gap-4">
//         <div>
//           <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#b8822c]">
//             {isArabic ? "آراء القراء" : "READER FEEDBACK"}
//           </p>

//           <h2
//             id="reviews-heading"
//             className="mt-2 text-xl font-semibold text-[#102b4e]"
//           >
//             {isArabic ? "تقييمات الكتاب" : "Customer reviews"}
//           </h2>
//         </div>

//         <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-medium text-amber-800">
//           {isArabic ? "تقييمات تجريبية" : "Sample reviews"}
//         </span>
//       </div>

//       {/* Rating summary */}
//       <div className="mt-6 grid gap-6 rounded-xl border border-slate-200 bg-[#fafbfd] p-5 sm:grid-cols-[150px_1fr]">
//         <div className="flex flex-col items-center justify-center">
//           <span className="text-4xl font-bold text-[#102b4e]">
//             {averageRating.toFixed(1)}
//           </span>

//           <div className="mt-2 flex text-[#c89438]">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <Star
//                 key={i}
//                 size={16}
//                 fill={i < Math.round(averageRating) ? "currentColor" : "none"}
//               />
//             ))}
//           </div>

//           <p className="mt-2 text-xs text-slate-500">
//             {reviews.length} {isArabic ? "تقييمات تجريبية" : "sample reviews"}
//           </p>
//         </div>

//         <div className="space-y-2">
//           {ratingCounts.map(({ rating, count }) => (
//             <div
//               key={rating}
//               className="flex items-center gap-3 text-xs"
//             >
//               <span className="flex w-8 items-center gap-1 text-slate-600">
//                 {rating}
//                 <Star size={12} fill="currentColor" className="text-[#c89438]" />
//               </span>

//               <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
//                 <div
//                   className="h-full rounded-full bg-[#c89438]"
//                   style={{
//                     width: `${(count / reviews.length) * 100}%`,
//                   }}
//                 />
//               </div>

//               <span className="w-5 text-end text-slate-500">
//                 {count}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Review cards */}
//       <div className="mt-5 space-y-4">
//         {reviews.map((review) => (
//           <article
//             key={`${productId}-${review.id}`}
//             className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
//           >
//             <div className="flex flex-wrap items-center justify-between gap-3">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f0e8] text-sm font-bold text-[#8b641f]">
//                   {review.name.charAt(0)}
//                 </div>

//                 <div>
//                   <p className="text-sm font-semibold text-[#102b4e]">
//                     {review.name}
//                   </p>

//                   <p className="text-[11px] text-slate-400">
//                     {review.date}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex text-[#c89438]">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star
//                     key={i}
//                     size={14}
//                     fill={i < review.rating ? "currentColor" : "none"}
//                   />
//                 ))}
//               </div>
//             </div>

//             <h3 className="mt-4 text-sm font-semibold text-[#102b4e]">
//               {review.title}
//             </h3>

//             <p className="mt-2 text-sm leading-7 text-slate-600">
//               {review.comment}
//             </p>
//           </article>
//         ))}
//       </div>

//       <p className="mt-4 text-[11px] leading-5 text-slate-400">
//         {isArabic
//           ? "هذه التقييمات توضيحية وليست تقييمات حقيقية من العملاء."
//           : "These are illustrative sample reviews, not actual customer feedback."}
//       </p>
//     </section>
//   );
// }


"use client";

import { useState } from "react";
import { Star, MessageSquare, Send } from "lucide-react";

type Locale = "en" | "ar";

type Review = {
  id: number;
  name: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
};

type ProductReviewsProps = {
  locale: Locale;
  productId: string;
};

const sampleReviews: Review[] = [
  {
    id: 1,
    name: "Ahmed M.",
    date: "Nov 12, 2026",
    rating: 5,
    title: "Excellent academic reference",
    comment:
      "A very useful reference for students and professionals. The content is well structured and easy to follow.",
  },
  {
    id: 2,
    name: "Sarah K.",
    date: "Nov 08, 2026",
    rating: 4,
    title: "Well organised and informative",
    comment:
      "The book covers the topics in a clear and practical way. I would recommend it to anyone studying this subject.",
  },
  {
    id: 3,
    name: "Mohammed A.",
    date: "Oct 29, 2026",
    rating: 5,
    title: "Worth having",
    comment:
      "Good quality publication with valuable information and useful explanations.",
  },
];

function Stars({
  rating,
  interactive = false,
  onChange,
  size = 16,
}: {
  rating: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          aria-label={`${star} stars`}
          className={
            interactive
              ? "cursor-pointer transition-transform hover:scale-110"
              : "cursor-default"
          }
        >
          <Star
            size={size}
            className={
              star <= rating
                ? "fill-[#C89A48] text-[#C89A48]"
                : "fill-transparent text-slate-300"
            }
          />
        </button>
      ))}
    </div>
  );
}

export function ProductReviews({
  locale,
  productId,
}: ProductReviewsProps) {
  const isArabic = locale === "ar";

  const [reviews, setReviews] = useState(sampleReviews);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      : 0;

  const distribution = [5, 4, 3, 2, 1].map((value) => ({
    rating: value,
    count: reviews.filter((review) => review.rating === value).length,
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rating || !name.trim() || !title.trim() || !comment.trim()) {
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      name: name.trim(),
      date: new Date().toLocaleDateString(
        isArabic ? "ar-AE" : "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      ),
      rating,
      title: title.trim(),
      comment: comment.trim(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setName("");
    setTitle("");
    setComment("");
    setRating(0);
    setSubmitted(true);
  };

  return (
    <section
      id="product-reviews"
      dir={isArabic ? "rtl" : "ltr"}
      className="mt-16 border-t border-slate-200 pt-12"
    >
      {/* Section heading */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[#C89A48]">
          <MessageSquare size={18} />
          <span className="text-xs font-semibold uppercase tracking-[0.16em]">
            {isArabic ? "آراء القراء" : "Reader feedback"}
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#061A37] sm:text-3xl">
          {isArabic ? "تقييمات الكتاب" : "Customer Reviews"}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {isArabic
            ? "شارك تجربتك وساعد القراء الآخرين."
            : "Share your experience and help other readers."}
        </p>
      </div>

      {/* Review summary and form */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">

        {/* Rating summary */}
        <div className="rounded-2xl border border-slate-200 bg-[#FAFBFC] p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-5xl font-semibold tracking-tight text-[#061A37]">
                {average.toFixed(1)}
              </p>

              <div className="mt-3">
                <Stars rating={Math.round(average)} size={18} />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                {reviews.length}{" "}
                {isArabic ? "تقييمات" : "reviews"}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {distribution.map(({ rating: value, count }) => (
              <div
                key={value}
                className="flex items-center gap-3 text-sm"
              >
                <span className="flex w-8 items-center gap-1 text-slate-500">
                  {value}
                  <Star
                    size={12}
                    className="fill-[#C89A48] text-[#C89A48]"
                  />
                </span>

                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-[#C89A48] transition-all"
                    style={{
                      width: `${
                        reviews.length
                          ? (count / reviews.length) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>

                <span className="w-6 text-end text-xs text-slate-400">
                  {count}
                </span>
              </div>
            ))}
          </div>

          {/* <p className="mt-6 border-t border-slate-200 pt-4 text-xs leading-6 text-slate-400">
            {isArabic
              ? "التقييمات المعروضة حالياً تجريبية."
              : "The reviews displayed are illustrative sample content."}
          </p> */}
        </div>

        {/* Review submission form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-[#061A37]">
            {isArabic ? "اكتب تقييمك" : "Write a Review"}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {isArabic
              ? "نود معرفة رأيك في هذا الكتاب."
              : "We would love to hear your thoughts about this book."}
          </p>

          {submitted && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {isArabic
                ? "تم إضافة تقييمك في العرض الحالي."
                : "Your review has been added to this page."}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Rating */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {isArabic ? "التقييم" : "Your rating"}
              </label>

              <Stars
                rating={rating}
                interactive
                onChange={(value) => {
                  setRating(value);
                  setSubmitted(false);
                }}
                size={24}
              />

              {!rating && (
                <p className="mt-2 text-xs text-slate-400">
                  {isArabic
                    ? "اختر عدد النجوم"
                    : "Select your star rating"}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {isArabic ? "الاسم" : "Your name"}
              </label>

              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSubmitted(false);
                }}
                required
                maxLength={80}
                placeholder={
                  isArabic ? "أدخل اسمك" : "Enter your name"
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C89A48] focus:ring-2 focus:ring-[#C89A48]/10"
              />
            </div>

            {/* Review title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {isArabic ? "عنوان التقييم" : "Review title"}
              </label>

              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSubmitted(false);
                }}
                required
                maxLength={120}
                placeholder={
                  isArabic
                    ? "عنوان مختصر"
                    : "Summarise your experience"
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C89A48] focus:ring-2 focus:ring-[#C89A48]/10"
              />
            </div>

            {/* Comment */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {isArabic ? "تعليقك" : "Your review"}
              </label>

              <textarea
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  setSubmitted(false);
                }}
                required
                minLength={10}
                maxLength={2000}
                rows={4}
                placeholder={
                  isArabic
                    ? "شارك تجربتك مع هذا الكتاب..."
                    : "Share your thoughts about this book..."
                }
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C89A48] focus:ring-2 focus:ring-[#C89A48]/10"
              />

              <p className="mt-1 text-end text-xs text-slate-400">
                {comment.length}/2000
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!rating}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#061A37] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0B2D56] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={15} />
              {isArabic ? "إرسال التقييم" : "Submit Review"}
            </button>

            {/* <p className="text-xs leading-5 text-slate-400">
              {isArabic
                ? "التقييمات المرسلة هنا تجريبية ولا يتم حفظها في قاعدة البيانات."
                : "Reviews submitted here are temporary and are not saved to a database."}
            </p> */}
          </form>
        </div>
      </div>

      {/* Reviews list */}
      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#061A37]">
            {isArabic ? "آراء القراء" : "Reader feedback"}
          </h3>

          <span className="text-xs text-slate-400">
            {reviews.length} {isArabic ? "تقييم" : "reviews"}
          </span>
        </div>

        <div className="divide-y divide-slate-200">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="py-6 first:pt-0"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#061A37] text-sm font-semibold text-white">
                  {review.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-[#061A37]">
                        {review.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {review.date}
                      </p>
                    </div>

                    <Stars rating={review.rating} size={14} />
                  </div>

                  <h4 className="mt-4 text-sm font-semibold text-slate-800">
                    {review.title}
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {review.comment}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
