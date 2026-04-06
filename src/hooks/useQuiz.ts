// ============================================================
// Dumbo Health — Quiz State Hook
// ============================================================

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type {
  QuizState,
  QuizSection,
  QuizQuestion,
  ResultsTemplate,
} from "@/types/quiz";
import { processRules, getNextQuestionIndex, assembleResults } from "@/lib/quiz-engine";
import { fetchQuizFlow, submitQuiz } from "@/lib/quiz-data";

export function useQuiz(initialFlowSlug: string) {
  const [state, setState] = useState<QuizState>({
    flowSlug: initialFlowSlug,
    currentQuestionIndex: 0,
    answers: {},
    tags: [],
    riskScore: 0,
    sections: [],
    questions: [],
    rules: [],
    skippedSections: [],
    isComplete: false,
    isLoading: true,
  });

  const [templates, setTemplates] = useState<ResultsTemplate[]>([]);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  // ── Funnel tracking refs ─────────────────────────────────────────────────────
  // Stable refs so beforeunload handler always sees the latest values
  const sessionIdRef = useRef<string>("");
  const routePathRef = useRef<string[]>([]);
  const stateRef = useRef(state);
  useEffect(() => { stateRef.current = state; });

  // Initialize session ID from sessionStorage (persists within browser session)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = sessionStorage.getItem("quiz_session_id");
    const id = stored ?? (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36));
    if (!stored) sessionStorage.setItem("quiz_session_id", id);
    sessionIdRef.current = id;
  }, []);

  // Fire-and-forget tracking call — never throws, never blocks
  const track = useCallback((event: string, extra: Record<string, unknown> = {}) => {
    if (typeof window === "undefined" || !sessionIdRef.current) return;
    const s = stateRef.current;
    fetch("/api/quiz/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionIdRef.current,
        event,
        flow_slug: s.flowSlug,
        device_type: window.innerWidth < 768 ? "mobile" : "desktop",
        utm_source: sessionStorage.getItem("utm_source"),
        ...extra,
      }),
    }).catch(() => {});
  }, []); // stable — reads only from refs

  // Register beforeunload beacon once — sends abandoned event if quiz not completed
  useEffect(() => {
    const handleUnload = () => {
      const s = stateRef.current;
      if (s.isComplete || !sessionIdRef.current || typeof window === "undefined") return;
      const cq = s.questions[s.currentQuestionIndex];
      const sec = cq ? s.sections.find((sc) => sc.id === cq.section_id) : null;
      navigator.sendBeacon(
        "/api/quiz/track",
        new Blob(
          [JSON.stringify({
            session_id: sessionIdRef.current,
            event: "abandoned",
            flow_slug: s.flowSlug,
            question_slug: cq?.slug ?? null,
            question_index: s.currentQuestionIndex,
            section_slug: sec?.slug ?? null,
            route_path: routePathRef.current,
            device_type: window.innerWidth < 768 ? "mobile" : "desktop",
            utm_source: sessionStorage.getItem("utm_source"),
          })],
          { type: "application/json" }
        )
      );
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []); // register once — reads from refs

  // ── Capture UTMs to sessionStorage on first load ─────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
      const val = params.get(key);
      if (val) sessionStorage.setItem(key, val);
    });
  }, []);

  // Sync external flowSlug changes (e.g. user picks a different path)
  useEffect(() => {
    setState((prev) => {
      if (prev.flowSlug === initialFlowSlug) return prev;
      return {
        ...prev,
        flowSlug: initialFlowSlug,
        currentQuestionIndex: 0,
        answers: {},
        tags: [],
        riskScore: 0,
        sections: [],
        questions: [],
        rules: [],
        skippedSections: [],
        isComplete: false,
        isLoading: true,
      };
    });
  }, [initialFlowSlug]);

  useEffect(() => {
    async function load() {
      setState((prev) => ({ ...prev, isLoading: true }));
      const data = await fetchQuizFlow(state.flowSlug);
      if (data) {
        setState((prev) => ({
          ...prev,
          sections: data.sections,
          questions: data.questions,
          rules: data.rules,
          isLoading: false,
          currentQuestionIndex: 0,
        }));
        setTemplates(data.templates);
        // Reset route path on flow load, then fire started
        routePathRef.current = [];
        track("started");
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    }
    load();
  }, [state.flowSlug, track]);

  const currentQuestion: QuizQuestion | null = state.questions[state.currentQuestionIndex] || null;

  const currentSection: QuizSection | null = currentQuestion
    ? state.sections.find((s) => s.id === currentQuestion.section_id) || null
    : null;

  const prevQuestion: QuizQuestion | null =
    state.currentQuestionIndex > 0 ? state.questions[state.currentQuestionIndex - 1] : null;
  const prevSection: QuizSection | null = prevQuestion
    ? state.sections.find((s) => s.id === prevQuestion.section_id) || null
    : null;
  const isNewSection = !!(currentSection && prevSection && currentSection.id !== prevSection.id);

  const progress =
    state.questions.length > 0
      ? Math.round((state.currentQuestionIndex / state.questions.length) * 100)
      : 0;

  const answerQuestion = useCallback(
    (answer: string | string[]) => {
      if (!currentQuestion) return;

      // Track this step before state changes
      const sectionSlug = state.sections.find((s) => s.id === currentQuestion.section_id)?.slug ?? null;
      track("step_completed", {
        question_slug: currentQuestion.slug,
        question_index: state.currentQuestionIndex,
        section_slug: sectionSlug,
      });

      // Accumulate route path
      if (!routePathRef.current.includes(currentQuestion.slug)) {
        routePathRef.current = [...routePathRef.current, currentQuestion.slug];
      }

      setState((prev) => {
        const newAnswers = { ...prev.answers, [currentQuestion.slug]: answer };
        const { tagsToAdd, scoreToAdd, skipToSection, skipToQuestion, redirectFlow, endFlow } =
          processRules(prev.rules, currentQuestion.id, answer);

        const newTags = [...new Set([...prev.tags, ...tagsToAdd])];
        const newScore = prev.riskScore + scoreToAdd;

        if (redirectFlow) {
          return { ...prev, answers: newAnswers, tags: newTags, riskScore: newScore, flowSlug: redirectFlow, currentQuestionIndex: 0 };
        }
        if (endFlow) {
          return { ...prev, answers: newAnswers, tags: newTags, riskScore: newScore, isComplete: true };
        }

        let newSkippedSections = [...prev.skippedSections];
        if (skipToSection) {
          const currentIdx = prev.sections.findIndex((s) => s.id === currentQuestion.section_id);
          const targetIdx = prev.sections.findIndex((s) => s.slug === skipToSection);
          if (targetIdx > currentIdx) {
            for (let i = currentIdx + 1; i < targetIdx; i++) {
              newSkippedSections.push(prev.sections[i].slug);
            }
          }
        }

        const nextIndex = getNextQuestionIndex(
          prev.currentQuestionIndex,
          prev.questions,
          prev.sections,
          skipToSection,
          skipToQuestion,
          newSkippedSections
        );

        return {
          ...prev,
          answers: newAnswers,
          tags: newTags,
          riskScore: newScore,
          skippedSections: newSkippedSections,
          currentQuestionIndex: nextIndex,
          isComplete: nextIndex >= prev.questions.length,
        };
      });
    },
    [currentQuestion, state.currentQuestionIndex, state.sections, track]
  );

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.currentQuestionIndex <= 0) return prev;
      return { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1, isComplete: false };
    });
  }, []);

  const submitResults = useCallback(async (contactDetails?: { first_name?: string; last_name?: string; phone?: string }) => {
    const stateAnswer = state.answers["state"] || state.answers["state-dx"] || null;
    const insuranceAnswer = state.answers["insurance-type"] || state.answers["insurance-type-dx"] || null;
    const emailAnswer = state.answers["email"] || state.answers["email-dx"] || null;
    const result = await submitQuiz({
      flow_slug: state.flowSlug,
      answers: state.answers,
      tags: state.tags,
      risk_score: state.riskScore,
      state: stateAnswer as string | null,
      insurance: insuranceAnswer as string | null,
      email: (emailAnswer as string) || null,
      device_type: typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop",
      utm_source: typeof window !== "undefined" ? (sessionStorage.getItem("utm_source") || new URLSearchParams(window.location.search).get("utm_source")) : null,
      utm_medium: typeof window !== "undefined" ? (sessionStorage.getItem("utm_medium") || new URLSearchParams(window.location.search).get("utm_medium")) : null,
      utm_campaign: typeof window !== "undefined" ? (sessionStorage.getItem("utm_campaign") || new URLSearchParams(window.location.search).get("utm_campaign")) : null,
      first_name: contactDetails?.first_name || null,
      last_name: contactDetails?.last_name || null,
      phone: contactDetails?.phone || null,
    });
    if (result) {
      setSubmissionId(result.id);
      track("completed");
    }
    return result;
  }, [state, track]);

  const getResults = useCallback(() => {
    const stateAnswer = state.answers["state"] || state.answers["state-dx"] || null;
    return assembleResults(templates, {
      riskScore: state.riskScore,
      tags: state.tags,
      state: stateAnswer as string | null,
    });
  }, [state, templates]);

  return {
    state,
    currentQuestion,
    currentSection,
    isNewSection,
    progress,
    submissionId,
    answerQuestion,
    goBack,
    submitResults,
    getResults,
  };
}
