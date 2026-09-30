import { Link } from "react-router-dom";

/**
 * Shared top-bar used on all content/info pages (not the app itself).
 * Shows the site name on the left and a back-to-home link.
 */
export default function SiteHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl sticky top-0 z-40">
      <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="text-sm font-bold text-slate-400 hover:text-white transition shrink-0"
        >
          ← WorkoutPlanStudio
        </Link>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <Link to="/gear" className="hover:text-slate-300 transition">Gear</Link>
          <Link to="/blog" className="hover:text-slate-300 transition">Blog</Link>
          <Link to="/plans" className="hover:text-slate-300 transition">Plans</Link>
          <Link to="/sample-plans" className="hover:text-slate-300 transition">Workout Plans</Link>
        </div>
      </div>
    </header>
  );
}
