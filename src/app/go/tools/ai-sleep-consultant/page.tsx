import { createMetadata } from "@/lib/metadata";
import AiSleepConsultantClientWithCapture from "./ai-sleep-consultant-client";

export const metadata = createMetadata({
  title: "AI Sleep Consultant",
  description:
    "Ask general questions about sleep hygiene, schedules, and common sleep concerns using Dumbo Health's AI sleep consultant.",
  path: "/go/tools/ai-sleep-consultant",
});

export default function AiSleepConsultantPage() {
  return <AiSleepConsultantClientWithCapture />;
}
