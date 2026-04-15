"use client"

import { Menu, Settings, UserRound } from "lucide-react"

interface BottomNavProps {
  onNavigate: (screen: "dashboard" | "person" | "settings") => void
  currentScreen: string
}

export function BottomNav({ onNavigate, currentScreen }: BottomNavProps) {
  return (
    <div className="flex items-center justify-between rounded-b-[26px] border-t border-white/20 bg-primary px-8 py-4 text-primary-foreground">
      <button
        onClick={() => onNavigate("dashboard")}
        className={`p-2 rounded-lg transition-colors ${
          currentScreen === "dashboard" ? "bg-white/20" : "hover:bg-white/10"
        }`}
        aria-label="Dashboard"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <button
        onClick={() => onNavigate("person")}
        className="flex items-center justify-center rounded-full bg-secondary p-3 text-secondary-foreground shadow-sm"
        aria-label="Person details"
      >
        <UserRound className="w-6 h-6" />
      </button>
      
      <button
        onClick={() => onNavigate("settings")}
        className={`p-2 rounded-lg transition-colors ${
          currentScreen === "settings" ? "bg-white/20" : "hover:bg-white/10"
        }`}
        aria-label="Settings"
      >
        <Settings className="w-6 h-6" />
      </button>
    </div>
  )
}
