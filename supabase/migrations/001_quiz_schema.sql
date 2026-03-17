-- ============================================================
-- Dumbo Health — Quiz Schema
-- Run on: website_cms (ref: iguhaoprruznhweejeok)
-- ============================================================

-- Quiz flows (undiagnosed / diagnosed)
CREATE TABLE IF NOT EXISTS quiz_flows (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Sections within a flow (shown as interstitials)
CREATE TABLE IF NOT EXISTS quiz_sections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_id     UUID NOT NULL REFERENCES quiz_flows(id) ON DELETE CASCADE,
  slug        TEXT NOT NULL,
  title       TEXT NOT NULL,
  subtitle    TEXT,
  position    INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (flow_id, slug)
);

-- Questions
CREATE TABLE IF NOT EXISTS quiz_questions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_id       UUID NOT NULL REFERENCES quiz_flows(id) ON DELETE CASCADE,
  section_id    UUID NOT NULL REFERENCES quiz_sections(id) ON DELETE CASCADE,
  slug          TEXT NOT NULL,
  question_text TEXT NOT NULL,
  answer_type   TEXT NOT NULL CHECK (answer_type IN ('single_select','multi_select','dropdown','number_input','text_input')),
  options       JSONB NOT NULL DEFAULT '[]',
  why_we_ask    TEXT,
  is_required   BOOLEAN NOT NULL DEFAULT true,
  position      INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (flow_id, slug)
);

-- Routing rules
CREATE TABLE IF NOT EXISTS routing_rules (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_id             UUID NOT NULL REFERENCES quiz_flows(id) ON DELETE CASCADE,
  source_question_id  UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  condition           JSONB NOT NULL,
  action_type         TEXT NOT NULL CHECK (action_type IN ('add_tag','set_score','skip_to_section','skip_to_question','redirect_flow','end_flow')),
  action_value        JSONB NOT NULL DEFAULT '{}',
  priority            INTEGER NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Results templates
CREATE TABLE IF NOT EXISTS results_templates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_id     UUID NOT NULL REFERENCES quiz_flows(id) ON DELETE CASCADE,
  block_type  TEXT NOT NULL,
  title       TEXT NOT NULL,
  body        TEXT,
  cta_label   TEXT,
  cta_url     TEXT,
  conditions  JSONB NOT NULL DEFAULT '{}',
  priority    INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Submissions
CREATE TABLE IF NOT EXISTS quiz_submissions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_slug    TEXT NOT NULL,
  answers      JSONB NOT NULL DEFAULT '{}',
  tags         TEXT[] NOT NULL DEFAULT '{}',
  risk_score   INTEGER NOT NULL DEFAULT 0,
  state        TEXT,
  insurance    TEXT,
  device_type  TEXT,
  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- A/B tests (optional, future use)
CREATE TABLE IF NOT EXISTS quiz_ab_tests (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_id    UUID NOT NULL REFERENCES quiz_flows(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  variants   JSONB NOT NULL DEFAULT '[]',
  is_active  BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_quiz_sections_flow    ON quiz_sections(flow_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_flow   ON quiz_questions(flow_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_section ON quiz_questions(section_id);
CREATE INDEX IF NOT EXISTS idx_routing_rules_flow    ON routing_rules(flow_id);
CREATE INDEX IF NOT EXISTS idx_routing_rules_source  ON routing_rules(source_question_id);
CREATE INDEX IF NOT EXISTS idx_results_templates_flow ON results_templates(flow_id);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_flow ON quiz_submissions(flow_slug);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_date ON quiz_submissions(created_at DESC);

-- RLS
ALTER TABLE quiz_flows         ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_sections      ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE routing_rules      ENABLE ROW LEVEL SECURITY;
ALTER TABLE results_templates  ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_submissions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_ab_tests      ENABLE ROW LEVEL SECURITY;

-- Public read for quiz content
CREATE POLICY "public_read_flows"      ON quiz_flows         FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_sections"   ON quiz_sections      FOR SELECT USING (true);
CREATE POLICY "public_read_questions"  ON quiz_questions     FOR SELECT USING (true);
CREATE POLICY "public_read_rules"      ON routing_rules      FOR SELECT USING (true);
CREATE POLICY "public_read_templates"  ON results_templates  FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_ab_tests"   ON quiz_ab_tests      FOR SELECT USING (is_active = true);

-- Public insert for submissions
CREATE POLICY "public_insert_submissions" ON quiz_submissions FOR INSERT WITH CHECK (true);
