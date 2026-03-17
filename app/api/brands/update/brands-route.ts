// app/api/brands/update/route.ts

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { brandId, name, description, website, tone, audience, postsPerDay, niche } = await req.json()

    if (!brandId) return NextResponse.json({ error: "brandId required" }, { status: 400 })

    // generate slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

    const { data, error } = await supabase
      .from("brands")
      .update({
        name,
        slug,
        description,
        website,
        tone,
        audience,
        niche,
        posts_per_day: parseInt(postsPerDay) || 2,
        next_post_at:  new Date().toISOString(), // start posting immediately
        updated_at:    new Date().toISOString(),
      })
      .eq("id", brandId)
      .select()
      .single()

    if (error) throw new Error(error.message)

    return NextResponse.json({ success: true, brand: data })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}