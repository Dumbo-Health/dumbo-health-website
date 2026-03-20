import { createMetadata } from "@/lib/metadata";
import CpapMaskSelectorQuizClientWithCapture from "./cpap-mask-selector-quiz-client";

export const metadata = createMetadata({
  title: "CPAP Mask Selector Quiz",
  description:
    "Take a short quiz to identify which CPAP mask style may be the best fit for your sleep habits and breathing pattern.",
  path: "/go/tools/cpap-mask-selector-quiz",
});

export default function CpapMaskSelectorQuizPage() {
  return <CpapMaskSelectorQuizClientWithCapture />;
}
