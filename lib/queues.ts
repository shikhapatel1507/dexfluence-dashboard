import { Queue } from "bullmq"
import { connection } from "./redis"

export const scriptQueue = new Queue("script-generation", {
  connection
})
