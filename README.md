# Aura-Link ModuSnap

Modern cyberpunk product showcase built with React, Vite, Tailwind CSS, GSAP, and Lenis.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Project Notes

- Smooth scrolling is powered by `@studio-freight/react-lenis`.
- GSAP ScrollTrigger drives section animations and reveals.
- The Open Graph image path in `index.html` expects an asset at `public/images/og-modusnap.jpg`.
- The `public/images` folder is reserved for product imagery placeholders that should be replaced.

## Structure

- `src/components` - UI sections and layout components
- `src/pages` - Route-level pages
- `src/constants` - Content, colors, and data arrays
- `src/hooks` - Reusable animation hooks
