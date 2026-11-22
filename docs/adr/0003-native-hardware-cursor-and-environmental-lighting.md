# Native Hardware Cursor & Environmental Pointer Lighting

## Context & Decision
Simulated custom dot and ring cursors violate operating system acceleration curves, drop frame rates below native display refresh rates, and introduce visual friction for desktop users. We decided to completely eliminate the custom DOM cursor elements and standardize on the **Linear / Stripe / Vercel** interaction paradigm:
1. Preserve the native hardware-rendered OS cursor (0.0ms latency, native input affordances).
2. Use **Environmental Pointer Lighting** via the CAD Blueprint Grid canvas and magnetic button physics to communicate spatial presence and tactile feedback.

## Considered Options
- Simulated Dot / Ring DOM Cursor: Rejected due to input lag, muscle-memory friction, and amateur aesthetic.
- CAD Reticle Crosshair: Visually interesting but distracts from content scanning.
- Native Hardware Cursor with Environmental Lighting (Chosen): Universally recognized as the highest-tier engineering standard for software portfolios.
