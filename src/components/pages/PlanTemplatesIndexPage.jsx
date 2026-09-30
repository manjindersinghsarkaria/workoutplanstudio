import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { planTemplates } from "@/data/planTemplates";
import { buildShareUrlFromTemplate } from "@/utils/sharePlan";

// ── Filter config ─────────────────────────────────────────────────────────────

const GOAL_FILTERS = [
  { id: "all", label: "Any goal" },
  { id: "Strength", label: "Strength" },
  { id: "Hypertrophy", label: "Hypertrophy" },
  { id: "Hybrid Strength/Hypertrophy", label: "Hybrid" },
];

const EQUIPMENT_FILTERS = [
  { id: "all", label: "Any equipment" },
  { id: "machines", label: "No barbell" },
  { id: "barbell", label: "Barbell only" },
  { id: "full", label: "Full gym" },
];

const DAYS_FILTERS = [
  { id: "all", label: "Any days" },
  { id: 3, label: "3 days" },
  { id: 4, label: "4 days" },
  { id: 5, label: "5 days" },
  { id: 6, label: "6 days" },
];

const EQUIPMENT_LABELS = {
  full: { label: "Full gym", style: "bg-amber-600/10 text-amber-400 border-amber-500/20" },
  barbell: { label: "Barbell only", style: "bg-amber-600/10 text-amber-400 border-amber-500/20" },
  machines: { label: "No barbell", style: "bg-emerald-600/10 text-emerald-400 border-emerald-500/20" },
};

// ── Components ────────────────────────────────────────────────────────────────

function FilterBar({ filters, active, onChange }) {
  return (
    <div
      className="flex gap-1.5 overflow-x-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
    >
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            active === f.id
              ? "bg-blue-600 border-blue-500 text-white"
              : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

const DIFFICULTY_COLORS = {
  Beginner: "bg-green-600/20 text-green-400 border-green-500/30",
  "Beginner to Intermediate": "bg-teal-600/20 text-teal-400 border-teal-500/30",
  Intermediate: "bg-blue-600/20 text-blue-400 border-blue-500/30",
  "Intermediate to Advanced": "bg-purple-600/20 text-purple-400 border-purple-500/30",
  Advanced: "bg-orange-600/20 text-orange-400 border-orange-500/30",
};

function TemplateCard({ template }) {
  const navigate = useNavigate();
  const diffCls =
    DIFFICULTY_COLORS[template.difficulty] ??
    "bg-slate-600/20 text-slate-400 border-slate-500/30";
  const equip = EQUIPMENT_LABELS[template.equipment];

  let useUrl = "/app";
  try { useUrl = buildShareUrlFromTemplate(template); } catch { /* fallback */ }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/plans/${template.slug}`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/plans/${template.slug}`)}
      className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-blue-500/40 hover:bg-slate-900 transition-all"
    >
      <div className={`h-1.5 bg-gradient-to-r ${template.accent}`} />

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-white leading-snug group-hover:text-blue-400 transition-colors">
              {template.shortTitle}
            </h2>
            {template.acronymExpanded && (
              <p className="text-xs text-slate-500 mt-0.5">{template.acronymExpanded}</p>
            )}
          </div>
          <span className={`flex-shrink-0 inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${diffCls}`}>
            {template.difficulty}
          </span>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
          {template.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400">
            <span className="font-semibold text-slate-300">{template.daysPerWeek}</span> days/week
          </span>
          <span className="text-slate-700">·</span>
          <span className="text-slate-400">{template.category}</span>
          <span className="text-slate-700">·</span>
          <span className="text-slate-400">{template.recommendedWeeks}</span>
        </div>

        {equip && (
          <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium border ${equip.style}`}>
            {equip.label}
          </span>
        )}

        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-xs font-semibold text-blue-400 group-hover:underline">
            View full program →
          </span>
          <a
            href={useUrl}
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 transition-all shrink-0"
          >
            Use this plan
          </a>
        </div>
      </div>
    </div>
  );
}

function PlanSection({ title, dot, templates }) {
  if (templates.length === 0) return null;
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${dot}`} />
        {title}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t) => <TemplateCard key={t.slug} template={t} />)}
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PlanTemplatesIndexPage() {
  const [goalFilter, setGoalFilter] = useState("all");
  const [equipFilter, setEquipFilter] = useState("all");
  const [daysFilter, setDaysFilter] = useState("all");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Workout Plan Templates — WorkoutPlanStudio",
    description:
      "10 pre-built workout programs: PPL, Bro Split, 5/3/1, Upper Lower, StrongLifts, Starting Strength, PHUL, Arnold Split, GZCLP, and Beginner Full Body.",
    url: "https://www.workoutplanstudio.ca/plans",
    publisher: {
      "@type": "Organization",
      name: "WorkoutPlanStudio",
      url: "https://www.workoutplanstudio.ca",
    },
  };

  const filtered = planTemplates.filter((t) => {
    const goalOk = goalFilter === "all" || t.category === goalFilter;
    const equipOk = equipFilter === "all" || t.equipment === equipFilter;
    const daysOk = daysFilter === "all" || t.daysPerWeek === daysFilter;
    return goalOk && equipOk && daysOk;
  });

  const beginnerTemplates = filtered.filter((t) =>
    t.difficulty.toLowerCase().startsWith("beginner")
  );
  const intermediateTemplates = filtered.filter((t) =>
    t.difficulty.toLowerCase().startsWith("intermediate")
  );
  const advancedTemplates = filtered.filter(
    (t) =>
      !t.difficulty.toLowerCase().startsWith("beginner") &&
      !t.difficulty.toLowerCase().startsWith("intermediate")
  );

  const isFiltered = goalFilter !== "all" || equipFilter !== "all" || daysFilter !== "all";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader label="Workout Plans" />

      <main className="mx-auto max-w-4xl px-4 py-12 space-y-10">
        {/* Hero */}
        <div className="space-y-3 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-600/20 text-blue-400 border border-blue-500/30">
            Pre-Built Programs
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            10 Proven Workout Plans
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            From beginner barbell programs to advanced 6-day splits. Filter by goal and equipment to find the right fit, then load any plan directly into WorkoutPlanStudio.
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="space-y-1.5 flex-1">
              <p className="text-xs text-slate-500 font-medium">Goal</p>
              <FilterBar filters={GOAL_FILTERS} active={goalFilter} onChange={setGoalFilter} />
            </div>
            <div className="space-y-1.5 flex-1">
              <p className="text-xs text-slate-500 font-medium">Equipment</p>
              <FilterBar filters={EQUIPMENT_FILTERS} active={equipFilter} onChange={setEquipFilter} />
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs text-slate-500 font-medium">Days / week</p>
            <FilterBar filters={DAYS_FILTERS} active={daysFilter} onChange={setDaysFilter} />
          </div>

          {/* Result count + reset */}
          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-slate-500">
              {isFiltered
                ? `${filtered.length} of ${planTemplates.length} plans`
                : `${planTemplates.length} plans`}
            </p>
            {isFiltered && (
              <button
                onClick={() => { setGoalFilter("all"); setEquipFilter("all"); setDaysFilter("all"); }}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Plan grids */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center space-y-2">
            <p className="text-slate-400 text-sm">No plans match these filters.</p>
            <button
              onClick={() => { setGoalFilter("all"); setEquipFilter("all"); setDaysFilter("all"); }}
              className="text-xs text-blue-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            <PlanSection title="Beginner Programs" dot="bg-green-500" templates={beginnerTemplates} />
            <PlanSection title="Intermediate Programs" dot="bg-blue-500" templates={intermediateTemplates} />
            <PlanSection title="Advanced Programs" dot="bg-orange-500" templates={advancedTemplates} />
          </div>
        )}

        {/* Quick comparison table */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Quick Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800/60">
                  {["Program", "Level", "Days/Week", "Goal", "Equipment", "Duration"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-slate-200 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {planTemplates.map((t, i) => {
                  const equip = EQUIPMENT_LABELS[t.equipment];
                  return (
                    <tr key={t.slug} className={i % 2 === 0 ? "bg-slate-900/40" : "bg-slate-900/20"}>
                      <td className="px-4 py-3">
                        <Link to={`/plans/${t.slug}`} className="text-blue-400 hover:underline font-medium">
                          {t.shortTitle}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{t.difficulty}</td>
                      <td className="px-4 py-3 text-slate-400">{t.daysPerWeek}</td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{t.category}</td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                        {equip?.label ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{t.recommendedWeeks}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">
            Track any of these plans in the app
          </h2>
          <p className="text-slate-400 text-sm">
            WorkoutPlanStudio turns any workout plan into an interactive session tracker — rest timers, set logging, and history. Free, no account needed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/app"
              className="inline-block px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/30 text-sm"
            >
              Open WorkoutPlanStudio
            </Link>
            <Link
              to="/blog"
              className="inline-block px-6 py-2.5 rounded-xl font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 transition-all text-sm"
            >
              Read the Training Blog
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
