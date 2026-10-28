import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { Container } from "@/components/shared/Container";
import { OrderRequestForm } from "@/components/store/orders/OrderRequestForm";

export default async function CancelOrderPage({
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
            {isArabic ? "طلب إلغاء الطلب" : "Request Order Cancellation"}
          </h1>
          <p className="mb-8 mt-3 text-sm leading-6 text-slate-600">
            {isArabic
              ? "اختر سبب الإلغاء. سيقوم فريقنا بالتحقق من حالة الطلب وأهليته."
              : "Choose a cancellation reason. The system must verify your order's status and eligibility."}
          </p>

          <OrderRequestForm
            locale={locale}
            orderId={id}
            type="cancel"
          />
        </div>
      </Container>
    </main>
  );
}