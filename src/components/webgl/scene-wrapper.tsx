"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

interface SceneWrapperProps {
  children: ReactNode;
  className?: string;
  opacity?: number;
  frameloop?: "always" | "demand";
}

export function SceneWrapper({
  children,
  className = "",
  opacity = 0.4,
  frameloop = "always",
}: SceneWrapperProps) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const divRef = { current: null as HTMLDivElement | null };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  if (prefersReduced || !mounted) return null;

  return (
    <div
      ref={(el) => { divRef.current = el; }}
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {inView && (
        <Canvas
          frameloop={frameloop}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      )}
    </div>
  );
}
