"use client"

import { useEffect, useState } from "react"

export default function FactoryMonitor() {

  const [data,setData] = useState({})

  useEffect(()=>{

    const load = async () => {
      const res = await fetch("/api/factory/status")
      const json = await res.json()
      setData(json)
    }

    load()
    const interval = setInterval(load, 5000)

    return () => clearInterval(interval)

  },[])

  return (
    <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6">

      <h2 className="text-lg font-semibold mb-6">
        AI Factory Monitor
      </h2>

      <div className="grid grid-cols-4 gap-6">

        {Object.entries(data).map(([name,stats])=>(
          <div key={name} className="bg-zinc-950 p-4 rounded-lg border border-zinc-800">

            <h3 className="text-sm text-zinc-400 mb-3">{name}</h3>

            <p>Waiting: {stats.waiting}</p>
            <p>Active: {stats.active}</p>
            <p>Completed: {stats.completed}</p>
            <p>Failed: {stats.failed}</p>

          </div>
        ))}

      </div>

    </div>
  )
}