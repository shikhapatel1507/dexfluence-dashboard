"use client"

import Link from "next/link"

const NAV_ITEMS = [
  { label: "Dashboard",  href: "/dashboard",  icon: "⚡" },
  { label: "Campaigns",  href: "/campaigns",  icon: "🚀" },
  { label: "Studio",     href: "/studio",     icon: "🎬" },
  { label: "Agents",     href: "/agents",     icon: "🤖" },
  { label: "Analytics",  href: "/analytics",  icon: "📊" },
]

export default function Sidebar() {
  return (
    <aside style={{
      width: 220,
      minHeight: "100vh",
      background: "#0d0d12",
      borderRight: "0.5px solid rgba(255,255,255,0.07)",
      display: "flex",
      flexDirection: "column",
      padding: "2rem 1rem",
      position: "fixed",
      top: 0,
      left: 0,
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: 18,
        color: "#f0f0f8",
        marginBottom: "2.5rem",
        paddingLeft: "0.5rem",
        letterSpacing: "-0.02em",
      }}>
        DEXFLUENCE
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {NAV_ITEMS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0.6rem 0.75rem",
              borderRadius: 8,
              color: "#7a7a96",
              textDecoration: "none",
              fontSize: 14,
              fontFamily: "'Instrument Sans', sans-serif",
              transition: "background .15s, color .15s",
            }}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ marginTop: "auto" }}>
        <Link
          href="/login"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0.6rem 0.75rem",
            borderRadius: 8,
            color: "#7a7a96",
            textDecoration: "none",
            fontSize: 14,
            fontFamily: "'Instrument Sans', sans-serif",
          }}
        >
          <span style={{ fontSize: 16 }}>🚪</span>
          Sign out
        </Link>
      </div>
    </aside>
  )
}