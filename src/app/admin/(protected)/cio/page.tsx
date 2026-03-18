import { createAdminClient } from "@/lib/supabase-admin";
import CioEditor from "./CioEditor";

export const dynamic = "force-dynamic";

export default async function CioPage() {
  const sb = createAdminClient();
  const { data: attrs, error } = await sb
    .from("cio_attribute_config")
    .select("key, label, description, source, example_values, enabled")
    .order("key");

  if (error?.message.includes("does not exist")) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">CIO Attributes</h1>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
          <p className="font-medium mb-1">Table not created yet.</p>
          <p>Run <code className="font-mono bg-amber-100 px-1 rounded">supabase/migrations/003_cio_attribute_config.sql</code> in the Supabase SQL Editor to set up this table.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">CIO Attributes</h1>
        <p className="text-sm text-gray-500 mt-1">
          Every attribute sent to Customer.io on quiz completion. Toggle fields on or off, and edit labels and descriptions.
        </p>
      </div>
      <CioEditor attrs={attrs ?? []} />
    </div>
  );
}
