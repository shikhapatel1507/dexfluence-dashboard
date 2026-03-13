"use client"

export default function CampaignPerformance(){

const campaigns = [

{
name:"Collagen Gummies",
videos:20,
views:"120k",
status:"Running"
},

{
name:"Hair Growth Serum",
videos:15,
views:"82k",
status:"Completed"
}

]

return(

<div className="border rounded-lg p-6">

<h2 className="text-xl font-semibold mb-4">
Campaign Performance
</h2>

<div className="space-y-4">

{campaigns.map((c,i)=>(

<div
key={i}
className="flex justify-between border p-4 rounded"
>

<div>

<p className="font-medium">
{c.name}
</p>

<p className="text-sm text-gray-500">
{c.videos} videos
</p>

</div>

<div className="text-right">

<p>
{c.views} views
</p>

<p className="text-green-600 text-sm">
{c.status}
</p>

</div>

</div>

))}

</div>

</div>

)

}