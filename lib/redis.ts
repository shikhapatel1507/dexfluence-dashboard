import Redis from "ioredis"

const globalForRedis = global as typeof global & { redis?: Redis }

if (!globalForRedis.redis) {
  globalForRedis.redis = new Redis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
    retryStrategy: () => null,
  })
}

export const redis = globalForRedis.redis