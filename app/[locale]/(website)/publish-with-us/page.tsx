import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/lib/i18n";

import { PublishWithUsForm } from "@/components/shared/publishing/PublishWithUsForm";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return { title: "Publish with Us | UBH" };
  }

  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? "انشر كتابك معنا | دار الكتب الجامعية"
      : "Publish with Us | University Book House",
    description: isArabic
      ? "تقدم بمقترح كتابك إلى دار الكتب الجامعية واستكشف فرص النشر الأكاديمي."
      : "Submit your book proposal to University Book House and explore academic publishing opportunities.",
    alternates: {
      languages: {
        en: "/en/publish-with-us",
        ar: "/ar/publish-with-us",
      },
    },
  };
}

export default async function PublishWithUsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const ar = locale === "ar";

  const opportunities = ar
    ? [
        {
          title: "الكتب الأكاديمية",
          description: "مراجع متخصصة تسهم في دعم المعرفة والبحث العلمي.",
        },
        {
          title: "الكتب الدراسية",
          description: "محتوى تعليمي يخدم الطلبة وأعضاء هيئة التدريس.",
        },
        {
          title: "الكتب المرجعية والمهنية",
          description: "مصادر عملية للمتخصصين والمهنيين.",
        },
        {
          title: "المنشورات الأخرى",
          description: "أفكار ومشروعات نشر مناسبة للمجالات الأكاديمية.",
        },
      ]
    : [
        {
          title: "Academic Books",
          description:
            "Scholarly titles that support learning, research, and knowledge.",
        },
        {
          title: "Textbooks",
          description:
            "Educational content for students, educators, and institutions.",
        },
        {
          title: "Reference & Professional Books",
          description:
            "Specialist resources for professional and academic audiences.",
        },
        {
          title: "Other Publications",
          description:
            "Publishing proposals relevant to academic and educational fields.",
        },
      ];

  return (
    <main dir={ar ? "rtl" : "ltr"} className="bg-ubh-canvas text-ubh-navy">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ubh-navy">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-ubh-gold/15 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-24">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-ubh-gold-light">
              {ar ? "شراكات النشر" : "Publishing Partnerships"}
            </p>

            <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {ar
                ? "انشر كتابك مع دار الكتب الجامعية"
                : "Publish Your Book with University Book House"}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              {ar
                ? "شاركنا مشروعك في مجال النشر الأكاديمي والتعليمي. أرسل مقترح كتابك ومعلوماته الأساسية ليتمكن فريقنا من مراجعته."
                : "Have an academic or educational book project? Share your proposal and essential details with our team for consideration."}
            </p>

            <a
              href="#proposal-form"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-ubh-gold px-6 py-3 text-sm font-bold text-ubh-navy transition-colors hover:bg-ubh-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy"
            >
              {ar ? "تقديم مقترح كتاب" : "Submit a Book Proposal"}
            </a>

            <p className="mt-4 text-xs text-white/55">
              {ar
                ? "يرجى تجهيز فهرس الكتاب والسيرة الذاتية للمؤلف."
                : "Please prepare your table of contents and author CV."}
            </p>
          </div>

          <div className="hidden lg:flex lg:justify-center">
            <div className="relative flex aspect-square w-full max-w-[360px] items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
              <div className="absolute inset-7 rounded-full border border-ubh-gold/30" />
              <div className="absolute inset-14 rounded-full border border-white/10" />
              <div className="relative flex h-44 w-36 -rotate-6 flex-col justify-between rounded-r-md rounded-l-sm border-l-4 border-ubh-gold-light bg-[#f7f3eb] p-5 shadow-2xl">
                <div>
                  <div className="h-1 w-12 bg-ubh-gold" />
                  <div className="mt-4 h-2 w-full bg-ubh-navy/80" />
                  <div className="mt-2 h-1.5 w-4/5 bg-ubh-navy/30" />
                  <div className="mt-2 h-1.5 w-3/5 bg-ubh-navy/30" />
                </div>
                <div className="flex justify-left">
                  <Image
                    src="/images/logo/logo.png"
                    alt="University Book House logo"
                    width={50}
                    height={50}
                    className="h-8 w-8 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publishing opportunities */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b5822e]">
            {ar ? "مجالات النشر" : "Publishing Opportunities"}
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {ar ? "ما نوع كتابك؟" : "What Are You Publishing?"}
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            {ar
              ? "نرحب بمقترحات الكتب في مختلف المجالات الأكاديمية والتعليمية والمهنية."
              : "We welcome proposals across academic, educational, and professional subject areas."}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {opportunities.map((item, index) => (
            <article
              key={item.title}
              className="rounded-xl border border-slate-200/80 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ubh-gold/60 hover:shadow-lg hover:shadow-ubh-navy/5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ubh-navy text-sm font-semibold text-ubh-gold-light">
                0{index + 1}
              </span>

              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Proposal form */}
      <section
        id="proposal-form"
        className="scroll-mt-8 border-t border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b5822e]">
              {ar ? "ابدأ رحلتك معنا" : "Start Your Publishing Journey"}
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              {ar ? "مقترح الكتاب" : "Book Proposal"}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              {ar
                ? "أكمل البيانات أدناه. الحقول التي تحمل علامة النجمة مطلوبة."
                : "Complete the details below. Fields marked with an asterisk are required."}
            </p>
          </div>

          <div className="mt-8">
            <PublishWithUsForm locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}
