import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const ACTIVITY_LEVELS = [
  { key: "sedentary",   label: "Sedentary",             desc: "Little or no exercise, desk job",               multiplier: 1.2 },
  { key: "light",       label: "Lightly Active",        desc: "Light exercise 1–3 days/week",                  multiplier: 1.375 },
  { key: "moderate",    label: "Moderately Active",     desc: "Moderate exercise 3–5 days/week",               multiplier: 1.55 },
  { key: "active",      label: "Very Active",           desc: "Hard exercise 6–7 days/week",                   multiplier: 1.725 },
  { key: "extra",       label: "Extra Active",          desc: "Very hard exercise + physical job",              multiplier: 1.9 },
];

const GOALS = [
  { key: "cut",      label: "Lose Fat",       delta: -500, note: "~0.5 kg/week loss" },
  { key: "maintain", label: "Maintain",       delta: 0,    note: "maintain current weight" },
  { key: "bulk",     label: "Build Muscle",   delta: 300,  note: "~0.3 kg/week gain" },
];

// Mifflin-St Jeor BMR
function calcBMR(weightKg, heightCm, age, sex) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

function calcMacros(calories, goal) {
  // Protein: 2g/kg of bodyweight approximated via goal
  // Standard split: protein 30%, fat 25%, carbs 45% for muscle
  //                 protein 35%, fat 30%, carbs 35% for cut
  //                 protein 25%, fat 25%, carbs 50% for maintain
  const splits = {
    cut:      { protein: 0.35, fat: 0.30, carb: 0.35 },
    maintain: { protein: 0.25, fat: 0.25, carb: 0.50 },
    bulk:     { protein: 0.30, fat: 0.25, carb: 0.45 },
  };
  const s = splits[goal];
  return {
    protein: Math.round((calories * s.protein) / 4),
    fat:     Math.round((calories * s.fat) / 9),
    carbs:   Math.round((calories * s.carb) / 4),
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Calorie & Macro Calculator",
  description: "Free TDEE and macro calculator. Find your daily calorie needs using the Mifflin-St Jeor formula, then get a protein, carb, and fat breakdown for your goal.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  url: "https://www.workoutplanstudio.ca/tools/calorie-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
  publisher: { "@type": "Organization", name: "WorkoutPlanStudio", url: "https://www.workoutplanstudio.ca" },
};

export default function CalorieCalculatorPage() {
  const [unit, setUnit]         = useState("metric");
  const [sex, setSex]           = useState("male");
  const [age, setAge]           = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal]         = useState("maintain");

  const results = useMemo(() => {
    const a = parseInt(age, 10);
    let wKg, hCm;

    if (unit === "metric") {
      wKg = parseFloat(weightKg);
      hCm = parseFloat(heightCm);
    } else {
      wKg = parseFloat(weightLb) * 0.453592;
      hCm = (parseFloat(heightFt) * 12 + parseFloat(heightIn || 0)) * 2.54;
    }

    if (!wKg || !hCm || !a || wKg <= 0 || hCm <= 0 || a <= 0) return null;

    const bmr  = calcBMR(wKg, hCm, a, sex);
    const tdee = bmr * ACTIVITY_LEVELS.find((l) => l.key === activity).multiplier;
    const goalObj = GOALS.find((g) => g.key === goal);
    const target = Math.round(tdee + goalObj.delta);
    const macros = calcMacros(target, goal);

    return { bmr: Math.round(bmr), tdee: Math.round(tdee), target, macros, goalObj };
  }, [unit, sex, age, weightKg, weightLb, heightCm, heightFt, heightIn, activity, goal]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader label="Tools" />

      <main className="mx-auto max-w-2xl px-4 py-12 space-y-10">
        <nav className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-slate-300 transition">Home</Link>
          <span>/</span>
          <span className="text-slate-400">Calorie & Macro Calculator</span>
        </nav>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Calorie & Macro Calculator
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Find your daily calorie needs using the Mifflin-St Jeor formula, then get your protein, carb, and fat targets based on your goal.
          </p>
        </div>

        <hr className="border-slate-800" />

        {/* Form */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 space-y-6">

          {/* Unit + Sex */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-300">Units</label>
              <div className="flex gap-2">
                {["metric", "imperial"].map((u) => (
                  <button key={u} onClick={() => setUnit(u)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${unit === u ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-300">Sex</label>
              <div className="flex gap-2">
                {[["male","Male"],["female","Female"]].map(([k,l]) => (
                  <button key={k} onClick={() => setSex(k)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${sex === k ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Age + measurements */}
          <div className={`grid gap-4 ${unit === "metric" ? "sm:grid-cols-3" : "sm:grid-cols-4"}`}>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-300">Age</label>
              <input type="number" min="10" max="100" value={age} onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 28"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition" />
            </div>

            {unit === "metric" ? (
              <>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-300">Height (cm)</label>
                  <input type="number" min="50" max="250" value={heightCm} onChange={(e) => setHeightCm(e.target.value)}
                    placeholder="e.g. 175"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-300">Weight (kg)</label>
                  <input type="number" min="20" max="300" value={weightKg} onChange={(e) => setWeightKg(e.target.value)}
                    placeholder="e.g. 80"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-300">Height (ft)</label>
                  <input type="number" min="1" max="8" value={heightFt} onChange={(e) => setHeightFt(e.target.value)}
                    placeholder="5"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-300">Height (in)</label>
                  <input type="number" min="0" max="11" value={heightIn} onChange={(e) => setHeightIn(e.target.value)}
                    placeholder="10"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-300">Weight (lb)</label>
                  <input type="number" min="50" max="700" value={weightLb} onChange={(e) => setWeightLb(e.target.value)}
                    placeholder="176"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition" />
                </div>
              </>
            )}
          </div>

          {/* Activity */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Activity Level</label>
            <div className="space-y-2">
              {ACTIVITY_LEVELS.map((l) => (
                <button key={l.key} onClick={() => setActivity(l.key)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left transition-all ${activity === l.key ? "border-blue-500/60 bg-blue-600/10" : "border-slate-700 bg-slate-800/40 hover:border-slate-600"}`}>
                  <div>
                    <div className={`text-sm font-semibold ${activity === l.key ? "text-blue-400" : "text-slate-300"}`}>{l.label}</div>
                    <div className="text-xs text-slate-500">{l.desc}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${activity === l.key ? "border-blue-500 bg-blue-500" : "border-slate-600"}`}>
                    {activity === l.key && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Goal</label>
            <div className="grid grid-cols-3 gap-2">
              {GOALS.map((g) => (
                <button key={g.key} onClick={() => setGoal(g.key)}
                  className={`py-3 rounded-xl border text-sm font-semibold transition-all ${goal === g.key ? "border-blue-500/60 bg-blue-600/10 text-blue-400" : "border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-600"}`}>
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* TDEE summary */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "BMR", value: results.bmr, sub: "base metabolic rate" },
                { label: "TDEE", value: results.tdee, sub: "maintenance calories" },
                { label: "Target", value: results.target, sub: results.goalObj.note },
              ].map(({ label, value, sub }) => (
                <div key={label} className="rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-4 text-center">
                  <div className="text-xs text-slate-500 mb-1">{label}</div>
                  <div className="text-2xl font-black text-white">{value.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">kcal/day</div>
                  <div className="text-[10px] text-slate-600 mt-1 leading-tight">{sub}</div>
                </div>
              ))}
            </div>

            {/* Macro breakdown */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 space-y-5">
              <h2 className="text-lg font-bold text-white">Daily Macro Targets</h2>
              {[
                { label: "Protein", value: results.macros.protein, cal: results.macros.protein * 4, color: "bg-blue-500", pct: Math.round((results.macros.protein * 4 / results.target) * 100) },
                { label: "Carbohydrates", value: results.macros.carbs, cal: results.macros.carbs * 4, color: "bg-amber-500", pct: Math.round((results.macros.carbs * 4 / results.target) * 100) },
                { label: "Fat", value: results.macros.fat, cal: results.macros.fat * 9, color: "bg-rose-500", pct: Math.round((results.macros.fat * 9 / results.target) * 100) },
              ].map(({ label, value, cal, color, pct }) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-300">{label}</span>
                    <div className="flex items-center gap-3 text-slate-400">
                      <span>{cal} kcal</span>
                      <span className="font-mono font-bold text-white">{value}g</span>
                      <span className="text-slate-600 w-8 text-right">{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Practical tips */}
            <div className="rounded-xl border border-blue-500/30 bg-blue-600/10 px-5 py-4 space-y-2">
              <h3 className="text-sm font-bold text-blue-400">How to hit your targets</h3>
              <ul className="text-sm text-blue-300/80 space-y-1 leading-relaxed">
                <li>• Prioritise protein first — it preserves muscle on a cut and drives growth on a bulk</li>
                <li>• Track for 2 weeks, then adjust by ±100–200 kcal based on actual weight change</li>
                <li>• These are starting estimates — individual metabolism varies by up to 15%</li>
              </ul>
            </div>
          </div>
        )}

        {/* Explainer */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">How is TDEE calculated?</h2>
          <p className="text-slate-400 leading-relaxed">
            <strong className="text-slate-200">TDEE (Total Daily Energy Expenditure)</strong> is estimated in two steps:
          </p>
          <ol className="space-y-2 text-slate-400 leading-relaxed">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold flex items-center justify-center">1</span>
              <span><strong className="text-slate-200">BMR</strong> (Basal Metabolic Rate) — calories your body burns at complete rest, using the <strong className="text-slate-200">Mifflin-St Jeor formula</strong>, the most validated equation for most adults.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold flex items-center justify-center">2</span>
              <span><strong className="text-slate-200">Activity multiplier</strong> — BMR is multiplied by your activity level (1.2 – 1.9) to account for exercise and daily movement.</span>
            </li>
          </ol>
        </section>

        {/* Related tools */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Related Tools</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { to: "/tools/bmi-calculator", title: "BMI Calculator", body: "Check your Body Mass Index and understand what the number actually means." },
              { to: "/tools/1rm-calculator", title: "1RM Calculator", body: "Find your one-rep max and optimal training weights." },
              { to: "/tools/volume-calculator", title: "Volume Calculator", body: "Track weekly sets per muscle group against MEV/MAV targets." },
            ].map(({ to, title, body }) => (
              <Link key={to} to={to} className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-1 hover:border-blue-500/40 transition-all">
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">Now put those numbers to work</h2>
          <p className="text-slate-400 text-sm">
            Pick a training plan that matches your goal and track every session in WorkoutPlanStudio — free, no account needed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/plans" className="inline-block px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/30 text-sm">
              Browse Training Plans →
            </Link>
            <Link to="/app" className="inline-block px-6 py-2.5 rounded-xl font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 transition-all text-sm">
              Open the App
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <Link to="/tools/bmi-calculator" className="text-blue-400 hover:underline">BMI Calculator →</Link>
          <Link to="/tools/rest-timer" className="text-blue-400 hover:underline">Rest Timer →</Link>
          <Link to="/blog" className="text-blue-400 hover:underline">Training Blog →</Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
