// export type OrderStatus =
//   | "draft"
//   | "confirmed"
//   | "processing"
//   | "shipped"
//   | "delivered"
//   | "cancelled";

// export type PaymentStatus =
//   | "pending"
//   | "paid"
//   | "failed"
//   | "refunded"
//   | "partially_refunded";

// export type OrderLine = {
//   id: number;
//   productId: number;
//   name: string;
//   image?: string;
//   sku?: string;
//   quantity: number;
//   unitPrice: number;
//   subtotal: number;
// };

// export type CustomerOrder = {
//   id: number;
//   name: string;
//   date: string;
//   status: OrderStatus;
//   paymentStatus: PaymentStatus;
//   currency: string;
//   subtotal: number;
//   shipping: number;
//   total: number;
//   trackingNumber?: string;
//   trackingUrl?: string;
//   lines: OrderLine[];
//   shippingAddress?: {
//     name: string;
//     street: string;
//     city: string;
//     country: string;
//   };
// };

// export type ReturnRequestStatus =
//   | "submitted"
//   | "under_review"
//   | "approved"
//   | "rejected"
//   | "received"
//   | "refunded";

// export type ReturnRequest = {
//   id: number;
//   reference: string;
//   orderId: number;
//   orderName: string;
//   createdAt: string;
//   status: ReturnRequestStatus;
//   reason: string;
// };
export type OrderStatus =
  | "draft"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "partially_refunded";

export type OrderLine = {
  id: number;
  /** Product IDs in data/products.ts are strings; Odoo numeric IDs remain supported. */
  productId: string | number;
  name: string;
  image?: string;
  sku?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type CustomerOrder = {
  id: number;
  name: string;
  date: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  currency: string;
  subtotal: number;
  shipping: number;
  total: number;
  trackingNumber?: string;
  trackingUrl?: string;
  lines: OrderLine[];
  shippingAddress?: {
    name: string;
    street: string;
    city: string;
    country: string;
  };
};

export type ReturnRequestStatus =
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "received"
  | "refunded";

export type ReturnRequest = {
  id: number;
  reference: string;
  orderId: number;
  orderName: string;
  createdAt: string;
  status: ReturnRequestStatus;
  reason: string;
};
