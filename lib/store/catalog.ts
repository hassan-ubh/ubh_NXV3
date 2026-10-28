/**
 * Store catalogue boundary.
 *
 * The UI imports catalogue data through this module instead of coupling every
 * component to the sample-data file. The current provider is local demo data;
 * when Odoo is enabled, replace this adapter with a server/API-backed provider
 * that maps Odoo records to the stable Product contract in data/products.ts.
 * Never expose Odoo credentials to client components.
 */
export {
  products,
  getProductBySlug,
  slugifyCatalogName,
} from "@/data/products";
export type { Product } from "@/data/products";

import { products } from "@/data/products";

export function getCatalogProducts() {
  return products;
}

export function getCatalogProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug) ?? null;
}
