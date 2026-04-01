export interface SymptomStep {
  n: string;
  title: string;
  body: string;
}

export interface SymptomPage {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  /** Text before the accent keyword in headline */
  headlinePre: string;
  /** The keyword rendered in accent color */
  headlineAccent: string;
  /** Text after the accent keyword */
  headlinePost: string;
  subline: string;
  /** 2–3 sentence direct-answer summary shown under the hero, used for LLM passage citation */
  tldr: string;
  accentColor: string;
  /** Section 2 — Why this happens */
  whyHeadline: string;
  whyBody: string;
  whyBullets: string[];
  whyImage: string;
  whyImageAlt: string;
  /** Section 3 — The good news */
  goodNewsPivot: string;
  goodNewsSteps: SymptomStep[];
  /** CTA section */
  ctaLine: string;
}

export const SYMPTOM_PAGES: SymptomPage[] = [
  {
    slug: "always-tired",
    seoTitle: "Always Tired? It Might Be Sleep Apnea",
    seoDescription:
      "Waking up exhausted no matter how much you sleep? Constant fatigue could be a sign of sleep apnea. Find out in one night with an at-home sleep test.",
    canonical: "https://www.dumbo.health/always-tired",
    headlinePre: "You're not lazy.",
    headlineAccent: "You're exhausted.",
    headlinePost: "",
    subline:
      "If you wake up tired even after a full night in bed, something is stopping your body from actually resting. Sleep apnea is one of the most common reasons, and one of the most missed.",
    tldr:
      "Sleep apnea causes your breathing to stop repeatedly during sleep — sometimes dozens of times an hour — preventing your body from ever reaching the deep, restorative rest it needs. This is why you can spend 8 hours in bed and still wake up exhausted. An at-home sleep test can confirm whether sleep apnea is the cause in a single night.",
    accentColor: "#78BFBC",
    whyHeadline: "Why sleep apnea makes you feel this way.",
    whyBody:
      "Sleep apnea causes your breathing to pause dozens, sometimes hundreds, of times every night. Each pause jolts your brain awake just enough to restart breathing, but not enough for you to notice. The result: your body never reaches the deep, restorative sleep it needs. You can spend eight hours in bed and still wake up feeling like you barely slept.",
    whyBullets: [
      "Your brain is forced out of deep sleep every time breathing stops.",
      "Your body spends the night fighting, not resting.",
      "No amount of coffee fixes what sleep deprivation is doing underneath.",
    ],
    whyImage: "/images/Could this be sleep apnea photos/Always tired.png",
    whyImageAlt: "Person looking exhausted in the morning",
    goodNewsPivot:
      "Here's what changes when sleep apnea gets treated.",
    goodNewsSteps: [
      {
        n: "01",
        title: "A sleep test in your own bed.",
        body: "No sleep lab, no overnight hospital stay. We send you a small device, you wear it for one night at home, and we do the rest.",
      },
      {
        n: "02",
        title: "A doctor reviews your results.",
        body: "Our licensed physicians read your data and get back to you in days, not weeks. If sleep apnea is detected, your prescription is ready to go.",
      },
      {
        n: "03",
        title: "CPAP therapy that actually fits your life.",
        body: "We ship your CPAP with everything you need, set you up with a specialist, and stay with you every step of the way through our app.",
      },
    ],
    ctaLine: "Two weeks to a morning you recognize.",
  },
  {
    slug: "cant-focus",
    seoTitle: "Can't Focus or Concentrate? It Could Be Sleep Apnea",
    seoDescription:
      "Brain fog, trouble concentrating, forgetting things? Untreated sleep apnea disrupts the deep sleep your brain needs to function. Learn more.",
    canonical: "https://www.dumbo.health/cant-focus",
    headlinePre: "Your brain isn't broken.",
    headlineAccent: "It's running on empty.",
    headlinePost: "",
    subline:
      "The mental fog, the forgetfulness, the feeling like you're thinking through mud — these aren't signs of aging or burnout alone. They can be your brain telling you it hasn't had proper rest in a long time.",
    tldr:
      "Sleep apnea disrupts the deep sleep your brain needs to consolidate memories, clear metabolic waste, and recharge — leaving you foggy, forgetful, and mentally slow even after a full night in bed. It's one of the most common but least recognized causes of brain fog and difficulty concentrating. A one-night at-home sleep test can tell you whether sleep apnea is affecting how you think.",
    accentColor: "#FF8361",
    whyHeadline: "What happens to your brain without deep sleep.",
    whyBody:
      "Your brain uses deep sleep to consolidate memories, clear out waste products, and recharge for the next day. Sleep apnea repeatedly yanks you out of that deep sleep before the process finishes. Over time, the mental effects pile up: slower thinking, poor memory, difficulty staying on task, and a constant sense of mental heaviness.",
    whyBullets: [
      "Deep sleep is when your brain processes and stores information.",
      "Each apnea event pulls you out before that work is done.",
      "Months of disrupted sleep have real effects on how your brain performs.",
    ],
    whyImage: "/images/Could this be sleep apnea photos/Cant focus.png",
    whyImageAlt: "Person struggling to concentrate",
    goodNewsPivot:
      "Mental clarity often returns once breathing is restored.",
    goodNewsSteps: [
      {
        n: "01",
        title: "One night to find out.",
        body: "Our at-home sleep test is comfortable, simple, and done in a single night. You'll get real data about what's happening while you sleep.",
      },
      {
        n: "02",
        title: "A real diagnosis, not a guess.",
        body: "A licensed physician reviews your results and tells you exactly what's going on. No generic advice, no waiting rooms.",
      },
      {
        n: "03",
        title: "Treatment that fits into your life.",
        body: "Modern CPAP therapy is quiet and simple. Our team helps you get comfortable so it becomes second nature fast.",
      },
    ],
    ctaLine: "Your brain isn't broken. It's just tired.",
  },
  {
    slug: "loud-snoring",
    seoTitle: "Loud Snoring at Night? It May Be More Than Just Snoring",
    seoDescription:
      "Loud or frequent snoring is one of the most common signs of sleep apnea. Take an at-home sleep test and find out what's really happening.",
    canonical: "https://www.dumbo.health/loud-snoring",
    headlinePre: "Snoring this loud",
    headlineAccent: "is a signal.",
    headlinePost: "",
    subline:
      "Not everyone who snores has sleep apnea, but most people with sleep apnea snore. And when the snoring is loud, frequent, or followed by gasping, it's worth paying attention.",
    tldr:
      "Loud, frequent snoring is one of the most common warning signs of sleep apnea — a condition where the airway narrows or collapses during sleep, causing breathing to stop. The gasping or snorting sound is your body forcing the airway back open, which can happen dozens of times an hour without you knowing. An at-home sleep test can tell you in one night whether your snoring needs treatment.",
    accentColor: "#78BFBC",
    whyHeadline: "What's actually happening when you snore that loudly.",
    whyBody:
      "Snoring happens when airflow is partially blocked during sleep. In sleep apnea, that blockage is more severe: the airway narrows or collapses completely, causing breathing to stop. The loud snort or gasp you (or your partner) hear is your body forcing the airway back open. This can happen dozens of times every hour.",
    whyBullets: [
      "Loud snoring often means partial or complete airway collapse.",
      "Gasping or choking sounds during sleep are strong warning signs.",
      "Your bed partner may be more aware of your symptoms than you are.",
    ],
    whyImage: "/images/people/couple-in-bed.png",
    whyImageAlt: "Couple in bed, one partner affected by snoring",
    goodNewsPivot:
      "A simple test can confirm whether it's sleep apnea.",
    goodNewsSteps: [
      {
        n: "01",
        title: "Skip the sleep lab.",
        body: "Our at-home test is just as accurate for most people, and you do it in your own bed. No sensors glued to your scalp. No lab technicians watching.",
      },
      {
        n: "02",
        title: "Fast results from a real doctor.",
        body: "A licensed physician reviews your overnight data and gives you a clear answer, typically within a few days.",
      },
      {
        n: "03",
        title: "Treatment that helps everyone in the room.",
        body: "CPAP therapy virtually eliminates snoring for most people. Your partner will notice the difference on night one.",
      },
    ],
    ctaLine: "Tonight could be the turning point.",
  },
  {
    slug: "anxiety-and-stress",
    seoTitle: "Anxiety and Stress Worse at Night? Sleep Apnea Could Be Why",
    seoDescription:
      "Feeling anxious, on edge, or overwhelmed? Undiagnosed sleep apnea disrupts your nervous system overnight. See if a sleep test could help.",
    canonical: "https://www.dumbo.health/anxiety-and-stress",
    headlinePre: "You're not just",
    headlineAccent: "overstressed.",
    headlinePost: "Your body is in survival mode.",
    subline:
      "If anxiety feels like it's getting worse despite everything you try, the missing piece might be what's happening while you sleep. A nervous system that never gets to rest will stay in a state of high alert all day long.",
    tldr:
      "Sleep apnea triggers your body's stress response over and over through the night, flooding your system with cortisol and adrenaline before you even wake up. By morning, your nervous system is already in overdrive — which is why anxiety and chronic stress are often rooted in what's happening while you sleep. Treating sleep apnea helps the nervous system calm down, and many people notice a meaningful shift in their baseline anxiety.",
    accentColor: "#FF8361",
    whyHeadline: "How poor sleep floods your system with stress.",
    whyBody:
      "Every time sleep apnea causes a breathing pause, your body triggers a stress response: heart rate spikes, cortisol surges, your system jolts back to alert. This happens over and over through the night. By morning, your stress hormones are already elevated. The anxiety you feel during the day isn't always just life, it's your body continuing a crisis that started while you were asleep.",
    whyBullets: [
      "Sleep apnea activates your fight-or-flight response repeatedly through the night.",
      "Cortisol levels stay elevated when deep sleep is disrupted.",
      "When your nervous system is overloaded, everything feels harder to manage.",
    ],
    whyImage: "/images/Could this be sleep apnea photos/Anxiety and stress.png",
    whyImageAlt: "Person looking stressed and overwhelmed",
    goodNewsPivot:
      "When breathing is restored, the nervous system starts to calm down.",
    goodNewsSteps: [
      {
        n: "01",
        title: "Find out what's actually happening.",
        body: "Our at-home sleep test measures your breathing, oxygen levels, and sleep patterns overnight. No lab. No overnight stay.",
      },
      {
        n: "02",
        title: "A real answer from a real doctor.",
        body: "Your results are reviewed by a licensed physician who will explain what they found and what to do next.",
      },
      {
        n: "03",
        title: "Treatment that works with your life.",
        body: "We make starting CPAP therapy as low-friction as possible, so you can focus on feeling better, not figuring out equipment.",
      },
    ],
    ctaLine: "Calmer days start with one night.",
  },
  {
    slug: "low-sex-drive",
    seoTitle: "Low Sex Drive or Libido? Sleep Apnea May Be a Factor",
    seoDescription:
      "Loss of libido and sexual dysfunction are common, unspoken symptoms of sleep apnea. Find out if better sleep can help restore your energy and drive.",
    canonical: "https://www.dumbo.health/low-sex-drive",
    headlinePre: "Low energy goes",
    headlineAccent: "deeper than you think.",
    headlinePost: "",
    subline:
      "When your body is running on fragmented sleep, hormone production suffers, energy disappears, and drive, including sexual drive, fades. This is rarely talked about, but it's common, and it's treatable.",
    tldr:
      "Most testosterone is produced during deep sleep — and sleep apnea disrupts that process every single night, causing hormone levels to drop in both men and women. Low libido, reduced energy, and diminished motivation are common but rarely discussed symptoms of untreated sleep apnea. Treating sleep apnea can help restore hormonal balance and bring drive and vitality back.",
    accentColor: "#78BFBC",
    whyHeadline: "The connection between sleep apnea and hormones.",
    whyBody:
      "Most testosterone is produced during deep, restorative sleep. Sleep apnea disrupts that process every single night. Over time, testosterone levels drop, affecting energy, mood, motivation, and libido in both men and women. Low oxygen from repeated apnea events compounds this effect, putting chronic stress on the systems that regulate your body's hormones.",
    whyBullets: [
      "Deep sleep is when most testosterone is produced.",
      "Sleep apnea disrupts that window, night after night.",
      "Low oxygen levels add chronic stress to an already taxed system.",
    ],
    whyImage: "/images/Could this be sleep apnea photos/Low sex drive.png",
    whyImageAlt: "Person sitting alone looking fatigued",
    goodNewsPivot:
      "Treating sleep apnea can restore more than just energy.",
    goodNewsSteps: [
      {
        n: "01",
        title: "An honest look at what's going on.",
        body: "Our at-home sleep test gives you real data about your breathing and oxygen levels overnight. It's private, simple, and done in your own bed.",
      },
      {
        n: "02",
        title: "A doctor who takes you seriously.",
        body: "We connect the dots between your symptoms and your sleep. A licensed physician reviews your results and walks you through what they mean.",
      },
      {
        n: "03",
        title: "Treatment designed to stick.",
        body: "We help you get comfortable with CPAP therapy and stay with you through the adjustment period. Better sleep is the foundation everything else builds on.",
      },
    ],
    ctaLine: "One night of data. A lot can shift.",
  },
  {
    slug: "hard-to-lose-weight",
    seoTitle: "Hard to Lose Weight? Sleep Apnea May Be Working Against You",
    seoDescription:
      "Struggling to lose weight despite diet and exercise? Untreated sleep apnea disrupts the hormones that control hunger and metabolism. Learn more.",
    canonical: "https://www.dumbo.health/hard-to-lose-weight",
    headlinePre: "It's not just",
    headlineAccent: "willpower.",
    headlinePost: "Your hormones are off.",
    subline:
      "If you're doing everything right and the weight still won't budge, poor sleep might be the hidden obstacle. Sleep apnea disrupts the hormones that control hunger, metabolism, and fat storage.",
    tldr:
      "Sleep apnea raises ghrelin (the hormone that makes you hungry) and lowers leptin (the hormone that makes you feel full), while also elevating cortisol, which promotes fat storage around the abdomen. This hormonal imbalance can make weight loss extremely difficult, even when you're dieting and exercising. Treating sleep apnea helps restore the hormonal environment your body needs to manage weight effectively.",
    accentColor: "#FF8361",
    whyHeadline: "Why bad sleep makes weight loss harder.",
    whyBody:
      "Sleep deprivation caused by sleep apnea raises ghrelin, the hormone that makes you hungry, while lowering leptin, the hormone that makes you feel full. At the same time, cortisol rises and promotes fat storage, particularly around the abdomen. Your body is working against your best efforts. It's not a character flaw. It's chemistry.",
    whyBullets: [
      "Your hunger hormones get thrown off, making you eat more and feel less full.",
      "Stress hormones rise overnight, promoting fat storage around the belly.",
      "Low energy from poor sleep makes exercise harder to sustain.",
    ],
    whyImage: "/images/Could this be sleep apnea photos/Hard to loose weight.png",
    whyImageAlt: "Person looking frustrated about health",
    goodNewsPivot:
      "When sleep improves, the hormonal balance can shift back.",
    goodNewsSteps: [
      {
        n: "01",
        title: "A one-night test that reveals everything.",
        body: "Our at-home device captures your breathing patterns, oxygen saturation, and sleep quality while you sleep at home.",
      },
      {
        n: "02",
        title: "Expert eyes on your results.",
        body: "A licensed physician analyzes your data and gives you a clear answer. If sleep apnea is diagnosed, treatment starts fast.",
      },
      {
        n: "03",
        title: "A plan you can actually follow.",
        body: "We ship everything you need and help you through setup, so your CPAP becomes part of your routine before you know it.",
      },
    ],
    ctaLine: "The missing piece isn't willpower.",
  },
  {
    slug: "high-blood-pressure",
    seoTitle: "High Blood Pressure at Night? Sleep Apnea Could Be the Cause",
    seoDescription:
      "Hypertension that doesn't respond to medication may be linked to sleep apnea. See how treating sleep apnea can help regulate your blood pressure.",
    canonical: "https://www.dumbo.health/high-blood-pressure",
    headlinePre: "Your blood pressure",
    headlineAccent: "doesn't sleep",
    headlinePost: "when you do.",
    subline:
      "If you have high blood pressure that's hard to control, sleep apnea is one of the most common and overlooked reasons. Every time your breathing stops at night, your cardiovascular system pays the price.",
    tldr:
      "Every time sleep apnea stops your breathing, your body releases a surge of adrenaline that spikes your blood pressure. When this happens dozens of times a night, your cardiovascular system never fully recovers — which is why sleep apnea is a recognized cause of hypertension that doesn't respond to medication alone. Treating sleep apnea can make blood pressure significantly easier to control.",
    accentColor: "#78BFBC",
    whyHeadline: "What sleep apnea does to your heart and blood pressure.",
    whyBody:
      "Each apnea event drops your blood oxygen and triggers a surge in adrenaline. Your heart beats faster, your blood vessels constrict, and your blood pressure spikes. This happens over and over through the night. Over time, the cardiovascular system stays in a state of chronic stress, making hypertension much harder to manage with medication alone. The American Heart Association lists sleep apnea as a major risk factor for high blood pressure.",
    whyBullets: [
      "Oxygen drops during each apnea event, triggering an adrenaline surge.",
      "Repeated spikes in blood pressure strain the cardiovascular system.",
      "Sleep apnea is a recognized cause of blood pressure that's hard to control with medication.",
    ],
    whyImage: "/images/Could this be sleep apnea photos/Blood pressure.png",
    whyImageAlt: "Person concerned about blood pressure",
    goodNewsPivot:
      "Treating sleep apnea can make a real difference to your blood pressure.",
    goodNewsSteps: [
      {
        n: "01",
        title: "A simple overnight test.",
        body: "Our at-home sleep test measures breathing, oxygen levels, and heart rate patterns while you sleep. No hospital. No wires. Just one night.",
      },
      {
        n: "02",
        title: "A doctor-reviewed diagnosis.",
        body: "Licensed physicians analyze your results and flag any concerns. If sleep apnea is present, treatment can start quickly.",
      },
      {
        n: "03",
        title: "Ongoing care included.",
        body: "We monitor your CPAP data and stay in touch through the app. Your care team is a message away, not a six-week wait.",
      },
    ],
    ctaLine: "Better numbers start with better sleep.",
  },
  {
    slug: "constantly-getting-sick",
    seoTitle: "Always Getting Sick? Poor Sleep May Be Weakening Your Immune System",
    seoDescription:
      "Frequent colds, slow recovery, and feeling run down are signs of immune dysfunction. Sleep apnea may be undermining your immune system every night.",
    canonical: "https://www.dumbo.health/constantly-getting-sick",
    headlinePre: "Your immune system",
    headlineAccent: "repairs itself at night.",
    headlinePost: "",
    subline:
      "If you're catching everything that goes around or taking longer than usual to recover, your body may not be getting the deep sleep it needs to keep your defenses strong.",
    tldr:
      "During deep sleep, your body produces the immune proteins (cytokines) it needs to fight infection and inflammation. Sleep apnea repeatedly cuts this process short, leaving your immune system chronically under-resourced and slower to respond. If you're getting sick more often or struggling to recover, poor sleep quality — not bad luck — may be the reason.",
    accentColor: "#FF8361",
    whyHeadline: "How sleep apnea undermines your immune system.",
    whyBody:
      "During deep sleep, your body produces cytokines: proteins that fight infection and inflammation. Sleep apnea repeatedly interrupts this process. With less deep sleep, cytokine production drops, your immune response slows, and you become more vulnerable to getting sick and staying sick. It's not bad luck. It's biology.",
    whyBullets: [
      "Immune-repairing proteins are mostly produced during deep sleep.",
      "Sleep apnea cuts that window short, night after night.",
      "Over time, poor sleep leaves your body less able to fight off illness and recover.",
    ],
    whyImage: "/images/Could this be sleep apnea photos/Constantly sick.png",
    whyImageAlt: "Person feeling run down and unwell",
    goodNewsPivot:
      "Deep, uninterrupted sleep is your immune system's most powerful tool.",
    goodNewsSteps: [
      {
        n: "01",
        title: "One test to see what's happening.",
        body: "Our at-home sleep test captures a full night of data about your breathing and oxygen levels. Comfortable, private, and done in your own bed.",
      },
      {
        n: "02",
        title: "A real answer from a real physician.",
        body: "Your results are reviewed by a licensed doctor who gives you a clear diagnosis and a path forward.",
      },
      {
        n: "03",
        title: "Treatment that keeps working.",
        body: "Our CPAP subscription includes everything from equipment to telehealth check-ins, so your care never drops off.",
      },
    ],
    ctaLine: "Your immune system rebuilds at night.",
  },
];
