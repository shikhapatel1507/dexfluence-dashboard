export default function ActivityFeed() {

  const logs = [
    "Script generated",
    "Image generated",
    "Video rendering",
    "Content approved",
    "Agent posting",
    "Viral post detected",
    "Swarm deployed"
  ]

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-10">

      <h2 className="text-xl font-semibold mb-6">
        AI Worker Activity
      </h2>

      <div className="space-y-3 text-zinc-400">

        {logs.map((log, i) => (
          <p key={i}>{log}</p>
        ))}

      </div>

    </div>
  )
}