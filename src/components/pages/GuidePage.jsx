import { Link } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import AdBanner from "@/components/ui/AdBanner";

// ── Shared section wrapper ────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">{title}</h2>
      <div className="space-y-4 text-slate-400 leading-relaxed">{children}</div>
    </section>
  );
}

function Step({ number, title, children }) {
  return (
    <div className="flex gap-5 items-start">
      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-600/20">
        {number}
      </span>
      <div className="space-y-2 pt-1 flex-1">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <div className="text-slate-400 text-sm leading-relaxed space-y-2">{children}</div>
      </div>
    </div>
  );
}

function Tip({ children }) {
  return (
    <div className="rounded-xl border border-blue-500/30 bg-blue-600/10 px-4 py-3 text-sm text-blue-300">
      <span className="font-bold text-blue-400">Tip: </span>{children}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function GuidePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <SiteHeader label="How to Use" />

      <main className="mx-auto max-w-3xl px-4 py-12 space-y-12">

        {/* Page title */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-600/20 text-blue-400 border border-blue-500/30">
            Complete Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            How to Use WorkoutPlanStudio
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            From zero to a personalised, interactive workout plan in under five minutes — no account, no subscription, no personal trainer required.
          </p>
        </div>

        {/* Overview */}
        <Section title="What WorkoutPlanStudio Does">
          <p>
            WorkoutPlanStudio is a gym companion app that takes a workout plan — from any source — and turns it into a clean, interactive day-by-day guide you can follow on your phone while you train. It handles the structure so you can focus on the work.
          </p>
          <p>
            The app runs entirely in your browser. Your workout data is stored on your own device and never sent to a server. There's nothing to install, no account to create, and no subscription to manage.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            {[
              { emoji: "🏋️", label: "Follow your plan set by set" },
              { emoji: "⏱️", label: "Built-in rest timers" },
              { emoji: "📊", label: "Track progress over time" },
            ].map(({ emoji, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3">
                <span className="text-2xl">{emoji}</span>
                <span className="text-sm font-semibold text-slate-200">{label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Part 1: Getting a plan */}
        <Section title="Part 1 — Getting a Workout Plan">
          <p>
            You need a workout plan before you can use the app. You have two options: bring your own, or generate one with a free AI tool in a couple of minutes.
          </p>

          <h3 className="text-white font-semibold text-base mt-4">Option A: Generate one with AI (recommended for beginners)</h3>
          <p>
            WorkoutPlanStudio includes a built-in prompt generator. It asks you a few questions — your goal, experience level, how many days per week you can train, and what equipment you have — then builds a detailed prompt you can paste into any free AI chat tool.
          </p>

          <ol className="space-y-6 mt-4">
            <Step number={1} title="Open the Plan tab in the app">
              <p>Tap the <strong className="text-slate-300">Plan</strong> tab at the bottom of the screen. You'll see the "Generate with AI" section at the top.</p>
            </Step>
            <Step number={2} title="Customise your options">
              <p>Choose your goal (build muscle, lose fat, or endurance), experience level, how many days per week, and what equipment you have access to. Toggle warm-up and cool-down on or off.</p>
              <Tip>If you're new to the gym, choose "beginner" and "full gym" — the AI will give you machine-based exercises that are easier to learn with good form.</Tip>
            </Step>
            <Step number={3} title="Copy the prompt">
              <p>Tap <strong className="text-slate-300">Copy Prompt</strong>, or tap one of the AI tool buttons (ChatGPT, Claude, Gemini) to copy the prompt and open that tool in a new tab at the same time.</p>
            </Step>
            <Step number={4} title="Paste into your AI tool and send">
              <p>Open your AI chat, paste the prompt, and hit send. The AI will reply with a complete, structured workout plan in JSON format. This usually takes 10–30 seconds.</p>
              <Tip>If the AI gives you a partial response or stops mid-way, type "continue" and send again. It will pick up where it left off.</Tip>
            </Step>
            <Step number={5} title="Copy the AI's response">
              <p>Select all of the AI's response text and copy it. You don't need to edit it — copy the whole thing, including any surrounding text.</p>
            </Step>
          </ol>

          <h3 className="text-white font-semibold text-base mt-6">Option B: Use an existing plan</h3>
          <p>
            If you already have a workout plan — from a personal trainer, a fitness book, or a previous AI session — you can load it directly. The plan needs to be in the WorkoutPlanStudio JSON format. If you previously saved a plan from the app, use the <strong className="text-slate-300">Load Saved Plan</strong> button to restore it from your device.
          </p>
        </Section>

        {/* Part 2: Loading the plan */}
        <Section title="Part 2 — Loading Your Plan into the App">
          <ol className="space-y-6">
            <Step number={1} title="Go to the Plan tab">
              <p>Tap the <strong className="text-slate-300">Plan</strong> tab. Scroll down to the "Step 2 — Paste your AI response here" section.</p>
            </Step>
            <Step number={2} title="Paste the AI response">
              <p>Tap the text area and paste the AI's response. The app will automatically find the JSON in the text — you don't need to extract it manually.</p>
            </Step>
            <Step number={3} title="Tap Apply Plan">
              <p>Tap the <strong className="text-slate-300">Apply Plan</strong> button. If the plan is valid, you'll see a success message and the app will switch to the Workout tab automatically.</p>
              <Tip>If you see an error, the most common cause is that the AI gave an incomplete response. Go back to your AI chat, ask it to "regenerate the full plan as valid JSON", and try again.</Tip>
            </Step>
          </ol>
        </Section>

        {/* Part 3: Using the workout view */}
        <Section title="Part 3 — Following Your Workout">
          <p>
            Once your plan is loaded, the Workout tab is your gym companion. Here's how to use it during a session.
          </p>

          <ol className="space-y-6 mt-4">
            <Step number={1} title="Select your workout day">
              <p>Use the day picker at the top to choose which day you're training. The app remembers your progress for each day separately.</p>
            </Step>
            <Step number={2} title="Work through each exercise">
              <p>The current exercise is shown in the main card. You'll see the exercise name, how many reps to do, and how long to rest between sets. Complete a set, then tap <strong className="text-slate-300">Complete Set</strong>.</p>
            </Step>
            <Step number={3} title="Use the rest timer">
              <p>After you complete a set, the rest timer starts automatically. It counts down and plays a beep (and vibrates on mobile) when your rest period is over. You can pause, reset, or adjust the timer at any time.</p>
              <Tip>Enable "Keep Screen On" in Settings so your phone doesn't lock while you're resting between sets.</Tip>
            </Step>
            <Step number={4} title="Log your weights (optional)">
              <p>You can record the weight you used for each exercise. This is saved to your history so you can track progression over time.</p>
            </Step>
            <Step number={5} title="View exercise instructions">
              <p>Tap the <strong className="text-slate-300">Guide</strong> button on any exercise to see step-by-step instructions, form tips, and a link to a YouTube tutorial search.</p>
            </Step>
            <Step number={6} title="Use alternate exercises">
              <p>If an exercise doesn't suit you — wrong equipment, injury, or preference — tap <strong className="text-slate-300">Alternates</strong> to switch to a different exercise for that slot. Your progress for that slot is tracked against whichever exercise you chose.</p>
            </Step>
          </ol>
        </Section>

        {/* Part 4: Saving */}
        <Section title="Part 4 — Saving and Managing Plans">
          <p>
            Your progress is saved automatically as you work out. When you complete all exercises in a day, the session is saved to your history automatically.
          </p>
          <p>
            To save your plan to your device (so you can reload it later or share it), go to the Plan tab and tap <strong className="text-slate-300">Save Plan to Device</strong>. This downloads a JSON file you can keep as a backup or load on another device.
          </p>
          <p>
            Your workout history is available in the <strong className="text-slate-300">History</strong> tab. It shows every completed session with the exercises, sets, and weights you logged.
          </p>
          <Tip>Save your plan to your device before switching to a new one. The app only holds one active plan at a time.</Tip>
        </Section>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Ready to get started?</h2>
          <p className="text-slate-400">Open the app and build your first plan — it takes about two minutes.</p>
          <Link
            to="/app"
            className="inline-block px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/30"
          >
            Open WorkoutPlanStudio
          </Link>
        </div>

        {/* Related links */}
        <div className="flex flex-wrap gap-3 text-sm">
          <Link to="/sample-plans" className="text-blue-400 hover:underline">Browse sample workout plans →</Link>
          <Link to="/faq" className="text-blue-400 hover:underline">Frequently asked questions →</Link>
        </div>

      </main>

      <AdBanner adSlot="7634233038" className="mx-auto max-w-3xl px-4 py-4" />
      <SiteFooter />
    </div>
  );
}
