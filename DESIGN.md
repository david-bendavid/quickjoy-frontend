# DESIGN.md - QuickJoy Design System Specification

This document specifies the design tokens, visual identity rules, and component styles for QuickJoy, an application designed to suggest quick, screen-free activities for parents and children. This specification bridges the design phase and frontend development.

🎨 1. Color Palette (Design Tokens)
We utilize a minimal, high-contrast, and warm color palette designed to feel welcoming, playful, and low-pressure for busy parents.

| Token | Hex Code | Visual Representation / Usage |
| :--- | :--- | :--- |
| color-primary | #FF7A45 | Warm Sunset Orange. Used for primary action buttons (CTA), main links, and interactive highlights. |
| color-secondary | #FFEC3D | Pastel Sunny Yellow. Used for secondary tags, special card backgrounds, and playful accents. |
| color-accent | #69C0FF | Friendly Sky Blue. Used for active states, checkboxes, icons, and interactive focus borders. |
| color-background | #FAFAFA | Soft Off-White. Provides a clean, spacious, and stress-free canvas for the interface. |
| color-text-main | #262626 | Deep Charcoal. Used for all primary headings and body text to guarantee maximum readability. |
| color-success | #52C41A | Vibrant Green. Used for confirmation states, completed checkmarks, and completion buttons. |
| color-error | #FF4D4F | Soft Coral Red. Used for error messages, alerts, and empty/sad-path states. |

📐 2. Spacing & Geometry Scale
Consistency in alignment and spacing creates an intuitive, professional, and trustworthy user experience.

- **Base Unit:** 8px
- **Spacing Scale:** All padding, margins, and gaps must follow strict multiples of the base unit:
  - 4px: Tight elements, micro-spacing
  - 8px: Small padding, label-to-input gaps
  - 16px: Standard padding inside cards, buttons, and layouts
  - 24px: Standard margins between adjacent sections
  - 32px: Large spacing for hero sections and container layout blocks
  - 48px / 64px: Section dividers and major viewport spacing
- **Geometry (Border Radius):**
  - 16px (rounded-lg / rounded-2xl): Applied to all Cards, Modals, and Main Buttons to establish a soft, friendly, and child-safe aesthetic.
  - 8px (rounded-md): Applied to smaller input fields and inner elements.

🔤 3. Typography Hierarchy
To maintain visual clarity, clean alignment, and reduce cognitive load, QuickJoy uses a single versatile font family for all typographic roles.

- **Font Family:** Rubik, sans-serif (A highly legible, modern geometric sans-serif that supports both Hebrew and English perfectly with smooth, rounded curves).
- **Font Styles & Scale:**
  - **Heading (H1/H2):** Size: 32px | Weight: Bold (700) | Usage: Screen titles, primary call-to-actions, and main questions (e.g., "?מה יש לכם בבית עכשיו").
  - **Body Text:** Size: 16px | Weight: Regular (400) | Usage: Step-by-step instructions, descriptions, form field labels, and secondary reading material.
  - **Caption & Small Labels:** Size: 14px | Weight: Medium (500) | Usage: Time badges, messiness level indicators, button texts, and helper instructions.

🧱 4. Component Visual Patterns

🔘 Buttons
- **Primary Action Button (CTA):** Filled with color-primary (#FF7A45), text in bold white, with full 16px border-radius. On hover, shifts slightly darker.
- **Secondary Button:** Transparent background with a thin 1px border of color-text-main or color-primary.
- **Success Button:** Filled with color-success (#52C41A), white text, used for completion milestones ("!סיימנו, היה כיף").

🗂️ Cards & Container Blocks
- White background (#FFFFFF) sitting over the soft off-white canvas (#FAFAFA). Outlined with smooth 16px rounded corners.
- **Elevation:** Styled with an extremely soft, blurred ambient shadow (`box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.03);`) to provide semantic depth without creating clutter.

📝 Form Fields & Inputs
- Background is pure white with a thin gray border (#D9D9D9).
- **Focus State:** When an input or checkbox is active, the border transitions smoothly to color-accent (#69C0FF) with a soft glow effect.

🔍 System Iconography
- **Icon Set:** Lucide Icons (Rounded/Soft variant). Mix-and-match icon families are strictly prohibited to preserve uniform stroke weights and clean alignment across screens.