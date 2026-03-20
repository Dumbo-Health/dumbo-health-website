import { createMetadata } from "@/lib/metadata";
import SleepDiaryClientWithCapture from "./sleep-diary-client";

export const metadata = createMetadata({
  title: "Sleep Diary",
  description:
    "Download or print a weekly sleep diary to track sleep timing, awakenings, and daily factors that affect rest.",
  path: "/go/tools/sleep-diary",
});

export default function SleepDiaryPage() {
  return <SleepDiaryClientWithCapture />;
}
