"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CampaignsPage() {

  const [campaigns,setCampaigns] = useState([])

  useEffect(()=>{

    const load = async () => {

      const res = await fetch("/api/campaign/list")
      const data = await res.json()

      setCampaigns(data)

    }

    load()

  },[])

  return (

    <div className="flex min-h-screen bg-zinc-950 text-white">

      <Sidebar/>

      <main className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-10">
          Campaigns
        </h1>

        <Card className="bg-zinc-900 border-zinc-800">

          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>

          <CardContent>

            <table className="w-full text-left">

              <thead className="text-zinc-400">

                <tr>
                  <th className="p-3">Campaign</th>
                  <th className="p-3">Platform</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Videos</th>
                  <th className="p-3">Views</th>
                </tr>

              </thead>

              <tbody>

                {campaigns.map((campaign,i)=>(
                  <tr key={i} className="border-t border-zinc-800">

                    <td className="p-3">
                      {campaign.topic}
                    </td>

                    <td className="p-3">
                      {campaign.platform}
                    </td>

                    <td className="p-3">
                      {campaign.status}
                    </td>

                    <td className="p-3">
                      {campaign.videos}
                    </td>

                    <td className="p-3">
                      {campaign.views}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </CardContent>

        </Card>

      </main>

    </div>

  )
}