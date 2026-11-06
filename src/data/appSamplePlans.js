/**
 * Ready-made workout plans in normalizePlan-compatible format.
 * These are displayed in PlanView so users can load a plan without AI.
 *
 * Exercise format: { name, sets, reps, rest, note }
 * — enrichPlan() fills in instructions/formTips/media/alternates from the local library.
 */

// Shared warm-up / cool-down for the 3-Day Dumbbell HIIT plan — the same
// 5-minute warm-up before every workout and 3–5 minute cool-down after.
const HIIT_WARM_UP = [
  { name: "Walking in place", duration: "1 min", note: "Easy pace, arms swinging naturally." },
  { name: "Arm circles", duration: "1 min", note: "Small circles, within a comfortable range." },
  { name: "Bodyweight squats", duration: "1 min", note: "Slow and controlled, no weight." },
  { name: "Gentle hip hinges", duration: "1 min", note: "Soft knees, push hips back and return." },
  { name: "Side-to-side steps", duration: "1 min", note: "Step side to side, knees soft." },
];

const HIIT_COOL_DOWN = [
  { name: "Hamstring stretch", duration: "1 min", note: "Gentle stretch, hold and breathe." },
  { name: "Quadriceps stretch", duration: "1 min", note: "Hold a chair for balance if needed." },
  { name: "Calf stretch", duration: "1 min", note: "Gentle stretch, both legs." },
  { name: "Slow walking and deep breathing", duration: "1 min", note: "Easy walking until your breathing settles." },
];

export const APP_SAMPLE_PLANS = [
  // ────────────────────────────────────────────────────────────────────────
  // 1. Beginner Full Body — 3 days/week
  // ────────────────────────────────────────────────────────────────────────
  {
    meta: { notes: "Beginner Full Body — 3 Days/Week" },
    planType: "single_week",
    includeWarmUp: false,
    includeCoolDown: false,
    // UI metadata (not used by normalizePlan)
    _ui: {
      badge: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30",
      level: "Beginner",
      daysLabel: "3 days/week",
      description:
        "A simple full-body routine for people new to the gym. Each session trains all major muscle groups with compound movements.",
    },
    days: [
      {
        label: "Monday",
        short: "Full Body A",
        title: "Full Body A",
        exercises: [
          { name: "Machine Chest Press",        sets: 3, reps: "10-12", rest: 60,  note: "Adjust seat so handles align with mid-chest." },
          { name: "Lat Pulldown",               sets: 3, reps: "10-12", rest: 60,  note: "Pull to upper chest, squeeze shoulder blades." },
          { name: "Leg Press",                  sets: 3, reps: "12-15", rest: 90,  note: "Feet shoulder-width, don't lock knees at top." },
          { name: "Dumbbell Shoulder Press",    sets: 3, reps: "10-12", rest: 60,  note: "Neutral grip, elbows slightly forward." },
          { name: "Cable Bicep Curl",           sets: 2, reps: "12-15", rest: 45,  note: "Keep elbows pinned to sides." },
          { name: "Tricep Pushdown",            sets: 2, reps: "12-15", rest: 45,  note: "Straight bar or rope attachment." },
        ],
      },
      {
        label: "Wednesday",
        short: "Full Body B",
        title: "Full Body B",
        exercises: [
          { name: "Incline Dumbbell Press",         sets: 3, reps: "10-12", rest: 60,  note: "30-45° incline, controlled descent." },
          { name: "Seated Cable Row",               sets: 3, reps: "10-12", rest: 60,  note: "Chest tall, pull to lower sternum." },
          { name: "Goblet Squat",                   sets: 3, reps: "12-15", rest: 90,  note: "Hold dumbbell at chest, sit back and down." },
          { name: "Lateral Raise",                  sets: 3, reps: "12-15", rest: 45,  note: "Slight bend in elbows, lead with elbows." },
          { name: "Hammer Curl",                    sets: 2, reps: "12-15", rest: 45,  note: "Neutral grip, controlled tempo." },
          { name: "Overhead Tricep Extension",      sets: 2, reps: "12-15", rest: 45,  note: "Keep elbows close to head." },
        ],
      },
      {
        label: "Friday",
        short: "Full Body C",
        title: "Full Body C",
        exercises: [
          { name: "Pec Deck Machine",               sets: 3, reps: "12-15", rest: 60,  note: "Don't let weight pull arms behind torso." },
          { name: "Dumbbell Row",                   sets: 3, reps: "10-12", rest: 60,  note: "Full range of motion, chest tall." },
          { name: "Romanian Deadlift",              sets: 3, reps: "10-12", rest: 90,  note: "Hinge at hips, soft knee bend." },
          { name: "Dumbbell Shoulder Press",        sets: 3, reps: "10-12", rest: 60,  note: "Adjust seat to shoulder height." },
          { name: "Barbell Curl",                   sets: 2, reps: "12-15", rest: 45,  note: "Full extension at bottom, squeeze at top." },
          { name: "Tricep Pushdown",                sets: 2, reps: "12-15", rest: 45,  note: "Keep elbows pinned, flare at bottom." },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 2. Push / Pull / Legs — 6 days/week
  // ────────────────────────────────────────────────────────────────────────
  {
    meta: { notes: "Push / Pull / Legs — 6 Days/Week" },
    planType: "single_week",
    includeWarmUp: false,
    includeCoolDown: false,
    _ui: {
      badge: "bg-blue-600/20 text-blue-400 border-blue-500/30",
      level: "Intermediate",
      daysLabel: "6 days/week",
      description:
        "The classic PPL split for intermediates. Push, Pull, and Legs sessions repeated twice per week for maximum frequency and volume.",
    },
    days: [
      {
        label: "Monday",
        short: "Push A",
        title: "Push A — Chest Focus",
        exercises: [
          { name: "Barbell Bench Press",    sets: 4, reps: "6-8",   rest: 120, note: "Arch slightly, bar to lower chest, elbows 45°." },
          { name: "Incline Dumbbell Press", sets: 3, reps: "8-10",  rest: 90,  note: "30-45° incline, full stretch at bottom." },
          { name: "Cable Fly",              sets: 3, reps: "12-15", rest: 60,  note: "Slight elbow bend, arc up and together." },
          { name: "Overhead Press",         sets: 3, reps: "8-10",  rest: 90,  note: "Bar in front, press straight up, lock out." },
          { name: "Lateral Raise",          sets: 4, reps: "15-20", rest: 45,  note: "Light weight, lead with elbows." },
          { name: "Tricep Pushdown",        sets: 3, reps: "12-15", rest: 45,  note: "Flare rope at bottom, full extension." },
        ],
      },
      {
        label: "Tuesday",
        short: "Pull A",
        title: "Pull A — Back Focus",
        exercises: [
          { name: "Barbell Row",            sets: 4, reps: "6-8",   rest: 120, note: "Hinge to 45°, pull to lower chest, squeeze." },
          { name: "Pull-Up",               sets: 3, reps: "6-8",   rest: 120, note: "Full hang at bottom, chin over bar." },
          { name: "Seated Cable Row",       sets: 3, reps: "10-12", rest: 90,  note: "Pull to upper chest, elbows flared." },
          { name: "Face Pull",              sets: 3, reps: "15-20", rest: 45,  note: "Rope to forehead, external rotation at end." },
          { name: "Barbell Curl",           sets: 3, reps: "8-10",  rest: 60,  note: "Full range, don't swing." },
          { name: "Hammer Curl",            sets: 3, reps: "10-12", rest: 45,  note: "Neutral grip, arms hang beside torso." },
        ],
      },
      {
        label: "Wednesday",
        short: "Legs A",
        title: "Legs A — Quad Focus",
        exercises: [
          { name: "Barbell Back Squat",     sets: 4, reps: "6-8",   rest: 180, note: "Bar on traps, sit back and down, knees out." },
          { name: "Leg Press",              sets: 3, reps: "10-12", rest: 120, note: "High foot placement for more glute involvement." },
          { name: "Leg Extension",          sets: 3, reps: "12-15", rest: 60,  note: "Pause at top, controlled descent." },
          { name: "Romanian Deadlift",      sets: 3, reps: "10-12", rest: 90,  note: "Hinge at hips, feel hamstring stretch." },
          { name: "Leg Curl",               sets: 3, reps: "12-15", rest: 60,  note: "Full range, squeeze at top." },
          { name: "Standing Calf Raise",    sets: 4, reps: "15-20", rest: 45,  note: "Full stretch at bottom, pause at top." },
        ],
      },
      {
        label: "Thursday",
        short: "Push B",
        title: "Push B — Shoulder Focus",
        exercises: [
          { name: "Overhead Press",         sets: 4, reps: "6-8",   rest: 120, note: "Shoulder-focus session — OHP is the primary lift." },
          { name: "Incline Barbell Press",  sets: 3, reps: "8-10",  rest: 90,  note: "Upper chest builder." },
          { name: "Lateral Raise",          sets: 4, reps: "12-15", rest: 45,  note: "4 sets today — prioritising side delts." },
          { name: "Cable Fly",              sets: 3, reps: "12-15", rest: 60,  note: "High cable — targets lower chest fibres." },
          { name: "Rear Delt Fly",          sets: 3, reps: "15-20", rest: 45,  note: "Light weight, high reps. Don't let traps dominate." },
          { name: "Overhead Tricep Extension", sets: 3, reps: "12-15", rest: 45, note: "Long head emphasis." },
        ],
      },
      {
        label: "Friday",
        short: "Pull B",
        title: "Pull B — Arm Focus",
        exercises: [
          { name: "Deadlift",               sets: 3, reps: "4-6",   rest: 180, note: "Conventional. Primary posterior chain lift." },
          { name: "Dumbbell Row",           sets: 3, reps: "10-12", rest: 90,  note: "Chest-supported. Removes lower back from the equation." },
          { name: "Lat Pulldown",           sets: 3, reps: "10-12", rest: 90,  note: "Supinated grip — more bicep involvement." },
          { name: "Straight-Arm Pulldown",  sets: 3, reps: "12-15", rest: 60,  note: "Lat isolation — arms stay straight." },
          { name: "Incline Dumbbell Curl",  sets: 3, reps: "10-12", rest: 60,  note: "Arms hang behind body. Maximum bicep stretch." },
          { name: "Hammer Curl",            sets: 3, reps: "12-15", rest: 45,  note: "Brachialis and forearm builder." },
        ],
      },
      {
        label: "Saturday",
        short: "Legs B",
        title: "Legs B — Posterior Focus",
        exercises: [
          { name: "Romanian Deadlift",      sets: 4, reps: "8-10",  rest: 120, note: "Primary hip hinge. Focus on hamstring load." },
          { name: "Leg Press",              sets: 3, reps: "10-12", rest: 90,  note: "High foot placement — hamstrings and glutes." },
          { name: "Hip Thrust",             sets: 3, reps: "10-12", rest: 90,  note: "Shoulders on bench. Squeeze glutes hard at top." },
          { name: "Leg Curl",               sets: 4, reps: "12-15", rest: 60,  note: "Seated version keeps hip in flexion." },
          { name: "Bulgarian Split Squat",  sets: 3, reps: "10",    rest: 90,  note: "Rear foot elevated. Unilateral strength." },
          { name: "Seated Calf Raise",      sets: 4, reps: "15-20", rest: 45,  note: "Soleus focus." },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 3. Upper / Lower — 4 days/week
  // ────────────────────────────────────────────────────────────────────────
  {
    meta: { notes: "Upper / Lower Split — 4 Days/Week" },
    planType: "single_week",
    includeWarmUp: false,
    includeCoolDown: false,
    _ui: {
      badge: "bg-violet-600/20 text-violet-400 border-violet-500/30",
      level: "Intermediate",
      daysLabel: "4 days/week",
      description:
        "Upper and lower body alternate across four days. Each muscle trained twice per week — the research-backed sweet spot for hypertrophy.",
    },
    days: [
      {
        label: "Monday",
        short: "Upper A",
        title: "Upper A — Strength Focus",
        exercises: [
          { name: "Barbell Bench Press",    sets: 4, reps: "5-6",   rest: 180, note: "Heavy — work up to a challenging weight." },
          { name: "Barbell Row",            sets: 4, reps: "5-6",   rest: 180, note: "Match bench press intensity." },
          { name: "Overhead Press",         sets: 3, reps: "6-8",   rest: 120, note: "Strict form, no leg drive." },
          { name: "Lat Pulldown",           sets: 3, reps: "8-10",  rest: 90,  note: "Wide grip, pull to upper chest." },
          { name: "Lateral Raise",          sets: 3, reps: "15-20", rest: 45,  note: "Pump work — lighter weight, higher reps." },
        ],
      },
      {
        label: "Tuesday",
        short: "Lower A",
        title: "Lower A — Strength Focus",
        exercises: [
          { name: "Barbell Back Squat",     sets: 4, reps: "5-6",   rest: 180, note: "Heavy — work up to a challenging weight." },
          { name: "Romanian Deadlift",      sets: 3, reps: "8-10",  rest: 120, note: "Hinge pattern, feel the hamstring stretch." },
          { name: "Leg Press",              sets: 3, reps: "10-12", rest: 90,  note: "Moderate weight, full range." },
          { name: "Leg Curl",               sets: 3, reps: "10-12", rest: 60,  note: "Controlled tempo, squeeze at top." },
          { name: "Standing Calf Raise",    sets: 4, reps: "15-20", rest: 45,  note: "Full stretch at bottom." },
        ],
      },
      {
        label: "Thursday",
        short: "Upper B",
        title: "Upper B — Hypertrophy Focus",
        exercises: [
          { name: "Incline Dumbbell Press", sets: 4, reps: "10-12", rest: 90,  note: "More volume and reps than Monday's bench." },
          { name: "Seated Cable Row",       sets: 4, reps: "10-12", rest: 90,  note: "Pull to lower sternum, chest tall." },
          { name: "Dumbbell Shoulder Press",sets: 3, reps: "10-12", rest: 75,  note: "Seated, controlled tempo." },
          { name: "Cable Fly",              sets: 3, reps: "12-15", rest: 60,  note: "Stretch at bottom, squeeze at top." },
          { name: "Barbell Curl",           sets: 3, reps: "10-12", rest: 60,  note: "Full range, no swinging." },
          { name: "Skull Crusher",          sets: 3, reps: "10-12", rest: 60,  note: "EZ bar, lower to forehead." },
        ],
      },
      {
        label: "Friday",
        short: "Lower B",
        title: "Lower B — Hypertrophy Focus",
        exercises: [
          { name: "Hack Squat",             sets: 4, reps: "10-12", rest: 90,  note: "More quad volume than Lower A." },
          { name: "Romanian Deadlift",      sets: 3, reps: "10-12", rest: 90,  note: "Higher reps than Monday — feel the stretch." },
          { name: "Leg Extension",          sets: 3, reps: "12-15", rest: 60,  note: "Quad isolation, pause at top." },
          { name: "Leg Curl",               sets: 3, reps: "12-15", rest: 60,  note: "Hamstring isolation." },
          { name: "Hip Thrust",             sets: 3, reps: "10-12", rest: 90,  note: "Barbell or machine. Squeeze at top." },
          { name: "Seated Calf Raise",      sets: 4, reps: "15-20", rest: 45,  note: "Soleus focus." },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 4. 3-Day Dumbbell HIIT — Fat Loss + Muscle Maintenance
  // Timed intervals: 40 sec work / 20 sec rest, 6 exercises, 3 rounds.
  // Sets = rounds; the app's rest timer covers the 20 sec between sets.
  // Per-side moves (Day 3 rows + suitcase march) stay one exercise with
  // reps "40 sec each side" so the 6-exercise circuit and 25–30 min
  // duration are preserved — the note tells the user when to switch sides.
  // ────────────────────────────────────────────────────────────────────────
  {
    meta: { notes: "3-Day Dumbbell HIIT — Fat Loss + Muscle Maintenance" },
    planType: "single_week",
    includeWarmUp: true,
    includeCoolDown: true,
    // UI metadata (not used by normalizePlan)
    _ui: {
      badge: "bg-rose-600/20 text-rose-400 border-rose-500/30",
      level: "Beginner",
      daysLabel: "3 days/week",
      description:
        "A 25–30 minute dumbbell HIIT circuit for fat loss that keeps muscle: 6 exercises at 40 seconds work / 20 seconds rest, 3 rounds, on Monday, Wednesday and Friday. Just two dumbbells, a mat and a chair. No overhead presses — supported rows instead. Start light, focus on technique, and stop if anything hurts.",
    },
    days: [
      {
        label: "Monday",
        short: "Day 1 — Full Body Strength",
        title: "Day 1 — Full Body Strength",
        warmUp: HIIT_WARM_UP,
        exercises: [
          { name: "Dumbbell Goblet Squat",      sets: 3, reps: "40 sec", rest: 20, note: "Circuit: do all 6 exercises in order, then repeat 2 more times (3 rounds). Rest 60–90 sec between rounds if needed. Hold one dumbbell against your chest. Bend your knees and lower your body, then stand up." },
          { name: "Dumbbell Bent-Over Row",     sets: 3, reps: "40 sec", rest: 20, note: "Lean forward slightly with a straight back. Pull both dumbbells towards your waist." },
          { name: "Dumbbell Romanian Deadlift", sets: 3, reps: "40 sec", rest: 20, note: "Hold dumbbells in front of your thighs. Push your hips backwards while lowering the weights, then stand up." },
          { name: "Dumbbell Floor Press",       sets: 3, reps: "40 sec", rest: 20, note: "Lie on your back and push dumbbells upwards from chest level." },
          { name: "Dumbbell Reverse Lunge",     sets: 3, reps: "40 sec", rest: 20, note: "Step backwards with one leg, lower your body gently and return to standing. Alternate legs." },
          { name: "Fast Marching in Place",     sets: 3, reps: "40 sec", rest: 20, note: "March quickly in place, lifting your knees." },
        ],
        coolDown: HIIT_COOL_DOWN,
      },
      {
        label: "Wednesday",
        short: "Day 2 — Strength + Cardio",
        title: "Day 2 — Strength + Cardio",
        warmUp: HIIT_WARM_UP,
        exercises: [
          { name: "Dumbbell Sumo Squat",        sets: 3, reps: "40 sec", rest: 20, note: "Circuit: do all 6 exercises in order, then repeat 2 more times (3 rounds). Rest 60–90 sec between rounds if needed. Feet wider than shoulder-width apart. Hold one dumbbell and squat down." },
          { name: "Dumbbell Farmer March",      sets: 3, reps: "40 sec", rest: 20, note: "Hold a dumbbell in each hand and march in place while keeping your back straight." },
          { name: "Supported Split Squat",      sets: 3, reps: "40 sec", rest: 20, note: "Step one foot forward and one backwards. Bend your knees gently and lower your body. Use a chair for balance. Change legs halfway through the 40 seconds." },
          { name: "Dumbbell Bent-Over Row",     sets: 3, reps: "40 sec", rest: 20, note: "Lean forward slightly with a straight back. Pull both dumbbells towards your waist." },
          { name: "Dumbbell Floor Press",       sets: 3, reps: "40 sec", rest: 20, note: "Lie on your back and push dumbbells upwards from chest level." },
          { name: "Side-to-Side Step Touch",    sets: 3, reps: "40 sec", rest: 20, note: "Step to your right, bring your left foot towards it, then repeat on the other side." },
        ],
        coolDown: HIIT_COOL_DOWN,
      },
      {
        label: "Friday",
        short: "Day 3 — Full Body Conditioning",
        title: "Day 3 — Full Body Conditioning",
        warmUp: HIIT_WARM_UP,
        exercises: [
          { name: "Dumbbell Squat",             sets: 3, reps: "40 sec", rest: 20, note: "Circuit: do all 6 exercises in order, then repeat 2 more times (3 rounds). Rest 60–90 sec between rounds if needed. Hold dumbbells at your sides and squat down slowly. Stand back up." },
          { name: "Dumbbell Romanian Deadlift", sets: 3, reps: "40 sec", rest: 20, note: "Push your hips backwards while lowering dumbbells along your legs. Keep your back straight." },
          { name: "Dumbbell Floor Press",       sets: 3, reps: "40 sec", rest: 20, note: "Lie on your back and push dumbbells upwards from chest level." },
          { name: "Supported One-Arm Row",      sets: 3, reps: "40 sec each side", rest: 20, note: "Support yourself with one hand on a chair. Pull the dumbbell towards your waist. Do 40 seconds on one arm, then switch arms — both sides inside the same round." },
          { name: "Dumbbell Suitcase March",    sets: 3, reps: "40 sec each side", rest: 20, note: "Hold one dumbbell in one hand and march in place. Keep your body straight without leaning. Do 40 seconds on one side, then switch hands." },
          { name: "Standing Knee Drive",        sets: 3, reps: "40 sec", rest: 20, note: "Stand straight and bring one knee towards your chest, then alternate legs." },
        ],
        coolDown: HIIT_COOL_DOWN,
      },
    ],
  },
];
