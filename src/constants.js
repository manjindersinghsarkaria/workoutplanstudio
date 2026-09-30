export const THEME_PRESETS = [
    { accent: "from-blue-600 to-cyan-500",    soft: "bg-blue-500/15",    ring: "ring-blue-400/50",    border: "border-blue-400/40",    chip: "bg-blue-600 text-white border border-blue-500" },
    { accent: "from-emerald-600 to-green-500", soft: "bg-emerald-500/15", ring: "ring-emerald-400/50", border: "border-emerald-400/40", chip: "bg-emerald-600 text-white border border-emerald-500" },
    { accent: "from-violet-600 to-purple-500", soft: "bg-violet-500/15",  ring: "ring-violet-400/50",  border: "border-violet-400/40",  chip: "bg-violet-600 text-white border border-violet-500" },
    { accent: "from-amber-600 to-orange-600",  soft: "bg-amber-500/15",   ring: "ring-amber-400/50",   border: "border-amber-400/40",   chip: "bg-amber-700 text-white border border-amber-600" },
    { accent: "from-rose-500 to-pink-500",     soft: "bg-rose-500/15",    ring: "ring-rose-400/50",    border: "border-rose-400/40",    chip: "bg-rose-600 text-white border border-rose-500" },
  ];

// Generates a YouTube search URL for an exercise — always works, never goes dead
function ytSearch(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query + " exercise tutorial")}`;
}

  export const DEFAULT_PLAN = {
    meta: { appName: "WorkoutPlanStudio", version: "v6", notes: "5-day push/pull/legs plan." },
    planType: "single_week",
    includeWarmUp: true,
    includeCoolDown: true,
    days: [
      {
        id: "day1", label: "Day 1", short: "Push A", title: "Chest + Triceps",
        theme: THEME_PRESETS[0],
        warmUp: [
          { name: "Arm Circles", duration: "45 sec", note: "Forward and backward." },
          { name: "Band Pull-Apart", duration: "20 reps", note: "Activates rear delts." },
        ],
        exercises: [
          { id: "d1e1", name: "Machine Chest Press", sets: 4, reps: "10-12", rest: 60, note: "Neutral grip, elbows 30-45° from torso.", instructions: ["Adjust seat so handles align with mid-chest.", "Grip handles with a neutral or overhand grip.", "Press forward until arms are nearly extended.", "Slowly return to start — 2 sec on the way back."], formTips: ["Keep elbows at 30-45° from torso, not flared wide.", "Don't lock out elbows at the top."], media: { type: "youtube", url: ytSearch("Machine Chest Press"), label: "Search on YouTube" }, alternates: [{ name: "Dumbbell Chest Press", note: "Flat bench, same elbow angle." }, { name: "Push-Ups", note: "Elevate hands to reduce intensity." }] },
          { id: "d1e2", name: "Incline Push-Ups", sets: 3, reps: "10-15", rest: 45, note: "Hands on bench, smooth tempo.", instructions: ["Place hands on a bench shoulder-width apart.", "Walk feet back until body forms a straight line.", "Lower chest toward the bench with control.", "Push back up to start."], formTips: ["Keep hips level — don't let them sag or pike.", "Brace your core throughout."], media: { type: "youtube", url: ytSearch("Incline Push-Ups"), label: "Search on YouTube" }, alternates: [{ name: "Incline DB Press (Light)", note: "30-45° bench, controlled descent." }, { name: "Resistance Band Press", note: "Anchor band behind you at chest height." }] },
          { id: "d1e3", name: "Cable Fly Low-to-Mid", sets: 3, reps: "12-15", rest: 45, note: "Avoid overstretch at shoulder.", instructions: ["Set pulleys to the lowest position.", "Stand in the center, step forward slightly.", "With a slight elbow bend, arc hands up and together at chest height.", "Slowly open arms back to start."], formTips: ["Keep a soft bend in the elbows throughout.", "Don't let the weight pull your arms behind your torso."], media: { type: "youtube", url: ytSearch("Cable Fly Low to Mid chest"), label: "Search on YouTube" }, alternates: [{ name: "Pec Deck Machine", note: "Keep elbows slightly bent." }, { name: "DB Fly (Flat Bench)", note: "Light weight, stop at chest level." }] },
          { id: "d1e4", name: "Rope Triceps Pushdown", sets: 4, reps: "12-15", rest: 45, note: "Keep shoulders down.", instructions: ["Attach a rope to a high cable pulley.", "Grip the rope with palms facing each other.", "Keeping upper arms pinned to your sides, push down until arms are fully extended.", "Slowly return to start."], formTips: ["Don't let elbows flare out.", "Squeeze triceps hard at the bottom."], media: { type: "youtube", url: ytSearch("Rope Triceps Pushdown"), label: "Search on YouTube" }, alternates: [{ name: "Bar Triceps Pushdown", note: "Straight or EZ bar." }, { name: "Overhead DB Triceps Extension", note: "Light weight, both hands on one DB." }] },
          { id: "d1e5", name: "Dead Bug", sets: 3, reps: "8-10 / side", rest: 30, note: "Core without crunching.", instructions: ["Lie on your back, arms pointing to ceiling, knees bent 90° in the air.", "Slowly lower opposite arm and leg toward the floor.", "Return to start and repeat on the other side."], formTips: ["Press your lower back into the floor the entire time.", "Move slowly — speed defeats the purpose."], media: { type: "youtube", url: ytSearch("Dead Bug core exercise"), label: "Search on YouTube" }, alternates: [{ name: "Plank Hold", note: "30-45 sec, keep hips level." }, { name: "Pallof Press", note: "Cable or band, anti-rotation." }] },
        ],
        coolDown: [
          { name: "Chest Doorway Stretch", duration: "45 sec", note: "Hold each side." },
          { name: "Triceps Overhead Stretch", duration: "30 sec / side", note: "Gentle pull." },
        ],
      },
      {
        id: "day2", label: "Day 2", short: "Legs A", title: "Lower Body + Core",
        theme: THEME_PRESETS[1],
        warmUp: [
          { name: "Leg Swings", duration: "30 sec / side", note: "Forward and lateral." },
          { name: "Bodyweight Squat", duration: "15 reps", note: "Full depth, slow tempo." },
        ],
        exercises: [
          { id: "d2e1", name: "Goblet Squat", sets: 4, reps: "10-12", rest: 60, note: "Brace core, keep chest tall.", instructions: ["Hold a dumbbell or kettlebell at chest height.", "Stand feet shoulder-width apart, toes slightly out.", "Squat down keeping chest tall and knees tracking over toes.", "Drive through heels to stand back up."], formTips: ["Keep elbows inside your knees at the bottom.", "Don't let your lower back round."], media: { type: "youtube", url: ytSearch("Goblet Squat"), label: "Search on YouTube" }, alternates: [{ name: "Leg Press (Narrow Stance)", note: "Machine alternative, same quad focus." }, { name: "Bodyweight Squat", note: "Add a pause at the bottom." }] },
          { id: "d2e2", name: "Romanian Deadlift (Dumbbells)", sets: 4, reps: "10-12", rest: 60, note: "Hinge at hips, neutral spine.", instructions: ["Stand holding dumbbells in front of thighs.", "Push hips back and lower the weights along your legs.", "Stop when you feel a hamstring stretch (around mid-shin).", "Drive hips forward to return to standing."], formTips: ["Keep a neutral spine — don't round your back.", "Soft bend in the knees throughout."], media: { type: "youtube", url: ytSearch("Dumbbell Romanian Deadlift"), label: "Search on YouTube" }, alternates: [{ name: "Lying Leg Curl Machine", note: "Isolates hamstrings." }, { name: "Single-Leg RDL (Bodyweight)", note: "Balance focus, same hinge pattern." }] },
          { id: "d2e3", name: "Walking Lunges", sets: 3, reps: "10 / leg", rest: 45, note: "Bodyweight or light DBs.", instructions: ["Stand tall, step forward with one foot.", "Lower your back knee toward the floor.", "Push off the front foot and bring the rear foot forward to step.", "Alternate legs as you walk forward."], formTips: ["Keep your torso upright — don't lean forward.", "Front knee should stay above your ankle."], media: { type: "youtube", url: ytSearch("Walking Lunges"), label: "Search on YouTube" }, alternates: [{ name: "Reverse Lunges", note: "Easier on knees, same muscles." }, { name: "Split Squat", note: "Stationary, rear foot elevated optional." }] },
          { id: "d2e4", name: "Glute Bridge", sets: 3, reps: "15", rest: 30, note: "Pause at top for 1 sec.", instructions: ["Lie on your back, knees bent, feet flat on the floor.", "Drive through your heels and lift your hips toward the ceiling.", "Squeeze glutes hard at the top and hold 1 second.", "Lower hips back down with control."], formTips: ["Don't hyperextend your lower back at the top.", "Keep feet close enough that shins are vertical."], media: { type: "youtube", url: ytSearch("Glute Bridge"), label: "Search on YouTube" }, alternates: [{ name: "Hip Thrust (Bench)", note: "Upper back on bench for greater range." }, { name: "Cable Pull-Through", note: "Standing hip hinge, glute focus." }] },
          { id: "d2e5", name: "Bird Dog", sets: 3, reps: "8-10 / side", rest: 30, note: "Low-back & core friendly.", instructions: ["Start on all fours — hands under shoulders, knees under hips.", "Extend one arm forward and the opposite leg back simultaneously.", "Hold 2 seconds, then return to start.", "Repeat on the other side."], formTips: ["Keep hips level — don't rotate.", "Move slowly and with control."], media: { type: "youtube", url: ytSearch("Bird Dog exercise"), label: "Search on YouTube" }, alternates: [{ name: "Dead Bug", note: "Opposite limb extension on the floor." }, { name: "Plank with Shoulder Tap", note: "Anti-rotation demand." }] },
        ],
        coolDown: [
          { name: "Hip Flexor Stretch", duration: "45 sec / side", note: "Lunge position, upright torso." },
          { name: "Seated Hamstring Stretch", duration: "45 sec / side", note: "Reach toward toes." },
        ],
      },
      {
        id: "day3", label: "Day 3", short: "Pull", title: "Back + Biceps + Rear Delts",
        theme: THEME_PRESETS[2],
        warmUp: [
          { name: "Cat-Cow Stretch", duration: "10 reps", note: "Mobilise thoracic spine." },
          { name: "Band Pull-Apart", duration: "20 reps", note: "Activates rear delts and rhomboids." },
        ],
        exercises: [
          { id: "d3e1", name: "Seated Cable Row", sets: 4, reps: "10-12", rest: 60, note: "Neutral spine, squeeze shoulder blades.", instructions: ["Sit at the cable row machine, feet on the platform.", "Grip the handle and sit tall with a slight lean forward.", "Pull the handle to your lower chest, squeezing shoulder blades together.", "Slowly extend arms back to start."], formTips: ["Don't round your lower back as you reach forward.", "Lead with your elbows, not your hands."], media: { type: "youtube", url: ytSearch("Seated Cable Row"), label: "Search on YouTube" }, alternates: [{ name: "DB Bent-Over Row", note: "Brace on bench for support." }, { name: "Machine Row", note: "Chest-pad machine keeps torso stable." }] },
          { id: "d3e2", name: "Lat Pulldown", sets: 4, reps: "10-12", rest: 60, note: "Avoid shrugging.", instructions: ["Sit at the lat pulldown machine, thighs secured under the pad.", "Grip the bar slightly wider than shoulder-width.", "Pull the bar down to your upper chest, leading with your elbows.", "Slowly return the bar to the top."], formTips: ["Lean back slightly — about 10-15°.", "Don't shrug your shoulders as you pull."], media: { type: "youtube", url: ytSearch("Lat Pulldown form"), label: "Search on YouTube" }, alternates: [{ name: "Assisted Pull-Up Machine", note: "Same pattern, bodyweight based." }, { name: "Straight-Arm Pulldown", note: "Isolates lats without bicep." }] },
          { id: "d3e3", name: "Chest-Supported DB Row", sets: 3, reps: "10-12", rest: 45, note: "Shoulder-friendly back work.", instructions: ["Set an incline bench to 30-45°.", "Lie chest-down on the bench holding dumbbells.", "Row both dumbbells up toward your hips, squeezing shoulder blades.", "Lower with control."], formTips: ["Keep your chest on the pad throughout.", "Don't swing or use momentum."], media: { type: "youtube", url: ytSearch("Chest Supported Dumbbell Row"), label: "Search on YouTube" }, alternates: [{ name: "Single-Arm DB Row", note: "Brace on bench, full ROM." }, { name: "TRX / Suspension Row", note: "Bodyweight, adjust angle for difficulty." }] },
          { id: "d3e4", name: "Face Pull", sets: 3, reps: "12-15", rest: 45, note: "Great for shoulder health.", instructions: ["Set a cable pulley to face height with a rope attachment.", "Grip the rope with thumbs pointing back.", "Pull the rope toward your face, flaring elbows out and up.", "Slowly return to start."], formTips: ["Use light weight — this is a health exercise, not a strength one.", "Finish with external rotation — thumbs pointing behind you."], media: { type: "youtube", url: ytSearch("Face Pull cable exercise"), label: "Search on YouTube" }, alternates: [{ name: "Band Pull-Apart", note: "Resistance band, same rear-delt focus." }, { name: "Reverse Pec Deck", note: "Machine, rear delts and rhomboids." }] },
          { id: "d3e5", name: "Hammer Curl", sets: 3, reps: "10-12", rest: 45, note: "Neutral grip.", instructions: ["Stand holding dumbbells at your sides, palms facing each other.", "Keeping upper arms still, curl both dumbbells up.", "Squeeze at the top, then lower slowly."], formTips: ["Don't swing your elbows forward.", "Control the lowering phase — 2-3 seconds down."], media: { type: "youtube", url: ytSearch("Hammer Curl dumbbell"), label: "Search on YouTube" }, alternates: [{ name: "Cable Hammer Curl (Rope)", note: "Constant tension." }, { name: "Incline DB Curl", note: "Full stretch at bottom." }] },
        ],
        coolDown: [
          { name: "Lat Stretch (Doorway)", duration: "30 sec / side", note: "Reach overhead, lean away." },
          { name: "Biceps Wall Stretch", duration: "30 sec / side", note: "Palm on wall, rotate away." },
        ],
      },
      {
        id: "day4", label: "Day 4", short: "Legs B", title: "Lower Body Conditioning",
        theme: THEME_PRESETS[3],
        warmUp: [
          { name: "Hip Circles", duration: "30 sec / side", note: "Loosen hip joint." },
          { name: "Glute Bridge", duration: "15 reps", note: "Activate glutes before loading." },
        ],
        exercises: [
          { id: "d4e1", name: "Leg Press", sets: 4, reps: "12-15", rest: 60, note: "Controlled tempo.", instructions: ["Sit in the leg press machine, feet shoulder-width on the platform.", "Release the safety handles and lower the platform until knees reach 90°.", "Press through your heels to extend legs (don't lock out knees).", "Lower back down with control."], formTips: ["Don't let your lower back peel off the seat.", "Keep feet flat — don't let heels rise."], media: { type: "youtube", url: ytSearch("Leg Press machine form"), label: "Search on YouTube" }, alternates: [{ name: "Goblet Squat", note: "DB or KB, same quad and glute pattern." }, { name: "Hack Squat Machine", note: "Similar movement arc." }] },
          { id: "d4e2", name: "Step-Ups", sets: 3, reps: "10 / leg", rest: 45, note: "Use bench or box.", instructions: ["Stand in front of a bench or box.", "Step up with one foot, driving through that heel to stand on top.", "Bring the other foot up, then step back down.", "Complete all reps on one side before switching."], formTips: ["Don't push off the back foot — make the working leg do the work.", "Keep your torso upright."], media: { type: "youtube", url: ytSearch("Step-Ups exercise"), label: "Search on YouTube" }, alternates: [{ name: "Reverse Lunge", note: "No equipment needed." }, { name: "Bulgarian Split Squat", note: "Rear foot elevated, more glute stretch." }] },
          { id: "d4e3", name: "DB Romanian Deadlift", sets: 3, reps: "12", rest: 45, note: "Stretch hamstrings, neutral spine.", instructions: ["Hold dumbbells in front of thighs, stand hip-width apart.", "Hinge at the hips, pushing them back as you lower the weights.", "Feel a stretch in your hamstrings, then drive hips forward to stand."], formTips: ["Keep the dumbbells close to your legs throughout.", "Neutral spine — no rounding."], media: { type: "youtube", url: ytSearch("Dumbbell Romanian Deadlift"), label: "Search on YouTube" }, alternates: [{ name: "Seated Leg Curl", note: "Machine isolation for hamstrings." }, { name: "Nordic Curl (Assisted)", note: "Eccentric hamstring strength." }] },
          { id: "d4e4", name: "Calf Raises", sets: 4, reps: "15-20", rest: 30, note: "Slow down, full range.", instructions: ["Stand on the edge of a step or flat ground.", "Rise up onto your toes as high as possible.", "Hold 1 second at the top.", "Lower heels slowly below the step level for a full stretch."], formTips: ["Go through the full range — don't bounce.", "3 seconds down for maximum benefit."], media: { type: "youtube", url: ytSearch("Standing Calf Raises"), label: "Search on YouTube" }, alternates: [{ name: "Seated Calf Raise Machine", note: "Targets soleus more." }, { name: "Leg Press Calf Press", note: "Toes at edge of platform." }] },
          { id: "d4e5", name: "Farmer Carry", sets: 3, reps: "30-45 sec", rest: 45, note: "Excellent for core.", instructions: ["Pick up a heavy dumbbell or kettlebell in each hand.", "Stand tall — shoulders back, core braced.", "Walk forward at a steady pace for the prescribed time.", "Set weights down with control."], formTips: ["Don't let the weight pull your shoulders down.", "Take short, controlled steps."], media: { type: "youtube", url: ytSearch("Farmer Carry exercise"), label: "Search on YouTube" }, alternates: [{ name: "Suitcase Carry (Single Side)", note: "One DB, anti-lateral flexion." }, { name: "Plank Hold", note: "Static core if space is limited." }] },
        ],
        coolDown: [
          { name: "Quad Stretch (Standing)", duration: "30 sec / side", note: "Hold ankle, stand tall." },
          { name: "Calf Stretch (Wall)", duration: "30 sec / side", note: "Straight leg, heel on floor." },
        ],
      },
      {
        id: "day5", label: "Day 5", short: "Pump", title: "Upper Body Pump + Cardio",
        theme: THEME_PRESETS[4],
        warmUp: [
          { name: "Shoulder Rolls", duration: "30 sec", note: "Forward and backward." },
          { name: "Resistance Band Row", duration: "15 reps", note: "Light activation." },
        ],
        exercises: [
          { id: "d5e1", name: "Incline Machine Press", sets: 3, reps: "10-12", rest: 45, note: "Shoulder-friendly pressing angle.", instructions: ["Adjust the seat so handles are at upper-chest height.", "Grip handles and press forward and slightly upward.", "Extend arms without locking elbows.", "Return slowly to start."], formTips: ["Keep your back flat against the pad.", "Don't shrug your shoulders as you press."], media: { type: "youtube", url: ytSearch("Incline Machine Chest Press"), label: "Search on YouTube" }, alternates: [{ name: "Incline DB Press", note: "30° bench, free range." }, { name: "Low-to-Mid Cable Fly", note: "Chest isolation." }] },
          { id: "d5e2", name: "Cable Row", sets: 3, reps: "10-12", rest: 45, note: "Smooth and controlled.", instructions: ["Sit at the cable row station, feet on the platform.", "Pull the handle to your lower chest, squeezing shoulder blades.", "Pause 1 second at the end, then slowly extend arms back."], formTips: ["Sit tall — don't lean back excessively.", "Lead with your elbows."], media: { type: "youtube", url: ytSearch("Seated Cable Row"), label: "Search on YouTube" }, alternates: [{ name: "Resistance Band Row", note: "Anchor band at waist height." }, { name: "DB Bent-Over Row", note: "Hinge at hips, neutral spine." }] },
          { id: "d5e3", name: "Lateral Raise", sets: 3, reps: "12-15", rest: 30, note: "Stop below painful range.", instructions: ["Stand holding light dumbbells at your sides.", "With a slight elbow bend, raise arms out to the sides to shoulder height.", "Pause briefly at the top.", "Lower slowly — 3 seconds down."], formTips: ["Lead with your elbows, not your wrists.", "Don't shrug — keep shoulders down."], media: { type: "youtube", url: ytSearch("Dumbbell Lateral Raise"), label: "Search on YouTube" }, alternates: [{ name: "Cable Lateral Raise", note: "Constant tension." }, { name: "Machine Lateral Raise", note: "Guided path." }] },
          { id: "d5e4", name: "Rope Curl + Rope Pushdown", sets: 3, reps: "12 each", rest: 45, note: "Arm superset, moderate pace.", instructions: ["Perform 12 rope curls: grip rope at low pulley, curl up keeping elbows pinned.", "Without rest, switch to high pulley and perform 12 rope pushdowns.", "That's one superset."], formTips: ["Keep upper arms still on both movements.", "Control the weight — don't let it snap back."], media: { type: "youtube", url: ytSearch("Rope Bicep Curl Cable"), label: "Search on YouTube" }, alternates: [{ name: "DB Curl + Overhead Extension", note: "Dumbbell superset." }, { name: "EZ Bar Curl + Bench Dips", note: "Bar curl paired with bench dips." }] },
          { id: "d5e5", name: "Treadmill Incline Walk", sets: 1, reps: "12-15 min", rest: 0, note: "Steady-state cardio finisher.", instructions: ["Set treadmill to 10-12% incline and 3-4 mph.", "Walk at a steady pace for 12-15 minutes.", "Hold the rails only if needed for balance — not for support."], formTips: ["Stand tall — don't lean on the handrails.", "Engage your core and glutes as you walk."], media: { type: "youtube", url: ytSearch("Treadmill Incline Walk workout"), label: "Search on YouTube" }, alternates: [{ name: "Stationary Bike", note: "Low-impact, same duration." }, { name: "Stair Climber", note: "Higher glute activation, 10-12 min." }] },
        ],
        coolDown: [
          { name: "Chest Stretch (Doorway)", duration: "45 sec", note: "Arms at 90°, lean forward gently." },
          { name: "Child's Pose", duration: "60 sec", note: "Full back and shoulder release." },
        ],
      },
    ],
  };
