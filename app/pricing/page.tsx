"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

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

const PLANS = [
  {
    id:       "starter",
    name:     "Starter",
    price:    29,
    color:    "#3ecfcf",
    popular:  false,
    features: [
      "1 Instagram account",
      "30 AI Reels per month",
      "1 Reel per day",
      "Photorealistic image generation",
      "Auto-publish to Instagram",
      "Basic analytics",
    ],
  },
  {
    id:       "pro",
    name:     "Pro",
    price:    99,
    color:    "#7B6EF6",
    popular:  true,
    features: [
      "3 Instagram accounts",
      "150 AI Reels per month",
      "5 Reels per day",
      "Elite photorealistic generation",
      "Auto-publish to Instagram",
      "Brand voice customization",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    id:       "agency",
    name:     "Agency",
    price:    299,
    color:    "#E1306C",
    popular:  false,
    features: [
      "10 Instagram accounts",
      "600 AI Reels per month",
      "20 Reels per day",
      "All Pro features",
      "Multi-brand dashboard",
      "White-label reports",
      "API access",
      "Dedicated support",
    ],
  },
]

export default function PricingPage() {
  const router  = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [error,   setError]   = useState("")

  async function handleCheckout(planId: string) {
    setLoading(planId)
    setError("")
    try {
      const res = await fetch("/api/checkout", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ plan: planId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || "Checkout failed")
      }
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: C.body, padding: "4rem 2rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontSize: 11, color: C.accent, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Pricing
          </div>
          <h1 style={{ fontFamily: C.head, fontSize: "2.5rem", fontWeight: 700, color: C.text, marginBottom: "1rem" }}>
            Your AI Content Team.<br />Starting at $29/month.
          </h1>
          <p style={{ color: C.muted, fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
            One platform. Every brand. Unlimited Reels. Cancel anytime.
          </p>
        </div>

        {error && (
          <div style={{ background: "rgba(240,98,146,0.1)", border: "0.5px solid #f06292", borderRadius: 10, padding: "1rem", marginBottom: "2rem", color: "#f06292", textAlign: "center", fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* Plan cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "4rem" }}>
          {PLANS.map(plan => (
            <div
              key={plan.id}
              style={{
                background:  plan.popular ? `linear-gradient(160deg, ${C.surface}, #1a1a35)` : C.bg2,
                border:      `0.5px solid ${plan.popular ? plan.color : C.borderHi}`,
                borderRadius: 20,
                padding:     "2rem",
                position:    "relative",
                boxShadow:   plan.popular ? `0 0 40px rgba(123,110,246,0.2)` : "none",
              }}
            >
              {plan.popular && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: plan.color, borderRadius: 20, padding: "0.25rem 1rem",
                  fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.08em",
                  textTransform: "uppercase", whiteSpace: "nowrap",
                }}>
                  Most Popular
                </div>
              )}

              {/* plan name */}
              <div style={{ fontSize: 13, color: plan.color, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                {plan.name}
              </div>

              {/* price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: "0.25rem" }}>
                <span style={{ fontFamily: C.head, fontSize: "3rem", fontWeight: 700, color: C.text }}>
                  ${plan.price}
                </span>
                <span style={{ color: C.muted, fontSize: 14 }}>/month</span>
              </div>

              <div style={{ fontSize: 12, color: C.muted, marginBottom: "2rem" }}>
                Billed monthly. Cancel anytime.
              </div>

              {/* features */}
              <div style={{ marginBottom: "2rem" }}>
                {plan.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: "0.6rem" }}>
                    <span style={{ color: plan.color, flexShrink: 0, fontSize: 14, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={loading === plan.id}
                style={{
                  width:        "100%",
                  background:   plan.popular ? plan.color : "transparent",
                  color:        plan.popular ? "#fff" : plan.color,
                  border:       `0.5px solid ${plan.color}`,
                  borderRadius: 10,
                  padding:      "0.85rem",
                  fontFamily:   C.body,
                  fontSize:     14,
                  fontWeight:   600,
                  cursor:       loading === plan.id ? "not-allowed" : "pointer",
                  opacity:      loading === plan.id ? 0.7 : 1,
                  transition:   "all .15s",
                }}
              >
                {loading === plan.id ? "Redirecting..." : `Get ${plan.name} →`}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ textAlign: "center" }}>
          <p style={{ color: C.muted, fontSize: 13 }}>
            Questions? Email us at{" "}
            <a href="mailto:hello@dexfluence.com" style={{ color: C.accent }}>hello@dexfluence.com</a>
          </p>
        </div>

      </div>
    </div>
  )
}