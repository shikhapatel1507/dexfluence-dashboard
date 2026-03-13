import IORedis from "ioredis"

if (!process.env.REDIS_URL) {
  throw new Error("Missing environment variable: REDIS_URL")
}

export const redis = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  enableReadyCheck: true,
})

redis.on("error", (err) => {
  console.error("[Redis] Connection error:", err)
})

redis.on("connect", () => {
  console.log("[Redis] Connected successfully")
})
