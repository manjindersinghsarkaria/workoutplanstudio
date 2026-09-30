import { ExternalLink } from "lucide-react";
import { AFFILIATE_PRODUCTS, GEAR_SETS } from "@/data/affiliateProducts";

/**
 * Renders a "Recommended Gear" section for a given gear set key.
 * Returns null when no products match so callers need no conditional logic.
 */
export function AffiliateProducts({ gearSetKey }) {
  const ids = GEAR_SETS[gearSetKey];
  if (!ids?.length) return null;

  const products = ids.map((id) => AFFILIATE_PRODUCTS[id]).filter(Boolean);
  if (!products.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <h2 className="text-xl font-bold text-white">Recommended Gear</h2>
        <span className="text-[11px] text-slate-500">
          Affiliate links — we earn a small commission at no extra cost to you.
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {products.map((product) => (
          <a
            key={product.id}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group flex flex-col gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 p-4 transition-all hover:border-blue-500/50 hover:bg-slate-800/60"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-bold text-white transition-colors group-hover:text-blue-400">
                {product.name}
              </span>
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500 transition-colors group-hover:text-blue-400" aria-hidden="true" />
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {product.description}
            </p>
            <div className="mt-auto pt-1">
              <span className="inline-block rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                {product.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
