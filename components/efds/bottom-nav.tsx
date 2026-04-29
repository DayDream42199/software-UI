"use client"

import { Menu, Settings, UserRound } from "lucide-react"

interface BottomNavProps {
  onNavigate: (screen: "dashboard" | "person" | "settings") => void
  currentScreen: string
}

export function BottomNav({ onNavigate, currentScreen }: BottomNavProps) {
  return (
    <nav className="grid h-[78px] grid-cols-3 items-center bg-primary px-6 text-primary-foreground">
      <button
        type="button"
        onClick={() => onNavigate("dashboard")}
        className="group flex h-full w-full items-center justify-center outline-none"
        aria-label="Dashboard"
      >
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
            currentScreen === "dashboard"
              ? "bg-white/16"
              : "hover:bg-white/16 group-focus-visible:bg-white/16 group-focus-visible:ring-1 group-focus-visible:ring-white/60"
          }`}
        >
          <Menu className="w-6 h-6" />
        </span>
      </button>
      
      <button
        type="button"
        onClick={() => onNavigate("person")}
        className="group flex h-full w-full items-center justify-center outline-none"
        aria-label="Person details"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-sm">
          <UserRound className="w-6 h-6" />
        </span>
      </button>
      
      <button
        type="button"
        onClick={() => onNavigate("settings")}
        className="group flex h-full w-full items-center justify-center outline-none"
        aria-label="Settings"
      >
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
            currentScreen === "settings"
              ? "bg-white/16"
              : "hover:bg-white/16 group-focus-visible:bg-white/16 group-focus-visible:ring-1 group-focus-visible:ring-white/60"
          }`}
        >
          <Settings className="w-6 h-6" />
        </span>
      </button>
    </nav>
  )
}
