"use client";

import Image from "next/image";
import { useState } from "react";

interface YoutubeEmbedProps {
  videoId: string;
  videoThumbnail?: string;
  title: string;
}

export function YoutubeEmbed({ videoId, videoThumbnail, title }: YoutubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="mt-8 overflow-hidden rounded-2xl aspect-video bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="mt-8 relative w-full rounded-2xl overflow-hidden aspect-video bg-midnight group cursor-pointer"
      aria-label={`Play video: ${title}`}
    >
      {videoThumbnail && (
        <Image
          src={videoThumbnail}
          alt=""
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      )}
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition-colors">
          <svg
            className="w-6 h-6 text-midnight ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
