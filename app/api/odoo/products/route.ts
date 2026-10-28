// import { NextResponse } from "next/server";
// import { getOdooProducts } from "@/lib/odoo/client";
// export async function GET(){try{return NextResponse.json({data:await getOdooProducts()});}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Odoo request failed"},{status:500});}}

// app/api/shop/products/route.ts

import { NextResponse } from "next/server";
import { getProducts } from "@/lib/odoo/products";

export async function GET() {
  try {
    const products = await getProducts();

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Failed to load products:", error);

    return NextResponse.json(
      {
        success: false,
        products: [],
        error: "Failed to load products",
      },
      {
        status: 500,
      }
    );
  }
}