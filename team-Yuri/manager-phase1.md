# Manager Plan — Phase 1: Prototype MVP

**Manager:** Ben  
**Phase:** 1  
**Date:** March 11, 2026  
**STATUS:** READY FOR VALIDATION

**Source:** `team-Yuri/plan.md`, `team-Yuri/arch-phase1.md`, `team-Yuri/designerplan-phase1.md`

---

## Phase Goal

Deliver a working Iris Bots Showcase application (presentation + lead-generation) where users can: browse four bots on a horizontal-scroll Home page, listen to each bot's audio introduction, click "Get Access" to navigate to Contact, choose one bot, submit name and phone via a validated form, receive a success confirmation, and see their entry on the public Registered Users List. The app follows the dark cinematic design system, is responsive across desktop/tablet/mobile, and meets WCAG AA accessibility baseline.

---

## Ordered Milestones

### M0 — Project Scaffolding & Foundation

**Goal:** A running dev server with all tooling, dependencies, design tokens, assets, and routing in place. No visible UI beyond a blank dark page with correct fonts loading.

**Tasks:**

1. **Initialize project** — React SPA via Vite (or project-default framework). TypeScript.
2. **Install dependencies:**
   - `tailwindcss` (+ PostCSS, autoprefixer)
   - `motion` (framer-motion)
   - `lucide-react`
   - Router (e.g. `react-router-dom`)
3. **Tailwind config** — extend with design tokens from designer plan §3:
   - Colors: `blue-black-base` (#020617), `deep-shadow` (#05091E), `muted-slate` (rgba(255,255,255,0.7)), cyan/purple/magenta HSL accents.
   - Font families: `dancing-script`, `space-grotesk`.
   - Custom keyframes: `animate-rippling` (for ripple button).
   - 4px spacing grid.
4. **Google Fonts** — load Dancing Script (700) and Space Grotesk (variable 300–700) via `<link>` or `@fontsource`.
5. **Directory structure:**
   - `src/app/` — route pages (Home, Contact, RegisteredUsers)
   - `src/components/` — reusable components
   - `src/lib/` — utilities, data layer, constants
   - `src/assets/` — if bundler-imported; otherwise `public/assets/`
6. **Copy assets** into correct locations per designer plan §4:
   - SVGs → `assets/svgs/`
   - Background images → `assets/images/`
   - Audio files → `assets/audio/`
   - Pre-built components (`beams-background.tsx`, `ripple-button.tsx`) → adapt into `src/components/`
7. **Audio conversion** — convert WAV files to MP3 (and optionally OGG) for web. Keep originals; reference converted versions in code.
8. **Routing** — set up three routes: `/` (Home), `/contact` (Contact), `/registered-users` (Registered Users List).
9. **Global CSS** — set `body` background to `#020617`, default text to white, apply Space Grotesk as base font.

**Exit criteria:** `npm run dev` starts, all three routes render a placeholder, fonts load, Tailwind utilities work, assets accessible.

---

### M1 — Global Navigation & App Shell

**Goal:** Persistent navigation bar across all pages with correct styling, active states, and logo.

**Tasks:**

1. **NavBar component** (designer §5.1, §7.5):
   - Fixed top, full width.
   - Glassmorphism: `#020617` at 80% opacity + `backdrop-blur`.
   - Logo: `LogoDI.svg`, 32px height, left-aligned, links to Home.
   - Links: "Home" · "Contact" · "Registered Users List" — bracket-framed format.
   - Font: Space Grotesk Medium, 2xl, tracking-tight.
   - Active state: white text + subtle cyan underline glow.
   - Inactive state: muted slate; hover → white + scale 1.08×.
   - Props: `currentPage`, route-based active detection.
2. **App layout wrapper** — NavBar rendered above route outlet. Account for fixed navbar height in page content (padding-top).
3. **Route integration** — NavBar links navigate between the three routes without full reload.

**Exit criteria:** Nav renders on all pages, logo links home, active state highlights current route, hover/focus styles match spec.

---

### M2 — Home Page: Horizontal Bot Showcase

**Goal:** Fully functional Home page with 4 horizontal-scroll panels, per-panel content, audio playback, CTA navigation, parallax, and scroll hints.

**Tasks:**

1. **BeamsBackground component** (designer §7.9):
   - Adapt `assets/components/beams-background.tsx` into `src/components/BeamsBackground.tsx`.
   - Full viewport behind all panels, intensity "strong".
   - Respect `prefers-reduced-motion` (disable animation when set).
2. **Horizontal scroll container** (designer §5.2):
   - CSS `scroll-snap-type: x mandatory` on outer container.
   - 4 children, each `100vw × 100vh`, `scroll-snap-align: center`.
   - Momentum-based scroll on touch devices.
3. **BotPanel component** (designer §7.1):
   - Props: `botName`, `subtitle`, `svgPath`, `bgImagePath`, `audioPath`, `gradientColors`, `onCtaClick`.
   - **Layer 2 — Scene Frame:** Background image in rounded rectangle (border-radius 16–20px, ~85vw × ~75vh centered), thin gradient border (2px, per-bot gradient lean). Parallax at 0.6× scroll speed.
   - **Layer 3 — Bot Character:** Bot SVG, right-aligned, ~60vh, magenta aura glow stroke, overlaps scene frame. Parallax at 0.8× scroll speed.
   - **Layer 4 — UI Overlay:** Left-aligned text + buttons.
4. **UI Overlay content per panel:**
   - Bot name: Dancing Script Bold, 6xl–8xl, white with subtle cyan gradient.
   - Subtitle: Space Grotesk LG, muted slate, max-width ~500px.
   - Audio button (see below).
   - CTA button (see below).
5. **AudioPlayButton component** (designer §7.3):
   - Pill-shaped, glassmorphism, cyan border (2px), Volume-2 icon (Lucide).
   - Label: "Hear [Bot Name] explain."
   - States: idle, playing (pulsing icon or waveform animation), finished.
   - Props: `label`, `audioSrc`, `onPlay`, `onEnd`.
   - User-initiated only. Only one audio plays at a time (stop previous when new starts).
6. **CTAButton component** (designer §7.4):
   - Adapt `ripple-button.tsx` → glassmorphism + Conversion Magenta accent + ripple on click.
   - Label: "GET ACCESS".
   - States: idle, hovered (scale 1.08× + magenta glow pulse), active (ripple), disabled.
   - On click: navigate to `/contact`.
7. **Parallax implementation:**
   - Track horizontal scroll position.
   - Scene frame: `transform: translate3d()` at 0.6× factor.
   - Bot character: `transform: translate3d()` at 0.8× factor.
   - GPU-accelerated (translate3d, not background-position).
   - Disable when `prefers-reduced-motion` is set.
8. **Scroll hint** (panels 1–3 only):
   - Right edge: 5–10% peek of next panel visible.
   - Text: "Scroll to explore other Iris bots →", fades in after 2 seconds.
9. **Per-panel data** — create a bot data config (array of 4 objects) in `src/lib/botData.ts` with all per-bot values (name, subtitle from PRD §6, svgPath, bgImagePath, audioPath, gradient colors from designer §5.2).
10. **Lazy loading** — SVGs are large (2.5–3.2 MB each). Lazy-load bot character SVGs per panel (e.g. Intersection Observer or React lazy/Suspense). Background images: consider responsive sizing or lazy load.

**Exit criteria:** 4 panels snap-scroll horizontally, each shows correct bot content, audio plays per bot (one at a time), CTA navigates to Contact, parallax works, scroll hints appear, no layout shift on load.

---

### M3 — Contact Page: Bot Selection & Form

**Goal:** Functional Contact page where the user selects a bot, sees a hero preview, fills a validated form, and submits.

**Tasks:**

1. **Page layout** — vertical scroll, 3 sections with staggered scroll-reveal entrance (designer §6 Contact).
2. **BotChooserCard component** (designer §7.2):
   - Props: `botName`, `tagline`, `svgThumbnailPath`, `gradientColors`, `isSelected`, `onSelect`.
   - 4 cards in a horizontal row, centered.
   - Card content: small bot SVG thumbnail + bot name (Dancing Script 2xl) + one-line tagline (Space Grotesk SM).
   - Unselected: floating-card shadow, muted opacity 0.6, slight grayscale.
   - Selected: scale 1.05×, full color, gradient border, subtle glow bloom.
   - Hover: scale 1.08× + glow pulse.
3. **Hero preview section** (designer §5.3 Section 2):
   - Show selected bot's background scene in rounded rectangle (~60% width), gradient border.
   - Bot SVG overlapping the frame.
   - Bot name (Dancing Script Bold, 4xl) + full subtitle (Space Grotesk LG).
   - Smooth crossfade transition when switching selection.
   - Default state: prompt to select a bot (or pre-select first bot).
4. **ContactForm component** (designer §7.6):
   - Glassmorphism card container, centered, max-width ~480px.
   - Fields: Full Name (text), Phone Number (tel).
   - Input styling: dark inputs (`#05091E`), cyan focus border.
   - Validation: name required, phone required, bot must be selected. Inline error messages in Conversion Magenta.
   - Submit button: "GET ACCESS" — glassmorphism + magenta + ripple. Disabled until valid.
   - Props: `selectedBot`, `onSubmit`.
5. **CTA from Home integration** — if user arrived via a specific bot's CTA, pre-select that bot on Contact page (pass bot ID via URL param or state).

**Exit criteria:** User can select a bot (visual feedback), hero preview updates on selection, form validates inline, submit blocked until all fields valid + bot selected, form calls submission handler.

---

### M4 — Data Persistence & Success Flow

**Goal:** Leads are saved to localStorage, success modal appears after submission, user can navigate to Registered Users List.

**Tasks:**

1. **Lead storage module** (`src/lib/leadStorage.ts`):
   - Data shape: `{ id: string, fullName: string, phoneNumber: string, selectedBot: string, timestamp: string }`.
   - `saveLeadSubmission(lead)` — append to localStorage JSON array under key `iris_leads`.
   - `getAllLeads(): Lead[]` — read and parse from localStorage.
   - Handle edge cases: corrupted data, storage full (catch and surface error).
2. **Form submission flow:**
   - ContactForm `onSubmit` → validate → call `saveLeadSubmission` → on success trigger SuccessModal.
3. **SuccessModal component** (designer §7.7):
   - Overlay modal, glassmorphism card, centered.
   - Checkmark animation with cyan glow.
   - Title: "Welcome aboard!" — Dancing Script Bold, 3xl.
   - Body: "You've registered for [Bot Name]. We'll be in touch soon." — Space Grotesk LG.
   - Action: "View registered users" button → navigate to `/registered-users`.
   - Auto-dismiss after 5 seconds or on click/tap.
   - Props: `botName`, `onDismiss`, `onViewList`.
4. **Reset form** after successful submission.

**Exit criteria:** Submission persists in localStorage, survives page reload, success modal renders correctly with bot name, auto-dismisses, navigation to list works.

---

### M5 — Registered Users List Page

**Goal:** Display all submitted leads in a styled table with empty state fallback.

**Tasks:**

1. **Page header** (designer §5.4):
   - Title: "Registered Users" — Space Grotesk Bold, 3xl, white.
   - Subtitle: "Students and educators who joined the Iris community" — Space Grotesk LG, muted slate.
2. **UsersTable component** (designer §7.8):
   - Columns: Full Name · Phone Number · Selected Bot · Date Registered.
   - Header row: Space Grotesk Medium, uppercase, tracking-wide, muted slate, sticky.
   - Data rows: Space Grotesk SM, white.
   - Alternating row backgrounds: `#05091E` / `#020617`.
   - Bot column: bot name in Dancing Script + small color dot (bot's primary gradient color).
   - Timestamp format: readable "Mar 11, 2026".
   - Row hover: cyan glow on left border.
   - Staggered scroll-reveal row entrance.
   - Props: `users[]`, `isLoading`.
3. **Empty state** (designer §5.4):
   - `LogoDI.svg` centered, 40% opacity.
   - Text: "No registered users yet. Be the first!" — Space Grotesk LG, muted slate.
   - CTA: "Choose your bot" link → `/contact`.
4. **Data loading** — read from `getAllLeads()` on mount. Sort by timestamp descending (newest first).

**Exit criteria:** Empty state renders when no leads. After submitting a lead, the list page shows the entry with correct columns, formatting, and styling. Multiple entries display with alternating rows.

---

### M6 — Responsive Design & Accessibility

**Goal:** App works across desktop, tablet, and mobile breakpoints with WCAG AA accessibility compliance.

**Tasks:**

1. **Desktop (≥1280px):** Verify all specs as designed — full horizontal scroll, full-size frames, all animations.
2. **Tablet (768–1279px):**
   - Home: horizontal scroll maintained, scene frame scales to ~90vw × ~70vh, bot character ~50vh, text sizes down one step.
   - Contact: card row wraps to 2×2, hero preview below, form below.
3. **Mobile (<768px):**
   - Home: **vertical scroll** replaces horizontal. Each bot is a stacked full-width section. Scene frame full-width with 16px margin. Bot character repositions above/overlapping text. CTA and audio buttons full-width.
   - Contact: cards stack vertically, hero preview simplified (name + subtitle only, no frame), form full-width.
4. **WCAG AA contrast** — verify all text/background combos (white on #020617 = 18.1:1 ✓, muted slate on #020617, cyan/magenta on dark).
5. **Keyboard navigation:**
   - All interactive elements focusable with visible focus ring (cyan glow, e.g. `ring-2 ring-cyan`).
   - Horizontal scroll navigable via left/right arrow keys.
   - Form fields tab order correct. Bot chooser navigable via arrow keys or tab.
6. **`prefers-reduced-motion`:**
   - Disable: parallax, scroll-reveal animations, beams animation, hover scale transitions.
   - Keep: snap scroll, static layouts, opacity changes.
7. **Screen readers:**
   - Proper heading hierarchy (h1 for bot names, h2 for section titles).
   - `aria-label` on audio buttons, CTA buttons.
   - Form fields with associated `<label>` elements.
   - Table with proper `<thead>`, `<th scope="col">`.
8. **Touch targets** — all buttons minimum 44×44px touch area.

**Exit criteria:** App usable at all three breakpoints. Keyboard-only navigation works end-to-end. Reduced motion respected. Contrast passes AA. Screen reader announces meaningful content.

---

### M7 — Polish, QA & Completion

**Goal:** Final visual fidelity pass, bug fixes, lint clean, tests, documentation.

**Tasks:**

1. **Visual polish pass:**
   - Verify all hover states (bold hover: scale 1.08× + glow pulse on interactive elements).
   - Verify all transitions and animations (hero-focus staggered entrance, scroll-reveal on Contact sections, crossfade on hero preview).
   - Verify glassmorphism consistency (nav, audio button, CTA, form card, success modal).
   - Verify gradient borders per bot on Home panels and Contact preview.
   - Verify the magenta aura glow stroke on bot characters.
2. **Audio QA:**
   - Each panel plays the correct audio file.
   - Only one audio plays at a time.
   - Audio stops when navigating away from Home.
   - Button state reflects playback (idle → playing → finished).
3. **Form QA:**
   - Empty submit blocked. Inline errors appear. Errors clear on correction.
   - Bot selection required.
   - Success modal shows correct bot name.
   - Lead appears on Registered Users List after submit + navigate.
4. **Cross-browser check:** Chrome, Firefox, Safari (if available), Edge.
5. **Lint clean** — zero ESLint/TSC errors.
6. **Unit tests** — at minimum:
   - `leadStorage` module: save, retrieve, handle empty/corrupt.
   - Form validation logic: required fields, bot selection.
   - Component render tests for key components (NavBar, BotChooserCard selection, UsersTable empty/populated).
7. **Update `docs/doc-phase1.md`** — document the tech stack, project structure, how to run, how to build, key architectural decisions, data model, and known limitations.

**Exit criteria:** All visual specs verified against designer plan. All functional flows work end-to-end. Lint clean. Tests pass. Doc updated.

---

## Detailed Developer Guidance

### Bot Data Config

Create a single source of truth at `src/lib/botData.ts`:

```ts
export interface BotInfo {
  id: string;
  name: string;
  subtitle: string;
  svgPath: string;
  bgImagePath: string;
  audioPath: string;
  gradientColors: [string, string];
  tagline: string;
}
```

Populate with 4 entries using values from PRD §6 (names, subtitles) and designer §5.2 (assets, gradients). The `tagline` is a short one-liner for the chooser card (can be derived from the subtitle or kept distinct).

### Component Hierarchy

```
App
├── NavBar
├── Routes
│   ├── HomePage
│   │   ├── BeamsBackground
│   │   └── HorizontalScrollContainer
│   │       └── BotPanel × 4
│   │           ├── SceneFrame (bg image + gradient border)
│   │           ├── BotCharacter (SVG + aura)
│   │           └── UIOverlay
│   │               ├── BotName
│   │               ├── Subtitle
│   │               ├── AudioPlayButton
│   │               └── CTAButton
│   ├── ContactPage
│   │   ├── BotChooserCard × 4
│   │   ├── HeroPreview
│   │   └── ContactForm
│   │       └── CTAButton (submit)
│   └── RegisteredUsersPage
│       └── UsersTable (or EmptyState)
└── SuccessModal (portal/overlay)
```

### Parallax Strategy

Use a single scroll event listener (or Intersection Observer + scroll position) on the horizontal scroll container. Compute each panel's offset from viewport center, then apply:
- Scene frame: `transform: translate3d(offset * 0.6, 0, 0)`
- Bot character: `transform: translate3d(offset * 0.8, 0, 0)`

Wrap in `useEffect` with `matchMedia('(prefers-reduced-motion: reduce)')` guard.

### Audio Management

Use a shared `useAudio` hook or context that:
- Holds a single `HTMLAudioElement` ref.
- On play: stops any current audio, loads new `src`, plays.
- Exposes `isPlaying`, `currentBotId`, `play(botId)`, `stop()`.
- Cleans up on unmount / route change.

### localStorage Schema

Key: `iris_leads`  
Value: JSON array of lead objects.

```json
[
  {
    "id": "uuid-1",
    "fullName": "Jane Doe",
    "phoneNumber": "+972501234567",
    "selectedBot": "digital-iris",
    "timestamp": "2026-03-11T14:30:00.000Z"
  }
]
```

Read on mount of Registered Users List page. Write on form submit. Generate `id` via `crypto.randomUUID()` or fallback.

---

## Acceptance / Gating Criteria

The following must ALL be true before this phase can move to STATUS: READY FOR VALIDATION:

### Functional Completeness

- [ ] Home page: 4 bot panels render in horizontal snap-scroll.
- [ ] Each panel displays: correct bot SVG, background scene, gradient border, bot name, subtitle, audio button, CTA button.
- [ ] Audio plays the correct file per bot; only one at a time; user-initiated.
- [ ] CTA "GET ACCESS" navigates to Contact page.
- [ ] Scroll hint appears on panels 1–3 after 2 seconds.
- [ ] Contact page: 4 bot chooser cards render; selection visually distinct.
- [ ] Hero preview updates on bot selection with crossfade.
- [ ] Contact form validates: name required, phone required, bot required. Inline magenta errors.
- [ ] Form submit saves lead to localStorage with all 4 fields (name, phone, bot, timestamp).
- [ ] Success modal appears with correct bot name; auto-dismisses at 5s; "View registered users" navigates correctly.
- [ ] Registered Users List displays all leads with correct columns and formatting.
- [ ] Empty state renders when no leads exist.
- [ ] Navigation bar present on all pages with correct active states.

### Design Fidelity

- [ ] Dark theme: `#020617` base, `#05091E` depth, white/muted-slate text.
- [ ] Typography: Dancing Script for bot names, Space Grotesk for all UI text.
- [ ] Glassmorphism on: nav bar, audio button, CTA button, contact form card, success modal.
- [ ] Per-bot gradient borders match designer spec.
- [ ] Magenta aura glow on bot characters.
- [ ] Parallax on Home panels (0.6× scene, 0.8× character).
- [ ] Hover states: scale 1.08× + glow pulse on interactive elements.

### Responsive

- [ ] Desktop (≥1280px): horizontal scroll, full spec.
- [ ] Tablet (768–1279px): horizontal scroll maintained, scaled elements.
- [ ] Mobile (<768px): vertical stack, simplified layouts.

### Accessibility

- [ ] WCAG AA contrast on all text.
- [ ] Keyboard navigation: all elements focusable, visible focus rings.
- [ ] `prefers-reduced-motion` disables parallax, scroll-reveal, beams animation.
- [ ] Touch targets ≥ 44×44px.
- [ ] Screen reader: proper headings, aria-labels, form labels.

### Quality Gates

- [ ] Lint clean (zero ESLint/TSC errors).
- [ ] Unit tests pass (storage, validation, key components).
- [ ] `docs/doc-phase1.md` updated with setup, structure, decisions, known limitations.
- [ ] Developer declared completion in `devlog-phase1.md`.

---

*Manager: Ben. Gate review complete. All criteria confirmed: developer declared completion, unit tests passing (15/15), lint clean, docs/doc-phase1.md updated. Ready for Validator (Gili).*
