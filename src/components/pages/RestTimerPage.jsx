import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const PRESETS = [
  { label: "30s", seconds: 30 },
  { label: "45s", seconds: 45 },
  { label: "60s", seconds: 60 },
  { label: "90s", seconds: 90 },
  { label: "2m", seconds: 120 },
  { label: "3m", seconds: 180 },
  { label: "5m", seconds: 300 },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rest Timer",
  description: "Free online rest timer for weight training. Choose 30s, 45s, 60s, 90s, 2m, 3m or 5m presets. Beeps when done.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  url: "https://www.workoutplanstudio.ca/tools/rest-timer",
  offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
  publisher: {
    "@type": "Organization",
    name: "WorkoutPlanStudio",
    url: "https://www.workoutplanstudio.ca",
  },
};

function beep(ctx) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sine";
  osc.frequency.value = 880;
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.4);
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0
    ? `${m}:${String(sec).padStart(2, "0")}`
    : `${sec}s`;
}

export default function RestTimerPage() {
  const [selected, setSelected] = useState(60);
  const [remaining, setRemaining] = useState(60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const stop = useCallback(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
  }, []);

  const reset = useCallback((secs) => {
    stop();
    setRemaining(secs ?? selected);
    setDone(false);
  }, [stop, selected]);

  const start = useCallback(() => {
    if (remaining === 0) return;
    setDone(false);
    setRunning(true);
    getAudioCtx(); // unlock audio context on user gesture
  }, [remaining, getAudioCtx]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          setDone(true);
          beep(audioCtxRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const progress = selected > 0 ? ((selected - remaining) / selected) * 100 : 0;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  const handlePreset = (secs) => {
    setSelected(secs);
    reset(secs);
  };

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
          <span className="text-slate-400">Rest Timer</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Rest Timer
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Pick a duration, hit start, and rest. Beeps when your rest is up — no app download needed.
          </p>
        </div>

        <hr className="border-slate-800" />

        {/* Timer */}
        <div className="flex flex-col items-center gap-8">
          {/* SVG ring */}
          <div className="relative">
            <svg width="200" height="200" className="-rotate-90">
              <circle
                cx="100" cy="100" r={radius}
                fill="none"
                stroke="#1e293b"
                strokeWidth="12"
              />
              <circle
                cx="100" cy="100" r={radius}
                fill="none"
                stroke={done ? "#22c55e" : "#3b82f6"}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-black tabular-nums ${done ? "text-green-400" : "text-white"}`}>
                {formatTime(remaining)}
              </span>
              {done && (
                <span className="text-sm font-semibold text-green-400 mt-1">Done!</span>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {!running ? (
              <button
                onClick={start}
                disabled={remaining === 0}
                className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/30"
              >
                {done || remaining === 0 ? "Restart" : "Start"}
              </button>
            ) : (
              <button
                onClick={stop}
                className="px-8 py-3 rounded-xl font-bold text-white bg-slate-700 hover:bg-slate-600 transition-all"
              >
                Pause
              </button>
            )}
            <button
              onClick={() => reset()}
              className="px-5 py-3 rounded-xl font-semibold text-slate-400 border border-slate-700 hover:border-slate-500 transition-all"
            >
              Reset
            </button>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap justify-center gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.seconds}
                onClick={() => handlePreset(p.seconds)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selected === p.seconds
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">How long should you rest?</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800/60">
                  {["Goal", "Recommended Rest"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Strength (1–5 reps, 85%+ 1RM)", "3–5 minutes"],
                  ["Hypertrophy (6–12 reps, 70–85% 1RM)", "60–120 seconds"],
                  ["Muscular endurance (15+ reps)", "30–60 seconds"],
                  ["Supersets / circuits", "No rest between, 90s after"],
                ].map(([goal, rec], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-slate-900/40" : "bg-slate-900/20"}>
                    <td className="px-4 py-3 text-slate-300">{goal}</td>
                    <td className="px-4 py-3 text-blue-400 font-semibold">{rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">Built-in rest timer in the app</h2>
          <p className="text-slate-400 text-sm">
            WorkoutPlanStudio starts the timer automatically after each set — with the exact rest time from your plan. Override it anytime with your preferred duration.
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
          <Link to="/tools/volume-calculator" className="text-blue-400 hover:underline">Volume Calculator →</Link>
          <Link to="/blog" className="text-blue-400 hover:underline">Training Blog →</Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
