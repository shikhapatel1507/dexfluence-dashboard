"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Dashboard(){

  const [campaigns,setCampaigns] = useState([])
  const [agents,setAgents] = useState([])
  const [posts,setPosts] = useState([])
  const [videos,setVideos] = useState([])

  useEffect(()=>{

    loadData()

  },[])

  async function loadData(){

    const { data: campaignsData } = await supabase
      .from("campaigns")
      .select("*")

    const { data: agentsData } = await supabase
      .from("agents")
      .select("*")

    const { data: postsData } = await supabase
      .from("posts")
      .select("*")

    const { data: videosData } = await supabase
      .from("assets")
      .select("*")
      .eq("type","video")

    setCampaigns(campaignsData || [])
    setAgents(agentsData || [])
    setPosts(postsData || [])
    setVideos(videosData || [])

  }

  return(

    <div style={{padding:"40px"}}>

      <h1>Brand Dashboard</h1>

      <hr/>

      <h2>Campaigns</h2>

      {campaigns.map(c=>(
        <div key={c.id}>
          {c.product_name} — {c.status}
        </div>
      ))}

      <hr/>

      <h2>Generated Videos</h2>

      {videos.map(v=>(
        <div key={v.id}>
          <video src={v.url} width="300" controls />
        </div>
      ))}

      <hr/>

      <h2>Agent Accounts</h2>

      {agents.map(a=>(
        <div key={a.id}>
          {a.username} ({a.platform})
        </div>
      ))}

      <hr/>

      <h2>Instagram Posts</h2>

      {posts.map(p=>(
        <div key={p.id}>

          Platform: {p.platform}

          <br/>

          <a href={p.instagram_post_url} target="_blank">
            View Post
          </a>

        </div>
      ))}

    </div>

  )

}