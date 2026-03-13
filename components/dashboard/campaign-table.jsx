"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CampaignTable() {

  const campaigns = [
    { name: "Collagen Gummies", status: "Running", videos: 20 },
    { name: "Hair Growth Serum", status: "Completed", videos: 15 },
  ]

  return (

    <div className="border rounded-lg p-6">

      <h2 className="text-xl font-semibold mb-4">
        Campaigns
      </h2>

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Videos</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>

          {campaigns.map((c,i)=>(
            <TableRow key={i}>

              <TableCell>{c.name}</TableCell>
              <TableCell>{c.status}</TableCell>
              <TableCell>{c.videos}</TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>

    </div>

  )

}
