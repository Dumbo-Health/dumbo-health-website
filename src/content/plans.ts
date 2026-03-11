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
      "Mask, Fitted to Your Face",
      "Mask Swaps if it Doesn't Fit: 1 swap, 30 days",
      "24/7 Care Team",
    ],
    extras: [
      "Doctor Visits, In the App: $80 per visit",
      "Smart Resupply: member pricing",
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
      "Mask, Fitted to Your Face",
      "Mask Swaps if it Doesn't Fit: 2 swaps, 60 days",
      "2 Doctor Visits, In the App",
      "Smart Resupply, auto-shipped",
      "Device insurance: preferred pricing, 24 months",
      "24/7 Care Team",
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
      "Mask, Fitted to Your Face",
      "Mask Swaps if it Doesn't Fit: unlimited",
      "Unlimited Doctor Visits, In the App",
      "Full Smart Resupply, auto-shipped",
      "DumboCare device insurance",
      "Automatic device upgrades",
      "Priority 24/7 Care Team",
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
    name: "Mask, Fitted to Your Face",
    essentials: "Included",
    premium: "Included",
    elite: "Included",
  },
  {
    name: "Mask Swaps if it Doesn't Fit",
    essentials: "30 days, 1 swap",
    premium: "60 days, 2 swaps",
    elite: "Unlimited",
  },
  {
    name: "Doctor Visits, In the App",
    essentials: "$80 per visit",
    premium: "2 visits per year",
    elite: "Unlimited",
  },
  {
    name: "Smart Resupply",
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
    name: "24/7 Care Team",
    essentials: "Included",
    premium: "Included",
    elite: "Included + Priority",
  },
  {
    name: "Usage Requirements",
    essentials: "No usage minimums",
    premium: "No usage minimums",
    elite: "No usage minimums",
    note: "When you're paying out-of-pocket, there are no usage minimums. We focus on better sleep and real results.",
  },
];
