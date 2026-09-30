import { Link } from "react-router-dom";
import SiteFooter from "@/components/layout/SiteFooter";
import AdBanner from "@/components/ui/AdBanner";

// ── Hero Section ──────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Accent glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        {/* Badge */}
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-600/20 text-blue-400 border border-blue-500/30">
          AI-Powered Workout Planning
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Your Personal Workout Plan,{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Always in Your Pocket
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto">
          Pick a proven training program or generate one with AI — then follow it
          set by set at the gym, with rest timers and progress tracking built in.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/plans"
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/30 text-center"
          >
            Browse Training Plans
          </Link>
          <Link
            to="/app"
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-slate-300 border border-slate-600 hover:border-slate-500 hover:text-white transition-all text-center"
          >
            Open the App
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── What Is This App Section ──────────────────────────────────────────────────
function WhatIsThis() {
  return (
    <section className="py-16 px-4 bg-slate-900 border-y border-slate-800">
      <div className="max-w-2xl mx-auto text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          What is WorkoutPlanStudio?
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          It's a gym companion app that turns a workout plan — from any source — into a simple, interactive guide you can follow on your phone while you train.
        </p>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Choose from 10 ready-to-use programs — Push/Pull/Legs, 5/3/1, Upper/Lower, and more — or use the built-in AI prompt tool to generate a custom plan in minutes. Either way, the app gives you a clean day-by-day layout with exercises, sets, reps, rest timers, and progress tracking — all in one place.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 pt-2 text-left">
          {[
            { emoji: "🏋️", label: "Follow your plan set by set" },
            { emoji: "⏱️", label: "Built-in rest timers" },
            { emoji: "📊", label: "Track your progress over time" },
          ].map(({ emoji, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3">
              <span className="text-2xl">{emoji}</span>
              <span className="text-sm font-semibold text-slate-200">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Problem Section ───────────────────────────────────────────────────────────
const PAIN_POINTS = [
  {
    icon: "💸",
    title: "Personal trainers are expensive",
    body: "A qualified personal trainer can cost $50–$150 per session. For most people, that's simply not sustainable — yet not knowing where to start holds too many people back from training consistently.",
  },
  {
    icon: "📋",
    title: "Raw AI text is hard to use at the gym",
    body: "Asking ChatGPT for a workout plan gives you a wall of text. Scrolling through a chat session while you're mid-set is frustrating — you need a structured, interactive guide, not a paragraph.",
  },
  {
    icon: "🤷",
    title: "Generic plans don't fit your life",
    body: "Most free programs are written for a fictional average person. Your schedule, equipment, and experience level are different — your plan should reflect that.",
  },
];

function Problem() {
  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-3xl mx-auto text-center space-y-12">
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Sound familiar?
          </h2>
          <p className="text-slate-400 text-lg">
            Getting fit shouldn't require a big budget or a computer science
            degree.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 text-left">
          {PAIN_POINTS.map(({ icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3"
            >
              <span className="text-3xl">{icon}</span>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works Section ──────────────────────────────────────────────────────
const PATH_A_STEPS = [
  {
    step: 1,
    title: "Browse the plan library",
    body: "Choose from 10 expert-designed programs — PPL, 5/3/1, Upper/Lower, Arnold Split, and more. Each plan shows the full schedule before you commit.",
  },
  {
    step: 2,
    title: "Load it into the app",
    body: "Hit 'Use This Plan' and the full program loads instantly into WorkoutPlanStudio — no copy-pasting, no setup.",
  },
  {
    step: 3,
    title: "Train with it today",
    body: "Open the app, pick today's workout, and follow along set by set with built-in rest timers and progress tracking.",
  },
];

const PATH_B_STEPS = [
  {
    step: 1,
    title: "Fill in your preferences",
    body: "Tell the app your goals, experience level, available equipment, and how many days a week you can train.",
  },
  {
    step: 2,
    title: "Copy the AI prompt",
    body: "We generate a detailed prompt for you. Paste it into ChatGPT, Claude, or Gemini — whichever you prefer — and the AI builds your plan.",
  },
  {
    step: 3,
    title: "Paste it back and go",
    body: "Copy the AI's response, paste it into WorkoutPlanStudio, and your custom plan is ready to use immediately.",
  },
];

function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Two Ways to Get Started
          </h2>
          <p className="text-slate-400 text-lg">
            Use a proven program or build a custom one — both take under two minutes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {/* Path A */}
          <div className="rounded-2xl border border-blue-500/30 bg-slate-900/60 p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-wide text-blue-400 uppercase">Option A</span>
              <h3 className="text-xl font-bold text-white">Use a pre-built plan</h3>
              <p className="text-slate-400 text-sm">Fastest way to start — pick a proven program and go.</p>
            </div>
            <ol className="space-y-4">
              {PATH_A_STEPS.map(({ step, title, body }) => (
                <li key={step} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-600/30">
                    {step}
                  </span>
                  <div className="space-y-0.5 pt-0.5">
                    <h4 className="text-white font-semibold text-sm">{title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              to="/plans"
              className="inline-block w-full text-center px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all text-sm"
            >
              Browse Training Plans
            </Link>
          </div>

          {/* Path B */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-wide text-slate-400 uppercase">Option B</span>
              <h3 className="text-xl font-bold text-white">Generate a custom plan</h3>
              <p className="text-slate-400 text-sm">Tailored to your goals, schedule, and equipment.</p>
            </div>
            <ol className="space-y-4">
              {PATH_B_STEPS.map(({ step, title, body }) => (
                <li key={step} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs">
                    {step}
                  </span>
                  <div className="space-y-0.5 pt-0.5">
                    <h4 className="text-white font-semibold text-sm">{title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              to="/app"
              className="inline-block w-full text-center px-5 py-2.5 rounded-xl font-semibold text-slate-300 border border-slate-600 hover:border-slate-500 hover:text-white transition-all text-sm"
            >
              Open the App
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Benefits Section ──────────────────────────────────────────────────────────
const BENEFITS = [
  {
    icon: "🗂️",
    title: "10 proven programs, ready to go",
    body: "PPL, 5/3/1, Upper/Lower, Arnold Split, and more — built by experts and ready to load into the app with one tap.",
  },
  {
    icon: "📱",
    title: "Built for the gym floor",
    body: "The app is designed for your phone. Check off sets, rest with the built-in timer, and track progress — no scrolling through chat history mid-set.",
  },
  {
    icon: "🔁",
    title: "Switch plans any time",
    body: "Save your current plan to your device, load a new one whenever you're ready, and switch back whenever you want. Your plans are always yours.",
  },
  {
    icon: "🤖",
    title: "AI-assisted custom plans",
    body: "Prefer something tailored to you? Use the built-in prompt builder to get a custom plan from ChatGPT, Claude, or Gemini in minutes.",
  },
  {
    icon: "📖",
    title: "Learn the fundamentals",
    body: "The blog covers everything from progressive overload to the best split for your schedule — so you understand why your program works.",
  },
  {
    icon: "🔒",
    title: "No account needed, ever",
    body: "Everything runs on your device. No sign-up, no email, no data sent anywhere. Open it and train.",
  },
];

function Benefits() {
  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Why WorkoutPlanStudio?
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need, nothing you don't.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map(({ icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3 text-center"
            >
              <span className="text-4xl">{icon}</span>
              <h3 className="text-white font-semibold">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Resources Section ─────────────────────────────────────────────────────────
function Resources() {
  return (
    <section className="py-16 px-4 bg-slate-900 border-t border-slate-800">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Learn More</h2>
          <p className="text-slate-400">Guides, examples, and answers to common questions.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              to: "/plans",
              emoji: "🗂️",
              title: "Training Plan Library",
              body: "10 proven programs — PPL, 5/3/1, Upper/Lower, Arnold Split, and more. Load any into the app instantly.",
            },
            {
              to: "/blog",
              emoji: "📝",
              title: "Workout Planning Blog",
              body: "Learn progressive overload, how to choose a training split, and how to structure your program.",
            },
            {
              to: "/gear",
              emoji: "🏋️",
              title: "Recommended Gear",
              body: "Curated gym equipment picks for home and commercial gyms — barbells, racks, dumbbells, and recovery tools.",
            },
            {
              to: "/guide",
              emoji: "📖",
              title: "How to Use the App",
              body: "A step-by-step walkthrough — from picking your first plan to tracking sets at the gym.",
            },
            {
              to: "/faq",
              emoji: "💬",
              title: "FAQ",
              body: "Answers to common questions about the app, AI workout planning, and your data.",
            },
            {
              to: "/tools/calorie-calculator",
              emoji: "🔢",
              title: "Free Training Tools",
              body: "Calorie & macro calculator, BMI, 1RM, rest timer, and volume tracker — free tools to plan your training.",
            },
          ].map(({ to, emoji, title, body }) => (
            <Link
              key={to}
              to={to}
              className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 space-y-2 hover:border-slate-600 hover:bg-slate-800 transition group"
            >
              <span className="text-3xl">{emoji}</span>
              <h3 className="text-white font-semibold group-hover:text-blue-400 transition">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Bottom CTA Section ────────────────────────────────────────────────────────
function BottomCTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Ready to train smarter?
        </h2>
        <p className="text-slate-400 text-lg">
          Pick a plan and start today — no account, no payment, no setup.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/plans"
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/30 text-center"
          >
            Browse Training Plans
          </Link>
          <Link
            to="/app"
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-slate-300 border border-slate-600 hover:border-slate-500 hover:text-white transition-all text-center"
          >
            Open the App
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
// Uses shared SiteFooter component

// ── LandingPage (composed) ────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <WhatIsThis />
      <Problem />
      <HowItWorks />
      <Benefits />
      <Resources />
      <BottomCTA />
      <AdBanner adSlot="7634233038" className="mx-auto max-w-3xl px-4 py-4" />
      <SiteFooter />
    </div>
  );
}
