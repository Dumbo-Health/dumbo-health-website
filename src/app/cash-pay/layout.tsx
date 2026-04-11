import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cash Pay Sleep Apnea Care | No Insurance Needed | Dumbo Health",
  description:
    "Transparent cash pay pricing for at-home sleep testing and CPAP therapy. Get quality sleep apnea care without insurance. Dumbo Health makes it simple.",
  openGraph: {
    title: "Cash Pay Sleep Apnea Care | No Insurance Needed | Dumbo Health",
    description:
      "Transparent cash pay pricing for at-home sleep testing and CPAP therapy. Get quality sleep apnea care without insurance. Dumbo Health makes it simple.",
  },
};

export default function CashPayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
