import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import {
  getAllSleepProtocols,
  getSleepProtocolTips,
  getSleepProtocolVersions,
} from "@/lib/go/sleep-protocol";
import SleepProtocolIndexClient from "./sleep-protocol-index-client";

export const metadata = createMetadata({
  title: "Sleep Protocol",
  description:
    "Explore Dumbo Health's sleep research digest, practical actionables, and sleep protocol guidebook.",
  path: "/go/sleep-protocol",
});

export default async function SleepProtocolIndexPage() {
  const protocols = await getAllSleepProtocols();
  const versions = getSleepProtocolVersions();
  const tips = getSleepProtocolTips();

  if (!protocols.length) {
    notFound();
  }

  return <SleepProtocolIndexClient protocols={protocols} versions={versions} tips={tips} />;
}
