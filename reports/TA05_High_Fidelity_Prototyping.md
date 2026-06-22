# Team Project Assignment #5 : High Fidelity Prototyping

**Project Title**: SatSet — Office Utility, Refined  
**Team**: SatSet  
**Date**: November 2025  

---

## 1. Prototype Link & Access
The high-fidelity computer prototype is fully built using a modern React frontend stack.
* **Local Access Link**: [http://localhost:3000](http://localhost:3000)
* **Production Demo Link**: [https://satset-hci.vercel.app](https://satset-hci.vercel.app) (Hosted on Vercel for grading accessibility)

---

## 2. Startup Instructions

### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v18.x or later)
- **NPM** (v9.x or later) or **Yarn**

### Installation & Execution Steps
Follow these terminal commands to run the prototype on Windows:

```bash
# 1. Clone or extract the project files to your directory
# 2. Open command prompt/PowerShell in the project folder
# 3. Install required node modules
npm install

# 4. Create an environment variables file
# Copy .env.example into .env.local
copy .env.example .env.local

# 5. Edit .env.local to configure your WhatsApp target number
# Example: NEXT_PUBLIC_WHATSAPP=6281234567890

# 6. Run the local Next.js development server
npm run dev
```

*Once the terminal indicates the server is ready, open your browser and navigate to `http://localhost:3000`.*

---

## 3. Prototype Scope & Fidelity Analysis

### High Fidelity in Look
* **Visual Styling**: Built using high-contrast, editorial typography combining serif header weights with clean sans-serif bodies (Inter).
* **Color System**: Tailored around primary brand dark `#231711` with soft sand and stone backgrounds, creating a calm, high-end atmosphere.
* **Reactive Background**: Animated instanced mesh three.js particle grid acting as a digital background on pages.
* **Editorial Pacing**: Screen transitions are delayed to show a custom loading screen, giving the user a paced, intentional experience.

### Medium Fidelity in Feel
* **3D Interaction**: Integrated `@react-three/fiber` canvas loading the GLB model `/satset3d/glb/bener-final-optimized.glb` representing the *CardHolder Pro*. Users can orbit and zoom using their mouse.
* **Color Selection**: Clicking swatches instantly propagates colors into the WebGL model material, displaying realistic color responses.
* **Animations**: GSAP with ScrollTrigger triggers entrance slides, counting statistics, and scroll transitions.

### Medium Fidelity in Breadth
The prototype implements all core pages:
1. **Landing page (`/`)**: Hero section with 3D model, core product stats, material swatches showcase, client feedback testimonials, and footer navigation.
2. **Products list page (`/products`)**: Complete catalog of accessories (CardHolder Pro, Wallet Elite, Desk Organizer, Lamp Arc).
3. **Product details page (`/products/[slug]`)**: 3D interactive viewer, spec details, verified reviews list, and add-to-cart mechanisms.
4. **Shopping Cart page (`/cart`)**: Checkout list item manager, subtotal accumulator.
5. **Checkout summary page (`/checkout`)**: WhatsApp redirection link compiler.
6. **Blog listings & Posts pages (`/blog` & `/blog/[slug]`)**: Explanations of core material decisions.
7. **Contact page (`/about`)**: Feedback forms and company insights.

### Low Fidelity in Depth
* **Backend**: Front-end only. All cart structures, recently viewed products list, and active sessions are stored directly in the browser's `localStorage`.
* **WhatsApp Handoff**: No database updates or payment API gateways are needed. Clicking the confirm order redirects the user to WhatsApp with order details, fulfilling the "low-fidelity depth" instruction.
