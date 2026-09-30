/** @type {import('tailwindcss').Config} */

/**
 * WorkoutPlan Studio — Design System
 *
 * SURFACES (dark-first)
 *   slate-950  page background
 *   slate-900  card / panel surface
 *   slate-800  elevated element (input bg, inner card)
 *   slate-700  hover state
 *   slate-600  disabled / subtle border
 *
 * BRAND PRIMARY  (single gradient throughout the app)
 *   from-blue-600 to-cyan-500          standard gradient
 *   hover: from-blue-500 to-cyan-400   hover gradient
 *   blue-400                           accent text on dark
 *   blue-950/30 + border-blue-900/50   tinted section bg
 *
 * BORDERS
 *   slate-700  default border
 *   slate-600  subtle / secondary border
 *   blue-900/50  accent border (inside tinted section)
 *
 * TEXT
 *   white       primary
 *   slate-300   secondary
 *   slate-400   muted / metadata
 *   slate-500   placeholder / disabled
 *
 * SEMANTIC (use ONLY for meaning, never decoration)
 *   emerald     success / completion / "done" states
 *   red         error / destructive actions
 *   amber       warning / coaching tips
 *
 * WORKOUT DAY THEMES (intentional variety — one per day, defined in constants.js)
 *   Allowed: blue-cyan, emerald-green, violet-purple, amber-orange, rose-pink
 *
 * DO NOT USE for decoration: violet, fuchsia, indigo, teal, purple, orange
 */

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
