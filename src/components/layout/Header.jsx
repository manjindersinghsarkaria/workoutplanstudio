import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dumbbell, Settings, Moon, Sun, Zap, Volume2, X, Info } from "lucide-react";
import { cn } from "@/utils";
import { useVersionCheck } from "@/hooks/useVersionCheck";
import { WhatsNewModal } from "@/components/ui/WhatsNewModal";
import { CHANGELOG } from "@/changelog";

export default function Header({ darkMode, setDarkMode, plan, wakeLockEnabled, setWakeLockEnabled, soundEnabled, setSoundEnabled }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [whatsNewOpen, setWhatsNewOpen] = useState(false);
  const settingsPanelRef = useRef(null);
  
  const { hasNewVersion, newChanges, markAsSeen, currentVersion } = useVersionCheck();

  // Close settings on outside click
  useEffect(() => {
    if (!settingsOpen) return;
    function onPointerDown(e) {
      if (settingsPanelRef.current && !settingsPanelRef.current.contains(e.target)) setSettingsOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [settingsOpen]);

  // Close settings on Escape
  useEffect(() => {
    if (!settingsOpen) return;
    function onKey(e) { if (e.key === "Escape") setSettingsOpen(false); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [settingsOpen]);

  const wakeLockSupported = "wakeLock" in navigator;
  
  function handleWhatsNewClick() {
    console.log('[Header] What\'s New button clicked');
    console.log('[Header] CHANGELOG:', CHANGELOG);
    
    if (!CHANGELOG || CHANGELOG.length === 0) {
      console.error('[Header] CHANGELOG is empty or undefined!');
      return;
    }
    
    setWhatsNewOpen((v) => !v);
    console.log('[Header] Toggled whatsNewOpen');
  }
  
  function handleWhatsNewClose() {
    console.log('[Header] Closing What\'s New panel');
    setWhatsNewOpen(false);
    if (hasNewVersion) {
      console.log('[Header] Marking version as seen');
      markAsSeen();
    }
  }

  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:max-w-xl lg:max-w-4xl">
        {/* Logo + plan name — tapping takes user back to home/landing page */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="Go to home page">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg group-active:scale-95 transition-transform">
            <Dumbbell className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <div className="text-sm font-black tracking-wide text-white">{plan?.meta?.appName || "Workout Coach"}</div>
            <div className="text-xs font-medium text-slate-300">
              {plan.planType === "multi_week" ? `Multi-Week · ${plan.totalWeeks} wks` : "Weekly Plan"} · V6
            </div>
          </div>
        </Link>

        {/* Right side: info button + settings gear + user button */}
        <div className="flex items-center gap-3">
          {/* What's New button - always visible, badge shows for new updates */}
          <div className="relative">
            <button
              onClick={handleWhatsNewClick}
              aria-label="What's new"
              aria-expanded={whatsNewOpen}
              className="relative rounded-2xl border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <Info className="h-5 w-5" aria-hidden="true" />
              {hasNewVersion && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white animate-pulse">
                  !
                </span>
              )}
            </button>
          </div>

          <div className="relative" ref={settingsPanelRef}>
            <button
              onClick={() => setSettingsOpen((v) => !v)}
              aria-label="Open settings"
              aria-expanded={settingsOpen}
              className="rounded-2xl border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <Settings className={cn("h-5 w-5 transition-transform duration-300", settingsOpen && "rotate-45")} aria-hidden="true" />
            </button>

            {/* Settings panel */}
            {settingsOpen && (
              <div className="absolute right-0 top-14 w-72 rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl ring-1 ring-black/20">
                {/* Panel header */}
                <div className="flex items-center justify-between border-b border-slate-700/60 px-4 py-3">
                  <span className="text-sm font-black text-white">Settings</span>
                  <button
                    onClick={() => setSettingsOpen(false)}
                    aria-label="Close settings"
                    className="rounded-xl p-1.5 text-slate-400 transition hover:bg-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Settings rows */}
                <div className="space-y-1 p-3">
                  {/* Dark mode */}
                  <SettingRow
                    icon={darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    label="Dark Mode"
                    description="Easy on the eyes in the gym"
                    checked={darkMode}
                    onChange={() => setDarkMode((v) => !v)}
                  />

                  {/* Wake lock */}
                  <SettingRow
                    icon={<Zap className="h-4 w-4" />}
                    label="Keep Screen On"
                    description={
                      wakeLockSupported
                        ? "Prevent screen lock during workout"
                        : "Not supported on this browser"
                    }
                    checked={wakeLockEnabled}
                    onChange={() => setWakeLockEnabled((v) => !v)}
                    disabled={!wakeLockSupported}
                  />

                  {/* Sound */}
                  <SettingRow
                    icon={<Volume2 className="h-4 w-4" />}
                    label="Rest Timer Beep"
                    description="Play a beep when rest time ends"
                    checked={soundEnabled}
                    onChange={() => setSoundEnabled((v) => !v)}
                  />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
      
      {/* What's New Modal - Rendered outside to center properly */}
      {whatsNewOpen && (
        <WhatsNewModal
          changes={CHANGELOG.slice(0, 5)}
          onClose={handleWhatsNewClose}
        />
      )}
    </div>
  );
}

function SettingRow({ icon, label, description, checked, onChange, disabled = false }) {
  return (
    <button
      onClick={disabled ? undefined : onChange}
      aria-pressed={checked}
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition",
        disabled
          ? "cursor-not-allowed opacity-40"
          : "cursor-pointer hover:bg-slate-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
      )}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-slate-300">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold text-white">{label}</div>
        <div className="text-xs text-slate-400">{description}</div>
      </div>
      {/* Toggle pill */}
      <div className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
        checked ? "bg-cyan-500" : "bg-slate-600"
      )}>
        <div className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0.5"
        )} />
      </div>
    </button>
  );
}
