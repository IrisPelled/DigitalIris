# Architecture — Phase 3: Production Readiness

**Phase:** 3  
**Source:** `team-Yuri/plan.md` § Phase 3, `PRDDigitalIris.md` §18

---

## Phase Goal

Move from prototype to production-ready: private lead management (registrant data not publicly visible by default), access control for who can view or export leads, a better lead workflow (e.g. export, handoff to CRM or internal tools), optional direct access flow to the selected bot after registration, and more secure data handling and storage. Phase 3 does not deliver a full learning platform; it makes the showcase and lead pipeline production-suitable.

---

## Architectural Decisions

### 1. Private lead management
- **Registered Users List:** No longer public by default. Visibility of the list is gated by access control (see below). Public-facing app retains Home and Contact only; list is an internal or authenticated view.
- **Lead data location:** Move from prototype storage (e.g. localStorage or single JSON) to a proper backend store (database or managed service). Leads remain the same logical shape: fullName, phoneNumber, selectedBot, timestamp; add minimal metadata as needed (e.g. id, source, status) for workflow only.
- **Retention and privacy:** Define retention policy and handling of PII; document in docs. No requirement to implement full GDPR flows in Phase 3 unless explicitly scoped; at minimum, secure storage and access control.

### 2. Access control
- **Principle:** Only authorized users (e.g. internal staff, admins) can view or export registrant data. Unauthenticated users see only the showcase (Home, Contact) and submit leads; they do not see the list.
- **Mechanism:** Introduce an authenticated area (e.g. /admin or /registrants) protected by login. Auth mechanism is left to implementation (e.g. simple password, OAuth, or IdP); must be explicit and documented. No public registrants list URL for unauthenticated users.
- **Scopes:** (a) Public: Home, Contact, form submit. (b) Authenticated: view registrants list, optional export (CSV/JSON), optional “mark as contacted” or status if in scope. No payment or billing in Phase 3.

### 3. Lead workflow
- **View:** Authenticated users can view the list of leads (same columns: Full Name, Phone Number, Selected Bot, Date Registered; optional status if agreed).
- **Export:** Provide export of leads (e.g. CSV or JSON download) for handoff to CRM or manual follow-up. Export restricted to authenticated users.
- **Optional enhancements:** Simple status (e.g. new / contacted) or “exported at” timestamp if they improve workflow; not required for Phase 3 minimum. No built-in CRM or email sending required unless explicitly scoped.

### 4. Optional direct access to selected bot
- **Intent:** After successful registration, optionally guide the user to the selected bot (e.g. link out to bot app, chat entry point, or portal). This is an optional Phase 3 feature; exact UX (in-app vs redirect, one bot vs all) is product decision.
- **Implementation:** May be a post-confirmation link/button (“Go to [Bot Name]”) pointing to an external URL or internal route; no requirement to embed full bot conversation in the showcase app. Architecture must allow this flow without blocking other Phase 3 work; concrete UX is refined in manager/designer plan.

### 5. Secure data handling
- **In transit:** All submission and admin traffic over HTTPS.
- **At rest:** Lead data stored in a backend with access control; no storage of credentials or sensitive data in client-side storage for admin. Passwords or tokens for admin auth must not be logged or exposed.
- **Secrets:** API keys, DB credentials, and auth secrets in environment or secret store; not in repo. Document where secrets live and how they are rotated (even if manual).
- **Least privilege:** Backend/DB access for the app limited to what is needed for lead CRUD and auth; no broad DB or admin rights by default.

### 6. Stack and deployment
- **Backend:** Introduce or designate a backend (e.g. Node/Express, serverless functions, or existing API) for: lead persistence, list read, export, and auth checks. Technology choice is implementation detail; arch constrains behavior, not language.
- **Frontend:** Existing React app; add authenticated route(s) for registrants list and export. Reuse Phase 1/2 design system and a11y standards.
- **Deployment:** App and backend deployed with HTTPS; env-based configuration for API URL and feature flags (e.g. “direct bot access” on/off). No specific hosting prescribed.

---

## Constraints (Non-Negotiable)

1. **Lead visibility:** Registrant list is not publicly accessible; only authenticated users can view or export it.
2. **Data shape:** Lead entity remains at least: fullName, phoneNumber, selectedBot, timestamp. Add only fields needed for workflow or auth.
3. **Public flows:** Home and Contact (and form submit) remain available to unauthenticated users; no login required to submit a lead.
4. **Security baseline:** HTTPS, secrets outside repo, access-controlled lead storage, no credentials in client code.
5. **Scope boundary:** Production readiness and lead management only. No full learning platform, no payment, no complex CRM automation unless explicitly added to scope.

---

## Technical Boundaries (Out of Scope)

- **Full learning platform or in-app bot conversation:** Optional “direct access” is link/redirect or simple entry point, not full bot UX inside this app.
- **Payment or billing:** Out of scope.
- **Advanced CRM (automated campaigns, integrations):** Out of scope unless explicitly scoped; manual export and handoff are in scope.
- **Full GDPR/consent UI (cookie banners, data portability, right to deletion):** Document retention and PII handling; implement only if explicitly required for Phase 3.
- **Multi-tenant or per-school isolation:** Out of scope unless specified by product.

---

*Architect: Yuri. Hand off to SW Manager via `manager-phase3.md` when PHASE=3.*
