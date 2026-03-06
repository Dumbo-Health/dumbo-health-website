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
  annualSavings: string;
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
    savings: "Save $840/year",
    annualSavings: "$840",
    features: [
      "CPAP Machine — AirSense 10",
      "Mask: Value Comfort (BMC N5)",
      "Mask 3D Fit included",
      "30-day mask fit guarantee (1 swap)",
      "Smart Support included",
      "Free shipping",
    ],
    extras: [
      "Telehealth calls — $80/call extra",
      "Accessories — member pricing extra",
    ],
    cta: "Select",
    ctaUrl: "https://app.dumbo.health",
  },
  {
    name: "Premium",
    price: 89,
    valuedAt: 204,
    savings: "Save $1,380/year",
    annualSavings: "$1,380",
    recommended: true,
    features: [
      "CPAP Machine — AirSense 11",
      "Mask: Resmed AirFit N20",
      "Mask 3D Fit included",
      "60-day mask fit guarantee (2 swaps)",
      "2 telehealth visits/year included",
      "Auto-shipped parts based on usage",
      "Proactive coaching nudges",
      "Device insurance (preferred pricing, 24mo)",
      "Smart Support included",
      "Free shipping",
    ],
    cta: "Select",
    ctaUrl: "https://app.dumbo.health",
  },
  {
    name: "Elite",
    price: 129,
    valuedAt: 331,
    savings: "Save $2,430/year",
    annualSavings: "$2,430",
    features: [
      "CPAP Machine — AirSense 11",
      "Mask: Resmed AirFit N20",
      "Mask 3D Fit included",
      "Unlimited mask fit guarantee",
      "Unlimited telehealth calls",
      "Unlimited auto-shipped accessories",
      "Personal coach + monthly reviews",
      "DumboCare device insurance",
      "Automatic device upgrades",
      "30-min specialist setup call",
      "Priority Smart Support",
      "Free shipping",
    ],
    cta: "Select",
    ctaUrl: "https://app.dumbo.health",
  },
];

export const featureComparison: PlanFeature[] = [
  {
    name: "CPAP Machine — AirSense 10",
    essentials: "Included",
    premium: "Included",
    elite: "Included",
  },
  {
    name: "CPAP Machine — AirSense 11",
    essentials: "Not included",
    premium: "Included",
    elite: "Included",
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
    essentials: "30-day: 1 swap",
    premium: "60-day: 2 swaps",
    elite: "Unlimited",
  },
  {
    name: "Telehealth Calls",
    essentials: "Extra cost ($80/call)",
    premium: "2 visits/year",
    elite: "Unlimited",
  },
  {
    name: "Replacing Accessories",
    essentials: "Extra cost (member price)",
    premium: "Partial (auto-ship common, others at member price)",
    elite: "Included (everything + accidental damage)",
  },
  {
    name: "Device Insurance",
    essentials: "Not included (warranty only)",
    premium: "Partial (preferred replacement pricing, 24mo)",
    elite: "DumboCare (covers beyond warranty, fast swaps)",
  },
  {
    name: "Device Upgrade",
    essentials: "Not included",
    premium: "Not included",
    elite: "Included (auto upgrade to latest)",
  },
  {
    name: "Smart Support",
    essentials: "Included",
    premium: "Included",
    elite: "Included + Priority",
  },
  {
    name: "Shipping",
    essentials: "Included (free)",
    premium: "Included (free)",
    elite: "Included (free)",
  },
  {
    name: "Set Up with Specialist",
    essentials: "Not required",
    premium: "Not required",
    elite: "Included (30-min call)",
  },
  {
    name: "Coaching",
    essentials: "Not included",
    premium: "Proactive nudges",
    elite: "Personal coach",
  },
  {
    name: "Analytics",
    essentials: "Key stats only (AHI, hours, mask seal + weekly summary)",
    premium:
      "Trends & nightly details (12-mo trends, nightly charts, before/after)",
    elite:
      "Full insights & reviews (deeper graphs, flagged issues, monthly reviews)",
  },
  {
    name: "Tips on Demand",
    essentials: "Not included",
    premium: "Included",
    elite: "Included",
  },
  {
    name: "Success Over Compliance",
    essentials: "No usage minimums",
    premium: "No usage minimums",
    elite: "No usage minimums",
    note: "When you're paying out-of-pocket, there are no usage minimums. We focus on better sleep and real-life results. Need a usage report for work/insurance? We'll provide it.",
  },
];
