-- ============================================================
-- Dumbo Health — Quiz Seed Data
-- Two flows: undiagnosed + diagnosed
-- Run AFTER 001_quiz_schema.sql
-- ============================================================

-- ─── FLOWS ────────────────────────────────────────────────────────────────────

INSERT INTO quiz_flows (id, slug, title, description, is_active) VALUES
  ('00000000-0000-0000-0000-000000000001', 'undiagnosed', 'Find Out If You Have Sleep Apnea', 'For people who haven''t been tested yet', true),
  ('00000000-0000-0000-0000-000000000002', 'diagnosed',   'Get the Right Treatment', 'For people already diagnosed with sleep apnea', true)
ON CONFLICT (slug) DO NOTHING;

-- ─── SECTIONS — UNDIAGNOSED ───────────────────────────────────────────────────

INSERT INTO quiz_sections (id, flow_id, slug, title, subtitle, position) VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'symptoms',   'Tell us how you sleep',          'We''ll identify patterns that point to sleep apnea',       1),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'risk',       'A few quick health questions',    'These factors affect sleep apnea risk significantly',      2),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'impact',     'How it affects your daily life',  'Understanding the full picture helps us help you better',  3),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'insurance',  'Coverage & location',             'We''ll check what''s available in your area',              4),
  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 'profile',    'Almost done',                     'Just a few details so we can personalize your results',    5)
ON CONFLICT (flow_id, slug) DO NOTHING;

-- ─── SECTIONS — DIAGNOSED ─────────────────────────────────────────────────────

INSERT INTO quiz_sections (id, flow_id, slug, title, subtitle, position) VALUES
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'treatment',  'Your current treatment',         'Tell us where you are in your sleep apnea journey',        1),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'insurance',  'Coverage & location',            'We''ll check what''s available in your area',              2),
  ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'profile',    'Almost done',                    'Just a few details so we can personalize your results',    3)
ON CONFLICT (flow_id, slug) DO NOTHING;

-- ─── QUESTIONS — UNDIAGNOSED ──────────────────────────────────────────────────

INSERT INTO quiz_questions (id, flow_id, section_id, slug, question_text, answer_type, options, why_we_ask, position) VALUES

  -- Section 1: Symptoms
  ('11000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000001',
   'snoring',
   'Do you snore, or has anyone told you that you do?',
   'single_select',
   '[{"value":"yes-loud","label":"Yes, loudly"},{"value":"yes-sometimes","label":"Sometimes"},{"value":"not-sure","label":"Not sure"},{"value":"no","label":"No"}]',
   'Loud snoring is one of the most common signs of obstructive sleep apnea.',
   1),

  ('11000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000001',
   'breathing-pauses',
   'Has anyone witnessed you stop breathing during sleep?',
   'single_select',
   '[{"value":"yes","label":"Yes"},{"value":"not-sure","label":"Not sure"},{"value":"no","label":"No"},{"value":"live-alone","label":"I sleep alone"}]',
   'Observed apneas (breathing pauses) are a strong diagnostic indicator.',
   2),

  ('11000000-0000-0000-0000-000000000003',
   '00000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000001',
   'daytime-sleepiness',
   'How often do you feel sleepy or tired during the day?',
   'single_select',
   '[{"value":"daily","label":"Every day"},{"value":"often","label":"Several times a week"},{"value":"sometimes","label":"Occasionally"},{"value":"rarely","label":"Rarely"}]',
   'Excessive daytime sleepiness is a hallmark symptom of untreated sleep apnea.',
   3),

  ('11000000-0000-0000-0000-000000000004',
   '00000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000001',
   'morning-symptoms',
   'Which of these do you experience in the mornings? (select all that apply)',
   'multi_select',
   '[{"value":"headache","label":"Morning headaches"},{"value":"dry-mouth","label":"Dry mouth or sore throat"},{"value":"unrefreshed","label":"Feeling unrefreshed"},{"value":"none","label":"None of these"}]',
   'Morning symptoms often reflect oxygen disruptions that occurred overnight.',
   4),

  -- Section 2: Risk factors
  ('11000000-0000-0000-0000-000000000005',
   '00000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000002',
   'age',
   'How old are you?',
   'single_select',
   '[{"value":"18-29","label":"18–29"},{"value":"30-44","label":"30–44"},{"value":"45-59","label":"45–59"},{"value":"60plus","label":"60+"}]',
   'Sleep apnea risk increases with age, especially after 40.',
   1),

  ('11000000-0000-0000-0000-000000000006',
   '00000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000002',
   'bmi',
   'How would you describe your body type?',
   'single_select',
   '[{"value":"slim","label":"Slim / lean"},{"value":"average","label":"Average build"},{"value":"overweight","label":"Overweight"},{"value":"obese","label":"Significantly overweight"}]',
   'Excess weight, especially around the neck, is one of the strongest risk factors.',
   2),

  ('11000000-0000-0000-0000-000000000007',
   '00000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000002',
   'conditions',
   'Do you have any of these health conditions? (select all that apply)',
   'multi_select',
   '[{"value":"hypertension","label":"High blood pressure"},{"value":"diabetes","label":"Diabetes or prediabetes"},{"value":"heart-disease","label":"Heart disease"},{"value":"none","label":"None of these"}]',
   'These conditions are closely linked to sleep apnea and affect treatment urgency.',
   3),

  -- Section 3: Impact
  ('11000000-0000-0000-0000-000000000008',
   '00000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000003',
   'sleep-impact',
   'How much is poor sleep affecting your daily life?',
   'single_select',
   '[{"value":"severe","label":"Significantly — it affects my work and relationships"},{"value":"moderate","label":"Moderately — I notice it but manage"},{"value":"mild","label":"Mildly — mostly just tired"},{"value":"unsure","label":"Hard to say"}]',
   'Impact severity helps us prioritize the right care pathway for you.',
   1),

  ('11000000-0000-0000-0000-000000000009',
   '00000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000003',
   'tried-before',
   'Have you ever been tested or treated for sleep issues?',
   'single_select',
   '[{"value":"tested-positive","label":"Tested and diagnosed"},{"value":"tested-negative","label":"Tested but no diagnosis"},{"value":"never","label":"Never been tested"},{"value":"considering","label":"Thinking about getting tested"}]',
   'This helps us skip steps you''ve already taken.',
   2),

  -- Section 4: Insurance & Location
  ('11000000-0000-0000-0000-000000000010',
   '00000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000004',
   'insurance-type',
   'What type of health insurance do you have?',
   'single_select',
   '[{"value":"medicare","label":"Medicare"},{"value":"medicaid","label":"Medicaid"},{"value":"private","label":"Private / employer insurance"},{"value":"uninsured","label":"No insurance / self-pay"}]',
   'Insurance type determines which tests and treatments we can offer you.',
   1),

  ('11000000-0000-0000-0000-000000000011',
   '00000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000004',
   'state',
   'Which state do you live in?',
   'dropdown',
   '[{"value":"FL","label":"Florida"},{"value":"TX","label":"Texas"},{"value":"CA","label":"California"},{"value":"NY","label":"New York"},{"value":"GA","label":"Georgia"},{"value":"NC","label":"North Carolina"},{"value":"OH","label":"Ohio"},{"value":"PA","label":"Pennsylvania"},{"value":"IL","label":"Illinois"},{"value":"AZ","label":"Arizona"},{"value":"other","label":"Other state"}]',
   'We''re currently licensed in select states. This tells us what we can offer you.',
   2),

  -- Section 5: Profile
  ('11000000-0000-0000-0000-000000000012',
   '00000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000005',
   'sex',
   'What is your biological sex?',
   'single_select',
   '[{"value":"male","label":"Male"},{"value":"female","label":"Female"},{"value":"prefer-not","label":"Prefer not to say"}]',
   'Sleep apnea presents differently across biological sexes.',
   1),

  ('11000000-0000-0000-0000-000000000013',
   '00000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000005',
   'goal',
   'What''s your main goal?',
   'single_select',
   '[{"value":"test","label":"Get tested — I want to know if I have it"},{"value":"treat","label":"Start treatment — I''m ready to fix it"},{"value":"learn","label":"Learn more first"},{"value":"cdl","label":"I need testing for my CDL / commercial license"}]',
   'Your goal shapes which path we recommend.',
   2),

  ('11000000-0000-0000-0000-000000000014',
   '00000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000005',
   'urgency',
   'How soon are you looking to get help?',
   'single_select',
   '[{"value":"asap","label":"As soon as possible"},{"value":"this-month","label":"Within the next month"},{"value":"exploring","label":"Just exploring for now"}]',
   'This helps us match you to the right next step.',
   3)

ON CONFLICT (flow_id, slug) DO NOTHING;

-- ─── QUESTIONS — DIAGNOSED ────────────────────────────────────────────────────

INSERT INTO quiz_questions (id, flow_id, section_id, slug, question_text, answer_type, options, why_we_ask, position) VALUES

  -- Section 1: Treatment
  ('21000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000002',
   '20000000-0000-0000-0000-000000000001',
   'current-treatment',
   'What are you currently using to treat your sleep apnea?',
   'single_select',
   '[{"value":"cpap","label":"CPAP machine"},{"value":"oral-appliance","label":"Oral appliance (mouthguard)"},{"value":"nothing","label":"Nothing yet"},{"value":"other","label":"Something else"}]',
   'This tells us whether you need to start, switch, or optimize your treatment.',
   1),

  ('21000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000002',
   '20000000-0000-0000-0000-000000000001',
   'cpap-satisfaction',
   'How satisfied are you with your current CPAP therapy?',
   'single_select',
   '[{"value":"very-happy","label":"Very happy — works well for me"},{"value":"okay","label":"It''s okay but could be better"},{"value":"struggling","label":"Struggling — comfort or compliance issues"},{"value":"stopped","label":"I stopped using it"}]',
   'Many people struggle silently with CPAP. There are solutions.',
   2),

  ('21000000-0000-0000-0000-000000000003',
   '00000000-0000-0000-0000-000000000002',
   '20000000-0000-0000-0000-000000000001',
   'dx-needs',
   'What do you need most right now? (select all that apply)',
   'multi_select',
   '[{"value":"new-equipment","label":"New or replacement CPAP equipment"},{"value":"supplies","label":"CPAP supplies (masks, filters, tubing)"},{"value":"support","label":"Clinical support and follow-up"},{"value":"alternative","label":"Explore alternatives to CPAP"},{"value":"monitoring","label":"Sleep data monitoring & coaching"}]',
   'This shapes your personalized care plan.',
   3),

  -- Section 2: Insurance & Location
  ('21000000-0000-0000-0000-000000000004',
   '00000000-0000-0000-0000-000000000002',
   '20000000-0000-0000-0000-000000000002',
   'insurance-type-dx',
   'What type of health insurance do you have?',
   'single_select',
   '[{"value":"medicare","label":"Medicare"},{"value":"medicaid","label":"Medicaid"},{"value":"private","label":"Private / employer insurance"},{"value":"uninsured","label":"No insurance / self-pay"}]',
   'Insurance coverage determines your options for CPAP and supplies.',
   1),

  ('21000000-0000-0000-0000-000000000005',
   '00000000-0000-0000-0000-000000000002',
   '20000000-0000-0000-0000-000000000002',
   'state-dx',
   'Which state do you live in?',
   'dropdown',
   '[{"value":"FL","label":"Florida"},{"value":"TX","label":"Texas"},{"value":"CA","label":"California"},{"value":"NY","label":"New York"},{"value":"GA","label":"Georgia"},{"value":"NC","label":"North Carolina"},{"value":"OH","label":"Ohio"},{"value":"PA","label":"Pennsylvania"},{"value":"IL","label":"Illinois"},{"value":"AZ","label":"Arizona"},{"value":"other","label":"Other state"}]',
   'We''re currently licensed in select states.',
   2),

  -- Section 3: Profile
  ('21000000-0000-0000-0000-000000000006',
   '00000000-0000-0000-0000-000000000002',
   '20000000-0000-0000-0000-000000000003',
   'dx-goal',
   'What''s your main goal right now?',
   'single_select',
   '[{"value":"optimize","label":"Optimize my existing therapy"},{"value":"resupply","label":"Get CPAP supplies covered by insurance"},{"value":"switch","label":"Explore a different treatment option"},{"value":"support","label":"Find ongoing clinical support"}]',
   'Your goal shapes which recommendations we make.',
   1),

  ('21000000-0000-0000-0000-000000000007',
   '00000000-0000-0000-0000-000000000002',
   '20000000-0000-0000-0000-000000000003',
   'dx-urgency',
   'How soon are you looking to get help?',
   'single_select',
   '[{"value":"asap","label":"As soon as possible"},{"value":"this-month","label":"Within the next month"},{"value":"exploring","label":"Just exploring for now"}]',
   'This helps us match you to the right next step.',
   2)

ON CONFLICT (flow_id, slug) DO NOTHING;

-- ─── ROUTING RULES — UNDIAGNOSED ──────────────────────────────────────────────

-- If already tested + diagnosed → redirect to diagnosed flow
INSERT INTO routing_rules (flow_id, source_question_id, condition, action_type, action_value, priority) VALUES
  ('00000000-0000-0000-0000-000000000001',
   '11000000-0000-0000-0000-000000000009',
   '{"answer_equals": "tested-positive"}',
   'redirect_flow',
   '{"flow_slug": "diagnosed"}',
   100);

-- Loud snoring → add tag
INSERT INTO routing_rules (flow_id, source_question_id, condition, action_type, action_value, priority) VALUES
  ('00000000-0000-0000-0000-000000000001',
   '11000000-0000-0000-0000-000000000001',
   '{"answer_equals": "yes-loud"}',
   'add_tag',
   '{"tag": "loud-snorer"}',
   10);

-- Witnessed breathing pauses → add high-risk tag + score
INSERT INTO routing_rules (flow_id, source_question_id, condition, action_type, action_value, priority) VALUES
  ('00000000-0000-0000-0000-000000000001',
   '11000000-0000-0000-0000-000000000002',
   '{"answer_equals": "yes"}',
   'add_tag',
   '{"tag": "witnessed-apnea"}',
   20),
  ('00000000-0000-0000-0000-000000000001',
   '11000000-0000-0000-0000-000000000002',
   '{"answer_equals": "yes"}',
   'set_score',
   '{"score_add": 3}',
   20);

-- Daily sleepiness → score
INSERT INTO routing_rules (flow_id, source_question_id, condition, action_type, action_value, priority) VALUES
  ('00000000-0000-0000-0000-000000000001',
   '11000000-0000-0000-0000-000000000003',
   '{"answer_equals": "daily"}',
   'set_score',
   '{"score_add": 2}',
   10);

-- 3+ morning symptoms → score
INSERT INTO routing_rules (flow_id, source_question_id, condition, action_type, action_value, priority) VALUES
  ('00000000-0000-0000-0000-000000000001',
   '11000000-0000-0000-0000-000000000004',
   '{"answer_count_gte": 3}',
   'set_score',
   '{"score_add": 2}',
   10);

-- Overweight / obese → tag + score
INSERT INTO routing_rules (flow_id, source_question_id, condition, action_type, action_value, priority) VALUES
  ('00000000-0000-0000-0000-000000000001',
   '11000000-0000-0000-0000-000000000006',
   '{"answer_in": ["overweight","obese"]}',
   'add_tag',
   '{"tag": "high-bmi"}',
   10),
  ('00000000-0000-0000-0000-000000000001',
   '11000000-0000-0000-0000-000000000006',
   '{"answer_in": ["overweight","obese"]}',
   'set_score',
   '{"score_add": 2}',
   10);

-- Has comorbidities → add tag + score
INSERT INTO routing_rules (flow_id, source_question_id, condition, action_type, action_value, priority) VALUES
  ('00000000-0000-0000-0000-000000000001',
   '11000000-0000-0000-0000-000000000007',
   '{"answer_includes": "hypertension"}',
   'add_tag',
   '{"tag": "hypertension"}',
   10),
  ('00000000-0000-0000-0000-000000000001',
   '11000000-0000-0000-0000-000000000007',
   '{"answer_includes": "heart-disease"}',
   'add_tag',
   '{"tag": "cardiac-risk"}',
   10),
  ('00000000-0000-0000-0000-000000000001',
   '11000000-0000-0000-0000-000000000007',
   '{"answer_count_gte": 1}',
   'set_score',
   '{"score_add": 2}',
   5);

-- CDL goal → add tag
INSERT INTO routing_rules (flow_id, source_question_id, condition, action_type, action_value, priority) VALUES
  ('00000000-0000-0000-0000-000000000001',
   '11000000-0000-0000-0000-000000000013',
   '{"answer_equals": "cdl"}',
   'add_tag',
   '{"tag": "cdl-driver"}',
   20);

-- Out-of-state (other) → add tag
INSERT INTO routing_rules (flow_id, source_question_id, condition, action_type, action_value, priority) VALUES
  ('00000000-0000-0000-0000-000000000001',
   '11000000-0000-0000-0000-000000000011',
   '{"answer_equals": "other"}',
   'add_tag',
   '{"tag": "out-of-state"}',
   30);

-- ─── ROUTING RULES — DIAGNOSED ────────────────────────────────────────────────

-- Stopped CPAP → add tag
INSERT INTO routing_rules (flow_id, source_question_id, condition, action_type, action_value, priority) VALUES
  ('00000000-0000-0000-0000-000000000002',
   '21000000-0000-0000-0000-000000000002',
   '{"answer_equals": "stopped"}',
   'add_tag',
   '{"tag": "cpap-dropout"}',
   20);

-- Struggling with CPAP → add tag
INSERT INTO routing_rules (flow_id, source_question_id, condition, action_type, action_value, priority) VALUES
  ('00000000-0000-0000-0000-000000000002',
   '21000000-0000-0000-0000-000000000002',
   '{"answer_equals": "struggling"}',
   'add_tag',
   '{"tag": "cpap-struggling"}',
   20);

-- Out-of-state diagnosed → add tag
INSERT INTO routing_rules (flow_id, source_question_id, condition, action_type, action_value, priority) VALUES
  ('00000000-0000-0000-0000-000000000002',
   '21000000-0000-0000-0000-000000000005',
   '{"answer_equals": "other"}',
   'add_tag',
   '{"tag": "out-of-state"}',
   30);

-- ─── RESULTS TEMPLATES — UNDIAGNOSED ─────────────────────────────────────────

-- Hero block: high risk
INSERT INTO results_templates (flow_id, block_type, title, body, cta_label, cta_url, conditions, priority, is_active) VALUES
  ('00000000-0000-0000-0000-000000000001',
   'hero',
   'Your results suggest a high likelihood of sleep apnea',
   'Based on your symptoms, risk factors, and sleep patterns, you show multiple strong indicators of obstructive sleep apnea. The good news: it''s highly treatable — and getting tested is simple.',
   'Get Tested at Home',
   '/at-home-sleep-test',
   '{"risk_score_gte": 6}',
   30,
   true);

-- Hero block: moderate risk
INSERT INTO results_templates (flow_id, block_type, title, body, cta_label, cta_url, conditions, priority, is_active) VALUES
  ('00000000-0000-0000-0000-000000000001',
   'hero',
   'You may have sleep apnea — worth checking',
   'Some of your symptoms and risk factors are consistent with sleep apnea. The only way to know for sure is a sleep test — and ours is done entirely at home.',
   'Take a Sleep Test',
   '/at-home-sleep-test',
   '{"risk_score_gte": 3, "risk_score_lt": 6}',
   20,
   true);

-- Hero block: low risk
INSERT INTO results_templates (flow_id, block_type, title, body, cta_label, cta_url, conditions, priority, is_active) VALUES
  ('00000000-0000-0000-0000-000000000001',
   'hero',
   'Your risk appears lower — but symptoms matter',
   'While your score is lower, sleep apnea can affect anyone. If your sleep is impacting your energy and quality of life, a test is a simple way to get clarity.',
   'Learn More',
   '/resources/facts',
   '{}',
   10,
   true);

-- Recommendation block: CDL driver
INSERT INTO results_templates (flow_id, block_type, title, body, cta_label, cta_url, conditions, priority, is_active) VALUES
  ('00000000-0000-0000-0000-000000000001',
   'recommendation',
   'DOT-Compliant Sleep Apnea Testing',
   'As a commercial driver, you need a FMCSA-compliant sleep apnea evaluation. We offer fast, DOT-accepted testing so you stay on the road.',
   'DOT Sleep Testing',
   '/dot-sleep-apnea-testing',
   '{"tags_include": ["cdl-driver"]}',
   50,
   true);

-- Recommendation block: default (HST)
INSERT INTO results_templates (flow_id, block_type, title, body, cta_label, cta_url, conditions, priority, is_active) VALUES
  ('00000000-0000-0000-0000-000000000001',
   'recommendation',
   'At-Home Sleep Test',
   'A clinical-grade sleep test you take in your own bed. Results in 7–10 days, reviewed by a board-certified sleep physician. Insurance often covers it.',
   'Start Your Sleep Test',
   '/at-home-sleep-test',
   '{}',
   10,
   true);

-- Out-of-state capture block
INSERT INTO results_templates (flow_id, block_type, title, body, cta_label, cta_url, conditions, priority, is_active) VALUES
  ('00000000-0000-0000-0000-000000000001',
   'waitlist',
   'We''re coming to your state soon',
   'We''re not available in your state just yet, but we''re expanding quickly. Leave your email and we''ll notify you the moment we launch near you.',
   NULL,
   NULL,
   '{"tags_include": ["out-of-state"]}',
   100,
   true);

-- ─── RESULTS TEMPLATES — DIAGNOSED ───────────────────────────────────────────

-- Hero block: CPAP dropout/struggling
INSERT INTO results_templates (flow_id, block_type, title, body, cta_label, cta_url, conditions, priority, is_active) VALUES
  ('00000000-0000-0000-0000-000000000002',
   'hero',
   'Let''s get your treatment working for you',
   'CPAP struggles are more common than you think — and there are real solutions. From better equipment to clinical coaching, we can help you actually sleep well again.',
   'Explore CPAP Therapy',
   '/cpap',
   '{"tags_include_any": ["cpap-dropout","cpap-struggling"]}',
   30,
   true);

-- Hero block: default diagnosed
INSERT INTO results_templates (flow_id, block_type, title, body, cta_label, cta_url, conditions, priority, is_active) VALUES
  ('00000000-0000-0000-0000-000000000002',
   'hero',
   'Your personalized care plan is ready',
   'Based on your answers, here''s what we recommend to help you sleep better and stay on track with your treatment.',
   'View Your Options',
   '/cpap',
   '{}',
   10,
   true);

-- Recommendation: CPAP resupply
INSERT INTO results_templates (flow_id, block_type, title, body, cta_label, cta_url, conditions, priority, is_active) VALUES
  ('00000000-0000-0000-0000-000000000002',
   'recommendation',
   'Insurance-Covered CPAP Supplies',
   'Get masks, filters, tubing, and more covered by your insurance — delivered to your door. Most patients qualify for new supplies every 90 days.',
   'Check My Coverage',
   '/resupply',
   '{}',
   10,
   true);

-- Recommendation: CPAP care (ongoing support)
INSERT INTO results_templates (flow_id, block_type, title, body, cta_label, cta_url, conditions, priority, is_active) VALUES
  ('00000000-0000-0000-0000-000000000002',
   'recommendation',
   'Ongoing CPAP Care & Coaching',
   'Regular clinical check-ins, data reviews, and equipment optimization — so your therapy actually works long-term.',
   'Learn About CPAP Care',
   '/cpap-care',
   '{"tags_include": ["cpap-struggling"]}',
   20,
   true);

-- Out-of-state capture — diagnosed
INSERT INTO results_templates (flow_id, block_type, title, body, cta_label, cta_url, conditions, priority, is_active) VALUES
  ('00000000-0000-0000-0000-000000000002',
   'waitlist',
   'We''re coming to your state soon',
   'We''re not available in your state just yet, but we''re expanding quickly. Leave your email and we''ll notify you the moment we launch near you.',
   NULL,
   NULL,
   '{"tags_include": ["out-of-state"]}',
   100,
   true);
