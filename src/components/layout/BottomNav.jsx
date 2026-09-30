import React from "react";
import { Home, Settings, History } from "lucide-react";
import { NavButton } from "@/components/ui/NavButton";

export default function BottomNav({ view, setView }) {
  return (
    <nav aria-label="Main navigation" className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2 px-4 py-3 sm:max-w-xl lg:max-w-4xl">
        <NavButton active={view === "workout"} onClick={() => setView("workout")} icon={<Home className="h-5 w-5" aria-hidden="true" />} label="Workout" />
        <NavButton active={view === "plan"} onClick={() => setView("plan")} icon={<Settings className="h-5 w-5" aria-hidden="true" />} label="Plan" />
        <NavButton active={view === "history"} onClick={() => setView("history")} icon={<History className="h-5 w-5" aria-hidden="true" />} label="History" />
      </div>
    </nav>
  );
}
