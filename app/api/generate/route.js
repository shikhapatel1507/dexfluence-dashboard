import { Queue } from "bullmq"
import { redis } from "@/lib/redis"

export async function POST(req) {

  const { topic } = await req.json()

  const queue = new Queue("scriptQueue", {
    connection: redis
  })

  await queue.add("generateScript", { topic })

  return Response.json({ success: true })
}