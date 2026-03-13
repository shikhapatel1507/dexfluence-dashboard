"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AnalyticsPage(){

const [posts,setPosts] = useState([])

const [stats,setStats] = useState({
views:0,
likes:0,
comments:0,
posts:0
})

async function loadAnalytics(){

const { data } = await supabase
.from("posts")
.select("*")

setPosts(data || [])

let totalViews = 0
let totalLikes = 0
let totalComments = 0

data?.forEach(p=>{

totalViews += p.views || 0
totalLikes += p.likes || 0
totalComments += p.comments || 0

})

setStats({
views: totalViews,
likes: totalLikes,
comments: totalComments,
posts: data?.length || 0
})

}

useEffect(()=>{

loadAnalytics()

},[])

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-8">
Analytics Dashboard
</h1>

{/* Metrics */}

<div className="grid grid-cols-4 gap-6 mb-10">

<div className="border rounded-lg p-6">

<p className="text-gray-500 text-sm">
Total Posts
</p>

<h2 className="text-2xl font-bold">
{stats.posts}
</h2>

</div>

<div className="border rounded-lg p-6">

<p className="text-gray-500 text-sm">
Total Views
</p>

<h2 className="text-2xl font-bold">
{stats.views}
</h2>

</div>

<div className="border rounded-lg p-6">

<p className="text-gray-500 text-sm">
Total Likes
</p>

<h2 className="text-2xl font-bold">
{stats.likes}
</h2>

</div>

<div className="border rounded-lg p-6">

<p className="text-gray-500 text-sm">
Total Comments
</p>

<h2 className="text-2xl font-bold">
{stats.comments}
</h2>

</div>

</div>

{/* Top Content */}

<h2 className="text-xl font-semibold mb-4">
Top Performing Posts
</h2>

<div className="space-y-4">

{posts
.sort((a,b)=>b.viral_score-a.viral_score)
.slice(0,5)
.map((post)=>(
<div
key={post.id}
className="border rounded-lg p-6 flex justify-between"
>

<div>

<p className="text-sm text-gray-600">
{post.platform}
</p>

<a
href={post.post_url}
target="_blank"
className="text-blue-500"
>

View Post

</a>

</div>

<div className="text-sm">

<p>Views: {post.views}</p>
<p>Likes: {post.likes}</p>
<p>Comments: {post.comments}</p>

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