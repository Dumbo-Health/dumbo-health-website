import { createAdminClient } from "@/lib/supabase-admin";
import AnalyticsDashboard from "./AnalyticsDashboard";
import type { AnalyticsData, FlowStats } from "./AnalyticsDashboard";

export const dynamic = "force-dynamic";

type RawSubmission = {
  flow_slug: string;
  answers: Record<string, unknown>;
  tags: string[];
  risk_score: number;
  device_type: string;
  state: string | null;
  created_at: string;
};

type RawQuestion = {
  slug: string;
  question_text: string;
  answer_type: string;
  options: { label: string; value: string }[];
  flow_id: string;
};

type RawFlow = { id: string; slug: string };

function aggregateFlow(
  submissions: RawSubmission[],
  flowSlug: string,
  questions: RawQuestion[]
): FlowStats {
  const flowSubs = submissions.filter((s) => s.flow_slug === flowSlug);

  // Build answer counts per question slug
  const counts: Record<string, Record<string, number>> = {};
  for (const sub of flowSubs) {
    for (const [qSlug, answer] of Object.entries(sub.answers)) {
      if (!counts[qSlug]) counts[qSlug] = {};
      const values = Array.isArray(answer) ? answer : [answer];
      for (const v of values) {
        if (typeof v === "string" && v.length > 0) {
          counts[qSlug][v] = (counts[qSlug][v] || 0) + 1;
        }
      }
    }
  }

  const questionStats = questions
    .filter((q) => q.answer_type !== "text_input" && q.answer_type !== "dropdown")
    .map((q) => {
      const optionMap = new Map(q.options.map((o) => [o.value, o.label]));
      const qCounts = counts[q.slug] || {};
      const answers = Object.entries(qCounts)
        .map(([value, count]) => ({
          value,
          label: optionMap.get(value) ?? value,
          count,
        }))
        .sort((a, b) => b.count - a.count);
      return { slug: q.slug, question_text: q.question_text, answers };
    })
    .filter((q) => q.answers.length > 0);

  // Tags aggregation
  const tagCounts: Record<string, number> = {};
  for (const sub of flowSubs) {
    for (const tag of sub.tags ?? []) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  // Risk score buckets
  const riskBuckets = { low: 0, moderate: 0, high: 0 };
  for (const sub of flowSubs) {
    if (sub.risk_score >= 6) riskBuckets.high++;
    else if (sub.risk_score >= 3) riskBuckets.moderate++;
    else riskBuckets.low++;
  }

  // Device split
  const deviceCounts: Record<string, number> = {};
  for (const sub of flowSubs) {
    const d = sub.device_type ?? "unknown";
    deviceCounts[d] = (deviceCounts[d] || 0) + 1;
  }

  // Submissions over last 30 days
  const now = Date.now();
  const dailyCounts: Record<string, number> = {};
  for (const sub of flowSubs) {
    const d = new Date(sub.created_at);
    const daysAgo = Math.floor((now - d.getTime()) / 86_400_000);
    if (daysAgo <= 30) {
      const key = d.toISOString().slice(0, 10);
      dailyCounts[key] = (dailyCounts[key] || 0) + 1;
    }
  }
  const trend = Object.entries(dailyCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));

  return {
    total: flowSubs.length,
    questions: questionStats,
    tags: Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 12)
      .map(([tag, count]) => ({ tag, count })),
    risk: [
      { label: "Low", count: riskBuckets.low },
      { label: "Moderate", count: riskBuckets.moderate },
      { label: "High", count: riskBuckets.high },
    ],
    devices: Object.entries(deviceCounts).map(([device, count]) => ({ device, count })),
    trend,
  } as ReturnType<typeof aggregateFlow>;
}

export default async function AnalyticsPage() {
  const sb = createAdminClient();

  const [{ data: flows }, { data: allSubmissions }, { data: allQuestions }] = await Promise.all([
    sb.from("quiz_flows").select("id, slug").eq("is_active", true),
    sb.from("quiz_submissions").select("flow_slug, answers, tags, risk_score, device_type, state, created_at").order("created_at", { ascending: false }).limit(2000),
    sb.from("quiz_questions").select("slug, question_text, answer_type, options, flow_id").order("position", { ascending: true }),
  ]);

  const flowMap = new Map((flows ?? []).map((f: RawFlow) => [f.slug, f.id]));
  const diagnosedId = flowMap.get("diagnosed") ?? "";
  const undiagnosedId = flowMap.get("undiagnosed") ?? "";

  const diagnosedQs = (allQuestions ?? []).filter((q: RawQuestion) => q.flow_id === diagnosedId);
  const undiagnosedQs = (allQuestions ?? []).filter((q: RawQuestion) => q.flow_id === undiagnosedId);

  const subs = (allSubmissions ?? []) as RawSubmission[];

  const diagnosed = aggregateFlow(subs, "diagnosed", diagnosedQs);
  const undiagnosed = aggregateFlow(subs, "undiagnosed", undiagnosedQs);

  const data: AnalyticsData = { diagnosed, undiagnosed };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Quiz Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">
          Answer trends across all quiz submissions. Based on {subs.length} total responses.
        </p>
      </div>
      <AnalyticsDashboard data={data} />
    </div>
  );
}
