# IPL Ticket Booking

## Run locally

From this directory, install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

The `.env.local` file must contain the Supabase project URL and the project's
publishable/anon key:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-or-anon-key
```

Restart `npm run dev` after changing environment variables. Never put a
`service_role` or secret key in a `VITE_` variable.

## Set up the bookings table

For a new project, open **SQL Editor** and run
[`supabase/schema.sql`](./supabase/schema.sql). If `public.bookings` already
exists, run [`supabase/migrate-bookings.sql`](./supabase/migrate-bookings.sql)
instead to add missing columns and refresh the API schema cache. Then submit a
test booking in the app and check Supabase **Table Editor**.

The table uses Row Level Security and permits public booking inserts because
this app does not currently have user sign-in. Do not add a public read policy
or expose secret keys in the browser.
