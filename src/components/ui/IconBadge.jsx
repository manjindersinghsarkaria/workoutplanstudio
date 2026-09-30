import React from "react";
import { cn } from "../../utils";

export function IconBadge({ icon, text, className = "" }) {
    return (
      <div className={cn("inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-bold", className)}>
        {icon}<span>{text}</span>
      </div>
    );
  }
