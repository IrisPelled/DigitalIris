# Phase 3 — Technical Documentation (Production Readiness)

**Phase:** 3  
**Date:** March 11, 2026

**Base:** Phase 1 and Phase 2. See `docs/doc-phase1.md` and `docs/doc-phase2.md` for frontend setup, design system, and conversion UX.

---

## Phase 3 Scope

- **Private lead management:** Registrants list is not publicly visible; only authenticated staff can view or export leads.
- **Backend:** Lead submission (POST) and list/export (GET) via API; persistence in JSON file store (production can use DB).
- **Auth:** Staff login (password); session cookie; protected route for list and export.
- **Export:** CSV and JSON download for authenticated users.
- **Optional:** “Go to [Bot Name]” after registration via configurable per-bot URLs (env).
- **Security:** HTTPS in production; secrets and API URL from environment; no credentials in client or repo.

Public flows (Home, Contact, form submit, success modal) remain unchanged for unauthenticated users.

---

## Backend

- **Location:** `server/` (Node.js, ESM).
- **Stack:** Express, cors, cookie-parser, express-session.
- **Endpoints:**
  - `POST /api/leads` — Submit lead (public). Body: `{ fullName, phoneNumber, selectedBot }`. Returns 201 + lead with `id`, `timestamp`.
  - `GET /api/leads` — List leads (auth required). Returns array sorted by timestamp descending.
  - `GET /api/leads/export?format=csv|json` — Export leads (auth required). CSV: header + rows; JSON: array of lead objects.
  - `POST /api/auth/login` — Body: `{ password }`. Sets session cookie on success.
  - `GET /api/auth/me` — Returns 200 if authenticated.
  - `POST /api/auth/logout` — Destroys session.
- **Store:** `server/data/leads.json` (created on first write). Same lead shape: `id`, `fullName`, `phoneNumber`, `selectedBot`, `timestamp`. Production may replace with DB (e.g. Postgres); document connection and migrations separately.

---

## Auth

- **Mechanism:** Session-based. Admin password compared to `ADMIN_PASSWORD` env; on success `express-session` sets an httpOnly cookie. Session secret from `SESSION_SECRET`.
- **Protected routes:** `GET /api/leads` and `GET /api/leads/export` use `requireAuth` middleware; 401 if not authenticated.
- **Frontend:** `AuthProvider` (context) checks `GET /api/auth/me` on load; `useAuth()` exposes `isAuthenticated`, `login`, `logout`. Protected UI route: `/registrants`; unauthenticated users are redirected to `/login`. Old public `/registered-users` redirects to `/login`.
- **Nav:** “Registrants” and “Log out” only when authenticated; “Log in” when not. No list/export links for unauthenticated users.

---

## Env and Secrets

- **Frontend (Vite):**
  - `VITE_API_URL` — API base URL (no trailing slash). In dev, omit to use Vite proxy `/api` → `http://localhost:3001`.
  - `VITE_BOT_LINKS` — Optional JSON map of bot id → URL for “Go to [Bot Name]” (e.g. `{"digital-iris":"https://..."}`).
- **Backend (`server/.env`):**
  - `PORT` — Server port (default 3001).
  - `SESSION_SECRET` — Strong random string for session signing (required in production).
  - `ADMIN_PASSWORD` — Staff password for list/export (no default in production).
- **Secrets:** Not stored in repo or client. Use `.env` (gitignored) and `.env.example` with placeholders only. Rotate `SESSION_SECRET` and `ADMIN_PASSWORD` per environment; document rotation (e.g. manual or secret manager).

---

## Deployment

- **HTTPS:** Production must serve app and API over HTTPS. Dev may use HTTP (e.g. Vite and backend on localhost).
- **Running:** Frontend: `npm run build` then serve `dist/` (or host’s static + API proxy). Backend: `cd server && npm install && npm start` (or `npm run server:start` from repo root). Ensure `NODE_ENV=production`, `SESSION_SECRET` and `ADMIN_PASSWORD` set.
- **Same-origin (cookies):** In production, serve API under same origin as the app (e.g. reverse proxy `/api` → backend) so session cookies work without cross-origin config.

---

## Retention and PII

- **Lead data:** Stored in backend (e.g. `server/data/leads.json`). Fields: full name, phone number, selected bot, timestamp (and id). This is PII.
- **Access:** Only authenticated staff (password-protected) can view or export. No public access to list or export.
- **Retention:** Retain only as long as needed for follow-up and handoff (e.g. to CRM). No automated deletion in Phase 3; document retention window and process (e.g. periodic purge or export-then-delete). No full GDPR flows (consent UI, portability, deletion) unless explicitly scoped.

---

## Optional: “Go to [Bot Name]”

- **Config:** `VITE_BOT_LINKS` JSON: keys = bot ids from `botData`, values = full URLs. Example: `{"digital-iris":"https://app.example.com/iris"}`.
- **UX:** After successful registration, success modal shows “Go to [Bot Name]” only if a URL is configured for that bot; opens in new tab. Entry point only; no in-app bot conversation in this app.

---

## Non-Regression

Phase 1 and Phase 2 behaviour for unauthenticated users is unchanged: Home, Contact, form submit, success modal, design system, a11y, responsive. List and export are only available after login.
