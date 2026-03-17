import { NextRequest, NextResponse } from "next/server"
import { Queue } from "bullmq"

// Note: in Next.js 15 with App Router, BullMQ needs Redis
// Make sure REDIS_URL is set in your Vercel env vars
const redis = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
}

export async function POST(req: NextRequest) {
  try {
    const { brand, products } = await req.json()

    if (!brand?.name || !products?.length) {
      return NextResponse.json({ error: "Brand and products required" }, { status: 400 })
    }

    const scriptQueue = new Queue("scriptQueue", { connection: redis })
    const jobs = []

    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      const jobId   = `campaign-${Date.now()}-${i}`

      const job = await scriptQueue.add(jobId, {
        topic:           `${brand.name} — ${product.caption?.slice(0, 80) || "product showcase"}`,
        brand:           `${brand.name}. ${brand.description || ""}. Tone: ${brand.tone || "engaging"}`,
        tone:            brand.tone || "engaging, modern, authentic",
        audience:        brand.audience || "women aged 18-45",
        count:           1,
        productImageUrl: product.imageUrl,
        productCaption:  product.caption,
        productId:       product.id,
        productPermalink: product.permalink,
      }, {
        attempts: 3,
        backoff: { type: "exponential", delay: 5000 },
      })

      jobs.push({ jobId: job.id, productId: product.id })
    }

    await scriptQueue.close()

    return NextResponse.json({
      success: true,
      message: `${jobs.length} Reels queued for generation`,
      jobs,
    })

  } catch (err: any) {
    console.error("Campaign start error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}