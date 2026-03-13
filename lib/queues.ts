import "server-only"
import { Queue } from "bullmq"

const getRedisUrl = () => {
  if (!process.env.REDIS_URL) {
    throw new Error("Missing environment variable: REDIS_URL")
  }
  return new URL(process.env.REDIS_URL)
}

const getQueue = () => {
  const redisUrl = getRedisUrl()
  return new Queue("script-generation", {
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
      backoff: { type: "exponential", delay: 1000 },
      removeOnComplete: true,
      removeOnFail: false,
    },
  })
}

export const scriptQueue = getQueue()
