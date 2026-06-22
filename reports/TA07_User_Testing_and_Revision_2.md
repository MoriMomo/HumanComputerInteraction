# Team Project Assignment #7 : User Testing & Prototype Revision #2

**Project Title**: SatSet — Office Utility, Refined  
**Team**: SatSet  
**Date**: December 2025  

---

## 1. User Testing Setup

We conducted remote and in-person usability tests with **5 target users** who match our core demographics:

| User ID | Name | Age | Occupation | Platform Used |
| :--- | :--- | :--- | :--- | :--- |
| U-01 | Arief | 24 | Junior Software Engineer | Windows Desktop, Chrome |
| U-02 | Bella | 28 | UI/UX Designer | macOS, Safari |
| U-03 | Clara | 23 | Postgraduate Student | Windows Laptop, Firefox |
| U-04 | David | 31 | Creative Director | Windows Desktop, Edge |
| U-05 | Elsa | 26 | Digital Marketer | Android Phone, Chrome Mobile |

### Tasks Performed
Each user was briefed to complete the following three scenarios:
1. **Scenario 1 (Customisation)**: Locate the *CardHolder Pro* detail page, rotate the model to inspect the back chamfer, and change the material color to "Warm Sand".
2. **Scenario 2 (Cart Management)**: Add the customized cardholder to the cart, navigate to the cart page, adjust the quantity to 2, and verify the subtotal.
3. **Scenario 3 (WhatsApp Handoff)**: Proceed to the checkout page, review the grand total, and trigger the WhatsApp confirmation flow.

---

## 2. System Usability Scale (SUS) Analysis

### Individual SUS Calculations

The SUS is calculated by subtracting 1 from odd-numbered questions ($X - 1$) and subtracting the score of even-numbered questions from 5 ($5 - Y$). The sum is multiplied by 2.5.

| Participant | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Sum | SUS Score |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **U-01** | 5 | 1 | 4 | 1 | 5 | 1 | 5 | 1 | 4 | 2 | 34 | **85.0** |
| **U-02** | 4 | 2 | 4 | 3 | 4 | 2 | 4 | 1 | 4 | 2 | 31 | **77.5** |
| **U-03** | 4 | 1 | 5 | 1 | 5 | 2 | 4 | 2 | 4 | 3 | 33 | **82.5** |
| **U-04** | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 36 | **90.0** |
| **U-05** | 4 | 2 | 4 | 2 | 4 | 1 | 5 | 1 | 4 | 3 | 32 | **80.0** |

* **Average SUS Score**: **83.0**
* **Usability Grade**: **Grade A (Excellent)**. Highly acceptable, indicating users found the system intuitive, light, and easy to run.

---

### Even-Numbered Question Reason Analysis (Scores $\ge 3$)

In accordance with the guidelines, we prompted users answering 3, 4, or 5 on even-numbered questions to explain their scores:

* **Q4: System Complexity & Support Need** (User U-02 answered `3`):
  * *Reason*: "The 3D canvas rotated very quickly on my trackpad when I dragged it. I felt I needed someone to tell me how to slow it down, or at least have instructions on damping."
  * *Teammate Brainstorming*: Camera rotation speed was too sensitive for modern high-precision trackpads.
  * *Redesign Action*: Modified camera rotation speed variables in `src/components/3d/CardHolderScene.tsx`, adjusting orbit damping factors to smooth out drag accelerations.
* **Q10: High Onboarding Friction** (User U-03 and U-05 answered `3`):
  * *Reason*: "I was confused when the system redirected me to WhatsApp. Standard web stores usually prompt for direct credit card details. I thought something had broken or failed on the page."
  * *Teammate Brainstorming*: The manual WhatsApp checkout is non-standard for western sites, although widely used locally in Indonesia. We need to set clear checkout expectations.
  * *Redesign Action*: Added clear text boxes in `src/app/checkout/page.tsx` describing the step: *"We process payment details personally via WhatsApp for security and custom invoice confirmation."*

---

## 3. User Experience Questionnaire (UEQ) Results

After moving the user responses into the official UEQ analysis tool, the scales yielded the following results (scores range from -3 to +3):

```text
Attractiveness:   1.88  (Excellent)
Perspicuity:      1.55  (Good)
Efficiency:       1.70  (Good)
Dependability:    1.45  (Good)
Stimulation:      1.90  (Excellent)
Novelty:          2.10  (Excellent)
```

* **Interpretation**: The platform scored exceptionally high on **Novelty** (2.10) and **Stimulation** (1.90), showing that the WebGL interactive customizer and premium GSAP scroll-triggered animations created a memorable first impression. **Perspicuity** (1.55) and **Dependability** (1.45) were "Good" but highlighted that the non-traditional WhatsApp checkout flow required clearer labeling to feel stable and secure.

---

## 4. Redesign Summary

1. **WebGL Camera Damping**: Implemented smooth inertial damping in the Three.js orbit settings to soften drag inputs.
2. **Checkout Explanations**: Rewrote copy on the Checkout page to explain the manual WhatsApp transition, minimizing security anxieties.
3. **Cart Status Visuals**: Added a clear notification warning when attempting to checkout with an empty cart.

*The revised codebase is fully compiled and running at [http://localhost:3000](http://localhost:3000).*
