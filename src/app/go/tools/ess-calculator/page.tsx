import { createMetadata } from "@/lib/metadata";
import EssCalculatorClientWithCapture from "./ess-calculator-client";

export const metadata = createMetadata({
  title: "Epworth Sleepiness Scale Calculator",
  description:
    "Score daytime sleepiness using the validated ESS format across eight common situations.",
  path: "/go/tools/ess-calculator",
});

export default function EssCalculatorPage() {
  return <EssCalculatorClientWithCapture />;
}
