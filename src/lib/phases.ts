export type PhaseKey = "menstrual" | "follicular" | "ovulation" | "luteal";

export interface Phase {
  key: PhaseKey;
  name: string;
  emoji: string;
  dayRange: [number, number];
  tagline: string;
  color: string; // hex used for accents
  body: string;
  hormones: string;
  emotions: string;
  energy: string;
  symptoms: string[];
  selfCare: string[];
  nutrition: string[];
  exercise: string[];
  funFact: string;
  dailyInsights: string[];
}

export const PHASES: Phase[] = [
  {
    key: "menstrual",
    name: "Menstrual Phase",
    emoji: "🩸",
    dayRange: [1, 5],
    tagline: "Your body is resetting.",
    color: "#EF4444",
    body: "The uterus sheds its lining (endometrium) because pregnancy did not occur. This shedding leaves through the vagina as your period.",
    hormones: "Estrogen and progesterone are at their lowest, which is why energy can feel low.",
    emotions: "Reflective, quieter, sometimes emotional. Both are completely normal.",
    energy: "Low — treat yourself gently.",
    symptoms: ["Cramps", "Fatigue", "Lower back ache", "Headache", "Bloating"],
    selfCare: [
      "Use a heating pad on your lower belly",
      "Prioritize sleep (8–9 hours)",
      "Journal or rest without guilt",
    ],
    nutrition: [
      "Iron-rich foods (spinach, lentils, red meat)",
      "Warm herbal teas (ginger, chamomile)",
      "Dark chocolate in moderation",
    ],
    exercise: ["Gentle yoga", "Walking", "Stretching — skip heavy training"],
    funFact:
      "The average person loses only 30–40 mL of blood per period — about 2–3 tablespoons.",
    dailyInsights: [
      "Prostaglandins — hormone-like compounds — trigger the uterine muscle contractions you feel as cramps.",
      "Period blood isn't just blood: it's a mix of uterine tissue, cervical mucus, and vaginal secretions.",
      "Body temperature is at its lowest point of the entire cycle right now — often by 0.3–0.5°C.",
      "Iron loss during your period is why energy dips; a single cup of lentils replaces most of it.",
      "The uterus is only about the size of a pear, yet it can contract with real force during shedding.",
      "Endorphins from a short walk can ease cramps as effectively as a low-dose painkiller for some.",
      "By day 5, estrogen has already started climbing again — your body is quietly rebuilding.",
      "Sleep quality tends to improve slightly by the end of your period as inflammation settles.",
      "Cravings for chocolate spike now partly because cocoa contains magnesium, which relaxes muscles.",
      "The cervix sits slightly lower and softer during menstruation — a subtle physical shift.",
    ],
  },
  {
    key: "follicular",
    name: "Follicular Phase",
    emoji: "🌱",
    dayRange: [6, 13],
    tagline: "Energy and focus are climbing.",
    color: "#2563EB",
    body: "The pituitary gland releases FSH, prompting follicles in the ovaries to mature. The uterine lining begins to rebuild.",
    hormones: "Estrogen rises steadily — the brain feels sharper and mood lifts.",
    emotions: "Optimistic, social, motivated. A great time to plan and start new things.",
    energy: "Rising — you feel lighter each day.",
    symptoms: ["Clearer skin", "Better mood", "Improved focus"],
    selfCare: [
      "Start a new learning project",
      "Try something creative",
      "Reconnect with friends",
    ],
    nutrition: [
      "Fermented foods (yogurt, kimchi) for gut health",
      "Leafy greens and seeds",
      "Lean proteins to fuel new energy",
    ],
    exercise: ["Cardio (running, cycling)", "Dance classes", "Strength training"],
    funFact:
      "You are born with ~1–2 million egg cells. By puberty, only ~300,000 remain — and only ~400 will ever mature.",
    dailyInsights: [
      "FSH (follicle-stimulating hormone) is currently coaxing 15–20 tiny follicles to start growing.",
      "Only one follicle will win the race and become dominant — the rest quietly dissolve.",
      "Rising estrogen sharpens verbal memory and word recall, according to fMRI studies.",
      "Skin looks clearer now because estrogen boosts collagen production and hydration.",
      "Your pain tolerance is measurably higher during this phase than in the luteal one.",
      "Motor coordination peaks — a good time to learn dance steps or a new instrument.",
      "The uterine lining thickens by about 1 mm every two days during this window.",
      "Insulin sensitivity is at its best, so carbs are used efficiently for energy.",
      "Confidence in trying new things is linked to rising estrogen's effect on dopamine.",
    ],
  },
  {
    key: "ovulation",
    name: "Ovulation Phase",
    emoji: "🌼",
    dayRange: [14, 16],
    tagline: "Your body's peak moment.",
    color: "#D4AF37",
    body: "A mature egg is released from the ovary and travels down the fallopian tube. This window lasts about 24 hours.",
    hormones: "A surge of LH triggers ovulation. Estrogen peaks then dips; testosterone bumps up.",
    emotions: "Confident, expressive, magnetic. Communication feels easy.",
    energy: "Peak — you feel powerful and alert.",
    symptoms: ["Slight pelvic twinge", "Increased libido", "Egg-white cervical fluid"],
    selfCare: ["Speak up on things that matter", "Do public-facing work", "Stay hydrated"],
    nutrition: [
      "Antioxidant-rich berries",
      "Cruciferous veg (broccoli, cauliflower) to support estrogen metabolism",
      "Plenty of water",
    ],
    exercise: ["High-intensity workouts", "Team sports", "Heavy lifting"],
    funFact:
      "The released egg is only about 0.1 mm wide — but it's the largest human cell you can see with the naked eye.",
    dailyInsights: [
      "The LH surge that triggers ovulation lasts only 24–36 hours — a brief hormonal fireworks show.",
      "Cervical mucus turns clear and stretchy — like raw egg white — to help sperm travel.",
      "Body temperature rises by about 0.3–0.5°C right after ovulation and stays up for ~14 days.",
      "Some people feel a brief one-sided twinge called mittelschmerz — German for 'middle pain'.",
      "The egg lives just 12–24 hours after release; sperm can wait up to 5 days for it.",
      "Sense of smell peaks now — studies show sharper detection of subtle scents.",
      "Ovaries usually alternate sides each cycle, but not always — it's more random than people think.",
    ],
  },
  {
    key: "luteal",
    name: "Luteal Phase",
    emoji: "🌙",
    dayRange: [17, 28],
    tagline: "Slow down and turn inward.",
    color: "#8B5CF6",
    body: "The empty follicle becomes the corpus luteum and releases progesterone to prepare the uterus for a possible pregnancy. If none occurs, hormones drop and a new cycle begins.",
    hormones: "Progesterone rises then falls; estrogen dips. This drop causes PMS.",
    emotions: "More sensitive, introspective. Small things can feel bigger.",
    energy: "Declining — pace yourself.",
    symptoms: ["Bloating", "Breast tenderness", "Mood swings", "Cravings", "Acne"],
    selfCare: [
      "Say no to non-essentials",
      "Warm baths",
      "Deep breathing and journaling",
    ],
    nutrition: [
      "Complex carbs (oats, sweet potato)",
      "Magnesium-rich foods (nuts, dark chocolate)",
      "Reduce salt and caffeine",
    ],
    exercise: ["Pilates", "Long walks", "Restorative yoga"],
    funFact:
      "PMS affects up to 75% of menstruators — you are absolutely not alone in feeling it.",
    dailyInsights: [
      "The corpus luteum — the empty follicle from ovulation — is now a temporary hormone factory.",
      "Progesterone is called the 'calming hormone' but its withdrawal is what fuels PMS.",
      "Basal body temperature stays elevated — a natural sign the luteal phase has begun.",
      "Serotonin dips as estrogen falls, which is why mood swings and cravings kick in.",
      "The gut slows down under progesterone's influence — hello, bloating and constipation.",
      "Breasts can feel tender because milk ducts temporarily expand in preparation for pregnancy.",
      "Sleep can fragment now; melatonin production is subtly disrupted by hormone shifts.",
      "Cravings for carbs are your brain asking for tryptophan to make more serotonin.",
      "Skin produces more sebum in late luteal — the culprit behind hormonal breakouts.",
      "If no pregnancy, the corpus luteum dissolves in ~10–12 days, triggering your next period.",
      "This phase is always ~14 days — it's the follicular phase that varies cycle to cycle.",
      "Deep breathing (4-in, 6-out) activates the vagus nerve and eases PMS irritability.",
    ],
  },
];

export function phaseForDay(cycleDay: number, cycleLength = 28): Phase {
  // Scale ranges to actual cycle length
  const scale = cycleLength / 28;
  for (const p of PHASES) {
    const [a, b] = p.dayRange;
    if (cycleDay >= Math.round(a * scale) && cycleDay <= Math.round(b * scale)) return p;
  }
  return PHASES[PHASES.length - 1];
}

/** Deterministic day-of-year index — same insight all day, new one tomorrow. */
export function dailyInsightFor(phase: Phase, date: Date = new Date()): string {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86_400_000);
  return phase.dailyInsights[dayOfYear % phase.dailyInsights.length];
}
