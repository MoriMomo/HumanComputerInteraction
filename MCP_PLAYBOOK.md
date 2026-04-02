# MCP Playbook for HumanComputerInteraction

This guide helps you decide when to use MCP tools and when to stay local-first in this Next.js project.

## 1) Fast Rule (Beginner Friendly)

Use MCP when:
- The task repeats often.
- The task touches 3 or more files.
- The task needs external systems (GitHub, cloud, docs, data tooling).

Do not use MCP when:
- You only need one small style or text tweak.
- You are still brainstorming feature ideas.
- A manual edit is faster than writing instructions.

## 2) Project Map You Already Have

Primary route layer:
- src/app

Central page implementations:
- src/views/showcase
- src/views/products
- src/views/about
- src/views/blog

Reusable UI:
- src/components

Data content:
- src/data

Use this separation to keep route files thin and page logic centralized.

## 3) Workflow A: Page and Content Work

Goal:
Build and adjust page content quickly while keeping clean structure.

Recommended flow:
1. Edit or create page UI in src/views only.
2. Keep app route files as wrappers only.
3. Ask MCP-enabled assistant for batch updates across all page files, for example:
   - unify spacing and section rhythm on all marketing pages
   - update heading style system across showcase, products, about, blog
4. Run lint after each batch.
5. Review visual output in dev server.

Good MCP tasks in this workflow:
- Multi-file content edits.
- Replacing repeated section structures.
- Updating shared copy patterns across pages.

## 4) Workflow B: Component Refactor Work

Goal:
Extract repeated UI into reusable components without breaking pages.

Recommended flow:
1. Identify repeated blocks in src/views pages.
2. Create shared components in src/components.
3. Replace duplicate markup in all affected pages.
4. Keep data in src/data when possible.
5. Run lint and verify routes.

Good MCP tasks in this workflow:
- Symbol rename across project.
- Multi-file import rewiring.
- Consistent prop shape updates.
- Safe repetitive edits in many files.

Refactor checklist:
- No duplicated card or section markup left in pages.
- Props are typed and reusable.
- Existing route URLs still work.

## 5) Workflow C: Pre-Release Checklist

Goal:
Ship faster with fewer regressions.

Before release:
1. Run lint.
2. Run build.
3. Smoke test key routes:
   - /
   - /products
   - /about
   - /blog
   - one product detail page
   - one blog detail page
4. Verify hydration-safe behavior in client-only widgets.
5. Confirm loading and animation states still render correctly.

Good MCP tasks in this workflow:
- Automated checklist execution.
- Summarizing changed files and risk areas.
- Preparing release notes from diff.

## 6) Practical Prompt Templates

Use these prompt styles to save time:

Template 1: Page cleanup
- Standardize section spacing and typography rhythm in src/views/showcase, src/views/products, src/views/about, and src/views/blog. Keep visual identity and do not change route behavior.

Template 2: Component extraction
- Extract repeated product and article card patterns into reusable components under src/components. Update all imports and keep UI unchanged.

Template 3: Release sweep
- Run pre-release checks, list risks by severity, and suggest minimal fixes only.

## 7) Efficiency Habits (High Impact)

- Work in vertical slices: one feature, one lint pass, one commit.
- Prefer batch prompts over many tiny prompts.
- Keep route layer thin and feature UI in src/views.
- Use MCP for broad edits and external integrations.
- Use local manual edits for tiny changes.

## 8) Weekly Improvement Loop

At the end of each week:
1. Note which tasks felt repetitive.
2. Convert those into prompt templates.
3. Add one new reusable component.
4. Keep this playbook updated with what actually saved time.

If followed consistently, this workflow keeps iteration speed high while preserving a clean project structure.

## 9) UI/UX Checklist For This Project

Use this checklist when working on:
- src/views/showcase
- src/views/products
- src/views/about
- src/views/blog

Visual hierarchy:
- Keep one clear hero message and one primary action per page.
- Maintain consistent section rhythm (headline, supporting copy, action).
- Preserve spacing scale consistency across all marketing pages.

Typography and readability:
- Keep heading styles consistent between pages.
- Ensure body copy remains readable on 375px width.
- Avoid very long lines on desktop; keep readable content widths.

Interaction and motion:
- Ensure hover effects do not shift layout.
- Respect prefers-reduced-motion for non-essential animations.
- Keep transitions smooth and short (roughly 150ms to 300ms for UI feedback).

Accessibility:
- Verify visible focus states on all interactive controls.
- Ensure color contrast is sufficient for text and controls.
- Make sure forms have labels and clear validation messaging.
- Do not rely on color alone to communicate state.

Responsive behavior:
- Verify key breakpoints: 375px, 768px, 1024px, 1440px.
- Ensure no horizontal overflow on mobile.
- Keep tap targets large enough for touch use.

Content and conversion:
- Keep CTA copy specific and action-oriented.
- Place at least one high-priority CTA above the fold on mobile.
- Include trust/support cues near conversion actions where relevant.

Performance-aware UI:
- Avoid introducing heavy visual effects on all sections at once.
- Lazy-load non-critical visuals where possible.
- Re-test smoothness after adding animations or media.

## 10) Master Prompt (Copy-Paste)

Use this prompt when you want AI to do a full UI/UX pass that matches this repo:

"Analyze and improve UI/UX for this Next.js App Router project.

Project structure to follow:
- Route wrappers: src/app
- Page implementations: src/views/showcase, src/views/products, src/views/about, src/views/blog
- Reusable components: src/components

Goals:
1. Improve visual hierarchy, readability, and consistency across all 4 pages.
2. Keep existing brand direction and dark premium look.
3. Preserve current route behavior and URLs.
4. Improve accessibility (focus states, contrast, keyboard flow, labels).
5. Keep performance safe (no unnecessary heavy effects).

Hard constraints:
- Do not change routing architecture.
- Do not break 3D showcase or video behavior.
- Keep edits modular and reusable.
- Prefer extracting repeated UI into src/components.
- Run lint after changes and fix issues.

Deliverables:
1. A prioritized list of UX issues by severity.
2. Concrete code changes applied to relevant files.
3. Short explanation of why each change improves UX.
4. Final validation summary (lint/build status and risks).

Output style:
- Be concise.
- Focus on practical improvements that can ship now.
- Avoid generic design advice."

## 11) Quick Prompt Variants

Variant A: Consistency pass
- "Unify spacing, typography scale, and CTA hierarchy across src/views/showcase, src/views/products, src/views/about, and src/views/blog. Keep style and routing unchanged."

Variant B: Accessibility pass
- "Perform an accessibility-focused refactor across all page views. Prioritize focus visibility, contrast, keyboard navigation, and semantic structure. Keep visuals consistent."

Variant C: Conversion pass
- "Improve CTA clarity and placement for mobile and desktop across all marketing pages. Add trust-support microcopy where suitable without changing brand tone."
