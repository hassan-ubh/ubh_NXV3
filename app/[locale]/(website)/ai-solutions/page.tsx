import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Database,
  Globe2,
  Languages,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const ALAINI_URL = "https://www.alaini.ae/";

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const isArabic = locale === "ar";

  const content = {
    en: {
      eyebrow: "UNIVERSITY BOOK HOUSE · TECHNOLOGY",
      title: "Intelligence Built on Knowledge",
      description:
        "Discover AlAinI, a dedicated platform focused on Arabic content, data intelligence, and solutions for the evolving AI ecosystem.",
      primary: "Explore AlAinI",
      secondary: "Our Capabilities",
      trust: "Arabic content · Data intelligence · AI solutions",

      platformLabel: "OUR DIGITAL PLATFORM",
      platformTitle: "Meet AlAinI",
      platformDescription:
        "Explore a platform dedicated to Arabic content, data, and intelligence. Discover its capabilities and learn how they may support your organization's needs.",
      previewAlt: "Preview of the AlAinI website",
      previewCaption:
        "Discover the platform, its capabilities, and its approach to Arabic data and intelligence.",

      featuresLabel: "CORE CAPABILITIES",
      featuresTitle: "Knowledge. Data. Intelligence.",
      featuresDescription:
        "Explore the areas that shape the AlAinI platform and its role in the digital knowledge ecosystem.",

      features: [
        {
          title: "Arabic Content",
          description:
            "Explore Arabic-language content and knowledge resources for digital platforms and data-driven applications.",
          icon: Languages,
          number: "01",
        },
        {
          title: "Licensing & Verification",
          description:
            "Explore content provenance, rights, and licensing requirements as part of responsible data use.",
          icon: ShieldCheck,
          number: "02",
        },
        {
          title: "AI & Data Intelligence",
          description:
            "Discover data-oriented capabilities designed to support organizations working with AI and digital intelligence.",
          icon: BrainCircuit,
          number: "03",
        },
      ],

      audienceLabel: "DESIGNED FOR THE KNOWLEDGE ECONOMY",
      audienceTitle: "Connecting Content and Technology",
      audienceDescription:
        "Arabic content and data can play an important role in digital innovation. AlAinI provides a dedicated destination to explore this evolving space.",
      audiencePoints: [
        "Arabic-language knowledge and content",
        "Data-oriented digital applications",
        "Exploration of AI and intelligence capabilities",
      ],

      ctaEyebrow: "DISCOVER WHAT'S POSSIBLE",
      ctaTitle: "Explore the AlAinI Platform",
      ctaDescription:
        "Visit the platform to learn more about its services, capabilities, and potential applications for your organization.",
      ctaButton: "Visit AlAinI",
      footerNote: "University Book House · Knowledge for a changing world",
    },

    ar: {
      eyebrow: "دار الكتاب الجامعي · التكنولوجيا",
      title: "ذكاء يستند إلى المعرفة",
      description:
        "اكتشف منصة AlAinI المتخصصة في المحتوى العربي وذكاء البيانات والحلول التي تواكب تطور منظومة الذكاء الاصطناعي.",
      primary: "استكشف AlAinI",
      secondary: "قدرات المنصة",
      trust: "المحتوى العربي · ذكاء البيانات · حلول الذكاء الاصطناعي",

      platformLabel: "منصتنا الرقمية",
      platformTitle: "تعرّف على AlAinI",
      platformDescription:
        "اكتشف منصة متخصصة في المحتوى العربي والبيانات والذكاء. تعرّف على إمكاناتها وكيف يمكن أن تدعم احتياجات مؤسستك.",
      previewAlt: "معاينة موقع AlAinI",
      previewCaption:
        "اكتشف المنصة وإمكاناتها ونهجها في مجال البيانات والذكاء.",

      featuresLabel: "الإمكانات الرئيسية",
      featuresTitle: "المعرفة والبيانات والذكاء",
      featuresDescription:
        "اكتشف المجالات التي تركز عليها منصة AlAinI ودورها في منظومة المعرفة الرقمية.",

      features: [
        {
          title: "المحتوى العربي",
          description:
            "اكتشف المحتوى العربي والموارد المعرفية المخصصة للمنصات الرقمية والتطبيقات القائمة على البيانات.",
          icon: Languages,
          number: "01",
        },
        {
          title: "الترخيص والتحقق",
          description:
            "تعرّف على مصادر المحتوى وحقوقه ومتطلبات الترخيص ضمن ممارسات الاستخدام المسؤول للبيانات.",
          icon: ShieldCheck,
          number: "02",
        },
        {
          title: "الذكاء الاصطناعي والبيانات",
          description:
            "اكتشف إمكانات قائمة على البيانات لدعم المؤسسات العاملة في مجال الذكاء الاصطناعي والذكاء الرقمي.",
          icon: BrainCircuit,
          number: "03",
        },
      ],

      audienceLabel: "للاقتصاد القائم على المعرفة",
      audienceTitle: "نربط المحتوى بالتكنولوجيا",
      audienceDescription:
        "يسهم المحتوى العربي والبيانات في دعم الابتكار الرقمي. وتوفر AlAinI وجهة متخصصة لاستكشاف هذا المجال المتطور.",
      audiencePoints: [
        "المعرفة والمحتوى باللغة العربية",
        "التطبيقات الرقمية القائمة على البيانات",
        "استكشاف إمكانات الذكاء الاصطناعي والتحليلات",
      ],

      ctaEyebrow: "اكتشف الإمكانات",
      ctaTitle: "استكشف منصة AlAinI",
      ctaDescription:
        "زر المنصة للتعرّف على خدماتها وإمكاناتها وتطبيقاتها المحتملة لمؤسستك.",
      ctaButton: "زيارة AlAinI",
      footerNote: "دار الكتاب الجامعي · المعرفة لعالم متغير",
    },
  }[locale];

  return (
    <main
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className="overflow-hidden bg-ubh-canvas text-ubh-navy"
    >
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ubh-navy text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(200,148,56,0.18),transparent_48%),radial-gradient(ellipse_at_bottom_left,rgba(6,74,152,0.35),transparent_48%)]"
        />

        <div
          aria-hidden="true"
          className="absolute -end-32 top-16 -z-10 h-72 w-72 rounded-full border border-white/[0.06] sm:h-96 sm:w-96"
        />

        <div
          aria-hidden="true"
          className="absolute -end-20 top-28 -z-10 h-56 w-56 rounded-full border border-ubh-gold-light/10 sm:h-72 sm:w-72"
        />

        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-xs font-semibold tracking-wide text-slate-200 sm:text-sm">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-ubh-gold-light" />
              {content.eyebrow}
            </div>

            <h1 className="mt-6 font-serif text-4xl leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {content.title}
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 lg:text-lg">
              {content.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={ALAINI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ubh-gold-light px-6 py-3 text-sm font-semibold text-ubh-navy transition-colors duration-200 hover:bg-ubh-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy"
              >
                {content.primary}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>

              <a
                href="#capabilities"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light"
              >
                {content.secondary}
              </a>
            </div>

            <div className="mt-7 flex items-start gap-3 text-xs leading-6 text-slate-400 sm:text-sm">
              <CheckCircle2
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0 text-ubh-gold-light"
              />
              <span>{content.trust}</span>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-ubh-gold-light/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.05] p-2 shadow-2xl shadow-black/20 sm:rounded-3xl sm:p-3">
              {/* Browser frame */}
              <div className="flex h-10 items-center gap-3 border-b border-white/10 px-3 sm:h-12 sm:px-4">
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e58b82]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e6c16c]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#80b89a]" />
                </div>

                <div className="min-w-0 flex-1 truncate rounded-md bg-white/[0.07] px-3 py-1.5 text-center text-[10px] text-slate-300 sm:text-xs">
                  alaini.ae
                </div>

                <a
                  href="https://alaini.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0"
                >
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 text-ubh-gold-light hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#0b2344] sm:rounded-2xl">
                <Image
                  src="/images/main_images/alaini_preview.png"
                  alt={content.previewAlt}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 560px"
                  className="object-cover object-top"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ubh-navy/70 via-transparent to-transparent"
                />

                <a
                  href={ALAINI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={content.primary}
                  className="absolute bottom-3 end-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-ubh-navy/80 text-white backdrop-blur transition-colors hover:bg-ubh-gold hover:text-ubh-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:bottom-4 sm:end-4"
                >
                  <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
                </a>
              </div>

              <div className="flex items-center gap-3 px-2 py-3 sm:px-3 sm:py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ubh-gold-light/20 bg-ubh-gold-light/10 text-ubh-gold-soft">
                  <Globe2 aria-hidden="true" className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">AlAinI</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {content.previewCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <section
        id="capabilities"
        className="scroll-mt-24 border-b border-slate-200/80 bg-white"
      >
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ubh-gold-deep sm:text-sm">
              {content.featuresLabel}
            </p>

            <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-ubh-navy sm:text-4xl lg:text-5xl">
              {content.featuresTitle}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
              {content.featuresDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {content.features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.number}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-ubh-canvas p-5 transition duration-300 hover:-translate-y-1 hover:border-ubh-gold/50 hover:bg-white hover:shadow-xl hover:shadow-ubh-navy/[0.06] motion-reduce:transform-none motion-reduce:transition-none sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ubh-navy/[0.05] text-ubh-blue transition-colors duration-200 group-hover:bg-ubh-navy group-hover:text-ubh-gold-soft">
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5"
                        strokeWidth={1.8}
                      />
                    </div>

                    <span className="font-serif text-sm text-slate-400">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold leading-snug text-ubh-navy sm:text-xl">
                    {feature.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>

                  <div className="mt-6 h-px w-full bg-slate-200 transition-colors group-hover:bg-ubh-gold/50" />
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* KNOWLEDGE & TECHNOLOGY */}
      <section className="bg-ubh-canvas">
        <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-24">
          <div className="relative overflow-hidden rounded-2xl bg-ubh-navy p-6 text-white sm:rounded-3xl sm:p-9 lg:p-10">
            <div
              aria-hidden="true"
              className="absolute -end-16 -top-16 h-48 w-48 rounded-full bg-ubh-gold/10 blur-2xl"
            />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-ubh-gold-light/20 bg-ubh-gold-light/10 text-ubh-gold-soft">
                <Database aria-hidden="true" className="h-5 w-5" />
              </div>

              <h2 className="mt-6 font-serif text-2xl leading-tight sm:text-3xl">
                {content.audienceTitle}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                {content.audienceDescription}
              </p>

              <a
                href={ALAINI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ubh-gold-soft transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light focus-visible:ring-offset-4 focus-visible:ring-offset-ubh-navy"
              >
                {content.primary}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ubh-gold-deep sm:text-sm">
              {content.audienceLabel}
            </p>

            <h2 className="mt-3 font-serif text-2xl leading-tight tracking-tight text-ubh-navy sm:text-3xl lg:text-4xl">
              {content.featuresTitle}
            </h2>

            <ul className="mt-7 space-y-4">
              {content.audiencePoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-4 sm:p-5"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-ubh-gold-deep"
                  />
                  <span className="text-sm leading-6 text-slate-700 sm:text-base">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="relative isolate overflow-hidden bg-ubh-navy text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(6,74,152,0.35),transparent_65%)]"
        />

        <Container className="py-16 text-center sm:py-20 lg:py-24">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-ubh-gold-light/25 bg-ubh-gold-light/10 text-ubh-gold-soft">
            <Sparkles aria-hidden="true" className="h-5 w-5" />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-ubh-gold-soft sm:text-sm">
            {content.ctaEyebrow}
          </p>

          <h2 className="mx-auto mt-3 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {content.ctaTitle}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            {content.ctaDescription}
          </p>

          <a
            href={ALAINI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ubh-gold-light px-7 py-3 text-sm font-semibold text-ubh-navy transition-colors duration-200 hover:bg-ubh-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy sm:w-auto"
          >
            {content.ctaButton}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>

          <p className="mt-8 text-xs text-slate-400">{content.footerNote}</p>
        </Container>
      </section>
    </main>
  );
}
