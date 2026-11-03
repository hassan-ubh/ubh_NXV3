import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Globe2,
  GraduationCap,
  Languages,
  MapPin,
  Printer,
  Send,
  Users,
} from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/Container";

import { isLocale, type Locale } from "@/lib/i18n";

const content = {
  en: {
    year: "1986",
    pageTitle: "About Us",
    pageEyebrow: "University Book House",
    heroTitle: "Connecting knowledge, culture and readers.",
    heroDescription:
      "University Book House has been serving the publishing, distribution and educational needs of readers and academic communities since 1986.",

    overviewLabel: "Company Overview",
    overviewTitle: "University Book House",
    overview: [
      "was established in 1986 to engage primarily in the business of printing and distributing foreign books with acquired copyright licenses from international publishers.",
      "With the advent of the 21st century, the company embarked on a publishing thrust and started expanding its range of titles by inviting local authors to write and publish books on various disciplines, including medicine, nursing, psychology, and law. It also published locally authored textbooks for basic education as well as trade books.",
    ],

    publishCta: "Publish with Us",

    visionLabel: "Our Vision",
    vision:
      "To be a leading global publisher, celebrated for excellence, cultural diversity, and educational impact. We aim to connect readers worldwide to international literature, fostering a more informed and interconnected world.",

    missionLabel: "Our Mission",
    mission:
      "To bring the world's knowledge and culture to our readers by offering a diverse range of high-quality books. We aim to foster global understanding, promote lifelong learning, and enrich lives through literature.",

    ambitionEyebrow: "Our Journey",
    ambitionTitle: "Locally committed,",
    ambitionTitle2: "Globally ambitious",
    ambitionText: [
      "As University Book House’s publication of local titles grew, the reprinting of widely prescribed foreign titles for basic and higher education and the importation of books from reputable international publishers also flourished.",
      "By doing so, it has produced up-to-date, premium-quality educational products to address the needs of the reading public in general and clients from the academe in particular. Thus, University Book House has positioned itself at the forefront of the UAE’s book industry.",
    ],

    servicesEyebrow: "What We Do",
    servicesTitle: "Our Services",
    servicesDescription:
      "From publishing and distribution to translation and printing, we support the complete journey of educational and academic content.",

    services: [
      {
        title: "Publishing",
        description:
          "We maintain a comprehensive collection of over 1,000 titles across diverse subjects and fields. Our focus is on publishing Arabic academic books authored by highly educated professionals, ensuring exceptional quality in every publication.",
        icon: BookOpen,
      },
      {
        title: "Distributing",
        description:
          "We also distribute books from reputable international publishers, bringing you a wide selection of high-quality global literature.",
        icon: Globe2,
      },
      {
        title: "Translating",
        description:
          "UBH partners with top printing companies to meet your needs, specializing in hardcover and softcover book printing, as well as high-quality color printing.",
        icon: Languages,
      },
      {
        title: "Printing",
        description:
          "UBH partners with top printing companies to meet your needs, specializing in hardcover and softcover book printing, as well as high-quality color printing.",
        icon: Printer,
      },
    ],

    stats: [
      {
        value: "1000+",
        label: "Publications",
        icon: BookOpen,
      },
      {
        value: "300+",
        label: "Authors",
        icon: Users,
      },
      {
        value: "100+",
        label: "Local & International Publishers",
        icon: Globe2,
      },
      {
        value: "Unlimited",
        label: "Happy Customers",
        icon: GraduationCap,
      },
    ],

    contactEyebrow: "Visit Us",
    contactTitle: "Our Location",
    contactText: "Our head office is located in Al Ain, United Arab Emirates.",
    addressLabel: "Head Office",
    address:
      "1st Floor, Bin Harmal Building, Sanayia, Al Ain, United Arab Emirates. P.O. Box 16983",
    phoneLabel: "Phone",
    phones: ["+971 3 755 8229", "+971 3 755 6911", "+971 3 755 4845"],
    emailLabel: "Email",
    email: "bookhouse@ubh.ae",

    exploreShop: "Explore Our Books",
    contactUs: "Contact Us",
  },

  ar: {
    year: "١٩٨٦",
    pageTitle: "حول الدار",
    pageEyebrow: "دار الكتاب الجامعي",
    heroTitle: "نصل المعرفة والثقافة بالقراء.",
    heroDescription:
      "تخدم دار الكتاب الجامعي احتياجات النشر والتوزيع والتعليم للقراء والمجتمعات الأكاديمية منذ عام 1986.",

    overviewLabel: "نبذة عن الشركة",
    overviewTitle: "دار الكتاب الجامعي",
    overview: [
      "تأسست في عام 1986 للقيام في المقام الأول بأعمال طباعة وتوزيع الكتب الأجنبية مع تراخيص حقوق النشر المكتسبة من الناشرين الدوليين.",
      "مع حلول القرن الحادي والعشرين، شرعت الشركة في تعزيز مجال النشر وبدأت في توسيع نطاق عناوينها من خلال دعوة المؤلفين المحليين لكتابة ونشر كتب في مختلف التخصصات، بما في ذلك الطب والتمريض وعلم النفس والقانون. كما نشرت كتبًا مدرسية من تأليف محليين للتعليم الأساسي بالإضافة إلى كتب تجارية.",
    ],

    publishCta: "انشر معنا",

    visionLabel: "رؤيتنا",
    vision:
      "أن نكون ناشرًا عالميًا رائدًا، ونشتهر بالتميز والتنوع الثقافي والتأثير التعليمي. نهدف إلى ربط القراء في جميع أنحاء العالم، وتعزيز عالم أكثر اطلاعًا وترابطًا.",

    missionLabel: "مهمتنا",
    mission:
      "تقديم المعرفة والثقافة لقرائنا من خلال تقديم مجموعة متنوعة من الكتب عالية الجودة. ونهدف إلى تشجيع التعلم مدى الحياة، وإثراء الحياة من خلال القراءة.",

    ambitionEyebrow: "مسيرتنا",
    ambitionTitle: "مميزون محليًا،",
    ambitionTitle2: "وطموحون عالميًا.",
    ambitionText: [
      "مع نمو نشر دار الكتاب الجامعي للعناوين المحلية، ازدهرت أيضًا إعادة طباعة العناوين الأجنبية المقررة على نطاق واسع للتعليم الأساسي والعالي واستيراد الكتب من ناشرين دوليين مرموقين.",
      "وبذلك، أنتجت دار الكتاب الجامعي منتجات تعليمية حديثة وعالية الجودة لتلبية احتياجات جمهور القراء بشكل عام والعملاء من الأوساط الأكاديمية بشكل خاص. وبذلك، وضعت دار الكتاب الجامعي نفسها في طليعة صناعة الكتاب في دولة الإمارات العربية المتحدة.",
    ],

    servicesEyebrow: "ما نقدمه",
    servicesTitle: "خدماتنا",
    servicesDescription:
      "من النشر والتوزيع إلى الترجمة والطباعة، ندعم مختلف مراحل المحتوى التعليمي والأكاديمي.",

    services: [
      {
        title: "النشر",
        description:
          "نحافظ على مجموعة شاملة تضم أكثر من 1000 عنوان في مختلف الموضوعات والمجالات. وينصب تركيزنا على نشر الكتب الأكاديمية العربية التي ألفها محترفون متعلمون تعليماً عالياً، مما يضمن جودة استثنائية في كل إصدار.",
        icon: BookOpen,
      },
      {
        title: "التوزيع",
        description:
          "نقوم أيضًا بتوزيع الكتب من دور النشر العالمية المرموقة، لنقدم لك مجموعة واسعة من الأدب العالمي عالي الجودة.",
        icon: Globe2,
      },
      {
        title: "الترجمة",
        description:
          "تتعاون دار الكتاب الجامعي مع شركات الطباعة الرائدة لتلبية احتياجاتك، وتتخصص في طباعة الكتب ذات الغلاف الصلب والغلاف الورقي، بالإضافة إلى الطباعة الملونة عالية الجودة.",
        icon: Languages,
      },
      {
        title: "الطباعة والتنسيق",
        description:
          "تتعاون دار الكتاب الجامعي مع شركات الطباعة الرائدة لتلبية احتياجاتك، وتتخصص في طباعة الكتب ذات الغلاف الصلب والغلاف الورقي، بالإضافة إلى الطباعة الملونة عالية الجودة.",
        icon: Printer,
      },
    ],

    stats: [
      {
        value: "1000+",
        label: "عدد الإصدارات",
        icon: BookOpen,
      },
      {
        value: "300+",
        label: "عدد المؤلفين",
        icon: Users,
      },
      {
        value: "100+",
        label: "عدد الناشرين المحليين والعالميين",
        icon: Globe2,
      },
      {
        value: "غير محدود",
        label: "عدد العملاء السعداء",
        icon: GraduationCap,
      },
    ],

    contactEyebrow: "تفضل بزيارتنا",
    contactTitle: "موقعنا",
    contactText: "يقع مكتبنا الرئيسي في مدينة العين، الإمارات العربية المتحدة.",
    addressLabel: "المكتب الرئيسي",
    address:
      "الطابق الأول، مبنى بن حرمل، الصناعية، العين، الإمارات العربية المتحدة. صندوق بريد 16983",
    phoneLabel: "الهاتف",
    phones: ["+971 3 755 8229", "+971 3 755 6911", "+971 3 755 4845"],
    emailLabel: "البريد الإلكتروني",
    email: "bookhouse@ubh.ae",

    exploreShop: "استكشف كتبنا",
    contactUs: "تواصل معنا",
  },
};

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const isArabic = locale === "ar";
  const t = content[locale as "en" | "ar"];

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-ubh-canvas text-ubh-navy"
    >
      <main>
        {/* ========================================================= */}
        {/* HERO                                                       */}
        {/* ========================================================= */}

        {/* <section className="relative overflow-hidden bg-ubh-navy">
          <div className="absolute inset-0">
            <Image
              src="/images/main_images/aboutus-hero.webp"
              alt=""
              fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
              priority
              className="object-cover opacity-40"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-ubh-navy via-ubh-navy/90 to-ubh-navy/45" />
          </div>

          <Container className="relative z-10">
            <div className="flex min-h-[430px] items-center py-20">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-ubh-gold-light">
                  {t.pageEyebrow}
                </p>

                <h1 className="font-serif text-5xl leading-[1.05] text-white md:text-6xl lg:text-7xl">
                  {t.heroTitle}
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
                  {t.heroDescription}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/shop`}
                    className="inline-flex items-center gap-2 rounded-md bg-ubh-gold-light px-6 py-3 text-sm font-semibold text-ubh-navy transition hover:bg-[#e8c477]"
                  >
                    {t.exploreShop}

                    <ArrowRight
                      size={16}
                      className={isArabic ? "rotate-180" : ""}
                    />
                  </Link>

                  <Link
                    href={`/${locale}/contact-us`}
                    className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {t.contactUs}
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section> */}

        <section className="relative isolate overflow-hidden bg-ubh-navy">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/main_images/aboutus-hero.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              quality={85}
              className="object-cover object-center"
            />

            <div
              className={`absolute inset-0 ${
                isArabic ? "bg-gradient-to-l" : "bg-gradient-to-r"
              } from-ubh-navy/95 via-ubh-navy/80 to-ubh-navy/40`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-ubh-navy/45 via-transparent to-ubh-navy/15" />
          </div>

          <Container className="relative z-10">
            <div className="flex min-h-[480px] items-center py-20 sm:min-h-[540px] sm:py-24 lg:min-h-[620px]">
              <div className="about-reveal w-full max-w-3xl">
                <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-ubh-gold-light sm:text-sm">
                  <span className="h-px w-8 shrink-0 bg-ubh-gold-light" />
                  {t.pageEyebrow}
                </p>

                <h1 className="font-serif text-[clamp(2.6rem,6vw,5.4rem)] font-medium leading-[1.12] tracking-tight text-white [text-wrap:balance]">
                  {t.heroTitle}
                </h1>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8 lg:text-lg">
                  {t.heroDescription}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={`/${locale}/shop`}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ubh-gold-light px-6 py-3 text-sm font-semibold text-ubh-navy transition-colors duration-300 hover:bg-[#e8c477] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ubh-navy"
                  >
                    {t.exploreShop}
                    <ArrowRight
                      size={16}
                      className={isArabic ? "rotate-180" : ""}
                    />
                  </Link>

                  <Link
                    href={`/${locale}/contact-us`}
                    className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/30 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light"
                  >
                    {t.contactUs}
                  </Link>
                </div>

                <div className="mt-10 flex items-center gap-3 text-xs text-white/60 sm:text-sm">
                  <span className="h-px w-8 bg-ubh-gold-light" />
                  <span>
                    {isArabic ? "منذ عام ١٩٨٦" : "Established in 1986"}
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* COMPANY OVERVIEW                                           */}
        {/* ========================================================= */}

        <section className="py-20 md:py-24">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/main_images/aboutus1.webp"
                    alt={t.overviewTitle}
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div
                  className={`absolute -bottom-6 ${
                    isArabic ? "-left-6" : "-right-6"
                  } hidden rounded-xl bg-ubh-navy p-6 text-white shadow-xl sm:block`}
                >
                  <div className="font-serif text-4xl text-ubh-gold-light">
                    {t.year}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-white/60">
                    {isArabic ? "عام التأسيس" : "Established"}
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-ubh-gold">
                  {t.overviewLabel}
                </p>

                <h2 className="font-serif text-4xl leading-tight text-ubh-navy md:text-5xl">
                  {t.overviewTitle}
                </h2>

                <div className="mt-7 space-y-5 text-[15px] leading-7 text-ubh-blue-muted">
                  {t.overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <Link
                  href={`/${locale}/publish-with-us`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ubh-navy transition hover:text-ubh-gold"
                >
                  {t.publishCta}

                  <ArrowRight
                    size={16}
                    className={isArabic ? "rotate-180" : ""}
                  />
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* VISION / MISSION                                           */}
        {/* ========================================================= */}

        <section className="bg-[#f3f6f9] py-20 md:py-24">
          <Container>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl bg-ubh-navy p-8 text-white md:p-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-ubh-gold-light/15">
                  <Globe2 size={23} className="text-ubh-gold-light" />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ubh-gold-light">
                  {t.visionLabel}
                </p>

                <p className="mt-5 text-lg leading-8 text-white/80">
                  {t.vision}
                </p>
              </article>

              <article className="rounded-2xl border border-ubh-border bg-white p-8 md:p-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-ubh-navy/5">
                  <BookOpen size={23} className="text-ubh-navy" />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ubh-gold">
                  {t.missionLabel}
                </p>

                <p className="mt-5 text-lg leading-8 text-ubh-blue-muted">
                  {t.mission}
                </p>
              </article>
            </div>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* LOCAL / GLOBAL                                             */}
        {/* ========================================================= */}

        <section className="relative overflow-hidden bg-white py-20 md:py-28">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-ubh-gold">
                  {t.ambitionEyebrow}
                </p>

                <h2 className="font-serif text-4xl leading-tight text-ubh-navy md:text-5xl lg:text-6xl">
                  {t.ambitionTitle}
                  <br />
                  <span className="text-ubh-gold">{t.ambitionTitle2}</span>
                </h2>

                <div className="mt-7 space-y-5 text-[15px] leading-7 text-ubh-blue-muted">
                  {t.ambitionText.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-ubh-navy">
                  <Image
                    src="/images/main_images/about-global.webp"
                    alt=""
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div
                  className={`absolute -bottom-5 ${
                    isArabic ? "-right-5" : "-left-5"
                  } h-24 w-24 rounded-2xl border-8 border-white bg-ubh-gold-light`}
                />
              </div>
            </div>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* SERVICES                                                   */}
        {/* ========================================================= */}

        <section className="bg-ubh-navy py-20 md:py-24">
          <Container>
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-ubh-gold-light">
                {t.servicesEyebrow}
              </p>

              <h2 className="font-serif text-4xl text-white md:text-5xl">
                {t.servicesTitle}
              </h2>

              <p className="mt-5 text-base leading-7 text-white/65">
                {t.servicesDescription}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
              {t.services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.title}
                    className="about-card rounded-2xl border border-white/10 bg-white/[0.05] p-6 sm:p-7"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ubh-gold-light/10">
                        <Icon size={23} className="text-ubh-gold-light" />
                      </div>

                      <span className="font-serif text-3xl text-white/10">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-8 font-serif text-2xl text-white">
                      {service.title}
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-white/55">
                      {service.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* STATS                                                      */}
        {/* ========================================================= */}

        <section className="border-b border-ubh-border bg-white">
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {t.stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className={`border-b border-slate-200 px-3 py-8 text-center transition-colors duration-200 hover:bg-slate-50 sm:px-5 sm:py-10 ${
                      index % 2 === 0 ? "border-e" : ""
                    } ${index < 2 ? "lg:border-b-0" : "lg:border-b-0"} ${
                      index < t.stats.length - 1 ? "lg:border-e" : ""
                    }`}
                  >
                    <Icon size={22} className="mx-auto text-ubh-gold" />

                    <div className="mt-4 font-serif text-3xl font-semibold text-ubh-navy md:text-4xl">
                      {stat.value}
                    </div>

                    <p className="mx-auto mt-2 max-w-[170px] text-xs leading-5 text-ubh-blue-muted">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* LOCATION / CONTACT                                         */}
        {/* ========================================================= */}

        <section className="py-20 md:py-24">
          <Container>
            <div className="grid overflow-hidden rounded-2xl border border-ubh-border bg-white lg:grid-cols-[0.85fr_1.15fr]">
              <div className="bg-ubh-navy p-8 text-white md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ubh-gold-light">
                  {t.contactEyebrow}
                </p>

                <h2 className="mt-3 font-serif text-4xl">{t.contactTitle}</h2>

                <p className="mt-5 text-sm leading-6 text-white/65">
                  {t.contactText}
                </p>

                <div className="mt-8 space-y-7">
                  <div className="flex gap-4">
                    <MapPin
                      size={20}
                      className="mt-0.5 shrink-0 text-ubh-gold-light"
                    />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                        {t.addressLabel}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-white/80">
                        {t.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Send
                      size={19}
                      className="mt-0.5 shrink-0 text-ubh-gold-light"
                    />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                        {t.emailLabel}
                      </p>

                      <a
                        href={`mailto:${t.email}`}
                        className="mt-2 block text-sm text-white/80 transition hover:text-ubh-gold-light"
                      >
                        {t.email}
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                      {t.phoneLabel}
                    </p>

                    <div className="mt-2 space-y-1 text-sm text-white/80">
                      {t.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="block transition hover:text-ubh-gold-light"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[320px] overflow-hidden bg-[#eef2f5] sm:min-h-[400px] lg:min-h-full lg:h-full">
                <iframe
                  title={t.contactTitle}
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d930389.9917710456!2d55.0689697!3d24.3696155!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e8ab7beda4794bd%3A0xe4832a4af0be8a6b!2sUniversity%20Book%20House!5e0!3m2!1sen!2sae!4v1790773710450!5m2!1sen!2sae"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
