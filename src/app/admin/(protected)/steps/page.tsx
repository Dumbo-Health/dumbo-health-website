import { createAdminClient } from "@/lib/supabase-admin";
import StepsEditor from "./StepsEditor";

export const dynamic = "force-dynamic";

export default async function StepsPage() {
  const sb = createAdminClient();
  const { data: steps } = await sb
    .from("quiz_result_steps")
    .select("id, flow_slug, step_order, title, body")
    .order("flow_slug")
    .order("step_order");

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">What Happens Next — Steps</h1>
        <p className="text-sm text-gray-500 mt-1">Edit the step-by-step process shown after quiz results.</p>
      </div>
      <StepsEditor steps={steps ?? []} />
    </div>
  );
}
