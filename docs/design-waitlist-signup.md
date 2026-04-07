# Feature Doc — Waitlist Signup

**Slug:** waitlist-signup  
**Type:** Full-Stack  
**Status:** Ready for implementation

---

## 1 — PRD

### 1.1 Problem Statement
The "Join the waitlist" form in `ServiceAreaBanner` collects state + interest preference from users but silently discards the data (only sets local state). The `Availability` component CTA just redirects to the app. Zero waitlist data is being captured.

### 1.2 Goals
- Capture state + interest (cash/insurance) + email from `ServiceAreaBanner` form into Supabase
- Identify + track each signup in Customer.io so CIO campaigns can target by state/interest
- Surface waitlist data in admin with a per-state breakdown for analytics

### 1.3 Non-Goals
- No email verification / double opt-in (out of scope)
- No changes to `Availability` component (it redirects to app — acceptable)
- No unsubscribe flow (CIO handles that)

### 1.4 User Stories
- As a visitor not in FL/TX, I want to join the waitlist so I'm notified when Dumbo Health launches in my state
- As an admin, I want to see a table of waitlist entries grouped by state so I know where demand is highest

### 1.5 Acceptance Criteria
1. Submitting the form with state + interest + email inserts a row into `waitlist` table
2. CIO receives a `waitlist_joined` identify + event with `waitlist_state`, `waitlist_interest`, `waitlist_source`
3. Submitting without email shows a validation error (email required)
4. Duplicate submissions (same email) return `already_exists: true` — frontend shows "You're already on the list!" instead of a generic success
5. Admin `/admin/waitlist` page shows all entries sorted by date, with state + interest columns
6. Admin nav has "Waitlist" link
7. Form shows success message after submit (existing behavior kept)
8. CIO errors do not block the form success response

### 1.6 UX & Design Requirements
- Add email input field above the state select in `ServiceAreaBanner` form
- Same styling as existing inputs (rounded-xl, FCF6ED bg, midnight border)
- Placeholder: "your@email.com"
- Validation: show inline error if email blank on submit

### 1.7 PHI
No PHI involved. Email + state + interest only.

---

## 2 — ARD

### 2.1 Architecture
```
ServiceAreaBanner (client form)
  → POST /api/waitlist/join (Next.js route handler)
    → Supabase: upsert waitlist row
    → CIO Track API: identify + track waitlist_joined event
      (CIO error swallowed — non-blocking)

Admin /admin/waitlist (server component)
  → Supabase: select waitlist, order by created_at desc
```

### 2.2 Environment Variables
All already exist:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (for public inserts)
- `CUSTOMERIO_SITE_ID`
- `CUSTOMERIO_API_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (for admin reads via `createAdminClient`)

### 2.3 Affected Files
| File | Change |
|------|--------|
| `src/components/shared/service-area-banner.tsx` | Add email field, wire form to API |
| `src/app/api/waitlist/join/route.ts` | **NEW** — POST handler |
| `src/app/admin/(protected)/waitlist/page.tsx` | **NEW** — admin list page |
| `src/app/admin/(protected)/AdminNav.tsx` | Add Waitlist nav item |

### 2.4 Data Model

**Table: `waitlist`**
```sql
create table waitlist (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null,
  state       text not null,
  interest    text not null check (interest in ('cash', 'insurance')),
  source      text not null default 'service_area_banner',
  environment text not null default 'production'
);

-- No upsert — unique constraint used to detect duplicates and inform the user
create unique index waitlist_email_idx on waitlist (email);
```

RLS: public insert (anon key), service role for admin reads.

### 2.5 API Design

**POST /api/waitlist/join**

Request:
```typescript
const WaitlistSchema = z.object({
  email:    z.string().email(),
  state:    z.string().min(1),
  interest: z.enum(["cash", "insurance"]),
  source:   z.string().default("service_area_banner"),
});
```

Response:
```typescript
{ success: true }
// or
{ success: true, already_exists: true }  // email already on list
// or
{ error: string }  // 400 / 500
```

CIO event: `waitlist_joined`
CIO attributes: `waitlist_state`, `waitlist_interest`, `waitlist_source`, `waitlist_joined_at`

### 2.6 Security
- Zod validation at API boundary
- Anon key for public inserts (RLS: insert-only for anon)
- Service role key only in admin server component (never exposed to client)
- No PHI, no auth required for submission

---

## 3 — Design Doc

### 3.1 System Flow
```
User fills form (email + state + interest)
  → onClick → POST /api/waitlist/join
    → validate with Zod
    → check if email exists: supabase.from("waitlist").select("id").eq("email", email).maybeSingle()
      → if exists: return { success: true, already_exists: true }  ← skip CIO (already notified)
    → supabase.from("waitlist").insert({ email, state, interest, source, environment })
    → notifyCIO(email, state, interest, source) [fire-and-forget]
      → PUT /customers/:email  (identify with attrs)
      → POST /customers/:email/events  (track waitlist_joined)
    → return { success: true }
  → FE: setSubmitted(true) → show success message
```

### 3.2 Error Handling
- Zod failure → 400 with details
- Supabase error → 500, logged server-side
- CIO error → swallowed (like quiz submit), never blocks response

### 3.3 State Management
`ServiceAreaBanner` already has `email`, `selectedState`, `interest`, `submitted` local state — just add `email` state + loading + error.

---

## 4 — Implementation Stages

### Stage 1 — Database (run SQL in Supabase)
- [ ] Create `waitlist` table with unique index on email
- [ ] Set RLS: anon can insert, service role can select

### Stage 2 — API Route
- [ ] Create `src/app/api/waitlist/join/route.ts`
- [ ] Zod schema, Supabase upsert, CIO notify (pattern from quiz/submit/route.ts)

### Stage 3 — Frontend Form
- [ ] Add `email` state to `ServiceAreaBanner`
- [ ] Add email input field (above state select)
- [ ] Add inline validation (email required)
- [ ] Wire button onClick to call `/api/waitlist/join`
- [ ] Add loading state to button
- [ ] Show success message: "You're on the list." (new signup)
- [ ] Show already-exists message: "You're already on the list! We'll reach out when we launch in {state}."

### Stage 4 — Admin Page
- [ ] Create `src/app/admin/(protected)/waitlist/page.tsx` (server component)
- [ ] Add "Waitlist" to `AdminNav.tsx` NAV_ITEMS
- [ ] Table columns: Date, Email, State, Interest, Source, Environment

---

## 5 — Implementation Guide

### Patterns to Follow
- API route: mirror `src/app/api/quiz/submit/route.ts` exactly
- Admin page: mirror `src/app/admin/(protected)/submissions/page.tsx` exactly
- CIO: same Basic auth pattern, same env vars

### Do Not Touch
- `src/app/api/quiz/submit/route.ts` — no changes needed
- `src/lib/supabase-admin.ts` — already works
- Any other admin pages

### PR Checklist
- [ ] `waitlist` table exists in Supabase (manual SQL or migration)
- [ ] Form submits successfully (check Supabase table)
- [ ] CIO event fires (check CIO activity log)
- [ ] Admin `/admin/waitlist` loads without error
- [ ] Nav item appears

---

## 6 — Implementation Prompt (6a — Full-Stack)

Please read `docs/design-waitlist-signup.md` fully before writing any code.

Review Section 3.1 (system flow) and Section 2.3 (affected files). Implement stage by stage per Section 4. Complete every to-do in Stage N before Stage N+1.

Keep changes conservative and minimal — follow existing patterns exactly (quiz/submit route, submissions admin page). Only touch the files listed in Section 2.3. When done: no errors, nothing breaks, no regressions.
