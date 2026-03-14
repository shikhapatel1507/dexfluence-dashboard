"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  Rocket,
  Command,
  Library,
  Bot,
  Instagram,
  BarChart3,
  DollarSign,
  Settings
} from "lucide-react"

export default function Sidebar() {
  const links = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Rocket, label: "Campaign Builder", href: "/campaigns" },
    { icon: Command, label: "Command Center", href: "/command" },
    { icon: Library, label: "Content Studio", href: "/studio" },
    { icon: Bot, label: "Creator Agents", href: "/agents" },
    { icon: Instagram, label: "Posts", href: "/posts" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: DollarSign, label: "Revenue", href: "/revenue" },
    { icon: Settings, label: "Settings", href: "/settings" }
  ]

  return (
    <div className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col">

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">
          Dexfluence
        </h1>
        <p className="text-xs text-zinc-400">
          AI Content Factory
        </p>
      </div>

      <nav className="flex flex-col gap-4 text-zinc-400">

        {links.map((link, i) => {
          const Icon = link.icon
          return (
            <Link
              key={i}
              href={link.href}
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Icon size={18} />
              {link.label}
            </Link>
          )
        })}

      </nav>

    </div>
  )
}