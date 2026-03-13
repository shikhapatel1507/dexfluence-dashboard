"use client"

export default function AgentCard({ agent }) {

  return (

    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">

      <div className="flex items-center gap-4">

        {/* Avatar */}

        <img
          src={agent.avatar || "/avatar-placeholder.png"}
          alt={agent.username}
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Agent Info */}

        <div>

          <p className="font-semibold">
            @{agent.username}
          </p>

          <p className="text-xs text-gray-500">
            {agent.niche}
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">

        <div className="bg-gray-50 p-2 rounded">

          <p className="text-gray-400 text-xs">
            Posts
          </p>

          <p className="font-semibold">
            {agent.posts || 0}
          </p>

        </div>

        <div className="bg-gray-50 p-2 rounded">

          <p className="text-gray-400 text-xs">
            Views
          </p>

          <p className="font-semibold">
            {agent.views || 0}
          </p>

        </div>

      </div>

    </div>

  )

}