# Team Project Assignment #2 : Product Requirement Document (PRD)

**Project Name**: SatSet refined office utilities  
**Team**: SatSet  
**Date**: October 2025  

---

## 1. Document Control

| Version | Date | Author | Description |
| :--- | :--- | :--- | :--- |
| v1.0 | 2025-10-12 | SatSet Team | Initial PRD draft based on requirements gathering |

---

## 2. Introduction & Objective
The objective of this project is to build an interactive web platform for **SatSet**, a premium minimalist carry and office utility brand. The platform must allow users to view, customize (colors, modes), and purchase products (starting with the *CardHolder Pro*) with low friction. The digital interface must mirror the premium, quiet, and tactile quality of the physical products.

---

## 3. Data Gathering Methodology
To establish accurate user and system requirements, the team employed two data gathering techniques:

### Technique A: Qualitative Semi-Structured Interviews
- **Participants**: 5 active professionals (designers, software engineers, and consultants aged 22-35).
- **Goal**: Understand daily carrying habits, struggles with desk organization, and expectations when buying premium objects online.
- **Key Questions**:
  1. What accessories do you carry every day, and where do they end up on your desk?
  2. What is your biggest frustration when buying lifestyle or design accessories online?
  3. How important is product customisation, and what makes you trust a new local brand?

### Technique B: Quantitative Online Surveys
- **Participants**: 30 respondents via Google Forms.
- **Goal**: Validate carrying preferences and identify acceptable price points, interest in RFID shielding, and preferred checkout channels.

---

## 4. Key Findings & Requirements Established

1. **Visual Skepticism**: 84% of respondents stated they hesitated to buy premium accessories online because "photos can be misleading regarding scale and color."
2. **Need for Simplicity**: Users disliked complex checkout forms requiring detailed registry before purchase. Direct communication (like WhatsApp) was favored by 72% for quick customer support.
3. **RFID & Safety**: 90% of commuters indicated that RFID shielding is a critical requirement for a cardholder.
4. **Desktop Aesthetics**: 78% wanted their carry gear to match their desk setup theme (such as matte black, warm grey, or sand tones).

---

## 5. Functional Requirements (MoSCoW)

### Must Have (Critical)
- **FR-01: Interactive 3D Canvas**: Real-time rendering of the cardholder using WebGL/Three.js.
- **FR-02: Orbit & Zoom Controls**: Ability to rotate the 3D model $360^{\circ}$ and zoom in to inspect details.
- **FR-03: Material & Color Swatches**: Real-time updates of the 3D model’s color when a user clicks swatches.
- **FR-04: Shopping Cart**: Client-side cart state to add, edit, and clear items.
- **FR-05: WhatsApp Order Generation**: Compiling the cart contents into a pre-filled WhatsApp message.

### Should Have (Important)
- **FR-06: Recently Viewed Products**: Displaying the user's viewing history to aid navigation.
- **FR-07: Micro-Animations**: Smooth entry transitions and interactive hovers via GSAP.
- **FR-08: Testimonials Section**: Showing reviews from verified customers on the homepage.

### Could Have (Desirable)
- **FR-09: User Authentication**: Basic login and signup for personalized profiles.
- **FR-10: Currency Switcher**: Toggling pricing between IDR, USD, and EUR.

### Won't Have (Deferred)
- **FR-11: Integrated Payment Gateway**: Native credit card/API transactions (deferred in favor of WhatsApp confirmation).
- **FR-12: Full ERP/Inventory Sync**: Backend inventory management system.

---

## 6. Non-Functional Requirements

### Performance & WebGL Optimization
- The 3D scene must load in under **2.5 seconds** on a standard 4G mobile connection.
- 3D rendering should target **60 FPS** on desktop and at least **30 FPS** on mid-range mobile devices (conserving power with a Device Pixel Ratio cap of `[1, 1.5]`).

### Usability & Accessibility
- **Responsive Layout**: Seamless experience across mobile viewports ($375\text{px}$) to wide screens ($1440\text{px}$).
- **Fallbacks**: Provide lightweight static 2D image fallbacks if WebGL is disabled or fails to load.

### Aesthetic Design System
- **Colors**: Sleek, high-contrast dark theme elements mixed with warm tones.
  - Primary Brand Dark: `#231711`
  - Accents: Warm Sand, Light Stone
- **Typography**: Inter (sans-serif) for readable interfaces, combined with a premium serif font for titles to build a crafted, high-end editorial feel.
