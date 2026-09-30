import React from "react";
import { cn } from "@/utils";

export function SectionCard({ children, className = "" }) {
    return (
      <div className={cn("rounded-3xl border shadow-xl backdrop-blur-sm", "bg-slate-900", "border-slate-800", className)}>
        {children}
      </div>
    );
  }
