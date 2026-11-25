
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CreditCard,
  Headphones,
  Package,
  RefreshCcw,
  ShoppingBag,
  Truck,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { Container } from "@/components/shared/Container";

type Props = {
  locale: Locale;
};

export function HelpCenter({ locale }: Props) {
  const ar = locale === "ar";
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const content = {
    en: {
      eyebrow: "CUSTOMER CARE",
      title: "How can we help you?",
      description:
        "Find answers to common questions about shopping, orders, delivery and payments at University Book House.",
      categoriesTitle: "Browse help topics",
      categoriesDescription:
        "Choose a topic to find the information you need.",
      faqTitle: "Frequently asked questions",
      faqDescription:
        "Quick answers to help you shop with confidence.",
      contactTitle: "Still need assistance?",
      contactDescription:
        "Our team is here to help with your questions about books, orders and the UBH store.",
      contactButton: "Contact our team",
      shopButton: "Continue shopping",
      categories: [
        {
          title: "Orders & Accounts",
          description: "Accounts, orders and order information.",
          icon: ShoppingBag,
          id: "orders",
        },
        {
          title: "Delivery",
          description: "Shipping and delivery information.",
          icon: Truck,
          id: "delivery",
        },
        {
          title: "Payments",
          description: "Payment methods and checkout.",
          icon: CreditCard,
          id: "payments",
        },
        {
          title: "Returns",
          description: "Returns and order assistance.",
          icon: RefreshCcw,
          id: "returns",
        },
      ],
      groups: [
        {
          id: "orders",
          title: "Orders & Accounts",
          icon: Package,
          questions: [
            {
              q: "How can I place an order?",
              a: "Browse the UBH catalogue, open a book's product page, choose the available purchase option and follow the checkout process.",
            },
            {
              q: "Do I need an account to shop?",
              a: "You can create a UBH store account to access account-related features and manage your shopping experience. Sign-in and account services are subject to the authentication system being available.",
            },
            {
              q: "How can I check my order status?",
              a: "Order information and tracking will be available through your account once the store's order management service is connected. For assistance with an existing order, contact our support team.",
            },
            {
              q: "I cannot sign in. What should I do?",
              a: "Check that your email address and password are correct. If the issue continues, contact UBH support for assistance.",
            },
          ],
        },
        {
          id: "delivery",
          title: "Delivery",
          icon: Truck,
          questions: [
            {
              q: "Where does UBH deliver?",
              a: "Available delivery destinations and service coverage are subject to the options displayed during checkout. Please confirm availability before placing your order.",
            },
            {
              q: "How long does delivery take?",
              a: "Estimated delivery times depend on the destination, product availability and delivery service. The applicable estimate should be confirmed during checkout.",
            },
            {
              q: "Can I change my delivery address?",
              a: "If your order has not yet been processed, contact our support team as soon as possible to ask whether an address update can be arranged.",
            },
          ],
        },
        {
          id: "payments",
          title: "Payments",
          icon: CreditCard,
          questions: [
            {
              q: "Which payment methods are accepted?",
              a: "Available payment methods will be displayed during checkout. Please refer to the payment options shown when placing your order.",
            },
            {
              q: "Is online payment secure?",
              a: "Payment processing should take place through the payment provider presented at checkout. Never share your password or payment security codes with anyone.",
            },
            {
              q: "What should I do if a payment fails?",
              a: "Check your payment details and contact your bank if necessary. If the issue persists, contact UBH support before attempting repeated payments.",
            },
          ],
        },
        {
          id: "returns",
          title: "Returns & Refunds",
          icon: RefreshCcw,
          questions: [
            {
              q: "Can I return a book?",
              a: "Return eligibility depends on the applicable UBH return policy and the condition of the item. Please contact support to confirm the requirements before sending an item back.",
            },
            {
              q: "How do I request a refund?",
              a: "Contact UBH support with your order details and the reason for your request. Refund eligibility and processing depend on the applicable return policy and payment provider.",
            },
            {
              q: "What if I receive a damaged or incorrect book?",
              a: "Please contact our support team and provide your order reference along with clear photographs of the item so the issue can be reviewed.",
            },
          ],
        },
      ],
    },
    ar: {
      eyebrow: "خدمة العملاء",
      title: "كيف يمكننا مساعدتك؟",
      description:
        "اعثر على إجابات لأكثر الأسئلة شيوعاً حول التسوق والطلبات والتوصيل والدفع في دار الكتب الجامعية.",
      categoriesTitle: "تصفح مواضيع المساعدة",
      categoriesDescription: "اختر الموضوع للعثور على المعلومات التي تحتاجها.",
      faqTitle: "الأسئلة الشائعة",
      faqDescription: "إجابات سريعة لمساعدتك على التسوق بثقة.",
      contactTitle: "هل تحتاج إلى مزيد من المساعدة؟",
      contactDescription:
        "فريقنا مستعد لمساعدتك في استفساراتك حول الكتب والطلبات ومتجر UBH.",
      contactButton: "تواصل مع فريقنا",
      shopButton: "متابعة التسوق",
      categories: [
        {
          title: "الطلبات والحسابات",
          description: "الحسابات والطلبات ومعلومات الشراء.",
          icon: ShoppingBag,
          id: "orders",
        },
        {
          title: "التوصيل",
          description: "معلومات الشحن والتوصيل.",
          icon: Truck,
          id: "delivery",
        },
        {
          title: "الدفع",
          description: "طرق الدفع وإتمام الطلب.",
          icon: CreditCard,
          id: "payments",
        },
        {
          title: "الإرجاع",
          description: "إرجاع المنتجات ومساعدة الطلبات.",
          icon: RefreshCcw,
          id: "returns",
        },
      ],
      groups: [
        {
          id: "orders",
          title: "الطلبات والحسابات",
          icon: Package,
          questions: [
            {
              q: "كيف يمكنني تقديم طلب؟",
              a: "تصفح فهرس الكتب في متجر UBH، وافتح صفحة الكتاب المطلوب، ثم اتبع خيارات الشراء المتاحة وخطوات إتمام الطلب.",
            },
            {
              q: "هل أحتاج إلى حساب للتسوق؟",
              a: "يمكنك إنشاء حساب في متجر UBH للاستفادة من خدمات الحساب وإدارة تجربة التسوق. وتعتمد خدمات تسجيل الدخول والحساب على توفر نظام المصادقة.",
            },
            {
              q: "كيف يمكنني متابعة حالة طلبي؟",
              a: "ستتوفر معلومات الطلبات والتتبع من خلال حسابك بعد ربط خدمة إدارة الطلبات بالمتجر. للمساعدة بشأن طلب قائم، يرجى التواصل مع فريق الدعم.",
            },
            {
              q: "لا أستطيع تسجيل الدخول، ماذا أفعل؟",
              a: "تأكد من صحة البريد الإلكتروني وكلمة المرور. إذا استمرت المشكلة، تواصل مع دعم UBH للحصول على المساعدة.",
            },
          ],
        },
        {
          id: "delivery",
          title: "التوصيل",
          icon: Truck,
          questions: [
            {
              q: "إلى أين يقوم UBH بالتوصيل؟",
              a: "تعتمد وجهات التوصيل المتاحة على الخيارات المعروضة أثناء إتمام الطلب. يرجى التأكد من توفر الخدمة قبل تقديم الطلب.",
            },
            {
              q: "كم يستغرق التوصيل؟",
              a: "تعتمد مدة التوصيل التقديرية على الوجهة وتوفر المنتج وخدمة التوصيل. يرجى مراجعة المدة الموضحة أثناء إتمام الطلب.",
            },
            {
              q: "هل يمكنني تغيير عنوان التوصيل؟",
              a: "إذا لم تتم معالجة طلبك بعد، تواصل مع فريق الدعم في أقرب وقت للاستفسار عن إمكانية تعديل العنوان.",
            },
          ],
        },
        {
          id: "payments",
          title: "الدفع",
          icon: CreditCard,
          questions: [
            {
              q: "ما طرق الدفع المتاحة؟",
              a: "ستظهر طرق الدفع المتاحة أثناء إتمام الطلب. يرجى مراجعة خيارات الدفع المعروضة عند الشراء.",
            },
            {
              q: "هل الدفع الإلكتروني آمن؟",
              a: "يجب إتمام الدفع من خلال مزود خدمة الدفع المعروض أثناء الشراء. لا تشارك كلمة المرور أو رموز الأمان الخاصة بالدفع مع أي شخص.",
            },
            {
              q: "ماذا أفعل إذا فشلت عملية الدفع؟",
              a: "تحقق من بيانات الدفع وتواصل مع البنك عند الحاجة. إذا استمرت المشكلة، تواصل مع دعم UBH قبل تكرار محاولات الدفع.",
            },
          ],
        },
        {
          id: "returns",
          title: "الإرجاع واسترداد المبالغ",
          icon: RefreshCcw,
          questions: [
            {
              q: "هل يمكنني إرجاع كتاب؟",
              a: "تعتمد إمكانية الإرجاع على سياسة الإرجاع المعتمدة لدى UBH وحالة المنتج. يرجى التواصل مع الدعم للتأكد من الشروط قبل إرسال المنتج.",
            },
            {
              q: "كيف يمكنني طلب استرداد المبلغ؟",
              a: "تواصل مع دعم UBH مع ذكر تفاصيل الطلب وسبب طلب الاسترداد. وتعتمد أهلية الاسترداد وإجراءاته على سياسة الإرجاع ومزود الدفع.",
            },
            {
              q: "ماذا أفعل إذا استلمت كتاباً تالفاً أو غير صحيح؟",
              a: "يرجى التواصل مع فريق الدعم وإرسال رقم الطلب مع صور واضحة للمنتج حتى يتمكن الفريق من مراجعة المشكلة.",
            },
          ],
        },
      ],
    },
  } as const;

  const t = content[locale];

  return (
    <main
      dir={ar ? "rtl" : "ltr"}
      className="min-h-[calc(100vh-76px)] bg-[#FAFBFD] py-10 sm:py-14"
    >
      <Container>
        <div className="mx-auto max-w-5xl">

          {/* Hero */}
          <section className="relative overflow-hidden rounded-2xl border border-[#E7EBF0] bg-white px-6 py-9 sm:px-10 sm:py-12">
            <div className="absolute top-0 h-[3px] w-full bg-gradient-to-r from-[#061A37] via-[#C89438] to-[#061A37]" />

            <div className="max-w-2xl">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F7FA] text-[#B8822C]">
                <Headphones size={22} />
              </div>

              <p className="text-[10px] font-bold tracking-[0.2em] text-[#A87523]">
                {t.eyebrow}
              </p>

              <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#061A37] sm:text-[40px]">
                {t.title}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                {t.description}
              </p>
            </div>

            <div className={`mt-7 flex flex-wrap gap-3 ${ar ? "justify-start" : ""}`}>
              <Link
                href={`/${locale}/shop`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#061A37] px-5 text-sm font-semibold text-white transition hover:bg-[#0B2B50]"
              >
                <BookOpen size={16} />
                {t.shopButton}
              </Link>
            </div>
          </section>

          {/* Help categories */}
          <section className="mt-12">
            <div className="mb-5">
              <h2 className="font-serif text-2xl font-semibold text-[#061A37]">
                {t.categoriesTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {t.categoriesDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.categories.map((category) => {
                const Icon = category.icon;

                return (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="group flex min-h-[120px] items-start gap-4 rounded-xl border border-[#E7EBF0] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#D7BC8A] hover:shadow-[0_8px_25px_-18px_rgba(6,26,55,0.3)]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F5F7FA] text-[#A87523] transition group-hover:bg-[#F8F1E5]">
                      <Icon size={19} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-[#061A37]">
                        {category.title}
                      </span>
                      <span className="mt-1.5 block text-xs leading-5 text-slate-500">
                        {category.description}
                      </span>
                    </span>

                    <Arrow
                      size={15}
                      className="mt-1 shrink-0 text-slate-400 transition group-hover:text-[#A87523]"
                    />
                  </a>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-14">
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-semibold text-[#061A37]">
                {t.faqTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {t.faqDescription}
              </p>
            </div>

            <div className="space-y-8">
              {t.groups.map((group) => {
                const Icon = group.icon;

                return (
                  <section
                    key={group.id}
                    id={group.id}
                    className="scroll-mt-28"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F4F8] text-[#A87523]">
                        <Icon size={17} />
                      </span>

                      <h3 className="text-base font-semibold text-[#061A37]">
                        {group.title}
                      </h3>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-[#E7EBF0] bg-white">
                      {group.questions.map((item, index) => (
                        <details
                          key={item.q}
                          className="group border-b border-[#EEF0F3] last:border-b-0"
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-[#183451] transition hover:bg-[#FAFBFD] [&::-webkit-details-marker]:hidden">
                            <span>{item.q}</span>

                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition group-open:rotate-45 group-open:border-[#D9C39D] group-open:text-[#A87523]">
                              <span className="text-lg leading-none">+</span>
                            </span>
                          </summary>

                          <div className="px-5 pb-5">
                            <p className="max-w-3xl text-sm leading-7 text-slate-500">
                              {item.a}
                            </p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </section>

          {/* Contact support */}
          <section className="mt-14 overflow-hidden rounded-2xl bg-[#061A37] px-6 py-8 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-9 sm:py-9">
            <div className="max-w-xl">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#DCAE57]">
                <Headphones size={20} />
              </div>

              <h2 className="font-serif text-2xl font-semibold text-white">
                {t.contactTitle}
              </h2>

              <p className="mt-2 text-sm leading-7 text-white/65">
                {t.contactDescription}
              </p>
            </div>

            <Link
              href={`/${locale}/contact-us?source=store`}
              className="mt-6 inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#C89438] px-5 text-sm font-semibold text-[#061A37] transition hover:bg-[#DCAE57] sm:mt-0"
            >
              {t.contactButton}
              <ArrowUpRight size={16} />
            </Link>
          </section>

        </div>
      </Container>
    </main>
  );
}
