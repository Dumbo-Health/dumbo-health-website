import { createMetadata } from "@/lib/metadata";
import SleepStudyExplainerClientWithCapture from "./sleep-study-explainer-client";

export const metadata = createMetadata({
  title: "Sleep Study Results Explainer",
  description:
    "Enter your AHI, oxygen levels, and sleep efficiency to get a plain-English explanation of your sleep study results.",
  path: "/go/tools/sleep-study-explainer",
});

export default function SleepStudyExplainerPage() {
  return <SleepStudyExplainerClientWithCapture />;
}
