import { NextResponse } from "next/server"

export async function POST(req) {

  const body = await req.json()

  console.log("Campaign started:", body)

  return NextResponse.json({
    status: "ok",
    campaign: body
  })
}