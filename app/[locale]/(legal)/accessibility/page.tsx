
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalShell } from "@/components/layout/LegalShell";
import { LegalPageLayout } from "@/components/shared/LegalPageLayout";
import { isLocale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
};

export const metadata: Metadata = {
  title: "Accessibility | University Book House",
  description:
    "Read about accessibility at University Book House and how to report an accessibility issue.",
  robots: { index: true, follow: true },
};

export default async function AccessibilityPage({
  params,
  searchParams,
}: PageProps) {
  const { locale: rawLocale } = await params;
  const query = await searchParams;

  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale;
  const ar = locale === "ar";
  const source = query.source === "store" ? "store" : "website";

  return (
    <LegalShell locale={locale} source={source}>
      <LegalPageLayout
        locale={locale}
        source={source}
        title={ar ? "إمكانية الوصول" : "Accessibility"}
        description={
          ar
            ? "نسعى إلى جعل تجربة استخدام موقع دار الكتب الجامعية واضحة وسهلة الوصول لمختلف المستخدمين."
            : "We aim to make the University Book House website clear and accessible to a broad range of users."
        }
        updatedLabel={ar ? "آخر تحديث" : "Last updated"}
        updatedDate="14 October 2026"
      >
        <h2>{ar ? "1. التزامنا" : "1. Our Commitment"}</h2>
        <p>
          {ar
            ? "نهدف إلى تحسين إمكانية الوصول إلى محتوى الموقع وخدماته. يجب أن تعكس أي تصريحات عن مستوى الامتثال نتائج التقييم الفعلي للموقع."
            : "We aim to improve access to our website content and services. Any statement about our level of compliance should reflect the results of an actual website assessment."}
        </p>

        <h2>{ar ? "2. جهود التحسين" : "2. Accessibility Improvements"}</h2>
        <p>
          {ar
            ? "تشمل مجالات التحسين المحتملة وضوح التباين، والتنقل باستخدام لوحة المفاتيح، وتسميات النماذج، والنصوص البديلة للصور، ودعم قارئات الشاشة."
            : "Areas for improvement may include colour contrast, keyboard navigation, form labels, alternative text for images, and screen-reader support."}
        </p>

        <h2>{ar ? "3. الملاحظات والمشكلات" : "3. Feedback and Issues"}</h2>
        <p>
          {ar
            ? "إذا واجهت صعوبة في الوصول إلى أي محتوى أو خدمة، يرجى التواصل معنا عبر قناة دعم العملاء الرسمية الموضحة في صفحة الاتصال."
            : "If you have difficulty accessing any content or service, please contact us through the official customer-support channel listed on our Contact page."}
        </p>

        <h2>{ar ? "4. معلومات تساعدنا" : "4. Information That Helps Us"}</h2>
        <ul>
          <li>
            {ar
              ? "رابط الصفحة التي واجهت فيها المشكلة."
              : "The URL of the page where you encountered the issue."}
          </li>
          <li>
            {ar
              ? "وصف مختصر للمشكلة والخطوات التي أدت إليها."
              : "A short description of the issue and the steps that led to it."}
          </li>
          <li>
            {ar
              ? "اسم المتصفح أو التقنية المساعدة المستخدمة، إذا رغبت في ذكرها."
              : "The browser or assistive technology you use, if you wish to share it."}
          </li>
        </ul>

        <h2>{ar ? "5. التحسين المستمر" : "5. Ongoing Improvements"}</h2>
        <p>
          {ar
            ? "نراجع تجربة الموقع ونعمل على معالجة مشكلات إمكانية الوصول التي يتم تحديدها. يجب تحديث هذه الصفحة لتعكس الإجراءات الفعلية ووسيلة التواصل المعتمدة."
            : "We review the website experience and work to address identified accessibility issues. This page should be updated to reflect actual practices and the approved contact channel."}
        </p>

        <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <strong>
            {ar ? "ملاحظة مهمة: " : "Important note: "}
          </strong>
          {ar
            ? "يرجى التحقق من إمكانية الوصول الفعلية للموقع وتأكيد بيانات التواصل قبل نشر هذا البيان."
            : "Please verify the website's actual accessibility and confirm the contact details before publishing this statement."}
        </p>
      </LegalPageLayout>
    </LegalShell>
  );
}
