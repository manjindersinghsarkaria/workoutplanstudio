# WorkoutPlan Studio — Monetization Progress Tracker

**Site:** https://www.workoutplanstudio.ca
**Repo:** `manni-gym-coach/` (React + Vite + TailwindCSS, deployed on Vercel)
**Last Updated:** 2026-06-17

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19.2.4 |
| Build Tool | Vite 8.0.0 |
| Styling | TailwindCSS 3.4.17 |
| Routing | react-router-dom 7.13.1 |
| Local DB | Dexie 4.0 (IndexedDB wrapper) |
| Icons | lucide-react |
| Deployment | Vercel (SPA rewrite via vercel.json) |
| Analytics | Google Analytics 4 (VITE_GA_MEASUREMENT_ID) |
| PWA | Service worker + manifest |

---

## Existing Routes (as of Phase 2 complete)

| Route | Component | Notes |
|-------|-----------|-------|
| `/` | LandingPage | Marketing hero |
| `/app` | App | Main workout app (Workout/Plan/History tabs) |
| `/blog` | BlogIndexPage | Blog listing with JSON-LD Blog schema |
| `/blog/:slug` | BlogPostPage | Individual post with JSON-LD Article schema |
| `/plans` | PlanTemplatesIndexPage | Templates library with JSON-LD CollectionPage |
| `/plans/:slug` | PlanTemplatePage | Individual template with JSON-LD Article schema |
| `/tools/1rm-calculator` | OneRmCalculatorPage | Epley 1RM calculator with percentage table + JSON-LD |
| `/tools/rest-timer` | RestTimerPage | Standalone rest timer with presets + beep + JSON-LD |
| `/tools/volume-calculator` | VolumeCalculatorPage | Weekly sets tracker with MEV/MAV landmarks + JSON-LD |
| `/sample-plans` | SamplePlansPage | Sample plans showcase |
| `/guide` | GuidePage | User guide |
| `/faq` | FaqPage | FAQ page |
| `/privacy` | PrivacyPolicyPage | Privacy policy |

---

## Key Data Files

| File | Contents |
|------|----------|
| `src/data/blogPosts.js` | 8 SEO blog articles |
| `src/data/planTemplates.js` | 10 pre-built plan templates |
| `src/data/appSamplePlans.js` | 4 sample plans (beginner/intermediate) |
| `src/data/exerciseLibrary.js` | 150+ exercises with instructions, formTips, mediaUrl, alternates |

---

## Monetization Roadmap

---

### PHASE 1 — SEO Content

> **Goal:** Build enough content to qualify for Google AdSense.

- [x] **Task 1 — /blog section with 8 SEO articles** ✅ DONE (2026-06-13)
  - Files: `src/data/blogPosts.js`, `src/components/pages/BlogIndexPage.jsx`, `src/components/pages/BlogPostPage.jsx`
  - Routes: `/blog`, `/blog/:slug`
  - 8 articles: `how-to-create-a-workout-plan`, `push-pull-legs-split`, `531-workout-program`, `bro-split-workout`, `progressive-overload`, `sets-and-reps-for-muscle-growth`, `3-day-full-body-workout`, `upper-lower-split`
  - JSON-LD Article schema on each post; Blog schema on index

- [x] **Task 2 — 10 pre-built plan template pages** ✅ DONE (2026-06-13)
  - Files: `src/data/planTemplates.js`, `src/components/pages/PlanTemplatesIndexPage.jsx`, `src/components/pages/PlanTemplatePage.jsx`
  - Routes: `/plans`, `/plans/:slug`
  - 10 plans: `push-pull-legs-6-day`, `bro-split-5-day`, `531-wendler`, `upper-lower-4-day`, `stronglifts-5x5`, `starting-strength`, `phul-power-hypertrophy`, `arnold-split`, `gzclp`, `beginner-full-body-3-day`
  - JSON-LD Article schema on each page; CollectionPage schema on index
  - "Use This Plan" button to load template directly into the app

- [x] **Task 3 — JSON-LD schema markup** ✅ DONE (included in Tasks 1 & 2)

- [ ] **Task 4 — Reapply to Google AdSense**
  - Prerequisites: Tasks 1–3 done ✅
  - Action: Submit https://www.workoutplanstudio.ca to AdSense for review

---

### PHASE 2 — AI + Core Features

> **Goal:** Add real AI value and sharing to the app.

- [x] **Task 5 — In-app AI plan generator form** ✅ DONE
  - Location: `src/components/views/PlanView.jsx`
  - The app generates a detailed JSON-format prompt based on user preferences
  - User copies prompt → pastes into ChatGPT/Claude/Gemini → pastes JSON back
  - Validates and normalizes the returned JSON via `src/helpers.js`
  - Note: This is a "prompt-assist" flow (no direct API call to Claude), not a server-side AI call

- [x] **Task 6 — Exercise video links** ✅ DONE
  - Each exercise in `src/data/exerciseLibrary.js` has a `mediaUrl` field
  - Displayed in WorkoutView during active workouts

- [x] **Task 7 — Shareable plan URLs** ✅ DONE (2026-06-13)
  - File: `src/utils/sharePlan.js`
  - Plans are base64-encoded into the URL hash
  - Share button added to PlanView
  - "Use This Plan" from template pages loads directly into app

---

---

### APP QUALITY IMPROVEMENTS (2026-06-17)

> Bug fixes and UX enhancements shipped as v1.3.0 and v1.4.0.

- [x] **Back-button guard** ✅ DONE (2026-06-17)
  - `history.pushState` sentinel + `popstate` listener in `src/App.jsx`
  - If user swipes back during an active workout, a modal asks "Leave?" instead of silently navigating away

- [x] **Workout progress persistence across navigation** ✅ DONE (2026-06-17)
  - `progressMap`, `weightsMap`, `selectedDayId` now stored in `sessionStorage`
  - Hydrated on mount so back-navigation no longer resets the active workout to Day 1

- [x] **Rest timer override** ✅ DONE (2026-06-17)
  - Preset chips (Plan · 30s · 45s · 60s · 90s · 2m · 3m) added to the floating timer pill
  - Selected duration persisted to `localStorage` (`mgc_rest_override`)
  - Overrides plan-default rest across `completeSet()` and the reset button
  - Rest badge in exercise header reflects effective duration with a `✎` indicator when overridden

- [x] **Weight logging fix** ✅ DONE (2026-06-17)
  - `saveSession()` legacy path now populates `setLogs` from `weightsMap` via `parseWeightEntry()`
  - History detail view shows actual weights instead of `—` for every set
  - Removed broken `setHistoryLog` raw-entry pollution in `completeSet()` that was writing wrong-shaped objects into the `CompletedSession` array

- [x] **PWA icons, favicon, manifest overhaul** ✅ DONE (2026-06-13)
  - Branded PNG icons generated via RealFaviconGenerator
  - Manifest updated with correct icon paths and display settings

- [x] **Session history 100% completion fix** ✅ DONE (2026-06-13)
  - Fixed `completionPercent` calculation that was capping at 96% instead of 100%

---

### PHASE 3 — Accounts & Persistence

> **Goal:** Add user accounts so plans persist across devices and sessions.
>
> **Decision (2026-06-17):** Cloud auth (Clerk/Supabase) was evaluated and removed due to
> data security liability concerns. Tasks 10 & 11 have been implemented as local-first
> alternatives (on-device IndexedDB). Tasks 8 & 9 remain open if auth is revisited later.

- [ ] **Task 8 — Google/email sign-in (Supabase Auth)**
  - Install: `@supabase/supabase-js`
  - Create Supabase project, enable Google OAuth
  - Add sign-in/sign-out UI in Header or a new AuthPage
  - Store `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`

- [ ] **Task 9 — Save plans to user profile**
  - Create `plans` table in Supabase (user_id, plan_json, name, created_at)
  - Replace/augment Dexie IndexedDB with Supabase for logged-in users
  - Sync on login (merge local + remote plans)

- [x] **Task 10 — Workout logging (sets, reps, weight)** ✅ DONE locally (2026-06-17)
  - `completedSessions` Dexie table added (v2 schema in `src/services/planService.js`)
  - Sessions persist to IndexedDB on save and hydrate on app mount
  - Weight per set now correctly written to `setLogs` via `parseWeightEntry()` in `src/helpers.js`
  - HistoryView shows session list filtered to last 14 days
  - Note: data is device-only; cross-device sync requires Task 8/9

- [x] **Task 11 — Personal records tracker** ✅ DONE locally (2026-06-17)
  - `calcPersonalRecords()` added to `src/utils/workoutDerived.ts`
  - Derives best weight per exercise across all-time history (not filtered by 2-week window)
  - Shown as an amber "Your Best Lifts" card above the session list in HistoryView

---

### PHASE 4 — Monetization

> **Goal:** Generate revenue via subscriptions and affiliates.

- [ ] **Task 12 — Stripe subscriptions ($7 CAD/month Pro)**
  - Install: `@stripe/stripe-js`
  - Create Stripe account, set up product + price (CAD $7/mo)
  - Need a backend endpoint (Vercel serverless function) to create checkout sessions
  - Store `VITE_STRIPE_PUBLISHABLE_KEY` in `.env`, `STRIPE_SECRET_KEY` server-side only
  - Create `/pricing` page and `/checkout` flow

- [ ] **Task 13 — Gate premium features behind Pro tier**
  - After Supabase Auth (Phase 3), store `is_pro` flag on user record
  - Webhook from Stripe updates Supabase on subscription events
  - Wrap Pro-only components with `<ProGate>` component

- [ ] **Task 14 — PDF export (Pro only)**
  - Library: `jspdf` or `react-pdf`
  - Export current plan as formatted PDF
  - Gate behind Pro tier check

- [x] **Task 15 — Affiliate product links** ✅ DONE (2026-06-17)
  - `src/data/affiliateProducts.js` — catalogue of 12 products, 6 gear sets, blog/template slug mappings
  - `src/components/ui/AffiliateProducts.jsx` — product card grid with affiliate disclosure
  - Inserted into `BlogPostPage.jsx` (after article body) and `PlanTemplatePage.jsx` (after progression section)
  - Uses Amazon.ca search URLs (`rel="noopener noreferrer sponsored"`); replace with personal affiliate links after sign-up

---

### PHASE 5 — Growth Features

> **Goal:** Increase retention, organic traffic, and revenue.

- [ ] **Task 16 — Adaptive AI plan modification via chat**
  - Build a chat UI within the app
  - Use Claude API (server-side via Vercel function) to modify plans conversationally
  - Requires `ANTHROPIC_API_KEY` as server-side env var

- [ ] **Task 17 — Macro/calorie targets per plan**
  - Calculate estimated TDEE based on user stats (height, weight, activity level)
  - Show target macros (protein, carbs, fat) alongside the plan

- [x] **Task 18 — 3 SEO micro-tools** ✅ DONE (2026-06-17)
  - `/tools/1rm-calculator` — Epley 1RM formula, kg/lb toggle, percentage breakdown table, JSON-LD SoftwareApplication
  - `/tools/rest-timer` — Presets 30s/45s/60s/90s/2m/3m/5m, SVG ring timer, Web Audio API beep, JSON-LD
  - `/tools/volume-calculator` — Add exercises by muscle group, MEV/MAV landmark bars, JSON-LD
  - All three wired into `src/Router.jsx`; cross-linked to each other and to `/app`

- [ ] **Task 19 — Personal trainer marketplace**
  - Allow certified trainers to list their services
  - Plan: Supabase `trainers` table, trainer profile pages, contact/booking flow

- [ ] **Task 20 — Volume progression charts (Pro)**
  - Visualize weekly sets per muscle group over time
  - Library: `recharts` or `chart.js`
  - Gate behind Pro tier

---

## Notes & Decisions

- **AI flow (Phase 2):** The current "AI generator" is a prompt-assist pattern (no direct API call). A true Phase 5 direct Claude API call will require a Vercel serverless function to keep `ANTHROPIC_API_KEY` server-side only.
- **Auth dependency:** Phase 4 (Stripe Pro gating) depends on Phase 3 (Supabase Auth) being complete. Do Phase 3 first.
- **AdSense (Phase 1, Task 4):** Can be submitted now — all content requirements are met.
- **Current data storage:** Dexie/IndexedDB (browser-only). Adding Supabase in Phase 3 will require a migration/sync strategy for existing local plans.
