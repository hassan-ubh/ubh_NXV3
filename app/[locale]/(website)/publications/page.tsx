import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/shared/Container";

import { isLocale } from "@/lib/i18n";

import { notFound } from "next/navigation";
import { products } from "@/lib/store/catalog";
import { resolveCategorySlug } from "@/lib/store/categories";

type Publication = {
  id: number;
  title: string;
  titleAr: string;
  author: string;
  authorAr: string;
  subject: string;
  subjectAr: string;
  year: string;
  isbn: string;
  cover: string;
  description: string;
  descriptionAr: string;
};

const publications = products
  .filter((product) => product.publisher === "University Book House")
  .slice(0, 4);

// const publications: Publication[] = [
//   {
//     id: 1,
//     title: "Digital Image Processing",
//     titleAr: "معالجة الصور الرقمية",
//     author: "Basil Al-Khatib",
//     authorAr: "أ.م باسل الخطيب",
//     subject: "Media & Information",
//     subjectAr: "الإعلام والمعلومات",
//     year: "2025",
//     isbn: "9789948752349",
//     cover:
//       "https://www.ubh.ae/web/image/product.template/64272/image_1920?unique=54984da",
//     description:
//       "An academic publication exploring digital image processing and its applications.",
//     descriptionAr:
//       "كتاب أكاديمي يتناول معالجة الصور الرقمية وتطبيقاتها المختلفة.",
//   },
//   {
//     id: 2,
//     title: "Marketing Public Relations: A Contemporary Vision",
//     titleAr: "العلاقات العامة التسويقية: رؤية معاصرة",
//     author: "Khalaf Kareem Kiyoush Al-Tamimi",
//     authorAr: "خلف كريم كيوش التميمي",
//     subject: "Media & Communication",
//     subjectAr: "الإعلام والاتصال",
//     year: "2025",
//     isbn: "9789948755913",
//     cover:
//       "https://www.ubh.ae/web/image/product.template/61393/image_1920?unique=35ec34a",
//     description:
//       "A contemporary academic work examining marketing public relations and modern communication practices.",
//     descriptionAr:
//       "كتاب أكاديمي معاصر يتناول العلاقات العامة التسويقية وممارسات الاتصال الحديثة.",
//   },
//   {
//     id: 3,
//     title: "Media Research Methodology",
//     titleAr: "منهجية البحث الإعلامي - دليل الباحث لكتابة الرسائل الجامعية",
//     author: "Saad Suleiman Al-Mashhadani",
//     authorAr: "أ. د. سعد سليمان المشهداني",
//     subject: "Media & Research",
//     subjectAr: "الإعلام والبحث العلمي",
//     year: "2024",
//     isbn: "9789948786924",
//     cover:
//       "https://www.ubh.ae/web/image/product.template/36869/image_1920?unique=03555e1",
//     description:
//       "A research guide designed to support students and researchers in preparing academic theses.",
//     descriptionAr:
//       "دليل للباحثين والطلاب لدعم إعداد الرسائل الجامعية والبحوث الأكاديمية.",
//   },
//   {
//     id: 4,
//     title: "Fundamentals of Inorganic Chemistry",
//     titleAr: "أساسيات الكيمياء غير العضوية",
//     author: "Abdul Razzaq Mohammed Jaafar",
//     authorAr: "د. عبد الرزاق محمد جعفر",
//     subject: "Chemistry",
//     subjectAr: "الكيمياء",
//     year: "2014",
//     isbn: "9786589091660",
//     cover:
//       "https://www.ubh.ae/web/image/product.template/15629/image_1920?unique=0f60843",
//     description:
//       "An academic reference covering fundamental concepts in inorganic chemistry.",
//     descriptionAr:
//       "مرجع أكاديمي يتناول المفاهيم الأساسية في الكيمياء غير العضوية.",
//   },
// ];

const subjects = [
  {
    en: "All Publications",
    ar: "جميع الإصدارات",
  },
  {
    en: "Medicine",
    ar: "الطب",
  },
  {
    en: "Education",
    ar: "التربية",
  },
  {
    en: "Psychology",
    ar: "علم النفس",
  },
  {
    en: "Law",
    ar: "القانون",
  },
  {
    en: "Media & Communication",
    ar: "الإعلام والاتصال",
  },
  {
    en: "Business",
    ar: "إدارة الأعمال",
  },
  {
    en: "Science",
    ar: "العلوم",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? "إصداراتنا | دار الكتاب الجامعي"
      : "Our Publications | University Book House",

    description: isArabic
      ? "اكتشف إصدارات دار الكتاب الجامعي من الكتب الأكاديمية في مختلف التخصصات."
      : "Explore University Book House publications across a wide range of academic disciplines.",
  };
}

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const isArabic = locale === "ar";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-ubh-canvas text-ubh-navy"
    >
      {/* ================================================================
          HERO
      ================================================================= */}
      {/* <section className="relative overflow-hidden bg-ubh-navy text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/publications/publications-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-ubh-navy via-ubh-navy/95 to-ubh-navy/65" />

        <Container className="relative py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ubh-gold-light/30 bg-ubh-gold-light/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#e5bd72]">
              {isArabic ? "دار الكتاب الجامعي" : "University Book House"}
            </div>

            <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {isArabic ? "إصداراتنا" : "Our Publications"}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              {isArabic
                ? "اكتشف مجموعة إصدارات دار الكتاب الجامعي من الكتب الأكاديمية والأعمال العلمية التي تخدم القراء والباحثين والطلاب في مختلف التخصصات."
                : "Discover publications from University Book House, bringing academic knowledge and locally authored works to readers, researchers and students across diverse disciplines."}
            </p>
          </div>
        </Container>
      </section> */}
      <section className=" about-reveal relative isolate overflow-hidden bg-ubh-navy text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/home/hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div
            className={`absolute inset-0 ${
              isArabic ? "bg-gradient-to-l" : "bg-gradient-to-r"
            } from-ubh-navy/95 via-ubh-navy/85 to-ubh-navy/55`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ubh-navy/40 to-transparent" />
        </div>

        <Container className="relative py-16 sm:py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-ubh-gold-light/30 bg-ubh-gold-light/10 px-4 py-2 text-xs font-semibold tracking-wide text-[#e5bd72] sm:text-sm">
              {isArabic ? "دار الكتاب الجامعي" : "University Book House"}
            </div>

            <h1 className="font-serif text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.12] tracking-tight [text-wrap:balance]">
              {isArabic ? "إصداراتنا" : "Our Publications"}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
              {isArabic
                ? "اكتشف مجموعة إصدارات دار الكتاب الجامعي من الكتب الأكاديمية والأعمال العلمية التي تخدم القراء والباحثين والطلاب في مختلف التخصصات."
                : "Discover publications from University Book House, bringing academic knowledge and locally authored works to readers, researchers and students across diverse disciplines."}
            </p>

            <Link
              href={`/${locale}/shop`}
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ubh-gold-light px-6 py-3 text-sm font-semibold text-ubh-navy transition-colors duration-300 hover:bg-[#e7c47f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy"
            >
              {isArabic ? "استكشف المتجر" : "Explore the Store"}
              <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ================================================================
          INTRO / STATS
      ================================================================= */}
      <section className="border-b border-ubh-border bg-white">
        <Container className="grid grid-cols-1 gap-0 py-5 sm:grid-cols-3 sm:py-8">
          {[
            {
              value: "1,000+",
              label: isArabic ? "إصدار" : "Publications",
            },
            {
              value: "300+",
              label: isArabic ? "مؤلف" : "Authors",
            },
            {
              value: "1986",
              label: isArabic ? "عام التأسيس" : "Established",
            },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`px-5 py-5 text-center transition-colors duration-200 hover:bg-ubh-canvas sm:py-4 ${
                index < 2 ? "border-b border-ubh-border sm:border-b-0" : ""
              } ${index > 0 ? "sm:border-s sm:border-ubh-border" : ""}`}
            >
              <p className="font-serif text-3xl font-semibold tracking-tight text-ubh-navy sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-ubh-blue-muted">{stat.label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* ================================================================
          FEATURED PUBLICATIONS
      ================================================================= */}
      <section className="bg-ubh-canvas py-16 sm:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ubh-gold-deep">
                {isArabic ? "مختارات" : "Featured"}
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
                {isArabic ? "إصدارات مميزة" : "Featured Publications"}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-ubh-blue-muted sm:text-base">
                {isArabic
                  ? "مجموعة مختارة من إصدارات دار الكتاب الجامعي في مجالات أكاديمية متنوعة."
                  : "A selection of University Book House publications across a range of academic fields."}
              </p>
            </div>

            <Link
              href={`/${locale}/shop`}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ubh-navy transition-colors hover:text-ubh-gold-deep"
            >
              {isArabic ? "زيارة المتجر" : "Visit Store"}
              <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {publications.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-ubh-gold/50 hover:shadow-xl"
              >
                <Link
                  href={`/${locale}/shop/${product.slug}`}
                  className="block overflow-hidden bg-gray-50 p-5"
                >
                  <div className="flex h-64 items-center justify-center">
                    <Image
                      src={product.cover || "/images/book-placeholder.png"}
                      alt={
                        locale === "ar"
                          ? product.titleAr || product.title
                          : product.title
                      }
                      width={300}
                      height={400}
                      className="h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ubh-gold-deep">
                    {product.publisher}
                  </p>

                  <Link href={`/${locale}/shop/${product.slug}`}>
                    <h3 className="line-clamp-2 min-h-12 font-semibold leading-6 text-ubh-navy transition-colors group-hover:text-ubh-gold-deep">
                      {locale === "ar"
                        ? product.titleAr || product.title
                        : product.title}
                    </h3>
                  </Link>

                  {product.isbn && (
                    <p className="mt-3 text-xs text-gray-500">
                      ISBN: {product.isbn}
                    </p>
                  )}

                  <Link
                    href={`/${locale}/shop/${product.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ubh-navy transition-colors hover:text-ubh-gold-deep"
                  >
                    {locale === "ar" ? "عرض الكتاب" : "View Book"}
                    <span aria-hidden="true">
                      {locale === "ar" ? "←" : "→"}
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          PUBLISHING STORY
      ================================================================= */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="group relative overflow-hidden rounded-3xl bg-ubh-navy">
              <Image
                src="/images/main_images/zoshua-colah-dXtE5M8lWgs-unsplash.webp"
                alt={
                  isArabic
                    ? "إصدارات دار الكتاب الجامعي"
                    : "University Book House publications"
                }
                width={1000}
                height={700}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ubh-gold-deep">
                {isArabic ? "مسيرة النشر" : "Our Publishing Journey"}
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                {isArabic
                  ? "المعرفة المحلية، برؤية عالمية"
                  : "Local Knowledge. Global Ambition."}
              </h2>

              <div className="mt-6 space-y-5 text-sm leading-8 text-ubh-blue-muted sm:text-base">
                <p>
                  {isArabic
                    ? "بدأت دار الكتاب الجامعي عام 1986، وتوسعت لاحقًا في مجال النشر من خلال التعاون مع مؤلفين محليين لنشر الكتب في مجالات متعددة."
                    : "Established in 1986, University Book House expanded into publishing by working with local authors to develop books across a wide range of disciplines."}
                </p>

                <p>
                  {isArabic
                    ? "تشمل خبرتنا الكتب الأكاديمية العربية والكتب التعليمية والأعمال المتخصصة، مع اهتمام خاص بالجودة والقيمة العلمية."
                    : "Our publishing experience includes Arabic academic books, educational titles and specialised works, with a strong focus on quality and academic value."}
                </p>
              </div>

              <Link
                href={`/${locale}/about-us`}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-ubh-navy px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0b2c58]"
              >
                {isArabic ? "تعرف علينا أكثر" : "Learn More About UBH"}
                <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SUBJECTS
      ================================================================= */}
      <section className="bg-[#f3f6f9] py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ubh-gold-deep">
              {isArabic ? "اكتشف حسب المجال" : "Explore by Subject"}
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              {isArabic ? "مجالاتنا" : "Academic Fields"}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-ubh-blue-muted sm:text-base">
              {isArabic
                ? "اكتشف الكتب والإصدارات في مجموعة متنوعة من المجالات الأكاديمية."
                : "Explore publications across a diverse range of academic disciplines."}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {subjects.slice(1).map((subject) => (
              <Link
                key={subject.en}
                href={`/${locale}/shop/products?collection=ubh?category=${resolveCategorySlug(subject.en)}`}
                className="group flex min-h-20 items-center justify-center rounded-xl border border-ubh-border bg-white p-4 text-center transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-ubh-gold-light hover:shadow-[0_12px_28px_rgba(6,26,55,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light focus-visible:ring-offset-2 sm:p-5"
              >
                <span className="text-sm font-semibold text-ubh-navy transition-colors group-hover:text-ubh-gold-deep">
                  {isArabic ? subject.ar : subject.en}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          PUBLISH WITH US CTA
      ================================================================= */}
      <section className="bg-ubh-navy py-16 text-white sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#e5bd72]">
              {isArabic ? "للمؤلفين والباحثين" : "For Authors & Researchers"}
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              {isArabic
                ? "هل لديك كتاب ترغب في نشره؟"
                : "Have a book you would like to publish?"}
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">
              {isArabic
                ? "شارك مشروعك العلمي مع دار الكتاب الجامعي واستكشف فرص النشر المتاحة."
                : "Share your academic work with University Book House and explore our publishing opportunities."}
            </p>

            <Link
              href={`/${locale}/publish-with-us`}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-ubh-gold-light px-7 py-3.5 text-sm font-semibold text-ubh-navy transition-all duration-200 hover:bg-[#e7c47f] hover:shadow-lg"
            >
              {isArabic ? "انشر كتابك معنا" : "Publish With Us"}
              <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ================================================================
          FOOTER
      ================================================================= */}
    </main>
  );
}
