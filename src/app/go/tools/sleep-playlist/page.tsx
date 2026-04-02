import { createMetadata } from "@/lib/metadata";
import SleepPlaylistClient from "./sleep-playlist-client";

export const metadata = createMetadata({
  title: "Sleep Playlist Generator",
  description:
    "Answer 4 questions about your vibe and sleep habits. We'll use AI to compose your personalized sleep soundtrack in seconds.",
  path: "/go/tools/sleep-playlist",
});

export default function SleepPlaylistPage() {
  return <SleepPlaylistClient />;
}
