# UX Summary — Phase 1: Iris Bots Showcase

**Designer:** Roni
**Phase:** 1
**Date:** March 11, 2026

---

## Product

Dark-themed cinematic showcase for 4 Iris physics-learning bots. Lead generation through immersive presentation + contact form.

## Pages

1. **Home** — 4 full-viewport horizontal scroll panels, one per bot
2. **Contact** — Hybrid bot chooser (compact cards + hero preview of selected) + contact form
3. **Registered Users List** — Table of submitted leads

## Emotional Arc

Awe (landing visuals) → Curiosity (scroll) → Trust (audio) → Resolve (CTA) → Relief (confirmation)

Primary peak: **Visual "wow" on landing.**

## Key Design Decisions

| Decision | Choice |
|---|---|
| Contact page layout | Hybrid: large hero for selected bot, compact cards for others |
| Card style | Mixed: glassmorphism on Home, shadow on functional pages |
| Motion | Scroll-reveal + parallax (full cinematic) |
| Hover | Bold: scale 1.08× + color shift + glow pulse |
| CTA button | Glassmorphism + magenta accent + ripple click effect |
| Bot name font | Dancing Script Bold (Google Fonts) |
| UI font | Space Grotesk Variable (Google Fonts) |
| Favicon | Derived from LogoDI.svg |
| Background scene | Framed in rounded rectangle with thin gradient border per bot |

## UI Polish Commands Used

`hero-focus`, `parallax-section`, `glass-card`, `scroll-reveal`, `horizontal-scroll-section`, `floating-card`, `soft-hover` (upgraded to bold hover)

## Assets

- 4 bot SVGs, 1 logo SVG
- 4 background scene PNGs, 1 logo scene PNG, 1 mockup PNG
- 4 audio WAV files
- 2 pre-built components (beams-background, ripple-button)

All assets located in `assets/` (svgs, images, audio, components subdirectories).

## Full Spec

See `team-Yuri/designerplan-phase1.md` for complete screen-by-screen specifications, component library, responsive strategy, and accessibility requirements.
