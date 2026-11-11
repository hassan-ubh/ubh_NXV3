import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/Container";
import { isLocale } from "@/lib/i18n";

type Locale = "en" | "ar";

type ContactUsPageProps = {
  params: Promise<{ locale: string }>;
};

const content = {
  en: {
    eyebrow: "WE ARE HERE TO HELP",
    title: "Let's start a conversation.",
    description:
      "Whether you're looking for academic books, publishing support, or institutional solutions, our team is ready to help.",
    formEyebrow: "SEND AN ENQUIRY",
    formTitle: "How can we help you?",
    formDescription:
      "Tell us a little about what you need and our team can follow up with you.",
    name: "Full name",
    phone: "Phone number",
    email: "Email address",
    company: "Company / Institution",
    subject: "Subject",
    message: "Your message",
    required: "Required",
    namePlaceholder: "Enter your full name",
    phonePlaceholder: "+971 50 123 4567",
    emailPlaceholder: "you@example.com",
    companyPlaceholder: "Your organisation (optional)",
    subjectPlaceholder: "What would you like to discuss?",
    messagePlaceholder: "Tell us how we can help...",
    submit: "Prepare enquiry",
    formNote:
      "This form needs to be connected to our enquiry service before messages can be submitted.",
    contactEyebrow: "CONTACT DETAILS",
    contactTitle: "Reach our team",
    locationTitle: "Visit our office",
    locationDescription:
      "Our head office is located in Al Ain, United Arab Emirates.",
    address:
      "1st Floor, Bin Harmal Building, Sanayia, Al Ain, United Arab Emirates. P.O. Box 16983",
    emailLabel: "Email us",
    phoneLabel: "Call us",
    hoursTitle: "Working hours",
    hoursDescription:
      "Please contact us directly to confirm current office and service hours.",
    mapTitle: "Find our office",
    mapDescription:
      "View the University Book House location on the map.",
    mapLink: "Open in Google Maps",
    shopTitle: "Explore a world of knowledge.",
    shopDescription:
      "Discover academic books, publications, and learning resources from University Book House.",
    shopCta: "Explore our books",
    aboutCta: "About UBH",
  },
  ar: {
    eyebrow: "نحن هنا لمساعدتك",
    title: "لنبدأ حوارًا.",
    description:
      "سواء كنتم تبحثون عن الكتب الأكاديمية أو خدمات النشر أو الحلول المؤسسية، فإن فريقنا مستعد لمساعدتكم.",
    formEyebrow: "أرسل استفسارك",
    formTitle: "كيف يمكننا مساعدتك؟",
    formDescription:
      "أخبرنا باحتياجاتك وسيعمل فريقنا على متابعة استفسارك.",
    name: "الاسم الكامل",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    company: "الشركة / المؤسسة",
    subject: "الموضوع",
    message: "رسالتك",
    required: "مطلوب",
    namePlaceholder: "أدخل اسمك الكامل",
    phonePlaceholder: "+971 50 123 4567",
    emailPlaceholder: "you@example.com",
    companyPlaceholder: "اسم المؤسسة (اختياري)",
    subjectPlaceholder: "ما الموضوع الذي تود مناقشته؟",
    messagePlaceholder: "أخبرنا كيف يمكننا مساعدتك...",
    submit: "تجهيز الاستفسار",
    formNote:
      "يجب ربط هذا النموذج بخدمة استقبال الاستفسارات قبل إرسال الرسائل.",
    contactEyebrow: "معلومات التواصل",
    contactTitle: "تواصل مع فريقنا",
    locationTitle: "قم بزيارة مكتبنا",
    locationDescription:
      "يقع مكتبنا الرئيسي في مدينة العين، الإمارات العربية المتحدة.",
    address:
      "الطابق الأول، مبنى بن حرمل، الصناعية، العين، الإمارات العربية المتحدة. صندوق بريد 16983",
    emailLabel: "راسلنا عبر البريد",
    phoneLabel: "اتصل بنا",
    hoursTitle: "ساعات العمل",
    hoursDescription:
      "يرجى التواصل معنا مباشرة للتأكد من ساعات العمل والخدمات الحالية.",
    mapTitle: "اعثر على مكتبنا",
    mapDescription: "شاهد موقع دار الكتاب الجامعي على الخريطة.",
    mapLink: "افتح في خرائط Google",
    shopTitle: "اكتشف عالمًا من المعرفة.",
    shopDescription:
      "اكتشف الكتب الأكاديمية والمنشورات والموارد التعليمية من دار الكتاب الجامعي.",
    shopCta: "استكشف كتبنا",
    aboutCta: "عن دار الكتاب الجامعي",
  },
} satisfies Record<Locale, Record<string, string>>;

const phoneNumbers = [
  "+971 3 755 8229",
  "+971 3 755 6911",
  "+971 3 755 4845",
];

const fieldClass =
  "mt-2 h-12 w-full rounded-xl border border-[#dce4ed] bg-ubh-canvas px-4 text-sm text-ubh-navy outline-none transition-colors placeholder:text-[#91a0b3] hover:border-[#b8c7d8] focus:border-ubh-gold focus:bg-white focus:ring-4 focus:ring-ubh-gold/10";

const textareaClass =
  "mt-2 min-h-36 w-full resize-y rounded-xl border border-[#dce4ed] bg-ubh-canvas px-4 py-3 text-sm leading-6 text-ubh-navy outline-none transition-colors placeholder:text-[#91a0b3] hover:border-[#b8c7d8] focus:border-ubh-gold focus:bg-white focus:ring-4 focus:ring-ubh-gold/10";

export async function generateMetadata({
  params,
}: ContactUsPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const t = content[locale as Locale];

  return {
    title: locale === "ar" ? "تواصل معنا | دار الكتاب الجامعي" : "Contact Us",
    description: t.description,
    alternates: {
      languages: {
        en: "/en/contact-us",
        ar: "/ar/contact-us",
      },
    },
  };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-ubh-gold-deep">
      {children}
    </p>
  );
}

function ContactField({
  id,
  label,
  placeholder,
  type = "text",
  required = false,
  dir,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-[#172b45]"
      >
        {label}
        {required && (
          <span className="ms-1 text-ubh-gold-deep" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        dir={dir}
        autoComplete={
          id === "name"
            ? "name"
            : id === "email"
              ? "email"
              : id === "phone"
                ? "tel"
                : id === "company"
                  ? "organization"
                  : undefined
        }
        placeholder={placeholder}
        className={fieldClass}
      />
    </div>
  );
}

export default async function ContactUsPage({
  params,
}: ContactUsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const language = locale as Locale;
  const isArabic = language === "ar";
  const t = content[language];
  const DirectionalArrow = isArabic ? ArrowRight : ArrowUpRight;

  return (
    <main
      lang={language}
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen overflow-hidden bg-ubh-canvas text-ubh-navy"
    >
      {/* Hero */}
      {/* <section className="relative isolate overflow-hidden bg-ubh-navy">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-28 -top-36 h-80 w-80 rounded-full bg-ubh-gold/15 blur-3xl md:h-[28rem] md:w-[28rem]" />
          <div className="absolute -bottom-48 -left-20 h-96 w-96 rounded-full bg-[#17477e]/40 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_55%,rgba(255,255,255,0.035)_55%,transparent_75%)]" />
        </div>

        <Container className="relative">
          <div className="grid min-h-[320px] items-center gap-8 py-16 sm:py-20 lg:min-h-[370px] lg:grid-cols-[1fr_auto] lg:py-24">
            <div className="max-w-3xl">
              <SectionLabel>{t.eyebrow}</SectionLabel>
              <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.13] tracking-tight text-white sm:text-5xl md:text-6xl">
                {t.title}
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                {t.description}
              </p>
            </div>

            <div className="hidden h-32 w-32 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] lg:flex">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-ubh-gold-light/50 text-ubh-gold-light">
                <Mail size={34} strokeWidth={1.4} />
              </div>
            </div>
          </div>
        </Container>
      </section> */}
      {/* Hero */}
<section className="relative isolate overflow-hidden bg-ubh-navy">

  {/* Background image */}
  <Image
    src="/images/main_images/lib_im_1.jpg"
    alt=""
    fill
    priority
    sizes="100vw"
    className="object-cover object-center"
  />

  {/* Dark overlay for readability */}
  <div
    aria-hidden="true"
    className="absolute inset-0 bg-gradient-to-r from-ubh-navy/95 via-ubh-navy/85 to-ubh-navy/65"
  />

  {/* Decorative background effects */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <div className="absolute -right-28 -top-36 h-80 w-80 rounded-full bg-ubh-gold/15 blur-3xl md:h-[28rem] md:w-[28rem]" />
    <div className="absolute -bottom-48 -left-20 h-96 w-96 rounded-full bg-[#17477e]/40 blur-3xl" />
    <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_55%,rgba(255,255,255,0.035)_55%,transparent_75%)]" />
  </div>

  <Container className="relative z-10">
    <div className="grid min-h-[320px] items-center gap-8 py-16 sm:py-20 lg:min-h-[370px] lg:grid-cols-[1fr_auto] lg:py-24">

      <div className="max-w-3xl">
        <SectionLabel>{t.eyebrow}</SectionLabel>

        <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.13] tracking-tight text-white sm:text-5xl md:text-6xl">
          {t.title}
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
          {t.description}
        </p>
      </div>

      <div className="hidden h-32 w-32 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] lg:flex">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-ubh-gold-light/50 text-ubh-gold-light">
          <Mail size={34} strokeWidth={1.4} />
        </div>
      </div>

    </div>
  </Container>
</section>

      {/* Form and contact details */}
      <section className="relative py-10 sm:py-14 lg:py-20">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:gap-10">
            {/* Contact form */}
            <section
              aria-labelledby="contact-form-title"
              className="min-w-0 rounded-2xl border border-[#e1e8f0] bg-white p-5 shadow-[0_12px_45px_-32px_rgba(6,26,55,0.28)] sm:rounded-3xl sm:p-8 lg:p-10"
            >
              <SectionLabel>{t.formEyebrow}</SectionLabel>
              <h2
                id="contact-form-title"
                className="mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-4xl"
              >
                {t.formTitle}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#64758b]">
                {t.formDescription}
              </p>

              {/* Connect this form to a server action/API before production. */}
              <form
                action="#"
                method="get"
                className="mt-8 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <ContactField
                    id="name"
                    label={t.name}
                    placeholder={t.namePlaceholder}
                    required
                  />
                  <ContactField
                    id="phone"
                    label={t.phone}
                    placeholder={t.phonePlaceholder}
                    type="tel"
                    dir="ltr"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <ContactField
                    id="email"
                    label={t.email}
                    placeholder={t.emailPlaceholder}
                    type="email"
                    required
                    dir="ltr"
                  />
                  <ContactField
                    id="company"
                    label={t.company}
                    placeholder={t.companyPlaceholder}
                  />
                </div>

                <ContactField
                  id="subject"
                  label={t.subject}
                  placeholder={t.subjectPlaceholder}
                  required
                />

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-[#172b45]"
                  >
                    {t.message}
                    <span className="ms-1 text-ubh-gold-deep" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t.messagePlaceholder}
                    className={textareaClass}
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-ubh-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0b2a52] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ubh-gold/30 sm:w-auto"
                >
                  {t.submit}
                  <ArrowRight
                    size={17}
                    className={`transition-transform duration-200 group-hover:translate-x-1 ${
                      isArabic ? "rotate-180 group-hover:-translate-x-1" : ""
                    }`}
                  />
                </button>

                <p className="text-xs leading-5 text-[#8290a2]">
                  {t.formNote}
                </p>
              </form>
            </section>

            {/* Contact information */}
            <aside className="min-w-0 space-y-5">
              <div className="rounded-2xl bg-ubh-navy p-6 text-white sm:rounded-3xl sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ubh-gold-light/10 text-ubh-gold-light">
                  <MapPin size={23} strokeWidth={1.7} />
                </div>

                <SectionLabel>{t.contactEyebrow}</SectionLabel>
                <h2 className="mt-3 font-serif text-2xl sm:text-3xl">
                  {t.contactTitle}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {t.locationDescription}
                </p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ubh-gold-light">
                    {t.locationTitle}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/85">
                    {t.address}
                  </p>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=University+Book+House+Al+Ain+UAE"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#e5bd70] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ubh-gold-light"
                >
                  {t.mapLink}
                  <DirectionalArrow size={15} />
                </a>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-[#e1e8f0] bg-white p-5 sm:rounded-2xl sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f3f6fa] text-ubh-gold-deep">
                    <Mail size={21} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8492a4]">
                      {t.emailLabel}
                    </p>
                    <a
                      href="mailto:bookhouse@ubh.ae"
                      dir="ltr"
                      className="mt-2 inline-block break-all text-sm font-semibold text-ubh-navy transition-colors hover:text-ubh-gold-deep"
                    >
                      bookhouse@ubh.ae
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone numbers */}
              <div className="rounded-2xl border border-[#e1e8f0] bg-white p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f3f6fa] text-ubh-gold-deep">
                    <Phone size={21} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8492a4]">
                      {t.phoneLabel}
                    </p>
                    <div className="mt-2 space-y-2">
                      {phoneNumbers.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          dir="ltr"
                          className="block w-fit text-sm font-semibold text-ubh-navy transition-colors hover:text-ubh-gold-deep"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Working hours */}
              <div className="rounded-2xl border border-[#e1e8f0] bg-[#f4f7fa] p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-ubh-gold-deep">
                    <Clock3 size={21} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ubh-navy">
                      {t.hoursTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#64758b]">
                      {t.hoursDescription}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="border-y border-[#e1e8f0] bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <SectionLabel>{t.contactEyebrow}</SectionLabel>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                {t.mapTitle}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#64758b]">
                {t.mapDescription}
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=University+Book+House+Al+Ain+UAE"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-[#dce4ed] px-4 py-3 text-sm font-semibold text-ubh-navy transition-colors hover:border-ubh-gold hover:bg-ubh-canvas"
            >
              {t.mapLink}
              <DirectionalArrow size={16} />
            </a>
          </div>

          <div className="relative h-[280px] overflow-hidden rounded-2xl border border-[#e1e8f0] bg-[#edf1f5] sm:h-[360px] lg:h-[430px]">
            <iframe
              title={t.mapTitle}
              src="https://www.google.com/maps?q=University%20Book%20House%2C%20Al%20Ain%2C%20UAE&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-[#f3f6f9] py-10 sm:py-14">
        <Container>
          <div className="relative isolate overflow-hidden rounded-2xl bg-ubh-navy px-6 py-8 text-white sm:rounded-3xl sm:px-9 sm:py-10 lg:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-28 -z-10 h-64 w-64 rounded-full bg-ubh-gold/15 blur-3xl"
            />

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="font-serif text-2xl leading-tight sm:text-3xl">
                  {t.shopTitle}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {t.shopDescription}
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}/shop`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ubh-gold-light px-5 py-3 text-sm font-bold text-ubh-navy transition-colors hover:bg-[#e8c477] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                >
                  {t.shopCta}
                  <ArrowRight
                    size={16}
                    className={isArabic ? "rotate-180" : ""}
                  />
                </Link>
                <Link
                  href={`/${locale}/about-us`}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
                >
                  {t.aboutCta}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}