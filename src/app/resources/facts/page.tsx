import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schemas";
import FactsContent from "./FactsContent";

export const metadata: Metadata = createMetadata({
  title: "Sleep Apnea Facts: What 80 Million Americans Need to Know",
  description:
    "Evidence-based sleep apnea facts: who it affects, how it harms your health, and how at-home testing and CPAP therapy can change your life. Backed by clinical research.",
  path: "/resources/facts",
});

export default function FactsPage() {
  const schema = webPageSchema(
    "Sleep Apnea Facts: What 80 Million Americans Need to Know",
    "Evidence-based sleep apnea facts: who it affects, how it harms your health, and how at-home testing and CPAP therapy can change your life.",
    "/resources/facts"
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FactsContent />
    </>
  );
}
