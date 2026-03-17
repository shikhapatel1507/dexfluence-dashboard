"use client"

import { useState, useEffect } from "react"

/* ───────── TYPES ───────── */
type Post = {
  id: string
  topic?: string
  viral_score?: number
  s3_url?: string
}

type Order = {
  id: string
  order_value?: number
}

/* ───────── DESIGN ───────── */
const C = {
  accent: "#7B6EF6",
  success: "#3ecfcf",
  error: "#f06292",
  bg: "#060608",
  bg2: "#0d0d12",
  text: "#f0f0f8",
  surface: "#1a1a26",
  border: "rgba(255,255,255,0.1)",
}

/* ───────── HELPERS ───────── */
const tier = (p: Post) => {
  const s = p.viral_score || 0
  if (s >= 80) return "winner"
  if (s <= 40) return "loser"
  return "avg"
}

/* ───────── POST CARD ───────── */
function PostCard({
  post,
  onScale,
  onStop,
}: {
  post: Post
  onScale: (id: string) => void
  onStop: (id: string) => void
}) {
  return (
    <div
      style={{
        background: C.bg2,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <div style={{ aspectRatio: "9/16" }}>
        {post.s3_url ? (
          <video
            src={post.s3_url}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
          />
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            🎬
          </div>
        )}
      </div>

      <div style={{ padding: 8 }}>
        <div style={{ fontSize: 11, color: "#aaa" }}>
          {post.topic || "Untitled"}
        </div>

        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          <button
            onClick={() => onScale(post.id)}
            style={{ flex: 1, background: C.success, border: "none", cursor: "pointer" }}
          >
            🚀
          </button>
          <button
            onClick={() => onStop(post.id)}
            style={{ flex: 1, background: C.error, border: "none", cursor: "pointer" }}
          >
            ⛔
          </button>
        </div>
      </div>
    </div>
  )
}

/* ───────── MAIN ───────── */
export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchData()
    const i = setInterval(fetchData, 30000)
    return () => clearInterval(i)
  }, [])

  async function fetchData() {
    try {
      const [p, o] = await Promise.all([
        fetch("/api/posts?limit=30"),
        fetch("/api/orders"),
      ])

      const pData = await p.json()
      const oData = await o.json()

      setPosts(pData.posts || [])
      setOrders(oData.orders || [])
    } catch (err) {
      console.error("❌ Fetch error:", err)
    }
  }

  async function scalePost(postId: string) {
    try {
      const res = await fetch("/api/scale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      })

      const d = await res.json()
      alert(`Scaled ${d.scaled || 0}`)
    } catch (err) {
      console.error("❌ Scale error:", err)
    }
  }

  async function stopPost(postId: string) {
    try {
      await fetch("/api/pause", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      })
    } catch (err) {
      console.error("❌ Stop error:", err)
    }
  }

  const revenue = orders.reduce((s, o) => s + (o.order_value || 0), 0)
  const winners = posts.filter(p => tier(p) === "winner")

  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: 20, color: C.text }}>
      <h1>Dexfluence</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <div>💰 ₹{revenue}</div>
        <div>📊 {posts.length} posts</div>
        <div>🔥 {winners.length} winners</div>
      </div>

      <h3>Top Performers</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
        {winners.slice(0, 4).map(p => (
          <PostCard key={p.id} post={p} onScale={scalePost} onStop={stopPost} />
        ))}
      </div>

      <h3 style={{ marginTop: 30 }}>All Posts</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
        {posts.map(p => (
          <PostCard key={p.id} post={p} onScale={scalePost} onStop={stopPost} />
        ))}
      </div>
    </div>
  )
}