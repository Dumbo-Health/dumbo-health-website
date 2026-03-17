import React from "react";

interface MarkdownMessageProps {
  content: string;
  isUser?: boolean;
}

export default function MarkdownMessage({
  content,
  isUser = false,
}: MarkdownMessageProps) {
  const parseInlineMarkdown = (text: string) => {
    const parts: Array<string | React.ReactElement> = [];
    let currentText = text;
    let keyCounter = 0;

    currentText = currentText.replace(/\*\*([^*]+)\*\*/g, (_match, inner) => {
      const key = `bold-${keyCounter++}`;
      parts.push(
        <strong key={key} className="font-semibold">
          {inner}
        </strong>
      );
      return `__BOLD_${key}__`;
    });

    currentText = currentText.replace(/\*([^*]+)\*/g, (_match, inner) => {
      const key = `italic-${keyCounter++}`;
      parts.push(
        <em key={key} className="italic">
          {inner}
        </em>
      );
      return `__ITALIC_${key}__`;
    });

    const finalParts: Array<string | React.ReactElement> = [];
    const textParts = currentText.split(/(__(?:BOLD|ITALIC)_[^_]+__)/);

    textParts.forEach((part) => {
      if (part.startsWith("__BOLD_")) {
        const key = part.replace(/__BOLD_([^_]+)__/, "$1");
        const element = parts.find(
          (item) => React.isValidElement(item) && item.key === key
        );
        if (element) finalParts.push(element);
      } else if (part.startsWith("__ITALIC_")) {
        const key = part.replace(/__ITALIC_([^_]+)__/, "$1");
        const element = parts.find(
          (item) => React.isValidElement(item) && item.key === key
        );
        if (element) finalParts.push(element);
      } else if (part) {
        finalParts.push(part);
      }
    });

    return finalParts.length ? finalParts : text;
  };

  const parseMarkdown = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactElement[] = [];
    let currentList: React.ReactElement[] = [];
    let listType: "ordered" | "unordered" | null = null;
    let listCounter = 1;

    const flushList = () => {
      if (!currentList.length) return;

      if (listType === "ordered") {
        elements.push(
          <div key={`ol-${elements.length}`} className="mb-4 ml-2 space-y-1">
            {currentList}
          </div>
        );
      } else {
        elements.push(
          <ul
            key={`ul-${elements.length}`}
            className="mb-4 ml-2 list-disc list-inside space-y-2 text-sm"
          >
            {currentList}
          </ul>
        );
      }

      currentList = [];
      listType = null;
      listCounter = 1;
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      if (trimmed.startsWith("###")) {
        flushList();
        elements.push(
          <h4
            key={`h4-${index}`}
            className="mt-5 mb-3 border-b border-gray-200 pb-1 text-base font-bold first:mt-0"
          >
            {parseInlineMarkdown(trimmed.replace(/^###\s*/, ""))}
          </h4>
        );
        return;
      }

      if (trimmed.startsWith("##")) {
        flushList();
        elements.push(
          <h3
            key={`h3-${index}`}
            className="mt-5 mb-3 border-b border-gray-200 pb-1 text-lg font-bold first:mt-0"
          >
            {parseInlineMarkdown(trimmed.replace(/^##\s*/, ""))}
          </h3>
        );
        return;
      }

      const numberedMatch = trimmed.match(/^(\d+)\.\s*(.+)$/);
      if (numberedMatch) {
        if (listType !== "ordered") {
          flushList();
          listType = "ordered";
          listCounter = 1;
        }
        currentList.push(
          <li key={`li-${index}`} className="mb-2 flex text-sm">
            <span className="mr-2 flex-shrink-0 font-medium">{listCounter}.</span>
            <span className="flex-1">
              {parseInlineMarkdown(numberedMatch[2])}
            </span>
          </li>
        );
        listCounter += 1;
        return;
      }

      if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
        const bulletText = trimmed.replace(/^[-•]\s*/, "");

        if (listType === "ordered") {
          currentList.push(
            <div key={`nested-${index}`} className="mb-1 ml-4 flex text-sm">
              <span className="mr-2 flex-shrink-0">•</span>
              <span className="flex-1">{parseInlineMarkdown(bulletText)}</span>
            </div>
          );
        } else {
          if (listType !== "unordered") {
            flushList();
            listType = "unordered";
          }
          currentList.push(
            <li key={`uli-${index}`} className="text-sm">
              {parseInlineMarkdown(bulletText)}
            </li>
          );
        }
        return;
      }

      const nextLines = lines.slice(index + 1, index + 5);
      const hasUpcomingNumberedItem = nextLines.some((nextLine) =>
        nextLine.trim().match(/^(\d+)\.\s+/)
      );

      if (!listType || (!hasUpcomingNumberedItem && listType === "ordered")) {
        flushList();
      }

      if (listType === "ordered" && hasUpcomingNumberedItem) {
        currentList.push(
          <div key={`continuation-${index}`} className="mb-2 ml-6 text-sm">
            {parseInlineMarkdown(trimmed)}
          </div>
        );
      } else {
        elements.push(
          <p key={`p-${index}`} className="mb-2 text-sm">
            {parseInlineMarkdown(trimmed)}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  if (isUser) {
    return <div className="text-sm">{content}</div>;
  }

  return <div className="markdown-content">{parseMarkdown(content)}</div>;
}
