"use client"

import Sidebar from "@/components/dashboard/sidebar"
import Metrics from "@/components/dashboard/metrics"
import PipelineMonitor from "@/components/dashboard/pipeline-monitor"
import StrategyPanel from "@/components/dashboard/strategy-panel"
import SwarmPanel from "@/components/dashboard/swarm-panel"
import PerformanceChart from "@/components/dashboard/performance-chart"
import AIInsights from "@/components/dashboard/ai-insights"
import AgentActivity from "@/components/dashboard/agent-activity"
import VideoGrid from "@/components/dashboard/video-grid"
import LiveFeed from "@/components/dashboard/live-feed"
import FactoryMap from "@/components/dashboard/factory-map"
import WorkerLogs from "@/components/dashboard/worker-logs"
import PostsTable from "@/components/dashboard/posts-table"
export default function Dashboard(){

  return(

    <div className="flex">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Dashboard */}

      <div className="flex-1 p-10 bg-gray-50 min-h-screen">

        {/* Header */}

        <h1 className="text-3xl font-bold mb-8">
          Dexfluence Command Center
        </h1>

        {/* Metrics */}

        <Metrics />

        <FactoryMap/>
        <WorkerLogs/>
        <PostsTable/>

        {/* Pipeline Monitor */}

        <div className="mt-6 mb-6">
          <PipelineMonitor />
        </div>

        {/* Strategy Engine */}

        <div className="mb-6">
          <StrategyPanel />
        </div>

        {/* Agent Swarm */}

        <div className="mb-6">
          <SwarmPanel />
        </div>

        {/* Charts + AI Insights */}

        <div className="grid grid-cols-2 gap-6 mb-6">

          <PerformanceChart />

          <AIInsights />

        </div>

        {/* Agent Activity + Video Pipeline */}

        <div className="grid grid-cols-2 gap-6 mb-6">

          <AgentActivity />

          <VideoGrid />

        </div>

        {/* Live Content Feed */}

        <LiveFeed />

      </div>

    </div>

  )

}