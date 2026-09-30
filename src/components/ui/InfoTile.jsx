import React from "react";

export function InfoTile({ label, value }) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
        <div className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300">{label}</div>
        <div className="mt-1 text-lg font-black text-slate-900 dark:text-white">{value}</div>
      </div>
    );
  }
