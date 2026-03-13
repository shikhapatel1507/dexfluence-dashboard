"use client"

import Link from "next/link"
import {
LayoutDashboard,
Rocket,
Command,
Video,
Library,
Users,
Instagram,
BarChart3,
DollarSign,
Settings
} from "lucide-react"

export default function Sidebar(){

  const navItems=[

    {
      name:"Overview",
      href:"/dashboard",
      icon:LayoutDashboard
    },

    {
      name:"Campaign Builder",
      href:"/campaigns",
      icon:Rocket
    },

    {
      name:"Command Center",
      href:"/campaigns/command",
      icon:Command
    },

    {
      name:"Content Studio",
      href:"/studio",
      icon:Video
    },

    {
      name:"Content Library",
      href:"/content",
      icon:Library
    },

    {
      name:"Creator Agents",
      href:"/agents",
      icon:Users
    },

    {
      name:"Posts",
      href:"/posts",
      icon:Instagram
    },

    {
      name:"Analytics",
      href:"/analytics",
      icon:BarChart3
    },

    {
      name:"Revenue",
      href:"/revenue",
      icon:DollarSign
    },

    {
      name:"Settings",
      href:"/settings",
      icon:Settings
    }

  ]

  return(

    <div className="w-64 min-h-screen bg-black/40 backdrop-blur-md border-r border-white/10 flex flex-col p-6 text-white">

      <div className="mb-10">

        <h1 className="text-2xl font-bold">
          Dexfluence
        </h1>

        <p className="text-xs text-gray-400">
          AI Content Factory
        </p>

      </div>

      <nav className="flex flex-col space-y-2">

        {navItems.map((item,i)=>{

          const Icon=item.icon

          return(

            <Link
            key={i}
            href={item.href}
            className="flex items-center gap-3 p-2 rounded hover:bg-white/10 text-sm"
            >

              <Icon size={18}/>

              {item.name}

            </Link>

          )

        })}

      </nav>

      <div className="mt-auto pt-10 text-xs text-gray-400">

        Dexfluence v1.0

      </div>

    </div>

  )

}