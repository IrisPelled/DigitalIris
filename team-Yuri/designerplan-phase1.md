# Designer Plan — Phase 1: Iris Bots Showcase

**Designer:** Roni
**Phase:** 1
**Date:** March 11, 2026
**STATUS: COMPLETE**

---

## 1. Project Overview

A dark-themed cinematic showcase application presenting four Iris physics-learning bots. The product's purpose is lead generation through immersive visual storytelling, audio bot introductions, and a short contact form. Three pages: Home (horizontal scroll showcase), Contact (bot selection + form), Registered Users List.

**Source PRD:** `PRDDigitalIris.md`
**Source Design System:** `DesignSystem.md`

---

## 2. User Journey & Emotional Arc

### Journey Flow

```
Landing (Home) → Discovery (scroll) → Connection (audio) → Decision (CTA) → Selection (Contact) → Commitment (form) → Confirmation (success)
```

### Emotional Arc

| Stage | Emotion | Trigger |
|---|---|---|
| Landing | **Awe** | Beams animation + first bot fills the screen (PRIMARY PEAK) |
| Scrolling | Curiosity | "What does the next one do?" |
| Audio play | Trust | Bot speaks directly to the user's pain point |
| CTA click | Resolve | "I want this one" |
| Form submit | Relief | "I'm in, it's done" |

### Core Defining Experience

The visual "wow" moment on landing is the primary emotional peak. The full-viewport cinematic panel with animated beams, framed background scene, and the bot character breaking out of the frame must hit the user immediately. Audio is secondary support — the visuals do the heavy lifting for conversion.

---

## 3. Design System Specifications

### 3.1 Color Palette — "Luminous Knowledge"

**Foundation Colors:**
| Token | Value | Usage |
|---|---|---|
| Blue-Black Base | `#020617` | Primary background |
| Deep Shadow | `#05091E` | Card backgrounds, table alternating rows, UI depth |
| Pure White | `#FFFFFF` | Primary titles, active CTA text |
| Muted Slate | `rgba(255, 255, 255, 0.7)` | Subtitles, secondary descriptions |

**Accent Beams (Knowledge Spectrum):**
| Token | Value | Usage |
|---|---|---|
| Knowledge Cyan | `HSL(190, 85%, 65%)` | Audio buttons, secondary nav, focus states |
| Insight Purple | `HSL(260, 85%, 65%)` | Holographic overlays, bot-specific highlights |
| Conversion Magenta | `HSL(320, 85%, 65%)` | "Get Access" CTA, conversion-critical elements |

**Per-Bot Gradient Leans:**
| Bot | Gradient Direction |
|---|---|
| Digital Iris | Cyan → Purple |
| Brain Boost Iris | Purple → Cyan |
| Iris Coach | Purple → Magenta |
| Iris Simulations | Cyan → Purple |

### 3.2 Typography

**Font Stack:**
| Role | Font | Weight | Size | Source |
|---|---|---|---|---|
| Bot names (script) | **Dancing Script** | Bold (700) | 6xl–8xl (60–96px) | Google Fonts |
| All UI text | **Space Grotesk** | Variable (300–700) | SM–3xl (14–30px) | Google Fonts |

**Type Scale:**
| Level | Font | Style | Usage |
|---|---|---|---|
| H1 — Hero Title | Dancing Script | Bold, 6xl–8xl, tracking-tighter | Bot names on panels |
| H2 — Functional Labels | Space Grotesk | Medium, 3xl, tracking-tight | Nav links, form headers, page titles |
| Body/Subtitle | Space Grotesk | Regular, LG (18px) | Bot subtitles/taglines |
| Small | Space Grotesk | Regular, SM (14px) | Table cells, timestamps, minor notes |
| Muted text | Space Grotesk | Regular, any size, `rgba(255,255,255,0.7)` | Secondary descriptions |

### 3.3 Spacing & Grid

- **4px geometric grid** for pixel-perfect alignment
- Micro-Spacing (4–8px): icon-to-label, title-to-subtitle
- Functional Spacing (16–24px): between UI elements (audio button ↔ CTA)
- Macro-Spacing (64px+): screen edge to content ("cinematic" breathing room)

---

## 4. Visual Assets Inventory

### 4.1 Bot Character SVGs
| Bot | File | Location |
|---|---|---|
| Digital Iris | `DigitalIris.svg` | `assets/svgs/` |
| Brain Boost Iris | `BrainBoostIris.svg` | `assets/svgs/` |
| Iris Coach | `IrisCoach.svg` | `assets/svgs/` |
| Iris Simulations | `IrisSimulations.svg` | `assets/svgs/` |

### 4.2 Logo
| Asset | File | Location | Notes |
|---|---|---|---|
| Brand Logo | `LogoDI.svg` | `assets/svgs/` | Also used as favicon (derive PNG from SVG) |

### 4.3 Background Scene Images
| Bot | File | Location | Description |
|---|---|---|---|
| Digital Iris | `bg-digital-iris.png` | `assets/images/` | Night study desk with city view |
| Brain Boost Iris | `bg-brain-boost-iris.png` | `assets/images/` | Lecture recording + holographic summaries |
| Iris Coach | `bg-iris-coach.png` | `assets/images/` | Creative thinking holographic panels |
| Iris Simulations | `bg-iris-simulations.png` | `assets/images/` | Physics lab with gravity simulation |

### 4.4 Reference / Branding Images
| Asset | File | Location |
|---|---|---|
| Logo cinematic scene | `digital-iris-logo-scene.png` | `assets/images/` |
| Home page reference mockup | `home-page-mockup.png` | `assets/images/` |

### 4.5 Audio Files
| Bot | File | Location |
|---|---|---|
| Digital Iris | `DigitalIris.wav` | `assets/audio/` |
| Brain Boost Iris | `BrainBoostIris.wav` | `assets/audio/` |
| Iris Coach | `IrisCoach.wav` | `assets/audio/` |
| Iris Simulations | `IrisSimulations.wav` | `assets/audio/` |

### 4.6 UI Components (Pre-built)
| Component | File | Location | Dependencies |
|---|---|---|---|
| Animated beams background | `beams-background.tsx` | `assets/components/` | `motion` (npm) |
| Ripple button | `ripple-button.tsx` | `assets/components/` | Tailwind `animate-rippling` keyframe |

### 4.7 Fonts
| Font | Source | Weights |
|---|---|---|
| Dancing Script | Google Fonts | Bold (700) |
| Space Grotesk | Google Fonts | Variable (300–700) |

---

## 5. Screen-by-Screen UI Specifications

### 5.1 Global Navigation Bar

**Position:** Fixed top, all pages
**Style:** Glassmorphism — `#020617` at 80% opacity + backdrop blur

| Element | Spec |
|---|---|
| Logo | `LogoDI.svg`, 32px height, left-aligned, links to Home |
| Links | "Home" · "Contact" · "Registered Users List" |
| Link font | Space Grotesk Medium, 2xl, tracking-tight |
| Active state | White text, subtle cyan underline glow |
| Inactive state | Muted slate, bold hover → white + scale 1.08x |
| Format | `[ Home | Contact | Registered Users List ]` with bracket framing |

---

### 5.2 Home Page — Horizontal Bot Showcase

**Layout:** Full-viewport horizontal scroll, 4 snap-scroll panels (100vw × 100vh each)
**Scroll:** Momentum-based, snap-to-center per panel

#### Layer Stack (per panel)

| Layer | Element | Behavior |
|---|---|---|
| 1 — Background | `BeamsBackground` canvas | Full viewport, animated, always behind everything |
| 2 — Scene Frame | Bot background image in **rounded rectangle** (border-radius 16–20px, ~85% vw × ~75% vh, centered) with **thin gradient border** (2px, using bot's gradient lean colors) | Parallax: moves at 0.6× scroll speed |
| 3 — Bot Character | Bot SVG, right-aligned, ~60% vh, **magenta aura glow stroke**, overlaps the scene frame (breaks out of bounds for 3D depth) | Parallax: moves at 0.8× scroll speed |
| 4 — UI Overlay | Text + buttons, left-aligned | Fixed relative to panel |

#### UI Overlay Content (per panel)

| Element | Spec |
|---|---|
| Bot name | Dancing Script Bold, 6xl–8xl, white with subtle cyan gradient |
| Subtitle | Space Grotesk LG, muted slate `rgba(255,255,255,0.7)`, max-width ~500px |
| Audio button | Pill-shaped, glassmorphism, cyan border (2px), Volume-2 icon (Lucide) + "Hear [Bot Name] explain." |
| CTA button | "GET ACCESS" — glassmorphism + Conversion Magenta accent + ripple effect on click |
| Scroll hint | Right edge: 5–10% peek of next panel + "Scroll to explore other Iris bots →" text, fades in after 2s (panels 1–3 only) |

#### Per-Panel Variations

**Panel 1 — Digital Iris**
- Background: `bg-digital-iris.png`
- Character: `DigitalIris.svg`
- Gradient border: Cyan → Purple
- Audio: `DigitalIris.wav`

**Panel 2 — Brain Boost Iris**
- Background: `bg-brain-boost-iris.png`
- Character: `BrainBoostIris.svg`
- Gradient border: Purple → Cyan
- Audio: `BrainBoostIris.wav`

**Panel 3 — Iris Coach**
- Background: `bg-iris-coach.png`
- Character: `IrisCoach.svg`
- Gradient border: Purple → Magenta
- Audio: `IrisCoach.wav`

**Panel 4 — Iris Simulations**
- Background: `bg-iris-simulations.png`
- Character: `IrisSimulations.svg`
- Gradient border: Cyan → Purple
- Audio: `IrisSimulations.wav`

---

### 5.3 Contact / Choose a Bot Page

**Layout:** Vertical scroll, 3 sections

#### Section 1 — Bot Chooser (compact, horizontal row)

| Element | Spec |
|---|---|
| Container | 4 cards in horizontal row, centered |
| Card content | Small bot SVG thumbnail + bot name (Dancing Script 2xl) + one-line tagline (Space Grotesk SM) |
| Unselected state | Floating-card (shadow), muted opacity 0.6, slight grayscale |
| Selected state | Scale 1.05×, full color, gradient border appears (bot's color lean), subtle glow bloom |
| Hover | Bold hover: scale 1.08× + glow pulse |

#### Section 2 — Hero Preview of Selected Bot

| Element | Spec |
|---|---|
| Scene frame | Selected bot's background image in rounded rectangle (~60% width), gradient border |
| Bot character | SVG overlapping the frame |
| Text | Bot name (Dancing Script Bold, 4xl) + full subtitle (Space Grotesk LG) |
| Transition | Smooth crossfade when switching bot selection |

#### Section 3 — Contact Form

| Element | Spec |
|---|---|
| Container | Glassmorphism card, centered, max-width ~480px |
| Fields | Full Name, Phone Number — Space Grotesk, dark inputs (`#05091E`), cyan focus border |
| Validation | Inline error messages in Conversion Magenta |
| Submit button | "GET ACCESS" — glassmorphism + magenta accent + ripple |
| Required logic | Name required, phone required, bot must be selected |

---

### 5.4 Registered Users List Page

#### Header
| Element | Spec |
|---|---|
| Title | "Registered Users" — Space Grotesk Bold, 3xl, white |
| Subtitle | "Students and educators who joined the Iris community" — Space Grotesk LG, muted slate |

#### Table
| Element | Spec |
|---|---|
| Container | Floating-card (shadow style) |
| Columns | Full Name · Phone Number · Selected Bot · Date Registered |
| Header row | Space Grotesk Medium, uppercase, tracking-wide, muted slate, sticky on scroll |
| Data rows | Space Grotesk SM, white |
| Alternating rows | `#05091E` / `#020617` |
| Bot column | Bot name in Dancing Script + small color dot (bot's primary gradient color) |
| Timestamp format | Readable: "Mar 11, 2026" |
| Row hover | Bold hover: cyan glow on left border |
| Row entrance | Staggered scroll-reveal |

#### Empty State
| Element | Spec |
|---|---|
| Visual | `LogoDI.svg` centered, 40% opacity |
| Text | "No registered users yet. Be the first!" — Space Grotesk LG, muted slate |
| CTA | "Choose your bot" link → Contact page |

---

### 5.5 Success Confirmation Modal

| Element | Spec |
|---|---|
| Type | Overlay modal, glassmorphism card, centered on screen |
| Animation | Checkmark animation with cyan glow |
| Title | "Welcome aboard!" — Dancing Script Bold, 3xl |
| Body | "You've registered for [Bot Name]. We'll be in touch soon." — Space Grotesk LG |
| Action | "View registered users" button → Registered Users List page |
| Auto-dismiss | 5 seconds or on click/tap |

---

## 6. UI Polish Recommendations

### Per-Screen Polish Map

#### Home Page (all 4 panels)

| Command | Target | Rationale | Effect |
|---|---|---|---|
| `hero-focus` | Bot name + CTA | Staggered entrance animation strengthens visual hierarchy on landing | User immediately sees the hero title and primary action |
| `parallax-section` | Scene frame (0.6×) + bot character (0.8×) | Multi-speed layers create physical depth in a 2D interface | Background and foreground move at different speeds during scroll |
| `glass-card` | Audio button, CTA button | Glassmorphism unifies interactive elements with the cinematic aesthetic | Frosted translucent elements feel like part of the holographic world |
| `scroll-reveal` | Subtitle, audio button | Staggered reveal after headline lands creates narrative pacing | User processes the title first, then supporting info fades in |
| `horizontal-scroll-section` | Entire Home page container | 4 full-viewport panels with snap scroll | User browses bots by scrolling horizontally |
| `soft-hover` → `bold hover` | CTA, audio button | Scale 1.08× + glow pulse signals interactivity clearly on dark backgrounds | User gets strong feedback that elements are clickable |

#### Contact Page

| Command | Target | Rationale | Effect |
|---|---|---|---|
| `scroll-reveal` | All 3 sections | Staggered entrance on page load creates guided flow | User processes chooser → preview → form in sequence |
| `glass-card` | Contact form container | Consistency with Home page glass elements | Form feels like part of the same product world |
| `floating-card` | Bot chooser cards (unselected) | Shadow style for functional pages keeps glass for immersive moments | Clear card boundaries without overwhelming glass effects |
| `soft-hover` → `bold hover` | Bot cards, submit button | Strong hover feedback on selection-critical elements | User gets clear interactivity signal |

#### Registered Users List

| Command | Target | Rationale | Effect |
|---|---|---|---|
| `floating-card` | Table container | Shadow style keeps the data readable and grounded | Table stands out from the dark background without glass distraction |
| `scroll-reveal` | Table rows | Staggered row entrance adds life to a static data page | Rows cascade in, making the list feel dynamic |
| `soft-hover` → `bold hover` | Table rows | Cyan glow on left border highlights the active row | User can track their position in the list |

#### Global Nav

| Command | Target | Rationale | Effect |
|---|---|---|---|
| `glass-card` | Nav bar background | Translucent nav lets the beams animation show through | Nav feels floating and integrated with the cinematic background |

---

## 7. Component Library

### 7.1 Bot Panel Component
- **Variants:** 4 (one per bot, differing in: SVG, background image, gradient colors, audio file, text content)
- **States:** default, audio-playing (button animates), scrolling (parallax active)
- **Props:** botName, subtitle, svgPath, bgImagePath, audioPath, gradientColors, onCtaClick

### 7.2 Bot Chooser Card
- **Variants:** 4 (one per bot)
- **States:** unselected (muted, shadow), hovered (scale + glow), selected (full color, gradient border, glow bloom)
- **Props:** botName, tagline, svgThumbnailPath, gradientColors, isSelected, onSelect

### 7.3 Audio Play Button
- **Variants:** 1
- **States:** idle (pill, cyan border), playing (animated waveform or pulsing icon), finished
- **Props:** label ("Hear [Bot Name] explain."), audioSrc, onPlay, onEnd

### 7.4 CTA Button (Get Access)
- **Variants:** 1 (glassmorphism + magenta)
- **States:** idle, hovered (scale 1.08× + magenta glow pulse), active (ripple effect), disabled
- **Props:** label, onClick, disabled
- **Base component:** `ripple-button.tsx` with glassmorphism + magenta styling

### 7.5 Navigation Bar
- **Variants:** 1
- **States:** per-link: active (white + cyan underline), inactive (muted), hovered (bold scale)
- **Props:** currentPage, onNavigate

### 7.6 Contact Form
- **Variants:** 1
- **States:** idle, validating, submitting, success, error
- **Props:** selectedBot, onSubmit
- **Fields:** Full Name (text), Phone Number (tel)

### 7.7 Success Modal
- **Variants:** 1
- **States:** entering (animate in), visible, exiting (auto-dismiss at 5s)
- **Props:** botName, onDismiss, onViewList

### 7.8 Users Table
- **Variants:** 1 (populated), 1 (empty state)
- **States:** loading (skeleton rows), populated (staggered reveal), empty
- **Props:** users[], isLoading

### 7.9 Beams Background
- **Variants:** 3 intensity levels (subtle, medium, strong — use "strong" for this project)
- **States:** animating (always)
- **Props:** intensity, className
- **Source:** `assets/components/beams-background.tsx`

---

## 8. Responsive & Accessibility Strategy

### Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Desktop (≥1280px) | Full horizontal scroll, all specs as designed |
| Tablet (768–1279px) | Horizontal scroll maintained, scene frame scales to 90% vw × 70% vh, bot character scales to ~50% vh, text sizes scale down one step |
| Mobile (< 768px) | **Vertical scroll** replaces horizontal — each bot becomes a stacked full-width section. Scene frame becomes full-width with 16px margin. Bot character repositions above/overlapping the text area. CTA and audio buttons become full-width. |

### Contact Page Responsive
| Breakpoint | Behavior |
|---|---|
| Desktop | Horizontal card row + hero preview + form side by side |
| Tablet | Card row wraps to 2×2, hero preview below, form below |
| Mobile | Cards stack vertically, hero preview simplified (name + subtitle only, no frame), form full-width |

### Accessibility

| Requirement | Implementation |
|---|---|
| Color contrast | All text meets WCAG AA on dark backgrounds (white on `#020617` = 18.1:1) |
| Audio | Audio is user-initiated only (no autoplay). Provide visible label text alongside play icon |
| Keyboard nav | All interactive elements focusable with visible focus ring (cyan glow). Horizontal scroll navigable via arrow keys |
| Motion | Respect `prefers-reduced-motion`: disable parallax, scroll-reveal, and beams animation. Snap scroll still works |
| Screen readers | Bot names and subtitles use proper heading hierarchy. Audio button has aria-label. Form fields have associated labels |
| Touch targets | All buttons minimum 44×44px touch area |

---

## 9. Technical Notes for Architect

### Dependencies
- `motion` (npm) — for BeamsBackground canvas animation and scroll-reveal/parallax
- Google Fonts: Dancing Script (700), Space Grotesk (variable)
- Tailwind CSS — extend with `animate-rippling` keyframe for ripple button
- Lucide React — Volume-2 icon for audio button
- `shadcn/ui` compatible project structure

### Data Storage
- Lead submissions: name, phone, selectedBot, timestamp
- Prototype-level: local storage or simple JSON file/API is acceptable per PRD
- No auth, no CRM integration in Phase 1

### Key Implementation Considerations
- SVG bot characters are large (2.5–3.2 MB each). Consider lazy loading per panel or converting to optimized formats (WebP/AVIF for rasterized versions at fixed sizes)
- WAV audio files should be converted to MP3/OGG for web delivery (smaller file size, broader codec support)
- Horizontal scroll with snap requires `scroll-snap-type: x mandatory` on the container and `scroll-snap-align: center` on each panel
- Parallax layers: use CSS `transform: translate3d()` for GPU-accelerated movement, not `background-position`

---

STATUS: COMPLETE
