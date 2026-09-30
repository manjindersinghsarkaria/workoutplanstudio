import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { AFFILIATE_PRODUCTS } from "@/data/affiliateProducts";

const SECTIONS = [
  {
    title: "Foundation Equipment",
    subtitle: "The core of any serious home or commercial gym setup.",
    ids: ["squat-rack", "olympic-barbell", "weight-plates"],
  },
  {
    title: "Protective Gear & Accessories",
    subtitle: "Protect your joints, improve your grip, and lift more safely.",
    ids: ["lifting-belt", "knee-sleeves", "wrist-wraps", "chalk"],
  },
  {
    title: "Home Gym Essentials",
    subtitle: "Space-efficient tools that cover 90% of exercises without a full rack.",
    ids: ["adjustable-dumbbells", "resistance-bands", "pull-up-bar"],
  },
  {
    title: "Recovery",
    subtitle: "Train harder by recovering smarter between sessions.",
    ids: ["foam-roller"],
  },
  {
    title: "Gym Bag",
    subtitle: "Built for daily use and everything you carry to the gym.",
    ids: ["gym-bag"],
  },
];

const RELATED_POSTS = [
  { to: "/blog/531-workout-program", label: "5/3/1 Programme Guide" },
  { to: "/blog/push-pull-legs-split", label: "Push Pull Legs Split" },
  { to: "/blog/progressive-overload", label: "Progressive Overload Explained" },
  { to: "/blog/3-day-full-body-workout", label: "3-Day Full Body Workout" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Gym Equipment for Home & Commercial Gyms (Canada)",
  description: "Curated gym equipment recommendations for strength training, hypertrophy, and home gym builds. All products available on Amazon.ca.",
  url: "https://www.workoutplanstudio.ca/gear",
  numberOfItems: Object.keys(AFFILIATE_PRODUCTS).length,
  itemListElement: Object.values(AFFILIATE_PRODUCTS).map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    url: p.url,
  })),
};

function ProductCard({ product }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group flex flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 p-5 transition-all hover:border-blue-500/50 hover:bg-slate-800/60 hover:shadow-lg hover:shadow-blue-900/20"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-white leading-snug group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>
        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-slate-500 group-hover:text-blue-400 transition-colors" aria-hidden="true" />
      </div>
      <p className="text-sm leading-relaxed text-slate-400 flex-1">
        {product.description}
      </p>
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="inline-block rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] font-semibold text-slate-400 border border-slate-700">
          {product.category}
        </span>
        <span className="text-xs font-semibold text-blue-400 group-hover:underline">
          View on Amazon →
        </span>
      </div>
    </a>
  );
}

export default function GearPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader label="Gear" />

      <main className="mx-auto max-w-4xl px-4 py-12 space-y-14">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-slate-300 transition">Home</Link>
          <span>/</span>
          <span className="text-slate-400">Recommended Gear</span>
        </nav>

        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Best Gym Equipment for Home & Commercial Gyms
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Curated picks for every training style — strength, hypertrophy, home gym, and recovery. All available on Amazon.ca with fast shipping across Canada.
          </p>
          {/* Affiliate disclosure */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-xs text-slate-500 leading-relaxed">
            This page contains affiliate links. If you buy through them, we earn a small commission at no extra cost to you — it helps keep WorkoutPlanStudio free.
          </div>
        </div>

        <hr className="border-slate-800" />

        {/* Product sections */}
        {SECTIONS.map((section) => {
          const products = section.ids.map((id) => AFFILIATE_PRODUCTS[id]).filter(Boolean);
          if (!products.length) return null;
          return (
            <section key={section.title} className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                <p className="text-slate-400 text-sm">{section.subtitle}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}

        <hr className="border-slate-800" />

        {/* Training guides */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Training Guides</h2>
            <p className="text-slate-400 text-sm">
              Not sure which equipment fits your programme? These guides explain exactly what you need and why.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {RELATED_POSTS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="group flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/40 px-5 py-4 hover:border-blue-500/40 transition-all"
              >
                <span className="text-sm font-semibold text-slate-300 group-hover:text-blue-400 transition-colors">
                  {label}
                </span>
                <span className="text-slate-600 group-hover:text-blue-400 transition-colors text-xs">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Free Training Tools</h2>
            <p className="text-slate-400 text-sm">
              Use these to plan your training before you buy.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { to: "/tools/calorie-calculator", title: "Calorie & Macro Calculator", body: "Find your daily calorie target and protein/carb/fat split for your goal." },
              { to: "/tools/bmi-calculator", title: "BMI Calculator", body: "Calculate your Body Mass Index and understand what it means for training." },
              { to: "/tools/1rm-calculator", title: "1RM Calculator", body: "Find out your one-rep max and the right training weights for every rep range." },
              { to: "/tools/rest-timer", title: "Rest Timer", body: "Time your rest periods for strength, hypertrophy, or endurance goals." },
              { to: "/tools/volume-calculator", title: "Volume Calculator", body: "Track weekly sets per muscle group against MEV/MAV landmarks." },
            ].map(({ to, title, body }) => (
              <Link
                key={to}
                to={to}
                className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-1.5 hover:border-blue-500/40 transition-all"
              >
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">Track every session with the gear you buy</h2>
          <p className="text-slate-400 text-sm">
            WorkoutPlanStudio logs your weights, reps, and rest times — free, no account needed, data stays on your device.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/app"
              className="inline-block px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/30 text-sm"
            >
              Open WorkoutPlanStudio →
            </Link>
            <Link
              to="/plans"
              className="inline-block px-6 py-2.5 rounded-xl font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 transition-all text-sm"
            >
              Browse Training Plans
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
