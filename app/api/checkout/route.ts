import { NextResponse } from "next/server"

export async function POST(req){

  const body = await req.json()

  const res = await fetch("https://api.lemonsqueezy.com/v1/checkouts",{
    method:"POST",
    headers:{
      "Authorization":`Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      data:{
        type:"checkouts",
        attributes:{
          checkout_data:{
            custom:{
              user_id: body.user_id
            }
          }
        },
        relationships:{
          store:{
            data:{
              type:"stores",
              id: process.env.LEMON_SQUEEZY_STORE_ID
            }
          },
          variant:{
            data:{
              type:"variants",
              id: body.variant_id
            }
          }
        }
      }
    })
  })

  const data = await res.json()

  return NextResponse.json(data)

}