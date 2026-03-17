// app/api/webhooks/lemonsqueezy/route.ts
// Handles all Lemon Squeezy webhook events

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import crypto from "crypto"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || ""

/* ── Plan limits ── */
const PLAN_LIMITS = {
  starter: { brands: 1,  reelsPerMonth: 30,  reelsPerDay: 1  },
  pro:     { brands: 3,  reelsPerMonth: 150, reelsPerDay: 5  },
  agency:  { brands: 10, reelsPerMonth: 600, reelsPerDay: 20 },
  free:    { brands: 1,  reelsPerMonth: 5,   reelsPerDay: 1  },
}

/* ── Verify webhook signature ── */
function verifySignature(body: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) return true // skip in dev
  const hash = crypto.createHmac("sha256", WEBHOOK_SECRET).update(body).digest("hex")
  return hash === signature
}

/* ── Update user plan in Supabase ── */
async function updateUserPlan(userId: string, plan: string, subscriptionId: string, status: string) {
  const limits = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.free

  await supabase
    .from("user_plans")
    .upsert({
      user_id:         userId,
      plan,
      status,
      subscription_id: subscriptionId,
      brands_limit:    limits.brands,
      reels_per_month: limits.reelsPerMonth,
      reels_per_day:   limits.reelsPerDay,
      updated_at:      new Date().toISOString(),
    }, { onConflict: "user_id" })

  console.log(`✅ Plan updated: user ${userId} → ${plan} (${status})`)
}

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get("x-signature") || ""

  if (!verifySignature(body, signature)) {
    console.error("Invalid webhook signature")
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  const event = JSON.parse(body)
  const eventName = event.meta?.event_name
  const data      = event.data?.attributes
  const custom    = event.meta?.custom_data || {}

  console.log(`🍋 Webhook: ${eventName}`)

  const userId         = custom.user_id   || data?.customer_id?.toString()
  const plan           = custom.plan      || "starter"
  const subscriptionId = data?.subscription_id?.toString() || event.data?.id?.toString()

  switch (eventName) {

    // ── New subscription ──
    case "subscription_created":
    case "order_created": {
      await updateUserPlan(userId, plan, subscriptionId, "active")

      // if brandId provided, update that brand's plan
      if (custom.brand_id) {
        await supabase
          .from("brands")
          .update({ plan, updated_at: new Date().toISOString() })
          .eq("id", custom.brand_id)
      }
      break
    }

    // ── Subscription renewed ──
    case "subscription_payment_success": {
      await updateUserPlan(userId, plan, subscriptionId, "active")

      // reset monthly usage counter
      await supabase
        .from("user_plans")
        .update({ reels_used_this_month: 0 })
        .eq("user_id", userId)
      break
    }

    // ── Subscription cancelled ──
    case "subscription_cancelled": {
      await updateUserPlan(userId, "free", subscriptionId, "cancelled")

      // pause all brands for this user
      await supabase
        .from("brands")
        .update({ active: false, plan: "free" })
        .eq("user_id", userId)
      break
    }

    // ── Subscription expired ──
    case "subscription_expired": {
      await updateUserPlan(userId, "free", subscriptionId, "expired")
      await supabase
        .from("brands")
        .update({ active: false, plan: "free" })
        .eq("user_id", userId)
      break
    }

    // ── Payment failed ──
    case "subscription_payment_failed": {
      await supabase
        .from("user_plans")
        .update({ status: "past_due", updated_at: new Date().toISOString() })
        .eq("user_id", userId)
      break
    }

    default:
      console.log(`Unhandled event: ${eventName}`)
  }

  return NextResponse.json({ received: true })
}