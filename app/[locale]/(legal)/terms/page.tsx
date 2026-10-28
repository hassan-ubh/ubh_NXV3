
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
  title: "Terms and Conditions | University Book House",
  description:
    "Terms and conditions for using the University Book House website and online store.",
  robots: { index: true, follow: true },
};

export default async function TermsPage({
  params,
  searchParams,
}: PageProps) {
  const { locale: rawLocale } = await params;
  const query = await searchParams;

  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale;
  const ar = locale === "ar";
  const requestedSource = query.source;
  const source =
    requestedSource === "store" ? "store" : "website";

  return (
    <LegalShell locale={locale} source={source}>
      <LegalPageLayout
        locale={locale}
        source={source}
        title={ar ? "الشروط والأحكام" : "Terms and Conditions"}
        description={
          ar
            ? "يرجى مراجعة الشروط التي تنظم استخدام موقع ومتجر دار الكتب الجامعية."
            : "Please review the terms governing your use of the University Book House website and store."
        }
        updatedLabel={ar ? "آخر تحديث" : "Last updated"}
        updatedDate="14 October 2026"
      >
        <h2>{ar ? "1. مقدمة" : "1. Introduction"}</h2>
        <p>
          {ar
            ? "تنظم هذه الشروط استخدام موقع دار الكتب الجامعية وخدماته الرقمية ومتجره الإلكتروني. باستخدام الموقع، فإنك توافق على الالتزام بالشروط المعمول بها."
            : "These terms govern the use of the University Book House website, digital services and online store. By using the website, you agree to the applicable terms."}
        </p>

        <h2>{ar ? "2. استخدام الموقع" : "2. Website Use"}</h2>
        <p>
          {ar
            ? "يجب استخدام الموقع لأغراض مشروعة فقط. لا يجوز إساءة استخدام الخدمات أو محاولة تعطيل الموقع أو الوصول غير المصرح به إلى أنظمته."
            : "You must use the website only for lawful purposes. You must not misuse the services, attempt to disrupt the website, or seek unauthorized access to its systems."}
        </p>

        <h2>{ar ? "3. المنتجات والمعلومات" : "3. Products and Information"}</h2>
        <p>
          {ar
            ? "نبذل جهودًا معقولة للحفاظ على دقة أوصاف الكتب والأسعار والتوافر، لكن قد تحدث أخطاء أو تغييرات. يجب توضيح آلية تصحيح الأخطاء وتأكيد الطلبات في الشروط النهائية."
            : "We make reasonable efforts to maintain accurate book descriptions, prices and availability, but errors or changes may occur. The final terms should explain how errors are corrected and orders are confirmed."}
        </p>

        <h2>{ar ? "4. الطلبات والدفع" : "4. Orders and Payment"}</h2>
        <p>
          {ar
            ? "يجب أن توضح السياسة المعتمدة متى يصبح الطلب ملزمًا، وطرق الدفع المقبولة، والضرائب والرسوم، وكيفية التعامل مع الطلبات الملغاة أو غير المكتملة."
            : "The approved policy should specify when an order becomes binding, accepted payment methods, taxes and fees, and how cancelled or incomplete orders are handled."}
        </p>

        <h2>{ar ? "5. التوصيل والإرجاع" : "5. Delivery and Returns"}</h2>
        <p>
          {ar
            ? "يرجى الرجوع إلى سياسة التوصيل والإرجاع المعتمدة لمعرفة المناطق المشمولة ومواعيد التوصيل وشروط الإلغاء والإرجاع والاسترداد."
            : "Please refer to the approved delivery and returns policy for service areas, delivery estimates, and the conditions for cancellation, returns and refunds."}
        </p>

        <h2>{ar ? "6. الملكية الفكرية" : "6. Intellectual Property"}</h2>
        <p>
          {ar
            ? "قد تكون مواد الموقع، بما فيها النصوص والصور والعلامات التجارية والتصميمات، محمية بحقوق الملكية الفكرية. يجب تحديد شروط الاستخدام المسموح به وفق الحقوق والتراخيص المعمول بها."
            : "Website materials, including text, images, trademarks and designs, may be protected by intellectual property rights. Permitted use should be determined by the applicable rights and licences."}
        </p>

        <h2>{ar ? "7. المسؤولية والتواصل" : "7. Liability and Contact"}</h2>
        <p>
          {ar
            ? "يجب أن تحدد النسخة النهائية حدود المسؤولية المسموح بها قانونًا، والقانون الواجب التطبيق، وآلية حل النزاعات، وبيانات التواصل الرسمية."
            : "The final version should define legally permitted liability limits, governing law, dispute resolution procedures and official contact details."}
        </p>

        <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <strong>
            {ar ? "ملاحظة مهمة: " : "Important note: "}
          </strong>
          {ar
            ? "هذا نص تمهيدي وليس شروطًا قانونية نهائية. يجب مراجعته واعتماده قانونيًا قبل استخدامه مع العملاء."
            : "This is starter content, not final legal terms. Have qualified legal counsel review and approve it before using it with customers."}
        </p>
      </LegalPageLayout>
    </LegalShell>
  );
}
