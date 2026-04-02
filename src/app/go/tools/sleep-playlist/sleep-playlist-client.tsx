"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// ─── Types ───────────────────────────────────────────────────────────────────

type Vibe = "chill" | "dreamy" | "deep" | "nature";
type Mood = "anxious" | "tired" | "neutral" | "wired";
type Bedtime = "before-10pm" | "10pm-midnight" | "after-midnight" | "varies";
type SleepStruggle = "falling-asleep" | "staying-asleep" | "racing-mind" | "stress";
type Stage = "quiz" | "generating" | "email" | "player";

interface QuizAnswers {
  vibe: Vibe | null;
  mood: Mood | null;
  bedtime: Bedtime | null;
  sleepStruggle: SleepStruggle | null;
}

interface GeneratedTrack {
  audioUrl: string;
  title: string;
  prompt: string;
  vibe: Vibe;
  mood: Mood;
  bedtime: Bedtime;
  sleepStruggle: SleepStruggle;
}

interface CommunityTrack {
  id: string;
  created_at: string;
  title: string;
  audio_url: string;
  vibe: Vibe;
  mood: Mood;
  duration_seconds: number;
  play_count: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const QUIZ_STEPS = 4;

const VIBE_OPTIONS: { value: Vibe; label: string; emoji: string; desc: string }[] = [
  { value: "chill", label: "Chill Lo-Fi", emoji: "🎹", desc: "Soft piano, slow rain, slow beats" },
  { value: "dreamy", label: "Dreamy Ambient", emoji: "✨", desc: "Ethereal pads, floating textures" },
  { value: "deep", label: "Deep Meditation", emoji: "🔊", desc: "Bass drones, theta frequencies" },
  { value: "nature", label: "Nature Sounds", emoji: "🌿", desc: "Forest, water, soft wind" },
];

const MOOD_OPTIONS: { value: Mood; label: string; emoji: string; desc: string }[] = [
  { value: "anxious", label: "Anxious", emoji: "😰", desc: "Need to slow my racing heart" },
  { value: "tired", label: "Tired but wired", emoji: "😩", desc: "Exhausted but can't switch off" },
  { value: "neutral", label: "Pretty calm", emoji: "😌", desc: "Just need a gentle push into sleep" },
  { value: "wired", label: "Totally wired", emoji: "⚡", desc: "Mind is running at full speed" },
];

const BEDTIME_OPTIONS: { value: Bedtime; label: string; emoji: string }[] = [
  { value: "before-10pm", label: "Before 10pm", emoji: "🌇" },
  { value: "10pm-midnight", label: "10pm – midnight", emoji: "🌙" },
  { value: "after-midnight", label: "After midnight", emoji: "🌚" },
  { value: "varies", label: "It varies a lot", emoji: "🔄" },
];

const STRUGGLE_OPTIONS: { value: SleepStruggle; label: string; emoji: string; desc: string }[] = [
  { value: "falling-asleep", label: "Falling asleep", emoji: "😶", desc: "Takes forever to drift off" },
  { value: "staying-asleep", label: "Staying asleep", emoji: "👁️", desc: "Wake up in the middle of the night" },
  { value: "racing-mind", label: "Racing mind", emoji: "🧠", desc: "Thoughts won't stop looping" },
  { value: "stress", label: "Stress & worry", emoji: "😟", desc: "Work, life, it all follows me to bed" },
];

const VIBE_GRADIENTS: Record<Vibe, string> = {
  chill: "linear-gradient(135deg, #78BFBC 0%, #031F3D 100%)",
  dreamy: "linear-gradient(135deg, #FFD6AD 0%, #FF8361 100%)",
  deep: "linear-gradient(135deg, #031F3D 0%, #0d3060 100%)",
  nature: "linear-gradient(135deg, #2d7a5f 0%, #78BFBC 100%)",
};

const WAVEFORM_HEIGHTS = [30, 50, 70, 45, 85, 60, 40, 75, 55, 65, 35, 80, 50, 70, 45, 60, 40, 85, 55, 70, 30, 65, 50, 75, 40, 60];

// ─── Waveform ─────────────────────────────────────────────────────────────────

function Waveform({ isPlaying, progress = 0, color = "#FF8361" }: { isPlaying: boolean; progress?: number; color?: string }) {
  return (
    <div className="flex items-end gap-[2px] h-10">
      {WAVEFORM_HEIGHTS.map((h, i) => {
        const filled = (i / WAVEFORM_HEIGHTS.length) < progress;
        return (
          <div
            key={i}
            style={{
              height: `${h}%`,
              width: 3,
              backgroundColor: filled ? color : rgba(color, 0.35),
              borderRadius: 2,
              transition: "height 0.15s ease",
              ...(isPlaying
                ? {
                    animation: `waveBar ${0.6 + (i % 4) * 0.15}s ease-in-out infinite alternate`,
                    animationDelay: `${(i * 40) % 300}ms`,
                  }
                : {}),
            }}
          />
        );
      })}
      <style>{`
        @keyframes waveBar {
          from { transform: scaleY(0.6); }
          to   { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
}

function rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ─── Community Track Card ─────────────────────────────────────────────────────

function TrackCard({
  track,
  isPlaying,
  onPlay,
}: {
  track: CommunityTrack;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  const vibeLabel: Record<Vibe, string> = {
    chill: "Chill Lo-Fi",
    dreamy: "Dreamy Ambient",
    deep: "Deep Meditation",
    nature: "Nature Sounds",
  };

  const moodLabel: Record<Mood, string> = {
    anxious: "anxious",
    tired: "tired",
    neutral: "calm",
    wired: "wired",
  };

  const timeAgo = (dateStr: string): string => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden border transition-all hover:scale-[1.02] cursor-pointer"
      style={{
        borderColor: isPlaying ? "#FF8361" : "rgba(245,230,209,0.8)",
        boxShadow: isPlaying ? "0 0 0 2px #FF8361" : undefined,
      }}
      onClick={onPlay}
    >
      {/* Cover gradient */}
      <div
        className="h-28 relative flex items-end p-3"
        style={{ background: VIBE_GRADIENTS[track.vibe] }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                <rect x="3" y="2" width="4" height="12" rx="1" />
                <rect x="9" y="2" width="4" height="12" rx="1" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                <path d="M4 2l10 6-10 6V2z" />
              </svg>
            )}
          </div>
        </div>

        {isPlaying && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full px-2 py-0.5"
            style={{ backgroundColor: "rgba(255,131,97,0.9)" }}>
            <span className="font-mono text-[9px] text-white uppercase tracking-wider">Playing</span>
          </div>
        )}

        <div className="relative z-10">
          <Waveform isPlaying={isPlaying} color="rgba(255,255,255,0.8)" />
        </div>
      </div>

      {/* Info */}
      <div className="p-3" style={{ backgroundColor: "#FCF6ED" }}>
        <p className="font-body text-sm font-medium text-midnight line-clamp-1">{track.title}</p>
        <div className="mt-1.5 flex items-center justify-between">
          <span
            className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "rgba(245,230,209,0.8)", color: "#FF8361" }}
          >
            {vibeLabel[track.vibe]}
          </span>
          <span className="font-mono text-[9px]" style={{ color: "rgba(3,31,61,0.5)" }}>
            {track.play_count} plays · {timeAgo(track.created_at)}
          </span>
        </div>
        <p className="mt-1 font-mono text-[10px]" style={{ color: "rgba(3,31,61,0.45)" }}>
          for {moodLabel[track.mood]} nights
        </p>
      </div>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function StepProgress({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full transition-all duration-300"
          style={{
            backgroundColor: i < step ? "#FF8361" : i === step ? "rgba(255,131,97,0.4)" : "rgba(245,230,209,0.8)",
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SleepPlaylistClient() {
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({ vibe: null, mood: null, bedtime: null, sleepStruggle: null });
  const [stage, setStage] = useState<Stage>("quiz");
  const [error, setError] = useState<string | null>(null);
  const [generatedTrack, setGeneratedTrack] = useState<GeneratedTrack | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedTrackId, setSavedTrackId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Audio
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(22);

  // Community
  const [communityTracks, setCommunityTracks] = useState<CommunityTrack[]>([]);
  const [communityLoading, setCommunityLoading] = useState(true);
  const [activeCommunityId, setActiveCommunityId] = useState<string | null>(null);
  const communityAudioRef = useRef<HTMLAudioElement>(null);
  const [communityPlaying, setCommunityPlaying] = useState(false);

  // Load community tracks
  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/sleep-playlist/community");
        const json = await res.json() as { success: boolean; data: CommunityTrack[] };
        if (json.success) setCommunityTracks(json.data);
      } finally {
        setCommunityLoading(false);
      }
    })();
  }, [savedTrackId]);

  // Audio time tracking
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onDuration = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onDuration);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, [stage]);

  // Community audio events
  useEffect(() => {
    const audio = communityAudioRef.current;
    if (!audio) return;
    const onEnded = () => {
      setCommunityPlaying(false);
      setActiveCommunityId(null);
    };
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void audio.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const playCommunityTrack = useCallback(
    (track: CommunityTrack) => {
      const audio = communityAudioRef.current;
      if (!audio) return;

      // Toggle off if same track
      if (activeCommunityId === track.id && communityPlaying) {
        audio.pause();
        setCommunityPlaying(false);
        return;
      }

      // Pause main player if running
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }

      audio.src = track.audio_url;
      void audio.play();
      setActiveCommunityId(track.id);
      setCommunityPlaying(true);

      // Increment play count
      void fetch("/api/sleep-playlist/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: track.id }),
      });
    },
    [activeCommunityId, communityPlaying, isPlaying]
  );

  const selectAnswer = useCallback(
    <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
      // Auto-advance to next step after short delay
      setTimeout(() => {
        if (quizStep < QUIZ_STEPS - 1) {
          setQuizStep((s) => s + 1);
        }
      }, 200);
    },
    [quizStep]
  );

  const generate = useCallback(async () => {
    const { vibe, mood, bedtime, sleepStruggle } = answers;
    if (!vibe || !mood || !bedtime || !sleepStruggle) return;
    setStage("generating");
    setError(null);

    try {
      const res = await fetch("/api/sleep-playlist/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vibe, mood, bedtime, sleepStruggle }),
      });
      const json = await res.json() as { success: boolean; data?: GeneratedTrack; error?: string };

      if (!json.success || !json.data) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setStage("quiz");
        return;
      }

      setGeneratedTrack(json.data);
      setStage("email");
    } catch {
      setError("Network error. Please check your connection.");
      setStage("quiz");
    }
  }, [answers]);

  const submitEmail = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setEmailError("Please enter a valid email address.");
        return;
      }
      if (!generatedTrack) return;

      setEmailError(null);
      setIsSaving(true);

      try {
        const res = await fetch("/api/sleep-playlist/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, ...generatedTrack }),
        });
        const json = await res.json() as { success: boolean; data?: { id: string }; error?: string };

        if (json.success && json.data) {
          setSavedTrackId(json.data.id);
        }

        setStage("player");

        // Auto-play after state update
        setTimeout(() => {
          if (audioRef.current) {
            void audioRef.current.play();
            setIsPlaying(true);
          }
        }, 300);
      } catch {
        setEmailError("Failed to save. Please try again.");
      } finally {
        setIsSaving(false);
      }
    },
    [email, generatedTrack]
  );

  const copyShareLink = useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const formatTime = (secs: number): string => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const allAnswered = answers.vibe && answers.mood && answers.bedtime && answers.sleepStruggle;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <main>
      {/* Hidden community audio */}
      <audio ref={communityAudioRef} style={{ display: "none" }} />

      {/* ── Hero ── */}
      <section style={{ backgroundColor: "#031F3D" }}>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: "#78BFBC" }}>
            Sleep Tools
          </p>
          <h1 className="mt-4 font-heading text-4xl leading-tight text-white sm:text-5xl">
            Sleep Playlist Generator
          </h1>
          <p className="mt-5 font-body text-lg leading-8" style={{ color: "rgba(252,246,237,0.72)" }}>
            Answer 4 questions. We&apos;ll use AI to compose a personalized sleep soundtrack — just for tonight.
          </p>
        </div>
      </section>

      {/* ── Generator ── */}
      <section style={{ backgroundColor: "#FCF6ED" }}>
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">

          {/* QUIZ */}
          {stage === "quiz" && (
            <div className="max-w-2xl mx-auto">
              <StepProgress step={quizStep} total={QUIZ_STEPS} />

              {/* Step 0: Vibe */}
              {quizStep === 0 && (
                <div>
                  <h2 className="font-heading text-2xl text-midnight mb-2">What&apos;s your vibe tonight?</h2>
                  <p className="font-body text-midnight mb-6" style={{ opacity: 0.6 }}>
                    Pick the sound world that feels right for you right now.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {VIBE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => selectAnswer("vibe", opt.value)}
                        className="rounded-2xl border p-4 text-left transition-all hover:scale-[1.02]"
                        style={{
                          borderColor: answers.vibe === opt.value ? "#FF8361" : "rgba(245,230,209,0.8)",
                          backgroundColor: answers.vibe === opt.value ? "rgba(255,131,97,0.08)" : "white",
                          boxShadow: answers.vibe === opt.value ? "0 0 0 2px #FF8361" : undefined,
                        }}
                      >
                        <span className="text-2xl">{opt.emoji}</span>
                        <p className="mt-2 font-body font-medium text-midnight">{opt.label}</p>
                        <p className="mt-0.5 font-body text-sm" style={{ color: "rgba(3,31,61,0.6)" }}>{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Mood */}
              {quizStep === 1 && (
                <div>
                  <h2 className="font-heading text-2xl text-midnight mb-2">How are you feeling right now?</h2>
                  <p className="font-body text-midnight mb-6" style={{ opacity: 0.6 }}>
                    Your track will be tuned to meet you where you are.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {MOOD_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => selectAnswer("mood", opt.value)}
                        className="rounded-2xl border p-4 text-left transition-all hover:scale-[1.02]"
                        style={{
                          borderColor: answers.mood === opt.value ? "#FF8361" : "rgba(245,230,209,0.8)",
                          backgroundColor: answers.mood === opt.value ? "rgba(255,131,97,0.08)" : "white",
                          boxShadow: answers.mood === opt.value ? "0 0 0 2px #FF8361" : undefined,
                        }}
                      >
                        <span className="text-2xl">{opt.emoji}</span>
                        <p className="mt-2 font-body font-medium text-midnight">{opt.label}</p>
                        <p className="mt-0.5 font-body text-sm" style={{ color: "rgba(3,31,61,0.6)" }}>{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                  <button type="button" onClick={() => setQuizStep(0)} className="mt-4 font-body text-sm" style={{ color: "rgba(3,31,61,0.5)" }}>
                    ← Back
                  </button>
                </div>
              )}

              {/* Step 2: Bedtime */}
              {quizStep === 2 && (
                <div>
                  <h2 className="font-heading text-2xl text-midnight mb-2">When do you usually go to bed?</h2>
                  <p className="font-body text-midnight mb-6" style={{ opacity: 0.6 }}>
                    Helps us understand your sleep rhythm.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {BEDTIME_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => selectAnswer("bedtime", opt.value)}
                        className="rounded-2xl border p-4 text-left transition-all hover:scale-[1.02]"
                        style={{
                          borderColor: answers.bedtime === opt.value ? "#FF8361" : "rgba(245,230,209,0.8)",
                          backgroundColor: answers.bedtime === opt.value ? "rgba(255,131,97,0.08)" : "white",
                          boxShadow: answers.bedtime === opt.value ? "0 0 0 2px #FF8361" : undefined,
                        }}
                      >
                        <span className="text-2xl">{opt.emoji}</span>
                        <p className="mt-2 font-body font-medium text-midnight">{opt.label}</p>
                      </button>
                    ))}
                  </div>
                  <button type="button" onClick={() => setQuizStep(1)} className="mt-4 font-body text-sm" style={{ color: "rgba(3,31,61,0.5)" }}>
                    ← Back
                  </button>
                </div>
              )}

              {/* Step 3: Sleep Struggle */}
              {quizStep === 3 && (
                <div>
                  <h2 className="font-heading text-2xl text-midnight mb-2">What&apos;s your biggest sleep challenge?</h2>
                  <p className="font-body text-midnight mb-6" style={{ opacity: 0.6 }}>
                    We&apos;ll compose your track specifically for this.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {STRUGGLE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => selectAnswer("sleepStruggle", opt.value)}
                        className="rounded-2xl border p-4 text-left transition-all hover:scale-[1.02]"
                        style={{
                          borderColor: answers.sleepStruggle === opt.value ? "#FF8361" : "rgba(245,230,209,0.8)",
                          backgroundColor: answers.sleepStruggle === opt.value ? "rgba(255,131,97,0.08)" : "white",
                          boxShadow: answers.sleepStruggle === opt.value ? "0 0 0 2px #FF8361" : undefined,
                        }}
                      >
                        <span className="text-2xl">{opt.emoji}</span>
                        <p className="mt-2 font-body font-medium text-midnight">{opt.label}</p>
                        <p className="mt-0.5 font-body text-sm" style={{ color: "rgba(3,31,61,0.6)" }}>{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                  <button type="button" onClick={() => setQuizStep(2)} className="mt-4 font-body text-sm" style={{ color: "rgba(3,31,61,0.5)" }}>
                    ← Back
                  </button>

                  {allAnswered && (
                    <div className="mt-8">
                      {error && (
                        <p className="mb-4 font-body text-sm text-red-600 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                          {error}
                        </p>
                      )}
                      <Button
                        onClick={() => void generate()}
                        className="w-full rounded-xl font-mono tracking-wider py-4 text-base"
                        style={{ backgroundColor: "#FF8361", color: "white" }}
                      >
                        🎵 Compose My Sleep Track
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* GENERATING */}
          {stage === "generating" && (
            <div className="max-w-md mx-auto text-center py-12">
              <div className="flex justify-center items-end gap-[3px] h-16 mb-8">
                {WAVEFORM_HEIGHTS.slice(0, 16).map((h, i) => (
                  <div
                    key={i}
                    style={{
                      height: `${h}%`,
                      width: 6,
                      backgroundColor: "#FF8361",
                      borderRadius: 3,
                      animation: `waveBar ${0.5 + (i % 4) * 0.15}s ease-in-out infinite alternate`,
                      animationDelay: `${(i * 60) % 400}ms`,
                    }}
                  />
                ))}
                <style>{`
                  @keyframes waveBar {
                    from { transform: scaleY(0.4); }
                    to   { transform: scaleY(1); }
                  }
                `}</style>
              </div>
              <h2 className="font-heading text-2xl text-midnight mb-3">Composing your track…</h2>
              <div className="space-y-1.5 font-body text-sm" style={{ color: "rgba(3,31,61,0.55)" }}>
                <p>Analyzing your vibe ✓</p>
                <p>Writing your sound prompt ✓</p>
                <p>Generating with ElevenLabs AI…</p>
              </div>
              <p className="mt-6 font-mono text-xs uppercase tracking-widest" style={{ color: "rgba(3,31,61,0.4)" }}>
                This takes about 20 seconds
              </p>
            </div>
          )}

          {/* EMAIL GATE */}
          {stage === "email" && generatedTrack && (
            <div className="max-w-md mx-auto">
              <div
                className="rounded-3xl p-6 mb-6 text-center"
                style={{ background: VIBE_GRADIENTS[generatedTrack.vibe] }}
              >
                <div className="flex justify-center items-end gap-[3px] h-12 mb-4">
                  {WAVEFORM_HEIGHTS.slice(0, 20).map((h, i) => (
                    <div
                      key={i}
                      style={{
                        height: `${h}%`,
                        width: 4,
                        backgroundColor: "rgba(255,255,255,0.6)",
                        borderRadius: 2,
                      }}
                    />
                  ))}
                </div>

                <div
                  className="mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 1a8 8 0 100 16A8 8 0 009 1zm0 3a1 1 0 110 2 1 1 0 010-2zm1 9H8V8h2v5z" fill="white" />
                  </svg>
                </div>
                <p className="font-heading text-xl text-white mb-1">Your track is ready!</p>
                <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {generatedTrack.title}
                </p>
              </div>

              <div
                className="rounded-3xl border p-6"
                style={{ borderColor: "rgba(245,230,209,0.8)", backgroundColor: "white" }}
              >
                <p className="font-heading text-lg text-midnight mb-1">Enter your email to listen</p>
                <p className="font-body text-sm mb-5" style={{ color: "rgba(3,31,61,0.6)" }}>
                  Your track will also be shared with the Dumbo Health community — you can inspire other sleepers.
                </p>

                <form onSubmit={(e) => void submitEmail(e)}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-xl border px-4 py-3 font-body text-sm text-midnight placeholder-midnight/40 focus:outline-none focus:ring-2 focus:ring-peach mb-3"
                    style={{ borderColor: "rgba(245,230,209,0.8)", backgroundColor: "#FCF6ED" }}
                    required
                  />
                  {emailError && (
                    <p className="mb-3 font-body text-sm text-red-600">{emailError}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="w-full rounded-xl font-mono tracking-wider"
                    style={{ backgroundColor: "#FF8361", color: "white" }}
                  >
                    {isSaving ? "Saving…" : "▶ Play My Track"}
                  </Button>
                </form>

                <p className="mt-4 font-body text-xs text-center" style={{ color: "rgba(3,31,61,0.4)" }}>
                  No spam, ever. Just sleep care from Dumbo Health.
                </p>
              </div>
            </div>
          )}

          {/* PLAYER */}
          {stage === "player" && generatedTrack && (
            <div className="max-w-2xl mx-auto">
              {/* Hidden audio element */}
              <audio ref={audioRef} src={generatedTrack.audioUrl} />

              <div className="rounded-3xl overflow-hidden border" style={{ borderColor: "rgba(245,230,209,0.8)" }}>
                {/* Cover */}
                <div
                  className="h-40 flex items-end justify-between px-6 pb-5"
                  style={{ background: VIBE_GRADIENTS[generatedTrack.vibe] }}
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Now Playing
                    </p>
                    <p className="font-heading text-xl text-white">{generatedTrack.title}</p>
                    {savedTrackId && (
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>
                        ✓ Added to community
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}
                  >
                    {isPlaying ? (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="white">
                        <rect x="4" y="3" width="5" height="16" rx="1.5" />
                        <rect x="13" y="3" width="5" height="16" rx="1.5" />
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="white">
                        <path d="M6 3l14 8-14 8V3z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Controls */}
                <div className="px-6 py-5" style={{ backgroundColor: "#FCF6ED" }}>
                  <Waveform
                    isPlaying={isPlaying}
                    progress={duration > 0 ? currentTime / duration : 0}
                    color="#FF8361"
                  />

                  <div className="mt-2 flex justify-between font-mono text-[10px]" style={{ color: "rgba(3,31,61,0.5)" }}>
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>

                  <div className="mt-4 p-4 rounded-2xl" style={{ backgroundColor: "rgba(245,230,209,0.6)" }}>
                    <p className="font-mono text-[9px] uppercase tracking-widest mb-1.5" style={{ color: "#FF8361" }}>
                      AI Prompt
                    </p>
                    <p className="font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.7)" }}>
                      {generatedTrack.prompt}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button
                      onClick={() => void copyShareLink()}
                      variant="outline"
                      className="flex-1 rounded-xl font-mono tracking-wide text-sm"
                    >
                      {copied ? "✓ Copied!" : "Share Link"}
                    </Button>
                    <Button
                      asChild
                      className="flex-1 rounded-xl font-mono tracking-wide text-sm"
                      style={{ backgroundColor: "#FF8361", color: "white" }}
                    >
                      <a href="https://app.dumbo.health" target="_blank" rel="noopener noreferrer">
                        Explore Sleep Care
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStage("quiz");
                    setQuizStep(0);
                    setAnswers({ vibe: null, mood: null, bedtime: null, sleepStruggle: null });
                    setGeneratedTrack(null);
                    setEmail("");
                    setSavedTrackId(null);
                    setIsPlaying(false);
                    setCurrentTime(0);
                  }}
                  className="font-body text-sm"
                  style={{ color: "rgba(3,31,61,0.5)" }}
                >
                  Generate another track →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Community Feed ── */}
      <section style={{ backgroundColor: "#031F3D" }}>
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] mb-2" style={{ color: "#78BFBC" }}>
                Community
              </p>
              <h2 className="font-heading text-3xl text-white">Tracks made by our visitors</h2>
              <p className="mt-2 font-body" style={{ color: "rgba(252,246,237,0.6)" }}>
                Every track below was composed by someone just like you.
              </p>
            </div>
          </div>

          {communityLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-28" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
                  <div className="p-3" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                    <div className="h-3 rounded mb-2" style={{ backgroundColor: "rgba(255,255,255,0.08)", width: "75%" }} />
                    <div className="h-2 rounded" style={{ backgroundColor: "rgba(255,255,255,0.05)", width: "50%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : communityTracks.length === 0 ? (
            <div
              className="rounded-3xl border p-12 text-center"
              style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <p className="font-heading text-xl text-white mb-2">Be the first.</p>
              <p className="font-body" style={{ color: "rgba(252,246,237,0.55)" }}>
                Generate a track above and it will appear here for everyone to hear.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {communityTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  isPlaying={activeCommunityId === track.id && communityPlaying}
                  onPlay={() => playCommunityTrack(track)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section style={{ backgroundColor: "#FCF6ED" }}>
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] mb-3" style={{ color: "#FF8361" }}>
            Better sleep starts here
          </p>
          <h2 className="font-heading text-3xl text-midnight mb-4">
            Music helps. Treating the root cause helps more.
          </h2>
          <p className="font-body text-lg leading-8 mb-8" style={{ color: "rgba(3,31,61,0.65)" }}>
            If you&apos;re waking up tired despite good sleep habits, sleep apnea may be the missing piece.
            Dumbo Health makes it easy to find out — from home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="rounded-xl font-mono tracking-wider px-8" style={{ backgroundColor: "#FF8361", color: "white" }}>
              <a href="https://app.dumbo.health" target="_blank" rel="noopener noreferrer">
                Start Sleep Care
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-xl font-mono tracking-wider px-8">
              <Link href="/go/tools">Back to All Tools</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
