-- Run this in the Supabase SQL Editor for the website_cms project
-- Project ref: iguhaoprruznhweejeok

CREATE TABLE IF NOT EXISTS cio_attribute_config (
  key TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  description TEXT NOT NULL,
  source TEXT NOT NULL,
  example_values TEXT,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE cio_attribute_config ENABLE ROW LEVEL SECURITY;

-- Admin reads/writes happen server-side with service role key (bypasses RLS)
-- No policies needed for anon access

INSERT INTO cio_attribute_config (key, label, description, source, example_values, enabled) VALUES
('quiz_flow',              'Quiz Flow',           'Which quiz the user completed',                                    'submission: flow_slug',                           'undiagnosed, diagnosed',                                                                         true),
('quiz_risk_score',        'Risk Score',          'Raw numeric score accumulated during the quiz',                   'computed from answer rules (score_to_add)',        '0, 3, 6, 9',                                                                                     true),
('quiz_risk_level',        'Risk Level',          'Risk tier derived from score: high (>=6), moderate (>=3), low',  'computed from quiz_risk_score',                    'high, moderate, low',                                                                            true),
('quiz_top_symptom',       'Top Symptom',         'Most significant symptom based on priority logic',                'computed from answers in priority order',          'breathing pauses during sleep, loud snoring, daily fatigue, morning headaches, disrupted sleep', true),
('quiz_tags',              'Tags',                'Comma-separated tags accumulated during the quiz',                'computed from rules (tags_to_add)',                'high-risk, snorer, cpap-dropout',                                                                true),
('quiz_state',             'State',               'US state the user selected',                                      'quiz answer: state / state-dx',                   'FL, TX, NY, CA',                                                                                 true),
('quiz_insurance',         'Insurance',           'Insurance type selected by user',                                 'quiz answer: insurance-type / insurance-type-dx',  'medicare, private, none',                                                                        true),
('quiz_completed_at',      'Completed At',        'Unix timestamp (seconds) when quiz was submitted',                'server: Math.floor(Date.now() / 1000)',            '1741234567',                                                                                     true),
('quiz_snoring',           'Snoring',             'Snoring frequency and volume',                                    'quiz answer: snoring',                             'no, yes-quiet, yes-loud',                                                                        true),
('quiz_sleepiness',        'Daytime Sleepiness',  'How often user feels sleepy during the day',                      'quiz answer: daytime-sleepiness',                  'never, sometimes, daily',                                                                        true),
('quiz_breathing_pauses',  'Breathing Pauses',    'Whether breathing pauses have been observed',                     'quiz answer: breathing-pauses',                    'yes, no, not-sure',                                                                              true),
('quiz_morning_symptoms',  'Morning Symptoms',    'Comma-separated morning symptoms (multi-select)',                 'quiz answer: morning-symptoms',                    'headache, dry-mouth, sore-throat',                                                               true),
('quiz_bmi',               'BMI Range',           'BMI range selected by user',                                      'quiz answer: bmi',                                 'under-18, 18-25, 25-30, over-30',                                                               true),
('quiz_conditions',        'Conditions',          'Comma-separated comorbid conditions (multi-select)',              'quiz answer: conditions',                          'hypertension, diabetes, heart-disease',                                                          true),
('quiz_cpap_satisfaction', 'CPAP Satisfaction',   'How user feels about CPAP (diagnosed flow only)',                 'quiz answer: cpap-satisfaction',                   'stopped, struggling, ok, happy',                                                                 true),
('quiz_dx_needs',          'Diagnosed Needs',     'What the diagnosed user needs help with (multi-select)',          'quiz answer: dx-needs',                            'new-machine, supplies, alternatives',                                                            true),
('quiz_utm_source',        'UTM Source',          'Traffic source — persisted via sessionStorage across navigation', 'sessionStorage / URL param: utm_source',           'facebook, google, email',                                                                        true),
('quiz_utm_medium',        'UTM Medium',          'Traffic medium',                                                  'sessionStorage / URL param: utm_medium',           'cpc, organic, social',                                                                           true),
('quiz_utm_campaign',      'UTM Campaign',        'Campaign name',                                                   'sessionStorage / URL param: utm_campaign',         'spring-2026, sleep-awareness',                                                                   true),
('quiz_device',            'Device Type',         'Whether user completed quiz on mobile or desktop',                'computed: window.innerWidth < 768 = mobile',       'mobile, desktop',                                                                                true)
ON CONFLICT (key) DO NOTHING;
