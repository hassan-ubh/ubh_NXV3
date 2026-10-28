# UBH2 architecture

The project keeps the existing corporate website and storefront while sharing design tokens, navigation primitives, locale handling and product contracts.

## Routes and layout boundaries

```text
app/
├── layout.tsx                       # Global metadata and cart provider
├── page.tsx                          # Root redirect
├── api/                              # Server API routes
└── [locale]/                         # en / ar, language and direction
    ├── (website)/                    # Corporate website shell
    ├── (store)/                      # Store shell and shopping journeys
    └── (legal)/                      # Legal pages, shared/contextual shell
```

Route groups do not appear in URLs. Website and store layouts keep their headers/footers persistent while page templates animate content only.

## Component boundaries

- `components/shared/`: shared logo, header/footer primitives, buttons, containers, breadcrumbs and states.
- `components/home/`, `components/publishers/`, `components/news/`, `components/research/`: page-specific composition.
- `components/store/`: catalogue, product details, cart state, checkout and account interfaces.
- `lib/store/`: catalogue boundary, category taxonomy and filter logic.
- `lib/odoo/`: server-side integration adapter and DTO mapping; no credentials in client components.
- `data/`: sample content, including the sample storefront catalogue.

## Design tokens

`app/globals.css` owns the `--ubh-*` design tokens and exposes them as semantic Tailwind utilities. Update this token block instead of editing brand hex values throughout components. Fonts are system-first to avoid a blocking third-party font request.

## Catalogue boundary and Odoo

Store UI and the storefront product API import from `lib/store/catalog.ts`. It currently re-exports the local sample catalogue. When connecting Odoo, replace this adapter with a server/API-backed provider that maps Odoo data to the stable frontend `Product` contract. Odoo credentials must stay server-only. Cart totals, price, stock and order state must be revalidated server-side before any live transaction.

## Validation

```bash
npm ci
npm run typecheck
npm run lint
npm run verify:structure
npm run build
```
