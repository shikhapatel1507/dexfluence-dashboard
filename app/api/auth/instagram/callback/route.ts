// app/api/auth/instagram/callback/route.ts
// Step 2: Handle OAuth callback, get long-lived token, save to Supabase

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import axios from "axios"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const APP_ID     = process.env.META_APP_ID     || "895709786532896"
const APP_SECRET = process.env.META_APP_SECRET || ""
const APP_URL    = process.env.NEXT_PUBLIC_APP_URL || "https://dexfluence-dashboard.vercel.app"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code  = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  // user denied permission
  if (error) {
    return NextResponse.redirect(`${APP_URL}/onboarding?error=instagram_denied`)
  }

  if (!code) {
    return NextResponse.redirect(`${APP_URL}/onboarding?error=no_code`)
  }

  // decode state to get brandId
  let brandId = "new"
  try {
    const decoded = JSON.parse(Buffer.from(state || "", "base64").toString())
    brandId = decoded.brandId || "new"
  } catch {}

  const redirectUri = `${APP_URL}/api/auth/instagram/callback`

  try {
    // ── Step 1: exchange code for short-lived token ──
    const tokenRes = await axios.get("https://graph.facebook.com/v24.0/oauth/access_token", {
      params: {
        client_id:     APP_ID,
        client_secret: APP_SECRET,
        redirect_uri:  redirectUri,
        code,
      },
    })

    const shortToken = tokenRes.data?.access_token
    if (!shortToken) throw new Error("No access token in response")

    // ── Step 2: exchange for long-lived token (60 days) ──
    const longTokenRes = await axios.get("https://graph.facebook.com/v24.0/oauth/access_token", {
      params: {
        grant_type:        "fb_exchange_token",
        client_id:         APP_ID,
        client_secret:     APP_SECRET,
        fb_exchange_token: shortToken,
      },
    })

    const longToken   = longTokenRes.data?.access_token
    const expiresIn   = longTokenRes.data?.expires_in || 5184000 // 60 days
    const expiresAt   = new Date(Date.now() + expiresIn * 1000).toISOString()

    // ── Step 3: get Facebook Pages ──
    const pagesRes = await axios.get("https://graph.facebook.com/v24.0/me/accounts", {
      params: {
        fields:       "id,name,instagram_business_account{id,name,username,profile_picture_url,followers_count}",
        access_token: longToken,
      },
    })

    const pages = pagesRes.data?.data || []

    // find first page with Instagram business account
    const pageWithIG = pages.find((p: any) => p.instagram_business_account)

    if (!pageWithIG) {
      return NextResponse.redirect(`${APP_URL}/onboarding?error=no_ig_business&step=connect`)
    }

    const igAccount  = pageWithIG.instagram_business_account
    const igId       = igAccount.id
    const igUsername = igAccount.username
    const igName     = igAccount.name
    const igAvatar   = igAccount.profile_picture_url
    const igFollowers = igAccount.followers_count || 0

    // ── Step 4: save to Supabase ──
    if (brandId === "new") {
      // create new brand
      const { data: brand, error: insertError } = await supabase
        .from("brands")
        .insert({
          name:            igName || igUsername,
          slug:            igUsername?.toLowerCase().replace(/[^a-z0-9]/g, "-") || `brand-${Date.now()}`,
          ig_account_id:   igId,
          ig_access_token: longToken,
          ig_token_expires_at: expiresAt,
          ig_handle:       `@${igUsername}`,
          ig_username:     igUsername,
          ig_avatar:       igAvatar,
          ig_followers:    igFollowers,
          ig_enabled:      true,
          active:          true,
          posts_per_day:   2,
        })
        .select()
        .single()

      if (insertError) throw new Error(insertError.message)

      return NextResponse.redirect(`${APP_URL}/onboarding?step=brand&brandId=${brand.id}&ig=${igUsername}`)

    } else {
      // update existing brand
      await supabase
        .from("brands")
        .update({
          ig_account_id:       igId,
          ig_access_token:     longToken,
          ig_token_expires_at: expiresAt,
          ig_handle:           `@${igUsername}`,
          ig_username:         igUsername,
          ig_avatar:           igAvatar,
          ig_followers:        igFollowers,
          ig_enabled:          true,
          updated_at:          new Date().toISOString(),
        })
        .eq("id", brandId)

      return NextResponse.redirect(`${APP_URL}/onboarding?step=brand&brandId=${brandId}&ig=${igUsername}`)
    }

  } catch (err: any) {
    console.error("OAuth callback error:", err.response?.data || err.message)
    const msg = encodeURIComponent(err.message || "oauth_failed")
    return NextResponse.redirect(`${APP_URL}/onboarding?error=${msg}`)
  }
}