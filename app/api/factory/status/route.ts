import { NextResponse } from "next/server"
import { Queue } from "bullmq"

const redisConfig = {
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
  // Don't set retryStrategy here — let BullMQ handle reconnection
}

const globalForQueues = global as typeof global & { factoryQueues?: Record<string, Queue> }

if (!globalForQueues.factoryQueues) {
  const queueNames = ["scriptQueue", "imageQueue", "videoQueue", "publishQueue"]
  globalForQueues.factoryQueues = Object.fromEntries(
    queueNames.map(name => [name, new Queue(name, { connection: redisConfig })])
  )
}

const queues = globalForQueues.factoryQueues

export async function GET() {
  const stats: Record<string, object> = {}

  for (const [name, queue] of Object.entries(queues)) {
    stats[name] = {
      waiting: await queue.getWaitingCount(),
      active: await queue.getActiveCount(),
      completed: await queue.getCompletedCount(),
      failed: await queue.getFailedCount(),
    }
  }

  return NextResponse.json(stats)
}