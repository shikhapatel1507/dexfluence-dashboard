import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data: brands, error } = await supabase
    .from("brands")
    .select("id, name, ig_handle, ig_token_expires_at, ig_token_expired, active")
    .eq("ig_enabled", true)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const now     = Date.now()
  const tenDays = 10 * 24 * 60 * 60 * 1000

  const statuses = (brands || []).map(brand => {
    const expiresAt = brand.ig_token_expires_at ? new Date(brand.ig_token_expires_at).getTime() : null
    const daysLeft  = expiresAt ? Math.round((expiresAt - now) / (24 * 60 * 60 * 1000)) : null
    let status = "unknown"
    if (brand.ig_token_expired)         status = "expired"
    else if (!expiresAt)                status = "unknown"
    else if (expiresAt < now)           status = "expired"
    else if (expiresAt - now < tenDays) status = "expiring"
    else                                status = "ok"
    return { id: brand.id, name: brand.name, handle: brand.ig_handle, status, daysLeft, expiresAt: brand.ig_token_expires_at, active: brand.active }
  })

  const warnings = statuses.filter(s => s.status === "expired" || s.status === "expiring")
  return NextResponse.json({ statuses, warnings, hasWarnings: warnings.length > 0 })
}
