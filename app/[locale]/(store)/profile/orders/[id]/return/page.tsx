import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { Container } from "@/components/shared/Container";
import { OrderRequestForm } from "@/components/store/orders/OrderRequestForm";

export default async function ReturnOrderPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  if (!isLocale(locale) || !/^\d+$/.test(id)) notFound();

  const isArabic = locale === "ar";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      lang={locale}
      className="min-h-screen bg-ubh-canvas py-12 sm:py-16"
    >
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="font-serif text-3xl font-semibold text-ubh-navy">
            {isArabic ? "طلب إرجاع المنتجات" : "Request a Return"}
          </h1>
          <p className="mb-8 mt-3 text-sm leading-6 text-slate-600">
            {isArabic
              ? "أرسل طلبك ليتم مراجعته وفقًا لسياسة الإرجاع المعتمدة."
              : "Submit your request for review under the applicable return policy."}
          </p>

          <OrderRequestForm
            locale={locale}
            orderId={id}
            type="return"
          />
        </div>
      </Container>
    </main>
  );
}