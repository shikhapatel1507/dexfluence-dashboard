"use client"

import Sidebar from "@/components/layout/sidebar"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const data = [
  { day: "Mon", views: 2000 },
  { day: "Tue", views: 4500 },
  { day: "Wed", views: 7000 },
  { day: "Thu", views: 9000 },
  { day: "Fri", views: 12000 },
  { day: "Sat", views: 18000 },
  { day: "Sun", views: 26000 }
]

export default function AnalyticsPage() {

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">

      <Sidebar/>

      <main className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-10">
          Analytics
        </h1>

        {/* Chart */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-10">

          <h2 className="text-xl font-semibold mb-6">
            Views Growth
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={data}>

              <XAxis dataKey="day"/>
              <YAxis/>
              <Tooltip/>

              <Line
                type="monotone"
                dataKey="views"
                stroke="#a855f7"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>


        {/* Top Posts */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">

          <h2 className="text-xl font-semibold mb-6">
            Top Performing Videos
          </h2>

          <div className="space-y-3 text-zinc-400">

            <p>AI Marketing Hack — 120k views</p>
            <p>Shopify Growth Trick — 95k views</p>
            <p>Content Strategy Tip — 88k views</p>
            <p>Instagram Algorithm Secret — 75k views</p>

          </div>

        </div>

      </main>

    </div>
  )
}