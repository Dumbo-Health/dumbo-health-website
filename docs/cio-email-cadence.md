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
**Subject**: We're not in {{customer.quiz_state}} yet, but we're working on it.

**Preview**: You're not forgotten. Here's what we have for you right now.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: You're ahead of the curve.

That check-in was a smart move. You already know more about your sleep than most people ever will. That matters.

Here's where things stand:

- Dumbo Health isn't in {{customer.quiz_state}} just yet
- We're expanding, and your state is on our list
- You'll be one of the first to know when we launch there
- In the meantime, there are a few things you can do today

**CTA**: See What's Available Near You

> URL: https://dumbo.health/get-started

---

### Email 0-2 — Day 21
**Subject**: A small update from Dumbo Health

**Preview**: Still thinking about your sleep? Good. Here's something useful.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: Sleep better while you wait.

We're still not in {{customer.quiz_state}} yet, but that doesn't mean you're stuck.

Here's what you can do right now:

- Talk to your primary care doctor about a referral for a sleep study
- Read our free guide on recognizing sleep apnea symptoms
- Share Dumbo Health with a friend who lives somewhere we do serve
- Stay on this list. We'll reach out the moment we expand to your area.

**CTA**: Read Our Sleep Apnea Guide

> URL: https://dumbo.health/resources/facts

---
---

## Track A — Undiagnosed High Risk

> Condition: `quiz_flow = "undiagnosed"` AND `quiz_risk_level = "high"`
> Goal: Convert to at-home sleep test purchase. Urgency without fear-mongering.

---

### Email A-1 — Day 0 (immediate)
**Subject**: Your recent visit: a note from us

**Preview**: Here's what we found, and what it means for you.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: Your results are in, and they're worth paying attention to.

You recently stopped by Dumbo Health and shared some information about your sleep. Based on what you told us, your results came back in the high-risk range for sleep apnea. That's not a diagnosis. It just means your symptoms match a pattern we see often, and it's worth knowing about.

Here's what stood out:

- Your top symptom was **{{customer.quiz_top_symptom | default: "disrupted sleep"}}**, one of the clearest signals we look for
- Your answers match the profile of someone who would genuinely benefit from a sleep test
- An at-home sleep test takes just one night in your own bed
- A licensed sleep doctor reviews your results. Real answers, no guessing.

You came to us because something felt off. That instinct was right.

**CTA**: Get Your At-Home Sleep Test

> URL: https://dumbo.health/at-home-sleep-test

---

### Email A-2 — Day 2
**Subject**: What better sleep can actually change for you

**Preview**: It's more than just feeling rested. Here's the full picture.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: Better sleep changes more than you'd think.

Sleep apnea affects the whole body, not just your nights. When it's treated, people often notice changes they weren't even expecting.

Here's what a lot of our patients share after starting treatment:

- More energy through the day, without leaning on caffeine to get by
- Clearer thinking and better focus, with less of that foggy, dragging feeling
- Lower blood pressure (sleep apnea is a major driver that most people don't connect)
- A quieter night for their partner too

The first step is knowing for sure. What you shared with us suggests it's worth finding out. And finding out is easier than most people think.

**CTA**: Start With an At-Home Sleep Test

> URL: https://dumbo.health/at-home-sleep-test

---

### SMS A-1 — Day 4
**Message**:
Hey, it's Dumbo Health. You checked in with us a few days ago and your results came back high risk. The at-home test ships fast and takes one night. Ready when you are: https://dumbo.health/at-home-sleep-test

---

### Email A-3 — Day 6
**Subject**: Here's exactly what the process looks like, start to finish

**Preview**: One night. Real results. No waiting rooms.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: Here's what happens when you get tested.

No hospital. No stranger watching you sleep. No awkward overnight stays somewhere unfamiliar. Here's the full picture:

- Your at-home test kit arrives at your door in 1–2 days
- You wear a small, comfortable sensor on your finger for one night, in your own bed
- A licensed sleep doctor reviews your data and sends your results within 48 hours
- If sleep apnea is confirmed, we connect you with treatment options that fit your life
- If it's not, you'll have peace of mind. That's worth a lot too.

Most people say they forget the sensor is even there after a few minutes.

**CTA**: Order Your Sleep Test

> URL: https://dumbo.health/at-home-sleep-test

---

### Email A-4 — Day 10
**Subject**: Still on the fence? Here's what we hear most.

**Preview**: We get it. Here's what usually makes people feel ready.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: The test is easier than you're probably imagining.

A lot of people put off getting tested, not because they don't care, but because they're not quite sure what it involves. So let's clear that up.

Here's exactly what it looks like:

- A small device arrives at your door in a padded box. Nothing intimidating.
- You wear a finger sensor in your own bed, in your normal sleep environment
- It quietly records your oxygen levels, breathing, and heart rate overnight
- You send it back in the prepaid envelope the next morning
- A board-certified sleep doctor sends your results within 48 hours

That's it. No big commitment. Just clarity about something that affects every single day.

**CTA**: See How It Works

> URL: https://dumbo.health/at-home-sleep-test

---

### Email A-5 — Day 16
**Subject**: We'll give you some space after this.

**Preview**: One last thing, then we'll leave it with you.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: We're not going to keep showing up. But here's what we want you to know.

It's been a couple of weeks since your check-in. We've shared a lot. We understand if now isn't the right moment. Life gets full.

Before we go quiet, just a few things worth keeping in mind:

- Your results don't expire, but every night does
- The at-home test is here whenever you're ready. No pressure, no deadline.
- If your symptoms have shifted, the quiz is always open
- We'll be here when the time feels right

Wishing you better nights ahead, {{customer.first_name | default: "friend"}}.

**CTA**: I'm Ready. Order My Sleep Test.

> URL: https://dumbo.health/at-home-sleep-test

---
---

## Track B — Undiagnosed Moderate Risk

> Condition: `quiz_flow = "undiagnosed"` AND `quiz_risk_level = "moderate"`
> Goal: Educate, build awareness, convert to test. Softer urgency than Track A.

---

### Email B-1 — Day 0 (immediate)
**Subject**: Your recent visit: here's what we found

**Preview**: Moderate risk. Here's what that means for you specifically.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: Your results show some patterns worth paying attention to.

You recently stopped by Dumbo Health and shared some information about your sleep. Based on what you told us, you're in the moderate-risk range for sleep apnea. That's not a diagnosis, and it doesn't mean anything is certain. But it does mean your sleep is worth a closer look.

Here's what your answers showed:

- Your top symptom was **{{customer.quiz_top_symptom | default: "disrupted sleep"}}**, a common early signal
- Several of your answers match patterns we see in people who go on to get diagnosed
- Many people in the moderate range are genuinely surprised by their test results
- A one-night at-home sleep test can give you a clear answer within 48 hours

You don't have to wonder. You can find out.

**CTA**: Learn About the At-Home Sleep Test

> URL: https://dumbo.health/at-home-sleep-test

---

### Email B-2 — Day 4
**Subject**: What your quiz answers are actually telling us

**Preview**: Your top symptom rarely shows up alone. Here's the full picture.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: Your symptoms are speaking up. Worth listening to.

You flagged **{{customer.quiz_top_symptom | default: "disrupted sleep"}}** during your check-in. It's one of the most common signals we look for. And it rarely shows up alone.

Here's what people in the moderate-risk range usually have in common:

- Waking up tired even after what feels like a full night of sleep
- Afternoon energy dips that are hard to shake
- Morning headaches or a dry mouth when you wake up
- A partner or roommate who's mentioned snoring or restless sleep

Each of these is easy to brush off on its own. Together, they're telling you something. And finding out what's going on is easier than most people expect.

**CTA**: Take the Next Step

> URL: https://dumbo.health/at-home-sleep-test

---

### SMS B-1 — Day 7
**Message**:
Hey, Dumbo Health here. You recently checked in with us and your results came back moderate risk. The at-home test is a simple way to get a real answer. One night, no clinic. Check it out: https://dumbo.health/at-home-sleep-test

---

### Email B-3 — Day 10
**Subject**: "I never thought it would be me."

**Preview**: A lot of people in the moderate range say the same thing after getting tested.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: Sleep apnea shows up in people you wouldn't expect.

Most people picture sleep apnea as something that happens to someone else: older, heavier, louder snorer. But it shows up across all ages, body types, and lifestyles. Moderate-risk scores surprise people more often than not.

Here's what getting tested actually looks like:

- Your kit arrives in 1–2 days. No clinic visit, no appointment required.
- One night with a small, comfortable finger sensor in your own bed
- A licensed sleep doctor reads your data and sends a clear report
- If there's a diagnosis, we walk you through next steps together
- If there isn't, you'll know. And that peace of mind matters.

There's no downside to knowing.

**CTA**: Order Your At-Home Sleep Test

> URL: https://dumbo.health/at-home-sleep-test

---

### Email B-4 — Day 18
**Subject**: Checking in one last time.

**Preview**: No pressure. Just one last thing worth sitting with.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: Still thinking about it? That's okay.

It's been a couple of weeks since your check-in. We've shared some information and we don't want to be the email you dread seeing.

Before we step back, a few things worth sitting with:

- Sleep apnea affects around 1 billion people worldwide, most of them undiagnosed
- Moderate-risk symptoms don't usually resolve on their own over time
- Getting tested now means better sleep sooner, and that ripples into everything
- The at-home test is here whenever you're ready

No rush. No hard sell. Just an open door, {{customer.first_name | default: "friend"}}.

**CTA**: Get Tested From Home

> URL: https://dumbo.health/at-home-sleep-test

---
---

## Track C — Undiagnosed Low Risk

> Condition: `quiz_flow = "undiagnosed"` AND `quiz_risk_level = "low"`
> Goal: Educate, keep warm, plant the seed for future action.

---

### Email C-1 — Day 0 (immediate)
**Subject**: Your recent visit: the good news

**Preview**: Low risk. Here's what to keep an eye on going forward.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: Good news: your results look reassuring.

You scored in the low-risk range for sleep apnea. That's genuinely great to see. Your answers didn't flag the patterns we usually associate with a diagnosis.

A few things worth keeping in mind going forward:

- Low risk means unlikely, not impossible
- Your top reported symptom was **{{customer.quiz_top_symptom | default: "disrupted sleep"}}**, which is worth monitoring over time
- Sleep patterns can shift with age, stress, or lifestyle changes
- If anything changes, you can always check in again. We'll be here.

For now, your sleep looks healthy. We'll share a few simple tips in the coming days to help keep it that way.

**CTA**: Read Our Sleep Health Guide

> URL: https://dumbo.health/resources/facts

---

### Email C-2 — Day 8
**Subject**: Five small things that make a real difference for sleep

**Preview**: Not a long list. Just the ones that actually work.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: Sleep hygiene that's actually worth doing.

You scored low risk, which is great. But there's always room to sleep better. Here are five habits that research backs:

- **Consistent wake time**, even on weekends. Your body clock responds to this more than anything else.
- **Cut caffeine by early afternoon.** It stays in your system longer than most people realize.
- **Keep your room cool.** 65–68°F is the research-backed sweet spot.
- **A short screen-free buffer before bed.** Even 20–30 minutes helps your brain wind down.
- **Check in with yourself every few months.** If symptoms like {{customer.quiz_top_symptom | default: "disrupted sleep"}} shift, it's worth checking in with us again.

You're already ahead of most people just by paying attention.

**CTA**: Learn More About Sleep Apnea

> URL: https://dumbo.health/resources/facts

---

### Email C-3 — Day 30
**Subject**: A quick check-in: how's your sleep lately?

**Preview**: It's been a month. A few questions worth asking yourself.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: A month later: how are you feeling?

When you last checked in with us, things looked reassuring. But sleep changes. Stress, travel, weight shifts, and life in general can all move the needle.

A quick check worth doing right now:

- Are you waking up feeling rested most mornings?
- Is your energy holding steady through the day?
- Has anyone mentioned snoring or restless sleep?
- Are you nodding off faster than feels normal?

If any of those have shifted, your risk level may have too. A check-in takes about 3 minutes and gives you a fresh read on where things stand.

**CTA**: Check In Again

> URL: https://dumbo.health/get-started

---
---

## Track D — Diagnosed Struggling or Dropout

> Condition: `quiz_flow = "diagnosed"` AND `quiz_cpap_satisfaction` is `stopped` or `struggling`
> Goal: Acknowledge their frustration, introduce alternatives (OAT, remote CPAP support), convert.

---

### Email D-1 — Day 0 (immediate)
**Subject**: CPAP not working for you? You're far from alone.

**Preview**: Most people who stop don't know there are other options. Here's what they are.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: Stopping CPAP doesn't mean stopping treatment.

You told us you are {% if customer.quiz_cpap_satisfaction == "stopped" %}no longer using your CPAP{% else %}struggling to stick with your CPAP{% endif %}. We hear this constantly. You're not the exception. You're the rule.

Here's something the sleep medicine world doesn't say loudly enough:

- CPAP has a real dropout rate. Studies put it as high as 50% in the first year.
- There are other FDA-cleared treatments that don't involve a mask or hose
- Oral appliance therapy is a quiet, mask-free option that works well for many people
- Remote CPAP support can help if you want to stick with it but need your settings adjusted

You already did the hard part: getting diagnosed. There's no reason to live with untreated sleep apnea when other paths exist.

**CTA**: See Your Treatment Options

> URL: https://dumbo.health/cpap

---

### Email D-2 — Day 3
**Subject**: Why CPAP doesn't work for everyone (it's not your fault)

**Preview**: The machine isn't wrong. But it doesn't fit everyone. Here's the science.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: CPAP is a great tool. It's just not always a great fit.

CPAP works by keeping your airway open with pressurized air. For some people, it's life-changing from night one. For others, the mask leaks, the air feels suffocating, or sleep just isn't possible through it. Both experiences are completely valid.

Here's what most people don't know:

- **Pressure settings matter a lot.** A poorly calibrated CPAP is miserable. A well-calibrated one is usually very tolerable.
- **Mask fit is half the battle.** There are dozens of styles and most people have only tried one or two.
- **Oral appliance therapy** is an alternative that uses no air pressure at all. It repositions your jaw to keep the airway open.
- **Some people do best with a combination**, like lower-pressure CPAP plus an oral appliance together.

The goal is treated sleep apnea. How you get there is flexible.

**CTA**: Talk to a Sleep Doctor About Alternatives

> URL: https://dumbo.health/cpap

---

### SMS D-1 — Day 5
**Message**:
Hi, it's Dumbo Health. Struggling with CPAP is more common than you think. There are other treatment options, including ones with no mask. Worth a 5-minute read: https://dumbo.health/cpap

---

### Email D-3 — Day 8
**Subject**: Here's what a Dumbo Health consultation actually looks like

**Preview**: No judgment. No pressure. Just a real conversation about your sleep.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: What happens when you reach out to us.

Going back into the healthcare system after a frustrating experience can feel like a lot. So here's exactly what a consultation with Dumbo Health looks like. No surprises:

- You fill out a short intake form online. No phone calls required to get started.
- A licensed sleep specialist reviews your history and your quiz answers
- They recommend one or more treatment options based on your specific situation
- If you move forward, everything is managed remotely from your home
- No waiting room. No driving anywhere. No starting over from scratch.

We've helped a lot of people who tried and gave up on CPAP find treatments that actually work for them.

**CTA**: Start Your Consultation

> URL: https://dumbo.health/cpap

---

### Email D-4 — Day 14
**Subject**: One more thing before we go quiet.

**Preview**: We don't want to crowd your inbox. But this is worth saying.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: You've already done the hardest part.

You got diagnosed. That means you know exactly what's happening when you sleep, and that puts you way ahead of the millions of people who are still wondering.

The next step doesn't have to be going back to something that didn't work. There are other options, and we're here to help you find the right one.

A few things worth remembering:

- You deserve treated sleep apnea, not just a diagnosis
- Oral appliance therapy, remote CPAP support, and combination approaches are all available
- Everything at Dumbo Health is managed from home. No clinic, no waiting room.
- We're here whenever you're ready, {{customer.first_name | default: "friend"}}

**CTA**: Explore Your Options at Dumbo Health

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

**Heading**: You're one of the good ones.

You recently stopped by Dumbo Health and told us your sleep apnea treatment is going reasonably well. That puts you in a group that most people with sleep apnea never reach. Genuinely, well done.

A few things we can offer even when things are going well:

- A second opinion on your current setup, in case there's room to optimize
- Resources for managing sleep apnea during travel, when routines fall apart
- Support for a partner or family member who may be showing signs of sleep apnea
- A community of people who get what it's like to live with and manage this condition

We're not just here for people who are struggling. We're here for the long run.

**CTA**: Browse Our Sleep Health Resources

> URL: https://dumbo.health/resources/facts

---

### Email E-2 — Day 14
**Subject**: A few things we think you'll actually find useful.

**Preview**: Practical tips for people already in treatment.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: Being in treatment is the start, not the finish.

Effective sleep apnea treatment means more than just wearing the device. Here are a few things people in long-term treatment say made a real difference:

- **CPAP cleaning matters more than most people think.** A dirty machine affects both performance and your health.
- **Travel-sized machines exist** and make compliance on the road much easier if you travel frequently.
- **Annual follow-ups are recommended.** Weight changes, sleep position shifts, and aging can change your treatment needs over time.
- **Equipment evolves.** If your mask or device is more than 2 years old, there may be a meaningfully better option available.

If any of this sparks a question, we're happy to help. Reach out anytime.

**CTA**: Talk to Our Sleep Team

> URL: https://dumbo.health/get-started

---

### Email E-3 — Day 35
**Subject**: Know someone who might need this?

**Preview**: Sleep apnea is underdiagnosed. You might know someone who needs a nudge.

---

{% if customer.first_name %}Hi {{customer.first_name}},{% else %}Hi there,{% endif %}

**Heading**: You figured it out. Help someone else do the same.

Sleep apnea affects an estimated 1 in 4 adults, but most of them have no idea. You've been through the diagnosis process. You know what the signs look like.

If someone in your life has any of these habits, they might want to take the quiz:

- Loud snoring that wakes up other people in the house
- Always tired no matter how much they sleep
- Waking up with headaches or a dry mouth
- Falling asleep quickly in chairs or on couches
- Irritable or foggy in ways that seem out of character

It's a 3-minute check-in and it's free. Sharing it might be the thing that changes someone's life.

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
