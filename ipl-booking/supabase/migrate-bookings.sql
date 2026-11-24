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

drop policy if exists "Allow public booking inserts" on public.bookings;

create policy "Allow public booking inserts"
  on public.bookings
  for insert
  to anon, authenticated
  with check (true);

notify pgrst, 'reload schema';
