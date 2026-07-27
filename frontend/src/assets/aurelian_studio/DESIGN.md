---
name: Aurelian Studio
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#d5c4ab'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#9e8f78'
  outline-variant: '#514532'
  surface-tint: '#ffba20'
  primary: '#ffdca1'
  on-primary: '#412d00'
  primary-container: '#ffb800'
  on-primary-container: '#6b4c00'
  inverse-primary: '#7c5800'
  secondary: '#e6c364'
  on-secondary: '#3d2e00'
  secondary-container: '#785d00'
  on-secondary-container: '#fdd977'
  tertiary: '#abebff'
  on-tertiary: '#003641'
  tertiary-container: '#00d7fe'
  on-tertiary-container: '#005a6b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea8'
  primary-fixed-dim: '#ffba20'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5e4200'
  secondary-fixed: '#ffe08f'
  secondary-fixed-dim: '#e6c364'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#584400'
  tertiary-fixed: '#b0ecff'
  tertiary-fixed-dim: '#17d8ff'
  on-tertiary-fixed: '#001f27'
  on-tertiary-fixed-variant: '#004e5d'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
  surface-elevated: '#141416'
  border-glass: rgba(255, 255, 255, 0.08)
  accent-glow: rgba(255, 184, 0, 0.15)
  terminal-green: '#00E5A0'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0rem
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style
The design system is engineered for a premium developer portfolio that balances technical precision with high-end studio aesthetics. The brand personality is authoritative yet approachable, aiming to evoke a sense of "craftsmanship in code." 

The design style follows a **Refined Soft-Depth** approach. It leverages dark-mode minimalism as a foundation, enhanced by glassmorphic layers and sophisticated light-play. Visual interest is generated through subtle gradients and "glow" states rather than heavy ornamentation, ensuring the developer's work remains the focal point.

## Colors
The palette is anchored by a deep, near-black slate (#0A0A0B) to provide a high-contrast backdrop for the sophisticated amber/gold (#FFB800) primary accent. 

- **Primary Action:** Use #FFB800 for call-to-actions, active navigation states, and critical highlights.
- **Secondary/Nuance:** #C9A84C serves as a muted alternative for secondary details or border tints to maintain the "premium metal" feel.
- **Glassmorphism:** Surfaces use a semi-transparent base (rgba(20, 20, 22, 0.7)) combined with an ultra-thin, low-opacity white border to define edges against the dark background.
- **Functional Accents:** The terminal-green (#00E5A0) is reserved strictly for status indicators (e.g., "Available for Work") or code-syntax highlights.

## Typography
The typographic system utilizes **Geist** for headlines to convey a modern, technical edge with its distinct geometric character. **Inter** is used for body copy to ensure maximum legibility at varying sizes, utilizing a slightly increased line-height (1.6x) for a "breathable" reading experience.

**JetBrains Mono** is employed for labels, tags, and small metadata to reinforce the developer-centric nature of the portfolio. High-contrast weights (Black/ExtraBold for headings vs. Regular for body) are used to create a clear information hierarchy.

## Layout & Spacing
This design system uses a **Fluid Grid** with a strict 4px base unit. Layouts should prioritize intentional whitespace, using a `section-gap` of 120px to separate major portfolio segments (e.g., Projects, About, Contact).

On desktop, content is constrained to a 1200px central container. For mobile, margins are reduced to 20px, and grid columns reflow from a 12-column structure to a single-column stack. Card layouts within the grid should use consistent internal padding (32px) to maintain the premium, "un-crowded" feel.

## Elevation & Depth
Hierarchy is established through **Tonal Layers** and **Glassmorphism**. 

1. **Base Layer:** The deepest slate (#0A0A0B).
2. **Surface Layer (Cards):** A subtle tint (#141416) with a 1px border of `border-glass`.
3. **Hover State:** When interacting with cards, apply a 20px backdrop blur and a soft radial gradient glow using `accent-glow` in the top-left corner.
4. **Shadows:** Use large, ultra-diffused shadows (e.g., `0 20px 40px rgba(0,0,0,0.4)`) to create a sense of floating weightlessness rather than sharp physical depth.

## Shapes
The shape language is consistently **Rounded** (8px/0.5rem base) to soften the technical nature of the content. Large components like project cards or hero sections should utilize `rounded-xl` (24px/1.5rem) to emphasize the soft-depth aesthetic. Buttons maintain a standard `rounded-lg` (16px/1rem) for a modern, tactile feel.

## Components
- **Buttons:** Primary buttons use a solid #FFB800 fill with black text for maximum contrast. Secondary buttons are "Ghost" style: transparent background, 1px amber border, and amber text.
- **Cards:** Project cards must feature `backdrop-filter: blur(12px)` and a very subtle inner gradient from top-left to bottom-right.
- **Chips/Tags:** Use **JetBrains Mono** text. Tags should have a dark grey background (#1A1A1C) with a low-opacity amber border.
- **Input Fields:** Minimalist design with only a bottom border in the default state, transitioning to a full 1px amber border on focus with a slight outer glow.
- **Lists:** Use custom bullet points (amber squares) or relevant brand icons (e.g., Python logo) instead of standard circles.
- **Icons:** Only use official brand logos for tech stacks. For general actions, use 2pt stroke-weight line icons to match the Geist typography's precision.