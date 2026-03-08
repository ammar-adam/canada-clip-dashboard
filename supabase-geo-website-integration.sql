-- CanadaClip — GEO "Add this to my website" → northbound-backpacks storefront.
-- Run this in the Supabase SQL editor for the project connected to the dashboard.
-- Then in Supabase → Settings → API copy:
--   Project URL → NEXT_PUBLIC_SUPABASE_URL
--   anon key → NEXT_PUBLIC_SUPABASE_ANON_KEY
--   service_role key → SUPABASE_SERVICE_ROLE_KEY (server only, keep secret)

create table if not exists merchant_listings (
  id              uuid primary key default gen_random_uuid(),
  merchant_id     text not null default 'northbound-packs',
  product_id      text not null,
  product_name    text not null,
  description     text not null,
  updated_at      timestamptz not null default now(),
  unique (merchant_id, product_id)
);

-- Seed the default product so the storefront always has a row to read
insert into merchant_listings (merchant_id, product_id, product_name, description)
values (
  'northbound-packs',
  'city-pack-28l',
  'City Pack 28L',
  'Northbound Packs City Pack 28L — handmade canvas hiking backpack. Durable YKK zippers. Padded laptop sleeve. Multiple colors available. Ships across Canada. $179.'
)
on conflict (merchant_id, product_id) do nothing;

-- Enable Row Level Security but allow public reads (storefront needs it)
alter table merchant_listings enable row level security;

create policy "Public can read listings"
  on merchant_listings for select
  using (true);

create policy "Service role can update listings"
  on merchant_listings for update
  using (true);

-- Grant anon read (for the storefront's client-side fetch)
grant select on merchant_listings to anon;
