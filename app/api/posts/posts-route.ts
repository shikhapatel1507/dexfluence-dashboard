// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const brandId = searchParams.get("brandId")
  const limit   = parseInt(searchParams.get("limit") || "20")

  let query = supabase
    .from("posts")
    .select("id,brand_id,topic,script_hook,viral_score,s3_url,ig_permalink,ig_published_at,views,likes,comments,created_at")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (brandId) query = query.eq("brand_id", brandId)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data || [] })
}