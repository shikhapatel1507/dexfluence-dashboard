"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem
} from "@/components/ui/command"

export default function CommandPalette() {

  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {

    const down = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)

  }, [])

  return (

    <CommandDialog open={open} onOpenChange={setOpen}>

      <CommandInput placeholder="Search Dexfluence..." />

      <CommandList>

        <CommandItem onSelect={() => router.push("/dashboard")}>
          Dashboard
        </CommandItem>

        <CommandItem onSelect={() => router.push("/campaigns")}>
          Create Campaign
        </CommandItem>

        <CommandItem onSelect={() => router.push("/studio")}>
          Content Studio
        </CommandItem>

        <CommandItem onSelect={() => router.push("/agents")}>
          Creator Agents
        </CommandItem>

        <CommandItem onSelect={() => router.push("/analytics")}>
          Analytics
        </CommandItem>

        <CommandItem onSelect={() => router.push("/settings")}>
          Settings
        </CommandItem>

      </CommandList>

    </CommandDialog>

  )
}