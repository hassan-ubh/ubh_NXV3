// import { NextResponse } from "next/server";

// /** Orders contain personal data. Implement this endpoint only after server-side
//  * authentication and ownership checks are connected to the Odoo adapter. */
// export async function GET() {
//   return NextResponse.json(
//     { success: false, message: "Sign-in and order-service integration are required to access orders." },
//     { status: 401, headers: { "Cache-Control": "no-store" } },
//   );
// }

import { NextResponse } from "next/server";

/**
 * Development preview only: expose catalogue-derived sample orders locally.
 * Production remains fail-closed until authenticated Odoo integration exists.
 */
export async function GET() {
  if (process.env.NODE_ENV === "development") {
    const { mockOrders } = await import("@/lib/mock/orders");
    return NextResponse.json(
      { success: true, orders: mockOrders },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    { success: false, message: "Sign-in and order-service integration are required to access orders." },
    { status: 401, headers: { "Cache-Control": "no-store" } },
  );
}
