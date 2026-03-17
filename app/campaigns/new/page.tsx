"use client"

import { useState, useEffect } from "react"

const C = {
  accent:   "#7B6EF6",
  accent2:  "#3ecfcf",
  muted:    "#7a7a96",
  text:     "#f0f0f8",
  bg:       "#060608",
  bg2:      "#0d0d12",
  surface:  "#1a1a26",
  border:   "rgba(255,255,255,0.07)",
  borderHi: "rgba(255,255,255,0.14)",
  head:     "'Space Grotesk', sans-serif",
  body:     "'Instrument Sans', sans-serif",
}

interface Post {
  id: string
  caption: string
  media_url: string
  thumbnail_url?: string
  permalink: string
  media_type: string
  like_count: number
  comments_count: number
  timestamp: string
}

interface BrandData {
  name: string
  website: string
  instagram: string
  description: string
  tone: string
  audience: string
}

export default function NewCampaignPage() {
  const [step, setStep] = useState(1)
  const [brand, setBrand] = useState<BrandData>({
    name: "",
    website: "",
    instagram: "",
    description: "",
    tone: "empowering, modern, culturally proud",
    audience: "women aged 18-45",
  })
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([])
  const [loadingPosts, setLoadingPosts] = useState(false)
  const [launching, setLaunching] = useState(false)
  const [launched, setLaunched] = useState(false)
  const [error, setError] = useState("")

  /* ── fetch Instagram posts ── */
  async function fetchPosts() {
    setLoadingPosts(true)
    setError("")
    try {
      const res = await fetch("/api/instagram/fetch")
      const data = await res.json()
      if (data.error) throw new Error(data.message || "Failed to fetch posts")
      setPosts(data.posts || [])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoadingPosts(false)
    }
  }

  /* ── toggle post selection ── */
  function togglePost(post: Post) {
    setSelectedPosts(prev =>
      prev.find(p => p.id === post.id)
        ? prev.filter(p => p.id !== post.id)
        : prev.length >= 5
          ? prev  // max 5 products
          : [...prev, post]
    )
  }

  /* ── launch campaign ── */
  async function launchCampaign() {
    if (selectedPosts.length === 0) return
    setLaunching(true)
    setError("")

    try {
      const res = await fetch("/api/campaign/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand,
          products: selectedPosts.map(p => ({
            id:        p.id,
            imageUrl:  p.media_url || p.thumbnail_url,
            caption:   p.caption,
            permalink: p.permalink,
          })),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Launch failed")
      setLaunched(true)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLaunching(false)
    }
  }

  const inputStyle = {
    width: "100%",
    background: C.surface,
    border: `0.5px solid ${C.borderHi}`,
    borderRadius: 8,
    padding: "0.75rem 1rem",
    color: C.text,
    fontFamily: C.body,
    fontSize: 14,
    outline: "none",
  }

  const labelStyle = {
    fontSize: 12,
    color: C.muted,
    fontWeight: 500,
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
    marginBottom: "0.4rem",
    display: "block",
  }

  /* ── SUCCESS STATE ── */
  if (launched) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: C.body }}>
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{ fontSize: 64, marginBottom: "1rem" }}>🚀</div>
          <h1 style={{ fontFamily: C.head, fontSize: "2rem", fontWeight: 700, color: C.text, marginBottom: "1rem" }}>
            Campaign Launched!
          </h1>
          <p style={{ color: C.muted, marginBottom: "2rem" }}>
            {selectedPosts.length} AI Reels are being generated and will publish to Instagram automatically.
          </p>
          <a href="/dashboard" style={{ background: C.accent, color: "#fff", padding: "0.85rem 2rem", borderRadius: 10, textDecoration: "none", fontFamily: C.body, fontWeight: 500 }}>
            Monitor in Dashboard →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: C.body, padding: "2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.accent, fontWeight: 600, marginBottom: "0.5rem" }}>
            New Campaign
          </div>
          <h1 style={{ fontFamily: C.head, fontSize: "2rem", fontWeight: 700, color: C.text, margin: 0 }}>
            Launch AI Reels
          </h1>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem" }}>
          {[
            { n: 1, label: "Brand Details" },
            { n: 2, label: "Pick Products" },
            { n: 3, label: "Launch" },
          ].map(s => (
            <div
              key={s.n}
              onClick={() => s.n < step && setStep(s.n)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                cursor: s.n < step ? "pointer" : "default",
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: step >= s.n ? C.accent : C.surface,
                border: `0.5px solid ${step >= s.n ? C.accent : C.borderHi}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700,
                color: step >= s.n ? "#fff" : C.muted,
              }}>
                {s.n}
              </div>
              <span style={{ fontSize: 13, color: step >= s.n ? C.text : C.muted }}>{s.label}</span>
              {s.n < 3 && <span style={{ color:C.muted, marginLeft: 4 }}>→</span>}
            </div>
          ))}
        </div>

        {/* ── STEP 1: Brand Details ── */}
        {step === 1 && (
          <div style={{ background: C.bg2, border: `0.5px solid ${C.borderHi}`, borderRadius: 16, padding: "2rem" }}>
            <h2 style={{ fontFamily: C.head, fontSize: "1.2rem", fontWeight: 700, color: C.text, marginBottom: "2rem" }}>
              Brand Details
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div>
                <label style={labelStyle}>Brand Name *</label>
                <input
                  style={inputStyle}
                  placeholder="e.g. Danyah"
                  value={brand.name}
                  onChange={e => setBrand({ ...brand, name: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Website</label>
                <input
                  style={inputStyle}
                  placeholder="https://danyah.in"
                  value={brand.website}
                  onChange={e => setBrand({ ...brand, website: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Instagram Handle * </label>
                <input
                  style={inputStyle}
                  placeholder="@ananyaflauntsarees"
                  value={brand.instagram}
                  onChange={e => setBrand({ ...brand, instagram: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Target Audience</label>
                <input
                  style={inputStyle}
                  placeholder="e.g. women aged 18-45 in India"
                  value={brand.audience}
                  onChange={e => setBrand({ ...brand, audience: e.target.value })}
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Brand Description</label>
                <textarea
                  style={{ ...inputStyle, height: 80, resize: "none" }}
                  placeholder="What does your brand sell? What makes it unique?"
                  value={brand.description}
                  onChange={e => setBrand({ ...brand, description: e.target.value })}
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Brand Voice / Tone</label>
                <input
                  style={inputStyle}
                  placeholder="e.g. empowering, modern, culturally proud"
                  value={brand.tone}
                  onChange={e => setBrand({ ...brand, tone: e.target.value })}
                />
              </div>
            </div>

            {error && <p style={{ color: "#f06292", fontSize: 13, marginTop: "1rem" }}>{error}</p>}

            <button
              onClick={() => {
                if (!brand.name || !brand.instagram) {
                  setError("Brand name and Instagram handle are required")
                  return
                }
                setError("")
                setStep(2)
                fetchPosts()
              }}
              style={{
                marginTop: "2rem", background: C.accent, color: "#fff",
                border: "none", cursor: "pointer", padding: "0.85rem 2rem",
                borderRadius: 10, fontFamily: C.body, fontSize: 15, fontWeight: 500,
              }}
            >
              Next — Pick Products →
            </button>
          </div>
        )}

        {/* ── STEP 2: Product Picker ── */}
        {step === 2 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ fontFamily: C.head, fontSize: "1.2rem", fontWeight: 700, color: C.text, margin: 0 }}>
                  Pick Products to Feature
                </h2>
                <p style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>
                  Select up to 5 posts — one Reel will be created per product
                </p>
              </div>
              <div style={{
                background: C.surface, border: `0.5px solid ${C.borderHi}`,
                borderRadius: 8, padding: "0.5rem 1rem",
                fontSize: 13, color: C.accent, fontWeight: 600,
              }}>
                {selectedPosts.length} / 5 selected
              </div>
            </div>

            {loadingPosts ? (
              <div style={{ textAlign: "center", padding: "4rem", color: C.muted }}>
                Loading your Instagram posts...
              </div>
            ) : posts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", color: C.muted }}>
                <p>No posts found. Make sure your Instagram token has media permissions.</p>
                <button onClick={fetchPosts} style={{ marginTop: "1rem", background: C.accent, color: "#fff", border: "none", cursor: "pointer", padding: "0.6rem 1.5rem", borderRadius: 8, fontFamily: C.body }}>
                  Retry
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                {posts.map(post => {
                  const selected = selectedPosts.find(p => p.id === post.id)
                  const imgUrl   = post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url
                  return (
                    <div
                      key={post.id}
                      onClick={() => togglePost(post)}
                      style={{
                        position: "relative", cursor: "pointer",
                        borderRadius: 12, overflow: "hidden",
                        border: `2px solid ${selected ? C.accent : "transparent"}`,
                        transition: "border-color .2s, transform .15s",
                        transform: selected ? "scale(0.97)" : "scale(1)",
                        background: C.surface,
                      }}
                    >
                      {/* image */}
                      <div style={{ aspectRatio: "1", overflow: "hidden" }}>
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={post.caption?.slice(0, 40) || "post"}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div style={{ width: "100%", height: "100%", background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
                            🎬
                          </div>
                        )}
                      </div>

                      {/* selected overlay */}
                      {selected && (
                        <div style={{
                          position: "absolute", top: 8, right: 8,
                          width: 24, height: 24, borderRadius: "50%",
                          background: C.accent, display: "flex", alignItems: "center",
                          justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 700,
                        }}>
                          ✓
                        </div>
                      )}

                      {/* engagement */}
                      <div style={{ padding: "0.6rem 0.75rem" }}>
                        <p style={{ fontSize: 11, color: C.muted, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {post.caption?.slice(0, 50) || "No caption"}
                        </p>
                        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                          <span style={{ fontSize: 11, color: C.muted }}>❤️ {post.like_count || 0}</span>
                          <span style={{ fontSize: 11, color: C.muted }}>💬 {post.comments_count || 0}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <button
                onClick={() => setStep(1)}
                style={{ background: "transparent", color: C.muted, border: `0.5px solid ${C.borderHi}`, cursor: "pointer", padding: "0.85rem 1.5rem", borderRadius: 10, fontFamily: C.body, fontSize: 14 }}
              >
                ← Back
              </button>
              <button
                onClick={() => selectedPosts.length > 0 && setStep(3)}
                disabled={selectedPosts.length === 0}
                style={{
                  background: selectedPosts.length > 0 ? C.accent : C.surface,
                  color: "#fff", border: "none", cursor: selectedPosts.length > 0 ? "pointer" : "not-allowed",
                  padding: "0.85rem 2rem", borderRadius: 10, fontFamily: C.body, fontSize: 15, fontWeight: 500,
                  opacity: selectedPosts.length > 0 ? 1 : 0.5,
                }}
              >
                Next — Review & Launch →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Review & Launch ── */}
        {step === 3 && (
          <div style={{ background: C.bg2, border: `0.5px solid ${C.borderHi}`, borderRadius: 16, padding: "2rem" }}>
            <h2 style={{ fontFamily: C.head, fontSize: "1.2rem", fontWeight: 700, color: C.text, marginBottom: "2rem" }}>
              Review & Launch
            </h2>

            {/* brand summary */}
            <div style={{ background: C.surface, borderRadius: 12, padding: "1.2rem", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: 11, color: C.accent, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Brand</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                {[
                  ["Name", brand.name],
                  ["Instagram", brand.instagram],
                  ["Website", brand.website || "—"],
                  ["Audience", brand.audience],
                ].map(([k, v]) => (
                  <div key={k}>
                    <span style={{ fontSize: 12, color: C.muted }}>{k}: </span>
                    <span style={{ fontSize: 12, color: C.text }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* selected products */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ fontSize: 11, color: C.accent, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                {selectedPosts.length} Products Selected
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {selectedPosts.map(post => {
                  const imgUrl = post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url
                  return (
                    <div key={post.id} style={{ position: "relative" }}>
                      {imgUrl && (
                        <img
                          src={imgUrl}
                          alt=""
                          style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8, border: `0.5px solid ${C.borderHi}` }}
                        />
                      )}
                      <button
                        onClick={() => setSelectedPosts(prev => prev.filter(p => p.id !== post.id))}
                        style={{
                          position: "absolute", top: -6, right: -6,
                          width: 18, height: 18, borderRadius: "50%",
                          background: "#f06292", border: "none", color: "#fff",
                          fontSize: 10, cursor: "pointer", display: "flex",
                          alignItems: "center", justifyContent: "center",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* what will happen */}
            <div style={{ background: C.surface, borderRadius: 12, padding: "1.2rem", marginBottom: "2rem" }}>
              <div style={{ fontSize: 11, color: C.accent, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>What happens next</div>
              {[
                `GPT-4o writes ${selectedPosts.length} viral scripts based on your products`,
                "Nano Banana generates photorealistic human model wearing each product",
                "MiniMax animates each image into a 6-second video",
                "Videos upload to S3 and publish to Instagram automatically",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <span style={{ color: C.accent2, fontWeight: 700, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 13, color: C.muted }}>{step}</span>
                </div>
              ))}
            </div>

            {error && <p style={{ color: "#f06292", fontSize: 13, marginBottom: "1rem" }}>{error}</p>}

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => setStep(2)}
                style={{ background: "transparent", color: C.muted, border: `0.5px solid ${C.borderHi}`, cursor: "pointer", padding: "0.85rem 1.5rem", borderRadius: 10, fontFamily: C.body, fontSize: 14 }}
              >
                ← Back
              </button>
              <button
                onClick={launchCampaign}
                disabled={launching}
                style={{
                  background: C.accent, color: "#fff", border: "none",
                  cursor: launching ? "not-allowed" : "pointer",
                  padding: "0.85rem 2.5rem", borderRadius: 10,
                  fontFamily: C.body, fontSize: 15, fontWeight: 500,
                  opacity: launching ? 0.7 : 1,
                  boxShadow: "0 0 30px rgba(123,110,246,0.35)",
                }}
              >
                {launching ? "Launching..." : `🚀 Launch ${selectedPosts.length} Reels`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}