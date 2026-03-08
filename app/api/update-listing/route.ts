import { createServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

/**
 * Upserts one product listing for a merchant.
 * Table merchant_listings has primary key (merchant_id, product_name) so
 * each product has its own row. Merchant websites can fetch all rows for
 * their merchant_id and sync product pages.
 */
export async function POST(req: Request) {
  const supabase = createServerClient();
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: "Supabase not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { merchant_id, product_name, description } = body;
    if (!merchant_id || !product_name || description == null) {
      return NextResponse.json(
        { success: false, error: "Missing merchant_id, product_name, or description" },
        { status: 400 }
      );
    }

    const row = {
      merchant_id: String(merchant_id).slice(0, 50),
      product_name: String(product_name).slice(0, 200),
      description: String(description).slice(0, 5000),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("merchant_listings")
      .upsert(row, { onConflict: "merchant_id,product_name" })
      .select("merchant_id, product_name, updated_at")
      .single();

    if (error) {
      console.error("update-listing error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({
      success: true,
      updated_at: data?.updated_at ?? new Date().toISOString(),
      product_name: data?.product_name,
    });
  } catch (e) {
    console.error("update-listing API error:", e);
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Request failed" },
      { status: 500 }
    );
  }
}
