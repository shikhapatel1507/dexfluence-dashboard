import "server-only"
import { Queue } from "bullmq"

if (!process.env.REDIS_URL) {
  throw new Error("Missing environment variable: REDIS_URL")
}

// Parse URL into host/port for BullMQ compatibility
const redisUrl = new URL(process.env.REDIS_URL)

export const scriptQueue = new Queue("script-generation", {
  connection: {
    host: redisUrl.hostname,
    port: Number(redisUrl.port) || 6379,
    password: redisUrl.password || undefined,
    username: redisUrl.username || undefined,
    tls: redisUrl.protocol === "rediss:" ? {} : undefined,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
})

scriptQueue.on("error", (err) => {
  console.error("[Queue] Script queue error:", err)
})