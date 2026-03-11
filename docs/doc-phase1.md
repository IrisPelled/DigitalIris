# Phase 1 — Technical Documentation

**Phase:** 1  
**Date:** March 11, 2026

---

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build:** Vite 5
- **Styling:** Tailwind CSS with custom design tokens (blue-black base, deep shadow, cyan/purple/magenta accents)
- **Motion:** Motion (framer-motion) for BeamsBackground and Contact page transitions; `prefers-reduced-motion` respected
- **Routing:** React Router v6 (BrowserRouter)
- **Icons:** Lucide React
- **Fonts:** Google Fonts — Dancing Script (700), Space Grotesk (variable 300–700)

---

## Project Structure

```
src/
├── app/                 # Route pages
│   ├── HomePage.tsx      # Horizontal bot showcase (4 panels, parallax, audio, CTA)
│   ├── ContactPage.tsx   # Bot chooser, hero preview, contact form
│   └── RegisteredUsersPage.tsx
├── components/
│   ├── AppLayout.tsx     # NavBar + outlet
│   ├── NavBar.tsx
│   ├── BeamsBackground.tsx
│   ├── BotPanel.tsx      # Home panel: scene frame, bot character, overlay
│   ├── BotChooserCard.tsx
│   ├── AudioPlayButton.tsx
│   ├── CTAButton.tsx     # Ripple + glassmorphism + optional navigation
│   ├── ContactForm.tsx
│   ├── SuccessModal.tsx
│   └── UsersTable.tsx    # Populated table or empty state
├── lib/
│   ├── utils.ts          # cn()
│   ├── botData.ts        # BOTS array + BotInfo type
│   ├── useAudio.ts       # Single-audio-at-a-time hook
│   └── leadStorage.ts    # localStorage lead persistence (key: iris_leads)
└── test/
    └── setup.ts          # @testing-library/jest-dom
```

---

## How to Run

- **Dev:** `npm run dev` — Vite dev server at http://localhost:5173
- **Build:** `npm run build` — TypeScript check + Vite build to `dist/`
- **Lint:** `npm run lint` — ESLint (zero warnings)
- **Tests:** `npm run test` — Vitest; `npm run test:watch` for watch mode

---

## Routes

| Path | Page |
|------|------|
| `/` | Home — horizontal (desktop/tablet) or vertical (mobile) bot showcase |
| `/contact` | Contact — bot chooser, hero preview, form; supports `?bot=<id>` pre-selection |
| `/registered-users` | Registered Users List — table of leads or empty state |

---

## Key Architectural Decisions

1. **Persistence:** localStorage under key `iris_leads`; JSON array of lead objects. No backend in Phase 1.
2. **Audio:** Single global playback via `useAudio()`; only one bot audio plays at a time; user-initiated only.
3. **Parallax:** Horizontal scroll offset (or vertical on mobile) drives `translate3d` on scene frame (0.6×) and bot character (0.8×). Disabled when `prefers-reduced-motion: reduce`.
4. **Beams:** Canvas-based animated beams; animation disabled when `prefers-reduced-motion` is set.
5. **Assets:** Served from `public/assets/` (svgs, images, audio). WAV files used as-is; manager noted optional MP3/OGG conversion for production.

---

## Data Model

**Lead (localStorage):**

- `id`: string (crypto.randomUUID or fallback)
- `fullName`: string
- `phoneNumber`: string
- `selectedBot`: string (bot id from botData)
- `timestamp`: string (ISO)

---

## Known Limitations

- No authentication or access control; Registered Users List is public.
- No CRM or email integration; leads are prototype-only.
- Bot SVGs are large (~2.5–3.2 MB each); lazy-loaded per panel via Intersection Observer.
- Audio is WAV; consider MP3/OGG for smaller payload and broader support.
- No i18n; English only.
