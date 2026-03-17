import type { ReactNode } from "react";
import GoLayoutClient from "@/components/go/GoLayoutClient";

export default function GoLayout({ children }: { children: ReactNode }) {
  return <GoLayoutClient>{children}</GoLayoutClient>;
}
