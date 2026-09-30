import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils";
import { THEME_PRESETS } from "@/constants";

function getCompletedSets(progressMap, dayId, exerciseId) { return Number(progressMap[`${dayId}__${exerciseId}`] || 0); }

/* Portal-based dropdown — never clipped by parent overflow */
export function DayPickerDropdown({ anchorRef, days, selectedDayId, progressMap, onSelect, onClose }) {
    const [pos, setPos] = useState({ top: 0, left: 0, width: 220 });
  
    useEffect(() => {
      function reposition() {
        if (!anchorRef.current) return;
        const r = anchorRef.current.getBoundingClientRect();
        const dropW = 240;
        let left = r.left;
        if (left + dropW > window.innerWidth - 8) left = window.innerWidth - dropW - 8;
        setPos({ top: r.bottom + 8, left, width: dropW });
      }
      reposition();
      window.addEventListener("resize", reposition);
      window.addEventListener("scroll", reposition, true);
      return () => { window.removeEventListener("resize", reposition); window.removeEventListener("scroll", reposition, true); };
    }, [anchorRef]);
  
    useEffect(() => {
      function handleClick(e) {
        if (anchorRef.current && anchorRef.current.contains(e.target)) return;
        if (e.target.closest("[data-daydropdown]")) return;
        onClose();
      }
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [anchorRef, onClose]);
  
    return createPortal(
      <div data-daydropdown
        style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width, zIndex: 9999 }}
        className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
        role="listbox" aria-label="Select workout day">
        <div className="max-h-72 overflow-y-auto">
          {days.map((day, idx) => {
            const theme = day.theme || THEME_PRESETS[idx % THEME_PRESETS.length];
            const active = day.id === selectedDayId;
            const total = day.exercises.reduce((s, ex) => s + ex.sets, 0);
            const done = day.exercises.reduce((s, ex) => s + getCompletedSets(progressMap, day.id, ex.id), 0);
            const pct = total ? Math.round((done / total) * 100) : 0;
            return (
              <button key={day.id} role="option" aria-selected={active}
                onClick={() => { onSelect(day.id); onClose(); }}
                className={cn("flex w-full items-center justify-between px-4 py-3 text-left text-sm transition",
                  active ? cn("bg-gradient-to-r font-black text-white", theme.accent) : "text-slate-200 hover:bg-white/10")}>
                <span>
                  <span className="font-bold">{day.label}</span>
                  <span className="ml-2 text-xs opacity-75">{day.short}</span>
                </span>
                <span className="text-xs opacity-75">{pct}%</span>
              </button>
            );
          })}
        </div>
      </div>,
      document.body
    );
  }
