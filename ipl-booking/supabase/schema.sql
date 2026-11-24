create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_name text not null check (char_length(user_name) between 1 and 100),
  match_id integer not null,
  team1 text not null,
  team2 text not null,
  match_date text not null,
  match_time text not null,
  venue text not null,
  stand text not null check (stand in ('general', 'premium', 'vip')),
  tickets integer not null check (tickets between 1 and 10),
  price_per_ticket integer not null check (price_per_ticket > 0),
  total_amount integer not null check (total_amount = price_per_ticket * tickets),
  created_at timestamptz not null default now()
);

alter table public.bookings
  add column if not exists user_name text,
  add column if not exists match_id integer,
  add column if not exists team1 text,
  add column if not exists team2 text,
  add column if not exists match_date text,
  add column if not exists match_time text,
  add column if not exists venue text,
  add column if not exists stand text,
  add column if not exists tickets integer,
  add column if not exists price_per_ticket integer,
  add column if not exists total_amount integer;

alter table public.bookings enable row level security;

grant insert on table public.bookings to anon, authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'bookings'
      and policyname = 'Allow public booking inserts'
  ) then
    create policy "Allow public booking inserts"
      on public.bookings
      for insert
      to anon, authenticated
      with check (true);
  end if;
end
$$;

notify pgrst, 'reload schema';
