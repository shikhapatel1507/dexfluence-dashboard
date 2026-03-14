import { Queue } from "bullmq"
import { redis } from "@/lib/redis"

export async function POST() {

  const queue = new Queue("scriptQueue", {
    connection: redis
  })

  await queue.add("generateScript", {
    topic: "AI marketing"
  })

  return Response.json({ success: true })
}