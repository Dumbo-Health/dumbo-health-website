"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: { x: number; y: number; r: number; vx: number; vy: number; opacity: number }[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function initStars() {
      if (!canvas) return;
      stars.length = 0;
      for (let i = 0; i < 350; i++) {
        stars.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          r: Math.random() * 1.8 + 0.3,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.1,
          opacity: Math.random() * 0.6 + 0.2,
        });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      for (const star of stars) {
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = w;
        if (star.x > w) star.x = 0;
        if (star.y < 0) star.y = h;
        if (star.y > h) star.y = 0;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(252, 246, 237, ${star.opacity})`;
        ctx.fill();
      }
      animationId = requestAnimationFrame(draw);
    }

    resize();
    initStars();
    draw();

    const handleResize = () => { resize(); initStars(); };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

export function ProblemStatement() {
  return (
    <section
      className="relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden bg-midnight"
    >
      <Starfield />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center">
          <Image
            src="/icons/icon-sad.png"
            alt=""
            width={48}
            height={48}
            className="opacity-90"
          />
        </div>

        <h2 className="text-balance font-heading text-4xl font-medium leading-tight text-daylight md:text-5xl md:leading-tight">
          Sleep apnea doesn&apos;t just steal your sleep. It drains your energy, focus, and joy.
        </h2>
      </div>

    </section>
  );
}
