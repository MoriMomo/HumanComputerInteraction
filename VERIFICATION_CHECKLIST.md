# Verification Checklist

This concise checklist captures the remaining verification and immediate fixes to complete before final handoff. Use it as a single source of truth for testing and follow-up work.

## Quick start (dev)
- Start dev server and verify pages load: `/`, `/products`, `/cart`, `/checkout`.

Run:

```bash
npm run dev
# open http://localhost:3000/
```

## High priority checks
- Fix Hooks order
  - Ensure `useCurrency()` is called unconditionally at top of components (`src/contexts/CurrencyProvider.tsx`, `src/components/sections/ShopSection.tsx`, `src/views/products/ProductsPage.tsx`).
- Response parsing guards
  - Audit `response.json()` usages and guard with `Content-Type` checks.
- Image quality warnings
  - Update `next.config.ts` `images.qualities` to include used qualities (e.g., 72 and 75).

## 3D viewer
- Confirm GLB files under `public/satset3d/glb/` load in `CardHolderScene`.
- Add fallback primitive if loader fails; verify auto-center/scale.
- Implement robust tinting by cloning materials and preserving texture maps.

## Currency & pricing
- Confirm `CurrencyProvider` default rate and `format()` used everywhere (`format(product.price)`).
- Sweep for hard-coded USD text and replace with dynamic currency strings.
- Optionally: add live rate source (exchangerate.host) or admin override.

## Checkout & handoff
- Test WhatsApp handoff via `getWhatsAppUrl()` and env `NEXT_PUBLIC_WHATSAPP`.
- Verify cart data included in handoff message and URL encoding.

## Product data & assets
- Verify `src/data/products.ts` entries and existence of images in `public/products/`.
- Replace placeholder images or update sizes if Next image warnings persist.

## Stability, performance & QA
- Fix SSR/hydration warnings (Navbar, providers).
- Run Lighthouse for accessibility/performance; triage LCP/CLS.
- Add smoke e2e tests for product listing → add to cart → checkout.

## Deploy preflight
- Confirm env vars, asset hosting for GLB, and `NEXT_PUBLIC_WHATSAPP` set.
- Run `npm run build` and resolve build-time warnings.

## Notes & contacts
- File issues referencing exact files and relevant TODO IDs in the repo when creating PRs.
- Keep this file updated with any new findings.

---
Last updated: May 17, 2026
