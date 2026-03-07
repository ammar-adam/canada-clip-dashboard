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

export const WEEKLY_STOLEN = [
  { day: "Mon", stolen: 28, brand: "Jansport" },
  { day: "Tue", stolen: 35, brand: "Herschel" },
  { day: "Wed", stolen: 31, brand: "North Face" },
  { day: "Thu", stolen: 42, brand: "Jansport" },
  { day: "Fri", stolen: 38, brand: "Herschel" },
  { day: "Sat", stolen: 51, brand: "North Face" },
  { day: "Sun", stolen: 22, brand: "Others" },
];

export const COMPETITOR_BREAKDOWN = [
  { name: "Jansport", customers: 89, percent: 36, color: "#FF6B6B" },
  { name: "Herschel", customers: 71, percent: 29, color: "#4ECDC4" },
  { name: "North Face", customers: 54, percent: 22, color: "#45B7D1" },
  { name: "Others", customers: 33, percent: 13, color: "#96CEB4" },
];

export const ACTIVITY_FEED = [
  { id: "1", time: "2 mins ago", query: "backpack under $200", intercepted: "Jansport.com", action: "Purchased", province: "ON" },
  { id: "2", time: "4 mins ago", query: "Canadian made backpack", intercepted: "Herschel.com", action: "Clicked", province: "BC" },
  { id: "3", time: "6 mins ago", query: "hiking pack Canada", intercepted: "NorthFace.com", action: "Viewed", province: "QC" },
  { id: "4", time: "8 mins ago", query: "Jansport alternative", intercepted: "Jansport.com", action: "Clicked", province: "AB" },
  { id: "5", time: "11 mins ago", query: "best backpack for students", intercepted: "Herschel.com", action: "Viewed", province: "ON" },
  { id: "6", time: "14 mins ago", query: "durable canvas backpack", intercepted: "NorthFace.com", action: "Purchased", province: "BC" },
  { id: "7", time: "17 mins ago", query: "backpack under $200", intercepted: "Jansport.com", action: "Viewed", province: "MB" },
  { id: "8", time: "20 mins ago", query: "Canadian hiking gear", intercepted: "REI.com", action: "Clicked", province: "ON" },
  { id: "9", time: "23 mins ago", query: "backpack under $200", intercepted: "Jansport.com", action: "Purchased", province: "QC" },
  { id: "10", time: "26 mins ago", query: "eco friendly backpack", intercepted: "Herschel.com", action: "Viewed", province: "NS" },
];

export const DEFAULT_LISTING =
  "Northbound Packs — handmade hiking backpacks. Durable canvas material. Multiple sizes. Ships across Canada. Starting at $89.";

export const ACTIVE_TRIGGERS = [
  { query: "backpack under $200", impressions: 847, trend: "up" as const },
  { query: "Canadian made backpack", impressions: 312, trend: "up" as const },
  { query: "hiking pack Canada", impressions: 201, trend: "up" as const },
  { query: "Jansport alternative", impressions: 156, trend: "down" as const },
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
