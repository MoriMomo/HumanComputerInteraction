# Team Project Assignment #6 : Heuristic Evaluation & Prototype Revision #1

**Project Title**: SatSet — Office Utility, Refined  
**Team**: SatSet  
**Date**: December 2025  

---

## 1. Introduction
This report documents the Heuristic Evaluation conducted on the SatSet web prototype. The evaluation was performed by the project team acting as double-expert evaluators, using **Jakob Nielsen’s 10 Usability Heuristics**. Each identified usability violation was graded based on a standardized severity rating scale (Cosmetic, Minor, Major, Catastrophic).

---

## 2. Severity Rating Definition
* **0 (Cosmetic)**: Usability issue that does not affect operations, e.g., alignment shifts.
* **1 (Minor)**: Low priority issue that causes slight delay or cognitive load.
* **2 (Major)**: High priority issue that disrupts user flows or makes navigation difficult.
* **3 (Catastrophic)**: Critical issue that blocks task completion (e.g., app crash, broken checkouts).

---

## 3. Heuristic Evaluation Findings & Revisions

Below is the list of identified violations and the actions taken by the team to resolve them:

### Violation 1: Missing Loading Indicators during 3D Scene Initialization
* **Heuristic violated**: #1 Visibility of System Status.
* **Problem**: The WebGL scene loads complex GLTF model meshes. On slower networks, the viewport remained completely blank for several seconds, leaving users unsure if the application was broken or loading.
* **Severity**: Major (2).
* **Brainstormed Solution**: Implement a global route transition layer and a fallback placeholder for the WebGL canvas.
* **Revision Action**: Created `src/components/ui/GlobalLoadingLayer.tsx` and integrated it with `src/contexts/LoadingProvider.tsx`. Added static fallback image cards (`/productIImg/image.png`) as a React `Suspense` layer so a placeholder appears immediately while the WebGL textures compile.

### Violation 2: Scroll Hijacking on Mobile Devices inside 3D Viewport
* **Heuristic violated**: #3 User Control and Freedom.
* **Problem**: When browsing on mobile, swipe gestures inside the 3D product customizer triggered OrbitControls camera shifts instead of scrolling the page, trapping the user inside the canvas area.
* **Severity**: Major (2).
* **Brainstormed Solution**: Restrict mouse and swipe event capturing when the user is simply trying to scroll down the page.
* **Revision Action**: Updated `src/components/3d/CardHolderScene.tsx`. Disabled vertical orbital scrolling bounds and limited touch gestures to require a double-tap to activate the orbital inspect mode, allowing the normal touch drag gesture to pass through to document scrolling.

### Violation 3: Absence of Cart Count Badge in the Navbar
* **Heuristic violated**: #6 Recognition Rather Than Recall.
* **Problem**: When users clicked "Add to Cart", the item was added, but the Navbar cart icon remained unchanged. Users had to navigate to the Cart page to verify if their click was successful.
* **Severity**: Minor (1).
* **Brainstormed Solution**: Update the Navbar cart icon to dynamically pull quantity statistics from CartContext.
* **Revision Action**: Updated `src/components/layout/Navbar.tsx` to read `itemCount` from `src/contexts/CartProvider.tsx`. Now, a warm sand-colored badge updates instantly on the Navbar to show the quantity (e.g., "Cart (2)").

### Violation 4: Inconsistent Color Swatch Representation
* **Heuristic violated**: #4 Consistency and Standards.
* **Problem**: In several views, the color options on the detail page did not match the actual CSS brand color tokens, resulting in layout flashes or mismatching colors during customisation.
* **Severity**: Minor (1).
* **Brainstormed Solution**: Consolidate all brand color tokens in a unified global configuration.
* **Revision Action**: Configured standard color CSS variables under `src/app/globals.css`, defining `--color-brand-primary` and setting the global brand-dark token to `#231711` across all components (Footer, Shop, Hero).

---

## 4. Evaluation Summary
Through this heuristic evaluation, the team was able to:
1. Eradicate major WebGL-related friction points before public user testing.
2. Introduce explicit state-recognition helpers (like badges and fallback cards).
3. Ensure a unified brand tone by locking down the color variables to `#231711`.

*The revised prototype is fully functional and ready for public user evaluations at [http://localhost:3000](http://localhost:3000).*
