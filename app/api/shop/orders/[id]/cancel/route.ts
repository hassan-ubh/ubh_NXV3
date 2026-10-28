import { NextResponse } from "next/server";

type Context = { params: Promise<{ id: string }> };

/** Cancellation requests must be authenticated and checked against the
 * signed-in customer's Odoo order before any mutation is allowed. */
export async function POST(_request: Request, _context: Context) {
  return NextResponse.json(
    { success: false, message: "Cancellation requests are unavailable until secure sign-in and Odoo order integration are configured." },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}
