import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const niches = ["skincare", "beauty", "fitness", "nutrition", "fashion"]

function randomUsername() {
  const names = ["glowdaily", "beautyhacks", "fitsecrets", "wellnesstips", "skinlab"]
  return names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 1000)
}

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const body = await req.json()
  const { count } = body

  const agents = []
  for (let i = 0; i < count; i++) {
    const niche = niches[Math.floor(Math.random() * niches.length)]
    agents.push({ username: randomUsername(), niche, posts: 0, views: 0 })
  }

  const { error } = await supabase.from("agents").insert(agents)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
