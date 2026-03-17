import { createMetadata } from "@/lib/metadata";
import DreamInterpreterClientWithCapture from "./dream-interpreter-client";

export const metadata = createMetadata({
  title: "Dream Interpreter",
  description:
    "Explore the meaning behind your dreams with reflective, symbolic interpretations from Dumbo Health's Dream Interpreter.",
  path: "/go/tools/dream-interpreter",
});

export default function DreamInterpreterPage() {
  return <DreamInterpreterClientWithCapture />;
}
