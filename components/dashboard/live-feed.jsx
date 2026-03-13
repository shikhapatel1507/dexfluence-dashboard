"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function LiveFeed(){

  const [posts,setPosts] = useState([])

  useEffect(()=>{

    async function loadPosts(){

      const {data} = await supabase
        .from("posts")
        .select("*")
        .order("created_at",{ascending:false})
        .limit(10)

      if(data) setPosts(data)

    }

    loadPosts()

    const channel = supabase
      .channel("posts-feed")
      .on(
        "postgres_changes",
        {
          event:"INSERT",
          schema:"public",
          table:"posts"
        },
        payload=>{
          setPosts(prev=>[payload.new,...prev])
        }
      )
      .subscribe()

    return ()=>{
      supabase.removeChannel(channel)
    }

  },[])

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="font-bold mb-4">
        Live Content Feed
      </h2>

      <div className="space-y-3">

        {posts.map(post=>(
          <div
            key={post.id}
            className="border p-3 rounded-lg text-sm"
          >

            <p className="font-medium">
              {post.caption?.slice(0,80)}
            </p>

            <p className="text-gray-500 text-xs mt-1">
              Video generated
            </p>

          </div>
        ))}

      </div>

    </div>

  )

}