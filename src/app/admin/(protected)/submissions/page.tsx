import { createAdminClient } from "@/lib/supabase-admin";
import SubmissionsTable, { type SubmissionRow, type QuestionMeta } from "./SubmissionsTable";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const sb = createAdminClient();

  const [{ data: submissions, error }, { data: allQuestions }] = await Promise.all([
    sb
      .from("quiz_submissions")
      .select(
        "id, created_at, email, flow_slug, risk_score, state, device_type, utm_source, utm_campaign, answers, tags"
      )
      .order("created_at", { ascending: false })
      .limit(200),
    sb
      .from("quiz_questions")
      .select("slug, question_text, options")
      .order("position", { ascending: true }),
  ]);

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Submissions</h1>
        <p className="text-sm text-red-500">Error loading submissions: {error.message}</p>
      </div>
    );
  }

  const rows = (submissions ?? []) as SubmissionRow[];
  const questions = (allQuestions ?? []) as QuestionMeta[];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Submissions</h1>
        <p className="text-sm text-gray-500 mt-1">
          Last 200 quiz completions. Click any row to see full responses.
        </p>
      </div>
      <SubmissionsTable rows={rows} questions={questions} />
      <p className="text-xs text-gray-400 mt-2">{rows.length} submissions shown</p>
    </div>
  );
}
