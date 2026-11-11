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

  "springer": {
    name: "Springer Nature",
    logo: "/images/publishers/springer.png",
    country: "Germany",
    description:
      "Publishing high-quality research and innovative solutions for a better tomorrow.",
    longDescription:
      "Springer Nature is a global publisher serving researchers, educators and professionals through academic books, journals and digital research resources.",
    subjects: [
      "Science",
      "Technology",
      "Medicine",
      "Engineering",
      "Research",
    ],
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
    description:
      "World-class learning solutions for every stage of life.",
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
    logo: "/images/publishers/wiley_logo.svg",
    country: "United States",
    description:
      "Advancing knowledge and innovation through research, books and digital learning.",
    longDescription:
      "Wiley is a global academic publisher providing research publications, books and digital learning resources for students, researchers, educators and professionals.",
    subjects: [
      "Science",
      "Medicine",
      "Engineering",
      "Business",
      "Technology",
    ],
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
    subjects: [
      "Law",
      "Humanities",
      "Social Sciences",
      "History",
      "Languages",
    ],
    founded: "1683",
    website: "https://brill.com/",
    booksCount: "1,000+",
  },

  bloomsbury: {
    name: "Bloomsbury",
    logo: "/images/publishers/bloomsbury.png",
    country: "United Kingdom",
    description:
      "Publishing for a creative, connected and curious world.",
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
    description:
      "Advancing technology for a better tomorrow.",
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
    description:
      "Quality research, teaching and learning for a better future.",
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
    subjects: [
      "Science",
      "Technology",
      "Engineering",
      "Arts",
      "Humanities",
    ],
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
    subjects: ["Education", "Academic Publishing", "Medicine", "Business", "Humanities"],
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
    new Set(publisherProducts.flatMap((product) => product.subjects ?? []).filter(Boolean)),
  );

  const publisher: Publisher | undefined = knownPublisher ?? (firstProduct ? {
    name: firstProduct.publisher || slug.replace(/-/g, " "),
    logo: firstProduct.publisherLogo ?? "",
    country: "",
    description: `Explore books and academic publications from ${firstProduct.publisher}.`,
    longDescription: `Browse the available catalogue from ${firstProduct.publisher}. Publisher information will be expanded as verified details become available.`,
    subjects: derivedSubjects.length ? derivedSubjects : ["Academic Publishing"],
    founded: "",
    website: firstProduct.website ?? "",
    booksCount: String(publisherProducts.length),
  } : undefined);

if (!publisher) {
  const isArabic = locale === "ar";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-[60vh] bg-ubh-canvas px-4 py-20"
    >
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
const publisherTranslation =
  t.publisherDescriptions[publisherKey as keyof typeof t.publisherDescriptions] ?? {
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

      <section className="relative overflow-hidden bg-ubh-navy text-white">
<div className="absolute inset-0">
  <div className="absolute inset-0">
    <SafeImage
      src={publisher.logo}
      alt={`${publisher.name} logo`}
      width={180}
      height={100}
      className="absolute left-6 top-1/2 max-h-[100px] max-w-[160px] -translate-y-1/2 object-contain"
    />
  </div>

  <div className="absolute inset-0 bg-ubh-navy/80" />

  <div className="absolute inset-0 bg-gradient-to-r from-ubh-navy via-ubh-navy/90 to-ubh-navy/40" />
</div>
        <Container className="relative z-10">
          <div className="min-h-[410px] pb-12 pt-7 md:min-h-[430px]">
            {/* Breadcrumb */}
            {/* <div className="flex items-center gap-2 text-[10px] text-white/70">
              <Link
                href={`/${locale}`}
                className="transition-colors hover:text-white"
              >
                {t.breadcrumbHome}
              </Link>

              <span>›</span>

              <Link
                href={`/${locale}/publishers`}
                className="transition-colors hover:text-white"
              >
                {t.breadcrumbPublishers}
              </Link>

              <span>›</span>

              <span className="max-w-[180px] truncate text-white">
                {publisher.name}
              </span>
            </div> */}<div className="mb-7">
  <Breadcrumbs
    locale={locale}
    items={websiteBreadcrumbs(locale, "digitalSolutions")}
    variant="dark"
  />
</div>
            

            {/* Hero */}
            <div className="mt-12 grid gap-10 md:grid-cols-[190px_1fr] md:items-center">
  {/* Logo Card */}
  <div className="flex h-[150px] w-[190px] items-center justify-center rounded-[6px] border border-white/15 bg-white p-6 shadow-2xl">
    <div className="relative h-full w-full">
      <SafeImage
        src={publisher.logo}
        alt={`${publisher.name} logo`}
        fill
        sizes="160px"
        className="object-contain"
        fallback={
          <div className="flex h-full w-full items-center justify-center text-center">
            <span className="text-sm font-semibold text-ubh-navy">
              {publisher.name}
            </span>
          </div>
        }
      />
    </div>
  </div>

              {/* Content */}
              <div className="max-w-[680px]">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-ubh-gold-light px-3 py-1 text-[9px] font-semibold text-white">
                    {details.academicPublisher}
                  </span>

                  <span className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[9px] text-white/80">
                    <MapPin size={11} />
                    {countryLabels[publisher.country] ?? publisher.country}
                  </span>
                </div>

                <h1 className="font-serif text-4xl leading-tight md:text-[48px]">
                  {publisher.name}
                </h1>

                <p className="mt-4 max-w-[650px] text-[13px] leading-[1.7] text-white/80 md:text-[14px]">
                  {publisherTranslation.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {publisher.subjects.slice(0, 4).map((subject) => (
                    <span
                      key={subject}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[9px] text-white/80"
                    >
                      {subjectLabels[subject] ?? subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* MAIN CONTENT                                                       */}
      {/* ================================================================== */}

      <main className="bg-ubh-canvas">
        <Container>
          <div className="grid gap-7 py-10 lg:grid-cols-[1fr_250px] lg:py-12">
            {/* ============================================================ */}
            {/* LEFT CONTENT                                                  */}
            {/* ============================================================ */}

            <div>
              {/* Back */}
              <BackButton fallback={`/${locale}/publishers`} />

              {/* About */}
              <section className="rounded-[6px] border border-ubh-border bg-white p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf3f8] text-ubh-blue-bright">
                    <BookOpen size={17} strokeWidth={1.7} />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ubh-gold">
                      {details.publisherProfile}
                    </p>

                    <h2 className="mt-1 text-[20px] font-semibold text-ubh-blue">
                      {details.about} {publisher.name}
                    </h2>
                  </div>
                </div>

                <p className="mt-6 text-[12px] leading-[1.8] text-ubh-blue-muted">
                  {publisherTranslation.longDescription}
                </p>

                <p className="mt-4 text-[12px] leading-[1.8] text-ubh-blue-muted">
                  {details.exploreResources}
                </p>
              </section>

              {/* Subject Areas */}
              <section className="mt-6 rounded-[6px] border border-ubh-border bg-white p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf3f8] text-ubh-blue-bright">
                    <GraduationCap
                      size={17}
                      strokeWidth={1.7}
                    />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ubh-gold">
                      {details.academicCoverage}
                    </p>

                    <h2 className="mt-1 text-[20px] font-semibold text-ubh-blue">
                      {details.subjectAreas}
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {publisher.subjects.map((subject) => (
                    <div
                      key={subject}
                      className="rounded-[5px] border border-ubh-border bg-ubh-canvas px-4 py-4"
                    >
                      <div className="h-1 w-6 rounded-full bg-ubh-gold-light" />

                      <p className="mt-3 text-[10px] font-semibold text-ubh-blue-deep">
                        {subjectLabels[subject] ?? subject}
                      </p>
                    </div>
                  ))}
                </div>
              </section>


            </div>

            {/* ============================================================ */}
            {/* SIDEBAR                                                       */}
            {/* ============================================================ */}

            <aside className="space-y-5">
              {/* Publisher Information */}
              <div className="rounded-[6px] border border-ubh-border bg-white p-5">
                <h3 className="text-[13px] font-semibold text-ubh-blue">
                  {details.publisherInformation}
                </h3>

                <div className="mt-5 space-y-4">
                  <div className="flex gap-3">
                    <div className="mt-0.5 text-ubh-gold">
                      <MapPin size={15} />
                    </div>

                    <div>
                      <p className="text-[8px] uppercase tracking-wider text-ubh-muted-light">
                        {details.country}
                      </p>

                      <p className="mt-1 text-[10px] font-medium text-ubh-blue-muted">
                        {countryLabels[publisher.country] ?? publisher.country}
                      </p>
                    </div>
                  </div>

                  {publisher.founded && (
                    <div className="flex gap-3">
                      <div className="mt-0.5 text-ubh-gold">
                        <GraduationCap size={15} />
                      </div>

                      <div>
                        <p className="text-[8px] uppercase tracking-wider text-ubh-muted-light">
                          {details.founded}
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-ubh-blue-muted">
                          {publisher.founded}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <div className="mt-0.5 text-ubh-gold">
                      <BookOpen size={15} />
                    </div>

                    <div>
                      <p className="text-[8px] uppercase tracking-wider text-ubh-muted-light">
                        {details.publications}
                      </p>

                      <p className="mt-1 text-[10px] font-medium text-ubh-blue-muted">
                        {publisher.booksCount}
                      </p>
                    </div>
                  </div>
                </div>

                {publisher.website ? (
                  <a
                    href={publisher.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex h-9 items-center justify-center gap-2 rounded-[4px] bg-ubh-blue px-4 text-[9px] font-semibold text-white transition-colors hover:bg-ubh-blue-deep"
                  >
                    {details.visitWebsite}
                    <ExternalLink size={12} />
                  </a>
                ) : null}
              </div>

              {/* Subjects */}
              <div className="rounded-[6px] border border-ubh-border bg-white p-5">
                <div className="flex items-center gap-2">
                  <Globe2
                    size={15}
                    className="text-ubh-gold"
                    strokeWidth={1.7}
                  />

                  <h3 className="text-[13px] font-semibold text-ubh-blue">
                    {details.subjectAreas}
                  </h3>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {publisher.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="rounded-full bg-[#f0f5f9] px-2.5 py-1.5 text-[8.5px] font-medium text-[#46617f]"
                    >
                      {subjectLabels[subject] ?? subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Publishers */}
              <div className="rounded-[6px] border border-ubh-border bg-white p-5">
                <h3 className="text-[13px] font-semibold text-ubh-blue">
                  {details.explorePublishers}
                </h3>

                <div className="mt-4 space-y-2">
                  {relatedPublishers
                    .filter((item) => item.slug !== slug)
                    .slice(0, 3)
                    .map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${locale}/publishers/${item.slug}`}
                        className="group flex items-center gap-3 rounded-[4px] border border-[#edf1f5] p-2.5 transition-colors hover:border-[#d4dfeb]"
                      >
                        <div className="relative h-9 w-12 shrink-0">
                          <Image
                            src={item.logo}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-contain"
                          />
                        </div>

                        <span className="min-w-0 flex-1 truncate text-[9px] font-medium text-ubh-blue-muted group-hover:text-ubh-blue-bright">
                          {item.name}
                        </span>

                        <ArrowRight
                          size={11}
                          className="shrink-0 text-ubh-muted-light transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    ))}
                </div>

                <Link
                  href={`/${locale}/publishers`}
                  className="mt-4 flex items-center justify-center gap-1 text-[9px] font-semibold text-ubh-blue-bright hover:text-ubh-gold"
                >
                  {details.viewAllPublishers}
                  <ArrowRight size={11} />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
        
      {/* PUBLISHER BOOK CATALOGUE */}
      <section
        id="publisher-books"
        className="border-t border-[#e4eaf1] bg-white py-12 sm:py-16"
      >
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ubh-gold">
                {locale === "ar"
                  ? "اكتشف إصدارات الناشر"
                  : "EXPLORE THE CATALOGUE"}
              </p>

              <h2 className="font-serif text-2xl tracking-tight text-ubh-navy sm:text-3xl">
                {locale === "ar"
                  ? "كتب هذا الناشر"
                  : `Books by ${publisher.name}`}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#718096]">
                {locale === "ar"
                  ? "استكشف الكتب والإصدارات المتاحة من هذا الناشر."
                  : "Explore academic books and publications from this publisher."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="w-fit rounded-full border border-[#e1e8f0] px-4 py-2 text-xs text-ubh-blue-muted">
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
                  className="inline-flex min-h-10 items-center gap-2 rounded-md bg-ubh-navy px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0b2b55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-2"
                >
                  {locale === "ar" ? "عرض جميع الكتب" : "View all books"}
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>

          {publisherProducts.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:gap-6">
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
            <div className="mt-8 rounded-xl border border-dashed border-[#d9e2ec] bg-[#f8fafc] px-6 py-12 text-center">
              <BookOpen
                size={28}
                strokeWidth={1.4}
                className="mx-auto text-ubh-muted-light"
              />
              <p className="mt-4 font-medium text-ubh-navy">
                {locale === "ar"
                  ? "لا توجد كتب متاحة حالياً"
                  : "No titles available yet"}
              </p>
              <p className="mt-2 text-sm text-[#718096]">
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

      <section className="relative overflow-hidden bg-ubh-navy text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/publishers/publishers-cta.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-ubh-navy/80" />

          <div className="absolute inset-0 bg-gradient-to-r from-ubh-navy via-ubh-navy/90 to-ubh-navy/55" />
        </div>

        <Container className="relative z-10">
          <div className="flex min-h-[190px] flex-col items-start justify-center gap-6 py-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="max-w-[480px] font-serif text-3xl leading-[1.1] md:text-[34px]">
               {details.discoverMore}
<br />
{details.resources}
              </h2>

              <p className="mt-3 text-[11px] text-white/75 md:text-[12px]">
                {details.discoverDescription}
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[145px]">
              <Link
                href={`/${locale}/shop/products?publisher=${encodeURIComponent(
                  publisher.name
                )}`}
                className="flex h-[35px] items-center justify-center gap-2 rounded-[4px] bg-ubh-gold-light px-5 text-[10px] font-semibold text-white transition-colors hover:bg-ubh-gold"
              >
                {details.browseBooks}
                <ArrowRight size={13} />
              </Link>

              <Link
                href={`/${locale}/publishers`}
                className="flex h-[35px] items-center justify-center rounded-[4px] border border-ubh-gold-light px-5 text-[10px] font-medium text-white transition-colors hover:bg-white/10"
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