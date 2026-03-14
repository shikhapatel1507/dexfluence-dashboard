"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const stages = [
  "Hooks",
  "Scripts",
  "Images",
  "Videos",
  "Approval",
  "Publishing",
  "Swarm"
]

export default function FactoryMap() {

  const [step, setStep] = useState(0)

  useEffect(() => {

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % stages.length)
    }, 2000)

    return () => clearInterval(interval)

  }, [])

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-10">

      <h2 className="text-xl font-semibold mb-8">
        Live AI Factory
      </h2>

      <div className="flex justify-between items-center">

        {stages.map((stage, i) => (

          <div key={i} className="flex flex-col items-center">

            <motion.div
              animate={{
                backgroundColor:
                  i === step ? "#7c3aed" : "#27272a"
              }}
              className="w-16 h-16 rounded-full flex items-center justify-center text-sm font-semibold"
            >
              {i + 1}
            </motion.div>

            <p className="mt-3 text-xs text-zinc-400">
              {stage}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}