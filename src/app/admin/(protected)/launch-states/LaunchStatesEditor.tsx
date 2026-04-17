"use client";

import { useState, useTransition } from "react";
import { saveLaunchStates } from "./actions";

const MIDNIGHT = "#031F3D";

type State = {
  state_code: string;
  state_name: string;
  is_active: boolean;
};

type Feedback = { type: "success" | "error"; message: string };

export default function LaunchStatesEditor({ states }: { states: State[] }) {
  // dirty tracks only the delta: stateCode → intended new value
  const [dirty, setDirty] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const dirtyCount = Object.keys(dirty).length;

  function getActive(state: State): boolean {
    return state.state_code in dirty ? dirty[state.state_code] : state.is_active;
  }

  function handleToggle(stateCode: string, originalActive: boolean) {
    const currentActive = stateCode in dirty ? dirty[stateCode] : originalActive;
    const next = !currentActive;
    setFeedback(null);
    setDirty((prev) => {
      // If toggling back to original value, remove from dirty map (no change)
      if (next === originalActive) {
        return Object.fromEntries(Object.entries(prev).filter(([k]) => k !== stateCode));
      }
      return { ...prev, [stateCode]: next };
    });
  }

  function handleDiscard() {
    setDirty({});
    setFeedback(null);
  }

  function handleSave() {
    const changes = Object.entries(dirty).map(([stateCode, isActive]) => ({
      stateCode,
      isActive,
    }));
    startTransition(async () => {
      const result = await saveLaunchStates(changes);
      if (result.success) {
        setDirty({});
        setFeedback({
          type: "success",
          message: `${changes.length} state${changes.length !== 1 ? "s" : ""} saved.`,
        });
      } else {
        setFeedback({
          type: "error",
          message: result.error ?? "Something went wrong. Please try again.",
        });
      }
    });
  }

  const effectiveActiveCount = states.filter((s) => getActive(s)).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs" style={{ color: MIDNIGHT, opacity: 0.45 }}>
          {effectiveActiveCount} state{effectiveActiveCount !== 1 ? "s" : ""} active
          {dirtyCount > 0 && (
            <span className="ml-2 text-amber-600">
              · {dirtyCount} unsaved change{dirtyCount !== 1 ? "s" : ""}
            </span>
          )}
        </p>

        {dirtyCount > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDiscard}
              disabled={isPending}
              className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50 transition-colors"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              disabled={isPending}
              className="text-xs px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              {isPending ? "Saving…" : `Save changes (${dirtyCount})`}
            </button>
          </div>
        )}
      </div>

      {feedback && (
        <div
          className={`mb-4 text-xs px-3 py-2 rounded-md border ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {states.map((state) => {
          const active = getActive(state);
          const isDirty = state.state_code in dirty;
          return (
            <button
              key={state.state_code}
              onClick={() => handleToggle(state.state_code, state.is_active)}
              disabled={isPending}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg border text-left transition-colors disabled:opacity-60 ${
                active
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
              } ${isDirty ? "ring-1 ring-amber-300" : ""}`}
            >
              <div>
                <p className="text-xs font-semibold font-mono">{state.state_code}</p>
                <p className="text-xs mt-0.5 leading-tight">{state.state_name}</p>
              </div>
              <div
                className={`w-3 h-3 rounded-full shrink-0 ml-2 ${
                  active ? "bg-emerald-500" : "bg-gray-300"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
