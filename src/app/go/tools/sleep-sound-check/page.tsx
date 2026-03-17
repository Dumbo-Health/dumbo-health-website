import { createMetadata } from "@/lib/metadata";
import SleepSoundCheckClientWithCapture from "./sleep-sound-check-client";

export const metadata = createMetadata({
  title: "Sleep Sound Check",
  description:
    "Analyze a short audio sample for low-frequency sleep sound activity with Dumbo Health's privacy-first Sleep Sound Check.",
  path: "/go/tools/sleep-sound-check",
});

export default function SleepSoundCheckPage() {
  return <SleepSoundCheckClientWithCapture />;
}
