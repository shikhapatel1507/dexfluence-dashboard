"use client"

import { useEffect, useState } from "react"

export default function WorkerLogs(){

  const [logs,setLogs] = useState([])

  async function loadLogs(){

    try{

      const res = await fetch("/api/logs")
      const data = await res.json()

      setLogs(data.logs || [])

    }catch(err){

      console.log("Failed to load logs")

    }

  }

  useEffect(()=>{

    loadLogs()

    const interval = setInterval(loadLogs,3000)

    return ()=>clearInterval(interval)

  },[])

  return(

    <div className="bg-white p-6 rounded-xl shadow mb-6">

      <h2 className="font-bold mb-4">
        AI Worker Activity
      </h2>

      <div className="space-y-2 max-h-64 overflow-y-auto text-sm">

        {logs.map((log,index)=>(

          <div
            key={index}
            className="border p-2 rounded text-gray-700"
          >

            {log}

          </div>

        ))}

        {logs.length === 0 && (
          <p className="text-gray-400">
            No worker activity yet.
          </p>
        )}

      </div>

    </div>

  )

}