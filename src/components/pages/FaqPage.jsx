import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { cn } from "@/utils";
import AdBanner from "@/components/ui/AdBanner";

// ── FAQ data ──────────────────────────────────────────────────────────────────
const FAQS = [
  {
    category: "Getting Started",
    items: [
      {
        q: "Do I need to create an account?",
        a: "No. WorkoutPlanStudio requires no account, no sign-up, and no email address. Open the app and start using it immediately. Your data is stored on your own device.",
      },
      {
        q: "Is it free to use?",
        a: "Yes, completely free. There are no premium tiers, no paywalls, and no features locked behind a subscription.",
      },
      {
        q: "Does it work on mobile?",
        a: "Yes — it's designed primarily for mobile use at the gym. It works in any modern browser on iOS or Android. You can also install it as a Progressive Web App (PWA) from your browser's menu for a full-screen, app-like experience.",
      },
      {
        q: "How do I install it as an app on my phone?",
        a: "On iOS (Safari): tap the Share button, then 'Add to Home Screen'. On Android (Chrome): tap the three-dot menu, then 'Add to Home Screen' or 'Install App'. Once installed, it opens full-screen like a native app.",
      },
      {
        q: "Does it work offline?",
        a: "Yes. Once you've loaded the app in your browser, it works offline. Your plan and progress are stored locally on your device, so you can use it in the gym even without a signal.",
      },
    ],
  },
  {
    category: "Workout Plans",
    items: [
      {
        q: "Where do I get a workout plan?",
        a: "The app includes a built-in prompt generator. Choose your goal, experience level, available days, and equipment — then copy the generated prompt and paste it into any free AI tool (ChatGPT, Claude, or Gemini). The AI will generate a complete plan in the right format. The whole process takes about two minutes.",
      },
      {
        q: "Which AI tools work with WorkoutPlanStudio?",
        a: "Any AI chat tool that can generate text works. ChatGPT (free tier is fine), Claude, and Gemini are the most reliable. The app's prompt is designed to produce a specific JSON format — all three tools handle it well.",
      },
      {
        q: "What if the AI gives me an error or incomplete plan?",
        a: "This occasionally happens with longer plans. If you see a parse error, go back to your AI chat and ask it to 'regenerate the full plan as valid JSON'. If the response was cut off, type 'continue' and it will finish. Copy the complete response and try again.",
      },
      {
        q: "Can I use a plan from a personal trainer or fitness book?",
        a: "Yes, but it needs to be in the WorkoutPlanStudio JSON format. The easiest approach is to describe your trainer's plan to an AI and ask it to convert it into the WorkoutPlanStudio format using the prompt from the app. This usually works well.",
      },
      {
        q: "Can I have more than one plan?",
        a: "The app holds one active plan at a time. To switch plans, go to the Plan tab and apply a new one. Before switching, use 'Save Plan to Device' to download your current plan as a JSON file — you can reload it any time using 'Load Saved Plan'.",
      },
      {
        q: "What's the difference between a single-week and multi-week plan?",
        a: "A single-week plan repeats the same set of days every week — for example, a Push/Pull/Legs split you follow indefinitely. A multi-week plan has different workouts for each week, typically with progressive overload built in (e.g., Week 1 is lighter, Week 8 is heavier). Multi-week plans are better for structured programmes with a defined end goal.",
      },
    ],
  },
  {
    category: "Using the App",
    items: [
      {
        q: "How does the rest timer work?",
        a: "After you tap 'Complete Set', the rest timer starts automatically using the rest duration specified in your plan. It counts down and plays a beep sound (and vibrates on mobile) when time is up. You can pause, reset, or manually adjust the timer at any time during your session.",
      },
      {
        q: "Can I turn off the beep sound?",
        a: "Yes. Tap the Settings icon (gear) in the top-right corner and toggle 'Rest Timer Beep' off. Your preference is saved between sessions.",
      },
      {
        q: "What does 'Keep Screen On' do?",
        a: "It prevents your phone from locking while you're in the Workout tab. Useful when you're resting between sets and don't want to unlock your phone every time you check the timer. It uses the browser's Wake Lock API and is supported on most modern Android and iOS browsers.",
      },
      {
        q: "What are alternate exercises?",
        a: "Each exercise in your plan can have up to two alternatives — different exercises that work the same muscle group. If you don't have the right equipment, have an injury, or simply prefer a different movement, tap 'Alternates' to switch. Your set progress is tracked against whichever exercise you chose.",
      },
      {
        q: "How do I view exercise instructions?",
        a: "Tap the 'Guide' button on any exercise card. You'll see step-by-step instructions, form tips, and a link to search for a tutorial video on YouTube.",
      },
      {
        q: "How is my progress saved?",
        a: "Progress is saved automatically as you complete sets. When you finish all exercises in a day, the session is saved to your history automatically. You don't need to tap a save button — it happens in the background.",
      },
      {
        q: "Can I reset my progress for a day?",
        a: "Yes. In the Workout tab, scroll to the bottom of the day's card and tap 'Reset Day'. This clears all set completions for that day so you can start fresh.",
      },
    ],
  },
  {
    category: "Data and Privacy",
    items: [
      {
        q: "Where is my data stored?",
        a: "Everything — your workout plan, progress, weights, and history — is stored on your own device using browser storage (IndexedDB). Nothing is sent to any server. We have no access to your workout data.",
      },
      {
        q: "What happens if I clear my browser data?",
        a: "Clearing browser data (cookies, cache, site data) will permanently delete your workout plan and history from that device. To avoid losing your plan, use 'Save Plan to Device' in the Plan tab to download a backup file before clearing.",
      },
      {
        q: "Does the app use cookies?",
        a: "The app itself doesn't set first-party cookies. Google Analytics (used for anonymous usage statistics) may set cookies. See our Privacy Policy for full details.",
      },
      {
        q: "Is my workout data shared with anyone?",
        a: "No. Your workout data never leaves your device. We don't collect it, store it, or share it.",
      },
    ],
  },
];

// ── Accordion item ────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-800 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-500"
      >
        <span className="text-sm font-semibold text-white leading-snug">{q}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-slate-500 transition-transform mt-0.5", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open && (
        <p className="pb-4 text-sm text-slate-400 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function FaqPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <SiteHeader label="FAQ" />

      <main className="mx-auto max-w-3xl px-4 py-12 space-y-12">

        {/* Page title */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-600/20 text-blue-400 border border-blue-500/30">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Everything You Need to Know
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Common questions about WorkoutPlanStudio, AI workout planning, and how the app works.
          </p>
        </div>

        {/* FAQ categories */}
        {FAQS.map((group, gi) => (
          <section key={group.category} className="space-y-2">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
              {group.category}
            </h2>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 divide-y divide-slate-800">
              {group.items.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Still have questions?</h2>
          <p className="text-slate-400">The best way to learn is to try it — the app is free and takes seconds to open.</p>
          <Link
            to="/app"
            className="inline-block px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/30"
          >
            Open WorkoutPlanStudio
          </Link>
        </div>

        {/* Related links */}
        <div className="flex flex-wrap gap-3 text-sm">
          <Link to="/guide" className="text-blue-400 hover:underline">Read the full how-to guide →</Link>
          <Link to="/sample-plans" className="text-blue-400 hover:underline">Browse sample workout plans →</Link>
        </div>

        <AdBanner adSlot="7634233038" />
      </main>

      <SiteFooter />
    </div>
  );
}
