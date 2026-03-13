"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

import Sidebar from "@/components/dashboard/sidebar"
import AgentCard from "@/components/dashboard/agents-card"
import AgentGenerator from "@/components/dashboard/agent-generator"

export default function AgentsPage() {

  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadAgents() {

    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) {
      setAgents(data)
    }

    setLoading(false)

  }

  useEffect(() => {
    loadAgents()
  }, [])

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-10 bg-gray-50 min-h-screen">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            AI Creator Agents
          </h1>

        </div>

        {/* Agent Generator */}

        <AgentGenerator />

        {/* Loading */}

        {loading && (
          <p className="text-gray-500 mt-6">
            Loading agents...
          </p>
        )}

        {/* Empty State */}

        {!loading && agents.length === 0 && (
          <p className="text-gray-500 mt-6">
            No agents created yet.
          </p>
        )}

        {/* Agents Grid */}

        <div className="grid grid-cols-4 gap-6 mt-6">

          {agents.map(agent => (

            <AgentCard
              key={agent.id}
              agent={agent}
            />

          ))}

        </div>

      </div>

    </div>

  )

}