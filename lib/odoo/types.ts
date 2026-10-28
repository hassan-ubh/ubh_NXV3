// lib/odoo/types.ts

export type EcommerceProduct = {
  id: number;

  name: string;
  slug: string;

  description?: string;

  sku?: string;
  barcode?: string;
  isbn?: string;
  isbn10?: string;

  category?: {
    id?: number;
    name: string;
    slug?: string;
  };

  publisher?: {
    id?: number;
    name: string;
    slug?: string;
  };

  price: number;
  currency: string;

  stockQuantity: number;
  inStock: boolean;

  year?: number;

  image?: string;

  websiteVisible: boolean;
};