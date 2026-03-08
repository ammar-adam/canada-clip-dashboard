export const MERCHANT = {
  name: "Northbound Packs",
  province: "Ontario",
  product: "Handmade canvas hiking backpacks",
  priceRange: "$89 - $189",
  verified: true,
} as const;

export const HERO_STATS = [
  {
    label: "Customers Stolen",
    value: "247",
    delta: "+18 this week",
    color: "red" as const,
    icon: "target" as const,
  },
  {
    label: "Clip Views",
    value: "1,832",
    delta: "+124 today",
    color: "green" as const,
    icon: "eye" as const,
  },
  {
    label: "Conversion Rate",
    value: "13.4%",
    delta: "+2.1% vs last week",
    color: "green" as const,
    icon: "trending-up" as const,
  },
  {
    label: "Revenue via Clip",
    value: "$4,210",
    delta: "+$890 this week",
    color: "green" as const,
    icon: "dollar-sign" as const,
  },
];

// Stacked bar chart: per-day breakdown by brand
export const WEEKLY_STACKED = [
  { day: "Mon", Jansport: 12, Herschel: 8, "North Face": 6, Others: 2 },
  { day: "Tue", Jansport: 15, Herschel: 11, "North Face": 7, Others: 2 },
  { day: "Wed", Jansport: 13, Herschel: 9, "North Face": 7, Others: 2 },
  { day: "Thu", Jansport: 18, Herschel: 13, "North Face": 8, Others: 3 },
  { day: "Fri", Jansport: 16, Herschel: 12, "North Face": 7, Others: 3 },
  { day: "Sat", Jansport: 21, Herschel: 15, "North Face": 11, Others: 4 },
  { day: "Sun", Jansport: 9, Herschel: 7, "North Face": 4, Others: 2 },
];

export const STACKED_COLORS = {
  Jansport: "#E5484D",
  Herschel: "#30A46C",
  "North Face": "#3B82F6",
  Others: "#6B7280",
};

// Who you're stealing from — 6 brands, CSS bars (max = Jansport 104)
export const WHO_STEALING_FROM = [
  { name: "Jansport", customers: 104, color: "#E5484D" },
  { name: "Herschel", customers: 75, color: "#30A46C" },
  { name: "North Face", customers: 50, color: "#3B82F6" },
  { name: "REI", customers: 28, color: "#F5A623" },
  { name: "MEC", customers: 19, color: "#8B5CF6" },
  { name: "Others", customers: 11, color: "#6B7280" },
];

const MAX_STEALING = 104;

export function stealingBarWidth(customers: number) {
  return (customers / MAX_STEALING) * 100;
}

// Activity feed row pool — diversify queries (exact data from spec)
export const ACTIVITY_ROW_POOL = [
  { time: "just now", query: "backpack under $200", intercepted: "Jansport.com", action: "Purchased" as const, province: "ON" },
  { time: "1 min ago", query: "best hiking boots Canada", intercepted: "MEC.ca", action: "Clicked" as const, province: "BC" },
  { time: "2 min ago", query: "Canadian made wallet", intercepted: "Herschel.com", action: "Viewed" as const, province: "QC" },
  { time: "3 min ago", query: "waterproof jacket alternative", intercepted: "NorthFace.com", action: "Purchased" as const, province: "AB" },
  { time: "4 min ago", query: "affordable travel bag", intercepted: "Samsonite.com", action: "Clicked" as const, province: "ON" },
  { time: "5 min ago", query: "handmade leather goods", intercepted: "Roots.com", action: "Viewed" as const, province: "MB" },
  { time: "6 min ago", query: "Canadian outdoor gear", intercepted: "REI.com", action: "Purchased" as const, province: "BC" },
  { time: "7 min ago", query: "tote bag under $100", intercepted: "Herschel.com", action: "Clicked" as const, province: "NS" },
  { time: "8 min ago", query: "durable school backpack", intercepted: "Jansport.com", action: "Viewed" as const, province: "ON" },
  { time: "9 min ago", query: "buy Canadian clothing brand", intercepted: "Lululemon.com", action: "Purchased" as const, province: "QC" },
];

// GEO products
export const GEO_PRODUCTS = [
  {
    id: "city-pack",
    name: "City Pack 28L",
    price: 179,
    description:
      "Northbound Packs City Pack 28L — handmade canvas hiking backpack. Durable YKK zippers. Padded laptop sleeve. Multiple colors available. Ships across Canada. $179.",
  },
  {
    id: "ridgeflex",
    name: "RidgeFlex Waterproof",
    price: 195,
    description:
      "Northbound Packs RidgeFlex Waterproof — weather-resistant hiking pack. 30L capacity. Reinforced seams. Fits 15\" laptop. Canadian made. $195.",
  },
  {
    id: "summit",
    name: "Summit Day Pack",
    price: 149,
    description:
      "Northbound Packs Summit Day Pack — lightweight daypack for trails. Breathable back panel. Two side pockets. Ships Canada-wide. $149.",
  },
  {
    id: "trail-lite",
    name: "Trail Lite",
    price: 89,
    description:
      "Northbound Packs Trail Lite — compact canvas pack. Single main compartment. Perfect for day trips. Made in Ontario. $89.",
  },
] as const;

// Keywords driving clicks (GEO page)
export const KEYWORDS_DRIVING_CLICKS = [
  { keyword: "waterproof", clicks: 89, color: "green" },
  { keyword: "handmade", clicks: 76, color: "blue" },
  { keyword: "Canada made", clicks: 71, color: "red" },
  { keyword: "durable", clicks: 58, color: "yellow" },
  { keyword: "28L", clicks: 44, color: "purple" },
  { keyword: "canvas", clicks: 31, color: "grey" },
  { keyword: "laptop sleeve", clicks: 28, color: "blue" },
];

export const ACTIVE_TRIGGERS = [
  { query: "backpack under $200", impressions: 847, trend: "up" as const },
  { query: "Canadian made backpack", impressions: 312, trend: "up" as const },
  { query: "hiking pack Canada", impressions: 201, trend: "up" as const },
  { query: "Jansport alternative", impressions: 156, trend: "down" as const },
  { query: "waterproof daypack", impressions: 134, trend: "up" as const },
  { query: "handmade bag Canada", impressions: 98, trend: "up" as const },
];

export const CLIP_PERFORMANCE = {
  views: 1832,
  taps: 456,
  purchases: 247,
  revenue: 4210,
};

export const PROVINCE_FLAGS: Record<string, string> = {
  ON: "🇨🇦",
  BC: "🇨🇦",
  QC: "🇨🇦",
  AB: "🇨🇦",
  MB: "🇨🇦",
  NS: "🇨🇦",
  SK: "🇨🇦",
  NB: "🇨🇦",
  NL: "🇨🇦",
  PE: "🇨🇦",
};
