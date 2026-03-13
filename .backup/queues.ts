import { Queue } from "bullmq"
import IORedis from "ioredis"

if (!process.env.REDIS_URL) {
  throw new Error("Missing environment variable: REDIS_URL")
}

const queueConnection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
})

export const scriptQueue = new Queue("script-generation", {
  connection: queueConnection,
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
