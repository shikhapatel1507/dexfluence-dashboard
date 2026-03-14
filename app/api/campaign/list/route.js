import { NextResponse } from "next/server"

export async function GET(){

  const campaigns = [

    {
      topic:"AI Marketing Tips",
      platform:"Instagram",
      status:"Running",
      videos:12,
      views:"45000"
    },

    {
      topic:"Shopify Growth",
      platform:"TikTok",
      status:"Completed",
      videos:20,
      views:"112000"
    }

  ]

  return NextResponse.json(campaigns)

}