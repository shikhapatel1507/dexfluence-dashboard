import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(req:Request){

  const {instagram} = await req.json()

  try{

    const response = await axios.get(
      `https://graph.instagram.com/me/media`,
      {
        params:{
          fields:"id,caption,media_url,permalink,timestamp",
          access_token:process.env.INSTAGRAM_TOKEN
        }
      }
    )

    return NextResponse.json({
      posts:response.data.data
    })

  }catch(e){

    return NextResponse.json({
      error:true
    })

  }

}