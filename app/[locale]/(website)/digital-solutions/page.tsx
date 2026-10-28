import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Globe2,
  Languages,
  Printer,
  Sparkles,
  BookMarked,
  Building2,
} from "lucide-react";

type Locale = "en" | "ar";

type DigitalSolutionsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function DigitalSolutionsPage({
  params,
}: DigitalSolutionsPageProps) {
  const { locale: rawLocale } = await params;

  const locale: Locale = rawLocale === "ar" ? "ar" : "en";
  const isArabic = locale === "ar";

  const content = {
    en: {
      heroEyebrow: "PUBLISHING • DISTRIBUTION • KNOWLEDGE",
      heroTitle: "Connecting Academic Knowledge to the World",
      heroDescription:
        "From academic publishing and international book distribution to publishing support services, University Book House helps connect authors, publishers, institutions, and readers through knowledge.",
      primaryCta: "Discuss Your Project",
      secondaryCta: "Explore Our Services",

      introEyebrow: "WHO WE ARE",
      introTitle: "A Trusted Partner in Academic Publishing",
      introDescription:
        "Established in 1986, University Book House supports the academic and educational community through publishing, book distribution, and related services. We bring together knowledge, publishers, authors, and institutions to make educational resources more accessible.",
      introNote:
        "Supporting the journey of knowledge from the people who create it to the people who need it.",
      benefits: [
        "Academic and educational publishing",
        "Access to local and international book collections",
        "Publishing support for authors and institutions",
        "Services tailored to educational and academic needs",
      ],

      servicesEyebrow: "WHAT WE DO",
      servicesTitle: "Services That Bring Knowledge Further",
      servicesDescription:
        "Discover how our publishing and distribution experience can support your next academic or educational project.",

      services: [
        {
          title: "Academic Publishing",
          description:
            "Support for academic and educational publishing projects, helping authors bring valuable knowledge to readers.",
          icon: BookOpen,
          label: "Publishing",
        },
        {
          title: "Book Distribution",
          description:
            "Connecting academic customers and institutions with books and educational resources from publishers.",
          icon: Globe2,
          label: "Distribution",
        },
        {
          title: "Publishing Support",
          description:
            "Discuss your manuscript, editorial requirements, translation needs, and print-production requirements with our team.",
          icon: Languages,
          label: "Editorial Services",
        },
        {
          title: "Books & Educational Resources",
          description:
            "Discover books and learning resources that support teaching, research, professional development, and lifelong learning.",
          icon: BookMarked,
          label: "Knowledge Resources",
        },
        {
          title: "Institutional Enquiries",
          description:
            "Talk to us about book requirements, academic collections, and educational resources for your institution.",
          icon: Building2,
          label: "Institutions",
        },
        {
          title: "Printing & Production",
          description:
            "Discuss print-production requirements for your book or educational publishing project with our team.",
          icon: Printer,
          label: "Print Services",
        },
      ],

      ctaEyebrow: "LET'S WORK TOGETHER",
      ctaTitle: "Have a Publishing or Distribution Project?",
      ctaDescription:
        "Whether you are an author, publisher, educator, or institution, our team can help you explore the right next step for your project.",
      ctaPrimary: "Contact Our Team",
      ctaSecondary: "Publish With Us",

      imageAlt: "Academic books and educational publishing",
    },

    ar: {
      heroEyebrow: "النشر • التوزيع • المعرفة",
      heroTitle: "نربط المعرفة الأكاديمية بالعالم",
      heroDescription:
        "من النشر الأكاديمي وتوزيع الكتب إلى خدمات دعم النشر، تسهم دار الكتاب الجامعي في ربط المؤلفين والناشرين والمؤسسات والقراء من خلال المعرفة.",
      primaryCta: "ناقش مشروعك معنا",
      secondaryCta: "اكتشف خدماتنا",

      introEyebrow: "من نحن",
      introTitle: "شريك موثوق في النشر الأكاديمي",
      introDescription:
        "تأسست دار الكتاب الجامعي عام 1986، وتدعم المجتمع الأكاديمي والتعليمي من خلال النشر وتوزيع الكتب والخدمات ذات الصلة. ونعمل على ربط المعرفة بالناشرين والمؤلفين والمؤسسات لتسهيل الوصول إلى المصادر التعليمية.",
      introNote:
        "ندعم رحلة المعرفة من الأشخاص الذين ينتجونها إلى الأشخاص الذين يحتاجون إليها.",
      benefits: [
        "نشر الكتب الأكاديمية والتعليمية",
        "الوصول إلى مجموعات الكتب المحلية والدولية",
        "دعم مشاريع النشر للمؤلفين والمؤسسات",
        "خدمات تلبي احتياجات التعليم والمجتمع الأكاديمي",
      ],

      servicesEyebrow: "ماذا نقدم",
      servicesTitle: "خدمات توسّع آفاق المعرفة",
      servicesDescription:
        "اكتشف كيف يمكن لخبراتنا في النشر والتوزيع أن تدعم مشروعك الأكاديمي أو التعليمي القادم.",

      services: [
        {
          title: "النشر الأكاديمي",
          description:
            "دعم مشاريع نشر الكتب الأكاديمية والتعليمية ومساعدة المؤلفين على إيصال المعرفة إلى القراء.",
          icon: BookOpen,
          label: "النشر",
        },
        {
          title: "توزيع الكتب",
          description:
            "ربط العملاء والمؤسسات الأكاديمية بالكتب والمصادر التعليمية المتاحة من الناشرين.",
          icon: Globe2,
          label: "التوزيع",
        },
        {
          title: "خدمات دعم النشر",
          description:
            "ناقش مع فريقنا احتياجات المخطوطات والتحرير والترجمة ومتطلبات إنتاج المطبوعات.",
          icon: Languages,
          label: "الخدمات التحريرية",
        },
        {
          title: "الكتب والمصادر التعليمية",
          description:
            "اكتشف الكتب والمصادر التي تدعم التدريس والبحث والتطوير المهني والتعلم المستمر.",
          icon: BookMarked,
          label: "مصادر المعرفة",
        },
        {
          title: "خدمات المؤسسات",
          description:
            "تواصل معنا لمناقشة احتياجات الكتب والمجموعات الأكاديمية والمصادر التعليمية لمؤسستك.",
          icon: Building2,
          label: "المؤسسات",
        },
        {
          title: "الطباعة والإنتاج",
          description:
            "ناقش مع فريقنا متطلبات الطباعة والإنتاج لمشروع كتابك أو مشروعك التعليمي.",
          icon: Printer,
          label: "خدمات الطباعة",
        },
      ],

      ctaEyebrow: "لنعمل معًا",
      ctaTitle: "هل لديك مشروع نشر أو توزيع؟",
      ctaDescription:
        "سواء كنت مؤلفًا أو ناشرًا أو معلمًا أو مؤسسة، يمكن لفريقنا مساعدتك في تحديد الخطوة المناسبة لمشروعك.",
      ctaPrimary: "تواصل مع فريقنا",
      ctaSecondary: "انشر معنا",

      imageAlt: "الكتب الأكاديمية والنشر التعليمي",
    },
  }[locale];

  const contactHref = `/${locale}/contact-us`;
  const publishHref = `/${locale}/publish-with-us`;

  return (
    <main
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className="overflow-hidden bg-ubh-canvas text-ubh-navy"
    >
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative isolate overflow-hidden bg-ubh-navy text-white">
        <div className="absolute inset-0 -z-30">
          <Image
            src="/images/main_images/digital/martin-adams-_OZCl4XcpRw-unsplash.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
        </div>

        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-ubh-navy/95 via-ubh-navy/85 to-ubh-blue/80" />

        <div
          aria-hidden="true"
          className="absolute -end-28 -top-28 -z-10 h-72 w-72 rounded-full bg-ubh-gold/15 blur-3xl sm:h-96 sm:w-96"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-2 text-[10px] font-semibold tracking-[0.12em] text-slate-200 backdrop-blur-sm sm:text-xs">
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-ubh-gold-light"
              />
              <span>{content.heroEyebrow}</span>
            </div>

            <h1 className="mt-6 text-3xl font-semibold leading-[1.18] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {content.heroTitle}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
              {content.heroDescription}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={contactHref}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ubh-gold-light px-6 py-3 text-sm font-semibold text-ubh-navy transition-colors duration-200 hover:bg-ubh-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy sm:w-auto"
              >
                {content.primaryCta}

                <ArrowRight
                  aria-hidden="true"
                  className={`h-4 w-4 ${
                    isArabic ? "rotate-180" : ""
                  }`}
                />
              </Link>

              <a
                href="#services"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/25 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light sm:w-auto"
              >
                {content.secondaryCta}
              </a>
            </div>

            <div className="mt-7 flex items-center gap-2 text-xs text-slate-300 sm:text-sm">
              <CheckCircle2
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-ubh-gold-light"
              />
              <span>
                {isArabic
                  ? "خبرة في خدمة قطاع الكتب والتعليم منذ عام 1986"
                  : "Serving the book and education sector since 1986"}
              </span>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -bottom-3 -end-3 h-2/3 w-2/3 rounded-3xl bg-ubh-gold/20 sm:-bottom-4 sm:-end-4" />

            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 sm:rounded-3xl">
              <Image
                src="/images/main_images/digital/felirbe-tIgkgognTwc-unsplash.jpg"
                alt={content.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 560px"
                className="object-cover transition-transform duration-700 motion-safe:hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-ubh-navy/65 via-transparent to-transparent" />

              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/15 bg-ubh-navy/75 p-4 backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ubh-gold-soft">
                  {isArabic ? "دار الكتاب الجامعي" : "UNIVERSITY BOOK HOUSE"}
                </p>

                <p className="mt-2 text-lg font-semibold text-white sm:text-xl">
                  {isArabic
                    ? "المعرفة تبدأ بكتاب"
                    : "Knowledge Starts with a Book"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="h-px bg-gradient-to-r from-transparent via-ubh-gold-light/50 to-transparent"
        />
      </section>

      {/* =========================================================
          INTRODUCTION
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ubh-gold-deep sm:text-sm">
              {content.introEyebrow}
            </p>

            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-ubh-navy sm:text-3xl md:text-4xl">
              {content.introTitle}
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8">
              {content.introDescription}
            </p>

            <ul className="mt-7 space-y-4 sm:mt-8">
              {content.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-ubh-gold-deep"
                  />

                  <span className="text-sm leading-6 text-slate-700 sm:text-base">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-s-2 border-ubh-gold ps-4 sm:mt-9 sm:ps-5">
              <p className="text-sm italic leading-7 text-slate-600 sm:text-base">
                {content.introNote}
              </p>
            </div>
          </div>

          {/* INTRO IMAGE */}
          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="absolute -bottom-3 -start-3 h-2/3 w-2/3 rounded-3xl bg-ubh-gold-light/15 sm:-bottom-4 sm:-start-4" />
<div className="group relative aspect-[5/4] overflow-hidden rounded-2xl bg-slate-100 shadow-xl shadow-ubh-navy/10 sm:rounded-3xl">
  <Image
    src="/images/main_images/digital/martin-adams-_OZCl4XcpRw-unsplash.jpg"
    alt={content.imageAlt}
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 560px"
    className="object-cover transition-transform duration-700 group-hover:scale-105"
  />

  {/* Strong navy overlay */}
  <div className="absolute inset-0 bg-ubh-navy/70" />

  {/* Premium navy gradient */}
  <div className="absolute inset-0 bg-gradient-to-t from-ubh-navy/95 via-ubh-navy/55 to-ubh-navy/20" />

  {/* Subtle gold glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-ubh-gold/15 via-transparent to-transparent" />
</div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SERVICES
      ========================================================= */}
      <section
        id="services"
        className="scroll-mt-24 border-y border-slate-200/80 bg-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ubh-gold-deep sm:text-sm">
              {content.servicesEyebrow}
            </p>

            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-ubh-navy sm:text-3xl md:text-4xl">
              {content.servicesTitle}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
              {content.servicesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {content.services.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-ubh-canvas p-5 transition duration-300 hover:-translate-y-1 hover:border-ubh-gold/50 hover:bg-white hover:shadow-xl hover:shadow-ubh-navy/[0.06] motion-reduce:transform-none motion-reduce:transition-none sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ubh-navy/[0.05] text-ubh-blue transition-colors duration-200 group-hover:bg-ubh-navy group-hover:text-ubh-gold-soft">
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5"
                        strokeWidth={1.8}
                      />
                    </div>

                    <span className="text-xs font-medium text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-ubh-gold-deep sm:text-xs">
                    {service.label}
                  </p>

                  <h3 className="mt-2 text-lg font-semibold leading-snug text-ubh-navy sm:text-xl">
                    {service.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {service.description}
                  </p>

                  <Link
                    href={
                      index === 0
                        ? publishHref
                        : contactHref
                    }
                    className="mt-6 inline-flex min-h-10 w-fit items-center gap-2 rounded-md text-sm font-semibold text-ubh-blue transition-colors hover:text-ubh-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold focus-visible:ring-offset-4"
                  >
                    {isArabic ? "اعرف المزيد" : "Enquire Now"}

                    <ArrowRight
                      aria-hidden="true"
                      className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 ${
                        isArabic
                          ? "rotate-180 group-hover:-translate-x-1"
                          : ""
                      }`}
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative isolate overflow-hidden bg-ubh-navy text-white">
        <div
          aria-hidden="true"
          className="absolute -start-24 -top-24 -z-10 h-64 w-64 rounded-full bg-ubh-gold/10 blur-3xl sm:h-80 sm:w-80"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-32 -end-20 -z-10 h-72 w-72 rounded-full bg-ubh-blue/70 blur-3xl"
        />

        <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-ubh-gold-light/25 bg-ubh-gold-light/10 text-ubh-gold-soft">
            <Sparkles aria-hidden="true" className="h-5 w-5" />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-ubh-gold-soft sm:text-sm">
            {content.ctaEyebrow}
          </p>

          <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            {content.ctaTitle}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
            {content.ctaDescription}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={contactHref}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ubh-gold-light px-7 py-3 text-sm font-semibold text-ubh-navy transition-colors duration-200 hover:bg-ubh-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy sm:w-auto"
            >
              {content.ctaPrimary}

              <ArrowRight
                aria-hidden="true"
                className={`h-4 w-4 ${
                  isArabic ? "rotate-180" : ""
                }`}
              />
            </Link>

            <Link
              href={publishHref}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light sm:w-auto"
            >
              {content.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}