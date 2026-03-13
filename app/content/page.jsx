"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ContentLibrary(){

const [videos,setVideos] = useState([])

async function loadVideos(){

const { data } = await supabase
.from("assets")
.select("*")
.eq("type","video")
.order("created_at",{ascending:false})

setVideos(data || [])

}

useEffect(()=>{

loadVideos()

},[])

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-8">
Content Library
</h1>

<div className="grid grid-cols-4 gap-6">

{videos.map((video)=>(
<div
key={video.id}
className="border rounded-lg p-4"
>

<video
src={video.url}
controls
className="rounded mb-4"
/>

<p className="text-sm text-gray-600 mb-2">
Video ID
</p>

<p className="text-xs break-all">
{video.id}
</p>

</div>
))}

</div>

</div>

)

}