"use client";

import { useState } from "react";

export function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="font-mono text-xs px-3 py-1.5 rounded-lg border transition-colors"
      style={{
        borderColor: copied ? "#78BFBC" : "rgba(3,31,61,0.15)",
        color: copied ? "#78BFBC" : "rgba(3,31,61,0.5)",
        background: copied ? "rgba(120,191,188,0.08)" : "transparent",
      }}
    >
      {copied ? "Copied!" : "Copy URL"}
    </button>
  );
}
