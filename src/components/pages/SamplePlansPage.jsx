import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import AdBanner from "@/components/ui/AdBanner";

// ── Shared display components ──────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">{title}</h2>
      <div className="space-y-4 text-slate-400 leading-relaxed">{children}</div>
    </section>
  );
}

function ExerciseRow({ name, sets, reps, rest, note }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-slate-800 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white">{name}</div>
        {note && <div className="text-xs text-slate-500 mt-0.5">{note}</div>}
      </div>
      <div className="flex items-center gap-3 shrink-0 text-xs">
        <span className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-slate-300 font-medium">
          {sets} sets
        </span>
        <span className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-slate-300 font-medium">
          {reps} reps
        </span>
        <span className="rounded-lg border border-blue-500/30 bg-blue-600/10 px-2.5 py-1 text-blue-300 font-medium">
          {rest}s rest
        </span>
      </div>
    </div>
  );
}

function DayCard({ day, label, exercises, accent = "from-blue-600 to-cyan-500" }) {
  return (
    <div className="rounded-2xl border border-slate-800 overflow-hidden">
      <div className={`bg-gradient-to-r ${accent} px-5 py-3`}>
        <div className="text-xs font-bold uppercase tracking-wider text-white/80">{label}</div>
        <div className="text-base font-black text-white mt-0.5">{day}</div>
      </div>
      <div className="px-4 divide-y divide-slate-800">
        {exercises.map((ex) => (
          <ExerciseRow key={ex.name} {...ex} />
        ))}
      </div>
    </div>
  );
}

function PlanCard({ title, badge, description, days, accent, equipmentTag }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${badge}`}>
            {title}
          </span>
          <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium border ${equipmentTag.style}`}>
            {equipmentTag.label}
          </span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
      <div className="space-y-3">
        {days.map((d) => (
          <DayCard key={d.day} accent={accent} {...d} />
        ))}
      </div>
    </div>
  );
}

function MatchBanner({ level, note }) {
  if (!level) return null;
  const styles = {
    best: "border-emerald-500/40 bg-emerald-600/10 text-emerald-400",
    good: "border-blue-500/40 bg-blue-600/10 text-blue-400",
    limited: "border-amber-500/40 bg-amber-600/10 text-amber-400",
  };
  const labels = {
    best: "Best match",
    good: "Good option",
    limited: "Not recommended",
  };
  return (
    <div className={`rounded-xl border px-4 py-3 flex flex-wrap items-center gap-x-3 gap-y-1 ${styles[level]}`}>
      <span className="text-xs font-bold">{labels[level]}</span>
      {note && <span className="text-xs text-slate-400">{note}</span>}
    </div>
  );
}

// ── Plan Finder Wizard ─────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    key: "goal",
    title: "What is your main goal?",
    options: [
      { id: "muscle", label: "Build muscle", desc: "Gain size and definition" },
      { id: "strength", label: "Get stronger", desc: "Lift heavier, build power" },
      { id: "fitness", label: "General fitness", desc: "Feel healthier, stay active" },
      { id: "fat", label: "Lose body fat", desc: "Improve body composition" },
    ],
  },
  {
    key: "equipment",
    title: "What equipment do you have access to?",
    subtitle: "Key factor — some plans require a barbell.",
    options: [
      { id: "full", label: "Full gym with barbells", desc: "Squat rack, barbell, cables, machines" },
      { id: "machines", label: "Machines & dumbbells only", desc: "No barbell or squat rack" },
      { id: "home", label: "Home / minimal gym", desc: "Dumbbells, bands, or bodyweight" },
    ],
  },
  {
    key: "experience",
    title: "How much training experience do you have?",
    subtitle: "Pick the one that sounds most like you.",
    options: [
      {
        id: "beginner",
        label: "Beginner",
        desc: "Under 1 year of consistent training",
        hint: "Still learning movements, or returning after 6+ months off.",
      },
      {
        id: "intermediate",
        label: "Intermediate",
        desc: "1–3 years of consistent training",
        hint: "Comfortable with squats, bench, and rows. Progress most weeks.",
      },
      {
        id: "advanced",
        label: "Advanced",
        desc: "3+ years of consistent training",
        hint: "Strength gains have nearly stalled. Need periodised programming.",
      },
    ],
  },
];

function PlanFinder({ onComplete, onSkip }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const q = QUESTIONS[step];

  function select(value) {
    const updated = { ...answers, [q.key]: value };
    setAnswers(updated);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(updated);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 space-y-3">
      {/* Progress */}
      <div className="flex items-center gap-1.5">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? "bg-blue-500" : "bg-slate-700"}`}
          />
        ))}
        <span className="text-xs text-slate-500 ml-1 shrink-0">
          {step + 1} / {QUESTIONS.length}
        </span>
      </div>

      {/* Question */}
      <div>
        <h2 className="text-sm font-bold text-white">{q.title}</h2>
        {q.subtitle && <p className="text-xs text-slate-500 mt-0.5">{q.subtitle}</p>}
      </div>

      {/* Options — click to advance automatically */}
      <div className="space-y-1.5">
        {q.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => select(opt.id)}
            className="w-full text-left rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 hover:border-blue-500/60 hover:bg-blue-600/10 active:bg-blue-600/20 transition-all group"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-white group-hover:text-blue-200 transition-colors leading-tight">
                {opt.label}
              </span>
              <span className="text-xs text-slate-500 leading-tight">{opt.desc}</span>
            </div>
            {opt.hint && (
              <div className="text-xs text-slate-600 mt-1">{opt.hint}</div>
            )}
          </button>
        ))}
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between">
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          onClick={onSkip}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          Skip — show all plans
        </button>
      </div>
    </div>
  );
}

const ANSWER_LABELS = {
  goal: { muscle: "Build muscle", strength: "Get stronger", fitness: "General fitness", fat: "Lose body fat" },
  equipment: { full: "Full gym with barbells", machines: "Machines & dumbbells", home: "Home / minimal gym" },
  experience: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
};

function WizardSummary({ answers, onReset }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        {Object.entries(answers).map(([key, val]) => (
          <span
            key={key}
            className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300"
          >
            {ANSWER_LABELS[key]?.[val] ?? val}
          </span>
        ))}
      </div>
      <button
        onClick={onReset}
        className="text-xs text-slate-500 hover:text-slate-300 transition-colors shrink-0"
      >
        Change answers
      </button>
    </div>
  );
}

// ── Match logic ────────────────────────────────────────────────────────────────

function getMatchLevel(planId, answers) {
  const { equipment, experience, goal } = answers || {};
  if (!equipment && !experience) return null;

  const hasBarbell = equipment === "full";
  const noBarbell = equipment && !hasBarbell;

  if (planId === "beginner") {
    if (experience === "advanced") {
      return { level: "limited", note: "Likely too simple for your training history" };
    }
    if (experience === "intermediate" && hasBarbell) {
      return { level: "limited", note: "Likely too simple for your experience level" };
    }
    if (noBarbell) {
      return { level: "best", note: "Great fit — no barbell required" };
    }
    return { level: "best", note: "The ideal starting point — machines and dumbbells, no barbell needed" };
  }

  if (planId === "ppl") {
    if (noBarbell) {
      return { level: "limited", note: "Requires a barbell and squat rack — cannot be done without them" };
    }
    if (experience === "beginner") {
      return { level: "limited", note: "This volume is too high for beginners — start with the Full-Body plan first" };
    }
    if (goal === "muscle") {
      return { level: "best", note: "6 days/week at high volume — optimal for muscle growth" };
    }
    return { level: "good", note: "6 days/week, excellent for muscle and strength" };
  }

  if (planId === "upperlower") {
    if (noBarbell) {
      return { level: "limited", note: "Requires a barbell and squat rack for most key exercises" };
    }
    if (experience === "beginner") {
      return { level: "limited", note: "Contains barbell movements — build your form with the Full-Body plan first" };
    }
    if (goal === "strength" || goal === "fat" || goal === "fitness") {
      return { level: "best", note: "4 days/week with dedicated strength and hypertrophy sessions — versatile and effective" };
    }
    return { level: "good", note: "4 days/week, great balance of frequency and recovery" };
  }

  return null;
}

// ── Plan data ─────────────────────────────────────────────────────────────────

const BEGINNER_3DAY = {
  title: "Beginner Full-Body — 3 Days/Week",
  badge: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30",
  accent: "from-emerald-600 to-green-500",
  equipmentTag: {
    label: "No barbell needed",
    style: "bg-emerald-600/10 text-emerald-400 border-emerald-500/25",
  },
  description:
    "A simple full-body routine for people new to the gym. Each session trains all major muscle groups with compound movements. Three days per week with rest days in between gives your body time to recover and adapt. This is the most effective structure for beginners — frequency beats volume at this stage.",
  days: [
    {
      day: "Day 1 — Full Body A",
      label: "Monday",
      exercises: [
        { name: "Machine Chest Press", sets: 3, reps: "10–12", rest: 60, note: "Adjust seat so handles align with mid-chest." },
        { name: "Lat Pulldown", sets: 3, reps: "10–12", rest: 60, note: "Pull to upper chest, squeeze shoulder blades." },
        { name: "Leg Press", sets: 3, reps: "12–15", rest: 90, note: "Feet shoulder-width, don't lock knees at top." },
        { name: "Dumbbell Shoulder Press", sets: 3, reps: "10–12", rest: 60, note: "Neutral grip, elbows slightly forward." },
        { name: "Cable Bicep Curl", sets: 2, reps: "12–15", rest: 45, note: "Keep elbows pinned to sides." },
        { name: "Tricep Pushdown", sets: 2, reps: "12–15", rest: 45, note: "Straight bar or rope attachment." },
      ],
    },
    {
      day: "Day 2 — Full Body B",
      label: "Wednesday",
      exercises: [
        { name: "Incline Dumbbell Press", sets: 3, reps: "10–12", rest: 60, note: "30–45° incline, controlled descent." },
        { name: "Seated Cable Row", sets: 3, reps: "10–12", rest: 60, note: "Chest tall, pull to lower sternum." },
        { name: "Goblet Squat", sets: 3, reps: "12–15", rest: 90, note: "Hold dumbbell at chest, sit back and down." },
        { name: "Lateral Raise", sets: 3, reps: "12–15", rest: 45, note: "Slight bend in elbows, lead with elbows." },
        { name: "Hammer Curl", sets: 2, reps: "12–15", rest: 45, note: "Neutral grip, controlled tempo." },
        { name: "Overhead Tricep Extension", sets: 2, reps: "12–15", rest: 45, note: "Keep elbows close to head." },
      ],
    },
    {
      day: "Day 3 — Full Body C",
      label: "Friday",
      exercises: [
        { name: "Pec Deck Machine", sets: 3, reps: "12–15", rest: 60, note: "Don't let weight pull arms behind torso." },
        { name: "Machine Row", sets: 3, reps: "10–12", rest: 60, note: "Chest against pad, full range of motion." },
        { name: "Romanian Deadlift (Dumbbells)", sets: 3, reps: "10–12", rest: 90, note: "Hinge at hips, soft knee bend, bar close to legs." },
        { name: "Machine Shoulder Press", sets: 3, reps: "10–12", rest: 60, note: "Adjust seat height so handles are at shoulder level." },
        { name: "Preacher Curl Machine", sets: 2, reps: "12–15", rest: 45, note: "Full extension at bottom, squeeze at top." },
        { name: "Tricep Dip Machine", sets: 2, reps: "12–15", rest: 45, note: "Keep elbows close, don't flare out." },
      ],
    },
  ],
};

const INTERMEDIATE_PPL = {
  title: "Intermediate Push/Pull/Legs (PPL) — 6 Days/Week",
  badge: "bg-blue-600/20 text-blue-400 border-blue-500/30",
  accent: "from-blue-600 to-cyan-500",
  equipmentTag: {
    label: "Barbell required",
    style: "bg-amber-600/10 text-amber-400 border-amber-500/25",
  },
  description:
    "The Push/Pull/Legs split is one of the most popular and effective intermediate programmes. Each muscle group is trained twice per week with dedicated sessions. Push days train chest, shoulders, and triceps. Pull days train back and biceps. Leg days train quads, hamstrings, and glutes. The six-day version gives you maximum frequency and volume — but requires a barbell and squat rack for most exercises.",
  days: [
    {
      day: "Push A — Chest Focus",
      label: "Monday",
      exercises: [
        { name: "Barbell Bench Press", sets: 4, reps: "6–8", rest: 120, note: "Arch slightly, bar to lower chest, elbows 45°." },
        { name: "Incline Dumbbell Press", sets: 3, reps: "8–10", rest: 90, note: "30–45° incline, full stretch at bottom." },
        { name: "Cable Fly (Low to Mid)", sets: 3, reps: "12–15", rest: 60, note: "Slight elbow bend, arc up and together." },
        { name: "Overhead Press (Barbell)", sets: 3, reps: "8–10", rest: 90, note: "Bar in front, press straight up, lock out." },
        { name: "Lateral Raise", sets: 4, reps: "15–20", rest: 45, note: "Light weight, lead with elbows." },
        { name: "Tricep Pushdown (Rope)", sets: 3, reps: "12–15", rest: 45, note: "Flare rope at bottom, full extension." },
      ],
    },
    {
      day: "Pull A — Back Focus",
      label: "Tuesday",
      exercises: [
        { name: "Barbell Row", sets: 4, reps: "6–8", rest: 120, note: "Hinge to 45°, pull to lower chest, squeeze." },
        { name: "Weighted Pull-Up", sets: 3, reps: "6–8", rest: 120, note: "Full hang at bottom, chin over bar." },
        { name: "Seated Cable Row (Wide Grip)", sets: 3, reps: "10–12", rest: 90, note: "Pull to upper chest, elbows flared." },
        { name: "Face Pull", sets: 3, reps: "15–20", rest: 45, note: "Rope to forehead, external rotation at end." },
        { name: "Barbell Curl", sets: 3, reps: "8–10", rest: 60, note: "Full range, don't swing." },
        { name: "Incline Dumbbell Curl", sets: 3, reps: "10–12", rest: 45, note: "Arms hang behind body, full stretch." },
      ],
    },
    {
      day: "Legs A — Quad Focus",
      label: "Wednesday",
      exercises: [
        { name: "Barbell Back Squat", sets: 4, reps: "6–8", rest: 180, note: "Bar on traps, sit back and down, knees out." },
        { name: "Leg Press", sets: 3, reps: "10–12", rest: 120, note: "High foot placement for more glute involvement." },
        { name: "Leg Extension", sets: 3, reps: "12–15", rest: 60, note: "Pause at top, controlled descent." },
        { name: "Romanian Deadlift", sets: 3, reps: "10–12", rest: 90, note: "Hinge at hips, feel hamstring stretch." },
        { name: "Leg Curl (Lying)", sets: 3, reps: "12–15", rest: 60, note: "Full range, squeeze at top." },
        { name: "Standing Calf Raise", sets: 4, reps: "15–20", rest: 45, note: "Full stretch at bottom, pause at top." },
      ],
    },
  ],
};

const UPPER_LOWER = {
  title: "Upper/Lower Split — 4 Days/Week",
  badge: "bg-violet-600/20 text-violet-400 border-violet-500/30",
  accent: "from-violet-600 to-purple-500",
  equipmentTag: {
    label: "Barbell required",
    style: "bg-amber-600/10 text-amber-400 border-amber-500/25",
  },
  description:
    "The Upper/Lower split is ideal for people who can train four days per week and want a balance between frequency and recovery. Upper body days train chest, back, shoulders, and arms. Lower body days train quads, hamstrings, glutes, and calves. Each muscle group is hit twice per week — once with a strength focus, once with a hypertrophy focus. Requires a barbell and squat rack for the main lifts.",
  days: [
    {
      day: "Upper A — Strength Focus",
      label: "Monday",
      exercises: [
        { name: "Barbell Bench Press", sets: 4, reps: "5–6", rest: 180, note: "Heavy — work up to a challenging weight." },
        { name: "Barbell Row", sets: 4, reps: "5–6", rest: 180, note: "Match the bench press intensity." },
        { name: "Overhead Press", sets: 3, reps: "6–8", rest: 120, note: "Strict form, no leg drive." },
        { name: "Lat Pulldown", sets: 3, reps: "8–10", rest: 90, note: "Wide grip, pull to upper chest." },
        { name: "Dumbbell Lateral Raise", sets: 3, reps: "15–20", rest: 45, note: "Pump work — lighter weight, higher reps." },
      ],
    },
    {
      day: "Lower A — Strength Focus",
      label: "Tuesday",
      exercises: [
        { name: "Barbell Back Squat", sets: 4, reps: "5–6", rest: 180, note: "Heavy — work up to a challenging weight." },
        { name: "Romanian Deadlift", sets: 3, reps: "8–10", rest: 120, note: "Hinge pattern, feel the hamstring stretch." },
        { name: "Leg Press", sets: 3, reps: "10–12", rest: 90, note: "Moderate weight, full range." },
        { name: "Leg Curl", sets: 3, reps: "10–12", rest: 60, note: "Controlled tempo, squeeze at top." },
        { name: "Standing Calf Raise", sets: 4, reps: "15–20", rest: 45, note: "Full stretch at bottom." },
      ],
    },
    {
      day: "Upper B — Hypertrophy Focus",
      label: "Thursday",
      exercises: [
        { name: "Incline Dumbbell Press", sets: 4, reps: "10–12", rest: 90, note: "More volume, moderate weight." },
        { name: "Cable Row (Neutral Grip)", sets: 4, reps: "10–12", rest: 90, note: "Pull to lower sternum, chest tall." },
        { name: "Dumbbell Shoulder Press", sets: 3, reps: "10–12", rest: 75, note: "Seated, controlled tempo." },
        { name: "Cable Fly", sets: 3, reps: "12–15", rest: 60, note: "Stretch at bottom, squeeze at top." },
        { name: "Barbell Curl", sets: 3, reps: "10–12", rest: 60, note: "Full range, no swinging." },
        { name: "Skull Crusher", sets: 3, reps: "10–12", rest: 60, note: "EZ bar, lower to forehead." },
      ],
    },
    {
      day: "Lower B — Hypertrophy Focus",
      label: "Friday",
      exercises: [
        { name: "Hack Squat or Leg Press", sets: 4, reps: "10–12", rest: 90, note: "More volume than Lower A." },
        { name: "Bulgarian Split Squat", sets: 3, reps: "10–12", rest: 90, note: "Rear foot elevated, front foot forward." },
        { name: "Leg Extension", sets: 3, reps: "12–15", rest: 60, note: "Quad isolation, pause at top." },
        { name: "Lying Leg Curl", sets: 3, reps: "12–15", rest: 60, note: "Hamstring isolation." },
        { name: "Hip Thrust (Barbell)", sets: 3, reps: "10–12", rest: 90, note: "Shoulders on bench, drive hips up." },
        { name: "Seated Calf Raise", sets: 4, reps: "15–20", rest: 45, note: "Soleus focus — different from standing." },
      ],
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SamplePlansPage() {
  const [wizardState, setWizardState] = useState("active"); // "active" | "done" | "skipped"
  const [answers, setAnswers] = useState({});
  const plansRef = useRef(null);

  function handleWizardComplete(newAnswers) {
    setAnswers(newAnswers);
    setWizardState("done");
    setTimeout(() => {
      plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }

  function handleSkip() {
    setWizardState("skipped");
  }

  function handleReset() {
    setAnswers({});
    setWizardState("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const wizardDone = wizardState === "done";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <SiteHeader label="Sample Plans" />

      <main className="mx-auto max-w-3xl px-4 py-12 space-y-16">

        {/* Page title */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-600/20 text-blue-400 border border-blue-500/30">
            Sample Workout Plans
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Workout Plans for Every Level
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Three proven training structures with full exercise lists, sets, reps, and rest periods. Answer three quick questions and we will point you to the right one.
          </p>
        </div>

        {/* Plan Finder */}
        {wizardState === "active" && (
          <PlanFinder onComplete={handleWizardComplete} onSkip={handleSkip} />
        )}
        {wizardState === "done" && (
          <WizardSummary answers={answers} onReset={handleReset} />
        )}

        {/* Plans */}
        <div ref={plansRef} className="space-y-16">

          {/* Plan 1: Beginner Full-Body */}
          <div className="space-y-4">
            {wizardDone && <MatchBanner {...(getMatchLevel("beginner", answers) ?? {})} />}
            <PlanCard {...BEGINNER_3DAY} />
          </div>

          <Section title="Training Principles: Beginner Full-Body">
            <p>
              Full-body training three times per week is the gold standard for beginners. Here's why it works:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li><strong className="text-slate-300">Frequency:</strong> Each muscle group is trained three times per week. Beginners respond strongly to frequent stimulation because the nervous system is still learning the movement patterns.</li>
              <li><strong className="text-slate-300">Compound movements:</strong> Exercises like the chest press, lat pulldown, and leg press work multiple muscle groups simultaneously. This is more efficient and builds a stronger foundation than isolation work.</li>
              <li><strong className="text-slate-300">Progressive overload:</strong> Add a small amount of weight (2.5–5kg) each week when you can complete all sets and reps with good form. This is the primary driver of muscle growth and strength gains.</li>
              <li><strong className="text-slate-300">Rest days:</strong> Training Monday, Wednesday, Friday gives you a rest day between every session. Muscle growth happens during recovery, not during the workout itself.</li>
            </ul>
          </Section>

          {/* Plan 2: Push/Pull/Legs */}
          <div className="space-y-4">
            {wizardDone && <MatchBanner {...(getMatchLevel("ppl", answers) ?? {})} />}
            <PlanCard {...INTERMEDIATE_PPL} />
          </div>

          <Section title="Training Principles: Push/Pull/Legs">
            <p>
              The Push/Pull/Legs split (PPL) is effective for intermediate lifters because it provides high volume per muscle group while maintaining adequate recovery. Key principles:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li><strong className="text-slate-300">Volume:</strong> Each muscle group gets 12–20 working sets per week, split across two sessions. This is the range most research identifies as optimal for muscle growth.</li>
              <li><strong className="text-slate-300">Strength + hypertrophy:</strong> The "A" sessions use heavier weights and lower reps (6–8) to build strength. The "B" sessions use moderate weights and higher reps (10–15) to maximise muscle growth.</li>
              <li><strong className="text-slate-300">Exercise variety:</strong> Using different exercises for the same muscle group across A and B sessions ensures all muscle fibres and angles are trained.</li>
              <li><strong className="text-slate-300">Rest periods:</strong> Compound movements (squats, deadlifts, bench press) need longer rest (2–3 minutes) to allow full recovery between heavy sets. Isolation exercises can use shorter rest (45–60 seconds).</li>
            </ul>
          </Section>

          {/* Plan 3: Upper/Lower */}
          <div className="space-y-4">
            {wizardDone && <MatchBanner {...(getMatchLevel("upperlower", answers) ?? {})} />}
            <PlanCard {...UPPER_LOWER} />
          </div>

          <Section title="Training Principles: Upper/Lower Split">
            <p>
              The Upper/Lower split is a versatile structure that works for both intermediate and advanced lifters. It's particularly good for people who want to train four days per week without overtraining.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li><strong className="text-slate-300">Twice-weekly frequency:</strong> Each muscle group is trained twice per week — once with a strength focus (lower reps, heavier weight) and once with a hypertrophy focus (higher reps, moderate weight). This combination produces better results than either approach alone.</li>
              <li><strong className="text-slate-300">Periodisation:</strong> Alternating between strength and hypertrophy sessions within the same week is a form of daily undulating periodisation (DUP), which research shows produces superior strength and size gains compared to a single-rep-range approach.</li>
              <li><strong className="text-slate-300">Recovery:</strong> Training upper body Monday and Thursday, lower body Tuesday and Friday, gives each half of the body 72 hours of recovery before being trained again.</li>
            </ul>
          </Section>

        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Generate your personalised version</h2>
          <p className="text-slate-400">
            Use the AI prompt generator to get a plan tailored to your exact goals, equipment, and schedule — with exercise instructions and video links included. Describe what you want (e.g. "Push/Pull/Legs, 6 days, intermediate, full gym") and the AI builds a complete, app-ready plan.
          </p>
          <Link
            to="/app"
            className="inline-block px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/30"
          >
            Open WorkoutPlanStudio
          </Link>
        </div>

        {/* Related links */}
        <div className="flex flex-wrap gap-3 text-sm">
          <Link to="/guide" className="text-blue-400 hover:underline">Read the how-to guide →</Link>
          <Link to="/faq" className="text-blue-400 hover:underline">Frequently asked questions →</Link>
        </div>

        <AdBanner adSlot="7634233038" />
      </main>

      <SiteFooter />
    </div>
  );
}
