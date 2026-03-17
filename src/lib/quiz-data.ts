// ============================================================
// Dumbo Health — Quiz Data Layer (Supabase)
// Uses the existing project Supabase client
// ============================================================

import { createClient } from "@supabase/supabase-js";
import type {
  QuizFlow,
  QuizSection,
  QuizQuestion,
  RoutingRule,
  ResultsTemplate,
  QuizSubmission,
} from "@/types/quiz";

// Reuse the same project Supabase config (NEXT_PUBLIC_ vars for client-side use)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function fetchQuizFlow(flowSlug: string): Promise<{
  flow: QuizFlow;
  sections: QuizSection[];
  questions: QuizQuestion[];
  rules: RoutingRule[];
  templates: ResultsTemplate[];
} | null> {
  const { data: flow, error: flowError } = await supabase
    .from("quiz_flows")
    .select("*")
    .eq("slug", flowSlug)
    .eq("is_active", true)
    .single();

  if (flowError || !flow) return null;

  const [{ data: sections }, { data: questions }, { data: rules }, { data: templates }] =
    await Promise.all([
      supabase.from("quiz_sections").select("*").eq("flow_id", flow.id).order("position", { ascending: true }),
      supabase.from("quiz_questions").select("*").eq("flow_id", flow.id).order("position", { ascending: true }),
      supabase.from("routing_rules").select("*").eq("flow_id", flow.id).order("priority", { ascending: false }),
      supabase.from("results_templates").select("*").eq("flow_id", flow.id).eq("is_active", true).order("priority", { ascending: false }),
    ]);

  const sectionOrder = new Map((sections || []).map((s: QuizSection) => [s.id, s.position]));
  const sortedQuestions = (questions || []).sort((a: QuizQuestion, b: QuizQuestion) => {
    const diff = (sectionOrder.get(a.section_id) || 0) - (sectionOrder.get(b.section_id) || 0);
    return diff !== 0 ? diff : a.position - b.position;
  });

  return {
    flow: flow as QuizFlow,
    sections: (sections || []) as QuizSection[],
    questions: sortedQuestions as QuizQuestion[],
    rules: (rules || []) as RoutingRule[],
    templates: (templates || []) as ResultsTemplate[],
  };
}

export async function submitQuiz(submission: QuizSubmission): Promise<{ id: string } | null> {
  const res = await fetch("/api/quiz/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  }).catch(() => null);
  if (!res || !res.ok) return null;
  return { id: "submitted" };
}

export async function fetchABTest(flowId: string): Promise<{
  name: string;
  variants: Array<{ name: string; weight: number; description: string }>;
} | null> {
  const { data, error } = await supabase
    .from("quiz_ab_tests")
    .select("*")
    .eq("flow_id", flowId)
    .eq("is_active", true)
    .single();
  if (error || !data) return null;
  return { name: data.name, variants: data.variants };
}
