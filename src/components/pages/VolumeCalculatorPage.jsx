import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Plus } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const MUSCLE_GROUPS = [
  "Chest", "Back", "Shoulders", "Biceps", "Triceps",
  "Quads", "Hamstrings", "Glutes", "Calves", "Core",
];

// Minimum Effective Volume / Maximum Adaptive Volume landmarks (sets/week)
const VOLUME_LANDMARKS = {
  Chest:       { mev: 8,  mav: 20 },
  Back:        { mev: 10, mav: 25 },
  Shoulders:   { mev: 6,  mav: 20 },
  Biceps:      { mev: 6,  mav: 20 },
  Triceps:     { mev: 6,  mav: 20 },
  Quads:       { mev: 8,  mav: 20 },
  Hamstrings:  { mev: 6,  mav: 20 },
  Glutes:      { mev: 4,  mav: 16 },
  Calves:      { mev: 8,  mav: 16 },
  Core:        { mev: 6,  mav: 16 },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Weekly Training Volume Calculator",
  description: "Track your weekly sets per muscle group. See if you're hitting the minimum effective volume (MEV) and maximum adaptive volume (MAV) landmarks for hypertrophy.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  url: "https://www.workoutplanstudio.ca/tools/volume-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
  publisher: {
    "@type": "Organization",
    name: "WorkoutPlanStudio",
    url: "https://www.workoutplanstudio.ca",
  },
};

function VolumeBar({ sets, mev, mav }) {
  const max = Math.max(mav * 1.2, sets + 2);
  const pctSets = Math.min((sets / max) * 100, 100);
  const pctMev = (mev / max) * 100;
  const pctMav = (mav / max) * 100;

  const color =
    sets === 0 ? "bg-slate-600"
    : sets < mev ? "bg-red-500"
    : sets <= mav ? "bg-green-500"
    : "bg-amber-500";

  return (
    <div className="relative h-4 w-full rounded-full bg-slate-800 overflow-hidden">
      <div
        className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${pctSets}%` }}
      />
      {/* MEV marker */}
      <div
        className="absolute top-0 h-full w-0.5 bg-blue-400/60"
        style={{ left: `${pctMev}%` }}
        title={`MEV: ${mev} sets`}
      />
      {/* MAV marker */}
      <div
        className="absolute top-0 h-full w-0.5 bg-slate-400/40"
        style={{ left: `${pctMav}%` }}
        title={`MAV: ${mav} sets`}
      />
    </div>
  );
}

function StatusPill({ sets, mev, mav }) {
  if (sets === 0) return <span className="text-xs text-slate-600">—</span>;
  if (sets < mev) return <span className="text-xs font-semibold text-red-400">Below MEV</span>;
  if (sets <= mav) return <span className="text-xs font-semibold text-green-400">On track</span>;
  return <span className="text-xs font-semibold text-amber-400">Above MAV</span>;
}

export default function VolumeCalculatorPage() {
  const [entries, setEntries] = useState([]);
  const [muscle, setMuscle] = useState(MUSCLE_GROUPS[0]);
  const [sets, setSets] = useState("");
  const [exercise, setExercise] = useState("");

  const addEntry = () => {
    const n = parseInt(sets, 10);
    if (!n || n < 1) return;
    setEntries((prev) => [
      ...prev,
      { id: Date.now(), muscle, exercise: exercise.trim() || muscle, sets: n },
    ]);
    setSets("");
    setExercise("");
  };

  const removeEntry = (id) => setEntries((prev) => prev.filter((e) => e.id !== id));

  // Aggregate sets per muscle group
  const totals = MUSCLE_GROUPS.reduce((acc, mg) => {
    acc[mg] = entries.filter((e) => e.muscle === mg).reduce((s, e) => s + e.sets, 0);
    return acc;
  }, {});

  const activeGroups = MUSCLE_GROUPS.filter((mg) => totals[mg] > 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader label="Tools" />

      <main className="mx-auto max-w-2xl px-4 py-12 space-y-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-slate-300 transition">Home</Link>
          <span>/</span>
          <span className="text-slate-400">Volume Calculator</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Weekly Volume Calculator
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Add your exercises and see if you're hitting the optimal weekly sets per muscle group for growth.
          </p>
        </div>

        <hr className="border-slate-800" />

        {/* Input */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 space-y-4">
          <h2 className="text-base font-bold text-white">Add an exercise</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Muscle group</label>
              <select
                value={muscle}
                onChange={(e) => setMuscle(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition"
              >
                {MUSCLE_GROUPS.map((mg) => (
                  <option key={mg} value={mg}>{mg}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Exercise (optional)</label>
              <input
                type="text"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                placeholder="e.g. Bench Press"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Sets this week</label>
              <input
                type="number"
                min="1"
                max="50"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addEntry()}
                placeholder="e.g. 4"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition"
              />
            </div>
          </div>
          <button
            onClick={addEntry}
            disabled={!sets || parseInt(sets, 10) < 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>

          {/* Entry list */}
          {entries.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              {entries.map((e) => (
                <div key={e.id} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-slate-300">{e.exercise}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-slate-500">{e.muscle}</span>
                    <span className="text-white font-semibold">{e.sets} sets</span>
                    <button
                      onClick={() => removeEntry(e.id)}
                      className="text-slate-600 hover:text-red-400 transition"
                      aria-label="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Volume summary */}
        {activeGroups.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">Weekly Volume Summary</h2>
            <div className="space-y-4">
              {MUSCLE_GROUPS.map((mg) => {
                const { mev, mav } = VOLUME_LANDMARKS[mg];
                const total = totals[mg];
                if (total === 0 && !activeGroups.includes(mg)) return null;
                return (
                  <div key={mg} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className={`font-semibold ${total > 0 ? "text-white" : "text-slate-600"}`}>{mg}</span>
                      <div className="flex items-center gap-3">
                        <StatusPill sets={total} mev={mev} mav={mav} />
                        <span className="font-mono text-slate-300 text-xs w-16 text-right">
                          {total} / {mev}–{mav} sets
                        </span>
                      </div>
                    </div>
                    <VolumeBar sets={total} mev={mev} mav={mav} />
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 bg-blue-400/60" /> MEV</span>
              <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 bg-slate-400/40" /> MAV</span>
              <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-red-500" /> Below MEV</span>
              <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-green-500" /> On track</span>
              <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-500" /> Above MAV</span>
            </div>
          </div>
        )}

        {/* Explainer */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">What is MEV and MAV?</h2>
          <p className="text-slate-400 leading-relaxed">
            <strong className="text-slate-200">MEV (Minimum Effective Volume)</strong> is the fewest weekly sets needed to make progress on a muscle group. Below this, you're likely maintaining at best.
          </p>
          <p className="text-slate-400 leading-relaxed">
            <strong className="text-slate-200">MAV (Maximum Adaptive Volume)</strong> is the most sets you can productively recover from. Above this, you accumulate fatigue faster than you adapt — more isn't always more.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Volume landmarks vary by individual, experience level, and recovery capacity. Use these as starting ranges, then adjust based on how you feel and progress.
          </p>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">Build a plan that hits your volume targets</h2>
          <p className="text-slate-400 text-sm">
            WorkoutPlanStudio's AI plan generator lets you set your goals, days per week, and focus areas — then builds you a complete plan.
          </p>
          <Link
            to="/app"
            className="inline-block px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/30 text-sm"
          >
            Open WorkoutPlanStudio →
          </Link>
        </div>

        {/* Related tools */}
        <div className="flex flex-wrap gap-4 text-sm">
          <Link to="/tools/1rm-calculator" className="text-blue-400 hover:underline">1RM Calculator →</Link>
          <Link to="/tools/rest-timer" className="text-blue-400 hover:underline">Rest Timer →</Link>
          <Link to="/blog" className="text-blue-400 hover:underline">Training Blog →</Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
