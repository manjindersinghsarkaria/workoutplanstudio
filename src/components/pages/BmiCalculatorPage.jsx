import { useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const BMI_CATEGORIES = [
  { max: 18.5, label: "Underweight",      color: "text-blue-400",   bg: "bg-blue-500" },
  { max: 25,   label: "Normal weight",    color: "text-green-400",  bg: "bg-green-500" },
  { max: 30,   label: "Overweight",       color: "text-amber-400",  bg: "bg-amber-500" },
  { max: 999,  label: "Obese",            color: "text-red-400",    bg: "bg-red-500" },
];

function getCategory(bmi) {
  return BMI_CATEGORIES.find((c) => bmi < c.max);
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BMI Calculator Canada",
  description: "Free BMI calculator for Canadians. Enter your height and weight in metric or imperial units to get your Body Mass Index and weight category.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  url: "https://www.workoutplanstudio.ca/tools/bmi-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
  publisher: { "@type": "Organization", name: "WorkoutPlanStudio", url: "https://www.workoutplanstudio.ca" },
};

export default function BmiCalculatorPage() {
  const [unit, setUnit] = useState("metric");

  // Metric inputs
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  // Imperial inputs
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLb, setWeightLb] = useState("");

  let bmi = null;
  if (unit === "metric") {
    const h = parseFloat(heightCm) / 100;
    const w = parseFloat(weightKg);
    if (h > 0 && w > 0) bmi = w / (h * h);
  } else {
    const totalIn = parseFloat(heightFt) * 12 + parseFloat(heightIn || 0);
    const w = parseFloat(weightLb);
    if (totalIn > 0 && w > 0) bmi = (w / (totalIn * totalIn)) * 703;
  }

  const category = bmi ? getCategory(bmi) : null;
  const barPct = bmi ? Math.min((bmi / 40) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader label="Tools" />

      <main className="mx-auto max-w-2xl px-4 py-12 space-y-10">
        <nav className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-slate-300 transition">Home</Link>
          <span>/</span>
          <Link to="/tools/calorie-calculator" className="hover:text-slate-300 transition">Tools</Link>
          <span>/</span>
          <span className="text-slate-400">BMI Calculator</span>
        </nav>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            BMI Calculator
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Calculate your Body Mass Index using metric or imperial units. Understand what the number means — and its limitations.
          </p>
        </div>

        <hr className="border-slate-800" />

        {/* Calculator */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 space-y-6">
          {/* Unit toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Units:</span>
            {["metric", "imperial"].map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                  unit === u ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          {unit === "metric" ? (
            <div className="grid sm:grid-cols-2 gap-4">
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
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-300">Height (ft)</label>
                <input type="number" min="1" max="8" value={heightFt} onChange={(e) => setHeightFt(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-300">Height (in)</label>
                <input type="number" min="0" max="11" value={heightIn} onChange={(e) => setHeightIn(e.target.value)}
                  placeholder="e.g. 10"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-300">Weight (lb)</label>
                <input type="number" min="50" max="700" value={weightLb} onChange={(e) => setWeightLb(e.target.value)}
                  placeholder="e.g. 176"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition" />
              </div>
            </div>
          )}

          {/* Result */}
          {bmi && category && (
            <div className="space-y-4">
              <div className="rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 px-6 py-5 text-center">
                <div className="text-sm text-slate-400 font-semibold mb-1">Your BMI</div>
                <div className={`text-5xl font-black ${category.color}`}>{bmi.toFixed(1)}</div>
                <div className={`text-base font-bold mt-1 ${category.color}`}>{category.label}</div>
              </div>

              {/* Visual bar */}
              <div className="space-y-2">
                <div className="relative h-3 w-full rounded-full overflow-hidden flex">
                  <div className="flex-1 bg-blue-500/70" />
                  <div className="flex-1 bg-green-500/70" />
                  <div className="flex-1 bg-amber-500/70" />
                  <div className="flex-1 bg-red-500/70" />
                  {/* Marker */}
                  <div
                    className="absolute top-0 h-full w-1 bg-white rounded-full shadow-lg"
                    style={{ left: `${barPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category table */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white">BMI Categories</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800/60">
                  {["BMI Range", "Category", "What it means"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Below 18.5", "Underweight", "May indicate insufficient muscle or fat mass"],
                  ["18.5 – 24.9", "Normal weight", "Associated with lowest health risk in population studies"],
                  ["25.0 – 29.9", "Overweight", "Elevated risk for some health conditions"],
                  ["30.0 and above", "Obese", "Higher risk — medical consultation recommended"],
                ].map(([range, cat, note], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-slate-900/40" : "bg-slate-900/20"}>
                    <td className="px-4 py-3 font-mono text-blue-400 font-semibold">{range}</td>
                    <td className="px-4 py-3 text-slate-200 font-semibold">{cat}</td>
                    <td className="px-4 py-3 text-slate-400">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Honest limitations callout */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-600/10 px-5 py-4 space-y-2">
          <h3 className="text-sm font-bold text-amber-400">BMI has real limitations — here's what it misses</h3>
          <ul className="text-sm text-amber-300/80 space-y-1 leading-relaxed">
            <li>• It does not distinguish between muscle and fat — a muscular athlete can register as "obese"</li>
            <li>• It does not account for age, sex, ethnicity, or where fat is distributed on the body</li>
            <li>• It is a population-level screening tool, not a personal health diagnosis</li>
          </ul>
          <p className="text-xs text-amber-300/60 pt-1">
            For a more complete picture, combine BMI with waist circumference, body fat percentage, and a conversation with your doctor.
          </p>
        </div>

        {/* Related tools */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Related Tools</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { to: "/tools/calorie-calculator", title: "Calorie & Macro Calculator", body: "Find your daily calorie target and protein/carb/fat split based on your goal." },
              { to: "/tools/1rm-calculator", title: "1RM Calculator", body: "Calculate your one-rep max and training weights for every rep range." },
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
          <h2 className="text-xl font-bold text-white">Ready to start training?</h2>
          <p className="text-slate-400 text-sm">
            Pick a proven workout plan and track every session — free, no account needed.
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
          <Link to="/tools/calorie-calculator" className="text-blue-400 hover:underline">Calorie Calculator →</Link>
          <Link to="/tools/1rm-calculator" className="text-blue-400 hover:underline">1RM Calculator →</Link>
          <Link to="/tools/rest-timer" className="text-blue-400 hover:underline">Rest Timer →</Link>
          <Link to="/blog" className="text-blue-400 hover:underline">Training Blog →</Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
