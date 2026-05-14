/**
 * Configuration modules – import directly from specific files
 *
 * Direct imports enable better tree-shaking and reduce bundle size:
 *   import { ANIMATION, MODEL_CONFIG } from '@/config/constants';
 *   import { SWATCHES, RENDER_MODES } from '@/config/swatches';
 *   import { NAV_LINKS } from '@/config/navigation';
 *   import { EASING, TIMELINE_DEFAULTS } from '@/config/animations';
 *
 * Avoid importing from this barrel file to allow unused constants
 * to be excluded from the final bundle.
 */
