"use client";

import { useEffect, useRef, useState } from "react";

export interface AudioPlayerProps {
  src: string;
  ariaLabel?: string;
  title?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light";
  className?: string;
}

const BAR_COUNT = 12;
const BAR_HEIGHTS = [0.4, 0.6, 0.8, 0.5, 0.9, 0.55, 0.7, 0.45, 0.85, 0.6, 0.75, 0.5];

export function AudioPlayer({
  src,
  ariaLabel = "Play audio",
  title,
  size = "md",
  variant = "default",
  className = "",
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    const onError = () => {
      setIsPlaying(false);
      setLoadError("Audio failed to load");
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [src]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      audio.volume = 1;
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Audio play failed:", error);
      setIsPlaying(false);
    }
  };

  if (!src) return null;

  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-12 w-12",
    lg: "h-14 w-14",
  };

  const barSizeClasses = {
    sm: "w-0.5",
    md: "w-1",
    lg: "w-1.5",
  };

  const variantClasses =
    variant === "light"
      ? "bg-white text-midnight hover:bg-white/90 focus:ring-white/50"
      : "bg-peach text-white hover:bg-peach/90 focus:ring-peach";

  const barColorClass = variant === "light" ? "bg-white" : "bg-peach";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <audio ref={audioRef} src={src} preload="auto" />
      <button
        type="button"
        onClick={() => void togglePlay()}
        className={`flex-shrink-0 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantClasses} ${sizeClasses[size]}`}
        aria-label={ariaLabel}
        aria-pressed={isPlaying}
      >
        {isPlaying ? (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <div className="flex h-6 items-end gap-0.5">
        {Array.from({ length: BAR_COUNT }).map((_, index) => (
          <div
            key={index}
            className={`${barSizeClasses[size]} ${barColorClass} rounded-full ${isPlaying ? "animate-soundwave" : ""}`}
            style={{
              height: `${8 + BAR_HEIGHTS[index] * 12}px`,
              animationDelay: `${index * 60}ms`,
            }}
          />
        ))}
      </div>
      {title ? (
        <span
          className={`max-w-[140px] truncate text-sm font-medium ${
            variant === "light" ? "text-white" : "text-midnight"
          }`}
        >
          {title}
        </span>
      ) : null}
      {duration > 0 ? (
        <span
          className={`text-xs tabular-nums ${
            variant === "light" ? "text-white/80" : "text-midnight/55"
          }`}
        >
          {formatTime(progress)} / {formatTime(duration)}
        </span>
      ) : null}
      {loadError ? <span className="text-xs text-red-500">{loadError}</span> : null}
    </div>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}
