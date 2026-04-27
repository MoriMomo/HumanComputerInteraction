# JULES Issue Backlog

| Issue ID | Area | Severity | Confidence | Status | Description / Hypothesis | Repro Notes / Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **WEB-BUILD-001** | BUILD_QUALITY | MEDIUM | HIGH | VERIFIED | Typecheck baseline is not clean across test and E2E context | |
| **WEB-BUILD-002** | BUILD_QUALITY | LOW | HIGH | VERIFIED | Lint warning exists for unused symbol in auth validation test file | |
| **WEB-BUILD-003** | BUILD_QUALITY | MEDIUM | HIGH | VERIFIED | Test files show import/style inconsistency that can break strict TS flows | |
| **WEB-BUILD-004** | BUILD_QUALITY | MEDIUM | HIGH | VERIFIED | Suppression comments exist in some UI/3D areas and should be reduced | |
| **WEB-API-001** | API_RESILIENCE | HIGH | MEDIUM | VERIFIED | Cart writes may not be idempotent during retries/network duplication | |
| **WEB-STATE-001** | STATE_CONSISTENCY | HIGH | HIGH | VERIFIED | Cart provider state may drift from server after partial failures | |
| **WEB-SEC-001** | SECURITY | HIGH | MEDIUM | VERIFIED | Auth endpoints may need stronger abuse protection and rate limiting | |
| **WEB-SEC-002** | SECURITY | HIGH | MEDIUM | VERIFIED | Contact endpoint may need anti-spam hardening and stricter validation | |
| **WEB-PERF-001** | PERFORMANCE | HIGH | HIGH | VERIFIED | 3D/media-heavy sections likely affect LCP and interaction smoothness | |
| **WEB-A11Y-001** | ACCESSIBILITY | HIGH | MEDIUM | VERIFIED | Keyboard traversal may be inconsistent in nav overlays and interactive cards | |
| **WEB-SEO-001** | SEO | HIGH | MEDIUM | VERIFIED | Dynamic product/blog routes may have inconsistent metadata quality | |
| **WEB-RESP-001** | RESPONSIVENESS | HIGH | MEDIUM | VERIFIED | Hero/3D and complex sections may clip or overlap on narrow screens | |
| **WEB-UX-001** | UX | MEDIUM | MEDIUM | VERIFIED | Product and compare flow may not clearly guide users on empty states | |
| **WEB-UX-002** | UX | MEDIUM | HIGH | OPEN | Cart feedback timing may feel delayed during quantity changes | |
| **WEB-UX-003** | UX | MEDIUM | MEDIUM | OPEN | Auth forms may not preserve enough user context after error | |
| **WEB-A11Y-002** | ACCESSIBILITY | HIGH | MEDIUM | OPEN | Focus visibility and semantic landmarks may be incomplete on some pages | |
| **WEB-A11Y-003** | ACCESSIBILITY | MEDIUM | MEDIUM | OPEN | Reduced-motion support may be incomplete in animation-heavy sections | |
| **WEB-PERF-002** | PERFORMANCE | MEDIUM | MEDIUM | OPEN | Expensive effects may trigger paint/reflow spikes on lower-end devices | |
| **WEB-PERF-003** | PERFORMANCE | MEDIUM | MEDIUM | OPEN | Route loading overlays may contribute to perceived jank | |
| **WEB-SEO-002** | SEO | MEDIUM | MEDIUM | OPEN | Category and detail pages may need stronger canonical/internal-link strategy | |
| **WEB-SEO-003** | SEO | LOW | LOW | OPEN | Sitemap and robots alignment may drift from route growth | |
| **WEB-SEC-003** | SECURITY | MEDIUM | LOW | OPEN | Session boundary edge cases may exist under rapid login/logout | |
| **WEB-API-002** | API_RESILIENCE | MEDIUM | HIGH | OPEN | API error schema may be inconsistent across auth/cart/contact | |
| **WEB-API-003** | API_RESILIENCE | MEDIUM | MEDIUM | OPEN | Input validation and failure messaging may be uneven between endpoints | |
| **WEB-STATE-002** | STATE_CONSISTENCY | MEDIUM | MEDIUM | OPEN | Auth hydration may briefly expose stale identity state | |
| **WEB-STATE-003** | STATE_CONSISTENCY | MEDIUM | MEDIUM | OPEN | Loading and scroll state collisions may hide actionable failures | |
| **WEB-RESP-002** | RESPONSIVENESS | MEDIUM | MEDIUM | OPEN | Dense cards/grids may degrade touch targets on mobile | |
| **WEB-RESP-003** | RESPONSIVENESS | LOW | MEDIUM | OPEN | Utility migration may leave spacing outliers across breakpoints | |
