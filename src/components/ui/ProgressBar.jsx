import React from "react";
import { cn } from "@/utils";

export function ProgressBar({ value, className = "" }) {
    const v = Math.max(0, Math.min(100, Number(value || 0)));
    return (
      <div className={cn("h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800", className)}>
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-300" style={{ width: `${v}%` }} />
      </div>
    );
  }
