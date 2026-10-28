import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const required = [
  "app/[locale]/(website)/page.tsx",
  "app/[locale]/(website)/about-us/page.tsx",
  "app/[locale]/(website)/publishers/page.tsx",
  "app/[locale]/(website)/publishers/[slug]/page.tsx",
  "app/[locale]/(website)/institutions/page.tsx",
  "app/[locale]/(website)/news/page.tsx",
  "app/[locale]/(store)/shop/page.tsx",
  "app/[locale]/(store)/shop/products/page.tsx",
  "components/store/StoreBreadcrumbs.tsx",
  "app/[locale]/(store)/shop/[slug]/page.tsx",
  "app/[locale]/(store)/cart/page.tsx",
  "app/[locale]/(store)/checkout/page.tsx",
  "app/[locale]/(store)/order-confirmation/page.tsx",
  "app/[locale]/(store)/wishlist/page.tsx",
  "app/[locale]/(store)/login/page.tsx",
  "app/[locale]/(store)/signup/page.tsx",
  "app/[locale]/(store)/profile/orders/page.tsx",
  "app/[locale]/(legal)/privacy-policy/page.tsx",
  "app/[locale]/(legal)/terms/page.tsx",
  "app/[locale]/(legal)/accessibility/page.tsx",
  "app/api/shop/products/route.ts",
  "app/api/shop/orders/route.ts",
  "app/sitemap.ts",
  "app/robots.ts",
  "lib/odoo/products.ts",
  "lib/store/categories.ts",
  "app/globals.css",
];

const missing = required.filter((file) => !existsSync(resolve(file)));
if (missing.length) {
  console.error("Missing required project files:\n" + missing.map((file) => `- ${file}`).join("\n"));
  process.exitCode = 1;
}

const orderApi = [
  "app/api/shop/orders/route.ts",
  "app/api/shop/orders/[id]/route.ts",
  "app/api/shop/orders/[id]/cancel/route.ts",
  "app/api/shop/orders/[id]/return/route.ts",
];
for (const file of orderApi) {
  if (!existsSync(resolve(file))) {
    console.error(`Missing protected order endpoint: ${file}`);
    process.exitCode = 1;
    continue;
  }
  const source = readFileSync(resolve(file), "utf8");
  const hasMockOrderRead = /mockOrders\.(?:find|push|filter)|orders:\s*mockOrders/.test(source);
  const guardedDevelopmentPreview = /process\.env\.NODE_ENV\s*===\s*["']development["']/.test(source) && /status:\s*401/.test(source);
  if (hasMockOrderRead && !guardedDevelopmentPreview) {
    console.error(`Mock-order access must be development-only and fail closed otherwise: ${file}`);
    process.exitCode = 1;
  }
}

const button = readFileSync(resolve("components/shared/Button.tsx"), "utf8");
if (/href\s*=\s*["']#["']/.test(button)) {
  console.error("Shared Button must not default to an inert # link.");
  process.exitCode = 1;
}

const categorySource = readFileSync(resolve("lib/store/categories.ts"), "utf8");
const categorySlugs = [...categorySource.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((match) => match[1]);
if (new Set(categorySlugs).size !== categorySlugs.length || categorySlugs.length < 10) {
  console.error("Shop categories must have at least 10 unique canonical slugs.");
  process.exitCode = 1;
}

const productSource = readFileSync(resolve("data/products.ts"), "utf8");
const productIds = [...productSource.matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1]);
const productSlugs = [...productSource.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);
for (const [label, values] of [["product IDs", productIds], ["product slugs", productSlugs]]) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) {
    console.error(`Duplicate ${label}: ${[...new Set(duplicates)].join(", ")}`);
    process.exitCode = 1;
  }
}

const globalCss = readFileSync(resolve("app/globals.css"), "utf8");
if (/fonts\.googleapis\.com/.test(globalCss)) {
  console.error("Global CSS should not block rendering on a third-party Google Fonts import.");
  process.exitCode = 1;
}


const storeHeader = readFileSync(resolve("components/store/StoreHeader.tsx"), "utf8");
const productListing = readFileSync(resolve("app/[locale]/(store)/shop/products/page.tsx"), "utf8");
const productShow = readFileSync(resolve("components/store/ProductShow.tsx"), "utf8");
for (const route of [
  "collection=new-releases", "collection=ubh", "collection=best-sellers",
  "type=ebook", "type=textbook", "collection=series", "collection=offers",
  "collection=open-access", "/publishers", "/institutions",
]) {
  if (!storeHeader.includes(route)) {
    console.error(`Store navigation is missing expected destination: ${route}`);
    process.exitCode = 1;
  }
}
if (!productListing.includes("initialFilters") || !productShow.includes("matchesSearch") || !productShow.includes("authorMatches")) {
  console.error("Store catalogue must initialize URL filters and apply search/author filters.");
  process.exitCode = 1;
}
if (!readFileSync(resolve("components/layout/StoreShell.tsx"), "utf8").includes("StoreBreadcrumbs")) {
  console.error("Store layout must render shared store breadcrumbs.");
  process.exitCode = 1;
}

if (!process.exitCode) {
  console.log(`Structure verification passed (${required.length} required files, ${orderApi.length} protected order endpoints, ${categorySlugs.length} categories).`);
}
