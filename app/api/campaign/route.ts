import { NextResponse } from "next/server"
import { Queue } from "bullmq"
import IORedis from "ioredis"

const connection = new IORedis(process.env.REDIS_URL!)

const queue = new Queue("script-generation",{
  connection
})

export async function POST(req:Request){

  const body = await req.json()

  const { product, videos } = body

  for(let i=0;i<videos;i++){

    await queue.add("generate-script",{
      product
    })

  }

  return NextResponse.json({
    status:"campaign_started"
  })

}