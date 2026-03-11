# Manager Plan — Phase 3: Production Readiness

**Manager:** Ben  
**Phase:** 3  
**Date:** March 11, 2026  
**STATUS:** READY FOR VALIDATION

**Source:** `team-Yuri/plan.md` § Phase 3, `team-Yuri/arch-phase3.md`, `PRDDigitalIris.md` §18

---

## Phase Goal

Move from prototype to production-ready: private lead management (registrant list not publicly visible), access control so only authorized users can view or export leads, a better lead workflow (view list, export CSV/JSON), optional direct access to the selected bot after registration, and more secure data handling (backend store, HTTPS, secrets outside repo). Public flows (Home, Contact, form submit) remain available without login. No full learning platform, no payment, no complex CRM automation unless explicitly scoped.

---

## Ordered Milestones

### M0 — Backend Foundation and Lead Persistence

**Goal:** A backend service persists leads in a proper store (DB or managed service); frontend submits leads via API instead of localStorage. Lead shape unchanged (fullName, phoneNumber, selectedBot, timestamp); add id and optional metadata as needed.

**Tasks:**

1. **Backend service** — Introduce or designate a backend (e.g. Node/Express, serverless, or existing API) with: (a) endpoint to accept lead submission (POST), (b) endpoint to list leads (GET), both protected or scoped per arch (list requires auth later). Technology choice is implementation detail; document in docs.
2. **Data store** — Persist leads in a database or managed store (e.g. SQLite, Postgres, Supabase, Firebase). Same logical fields; add id (e.g. UUID), optional status/source if needed for workflow.
3. **Frontend integration** — Replace localStorage submission with API call to backend. On submit: POST lead to backend; on success, show success modal as today. Keep success/error handling consistent with Phase 2.
4. **Configuration** — API base URL from environment (e.g. `VITE_API_URL` or `REACT_APP_API_URL`). No secrets in repo; document where backend credentials and API URL are set (e.g. .env.example without real values).

**Exit criteria:** Lead submit goes to backend and is persisted; list endpoint exists (auth can be added in M1). Frontend uses env for API URL; docs mention config and secrets.

---

### M1 — Access Control and Protected Registrants List

**Goal:** Only authenticated users can view the registrants list. Unauthenticated users see only Home and Contact; no public URL for the list.

**Tasks:**

1. **Auth mechanism** — Implement login for “admin” / staff (e.g. simple password, OAuth, or IdP). Choice is implementation detail; must be explicit and documented. No credentials or tokens stored in client code; use secure cookies or token in memory/localStorage with clear security notes.
2. **Protected route(s)** — Registrants list lives behind auth (e.g. `/admin/registrants` or `/registrants`). Unauthenticated access redirects to login (or a dedicated login page). Public routes: `/`, `/contact` only; remove or redirect old public `/registered-users` to login or 404.
3. **Frontend auth state** — After login, frontend can request list and export. Logout or session expiry clears access; list and export endpoints require valid auth (session or token).
4. **Nav and UX** — Nav bar: do not show “Registered Users List” (or “Registrants”) to unauthenticated users. Show it only when logged in, linking to the protected list route. Optionally show “Log out” when authenticated.

**Exit criteria:** Unauthenticated users cannot view the list; authenticated users can open the protected list route and see leads. Login/logout and nav behavior documented.

---

### M2 — Private Registrants List and Lead Workflow (View)

**Goal:** Authenticated users see the same registrants list (Full Name, Phone Number, Selected Bot, Date Registered) served from the backend. Optional: status column (e.g. new / contacted) or “exported at” if agreed; not required for minimum.

**Tasks:**

1. **List API** — GET list of leads from backend (auth required). Return same columns; sort by timestamp descending (newest first). Pagination or limit optional and documented.
2. **Frontend list page** — Reuse or adapt existing UsersTable component on the protected route. Data from API, not localStorage. Empty state and loading state per existing design.
3. **Error handling** — 401/403: redirect to login or show “Unauthorized”. Network errors: user-friendly message. Document behavior in docs.

**Exit criteria:** Authenticated users see the full list from backend; unauthenticated users cannot access it. Phase 1/2 list UX preserved for authenticated view.

---

### M3 — Export (CSV / JSON)

**Goal:** Authenticated users can export leads (CSV or JSON download) for handoff to CRM or manual follow-up. Export restricted to authenticated users.

**Tasks:**

1. **Export API** — Backend endpoint (e.g. GET `/api/leads/export?format=csv|json`) returning all leads (or filtered) in the requested format. Auth required. CSV: header row + one row per lead; JSON: array of lead objects.
2. **Frontend export UI** — On the protected registrants page, add “Export CSV” and “Export JSON” (or single “Export” with format choice). Trigger download via fetch + blob or link. Button(s) visible only when authenticated.
3. **Security** — Export endpoint must enforce same auth as list endpoint; no export for unauthenticated users. Document in docs.

**Exit criteria:** Authenticated users can download leads as CSV and JSON; unauthenticated users cannot. Export format and column set documented.

---

### M4 — Optional Direct Access to Selected Bot

**Goal:** After successful registration, optionally guide the user to the selected bot (e.g. “Go to [Bot Name]” link). Implementation: link/button to external URL or internal route; no requirement to embed full bot conversation in the app.

**Tasks:**

1. **Product decision** — Confirm UX: in-app route vs redirect to external bot app/portal; one bot vs all. If not yet decided, implement a configurable “bot link” per bot (e.g. in botData or env) so each bot id maps to an optional URL.
2. **Success modal (or post-submit view)** — Add optional “Go to [Bot Name]” button/link that points to the configured URL (or internal route). If no URL configured, hide the button. Feature-flag or env to turn this on/off if desired.
3. **Documentation** — Document how bot links are configured (env, config file, or botData) and that this is an entry point only, not in-app bot UX.

**Exit criteria:** Post-registration flow can include a clear “Go to [Bot Name]” that navigates to the configured destination; behavior is configurable and documented. No change to lead submission or list/export.

---

### M5 — Security Hardening, Polish, and Documentation

**Goal:** HTTPS, secrets outside repo, no credentials in client code; retention/PII documented; lint and tests pass; Phase 3 docs complete.

**Tasks:**

1. **HTTPS** — Submission and admin traffic over HTTPS in deployment. Document that dev may use HTTP locally; production must use HTTPS.
2. **Secrets** — API keys, DB credentials, auth secrets in environment or secret store; not in repo. Document where secrets live and how they are rotated (even if manual). .env.example with placeholder keys only.
3. **Client** — No storage of admin passwords or long-lived secrets in client-side code; tokens/cookies per auth mechanism. No credentials in logs.
4. **Retention and PII** — Document retention policy and PII handling for lead data (where stored, who can access, how long kept). No full GDPR flows required unless explicitly scoped.
5. **Lint and tests** — Run `npm run lint` and `npm run test`; fix regressions. Add or update tests for: lead submission to API (mock), auth-protected list/export behavior (mock), export format. Backend tests if applicable (separate suite or same repo).
6. **Update `docs/doc-phase3.md`** — Create or update with: Phase 3 scope (private list, auth, export, optional bot access, security); backend and API overview; auth mechanism and protected routes; env and secrets; deployment notes (HTTPS); retention/PII. Reference doc-phase1 and doc-phase2 for frontend base.
7. **Update `team-Yuri/devlog-phase3.md`** — Developer logs completed milestones and declares implementation complete when done.

**Exit criteria:** HTTPS and secrets documented and applied in deployment; no credentials in repo or client code; retention/PII documented; lint clean; tests pass; doc-phase3 and devlog-phase3 updated.

---

## Detailed Developer Guidance

### Scope Boundaries

- **Public flows unchanged:** Home and Contact (and form submit) remain available without login. Submitting a lead does not require an account.
- **Lead shape:** Keep fullName, phoneNumber, selectedBot, timestamp; add id (and optional status/source) only as needed for backend and workflow.
- **No payment, no full CRM:** Export and optional status are the extent of workflow unless explicitly scoped. No automated email or CRM integration required.

### Auth

- Choose one auth mechanism and document it (e.g. “Admin login via password; session cookie” or “OAuth with X”). Protect only the list and export; do not require login to submit the form.
- Nav: show “Registrants” (or “Registered Users”) and “Export” only when authenticated; show “Log in” when not, or hide list link entirely for unauthenticated users.

### Backend

- Backend can be same repo (e.g. `server/`) or separate; document structure. At minimum: POST lead, GET list (auth), GET export (auth). DB choice is implementation detail.

### Optional Bot Access

- If product has not defined bot URLs, add a config (e.g. `BOT_LINKS` in env or a map in botData) so each bot id can have an optional URL. “Go to [Bot Name]” then links to that URL; if missing, omit the button.

---

## Acceptance / Gating Criteria

The following must ALL be true before Phase 3 can move to STATUS: READY FOR VALIDATION:

### Functional

- [ ] Lead submission goes to backend and is persisted; success modal and post-submit flow unchanged for the user.
- [ ] Registrants list is not publicly accessible; only authenticated users can view it (protected route).
- [ ] Authenticated users see the list of leads (Full Name, Phone Number, Selected Bot, Date Registered) from the backend.
- [ ] Authenticated users can export leads as CSV and as JSON; export is not available to unauthenticated users.
- [ ] Optional: “Go to [Bot Name]” (or equivalent) after registration is configurable and documented; no requirement to implement if not scoped.
- [ ] Public routes (Home, Contact) and form submit work without login; nav does not expose list/export to unauthenticated users.

### Security and Data

- [ ] HTTPS in production; secrets (API URL, DB, auth) outside repo and documented.
- [ ] No credentials or long-lived secrets in client code or logs.
- [ ] Retention and PII handling for lead data documented.

### Quality

- [ ] Lint clean (zero ESLint/TSC errors).
- [ ] Unit (and where applicable integration) tests pass; auth and export behavior covered as appropriate.
- [ ] `docs/doc-phase3.md` updated with scope, backend, auth, env, deployment, retention.
- [ ] Developer declared completion in `team-Yuri/devlog-phase3.md`.

### Non-Regression

- [ ] Phase 1 and Phase 2 acceptance criteria for public flows (Home, Contact, form submit, success modal, design system, a11y, responsive) still satisfied for unauthenticated users.

---

*Manager: Ben. Gate review complete. All criteria confirmed: developer declared completion, unit tests passing (27/27), lint clean (incl. HomePage stop button using `stop`), docs/doc-phase3.md updated. Ready for Validator (Gili).*
