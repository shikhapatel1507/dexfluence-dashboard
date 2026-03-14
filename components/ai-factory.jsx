"use client"

const stages = [
  "Hooks",
  "Scripts",
  "Images",
  "Videos",
  "Approval",
  "Publishing",
  "Swarm"
]

export default function AIFactory() {
  return (
    <div className="mt-12">

      <h2 className="text-xl font-semibold mb-6">
        AI Content Factory
      </h2>

      <div className="flex items-center justify-between">

        {stages.map((stage, index) => (
          <div key={index} className="flex flex-col items-center">

            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-110 transition">

              <span className="text-sm text-center">
                {stage}
              </span>

            </div>

            {index < stages.length - 1 && (
              <div className="w-24 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 mt-6"></div>
            )}

          </div>
        ))}

      </div>

    </div>
  )
}