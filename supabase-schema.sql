-- CanadaClip — run in Supabase SQL editor.
-- Enable Replication for clip_events (Database → Replication) for realtime.

-- If you already have merchant_listings with only merchant_id as PK, run this first:
-- alter table public.merchant_listings drop constraint if exists merchant_listings_pkey;
-- alter table public.merchant_listings add primary key (merchant_id, product_name);

-- Merchant product listings (GEO "Apply to my website")
-- One row per product per merchant so merchant websites can pull all listings and auto-update.
create table if not exists public.merchant_listings (
  merchant_id text not null,
  product_name text not null,
  description text not null,
  updated_at timestamptz not null default now(),
  primary key (merchant_id, product_name)
);

comment on table public.merchant_listings is 'GEO-optimized product descriptions; merchant sites fetch by merchant_id to sync all products. Query: select product_name, description, updated_at from merchant_listings where merchant_id = $1 order by updated_at desc.';

-- App Clip events (live activity feed)
create table if not exists public.clip_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  merchant_id text not null,
  query text not null,
  intercepted text not null,
  action text not null check (action in ('Viewed', 'Clicked', 'Purchased')),
  province text not null
);

alter table public.clip_events enable row level security;
create policy "Allow anon read for realtime"
  on public.clip_events for select to anon using (true);
create policy "Service role insert"
  on public.clip_events for insert to service_role with check (true);

-- Optional: allow merchant sites (anon or service) to read their listings
create policy "Allow read merchant_listings"
  on public.merchant_listings for select using (true);

-- Seed merchant_listings (optional — dashboard upserts per product)
insert into public.merchant_listings (merchant_id, product_name, description) values
  ('backpack', 'City Pack 28L ($179)', 'Northbound Packs City Pack 28L — handmade canvas hiking backpack. Durable YKK zippers. Padded laptop sleeve. Multiple colors. Ships Canada. $179.'),
  ('streetwear', 'OG Heavyweight Tee ($65)', 'StreetRoot Co OG Heavyweight Tee — 400gsm cotton. Drop shoulder fit. Screen printed in Montreal. Sizes XS-3XL. $65.'),
  ('electronics', 'NorthCharge 20K ($89)', 'NorthTech Goods NorthCharge 20K — 20000mAh power bank. GaN charging. Dual USB-C. Made in BC. TSA approved. $89.'),
  ('shawarma', 'Classic Shawarma Plate ($14)', 'Shawarma Palace Classic Shawarma Plate — tender beef or chicken, fresh veggies, rice, and house garlic sauce. Halal. Made in Ontario. $14.')
on conflict (merchant_id, product_name) do update set
  description = excluded.description,
  updated_at = now();
