import { useState, useRef } from "react";
import {
    Home, ClipboardPaste, Upload, Download, Sparkles, Copy, Check,
    RotateCcw, Trash2, FileDown, Share2
} from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { normalizePlan, validatePlanShape } from "@/helpers";
import { enrichPlan } from "@/utils/enrichPlan";
import { APP_SAMPLE_PLANS } from "@/data/appSamplePlans";
import { buildShareUrl } from "@/utils/sharePlan";
import { DEFAULT_PLAN } from "@/constants";

const AI_TOOLS = [
    { label: "ChatGPT", url: "https://chatgpt.com",          brandBg: "bg-[#10a37f]", initial: "G" },
    { label: "Claude",  url: "https://claude.ai",            brandBg: "bg-[#d97757]", initial: "C" },
    { label: "Gemini",  url: "https://gemini.google.com",    brandBg: "bg-[#4285f4]", initial: "G" },
];

const OPTION_ROWS = [
    { label: "Plan type",  key: "planType",   options: ["single_week", "multi_week"] },
    { label: "Goal",       key: "goal",        options: ["build muscle", "lose fat", "endurance"] },
    { label: "Experience", key: "experience",  options: ["beginner", "intermediate", "advanced"] },
    { label: "Days/week",  key: "days",        options: ["3", "4", "5", "6"] },
    { label: "Equipment",  key: "equipment",   options: ["full gym", "dumbbells", "home", "bodyweight"] },
];

const TOGGLE_ROWS = [
    { label: "Warm-up",   key: "warmup" },
    { label: "Cool-down", key: "cooldown" },
];

function buildPrompt(opts) {
    const { planType, goal, experience, days, equipment, warmup, cooldown } = opts;
    const isMultiWeek = planType === "multi_week";

    const warmupLine = warmup === "yes"
        ? `      "warmUp": [{ "name": "Exercise name", "duration": "45 sec", "note": "Brief cue" }],`
        : "";
    const cooldownLine = cooldown === "yes"
        ? `      "coolDown": [{ "name": "Stretch name", "duration": "30 sec", "note": "Brief cue" }]`
        : "";

    const singleWeekExample = `{
  "planType": "single_week",
  "meta": { "notes": "Brief description of the plan" },
  "days": [
    {
      "label": "Day 1",
      "short": "Push",
      "title": "Chest & Triceps",
${warmupLine}
      "exercises": [
        { "name": "Barbell Bench Press", "sets": 4, "reps": "6-8",  "rest": 120, "note": "Primary strength lift" },
        { "name": "Incline DB Press",    "sets": 3, "reps": "10-12", "rest": 90  }
      ]${cooldownLine ? `,\n${cooldownLine}` : ""}
    }
  ]
}`;

    const multiWeekExample = `{
  "planType": "multi_week",
  "totalWeeks": 4,
  "meta": { "notes": "Brief description" },
  "weeks": [
    {
      "weekNumber": 1,
      "days": [
        {
          "label": "Week 1 · Day 1",
          "short": "Push",
          "title": "Chest & Triceps",
${warmupLine}
          "exercises": [
            { "name": "Barbell Bench Press", "sets": 3, "reps": "10-12", "rest": 90, "note": "Moderate load week 1" }
          ]${cooldownLine ? `,\n          ${cooldownLine}` : ""}
        }
      ]
    }
  ]
}`;

    return `Create a workout plan and return it as JSON only — no explanation, no markdown, no code fences.

MY DETAILS:
Goal: ${goal}
Experience: ${experience}
Plan type: ${isMultiWeek ? "Multi-week progressive (4 weeks)" : "Single week repeating"}
Days per week: ${days}
Equipment: ${equipment}
Include warm-up: ${warmup}
Include cool-down: ${cooldown}

REQUIRED JSON FORMAT:
${isMultiWeek ? multiWeekExample : singleWeekExample}

RULES:
- Include exactly ${days} workout day(s) per week${isMultiWeek ? " per week, for 4 weeks" : ""}
- 4-6 exercises per day
- "rest" is an integer in seconds (e.g. 90 not "90s")
- "reps" is a string (e.g. "8-10", "12", "30 sec")
- "note" is optional — short coaching cue only
- warmUp and coolDown are optional — include only if requested above
- Return ONLY the JSON. No text before or after it.`;
}

const DEFAULT_PROMPT_OPTIONS = {
    planType: "single_week",
    goal: "build muscle",
    experience: "intermediate",
    days: "4",
    equipment: "full gym",
    warmup: "yes",
    cooldown: "yes",
};

import { trackEvent } from "@/analytics.js";

export default function PlanView({ plan, onApplyPlan, onResetPlan, setSelectedDayId, setView, initialPromptOptions }) {
    const [pasteText, setPasteText]     = useState("");
    const [status, setStatus]           = useState("");
    const [promptCopied, setPromptCopied] = useState(null); // null | "copy" | ai-tool label
    const [expandedSample, setExpandedSample] = useState(null); // index of expanded plan card
    const fileInputRef = useRef(null);

    const [promptOptions, setPromptOptions] = useState(initialPromptOptions ?? DEFAULT_PROMPT_OPTIONS);

    function setOption(key, value) {
        setPromptOptions(prev => ({ ...prev, [key]: value }));
    }

    // ── Apply a built-in sample plan ──────────────────────────────────────
    function applySamplePlan(samplePlan) {
        try {
            const normalized = enrichPlan(normalizePlan(samplePlan));
            onApplyPlan(normalized, promptOptions);
            setSelectedDayId(normalized.days[0]?.id || "day1");
            setStatus(`✅ "${samplePlan.meta.notes}" applied`);
            setExpandedSample(null);
            trackEvent("apply_plan", { source: "sample" });
            setView("workout");
        } catch (err) {
            const msg = err instanceof Error ? err.message : null;
            setStatus(msg ? `❌ ${msg}` : "❌ Couldn't load the sample plan.");
        }
    }

    // ── Apply pasted plan ──────────────────────────────────────────────────
    function applyPlan() {
        try {
            const normalized = enrichPlan(normalizePlan(validatePlanShape(pasteText.trim())));
            onApplyPlan(normalized, promptOptions);
            setSelectedDayId(normalized.days[0]?.id || "day1");
            setStatus("✅ Plan applied successfully");
            setPasteText("");
            trackEvent("apply_plan");
            setView("workout");
        } catch (err) {
            const msg = err instanceof Error ? err.message : null;
            setStatus(msg ? `❌ ${msg}` : "❌ Couldn't read the plan. Make sure you pasted the full AI response.");
        }
    }

    // ── Import from file ───────────────────────────────────────────────────
    function importPlanFile(event) {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const normalized = enrichPlan(normalizePlan(validatePlanShape(e.target?.result)));
                onApplyPlan(normalized, promptOptions);
                setSelectedDayId(normalized.days[0]?.id || "day1");
                setStatus("✅ Plan loaded successfully");
                trackEvent("apply_plan");
                setView("workout");
            } catch (err) {
                const msg = err instanceof Error ? err.message : null;
                setStatus(msg ? `❌ ${msg}` : "❌ Couldn't load the file. Please try exporting the plan again.");
            }
        };
        reader.readAsText(file);
        event.target.value = "";
    }

    // ── Export current plan ────────────────────────────────────────────────
    function exportPlan() {
        const blob = new Blob([JSON.stringify(plan, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "my-workout-plan.json";
        a.click();
        URL.revokeObjectURL(url);
        setStatus("✅ Plan saved to your device");
    }

    // ── Reset to default ───────────────────────────────────────────────────
    function resetToDefault() {
        onResetPlan();
        setStatus("✅ Restored to default plan");
    }

    // ── Copy prompt (+ optionally open AI tool) ────────────────────────────
    function handleCopyPrompt(toolLabel = null) {
        const prompt = buildPrompt(promptOptions);
        navigator.clipboard.writeText(prompt).then(() => {
            setPromptCopied(toolLabel || "copy");
            trackEvent("generate_plan");
            trackEvent("copy_prompt", toolLabel ? { tool: toolLabel } : {});
            if (toolLabel) {
                const tool = AI_TOOLS.find(t => t.label === toolLabel);
                if (tool) window.open(tool.url, "_blank", "noopener,noreferrer");
            }
            setTimeout(() => setPromptCopied(null), 2500);
        });
    }

    const currentPlanName = plan?.meta?.notes || plan?.meta?.appName || "Current plan";

    return (
        <>
            {/* ── Header ── */}
            <SectionCard className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-4 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-white/80">Plan Manager</div>
                            <div className="mt-0.5 text-xl font-black">My Workout Plan</div>
                        </div>
                        <button
                            onClick={() => setView("workout")}
                            className="flex items-center gap-1.5 rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-xs font-black text-white backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                            <Home className="h-3.5 w-3.5" aria-hidden="true" />Back
                        </button>
                    </div>
                </div>
            </SectionCard>

            {/* ── Step 1: Get a plan from AI ── */}
            <SectionCard className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-white">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />Step 1 — Don't have a plan yet?
                    </div>
                    <div className="mt-0.5 text-base font-black">Generate one with AI</div>
                </div>

                <div className="flex flex-col gap-4 p-4">
                    {/* How it works */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                        {[
                            { step: "1", label: "Pick your options & copy prompt" },
                            { step: "2", label: "Paste into ChatGPT, Claude or Gemini" },
                            { step: "3", label: "Copy the response & paste below" },
                        ].map(({ step, label }) => (
                            <div key={step} className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-2.5 dark:border-slate-700 dark:bg-slate-800">
                                <div className="text-base font-black text-blue-500 dark:text-blue-400">{step}</div>
                                <div className="mt-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Option pickers */}
                    <div className="rounded-xl border border-blue-900/50 bg-blue-950/20 p-3">
                        <div className="mb-2.5 text-xs font-bold uppercase tracking-wide text-blue-400">Customise your plan</div>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                            {OPTION_ROWS.map(({ label, key, options }) => (
                                <div key={key}>
                                    <label htmlFor={`opt-${key}`} className="mb-1 block text-xs font-semibold text-slate-300">{label}</label>
                                    <select
                                        id={`opt-${key}`}
                                        value={promptOptions[key]}
                                        onChange={(e) => setOption(key, e.target.value)}
                                        className="w-full rounded-lg border border-slate-600 bg-slate-800 px-2.5 py-1.5 text-xs font-bold text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400/40"
                                    >
                                        {options.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>

                        {/* Toggles for warm-up / cool-down */}
                        <div className="mt-3 flex items-center gap-4 border-t border-slate-700 pt-3">
                            {TOGGLE_ROWS.map(({ label, key }) => {
                                const isOn = promptOptions[key] === "yes";
                                return (
                                    <button
                                        key={key}
                                        role="switch"
                                        aria-checked={isOn}
                                        onClick={() => setOption(key, isOn ? "no" : "yes")}
                                        className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg"
                                    >
                                        {/* track */}
                                        <span className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 transition-colors duration-200 ${isOn ? "border-blue-500 bg-blue-500" : "border-slate-600 bg-slate-700"}`}>
                                            {/* thumb */}
                                            <span className={`inline-block h-3.5 w-3.5 translate-y-px rounded-full bg-white shadow transition-transform duration-200 ${isOn ? "translate-x-3.5" : "translate-x-0.5"}`} />
                                        </span>
                                        <span className="text-xs font-semibold text-slate-300">{label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Step 1: Copy prompt — primary action */}
                    <button
                        onClick={() => handleCopyPrompt(null)}
                        className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-white shadow transition focus-visible:outline-none focus-visible:ring-2 ${
                            promptCopied === "copy"
                                ? "bg-emerald-600 focus-visible:ring-emerald-400"
                                : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 focus-visible:ring-blue-400"
                        }`}
                    >
                        {promptCopied === "copy"
                            ? <><Check className="h-4 w-4" aria-hidden="true" />Prompt copied — now paste it into your AI</>
                            : <><Copy className="h-4 w-4" aria-hidden="true" />Copy Prompt</>
                        }
                    </button>

                    {/* Step 2: Open AI tool — secondary action */}
                    <div className="flex flex-col gap-1.5">
                        <div className="text-xs font-semibold text-slate-400">
                            Then open your AI and paste:
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {AI_TOOLS.map(({ label, brandBg, initial }) => (
                                <button
                                    key={label}
                                    onClick={() => handleCopyPrompt(label)}
                                    title={`Copy prompt & open ${label}`}
                                    className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-2.5 text-xs font-black shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                                        promptCopied === label
                                            ? "border-emerald-500 bg-emerald-600 text-white"
                                            : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                                    }`}
                                >
                                    {promptCopied === label ? (
                                        <>
                                            <Check className="h-4 w-4" aria-hidden="true" />
                                            <span>Opening…</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${brandBg}`} aria-hidden="true">
                                                {initial}
                                            </span>
                                            <span>{label}</span>
                                        </>
                                    )}
                                </button>
                            ))}
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">Copies the prompt again and opens the site in a new tab</p>
                    </div>
                </div>
            </SectionCard>

            {/* ── Sample Plan Picker ── */}
            <SectionCard className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-white">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
                        <Download className="h-3.5 w-3.5" aria-hidden="true" />Or skip the AI
                    </div>
                    <div className="mt-0.5 text-base font-black">Use a ready-made plan</div>
                </div>

                <div className="flex flex-col gap-2 p-4 bg-slate-900">
                    {APP_SAMPLE_PLANS.map((sample, idx) => {
                        const { badge, level, daysLabel, description } = sample._ui;
                        const isExpanded = expandedSample === idx;

                        return (
                            <div key={idx} className="rounded-2xl border border-slate-700 bg-slate-800 overflow-hidden">
                                {/* Card header — always visible */}
                                <button
                                    onClick={() => setExpandedSample(isExpanded ? null : idx)}
                                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-slate-700/60 transition-colors"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${badge}`}>
                                                {level}
                                            </span>
                                            <span className="text-xs text-slate-400">{daysLabel}</span>
                                        </div>
                                        <div className="mt-1 text-sm font-bold text-white truncate">
                                            {sample.meta.notes}
                                        </div>
                                    </div>
                                    <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-white text-xs transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>▾</span>
                                </button>

                                {/* Expandable detail */}
                                {isExpanded && (
                                    <div className="border-t border-slate-700 bg-slate-900/60 px-4 py-3 space-y-3">
                                        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>

                                        {/* Day pills */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {sample.days.map((d) => (
                                                <span
                                                    key={d.short}
                                                    className="rounded-lg border border-slate-600 bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300"
                                                >
                                                    {d.short}
                                                </span>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => applySamplePlan(sample)}
                                            className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2.5 text-sm font-black text-white shadow transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                                        >
                                            Use this plan →
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </SectionCard>

            {/* ── Step 2: Paste & Apply ── */}
            <SectionCard className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-white">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
                        <ClipboardPaste className="h-3.5 w-3.5" aria-hidden="true" />Step 2 — Load a new plan
                    </div>
                    <div className="mt-0.5 text-base font-black">Paste your AI response here</div>
                </div>

                <div className="flex flex-col gap-3 p-4">
                    <div className="relative">
                        <textarea
                            value={pasteText}
                            onChange={(e) => setPasteText(e.target.value)}
                            aria-label="Paste AI-generated plan here"
                            placeholder="Paste the AI response here, then tap Apply Plan..."
                            className="min-h-[140px] w-full rounded-2xl border border-slate-600 bg-slate-800 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                            spellCheck={false}
                        />
                        {pasteText.length > 0 && (
                            <button
                                onClick={() => { setPasteText(""); setStatus(""); }}
                                aria-label="Clear paste area"
                                className="absolute right-3 top-3 rounded-lg p-1 text-slate-500 hover:bg-slate-700 hover:text-slate-300"
                            >
                                <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                        )}
                    </div>

                    <button
                        onClick={applyPlan}
                        disabled={!pasteText.trim()}
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-black text-white shadow transition hover:from-blue-500 hover:to-cyan-400 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                        Apply Plan
                    </button>

                    {status && (
                        <div role="status" aria-live="polite" className="rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-xs font-semibold text-slate-100">
                            {status}
                        </div>
                    )}
                </div>
            </SectionCard>

            {/* ── Manage current plan ── */}
            <SectionCard className="p-4">
                <div className="mb-3 text-sm font-black text-white">Manage Current Plan</div>
                <div className="mb-3 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-400">
                    Active: <span className="font-bold text-white">{currentPlanName}</span>
                    {plan?.days?.length ? ` · ${plan.days.length} day${plan.days.length !== 1 ? "s" : ""}` : ""}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={exportPlan}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-2.5 text-xs font-black text-white shadow hover:from-blue-500 hover:to-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                        <FileDown className="h-3.5 w-3.5" aria-hidden="true" />Save Plan to Device
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-xs font-black text-slate-300 hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
                    >
                        <Upload className="h-3.5 w-3.5" aria-hidden="true" />Load Saved Plan
                    </button>
                    <button
                        onClick={() => {
                            try {
                                const url = buildShareUrl(plan);
                                navigator.clipboard.writeText(url).then(() => {
                                    setStatus("✅ Share link copied to clipboard");
                                });
                            } catch (err) {
                                setStatus(`❌ ${err.message}`);
                            }
                        }}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-xs font-black text-slate-300 hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
                    >
                        <Share2 className="h-3.5 w-3.5" aria-hidden="true" />Share Plan
                    </button>
                    <button
                        onClick={resetToDefault}
                        className="col-span-2 flex items-center justify-center gap-1.5 rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-xs font-black text-slate-400 hover:border-red-800 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
                    >
                        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />Restore Default Plan
                    </button>
                </div>
                <input ref={fileInputRef} type="file" accept=".json,application/json" className="hidden" onChange={importPlanFile} />
            </SectionCard>
        </>
    );
}
