-- CanadaClip v3 — run in Supabase SQL editor.
-- Enable Replication for clip_events (Database → Replication) for realtime.

-- Merchant product listings (GEO "Apply to my website")
create table if not exists public.merchant_listings (
  merchant_id text primary key,
  product_name text not null,
  description text not null,
  updated_at timestamptz not null default now()
);

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

-- Seed merchant_listings (optional — dashboard can upsert)
insert into public.merchant_listings (merchant_id, product_name, description) values
  ('backpack', 'City Pack 28L', 'Northbound Packs City Pack 28L — handmade canvas hiking backpack. Durable YKK zippers. Padded laptop sleeve. Multiple colors. Ships Canada. $179.'),
  ('streetwear', 'OG Heavyweight Tee', 'StreetRoot Co OG Heavyweight Tee — 400gsm cotton. Drop shoulder fit. Screen printed in Montreal. Sizes XS-3XL. $65.'),
  ('electronics', 'NorthCharge 20K', 'NorthTech Goods NorthCharge 20K — 20000mAh power bank. GaN charging. Dual USB-C. Made in BC. TSA approved. $89.')
on conflict (merchant_id) do update set
  product_name = excluded.product_name,
  description = excluded.description,
  updated_at = now();
