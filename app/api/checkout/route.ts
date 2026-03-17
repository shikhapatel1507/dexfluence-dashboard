// app/api/checkout/route.ts
// Creates a Lemon Squeezy checkout session

import { NextRequest, NextResponse } from "next/server"

const LS_API_KEY  = process.env.LEMON_SQUEEZY_API_KEY
const LS_STORE_ID = process.env.LS_STORE_ID

const PLANS = {
  starter: {
    variantId:   process.env.LS_VARIANT_STARTER,
    name:        "Starter",
    price:       29,
    brands:      1,
    reelsPerDay: 1,
    reelsPerMonth: 30,
  },
  pro: {
    variantId:   process.env.LS_VARIANT_PRO,
    name:        "Pro",
    price:       99,
    brands:      3,
    reelsPerDay: 5,
    reelsPerMonth: 150,
  },
  agency: {
    variantId:   process.env.LS_VARIANT_AGENCY,
    name:        "Agency",
    price:       299,
    brands:      10,
    reelsPerDay: 20,
    reelsPerMonth: 600,
  },
}

export async function POST(req: NextRequest) {
  try {
    const { plan, email, brandId, userId } = await req.json()

    if (!plan || !PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    const selectedPlan = PLANS[plan as keyof typeof PLANS]

    if (!selectedPlan.variantId) {
      return NextResponse.json({ error: `Variant ID for ${plan} not configured` }, { status: 500 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://dexfluence-dashboard.vercel.app"

    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LS_API_KEY}`,
        "Content-Type":  "application/vnd.api+json",
        "Accept":        "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              email,
              custom: {
                user_id:  userId  || "",
                brand_id: brandId || "",
                plan,
              },
            },
            product_options: {
              redirect_url:      `${appUrl}/dashboard?upgraded=true`,
              receipt_link_url:  `${appUrl}/dashboard`,
              receipt_thank_you_note: `Welcome to Dexfluence ${selectedPlan.name}! Your AI agents are ready.`,
            },
          },
          relationships: {
            store: {
              data: { type: "stores", id: LS_STORE_ID },
            },
            variant: {
              data: { type: "variants", id: selectedPlan.variantId },
            },
          },
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("LS checkout error:", data)
      return NextResponse.json({ error: "Checkout creation failed", details: data }, { status: 500 })
    }

    const checkoutUrl = data?.data?.attributes?.url
    return NextResponse.json({ url: checkoutUrl, plan: selectedPlan.name })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

