/**
 * Pre-built workout plan templates for WorkoutPlanStudio.
 * Each template has full exercise lists per day and SEO metadata.
 *
 * Used by: PlanTemplatesIndexPage (/plans) and PlanTemplatePage (/plans/:slug)
 */

export const planTemplates = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. Push Pull Legs 6-Day
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "push-pull-legs-6-day",
    title: "Push Pull Legs (PPL) — 6-Day Split",
    shortTitle: "Push Pull Legs",
    description:
      "A complete 6-day Push Pull Legs program for intermediate lifters. Train each muscle group twice per week with dedicated push, pull, and leg sessions.",
    difficulty: "Intermediate",
    daysPerWeek: 6,
    recommendedWeeks: "12–16 weeks",
    category: "Hypertrophy",
    equipment: "full",
    accent: "from-blue-600 to-cyan-500",
    badge: "bg-blue-600/20 text-blue-400 border-blue-500/30",
    datePublished: "2025-03-01",
    tags: ["PPL", "push pull legs", "6 day workout", "muscle building", "intermediate"],
    overview:
      "The Push Pull Legs split is one of the most popular and effective programs for intermediate lifters. By grouping muscles that work together (push muscles assist on chest day, pull muscles assist on back day), you maximise stimulus per session while allowing adequate recovery. The 6-day version trains each muscle group twice per week — the frequency the research identifies as optimal for hypertrophy.",
    keyBenefits: [
      "Each muscle group trained twice per week — optimal for hypertrophy",
      "Logical grouping means muscles assist each other without being pre-fatigued",
      "High total weekly volume (12–20 sets per muscle group)",
      "A/B sessions provide exercise variety to hit muscles from multiple angles",
    ],
    whoIsItFor:
      "Intermediate lifters with 6–18 months of consistent training who are comfortable with compound lifts. Not recommended for beginners — a 3-day full body program produces faster results at that stage.",
    progressionNotes:
      "Use double progression: train within a rep range (e.g. 8–10). When you hit the top of the range on all sets, add 2.5–5 kg next session. For compound lifts, aim to add weight every 1–2 weeks. For isolation work, every 2–3 weeks.",
    days: [
      {
        day: "Push A — Chest Focus",
        label: "Monday",
        accent: "from-blue-600 to-cyan-500",
        exercises: [
          { name: "Barbell Bench Press", sets: 4, reps: "5–7", rest: 180, note: "Primary strength movement. Work up to a heavy top set." },
          { name: "Incline Dumbbell Press", sets: 3, reps: "8–12", rest: 90, note: "30–45° incline. Full stretch at the bottom." },
          { name: "Cable Fly (Low Cable)", sets: 3, reps: "12–15", rest: 60, note: "Slight elbow bend, squeeze at the top." },
          { name: "Overhead Press (Barbell)", sets: 3, reps: "8–10", rest: 90, note: "Strict press. No leg drive." },
          { name: "Lateral Raise", sets: 4, reps: "15–20", rest: 45, note: "Lead with elbows, slight forward lean." },
          { name: "Tricep Pushdown (Rope)", sets: 3, reps: "12–15", rest: 45, note: "Flare the rope outward at the bottom." },
          { name: "Overhead Tricep Extension", sets: 3, reps: "12–15", rest: 45, note: "Keep elbows pointing forward throughout." },
        ],
      },
      {
        day: "Pull A — Back Focus",
        label: "Tuesday",
        accent: "from-blue-600 to-cyan-500",
        exercises: [
          { name: "Barbell Row", sets: 4, reps: "5–7", rest: 180, note: "Hinge to ~45°. Pull to lower chest or upper belly." },
          { name: "Weighted Pull-Up", sets: 3, reps: "5–8", rest: 120, note: "Full hang at bottom. Chin clears bar." },
          { name: "Lat Pulldown (Wide Grip)", sets: 3, reps: "10–12", rest: 90, note: "Pull to upper chest. Squeeze lats at bottom." },
          { name: "Seated Cable Row (Neutral)", sets: 3, reps: "10–12", rest: 90, note: "Chest tall, pull to lower sternum." },
          { name: "Face Pull", sets: 3, reps: "15–20", rest: 45, note: "External rotation at the end. Essential for shoulder health." },
          { name: "Barbell Curl", sets: 3, reps: "8–10", rest: 60, note: "Full range. No swinging." },
          { name: "Hammer Curl", sets: 3, reps: "10–12", rest: 45, note: "Neutral grip. Builds brachialis and forearms." },
        ],
      },
      {
        day: "Legs A — Quad Focus",
        label: "Wednesday",
        accent: "from-blue-600 to-cyan-500",
        exercises: [
          { name: "Barbell Back Squat", sets: 4, reps: "5–7", rest: 180, note: "Primary lower body strength lift. Knees track over toes." },
          { name: "Leg Press", sets: 3, reps: "10–12", rest: 120, note: "Shoulder-width foot placement. Full range of motion." },
          { name: "Leg Extension", sets: 3, reps: "12–15", rest: 60, note: "Quad isolation. Pause at the top for 1 second." },
          { name: "Romanian Deadlift", sets: 3, reps: "10–12", rest: 90, note: "Hinge at the hips. Feel the hamstring stretch." },
          { name: "Leg Curl (Lying)", sets: 3, reps: "12–15", rest: 60, note: "Full range. Squeeze the hamstring at the top." },
          { name: "Standing Calf Raise", sets: 4, reps: "15–20", rest: 45, note: "Full stretch at the bottom. Pause at the top." },
        ],
      },
      {
        day: "Push B — Shoulder Focus",
        label: "Thursday",
        accent: "from-cyan-600 to-blue-500",
        exercises: [
          { name: "Overhead Press (Barbell)", sets: 4, reps: "5–7", rest: 180, note: "Primary strength movement for this session." },
          { name: "Incline Barbell Press", sets: 3, reps: "8–10", rest: 90, note: "Builds upper chest. Bar to clavicle area." },
          { name: "Dumbbell Lateral Raise", sets: 4, reps: "12–15", rest: 45, note: "4 sets here — shoulders get priority today." },
          { name: "Cable Fly (High Cable)", sets: 3, reps: "12–15", rest: 60, note: "Targets lower chest fibres. Arms slightly below shoulder height." },
          { name: "Rear Delt Fly (Machine or Cable)", sets: 3, reps: "15–20", rest: 45, note: "Light weight, high reps. Don't let traps take over." },
          { name: "Tricep Dip (Weighted or BW)", sets: 3, reps: "8–12", rest: 90, note: "Upright torso to keep tricep focus." },
          { name: "Single-Arm Overhead Extension", sets: 3, reps: "12–15", rest: 45, note: "Dumbbell or cable. Full stretch at the bottom." },
        ],
      },
      {
        day: "Pull B — Arm Focus",
        label: "Friday",
        accent: "from-cyan-600 to-blue-500",
        exercises: [
          { name: "Deadlift", sets: 3, reps: "4–6", rest: 180, note: "Conventional. Primary posterior chain strength lift." },
          { name: "Chest-Supported Row (Machine or DB)", sets: 3, reps: "10–12", rest: 90, note: "Removes lower back from the equation." },
          { name: "Lat Pulldown (Underhand/Supinated)", sets: 3, reps: "10–12", rest: 90, note: "Supinated grip emphasises biceps more." },
          { name: "Straight-Arm Pulldown", sets: 3, reps: "12–15", rest: 60, note: "Lat isolation. Arms stay straight throughout." },
          { name: "Incline Dumbbell Curl", sets: 3, reps: "10–12", rest: 60, note: "Arms hang behind body. Maximum bicep stretch." },
          { name: "Cable Curl (Single Arm)", sets: 3, reps: "12–15", rest: 45, note: "Unilateral. Squeeze hard at the top." },
          { name: "Reverse Curl", sets: 3, reps: "12–15", rest: 45, note: "Pronated grip. Trains brachialis and forearm extensors." },
        ],
      },
      {
        day: "Legs B — Posterior Focus",
        label: "Saturday",
        accent: "from-cyan-600 to-blue-500",
        exercises: [
          { name: "Romanian Deadlift (Barbell)", sets: 4, reps: "8–10", rest: 120, note: "Primary hip hinge. Focus on hamstring stretch and load." },
          { name: "Hack Squat or Leg Press (High Foot)", sets: 3, reps: "10–12", rest: 90, note: "High foot placement shifts stress to hamstrings and glutes." },
          { name: "Hip Thrust (Barbell)", sets: 3, reps: "10–12", rest: 90, note: "Shoulders on bench. Squeeze glutes hard at the top." },
          { name: "Leg Curl (Seated)", sets: 4, reps: "12–15", rest: 60, note: "Seated keeps the hip in flexion — longer hamstring length." },
          { name: "Bulgarian Split Squat", sets: 3, reps: "10/side", rest: 90, note: "Rear foot elevated. Develops unilateral strength and balance." },
          { name: "Seated Calf Raise", sets: 4, reps: "15–20", rest: 45, note: "Targets soleus — different from standing calf raise." },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. Bro Split
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "bro-split-5-day",
    title: "Classic Bro Split — 5-Day Bodybuilding Split",
    shortTitle: "Bro Split",
    description:
      "The classic bodybuilding Bro Split: one muscle group per day for 5 days. A high-volume approach popular in traditional bodybuilding communities.",
    difficulty: "Intermediate to Advanced",
    daysPerWeek: 5,
    recommendedWeeks: "8–12 weeks",
    category: "Hypertrophy",
    equipment: "full",
    accent: "from-purple-600 to-violet-500",
    badge: "bg-purple-600/20 text-purple-400 border-purple-500/30",
    datePublished: "2025-03-05",
    tags: ["bro split", "bodybuilding", "5 day workout", "chest day", "arm day"],
    overview:
      "The Bro Split dedicates each training day to a single muscle group, allowing extremely high volume per session. While modern research favours higher training frequency, the Bro Split remains effective for advanced lifters who genuinely need 15–20+ sets to adequately stimulate a muscle group within a single session. It maps cleanly onto a Mon–Fri schedule and has produced elite physiques for decades.",
    keyBenefits: [
      "Very high volume per muscle per session — 15–20+ working sets",
      "Clear, simple structure — one day = one muscle group",
      "Maximum recovery time for each muscle (6 days rest between sessions)",
      "Easy to track and plan — Chest Monday is always Chest Monday",
    ],
    whoIsItFor:
      "Intermediate to advanced lifters (2+ years consistent training) who want high per-session volume and can recover adequately between sessions. Not ideal for beginners — frequency matters more than volume at the start.",
    progressionNotes:
      "Track your key lifts (first compound of each session). Add weight when you complete all working sets with good form. For high-rep isolation work, progress by adding reps before adding weight.",
    days: [
      {
        day: "Chest",
        label: "Monday",
        accent: "from-purple-600 to-violet-500",
        exercises: [
          { name: "Barbell Bench Press", sets: 4, reps: "5–8", rest: 180, note: "Primary strength movement. Work up to a challenging weight." },
          { name: "Incline Dumbbell Press", sets: 4, reps: "8–12", rest: 90, note: "Upper chest focus. Full stretch at the bottom." },
          { name: "Decline Barbell Press", sets: 3, reps: "8–12", rest: 90, note: "Lower chest focus. Spotter recommended." },
          { name: "Cable Fly (High-to-Low)", sets: 3, reps: "12–15", rest: 60, note: "Arms sweep downward — lower chest emphasis." },
          { name: "Cable Fly (Low-to-High)", sets: 3, reps: "12–15", rest: 60, note: "Arms sweep upward — upper chest emphasis." },
          { name: "Machine Chest Press", sets: 3, reps: "12–15", rest: 60, note: "Finish with machine. Squeeze and hold each rep." },
        ],
      },
      {
        day: "Back",
        label: "Tuesday",
        accent: "from-purple-600 to-violet-500",
        exercises: [
          { name: "Deadlift", sets: 3, reps: "4–6", rest: 180, note: "Conventional. Primary posterior chain strength lift." },
          { name: "Barbell Row", sets: 4, reps: "6–8", rest: 120, note: "Hinge to 45°, pull to lower chest." },
          { name: "Pull-Up (Weighted)", sets: 4, reps: "5–8", rest: 120, note: "Full hang, chin over bar. Add weight via belt." },
          { name: "Lat Pulldown (Wide)", sets: 3, reps: "10–12", rest: 90, note: "Builds lat width. Pull to upper chest." },
          { name: "Seated Cable Row", sets: 3, reps: "10–12", rest: 75, note: "Chest tall. Pull to lower sternum." },
          { name: "Straight-Arm Pulldown", sets: 3, reps: "12–15", rest: 60, note: "Lat isolation. Arms stay extended throughout." },
          { name: "Face Pull", sets: 3, reps: "15–20", rest: 45, note: "Rear delt and rotator cuff. Non-negotiable for shoulder health." },
        ],
      },
      {
        day: "Shoulders",
        label: "Wednesday",
        accent: "from-purple-600 to-violet-500",
        exercises: [
          { name: "Seated Barbell Overhead Press", sets: 4, reps: "6–8", rest: 120, note: "Primary shoulder strength movement." },
          { name: "Dumbbell Lateral Raise", sets: 5, reps: "12–15", rest: 60, note: "5 sets — side delts respond to volume. Slight lean forward." },
          { name: "Cable Lateral Raise (Single Arm)", sets: 3, reps: "15–20", rest: 45, note: "Constant tension version of lateral raise." },
          { name: "Dumbbell Front Raise", sets: 3, reps: "12–15", rest: 45, note: "Anterior delt isolation. Alternate arms." },
          { name: "Face Pull (Rope)", sets: 4, reps: "15–20", rest: 45, note: "Rear delt and external rotation. Essential." },
          { name: "Rear Delt Machine Fly", sets: 3, reps: "15–20", rest: 45, note: "Targets posterior deltoid. Light weight, high reps." },
          { name: "Shrug (Barbell or Dumbbell)", sets: 3, reps: "12–15", rest: 60, note: "Upper trap isolation. Full range, brief pause at top." },
        ],
      },
      {
        day: "Arms",
        label: "Thursday",
        accent: "from-purple-600 to-violet-500",
        exercises: [
          { name: "Barbell Curl", sets: 4, reps: "8–10", rest: 90, note: "Primary bicep strength movement. No swinging." },
          { name: "Incline Dumbbell Curl", sets: 3, reps: "10–12", rest: 60, note: "Arms hang behind body — maximum bicep stretch." },
          { name: "Hammer Curl", sets: 3, reps: "10–12", rest: 60, note: "Brachialis and brachioradialis — adds arm width." },
          { name: "Cable Curl (Straight Bar)", sets: 3, reps: "12–15", rest: 60, note: "Constant tension. Squeeze hard at the top." },
          { name: "Skull Crusher (EZ Bar)", sets: 4, reps: "8–10", rest: 90, note: "Primary tricep strength. Lower to forehead." },
          { name: "Close-Grip Bench Press", sets: 3, reps: "8–10", rest: 90, note: "Hands shoulder-width. Tricep-dominant compound." },
          { name: "Tricep Pushdown (Rope)", sets: 3, reps: "12–15", rest: 60, note: "Flare at the bottom for lateral head emphasis." },
          { name: "Overhead Tricep Extension", sets: 3, reps: "12–15", rest: 60, note: "Long head emphasis — the biggest part of the tricep." },
        ],
      },
      {
        day: "Legs",
        label: "Friday",
        accent: "from-purple-600 to-violet-500",
        exercises: [
          { name: "Barbell Back Squat", sets: 4, reps: "6–8", rest: 180, note: "Primary quad movement. Don't skip this." },
          { name: "Romanian Deadlift", sets: 4, reps: "8–10", rest: 120, note: "Hamstring and glute hinge. Feel the stretch." },
          { name: "Leg Press", sets: 3, reps: "10–12", rest: 120, note: "High foot placement for glute emphasis." },
          { name: "Leg Extension", sets: 3, reps: "12–15", rest: 60, note: "Quad isolation. Pause 1 second at the top." },
          { name: "Lying Leg Curl", sets: 3, reps: "12–15", rest: 60, note: "Hamstring isolation. Full range of motion." },
          { name: "Hip Thrust (Barbell)", sets: 3, reps: "12–15", rest: 90, note: "Glute isolation. Squeeze hard at the top." },
          { name: "Standing Calf Raise", sets: 5, reps: "12–15", rest: 60, note: "Gastrocnemius focus. Full stretch at bottom." },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. 5/3/1
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "531-wendler",
    title: "5/3/1 by Jim Wendler — 4-Day Strength Program",
    shortTitle: "5/3/1 (Wendler)",
    description:
      "Jim Wendler's 5/3/1 strength program: a 4-day barbell program built around percentage-based progression on the squat, bench, deadlift, and overhead press.",
    difficulty: "Intermediate to Advanced",
    daysPerWeek: 4,
    recommendedWeeks: "Run indefinitely in 4-week cycles",
    category: "Strength",
    equipment: "full",
    accent: "from-orange-600 to-amber-500",
    badge: "bg-orange-600/20 text-orange-400 border-orange-500/30",
    datePublished: "2025-03-10",
    tags: ["5/3/1", "Jim Wendler", "strength program", "powerlifting", "barbell"],
    overview:
      "5/3/1 is one of the most respected strength programs ever created. Built around the four barbell lifts — squat, bench, deadlift, and overhead press — it uses calculated percentages from your Training Max (90% of your 1RM) and progresses in 4-week cycles. The core principle is sustainable, long-term progression: add small amounts of weight each cycle and run it for years, not weeks.",
    keyBenefits: [
      "Simple, proven percentage-based progression that compounds over years",
      "Each of the four main lifts gets a dedicated session per week",
      "Flexible assistance work — choose from multiple templates (BBB, FSL, etc.)",
      "Built-in deload every fourth week prevents accumulated fatigue",
    ],
    whoIsItFor:
      "Intermediate to advanced lifters who have solid technique on the big four lifts and want a long-term strength framework. Beginners typically progress faster on linear programs (StrongLifts 5×5, Starting Strength) before moving to 5/3/1.",
    progressionNotes:
      "After each 4-week cycle, add 2.5 kg (5 lb) to your Training Max for upper body lifts (bench, OHP) and 5 kg (10 lb) for lower body lifts (squat, deadlift). If AMRAP sets drop below 5 reps on the 85% week, your TM is too heavy — reset by 10%.",
    days: [
      {
        day: "Press Day",
        label: "Monday",
        accent: "from-orange-600 to-amber-500",
        exercises: [
          { name: "Overhead Press — Week 1: 65%×5 / 75%×5 / 85%×5+", sets: 3, reps: "5/5/5+", rest: 180, note: "Percentages based on OHP Training Max (90% of 1RM). The + means AMRAP on last set." },
          { name: "Overhead Press — Week 2: 70%×3 / 80%×3 / 90%×3+", sets: 3, reps: "3/3/3+", rest: 180, note: "Week 2 waves up. Push the AMRAP set hard." },
          { name: "Overhead Press — Week 3: 75%×5 / 85%×3 / 95%×1+", sets: 3, reps: "5/3/1+", rest: 180, note: "Week 3 is the peak. 95% AMRAP — go all out." },
          { name: "Overhead Press — Week 4 (Deload): 40%×5 / 50%×5 / 60%×5", sets: 3, reps: "5/5/5", rest: 120, note: "Deload week. No AMRAP. Keep it easy." },
          { name: "Assistance: Dips or Tricep Pushdown", sets: 5, reps: "10", rest: 60, note: "Pick one. 5×10 pushing work to complement OHP." },
          { name: "Assistance: Pull-Up or Lat Pulldown", sets: 5, reps: "10", rest: 60, note: "5×10 pulling work. Balance push with pull." },
          { name: "Assistance: Dumbbell Lateral Raise", sets: 3, reps: "15", rest: 45, note: "Shoulder accessory. Light pump work." },
        ],
      },
      {
        day: "Deadlift Day",
        label: "Wednesday",
        accent: "from-orange-600 to-amber-500",
        exercises: [
          { name: "Deadlift — Week 1: 65%×5 / 75%×5 / 85%×5+", sets: 3, reps: "5/5/5+", rest: 240, note: "Percentages from Deadlift TM. Conventional or sumo." },
          { name: "Deadlift — Week 2: 70%×3 / 80%×3 / 90%×3+", sets: 3, reps: "3/3/3+", rest: 240, note: "3-minute rest minimum between heavy deadlift sets." },
          { name: "Deadlift — Week 3: 75%×5 / 85%×3 / 95%×1+", sets: 3, reps: "5/3/1+", rest: 300, note: "Rest fully. This is a taxing single on the last set." },
          { name: "Deadlift — Week 4 (Deload): 40%×5 / 50%×5 / 60%×5", sets: 3, reps: "5/5/5", rest: 120, note: "No AMRAP. Practise the movement pattern lightly." },
          { name: "Assistance: Leg Press", sets: 5, reps: "10", rest: 90, note: "Quad and glute volume to complement deadlift." },
          { name: "Assistance: Leg Curl", sets: 5, reps: "10", rest: 60, note: "Hamstring isolation." },
          { name: "Assistance: Hanging Leg Raise or Ab Wheel", sets: 3, reps: "10–15", rest: 60, note: "Core work. Wendler recommends heavy abs on deadlift day." },
        ],
      },
      {
        day: "Bench Press Day",
        label: "Friday",
        accent: "from-amber-600 to-orange-500",
        exercises: [
          { name: "Bench Press — Week 1: 65%×5 / 75%×5 / 85%×5+", sets: 3, reps: "5/5/5+", rest: 180, note: "Percentages from Bench TM. Control the descent." },
          { name: "Bench Press — Week 2: 70%×3 / 80%×3 / 90%×3+", sets: 3, reps: "3/3/3+", rest: 180, note: "Push hard on the AMRAP. These sets drive progress." },
          { name: "Bench Press — Week 3: 75%×5 / 85%×3 / 95%×1+", sets: 3, reps: "5/3/1+", rest: 180, note: "The 95% AMRAP is the peak of the cycle. Give everything." },
          { name: "Bench Press — Week 4 (Deload): 40%×5 / 50%×5 / 60%×5", sets: 3, reps: "5/5/5", rest: 120, note: "Deload — touch-and-go if you prefer, but don't max out." },
          { name: "Assistance: Barbell Row or Cable Row", sets: 5, reps: "10", rest: 90, note: "Back volume. Pull:Push ratio should be at least 1:1." },
          { name: "Assistance: Dumbbell Row", sets: 5, reps: "10", rest: 60, note: "Unilateral back work. Build lat thickness." },
          { name: "Assistance: Barbell Curl", sets: 3, reps: "10", rest: 60, note: "Bicep assistance. Optional but recommended." },
        ],
      },
      {
        day: "Squat Day",
        label: "Saturday",
        accent: "from-amber-600 to-orange-500",
        exercises: [
          { name: "Back Squat — Week 1: 65%×5 / 75%×5 / 85%×5+", sets: 3, reps: "5/5/5+", rest: 240, note: "Percentages from Squat TM. Break parallel, knees out." },
          { name: "Back Squat — Week 2: 70%×3 / 80%×3 / 90%×3+", sets: 3, reps: "3/3/3+", rest: 240, note: "Rest fully. Heavy squats need 3–4 minutes." },
          { name: "Back Squat — Week 3: 75%×5 / 85%×3 / 95%×1+", sets: 3, reps: "5/3/1+", rest: 300, note: "The AMRAP is your chance to demonstrate progress." },
          { name: "Back Squat — Week 4 (Deload): 40%×5 / 50%×5 / 60%×5", sets: 3, reps: "5/5/5", rest: 120, note: "Deload. Reinforce technique with light weight." },
          { name: "Assistance: Romanian Deadlift", sets: 5, reps: "10", rest: 90, note: "Hamstring and glute volume to complement squats." },
          { name: "Assistance: Leg Press", sets: 5, reps: "10", rest: 90, note: "Additional quad volume. Optional if fatigue is high." },
          { name: "Assistance: Plank or Hollow Body Hold", sets: 3, reps: "30–45s", rest: 45, note: "Core stability. Wendler recommends heavy abs on squat day too." },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. Upper Lower Split
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "upper-lower-4-day",
    title: "Upper / Lower Split — 4-Day Hypertrophy Program",
    shortTitle: "Upper/Lower",
    description:
      "A 4-day Upper/Lower split for intermediates. Trains each muscle group twice per week with one strength-focused session and one hypertrophy session per half of the body.",
    difficulty: "Intermediate",
    daysPerWeek: 4,
    recommendedWeeks: "12–16 weeks",
    category: "Hypertrophy",
    equipment: "full",
    accent: "from-violet-600 to-purple-500",
    badge: "bg-violet-600/20 text-violet-400 border-violet-500/30",
    datePublished: "2025-03-15",
    tags: ["upper lower split", "4 day workout", "hypertrophy", "intermediate"],
    overview:
      "The Upper/Lower split is one of the most balanced and research-supported training structures for intermediate lifters. By hitting each muscle group twice per week across four sessions — two upper, two lower — and varying the rep range and load between sessions, it delivers simultaneous strength and size gains without the 6-day commitment of PPL.",
    keyBenefits: [
      "Each muscle trained twice per week — optimal for hypertrophy",
      "Only 4 days required — fits most working adult schedules",
      "Built-in periodisation: strength focus (A) + hypertrophy focus (B)",
      "Clear weekly structure with 3 rest days for recovery",
    ],
    whoIsItFor:
      "Intermediate lifters with 6–24 months of training who have solid technique on compound movements and want to maximise results from 4 sessions per week. Also excellent for returning lifters or anyone transitioning from a 3-day full body program.",
    progressionNotes:
      "On A days (strength), progress by adding weight when you complete all prescribed sets and reps. On B days (hypertrophy), use double progression: work within a rep range and add weight once you hit the top of the range on all sets.",
    days: [
      {
        day: "Upper A — Strength Focus",
        label: "Monday",
        accent: "from-violet-600 to-purple-500",
        exercises: [
          { name: "Barbell Bench Press", sets: 4, reps: "4–6", rest: 180, note: "Primary strength movement. Heavier than Upper B." },
          { name: "Barbell Row", sets: 4, reps: "4–6", rest: 180, note: "Match the bench press intensity. Pull:Push ratio 1:1." },
          { name: "Overhead Press (Barbell)", sets: 3, reps: "5–7", rest: 120, note: "Strict. No leg drive on this session." },
          { name: "Weighted Pull-Up or Lat Pulldown", sets: 3, reps: "6–8", rest: 120, note: "Vertical pull to complement the row." },
          { name: "Dumbbell Lateral Raise", sets: 3, reps: "15–20", rest: 45, note: "Accessory pump work. Lighter and higher reps." },
          { name: "Barbell Curl", sets: 2, reps: "8–10", rest: 60, note: "Brief bicep work. Keep total session time under 75 min." },
        ],
      },
      {
        day: "Lower A — Strength Focus",
        label: "Tuesday",
        accent: "from-violet-600 to-purple-500",
        exercises: [
          { name: "Barbell Back Squat", sets: 4, reps: "4–6", rest: 240, note: "Primary lower body strength lift." },
          { name: "Romanian Deadlift", sets: 3, reps: "6–8", rest: 120, note: "Hamstring and glute hinge. Control the descent." },
          { name: "Leg Press", sets: 3, reps: "8–10", rest: 90, note: "Additional quad volume at lower intensity." },
          { name: "Leg Curl (Lying)", sets: 3, reps: "8–10", rest: 75, note: "Hamstring isolation." },
          { name: "Standing Calf Raise", sets: 4, reps: "12–15", rest: 60, note: "Full range. Pause at the bottom for 1 second." },
        ],
      },
      {
        day: "Upper B — Hypertrophy Focus",
        label: "Thursday",
        accent: "from-purple-600 to-violet-500",
        exercises: [
          { name: "Incline Dumbbell Press", sets: 4, reps: "10–12", rest: 90, note: "Same pushing muscles as Monday but different exercise and rep range." },
          { name: "Cable Row (Neutral Grip)", sets: 4, reps: "10–12", rest: 90, note: "More volume at lighter weight compared to Upper A." },
          { name: "Seated Dumbbell Shoulder Press", sets: 3, reps: "10–12", rest: 75, note: "Unilateral control. Controlled tempo." },
          { name: "Lat Pulldown (Underhand)", sets: 3, reps: "10–12", rest: 75, note: "Supinated grip gives more bicep involvement." },
          { name: "Cable Fly", sets: 3, reps: "12–15", rest: 60, note: "Chest isolation. Stretch at bottom, squeeze at top." },
          { name: "Face Pull", sets: 3, reps: "15–20", rest: 45, note: "Rear delt and external rotation. Always included." },
          { name: "Hammer Curl", sets: 3, reps: "12–15", rest: 45, note: "Arm accessory. Neutral grip." },
          { name: "Skull Crusher (EZ Bar)", sets: 3, reps: "10–12", rest: 60, note: "Tricep isolation. Long head emphasis." },
        ],
      },
      {
        day: "Lower B — Hypertrophy Focus",
        label: "Friday",
        accent: "from-purple-600 to-violet-500",
        exercises: [
          { name: "Deadlift (Conventional)", sets: 3, reps: "5–6", rest: 240, note: "Heavier than Lower A squats. Primary hip hinge." },
          { name: "Hack Squat or Goblet Squat", sets: 3, reps: "10–12", rest: 90, note: "Quad volume without the spinal load of barbell squats." },
          { name: "Leg Extension", sets: 3, reps: "12–15", rest: 60, note: "Quad isolation. Pause at the top." },
          { name: "Seated Leg Curl", sets: 3, reps: "12–15", rest: 60, note: "Hamstring isolation at long muscle length." },
          { name: "Hip Thrust (Barbell)", sets: 3, reps: "10–12", rest: 90, note: "Glute isolation. Best exercise for glute development." },
          { name: "Bulgarian Split Squat", sets: 3, reps: "10/side", rest: 90, note: "Unilateral. Builds single-leg stability and strength." },
          { name: "Seated Calf Raise", sets: 4, reps: "15–20", rest: 60, note: "Soleus focus. Different from standing calf raise." },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. StrongLifts 5×5
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "stronglifts-5x5",
    title: "StrongLifts 5×5 — Beginner Barbell Program",
    shortTitle: "StrongLifts 5×5",
    description:
      "StrongLifts 5×5: the simplest and most effective beginner barbell program. 3 days a week, 2 alternating workouts, add weight every session.",
    difficulty: "Beginner",
    daysPerWeek: 3,
    recommendedWeeks: "12–16 weeks (until linear progression stalls)",
    category: "Strength",
    equipment: "barbell",
    accent: "from-emerald-600 to-green-500",
    badge: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30",
    datePublished: "2025-03-18",
    tags: ["StrongLifts", "5x5", "beginner", "barbell", "strength", "linear progression"],
    overview:
      "StrongLifts 5×5 is one of the most popular beginner strength programs ever designed. It uses just five barbell exercises across two alternating workouts and adds weight every session. The simplicity is the point — beginners don't need complex programming, they need to practice the fundamental lifts repeatedly and add weight consistently. 5×5 delivers exactly that.",
    keyBenefits: [
      "Only 3 days per week — manageable for any schedule",
      "5 compound barbell exercises cover every major muscle group",
      "Add weight every session — fastest possible strength progress for beginners",
      "Simple and repeatable — removes all decision fatigue",
    ],
    whoIsItFor:
      "Absolute beginners and anyone returning to the gym after a long break. Also excellent for intermediate lifters who want to reset and rebuild a strength foundation. Not suitable for lifters who have already run linear progression and stalled — move to 5/3/1 or Upper/Lower at that point.",
    progressionNotes:
      "Add 2.5 kg to every lift every session. If you fail to complete 5×5 on a lift three times in a row at the same weight, deload by 10% and build back up. For the deadlift, start at a heavier weight than the other lifts and add 5 kg per session (it's a stronger movement).",
    days: [
      {
        day: "Workout A",
        label: "Monday / Wednesday (alternating)",
        accent: "from-emerald-600 to-green-500",
        exercises: [
          { name: "Barbell Back Squat", sets: 5, reps: "5", rest: 240, note: "Every session starts with squats. Start light — the weight adds up fast." },
          { name: "Barbell Bench Press", sets: 5, reps: "5", rest: 180, note: "Alternates with Overhead Press between sessions." },
          { name: "Barbell Row", sets: 5, reps: "5", rest: 180, note: "Pendlay row style: bar to floor between reps." },
        ],
      },
      {
        day: "Workout B",
        label: "Friday / Monday (alternating)",
        accent: "from-green-600 to-emerald-500",
        exercises: [
          { name: "Barbell Back Squat", sets: 5, reps: "5", rest: 240, note: "Squats appear in every session. This is intentional — frequency drives learning." },
          { name: "Overhead Press", sets: 5, reps: "5", rest: 180, note: "Alternates with Bench Press. Strict form — no leg drive." },
          { name: "Deadlift", sets: 1, reps: "5", rest: 300, note: "1 working set, not 5. Deadlift is already covered by squats — more volume isn't needed." },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. Starting Strength
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "starting-strength",
    title: "Starting Strength — Mark Rippetoe's 3-Day Beginner Program",
    shortTitle: "Starting Strength",
    description:
      "Mark Rippetoe's Starting Strength: the definitive beginner barbell program. Two alternating workouts, 3 days per week, built around the squat, press, deadlift, bench, and power clean.",
    difficulty: "Beginner",
    daysPerWeek: 3,
    recommendedWeeks: "12–20 weeks",
    category: "Strength",
    equipment: "barbell",
    accent: "from-red-600 to-rose-500",
    badge: "bg-red-600/20 text-red-400 border-red-500/30",
    datePublished: "2025-03-22",
    tags: ["Starting Strength", "Rippetoe", "beginner", "barbell", "squat", "linear progression"],
    overview:
      "Starting Strength by Mark Rippetoe is arguably the most influential beginner strength program ever written. The book and program are built on the premise that the best way for a novice to get strong is to squat heavy three times per week, learn the fundamental barbell lifts with excellent technique, and add weight every session. Its simplicity is a feature, not a limitation.",
    keyBenefits: [
      "Squatting 3×/week produces the fastest strength and muscle gains for beginners",
      "Minimal time investment — sessions often take 45–60 minutes",
      "Teaches the five fundamental barbell movements with excellent form cues",
      "Linear progression is the most efficient model for beginners",
    ],
    whoIsItFor:
      "Beginners with 0–12 months of consistent training, or intermediate lifters who want to relearn proper barbell technique. The power clean can be replaced with barbell rows if you don't have coaching on the Olympic lift.",
    progressionNotes:
      "Add 2.5 kg every session on upper body lifts (bench, press). Add 5 kg every session on lower body lifts (squat, deadlift). When you stall (fail to complete 3×5 twice at the same weight), add a third session with light squats, or transition to Texas Method / 5/3/1.",
    days: [
      {
        day: "Workout A",
        label: "Monday / Wednesday (alternating)",
        accent: "from-red-600 to-rose-500",
        exercises: [
          { name: "Barbell Back Squat", sets: 3, reps: "5", rest: 240, note: "The foundation of the program. 3×5 every session." },
          { name: "Barbell Bench Press", sets: 3, reps: "5", rest: 180, note: "Alternates with Overhead Press each session." },
          { name: "Deadlift", sets: 1, reps: "5", rest: 300, note: "1×5. Heavy single working set. Add 5 kg each session." },
        ],
      },
      {
        day: "Workout B",
        label: "Friday / Monday (alternating)",
        accent: "from-rose-600 to-red-500",
        exercises: [
          { name: "Barbell Back Squat", sets: 3, reps: "5", rest: 240, note: "Every session, no exception." },
          { name: "Overhead Press", sets: 3, reps: "5", rest: 180, note: "Alternates with Bench Press. Strict standing press." },
          { name: "Power Clean (or Barbell Row)", sets: 5, reps: "3", rest: 180, note: "5×3 power cleans for explosive power, or 3×5 barbell rows as a substitute." },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 7. PHUL
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "phul-power-hypertrophy",
    title: "PHUL — Power Hypertrophy Upper Lower (4-Day Program)",
    shortTitle: "PHUL",
    description:
      "PHUL (Power Hypertrophy Upper Lower) combines heavy strength work with high-volume hypertrophy training across 4 days per week. Build strength and size simultaneously.",
    difficulty: "Intermediate",
    daysPerWeek: 4,
    recommendedWeeks: "12–16 weeks",
    category: "Hybrid Strength/Hypertrophy",
    equipment: "full",
    acronymExpanded: "Power Hypertrophy Upper Lower",
    accent: "from-sky-600 to-blue-500",
    badge: "bg-sky-600/20 text-sky-400 border-sky-500/30",
    datePublished: "2025-03-26",
    tags: ["PHUL", "power hypertrophy", "4 day workout", "strength and size"],
    overview:
      "PHUL (Power Hypertrophy Upper Lower) is a 4-day program designed to develop both strength and muscle simultaneously. The first two days of the week focus on power (low reps, heavy weight), while the second two days focus on hypertrophy (moderate weight, higher volume). This combination makes PHUL one of the best options for lifters who don't want to choose between getting stronger and getting bigger.",
    keyBenefits: [
      "Develops maximal strength AND muscle size simultaneously",
      "4 sessions per week — efficient use of gym time",
      "Heavy compound lifting twice per week builds neurological strength",
      "High-volume accessory work on hypertrophy days maximises muscle growth",
    ],
    whoIsItFor:
      "Intermediate lifters with solid technique who want a structured approach to developing both power and size. Also great for powerlifters who want more hypertrophy work, or bodybuilders who want to build more functional strength.",
    progressionNotes:
      "On power days, add weight each week (2.5–5 kg on upper, 5 kg on lower). On hypertrophy days, use double progression within your rep ranges. Aim for progressive overload across the entire 12-week block.",
    days: [
      {
        day: "Upper Power",
        label: "Monday",
        accent: "from-sky-600 to-blue-500",
        exercises: [
          { name: "Barbell Bench Press", sets: 3, reps: "3–5", rest: 300, note: "Work up to a heavy top set. Low reps, maximum load." },
          { name: "Barbell Row (Pendlay)", sets: 3, reps: "3–5", rest: 300, note: "Explosive row from the floor. Power-focused." },
          { name: "Overhead Press", sets: 3, reps: "5–7", rest: 180, note: "Slightly higher reps than bench — shoulder warm-up friendly." },
          { name: "Weighted Pull-Up", sets: 3, reps: "5–7", rest: 180, note: "Add weight via belt. Full range of motion." },
          { name: "Barbell Curl", sets: 2, reps: "6–8", rest: 90, note: "Accessory bicep work. Keep it brief on power day." },
          { name: "Skull Crusher", sets: 2, reps: "6–8", rest: 90, note: "Heavy tricep accessory. EZ bar recommended." },
        ],
      },
      {
        day: "Lower Power",
        label: "Tuesday",
        accent: "from-sky-600 to-blue-500",
        exercises: [
          { name: "Barbell Back Squat", sets: 3, reps: "3–5", rest: 300, note: "Primary power movement. Work up to a challenging low-rep set." },
          { name: "Deadlift", sets: 3, reps: "3–5", rest: 300, note: "Conventional or sumo. Heavy. Long rest between sets." },
          { name: "Leg Press", sets: 3, reps: "10–12", rest: 120, note: "Volume work after the heavy lifts." },
          { name: "Leg Curl", sets: 3, reps: "10–12", rest: 75, note: "Hamstring isolation." },
          { name: "Standing Calf Raise", sets: 4, reps: "8–12", rest: 60, note: "Heavier calf work on power day." },
        ],
      },
      {
        day: "Upper Hypertrophy",
        label: "Thursday",
        accent: "from-blue-600 to-sky-500",
        exercises: [
          { name: "Incline Dumbbell Press", sets: 4, reps: "8–12", rest: 90, note: "More volume and reps than Monday's bench." },
          { name: "Flat Dumbbell Press", sets: 4, reps: "8–12", rest: 90, note: "Dumbbells allow deeper stretch for chest hypertrophy." },
          { name: "Cable Row (Seated)", sets: 4, reps: "8–12", rest: 90, note: "High-volume back work. Chest tall, full range." },
          { name: "Lat Pulldown", sets: 4, reps: "10–12", rest: 75, note: "Lat width focus." },
          { name: "Dumbbell Lateral Raise", sets: 4, reps: "12–15", rest: 45, note: "Side delt pump work." },
          { name: "Face Pull", sets: 3, reps: "15–20", rest: 45, note: "Rear delt and shoulder health." },
          { name: "Hammer Curl", sets: 3, reps: "12–15", rest: 45, note: "Brachialis and forearm builder." },
          { name: "Tricep Pushdown (Rope)", sets: 3, reps: "12–15", rest: 45, note: "Tricep isolation. Flare at the bottom." },
        ],
      },
      {
        day: "Lower Hypertrophy",
        label: "Friday",
        accent: "from-blue-600 to-sky-500",
        exercises: [
          { name: "Front Squat or Hack Squat", sets: 4, reps: "10–12", rest: 120, note: "Quad-dominant squat variation for hypertrophy." },
          { name: "Romanian Deadlift", sets: 4, reps: "10–12", rest: 90, note: "Hamstring and glute focus. Control the descent." },
          { name: "Leg Extension", sets: 4, reps: "12–15", rest: 60, note: "Quad isolation. Pause at the top." },
          { name: "Lying Leg Curl", sets: 4, reps: "12–15", rest: 60, note: "Hamstring isolation." },
          { name: "Hip Thrust", sets: 3, reps: "12–15", rest: 90, note: "Glute isolation. Barbell or machine." },
          { name: "Seated Calf Raise", sets: 4, reps: "12–15", rest: 60, note: "Soleus focus — complements Monday's standing calf." },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 8. Arnold Split
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "arnold-split",
    title: "Arnold Split — Classic 6-Day Bodybuilding Program",
    shortTitle: "Arnold Split",
    description:
      "The classic bodybuilding split favoured by Arnold Schwarzenegger: chest/back, shoulders/arms, legs — trained twice per week for maximum volume and frequency.",
    difficulty: "Advanced",
    daysPerWeek: 6,
    recommendedWeeks: "8–12 weeks",
    category: "Hypertrophy",
    equipment: "full",
    accent: "from-yellow-600 to-amber-500",
    badge: "bg-yellow-600/20 text-yellow-400 border-yellow-500/30",
    datePublished: "2025-04-01",
    tags: ["Arnold split", "6 day workout", "bodybuilding", "chest back", "advanced"],
    overview:
      "The Arnold Split pairs chest with back, shoulders with arms, and dedicates full days to legs — then repeats the cycle twice per week. Unlike the Bro Split, this structure provides twice-weekly frequency for all major muscle groups. Training antagonist muscle groups (chest and back) in the same session allows you to use supersets, which increases training density and can improve recovery between sets.",
    keyBenefits: [
      "Each muscle trained twice per week — superior to once-per-week Bro Split",
      "Chest/Back pairing allows antagonist supersets — more efficient sessions",
      "High total weekly volume across 6 focused training days",
      "Classic structure proven over decades of elite bodybuilding",
    ],
    whoIsItFor:
      "Advanced lifters (3+ years) with high recovery capacity who want maximum training volume and can commit to 6 sessions per week. This is a demanding program — recovery, nutrition, and sleep must all be on point.",
    progressionNotes:
      "Because volume is very high in this program, progression should be tracked on 2–3 key lifts per session rather than every exercise. Aim to add weight to your primary lifts (bench, barbell row, squat, OHP) every 1–2 weeks.",
    days: [
      {
        day: "Chest & Back",
        label: "Monday / Thursday",
        accent: "from-yellow-600 to-amber-500",
        exercises: [
          { name: "Barbell Bench Press", sets: 4, reps: "6–10", rest: 120, note: "Primary chest strength. Superset with barbell row." },
          { name: "Barbell Row", sets: 4, reps: "6–10", rest: 120, note: "Superset with bench press. Back antagonist — aids recovery." },
          { name: "Incline Dumbbell Press", sets: 4, reps: "8–12", rest: 90, note: "Upper chest development." },
          { name: "Weighted Pull-Up or Lat Pulldown", sets: 4, reps: "8–12", rest: 90, note: "Lat width. Superset with incline press if desired." },
          { name: "Cable Fly or Pec Deck", sets: 3, reps: "12–15", rest: 60, note: "Chest isolation. Stretch and squeeze." },
          { name: "Seated Cable Row", sets: 3, reps: "12–15", rest: 60, note: "Back volume. Superset with cable fly." },
          { name: "Face Pull", sets: 3, reps: "15–20", rest: 45, note: "Rear delt and shoulder health. Always." },
        ],
      },
      {
        day: "Shoulders & Arms",
        label: "Tuesday / Friday",
        accent: "from-yellow-600 to-amber-500",
        exercises: [
          { name: "Barbell Overhead Press", sets: 4, reps: "6–8", rest: 120, note: "Primary shoulder strength. Seated or standing." },
          { name: "Barbell Curl", sets: 4, reps: "8–10", rest: 90, note: "Superset with overhead press if you like." },
          { name: "Dumbbell Lateral Raise", sets: 5, reps: "12–15", rest: 60, note: "High volume lateral raise — key for shoulder width." },
          { name: "Skull Crusher (EZ Bar)", sets: 4, reps: "8–10", rest: 90, note: "Primary tricep strength. Superset with barbell curl." },
          { name: "Rear Delt Fly (Machine)", sets: 4, reps: "15–20", rest: 45, note: "Posterior delt isolation." },
          { name: "Incline Dumbbell Curl", sets: 3, reps: "10–12", rest: 60, note: "Bicep peak development. Full stretch at the bottom." },
          { name: "Tricep Pushdown (Rope)", sets: 3, reps: "12–15", rest: 60, note: "Tricep isolation to finish." },
          { name: "Hammer Curl", sets: 3, reps: "12–15", rest: 45, note: "Brachialis and forearm thickness." },
        ],
      },
      {
        day: "Legs",
        label: "Wednesday / Saturday",
        accent: "from-amber-600 to-yellow-500",
        exercises: [
          { name: "Barbell Back Squat", sets: 5, reps: "6–8", rest: 180, note: "Primary quad movement. Don't cut depth." },
          { name: "Romanian Deadlift", sets: 4, reps: "8–10", rest: 120, note: "Posterior chain. Feel the hamstring stretch." },
          { name: "Leg Press", sets: 4, reps: "10–12", rest: 120, note: "High foot placement for glute emphasis." },
          { name: "Leg Extension", sets: 3, reps: "12–15", rest: 60, note: "Quad isolation — Arnold was famous for his quad detail." },
          { name: "Lying Leg Curl", sets: 3, reps: "12–15", rest: 60, note: "Hamstring isolation." },
          { name: "Standing Calf Raise", sets: 5, reps: "15–20", rest: 60, note: "Arnold trained calves twice per day at his peak — take calf work seriously." },
          { name: "Seated Calf Raise", sets: 4, reps: "12–15", rest: 45, note: "Soleus. Different angle from standing version." },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 9. GZCLP
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "gzclp",
    title: "GZCLP — Beginner Linear Progression Program",
    shortTitle: "GZCLP",
    description:
      "GZCLP: a beginner-to-intermediate barbell program using a tiered exercise system (T1/T2/T3). Trains 4 days per week with compound movements at the core.",
    difficulty: "Beginner to Intermediate",
    daysPerWeek: 4,
    recommendedWeeks: "16–24 weeks",
    category: "Strength",
    equipment: "full",
    acronymExpanded: "Beginner Linear Progression",
    accent: "from-teal-600 to-cyan-500",
    badge: "bg-teal-600/20 text-teal-400 border-teal-500/30",
    datePublished: "2025-04-05",
    tags: ["GZCLP", "GZCL", "beginner", "linear progression", "4 day", "barbell"],
    overview:
      "GZCLP (by Cody LeFever) uses a tiered exercise system: Tier 1 (T1) movements are your heavy, low-rep compound lifts; Tier 2 (T2) are moderate-weight compound lifts for volume; Tier 3 (T3) are high-rep isolation exercises for accessory work. Each tier progresses independently, making GZCLP one of the most flexible linear progression programs available for beginners and early intermediates.",
    keyBenefits: [
      "Three tiers of progression allow independent development of strength, volume, and accessories",
      "4 training days — more practice on the main lifts than 3-day programs",
      "Flexible T3 accessory tier — customise to your weak points",
      "Handles stalls intelligently — each tier has its own reset protocol",
    ],
    whoIsItFor:
      "Beginners who want 4 days per week of training, or intermediate lifters who want a more structured linear progression model than StrongLifts. Also great for anyone who wants more flexibility in their accessory work.",
    progressionNotes:
      "T1: Add 2.5 kg every session. If you fail, reduce to 5 sets of 3, then 10 sets of 1, then reset down 10%. T2: Add 2.5 kg every session. On failure, reset and reduce to 3 sets of 8, then 3×6. T3: Add reps until you can do 3×15, then add weight.",
    days: [
      {
        day: "Day 1",
        label: "Monday",
        accent: "from-teal-600 to-cyan-500",
        exercises: [
          { name: "T1: Squat — 5×3+", sets: 5, reps: "3+ (AMRAP last set)", rest: 300, note: "Heavy. Work up to weight and do 5 sets of 3, last set AMRAP." },
          { name: "T2: Bench Press — 4×10+", sets: 4, reps: "10+ (AMRAP last)", rest: 120, note: "Moderate weight. 4 sets of 10, last set AMRAP." },
          { name: "T3: Lat Pulldown", sets: 3, reps: "15", rest: 60, note: "Accessory. 3×15 then add weight and restart." },
          { name: "T3: Ab Wheel or Plank", sets: 3, reps: "10–15", rest: 45, note: "Core accessory. Choose what feels weakest." },
        ],
      },
      {
        day: "Day 2",
        label: "Tuesday",
        accent: "from-teal-600 to-cyan-500",
        exercises: [
          { name: "T1: Overhead Press — 5×3+", sets: 5, reps: "3+", rest: 240, note: "Primary upper body strength lift for this session." },
          { name: "T2: Deadlift — 4×10+", sets: 4, reps: "10+", rest: 180, note: "Higher-rep deadlift for volume. Start relatively light." },
          { name: "T3: Dumbbell Row", sets: 3, reps: "15", rest: 60, note: "Unilateral back accessory." },
          { name: "T3: Dumbbell Curl", sets: 3, reps: "15", rest: 45, note: "Bicep accessory." },
        ],
      },
      {
        day: "Day 3",
        label: "Thursday",
        accent: "from-cyan-600 to-teal-500",
        exercises: [
          { name: "T1: Bench Press — 5×3+", sets: 5, reps: "3+", rest: 240, note: "Primary upper body strength lift for this session." },
          { name: "T2: Squat — 4×10+", sets: 4, reps: "10+", rest: 120, note: "Higher-rep squat for quad volume." },
          { name: "T3: Cable Row", sets: 3, reps: "15", rest: 60, note: "Back accessory." },
          { name: "T3: Tricep Pushdown", sets: 3, reps: "15", rest: 45, note: "Tricep accessory." },
        ],
      },
      {
        day: "Day 4",
        label: "Friday",
        accent: "from-cyan-600 to-teal-500",
        exercises: [
          { name: "T1: Deadlift — 5×3+", sets: 5, reps: "3+", rest: 300, note: "Heavy deadlift. Primary hip hinge strength movement." },
          { name: "T2: Overhead Press — 4×10+", sets: 4, reps: "10+", rest: 120, note: "Higher-rep OHP for shoulder volume." },
          { name: "T3: Leg Press or Lunge", sets: 3, reps: "15", rest: 60, note: "Leg accessory to complement the squat pattern." },
          { name: "T3: Lateral Raise", sets: 3, reps: "15", rest: 45, note: "Shoulder accessory." },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 10. Beginner 3-Day Full Body
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "beginner-full-body-3-day",
    title: "Beginner Full Body — 3-Day Gym Program",
    shortTitle: "Beginner Full Body",
    description:
      "The best starter gym program: 3-day full body workouts using machines and dumbbells. Perfect for beginners who want to build muscle and strength safely.",
    difficulty: "Beginner",
    daysPerWeek: 3,
    recommendedWeeks: "12 weeks",
    category: "Hypertrophy",
    equipment: "machines",
    accent: "from-green-600 to-emerald-500",
    badge: "bg-green-600/20 text-green-400 border-green-500/30",
    datePublished: "2025-04-10",
    tags: ["beginner", "full body workout", "3 day", "gym beginner", "machine workout"],
    overview:
      "The best program for someone walking into a gym for the first time is a 3-day full body program. Training all major muscle groups every session — three times per week — provides the highest practice frequency for learning movement patterns, the greatest hormonal stimulus for a beginner, and the flexibility to miss a session without destroying your weekly structure. This plan uses a mix of machines and dumbbells to make technique easier to learn.",
    keyBenefits: [
      "Three sessions per week — each muscle trained 3× for maximum beginner gains",
      "Machine-based exercises lower the learning curve and reduce injury risk",
      "Simple progression: add weight when you complete all sets and reps",
      "Short sessions (50–60 min) — sustainable long term",
    ],
    whoIsItFor:
      "Anyone new to the gym, returning after a long break, or switching from cardio-only training. After 12 weeks, progress to an Upper/Lower or PPL split as strength and confidence increase.",
    progressionNotes:
      "Add the smallest available weight increment (usually 2.5 kg) to an exercise when you complete all sets and reps with good form. Don't rush progression — technique first, weight second. If a machine doesn't go up in small enough increments, use a resistance band to increase difficulty between weight jumps.",
    days: [
      {
        day: "Session A",
        label: "Monday",
        accent: "from-green-600 to-emerald-500",
        exercises: [
          { name: "Machine Chest Press", sets: 3, reps: "10–12", rest: 90, note: "Adjust seat so handles align with mid-chest." },
          { name: "Lat Pulldown (Machine)", sets: 3, reps: "10–12", rest: 90, note: "Pull bar to upper chest. Squeeze shoulder blades at bottom." },
          { name: "Leg Press", sets: 3, reps: "12–15", rest: 120, note: "Feet shoulder-width. Don't lock knees at the top." },
          { name: "Dumbbell Shoulder Press (Seated)", sets: 3, reps: "10–12", rest: 90, note: "Neutral or overhand grip. Control the descent." },
          { name: "Cable Bicep Curl", sets: 2, reps: "12–15", rest: 60, note: "Keep elbows pinned to your sides." },
          { name: "Tricep Pushdown (Cable)", sets: 2, reps: "12–15", rest: 60, note: "Full extension at the bottom. Straight bar or rope." },
        ],
      },
      {
        day: "Session B",
        label: "Wednesday",
        accent: "from-green-600 to-emerald-500",
        exercises: [
          { name: "Incline Dumbbell Press", sets: 3, reps: "10–12", rest: 90, note: "30–45° incline. Let dumbbells stretch chest at bottom." },
          { name: "Seated Cable Row", sets: 3, reps: "10–12", rest: 90, note: "Chest tall. Pull handle to lower sternum." },
          { name: "Goblet Squat (Dumbbell)", sets: 3, reps: "12–15", rest: 90, note: "Hold dumbbell at chest. Sit back and down." },
          { name: "Dumbbell Romanian Deadlift", sets: 3, reps: "10–12", rest: 90, note: "Hinge at hips. Feel the hamstring stretch." },
          { name: "Dumbbell Lateral Raise", sets: 3, reps: "12–15", rest: 60, note: "Lead with elbows. Slight forward lean." },
          { name: "Hammer Curl", sets: 2, reps: "12–15", rest: 60, note: "Neutral grip. Build forearm and brachialis." },
          { name: "Overhead Tricep Extension (Dumbbell)", sets: 2, reps: "12–15", rest: 60, note: "Both hands on one dumbbell. Keep elbows pointing forward." },
        ],
      },
      {
        day: "Session C",
        label: "Friday",
        accent: "from-emerald-600 to-green-500",
        exercises: [
          { name: "Pec Deck / Machine Fly", sets: 3, reps: "12–15", rest: 75, note: "Chest isolation. Don't let arms go behind your torso." },
          { name: "Machine Row (Chest-Supported)", sets: 3, reps: "10–12", rest: 90, note: "Back isolation without lower back strain." },
          { name: "Leg Press", sets: 3, reps: "12–15", rest: 120, note: "Add weight vs Session A if it felt manageable." },
          { name: "Lying Leg Curl (Machine)", sets: 3, reps: "12–15", rest: 75, note: "Hamstring isolation. Full range of motion." },
          { name: "Machine Shoulder Press", sets: 3, reps: "10–12", rest: 90, note: "Adjust seat height so handles are at shoulder level." },
          { name: "Preacher Curl (Machine)", sets: 2, reps: "12–15", rest: 60, note: "Full extension at the bottom. Squeeze at the top." },
          { name: "Tricep Dip Machine", sets: 2, reps: "12–15", rest: 60, note: "Keep elbows close. Don't flare outward." },
        ],
      },
    ],
  },
];

export function getTemplateBySlug(slug) {
  return planTemplates.find((t) => t.slug === slug) ?? null;
}
