// ============================================================
// Dumbo Health — Quiz Routing Engine
// Pure functions — evaluates routing rules client-side
// ============================================================

import type {
  RoutingRule,
  RoutingCondition,
  QuizQuestion,
  QuizSection,
  ResultsTemplate,
  ResultsConditions,
} from "@/types/quiz";

function evaluateCondition(
  condition: RoutingCondition,
  answer: string | string[] | undefined
): boolean {
  if (answer === undefined) return false;

  if ("answer_equals" in condition) {
    return answer === condition.answer_equals;
  }
  if ("answer_in" in condition) {
    if (Array.isArray(answer)) return answer.some((a) => condition.answer_in.includes(a));
    return condition.answer_in.includes(answer as string);
  }
  if ("answer_includes" in condition) {
    if (Array.isArray(answer)) return answer.includes(condition.answer_includes);
    return answer === condition.answer_includes;
  }
  if ("answer_count_gte" in condition) {
    if (Array.isArray(answer)) return answer.filter((a) => a !== "none").length >= condition.answer_count_gte;
    return false;
  }
  return false;
}

export function getMatchingRules(
  rules: RoutingRule[],
  questionId: string,
  answer: string | string[] | undefined
): RoutingRule[] {
  return rules
    .filter((rule) => rule.source_question_id === questionId && evaluateCondition(rule.condition, answer))
    .sort((a, b) => b.priority - a.priority);
}

export function processRules(
  rules: RoutingRule[],
  questionId: string,
  answer: string | string[] | undefined
): {
  tagsToAdd: string[];
  scoreToAdd: number;
  skipToSection: string | null;
  skipToQuestion: string | null;
  redirectFlow: string | null;
  endFlow: boolean;
} {
  const matching = getMatchingRules(rules, questionId, answer);
  const result = {
    tagsToAdd: [] as string[],
    scoreToAdd: 0,
    skipToSection: null as string | null,
    skipToQuestion: null as string | null,
    redirectFlow: null as string | null,
    endFlow: false,
  };

  for (const rule of matching) {
    switch (rule.action_type) {
      case "add_tag":
        result.tagsToAdd.push(rule.action_value.tag as string);
        break;
      case "set_score":
        result.scoreToAdd += rule.action_value.score_add as number;
        break;
      case "skip_to_section":
        if (!result.skipToSection) result.skipToSection = rule.action_value.section_slug as string;
        break;
      case "skip_to_question":
        if (!result.skipToQuestion) result.skipToQuestion = rule.action_value.question_slug as string;
        break;
      case "redirect_flow":
        result.redirectFlow = rule.action_value.flow_slug as string;
        break;
      case "end_flow":
        result.endFlow = true;
        break;
    }
  }
  return result;
}

export function getNextQuestionIndex(
  currentIndex: number,
  questions: QuizQuestion[],
  sections: QuizSection[],
  skipToSection: string | null,
  skipToQuestion: string | null,
  skippedSections: string[]
): number {
  if (skipToQuestion) {
    const idx = questions.findIndex((q) => q.slug === skipToQuestion);
    if (idx !== -1) return idx;
  }
  if (skipToSection) {
    const targetSection = sections.find((s) => s.slug === skipToSection);
    if (targetSection) {
      const idx = questions.findIndex((q) => q.section_id === targetSection.id);
      if (idx !== -1) return idx;
    }
  }
  let nextIndex = currentIndex + 1;
  while (nextIndex < questions.length) {
    const nextQ = questions[nextIndex];
    const section = sections.find((s) => s.id === nextQ.section_id);
    if (section && skippedSections.includes(section.slug)) {
      nextIndex++;
      continue;
    }
    return nextIndex;
  }
  return questions.length;
}

export function matchesResultConditions(
  conditions: ResultsConditions,
  profile: { riskScore: number; tags: string[]; state: string | null }
): boolean {
  if (conditions.risk_score_gte !== undefined && profile.riskScore < conditions.risk_score_gte) return false;
  if (conditions.risk_score_lt !== undefined && profile.riskScore >= conditions.risk_score_lt) return false;
  if (conditions.tags_include) {
    if (!conditions.tags_include.every((tag) => profile.tags.includes(tag))) return false;
  }
  if (conditions.tags_exclude) {
    if (conditions.tags_exclude.some((tag) => profile.tags.includes(tag))) return false;
  }
  if (conditions.state_in) {
    if (!profile.state || !conditions.state_in.includes(profile.state)) return false;
  }
  if (conditions.state_not_in) {
    if (profile.state && conditions.state_not_in.includes(profile.state)) return false;
  }
  return true;
}

export function assembleResults(
  templates: ResultsTemplate[],
  profile: { riskScore: number; tags: string[]; state: string | null }
): Record<string, ResultsTemplate> {
  const results: Record<string, ResultsTemplate> = {};
  const sorted = [...templates].sort((a, b) => b.priority - a.priority);
  for (const template of sorted) {
    if (results[template.block_type]) continue;
    if (matchesResultConditions(template.conditions, profile)) {
      results[template.block_type] = template;
    }
  }
  return results;
}
