# S.U.Y.O.G — Smart User Yielding Organized Growth

Smart Expense Splitter App

Objective:
Design and build a Smart Expense Splitter app that helps groups manage shared expenses seamlessly. The app should allow users to track, split, and manage shared costs in a way that simplifies group finances and keeps everyone on track.

Must-Have Features:
1. Add Expenses
   - Fields: Title (e.g., Dinner, Rent), Amount (e.g., ₹500), Who Paid (select from participants), Participants (multi-select).
   - Split Logic: Equal Split, Percentage Split, Custom Split (manual amounts per participant).
   - Validation for empty fields, percentage sum correctness, negative amounts.
   - Smart confirmation copy that uses S.U.Y.O.G branding (example: “Expense added — S.U.Y.O.G balance updated ⚖️”).

2. Summary Screen
   - Show net balances per user and a minimized set of settlements: list who owes whom and how much (e.g., “A owes B ₹300”).
   - Provide a clear, readable visualization (card/list) with ability to expand to see per-expense breakdown.
   - Implement a settlement minimization algorithm so the summary shows the smallest number of transfers necessary.

3. Data Persistence
   - Persist users, expenses, and settings in `localStorage` so the demo works without a backend.
   - Provide a “Reset Demo Data” action.

Good-to-Have Features:
- Payment Reminders with Memes: mock reminder flow with sample memes/placeholder image URLs and playful copy (S.U.Y.O.G branding).
- UPI “Pay Now” Concept Screen: a polished mock modal labeled “S.U.Y.O.G Payment Portal” showing UPI ID, amount due, and mock animated confirmation.
- Dark Mode Toggle with persisted preference.

Surprise Features (must simulate where needed):
- Gamification: Karma points for timely payments (+10), late (-5), leaderboard “S.U.Y.O.G Leaderboard — Grow Together”.
- AI Categorization (simulated): infer category from title (Pizza → Food, Cab → Travel). Use a mapping + fallback.
- Voice Input (simulated): lotus-shaped mic UI that accepts typed sample phrases such as “Add ₹200 chai by Raj” and parses them into new expense entries.
- Share Summary: copy full formatted settlement text to clipboard.

Design & Brand Requirements (must be applied everywhere)
Brand/Name: S.U.Y.O.G — Smart User Yielding Organized Growth. Use the full form in microcopy, tooltips, header, splash, and footer.

Art Direction:
- Full Indian-art inspired theme (soft, intricate): subtle Madhubani / Pattachitra / Warli / Mughal-miniature motifs used as background patterns, borders, and micro-detail — never heavy or noisy.
- Colors: Soft Ivory / Off-White background, Pastel Terracotta & Sandstone for cards, Peacock Blue (#1CA9C9) accents, Saffron/Marigold for calls-to-action, Deep Indigo / Charcoal for text, Jade/Green and Terracotta Red for borders.
- Typography: Elegant readable sans-serif for body + slightly stylized headings reminiscent of Devanagari curvature.
- Micro-interactions: smooth, fluid, and meditative (lotus bloom, ripple, petal/feather confetti). Implement via Framer Motion or CSS where appropriate.
- Unique Indian-art components (implement these visually + functionally):
  1. Mandala Expense Card — circular card that visually divides into petals representing participant shares; petals animate on hover and on split recalculation.
  2. Scroll-Painting Timeline — vertical, parallax-like expense history styled as an unrolling miniature painting scroll.
  3. Karma Chakra Leaderboard — circular wheel with slices per user; slice glow indicates karma.
  4. Peacock Feather Progress — progress bars shaped like peacock feather segments for percentage owed/paid.
  5. Temple-Arch Modals — modals framed as delicate temple arches with carved-border SVG motif.
  6. Lotus Voice Input — lotus mic UI with pulse when “listening”.
  7. Warli Iconography used as small decorative and functional icons.

Animation & Sound:
- Gentle ripple and bloom animations for add/settle actions. Confetti: peacock-feathers & lotus-petals. Optionally include a soft chime on successful payments (configurable and muted by default).

Technical Requirements (strict)
- Use Vite + React (TypeScript optional but prefer JS for simplicity unless you choose TypeScript consistently).
- Use TailwindCSS for styling (no external UI frameworks).
- Use Framer Motion for animated interactions.
- Use clean functional components and hooks. Folder layout must be standard:
  - `package.json` at repo root
  - `index.html` at repo root (Vite)
  - `src/` (React code), `public/` or `assets/` for images and fonts
- Provide `npm` scripts: `dev` (or `start`), `build`, `preview`.
- App should run after `npm install` → `npm run dev`.
- All imports must be relative. No generated code should be inside an extra parent folder. Cursor must commit files to repository root, not nested in another folder.
- No external backend — simulate AI features and voice parser client-side.
- Provide demo data preloaded: users (Raj, Meena, Arjun, Priya) and 6 sample expenses illustrating all split modes.

Functional Requirements & UX details
- Add Expense modal: select participants (avatars), choose split mode, show live preview of computed values, validate percent sums and custom amounts.
- Percentage split UI: slider + numeric input per user.
- Custom split UI: editable amounts per user.
- Summary: compute net positions and show optimized settlement steps (algorithm must reduce number of transactions). Include a “Settle All” mock flow that triggers Karma updates and confetti.
- Per-expense detail: show who paid, share breakdown, category (AI-categorized), and date.
- UPI Pay Now: mock flow that displays UPI ID, amount, animated coin or ripple, and on success updates balances and karma.
- Payment reminder: schedule simulated reminders with meme notification modal and quick-pay CTA.
- Voice Input: open lotus mic UI, accept typed test phrase, parse into expense (amount, title, payer) and animate insertion.
- Accessibility: semantic HTML, keyboard-focus visible, ARIA labels for important controls.
- Responsive: design mobile-first and ensure hero + mandala cards look great on small screens.

Developer Deliverables
1. Full React project at repo root with working UI and interactions described above.
2. `README.md` including project description (with problem statement), run instructions (`npm install`, `npm run dev`), features list, and deployment notes for Vercel/Netlify (root deploy-ready).
3. `package.json`, `index.html`, `.gitignore`, `src/`, `public/` or `assets/`.
4. Prefilled demo dataset in `src/data/demo.js` or similar.
5. All UI copy uses `S.U.Y.O.G` branding; include small brand manifesto on landing page:
   - Title: “S.U.Y.O.G — Smart User Yielding Organized Growth”
   - Tagline: “Where every expense finds harmony, and every friendship grows.”
6. Scripts: `dev`, `build`, `preview`.
7. Include a small “Export Summary” button that copies optimized settlement text to clipboard in human-readable format.
8. Include a `LICENSE` (MIT) and concise `CHANGELOG.md` top-line.

## Getting Started

```bash
npm install
npm run dev
```

- Dev server: `http://localhost:5173`
- Build: `npm run build`
- Preview: `npm run preview`

## Deploying (Vercel/Netlify)
- Deploy the repo root as the project.
- Build command: `npm run build`
- Output directory: `dist`

