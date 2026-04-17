import { createAdminClient } from "@/lib/supabase-admin";
import LaunchStatesEditor from "./LaunchStatesEditor";

export const dynamic = "force-dynamic";

export default async function LaunchStatesPage() {
  const sb = createAdminClient();
  const { data: states, error: statesError } = await sb
    .from("launch_states")
    .select("state_code, state_name, is_active")
    .order("state_name", { ascending: true });

  if (statesError) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Launch States</h1>
        <p className="text-sm text-red-500">Error loading states: {statesError.message}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Launch States</h1>
        <p className="text-sm text-gray-500 mt-1">
          States where Dumbo Health is currently live. Active states are marked as eligible in Submissions.
        </p>
      </div>

      <LaunchStatesEditor states={states ?? []} />
    </div>
  );
}
