import { createMetadata } from "@/lib/metadata";
import SleepScheduleCalculatorClientWithCapture from "./sleep-schedule-calculator-client";

export const metadata = createMetadata({
  title: "Sleep Schedule Calculator",
  description:
    "Calculate recommended bedtimes or wake times using 90-minute sleep cycles and a simple sleep onset buffer.",
  path: "/go/tools/sleep-schedule-calculator",
});

export default function SleepScheduleCalculatorPage() {
  return <SleepScheduleCalculatorClientWithCapture />;
}
