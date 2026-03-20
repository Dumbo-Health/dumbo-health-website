"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { EMAIL_CAPTURE_STORAGE_KEY, submitEmailCapture } from "@/lib/emailCapture";

export interface EmailCaptureBlockProps {
  heading?: string;
  description?: string;
  successHeadline?: string;
  successMessage?: string;
  sessionId?: string | null;
  sourceUrl?: string;
  metadata?: Record<string, unknown>;
  onSuccess?: () => void;
}

export default function EmailCaptureBlock({
  heading = "Stay Updated on Better Sleep",
  description = "Share your email to unlock personalized insights and expert tips for better rest.",
  successHeadline = "Thank you!",
  successMessage = "We will reach out with sleep tips tailored for you soon.",
  sessionId = null,
  sourceUrl,
  metadata,
  onSuccess,
}: EmailCaptureBlockProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [emailInput, setEmailInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const originalOverflowRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (typeof document !== "undefined" && originalOverflowRef.current !== null) {
        document.body.style.overflow = originalOverflowRef.current;
        originalOverflowRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (originalOverflowRef.current === null) {
      originalOverflowRef.current = document.body.style.overflow;
    }
    document.body.style.overflow = "hidden";

    return () => {
      if (originalOverflowRef.current !== null) {
        document.body.style.overflow = originalOverflowRef.current;
        originalOverflowRef.current = null;
      }
    };
  }, []);

  const resolvedSourceUrl = useMemo(() => {
    if (sourceUrl) return sourceUrl;
    if (typeof window !== "undefined") return window.location.href;
    return undefined;
  }, [sourceUrl]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = emailInput.trim();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      await submitEmailCapture({
        email: trimmedEmail,
        sessionId,
        sourceUrl: resolvedSourceUrl,
        metadata: {
          ...metadata,
          component: "EmailCaptureBlock",
        },
      });

      if (typeof window !== "undefined") {
        window.localStorage.setItem(EMAIL_CAPTURE_STORAGE_KEY, "true");
      }

      setStatus("success");
      setEmailInput("");
      onSuccess?.();
    } catch (error) {
      setStatus("idle");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to save your email right now. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1a35]/80 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        {status === "success" ? (
          <div className="space-y-3 text-center">
            <h3 className="font-heading text-2xl text-midnight">{successHeadline}</h3>
            <p className="font-body text-sm text-midnight/70">{successMessage}</p>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2 text-center">
              <h3 className="font-heading text-2xl text-midnight">{heading}</h3>
              <p className="font-body text-sm text-midnight/70">{description}</p>
            </div>

            <div className="space-y-3">
              <input
                type="email"
                value={emailInput}
                onChange={(event) => {
                  setEmailInput(event.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={status === "submitting"}
              />

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Submitting..." : "Unlock Full Access"}
              </button>
            </div>

            {errorMessage && (
              <p className="text-center text-sm text-red-500">{errorMessage}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
