/**
 * App Changelog - What's New
 * Update this file when releasing new features or fixes
 */

export const APP_VERSION = "1.5.0";

export const CHANGELOG = [
  {
    version: "1.5.0",
    date: "2026-06-17",
    title: "Affiliate Gear & SEO Tools",
    changes: [
      "🛠️ New tools: 1RM Calculator, Rest Timer, and Volume Calculator — free, no account needed",
      "🛒 Recommended gear sections added to blog posts and plan pages",
      "📊 Volume Calculator shows MEV/MAV landmarks so you know if you're training enough per muscle",
    ],
  },
  {
    version: "1.4.0",
    date: "2026-06-17",
    title: "Persistent History & Personal Records",
    changes: [
      "💾 Workout history now persists across page reloads — your sessions are saved to your device forever",
      "🏆 Personal Records tracker — see your best weight lifted per exercise, updated after every workout",
      "📱 All data stays on your device — no account needed, nothing ever leaves your phone",
    ],
  },
  {
    version: "1.3.0",
    date: "2026-06-17",
    title: "Progress Protection & UI Polish",
    changes: [
      "💾 Workout progress auto-saved — navigate away and return without losing your sets or weights",
      "🛡️ Back-button guard — accidentally swiping back now shows a warning instead of losing your workout",
      "✅ Session history now correctly shows 100% completion on finished workouts",
      "📱 PWA icons, favicon, and manifest fully overhauled with branded assets",
      "🎨 Premium redesign of exercise callouts and info elements in WorkoutView",
    ],
  },
  {
    version: "1.2.0",
    date: "2026-04-03",
    title: "Alternate Exercises",
    changes: [
      "🔀 Swap exercises mid-workout — tap 'Swap exercise' to pick an alternate when equipment is busy",
      "📋 Alternate exercises show their own step-by-step guide, form tips, and YouTube link",
      "💡 Clear message when an alternate has no guide info available",
      "🎨 Redesigned exercise switcher — modern dark card with numbered options and selection indicator",
      "🔗 Fixed YouTube links in alternates — no more broken Google redirect URLs",
      "📝 AI plan prompt updated — alternates now include full instructions, form tips, and media",
    ],
  },
  {
    version: "1.1.1",
    date: "2026-04-02",
    title: "Cache & Performance Fix",
    changes: [
      "🔄 Fixed caching issues - App always loads fresh",
      "📱 Improved mobile compatibility",
      "🐛 Fixed modal display on all devices",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-03-28",
    title: "Major Improvements",
    changes: [
      "🎯 Floating rest timer - Always visible, no scrolling needed",
      "🔔 Louder beeps + vibration - Never miss rest completion",
      "💾 Auto-save progress - Syncs across devices instantly",
      "📊 Session history - Track last 2 weeks of workouts",
      "🎨 Modern toast notifications - Beautiful feedback",
      "✨ Better exercise layout - Clean, professional design",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-03-15",
    title: "Initial Release",
    changes: [
      "🏋️ Workout tracking with progress",
      "📅 Multi-week workout plans",
      "⏱️ Rest timer with audio alerts",
      "📱 Mobile-first responsive design",
    ],
  },
];

/**
 * Get changes since a specific version
 */
export function getChangesSince(lastVersion) {
  if (!lastVersion) return CHANGELOG;
  
  const changes = [];
  for (const entry of CHANGELOG) {
    if (compareVersions(entry.version, lastVersion) > 0) {
      changes.push(entry);
    }
  }
  return changes;
}

/**
 * Compare two semantic versions (e.g., "1.2.3")
 * Returns: 1 if v1 > v2, -1 if v1 < v2, 0 if equal
 */
function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  for (let i = 0; i < 3; i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
  return 0;
}
