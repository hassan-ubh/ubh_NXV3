// lib/odoo/products.ts

import type { EcommerceProduct } from "./types";
import { mockOdooProducts } from "./mock-products";
import type { MockOdooProduct } from "./client";
/**
 * Create a URL-friendly slug.
 */
function createSlug(value: string, id: number): string {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `product-${id}`;
}

/**
 * Convert Odoo-style product data
 * into the ecommerce product format.
 */
function mapOdooProduct(
  product: MockOdooProduct
): EcommerceProduct {
  return {
    id: product.id,

    name: product.name,

    slug: createSlug(product.name, product.id),

    description: product.description,

    sku: product.default_code,

    barcode: product.barcode,

    isbn: product.isbn,

    isbn10: product.isbn10,

    category: product.category
      ? {
          name: product.category,
          slug: createSlug(product.category, product.id),
        }
      : undefined,

    publisher: product.publisher
      ? {
          name: product.publisher,
          slug: createSlug(product.publisher, product.id),
        }
      : undefined,

    price: product.list_price,

    currency: "AED",

    stockQuantity: product.qty_available,

    inStock: product.qty_available > 0,

    year: product.year,

    image: product.image || undefined,

    websiteVisible: product.website_published,
  };
}

/**
 * Get all ecommerce products.
 */
export async function getProducts(): Promise<EcommerceProduct[]> {
  const products = mockOdooProducts
    .map(mapOdooProduct)
    .filter((product) => product.websiteVisible);

  return products;
}

/**
 * Get a single product by ID.
 */
export async function getProductById(
  id: number
): Promise<EcommerceProduct | null> {
  const product = mockOdooProducts.find(
    (item) => item.id === id
  );

  if (!product || !product.website_published) {
    return null;
  }

  return mapOdooProduct(product);
}

/**
 * Get a single product by slug.
 */
export async function getProductBySlug(
  slug: string
): Promise<EcommerceProduct | null> {
  const product = mockOdooProducts
    .map(mapOdooProduct)
    .find((item) => item.slug === slug);

  if (!product || !product.websiteVisible) {
    return null;
  }

  return product;
}