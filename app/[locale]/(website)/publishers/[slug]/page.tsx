import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ExternalLink,
  MapPin,
  BookOpen,
  GraduationCap,
  Globe2,
} from "lucide-react";

import { copy, isLocale, type Locale } from "@/lib/i18n";

import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { BackButton } from "@/components/shared/BackButton";
import { ProductCard } from "@/components/store/StorePage";
import { products } from "@/lib/store/catalog";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { websiteBreadcrumbs } from "@/components/shared/breadcrumb-config";

/* -------------------------------------------------------------------------- */
/* Publisher Data                                                             */
/* -------------------------------------------------------------------------- */

type PublisherProfile = {
  name: string;
  logo: string;
  country: string;
  description: string;
  longDescription: string;
  subjects: string[];
  founded: string;
  website: string;
  booksCount: string;
};

const publishers: Record<string, PublisherProfile> = {
  "cambridge-university-press": {
    name: "Cambridge University Press",
    logo: "/images/publishers/cambridge-university-press-logo-vector.png",
    country: "United Kingdom",
    description:
      "A global leader in academic publishing, advancing knowledge and shaping a better tomorrow.",
    longDescription:
      "Cambridge University Press is a world-leading academic publisher with a long history of supporting research, education and learning. Its publications span a broad range of academic disciplines and are used by students, educators, researchers and institutions around the world.",
    subjects: [
      "Education",
      "Science",
      "Humanities",
      "Social Sciences",
      "Technology",
    ],
    founded: "1534",
    website: "https://www.cambridge.org/",
    booksCount: "1,000+",
  },

  "oxford-university-press": {
    name: "Oxford University Press",
    logo: "/images/publishers/oxford.svg",
    country: "United Kingdom",
    description:
      "Trusted for over 450 years, Oxford University Press publishes world-leading research and academic resources.",
    longDescription:
      "Oxford University Press is a major academic publisher producing research, educational resources, dictionaries and scholarly publications for learners, educators and researchers worldwide.",
    subjects: [
      "Humanities",
      "Science",
      "Education",
      "Social Sciences",
      "Medicine",
    ],
    founded: "1478",
    website: "https://global.oup.com/",
    booksCount: "1,000+",
  },

  springer: {
    name: "Springer Nature",
    logo: "/images/publishers/springer.png",
    country: "Germany",
    description:
      "Publishing high-quality research and innovative solutions for a better tomorrow.",
    longDescription:
      "Springer Nature is a global publisher serving researchers, educators and professionals through academic books, journals and digital research resources.",
    subjects: ["Science", "Technology", "Medicine", "Engineering", "Research"],
    founded: "2015",
    website: "https://www.springernature.com/",
    booksCount: "1,000+",
  },

  "mcgraw-hill": {
    name: "McGraw Hill",
    logo: "/images/publishers/mgh-logo.svg",
    country: "United States",
    description:
      "Empowering learners with trusted educational content and digital tools.",
    longDescription:
      "McGraw Hill develops educational content, learning solutions and digital resources designed to support students, educators and institutions.",
    subjects: [
      "Education",
      "Engineering",
      "Business",
      "Science",
      "Mathematics",
    ],
    founded: "1888",
    website: "https://www.mheducation.com/",
    booksCount: "1,000+",
  },

  pearson: {
    name: "Pearson",
    logo: "/images/publishers/pearson.png",
    country: "United Kingdom",
    description: "World-class learning solutions for every stage of life.",
    longDescription:
      "Pearson provides educational content, assessment and learning solutions supporting students, educators and institutions across a wide range of disciplines.",
    subjects: [
      "Education",
      "Business",
      "Science",
      "Technology",
      "Professional Studies",
    ],
    founded: "1844",
    website: "https://www.pearson.com/",
    booksCount: "1,000+",
  },

  wiley: {
    name: "Wiley",
    logo: "/images/publishers/Wiley_logo.svg",
    country: "United States",
    description:
      "Advancing knowledge and innovation through research, books and digital learning.",
    longDescription:
      "Wiley is a global academic publisher providing research publications, books and digital learning resources for students, researchers, educators and professionals.",
    subjects: ["Science", "Medicine", "Engineering", "Business", "Technology"],
    founded: "1807",
    website: "https://www.wiley.com/",
    booksCount: "1,000+",
  },

  elsevier: {
    name: "Elsevier",
    logo: "/images/publishers/elsevier-logo-orange.svg",
    country: "Netherlands",
    description:
      "Providing trusted information and tools to drive progress in science and healthcare.",
    longDescription:
      "Elsevier provides scientific, technical and medical information and research solutions used by researchers, healthcare professionals, educators and institutions.",
    subjects: [
      "Medicine",
      "Science",
      "Healthcare",
      "Engineering",
      "Technology",
    ],
    founded: "1880",
    website: "https://www.elsevier.com/",
    booksCount: "1,000+",
  },

  "taylor-francis": {
    name: "Taylor & Francis",
    logo: "/images/publishers/taylor-francis-group-seeklogo.svg",
    country: "United Kingdom",
    description:
      "Supporting research and learning with quality content and innovative solutions.",
    longDescription:
      "Taylor & Francis publishes academic books and journals across a broad range of disciplines, supporting research, teaching and professional learning.",
    subjects: [
      "Social Sciences",
      "Education",
      "Humanities",
      "Science",
      "Technology",
    ],
    founded: "1798",
    website: "https://taylorandfrancis.com/",
    booksCount: "1,000+",
  },

  cengage: {
    name: "Cengage",
    logo: "/images/publishers/cengage.png",
    country: "United States",
    description:
      "Creating technology-driven solutions for better learning outcomes.",
    longDescription:
      "Cengage provides educational content, digital learning platforms and resources designed to support students and instructors.",
    subjects: [
      "Education",
      "Business",
      "Technology",
      "Social Sciences",
      "Professional Studies",
    ],
    founded: "2007",
    website: "https://www.cengage.com/",
    booksCount: "1,000+",
  },

  brill: {
    name: "Brill",
    logo: "/images/publishers/brill.png",
    country: "Netherlands",
    description:
      "Bridging the past and future through exceptional research and academic publishing.",
    longDescription:
      "Brill is an international academic publisher specializing in scholarly publications across the humanities, social sciences, law and related disciplines.",
    subjects: ["Law", "Humanities", "Social Sciences", "History", "Languages"],
    founded: "1683",
    website: "https://brill.com/",
    booksCount: "1,000+",
  },

  bloomsbury: {
    name: "Bloomsbury",
    logo: "/images/publishers/bloomsbury.png",
    country: "United Kingdom",
    description: "Publishing for a creative, connected and curious world.",
    longDescription:
      "Bloomsbury publishes books and digital resources across academic, professional, educational and creative fields.",
    subjects: [
      "Literature",
      "Arts",
      "Education",
      "Humanities",
      "Social Sciences",
    ],
    founded: "1986",
    website: "https://www.bloomsbury.com/",
    booksCount: "1,000+",
  },

  ieee: {
    name: "IEEE",
    logo: "/images/publishers/ieee.png",
    country: "United States",
    description: "Advancing technology for a better tomorrow.",
    longDescription:
      "IEEE provides technical and scientific publications, standards and educational resources supporting research and innovation in engineering and technology.",
    subjects: [
      "Engineering",
      "Technology",
      "Computer Science",
      "Electronics",
      "Research",
    ],
    founded: "1963",
    website: "https://www.ieee.org/",
    booksCount: "1,000+",
  },

  routledge: {
    name: "Routledge",
    logo: "/images/publishers/routledge.png",
    country: "United Kingdom",
    description:
      "World-leading books, journals and resources for the social sciences and humanities.",
    longDescription:
      "Routledge publishes academic books and resources across the social sciences, humanities and related disciplines.",
    subjects: [
      "Social Sciences",
      "Humanities",
      "Education",
      "Politics",
      "Psychology",
    ],
    founded: "1836",
    website: "https://www.routledge.com/",
    booksCount: "1,000+",
  },

  "sage-publications": {
    name: "SAGE Publications",
    logo: "/images/publishers/sage.png",
    country: "United States",
    description: "Quality research, teaching and learning for a better future.",
    longDescription:
      "SAGE publishes research, educational materials and digital resources supporting teaching, learning and scholarly communication.",
    subjects: [
      "Social Sciences",
      "Education",
      "Research",
      "Business",
      "Psychology",
    ],
    founded: "1965",
    website: "https://us.sagepub.com/",
    booksCount: "1,000+",
  },

  "pan-macmillan": {
    name: "Pan Macmillan",
    logo: "/images/publishers/pan-macmillan.png",
    country: "United Kingdom",
    description:
      "Inspiring readers and supporting lifelong learning through extraordinary books.",
    longDescription:
      "Pan Macmillan publishes a broad range of books across fiction, non-fiction, education and other areas for readers and learners.",
    subjects: [
      "Literature",
      "Education",
      "Arts",
      "Humanities",
      "General Reading",
    ],
    founded: "1946",
    website: "https://www.panmacmillan.com/",
    booksCount: "1,000+",
  },

  hogrefe: {
    name: "Hogrefe",
    logo: "/images/publishers/hogrefe.png",
    country: "Germany",
    description:
      "Evidence-based knowledge for better mental health and well-being.",
    longDescription:
      "Hogrefe publishes academic and professional resources with a strong focus on psychology, mental health and related disciplines.",
    subjects: [
      "Psychology",
      "Medicine",
      "Mental Health",
      "Education",
      "Research",
    ],
    founded: "1949",
    website: "https://www.hogrefe.com/",
    booksCount: "1,000+",
  },

  "mit-press": {
    name: "MIT Press",
    logo: "/images/publishers/mit-press.svg",
    country: "United States",
    description:
      "Academic publishing across science, technology, design, and the humanities.",
    longDescription:
      "The MIT Press publishes scholarly books and other works across science, technology, design, architecture, and the humanities.",
    subjects: ["Science", "Technology", "Engineering", "Arts", "Humanities"],
    founded: "1962",
    website: "https://mitpress.mit.edu/",
    booksCount: "See catalogue",
  },

  "university-book-house": {
    name: "University Book House",
    logo: "/images/logo/logo.png",
    country: "United Arab Emirates",
    description:
      "University Book House publishes and distributes academic knowledge and learning resources across the Arab world.",
    longDescription:
      "University Book House is our own publishing and academic books brand. Explore selected UBH publications and learning resources available in the catalogue.",
    subjects: [
      "Education",
      "Academic Publishing",
      "Medicine",
      "Business",
      "Humanities",
    ],
    founded: "",
    website: "https://www.ubh.ae/",
    booksCount: "UBH catalogue",
  },
};

type Publisher = PublisherProfile;

/* -------------------------------------------------------------------------- */
/* Related Publishers                                                         */
/* -------------------------------------------------------------------------- */

const relatedPublishers = [
  {
    slug: "cambridge-university-press",
    name: "Cambridge University Press",
    logo: "/images/publishers/cambridge-university-press-logo-vector.png",
  },
  {
    slug: "oxford-university-press",
    name: "Oxford University Press",
    logo: "/images/publishers/oxford.svg",
  },
  {
    slug: "springer",
    name: "Springer Nature",
    logo: "/images/publishers/springer.png",
  },
  {
    slug: "wiley",
    name: "Wiley",
    logo: "/images/publishers/wiley_logo.svg",
  },
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default async function PublisherDetailsPage({
  params,
}: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }
  const normalizePublisherSlug = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const publisherKey = normalizePublisherSlug(slug);
  const knownPublisher = publishers[publisherKey];

  // A publisher can be discovered from the catalogue even if it has no
  // manually maintained profile in the publisher directory yet.
  const matchingPublisherProducts = products.filter((product) => {
    const storedSlug = normalizePublisherSlug(product.publisherSlug ?? "");
    const nameSlug = normalizePublisherSlug(product.publisher ?? "");
    return storedSlug === publisherKey || nameSlug === publisherKey;
  });

  // Product feeds can contain the same record more than once. Deduplicate
  // before rendering so ProductCard keys remain unique and books aren't repeated.
  const publisherProducts = Array.from(
    new Map(
      matchingPublisherProducts.map((product) => [
        product.slug || product.id,
        product,
      ]),
    ).values(),
  );
  const previewProducts = publisherProducts.slice(0, 8);

  const firstProduct = publisherProducts[0];
  const derivedSubjects = Array.from(
    new Set(
      publisherProducts
        .flatMap((product) => product.subjects ?? [])
        .filter(Boolean),
    ),
  );

  const publisher: Publisher | undefined =
    knownPublisher ??
    (firstProduct
      ? {
          name: firstProduct.publisher || slug.replace(/-/g, " "),
          logo: firstProduct.publisherLogo ?? "",
          country: "",
          description: `Explore books and academic publications from ${firstProduct.publisher}.`,
          longDescription: `Browse the available catalogue from ${firstProduct.publisher}. Publisher information will be expanded as verified details become available.`,
          subjects: derivedSubjects.length
            ? derivedSubjects
            : ["Academic Publishing"],
          founded: "",
          website: firstProduct.website ?? "",
          booksCount: String(publisherProducts.length),
        }
      : undefined);

  if (!publisher) {
    const isArabic = locale === "ar";

    return (
      <main dir={isArabic ? "rtl" : "ltr"} className="bg-ubh-canvas">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ubh-navy/5 text-ubh-navy">
            <span className="text-3xl" aria-hidden="true">
              !
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-ubh-navy">
            {isArabic ? "الناشر غير موجود" : "Publisher Not Found"}
          </h1>

          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            {isArabic
              ? "عذراً، لم نتمكن من العثور على الناشر الذي تبحث عنه. ربما تم نقل الرابط أو إزالته."
              : "Sorry, we couldn't find the publisher you're looking for. The publisher may have been moved, removed, or the link may be incorrect."}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`/${locale}/publishers`}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-ubh-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0b2b55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2"
            >
              {isArabic ? "تصفح جميع الناشرين" : "Browse All Publishers"}
            </a>

            <a
              href={`/${locale}`}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-ubh-navy transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2"
            >
              {isArabic ? "العودة إلى الرئيسية" : "Back to Home"}
            </a>
          </div>
        </div>
      </main>
    );
  }

  const t = copy[locale].publishers;
  const details = t.details;
  const publisherTranslation = t.publisherDescriptions[
    publisherKey as keyof typeof t.publisherDescriptions
  ] ?? {
    description: publisher.description,
    longDescription: publisher.longDescription,
  };
  const countryLabels: Record<string, string> = {
    "United Kingdom": t.countries.uk,
    "United States": t.countries.us,
    Canada: t.countries.canada,
    Germany: t.countries.germany,
    France: t.countries.france,
    Australia: t.countries.australia,
    Netherlands: t.countries.netherlands,
    Others: t.countries.others,
  };

  const subjectLabels: Record<string, string> = {
    Business: t.subjects.business,
    "Business & Economics": t.subjects.business,

    "Computer Science": t.subjects.computerScience,
    "Computer Science & IT": t.subjects.computerScience,

    Education: t.subjects.education,
    "Education & Teaching": t.subjects.education,

    Engineering: t.subjects.engineering,
    "Engineering & Technology": t.subjects.engineering,

    Medicine: t.subjects.medicine,
    Healthcare: t.subjects.medicine,
    "Health & Medicine": t.subjects.medicine,

    Humanities: t.subjects.humanities,
    "Humanities & Social Sciences": t.subjects.humanities,

    Science: t.subjects.science,
    "Science & Mathematics": t.subjects.science,

    Law: t.subjects.law,
    Arts: t.subjects.arts,

    Technology: t.subjects.computerScience,
    Mathematics: t.subjects.science,
    "Social Sciences": t.subjects.humanities,
    Research: t.subjects.science,
    Psychology: t.subjects.humanities,
    History: t.subjects.humanities,
    Languages: t.subjects.humanities,
    Literature: t.subjects.humanities,
    Politics: t.subjects.humanities,
    Electronics: t.subjects.engineering,
    "Professional Studies": t.subjects.business,
    "Mental Health": t.subjects.medicine,
    "General Reading": t.subjects.humanities,
  };

  return (
    <>
      {/* ================================================================== */}
      {/* HERO                                                               */}
      {/* ================================================================== */}

      <section className="relative isolate min-h-[420px] overflow-hidden border-b border-slate-200 bg-[#F5F8FC] text-[#102B4E] md:min-h-[460px] lg:min-h-[490px]">
        {/* Light UBH2 Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Soft background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F4F8FC] to-[#EAF1F8]" />

          {/* Ambient lighting */}
          <div className="absolute -right-32 -top-44 h-[520px] w-[650px] rounded-full bg-[#6A9FC8]/[0.10] blur-[130px]" />
          <div className="absolute -bottom-56 -left-32 h-[480px] w-[480px] rounded-full bg-[#C89438]/[0.08] blur-[120px]" />

          {/* Architectural grid */}
          <div
            className="absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage: `
          linear-gradient(to right, #52789A 1px, transparent 1px),
          linear-gradient(to bottom, #52789A 1px, transparent 1px)
        `,
              backgroundSize: "82px 82px",
              maskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            }}
          />

          {/* Right architectural geometry */}
          <div className="absolute -right-32 -top-40 h-[490px] w-[510px] rotate-[42deg] border border-[#52789A]/[0.13] bg-gradient-to-br from-[#DCEAF5]/50 to-transparent" />

          <div className="absolute -right-20 top-20 h-[300px] w-[300px] rotate-45 border border-[#C89438]/[0.16]" />

          {/* Dotted texture */}
          <div
            className="absolute right-12 top-12 h-48 w-56 opacity-[0.22]"
            style={{
              backgroundImage: "radial-gradient(#52789A 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              maskImage: "linear-gradient(to left, black, transparent)",
            }}
          />

          {/* Bottom geometry */}
          <div className="absolute -bottom-56 -right-20 h-[440px] w-[490px] rotate-[-42deg] border border-[#52789A]/[0.10]" />

          {/* Gold finishing line */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C89438]/45 to-transparent" />
          <div className="absolute bottom-0 left-1/2 h-[2px] w-24 -translate-x-1/2 bg-[#C89438]" />
        </div>

        {/* Content */}
        <Container className="relative z-10">
          <div className="flex min-h-[420px] items-center py-12 md:min-h-[460px] md:py-14 lg:min-h-[490px] lg:py-16">
            <div className="grid w-full items-center gap-9 md:grid-cols-[200px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
              {/* Publisher Logo */}
              <div className="flex justify-center md:justify-start">
                <div className="relative flex h-[150px] w-[190px] items-center justify-center rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_15px_40px_-22px_rgba(16,43,78,0.22)] lg:h-[165px] lg:w-[210px]">
                  <div className="relative h-full w-full">
                    <SafeImage
                      src={publisher.logo}
                      alt={`${publisher.name} logo`}
                      fill
                      sizes="(min-width: 1024px) 210px, 190px"
                      className="object-contain"
                      fallback={
                        <div className="flex h-full items-center justify-center text-center">
                          <span className="text-sm font-semibold text-ubh-navy">
                            {publisher.name}
                          </span>
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Publisher Information */}
              <div
                className="
  min-w-0
  lg:sticky lg:top-24
  lg:self-start
"
              >
                {/* Metadata */}
                <div className="mb-5 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <span className="inline-flex items-center rounded-md border border-[#C89438]/30 bg-[#C89438]/[0.09] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#987027]">
                    {details.academicPublisher}
                  </span>

                  <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                    <MapPin size={14} className="text-[#B8822C]" />
                    {countryLabels[publisher.country] ?? publisher.country}
                  </span>
                </div>

                {/* Publisher Name */}
                <h1 className="max-w-4xl font-serif text-3xl font-semibold leading-[1.2] tracking-tight text-[#102B4E] md:text-4xl lg:text-[48px]">
                  {publisher.name}
                </h1>

                {/* Gold Accent */}
                <div className="mx-auto mt-5 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#B8822C] to-[#E3BD76] md:mx-0" />

                {/* Description */}
                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 md:mx-0 md:text-[15px] md:leading-8">
                  {publisherTranslation.description}
                </p>

                {/* Subject Areas */}
                {publisher.subjects.length > 0 && (
                  <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                    {publisher.subjects.slice(0, 4).map((subject) => (
                      <span
                        key={subject}
                        className="rounded-md border border-slate-200 bg-white/80 px-3 py-2 text-[11px] font-medium text-[#385477] shadow-sm transition-colors duration-200 hover:border-[#C89438]/50 hover:bg-white"
                      >
                        {subjectLabels[subject] ?? subject}
                      </span>
                    ))}

                    {publisher.subjects.length > 4 && (
                      <span className="flex items-center px-2 text-[11px] font-medium text-slate-500">
                        +{publisher.subjects.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* MAIN CONTENT                                                       */}
      {/* ================================================================== */}

      
<main
  dir={locale === "ar" ? "rtl" : "ltr"}
  className="bg-[#F5F7FA]"
>
  {/* ================================================================ */}
  {/* PUBLISHER INFORMATION                                             */}
  {/* ================================================================ */}

  <section className="py-8 sm:py-10 lg:py-12">
    <Container>
      <div className="
        grid grid-cols-1 items-start gap-6
        lg:grid-cols-[minmax(0,1fr)_290px]
        lg:gap-8
        xl:grid-cols-[minmax(0,1fr)_320px]
        xl:gap-10
      ">

        {/* ========================================================== */}
        {/* MAIN COLUMN                                                 */}
        {/* ========================================================== */}

        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">

          {/* Back Navigation */}
          <div className="mb-5">
            <BackButton fallback={`/${locale}/publishers`} />
          </div>

          <div className="space-y-5 sm:space-y-6">

            {/* ABOUT PUBLISHER */}
            <section className="
              overflow-hidden rounded-xl
              border border-[#E5EAF0]
              bg-white
              shadow-[0_4px_20px_-12px_rgba(16,43,78,0.12)]
            ">
              <div className="p-5 sm:p-7 lg:p-8">

                <div className="flex items-start gap-4">

                  <div className="
                    flex h-11 w-11 shrink-0 items-center
                    justify-center rounded-xl
                    bg-[#F0F5FA] text-[#173B62]
                  ">
                    <BookOpen size={20} strokeWidth={1.7} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="
                      text-[10px] font-bold uppercase
                      tracking-[0.16em] text-[#B8822C]
                    ">
                      {details.publisherProfile}
                    </p>

                    <h2 className="
                      mt-1.5 text-xl font-semibold
                      leading-snug tracking-tight
                      text-[#102B4E]
                      sm:text-2xl
                    ">
                      {details.about} {publisher.name}
                    </h2>

                  </div>
                </div>

                <div className="
                  my-6 h-px
                  bg-gradient-to-r from-[#C89438]/50
                  via-[#E5EAF0] to-transparent
                " />

                <div className="
                  space-y-4 text-[13px]
                  leading-7 text-[#64748B]
                  sm:text-sm sm:leading-8
                ">
                  <p>
                    {publisherTranslation.longDescription}
                  </p>

                  <p>
                    {details.exploreResources}
                  </p>
                </div>

              </div>
            </section>

            {/* ACADEMIC SUBJECT AREAS */}
            <section className="
              overflow-hidden rounded-xl
              border border-[#E5EAF0]
              bg-white
              shadow-[0_4px_20px_-12px_rgba(16,43,78,0.12)]
            ">
              <div className="p-5 sm:p-7 lg:p-8">

                <div className="flex items-center gap-4">

                  <div className="
                    flex h-11 w-11 shrink-0 items-center
                    justify-center rounded-xl
                    bg-[#F0F5FA] text-[#173B62]
                  ">
                    <GraduationCap size={21} strokeWidth={1.7} />
                  </div>

                  <div>
                    <p className="
                      text-[10px] font-bold uppercase
                      tracking-[0.16em] text-[#B8822C]
                    ">
                      {details.academicCoverage}
                    </p>

                    <h2 className="
                      mt-1.5 text-xl font-semibold
                      tracking-tight text-[#102B4E]
                      sm:text-2xl
                    ">
                      {details.subjectAreas}
                    </h2>
                  </div>

                </div>

                <div className="
                  my-6 h-px bg-[#E9EDF2]
                " />

                <div className="
                  grid grid-cols-1 gap-3
                  min-[420px]:grid-cols-2
                  xl:grid-cols-3
                ">
                  {publisher.subjects.map((subject, index) => (
                    <div
                      key={subject}
                      className="
                        group flex min-h-[76px] items-center
                        gap-3 rounded-lg
                        border border-[#E8EDF3]
                        bg-[#F8FAFC] px-4 py-3
                        transition-all duration-200
                        hover:border-[#C89438]/40
                        hover:bg-[#FCFAF5]
                      "
                    >
                      <div className="
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        rounded-md bg-white
                        border border-[#E8EDF3]
                        text-[#B8822C]
                        transition-colors
                        group-hover:border-[#C89438]/40
                      ">
                        <span className="text-xs font-semibold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="
                        min-w-0 text-xs font-semibold
                        leading-5 text-[#304A68]
                        sm:text-[13px]
                      ">
                        {subjectLabels[subject] ?? subject}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </section>

          </div>
        </div>

        {/* ========================================================== */}
        {/* SIDEBAR                                                     */}
        {/* ========================================================== */}

        <aside className="min-w-0 space-y-5">

          {/* PUBLISHER INFORMATION */}
          <section className="
            overflow-hidden rounded-xl
            border border-[#E5EAF0]
            bg-white
            shadow-[0_4px_20px_-12px_rgba(16,43,78,0.12)]
          ">

            <div className="border-b border-[#EDF0F4] px-5 py-4">

              <h3 className="
                text-sm font-bold tracking-tight
                text-[#102B4E]
              ">
                {details.publisherInformation}
              </h3>

            </div>

            <div className="space-y-5 p-5">

              {/* Country */}
              <div className="flex items-start gap-3">

                <div className="
                  flex h-9 w-9 shrink-0 items-center
                  justify-center rounded-lg
                  bg-[#F5F7FA] text-[#B8822C]
                ">
                  <MapPin size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="
                    text-[10px] font-medium
                    text-[#94A3B8]
                  ">
                    {details.country}
                  </p>

                  <p className="
                    mt-1 text-xs font-semibold
                    leading-5 text-[#304A68]
                  ">
                    {countryLabels[publisher.country] ?? publisher.country}
                  </p>
                </div>

              </div>

              {/* Founded */}
              {publisher.founded && (
                <div className="flex items-start gap-3">

                  <div className="
                    flex h-9 w-9 shrink-0 items-center
                    justify-center rounded-lg
                    bg-[#F5F7FA] text-[#B8822C]
                  ">
                    <GraduationCap size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="
                      text-[10px] font-medium
                      text-[#94A3B8]
                    ">
                      {details.founded}
                    </p>

                    <p className="
                      mt-1 text-xs font-semibold
                      text-[#304A68]
                    ">
                      {publisher.founded}
                    </p>
                  </div>

                </div>
              )}

              {/* Publications */}
              <div className="flex items-start gap-3">

                <div className="
                  flex h-9 w-9 shrink-0 items-center
                  justify-center rounded-lg
                  bg-[#F5F7FA] text-[#B8822C]
                ">
                  <BookOpen size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="
                    text-[10px] font-medium
                    text-[#94A3B8]
                  ">
                    {details.publications}
                  </p>

                  <p className="
                    mt-1 text-xs font-semibold
                    text-[#304A68]
                  ">
                    {publisher.booksCount}
                  </p>
                </div>

              </div>

              {/* Website */}
              {publisher.website && (
                <a
                  href={publisher.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex min-h-11 w-full items-center
                    justify-center gap-2 rounded-lg
                    bg-[#102B4E] px-4 py-3
                    text-xs font-semibold text-white
                    transition-colors
                    hover:bg-[#1B426C]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#C89438]
                    focus-visible:ring-offset-2
                  "
                >
                  {details.visitWebsite}
                  <ExternalLink size={14} />
                </a>
              )}

            </div>
          </section>

          {/* SUBJECT TAGS */}
          <section className="
            rounded-xl border border-[#E5EAF0]
            bg-white p-5
            shadow-[0_4px_20px_-12px_rgba(16,43,78,0.12)]
          ">

            <div className="flex items-center gap-3">

              <div className="
                flex h-9 w-9 items-center
                justify-center rounded-lg
                bg-[#F5F7FA] text-[#B8822C]
              ">
                <Globe2 size={17} />
              </div>

              <h3 className="
                text-sm font-bold text-[#102B4E]
              ">
                {details.subjectAreas}
              </h3>

            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {publisher.subjects.map((subject) => (
                <span
                  key={subject}
                  className="
                    rounded-md border border-[#E8EDF3]
                    bg-[#F8FAFC] px-3 py-2
                    text-[10px] font-medium
                    leading-4 text-[#46617F]
                    transition-colors
                    hover:border-[#C89438]/40
                    hover:bg-[#FCFAF5]
                  "
                >
                  {subjectLabels[subject] ?? subject}
                </span>
              ))}
            </div>

          </section>

          {/* RELATED PUBLISHERS */}
          <section className="
            rounded-xl border border-[#E5EAF0]
            bg-white p-5
            shadow-[0_4px_20px_-12px_rgba(16,43,78,0.12)]
          ">

            <div className="flex items-center justify-between gap-2">

              <h3 className="
                text-sm font-bold text-[#102B4E]
              ">
                {details.explorePublishers}
              </h3>

              <Globe2
                size={16}
                className="shrink-0 text-[#B8822C]"
              />

            </div>

            <div className="mt-5 space-y-2">

              {relatedPublishers
                .filter((item) => item.slug !== publisherKey)
                .slice(0, 3)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${locale}/publishers/${item.slug}`}
                    className="
                      group flex min-w-0 items-center gap-3
                      rounded-lg border border-[#EDF0F4]
                      p-3 transition-all duration-200
                      hover:border-[#C89438]/40
                      hover:bg-[#FAFBFD]
                    "
                  >

                    <div className="
                      relative h-10 w-12 shrink-0
                      rounded-md bg-white
                    ">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </div>

                    <span className="
                      min-w-0 flex-1 text-xs
                      font-semibold leading-5
                      text-[#304A68]
                      group-hover:text-[#B8822C]
                    ">
                      {item.name}
                    </span>

                    <ArrowRight
                      size={14}
                      className={`
                        shrink-0 text-[#94A3B8]
                        transition-transform
                        group-hover:translate-x-0.5
                        ${locale === "ar" ? "rotate-180 group-hover:-translate-x-0.5" : ""}
                      `}
                    />

                  </Link>
                ))}

            </div>

            <Link
              href={`/${locale}/publishers`}
              className="
                mt-5 flex min-h-10 items-center
                justify-center gap-2 rounded-lg
                border border-[#E5EAF0]
                text-xs font-semibold text-[#173B62]
                transition-colors
                hover:border-[#C89438]/50
                hover:bg-[#FAFBFD]
              "
            >
              {details.viewAllPublishers}

              <ArrowRight
                size={14}
                className={locale === "ar" ? "rotate-180" : ""}
              />
            </Link>

          </section>

        </aside>

      </div>
    </Container>
  </section>

  {/* ================================================================ */}
  {/* PUBLISHER BOOK CATALOGUE                                         */}
  {/* ================================================================ */}

  
<section
  id="publisher-books"
  className="border-t border-[#E8EDF3] bg-[#F8FAFC] py-9 sm:py-11 lg:py-14"
>
  <Container>
    {/* Compact catalogue header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-[3px] w-6 rounded-full bg-[#C89438]" />
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#B8822C]">
            {locale === "ar" ? "كتالوج الناشر" : "PUBLISHER CATALOGUE"}
          </p>
        </div>

        <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#102B4E] sm:text-[28px]">
          {locale === "ar"
            ? "كتب هذا الناشر"
            : `Books by ${publisher.name}`}
        </h2>

        <p className="mt-1.5 text-xs leading-5 text-[#718096] sm:text-sm">
          {locale === "ar"
            ? "اكتشف الكتب والإصدارات المتاحة."
            : "Explore available books and publications."}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <span className="whitespace-nowrap rounded-md border border-[#E3E9F0] bg-white px-3 py-2 text-[11px] font-medium text-[#46617F]">
          {publisherProducts.length}{" "}
          {locale === "ar"
            ? "كتاب"
            : publisherProducts.length === 1
              ? "title"
              : "titles"}
        </span>

        {publisherProducts.length > 0 && (
          <Link
            href={`/${locale}/shop/products?publisher=${encodeURIComponent(publisher.name)}`}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-[#102B4E] px-4 text-[11px] font-semibold text-white transition-colors hover:bg-[#1B426C]"
          >
            {locale === "ar" ? "عرض الكل" : "View all"}
            <ArrowRight
              size={13}
              className={locale === "ar" ? "rotate-180" : ""}
            />
          </Link>
        )}
      </div>
    </div>

    {/* Catalogue products */}
    {publisherProducts.length > 0 ? (
      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-7 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {previewProducts.map((product) => (
          <ProductCard
            key={product.slug || product.id}
            product={product}
            locale={locale}
            noCoverText={locale === "ar" ? "لا توجد صورة" : "No cover"}
          />
        ))}
      </div>
    ) : (
      <div className="mt-6 rounded-lg border border-dashed border-[#D9E2EC] bg-white px-5 py-12 text-center">
        <BookOpen
          size={28}
          strokeWidth={1.4}
          className="mx-auto text-[#94A3B8]"
        />

        <p className="mt-3 text-sm font-semibold text-[#102B4E]">
          {locale === "ar"
            ? "لا توجد كتب متاحة حالياً"
            : "No titles available yet"}
        </p>

        <p className="mx-auto mt-1 max-w-md text-xs leading-6 text-[#718096]">
          {locale === "ar"
            ? "يرجى العودة لاحقاً للاطلاع على إصدارات هذا الناشر."
            : "Please check back later for available publications."}
        </p>
      </div>
    )}
  </Container>
</section>

</main>

      {/* ================================================================== */}
      {/* CTA                                                                */}
      {/* ================================================================== */}

      <section className="relative isolate overflow-hidden border-y border-white/10 bg-[#061A37] text-white">
  {/* Subtle background image */}
  <div aria-hidden="true" className="absolute inset-0">
    <Image
      src="/images/publishers/publishers-cta.jpg"
      alt=""
      fill
      sizes="100vw"
      className="object-cover object-center opacity-20"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#061A37] via-[#061A37]/95 to-[#061A37]/80" />
  </div>

  <Container className="relative z-10">
    <div className="flex flex-col gap-5 py-6 sm:py-7 md:flex-row md:items-center md:justify-between">

      <div className="min-w-0">
        <h2 className="font-serif text-xl leading-snug sm:text-2xl">
          {details.discoverMore}{" "}
          <span className="text-ubh-gold-light">
            {details.resources}
          </span>
        </h2>

        <p className="mt-1.5 max-w-xl text-xs leading-5 text-white/65">
          {details.discoverDescription}
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          href={`/${locale}/shop/products?publisher=${encodeURIComponent(
            publisher.name,
          )}`}
          className="inline-flex h-9 items-center justify-center gap-2 rounded bg-ubh-gold-light px-4 text-[11px] font-semibold text-[#061A37] transition-colors hover:bg-ubh-gold"
        >
          {details.browseBooks}
          <ArrowRight
            size={13}
            className="rtl:rotate-180"
          />
        </Link>

        <Link
          href={`/${locale}/publishers`}
          className="inline-flex h-9 items-center justify-center rounded border border-white/25 px-4 text-[11px] font-medium text-white transition-colors hover:border-white/50 hover:bg-white/5"
        >
          {details.allPublishers}
        </Link>
      </div>

    </div>
  </Container>
</section>
    </>
  );
}
