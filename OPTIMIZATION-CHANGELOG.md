# UBH2 optimization pass

This pass builds on the uploaded project rather than replacing its design or routes.

## Included changes

- Centralized core brand colors, typography stacks, border/surface colors and common sizing in CSS design tokens at the top of `app/globals.css`.
- Replaced repeated high-frequency navy, gold, border and muted-color utility literals with semantic `ubh-*` Tailwind utilities.
- Removed the blocking Google Fonts CSS import; the site uses configurable system-first font stacks to avoid an external font request during initial rendering.
- Added a shared category taxonomy in `lib/store/categories.ts` with canonical slugs, English/Arabic labels and keyword matching.
- Synchronized category navigation, catalogue filtering, popular-subject links and publications links around canonical category IDs.
- Added sample eBook, series and open-access metadata so the corresponding collection/type filters have matching demo records.
- Removed duplicate sample catalogue entries and the unused `additionalProducts` data copy.
- Added `lib/store/catalog.ts` as the single catalogue import boundary for UI pages and the storefront product API.
- Updated `/api/shop/products` to return the same sample catalogue used by the storefront instead of a different, incompatible mock Odoo DTO.
- Corrected the `Publish With Us` route and sitemap entry.
- Removed large superseded commented implementations and an unused `ProductShowcase` component.
- Improved the structure verification script to check important routes, protected order API behavior, category uniqueness, duplicate sample product IDs/slugs and external font imports.
- Updated architecture, design-token, demo-mode and Odoo handoff documentation.

## Validation performed in this environment

- TypeScript/TSX syntax parsing: passed across all source files.
- Local import path check: passed.
- Structure verification: passed.
- Sample catalogue uniqueness: passed; 177 products with unique IDs and slugs.
- Category label mapping: passed for all 10 English and Arabic store-header categories.
- Sample collection data: eBooks, textbooks, series, open-access and offers all have matching records.

Full `npm run typecheck`, `npm run lint` and `npm run build` could not be completed in this environment because npm dependency downloads failed with a DNS `EAI_AGAIN` error. Run `npm ci`, then the validation commands on a machine with access to the npm registry before deployment.

## Still required before live Odoo commerce

This is a sample-data frontend, not a live order/payment system. Real Odoo products, customer authentication, order creation, server-side pricing/stock checks, payment verification, and order ownership authorization remain integration tasks. The order APIs intentionally fail closed outside the development sample preview.
