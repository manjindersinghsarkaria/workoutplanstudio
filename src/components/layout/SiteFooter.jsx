import { Link } from "react-router-dom";

/**
 * Shared footer used on all content/info pages.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-800 py-8 px-4 mt-12 bg-slate-950">
      <div className="mx-auto max-w-4xl flex flex-col items-center gap-4 text-sm text-slate-500 sm:grid sm:grid-cols-3 sm:items-center sm:gap-6">
        <Link to="/" className="font-semibold text-slate-400 hover:text-white transition">
          WorkoutPlanStudio
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link to="/blog" className="hover:text-slate-300 transition">Blog</Link>
          <Link to="/plans" className="hover:text-slate-300 transition">Workout Plans</Link>
          <Link to="/gear" className="hover:text-slate-300 transition">Gear</Link>
          <Link to="/guide" className="hover:text-slate-300 transition">How to Use</Link>
          <Link to="/sample-plans" className="hover:text-slate-300 transition">Sample Plans</Link>
          <Link to="/faq" className="hover:text-slate-300 transition">FAQ</Link>
          <Link to="/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
        </nav>
        <span className="sm:text-right">© {year} WorkoutPlanStudio.</span>
      </div>
    </footer>
  );
}
