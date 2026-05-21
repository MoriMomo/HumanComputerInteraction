# Site Overview — HumanComputerInteraction

This document explains the full structure, runtime behavior, and developer workflow for the HumanComputerInteraction Next.js site. It's intended as a single onboarding reference for engineers and contributors.

## Table of contents
- Site summary & tech stack
- Routes & pages (app router)
- Components catalog (by folder)
- Data & content sources
- Contexts & state management
- Hooks & utilities
- 3D, graphics & performance
- Animations & GSAP patterns
- Routing, loading & UX helpers
- API endpoints & authentication
- Build, run, test, deployment
- Verification checklist
- Contribution & style notes

---

## Site summary & tech stack

- Purpose: marketing + commerce landing site showcasing a physical product (SatSet-style cardholder) with 3D previews, animated sections, blog, and product pages.
- Framework: Next.js (app router), React (client components where needed).
- Styling: Tailwind CSS utility classes in components and global CSS in `src/app/globals.css`.
- 3D: `@react-three/fiber` + `@react-three/drei` for WebGL scenes.
- Animations: `gsap` with `ScrollTrigger` plugin and custom `useGSAP` abstractions.
- Testing: Playwright E2E specs in `e2e/`.
- DB: Prisma schema at [prisma/schema.prisma](prisma/schema.prisma) (if used for runtime data).

## Routes & pages

The project uses the Next.js `app/` router. Key routes:

- Root / landing: [src/app/page.tsx](src/app/page.tsx) — entry to the showcase page and site shell.
- Products list: [src/app/products/page.tsx](src/app/products/page.tsx) — product listing.
- Product detail (dynamic): [src/app/products/[slug]/page.tsx](src/app/products/[slug]/page.tsx) — product details, 3D model, add-to-cart.
- Blog index: [src/app/blog/page.tsx](src/app/blog/page.tsx) — blog listing.
- Blog post (dynamic): [src/app/blog/[slug]/page.tsx](src/app/blog/[slug]/page.tsx) — blog post view + GSAP entrance animations.
- Auth: [src/app/auth/login/page.tsx](src/app/auth/login/page.tsx) and [src/app/auth/signup/page.tsx](src/app/auth/signup/page.tsx).
- About: [src/app/about/page.tsx](src/app/about/page.tsx).

Notes:
- Route files tend to be small wrappers that import page-level views from `src/views/*`.
- Dynamic routes pick content from `src/data/*` or databases via API routes.

## Components catalog (grouped)

Top-level component folders and responsibilities:

- `src/components/layout` — site shell and navigation.
  - `Navbar.tsx` — main header, menu toggle, scroll state and GSAP mount animations.
  - `Footer.tsx` — footer links and grid map.

- `src/components/sections` — page sections used on landing and product pages.
  - `HeroSection.tsx` — hero with 3D model (`CardHolderScene`), GSAP timeline, IntersectionObserver.
  - `StatsSection.tsx` — video + stat counters and play/pause logic.
  - `MaterialSection.tsx` — swatches and 3D model controls.
  - `FeaturesSection.tsx`, `SpecsSection.tsx`, `ShopSection.tsx` — feature grids, specs, product cards.

- `src/components/3d` — WebGL scene wrappers and models.
  - `CardHolderScene.tsx` — Canvas wrapper around `CardHolderModel` and `OrbitControls`.
  - `CardHolderModel.tsx` — the actual GLTF/mesh loader (not always included here).

- `src/components/ui` — small UI primitives & helpers.
  - `LoadingLink.tsx` — Next `Link` wrapper that triggers `startLoading()` for route transitions.
  - `GlobalLoadingLayer.tsx` — top-level overlay used during route transitions or heavy loads.
  - `RouteLoadingManager.tsx` — listens to route changes and triggers loading state.
  - `ReactiveBackground.tsx` — GPU/three.js-driven background instanced mesh.

Component usage notes:
- Many components use `dynamic()` imports with `ssr: false` for WebGL and heavy assets.
- Components use `useGSAP` or `gsap.context` for mount/unmount-safe animations.

## Data & content sources

- Static data: `src/data/*` (e.g., `src/data/blog.ts`, `src/data/products.ts`) — canonical in-repo content for blog and product listings.
- Images & videos: under `public/` (e.g., `/video/*.mp4`, `/aboutUs/*`, `/featureSelection/*`).
- Database: `prisma/schema.prisma` describes DB models if server-side persistence is used — check `src/lib/prisma.ts`.

Environment variables (used by project):

- `NEXT_PUBLIC_WHATSAPP` — WhatsApp number used by `src/lib/whatsapp.ts`.
- API base URL — referenced by `AuthProvider` and `postAuth` helper. Search `getApiBaseUrl()` in `src/lib/*`.

## Contexts & state

- `src/contexts/AuthProvider.tsx` — manages `user`, `login`, `signup`, and `logout`. Uses `postAuth` helper and local state.
- `src/contexts/LoadingProvider.tsx` — central loading state used by `RouteLoadingManager` and `LoadingLink`.
- `src/contexts/CartProvider.tsx` — cart operations and `itemCount` (used in `Navbar`).
- `CurrencyProvider`, `ScrollProvider`, `LoadingProvider` — other cross-cutting providers used by pages.

Patterns:
- Contexts expose hooks like `useAuth()` and `useLoading()`. Prefer consuming the hook rather than `useContext` directly.

## Hooks & utilities

- `src/hooks/useResolvedColor.ts` — resolves CSS `var(...)` values at runtime using `getComputedStyle` and watches for theme changes.
- `src/hooks/useDebounce.ts` — debounce utility for input handling.
- `src/lib/whatsapp.ts` — builds WhatsApp links with a configured public number.
- `src/lib/analytics.ts`, `site-url.ts`, `prisma.ts` — helper utilities for cross-cutting concerns.

## 3D, graphics & performance

- WebGL is implemented with `@react-three/fiber` inside components like [src/components/3d/CardHolderScene.tsx](src/components/3d/CardHolderScene.tsx).
- Use `dynamic(..., { ssr: false })` for 3D scenes to avoid server-side rendering of `Canvas`.
- Tips:
  - Keep `dpr` conservative (`[1, 1.5]`) to reduce GPU load on mobile.
  - Provide `enableZoom` toggles on `OrbitControls` to limit camera distance.
  - Use `Suspense` fallbacks while models load; provide lightweight placeholder UI.

## Animations & GSAP patterns

- `gsap.registerPlugin(ScrollTrigger)` is called in many sections.
- The repo uses a `useGSAP` helper (search in codebase) which uses `gsap.context` to scope animations to a container ref and safely revert them on unmount.
- Respect prefers-reduced-motion by checking `window.matchMedia("(prefers-reduced-motion: reduce)")` before running complex timelines.

Performance recommendations:
- Use `requestAnimationFrame` loops sparingly; prefer `ScrollTrigger`'s optimized triggers.
- Clear GSAP inline properties after animations when toggling states (`gsap.set(..., { clearProps: 'all' })`).

## Routing, loading & navigation UX

- `LoadingLink.tsx` determines whether to start loading on navigation by comparing the route target to the current `pathname` and calling `startLoading()`.
- `RouteLoadingManager.tsx` triggers `startLoading()` on route changes when not already loading.
- `GlobalLoadingLayer.tsx` shows an overlay when `isLoading` is true; `LoadingOverlay` takes an `onComplete` callback.

UX notes:
- Use `LoadingLink` for internal navigation to preserve the smooth loading overlay behavior.

## API endpoints & authentication

- API routes live under `src/app/api/*` (e.g., `src/app/api/auth/*`). Consult `AuthProvider` which posts to `${getApiBaseUrl()}/auth/*`.
- `AuthProvider` expects JSON responses and uses `readJsonResponse` to validate content types.

Security notes:
- Never log secrets in the browser. Keep server-only keys in a server environment and use secure cookies or tokens for sessions.

## Build, run, test, deployment

Common developer commands (from repo root):

```bash
npm install
npm run dev        # Start Next.js dev server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Run production server
npx playwright test # Run E2E tests
```

Type-check & lint:

```bash
npm run type-check
npm run lint
```

Deployment notes:
- Static assets under `public/` are served as-is; ensure large assets (videos/GLTFs) are optimized or served via CDN.
- If using Prisma, run database migrations during deployment and set `DATABASE_URL`.

## Verification checklist

1. Run `npm run dev` and visit `/` — landing renders and hero loads (3D appears on supported desktop).
2. Exercise product pages: [src/app/products/[slug]/page.tsx](src/app/products/[slug]/page.tsx) — check color swatches and add-to-cart.
3. Check login/signup flows at `/auth/login` and `/auth/signup`.
4. Run Playwright E2E tests: `npx playwright test` — verify core flows pass.
5. Run `npm run lint` and `npm run type-check` to ensure code quality.

## Contribution & style notes

- Add new components under `src/components/*` organized by domain: `layout`, `sections`, `3d`, `ui`.
- Small, focused PRs are preferred. Keep visual changes accompanied by screenshots or short Loom videos.
- When adding 3D models, store source assets in `public/` and reference from model loaders.

---

If you'd like, I will now:

- Expand this draft into per-file responsibility tables for the top 25 files, or
- Add examples for common tasks (adding a new product, adding a 3D model), or
- Create a lightweight CONTRIBUTING.md linking to this overview.

Tell me which next step you want and I'll continue.
