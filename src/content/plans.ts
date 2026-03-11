export interface PlanFeature {
  name: string;
  essentials: string;
  premium: string;
  elite: string;
  note?: string;
}

export interface Plan {
  name: string;
  price: number;
  valuedAt: number;
  savings: string;
  savingsYear: string;
  annualSavings: string;
  summary: string;
  recommended?: boolean;
  features: string[];
  extras?: string[];
  cta: string;
  ctaUrl: string;
}

export const cpapPlans: Plan[] = [
  {
    name: "Essentials",
    price: 59,
    valuedAt: 129,
    savings: "Save $840/yr",
    savingsYear: "$840/yr",
    annualSavings: "$840",
    summary: "Start therapy. Pay for extras only when you need them.",
    features: [
      "Basic CPAP machine",
      "Mask at sign-up: Value Comfort (BMC N5)",
      "Mask 3D Fit included",
      "30-day mask fit guarantee (1 swap)",
      "Smart Support included",
      "Free shipping",
    ],
    extras: [
      "Telehealth calls: $80 per call",
      "Accessories: member pricing",
    ],
    cta: "Get started",
    ctaUrl: "https://app.dumbo.health",
  },
  {
    name: "Premium",
    price: 89,
    valuedAt: 204,
    savings: "Save $1,380/yr",
    savingsYear: "$1,380/yr",
    annualSavings: "$1,380",
    summary: "The smart choice for most people.",
    recommended: true,
    features: [
      "Premium CPAP machine",
      "Mask at sign-up: Resmed AirFit N20",
      "Mask 3D Fit included",
      "60-day mask fit guarantee (2 swaps)",
      "2 telehealth visits per year",
      "Common accessories auto-shipped by usage",
      "Proactive coaching nudges",
      "Device coverage: preferred pricing for 24 months",
      "Smart Support included",
      "Free shipping",
    ],
    cta: "Get started",
    ctaUrl: "https://app.dumbo.health",
  },
  {
    name: "Elite",
    price: 129,
    valuedAt: 331,
    savings: "Save $2,430/yr",
    savingsYear: "$2,430/yr",
    annualSavings: "$2,430",
    summary: "Everything, all the time, zero friction.",
    features: [
      "Premium CPAP machine",
      "Mask at sign-up: Resmed AirFit N20",
      "Mask 3D Fit included",
      "Unlimited mask fit guarantee",
      "Unlimited telehealth calls",
      "All accessories auto-shipped, accidental damage covered",
      "Personal coach with monthly reviews",
      "DumboCare device insurance",
      "Automatic device upgrades",
      "30-minute specialist setup call",
      "Priority Smart Support",
      "Free shipping",
    ],
    cta: "Get started",
    ctaUrl: "https://app.dumbo.health",
  },
];

export const featureComparison: PlanFeature[] = [
  {
    name: "CPAP Machine",
    essentials: "Basic CPAP machine",
    premium: "Premium CPAP machine",
    elite: "Premium CPAP machine",
  },
  {
    name: "Mask at Sign-Up",
    essentials: "Value Comfort (BMC N5)",
    premium: "Resmed AirFit N20",
    elite: "Resmed AirFit N20",
  },
  {
    name: "Mask 3D Fit",
    essentials: "Included",
    premium: "Included",
    elite: "Included",
  },
  {
    name: "Mask Fit Guarantee",
    essentials: "30 days, 1 swap",
    premium: "60 days, 2 swaps",
    elite: "Unlimited",
  },
  {
    name: "Telehealth Calls",
    essentials: "$80 per call",
    premium: "2 visits per year",
    elite: "Unlimited",
  },
  {
    name: "Accessories",
    essentials: "Member pricing",
    premium: "Common parts auto-shipped",
    elite: "Everything auto-shipped",
  },
  {
    name: "Device Insurance",
    essentials: "Warranty only",
    premium: "Preferred pricing, 24 months",
    elite: "DumboCare (full coverage)",
  },
  {
    name: "Device Upgrade",
    essentials: "Not included",
    premium: "Not included",
    elite: "Included (auto upgrade)",
  },
  {
    name: "Coaching",
    essentials: "Not included",
    premium: "Proactive nudges",
    elite: "Personal coach + monthly reviews",
  },
  {
    name: "Smart Support",
    essentials: "Included",
    premium: "Included",
    elite: "Included + Priority",
  },
  {
    name: "Analytics",
    essentials: "Key stats (AHI, hours, seal)",
    premium: "Trends and nightly details",
    elite: "Full insights and monthly reviews",
  },
  {
    name: "Set Up with Specialist",
    essentials: "Not included",
    premium: "Not included",
    elite: "Included (30-min call)",
  },
  {
    name: "Shipping",
    essentials: "Included (free)",
    premium: "Included (free)",
    elite: "Included (free)",
  },
  {
    name: "Usage Requirements",
    essentials: "No usage minimums",
    premium: "No usage minimums",
    elite: "No usage minimums",
    note: "When you're paying out-of-pocket, there are no usage minimums. We focus on better sleep and real results.",
  },
];
