
import type { ReactNode } from "react";
import type { Product } from "@/lib/store/catalog";

type Locale = "en" | "ar";

type InfoRowItem = {
  label: string;
  value?: string | number | null;
};

const labels = {
  en: {
    highlights: "Book Highlights",
    subjects: "Subject Areas",
    topics: "Topics Covered",
    audience: "Target Audience",
    academicLevel: "Academic Level",
    features: "Key Features",
    specifications: "Book Specifications",
    publication: "Publication Details",
    physical: "Physical Specifications",
    digital: "Digital Specifications",
    catalogue: "Catalogue Information",
    contents: "Table of Contents",
    isbn: "ISBN",
    isbn13: "ISBN-13",
    isbn10: "ISBN-10",
    barcode: "Barcode",
    edition: "Edition",
    publisher: "Publisher",
    year: "Publication Year",
    date: "Publication Date",
    country: "Publication Country",
    language: "Language",
    pages: "Pages",
    format: "Format",
    volume: "Volume",
    series: "Series",
    binding: "Binding",
    coverType: "Cover Type",
    paperType: "Paper Type",
    interiorType: "Interior Type",
    dimensions: "Dimensions",
    weight: "Weight",
    productType: "Product Type",
    digitalFormat: "Digital Format",
    fileSize: "File Size",
    drm: "DRM Protection",
    accessType: "Access Type",
    openAccess: "Open Access",
    condition: "Condition",
    availability: "Availability",
    catalogueStatus: "Catalogue Status",
    active: "Active Status",
    tags: "Product Tags",
    yes: "Yes",
    no: "No",
    new: "New",
    used: "Used",
    inStock: "In Stock",
    lowStock: "Low Stock",
    outOfStock: "Out of Stock",
    inactive: "Inactive",
    official: "Official Source",
    sample: "Sample Data",
    review: "Needs Review",
    activeValue: "Active",
    inactiveValue: "Inactive",
    noDetails: "Additional information will be available soon.",
  },
  ar: {
    highlights: "أبرز مميزات الكتاب",
    subjects: "المجالات الموضوعية",
    topics: "المواضيع التي يغطيها الكتاب",
    audience: "الفئة المستهدفة",
    academicLevel: "المستوى الأكاديمي",
    features: "الميزات الرئيسية",
    specifications: "مواصفات الكتاب",
    publication: "معلومات النشر",
    physical: "المواصفات المادية",
    digital: "المواصفات الرقمية",
    catalogue: "معلومات الفهرسة",
    contents: "جدول المحتويات",
    isbn: "رقم ISBN",
    isbn13: "ISBN-13",
    isbn10: "ISBN-10",
    barcode: "الرمز الشريطي",
    edition: "الطبعة",
    publisher: "الناشر",
    year: "سنة النشر",
    date: "تاريخ النشر",
    country: "بلد النشر",
    language: "اللغة",
    pages: "عدد الصفحات",
    format: "التنسيق",
    volume: "المجلد",
    series: "السلسلة",
    binding: "التجليد",
    coverType: "نوع الغلاف",
    paperType: "نوع الورق",
    interiorType: "نوع المحتوى الداخلي",
    dimensions: "الأبعاد",
    weight: "الوزن",
    productType: "نوع المنتج",
    digitalFormat: "التنسيق الرقمي",
    fileSize: "حجم الملف",
    drm: "حماية الحقوق الرقمية",
    accessType: "نوع الوصول",
    openAccess: "الوصول المفتوح",
    condition: "الحالة",
    availability: "التوفر",
    catalogueStatus: "حالة الفهرسة",
    active: "حالة النشاط",
    tags: "وسوم المنتج",
    yes: "نعم",
    no: "لا",
    new: "جديد",
    used: "مستعمل",
    inStock: "متوفر",
    lowStock: "مخزون منخفض",
    outOfStock: "غير متوفر",
    inactive: "غير نشط",
    official: "مصدر رسمي",
    sample: "بيانات تجريبية",
    review: "يتطلب المراجعة",
    activeValue: "نشط",
    inactiveValue: "غير نشط",
    noDetails: "ستتوفر معلومات إضافية قريباً.",
  },
};

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 border-b border-slate-100 py-3 last:border-0 last:pb-0">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="max-w-[65%] break-words text-end text-xs font-semibold leading-5 text-[#193553]">
        {value}
      </span>
    </div>
  );
}

function InfoSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-bold text-[#061a37]">
          {title}
        </span>

        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform group-open:rotate-180">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="h-4 w-4"
          >
            <path
              d="m5 7 5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </summary>

      <div className="border-t border-slate-100 px-5 py-2">
        {children}
      </div>
    </details>
  );
}

function TagList({
  items,
}: {
  items?: string[];
}) {
  const values = items?.filter(Boolean) ?? [];

  if (!values.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {values.map((item) => (
        <span
          key={item}
          className="rounded-full border border-[#e4eaf0] bg-[#f5f8fb] px-3 py-1.5 text-xs font-medium text-[#46617f]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ContentsList({
  items,
  locale,
}: {
  items: NonNullable<Product["tableOfContents"]>;
  locale: Locale;
}) {
  const isArabic = locale === "ar";

  return (
    <ol className="space-y-4">
      {items.map((item, index) => {
        const title = typeof item === "string" ? item : item.title;
        const sections =
          typeof item === "string" ? [] : item.sections ?? [];

        return (
          <li key={`${title}-${index}`} className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#c89438]/10 text-xs font-bold text-[#a4772c]">
              {index + 1}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-6 text-[#193553]">
                {title}
              </p>

              {sections.length > 0 && (
                <ul className="mt-2 space-y-1.5 ps-4">
                  {sections.map((section, sectionIndex) => (
                    <li
                      key={`${section}-${sectionIndex}`}
                      className="list-disc text-xs leading-5 text-slate-500"
                    >
                      {section}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function ProductInformation({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = labels[locale];
  const isArabic = locale === "ar";

  const productTypes = {
    physical: isArabic ? "كتاب ورقي" : "Physical Book",
    textbook: isArabic ? "كتاب دراسي" : "Textbook",
    ebook: isArabic ? "كتاب إلكتروني" : "E-book",
  };

  const availabilityLabels = {
    "in-stock": t.inStock,
    "low-stock": t.lowStock,
    "out-of-stock": t.outOfStock,
    inactive: t.inactive,
  };

  const catalogueLabels = {
    "official-source": t.official,
    sample: t.sample,
    "needs-review": t.review,
  };

  const publicationRows: InfoRowItem[] = [
    { label: t.publisher, value: product.publisher },
    { label: t.isbn, value: product.isbn },
    { label: t.isbn13, value: product.isbn13 },
    { label: t.isbn10, value: product.isbn10 },
    { label: t.barcode, value: product.barcode },
    { label: t.edition, value: product.edition },
    {
      label: t.year,
      value: product.publicationYear,
    },
    { label: t.date, value: product.publicationDate },
    { label: t.country, value: product.publicationCountry },
    { label: t.language, value: product.language },
    { label: t.pages, value: product.pages },
    { label: t.format, value: product.format },
    { label: t.volume, value: product.volume },
    { label: t.series, value: product.series },
  ];

  const physicalRows: InfoRowItem[] = [
    { label: t.binding, value: product.binding },
    { label: t.coverType, value: product.coverType },
    { label: t.paperType, value: product.paperType },
    { label: t.interiorType, value: product.interiorType },
    { label: t.dimensions, value: product.dimensions },
    {
      label: t.weight,
      value:
        product.weight != null
          ? `${product.weight} ${product.weightUnit ?? ""}`.trim()
          : undefined,
    },
  ];

  const digitalRows: InfoRowItem[] = [
    {
      label: t.digitalFormat,
      value: product.digitalFormat?.join(", "),
    },
    { label: t.fileSize, value: product.fileSize },
    {
      label: t.drm,
      value:
        product.drmProtected == null
          ? undefined
          : product.drmProtected
            ? t.yes
            : t.no,
    },
    { label: t.accessType, value: product.accessType },
    {
      label: t.openAccess,
      value:
        product.openAccess == null
          ? undefined
          : product.openAccess
            ? t.yes
            : t.no,
    },
  ];

  const catalogueRows: InfoRowItem[] = [
    {
      label: t.productType,
      value: product.productType
        ? productTypes[product.productType]
        : product.productTypeLabel,
    },
    {
      label: t.condition,
      value: product.condition
        ? product.condition === "new"
          ? t.new
          : t.used
        : undefined,
    },
    {
      label: t.availability,
      value: product.availabilityStatus
        ? availabilityLabels[product.availabilityStatus]
        : undefined,
    },
    {
      label: t.catalogueStatus,
      value: product.catalogueStatus
        ? catalogueLabels[product.catalogueStatus]
        : undefined,
    },
    {
      label: t.active,
      value:
        product.active == null
          ? undefined
          : product.active
            ? t.activeValue
            : t.inactiveValue,
    },
  ];

  const sections = [
    {
      title: t.publication,
      rows: publicationRows,
    },
    {
      title: t.physical,
      rows: physicalRows,
    },
    {
      title: t.digital,
      rows: digitalRows,
    },
    {
      title: t.catalogue,
      rows: catalogueRows,
    },
  ].filter((section) =>
    section.rows.some(
      (row) =>
        row.value !== undefined &&
        row.value !== null &&
        row.value !== "",
    ),
  );

  const hasHighlights =
    !!product.keyFeatures?.length ||
    !!product.topics?.length ||
    !!product.targetAudience?.length ||
    !!product.academicLevel;

  const hasSubjects = !!product.subjects?.length;
  const hasContents = !!product.tableOfContents?.length;

  if (
    !hasHighlights &&
    !hasSubjects &&
    !hasContents &&
    sections.length === 0 &&
    !product.tags?.length
  ) {
    return null;
  }

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="space-y-5"
    >
      {/* Highlights */}
      {hasHighlights && (
        <InfoSection
          title={t.highlights}
          defaultOpen
        >
          <div className="space-y-5 py-4">
            {product.keyFeatures?.filter(Boolean).length ? (
              <div>
                <h3 className="mb-3 text-xs font-bold text-[#193553]">
                  {t.features}
                </h3>
                <ul className="space-y-2.5">
                  {product.keyFeatures.filter(Boolean).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-xs leading-5 text-slate-600"
                    >
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#c89438]/10 text-[#a4772c]">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {product.academicLevel && (
              <div>
                <h3 className="mb-2 text-xs font-bold text-[#193553]">
                  {t.academicLevel}
                </h3>
                <p className="text-xs text-slate-600">
                  {product.academicLevel}
                </p>
              </div>
            )}

            {product.targetAudience?.length ? (
              <div>
                <h3 className="mb-3 text-xs font-bold text-[#193553]">
                  {t.audience}
                </h3>
                <TagList items={product.targetAudience} />
              </div>
            ) : null}
          </div>
        </InfoSection>
      )}

      {/* Subject Areas */}
      {hasSubjects && (
        <InfoSection title={t.subjects} defaultOpen>
          <div className="space-y-4 py-4">
            <TagList items={product.subjects} />

            {product.topics?.length ? (
              <div>
                <h3 className="mb-3 text-xs font-bold text-[#193553]">
                  {t.topics}
                </h3>
                <TagList items={product.topics} />
              </div>
            ) : null}
          </div>
        </InfoSection>
      )}

      {/* Contents */}
      {hasContents && (
        <InfoSection title={t.contents}>
          <div className="py-5">
            <ContentsList
              items={product.tableOfContents!}
              locale={locale}
            />
          </div>
        </InfoSection>
      )}

      {/* Specifications */}
      {sections.map((section, index) => (
        <InfoSection
          key={section.title}
          title={section.title}
          defaultOpen={index === 0}
        >
          <div className="py-2">
            {section.rows.map((row) => (
              <InfoRow
                key={row.label}
                label={row.label}
                value={row.value}
              />
            ))}
          </div>
        </InfoSection>
      ))}

      {/* Tags */}
      {product.tags?.filter(Boolean).length ? (
        <InfoSection title={t.tags}>
          <div className="py-4">
            <TagList items={product.tags} />
          </div>
        </InfoSection>
      ) : null}
    </section>
  );
}
