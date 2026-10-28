
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
  title: "Privacy Policy | University Book House",
  description:
    "Learn how University Book House handles personal information when you use its website and online store.",
  robots: { index: true, follow: true },
};

export default async function PrivacyPolicyPage({
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
        title={ar ? "سياسة الخصوصية" : "Privacy Policy"}
        description={
          ar
            ? "توضح هذه الصفحة كيفية التعامل مع المعلومات الشخصية عند استخدام موقع ومتجر دار الكتب الجامعية."
            : "This page explains how personal information is handled when you use the University Book House website and store."
        }
        updatedLabel={ar ? "آخر تحديث" : "Last updated"}
        updatedDate="14 October 2026"
      >
        <h2>{ar ? "1. مقدمة" : "1. Introduction"}</h2>
        <p>
          {ar
            ? "نحترم خصوصية زوارنا وعملائنا. توضح سياسة الخصوصية المعتمدة البيانات التي نجمعها، وأسباب استخدامها، وكيفية حمايتها."
            : "We respect the privacy of our visitors and customers. The approved privacy policy explains what information we collect, why we use it, and how we protect it."}
        </p>

        <h2>{ar ? "2. المعلومات التي نجمعها" : "2. Information We Collect"}</h2>
        <p>
          {ar
            ? "قد تشمل المعلومات بيانات الاتصال والحساب، وتفاصيل الطلبات والتوصيل، والمراسلات، والبيانات التقنية اللازمة لتشغيل الموقع. يجب تحديد البيانات التي تُجمع فعليًا في النسخة النهائية."
            : "Information may include contact and account details, order and delivery information, correspondence, and technical data needed to operate the website. The final policy should specify the information actually collected."}
        </p>

        <h2>{ar ? "3. كيفية استخدام المعلومات" : "3. How We Use Information"}</h2>
        <ul>
          <li>
            {ar
              ? "إدارة الحسابات والطلبات وتقديم خدمة العملاء."
              : "To manage accounts and orders and provide customer support."}
          </li>
          <li>
            {ar
              ? "تشغيل الموقع وتحسين الخدمات والأمان."
              : "To operate the website and improve services and security."}
          </li>
          <li>
            {ar
              ? "إرسال الرسائل المتعلقة بالخدمة، وأي رسائل تسويقية وفق الموافقات المطلوبة."
              : "To send service communications and marketing messages where the required permissions have been obtained."}
          </li>
        </ul>

        <h2>{ar ? "4. ملفات تعريف الارتباط" : "4. Cookies"}</h2>
        <p>
          {ar
            ? "يجب أن توضح السياسة أنواع ملفات تعريف الارتباط أو تقنيات التتبع المستخدمة، وأغراضها، وخيارات المستخدم لإدارتها."
            : "The policy should identify the cookies or tracking technologies used, their purposes, and the choices users have to manage them."}
        </p>

        <h2>{ar ? "5. مشاركة المعلومات" : "5. Sharing Information"}</h2>
        <p>
          {ar
            ? "يجب توضيح الجهات التي قد تتلقى البيانات، مثل مزودي الدفع والتوصيل والاستضافة والخدمات التقنية، والأساس الذي تتم بموجبه المشاركة."
            : "The policy should identify parties that may receive information, such as payment, delivery, hosting and technology providers, and explain the basis for sharing."}
        </p>

        <h2>{ar ? "6. الاحتفاظ بالبيانات وأمانها" : "6. Data Retention and Security"}</h2>
        <p>
          {ar
            ? "ينبغي تحديد فترات الاحتفاظ بالبيانات أو المعايير المستخدمة لتحديدها، والتدابير المناسبة لحماية المعلومات."
            : "The policy should explain retention periods or the criteria used to determine them, along with appropriate measures to protect information."}
        </p>

        <h2>{ar ? "7. حقوق المستخدم والتواصل" : "7. Your Rights and Contact"}</h2>
        <p>
          {ar
            ? "يجب توضيح حقوق الأفراد المتاحة بموجب القانون المعمول به، وكيفية تقديم طلبات الخصوصية، وبيانات التواصل الرسمية للجهة المسؤولة."
            : "The policy should explain individuals' rights under applicable law, how to submit privacy requests, and the official contact details of the responsible organisation."}
        </p>

        <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <strong>
            {ar ? "ملاحظة مهمة: " : "Important note: "}
          </strong>
          {ar
            ? "هذا نص تمهيدي. يجب تخصيصه وفق ممارسات البيانات الفعلية لدى UBH ومراجعته قانونيًا قبل النشر."
            : "This is starter content. It must be tailored to UBH's actual data practices and reviewed by legal counsel before publication."}
        </p>
      </LegalPageLayout>
    </LegalShell>
  );
}
