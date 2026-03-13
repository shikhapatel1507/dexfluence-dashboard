"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function StrategyPanel(){

  const [strategies,setStrategies] = useState([])

  async function load(){

    const {data} = await supabase
      .from("strategies")
      .select("*")
      .order("created_at",{ascending:false})
      .limit(3)

    if(data){
      setStrategies(data)
    }

  }

  useEffect(()=>{
    load()
  },[])

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="font-bold mb-4">
        AI Strategy Engine
      </h2>

      {strategies.map(s => (

        <div key={s.id} className="border p-3 rounded mb-3 text-sm">

          {s.recommendations}

        </div>

      ))}

    </div>

  )

}