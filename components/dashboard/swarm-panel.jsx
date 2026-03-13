"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function SwarmPanel(){

  const [agents,setAgents] = useState([])

  async function load(){

    const {data} = await supabase
      .from("agents")
      .select("*")
      .order("created_at",{ascending:false})
      .limit(5)

    if(data){
      setAgents(data)
    }

  }

  useEffect(()=>{
    load()
  },[])

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="font-bold mb-4">
        AI Agent Swarm
      </h2>

      {agents.map(a => (

        <div key={a.id} className="border p-3 rounded mb-3">

          <p className="text-sm">
            @{a.username}
          </p>

          <p className="text-xs text-gray-500">
            {a.niche}
          </p>

        </div>

      ))}

    </div>

  )

}