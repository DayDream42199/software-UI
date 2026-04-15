"use client"

import { Signal, Wifi, Battery } from "lucide-react"

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-card text-foreground text-sm">
      <span className="font-medium">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <Battery className="w-4 h-4" />
      </div>
    </div>
  )
}
