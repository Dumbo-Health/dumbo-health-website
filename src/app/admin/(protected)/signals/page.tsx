import { createAdminClient } from "@/lib/supabase-admin";
import SignalCopyEditor from "./SignalCopyEditor";

export const dynamic = "force-dynamic";

export default async function SignalsPage() {
  const sb = createAdminClient();
  const { data: signals } = await sb
    .from("quiz_signal_copy")
    .select("id, signal_key, label, detail, icon_path")
    .order("signal_key");

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Signal Copy</h1>
        <p className="text-sm text-gray-500 mt-1">Edit the label and detail text shown for each signal in quiz results.</p>
      </div>
      <SignalCopyEditor signals={signals ?? []} />
    </div>
  );
}
