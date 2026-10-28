# Production readiness and Odoo handoff

This archive is a sample-data frontend baseline, not a live commerce backend. It is designed to run locally without Odoo and to keep a defined catalogue boundary for future integration.

## Current demo behavior

- Website content and storefront catalogue are local sample data.
- Cart and wishlist use browser-local persistence.
- Checkout/order confirmation are demonstration flows and do not create real Odoo sale orders or collect payment.
- Authentication screens are not a substitute for production authentication.
- Order read/cancel/return APIs intentionally fail closed until authentication and customer/order ownership checks exist.
- Legal content and illustrative product data require review before launch.

## Required before live launch

1. Connect the server-side catalogue adapter in `lib/store/catalog.ts` to Odoo and map Odoo records into the stable frontend `Product` contract.
2. Implement authentication, secure HTTP-only sessions and authorization for customer/order routes.
3. Recalculate prices, taxes, shipping and totals on the server; validate stock and quantities against Odoo.
4. Create sale orders server-side with idempotency and explicit state transitions.
5. Verify payment callbacks server-to-server before marking orders paid.
6. Add input schemas, rate limits, safe error handling, structured audit logs and CSRF protections appropriate to the auth model.
7. Replace legal starter content and verify privacy, accessibility and contact details.
8. Run typecheck, lint, production build, browser smoke tests, accessibility checks, dependency audit and performance measurements in staging.

Never expose Odoo credentials through `NEXT_PUBLIC_*` variables or client-side bundles. Use a least-privilege integration user and a staging database for integration testing.
