export type GoTool = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  href?: string;
  available: boolean;
  createdAt: string; // ISO date string, used for sorting and "New" badge
};

export const goTools: GoTool[] = [
  {
    id: "sleep-playlist",
    title: "Sleep Playlist Generator",
    description:
      "Answer 4 questions about your vibe and sleep habits. AI composes a personalized sleep soundtrack just for tonight — then share it with the community.",
    category: "AI Consultation",
    icon: "🎵",
    href: "/go/tools/sleep-playlist",
    available: true,
    createdAt: "2026-04-02",
  },
  {
    id: "bedtime-routine-builder",
    title: "Bedtime Routine Builder",
    description:
      "Answer 5 questions about your sleep habits and get a personalized wind-down routine with exact times to help you fall asleep faster tonight.",
    category: "Sleep Hygiene",
    icon: "🌙",
    href: "/go/tools/bedtime-routine-builder",
    available: true,
    createdAt: "2026-03-30",
  },
  {
    id: "stop-bang",
    title: "STOP-BANG Questionnaire",
    description:
      "Answer 8 clinically validated yes/no questions to assess your risk for obstructive sleep apnea — the same screening tool used by sleep specialists.",
    category: "Sleep Analysis",
    icon: "🔍",
    href: "/go/tools/stop-bang",
    available: true,
    createdAt: "2026-03-30",
  },
  {
    id: "sleep-study-explainer",
    title: "Sleep Study Results Explainer",
    description:
      "Enter your AHI, oxygen nadir, and sleep efficiency and get a plain-English breakdown of what your sleep study numbers actually mean.",
    category: "Sleep Analysis",
    icon: "📋",
    href: "/go/tools/sleep-study-explainer",
    available: true,
    createdAt: "2026-03-30",
  },
  {
    id: "dream-interpreter",
    title: "Dream Interpreter",
    description:
      "Explore the meaning behind your dreams with our AI dream interpreter. Share a dream and receive symbolic insights and gentle guidance-for curiosity and reflection.",
    category: "AI Consultation",
    icon: "✨",
    href: "/go/tools/dream-interpreter",
    available: true,
    createdAt: "2026-02-10",
  },
  {
    id: "sleep-sound-check",
    title: "Sleep Sound Check",
    description:
      "Analyze your sleep sounds for snoring patterns. Record 30 seconds of audio and get a quick snapshot of low-frequency breathing activity. Privacy-first-all processing happens in your browser.",
    category: "Sleep Analysis",
    icon: "🔊",
    href: "/go/tools/sleep-sound-check",
    available: true,
    createdAt: "2026-02-10",
  },
  {
    id: "cpap-mask-selector-quiz",
    title: "CPAP Mask Selector Quiz",
    description:
      "Take a quick interactive quiz to find the CPAP mask type that best matches your breathing style, sleep position, and comfort preferences.",
    category: "CPAP Therapy",
    icon: "❓",
    href: "/go/tools/cpap-mask-selector-quiz",
    available: true,
    createdAt: "2026-02-01",
  },
  {
    id: "sleep-schedule-calculator",
    title: "Sleep Schedule Calculator",
    description:
      "Calculate your ideal wake or bedtime based on sleep cycles. Get personalized sleep schedule recommendations by age and preferred wake or bed time.",
    category: "Sleep Analysis",
    icon: "📅",
    href: "/go/tools/sleep-schedule-calculator",
    available: true,
    createdAt: "2026-01-20",
  },
  {
    id: "sleep-mate",
    title: "Sleep Mate Browser Extension",
    description:
      "Track your sleep patterns, get bedtime reminders, and build better sleep habits - right in your browser. Free Chrome extension with digital sleep diary and smart notifications.",
    category: "Sleep Tracking",
    icon: "🌙",
    href: "/go/tools/sleep-mate",
    available: true,
    createdAt: "2026-01-15",
  },
  {
    id: "sleep-diary",
    title: "Sleep Diary",
    description:
      "Track your sleep patterns and improve your sleep quality with our sleep diary. Log your sleep and wake times, as well as any other sleep-related activities.",
    category: "Sleep Analysis",
    icon: "📓",
    href: "/go/tools/sleep-diary",
    available: true,
    createdAt: "2026-01-15",
  },
  {
    id: "ai-sleep-consultant",
    title: "AI Sleep Consultant",
    description:
      "Get personalized sleep advice and tips from our AI-powered consultant. Ask questions about sleep hygiene, schedules, and common sleep issues.",
    category: "AI Consultation",
    icon: "🤖",
    href: "/go/tools/ai-sleep-consultant",
    available: true,
    createdAt: "2026-01-10",
  },
  {
    id: "ahi-index-calculator",
    title: "AHI Index Calculator",
    description:
      "Calculate your Apnea-Hypopnea Index (AHI) to assess the severity of sleep apnea based on your sleep study results.",
    category: "Sleep Analysis",
    icon: "📊",
    href: "/go/tools/ahi-index-calculator",
    available: true,
    createdAt: "2026-01-10",
  },
  {
    id: "ess-calculator",
    title: "Epworth Sleepiness Scale Calculator",
    description:
      "Assess your daytime sleepiness using the validated Epworth Sleepiness Scale (ESS) questionnaire.",
    category: "Sleep Analysis",
    icon: "😴",
    href: "/go/tools/ess-calculator",
    available: true,
    createdAt: "2026-01-10",
  },
];
