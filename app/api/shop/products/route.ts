import { NextResponse } from "next/server";
import { getCatalogProducts } from "@/lib/store/catalog";

/**
 * Public storefront catalogue endpoint. Demo mode returns the same sample
 * catalogue used by the rendered UI. When Odoo is enabled, the server-side
 * catalog adapter can be switched here without exposing credentials to clients.
 */
export async function GET() {
  return NextResponse.json(
    { success: true, source: "sample", products: getCatalogProducts() },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } },
  );
}
