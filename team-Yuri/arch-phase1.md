# Architecture — Phase 1: Prototype MVP

**Phase:** 1  
**Source:** `team-Yuri/plan.md`, `PRDDigitalIris.md`, `team-Yuri/designerplan-phase1.md`

---

## Phase Goal

Deliver a working showcase and lead-generation application so that users can: understand the four Iris bots, listen to each bot's audio introduction, choose one bot, submit name and phone via a short form, and see themselves in the public Registered Users List. The app is presentation-first (dark, immersive, horizontal scroll on Home) and converts interest into stored leads with no auth, no payment, and no CRM in this phase.

---

## Architectural Decisions

### 1. Frontend stack
- **Framework:** React (or project default SPA framework if already set).
- **Styling:** Tailwind CSS; extend with design tokens from designer plan (§3) and custom keyframes (e.g. `animate-rippling` for CTA).
- **Motion:** `motion` (framer-motion or Motion library) for BeamsBackground, scroll-reveal, and parallax; respect `prefers-reduced-motion`.
- **Icons:** Lucide React (e.g. Volume-2 for audio).
- **Fonts:** Google Fonts — Dancing Script (700), Space Grotesk (variable); load per designer plan §4.7.

### 2. Application structure
- **Routes:** Three main routes — Home, Contact (Choose a Bot), Registered Users List; plus success state (modal or dedicated confirmation view).
- **Navigation:** Single global nav bar (fixed, glassmorphism); links: Home, Contact, Registered Users List. Active state and hover per designer §5.1.
- **Home:** One horizontal scroll container; four full-viewport panels (100vw × 100vh), CSS scroll-snap (x mandatory, center). Each panel: BeamsBackground, scene frame (rounded rect + gradient border), bot character SVG, overlay (name, subtitle, audio button, CTA). Parallax on scene (0.6×) and character (0.8×) via transform/scroll position.
- **Contact:** Three sections in vertical order — bot chooser (4 cards), hero preview of selected bot, contact form (name, phone). Form submits only when a bot is selected and fields are valid.
- **Registered Users List:** Table (or card list on small screens) with columns: Full Name, Phone Number, Selected Bot, Date Registered. Empty state with logo and CTA to Contact. Staggered row reveal optional.

### 3. Data and persistence
- **Leads:** One logical entity per submission: `fullName`, `phoneNumber`, `selectedBot`, `timestamp`.
- **Storage (Phase 1):** Prototype-appropriate only. Options (pick one and document): (a) in-memory + reset on reload, (b) `localStorage` JSON array, (c) simple file/JSON backend or serverless function. No database, no auth, no CRM integration.
- **Registered Users List:** Reads from the same store; list is public within the app. No access control in Phase 1.

### 4. Assets and performance
- **Bot SVGs:** Large (designer notes ~2.5–3.2 MB each). Lazy-load per panel (e.g. when panel enters viewport) or provide optimized/rasterized versions at display size to keep LCP acceptable.
- **Audio:** Per-bot WAV referenced in designer; for web, use MP3 and/or OGG (smaller, broader support). Playback only on user gesture (no autoplay).
- **Images:** Background scenes (PNG) in `assets/images/`; use responsive srcset or single appropriate size to avoid overfetch.
- **Beams:** Use shared BeamsBackground component from designer asset list; single instance on Home behind all panels (or one per panel if simpler and performant).

### 5. Components (align with designer §7)
- Reusable building blocks: **BotPanel** (Home panels), **BotChooserCard** (Contact), **AudioPlayButton**, **CTAButton** (Get Access, glassmorphism + magenta + ripple), **NavBar**, **ContactForm**, **SuccessModal**, **UsersTable** (with empty state), **BeamsBackground**. Props and variants as specified in designer plan §7; no new scope beyond that.

### 6. Accessibility and responsiveness
- **A11y:** WCAG AA contrast; all interactive elements focusable with visible focus (e.g. cyan ring); audio user-initiated only with visible label; form labels associated; horizontal scroll navigable by keyboard where feasible. Respect `prefers-reduced-motion`: disable parallax, scroll-reveal, and beams animation when set.
- **Responsive:** Desktop (≥1280px): full horizontal scroll and specs as designed. Tablet (768–1279px): horizontal scroll, reduced frame/character scale per designer §8. Mobile (<768px): vertical stack of bot sections instead of horizontal scroll; simplified Contact layout (stacked cards, simplified preview, full-width form). Touch targets ≥44×44px.

---

## Constraints (Non-Negotiable)

1. **Scope:** Only the three areas (Home, Contact, Registered Users List) and success confirmation. No bot chat, no post-submit bot access, no auth, no payment, no admin dashboard, no CRM.
2. **Content:** All UI copy in English; bot names, subtitles, and audio scripts as in PRD §6; nav labels as in PRD §11.
3. **Design system:** Colors, typography (Dancing Script for bot names, Space Grotesk for UI), spacing (4px grid), and component styling must follow `DesignSystem.md` and `designerplan-phase1.md` §3–§5. No arbitrary new themes or typefaces.
4. **Lead data:** Each submission must store at least: fullName, phoneNumber, selectedBot, timestamp. No additional required fields in Phase 1.
5. **Validation:** Full Name and Phone Number required; a bot must be selected before submit. Show inline errors (e.g. magenta per designer) and block submit until valid.
6. **Public list:** Registered Users List is visible to any user of the app in Phase 1; no access control or privacy model beyond what the PRD allows for the prototype.

---

## Technical Boundaries (Out of Scope)

- **Authentication / authorization:** No login, no user accounts, no role-based access.
- **Backend beyond persistence:** No CRM, no email sending, no webhooks, no external APIs except any chosen minimal persistence endpoint.
- **Payment or billing:** Out of scope.
- **Direct bot conversation or chat UI:** Out of scope; only showcase and lead capture.
- **Production-grade security or compliance:** No encryption-at-rest requirement, no audit logs, no GDPR-specific flows in Phase 1; treat as prototype data.
- **Admin dashboard or lead management UI:** Out of scope; leads are managed outside the app (e.g. manual export).
- **i18n / multi-language:** English only in Phase 1.
- **Real-time or sync:** No live updates of the registrants list; full refresh or single-read on page load is sufficient.

---

*Architect: Yuri. Once CEO agrees arch planning is concluded, hand off to SW Manager via `manager-phase1.md`.*
