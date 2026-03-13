"use client"

import { useState } from "react"

export default function AgentGenerator(){

  const [count,setCount] = useState(10)
  const [loading,setLoading] = useState(false)

  async function generateAgents(){

    setLoading(true)

    await fetch("/api/agent/generate",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        count
      })
    })

    setLoading(false)

    alert("Agents generated 🚀")

  }

  return(

    <div className="bg-white p-6 rounded-xl shadow mb-6">

      <h2 className="text-lg font-bold mb-4">
        Generate AI Agents
      </h2>

      <div className="flex gap-4 items-center">

        <input
          type="number"
          value={count}
          onChange={e=>setCount(e.target.value)}
          className="border p-2 rounded w-24"
        />

        <button
          onClick={generateAgents}
          className="bg-black text-white px-4 py-2 rounded"
        >

          {loading ? "Generating..." : "Generate Agents"}

        </button>

      </div>

    </div>

  )

}