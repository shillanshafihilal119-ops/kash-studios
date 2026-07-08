# Supabase Setup For Contact Messages

Create a Supabase project, open the SQL editor, and run this:

```sql
create table if not exists contact_messages (
  id uuid primary key,
  name text not null,
  contact text not null,
  project_type text not null default 'Not selected',
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;
```

Then add these Vercel environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_service_role_key
ADMIN_PASSCODE=your_admin_passcode
ADMIN_UNLOCK_KEY=your_secret_url_key
NEXT_PUBLIC_SITE_URL=https://your-vercel-site.vercel.app
```

Use the Supabase service role key only as a server-side Vercel environment variable. Do not expose it in the browser.
