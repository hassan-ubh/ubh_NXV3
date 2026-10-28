
// // import type { CustomerOrder } from "@/lib/odoo/order-types";

// // export const mockOrders: CustomerOrder[] = [
// //   {
// //     id: 1001,
// //     name: "UBH/2026/01001",
// //     date: "2026-10-05T10:30:00Z",
// //     status: "delivered",
// //     paymentStatus: "paid",
// //     currency: "AED",
// //     subtotal: 150,
// //     shipping: 0,
// //     total: 150,
// //     trackingNumber: "UBH-DEMO-1001",
// //     trackingUrl: undefined,
// //     lines: [
// //       {
// //         id: 1,
// //         productId: 501,
// //         name: "Introduction to Thermodynamics",
// //         quantity: 2,
// //         unitPrice: 75,
// //         subtotal: 150,
// //       },
// //     ],
// //     shippingAddress: {
// //       name: "Sample Customer",
// //       street: "University City Road",
// //       city: "Sharjah",
// //       country: "United Arab Emirates",
// //     },
// //   },
// //   {
// //     id: 1002,
// //     name: "UBH/2026/01002",
// //     date: "2026-10-08T08:15:00Z",
// //     status: "processing",
// //     paymentStatus: "paid",
// //     currency: "AED",
// //     subtotal: 220,
// //     shipping: 15,
// //     total: 235,
// //     lines: [
// //       {
// //         id: 2,
// //         productId: 502,
// //         name: "Academic Research Methods",
// //         quantity: 2,
// //         unitPrice: 110,
// //         subtotal: 220,
// //       },
// //     ],
// //     shippingAddress: {
// //       name: "Sample Customer",
// //       street: "University City Road",
// //       city: "Sharjah",
// //       country: "United Arab Emirates",
// //     },
// //   },
// // ];

// // export type MockOrderRequest = {
// //   id: number;
// //   orderId: number;
// //   type: "cancel" | "return";
// //   status: "submitted";
// //   reason: string;
// //   details?: string;
// //   createdAt: string;
// // };

// // export const mockOrderRequests: MockOrderRequest[] = [];

// import { products } from "@/lib/store/catalog";
// import type { CustomerOrder, OrderLine, OrderStatus, PaymentStatus } from "@/lib/odoo/order-types";

// /**
//  * Development-only sample orders built from the live local UBH catalogue.
//  * Titles, product IDs, cover images, SKU/ISBN and prices come from data/products.ts.
//  * These records are not real Odoo orders and must not be used for production checkout.
//  */
// const catalogueProducts = products.filter(
//   (product) => product.active !== false && Number.isFinite(product.price) && product.price >= 0,
// );

// function makeLines(productIndexes: number[], orderIndex: number): OrderLine[] {
//   return productIndexes
//     .map((productIndex, lineIndex) => {
//       const product = catalogueProducts[productIndex];
//       if (!product) return null;

//       const quantity = (orderIndex + lineIndex) % 2 === 0 ? 1 : 2;
//       const unitPrice = Number(product.price) || 0;

//       return {
//         id: orderIndex * 10 + lineIndex + 1,
//         // Catalogue IDs are strings (e.g. "book-001", "ubh-xlsx-001").
//         productId: product.id,
//         name: product.title,
//         image: product.cover,
//         sku: product.sku || product.isbn || product.barcode,
//         quantity,
//         unitPrice,
//         subtotal: unitPrice * quantity,
//       } satisfies OrderLine;
//     })
//     .filter((line): line is OrderLine => line !== null);
// }

// const sampleOrderConfigs: Array<{
//   status: OrderStatus;
//   paymentStatus: PaymentStatus;
//   date: string;
//   shipping: number;
//   trackingNumber?: string;
// }> = [
//   { status: "delivered", paymentStatus: "paid", date: "2026-10-05T10:30:00Z", shipping: 0, trackingNumber: "UBH-DEMO-1001" },
//   { status: "processing", paymentStatus: "paid", date: "2026-10-08T08:15:00Z", shipping: 15 },
//   { status: "shipped", paymentStatus: "paid", date: "2026-10-12T12:00:00Z", shipping: 10, trackingNumber: "UBH-DEMO-1003" },
//   { status: "confirmed", paymentStatus: "pending", date: "2026-10-20T09:00:00Z", shipping: 10 },
//   { status: "cancelled", paymentStatus: "refunded", date: "2026-10-22T14:20:00Z", shipping: 0 },
// ];

// function buildMockOrder(config: (typeof sampleOrderConfigs)[number], orderIndex: number): CustomerOrder {
//   // Each sample order uses the next available catalogue products, not hardcoded book details.
//   const start = orderIndex * 2;
//   const lines = makeLines([start, start + 1], orderIndex);
//   const subtotal = lines.reduce((sum, line) => sum + line.subtotal, 0);
//   const currency = catalogueProducts[0]?.currency || "AED";

//   return {
//     id: 1001 + orderIndex,
//     name: `UBH/2026/${String(1001 + orderIndex).padStart(5, "0")}`,
//     date: config.date,
//     status: config.status,
//     paymentStatus: config.paymentStatus,
//     currency,
//     subtotal,
//     shipping: config.shipping,
//     total: subtotal + config.shipping,
//     trackingNumber: config.trackingNumber,
//     trackingUrl: undefined,
//     lines,
//     shippingAddress: {
//       name: "UBH Demo Customer",
//       street: "University City Road",
//       city: "Sharjah",
//       country: "United Arab Emirates",
//     },
//   };
// }

// export const mockOrders: CustomerOrder[] = sampleOrderConfigs
//   .map((config, index) => buildMockOrder(config, index))
//   // If the catalogue has fewer products, omit sample orders that have no lines.
//   .filter((order) => order.lines.length > 0);

// export type MockOrderRequest = {
//   id: number;
//   orderId: number;
//   type: "cancel" | "return";
//   status: "submitted";
//   reason: string;
//   details?: string;
//   createdAt: string;
// };

// export const mockOrderRequests: MockOrderRequest[] = [];


import { products } from "@/lib/store/catalog";
import type {
  CustomerOrder,
  OrderLine,
  OrderStatus,
  PaymentStatus,
} from "@/lib/odoo/order-types";

/**
 * Development-only sample orders built from the local UBH catalogue.
 * These records are not real Odoo orders and must not be used
 * for production checkout.
 */

const catalogueProducts = products.filter(
  (product) =>
    product.active !== false &&
    Number.isFinite(product.price) &&
    product.price >= 0,
);

function makeLines(
  productIndexes: number[],
  orderIndex: number,
): OrderLine[] {
  return productIndexes
    .map((productIndex, lineIndex): OrderLine | null => {
      const product = catalogueProducts[productIndex];

      if (!product) {
        return null;
      }

      const quantity =
        (orderIndex + lineIndex) % 2 === 0 ? 1 : 2;

      const unitPrice = Number(product.price) || 0;

      const line: OrderLine = {
        id: orderIndex * 10 + lineIndex + 1,
        productId: product.id,
        name: product.title,
        image: product.cover,
        sku: product.sku || product.isbn || product.barcode,
        quantity,
        unitPrice,
        subtotal: unitPrice * quantity,
      };

      return line;
    })
    .filter((line): line is OrderLine => line !== null);
}

const sampleOrderConfigs: Array<{
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  date: string;
  shipping: number;
  trackingNumber?: string;
}> = [
  {
    status: "delivered",
    paymentStatus: "paid",
    date: "2026-10-05T10:30:00Z",
    shipping: 0,
    trackingNumber: "UBH-DEMO-1001",
  },
  {
    status: "processing",
    paymentStatus: "paid",
    date: "2026-10-08T08:15:00Z",
    shipping: 15,
  },
  {
    status: "shipped",
    paymentStatus: "paid",
    date: "2026-10-12T12:00:00Z",
    shipping: 10,
    trackingNumber: "UBH-DEMO-1003",
  },
  {
    status: "confirmed",
    paymentStatus: "pending",
    date: "2026-10-20T09:00:00Z",
    shipping: 10,
  },
  {
    status: "cancelled",
    paymentStatus: "refunded",
    date: "2026-10-22T14:20:00Z",
    shipping: 0,
  },
];

function buildMockOrder(
  config: (typeof sampleOrderConfigs)[number],
  orderIndex: number,
): CustomerOrder {
  // Build sample order lines from the existing product catalogue.
  const start = orderIndex * 2;
  const lines = makeLines([start, start + 1], orderIndex);

  const subtotal = lines.reduce(
    (sum, line) => sum + line.subtotal,
    0,
  );

  const currency = catalogueProducts[0]?.currency || "AED";
  const orderNumber = 1001 + orderIndex;

  return {
    id: orderNumber,
    name: `UBH/2026/${String(orderNumber).padStart(5, "0")}`,
    date: config.date,
    status: config.status,
    paymentStatus: config.paymentStatus,
    currency,
    subtotal,
    shipping: config.shipping,
    total: subtotal + config.shipping,
    trackingNumber: config.trackingNumber,
    trackingUrl: undefined,
    lines,
    shippingAddress: {
      name: "UBH Demo Customer",
      street: "University City Road",
      city: "Sharjah",
      country: "United Arab Emirates",
    },
  };
}

export const mockOrders: CustomerOrder[] = sampleOrderConfigs
  .map((config, index) => buildMockOrder(config, index))
  // Omit sample orders without any available catalogue products.
  .filter((order) => order.lines.length > 0);

export type MockOrderRequest = {
  id: number;
  orderId: number;
  type: "cancel" | "return";
  status: "submitted";
  reason: string;
  details?: string;
  createdAt: string;
};

export const mockOrderRequests: MockOrderRequest[] = [];
