-- PawCoach Supabase Setup
-- Dieses SQL im Supabase Dashboard → SQL Editor ausführen

-- Wissenseinträge
create table knowledge (
  id bigint generated always as identity primary key,
  category text not null,
  content text not null,
  created_at timestamptz default now()
);

-- System-Prompt (vom Prompt Builder generiert)
create table system_prompts (
  id text primary key default 'trainer',
  prompt text not null,
  updated_at timestamptz default now()
);

-- Row Level Security: alles erlauben (Backend nutzt anon key)
alter table knowledge enable row level security;
alter table system_prompts enable row level security;

create policy "allow_all_knowledge" on knowledge for all using (true) with check (true);
create policy "allow_all_prompts" on system_prompts for all using (true) with check (true);
