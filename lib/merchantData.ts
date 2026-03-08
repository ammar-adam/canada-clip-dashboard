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
  placeholderUrl: string;
};

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
      { day: "Mon", Jansport: 12, Herschel: 8, "North Face": 6, Others: 2 },
      { day: "Tue", Jansport: 15, Herschel: 11, "North Face": 7, Others: 2 },
      { day: "Wed", Jansport: 13, Herschel: 9, "North Face": 7, Others: 2 },
      { day: "Thu", Jansport: 18, Herschel: 13, "North Face": 8, Others: 3 },
      { day: "Fri", Jansport: 16, Herschel: 12, "North Face": 7, Others: 3 },
      { day: "Sat", Jansport: 21, Herschel: 15, "North Face": 11, Others: 4 },
      { day: "Sun", Jansport: 9, Herschel: 7, "North Face": 4, Others: 2 },
    ],
    clipPreview: {
      image: "/clip-backpack.png",
      productName: "City Pack 28L",
      price: "$129.00",
      sourceDomain: "thenorthface.com",
      placeholderUrl: "https://www.thenorthface.com/en-ca/p/ba...",
    },
    website: "https://northbound-backpacks.vercel.app",
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
      { day: "Mon", Supreme: 14, Stussy: 9, Palace: 5, Others: 3 },
      { day: "Tue", Supreme: 18, Stussy: 11, Palace: 6, Others: 2 },
      { day: "Wed", Supreme: 15, Stussy: 10, Palace: 6, Others: 3 },
      { day: "Thu", Supreme: 21, Stussy: 13, Palace: 7, Others: 4 },
      { day: "Fri", Supreme: 19, Stussy: 12, Palace: 6, Others: 3 },
      { day: "Sat", Supreme: 24, Stussy: 15, Palace: 9, Others: 5 },
      { day: "Sun", Supreme: 12, Stussy: 8, Palace: 4, Others: 2 },
    ],
    clipPreview: {
      image: "/clip-streetwear.png",
      productName: "Urban Hoodie — Forest",
      price: "$89.00",
      sourceDomain: "thenorthface.com",
      placeholderUrl: "https://www.herschel.com/en-ca/p/ho...",
    },
    website: "https://streetroot-co.vercel.app",
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
      { day: "Mon", Anker: 22, Belkin: 14, Mophie: 7, Others: 4 },
      { day: "Tue", Anker: 28, Belkin: 17, Mophie: 9, Others: 5 },
      { day: "Wed", Anker: 25, Belkin: 15, Mophie: 8, Others: 4 },
      { day: "Thu", Anker: 32, Belkin: 20, Mophie: 11, Others: 6 },
      { day: "Fri", Anker: 29, Belkin: 18, Mophie: 10, Others: 5 },
      { day: "Sat", Anker: 38, Belkin: 24, Mophie: 13, Others: 7 },
      { day: "Sun", Anker: 18, Belkin: 11, Mophie: 6, Others: 3 },
    ],
    clipPreview: {
      image: "/clip-electronics.png",
      productName: "ProCharge Hub 65W",
      price: "$64.00",
      sourceDomain: "thenorthface.com",
      placeholderUrl: "https://www.anker.com/products/hub...",
    },
    website: "https://northtech-goods.vercel.app",
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
      { day: "Mon", "McDonald's": 8, Subway: 5, "Tim Hortons": 4, Others: 2 },
      { day: "Tue", "McDonald's": 10, Subway: 6, "Tim Hortons": 5, Others: 3 },
      { day: "Wed", "McDonald's": 9, Subway: 6, "Tim Hortons": 4, Others: 2 },
      { day: "Thu", "McDonald's": 12, Subway: 8, "Tim Hortons": 6, Others: 3 },
      { day: "Fri", "McDonald's": 11, Subway: 7, "Tim Hortons": 5, Others: 4 },
      { day: "Sat", "McDonald's": 14, Subway: 9, "Tim Hortons": 7, Others: 4 },
      { day: "Sun", "McDonald's": 7, Subway: 5, "Tim Hortons": 3, Others: 2 },
    ],
    clipPreview: {
      image: "/clip-shawarma.png",
      productName: "Loaded Shawarma Plate",
      price: "$18.50",
      sourceDomain: "thenorthface.com",
      placeholderUrl: "https://www.ubereats.com/ca/store/...",
    },
    website: "https://shawarma-palace.vercel.app",
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
