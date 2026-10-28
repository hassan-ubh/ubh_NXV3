// type OdooConfig = { baseUrl:string; db:string; username:string; password:string };

// const config: OdooConfig = {
//   baseUrl: process.env.ODOO_BASE_URL || "",
//   db: process.env.ODOO_DB || "",
//   username: process.env.ODOO_USERNAME || "",
//   password: process.env.ODOO_PASSWORD || "",
// };

// export async function odooJsonRpc(service:string, method:string, args:unknown[]) {
//   if (!config.baseUrl) throw new Error("ODOO_BASE_URL is not configured");
//   const response = await fetch(`${config.baseUrl.replace(/\/$/,"")}/jsonrpc`, {
//     method: "POST", headers: { "Content-Type":"application/json" },
//     body: JSON.stringify({ jsonrpc:"2.0", method:"call", params:{service, method, args}, id:Date.now() }),
//     cache: "no-store",
//   });
//   if (!response.ok) throw new Error(`Odoo HTTP ${response.status}`);
//   const json = await response.json();
//   if (json.error) throw new Error(json.error.data?.message || json.error.message || "Odoo error");
//   return json.result;
// }

// /**
//  * Production pattern:
//  * 1) authenticate once and cache the uid.
//  * 2) call execute_kw on product.template/product.product.
//  * 3) map Odoo fields into a stable frontend DTO.
//  * Keep Odoo credentials server-only.
//  */
// export async function getOdooProducts(limit=12) {
//   if (!config.baseUrl || !config.db || !config.username || !config.password) return [];
//   const uid = await odooJsonRpc("common","authenticate",[config.db,config.username,config.password,{}]);
//   return odooJsonRpc("object","execute_kw",[
//     config.db, uid, config.password, "product.template", "search_read",
//     [ [["sale_ok","=",true]] ], { fields:["id","name","list_price","default_code","image_1920"], limit }
//   ]);
// }
// lib/odoo/client.ts

export type MockOdooProduct = {
  id: number;

  default_code: string;
  name: string;

  category?: string;
  publisher?: string;

  qty_available: number;
  list_price: number;

  website_published: boolean;

  year?: number;
  barcode?: string;

  website?: string;

  description?: string;

  isbn?: string;
  isbn10?: string;

  image?: string;
};

/**
 * Simulates an Odoo product request.
 *
 * Later, this file can be replaced with the real Odoo request.
 */
export async function mockOdooGetProducts(): Promise<MockOdooProduct[]> {
  return [];
}