// app/api/auth/instagram/route.ts
// Step 1: Redirect user to Meta OAuth consent screen

import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const brandId = searchParams.get("brandId") || "new"

  const appId       = process.env.META_APP_ID || "895709786532896"
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`

  const scopes = [
    "instagram_basic",
    "instagram_content_publish",
    "instagram_manage_comments",
    "instagram_manage_insights",
    "pages_show_list",
    "pages_read_engagement",
  ].join(",")

  // store brandId in state so we get it back after OAuth
  const state = Buffer.from(JSON.stringify({ brandId, ts: Date.now() })).toString("base64")

  const oauthUrl = new URL("https://www.facebook.com/v24.0/dialog/oauth")
  oauthUrl.searchParams.set("client_id",     appId)
  oauthUrl.searchParams.set("redirect_uri",  redirectUri)
  oauthUrl.searchParams.set("scope",         scopes)
  oauthUrl.searchParams.set("response_type", "code")
  oauthUrl.searchParams.set("state",         state)

  return NextResponse.redirect(oauthUrl.toString())
}