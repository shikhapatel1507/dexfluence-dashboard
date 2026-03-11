"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function Setup(){

  const router = useRouter()

  const [name,setName] = useState("")
  const [website,setWebsite] = useState("")
  const [instagram,setInstagram] = useState("")

  async function createBrand(){

    const user = await supabase.auth.getUser()

    const userId = user.data.user.id

    const { data } = await supabase
      .from("brands")
      .insert({
        name,
        website,
        instagram
      })
      .select()
      .single()

    await supabase
      .from("users")
      .insert({
        id:userId,
        brand_id:data.id,
        email:user.data.user.email
      })

    router.push("/dashboard")
  }

  return(

    <div style={{padding:"40px"}}>

      <h1>Setup Brand</h1>

      <input
        placeholder="Brand Name"
        onChange={(e)=>setName(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Website"
        onChange={(e)=>setWebsite(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Instagram"
        onChange={(e)=>setInstagram(e.target.value)}
      />

      <br/><br/>

      <button onClick={createBrand}>
        Save Brand
      </button>

    </div>

  )

}