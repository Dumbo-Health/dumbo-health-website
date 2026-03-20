# Customer.io Email Cadence — Post-Quiz Completion

**Event trigger**: `wb_quiz_completed` (prod) / `dev_wb_quiz_completed` (dev)

**Segmentation logic** (applied in CIO campaign conditions):

| Track | Condition |
|-------|-----------|
| Track 0 — Waitlist | `quiz_state` not in service area |
| Track A — High Risk | `quiz_flow = "undiagnosed"` AND `quiz_risk_level = "high"` |
| Track B — Moderate Risk | `quiz_flow = "undiagnosed"` AND `quiz_risk_level = "moderate"` |
| Track C — Low Risk | `quiz_flow = "undiagnosed"` AND `quiz_risk_level = "low"` |
| Track D — Struggling/Dropout | `quiz_flow = "diagnosed"` AND `quiz_cpap_satisfaction` is `stopped` or `struggling` |
| Track E — Diagnosed OK | `quiz_flow = "diagnosed"` AND `quiz_cpap_satisfaction` is NOT `stopped` or `struggling` |

**Exit condition for all tracks**: Purchase event fires (`purchase_completed` or your existing order event).

---

## How Attributes Are Sent to Customer.io

Every quiz submission fires two API calls from the server-side route `/api/quiz/submit`:

### Call 1 — Identify (sets profile attributes)
```
PUT https://track.customer.io/api/v1/customers/{email}
Authorization: Basic base64(SITE_ID:API_KEY)
```
This creates or updates the customer profile with all flat attributes listed below. If the person completes the quiz a second time, their profile is overwritten with the latest values.

### Call 2 — Track event (fires the campaign trigger)
```
POST https://track.customer.io/api/v1/customers/{email}/events
Authorization: Basic base64(SITE_ID:API_KEY)

{
  "name": "wb_quiz_completed",         // "dev_wb_quiz_completed" on non-production
  "data": { ...all attributes below, answers: { full raw answers map } }
}
```
The event payload includes every flat attribute plus `answers` (the full raw key-value map of every quiz answer). The event is what triggers CIO campaigns. The `answers` field is available in event data for advanced Liquid but is not stored on the profile.

---

## Full Attribute Reference

All attributes are set on the customer profile via the Identify call and also included in the event `data` object.

| Attribute | Type | Values / Notes |
|-----------|------|----------------|
| `quiz_flow` | string | `"undiagnosed"` or `"diagnosed"` |
| `quiz_risk_score` | number | Raw numeric score (0+) |
| `quiz_risk_level` | string | `"high"` (score >= 6), `"moderate"` (score >= 3), `"low"` (score < 3) |
| `quiz_top_symptom` | string | `"breathing pauses during sleep"`, `"loud snoring"`, `"daily fatigue"`, `"morning headaches"`, `"stopped using CPAP"`, `"struggling with CPAP"`, or `"disrupted sleep"` |
| `quiz_tags` | string | Comma-separated tag list (e.g. `"high-risk,snorer"`) — for reference only, use flat attrs for segmentation |
| `quiz_state` | string or null | Two-letter state code (e.g. `"FL"`) from quiz answer |
| `quiz_insurance` | string or null | Insurance type from quiz answer |
| `quiz_completed_at` | number | Unix timestamp (seconds) |
| `quiz_snoring` | string or null | Answer to snoring question: `"no"`, `"yes-quiet"`, `"yes-loud"` |
| `quiz_sleepiness` | string or null | Answer to daytime sleepiness: `"never"`, `"sometimes"`, `"daily"` |
| `quiz_breathing_pauses` | string or null | Answer to breathing pauses: `"yes"`, `"no"`, `"not-sure"` |
| `quiz_morning_symptoms` | string or null | Comma-separated morning symptoms (e.g. `"headache,dry-mouth"`) |
| `quiz_bmi` | string or null | BMI range selected in quiz |
| `quiz_conditions` | string or null | Comma-separated comorbid conditions (e.g. `"hypertension,diabetes"`) |
| `quiz_cpap_satisfaction` | string or null | Diagnosed flow only: `"stopped"`, `"struggling"`, `"ok"`, `"happy"` |
| `quiz_dx_needs` | string or null | Diagnosed flow only: comma-separated needs (e.g. `"new-machine,supplies"`) |
| `quiz_utm_source` | string or null | UTM source captured at quiz entry, persisted via sessionStorage |
| `quiz_utm_medium` | string or null | UTM medium |
| `quiz_utm_campaign` | string or null | UTM campaign |
| `quiz_device` | string | `"mobile"` (viewport < 768px) or `"desktop"` |

### How UTMs are captured

UTMs are read from the URL on first page load and written to `sessionStorage`. This means they survive navigation within the quiz (e.g. if the user lands on `/get-started?utm_source=facebook` and navigates through multiple quiz steps, the UTM is still available at submission time). At submission, sessionStorage is checked first; URL params are used as fallback.

### How `quiz_top_symptom` is derived

The value is computed server-side in priority order:

1. If `breathing-pauses = "yes"` → `"breathing pauses during sleep"`
2. Else if `snoring = "yes-loud"` → `"loud snoring"`
3. Else if `daytime-sleepiness = "daily"` → `"daily fatigue"`
4. Else if `morning-symptoms` includes `"headache"` → `"morning headaches"`
5. Else if `cpap-satisfaction = "stopped"` → `"stopped using CPAP"`
6. Else if `cpap-satisfaction = "struggling"` → `"struggling with CPAP"`
7. Default → `"disrupted sleep"`

### Liquid attributes available in emails

---

## Track 0 — Waitlist (Out-of-State)

> Condition: `quiz_state` not in current service area
> Goal: Keep them warm until we expand. Collect referrals.

---

### Email 0-1 — Day 0
**Subject**: We're not in {{customer.quiz_state}} yet.

**Preview**: You'll be first to know when we are.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**You're ahead of the curve.**

Dumbo Health isn't in {{customer.quiz_state}} just yet — but you're on the list.

- We're expanding. Your state is coming.
- You'll hear from us the moment we launch there.

**CTA**: See What's Available Near You

> URL: https://dumbo.health/get-started

---

### Email 0-2 — Day 21
**Subject**: Still thinking about your sleep?

**Preview**: A few things you can do right now.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**While you wait.**

- Talk to your doctor about a sleep study referral
- Read our free guide on sleep apnea signs
- We'll reach out the moment we expand to {{customer.quiz_state}}

**CTA**: Read Our Sleep Apnea Guide

> URL: https://dumbo.health/resources/facts

---
---

## Track A — Undiagnosed High Risk

> Condition: `quiz_flow = "undiagnosed"` AND `quiz_risk_level = "high"`
> Goal: Convert to at-home sleep test purchase. Urgency without fear-mongering.

---

### Email A-1 — Day 0 (immediate)
**Subject**: Your results: worth a look.

**Preview**: Your top symptom flagged something important.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Your results came back high risk.**

You flagged **{{customer.quiz_top_symptom | default: "disrupted sleep"}}** — one of the clearest signals we look for.

- Not a diagnosis. Just a strong signal worth acting on.
- One night at home, in your own bed.
- A licensed doctor reviews your results within 48 hours.

**CTA**: Get Your At-Home Sleep Test

> URL: https://dumbo.health/at-home-sleep-test

---

### Email A-2 — Day 2
**Subject**: What better sleep actually changes.

**Preview**: More than just feeling rested.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Better sleep changes everything.**

When sleep apnea is treated, people notice shifts they weren't expecting:

- More energy. Less caffeine.
- Clearer thinking, less fog.
- Lower blood pressure.
- Quieter nights for their partner.

**CTA**: Start With an At-Home Sleep Test

> URL: https://dumbo.health/at-home-sleep-test

---

### SMS A-1 — Day 4
**Message**:
Hey, it's Dumbo Health. You checked in with us a few days ago and your results came back high risk. The at-home test ships fast and takes one night. Ready when you are: https://dumbo.health/at-home-sleep-test

---

### Email A-3 — Day 6
**Subject**: One night. Real results.

**Preview**: Here's exactly what the process looks like.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**No clinic. No stranger watching you sleep.**

- Test kit arrives in 1–2 days
- Small finger sensor, your own bed, one night
- Doctor reviews results within 48 hours
- Positive: we walk you through next steps. Negative: peace of mind.

**CTA**: Order Your Sleep Test

> URL: https://dumbo.health/at-home-sleep-test

---

### Email A-4 — Day 10
**Subject**: Still on the fence?

**Preview**: It's simpler than you're imagining.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Here's what the test actually involves.**

- Small device. Padded box. Nothing intimidating.
- Finger sensor in your own bed overnight
- Prepaid return envelope — done in the morning
- Board-certified doctor sends results in 48 hours

That's it.

**CTA**: See How It Works

> URL: https://dumbo.health/at-home-sleep-test

---

### Email A-5 — Day 16
**Subject**: We'll leave you alone after this.

**Preview**: One last thing worth knowing.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**We're not going to keep showing up.**

Your results don't expire, but every night does. We'll be here whenever you're ready, {{customer.first_name | default: "friend"}}.

**CTA**: I'm Ready. Order My Sleep Test.

> URL: https://dumbo.health/at-home-sleep-test

---
---

## Track B — Undiagnosed Moderate Risk

> Condition: `quiz_flow = "undiagnosed"` AND `quiz_risk_level = "moderate"`
> Goal: Educate, build awareness, convert to test. Softer urgency than Track A.

---

### Email B-1 — Day 0 (immediate)
**Subject**: Your results: some patterns worth knowing.

**Preview**: Moderate risk. Here's what that means for you.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Your sleep is worth a closer look.**

You flagged **{{customer.quiz_top_symptom | default: "disrupted sleep"}}** — a common early signal.

- Moderate risk doesn't mean certain. But it does mean worth checking.
- One night at home. A real answer in 48 hours.

**CTA**: Learn About the At-Home Sleep Test

> URL: https://dumbo.health/at-home-sleep-test

---

### Email B-2 — Day 4
**Subject**: What your answers are telling us.

**Preview**: {{customer.quiz_top_symptom | default: "Disrupted sleep"}} rarely shows up alone.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**{{customer.quiz_top_symptom | default: "Disrupted sleep"}} rarely shows up alone.**

- Waking up tired after a full night
- Afternoon energy crashes
- Morning headaches or dry mouth
- A partner who's mentioned snoring

Each easy to brush off. Together, they're worth listening to.

**CTA**: Take the Next Step

> URL: https://dumbo.health/at-home-sleep-test

---

### SMS B-1 — Day 7
**Message**:
Hey, Dumbo Health here. You recently checked in with us and your results came back moderate risk. The at-home test is a simple way to get a real answer. One night, no clinic. Check it out: https://dumbo.health/at-home-sleep-test

---

### Email B-3 — Day 10
**Subject**: "I never thought it would be me."

**Preview**: Sleep apnea shows up in people you wouldn't expect.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Sleep apnea doesn't look the way people think.**

It shows up across all ages, body types, and lifestyles. Moderate-risk scores surprise people more often than not.

- Kit arrives in 1–2 days. No clinic, no appointment.
- One night, one finger sensor, your own bed.
- Doctor sends results within 48 hours.

**CTA**: Order Your At-Home Sleep Test

> URL: https://dumbo.health/at-home-sleep-test

---

### Email B-4 — Day 18
**Subject**: Checking in one last time.

**Preview**: No pressure. Just one thing worth sitting with.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Still thinking? That's okay.**

Moderate-risk symptoms don't usually resolve on their own. We'll be here when you're ready, {{customer.first_name | default: "friend"}}.

**CTA**: Get Tested From Home

> URL: https://dumbo.health/at-home-sleep-test

---
---

## Track C — Undiagnosed Low Risk

> Condition: `quiz_flow = "undiagnosed"` AND `quiz_risk_level = "low"`
> Goal: Educate, keep warm, plant the seed for future action.

---

### Email C-1 — Day 0 (immediate)
**Subject**: Your results: the good news.

**Preview**: Low risk. Here's what to keep an eye on.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Your results look reassuring.**

You scored low risk for sleep apnea. You did flag **{{customer.quiz_top_symptom | default: "disrupted sleep"}}** — worth monitoring over time.

- Low risk means unlikely, not impossible
- Sleep can shift with age, stress, or lifestyle
- If anything changes, we're here

**CTA**: Read Our Sleep Health Guide

> URL: https://dumbo.health/resources/facts

---

### Email C-2 — Day 8
**Subject**: Five habits that actually help sleep.

**Preview**: Not a long list. Just the ones that work.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Sleep hygiene worth doing.**

- Same wake time every day — your body clock responds most to this
- Cut caffeine by early afternoon
- Keep your room at 65–68°F
- 20–30 min screen-free before bed
- If **{{customer.quiz_top_symptom | default: "your symptoms"}}** shift, check in with us again

**CTA**: Learn More About Sleep Apnea

> URL: https://dumbo.health/resources/facts

---

### Email C-3 — Day 30
**Subject**: How's your sleep lately?

**Preview**: A quick check worth doing right now.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**A month later — still feeling good?**

Sleep changes. Quick gut check:

- Waking up rested most mornings?
- Energy holding through the day?
- Anyone mention snoring or restless sleep?

If things have shifted, it's worth a fresh read.

**CTA**: Check In Again

> URL: https://dumbo.health/get-started

---
---

## Track D — Diagnosed Struggling or Dropout

> Condition: `quiz_flow = "diagnosed"` AND `quiz_cpap_satisfaction` is `stopped` or `struggling`
> Goal: Acknowledge their frustration, introduce alternatives (OAT, remote CPAP support), convert.

---

### Email D-1 — Day 0 (immediate)
**Subject**: CPAP not working? You're not alone.

**Preview**: There are other options. Here's what they are.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Stopping CPAP doesn't mean stopping treatment.**

You told us you're {% if customer.quiz_cpap_satisfaction == "stopped" %}no longer using your CPAP{% else %}struggling with your CPAP{% endif %}. Half of people who start CPAP feel the same way.

- Oral appliance therapy: no mask, no hose
- Remote CPAP support to dial in your settings
- Combination approaches that fit real life

**CTA**: See Your Treatment Options

> URL: https://dumbo.health/cpap

---

### Email D-2 — Day 3
**Subject**: It's not the machine. It's the fit.

**Preview**: CPAP works — just not the same way for everyone.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**CPAP is a great tool. Just not always a great fit.**

- Pressure settings matter. A poorly calibrated CPAP is miserable.
- Mask fit is half the battle. Most people have only tried one style.
- Oral appliance therapy uses no air pressure at all.

The goal is treated sleep apnea. How you get there is flexible.

**CTA**: Talk to a Sleep Doctor About Alternatives

> URL: https://dumbo.health/cpap

---

### SMS D-1 — Day 5
**Message**:
Hi, it's Dumbo Health. Struggling with CPAP is more common than you think. There are other treatment options, including ones with no mask. Worth a 5-minute read: https://dumbo.health/cpap

---

### Email D-3 — Day 8
**Subject**: What a Dumbo Health consultation actually looks like.

**Preview**: No judgment. No surprises.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Here's exactly what happens when you reach out.**

- Short intake form online. No phone calls to get started.
- A sleep specialist reviews your history and your quiz answers
- Treatment recommendations based on your specific situation
- Everything managed remotely. No waiting room, no driving.

**CTA**: Start Your Consultation

> URL: https://dumbo.health/cpap

---

### Email D-4 — Day 14
**Subject**: One more thing before we go quiet.

**Preview**: You've already done the hardest part.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**You got diagnosed. That's the hard part.**

You deserve treated sleep apnea, not just a diagnosis. We're here whenever you're ready, {{customer.first_name | default: "friend"}}.

- Oral appliance therapy. Remote CPAP support. Combination approaches.
- All managed from home.

**CTA**: Explore Your Options

> URL: https://dumbo.health/cpap

---
---

## Track E — Diagnosed and Doing OK

> Condition: `quiz_flow = "diagnosed"` AND `quiz_cpap_satisfaction` is NOT `stopped` or `struggling`
> Goal: Acknowledge, add value, keep Dumbo Health in mind for care optimization or referrals.

---

### Email E-1 — Day 0 (immediate)
**Subject**: Glad to hear your treatment is working.

**Preview**: You're doing the right thing. A few ways we can still help.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**You're one of the good ones.**

Most people with sleep apnea never get here. Genuinely — well done.

- Second opinion on your current setup if you want to optimize
- Tips for managing sleep apnea during travel
- Resources for a partner showing signs of sleep apnea

**CTA**: Browse Our Sleep Health Resources

> URL: https://dumbo.health/resources/facts

---

### Email E-2 — Day 14
**Subject**: A few things worth knowing in long-term treatment.

**Preview**: Being in treatment is the start, not the finish.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Treatment is the start, not the finish.**

- Clean your CPAP more than you think you need to
- Travel-sized machines exist — compliance on the road matters
- Annual follow-ups are recommended as your needs change
- Mask or device 2+ years old? There may be a better option.

**CTA**: Talk to Our Sleep Team

> URL: https://dumbo.health/get-started

---

### Email E-3 — Day 35
**Subject**: Know someone who might need this?

**Preview**: You figured it out. Help someone else do the same.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Sleep apnea is underdiagnosed. You know what the signs look like.**

Someone in your life might have:

- Loud snoring that wakes others up
- Always tired no matter how much they sleep
- Morning headaches or a dry mouth

The quiz is 3 minutes and free. Sharing it might change someone's life.

**CTA**: Share Dumbo Health with Someone You Know

> URL: https://dumbo.health/get-started

---
---

## Notes for CIO Setup

### Segment filters (use AND logic)

**Track A trigger**:
`quiz_flow = "undiagnosed"` AND `quiz_risk_level = "high"`

**Track B trigger**:
`quiz_flow = "undiagnosed"` AND `quiz_risk_level = "moderate"`

**Track C trigger**:
`quiz_flow = "undiagnosed"` AND `quiz_risk_level = "low"`

**Track D trigger**:
`quiz_flow = "diagnosed"` AND (`quiz_cpap_satisfaction = "stopped"` OR `quiz_cpap_satisfaction = "struggling"`)

**Track E trigger**:
`quiz_flow = "diagnosed"` AND `quiz_cpap_satisfaction` is NOT `stopped` AND is NOT `struggling`

**Track 0 trigger**:
`quiz_state` not in `["FL", "TX", "NY", "CA"]` (update list as service area expands)

### Exit condition (all tracks)
Fire the purchase event (your existing order event). Add it as a goal and exit trigger on every campaign.

### SMS notes
SMS messages require CIO's messaging add-on and a Twilio integration. Only send to contacts with `phone` attribute set and SMS consent captured. Keep under 160 characters where possible to avoid split messages.

### Liquid fallbacks
Always provide fallback for personalization tokens:

```liquid
{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}
```

```liquid
Your top symptom was **{{customer.quiz_top_symptom | default: "disrupted sleep"}}**
```

```liquid
{{customer.first_name | default: "friend"}}
```

### Unsubscribe
All emails require a visible unsubscribe link in the footer. CIO handles this automatically via their `{{unsubscribe_url}}` tag. Include it in your template footer.
