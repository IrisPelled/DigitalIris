# Manager Plan — Phase 2: Improved Conversion

**Manager:** Ben  
**Phase:** 2  
**Date:** March 11, 2026  
**STATUS:** READY FOR VALIDATION

**Source:** `team-Yuri/plan.md` § Phase 2, `team-Yuri/arch-phase2.md`, `PRDDigitalIris.md` §18

---

## Phase Goal

Improve conversion and clarity on top of the Phase 1 MVP: stronger CTA placement and prominence, refined conversion copy, richer per-bot explanations, clearer horizontal-scroll cues on Home, and a better success message and post-submit experience (confirmation copy, "View registered users" CTA). No new pages, no auth, no changes to lead schema or storage. All work stays within DesignSystem and Phase 1 designer specs; WCAG AA and responsive behavior unchanged.

---

## Ordered Milestones

### M0 — CTA Placement and Conversion Copy

**Goal:** "Get access" is unmissable on Home and Contact; conversion microcopy and headings sharpen intent without changing design system.

**Tasks:**

1. **Home panels** — Revisit CTA position, size, and contrast so the primary action stands out (e.g. ensure sufficient spacing from audio button, hierarchy vs. subtitle). No new components; adjust layout or Tailwind classes as needed.
2. **Contact page** — Ensure submit CTA ("GET ACCESS") is equally prominent; consider section heading or short line above the form that reinforces intent (e.g. "Request access to [selected bot]" or similar per design system tone).
3. **Conversion copy** — Refine any headings or microcopy on Home overlay and Contact that increase clarity or intent (e.g. "Choose your bot" vs. "Select one"). Keep tone consistent with Phase 1 designer plan and DesignSystem.

**Exit criteria:** CTA is clearly the primary action on both Home and Contact; conversion copy is refined and consistent.

---

### M1 — Per-Bot Richer Explanations

**Goal:** Each bot’s value is clearer via optional supporting text (short bullets or expanded tagline); content only, no new structure beyond Phase 1.

**Tasks:**

1. **Content source** — Add optional `supportingText` or bullet points to `src/lib/botData.ts` (or equivalent) for each bot, derived from PRD §6 value props. Keep subtitle as primary; supporting text is secondary.
2. **Home panels** — If not already present, surface supporting text below the subtitle (e.g. 2–3 short bullets or one extra line). Typography: Space Grotesk SM, muted slate; spacing per 4px grid.
3. **Contact hero preview** — When a bot is selected, show the same richer explanation in the hero section so the user reconfirms value before submitting.
4. **Bot chooser cards** — Tagline already exists; ensure it aligns with the refined per-bot message. No new card layout.

**Exit criteria:** Each bot has clearer value explanation on Home and Contact; no new routes or components; design system and a11y preserved.

---

### M2 — Horizontal Scroll Cues

**Goal:** Affordances that more bots exist to the side are stronger (scroll hint visibility, timing, or light animation); scroll mechanism unchanged (CSS scroll-snap).

**Tasks:**

1. **Scroll hint visibility** — Ensure the hint ("Scroll to explore other Iris bots →") is visible and readable (contrast, size). If it fades in after 2s, consider earlier or longer display, or ensure it doesn’t disappear too soon.
2. **Timing** — Optionally show the hint sooner (e.g. 1s) or keep it visible until the user has scrolled at least once. No autoplay of content; hint only.
3. **Light animation** — Optional: subtle motion on the scroll hint (e.g. gentle pulse or slide) to draw attention. Must respect `prefers-reduced-motion` (disable animation when set).
4. **Peek of next panel** — Confirm 5–10% of the next panel is visible at the right edge on desktop/tablet so horizontal scroll is visually obvious.

**Exit criteria:** Horizontal scroll is clearly discoverable; hint is visible and, if animated, respects reduced motion.

---

### M3 — Success Modal and Post-Submit Flow

**Goal:** Success confirmation copy and CTA are polished; optional checkmark animation; "View registered users" is clear and prominent.

**Tasks:**

1. **Success modal copy** — Confirm title: "Welcome aboard!" (Dancing Script Bold, 3xl). Body: "You've registered for [Bot Name]. We'll be in touch soon." (Space Grotesk LG). Copy must match exactly or align with designer/PRD.
2. **Checkmark animation** — If not already present, add a checkmark icon or graphic with cyan glow and a short entrance animation. Respect `prefers-reduced-motion`.
3. **"View registered users" button** — Prominent, same style as primary CTA (glassmorphism + magenta or cyan per design system). On click: navigate to `/registered-users`. Label clear and visible.
4. **Auto-dismiss** — Modal auto-dismisses after 5 seconds and on overlay/button click; behavior unchanged from Phase 1, just verify and document.

**Exit criteria:** Success modal matches spec; "View registered users" is obvious and works; checkmark (if added) is accessible.

---

### M4 — Polish, QA, and Documentation

**Goal:** All Phase 2 changes pass lint and tests; docs updated; no regressions.

**Tasks:**

1. **Visual and a11y pass** — Any new or changed copy has correct contrast and focus order. Responsive behavior unchanged; touch targets still ≥44px where applicable.
2. **Lint and tests** — Run `npm run lint` and `npm run test`; fix any regressions. Add or update unit tests for new copy or behavior if warranted (e.g. success modal copy, supporting text presence).
3. **Update `docs/doc-phase2.md`** — Create or update with: summary of Phase 2 scope (conversion improvements), list of changes (CTA, copy, scroll cues, success flow), how to run/build (unchanged from Phase 1), and any new content or copy sources. Reference `docs/doc-phase1.md` for base setup.
4. **Update `team-Yuri/devlog-phase2.md`** — Developer logs completed milestones and declares implementation complete when done.

**Exit criteria:** Lint clean; tests pass; doc-phase2 and devlog-phase2 updated; no Phase 1 acceptance criteria broken.

---

## Detailed Developer Guidance

### Scope Boundaries

- **No new routes.** Only refinements to existing Home, Contact, success modal, and Registered Users List.
- **No lead schema or storage changes.** Same localStorage key and shape as Phase 1.
- **No new dependencies** unless strictly needed for conversion-only work (e.g. a small animation util). Prefer existing motion/Tailwind.

### Copy and Content

- Per-bot supporting text: pull from PRD §6 (Core Role, Main User Value). Keep concise; 2–3 bullets or one short paragraph per bot.
- All new or changed copy must be in English and within design system typography (Space Grotesk, Dancing Script only where specified).

### Success Modal

- Reuse existing `SuccessModal` component; change only copy and optional checkmark animation.
- Ensure `botName` prop is passed so body shows "You've registered for [Bot Name]."

### Scroll Hint

- Implement in existing Home/BotPanel flow. No new route or layout.
- Use `matchMedia('(prefers-reduced-motion: reduce)')` before adding any animation to the hint.

---

## Acceptance / Gating Criteria

The following must ALL be true before Phase 2 can move to STATUS: READY FOR VALIDATION:

### Functional

- [ ] CTA "Get access" is clearly the primary action on Home panels and Contact.
- [ ] Conversion copy (headings, microcopy) is refined and consistent on Home and Contact.
- [ ] Each bot has richer explanation (supporting text or bullets) on Home and in Contact hero preview.
- [ ] Scroll hint is visible and makes horizontal scroll obvious; optional animation respects `prefers-reduced-motion`.
- [ ] Success modal shows "Welcome aboard!" and "You've registered for [Bot Name]. We'll be in touch soon." and a clear "View registered users" button that navigates to `/registered-users`.
- [ ] No new routes or pages; no changes to lead storage or schema.

### Quality

- [ ] Lint clean (zero ESLint/TSC errors).
- [ ] Unit tests pass; any new behavior covered as needed.
- [ ] `docs/doc-phase2.md` updated with Phase 2 scope and changes.
- [ ] Developer declared completion in `team-Yuri/devlog-phase2.md`.

### Non-Regression

- [ ] Phase 1 acceptance criteria (Home scroll, audio, Contact form, lead save, Registered Users List, nav, a11y, responsive) still satisfied.

---

*Manager: Ben. Gate review complete. All criteria confirmed: developer declared completion, unit tests passing (19/19), lint clean, docs/doc-phase2.md updated. Ready for Validator (Gili).*
