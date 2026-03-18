import { createAdminClient } from "@/lib/supabase-admin";
import ResultsEditor from "./ResultsEditor";

export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  const sb = createAdminClient();

  const [{ data: flows }, { data: templates }] = await Promise.all([
    sb.from("quiz_flows").select("id, slug, title"),
    sb.from("results_templates")
      .select("id, flow_id, block_type, title, body, cta_label, cta_url, conditions, priority, is_active, bullets")
      .order("priority"),
  ]);

  const flowMap = Object.fromEntries((flows ?? []).map((f) => [f.id, f]));

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Results Templates</h1>
        <p className="text-sm text-gray-500 mt-1">Edit the heading, description, and CTA copy shown at the end of the quiz.</p>
      </div>
      <ResultsEditor templates={templates ?? []} flowMap={flowMap} />
    </div>
  );
}
