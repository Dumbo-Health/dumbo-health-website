import { createAdminClient } from "@/lib/supabase-admin";
import AnalyticsDashboard from "./AnalyticsDashboard";
import FunnelDashboard from "./FunnelDashboard";
import type { AnalyticsData, FlowStats } from "./AnalyticsDashboard";
import type { FunnelData, FunnelFlowStats, FunnelStep } from "./FunnelDashboard";

export const dynamic = "force-dynamic";

// ── Submission analytics types ───────────────────────────────────────────────

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

// ── Funnel analytics types ────────────────────────────────────────────────────

type RawFunnelEvent = {
  session_id: string;
  event: string;
  flow_slug: string | null;
  section_slug: string | null;
  question_slug: string | null;
  question_index: number | null;
  route_path: string[] | null;
};

// ── Aggregation: submission analytics ────────────────────────────────────────

function aggregateFlow(
  submissions: RawSubmission[],
  flowSlug: string,
  questions: RawQuestion[]
): FlowStats {
  const flowSubs = submissions.filter((s) => s.flow_slug === flowSlug);

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

  const tagCounts: Record<string, number> = {};
  for (const sub of flowSubs) {
    for (const tag of sub.tags ?? []) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  const riskBuckets = { low: 0, moderate: 0, high: 0 };
  for (const sub of flowSubs) {
    if (sub.risk_score >= 6) riskBuckets.high++;
    else if (sub.risk_score >= 3) riskBuckets.moderate++;
    else riskBuckets.low++;
  }

  const deviceCounts: Record<string, number> = {};
  for (const sub of flowSubs) {
    const d = sub.device_type ?? "unknown";
    deviceCounts[d] = (deviceCounts[d] || 0) + 1;
  }

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

// ── Aggregation: funnel analytics ─────────────────────────────────────────────

function aggregateFunnel(events: RawFunnelEvent[], flowSlug: string): FunnelFlowStats {
  const flowEvents = events.filter((e) => e.flow_slug === flowSlug);

  const startSessions = new Set(
    flowEvents.filter((e) => e.event === "started").map((e) => e.session_id)
  );
  const completeSessions = new Set(
    flowEvents.filter((e) => e.event === "completed").map((e) => e.session_id)
  );

  const starts = startSessions.size;
  const completions = completeSessions.size;
  const conversion_pct = starts > 0 ? Math.round((completions / starts) * 100) : 0;

  // Per-step reach: distinct sessions per question_index
  const stepMap = new Map<
    number,
    { question_slug: string; section_slug: string | null; sessions: Set<string> }
  >();
  for (const e of flowEvents) {
    if (e.event !== "step_completed" || e.question_index === null || !e.question_slug) continue;
    if (!stepMap.has(e.question_index)) {
      stepMap.set(e.question_index, {
        question_slug: e.question_slug,
        section_slug: e.section_slug,
        sessions: new Set(),
      });
    }
    stepMap.get(e.question_index)!.sessions.add(e.session_id);
  }

  const sortedSteps = Array.from(stepMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([idx, d]) => ({ question_index: idx, ...d }));

  const steps: FunnelStep[] = sortedSteps.map((step, i) => {
    const reached = step.sessions.size;
    const nextStep = sortedSteps[i + 1];
    const nextReached = nextStep ? nextStep.sessions.size : completions;
    const dropped_after = Math.max(0, reached - nextReached);
    const drop_pct = reached > 0 ? Math.round((dropped_after / reached) * 100) : 0;
    return {
      question_slug: step.question_slug,
      section_slug: step.section_slug,
      question_index: step.question_index,
      reached,
      dropped_after,
      drop_pct,
    };
  });

  // Highest drop-off step (require at least 5 sessions to avoid noise)
  const topDropStep =
    steps.filter((s) => s.reached >= 5).sort((a, b) => b.drop_pct - a.drop_pct)[0] ?? null;

  // Common abandonment paths from abandoned events
  const pathCounts = new Map<string, number>();
  for (const e of flowEvents) {
    if (e.event !== "abandoned" || !e.route_path?.length) continue;
    const key = e.route_path.join(" → ");
    pathCounts.set(key, (pathCounts.get(key) ?? 0) + 1);
  }
  const common_paths = Array.from(pathCounts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([path, count]) => ({ path, count }));

  return {
    flow_slug: flowSlug,
    starts,
    completions,
    conversion_pct,
    steps,
    top_drop_question: topDropStep?.question_slug ?? null,
    top_drop_section: topDropStep?.section_slug ?? null,
    common_paths,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AnalyticsPage() {
  const sb = createAdminClient();

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [
    { data: flows },
    { data: allSubmissions },
    { data: allQuestions },
    { data: rawFunnelEvents },
  ] = await Promise.all([
    sb.from("quiz_flows").select("id, slug").eq("is_active", true),
    sb
      .from("quiz_submissions")
      .select("flow_slug, answers, tags, risk_score, device_type, state, created_at")
      .eq("environment", "production")
      .order("created_at", { ascending: false })
      .limit(2000),
    sb
      .from("quiz_questions")
      .select("slug, question_text, answer_type, options, flow_id")
      .order("position", { ascending: true }),
    sb
      .from("quiz_funnel_events")
      .select("session_id, event, flow_slug, section_slug, question_slug, question_index, route_path")
      .eq("environment", "production")
      .gte("created_at", thirtyDaysAgo),
  ]);

  const flowMap = new Map((flows ?? []).map((f: RawFlow) => [f.slug, f.id]));
  const diagnosedId = flowMap.get("diagnosed") ?? "";
  const undiagnosedId = flowMap.get("undiagnosed") ?? "";

  const diagnosedQs = (allQuestions ?? []).filter((q: RawQuestion) => q.flow_id === diagnosedId);
  const undiagnosedQs = (allQuestions ?? []).filter((q: RawQuestion) => q.flow_id === undiagnosedId);

  const subs = (allSubmissions ?? []) as RawSubmission[];
  const funnelEvents = (rawFunnelEvents ?? []) as RawFunnelEvent[];

  const diagnosed = aggregateFlow(subs, "diagnosed", diagnosedQs);
  const undiagnosed = aggregateFlow(subs, "undiagnosed", undiagnosedQs);
  const data: AnalyticsData = { diagnosed, undiagnosed };

  const funnelData: FunnelData = {
    diagnosed: aggregateFunnel(funnelEvents, "diagnosed"),
    undiagnosed: aggregateFunnel(funnelEvents, "undiagnosed"),
  };

  const totalFunnelStarts = funnelData.diagnosed.starts + funnelData.undiagnosed.starts;

  return (
    <div className="p-8 space-y-12">
      {/* Funnel section */}
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Quiz Drop-off Funnel</h1>
          <p className="text-sm text-gray-500 mt-1">
            Start rate, per-step drop-off, and abandonment routes — last 30 days.
            {totalFunnelStarts > 0 && ` Based on ${totalFunnelStarts} quiz starts.`}
          </p>
        </div>
        <FunnelDashboard data={funnelData} />
      </div>

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* Answer analytics section */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Answer Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">
            Answer distributions across all quiz submissions. Based on {subs.length} total responses.
          </p>
        </div>
        <AnalyticsDashboard data={data} />
      </div>
    </div>
  );
}
