import { Suspense } from "react";
import { createAdminClient } from "@/lib/supabase-admin";
import SubmissionsTable, { type SubmissionRow, type QuestionMeta } from "./SubmissionsTable";
import SubmissionsFilters from "./SubmissionsFilters";
import SubmissionsSummary from "./SubmissionsSummary";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

type SearchParams = {
  page?: string;
  search?: string;
  flow?: string;
  risk?: string;
  eligible?: string;
  checkout?: string;
  dateFrom?: string;
  dateTo?: string;
};

function getRiskRange(risk: string): { gte?: number; lt?: number } | null {
  if (risk === "high") return { gte: 6 };
  if (risk === "moderate") return { gte: 3, lt: 6 };
  if (risk === "low") return { lt: 3 };
  return null;
}

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sb = createAdminClient();
  const params = await searchParams;

  // Fetch active launch states from DB (editable via /admin/launch-states)
  const { data: launchStatesData } = await sb
    .from("launch_states")
    .select("state_code")
    .eq("is_active", true);
  const LAUNCH_STATES = (launchStatesData ?? []).map((r) => r.state_code);

  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { search, flow, risk, eligible, checkout, dateFrom, dateTo } = params;

  // ── Main paginated query ────────────────────────────────────────────────────
  let query = sb
    .from("quiz_submissions")
    .select(
      "id, created_at, email, flow_slug, risk_score, state, device_type, utm_source, utm_campaign, answers, tags, checkout_cta_clicked_at",
      { count: "exact" }
    )
    .order("created_at", { ascending: false });

  if (search) query = query.ilike("email", `%${search}%`);
  if (flow) query = query.eq("flow_slug", flow);
  if (risk) {
    const range = getRiskRange(risk);
    if (range?.gte !== undefined) query = query.gte("risk_score", range.gte);
    if (range?.lt !== undefined) query = query.lt("risk_score", range.lt);
  }
  if (eligible === "yes") query = query.in("state", LAUNCH_STATES);
  else if (eligible === "no" && LAUNCH_STATES.length > 0)
    query = query.not("state", "in", `(${LAUNCH_STATES.join(",")})`);
  if (checkout === "clicked") query = query.not("checkout_cta_clicked_at", "is", null);
  else if (checkout === "not_clicked") query = query.is("checkout_cta_clicked_at", null);
  if (dateFrom) query = query.gte("created_at", dateFrom);
  if (dateTo) query = query.lte("created_at", `${dateTo}T23:59:59.999Z`);
  query = query.range(from, to);

  // ── Summary stat queries (full filtered set, no pagination) ─────────────────
  // These intentionally omit their own dimension's filter so the stat is
  // always meaningful (e.g. checkout count ignores the checkout filter).

  // Checkout clicked — within current filter set (excluding checkout filter)
  let checkoutCountQ = sb
    .from("quiz_submissions")
    .select("*", { count: "exact", head: true })
    .not("checkout_cta_clicked_at", "is", null);
  if (search) checkoutCountQ = checkoutCountQ.ilike("email", `%${search}%`);
  if (flow) checkoutCountQ = checkoutCountQ.eq("flow_slug", flow);
  if (risk) {
    const r = getRiskRange(risk);
    if (r?.gte !== undefined) checkoutCountQ = checkoutCountQ.gte("risk_score", r.gte);
    if (r?.lt !== undefined) checkoutCountQ = checkoutCountQ.lt("risk_score", r.lt);
  }
  if (eligible === "yes") checkoutCountQ = checkoutCountQ.in("state", LAUNCH_STATES);
  else if (eligible === "no" && LAUNCH_STATES.length > 0)
    checkoutCountQ = checkoutCountQ.not("state", "in", `(${LAUNCH_STATES.join(",")})`);
  if (dateFrom) checkoutCountQ = checkoutCountQ.gte("created_at", dateFrom);
  if (dateTo) checkoutCountQ = checkoutCountQ.lte("created_at", `${dateTo}T23:59:59.999Z`);

  // Eligible states — within current filter set (excluding eligible filter)
  let eligibleCountQ = sb
    .from("quiz_submissions")
    .select("*", { count: "exact", head: true })
    .in("state", LAUNCH_STATES);
  if (search) eligibleCountQ = eligibleCountQ.ilike("email", `%${search}%`);
  if (flow) eligibleCountQ = eligibleCountQ.eq("flow_slug", flow);
  if (risk) {
    const r = getRiskRange(risk);
    if (r?.gte !== undefined) eligibleCountQ = eligibleCountQ.gte("risk_score", r.gte);
    if (r?.lt !== undefined) eligibleCountQ = eligibleCountQ.lt("risk_score", r.lt);
  }
  if (checkout === "clicked") eligibleCountQ = eligibleCountQ.not("checkout_cta_clicked_at", "is", null);
  else if (checkout === "not_clicked") eligibleCountQ = eligibleCountQ.is("checkout_cta_clicked_at", null);
  if (dateFrom) eligibleCountQ = eligibleCountQ.gte("created_at", dateFrom);
  if (dateTo) eligibleCountQ = eligibleCountQ.lte("created_at", `${dateTo}T23:59:59.999Z`);

  // High risk — within current filter set (excluding risk filter)
  let highRiskCountQ = sb
    .from("quiz_submissions")
    .select("*", { count: "exact", head: true })
    .gte("risk_score", 6);
  if (search) highRiskCountQ = highRiskCountQ.ilike("email", `%${search}%`);
  if (flow) highRiskCountQ = highRiskCountQ.eq("flow_slug", flow);
  if (eligible === "yes") highRiskCountQ = highRiskCountQ.in("state", LAUNCH_STATES);
  else if (eligible === "no" && LAUNCH_STATES.length > 0)
    highRiskCountQ = highRiskCountQ.not("state", "in", `(${LAUNCH_STATES.join(",")})`);
  if (checkout === "clicked") highRiskCountQ = highRiskCountQ.not("checkout_cta_clicked_at", "is", null);
  else if (checkout === "not_clicked") highRiskCountQ = highRiskCountQ.is("checkout_cta_clicked_at", null);
  if (dateFrom) highRiskCountQ = highRiskCountQ.gte("created_at", dateFrom);
  if (dateTo) highRiskCountQ = highRiskCountQ.lte("created_at", `${dateTo}T23:59:59.999Z`);

  const [
    { data: submissions, error, count },
    { data: allQuestions },
    { count: checkoutCount },
    { count: eligibleCount },
    { count: highRiskCount },
  ] = await Promise.all([
    query,
    sb
      .from("quiz_questions")
      .select("slug, question_text, options")
      .order("position", { ascending: true }),
    checkoutCountQ,
    eligibleCountQ,
    highRiskCountQ,
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
  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Submissions</h1>
        <p className="text-sm text-gray-500 mt-1">
          Quiz completions. Click any row to see full responses.
        </p>
      </div>

      <SubmissionsSummary
        totalCount={totalCount}
        checkoutCount={checkoutCount ?? 0}
        eligibleCount={eligibleCount ?? 0}
        highRiskCount={highRiskCount ?? 0}
      />

      <Suspense fallback={null}>
        <SubmissionsFilters totalCount={totalCount} />
      </Suspense>

      <Suspense fallback={null}>
        <SubmissionsTable
          rows={rows}
          questions={questions}
          page={page}
          totalPages={totalPages}
          totalCount={totalCount}
        />
      </Suspense>
    </div>
  );
}
