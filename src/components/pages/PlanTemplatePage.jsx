import { useParams, Link, Navigate } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { getTemplateBySlug, planTemplates } from "@/data/planTemplates";
import { buildShareUrlFromTemplate } from "@/utils/sharePlan";
import { AffiliateProducts } from "@/components/ui/AffiliateProducts";
import { TEMPLATE_GEAR } from "@/data/affiliateProducts";

const EQUIPMENT_LABELS = {
  full: { label: "Full gym", style: "bg-amber-600/10 text-amber-400 border-amber-500/20" },
  barbell: { label: "Barbell only", style: "bg-amber-600/10 text-amber-400 border-amber-500/20" },
  machines: { label: "No barbell", style: "bg-emerald-600/10 text-emerald-400 border-emerald-500/20" },
};

// ── Shared sub-components ─────────────────────────────────────────────────────

function ExerciseRow({ name, sets, reps, rest, note }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-slate-800 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white">{name}</div>
        {note && <div className="text-xs text-slate-500 mt-0.5">{note}</div>}
      </div>
      <div className="flex items-center gap-2 shrink-0 text-xs flex-wrap">
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

function DayCard({ day, label, exercises, accent }) {
  return (
    <div className="rounded-2xl border border-slate-800 overflow-hidden">
      <div className={`bg-gradient-to-r ${accent} px-5 py-3`}>
        <div className="text-xs font-bold uppercase tracking-wider text-white/80">
          {label}
        </div>
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

// ── Related plans ─────────────────────────────────────────────────────────────

function RelatedPlans({ currentSlug }) {
  const related = planTemplates
    .filter((t) => t.slug !== currentSlug)
    .slice(0, 3);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Other Programs</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {related.map((t) => (
          <Link
            key={t.slug}
            to={`/plans/${t.slug}`}
            className="group block rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-blue-500/40 transition-all"
          >
            <div className={`h-1 rounded-full bg-gradient-to-r ${t.accent} mb-3`} />
            <p className="text-xs text-slate-500 mb-1">{t.difficulty}</p>
            <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-blue-400 transition-colors">
              {t.shortTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {t.daysPerWeek} days/week · {t.category}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PlanTemplatePage() {
  const { slug } = useParams();
  const template = getTemplateBySlug(slug);

  if (!template) return <Navigate to="/plans" replace />;

  let useThisPlanUrl = "/app";
  try { useThisPlanUrl = buildShareUrlFromTemplate(template); } catch { /* fall back to /app */ }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: template.title,
    description: template.description,
    datePublished: template.datePublished,
    dateModified: template.datePublished,
    author: {
      "@type": "Organization",
      name: "WorkoutPlanStudio",
      url: "https://www.workoutplanstudio.ca",
    },
    publisher: {
      "@type": "Organization",
      name: "WorkoutPlanStudio",
      url: "https://www.workoutplanstudio.ca",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.workoutplanstudio.ca/plans/${template.slug}`,
    },
    keywords: template.tags?.join(", "),
  };

  const formattedDate = new Date(template.datePublished).toLocaleDateString(
    "en-CA",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader label="Workout Plans" />

      <main className="mx-auto max-w-3xl px-4 py-12 space-y-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link to="/plans" className="hover:text-slate-300 transition">
            Plans
          </Link>
          <span>/</span>
          <span className="text-slate-400 truncate">{template.shortTitle}</span>
        </nav>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${template.badge}`}
            >
              {template.category}
            </span>
            {EQUIPMENT_LABELS[template.equipment] && (
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${EQUIPMENT_LABELS[template.equipment].style}`}>
                {EQUIPMENT_LABELS[template.equipment].label}
              </span>
            )}
            <span className="text-xs text-slate-500">{template.difficulty}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            {template.title}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            {template.description}
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { label: "Days/Week", value: template.daysPerWeek },
              { label: "Duration", value: template.recommendedWeeks },
              { label: "Level", value: template.difficulty.split(" ")[0] },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-center"
              >
                <div className="text-lg font-black text-white">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <div className="text-xs text-slate-600 pt-1">{formattedDate}</div>

          {/* Primary CTA — visible without scrolling */}
          <a
            href={useThisPlanUrl}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/30 text-sm"
          >
            Use This Plan in WorkoutPlanStudio →
          </a>
        </div>

        <hr className="border-slate-800" />

        {/* Overview */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Program Overview</h2>
          <p className="text-slate-400 leading-relaxed">{template.overview}</p>
        </section>

        {/* Key benefits */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Key Benefits</h2>
          <ul className="space-y-2">
            {template.keyBenefits.map((b, i) => (
              <li key={i} className="flex gap-3 text-slate-400 leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Who it's for */}
        <section className="rounded-xl border border-blue-500/30 bg-blue-600/10 px-5 py-4 space-y-1">
          <h3 className="text-sm font-bold text-blue-400">Who is this for?</h3>
          <p className="text-sm text-blue-300 leading-relaxed">
            {template.whoIsItFor}
          </p>
        </section>

        {/* The workouts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">
            The Program
          </h2>
          <div className="space-y-4">
            {template.days.map((d) => (
              <DayCard key={d.day} {...d} />
            ))}
          </div>
        </section>

        {/* Progression */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">How to Progress</h2>
          <p className="text-slate-400 leading-relaxed">
            {template.progressionNotes}
          </p>
        </section>

        {/* Affiliate gear */}
        <AffiliateProducts gearSetKey={TEMPLATE_GEAR[slug]} />

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">
            Track this program session by session
          </h2>
          <p className="text-slate-400 text-sm">
            WorkoutPlanStudio lets you follow any workout plan with built-in
            rest timers, set logging, and session history. Free, no account
            needed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={useThisPlanUrl}
              className="inline-block px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/30 text-sm"
            >
              Use This Plan →
            </a>
            <Link
              to="/guide"
              className="inline-block px-6 py-2.5 rounded-xl font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 transition-all text-sm"
            >
              How to load a plan
            </Link>
          </div>
        </div>

        {/* Related plans */}
        <RelatedPlans currentSlug={slug} />

        <div className="flex flex-wrap gap-4 text-sm">
          <Link to="/plans" className="text-blue-400 hover:underline">
            ← All programs
          </Link>
          <Link to="/blog" className="text-blue-400 hover:underline">
            Read the training blog →
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
