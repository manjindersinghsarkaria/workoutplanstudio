import { useState } from "react";
import { Shuffle, Check } from "lucide-react";
import { cn } from "@/utils";

/**
 * AlternateSelector — modern stacked exercise switcher.
 * Collapsed: slim dark header showing active exercise name + dot indicators.
 * Expanded: full-width stacked option rows, no scrollbar.
 */
export function AlternateSelector({
  baseExercise,
  alternates = [],
  selectedAlternateId = null,
  onSelectAlternate,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const validAlternates = alternates.filter(
    (alt) => alt && typeof alt === "object" && alt.id && alt.name
  );

  if (validAlternates.length === 0) return null;

  const allOptions = [
    { id: null, name: baseExercise.name, note: baseExercise.note, isBase: true },
    ...validAlternates.map((a) => ({ ...a, isBase: false })),
  ];

  const activeOption =
    selectedAlternateId === null
      ? allOptions[0]
      : allOptions.find((o) => o.id === selectedAlternateId) ?? allOptions[0];

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">

      {/* ── Collapsed header ── */}
      <button
        onClick={() => setIsExpanded((v) => !v)}
        aria-expanded={isExpanded}
        className={cn(
          "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
          "bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-900 dark:to-slate-800",
          "hover:from-slate-700 hover:to-slate-600",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400"
        )}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20">
          <Shuffle className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
        </span>

        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Swap exercise
          </div>
          <div className="flex items-center gap-2 truncate">
            <span className="text-sm font-black text-white truncate">
              {activeOption.name}
            </span>
            {activeOption.isBase && (
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-cyan-400">
                Original
              </span>
            )}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-1 shrink-0">
          {allOptions.map((o) => (
            <span
              key={o.id ?? "__base"}
              className={cn(
                "block rounded-full transition-all duration-200",
                o.id === selectedAlternateId
                  ? "h-2 w-2 bg-cyan-400"
                  : "h-1.5 w-1.5 bg-slate-500"
              )}
            />
          ))}
        </div>
      </button>

      {/* ── Expanded stacked options ── */}
      {isExpanded && (
        <div className="bg-slate-900 dark:bg-slate-950 divide-y divide-slate-800">
          {allOptions.map((option, idx) => {
            const isSelected = option.id === selectedAlternateId;
            return (
              <button
                key={option.id ?? "__base"}
                onClick={() => onSelectAlternate(option.id)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400",
                  "active:scale-[0.99] cursor-pointer",
                  isSelected
                    ? "bg-cyan-500/10"
                    : "hover:bg-slate-800/60"
                )}
              >
                {/* Number badge */}
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-colors",
                    isSelected
                      ? "bg-cyan-500 text-white"
                      : "bg-slate-700 text-slate-300"
                  )}
                >
                  {idx + 1}
                </span>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={cn(
                        "text-sm font-black",
                        isSelected ? "text-cyan-300" : "text-slate-100"
                      )}
                    >
                      {option.name}
                    </span>
                    {option.isBase && (
                      <span className="rounded-md bg-slate-700 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-300">
                        Original
                      </span>
                    )}
                  </div>
                  {option.note && (
                    <div className="mt-0.5 text-xs text-slate-400 leading-snug">
                      {option.note}
                    </div>
                  )}
                </div>

                {/* Check */}
                {isSelected && (
                  <Check className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
