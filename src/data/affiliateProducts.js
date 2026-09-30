/**
 * Affiliate product catalogue and slug→gear-set mappings.
 *
 * SETUP: Sign up for Amazon Associates Canada (affiliate-program.amazon.ca),
 * then replace each `url` with your personalised affiliate link.
 * Keep `rel="noopener noreferrer sponsored"` on every link.
 */

export const AFFILIATE_PRODUCTS = {
  "olympic-barbell": {
    id: "olympic-barbell",
    name: "Olympic Barbell (20 kg)",
    description: "The foundation of any strength programme — squat, bench, deadlift, and overhead press.",
    category: "Barbells & Plates",
    url: "https://www.amazon.ca/s?tag=workoutplanst-20&k=olympic+barbell+20kg",
  },
  "weight-plates": {
    id: "weight-plates",
    name: "Bumper Plate Set",
    description: "Rubber-coated plates protect your floor and barbell. Ideal for home gym builds.",
    category: "Barbells & Plates",
    url: "https://www.amazon.ca/s?tag=workoutplanst-20&k=bumper+plate+set",
  },
  "squat-rack": {
    id: "squat-rack",
    name: "Power Rack / Squat Stand",
    description: "The centrepiece of any home gym. Safe, versatile, and built to last decades.",
    category: "Equipment",
    url: "https://www.amazon.ca/s?tag=workoutplanst-20&k=power+rack+squat+stand",
  },
  "lifting-belt": {
    id: "lifting-belt",
    name: "Leather Lifting Belt",
    description: "Core support for heavy squats and deadlifts. Use on sets above 80% of your 1RM.",
    category: "Protective Gear",
    url: "https://www.amazon.ca/s?tag=workoutplanst-20&k=leather+lifting+belt",
  },
  "chalk": {
    id: "chalk",
    name: "Lifting Chalk Block",
    description: "Eliminates slipping on heavy pulls and overhead work. A grip game-changer.",
    category: "Accessories",
    url: "https://www.amazon.ca/s?tag=workoutplanst-20&k=lifting+chalk+block",
  },
  "knee-sleeves": {
    id: "knee-sleeves",
    name: "7mm Neoprene Knee Sleeves",
    description: "Warmth and compression for heavy squats and leg press. Protects the joint over time.",
    category: "Protective Gear",
    url: "https://www.amazon.ca/s?tag=workoutplanst-20&k=neoprene+knee+sleeves+7mm",
  },
  "wrist-wraps": {
    id: "wrist-wraps",
    name: "Wrist Wraps",
    description: "Stabilise the wrist during heavy pressing. Essential for push-focused programmes.",
    category: "Protective Gear",
    url: "https://www.amazon.ca/s?tag=workoutplanst-20&k=wrist+wraps+weightlifting",
  },
  "adjustable-dumbbells": {
    id: "adjustable-dumbbells",
    name: "Adjustable Dumbbells",
    description: "Space-efficient and versatile. Perfect for hypertrophy work and accessory exercises.",
    category: "Dumbbells",
    url: "https://www.amazon.ca/s?tag=workoutplanst-20&k=adjustable+dumbbells",
  },
  "resistance-bands": {
    id: "resistance-bands",
    name: "Resistance Band Set",
    description: "Great for warm-ups, mobility drills, and as a standalone training tool anywhere.",
    category: "Resistance Training",
    url: "https://www.amazon.ca/s?tag=workoutplanst-20&k=resistance+band+set+exercise",
  },
  "pull-up-bar": {
    id: "pull-up-bar",
    name: "Doorframe Pull-Up Bar",
    description: "Adds vertical pulling to any home workout. No installation — fits standard doorframes.",
    category: "Home Gym",
    url: "https://www.amazon.ca/s?tag=workoutplanst-20&k=doorframe+pull+up+bar",
  },
  "foam-roller": {
    id: "foam-roller",
    name: "High-Density Foam Roller",
    description: "Speeds up recovery and reduces DOMS. Use before and after every session.",
    category: "Recovery",
    url: "https://www.amazon.ca/s?tag=workoutplanst-20&k=high+density+foam+roller",
  },
  "gym-bag": {
    id: "gym-bag",
    name: "Gym Duffel Bag",
    description: "Compartmentalised with a wet pocket for post-workout gear. Built for daily use.",
    category: "Accessories",
    url: "https://www.amazon.ca/s?tag=workoutplanst-20&k=gym+duffel+bag",
  },
};

/**
 * Curated gear sets by training focus.
 * Used by blog posts and plan templates to render relevant product cards.
 */
export const GEAR_SETS = {
  strength:    ["olympic-barbell", "weight-plates", "lifting-belt", "chalk", "knee-sleeves"],
  hypertrophy: ["adjustable-dumbbells", "wrist-wraps", "resistance-bands", "foam-roller"],
  beginner:    ["resistance-bands", "adjustable-dumbbells", "foam-roller", "gym-bag"],
  ppl:         ["olympic-barbell", "adjustable-dumbbells", "wrist-wraps", "lifting-belt", "foam-roller"],
  fullbody:    ["resistance-bands", "adjustable-dumbbells", "pull-up-bar", "foam-roller"],
  "home-gym":  ["squat-rack", "olympic-barbell", "weight-plates", "pull-up-bar", "foam-roller"],
};

/** Maps blog post slugs to a gear set key. */
export const BLOG_GEAR = {
  "how-to-create-a-workout-plan":    "beginner",
  "push-pull-legs-split":            "ppl",
  "531-workout-program":             "strength",
  "bro-split-workout":               "hypertrophy",
  "progressive-overload":            "strength",
  "sets-and-reps-for-muscle-growth": "hypertrophy",
  "3-day-full-body-workout":         "fullbody",
  "upper-lower-split":               "hypertrophy",
};

/** Maps plan template slugs to a gear set key. */
export const TEMPLATE_GEAR = {
  "push-pull-legs-6-day":     "ppl",
  "bro-split-5-day":          "hypertrophy",
  "531-wendler":              "strength",
  "upper-lower-4-day":        "hypertrophy",
  "stronglifts-5x5":          "strength",
  "starting-strength":        "strength",
  "phul-power-hypertrophy":   "strength",
  "arnold-split":             "hypertrophy",
  "gzclp":                    "strength",
  "beginner-full-body-3-day": "beginner",
};
