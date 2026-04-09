# Referrals Page — Implementation Plan

## Status: In Progress

### What's Done ✅

- **`src/app/referrals/page.tsx`** — Full page built with 8 sections:
  - Hero ("Your patients deserve faster answers")
  - Why Refer (Fast / Complete / Collaborative cards)
  - Partnership Tiers (Single Referral / Practice Partner / Dental Sleep Medicine)
  - How It Works (5-step dark process section)
  - What to Have Ready (3 items)
  - Referral Form (react-hook-form + Zod validation, provider + patient + insurance fields)
  - FAQ (shadcn Accordion)
  - Closing (fax + email contact)

- **`src/app/api/referrals/route.ts`** — API route:
  - Validates payload with Zod
  - Saves to Supabase `referrals` table
  - Fires Customer.io `referral_received` event (or `dev_referral_received` in non-prod)
  - CIO errors are swallowed so they never block the form submission

---

### What's Pending ❌

#### 1. Supabase `referrals` table — NOT created yet

This is the next step. Run the following SQL in the Supabase SQL editor for project `iguhaoprruznhweejeok` (website_cms):

```sql
create table if not exists public.referrals (
  id                      uuid primary key default gen_random_uuid(),
  created_at              timestamptz not null default now(),

  -- Provider
  provider_name           text not null,
  provider_npi            text,
  practice_name           text not null,
  provider_email          text not null,
  provider_fax            text,
  provider_phone          text not null,

  -- Patient
  patient_first_name      text not null,
  patient_last_name       text not null,
  patient_dob             text not null,
  patient_mobile          text not null,
  patient_state           text not null,
  patient_zip             text not null,
  patient_address         text not null,

  -- Referral
  referral_reasons        text[] not null,
  special_requests        text,

  -- Insurance
  insurance_holder_first  text,
  insurance_holder_last   text,
  insurance_provider      text,
  insurance_membership_id text,

  -- Meta
  status                  text not null default 'received',
  environment             text
);

-- RLS: allow anonymous inserts (form is public-facing, no auth)
alter table public.referrals enable row level security;

create policy "Allow public inserts"
  on public.referrals
  for insert
  to anon
  with check (true);

-- Internal read only (service role / dashboard only — no public select)
```

#### 2. Verify API uses service role key (optional hardening)

Currently `src/app/api/referrals/route.ts` uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
Since this is a server-side route, it could use the service role key instead to bypass RLS entirely.
Either approach works — anon + permissive RLS insert policy is fine for now.

#### 3. Add `/referrals` to the navbar (optional)

Check `src/components/layout/navbar.tsx` — decide if this page should be linked from the nav
(e.g. under a "For Providers" link) or left as a direct-URL only page.

#### 4. End-to-end smoke test

Once the table is created:
1. Visit `/referrals`
2. Fill and submit the form
3. Confirm row appears in Supabase `referrals` table
4. Confirm CIO event fires in the CIO activity log for the provider email

---

### Files Involved

| File | Status |
|------|--------|
| `src/app/referrals/page.tsx` | ✅ Done |
| `src/app/api/referrals/route.ts` | ✅ Done |
| Supabase `referrals` table | ❌ Needs to be created |
| Navbar link | ⬜ Optional / TBD |

---

### Customer.io Events

| Environment | Event name |
|-------------|-----------|
| Production | `referral_received` |
| Dev / local | `dev_referral_received` |

CIO should be configured to trigger an internal alert (to the DumboHealth team) and a patient outreach sequence on `referral_received`.

---

### Next Session — Pick Up Here

1. Run the SQL above in Supabase project `iguhaoprruznhweejeok`
2. Smoke test the form end-to-end
3. Decide on navbar link
4. Commit and push to `dev-sergio`
