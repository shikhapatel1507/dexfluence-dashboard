import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

  const body = await req.json()

  const {website,instagram,voice} = body

  const {data,error} = await supabase
    .from("brands")
    .insert({
      website,
      instagram,
      voice
    })
    .select()
    .single()

  if(error){

    return NextResponse.json(
      {error:error.message},
      {status:500}
    )

  }

  return NextResponse.json(data)

}