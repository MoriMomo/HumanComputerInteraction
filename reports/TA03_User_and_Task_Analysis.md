# Team Project Assignment #3 : User & Task Analysis

**Project Title**: SatSet — Office Utility, Refined  
**Team**: SatSet  
**Date**: October 2025  

---

## 1. Problem Statement (Restated)
Modern professionals carry a variety of personal cards, IDs, and essentials through highly transient environments (offices, cafes, transport). Standard carry accessories are often bulky, lack RFID security, and do not offer customized styling options. When buying online, customers face high uncertainty because they cannot inspect physical textures, tolerances, or real-life color behaviors. SatSet overcomes this by delivering premium minimalist carry items (such as the *CardHolder Pro*) supported by an interactive WebGL customizer and a streamlined, personal checkout experience.

---

## 2. User Classes & Stakeholders

We have identified two primary user classes (who interact directly with the client-side system) and two key stakeholders (who support the system's operational and business goals):

### Primary User Class 1: The Tech-Savvy Minimalist Desk Worker
* **Demographics**: Age 22–40, designers, software engineers, creatives, and knowledge workers.
* **Psychographics**: Values clean desk aesthetics, workspace styling, premium materials (anodised aluminium, tactile finishes), and seamless digital experiences.
* **System Usage**: Browses the 3D customization canvas to match products with their keyboard or desk themes; reads design blog articles; values fluid desktop web navigation.

### Primary User Class 2: The Active Urban Commuter
* **Demographics**: Age 20–35, commuters, hybrid office workers, frequent travelers.
* **Psychographics**: Prioritizes safety (RFID shielding), lightweight gear, speed, and immediate accessibility.
* **System Usage**: Accesses the site primarily via mobile; requires rapid load times, quick "Add to Cart" interactions, and low-friction mobile checkout.

### Stakeholder 1: Customer Service Representative
* **Role**: The human point of contact on the other side of the WhatsApp checkout handoff.
* **Needs**: Clear, structured order templates from the website, direct payment validation processes, and quick conversion of customer chats into closed sales.

### Stakeholder 2: Shop Administrator
* **Role**: Oversees the catalog, blog articles, and platform updates.
* **Needs**: High-level interface stability, ability to update static product definitions, and access to performance diagnostics.

---

## 3. Task Analysis

Every task below contains a specific goal, trigger, and success criteria:

### User Class 1: Tech-Savvy Minimalist Desk Worker
1. **Task: Explore Product in 3D Space**
   * *Goal*: Inspect product geometry, chamfers, and card slots.
   * *Trigger*: User hovers over the 3D canvas and drags their mouse.
   * *Steps*: Click on canvas, drag to rotate, use scroll wheel to zoom.
   * *Success Criteria*: User views the cardholder from a $360^{\circ}$ angle.
2. **Task: Match Swatch to Workspace Theme**
   * *Goal*: View the physical cardholder in a specific color (e.g., brand dark `#231711` or warm sand).
   * *Trigger*: User clicks color swatches on the detail page.
   * *Steps*: Review available swatches, select color, observe WebGL texture update.
   * *Success Criteria*: The 3D model's diffuse color changes instantly to the selected option.
3. **Task: Compare Product Specs**
   * *Goal*: Verify weight and card capacity to ensure it fits a minimalist setup.
   * *Trigger*: User scrolls down to the product specs grid.
   * *Steps*: Read specifications table, verify "18g weight" and "8-card capacity".
   * *Success Criteria*: User decides if the product meets their capacity constraints.
4. **Task: Read Material Quality Details**
   * *Goal*: Understand the micro-blasting anodisation process.
   * *Trigger*: User navigates to the blog post "Refining the Surface".
   * *Steps*: Go to blog page, click on article, read structural details of 6061-T6 aluminium.
   * *Success Criteria*: User gains confidence in the physical durability of the product.
5. **Task: Toggle Pricing Currency**
   * *Goal*: View the product cost in local and international denominations.
   * *Trigger*: User clicks the currency selector in the navigation bar.
   * *Steps*: Open currency dropdown, select USD or IDR.
   * *Success Criteria*: Prices across all products and cart updates instantly.

### User Class 2: Active Urban Commuter
1. **Task: Add Customized Product to Cart**
   * *Goal*: Save a configured *CardHolder Pro* for purchase.
   * *Trigger*: User clicks "Add to Cart".
   * *Steps*: Verify selected color, click button, confirm toast feedback.
   * *Success Criteria*: The shopping cart count updates and item is saved to local storage.
2. **Task: Review Cart Items**
   * *Goal*: Check quantity and configurations before checkout.
   * *Trigger*: User clicks the Cart icon in the Navbar.
   * *Steps*: View items list, adjust quantities, verify subtotal.
   * *Success Criteria*: The cart page displays accurate names, colors, and prices.
3. **Task: Confirm WhatsApp Checkout Handoff**
   * *Goal*: Convert cart items into a direct messaging thread.
   * *Trigger*: User clicks "Confirm order via WhatsApp" on checkout.
   * *Steps*: Review total price, click button, allow redirection to WhatsApp.
   * *Success Criteria*: WhatsApp application opens with a pre-written order summary message.
4. **Task: Consult Support on Wear & Tear**
   * *Goal*: Ask if the cardholder will scratch keys in a pocket.
   * *Trigger*: User clicks "Chat Customer Service" or WhatsApp contact on the About page.
   * *Steps*: Navigate to contact section, click link, send query.
   * *Success Criteria*: Direct chat established with support for pre-purchase assurance.
5. **Task: Re-browse Recently Visited Products**
   * *Goal*: Locate a previously viewed accessory without using search.
   * *Trigger*: User scrolls to the bottom of a product page.
   * *Steps*: View "Recently Viewed" horizontal list, click product thumbnail.
   * *Success Criteria*: Details page of the previous product loads instantly.

### Stakeholder 1: Customer Service Representative
1. **Task: Receive and Parse Order Message**
   * *Goal*: Validate order details sent by customer.
   * *Trigger*: Customer sends the pre-formatted website order template via WhatsApp.
   * *Success Criteria*: Order quantity, color configurations, and price match current rates.
2. **Task: Calculate Shipping Cost**
   * *Goal*: Determine delivery fees based on customer address.
   * *Success Criteria*: Provide a shipping invoice within 3 minutes of reception.
3. **Task: Send Payment Instructions**
   * *Goal*: Share bank transfer or local e-wallet details.
   * *Success Criteria*: Customer receives correct account numbers.
4. **Task: Validate Payment Proof**
   * *Goal*: Confirm funds have cleared.
   * *Success Criteria*: Verify payment receipt screenshot matches bank records.
5. **Task: Forward Order to Logistics**
   * *Goal*: Generate shipping labels.
   * *Success Criteria*: Packager receives shipping list.

### Stakeholder 2: Shop Administrator
1. **Task: Update Product Catalog Details**
   * *Goal*: Edit pricing or details in database or source file.
   * *Success Criteria*: Changes reflect instantly across product detail pages.
2. **Task: Upload New 3D GLB Model Asset**
   * *Goal*: Replace product meshes.
   * *Success Criteria*: Model displays without rendering errors in WebGL canvas.
3. **Task: Publish Design Blog Post**
   * *Goal*: Educate users on manufacturing processes.
   * *Success Criteria*: Article renders under `/blog/[slug]`.
4. **Task: Review Analytics for Exit Rate**
   * *Goal*: Track checkout page exit metrics.
   * *Success Criteria*: Analytics events capture Cart exits.
5. **Task: Inspect System Server Status**
   * *Goal*: Verify database connections.
   * *Success Criteria*: Server health reports zero down-time.

---

## 4. Use Case Analysis

### Use Case Diagram (Mermaid)

```mermaid
usecaseDiagram
    actor Minimalist as "Minimalist Desk Worker (User)"
    actor Commuter as "Active Commuter (User)"
    actor CS as "Customer Service Rep"
    
    package "SatSet Digital Platform" {
        usecase UC01 as "UC-01: Customize 3D Product"
        usecase UC02 as "UC-02: Manage Shopping Cart"
        usecase UC03 as "UC-03: Checkout via WhatsApp"
        usecase UC04 as "UC-04: View Design Blog"
        usecase UC05 as "UC-05: Process Payment & Delivery"
    }

    Minimalist --> UC01
    Minimalist --> UC02
    Minimalist --> UC04
    
    Commuter --> UC01
    Commuter --> UC02
    Commuter --> UC03
    
    UC03 .> CS : "Handoff to"
    CS --> UC05
```

---

## 5. Use Case Descriptions

### UC-01: Customize 3D Product
* **Primary Actor**: Minimalist Desk Worker / Active Commuter
* **Preconditions**: User has navigated to a specific product detail page containing the interactive 3D WebGL block.
* **Trigger**: User clicks color swatches or drags on the WebGL scene canvas.
* **Basic Flow**:
  1. The page loads and displays the default 3D product mesh (anodised dark aluminium).
  2. The user rotates the model by dragging on the canvas.
  3. The user zooms into details using the scroll wheel.
  4. The user clicks a different color swatch (e.g., "Warm Sand").
  5. The system processes the request, updates the material configuration, and renders the model with the new color representation.
* **Alternate Flow (A1: WebGL Fails/Disabled)**:
  1. The system detects WebGL is not supported.
  2. The system renders a 2D high-resolution studio photograph corresponding to the default color.
  3. Clicking swatches swaps the source of the 2D image.
* **Postconditions**: The product state is updated; the selected color configuration is stored in the React application state, ready to be added to the cart.

---

### UC-02: Manage Shopping Cart
* **Primary Actor**: Minimalist Desk Worker / Active Commuter
* **Preconditions**: User has configured a product and clicked "Add to Cart".
* **Trigger**: User opens the Cart drawer/page.
* **Basic Flow**:
  1. User navigates to the Cart page (`/cart`).
  2. The system loads items from client-side local storage and lists details (name, color variant, unit price, quantity).
  3. User modifies item quantities or clicks the delete icon.
  4. The system recalculates subtotals and updates the cart badge in the Navbar.
* **Alternate Flow (A2: Cart is Empty)**:
  1. The system displays an "Empty Cart" message.
  2. The system hides checkout buttons and displays a "Continue Shopping" link.
* **Postconditions**: Cart contents are stored locally in the browser’s `localStorage`.

---

### UC-03: Checkout via WhatsApp
* **Primary Actor**: Active Commuter / Minimalist Desk Worker
* **Preconditions**: Cart is populated with at least one item, and user is on the Checkout page.
* **Trigger**: User clicks the "Confirm order via WhatsApp" button.
* **Basic Flow**:
  1. The system extracts items, quantities, and selected variants from the cart.
  2. The system formats this data into a structured textual message template (e.g., "Hi SatSet, I want to place an order...").
  3. The system generates a WhatsApp URL (`https://wa.me/...`) with the pre-filled message text.
  4. The system opens the generated link in a new browser tab.
  5. The customer's device starts their WhatsApp application, focusing on the SatSet Business chat with the pre-filled message.
  6. The user clicks "Send" inside WhatsApp.
* **Alternate Flow (A3: No WhatsApp Number Set)**:
  1. If the system's environment variable for the target WhatsApp number is missing, the button is disabled or displays a descriptive fallback message.
* **Postconditions**: The browser clears the cart state locally, and the transaction is successfully handed off to the Customer Service Representative.
