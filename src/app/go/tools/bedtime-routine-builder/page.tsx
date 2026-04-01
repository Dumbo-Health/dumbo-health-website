import { createMetadata } from "@/lib/metadata";
import BedtimeRoutineBuilderClientWithCapture from "./bedtime-routine-builder-client";

export const metadata = createMetadata({
  title: "Bedtime Routine Builder",
  description:
    "Answer 5 questions about your sleep habits and get a personalized wind-down routine with exact times.",
  path: "/go/tools/bedtime-routine-builder",
});

export default function BedtimeRoutineBuilderPage() {
  return <BedtimeRoutineBuilderClientWithCapture />;
}
