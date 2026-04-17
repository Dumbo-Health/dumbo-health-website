// Type-only module — component logic has moved to AnalyticsShell.tsx

export type FunnelStep = {
  question_slug: string;
  question_text: string;
  section_slug: string | null;
  question_index: number;
  reached: number;
  dropped_after: number;
  drop_pct: number;
};

export type FunnelFlowStats = {
  flow_slug: string;
  starts: number;
  completions: number;
  completion_pct: number;
  buy_clicks: number;
  steps: FunnelStep[];
  top_drop_question: string | null;
  top_drop_question_text: string | null;
  top_drop_section: string | null;
  top_drop_pct: number | null;
  common_paths: { path: string; count: number }[];
};

export type FunnelData = {
  diagnosed: FunnelFlowStats;
  undiagnosed: FunnelFlowStats;
};
