"use client"

import { User, Plus, LogOut } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface SettingsScreenProps {
  activeMode: boolean
  onActiveModeChange: (value: boolean) => void
  fontSize: number
  onFontSizeChange: (value: number) => void
  onAddDevice: () => void
  onLogout: () => void
  fontSizeStyle: string
}

export function SettingsScreen({ 
  activeMode, 
  onActiveModeChange, 
  fontSize, 
  onFontSizeChange,
  onAddDevice,
  onLogout,
  fontSizeStyle
}: SettingsScreenProps) {
  // Calculate dynamic font size for settings preview (13px to 15px based on slider)
  const dynamicFontSize = `${13 + (fontSize / 100) * 2}px`

  return (
    <div className="flex h-full flex-col overflow-auto bg-[#f4f7fb] p-4">
      <div className="mb-4 flex h-20 items-center gap-4 rounded-3xl border border-[#d9d9d9] bg-white px-4 shadow-sm">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
          <User className="h-7 w-7 text-secondary-foreground" />
        </div>
        <h1 style={{ fontSize: dynamicFontSize }} className="font-bold text-[#003366]">Caregiver Account</h1>
      </div>

      <div className="rounded-3xl border border-[#d9d9d9] bg-white shadow-sm divide-y divide-border">
        <div className="flex items-center justify-between px-4 h-14">
          <span style={{ fontSize: dynamicFontSize }} className="font-medium">Active mode</span>
          <Switch
            checked={activeMode}
            onCheckedChange={onActiveModeChange}
            aria-label="Toggle active mode"
          />
        </div>

        <div className="px-4 py-3">
          <div className="flex items-center justify-between h-8">
            <span style={{ fontSize: dynamicFontSize }} className="font-medium">Font Size</span>
          </div>
          <div className="flex items-center gap-4 h-10">
            <span className="text-xs text-muted-foreground">a</span>
            <Slider
              value={[fontSize]}
              onValueChange={(val) => onFontSizeChange(val[0])}
              max={100}
              step={1}
              className="flex-1"
              aria-label="Adjust font size"
            />
            <span className="text-lg font-bold text-muted-foreground">A</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 h-14">
          <span style={{ fontSize: dynamicFontSize }} className="font-medium">Add New Device</span>
          <Button
            onClick={onAddDevice}
            variant="outline"
            size="sm"
            className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
          >
            <Plus className="h-4 w-4 mr-1" />
            Go
          </Button>
        </div>
      </div>

      <div className="flex-1" />

      <button 
        onClick={onLogout}
        style={{ fontSize: dynamicFontSize }} 
        className="mt-6 flex items-center justify-center gap-2 py-4 text-destructive hover:underline"
      >
        <LogOut className="h-4 w-4" />
        <span className="font-medium">Log out</span>
      </button>
    </div>
  )
}
