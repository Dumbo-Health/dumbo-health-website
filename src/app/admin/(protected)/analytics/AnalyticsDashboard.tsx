// Type-only module — component logic has moved to AnalyticsShell.tsx

export type AnswerCount = { value: string; label: string; count: number };
export type QuestionStat = { slug: string; question_text: string; answers: AnswerCount[] };

export type FlowStats = {
  total: number;
  questions: QuestionStat[];
  tags: { tag: string; count: number }[];
  risk: { label: string; count: number }[];
  devices: { device: string; count: number }[];
  trend: { date: string; count: number }[];
  states: { state: string; count: number }[];
};

export type AnalyticsData = {
  diagnosed: FlowStats;
  undiagnosed: FlowStats;
};

export type FlowCompletionRates = {
  diagnosed: { starts: number; completions: number; completion_pct: number };
  undiagnosed: { starts: number; completions: number; completion_pct: number };
};
