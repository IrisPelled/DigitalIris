# Architecture — Phase 2: Improved Conversion

**Phase:** 2  
**Source:** `team-Yuri/plan.md` § Phase 2, `PRDDigitalIris.md` §18

---

## Phase Goal

Improve conversion and clarity without changing core scope: stronger CTAs and messaging, richer per-bot explanations, clearer horizontal-scroll cues on Home, and a better success message and post-submit experience (e.g. confirmation copy, "View registered users" CTA). All changes build on the Phase 1 MVP; no new pages or auth.

---

## Architectural Decisions

### 1. CTA and conversion
- Revisit placement and prominence of "Get access" on Home panels and Contact so the primary action is unmissable.
- Refine conversion copy (microcopy, headings) where it increases clarity or intent; keep within existing design system and designer plan tone.

### 2. Per-bot explanations
- Add or refine copy/UX so each bot’s value is clearer (e.g. short bullet or expanded tagline). Content only; no new structural scope beyond what Phase 1 supports (subtitle + optional supporting text).

### 3. Horizontal navigation cues
- Strengthen affordances that more bots exist to the side: e.g. scroll hint visibility, timing, or light animation so horizontal scroll is obvious. No change to scroll mechanism (still CSS scroll-snap).

### 4. Success and post-submit
- Improve success confirmation: copy ("Welcome aboard!", "You've registered for [Bot Name]. We'll be in touch soon."), optional checkmark animation, and a clear "View registered users" button to Registered Users List. Modal auto-dismiss (e.g. 5s) and on click/tap as in designer plan; no new routes required.

### 5. Design and tech continuity
- Reuse Phase 1 stack (React, Tailwind, motion, design tokens). No new dependencies unless justified for conversion-only work. All changes must remain within DesignSystem and designer specs; any new copy or layout must pass a11y and responsive rules from Phase 1.

---

## Constraints (Non-Negotiable)

1. **Scope:** Conversion and clarity only. No new pages, no auth, no private lead management, no new product features.
2. **Design system:** All visuals and typography must stay within `DesignSystem.md` and Phase 1 designer plan; Phase 2 designer plan (when present) refines within that.
3. **Data and storage:** No change to lead schema or storage; no new backend or CRM.
4. **Accessibility and responsiveness:** WCAG AA and Phase 1 responsive behavior remain required; any new UI must comply.

---

## Technical Boundaries (Out of Scope)

- **Authentication, access control, or private registrant list:** Deferred to Phase 3.
- **New routes or main flows:** Only refinements to existing Home, Contact, success modal, and Registered Users List.
- **Backend/API changes:** Out of scope unless a tiny content/copy endpoint is agreed.
- **Payment, CRM, or bot access:** Out of scope.

---

*Architect: Yuri. Hand off to SW Manager via `manager-phase2.md` when PHASE=2.*
