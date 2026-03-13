"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function CommandCenter(){

const [campaigns,setCampaigns] = useState([])

async function loadCampaigns(){

const { data } = await supabase
.from("campaigns")
.select("*")
.order("created_at",{ascending:false})

setCampaigns(data || [])

}

useEffect(()=>{
loadCampaigns()
},[])

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-8">
Campaign Command Center
</h1>

<div className="space-y-6">

{campaigns.map((campaign)=>(
<div
key={campaign.id}
className="border rounded-lg p-6"
>

<div className="flex justify-between mb-4">

<h2 className="text-xl font-semibold">
{campaign.product_name}
</h2>

<span className="text-sm text-green-600">
{campaign.status}
</span>

</div>

<div className="grid grid-cols-4 gap-4 text-sm">

<div>

<p className="text-gray-500">
Videos Target
</p>

<p className="font-medium">
{campaign.videos}
</p>

</div>

<div>

<p className="text-gray-500">
Videos Generated
</p>

<p className="font-medium">
{campaign.videos_generated}
</p>

</div>

<div>

<p className="text-gray-500">
Platform
</p>

<p className="font-medium">
Instagram
</p>

</div>

<div>

<p className="text-gray-500">
Status
</p>

<p className="font-medium text-green-600">
Running
</p>

</div>

</div>

</div>
))}

</div>

</div>

)

}