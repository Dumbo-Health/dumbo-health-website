import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refer a Patient for Sleep Testing | Healthcare Providers | Dumbo Health",
  description:
    "Streamline your sleep apnea referrals. Send patients to Dumbo Health for at-home sleep testing and CPAP therapy with a simple online referral form.",
  openGraph: {
    title: "Refer a Patient for Sleep Testing | Healthcare Providers | Dumbo Health",
    description:
      "Streamline your sleep apnea referrals. Send patients to Dumbo Health for at-home sleep testing and CPAP therapy with a simple online referral form.",
  },
};

export default function ReferralsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
