"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase-admin";

// Auth is enforced by the (protected) layout — consistent with all other admin server actions.

export async function saveLaunchStates(
  changes: { stateCode: string; isActive: boolean }[]
): Promise<{ success: boolean; error?: string }> {
  if (changes.length === 0) return { success: true };

  const sb = createAdminClient();

  const results = await Promise.all(
    changes.map(({ stateCode, isActive }) =>
      sb.from("launch_states").update({ is_active: isActive }).eq("state_code", stateCode)
    )
  );

  const failed = results.filter((r) => r.error);
  if (failed.length > 0) {
    return {
      success: false,
      error: `Failed to update ${failed.length} state${failed.length !== 1 ? "s" : ""}. Please try again.`,
    };
  }

  revalidatePath("/admin/launch-states");
  revalidatePath("/admin/submissions");
  return { success: true };
}
