"use client"

import { useState } from "react"

export default function Campaign(){

  const [product,setProduct] = useState("")
  const [videos,setVideos] = useState(20)
  const [style,setStyle] = useState("ugc")
  const [loading,setLoading] = useState(false)

  async function launchCampaign(){

    setLoading(true)

    const res = await fetch("/api/campaign",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        product,
        videos,
        style
      })
    })

    const data = await res.json()

    console.log(data)

    setLoading(false)

    alert("Campaign launched 🚀")

  }

  return(

    <div className="p-10 max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Launch Campaign
      </h1>

      <div className="space-y-4">

        <input
          placeholder="Product URL"
          value={product}
          onChange={e=>setProduct(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          value={videos}
          onChange={e=>setVideos(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <select
          value={style}
          onChange={e=>setStyle(e.target.value)}
          className="w-full border p-3 rounded"
        >

          <option value="ugc">UGC Style</option>
          <option value="studio">Studio Ad</option>
          <option value="viral">Viral Hook</option>

        </select>

        <button
          onClick={launchCampaign}
          className="w-full bg-black text-white p-3 rounded"
        >
          {loading ? "Launching..." : "Launch AI Campaign"}
        </button>

      </div>

    </div>

  )

}