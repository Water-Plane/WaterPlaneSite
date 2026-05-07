-- Run this SQL in your Supabase project's SQL editor to create the tables.

-- Case Studies
create table if not exists case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text,
  author text,
  date text,
  hero_image text,
  content text,
  gallery_images text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Blog Posts
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  author text,
  published_at date,
  cover_image text,
  content text,
  tags text[] default '{}',
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security (read-only for public, full access for authenticated service role)
alter table case_studies enable row level security;
alter table blog_posts enable row level security;

-- Allow public SELECT on published content
create policy "Public can read case studies"
  on case_studies for select using (true);

create policy "Public can read published blog posts"
  on blog_posts for select using (published = true);
