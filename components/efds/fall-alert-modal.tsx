"use client"

import { AlertTriangle, MapPin, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FallAlertModalProps {
  isOpen: boolean
  onDismiss: () => void
  onCallEmergency: () => void
  onOpenMap: () => void
  user: {
    fullName: string
    location: string
  }
}

export function FallAlertModal({ isOpen, onDismiss, onCallEmergency, onOpenMap, user }: FallAlertModalProps) {
  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="animate-in zoom-in-95 duration-200 w-full max-w-sm overflow-hidden rounded-[28px] border-4 border-destructive bg-white shadow-2xl">
        <div className="flex items-center gap-3 bg-destructive p-4">
          <AlertTriangle style={{ width: "2em", height: "2em" }} className="animate-pulse text-destructive-foreground" />
          <span style={{ fontSize: "1.25em" }} className="font-bold text-destructive-foreground">FALL ALERT</span>
        </div>

        <div className="p-6 text-center">
          <h2 style={{ fontSize: "1.5em" }} className="mb-2 font-bold text-foreground">
            {user.fullName} has fallen
          </h2>
          <p style={{ fontSize: "1.125em" }} className="mb-1 text-muted-foreground">
            Please respond immediately
          </p>
          <p style={{ fontSize: "1em" }} className="mb-6 flex items-center justify-center gap-1 text-[#003366]">
            <MapPin className="h-4 w-4" />
            Location: {user.location}
          </p>

          <Button 
            onClick={onCallEmergency}
            style={{ fontSize: "1.25em" }}
            className="mb-3 h-16 w-full rounded-2xl bg-destructive font-bold text-destructive-foreground hover:bg-destructive/90"
            size="lg"
          >
            <Phone style={{ width: "1.5em", height: "1.5em" }} className="mr-3" />
            Call 1669
          </Button>

          <Button
            onClick={onOpenMap}
            variant="outline"
            style={{ fontSize: "1em" }}
            className="mb-3 h-12 w-full rounded-2xl border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
          >
            <MapPin style={{ width: "1em", height: "1em" }} className="mr-2" />
            Open Map
          </Button>

          <Button
            variant="outline"
            style={{ fontSize: "1em" }}
            className="h-12 w-full rounded-2xl"
            onClick={onDismiss}
          >
            <X style={{ width: "1em", height: "1em" }} className="mr-2" />
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  )
}
