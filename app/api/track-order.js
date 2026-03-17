import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  const data = JSON.parse(req.body)

  await supabase.from("orders").insert({
    brand_id: data.brand,
    avatar_id: data.avatar,
    media_id: data.media,
    product_id: data.product_id,
    order_value: data.order_value,
  })

  res.status(200).json({ success: true })
}