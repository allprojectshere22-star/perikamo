export interface Lesson {
  slug: string;
  title: string;
  emoji: string;
  category: "Basics" | "Body" | "Hormones" | "Health" | "Lifestyle";
  readMinutes: number;
  summary: string;
  content: { heading: string; body: string }[];
  didYouKnow: string;
}

export const LESSONS: Lesson[] = [
  {
    slug: "what-is-a-menstrual-cycle",
    title: "What is a menstrual cycle?",
    emoji: "🔄",
    category: "Basics",
    readMinutes: 2,
    summary: "A monthly rhythm your body follows to prepare for a possible pregnancy.",
    content: [
      {
        heading: "The big picture",
        body: "The menstrual cycle is the series of hormonal and physical changes that happen roughly every 21 to 35 days from the first day of one period to the day before the next. It is orchestrated by your brain, ovaries, and uterus working together.",
      },
      {
        heading: "Four phases",
        body: "Each cycle has four phases: menstrual (your period), follicular (rebuilding), ovulation (releasing an egg), and luteal (waiting). Each phase changes how you feel, think, and move.",
      },
      {
        heading: "Why it matters",
        body: "Knowing your cycle helps you understand your energy, mood, skin, sleep, and appetite — and spot when something feels off early.",
      },
    ],
    didYouKnow: "Cycles are considered regular anywhere from 21 to 35 days — 28 is just an average.",
  },
  {
    slug: "why-periods-happen",
    title: "Why do periods happen?",
    emoji: "🩸",
    category: "Body",
    readMinutes: 2,
    summary: "The lining of the uterus sheds when no pregnancy occurs.",
    content: [
      {
        heading: "Building the lining",
        body: "During each cycle, rising estrogen thickens the endometrium (the inner lining of the uterus) so a fertilized egg could implant.",
      },
      {
        heading: "When there is no pregnancy",
        body: "If the egg is not fertilized, hormone levels drop. Without hormonal support, the lining breaks down and leaves the body through the vagina — that flow is your period.",
      },
      {
        heading: "It's not just blood",
        body: "Menstrual flow contains blood, endometrial tissue, cervical mucus, and vaginal fluid. That's why the color and texture can vary.",
      },
    ],
    didYouKnow: "A typical period releases only about 2–3 tablespoons of blood over the whole flow.",
  },
  {
    slug: "hormones-explained",
    title: "Hormones explained",
    emoji: "🧪",
    category: "Hormones",
    readMinutes: 3,
    summary: "Meet estrogen, progesterone, FSH, and LH — the four main players.",
    content: [
      {
        heading: "Estrogen",
        body: "Rises in the first half of your cycle. It builds the uterine lining and lifts mood, focus, and energy.",
      },
      {
        heading: "Progesterone",
        body: "Dominates the second half after ovulation. It keeps the lining stable and can make you feel calmer, sleepier, or more sensitive.",
      },
      {
        heading: "FSH and LH",
        body: "Sent from your brain (pituitary gland). FSH grows follicles in the ovary; an LH surge triggers ovulation — the release of an egg.",
      },
    ],
    didYouKnow: "Estrogen influences over 300 processes in your body, from bones to brain chemistry.",
  },
  {
    slug: "ovulation",
    title: "Ovulation",
    emoji: "🌼",
    category: "Body",
    readMinutes: 2,
    summary: "The 24-hour window when a mature egg is released.",
    content: [
      {
        heading: "What happens",
        body: "Around the middle of your cycle, a surge of LH causes an ovary to release one mature egg into the fallopian tube.",
      },
      {
        heading: "How you might feel",
        body: "Energy, confidence, and libido often peak. Some people feel a brief one-sided twinge called mittelschmerz.",
      },
      {
        heading: "How long it lasts",
        body: "The egg only survives 12 to 24 hours. Sperm can live 3–5 days, which is why the 'fertile window' spans several days.",
      },
    ],
    didYouKnow: "Ovulation usually alternates between your left and right ovary — but not in a strict pattern.",
  },
  {
    slug: "pms",
    title: "PMS: what and why",
    emoji: "🌙",
    category: "Health",
    readMinutes: 2,
    summary: "Premenstrual syndrome is real — and manageable.",
    content: [
      {
        heading: "What it is",
        body: "PMS is the collection of physical and emotional symptoms that appear 1–2 weeks before your period and fade once bleeding starts.",
      },
      {
        heading: "Why it happens",
        body: "As progesterone and estrogen drop at the end of the luteal phase, brain chemicals like serotonin dip too — leading to mood swings, cravings, bloating, and tender breasts.",
      },
      {
        heading: "What helps",
        body: "Regular sleep, less caffeine and salt, magnesium-rich foods, gentle movement, and tracking patterns so nothing feels random.",
      },
    ],
    didYouKnow: "Severe PMS with strong mood symptoms is called PMDD and deserves medical support — it's not weakness.",
  },
  {
    slug: "blood-colors",
    title: "Blood colors and what they mean",
    emoji: "🎨",
    category: "Health",
    readMinutes: 2,
    summary: "From bright red to brown, colors change through your period.",
    content: [
      {
        heading: "Bright red",
        body: "Fresh, fast flow — usually the middle days of your period. Very normal.",
      },
      {
        heading: "Dark red or brown",
        body: "Older blood that took longer to leave the body. Common at the start or end of a period.",
      },
      {
        heading: "Pink or orange",
        body: "Blood mixed with cervical fluid. Watch orange with a strong odor — it can signal infection and is worth a doctor visit.",
      },
      {
        heading: "Gray",
        body: "Not typical. Gray discharge should be checked by a healthcare provider.",
      },
    ],
    didYouKnow: "Blood turns darker as it oxidizes — the same reason a cut apple turns brown.",
  },
  {
    slug: "myths-vs-facts",
    title: "Common myths vs facts",
    emoji: "🧭",
    category: "Basics",
    readMinutes: 2,
    summary: "Let's clear up what's true and what isn't.",
    content: [
      {
        heading: "Myth: You can't get pregnant on your period",
        body: "Fact: It's less likely, but possible — sperm can live several days and cycles vary.",
      },
      {
        heading: "Myth: Periods should be exactly 28 days",
        body: "Fact: Anywhere from 21 to 35 days is medically regular.",
      },
      {
        heading: "Myth: PMS is 'all in your head'",
        body: "Fact: It's driven by measurable hormone shifts affecting the brain and body.",
      },
      {
        heading: "Myth: You shouldn't exercise on your period",
        body: "Fact: Gentle to moderate movement often reduces cramps and boosts mood.",
      },
    ],
    didYouKnow: "The word 'menstruation' comes from the Latin 'mensis' — meaning month.",
  },
  {
    slug: "period-hygiene",
    title: "Period hygiene",
    emoji: "🧼",
    category: "Lifestyle",
    readMinutes: 2,
    summary: "Simple habits for comfort and health.",
    content: [
      {
        heading: "Change regularly",
        body: "Swap pads every 4–6 hours, tampons every 4–8 hours, and menstrual cups every 8–12 hours to prevent irritation and infection.",
      },
      {
        heading: "Wash gently",
        body: "Warm water is enough for the vulva. The vagina is self-cleaning — skip douching and scented products.",
      },
      {
        heading: "Cotton is comfy",
        body: "Breathable underwear reduces moisture buildup and irritation.",
      },
    ],
    didYouKnow: "Toxic shock syndrome is rare but real — never leave a tampon in longer than 8 hours.",
  },
  {
    slug: "nutrition-by-phase",
    title: "Nutrition during each phase",
    emoji: "🥗",
    category: "Lifestyle",
    readMinutes: 2,
    summary: "What to eat when — a phase-by-phase guide.",
    content: [
      {
        heading: "Menstrual",
        body: "Iron-rich foods (spinach, lentils), warm soups, herbal teas. Skip harsh diets — your body needs fuel.",
      },
      {
        heading: "Follicular",
        body: "Fresh vegetables, fermented foods, lean proteins to support rising energy and new tissue.",
      },
      {
        heading: "Ovulation",
        body: "Antioxidants (berries, colorful veg), fiber, plenty of water.",
      },
      {
        heading: "Luteal",
        body: "Complex carbs (oats, sweet potato), magnesium (nuts, dark chocolate). Reduce salt and caffeine to ease bloating.",
      },
    ],
    didYouKnow: "Cravings for chocolate before your period may be your body asking for magnesium.",
  },
  {
    slug: "exercise-by-phase",
    title: "Exercise during each phase",
    emoji: "🏃‍♀️",
    category: "Lifestyle",
    readMinutes: 2,
    summary: "Move with your cycle, not against it.",
    content: [
      {
        heading: "Menstrual",
        body: "Walking, stretching, yin yoga. Rest is training too.",
      },
      { heading: "Follicular", body: "Cardio, dance, strength — energy is rising." },
      { heading: "Ovulation", body: "Peak strength window. HIIT and heavy lifts feel great." },
      {
        heading: "Luteal",
        body: "Pilates, long walks, mobility. Lower intensity, longer duration.",
      },
    ],
    didYouKnow: "Studies show many athletes hit personal records during the follicular phase.",
  },
  {
    slug: "when-to-seek-help",
    title: "When to seek medical advice",
    emoji: "🩺",
    category: "Health",
    readMinutes: 2,
    summary: "Signs that deserve a chat with a doctor.",
    content: [
      {
        heading: "Pain that stops your life",
        body: "Cramps that make you miss school, work, or sleep aren't normal — ask about endometriosis or adenomyosis.",
      },
      {
        heading: "Very heavy or long bleeding",
        body: "Soaking through a pad or tampon every hour, or bleeding longer than 7 days, needs evaluation.",
      },
      {
        heading: "Missed or very irregular periods",
        body: "Cycles shorter than 21 or longer than 35 days repeatedly can signal hormonal issues like PCOS or thyroid changes.",
      },
      {
        heading: "New or unusual symptoms",
        body: "Trust your body. Any sudden change from your normal is worth mentioning.",
      },
    ],
    didYouKnow: "It can take up to 3 years for cycles to become regular after your first period.",
  },
];

export const CATEGORIES = ["Basics", "Body", "Hormones", "Health", "Lifestyle"] as const;

export const DAILY_TIPS = [
  "Hydration eases cramps — aim for 2L today.",
  "Sunlight in the morning helps balance your hormones.",
  "Sleep is when your body regulates estrogen and progesterone.",
  "A 10-minute walk after meals lowers PMS bloating.",
  "Magnesium before bed can reduce cramps and improve sleep.",
  "Track your mood — patterns are more useful than single days.",
  "Deep breathing lowers cortisol, which helps hormone balance.",
];

export const DID_YOU_KNOW = [
  "Your uterus is only the size of a pear — but can stretch to hold a watermelon.",
  "The word 'menstruation' shares a root with 'moon' — both roughly monthly cycles.",
  "Estrogen affects over 300 processes in your body.",
  "You're born with ~1–2 million eggs; only ~400 will ever mature.",
  "Menstrual blood doesn't clot the same way regular blood does.",
  "Ovulation pain has its own name: mittelschmerz — German for 'middle pain'.",
];
