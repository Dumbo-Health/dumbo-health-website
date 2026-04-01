import { createMetadata } from "@/lib/metadata";
import StopBangClientWithCapture from "./stop-bang-client";

export const metadata = createMetadata({
  title: "STOP-BANG Sleep Apnea Risk Questionnaire",
  description:
    "Answer 8 clinically validated yes/no questions to assess your risk for obstructive sleep apnea.",
  path: "/go/tools/stop-bang",
});

export default function StopBangPage() {
  return <StopBangClientWithCapture />;
}
