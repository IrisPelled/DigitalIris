# Phase 2 — Technical Documentation (Improved Conversion)

**Phase:** 2  
**Date:** March 11, 2026

**Base:** Phase 1 MVP. See `docs/doc-phase1.md` for setup, run, build, and project structure.

---

## Phase 2 Scope

Conversion and clarity only. No new routes, no auth, no lead schema or storage changes.

---

## Changes in Phase 2

### CTA and conversion copy (M0)

- **Home:** "Request access below" line above the two buttons; CTA "GET ACCESS" remains primary.
- **Contact:** Section heading "Choose your bot" above the bot chooser cards; "Request access to [Bot Name]" above the form when a bot is selected. Default hero copy: "Choose your bot above to see a preview."

### Per-bot richer explanations (M1)

- **botData.ts:** Optional `supportingText?: string[]` added to `BotInfo`. Each bot has 2–3 short bullets from PRD §6 (Core Role / Main User Value).
- **Home (BotPanel):** Supporting text rendered as a bullet list below the subtitle (Space Grotesk SM, muted slate).
- **Contact hero:** Same supporting text shown in the selected-bot preview section.

### Horizontal scroll cues (M2)

- **Scroll button:** Arrow button appears after **1s** (was 2s). Gentle **pulse** animation when visible; disabled when `prefers-reduced-motion: reduce`.
- **Peek of next panel:** Home panels use **95vw** width on desktop so ~5% of the next panel is visible at the right edge. Scroll-threshold for hiding the button adjusted (visible until last panel).

### Success modal and post-submit (M3)

- **Copy:** Unchanged: "Welcome aboard!" (Dancing Script Bold, 3xl), "You've registered for [Bot Name]. We'll be in touch soon." (Space Grotesk LG).
- **Checkmark:** Entrance animation `scale-in` (0.4s) when `prefers-reduced-motion` is not set.
- **"View registered users" button:** Styled with magenta border and hover glow; min-height 44px; navigates to `/registered-users`. Auto-dismiss still 5s and on overlay/button click.

### Quality (M4)

- **Tests:** Added `botData.test.ts` (supportingText presence); `SuccessModal.test.tsx` (copy and "View registered users" button). All 19 tests pass.
- **Lint:** Zero ESLint/TSC errors.
- **Docs:** This file; `team-Yuri/devlog-phase2.md` for milestone log.

---

## Content and copy sources

- Per-bot supporting text: PRD §6 (Core Role, Main User Value). English only; design system typography unchanged.

---

## Non-regression

Phase 1 acceptance (Home scroll, audio, Contact form, lead save, Registered Users List, nav, a11y, responsive) remains satisfied. No changes to `leadStorage` or routes.
