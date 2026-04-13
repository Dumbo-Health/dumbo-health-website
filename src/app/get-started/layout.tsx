import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started | Find Your Sleep Apnea Solution | Dumbo Health",
  description:
    "Answer a few quick questions to find the right sleep apnea care for you — from at-home testing to CPAP therapy. Start your path to better sleep.",
  openGraph: {
    title: "Get Started | Find Your Sleep Apnea Solution | Dumbo Health",
    description:
      "Answer a few quick questions to find the right sleep apnea care for you — from at-home testing to CPAP therapy. Start your path to better sleep.",
  },
};

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FCF6ED" }}>
      {children}
    </div>
  );
}
