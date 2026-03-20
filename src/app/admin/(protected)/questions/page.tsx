import { createAdminClient } from "@/lib/supabase-admin";
import QuestionsEditor from "./QuestionsEditor";

export const dynamic = "force-dynamic";

export default async function QuestionsPage() {
  const sb = createAdminClient();

  const [{ data: flows }, { data: sections }, { data: questions }] = await Promise.all([
    sb.from("quiz_flows").select("id, slug, title").order("slug"),
    sb.from("quiz_sections").select("id, flow_id, slug, title, subtitle, position").order("position"),
    sb.from("quiz_questions")
      .select("id, section_id, slug, question_text, answer_type, options, position, is_required")
      .order("position"),
  ]);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Questions</h1>
        <p className="text-sm text-gray-500 mt-1">Edit question copy and answer option labels for the /get-started quiz.</p>
      </div>
      <QuestionsEditor
        flows={flows ?? []}
        sections={sections ?? []}
        questions={questions ?? []}
      />
    </div>
  );
}
