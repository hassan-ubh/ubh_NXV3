import type {
  OrderStatus,
  PaymentStatus,
  ReturnRequestStatus,
} from "@/lib/odoo/order-types";

type Status =
  | OrderStatus
  | PaymentStatus
  | ReturnRequestStatus;

const styles: Record<Status, string> = {
  draft: "bg-slate-100 text-slate-700",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-indigo-100 text-indigo-800",
  shipped: "bg-violet-100 text-violet-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",

  pending: "bg-amber-100 text-amber-800",
  paid: "bg-emerald-100 text-emerald-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-emerald-100 text-emerald-800",
  partially_refunded: "bg-orange-100 text-orange-800",

  submitted: "bg-blue-100 text-blue-800",
  under_review: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
  received: "bg-indigo-100 text-indigo-800",
};

const labels: Record<Status, { en: string; ar: string }> = {
  draft: { en: "Draft", ar: "مسودة" },
  confirmed: { en: "Confirmed", ar: "مؤكد" },
  processing: { en: "Processing", ar: "قيد التجهيز" },
  shipped: { en: "Shipped", ar: "تم الشحن" },
  delivered: { en: "Delivered", ar: "تم التسليم" },
  cancelled: { en: "Cancelled", ar: "ملغي" },

  pending: { en: "Pending", ar: "قيد الانتظار" },
  paid: { en: "Paid", ar: "مدفوع" },
  failed: { en: "Failed", ar: "فشل الدفع" },
  refunded: { en: "Refunded", ar: "تم رد المبلغ" },
  partially_refunded: {
    en: "Partially refunded",
    ar: "تم رد جزء من المبلغ",
  },

  submitted: { en: "Submitted", ar: "تم الإرسال" },
  under_review: { en: "Under review", ar: "قيد المراجعة" },
  approved: { en: "Approved", ar: "تمت الموافقة" },
  rejected: { en: "Rejected", ar: "مرفوض" },
  received: { en: "Item received", ar: "تم استلام المنتج" },
};

export function OrderStatusBadge({
  status,
  locale,
}: {
  status: Status;
  locale: "en" | "ar";
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status][locale]}
    </span>
  );
}