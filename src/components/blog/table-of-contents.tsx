"use client";

import { useEffect, useRef, useState } from "react";
import type { Heading } from "@/lib/reading-time";

interface TableOfContentsProps {
  headings: Heading[];
  /** When true, renders as a collapsible block for the mobile/inline slot */
  inline?: boolean;
}

export function TableOfContents({ headings, inline = false }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(!inline);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  if (inline) {
    return (
      <div
        className="mb-8 rounded-xl overflow-hidden"
        style={{ border: "1px solid #F5E6D1", background: "#FCF6ED" }}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 font-body text-sm font-bold text-midnight"
          style={{ cursor: "pointer" }}
          aria-expanded={open}
        >
          <span
            className="font-mono uppercase tracking-widest"
            style={{ fontSize: "0.75rem", color: "rgba(3,31,61,0.5)" }}
          >
            In this article
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 200ms ease",
              flexShrink: 0,
            }}
          >
            <path d="M4 6l4 4 4-4" stroke="#031F3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <nav className="px-5 pb-4" aria-label="Table of contents">
            <ul className="space-y-2">
              {headings.map((h) => (
                <li key={h.id} style={{ paddingLeft: h.level === 3 ? "1rem" : "0" }}>
                  <a
                    href={`#${h.id}`}
                    className="font-body text-sm block transition-colors duration-150"
                    style={{
                      color: activeId === h.id ? "#FF8361" : "rgba(3,31,61,0.65)",
                      fontWeight: activeId === h.id ? 600 : 400,
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    );
  }

  // Sidebar version (desktop)
  return (
    <div className="mt-6">
      <p
        className="font-mono uppercase tracking-widest mb-4"
        style={{ fontSize: "0.6875rem", color: "rgba(3,31,61,0.45)" }}
      >
        In this article
      </p>
      <nav aria-label="Table of contents">
        <ul className="space-y-2">
          {headings.map((h) => (
            <li key={h.id} style={{ paddingLeft: h.level === 3 ? "0.75rem" : "0" }}>
              <a
                href={`#${h.id}`}
                className="font-body block transition-all duration-150"
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  color: activeId === h.id ? "#FF8361" : "rgba(3,31,61,0.55)",
                  fontWeight: activeId === h.id ? 600 : 400,
                  borderLeft: activeId === h.id ? "2px solid #FF8361" : "2px solid transparent",
                  paddingLeft: activeId === h.id ? "0.625rem" : "0.625rem",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
