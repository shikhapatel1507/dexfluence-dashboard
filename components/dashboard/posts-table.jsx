"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function PostsTable(){

  const [posts,setPosts] = useState([])

  async function load(){

    const {data} = await supabase
      .from("posts")
      .select("*")
      .order("created_at",{ascending:false})
      .limit(10)

    if(data){
      setPosts(data)
    }

  }

  useEffect(()=>{
    load()
  },[])

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="font-bold mb-4">
        Instagram Content
      </h2>

      {posts.map(p => (

        <div key={p.id} className="border p-3 mb-3 rounded">

          <p className="text-sm">
            {p.caption}
          </p>

          <p className="text-xs text-gray-500">
            {p.platform}
          </p>

        </div>

      ))}

    </div>

  )

}