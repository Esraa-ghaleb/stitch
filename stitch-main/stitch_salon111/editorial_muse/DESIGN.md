---
name: Editorial Muse
colors:
  surface: '#f9f9f7'
  surface-dim: '#dadad8'
  surface-bright: '#f9f9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f2'
  surface-container: '#eeeeec'
  surface-container-high: '#e8e8e6'
  surface-container-highest: '#e2e3e1'
  on-surface: '#1a1c1b'
  on-surface-variant: '#4d453e'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#7f756d'
  outline-variant: '#d0c4bb'
  surface-tint: '#6b5c4c'
  primary: '#6b5c4c'
  on-primary: '#ffffff'
  primary-container: '#d9c5b2'
  on-primary-container: '#605142'
  inverse-primary: '#d7c3b0'
  secondary: '#645d53'
  on-secondary: '#ffffff'
  secondary-container: '#e8ded1'
  on-secondary-container: '#686257'
  tertiary: '#675c58'
  on-tertiary: '#ffffff'
  tertiary-container: '#d4c6c0'
  on-tertiary-container: '#5c524e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f4dfcb'
  primary-fixed-dim: '#d7c3b0'
  on-primary-fixed: '#241a0e'
  on-primary-fixed-variant: '#524436'
  secondary-fixed: '#ebe1d4'
  secondary-fixed-dim: '#cfc5b9'
  on-secondary-fixed: '#1f1b13'
  on-secondary-fixed-variant: '#4c463c'
  tertiary-fixed: '#eedfda'
  tertiary-fixed-dim: '#d2c4be'
  on-tertiary-fixed: '#211a17'
  on-tertiary-fixed-variant: '#4e4541'
  background: '#f9f9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e1'
typography:
  display-xl:
    fontFamily: Bodoni Moda
    fontSize: 120px
    fontWeight: '600'
    lineHeight: 110px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 64px
    fontWeight: '500'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  section-gap: 160px
  container-padding: 40px
  stack-gap: 24px
  grid-gutter: 24px
---

## Brand & Style

This design system embodies the essence of a high-end fashion magazine, translated into a digital experience. It is rooted in **Premium Minimalism** and **Editorial Luxury**, prioritizing negative space to allow visual content and typography to breathe. The brand personality is feminine, sophisticated, and modern, targeting a clientele that values understated elegance and curated aesthetics.

The visual language utilizes a "less but better" approach. It features high-contrast typography, a muted and warm neutral palette, and subtle glassmorphism to create a sense of depth and ethereal lightness. Transitions should be fluid and intentional, evoking the feeling of turning the pages of a luxury print publication.

## Colors

The palette is a sophisticated blend of warm, skin-toned neutrals and metallic-inspired accents. 

- **Background (#FAFAF8):** An off-white, gallery-like canvas that prevents the clinical feel of pure white.
- **Primary (Warm Beige):** Used for key structural elements and subtle highlights.
- **Secondary (Champagne) & Tertiary (Soft Cream):** Utilized for depth in glassmorphism effects and layered containers.
- **Rose Gold:** Reserved for delicate accents, such as active states, thin dividers, or iconography.
- **Typography:** Absolute black (#000000) provides the necessary editorial "punch" for headlines, while Gray 500 (#717171) softens secondary information.

## Typography

The typographic strategy relies on a sharp contrast between a high-fashion serif and a clean, technical sans-serif.

- **Headlines:** Uses **Bodoni Moda**. This serif brings editorial authority and luxury. Large display sizes should use tight letter-spacing to mimic masthead layouts.
- **Body & Interface:** Uses **Hanken Grotesk**. This sans-serif provides a modern, functional counterpoint. It is highly legible at small sizes for service descriptions and UI labels.
- **Micro-copy:** Small labels should use uppercase styling with generous letter-spacing (tracking) to maintain an airy, premium feel.

## Layout & Spacing

This design system uses a **Magazine-style Fluid Grid** with intentional asymmetry.

- **Desktop:** A 12-column grid with exceptionally wide margins (80px+). Use "breaking the grid" techniques where images or typography overflow their containers slightly to create a dynamic, layered look.
- **Sectioning:** Large vertical gaps (160px) between sections create the "massive white space" required for the luxury aesthetic.
- **Floating Elements:** Cards and call-to-action buttons should appear to float over the background using offset positioning and soft shadows, rather than being strictly boxed in.
- **Mobile:** Transition to a 4-column grid. Maintain the generous vertical spacing but reduce horizontal margins to 24px to maximize screen real estate for imagery.

## Elevation & Depth

Depth is achieved through a combination of **Glassmorphism** and **Ambient Shadows**.

1.  **Base Layer:** The off-white background (#FAFAF8).
2.  **Glass Layers:** Pure White cards (#FFFFFF) with 60-80% opacity and a 20px backdrop-blur. These are used for overlays and floating navigation.
3.  **Soft Shadows:** Use extremely diffused shadows (Blur: 40px, Spread: -10px) with a very low opacity (5-8%) and a slight tint of the Primary color to avoid "dirty" gray shadows.
4.  **Floating Hierarchy:** Interactive cards should use a dual-shadow approach: a tight, darker shadow for definition and a wide, soft shadow for lift.

## Shapes

The shape language is organic and soft, contrasting with the sharp serifs of the typography.

- **Containers:** Standard cards and imagery containers use a 1rem (16px) radius to feel welcoming and feminine.
- **Oversized Containers:** Large hero sections or featured blocks should use a 2rem (32px) radius for a more distinctive, modern silhouette.
- **Buttons:** Use fully pill-shaped (rounded-full) corners to emphasize the modern, premium feel.
- **Images:** Photography should always feature soft rounded corners to match the UI elements.

## Components

- **Buttons:** Primary buttons are pill-shaped with a solid black fill and white Hanken Grotesk text. Secondary buttons use a glassmorphism effect with a thin Rose Gold border.
- **Cards:** Pure white with 20px backdrop blur. Borders should be 1px wide, using a low-opacity Rose Gold or Champagne tint.
- **Input Fields:** Minimalist design—only a bottom border (1px) in Rose Gold, with labels that float above the line in uppercase Hanken Grotesk.
- **Chips/Badges:** Small, pill-shaped tags with Champagne backgrounds and Black text, used for service categories or availability.
- **Navigation:** A floating glassmorphism bar at the top of the viewport. Links use Hanken Grotesk with a subtle Rose Gold underline on hover.
- **Floating Action Button (FAB):** A small, circular button in Rose Gold for "Book Now" or "Chat," following the user as they scroll through the editorial content.