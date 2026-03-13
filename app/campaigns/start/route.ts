import { NextResponse } from "next/server"
import { scriptQueue } from "@/queues/scriptQueue"

export async function POST(req) {

  const body = await req.json()

  await scriptQueue.add("generate-campaign", {
    topic: body.topic
  })

  return NextResponse.json({
    status: "campaign started"
  })

}