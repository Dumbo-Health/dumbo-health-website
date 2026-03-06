"use client";

import { useState } from "react";

interface VideoEmbedProps {
  videoId?: string;
  title?: string;
}

export function VideoEmbed({
  videoId = "8DKLYsikxTs",
  title = "Dumbo Health - Sleep Apnea Care",
}: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="bg-sunlight py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-midnight/10">
          {loaded ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              onClick={() => setLoaded(true)}
              className="group absolute inset-0 flex items-center justify-center"
              aria-label={`Play video: ${title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailUrl}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="relative z-10 flex size-16 items-center justify-center rounded-full bg-peach text-white shadow-lg transition-transform group-hover:scale-110">
                <svg className="size-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
