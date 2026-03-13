"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function SetupPage(){

  const router = useRouter()

  const [website,setWebsite] = useState("")
  const [instagram,setInstagram] = useState("")
  const [loading,setLoading] = useState(false)

  async function saveBrand(){

    setLoading(true)

    const {data:{user}} = await supabase.auth.getUser()

    const {error} = await supabase
      .from("brands")
      .insert({
        user_id:user.id,
        website,
        instagram
      })

    if(!error){
      router.push("/dashboard")
    }

    setLoading(false)

  }

  return(

    <div className="max-w-xl mx-auto mt-20">

      <h1 className="text-2xl font-bold mb-6">
        Brand Setup
      </h1>

      <input
        className="w-full border p-3 mb-4 rounded"
        placeholder="Brand Website"
        value={website}
        onChange={(e)=>setWebsite(e.target.value)}
      />

      <input
        className="w-full border p-3 mb-4 rounded"
        placeholder="Instagram URL"
        value={instagram}
        onChange={(e)=>setInstagram(e.target.value)}
      />

      <button
        onClick={saveBrand}
        className="bg-black text-white px-6 py-3 rounded"
      >
        {loading ? "Saving..." : "Continue"}
      </button>

    </div>

  )

}