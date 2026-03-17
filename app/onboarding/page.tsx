"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"

const C = {
  accent:  "#7B6EF6",
  accent2: "#3ecfcf",
  muted:   "#7a7a96",
  text:    "#f0f0f8",
  bg:      "#060608",
  bg2:     "#0d0d12",
  surface: "#1a1a26",
  border:  "rgba(255,255,255,0.07)",
  borderHi:"rgba(255,255,255,0.14)",
  head:    "'Space Grotesk', sans-serif",
  body:    "'Instrument Sans', sans-serif",
  error:   "#f06292",
  success: "#3ecfcf",
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
  boxSizing: "border-box" as const,
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

function OnboardingContent() {
  const searchParams = useSearchParams()
  const router       = useRouter()

  const step      = searchParams.get("step") || "connect"
  const brandId   = searchParams.get("brandId")
  const igHandle  = searchParams.get("ig")
  const error     = searchParams.get("error")

  const [brand, setBrand] = useState({
    name:        "",
    description: "",
    website:     "",
    tone:        "empowering, modern, authentic",
    audience:    "women aged 18-45 in India",
    postsPerDay: "2",
    niche:       "",
  })
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)

  // prefill name from IG handle
  useEffect(() => {
    if (igHandle) {
      setBrand(b => ({ ...b, name: igHandle }))
    }
  }, [igHandle])

  async function saveBrand() {
    if (!brandId) return
    setSaving(true)
    try {
      await fetch("/api/brands/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandId, ...brand }),
      })
      setSaved(true)
      setTimeout(() => router.push("/dashboard"), 1500)
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  /* ── STEP: CONNECT ── */
  if (step === "connect") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: C.body, padding: "2rem" }}>
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>

          {/* logo */}
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, fontWeight: 600, marginBottom: "1rem" }}>
            Dexfluence
          </div>

          <h1 style={{ fontFamily: C.head, fontSize: "2rem", fontWeight: 700, color: C.text, marginBottom: "0.75rem" }}>
            Connect Your Instagram
          </h1>
          <p style={{ color: C.muted, fontSize: 15, marginBottom: "2.5rem", lineHeight: 1.6 }}>
            Connect your Instagram Business account and Dexfluence will start generating and publishing AI Reels automatically.
          </p>

          {/* error */}
          {error && (
            <div style={{ background: "rgba(240,98,146,0.1)", border: `0.5px solid ${C.error}`, borderRadius: 10, padding: "1rem", marginBottom: "1.5rem", color: C.error, fontSize: 13 }}>
              {error === "instagram_denied" ? "Instagram access was denied. Please try again." :
               error === "no_ig_business"   ? "No Instagram Business account found. Make sure your Instagram is set to Business/Creator and linked to a Facebook Page." :
               `Error: ${decodeURIComponent(error)}`}
            </div>
          )}

          {/* requirements */}
          <div style={{ background: C.surface, border: `0.5px solid ${C.borderHi}`, borderRadius: 12, padding: "1.25rem", marginBottom: "2rem", textAlign: "left" }}>
            <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Requirements</div>
            {[
              "Instagram Business or Creator account",
              "Facebook Page linked to your Instagram",
              "Admin access to both accounts",
            ].map((req, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ color: C.accent2, fontSize: 14 }}>✓</span>
                <span style={{ fontSize: 13, color: C.muted }}>{req}</span>
              </div>
            ))}
          </div>

          {/* connect button */}
          <a
            href="/api/auth/instagram"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              background: "linear-gradient(135deg, #E1306C, #833AB4, #405DE6)",
              color: "#fff", padding: "1rem 2rem", borderRadius: 12,
              fontFamily: C.body, fontSize: 15, fontWeight: 600,
              textDecoration: "none", marginBottom: "1rem",
              boxShadow: "0 4px 24px rgba(225,48,108,0.3)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Connect Instagram
          </a>

          <p style={{ fontSize: 12, color: C.muted }}>
            You'll be redirected to Meta to grant permissions. We never post without your approval.
          </p>
        </div>
      </div>
    )
  }

  /* ── STEP: BRAND SETUP ── */
  if (step === "brand") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: C.body, padding: "2rem" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>

          {/* success banner */}
          <div style={{ background: "rgba(62,207,207,0.1)", border: `0.5px solid ${C.accent2}`, borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>✓</span>
            <div>
              <div style={{ color: C.accent2, fontWeight: 600, fontSize: 14 }}>Instagram Connected!</div>
              <div style={{ color: C.muted, fontSize: 13 }}>@{igHandle} is now connected to Dexfluence</div>
            </div>
          </div>

          <h1 style={{ fontFamily: C.head, fontSize: "1.75rem", fontWeight: 700, color: C.text, marginBottom: "0.5rem" }}>
            Set Up Your Brand
          </h1>
          <p style={{ color: C.muted, fontSize: 14, marginBottom: "2rem" }}>
            Tell us about your brand so our AI can create perfectly targeted content.
          </p>

          <div style={{ background: C.bg2, border: `0.5px solid ${C.borderHi}`, borderRadius: 16, padding: "2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Brand Name *</label>
                <input style={inputStyle} placeholder="e.g. Danyah Banaras" value={brand.name} onChange={e => setBrand({ ...brand, name: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Website</label>
                <input style={inputStyle} placeholder="https://yourbrand.com" value={brand.website} onChange={e => setBrand({ ...brand, website: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Niche / Category</label>
                <input style={inputStyle} placeholder="e.g. Banarasi sarees" value={brand.niche} onChange={e => setBrand({ ...brand, niche: e.target.value })} />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Brand Description</label>
                <textarea style={{ ...inputStyle, height: 80, resize: "none" }} placeholder="What do you sell? What makes you unique?" value={brand.description} onChange={e => setBrand({ ...brand, description: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Brand Voice</label>
                <input style={inputStyle} placeholder="empowering, modern, authentic" value={brand.tone} onChange={e => setBrand({ ...brand, tone: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Target Audience</label>
                <input style={inputStyle} placeholder="women aged 18-45 in India" value={brand.audience} onChange={e => setBrand({ ...brand, audience: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Reels Per Day</label>
                <select
                  style={{ ...inputStyle }}
                  value={brand.postsPerDay}
                  onChange={e => setBrand({ ...brand, postsPerDay: e.target.value })}
                >
                  {["1","2","3","5","7","10"].map(n => (
                    <option key={n} value={n} style={{ background: C.surface }}>{n} Reel{+n > 1 ? "s" : ""}/day</option>
                  ))}
                </select>
              </div>

            </div>

            {saved ? (
              <div style={{ marginTop: "2rem", textAlign: "center", color: C.accent2, fontWeight: 600 }}>
                ✓ Brand saved! Redirecting to dashboard...
              </div>
            ) : (
              <button
                onClick={saveBrand}
                disabled={!brand.name || saving}
                style={{
                  marginTop: "2rem", width: "100%",
                  background: brand.name ? C.accent : C.surface,
                  color: "#fff", border: "none",
                  cursor: brand.name ? "pointer" : "not-allowed",
                  padding: "0.9rem", borderRadius: 10,
                  fontFamily: C.body, fontSize: 15, fontWeight: 600,
                  opacity: brand.name ? 1 : 0.5,
                  boxShadow: brand.name ? "0 0 30px rgba(123,110,246,0.3)" : "none",
                }}
              >
                {saving ? "Saving..." : "Launch My AI Agent 🚀"}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div style={{ background: "#060608", minHeight: "100vh" }} />}>
      <OnboardingContent />
    </Suspense>
  )
}