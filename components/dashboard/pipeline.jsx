"use client"

import { motion } from "framer-motion"

export default function Pipeline() {

  const stages = [
    "Hooks",
    "Scripts",
    "Images",
    "Videos",
    "Approval",
    "Publishing",
    "Swarm"
  ]

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-10">

      <h2 className="text-xl font-semibold mb-8">
        AI Content Factory
      </h2>

      <div className="flex justify-between items-center">

        {stages.map((stage, i) => (

          <motion.div
            key={i}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="flex flex-col items-center"
          >

            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-500/20 border border-purple-500 shadow-lg">

              <span className="text-sm text-purple-300">
                {i + 1}
              </span>

            </div>

            <p className="mt-3 text-sm text-zinc-300">
              {stage}
            </p>

          </motion.div>

        ))}

      </div>

    </div>
  )
}