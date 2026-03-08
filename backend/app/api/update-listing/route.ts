import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[update-listing] SUPABASE_SERVICE_ROLE_KEY is not set");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 503 }
    );
  }

  try {
    const { productId, description } = await req.json();

    console.log("[update-listing] received:", {
      productId,
      description: description?.slice(0, 50),
    });

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

    console.log("[update-listing] table:", table, "column:", column);

    // Table schema: merchant_id, product_name, description, updated_at (PK: merchant_id, product_name)
    const { data, error } = await supabaseAdmin
      .from(table)
      .upsert(
        {
          merchant_id: "northbound-packs",
          product_name: "City Pack 28L",
          [column]: description,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "merchant_id,product_name" }
      )
      .select();

    console.log("[update-listing] supabase error:", error);
    console.log("[update-listing] supabase data:", data);

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
