export type MerchantId = "backpack" | "streetwear" | "electronics" | "shawarma";

export type MerchantConfig = {
  email: string;
  business: string;
  province: string;
  product_category: string;
  primary_competitor: string;
  accent_color: string;
};

export const MERCHANT_CONFIG: Record<MerchantId, MerchantConfig> = {
  backpack: {
    email: "backpack@canadaclip.ca",
    business: "Northbound Packs",
    province: "Ontario",
    product_category: "Hiking backpacks",
    primary_competitor: "Jansport",
    accent_color: "#C8102E",
  },
  streetwear: {
    email: "streetwear@canadaclip.ca",
    business: "StreetRoot Co",
    province: "Quebec",
    product_category: "Urban streetwear",
    primary_competitor: "Supreme",
    accent_color: "#C8102E",
  },
  electronics: {
    email: "electronics@canadaclip.ca",
    business: "NorthTech Goods",
    province: "British Columbia",
    product_category: "Consumer electronics accessories",
    primary_competitor: "Anker",
    accent_color: "#C8102E",
  },
  shawarma: {
    email: "shawarma@canadaclip.ca",
    business: "Shawarma Palace",
    province: "Ontario",
    product_category: "Restaurant / Food",
    primary_competitor: "McDonald's",
    accent_color: "#C8102E",
  },
};

export type Stats = {
  stolen: number;
  views: number;
  conversionRate: number;
  revenue: number;
};

export type Competitor = { name: string; count: number; color: string };

export type KeywordMetric = {
  word: string;
  views: number;
  clicks: number;
  purchases: number;
};

export type Trigger = { query: string; impressions: number; trend: "up" | "down" };

export type ActivityRow = {
  time: string;
  query: string;
  intercepted: string;
  action: "Viewed" | "Clicked" | "Purchased";
  province: string;
};

export type WeeklyDay = {
  day: string;
  [brand: string]: number | string;
};

export type ClipPreview = {
  image: string;
  productName: string;
  price: string;
  sourceDomain: string;
  triggerUrl: string;
};

export type RevenueByPeriod = { period: string; revenue: number };
export type RevenueByProvince = { province: string; revenue: number };
export type RevenueByBrand = { name: string; revenue: number };
export type ViewsOverTime = { date: string; views: number };

export type MerchantData = {
  business: string;
  province: string;
  stats: Stats;
  competitors: Competitor[];
  products: string[];
  productDescriptions: Record<string, string>;
  keywords: Record<string, KeywordMetric[]>;
  triggers: Trigger[];
  activityFeed: ActivityRow[];
  weeklyStolen: WeeklyDay[];
  clipPreview: ClipPreview;
  website: string;
  revenueDaily: RevenueByPeriod[];
  revenueWeekly: RevenueByPeriod[];
  revenueByProvince: RevenueByProvince[];
  revenueByBrand: RevenueByBrand[];
  viewsOverTime: ViewsOverTime[];
  funnelData: { stage: string; count: number }[];
};

export const merchantData: Record<MerchantId, MerchantData> = {
  backpack: {
    business: "Northbound Packs",
    province: "Ontario",
    stats: { stolen: 247, views: 1832, conversionRate: 13.4, revenue: 4210 },
    competitors: [
      { name: "Jansport", count: 104, color: "#C8102E" },
      { name: "Herschel", count: 75, color: "#0EA472" },
      { name: "North Face", count: 50, color: "#1E6FD4" },
      { name: "REI", count: 28, color: "#D4930A" },
      { name: "MEC", count: 19, color: "#8B5CF6" },
      { name: "Others", count: 11, color: "#2E4A6B" },
    ],
    products: [
      "City Pack 28L ($179)",
      "RidgeFlex Waterproof ($195)",
      "Summit Day Pack ($149)",
      "Trail Lite ($89)",
    ],
    productDescriptions: {
      "City Pack 28L ($179)": "Northbound Packs City Pack 28L — handmade canvas hiking backpack. Durable YKK zippers. Padded laptop sleeve. Multiple colors available. Ships across Canada. $179.",
      "RidgeFlex Waterproof ($195)": "Northbound Packs RidgeFlex Waterproof — weather-resistant hiking pack. 30L capacity. Reinforced seams. Fits 15\" laptop. Canadian made. $195.",
      "Summit Day Pack ($149)": "Northbound Packs Summit Day Pack — lightweight daypack for trails. Breathable back panel. Two side pockets. Ships Canada-wide. $149.",
      "Trail Lite ($89)": "Northbound Packs Trail Lite — compact canvas pack. Single main compartment. Perfect for day trips. Made in Ontario. $89.",
    },
    keywords: {
      "City Pack 28L ($179)": [
        { word: "waterproof", views: 234, clicks: 89, purchases: 34 },
        { word: "handmade", views: 198, clicks: 76, purchases: 28 },
        { word: "Canada made", views: 187, clicks: 71, purchases: 31 },
        { word: "durable", views: 152, clicks: 58, purchases: 19 },
        { word: "28L", views: 115, clicks: 44, purchases: 14 },
        { word: "canvas", views: 82, clicks: 31, purchases: 9 },
      ],
      "RidgeFlex Waterproof ($195)": [
        { word: "weather resistant", views: 312, clicks: 118, purchases: 42 },
        { word: "30L capacity", views: 267, clicks: 102, purchases: 38 },
        { word: "laptop sleeve", views: 198, clicks: 76, purchases: 28 },
        { word: "reinforced seams", views: 145, clicks: 54, purchases: 19 },
        { word: "hiking pack", views: 122, clicks: 47, purchases: 15 },
        { word: "Canadian made", views: 98, clicks: 38, purchases: 12 },
      ],
      "Summit Day Pack ($149)": [
        { word: "lightweight daypack", views: 289, clicks: 112, purchases: 39 },
        { word: "breathable back", views: 223, clicks: 87, purchases: 31 },
        { word: "side pockets", views: 178, clicks: 68, purchases: 24 },
        { word: "trail daypack", views: 134, clicks: 52, purchases: 18 },
        { word: "Ships Canada-wide", views: 98, clicks: 38, purchases: 12 },
        { word: "day hike", views: 76, clicks: 29, purchases: 9 },
      ],
      "Trail Lite ($89)": [
        { word: "compact pack", views: 198, clicks: 74, purchases: 26 },
        { word: "day trips", views: 167, clicks: 64, purchases: 22 },
        { word: "single compartment", views: 134, clicks: 51, purchases: 17 },
        { word: "Made in Ontario", views: 112, clicks: 42, purchases: 14 },
        { word: "canvas daypack", views: 89, clicks: 34, purchases: 11 },
        { word: "under $100", views: 72, clicks: 28, purchases: 8 },
      ],
    },
    triggers: [
      { query: "backpack under $200", impressions: 847, trend: "up" },
      { query: "Canadian made backpack", impressions: 312, trend: "up" },
      { query: "hiking pack Canada", impressions: 201, trend: "up" },
      { query: "Jansport alternative", impressions: 156, trend: "down" },
      { query: "waterproof daypack", impressions: 134, trend: "up" },
      { query: "handmade bag Canada", impressions: 98, trend: "up" },
    ],
    activityFeed: [
      { time: "just now", query: "backpack under $200", intercepted: "Jansport.com", action: "Purchased", province: "ON" },
      { time: "1 min ago", query: "best hiking boots Canada", intercepted: "MEC.ca", action: "Clicked", province: "BC" },
      { time: "2 min ago", query: "Canadian made wallet", intercepted: "Herschel.com", action: "Viewed", province: "QC" },
      { time: "3 min ago", query: "waterproof jacket alternative", intercepted: "NorthFace.com", action: "Purchased", province: "AB" },
      { time: "4 min ago", query: "affordable travel bag", intercepted: "Samsonite.com", action: "Clicked", province: "ON" },
      { time: "5 min ago", query: "handmade leather goods", intercepted: "Roots.com", action: "Viewed", province: "MB" },
      { time: "6 min ago", query: "Canadian outdoor gear", intercepted: "REI.com", action: "Purchased", province: "BC" },
      { time: "7 min ago", query: "tote bag under $100", intercepted: "Herschel.com", action: "Clicked", province: "NS" },
      { time: "8 min ago", query: "durable school backpack", intercepted: "Jansport.com", action: "Viewed", province: "ON" },
      { time: "9 min ago", query: "buy Canadian clothing brand", intercepted: "Lululemon.com", action: "Purchased", province: "QC" },
    ],
    weeklyStolen: [
      { day: "Feb 10", Jansport: 78, Herschel: 56, "North Face": 42, Others: 14 },
      { day: "Feb 17", Jansport: 85, Herschel: 62, "North Face": 44, Others: 15 },
      { day: "Feb 24", Jansport: 92, Herschel: 68, "North Face": 46, Others: 16 },
      { day: "Mar 3", Jansport: 98, Herschel: 74, "North Face": 48, Others: 17 },
    ],
    clipPreview: {
      image: "/clip-backpack.png",
      productName: "City Pack 28L",
      price: "$129.00",
      sourceDomain: "thenorthface.com",
      triggerUrl: "https://www.thenorthface.com/en-ca/shop/equipment/backpacks/borealis-backpack",
    },
    website: "https://northbound-backpacks.vercel.app",
    revenueDaily: [
      { period: "Mar 1", revenue: 412 }, { period: "Mar 2", revenue: 388 }, { period: "Mar 3", revenue: 521 },
      { period: "Mar 4", revenue: 445 }, { period: "Mar 5", revenue: 498 }, { period: "Mar 6", revenue: 534 },
      { period: "Mar 7", revenue: 412 },
    ],
    revenueWeekly: [
      { period: "Feb 10", revenue: 2180 }, { period: "Feb 17", revenue: 2450 }, { period: "Feb 24", revenue: 2720 }, { period: "Mar 3", revenue: 2980 },
    ],
    revenueByProvince: [
      { province: "ON", revenue: 1431 }, { province: "BC", revenue: 1180 }, { province: "AB", revenue: 758 },
      { province: "QC", revenue: 505 }, { province: "Other", revenue: 336 },
    ],
    revenueByBrand: [
      { name: "Jansport", revenue: 1726 }, { name: "Herschel", revenue: 1179 }, { name: "North Face", revenue: 842 },
    ],
    viewsOverTime: (() => {
      const out: ViewsOverTime[] = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        out.push({ date: d.toLocaleDateString("en-CA", { month: "short", day: "numeric" }), views: 52 + Math.floor(Math.random() * 24) + i });
      }
      return out;
    })(),
    funnelData: [
      { stage: "Viewed", count: 1832 }, { stage: "Clicked", count: 458 }, { stage: "Purchased", count: 247 },
    ],
  },
  streetwear: {
    business: "StreetRoot Co",
    province: "Quebec",
    stats: { stolen: 189, views: 2341, conversionRate: 8.1, revenue: 3180 },
    competitors: [
      { name: "Supreme", count: 87, color: "#C8102E" },
      { name: "Stussy", count: 52, color: "#0EA472" },
      { name: "Palace", count: 31, color: "#1E6FD4" },
      { name: "Carhartt", count: 14, color: "#D4930A" },
      { name: "Nike SB", count: 9, color: "#8B5CF6" },
    ],
    products: [
      "OG Heavyweight Tee ($65)",
      "Montreal Crewneck ($95)",
      "Baggy Canvas Pant ($120)",
      "Logo Cap ($45)",
    ],
    productDescriptions: {
      "OG Heavyweight Tee ($65)": "StreetRoot Co OG Heavyweight Tee — 400gsm cotton. Drop shoulder fit. Screen printed in Montreal. Sizes XS-3XL. $65.",
      "Montreal Crewneck ($95)": "StreetRoot Co Montreal Crewneck — heavyweight fleece. Made in Quebec. Unisex fit. $95.",
      "Baggy Canvas Pant ($120)": "StreetRoot Co Baggy Canvas Pant — durable cotton canvas. Relaxed fit. $120.",
      "Logo Cap ($45)": "StreetRoot Co Logo Cap — embroidered. One size. $45.",
    },
    keywords: {
      "OG Heavyweight Tee ($65)": [
        { word: "heavyweight", views: 312, clicks: 98, purchases: 41 },
        { word: "400gsm", views: 201, clicks: 87, purchases: 36 },
        { word: "Montreal made", views: 189, clicks: 74, purchases: 29 },
        { word: "oversized", views: 167, clicks: 63, purchases: 22 },
        { word: "drop shoulder", views: 134, clicks: 51, purchases: 18 },
        { word: "screen print", views: 98, clicks: 38, purchases: 12 },
      ],
      "Montreal Crewneck ($95)": [
        { word: "heavyweight fleece", views: 267, clicks: 94, purchases: 35 },
        { word: "Made in Quebec", views: 223, clicks: 82, purchases: 30 },
        { word: "unisex crewneck", views: 178, clicks: 66, purchases: 24 },
        { word: "Canadian streetwear", views: 145, clicks: 54, purchases: 19 },
        { word: "quality basics", views: 112, clicks: 42, purchases: 14 },
        { word: "winter crewneck", views: 89, clicks: 33, purchases: 10 },
      ],
      "Baggy Canvas Pant ($120)": [
        { word: "cotton canvas", views: 245, clicks: 91, purchases: 32 },
        { word: "relaxed fit", views: 198, clicks: 74, purchases: 26 },
        { word: "durable pants", views: 156, clicks: 58, purchases: 20 },
        { word: "baggy fit", views: 134, clicks: 50, purchases: 17 },
        { word: "Canadian made pants", views: 98, clicks: 36, purchases: 12 },
        { word: "streetwear pants", views: 76, clicks: 28, purchases: 9 },
      ],
      "Logo Cap ($45)": [
        { word: "embroidered cap", views: 189, clicks: 72, purchases: 26 },
        { word: "one size", views: 156, clicks: 58, purchases: 21 },
        { word: "Canadian brand cap", views: 123, clicks: 46, purchases: 16 },
        { word: "streetwear cap", views: 98, clicks: 37, purchases: 12 },
        { word: "Montreal cap", views: 76, clicks: 29, purchases: 9 },
        { word: "logo hat", views: 62, clicks: 24, purchases: 7 },
      ],
    },
    triggers: [
      { query: "heavyweight tee Canada", impressions: 621, trend: "up" },
      { query: "Canadian streetwear brand", impressions: 445, trend: "up" },
      { query: "Supreme alternative Canada", impressions: 287, trend: "up" },
      { query: "oversized tee Montreal", impressions: 198, trend: "up" },
      { query: "quality basics Canada", impressions: 134, trend: "down" },
    ],
    activityFeed: [
      { time: "just now", query: "heavyweight tee under $80", intercepted: "Supreme.com", action: "Purchased", province: "QC" },
      { time: "2 min ago", query: "Canadian streetwear", intercepted: "Stussy.com", action: "Clicked", province: "ON" },
      { time: "3 min ago", query: "oversized graphic tee", intercepted: "Nike.com", action: "Viewed", province: "BC" },
      { time: "5 min ago", query: "Montreal clothing brand", intercepted: "Reigning Champ.com", action: "Purchased", province: "QC" },
      { time: "7 min ago", query: "quality basics alternative", intercepted: "Carhartt.com", action: "Clicked", province: "AB" },
    ],
    weeklyStolen: [
      { day: "Feb 10", Supreme: 72, Stussy: 48, Palace: 28, Others: 18 },
      { day: "Feb 17", Supreme: 78, Stussy: 52, Palace: 30, Others: 19 },
      { day: "Feb 24", Supreme: 84, Stussy: 56, Palace: 32, Others: 20 },
      { day: "Mar 3", Supreme: 89, Stussy: 60, Palace: 34, Others: 21 },
    ],
    clipPreview: {
      image: "/clip-streetwear.png",
      productName: "Urban Hoodie — Forest",
      price: "$89.00",
      sourceDomain: "herschel.com",
      triggerUrl: "https://www.herschel.com/en-ca/shop/classic/urban-hoodie-forest",
    },
    website: "https://streetroot-co.vercel.app",
    revenueDaily: [
      { period: "Mar 1", revenue: 312 }, { period: "Mar 2", revenue: 298 }, { period: "Mar 3", revenue: 401 },
      { period: "Mar 4", revenue: 345 }, { period: "Mar 5", revenue: 378 }, { period: "Mar 6", revenue: 412 }, { period: "Mar 7", revenue: 334 },
    ],
    revenueWeekly: [
      { period: "Feb 10", revenue: 1680 }, { period: "Feb 17", revenue: 1890 }, { period: "Feb 24", revenue: 2100 }, { period: "Mar 3", revenue: 2320 },
    ],
    revenueByProvince: [
      { province: "QC", revenue: 1012 }, { province: "ON", revenue: 954 }, { province: "BC", revenue: 636 }, { province: "AB", revenue: 318 }, { province: "Other", revenue: 260 },
    ],
    revenueByBrand: [
      { name: "Supreme", revenue: 1314 }, { name: "Stussy", revenue: 786 }, { name: "Palace", revenue: 468 },
    ],
    viewsOverTime: (() => {
      const out: ViewsOverTime[] = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        out.push({ date: d.toLocaleDateString("en-CA", { month: "short", day: "numeric" }), views: 68 + Math.floor(Math.random() * 20) + i });
      }
      return out;
    })(),
    funnelData: [
      { stage: "Viewed", count: 2341 }, { stage: "Clicked", count: 190 }, { stage: "Purchased", count: 189 },
    ],
  },
  electronics: {
    business: "NorthTech Goods",
    province: "British Columbia",
    stats: { stolen: 312, views: 4102, conversionRate: 7.6, revenue: 8940 },
    competitors: [
      { name: "Anker", count: 143, color: "#C8102E" },
      { name: "Belkin", count: 89, color: "#0EA472" },
      { name: "Mophie", count: 47, color: "#1E6FD4" },
      { name: "Samsung", count: 23, color: "#D4930A" },
      { name: "Others", count: 10, color: "#2E4A6B" },
    ],
    products: [
      "NorthCharge 20K ($89)",
      "MagSafe Stand Pro ($49)",
      "USB-C Hub 7-in-1 ($69)",
      "Travel Adapter CA ($35)",
    ],
    productDescriptions: {
      "NorthCharge 20K ($89)": "NorthTech Goods NorthCharge 20K — 20000mAh power bank. GaN charging. Dual USB-C. Made in BC. TSA approved. $89.",
      "MagSafe Stand Pro ($49)": "NorthTech Goods MagSafe Stand Pro — wireless charging stand. Compatible with iPhone. $49.",
      "USB-C Hub 7-in-1 ($69)": "NorthTech Goods USB-C Hub 7-in-1 — HDMI, USB-A, SD. $69.",
      "Travel Adapter CA ($35)": "NorthTech Goods Travel Adapter CA — compact. US/UK/EU. $35.",
    },
    keywords: {
      "NorthCharge 20K ($89)": [
        { word: "GaN charging", views: 445, clicks: 167, purchases: 58 },
        { word: "20000mAh", views: 389, clicks: 143, purchases: 49 },
        { word: "Canadian brand", views: 312, clicks: 121, purchases: 44 },
        { word: "TSA approved", views: 278, clicks: 98, purchases: 38 },
        { word: "USB-C", views: 234, clicks: 87, purchases: 29 },
        { word: "fast charge", views: 198, clicks: 74, purchases: 24 },
      ],
      "MagSafe Stand Pro ($49)": [
        { word: "MagSafe stand", views: 312, clicks: 118, purchases: 41 },
        { word: "wireless charging", views: 278, clicks: 104, purchases: 36 },
        { word: "iPhone compatible", views: 223, clicks: 84, purchases: 29 },
        { word: "desk charger", views: 178, clicks: 67, purchases: 23 },
        { word: "Canadian electronics", views: 134, clicks: 50, purchases: 17 },
        { word: "charging stand", views: 98, clicks: 37, purchases: 12 },
      ],
      "USB-C Hub 7-in-1 ($69)": [
        { word: "USB-C hub", views: 289, clicks: 109, purchases: 38 },
        { word: "HDMI USB-A", views: 234, clicks: 88, purchases: 30 },
        { word: "7-in-1 hub", views: 189, clicks: 71, purchases: 24 },
        { word: "laptop hub", views: 145, clicks: 54, purchases: 18 },
        { word: "SD card reader", views: 112, clicks: 42, purchases: 14 },
        { word: "Canadian tech", views: 89, clicks: 33, purchases: 11 },
      ],
      "Travel Adapter CA ($35)": [
        { word: "travel adapter", views: 267, clicks: 98, purchases: 34 },
        { word: "US UK EU", views: 212, clicks: 79, purchases: 27 },
        { word: "compact adapter", views: 167, clicks: 62, purchases: 21 },
        { word: "Canada travel", views: 134, clicks: 50, purchases: 17 },
        { word: "international adapter", views: 98, clicks: 36, purchases: 12 },
        { word: "under $50", views: 76, clicks: 28, purchases: 9 },
      ],
    },
    triggers: [
      { query: "power bank Canada", impressions: 892, trend: "up" },
      { query: "Anker alternative Canadian", impressions: 534, trend: "up" },
      { query: "GaN charger 20000mAh", impressions: 412, trend: "up" },
      { query: "travel power bank TSA", impressions: 287, trend: "up" },
      { query: "USB-C power bank", impressions: 198, trend: "down" },
    ],
    activityFeed: [
      { time: "just now", query: "best power bank 2024", intercepted: "Anker.com", action: "Purchased", province: "BC" },
      { time: "1 min ago", query: "GaN charger Canada", intercepted: "Belkin.com", action: "Clicked", province: "ON" },
      { time: "3 min ago", query: "20000mAh portable charger", intercepted: "Mophie.com", action: "Viewed", province: "AB" },
      { time: "5 min ago", query: "Canadian electronics brand", intercepted: "Samsung.com", action: "Purchased", province: "QC" },
      { time: "8 min ago", query: "TSA approved power bank", intercepted: "Anker.com", action: "Clicked", province: "BC" },
    ],
    weeklyStolen: [
      { day: "Feb 10", Anker: 128, Belkin: 82, Mophie: 44, Others: 24 },
      { day: "Feb 17", Anker: 138, Belkin: 88, Mophie: 47, Others: 26 },
      { day: "Feb 24", Anker: 148, Belkin: 94, Mophie: 50, Others: 28 },
      { day: "Mar 3", Anker: 158, Belkin: 100, Mophie: 53, Others: 30 },
    ],
    clipPreview: {
      image: "/clip-electronics.png",
      productName: "ProCharge Hub 65W",
      price: "$64.00",
      sourceDomain: "anker.com",
      triggerUrl: "https://www.anker.com/ca/products/a2664-65w-4-port-charging-station",
    },
    website: "https://northtech-goods.vercel.app",
    revenueDaily: [
      { period: "Mar 1", revenue: 892 }, { period: "Mar 2", revenue: 845 }, { period: "Mar 3", revenue: 967 },
      { period: "Mar 4", revenue: 912 }, { period: "Mar 5", revenue: 934 }, { period: "Mar 6", revenue: 998 }, { period: "Mar 7", revenue: 392 },
    ],
    revenueWeekly: [
      { period: "Feb 10", revenue: 6120 }, { period: "Feb 17", revenue: 6890 }, { period: "Feb 24", revenue: 7580 }, { period: "Mar 3", revenue: 8350 },
    ],
    revenueByProvince: [
      { province: "BC", revenue: 2682 }, { province: "ON", revenue: 2503 }, { province: "AB", revenue: 1612 }, { province: "QC", revenue: 1342 }, { province: "Other", revenue: 801 },
    ],
    revenueByBrand: [
      { name: "Anker", revenue: 3842 }, { name: "Belkin", revenue: 2392 }, { name: "Mophie", revenue: 1264 },
    ],
    viewsOverTime: (() => {
      const out: ViewsOverTime[] = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        out.push({ date: d.toLocaleDateString("en-CA", { month: "short", day: "numeric" }), views: 120 + Math.floor(Math.random() * 30) + i * 2 });
      }
      return out;
    })(),
    funnelData: [
      { stage: "Viewed", count: 4102 }, { stage: "Clicked", count: 512 }, { stage: "Purchased", count: 312 },
    ],
  },
  shawarma: {
    business: "Shawarma Palace",
    province: "Ontario",
    stats: { stolen: 156, views: 982, conversionRate: 15.9, revenue: 2840 },
    competitors: [
      { name: "McDonald's", count: 52, color: "#C8102E" },
      { name: "Subway", count: 38, color: "#0EA472" },
      { name: "Tim Hortons", count: 31, color: "#1E6FD4" },
      { name: "Pita Pit", count: 18, color: "#D4930A" },
      { name: "Others", count: 17, color: "#2E4A6B" },
    ],
    products: [
      "Classic Shawarma Plate ($14)",
      "Falafel Wrap ($12)",
      "Family Pack ($42)",
      "Garlic Sauce 500ml ($6)",
    ],
    productDescriptions: {
      "Classic Shawarma Plate ($14)": "Shawarma Palace Classic Shawarma Plate — tender beef or chicken, fresh veggies, rice, and house garlic sauce. Halal. Made in Ontario. $14.",
      "Falafel Wrap ($12)": "Shawarma Palace Falafel Wrap — crispy falafel, hummus, pickles. $12.",
      "Family Pack ($42)": "Shawarma Palace Family Pack — feeds 4. Choice of protein. $42.",
      "Garlic Sauce 500ml ($6)": "Shawarma Palace Garlic Sauce 500ml — our famous recipe. $6.",
    },
    keywords: {
      "Classic Shawarma Plate ($14)": [
        { word: "halal", views: 198, clicks: 72, purchases: 28 },
        { word: "shawarma", views: 245, clicks: 89, purchases: 34 },
        { word: "Canadian", views: 134, clicks: 51, purchases: 19 },
        { word: "garlic sauce", views: 112, clicks: 44, purchases: 17 },
        { word: "plate", views: 98, clicks: 38, purchases: 14 },
        { word: "Ontario", views: 87, clicks: 31, purchases: 12 },
      ],
      "Falafel Wrap ($12)": [
        { word: "falafel wrap", views: 223, clicks: 84, purchases: 30 },
        { word: "hummus", views: 178, clicks: 67, purchases: 24 },
        { word: "vegetarian", views: 145, clicks: 54, purchases: 19 },
        { word: "halal wrap", views: 112, clicks: 42, purchases: 15 },
        { word: "pickles", views: 89, clicks: 33, purchases: 11 },
        { word: "Ottawa shawarma", views: 72, clicks: 27, purchases: 9 },
      ],
      "Family Pack ($42)": [
        { word: "family pack", views: 267, clicks: 98, purchases: 35 },
        { word: "feeds 4", views: 212, clicks: 79, purchases: 28 },
        { word: "choice of protein", views: 167, clicks: 62, purchases: 22 },
        { word: "halal family", views: 134, clicks: 50, purchases: 17 },
        { word: "bulk order", views: 98, clicks: 36, purchases: 12 },
        { word: "Shawarma Palace", views: 76, clicks: 28, purchases: 10 },
      ],
      "Garlic Sauce 500ml ($6)": [
        { word: "garlic sauce", views: 312, clicks: 116, purchases: 40 },
        { word: "famous recipe", views: 245, clicks: 92, purchases: 32 },
        { word: "500ml", views: 189, clicks: 71, purchases: 24 },
        { word: "take home", views: 145, clicks: 54, purchases: 18 },
        { word: "house sauce", views: 112, clicks: 42, purchases: 14 },
        { word: "Ottawa garlic", views: 89, clicks: 33, purchases: 11 },
      ],
    },
    triggers: [
      { query: "shawarma near me", impressions: 445, trend: "up" },
      { query: "halal food Canada", impressions: 312, trend: "up" },
      { query: "best shawarma Ontario", impressions: 198, trend: "up" },
      { query: "McDonald's alternative", impressions: 134, trend: "down" },
    ],
    activityFeed: [
      { time: "just now", query: "shawarma plate delivery", intercepted: "McDonalds.com", action: "Purchased", province: "ON" },
      { time: "2 min ago", query: "halal restaurant", intercepted: "Subway.com", action: "Clicked", province: "QC" },
      { time: "4 min ago", query: "best garlic sauce", intercepted: "PitaPit.com", action: "Viewed", province: "ON" },
      { time: "6 min ago", query: "family pack food", intercepted: "TimHortons.com", action: "Purchased", province: "BC" },
    ],
    weeklyStolen: [
      { day: "Feb 10", "McDonald's": 34, Subway: 22, "Tim Hortons": 18, Others: 12 },
      { day: "Feb 17", "McDonald's": 36, Subway: 24, "Tim Hortons": 19, Others: 13 },
      { day: "Feb 24", "McDonald's": 38, Subway: 26, "Tim Hortons": 20, Others: 14 },
      { day: "Mar 3", "McDonald's": 40, Subway: 28, "Tim Hortons": 21, Others: 15 },
    ],
    clipPreview: {
      image: "/clip-shawarma.png",
      productName: "Loaded Shawarma Plate",
      price: "$18.50",
      sourceDomain: "ubereats.com",
      triggerUrl: "https://www.ubereats.com/ca/store/shawarma-palace-ottawa",
    },
    website: "https://shawarma-palace.vercel.app",
    revenueDaily: [
      { period: "Mar 1", revenue: 198 }, { period: "Mar 2", revenue: 212 }, { period: "Mar 3", revenue: 287 },
      { period: "Mar 4", revenue: 245 }, { period: "Mar 5", revenue: 268 }, { period: "Mar 6", revenue: 312 }, { period: "Mar 7", revenue: 318 },
    ],
    revenueWeekly: [
      { period: "Feb 10", revenue: 2420 }, { period: "Feb 17", revenue: 2580 }, { period: "Feb 24", revenue: 2710 }, { period: "Mar 3", revenue: 2840 },
    ],
    revenueByProvince: [
      { province: "ON", revenue: 1424 }, { province: "QC", revenue: 682 }, { province: "BC", revenue: 284 }, { province: "AB", revenue: 227 }, { province: "Other", revenue: 223 },
    ],
    revenueByBrand: [
      { name: "McDonald's", revenue: 902 }, { name: "Subway", revenue: 659 }, { name: "Tim Hortons", revenue: 539 },
    ],
    viewsOverTime: (() => {
      const out: ViewsOverTime[] = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        out.push({ date: d.toLocaleDateString("en-CA", { month: "short", day: "numeric" }), views: 28 + Math.floor(Math.random() * 12) + Math.floor(i / 3) });
      }
      return out;
    })(),
    funnelData: [
      { stage: "Viewed", count: 982 }, { stage: "Clicked", count: 312 }, { stage: "Purchased", count: 156 },
    ],
  },
};

export function getMerchantIdFromEmail(email: string): MerchantId | null {
  const normalized = (email || "").toLowerCase().trim();
  for (const [id, config] of Object.entries(MERCHANT_CONFIG) as [MerchantId, MerchantConfig][]) {
    if (config.email.toLowerCase() === normalized) return id;
  }
  return null;
}

export function getMerchantFromEmail(email: string): MerchantId {
  if (email === "backpack@canadaclip.ca") return "backpack";
  if (email === "streetwear@canadaclip.ca") return "streetwear";
  if (email === "electronics@canadaclip.ca") return "electronics";
  if (email === "shawarma@canadaclip.ca") return "shawarma";
  return "backpack";
}
