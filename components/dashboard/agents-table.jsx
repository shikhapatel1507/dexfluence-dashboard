"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AgentsTable(){

  const agents = [
    { username: "GlowWithAnna", platform: "Instagram" },
    { username: "SkinCareLab", platform: "TikTok" },
  ]

  return(

    <div className="mt-10 border rounded-lg p-6">

      <h2 className="text-xl font-semibold mb-4">
        Agent Accounts
      </h2>

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Platform</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>

          {agents.map((a,i)=>(
            <TableRow key={i}>

              <TableCell>{a.username}</TableCell>
              <TableCell>{a.platform}</TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>

    </div>

  )

}
