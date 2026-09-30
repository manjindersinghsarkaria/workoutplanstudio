import { useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const EPLEY_PERCENTAGES = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

function calcEpley(weight, reps) {
  if (reps === 1) return weight;
  return weight * (1 + reps / 30);
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "1RM Calculator",
  description: "Calculate your one-rep max using the Epley formula. Enter weight and reps to get your estimated 1RM and percentage breakdown.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  url: "https://www.workoutplanstudio.ca/tools/1rm-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
  publisher: {
    "@type": "Organization",
    name: "WorkoutPlanStudio",
    url: "https://www.workoutplanstudio.ca",
  },
};

export default function OneRmCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [unit, setUnit] = useState("kg");

  const w = parseFloat(weight);
  const r = parseInt(reps, 10);
  const valid = !isNaN(w) && w > 0 && !isNaN(r) && r >= 1 && r <= 30;
  const oneRm = valid ? calcEpley(w, r) : null;

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
          <span className="text-slate-400">1RM Calculator</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            One-Rep Max Calculator
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Estimate your 1RM using the Epley formula. Enter the weight you lifted and how many reps you completed.
          </p>
        </div>

        <hr className="border-slate-800" />

        {/* Calculator */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 space-y-6">
          {/* Unit toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Unit:</span>
            {["kg", "lb"].map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  unit === u
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-300">
                Weight ({unit})
              </label>
              <input
                type="number"
                min="1"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={`e.g. 100`}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-300">
                Reps completed
              </label>
              <input
                type="number"
                min="1"
                max="30"
                step="1"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="e.g. 5"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Result */}
          {oneRm && (
            <div className="rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30 px-6 py-5 text-center">
              <div className="text-sm text-blue-400 font-semibold mb-1">Estimated 1RM</div>
              <div className="text-4xl font-black text-white">
                {oneRm.toFixed(1)} <span className="text-2xl text-slate-400">{unit}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">Epley formula</div>
            </div>
          )}
        </div>

        {/* Percentage breakdown */}
        {oneRm && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">Percentage Breakdown</h2>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-800/60">
                    {["% of 1RM", `Weight (${unit})`, "Typical Use"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-slate-200">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {EPLEY_PERCENTAGES.map((pct, i) => {
                    const uses = {
                      100: "1RM test",
                      95: "Maximal strength",
                      90: "Heavy singles/doubles",
                      85: "3–5 rep strength work",
                      80: "4–6 rep strength/hypertrophy",
                      75: "6–8 reps",
                      70: "8–10 rep hypertrophy",
                      65: "10–12 reps",
                      60: "12–15 reps / endurance",
                      55: "15–20 reps",
                      50: "Warm-up / deload",
                    };
                    return (
                      <tr key={pct} className={i % 2 === 0 ? "bg-slate-900/40" : "bg-slate-900/20"}>
                        <td className="px-4 py-3 font-semibold text-blue-400">{pct}%</td>
                        <td className="px-4 py-3 text-white font-mono">{((oneRm * pct) / 100).toFixed(1)}</td>
                        <td className="px-4 py-3 text-slate-400">{uses[pct]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Explainer */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">How is 1RM calculated?</h2>
          <p className="text-slate-400 leading-relaxed">
            The <strong className="text-slate-200">Epley formula</strong> estimates your theoretical one-rep max from a sub-maximal effort:
          </p>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 px-5 py-4 font-mono text-sm text-blue-300">
            1RM = weight × (1 + reps ÷ 30)
          </div>
          <p className="text-slate-400 leading-relaxed">
            This is most accurate for sets of 2–10 reps. Accuracy drops at very high rep counts. Use it as a training guide, not a competition prediction.
          </p>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">Track your lifts session by session</h2>
          <p className="text-slate-400 text-sm">
            WorkoutPlanStudio logs every set with your weight and reps, tracks personal records, and auto-starts your rest timer.
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
          <Link to="/tools/rest-timer" className="text-blue-400 hover:underline">Rest Timer →</Link>
          <Link to="/tools/volume-calculator" className="text-blue-400 hover:underline">Volume Calculator →</Link>
          <Link to="/blog" className="text-blue-400 hover:underline">Training Blog →</Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
