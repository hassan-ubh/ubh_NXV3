// import { NextResponse } from "next/server";

// type Context = { params: Promise<{ id: string }> };

// /** Never resolve an order by an untrusted public ID without verifying ownership. */
// export async function GET(_request: Request, _context: Context) {
//   return NextResponse.json(
//     { success: false, message: "Sign-in and order-service integration are required to access this order." },
//     { status: 401, headers: { "Cache-Control": "no-store" } },
//   );
// }
import { NextResponse } from "next/server";

type Context = { params: Promise<{ id: string }> };

/** Development preview only. Never use mock orders as production customer data. */
export async function GET(_request: Request, context: Context) {
  if (process.env.NODE_ENV === "development") {
    const { id } = await context.params;
    const { mockOrders } = await import("@/lib/mock/orders");
    const order = mockOrders.find((item) => String(item.id) === id || item.name === id);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found." },
        { status: 404, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { success: true, order },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    { success: false, message: "Sign-in and order-service integration are required to access this order." },
    { status: 401, headers: { "Cache-Control": "no-store" } },
  );
}
