"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function PostsPage(){

const [posts,setPosts] = useState([])

async function loadPosts(){

const { data } = await supabase
.from("posts")
.select("*")
.order("created_at",{ascending:false})

setPosts(data || [])

}

useEffect(()=>{

loadPosts()

},[])

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-8">
Instagram Posts
</h1>

<div className="space-y-6">

{posts.map((post)=>(
<div
key={post.id}
className="border rounded-lg p-6 flex items-center justify-between"
>

<div>

<p className="text-sm text-gray-600 mb-1">
Platform
</p>

<p className="font-medium">
{post.platform}
</p>

<a
href={post.post_url}
target="_blank"
className="text-blue-500 text-sm"
>

View Post

</a>

</div>

<div className="text-sm">

<p>
Views: {post.views}
</p>

<p>
Likes: {post.likes}
</p>

<p>
Comments: {post.comments}
</p>

<p className="text-green-600">

Viral Score: {post.viral_score}

</p>

</div>

</div>
))}

</div>

</div>

)

}