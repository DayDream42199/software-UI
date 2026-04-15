"use client"

import { Battery, Wifi, MapPin, Hand, Activity, Heart, Thermometer, Phone, History, ArrowLeft, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PersonDetailScreenProps {
  user: {
    name: string
    fullName: string
    status: string
    battery: number
    connection: string
    location: string
    gesture: string
    heartRate: string
    temperature: string
  }
  onBack: () => void
  onEditName: () => void
  onViewHistory: () => void
  onCallWearer: () => void
  fontSizeStyle: string
}

export function PersonDetailScreen({
  user,
  onBack,
  onEditName,
  onViewHistory,
  onCallWearer,
  fontSizeStyle,
}: PersonDetailScreenProps) {
  const telemetry = [
    { icon: MapPin, label: "Location", value: user.location },
    { icon: Hand, label: "Gesture", value: user.gesture },
    { icon: Activity, label: "Status", value: user.status },
    { icon: Heart, label: "Heart beat", value: user.heartRate },
    { icon: Thermometer, label: "Temperature", value: user.temperature },
  ]

  return (
    <div className="flex h-full flex-col overflow-auto bg-[#f4f7fb]">
      <div className="flex items-center justify-between bg-white px-4 py-3">
        <button 
          onClick={onBack}
          style={{ fontSize: fontSizeStyle }}
          className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div style={{ fontSize: fontSizeStyle }} className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Battery className="h-4 w-4 text-green-500" />
            <span>{user.battery}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="h-4 w-4 text-green-500" />
            <span>{user.connection}</span>
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-white px-4 py-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-lg font-bold text-secondary-foreground">
            {user.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 style={{ fontSize: `calc(${fontSizeStyle} + 4px)` }} className="font-bold text-[#003366]">
                {user.fullName}
              </h1>
              <button
                onClick={onEditName}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eef4fb] text-[#003366] transition-colors hover:bg-[#dce9f8]"
                aria-label="Edit user name"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
            <p style={{ fontSize: fontSizeStyle }} className="text-green-700">
              Falls within safe range
            </p>
            <p style={{ fontSize: fontSizeStyle }} className="text-muted-foreground">
              Connection good
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="mb-4 rounded-3xl border border-[#d9d9d9] bg-white p-4 shadow-sm">
          <h2 style={{ fontSize: fontSizeStyle }} className="mb-3 font-semibold text-[#003366]">
            Current Status
          </h2>
          {telemetry.map((item) => (
            <div key={item.label} className="flex items-center justify-between py-3 not-last:border-b not-last:border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary/50">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <span style={{ fontSize: fontSizeStyle }} className="font-medium">{item.label}</span>
              </div>
              <span style={{ fontSize: fontSizeStyle }} className="text-muted-foreground">{item.value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onViewHistory}
          style={{ fontSize: fontSizeStyle }}
          className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-primary shadow-sm hover:underline"
        >
          <History className="h-4 w-4" />
          View History
        </button>
      </div>

      <div className="p-4 pb-6">
        <Button 
          onClick={onCallWearer}
          style={{ fontSize: fontSizeStyle }}
          className="h-12 w-full rounded-2xl bg-[#003366] font-semibold text-white hover:bg-[#003366]/90"
        >
          <Phone className="h-5 w-5 mr-2" />
          Call the wearer phone
        </Button>
      </div>
    </div>
  )
}
