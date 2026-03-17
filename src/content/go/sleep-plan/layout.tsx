import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '30 Day Sleep Plan | Dumbo Health',
  description: 'A 30-day guided sleep plan by Dumbo Health. Build better sleep habits day by day.',
  keywords: 'sleep plan, sleep habits, sleep health, 30 day challenge, Dumbo Health',
  robots: { index: true, follow: true },
  openGraph: {
    title: '30 Day Sleep Plan | Dumbo Health',
    description: 'A 30-day guided sleep plan. Build better sleep habits day by day.',
    type: 'website',
  },
};

export default function SleepPlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
