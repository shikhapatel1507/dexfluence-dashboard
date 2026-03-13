"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function PostsAnalytics(){

const [posts,setPosts] = useState([])

async function loadPosts(){

const { data } = await supabase
.from("posts")
.select("*")
.order("created_at",{ ascending:false })
.limit(10)

setPosts(data || [])

}

useEffect(()=>{

loadPosts()

},[])

return(

<div className="mt-10 border rounded-lg p-6">

<h2 className="text-xl font-semibold mb-6">
Recent Posts
</h2>

<div className="space-y-4">

{posts.map((p)=>(
<div
key={p.id}
className="flex items-center justify-between border p-4 rounded"
>

<div>

<p className="font-medium">
{p.platform}
</p>

<a
href={p.post_url}
target="_blank"
className="text-blue-500 text-sm"
>

View Post

</a>

</div>

<div className="text-sm text-gray-600">

Views: {p.views}  
Likes: {p.likes}  
Comments: {p.comments}

</div>

</div>
))}

</div>

</div>

)

}