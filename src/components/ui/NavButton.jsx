import React from "react";
import { cn } from "@/utils";

export function NavButton({ active, onClick, icon, label }) {
    return (
      <button onClick={onClick} aria-current={active ? "page" : undefined}
        className={cn("flex flex-col items-center justify-center rounded-2xl px-3 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
          active ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg" : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white")}>
        {icon}<span className="mt-1">{label}</span>
      </button>
    );
  }
