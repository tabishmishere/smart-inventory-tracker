# Design System Strategy: The Intelligent Guardian
 
## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Curator."** 
 
Most inventory systems feel like cluttered warehouses; this system must feel like a high-end gallery. We are moving away from the "grid of boxes" to a philosophy of **Tonal Fluidity.** The interface should feel like a single, cohesive dark-slate canvas where information emerges through depth and light rather than rigid containment. By utilizing intentional asymmetry—placing high-density data metrics against expansive, "quiet" negative space—we create a sense of professional calm. The goal is to make the act of tracking expiry feel less like a chore and more like a curated oversight experience.
 
---
 
## 2. Colors & Surface Philosophy
The palette is built on a "Deep Sea" foundation, using the interplay of `primary` (#adc6ff) and `secondary` (#4cd7f6) to highlight critical actions against a slate-dark background.
 
### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders for sectioning. Structural boundaries must be achieved through **Background Shift.** 
*   Example: A `surface_container_low` dashboard section should sit directly on a `surface` background. The change in hex value is the border.
 
### Surface Hierarchy & Nesting
Depth is created by "stacking" tones. Treat the UI as physical layers:
*   **Base Layer:** `surface` (#0b1326) – The infinite canvas.
*   **Secondary Layer:** `surface_container` (#171f33) – For main content areas.
*   **Elevated Layer:** `surface_container_highest` (#2d3449) – For active cards or modals.
 
### The "Glass & Gradient" Rule
To escape the "flat SaaS" look, floating elements (like the 'Add Item' drawer) should utilize **Glassmorphism**.
*   **Token:** `surface_container_low` at 70% opacity + `backdrop-blur: 24px`.
*   **Gradients:** Use a subtle linear transition from `primary` (#adc6ff) to `primary_container` (#4d8eff) at a 135° angle for hero CTAs. This provides a "glow" that flat colors lack.
 
---
 
## 3. Typography: The Editorial Voice
We use **Inter** not as a utility font, but as a brand voice. The hierarchy is designed to be "Action-Oriented."
 
*   **The Display Scale:** Use `display-lg` (3.5rem) for critical inventory numbers (e.g., "12 Items Expiring Today"). This creates an authoritative focal point.
*   **The Headline Scale:** `headline-sm` (1.5rem) should be used for section titles to maintain a clean, magazine-like header style.
*   **The Contrast Rule:** Pair `title-lg` labels in `on_surface` (high contrast) with `body-sm` metadata in `on_surface_variant` (muted) to create an immediate visual path for the eye.
 
---
 
## 4. Elevation & Depth
In this system, light is the architect. We do not use shadows to make things "pop"; we use them to simulate an ambient environment.
 
*   **The Layering Principle:** Instead of a shadow, place a `surface_container_lowest` (#06e020) card inside a `surface_container_high` (#222a3d) area. The "sunken" look provides focus without visual noise.
*   **Ambient Shadows:** For high-level modals, use a shadow with a 40px blur, 0px offset, and 6% opacity of the `surface_tint` (#adc6ff). This "blue-tinted" shadow feels more natural in a dark slate environment than a black shadow.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke, use `outline_variant` (#424754) at **15% opacity**. It should be a suggestion of a line, not a hard barrier.
 
---
 
## 5. Components
All components inherit a **2xl roundedness scale** (`lg`: 2rem or `md`: 1.5rem) to maintain a soft, premium feel.
 
### Buttons
*   **Primary:** `primary` background with `on_primary` text. No border. 2rem corner radius.
*   **Secondary (Action-Oriented):** `surface_container_high` background with a `primary` ghost-border (15% opacity).
*   **Tertiary:** Pure text using `secondary` (#4cd7f6) with no background, used for "Dismiss" or "View All."
 
### Smart Cards & Lists
*   **The Rule of Zero Dividers:** Never use a horizontal line to separate inventory items. Use `24px` of vertical whitespace (Spacing Scale) or alternating background subtle shifts between `surface_container` and `surface_container_low`.
*   **Inventory Status Chips:** Use `tertiary_container` for "Safe" items and `error_container` for "Expired." Chips must be pill-shaped (`full` radius) and use `label-sm` typography.
 
### Input Fields
*   **The "Underline" Aesthetic:** Avoid the 4-sided box. Use a `surface_container_highest` background with a slightly rounded bottom-only "glow" using the `primary` color when focused.
 
### Contextual Components for Inventory
*   **The Expiry Heatmap:** A custom component using a gradient bar from `secondary` (Cyan) to `error` (Red) to visualize time-left without using words.
*   **The Quick-Scan Drawer:** A glassmorphic side-panel for rapid data entry, utilizing `surface_bright` to elevate the panel above the dashboard.
 
---
 
## 6. Do’s and Don’ts
 
### Do
*   **Do** use asymmetrical margins. Give your headline more "breathing room" on the left than the right to create an editorial feel.
*   **Do** use `primary_fixed_dim` for icons to ensure they don't overpower the text.
*   **Do** prioritize "calm" data density. If a screen has too many numbers, hide secondary data in a `surface_container_lowest` tooltip.
 
### Don’t
*   **Don’t** use purple or violet. The brand is strictly Blue/Cyan/Slate.
*   **Don’t** use standard "Drop Shadows." If it looks like a default Figma shadow, it's wrong.
*   **Don’t** use hard corners. Even the smallest chip must have at least an `sm` (0.5rem) radius.
*   **Don’t** use pure white (#FFFFFF). Use `on_surface` (#dae2fd) for a softer, premium reading experience that reduces eye strain in dark mode.