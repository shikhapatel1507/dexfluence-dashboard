"use client"

export default function FactoryMap(){

  const steps = [
    "Script",
    "Image",
    "Video",
    "Approve",
    "Publish",
    "Viral",
    "Swarm"
  ]

  return(

    <div className="bg-white p-6 rounded-xl shadow mb-6">

      <h2 className="font-bold mb-6">
        AI Content Factory
      </h2>

      <div className="flex items-center justify-between">

        {steps.map((step,index)=>(
          
          <div
            key={index}
            className="flex flex-col items-center flex-1"
          >

            {/* Circle */}

            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
              {index+1}
            </div>

            {/* Label */}

            <p className="text-xs mt-2 text-gray-600 text-center">
              {step}
            </p>

            {/* Connector */}

            {index !== steps.length-1 && (
              <div className="w-full h-1 bg-gray-200 mt-4"></div>
            )}

          </div>

        ))}

      </div>

    </div>

  )

}