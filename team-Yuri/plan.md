# Digital Iris — Master Plan

**Project:** Iris Bots Showcase (DigitalIris)  
**Source PRD:** `PRDDigitalIris.md`  
**Source Design System:** `DesignSystem.md`  
**Source Designer Plan Phase 1:** `team-Yuri/designerplan-phase1.md`

---

## 1. Project Summary

Digital Iris is a dark-themed showcase application that presents four physics-learning bots (Digital Iris, Brain Boost Iris, Iris Coach, Iris Simulations) under the Iris brand. The product is not a full learning platform in v1; it is a **presentation and lead-generation** app. It must present the four bots clearly, explain the value of each, create engagement through visual and audio storytelling, and convert interest into contact submissions (name, phone, selected bot). Target users: students, teachers, school administrators. Success is measured by number of submitted leads and conversion from home visit to lead submission.

The MVP comprises three main areas: **Home** (horizontal scroll bot showcase with audio and CTA), **Contact / Choose a Bot** (bot selection + short form), and **Registered Users List** (public list of registrants for the prototype). All UI in English; visual language is modern, clean, immersive, dark blue–black with a defined design system (colors, typography, spacing, components) and screen-by-screen specs in the designer plan.

---

## 2. Source Documents

| Document | Purpose |
|----------|---------|
| `PRDDigitalIris.md` | Product goals, scope, functional requirements, IA, content, phased roadmap |
| `DesignSystem.md` | Brand identity, color palette, typography, visual language |
| `team-Yuri/designerplan-phase1.md` | Phase 1 UI specs, component library, assets inventory, responsive/a11y, technical notes |

---

## 3. Phased Roadmap

### Phase 1 — Prototype MVP

**Goal:** Deliver a working showcase and lead-generation app so users can understand the four bots, listen to each bot's introduction, choose a bot, submit name and phone, and appear in the public registrants list.

**In scope (from PRD §9, §12, §18; designer plan §5–§8):**
- Dark blue/black theme per design system and designer plan (e.g. #020617, #05091E, accent beams).
- Top navigation: Home, Contact, Registered Users List (fixed, glassmorphism; designer §5.1).
- Home page: horizontal scroll, 4 full-viewport snap panels; per panel: large bot image, contextual background, bot name (Dancing Script), subtitle (Space Grotesk), audio play button, CTA "Get access"; beams background; parallax and scroll-reveal per designer §5.2.
- Audio: one file per bot, user-initiated only; correct file per panel (PRD §12.3; designer §4.5, §7.3).
- CTA "Get access" from Home → Contact/Choose a Bot page (PRD §12.4; designer §7.4).
- Contact page: bot chooser (4 cards, select one), hero preview of selected bot, contact form (Full Name, Phone Number); validation and required bot selection (PRD §12.5–12.7; designer §5.3, §7.2, §7.6).
- Form submission: save lead with name, phone, selected bot, timestamp; success confirmation (PRD §12.6, §12.8; designer §5.5, §7.7).
- Registered Users List: display Full Name, Phone Number, Selected bot, Date Registered; public in prototype; empty state per designer §5.4 (PRD §12.9; designer §7.8).
- Assets: bot SVGs, logo, background scenes, audio (WAV→MP3/OGG for web), beams + ripple components per designer §4.
- Responsive: desktop horizontal scroll; tablet/mobile per designer §8 (e.g. vertical stack on mobile).
- Accessibility: WCAG AA contrast, user-initiated audio, keyboard nav, focus rings, reduced-motion option, touch targets (designer §8).

**Out of scope (Phase 1):** Direct bot conversation in-app, immediate access after submit, auth, payment, admin dashboard, CRM, full learning platform, production-grade privacy/lead management (PRD §9).

**Success criteria:** User can land on Home, scroll bots, play audio, click Get access, choose a bot, submit valid form, see success message, and see their entry on Registered Users List.

**Required artifacts:**  
`team-Yuri/arch-phase1.md`, `team-Yuri/manager-phase1.md`, `team-Yuri/devlog-phase1.md`, `team-Yuri/validation-phase1.md`, `team-Yuri/designerplan-phase1.md` (done), `docs/doc-phase1.md`, `docs/ux-phase1.md`.

---

### Phase 2 — Improved Conversion

**Goal:** Improve conversion and clarity without changing core scope: better CTAs, messaging, navigation cues, and post-submit experience.

**In scope (from PRD §18):**
- Stronger CTA placement and conversion messaging.
- Richer per-bot explanations (copy/UX).
- Clearer visual cues for horizontal navigation.
- Improved success message and post-submit flow (e.g. confirmation modal copy, "View registered users" CTA).

**Out of scope:** Private lead management, access control, new product features.

**Required artifacts:**  
`team-Yuri/arch-phase2.md`, `team-Yuri/manager-phase2.md`, `team-Yuri/devlog-phase2.md`, `team-Yuri/validation-phase2.md`, `team-Yuri/designerplan-phase2.md`, `docs/doc-phase2.md`, `docs/ux-phase2.md`.

---

### Phase 3 — Production Readiness

**Goal:** Move from prototype to production-ready: private lead management, access control, safer data handling, optional direct access to selected bots.

**In scope (from PRD §18):**
- Private lead management (no public registrants list as default).
- Access control for registrant data.
- Better lead workflow (e.g. export, handoff).
- Optional direct access flow to selected bots.
- More secure data handling and storage.

**Out of scope:** Full learning platform; scope decided in Phase 3 arch.

**Required artifacts:**  
`team-Yuri/arch-phase3.md`, `team-Yuri/manager-phase3.md`, `team-Yuri/devlog-phase3.md`, `team-Yuri/validation-phase3.md`, `team-Yuri/designerplan-phase3.md` (if applicable), `docs/doc-phase3.md`, `docs/ux-phase3.md`.

---

## 4. Phase 1 Detail (Current)

**PRD references:** §1–§4 (summary, goal, problem, users), §5–§6 (value prop, four bots with subtitles and audio scripts), §7–§8 (business goals, metrics), §9–§14 (scope, MVP, IA, functional requirements, content, UI/UX), §18 Phase 1.

**Designer plan references:** §1–2 (overview, journey), §3 (design system specs: colors, type, spacing), §4 (assets: SVGs, logo, backgrounds, audio, beams/ripple, fonts), §5 (screens: nav, Home, Contact, Registered Users List, success modal), §6 (polish: hero-focus, parallax, glass-card, scroll-reveal, horizontal-scroll-section, hover), §7 (component library: Bot Panel, Bot Chooser Card, Audio Play Button, CTA Button, Nav Bar, Contact Form, Success Modal, Users Table, Beams Background), §8 (responsive breakpoints, a11y), §9 (deps: motion, Google Fonts, Tailwind, Lucide, storage approach, lazy-load/audio format notes).

**Technical boundaries (for arch-phase1):** Storage: prototype-appropriate (e.g. local storage or simple JSON/API). No auth, no CRM in Phase 1. Optimize large SVGs (lazy load or optimized formats); use MP3/OGG for audio. Horizontal scroll: CSS scroll-snap; parallax via transform (e.g. translate3d), not background-position.

---

## 5. Artifact Dependency (All Phases)

- **Architect** produces `arch-phaseN.md` (Phase Goal, Architectural Decisions, Constraints, Technical Boundaries).
- **SW Manager** produces `manager-phaseN.md` from plan + arch.
- **Developer** consumes arch + manager + designer plan; produces `devlog-phaseN.md`.
- **Validator** consumes arch + manager + devlog; produces `validation-phaseN.md` (STATUS: VALIDATED when complete).
- **Designer** produces `designerplan-phaseN.md`; Phase 1 complete per designer plan.
- **Docs:** `docs/doc-phaseN.md`, `docs/ux-phaseN.md`.

PHASE pointer: `team-Yuri/PHASE.md` (single line `PHASE=N`). Only Architect updates plan.md and PHASE.md per process.

---

## 6. Roadmap Status (Closure)

**Phases 1–3 are complete.** The Iris Bots Showcase is in a production-ready state:

- **Phase 1 — Prototype MVP:** Home (horizontal scroll showcase), Contact (bot selection + form), public Registered Users List, audio, design system. ✓
- **Phase 2 — Improved Conversion:** Stronger CTAs, richer bot explanations, clearer scroll cues, improved success/post-submit experience. ✓
- **Phase 3 — Production Readiness:** Private lead management, access control for registrant data, lead workflow (view/export), optional direct access to selected bot, secure data handling. ✓

Any further work (e.g. Phase 4, new product features, or scope change) requires a **new plan or explicit scope** from the Architect/CEO. This document’s phased roadmap is **done** unless superseded by a new plan.
