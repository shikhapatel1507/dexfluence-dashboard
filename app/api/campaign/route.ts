import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Queue } from "bullmq"
import Redis from "ioredis"

/*
Create Redis connection
*/

const redis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379")

/*
Create queue that triggers the AI pipeline
*/

const scriptQueue = new Queue("scriptQueue", {
  connection: redis
})

/*
Create Supabase client
*/

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/*
POST /api/campaign
Launch a new campaign
*/

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const { product, videos } = body

    if (!product) {

      return NextResponse.json(
        { error: "Product URL required" },
        { status: 400 }
      )

    }

    /*
    Insert campaign into database
    */

    const { data, error } = await supabase
      .from("campaigns")
      .insert({
        product,
        videos,
        status: "running"
      })
      .select()
      .single()

    if (error) {

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )

    }

    /*
    Start AI content pipeline
    */

    await scriptQueue.add("generateScripts", {
      campaignId: data.id,
      product,
      videos
    })

    return NextResponse.json({
      success: true,
      campaign: data
    })

  } catch (err) {

    console.error(err)

    return NextResponse.json(
      { error: "Campaign launch failed" },
      { status: 500 }
    )

  }

}