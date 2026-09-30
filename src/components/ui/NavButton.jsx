import React from "react";
import { cn } from "@/utils";

export function NavButton({ active, onClick, icon, label }) {
    return (
      <button onClick={onClick} aria-current={active ? "page" : undefined}
        className={cn("flex flex-col items-center justify-center rounded-2xl px-3 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
          active ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg" : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white")}>
        {icon}<span className="mt-1">{label}</span>
      </button>
    );
  }
