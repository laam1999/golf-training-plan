-- ============================================================
-- Caddova tracker — database schema
-- Run this once in Supabase → SQL Editor → New query → Run.
-- Safe to re-run: uses "if not exists" / "or replace" where possible.
-- ============================================================

-- ── profiles: one row per user, linked to Supabase auth ──────
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text,
  display_name text,
  created_at   timestamptz not null default now()
);

-- ── plans: a saved generated 12-week plan ────────────────────
create table if not exists public.plans (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  created_at    timestamptz not null default now(),
  status        text not null default 'active',   -- 'active' | 'archived'
  current_phase int  not null default 1,          -- manual advance for MVP
  plan_json     jsonb not null                    -- the full generated plan, as-is
);
create index if not exists plans_user_id_idx on public.plans(user_id);

-- ── session_logs: one row per completed practice session ─────
create table if not exists public.session_logs (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  plan_id       uuid not null references public.plans(id) on delete cascade,
  phase_number  int  not null,
  session_id    text not null,                    -- the session id from plan_json
  logged_at     date not null default current_date, -- practice date (backdatable)
  created_at    timestamptz not null default now(),
  results       jsonb not null default '[]',      -- [{ drillId, value, target, feel? }]
  note          text
);
create index if not exists session_logs_user_id_idx on public.session_logs(user_id);
create index if not exists session_logs_plan_id_idx on public.session_logs(plan_id);

-- ============================================================
-- Row Level Security: every user can only touch their OWN rows.
-- This is essential — the publishable key is exposed in the
-- browser, so RLS is what actually keeps users' data private.
-- ============================================================
alter table public.profiles     enable row level security;
alter table public.plans        enable row level security;
alter table public.session_logs enable row level security;

-- profiles
drop policy if exists "own profile select" on public.profiles;
drop policy if exists "own profile insert" on public.profiles;
drop policy if exists "own profile update" on public.profiles;
create policy "own profile select" on public.profiles for select using (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);

-- plans
drop policy if exists "own plans select" on public.plans;
drop policy if exists "own plans insert" on public.plans;
drop policy if exists "own plans update" on public.plans;
drop policy if exists "own plans delete" on public.plans;
create policy "own plans select" on public.plans for select using (auth.uid() = user_id);
create policy "own plans insert" on public.plans for insert with check (auth.uid() = user_id);
create policy "own plans update" on public.plans for update using (auth.uid() = user_id);
create policy "own plans delete" on public.plans for delete using (auth.uid() = user_id);

-- session_logs
drop policy if exists "own logs select" on public.session_logs;
drop policy if exists "own logs insert" on public.session_logs;
drop policy if exists "own logs update" on public.session_logs;
drop policy if exists "own logs delete" on public.session_logs;
create policy "own logs select" on public.session_logs for select using (auth.uid() = user_id);
create policy "own logs insert" on public.session_logs for insert with check (auth.uid() = user_id);
create policy "own logs update" on public.session_logs for update using (auth.uid() = user_id);
create policy "own logs delete" on public.session_logs for delete using (auth.uid() = user_id);

-- ============================================================
-- Auto-create a profile row whenever a new user signs up.
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
