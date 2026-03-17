import type { Metadata } from 'next';
import { getPlanConfig, getOrderedKeys } from './lib/planLoader';
import SleepPlanIndexClient from './SleepPlanIndexClient';

export const metadata: Metadata = {
  title: '30-Day Sleep Improvement Plan | Dumbo Health',
  description: 'Build better sleep in 30 days. Evidence-based CBT-I steps: Week 1 Foundation, Week 2 Sleep–bed connection, Week 3 Calm your mind, Week 4 Lock in success.',
};

export default function SleepPlanIndexPage() {
  const config = getPlanConfig();
  const keys = getOrderedKeys();

  return <SleepPlanIndexClient config={config} keys={keys} />;
}
