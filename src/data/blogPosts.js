/**
 * Blog post data for WorkoutPlanStudio.
 * Each post uses a `sections` array so BlogPostPage can render structured content
 * without embedding JSX directly in this data file.
 *
 * Section types: 'p' | 'h2' | 'h3' | 'ul' | 'ol' | 'tip' | 'table'
 * - 'ul' / 'ol': content is an array of strings
 * - 'table': content is { headers: string[], rows: string[][] }
 * - 'tip': renders a highlighted callout box
 */

export const blogPosts = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. How to Create a Workout Plan
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "how-to-create-a-workout-plan",
    title: "How to Create a Workout Plan That Actually Works",
    description:
      "A step-by-step guide to building a personalised workout plan — covering goals, frequency, exercise selection, progressive overload, and recovery.",
    datePublished: "2025-01-10",
    readTime: "10 min read",
    category: "Workout Planning",
    tags: ["workout plan", "how to plan workouts", "training program"],
    sections: [
      {
        type: "p",
        content:
          "Most people who start going to the gym don't have a plan — they wander from machine to machine, copy whatever looks good on their phone, and wonder why they're not making progress six months later. A well-designed workout plan removes the guesswork and turns every session into a purposeful step toward a specific goal.",
      },
      {
        type: "p",
        content:
          "This guide walks you through every decision you need to make when building a workout plan from scratch, whether you're a complete beginner or an intermediate lifter who's ready for something more structured.",
      },
      {
        type: "h2",
        content: "Step 1: Define Your Goal",
      },
      {
        type: "p",
        content:
          "Your goal shapes every other decision in your program. The three most common training goals are muscle building (hypertrophy), fat loss, and strength. While there's overlap between all three, your primary goal should drive your programming choices.",
      },
      {
        type: "ul",
        content: [
          "Muscle building: Focus on moderate weights (65–85% of 1RM), 8–15 reps per set, high training volume, and progressive overload.",
          "Fat loss: Caloric deficit is the driver — your training plan should preserve muscle while burning calories. Resistance training is still the best tool here.",
          "Strength: Focus on lower reps (1–6), heavier weights (80–95% of 1RM), longer rest periods, and compound movements.",
          "General fitness: A balanced approach combining cardio, resistance training, and mobility work.",
        ],
      },
      {
        type: "tip",
        content:
          "Beginners can gain muscle and lose fat simultaneously — this is called body recomposition. You don't need to choose just one goal right away. A solid resistance training program with good nutrition handles both.",
      },
      {
        type: "h2",
        content: "Step 2: Choose Your Training Frequency",
      },
      {
        type: "p",
        content:
          "How many days per week you train is the biggest structural decision in your plan. The right answer depends on your schedule, recovery capacity, and experience level — not on what elite athletes do.",
      },
      {
        type: "table",
        content: {
          headers: ["Days/Week", "Best For", "Example Split"],
          rows: [
            ["2 days", "Complete beginners, very busy schedules", "Full body x2"],
            ["3 days", "Beginners to intermediates", "Full body x3 or Push/Pull/Legs"],
            ["4 days", "Intermediates", "Upper/Lower split"],
            ["5–6 days", "Intermediate to advanced", "PPL x2, Bro split, etc."],
          ],
        },
      },
      {
        type: "p",
        content:
          "Research consistently shows that training each muscle group twice per week produces better hypertrophy results than once per week at the same total volume. This doesn't mean you need to train 6 days — it means your split should be designed so each muscle gets worked more than once.",
      },
      {
        type: "h2",
        content: "Step 3: Select the Right Split",
      },
      {
        type: "p",
        content:
          "A training split is how you divide your workouts across the week. The most common and effective options are:",
      },
      {
        type: "ul",
        content: [
          "Full Body: Every session trains all major muscle groups. Best for 2–3 days per week. High frequency per muscle group.",
          "Upper / Lower: Upper body and lower body alternate. Great for 4 days per week. Good balance of frequency and volume.",
          "Push / Pull / Legs (PPL): Push day (chest, shoulders, triceps), pull day (back, biceps), leg day. Works well for 3 or 6 days.",
          "Bro Split: One muscle group per day (chest day, back day, etc.). Low frequency but high weekly volume per muscle. Best for advanced lifters.",
        ],
      },
      {
        type: "h2",
        content: "Step 4: Choose Your Exercises",
      },
      {
        type: "p",
        content:
          "Build your plan around compound movements first, then add isolation work. Compound exercises (bench press, squat, deadlift, row, overhead press, pull-up) train multiple muscle groups at once and produce the most stimulus per unit of time.",
      },
      {
        type: "p",
        content:
          "A simple rule: start each workout with 1–3 compound lifts, then add 2–4 isolation exercises targeting the muscles you want to develop. For example, a push day might look like: Bench Press → Overhead Press → Cable Fly → Tricep Pushdown → Lateral Raise.",
      },
      {
        type: "h2",
        content: "Step 5: Decide Sets, Reps, and Rest",
      },
      {
        type: "p",
        content:
          "For muscle building, the most effective range is 10–20 sets per muscle group per week, with 6–20 reps per set. Most working sets should end within 1–3 reps of failure. Rest 90–180 seconds between sets for compound lifts, and 60–90 seconds for isolation work.",
      },
      {
        type: "table",
        content: {
          headers: ["Goal", "Sets/Muscle/Week", "Rep Range", "Load (% 1RM)"],
          rows: [
            ["Strength", "3–8", "1–5", "80–95%"],
            ["Hypertrophy", "10–20", "6–20", "60–80%"],
            ["Muscular endurance", "15–25", "15–30", "40–60%"],
          ],
        },
      },
      {
        type: "h2",
        content: "Step 6: Plan Your Progressive Overload",
      },
      {
        type: "p",
        content:
          "Progressive overload is the single most important principle in strength training. It means consistently increasing the demand on your muscles over time. Without it, your body adapts and stops changing.",
      },
      {
        type: "p",
        content:
          "The simplest form: add weight when you can complete all sets with good form. If you're doing 3×10 bench press at 60 kg and it feels manageable, add 2.5 kg next session. Track your lifts every session so you can see this progression clearly.",
      },
      {
        type: "h2",
        content: "Step 7: Build in Recovery",
      },
      {
        type: "p",
        content:
          "Muscle grows during rest, not during training. Your plan should include at least 1–2 full rest days per week, and you should avoid training the same muscle group on consecutive days when possible. Sleep (7–9 hours) and adequate protein intake (1.6–2.2 g per kg of bodyweight) are non-negotiable for results.",
      },
      {
        type: "tip",
        content:
          "Every 8–12 weeks, take a deload week where you reduce volume and intensity by about 40–50%. This allows accumulated fatigue to dissipate and often leads to a strength PR the following week.",
      },
      {
        type: "h2",
        content: "Putting It Together: A Simple Template",
      },
      {
        type: "p",
        content:
          "If you're not sure where to start, a 3-day full body program is the most effective starting point for beginners and returning lifters. Train Monday, Wednesday, Friday. Each session: squat or deadlift pattern, horizontal push, horizontal pull, vertical push or pull, and 1–2 isolation exercises. Start with weights you can handle for 3×10, add weight every session, and run the program for at least 12 weeks before changing it.",
      },
      {
        type: "p",
        content:
          "WorkoutPlanStudio can help you generate a structured JSON workout plan using AI and then track your sets, reps, weights, and rest timers session by session. The goal is to make following your plan as frictionless as possible.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Push Pull Legs
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "push-pull-legs-split",
    title: "Push Pull Legs (PPL): The Complete Workout Split Guide",
    description:
      "Everything you need to know about the Push Pull Legs split — how it works, sample 3-day and 6-day PPL programs, exercise selection, and who it suits best.",
    datePublished: "2025-01-18",
    readTime: "9 min read",
    category: "Workout Splits",
    tags: ["PPL", "push pull legs", "workout split", "muscle building"],
    sections: [
      {
        type: "p",
        content:
          "Push Pull Legs — almost universally known as PPL — is one of the most popular and enduring training splits in strength and bodybuilding communities. It's been the backbone of programs used by amateur lifters and professional bodybuilders alike, and for good reason: it's logical, efficient, and works across a wide range of experience levels.",
      },
      {
        type: "h2",
        content: "What is the Push Pull Legs Split?",
      },
      {
        type: "p",
        content:
          "PPL divides your weekly training into three distinct workout types based on the movement pattern and the muscles being used:",
      },
      {
        type: "ul",
        content: [
          "Push: Exercises where you push a weight away from your body — chest, shoulders, and triceps.",
          "Pull: Exercises where you pull a weight toward your body — back, rear delts, and biceps.",
          "Legs: All lower-body work — quads, hamstrings, glutes, and calves.",
        ],
      },
      {
        type: "p",
        content:
          "This grouping works because muscles in each category tend to assist each other. On a push day, your triceps are involved in every chest and shoulder press — so it makes sense to train them together and let the others recover. The same logic applies to pull and leg days.",
      },
      {
        type: "h2",
        content: "3-Day PPL vs. 6-Day PPL",
      },
      {
        type: "p",
        content:
          "PPL can be run as a 3-day or 6-day program. The 3-day version runs Push / Pull / Legs once per week, which means each muscle group gets trained once. The 6-day version runs the sequence twice (PPL / PPL), giving each muscle group two training sessions per week.",
      },
      {
        type: "p",
        content:
          "Research on training frequency strongly favours hitting each muscle group at least twice per week for hypertrophy. This means the 6-day PPL is generally superior for muscle building if you can recover from the volume. The 3-day version is better suited to beginners or anyone who can only commit to three sessions.",
      },
      {
        type: "tip",
        content:
          "If you can only train 3 days but want higher frequency, consider a Full Body or Upper/Lower split instead. PPL shines most as a 6-day program.",
      },
      {
        type: "h2",
        content: "Sample 6-Day PPL Program",
      },
      {
        type: "p",
        content: "Here is a solid intermediate 6-day PPL structure:",
      },
      {
        type: "h3",
        content: "Push A (Monday)",
      },
      {
        type: "ul",
        content: [
          "Barbell Bench Press — 4×6–8",
          "Incline Dumbbell Press — 3×10–12",
          "Cable Lateral Raise — 4×12–15",
          "Overhead Press (machine or dumbbell) — 3×10–12",
          "Tricep Pushdown — 3×12–15",
          "Overhead Tricep Extension — 3×12–15",
        ],
      },
      {
        type: "h3",
        content: "Pull A (Tuesday)",
      },
      {
        type: "ul",
        content: [
          "Barbell Row — 4×6–8",
          "Lat Pulldown — 3×10–12",
          "Seated Cable Row — 3×10–12",
          "Face Pulls — 4×15–20",
          "Barbell or Dumbbell Curl — 3×10–12",
          "Hammer Curl — 3×12–15",
        ],
      },
      {
        type: "h3",
        content: "Legs A (Wednesday)",
      },
      {
        type: "ul",
        content: [
          "Barbell Back Squat — 4×6–8",
          "Romanian Deadlift — 3×10–12",
          "Leg Press — 3×10–15",
          "Leg Curl — 3×12–15",
          "Walking Lunges — 3×10/side",
          "Standing Calf Raise — 4×12–15",
        ],
      },
      {
        type: "p",
        content:
          "Push B, Pull B, and Legs B (Thursday–Saturday) follow the same structure but can swap in slightly different exercises — incline bench instead of flat bench, pull-ups instead of lat pulldown, hack squats instead of barbell squats — to provide variety and hit muscles from different angles. Sunday is a rest day.",
      },
      {
        type: "h2",
        content: "Who is PPL Best For?",
      },
      {
        type: "p",
        content:
          "PPL is best suited to intermediate lifters who have at least 6–12 months of consistent training under their belt and want to increase their weekly training volume. Beginners generally respond better to full body programs because the higher frequency teaches movement patterns more quickly and delivers faster early progress.",
      },
      {
        type: "p",
        content:
          "Advanced lifters can also use PPL effectively, though they may need to add more volume or use more complex periodization strategies like daily undulating periodization (DUP) to continue progressing.",
      },
      {
        type: "h2",
        content: "Common PPL Mistakes to Avoid",
      },
      {
        type: "ul",
        content: [
          "Overloading push days and neglecting pull volume — this creates imbalances and shoulder problems. Your pull volume should match or exceed your push volume.",
          "Skipping or shortening leg day. Leg training is metabolically demanding and easy to avoid. Don't.",
          "Adding too many exercises and inflating session length beyond 75–90 minutes. Quality sets matter more than session length.",
          "Not progressing. PPL programs should have a clear progression model — add weight, add reps, or add sets each week.",
        ],
      },
      {
        type: "h2",
        content: "PPL and Workout Tracking",
      },
      {
        type: "p",
        content:
          "The structured, repeating nature of PPL makes it particularly easy to track in an app. Because you're doing the same movement patterns each week (with slight variation between A and B sessions), you can clearly see whether you lifted more weight this Push Monday than you did last Push Monday. That visibility is what makes progressive overload actionable rather than just a concept.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. 5/3/1 Program
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "531-workout-program",
    title: "5/3/1 Program: Jim Wendler's Complete Strength Training Method",
    description:
      "The definitive guide to Jim Wendler's 5/3/1 program — how the percentages work, the main lifts, assistance work templates, and how to run it for long-term strength gains.",
    datePublished: "2025-01-25",
    readTime: "10 min read",
    category: "Strength Programs",
    tags: ["5/3/1", "Jim Wendler", "strength training", "powerlifting"],
    sections: [
      {
        type: "p",
        content:
          "Jim Wendler's 5/3/1 is one of the most respected strength training programs ever written. Originally published in 2009, it has helped hundreds of thousands of lifters build real, long-lasting strength by focusing on a deceptively simple concept: consistent, sustainable progression over time.",
      },
      {
        type: "p",
        content:
          "Unlike programs that promise fast results through complex loading schemes, 5/3/1 is deliberately slow and methodical. The goal isn't to hit a PR every session — it's to build for months and years.",
      },
      {
        type: "h2",
        content: "The Four Main Lifts",
      },
      {
        type: "p",
        content:
          "The program is built around four barbell lifts, one per training day:",
      },
      {
        type: "ul",
        content: [
          "Squat",
          "Bench Press",
          "Deadlift",
          "Overhead Press (Standing)",
        ],
      },
      {
        type: "p",
        content:
          "Each lift gets one dedicated session per week. Everything else (assistance work) supports these four movements.",
      },
      {
        type: "h2",
        content: "How the Percentages Work",
      },
      {
        type: "p",
        content:
          "Before you start, you need your Training Max (TM) for each lift. This is 90% of your actual 1-rep max (1RM). You always calculate percentages from the Training Max, not your true max. This built-in buffer is intentional — it keeps the early weeks feeling easy so you can maintain consistent technique and build momentum.",
      },
      {
        type: "p",
        content:
          "Each 4-week cycle follows this wave:",
      },
      {
        type: "table",
        content: {
          headers: ["Week", "Set 1", "Set 2", "Set 3"],
          rows: [
            ["Week 1", "65% × 5", "75% × 5", "85% × 5+"],
            ["Week 2", "70% × 3", "80% × 3", "90% × 3+"],
            ["Week 3", "75% × 5", "85% × 3", "95% × 1+"],
            ["Week 4 (Deload)", "40% × 5", "50% × 5", "60% × 5"],
          ],
        },
      },
      {
        type: "p",
        content:
          "The '+' on the final set means you do as many reps as possible (AMRAP) with good form. This is where the magic happens — that last set often turns into 10, 12, or even 15+ reps, accumulating far more volume than the numbers suggest.",
      },
      {
        type: "tip",
        content:
          "Don't sandbag your AMRAP sets. Going all-out on that last set is what drives long-term adaptation. Leave your ego at the door on week 1 — the program is designed so the weights feel light early in each cycle.",
      },
      {
        type: "h2",
        content: "Progression: How You Get Stronger",
      },
      {
        type: "p",
        content:
          "After completing each 4-week cycle, you add weight to your Training Max:",
      },
      {
        type: "ul",
        content: [
          "Upper body lifts (bench press, overhead press): Add 2.5 kg (5 lb)",
          "Lower body lifts (squat, deadlift): Add 5 kg (10 lb)",
        ],
      },
      {
        type: "p",
        content:
          "This might seem incredibly slow — and it is. Over one year, your squat Training Max increases by 130 kg if you were to progress uninterrupted. In practice you'll reset occasionally, but the compounding effect of small, consistent gains is enormous over 2–3 years.",
      },
      {
        type: "h2",
        content: "Assistance Work: The Templates",
      },
      {
        type: "p",
        content:
          "After the main lift, you add assistance exercises. Wendler provides several templates — the most popular is Boring But Big (BBB):",
      },
      {
        type: "ul",
        content: [
          "Boring But Big (BBB): After the main lift, do 5×10 of the same or a complementary lift at 50–60% of TM. This builds size and volume.",
          "First Set Last (FSL): Repeat the first working set (65% in week 1) for additional sets or an AMRAP after completing all three main sets.",
          "Building the Monolith: High volume assistance work (pull-ups, dips, rows) performed with the main lift each day.",
          "Triumvirate: Only three exercises per session — main lift plus two assistance movements.",
        ],
      },
      {
        type: "h2",
        content: "The 7th Week Protocol",
      },
      {
        type: "p",
        content:
          "In the updated 5/3/1 Forever edition, Wendler recommends a '7th Week Protocol' every few cycles — a testing/deload week where you either push for true maxes to recalibrate your TM, or take a pure deload. This prevents TM drift (where your percentages get too heavy relative to your real strength).",
      },
      {
        type: "h2",
        content: "Who Should Run 5/3/1?",
      },
      {
        type: "p",
        content:
          "5/3/1 is ideal for intermediate and advanced lifters who have established technique on the big four lifts and want a long-term framework for building strength. It's not the fastest program for beginners — novices typically respond better to linear progression programs (Starting Strength, GZCLP) where they can add weight every session.",
      },
      {
        type: "p",
        content:
          "That said, 5/3/1 is so flexible that many lifters run it for years. Wendler himself has trained on it continuously since 2006.",
      },
      {
        type: "h2",
        content: "Tracking 5/3/1",
      },
      {
        type: "p",
        content:
          "Because 5/3/1 uses calculated percentages, tracking is essential. You need to know your current TM for each lift, what week of the cycle you're in, and how many reps you hit on your AMRAP sets. Good tracking also tells you when a reset is needed — if your AMRAP sets are dropping below 5 reps on the 85% set in week 1, your TM has gotten too heavy.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Bro Split
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "bro-split-workout",
    title: "Bro Split: Is Training Each Muscle Once a Week Effective?",
    description:
      "An honest look at the Bro Split — chest day, back day, arm day — what the science says, when it works, and how to build an effective one.",
    datePublished: "2025-02-02",
    readTime: "8 min read",
    category: "Workout Splits",
    tags: ["bro split", "bodybuilding split", "chest day", "workout split"],
    sections: [
      {
        type: "p",
        content:
          "The Bro Split has been mocked and defended in equal measure for decades. The premise is simple: dedicate each training day to a single muscle group, train it with high volume, then rest it for the rest of the week while other muscles take their turn. Chest Monday, Back Tuesday, Shoulders Wednesday, Arms Thursday, Legs Friday.",
      },
      {
        type: "p",
        content:
          "Critics call it outdated. Fans point to the physiques built on it. The truth, as usual, is somewhere in between.",
      },
      {
        type: "h2",
        content: "The Standard Bro Split Structure",
      },
      {
        type: "table",
        content: {
          headers: ["Day", "Muscle Group", "Example Exercises"],
          rows: [
            ["Monday", "Chest", "Bench Press, Incline DB Press, Cable Fly, Dips"],
            ["Tuesday", "Back", "Deadlift, Barbell Row, Pull-ups, Lat Pulldown"],
            ["Wednesday", "Shoulders", "OHP, Lateral Raise, Face Pulls, Rear Delt Fly"],
            ["Thursday", "Arms", "Barbell Curl, Hammer Curl, Skullcrusher, Pushdown"],
            ["Friday", "Legs", "Squat, RDL, Leg Press, Leg Curl, Calf Raise"],
            ["Sat/Sun", "Rest", "—"],
          ],
        },
      },
      {
        type: "h2",
        content: "What the Research Says About Frequency",
      },
      {
        type: "p",
        content:
          "Multiple meta-analyses have compared once-per-week (bro split) training frequency to twice-per-week and found that higher frequency produces more muscle growth when total weekly volume is equated. In plain terms: if you do 16 sets for chest on Monday, spreading those 16 sets across two sessions (e.g., 8 on Monday and 8 on Thursday) tends to produce better results.",
      },
      {
        type: "p",
        content:
          "Why? Protein synthesis — the cellular process that builds muscle — spikes after a training session and returns to baseline after roughly 48–72 hours. Training a muscle once a week means you only stimulate protein synthesis once every 7 days. Training it twice doubles that stimulus.",
      },
      {
        type: "tip",
        content:
          "Despite lower frequency, the Bro Split isn't ineffective — it's just not optimal. Advanced bodybuilders with high training volumes often find that once-per-week frequency is all they can recover from given the sheer number of sets per session.",
      },
      {
        type: "h2",
        content: "When the Bro Split Actually Works",
      },
      {
        type: "p",
        content:
          "The Bro Split works better than the research criticism suggests in a few specific situations:",
      },
      {
        type: "ul",
        content: [
          "Advanced lifters with high absolute volume: If you genuinely need 20–25 sets to properly stimulate a muscle group, fitting that into two sessions might exceed your recovery capacity per session. Concentrating it in one day can work.",
          "Fixed 5-day schedules: Some people can only train Monday through Friday on a fixed schedule. A Bro Split maps cleanly onto this.",
          "Psychological engagement: Some lifters train harder and more consistently when they have a dedicated \"chest day\" to attack. Adherence matters as much as programming.",
          "Recovery from injury: Concentrating training on a specific muscle allows others to fully rest, which is sometimes useful when managing minor injuries.",
        ],
      },
      {
        type: "h2",
        content: "The Arms Day Problem",
      },
      {
        type: "p",
        content:
          "One structural issue with the classic Bro Split: biceps and triceps are already being trained heavily on back day and chest/shoulder day respectively. By the time Arms Thursday arrives, these muscles have already had two heavy sessions without appearing on any day labelled for them. This double-counts the fatigue and means a dedicated arms day is often redundant for intermediate lifters.",
      },
      {
        type: "p",
        content:
          "A practical fix: replace the standalone arms day with a second leg day, or with a weak-point focus day (e.g., extra shoulder work, lagging hamstrings).",
      },
      {
        type: "h2",
        content: "How to Build an Effective Bro Split",
      },
      {
        type: "ul",
        content: [
          "Keep total sets per session reasonable: 15–20 working sets per muscle group is plenty. More than that tends to produce junk volume.",
          "Use a mix of compound and isolation: Start with the big compound lift (bench, row, squat, OHP), then add isolation work. Don't open a chest day with cable flyes.",
          "Progress systematically: Add weight or reps each week. Without progressive overload, the Bro Split becomes a maintenance program.",
          "Don't skip legs: Leg day on a Bro Split is the session most commonly shortened or skipped. Don't — lower body training drives systemic hormonal responses that benefit your entire physique.",
          "Consider a modified structure: Push/Pull/Legs is a superior version of the Bro Split concept for most lifters.",
        ],
      },
      {
        type: "h2",
        content: "Verdict: Should You Run a Bro Split?",
      },
      {
        type: "p",
        content:
          "If you're a beginner or intermediate lifter who has only 3–4 days available, a Bro Split is not the best use of your training time. A Full Body or Upper/Lower split will produce better results. If you're an advanced lifter with 5 days to train, the Bro Split becomes more viable — especially if you've found that the high-volume single-day approach works well for your recovery profile.",
      },
      {
        type: "p",
        content:
          "For most people though, a 6-day PPL or a 4-day Upper/Lower split is the smarter choice. The Bro Split is better than no plan, but it's not the ceiling of what's available.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Progressive Overload
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "progressive-overload",
    title: "Progressive Overload: The Key Principle Behind Every Good Program",
    description:
      "What progressive overload is, why it's the foundation of all strength and muscle gains, and 6 practical ways to implement it in your training.",
    datePublished: "2025-02-10",
    readTime: "8 min read",
    category: "Training Principles",
    tags: [
      "progressive overload",
      "muscle growth",
      "strength training",
      "training principles",
    ],
    sections: [
      {
        type: "p",
        content:
          "You can follow the most perfectly designed workout split in the world, eat an optimal diet, and sleep eight hours a night — and still make zero progress if you ignore progressive overload. It is the single most important training principle, and it's non-negotiable for any meaningful long-term improvement.",
      },
      {
        type: "h2",
        content: "What is Progressive Overload?",
      },
      {
        type: "p",
        content:
          "Progressive overload means systematically increasing the demands placed on your body during training over time. Your body adapts to stress — when you lift a weight that challenges you, your muscles, bones, tendons, and nervous system all adapt to handle that stress better. Next time, the same weight is easier. Progressive overload is the practice of continuously giving your body a new, slightly harder challenge to adapt to.",
      },
      {
        type: "p",
        content:
          "Without it, you reach a plateau. Your body is efficient — it only maintains adaptations that are currently needed. If you do the same 3×10 bench press with 60 kg every week for a year, your body adapts once and then stays there.",
      },
      {
        type: "h2",
        content: "6 Ways to Apply Progressive Overload",
      },
      {
        type: "h3",
        content: "1. Add Weight (Load Progression)",
      },
      {
        type: "p",
        content:
          "The most straightforward method. When you can complete all your prescribed sets and reps with good form, add a small amount of weight next session. For compound lifts: 2.5–5 kg. For isolation exercises: 1–2.5 kg. Microplates (fractional plates) are invaluable for this on smaller exercises.",
      },
      {
        type: "h3",
        content: "2. Add Reps (Rep Progression)",
      },
      {
        type: "p",
        content:
          "If you can't add weight yet, add reps. If you're doing 3×8 at 80 kg, aim for 3×9 next week. Once you hit 3×12, add weight and drop back to 3×8. This is called a double progression model and is one of the most practical for intermediate lifters.",
      },
      {
        type: "h3",
        content: "3. Add Sets (Volume Progression)",
      },
      {
        type: "p",
        content:
          "Adding sets increases total weekly volume. If you're doing 3 sets of bench press and plateau, adding a fourth set increases the stimulus. This is useful but has limits — you can't keep adding sets indefinitely without running into recovery issues.",
      },
      {
        type: "h3",
        content: "4. Reduce Rest Periods",
      },
      {
        type: "p",
        content:
          "Performing the same work in less time is a form of progression. If you're resting 3 minutes between sets and reduce to 2 minutes while maintaining performance, you've increased training density.",
      },
      {
        type: "h3",
        content: "5. Improve Range of Motion",
      },
      {
        type: "p",
        content:
          "Going deeper on a squat, stretching further at the bottom of a fly, or achieving a fuller range on a pull-up increases the mechanical work done and the stretch stimulus on the muscle. Improving technique often counts as genuine progression.",
      },
      {
        type: "h3",
        content: "6. Increase Training Frequency",
      },
      {
        type: "p",
        content:
          "Training a muscle group from once to twice per week is a form of progressive overload — more total stimulus per week. This is often the best tool when you've plateaued on load and volume at your current frequency.",
      },
      {
        type: "h2",
        content: "How to Track Progressive Overload",
      },
      {
        type: "p",
        content:
          "You cannot manage what you don't measure. Track every working set: the exercise, weight, reps, and ideally the RPE (rating of perceived exertion — how close to failure you were). This creates a log that tells you exactly what you did last session, which makes deciding what to aim for next session trivial.",
      },
      {
        type: "tip",
        content:
          "Even a simple notes app works for tracking. What matters is consistency — knowing what you lifted last time so you have a target to beat. Without this, progressive overload is guesswork.",
      },
      {
        type: "h2",
        content: "Why Progress Feels Slow (And Why That's Normal)",
      },
      {
        type: "p",
        content:
          "Beginners can add weight to every session for months — this is called linear progression. Intermediates progress weekly. Advanced lifters may progress monthly. This slowing of progress is completely normal and doesn't indicate failure. A 1 kg per month improvement on your squat over two years is 24 kg of added strength — that's significant progress.",
      },
      {
        type: "p",
        content:
          "The challenge is staying patient through the slow periods. This is why having a long-term program matters — it commits you to a progression model so you don't switch programs every three weeks when progress feels slower than expected.",
      },
      {
        type: "h2",
        content: "Progressive Overload and Deloads",
      },
      {
        type: "p",
        content:
          "Accumulated fatigue eventually masks your progress. Deload weeks (reducing volume and intensity by 40–50% for one week every 4–8 weeks) allow fatigue to clear and often produce a strength PR the following week. Far from being a rest week, a deload is a strategic tool in a progressive overload model.",
      },
      {
        type: "h2",
        content: "Common Progressive Overload Mistakes",
      },
      {
        type: "ul",
        content: [
          "Ego loading: Adding too much weight too fast, sacrificing form, and getting injured. Small, consistent increases beat large jumps every time.",
          "No tracking: If you don't know what you lifted last week, you can't deliberately beat it.",
          "Chasing progress on every set: Focus on progressive overload on your primary working sets. Your warm-up sets don't need to set records.",
          "Switching programs constantly: Every new program resets your ability to measure progress against a baseline. Run programs for at least 8–12 weeks before evaluating.",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Sets and Reps for Muscle Growth
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "sets-and-reps-for-muscle-growth",
    title: "How Many Sets and Reps for Muscle Growth? (Science-Based Guide)",
    description:
      "A science-based breakdown of optimal sets, reps, and weekly volume for building muscle — with practical recommendations for beginners, intermediates, and advanced lifters.",
    datePublished: "2025-02-18",
    readTime: "9 min read",
    category: "Training Principles",
    tags: [
      "sets and reps",
      "muscle growth",
      "hypertrophy",
      "training volume",
    ],
    sections: [
      {
        type: "p",
        content:
          "\"How many sets should I do?\" is one of the most common questions in fitness — and one of the most contested. The good news is that exercise science has produced reasonably clear answers over the past decade. The bad news is that the answers come with caveats, individual variation, and context-dependence.",
      },
      {
        type: "p",
        content:
          "Here's what the research actually says, translated into practical recommendations.",
      },
      {
        type: "h2",
        content: "The Rep Range Myth",
      },
      {
        type: "p",
        content:
          "There used to be a widely accepted idea that you needed to train in the \"hypertrophy rep range\" of 8–12 reps to build muscle, while lower reps built strength and higher reps built endurance. Research in the last decade has significantly complicated this picture.",
      },
      {
        type: "p",
        content:
          "Studies comparing rep ranges from 6 to 30 have found similar hypertrophy results across a wide range of reps, provided sets are taken close to failure. In other words, 3×6 with heavy weight and 3×30 with lighter weight can produce similar muscle growth when both are performed with equivalent proximity to failure. What matters more than the rep number is effort — how close to your maximum you push each set.",
      },
      {
        type: "tip",
        content:
          "Practical sweet spot: 6–20 reps per set covers the most efficient range for most people. Higher reps (15–30) work well for isolation exercises and are easier on joints. Lower reps (4–6) are better for compound lifts where you want to handle heavier loads.",
      },
      {
        type: "h2",
        content: "How Many Sets Per Muscle Group Per Week?",
      },
      {
        type: "p",
        content:
          "Volume — measured in sets per muscle group per week — is the primary driver of hypertrophy. More volume produces more muscle growth up to a ceiling, beyond which additional sets produce diminishing returns or outright interfere with recovery.",
      },
      {
        type: "table",
        content: {
          headers: ["Experience Level", "Minimum Effective Volume", "Recommended Volume", "Maximum Recoverable Volume"],
          rows: [
            ["Beginner", "5 sets/week", "8–12 sets/week", "~15 sets/week"],
            ["Intermediate", "8 sets/week", "12–18 sets/week", "~20–22 sets/week"],
            ["Advanced", "10 sets/week", "16–22 sets/week", "25+ sets/week"],
          ],
        },
      },
      {
        type: "p",
        content:
          "These numbers are based on Dr. Mike Israetel's volume landmarks framework, which distils the research into practical thresholds. Note that these are per muscle group per week — a standard PPL program often hits 12–18 sets per muscle group per week naturally.",
      },
      {
        type: "h2",
        content: "Sets Per Session",
      },
      {
        type: "p",
        content:
          "You can't do unlimited sets in a single session and expect them all to be productive. Research suggests that beyond 8–10 hard sets per muscle group in a single session, the additional stimulus per set diminishes significantly. This is one argument for higher training frequency — spreading your 16 weekly sets for chest across two sessions (8 per session) rather than one is often more effective.",
      },
      {
        type: "h2",
        content: "How Close to Failure Should You Train?",
      },
      {
        type: "p",
        content:
          "Proximity to failure is a major variable that's often overlooked in discussions about sets and reps. Research suggests that leaving 0–4 reps in reserve (RIR) is the effective range for hypertrophy. Sets where you stop 5+ reps from failure produce significantly less stimulus.",
      },
      {
        type: "ul",
        content: [
          "RIR 0 (failure): Maximum stimulus, maximum fatigue. Use sparingly — mainly on final sets.",
          "RIR 1–2: High stimulus with moderate fatigue. The sweet spot for most working sets.",
          "RIR 3–4: Moderate stimulus. Acceptable for early sets in a session.",
          "RIR 5+: Low stimulus. Appropriate for warm-up sets only.",
        ],
      },
      {
        type: "h2",
        content: "Practical Set/Rep Recommendations",
      },
      {
        type: "h3",
        content: "For beginners (0–12 months training):",
      },
      {
        type: "ul",
        content: [
          "2–3 sets per exercise, 8–15 reps",
          "6–10 total working sets per session",
          "3 sessions per week (full body)",
          "Focus on learning technique, not maximising volume",
        ],
      },
      {
        type: "h3",
        content: "For intermediates (1–3 years training):",
      },
      {
        type: "ul",
        content: [
          "3–4 sets per exercise, 6–15 reps",
          "12–20 working sets per session",
          "4–5 sessions per week",
          "Track sets per muscle per week; aim for 15–20 across all sessions",
        ],
      },
      {
        type: "h3",
        content: "For advanced (3+ years training):",
      },
      {
        type: "ul",
        content: [
          "3–5 sets per exercise, variety of rep ranges",
          "Higher total weekly volumes (20+ sets per muscle)",
          "More sophisticated programming (periodisation, deloads)",
        ],
      },
      {
        type: "h2",
        content: "Rest Periods Matter Too",
      },
      {
        type: "p",
        content:
          "Longer rest periods (2–5 minutes for compound lifts) allow greater performance on subsequent sets, leading to more total volume. Research comparing 1-minute vs. 3-minute rest periods found significantly greater muscle growth in the longer-rest group. Don't rush your rest periods — they're part of the training stimulus.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. 3-Day Full Body Workout
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "3-day-full-body-workout",
    title: "The Best 3-Day Full Body Workout Plan for Beginners",
    description:
      "A complete 3-day full body workout plan for beginners — covering exercise selection, sets and reps, rest periods, and how to progress over 12 weeks.",
    datePublished: "2025-02-25",
    readTime: "9 min read",
    category: "Workout Plans",
    tags: [
      "full body workout",
      "3 day workout",
      "beginner workout plan",
      "beginner gym",
    ],
    sections: [
      {
        type: "p",
        content:
          "If you're new to the gym and want to build muscle, lose fat, and get stronger, a 3-day full body program is the best starting point available. It's not complicated, it doesn't require five different split days to manage, and it works remarkably well for beginners precisely because of its simplicity.",
      },
      {
        type: "p",
        content:
          "This plan covers everything you need: the workout structure, exercise choices, how many sets and reps, rest periods, and how to add weight week by week.",
      },
      {
        type: "h2",
        content: "Why Full Body Training is Best for Beginners",
      },
      {
        type: "p",
        content:
          "As a beginner, your gains come primarily from neurological adaptations — your nervous system learns to recruit more muscle fibres and coordinate movement patterns more efficiently. This process happens fastest when you practice movements frequently. Squatting three times per week teaches the squat pattern three times faster than squatting once per week.",
      },
      {
        type: "p",
        content:
          "Full body training also means that if you miss a session, you haven't missed your entire back session for the week — you've just done slightly less volume on everything, which is manageable.",
      },
      {
        type: "h2",
        content: "Training Schedule",
      },
      {
        type: "p",
        content:
          "Train three days per week with at least one rest day between sessions. The most common schedule is Monday, Wednesday, Friday — but Tuesday, Thursday, Saturday works equally well. What matters is the rest day between sessions.",
      },
      {
        type: "h2",
        content: "The Workout",
      },
      {
        type: "p",
        content:
          "Both Session A and Session B are performed each week, alternating. In week 1 you do A/B/A; in week 2 you do B/A/B; and so on.",
      },
      {
        type: "h3",
        content: "Session A",
      },
      {
        type: "ul",
        content: [
          "Barbell Back Squat — 3×5",
          "Barbell Bench Press — 3×5",
          "Barbell Row — 3×5",
          "Dumbbell Romanian Deadlift — 3×10",
          "Cable Lateral Raise — 3×15",
          "Plank — 3×30 seconds",
        ],
      },
      {
        type: "h3",
        content: "Session B",
      },
      {
        type: "ul",
        content: [
          "Barbell Deadlift — 1×5 (work up to one heavy set)",
          "Overhead Press — 3×5",
          "Pull-ups or Lat Pulldown — 3×5–8",
          "Goblet Squat or Leg Press — 3×10",
          "Dumbbell Curl — 3×12",
          "Tricep Pushdown — 3×12",
        ],
      },
      {
        type: "tip",
        content:
          "If you can't do pull-ups yet, use the lat pulldown machine instead. Aim to progress toward bodyweight pull-ups over 8–12 weeks as you build back strength.",
      },
      {
        type: "h2",
        content: "How to Progress",
      },
      {
        type: "p",
        content:
          "For every exercise, every session, add a small amount of weight if you completed all sets and reps with good form:",
      },
      {
        type: "ul",
        content: [
          "Squat, Deadlift: Add 5 kg each session",
          "Bench Press, Row, OHP: Add 2.5 kg each session",
          "Accessory exercises: Add weight every 1–2 weeks",
        ],
      },
      {
        type: "p",
        content:
          "This is called linear progression — adding weight every session. Beginners can sustain this for 2–4 months before needing to slow the progression. When you fail to complete your prescribed reps for three consecutive sessions at the same weight, reduce the weight by 10%, reset, and build back up.",
      },
      {
        type: "h2",
        content: "Rest Periods",
      },
      {
        type: "p",
        content:
          "For compound lifts (squat, deadlift, bench, row, OHP): Rest 3–5 minutes between sets. These are demanding movements and you need full recovery to maintain performance and technique. For accessory work: Rest 60–90 seconds.",
      },
      {
        type: "h2",
        content: "Session Duration",
      },
      {
        type: "p",
        content:
          "Expect each session to take 50–75 minutes including warm-up. Don't rush — take the rest you need. If sessions are running over 90 minutes, you're likely resting too long between accessory sets.",
      },
      {
        type: "h2",
        content: "12-Week Realistic Progress Expectations",
      },
      {
        type: "table",
        content: {
          headers: ["Lift", "Starting Weight", "After 12 Weeks"],
          rows: [
            ["Squat", "40–60 kg", "80–110 kg"],
            ["Deadlift", "50–70 kg", "100–130 kg"],
            ["Bench Press", "30–50 kg", "60–80 kg"],
            ["Overhead Press", "20–35 kg", "40–55 kg"],
          ],
        },
      },
      {
        type: "p",
        content:
          "These ranges assume consistent training and adequate nutrition. You won't see these numbers without eating enough protein (1.6–2.2 g/kg bodyweight) and sleeping 7–9 hours per night.",
      },
      {
        type: "h2",
        content: "What to Do After 12 Weeks",
      },
      {
        type: "p",
        content:
          "After 12 weeks of linear progression, you'll naturally start to stall on the compound lifts as a beginner program runs its course. At that point, transition to an intermediate program with weekly (rather than session-by-session) progression — a 4-day Upper/Lower split or PPL are natural next steps.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. Upper Lower Split
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "upper-lower-split",
    title: "Upper Lower Split: Build More Muscle with 4 Days a Week",
    description:
      "How to set up an Upper/Lower training split — the advantages over Bro Split, a complete 4-day sample program, exercise choices, and progression strategies.",
    datePublished: "2025-03-05",
    readTime: "9 min read",
    category: "Workout Splits",
    tags: [
      "upper lower split",
      "4 day workout",
      "workout split",
      "muscle building",
    ],
    sections: [
      {
        type: "p",
        content:
          "The Upper/Lower split is arguably the most efficient training structure for intermediate lifters. It trains each major muscle group twice per week, fits cleanly into a 4-day schedule, and provides enough volume to drive significant hypertrophy without the recovery demands of a 5 or 6-day program.",
      },
      {
        type: "p",
        content:
          "If you've graduated from a beginner full-body program and want more structure without going full 6-day PPL, Upper/Lower is likely your best next step.",
      },
      {
        type: "h2",
        content: "How the Upper/Lower Split Works",
      },
      {
        type: "p",
        content:
          "The split is exactly what it sounds like: two upper-body sessions and two lower-body sessions per week.",
      },
      {
        type: "table",
        content: {
          headers: ["Day", "Session"],
          rows: [
            ["Monday", "Upper A"],
            ["Tuesday", "Lower A"],
            ["Wednesday", "Rest"],
            ["Thursday", "Upper B"],
            ["Friday", "Lower B"],
            ["Saturday", "Rest"],
            ["Sunday", "Rest"],
          ],
        },
      },
      {
        type: "p",
        content:
          "Upper sessions train chest, back, shoulders, biceps, and triceps. Lower sessions train quads, hamstrings, glutes, and calves. Having an A and B variant for each allows you to use different exercises or rep ranges to hit muscles from different angles.",
      },
      {
        type: "h2",
        content: "Sample Upper Lower Program",
      },
      {
        type: "h3",
        content: "Upper A (Monday)",
      },
      {
        type: "ul",
        content: [
          "Barbell Bench Press — 4×4–6 (strength focus)",
          "Barbell Row — 4×4–6 (strength focus)",
          "Dumbbell Overhead Press — 3×8–12",
          "Cable Row — 3×10–12",
          "Cable Lateral Raise — 3×15–20",
          "EZ Bar Curl — 3×10–12",
          "Tricep Pushdown — 3×10–12",
        ],
      },
      {
        type: "h3",
        content: "Lower A (Tuesday)",
      },
      {
        type: "ul",
        content: [
          "Barbell Back Squat — 4×4–6 (strength focus)",
          "Romanian Deadlift — 3×10–12",
          "Leg Press — 3×10–15",
          "Leg Curl — 3×12–15",
          "Walking Lunges — 2×10/side",
          "Standing Calf Raise — 4×12–15",
        ],
      },
      {
        type: "h3",
        content: "Upper B (Thursday)",
      },
      {
        type: "ul",
        content: [
          "Incline Dumbbell Press — 4×8–12 (hypertrophy focus)",
          "Pull-ups or Lat Pulldown — 4×8–12",
          "Seated Cable Row — 3×10–12",
          "Dumbbell Lateral Raise — 4×12–15",
          "Face Pulls — 3×15–20",
          "Hammer Curl — 3×12–15",
          "Overhead Tricep Extension — 3×12–15",
        ],
      },
      {
        type: "h3",
        content: "Lower B (Friday)",
      },
      {
        type: "ul",
        content: [
          "Conventional Deadlift — 3×4–6 (strength focus)",
          "Hack Squat or Goblet Squat — 3×10–15",
          "Leg Extension — 3×12–15",
          "Nordic Hamstring Curl or Leg Curl — 3×10–12",
          "Hip Thrust or Glute Bridge — 3×12–15",
          "Seated Calf Raise — 4×12–15",
        ],
      },
      {
        type: "tip",
        content:
          "Notice Upper A uses lower reps (4–6) with heavier weight, while Upper B uses higher reps (8–12). This variation of rep ranges and load within the same muscle group over the week is called daily undulating periodisation (DUP) and is a reliable method for simultaneous strength and hypertrophy development.",
      },
      {
        type: "h2",
        content: "Advantages of Upper/Lower Over Other Splits",
      },
      {
        type: "ul",
        content: [
          "Each muscle is trained twice per week — optimal for hypertrophy based on research.",
          "Only 4 training days — more manageable than 5 or 6-day programs for most working adults.",
          "Clear structure with no ambiguity about which day trains what.",
          "Easy to modify — you can shift Upper to Monday/Wednesday and Lower to Tuesday/Thursday, or train Sat/Sun as makeup days.",
          "Progressive overload is easy to track — compare this Monday's Upper A to last Monday's Upper A.",
        ],
      },
      {
        type: "h2",
        content: "How to Progress on Upper/Lower",
      },
      {
        type: "p",
        content:
          "Use a double progression model: work within a rep range (e.g., 4–6 reps). When you hit the top of the range on all sets with good form, add 2.5–5 kg next week and drop back to the bottom of the range. For example:",
      },
      {
        type: "ul",
        content: [
          "Week 1: Bench Press 80 kg × 4, 4, 4",
          "Week 2: 80 kg × 5, 5, 4",
          "Week 3: 80 kg × 6, 6, 6 (hit top of range)",
          "Week 4: 82.5 kg × 4, 4, 3 (added weight, back to bottom range)",
        ],
      },
      {
        type: "h2",
        content: "Who Should Use Upper/Lower?",
      },
      {
        type: "p",
        content:
          "Upper/Lower is best suited to intermediate lifters with 6–18 months of consistent training who have solid technique on the main compound lifts. If you've completed a beginner linear progression program and want to keep making progress without jumping to a 5+ day split, Upper/Lower is the natural bridge.",
      },
      {
        type: "p",
        content:
          "It's also excellent for busy people — four focused sessions produce excellent results, and the 3-day weekend means you have plenty of time for recovery and life outside the gym.",
      },
    ],
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}
