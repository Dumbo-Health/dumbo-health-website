import { createMetadata } from "@/lib/metadata";
import AhiIndexCalculatorClientWithCapture from "./ahi-index-calculator-client";

export const metadata = createMetadata({
  title: "AHI Calculator",
  description:
    "Estimate apnea severity using total apneas, total hypopneas, and monitoring duration.",
  path: "/go/tools/ahi-index-calculator",
});

export default function AhiIndexCalculatorPage() {
  return <AhiIndexCalculatorClientWithCapture />;
}
