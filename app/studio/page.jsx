"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Sidebar from "@/components/dashboard/sidebar"

export default function StudioPage() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadContent() {

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) {
      setPosts(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    loadContent()
  }, [])

  async function approvePost(id) {

    await fetch("/api/post/approve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })

    loadContent()
  }

  async function rejectPost(id) {

    await supabase
      .from("posts")
      .update({ status: "rejected" })
      .eq("id", id)

    loadContent()
  }

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-10 bg-gray-50 min-h-screen">

        <h1 className="text-3xl font-bold mb-8">
          Content Studio
        </h1>

        {loading && (
          <p className="text-gray-500">
            Loading content...
          </p>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-gray-500">
            No content generated yet.
          </p>
        )}

        <div className="grid grid-cols-4 gap-6">

          {posts.map(post => (

            <div
              key={post.id}
              className="bg-white rounded-xl shadow p-4"
            >

              {/* Video Preview */}

              <div className="mb-3">

                {post.video_url ? (

                  <video
                    src={post.video_url}
                    controls
                    className="rounded-lg w-full"
                  />

                ) : (

                  <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center text-gray-500">
                    No Video
                  </div>

                )}

              </div>

              {/* Caption */}

              <p className="text-sm mb-3 line-clamp-3">
                {post.caption}
              </p>

              {/* Stats */}

              <div className="flex justify-between text-xs text-gray-500">

                <span>
                  Views: {post.views || 0}
                </span>

                <span>
                  {post.status || "generated"}
                </span>

              </div>

              {/* Actions */}

              <div className="mt-3 flex gap-2">

                <button
                  onClick={() => approvePost(post.id)}
                  className="bg-green-500 text-white text-xs px-3 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectPost(post.id)}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded"
                >
                  Reject
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}