"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase-admin";

// ── Questions ────────────────────────────────────────────────────────────────

export async function updateQuestion(id: string, data: { text: string }) {
  const sb = createAdminClient();
  const { error } = await sb
    .from("quiz_questions")
    .update({ question_text: data.text })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/questions");
}

export async function updateAnswerOption(
  questionId: string,
  options: { value: string; label: string }[]
) {
  const sb = createAdminClient();
  const { error } = await sb
    .from("quiz_questions")
    .update({ options })
    .eq("id", questionId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/questions");
}

// ── Rules ─────────────────────────────────────────────────────────────────────

export async function updateRule(
  id: string,
  data: {
    condition: Record<string, unknown>;
    action_type: string;
    action_value: Record<string, unknown>;
  }
) {
  const sb = createAdminClient();
  const { error } = await sb.from("routing_rules").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/rules");
}

// ── Results templates ─────────────────────────────────────────────────────────

export async function updateResultsTemplate(
  id: string,
  data: { title: string; body: string; cta_label: string | null; cta_url: string | null }
) {
  const sb = createAdminClient();
  const { error } = await sb.from("results_templates").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/results");
}

// ── Results template bullets ──────────────────────────────────────────────────

export async function updateResultsTemplateBullets(
  id: string,
  bullets: string[]
) {
  const sb = createAdminClient();
  const { error } = await sb
    .from("results_templates")
    .update({ bullets })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/results");
}

// ── Steps ─────────────────────────────────────────────────────────────────────

export async function updateResultStep(
  id: string,
  data: { title: string; body: string }
) {
  const sb = createAdminClient();
  const { error } = await sb
    .from("quiz_result_steps")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/steps");
}

// ── Signal copy ───────────────────────────────────────────────────────────────

export async function updateSignalCopy(
  id: string,
  data: { label: string; detail: string }
) {
  const sb = createAdminClient();
  const { error } = await sb
    .from("quiz_signal_copy")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/signals");
}

// ── CIO attributes ────────────────────────────────────────────────────────────

export async function updateCioAttribute(
  key: string,
  data: { label: string; description: string; enabled: boolean }
) {
  const sb = createAdminClient();
  const { error } = await sb
    .from("cio_attribute_config")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("key", key);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/cio");
}
