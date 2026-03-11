# Developer Log — Phase 3

**Developer:** Sarah  
**Phase:** 3  
**Date:** March 11, 2026  
**Status:** READY FOR MANAGER GATE

---

## Implemented Milestones

### M0 — Backend Foundation and Lead Persistence

- Backend service in `server/`: Express, CORS, JSON body. `POST /api/leads` (accept lead, persist to `server/data/leads.json`), `GET /api/leads` (list; auth added in M1).
- Store: `server/store.js` — `getAllLeads()`, `addLead()`; file-based JSON; lead shape: id, fullName, phoneNumber, selectedBot, timestamp.
- Frontend: `src/lib/leadApi.ts` — `submitLead()`, `getLeads()` using env `VITE_API_URL` or relative `/api` in dev (Vite proxy). Contact form submits via API; success modal unchanged. Async submit with loading/error state in `ContactForm`.
- Config: `.env.example` and `server/.env.example` document API URL and backend secrets (no real values). Root `package.json` scripts: `server`, `server:start`.

### M1 — Access Control and Protected Registrants List

- Auth: `express-session` + `cookie-parser`; `ADMIN_PASSWORD` and `SESSION_SECRET` from env. `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout`. `requireAuth` middleware on `GET /api/leads` (and export in M3).
- Frontend: `AuthProvider` (`contexts/AuthContext.tsx`), `useAuth` (`contexts/useAuth.ts`), context def in `contexts/authContextDef.ts`. Login page at `/login`; protected route `/registrants` (RegisteredUsersPage); `/registered-users` redirects to `/login`.
- Nav: “Registrants” and “Log out” when authenticated; “Log in” when not. No list link for unauthenticated users.

### M2 — Private Registrants List and Lead Workflow (View)

- List API: `GET /api/leads` (auth required) returns leads sorted by timestamp descending.
- Frontend: RegisteredUsersPage on `/registrants` fetches via `getLeads()`; same columns and UX (UsersTable). 401/403 triggers logout and redirect. Loading and error states preserved.

### M3 — Export (CSV / JSON)

- Backend: `GET /api/leads/export?format=csv|json` (auth required). CSV: header row + escaped rows; JSON: array of lead objects. Same auth as list.
- Frontend: “Export CSV” and “Export JSON” on registrants page; trigger download via fetch + blob. Buttons visible only on protected page (authenticated). 401 on export triggers logout.

### M4 — Optional Direct Access to Selected Bot

- `src/lib/botLinks.ts`: `getBotLink(botId)` reads `VITE_BOT_LINKS` (JSON map). Success modal accepts `selectedBotId`; shows “Go to [Bot Name]” link when URL configured. ContactPage passes `successBotId` to SuccessModal.
- Documented in `.env.example` and `doc-phase3.md`.

### M5 — Security Hardening, Polish, and Documentation

- HTTPS and secrets documented in `doc-phase3.md` (production HTTPS; secrets in env; no credentials in client or repo). Retention/PII section added.
- Lint: ESLint clean (zero warnings). Tests: Vitest; added `leadApi.test.ts` (submit, getLeads, export, 401), `botLinks.test.ts`; updated ContactForm test for async submit; NavBar test with AuthProvider and unauthenticated state. All 27 tests pass.
- `docs/doc-phase3.md`: scope, backend, auth, env, deployment, retention, optional bot links. `team-Yuri/devlog-phase3.md`: this log.

---

## Quality Checks

- Unit tests passing: Yes (27 tests)
- Lint clean: Yes

---

## Developer Declaration

- Implementation complete: Yes  
- Phase 1/2 public behaviour preserved for unauthenticated users: Yes  
- READY FOR MANAGER GATE
