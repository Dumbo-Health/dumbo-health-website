import { createAdminClient } from "@/lib/supabase-admin";
import RulesEditor from "./RulesEditor";

export const dynamic = "force-dynamic";

export default async function RulesPage() {
  const sb = createAdminClient();

  const [{ data: questions }, { data: rules }] = await Promise.all([
    sb.from("quiz_questions").select("id, slug, question_text"),
    sb.from("routing_rules")
      .select("id, flow_id, source_question_id, condition, action_type, action_value, priority")
      .order("priority"),
  ]);

  const questionMap = Object.fromEntries((questions ?? []).map((q) => [q.id, q]));

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Routing Rules</h1>
        <p className="text-sm text-gray-500 mt-1">Control how answers route users through the quiz — skips, redirects, scores, and tags.</p>
      </div>
      <RulesEditor rules={rules ?? []} questionMap={questionMap} />
    </div>
  );
}
