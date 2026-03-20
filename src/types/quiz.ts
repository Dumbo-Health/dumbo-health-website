// ============================================================
// Dumbo Health — Quiz Engine Types
// ============================================================

export interface QuizFlow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  is_active: boolean;
}

export interface QuizSection {
  id: string;
  flow_id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  position: number;
}

export interface QuizOption {
  value: string;
  label: string;
  icon?: string;
}

export interface QuizQuestion {
  id: string;
  section_id: string;
  flow_id: string;
  slug: string;
  question_text: string;
  answer_type: "single_select" | "multi_select" | "dropdown" | "number_input" | "text_input";
  options: QuizOption[] | string[];
  why_we_ask: string | null;
  is_required: boolean;
  position: number;
}

export type RoutingCondition =
  | { answer_equals: string }
  | { answer_in: string[] }
  | { answer_includes: string }
  | { answer_count_gte: number };

export type RoutingActionType =
  | "skip_to_question"
  | "skip_to_section"
  | "add_tag"
  | "set_score"
  | "redirect_flow"
  | "show_subflow"
  | "end_flow";

export interface RoutingRule {
  id: string;
  flow_id: string;
  source_question_id: string;
  condition: RoutingCondition;
  action_type: RoutingActionType;
  action_value: Record<string, unknown>;
  priority: number;
}

export interface ResultsTemplate {
  id: string;
  flow_id: string;
  block_type: "hero" | "recommendation" | "waitlist" | "next_steps" | "reassurance" | "comparison";
  conditions: ResultsConditions;
  title: string | null;
  body: string | null;
  cta_label: string | null;
  cta_url: string | null;
  priority: number;
}

export interface ResultsConditions {
  risk_score_gte?: number;
  risk_score_lt?: number;
  tags_include?: string[];
  tags_include_any?: string[];
  tags_exclude?: string[];
  state_in?: string[];
  state_not_in?: string[];
}

export interface QuizState {
  flowSlug: string;
  currentQuestionIndex: number;
  answers: Record<string, string | string[]>;
  tags: string[];
  riskScore: number;
  sections: QuizSection[];
  questions: QuizQuestion[];
  rules: RoutingRule[];
  skippedSections: string[];
  isComplete: boolean;
  isLoading: boolean;
}

export interface QuizSubmission {
  flow_slug: string;
  answers: Record<string, string | string[]>;
  tags: string[];
  risk_score: number;
  state: string | null;
  insurance: string | null;
  email: string | null;
  device_type: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}
