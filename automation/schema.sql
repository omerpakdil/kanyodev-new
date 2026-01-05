-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. COMPANIES Table
create table if not exists companies (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  website text unique, -- Unique constraint to prevent duplicates
  email text,
  phone text,
  address text, -- Added address column
  sector text,
  city text,
  source text,
  scraped_at timestamptz,
  created_at timestamptz default now()
);

-- 2. ANALYSES Table
create table if not exists analyses (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  website_summary text,
  identified_needs jsonb,
  suggested_services jsonb,
  ai_confidence float,
  analyzed_at timestamptz default now()
);

-- 3. EMAILS Table
create table if not exists emails (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  analysis_id uuid references analyses(id) on delete cascade,
  subject text,
  body text,
  status text default 'pending', -- 'pending', 'sent', 'failed', 'opened', 'replied'
  sent_at timestamptz,
  opened_at timestamptz,
  resend_id text,
  created_at timestamptz default now()
);

-- 4. SCRAPE SOURCES Table
create table if not exists scrape_sources (
  id uuid primary key default uuid_generate_v4(),
  name text,
  url text,
  type text,
  selector_config jsonb,
  last_scraped_at timestamptz,
  is_active boolean default true
);

-- Helper function to find companies needing analysis
create or replace function companies_without_analysis()
returns setof uuid as $$
  select c.id from companies c
  left join analyses a on c.id = a.company_id
  where a.id is null;
$$ language sql;
