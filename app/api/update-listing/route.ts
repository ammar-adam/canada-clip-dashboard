import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 503 }
    );
  }

  try {
    const { productId, description } = await req.json();

    if (!productId || !description) {
      return NextResponse.json(
        { error: "productId and description are required" },
        { status: 400 }
      );
    }

    const table =
      process.env.SUPABASE_LISTINGS_TABLE ?? "merchant_listings";
    const column =
      process.env.SUPABASE_DESCRIPTION_COLUMN ?? "description";

    const { error } = await supabaseAdmin
      .from(table)
      .update({
        [column]: description,
        updated_at: new Date().toISOString(),
      })
      .eq("product_id", productId)
      .eq("merchant_id", "northbound-packs");

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("update-listing route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
