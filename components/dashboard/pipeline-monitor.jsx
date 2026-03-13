"use client"

import { useEffect, useState } from "react"

export default function PipelineMonitor(){

  const [status,setStatus] = useState({
    script:false,
    image:false,
    video:false,
    publish:false,
    strategy:false
  })

  async function checkWorkers(){

    try{

      const res = await fetch("/api/workers/status")
      const data = await res.json()

      const workerMap = {}
      data.workers?.forEach(w => { workerMap[w.name] = w.active })
      setStatus({ script: workerMap["scriptWorker"] ?? false, image: workerMap["imageWorker"] ?? false, video: workerMap["videoWorker"] ?? false, publish: workerMap["publishWorker"] ?? false, strategy: workerMap["strategyWorker"] ?? false })

    }catch(err){

      console.log("Worker check failed")

    }

  }

  useEffect(()=>{

    checkWorkers()

    const interval = setInterval(checkWorkers,5000)

    return ()=>clearInterval(interval)

  },[])

  function Indicator({active}){

    return (
      <div className={`w-3 h-3 rounded-full ${
        active ? "bg-green-500" : "bg-red-500"
      }`} />
    )
  }

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="font-bold mb-4">
        AI Pipeline Monitor
      </h2>

      <div className="space-y-3 text-sm">

        <div className="flex justify-between">
          <span>Script Worker</span>
          <Indicator active={status.script}/>
        </div>

        <div className="flex justify-between">
          <span>Image Worker</span>
          <Indicator active={status.image}/>
        </div>

        <div className="flex justify-between">
          <span>Video Worker</span>
          <Indicator active={status.video}/>
        </div>

        <div className="flex justify-between">
          <span>Publish Worker</span>
          <Indicator active={status.publish}/>
        </div>

        <div className="flex justify-between">
          <span>Strategy Engine</span>
          <Indicator active={status.strategy}/>
        </div>

      </div>

    </div>

  )

}