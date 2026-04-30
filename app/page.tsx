"use client"

import { useState } from "react"
import { AlertTriangle, Battery, Bell, ChevronUp, Signal, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBar } from "@/components/efds/status-bar"
import { BottomNav } from "@/components/efds/bottom-nav"
import { DashboardScreen } from "@/components/efds/dashboard-screen"
import { PersonDetailScreen } from "@/components/efds/person-detail-screen"
import { SettingsScreen } from "@/components/efds/settings-screen"
import { FallAlertModal } from "@/components/efds/fall-alert-modal"

type Screen = "dashboard" | "person" | "settings"

const users = [
  {
    id: "john",
    name: "John D.",
    fullName: "John Doe",
    status: "Sleeping",
    battery: 67,
    connection: "Connected",
    location: "siit bangkadi",
    gesture: "Lying down",
    heartRate: "70 BPM",
    temperature: "36.5 C",
  },
  {
    id: "jane",
    name: "Jane D.",
    fullName: "Jane Doe",
    status: "Sitting",
    battery: 41,
    connection: "Connected",
    location: "Living room",
    gesture: "Sitting",
    heartRate: "74 BPM",
    temperature: "36.7 C",
  },
  {
    id: "alice",
    name: "Alice B.",
    fullName: "Alice Brown",
    status: "Walking",
    battery: 85,
    connection: "Connected",
    location: "Garden",
    gesture: "Walking",
    heartRate: "82 BPM",
    temperature: "36.6 C",
  },
]

export default function Home() {
  const phoneScreenRadius = "24px 24px 34px 34px"
  const phoneScreenClip = `inset(0 round ${phoneScreenRadius})`
  const [userList, setUserList] = useState(users)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard")
  const [showFallAlert, setShowFallAlert] = useState(false)
  const [showFallNotificationScreen, setShowFallNotificationScreen] = useState(false)
  const [activeMode, setActiveMode] = useState(true)
  const [fontSize, setFontSize] = useState(50)
  const [selectedUserId, setSelectedUserId] = useState<(typeof users)[number]["id"]>("john")
  const [showHistory, setShowHistory] = useState(false)
  const [showPairing, setShowPairing] = useState(false)
  const [showDeviceSetup, setShowDeviceSetup] = useState(false)
  const [showEditName, setShowEditName] = useState(false)
  const [deviceName, setDeviceName] = useState("HomeSafe Band")
  const [deviceCode, setDeviceCode] = useState("")
  const [wifiSsid, setWifiSsid] = useState("HomeSafe_WiFi")
  const [wifiPassword, setWifiPassword] = useState("")
  const [editedFullName, setEditedFullName] = useState("")

  // Map slider value to font size: 0-50 = small (13px), 51-100 = large (15px)
  const fontSizeStyle = fontSize <= 50 ? "13px" : "15px"
  const selectedUser = userList.find((user) => user.id === selectedUserId) ?? userList[0]

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  const handleSelectUser = (userId: string) => {
    if (userList.some((user) => user.id === userId)) {
      setSelectedUserId(userId as (typeof users)[number]["id"])
    }
    setCurrentScreen("person")
  }

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard")
  }

  const openPhoneLink = (number: string) => {
    window.location.href = `tel:${number}`
  }

  const openMapForUser = () => {
    const query = encodeURIComponent(`${selectedUser.location}, Thailand`)
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank", "noopener,noreferrer")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentScreen("dashboard")
    setShowFallNotificationScreen(false)
    setShowFallAlert(false)
    setShowHistory(false)
    setShowPairing(false)
    setShowDeviceSetup(false)
    setShowEditName(false)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleCompletePairing = () => {
    setShowPairing(false)
    setDeviceCode("")
    setShowDeviceSetup(true)
  }

  const handleCompleteSetup = () => {
    setShowDeviceSetup(false)
    setWifiPassword("")
  }

  const handleSimulateFall = () => {
    setShowFallAlert(false)
    setShowFallNotificationScreen(true)
  }

  const handleOpenFallAlert = () => {
    setShowFallNotificationScreen(false)
    setShowFallAlert(true)
  }

  const handleOpenEditName = () => {
    setEditedFullName(selectedUser.fullName)
    setShowEditName(true)
  }

  const handleSaveEditedName = () => {
    const trimmed = editedFullName.trim()
    if (!trimmed) return

    setUserList((currentUsers) =>
      currentUsers.map((user) =>
        user.id === selectedUserId
          ? {
              ...user,
              fullName: trimmed,
              name: trimmed.length > 10 ? `${trimmed.split(" ")[0]} ${trimmed.split(" ").slice(1).map((part) => part[0]).join("")}.` : trimmed,
            }
          : user,
      ),
    )
    setShowEditName(false)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return (
          <DashboardScreen
            users={userList}
            selectedUser={selectedUser}
            onSelectUser={handleSelectUser}
            fontSizeStyle={fontSizeStyle}
          />
        )
      case "person":
        return (
          <PersonDetailScreen
            user={selectedUser}
            onBack={handleBackToDashboard}
            onEditName={handleOpenEditName}
            onViewHistory={() => setShowHistory(true)}
            onCallWearer={() => openPhoneLink("0812345678")}
            fontSizeStyle={fontSizeStyle}
          />
        )
      case "settings":
        return (
          <SettingsScreen 
            activeMode={activeMode}
            onActiveModeChange={setActiveMode}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            onAddDevice={() => setShowPairing(true)}
            onLogout={handleLogout}
            fontSizeStyle={fontSizeStyle}
          />
        )
      default:
        return (
          <DashboardScreen
            users={userList}
            selectedUser={selectedUser}
            onSelectUser={handleSelectUser}
            fontSizeStyle={fontSizeStyle}
          />
        )
    }
  }

  return (
    <main className="min-h-screen bg-neutral-800 flex flex-col items-center justify-center p-4">
      {/* Simulate Fall Button - Outside Mobile Frame */}
      <div className="mb-4">
        <Button 
          onClick={handleSimulateFall}
          variant="destructive"
          className="flex items-center gap-2"
        >
          <AlertTriangle className="h-4 w-4" />
          Simulate Fall Alert
        </Button>
      </div>

      {/* Mobile Phone Frame */}
      <div className="relative h-[812px] w-full max-w-[390px] overflow-hidden rounded-[44px] bg-neutral-900 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
        {/* Android Frame Details */}
        <div className="pointer-events-none absolute left-1/2 top-5 z-50 h-7 w-7 -translate-x-1/2 rounded-full bg-black shadow-[0_0_0_2px_rgba(0,0,0,0.08)]" />
        <div className="pointer-events-none absolute left-[-8px] top-28 z-20 h-14 w-[3px] rounded-r-full bg-neutral-700" />
        <div className="pointer-events-none absolute right-[-8px] top-36 z-20 h-20 w-[3px] rounded-l-full bg-neutral-700" />

        {/* App Content */}
        <div
          className="absolute overflow-hidden bg-background"
          style={{
            top: "10px",
            left: "10px",
            right: "10px",
            bottom: "22px",
            borderRadius: phoneScreenRadius,
            clipPath: phoneScreenClip,
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden bg-background"
            style={{ borderRadius: phoneScreenRadius, clipPath: phoneScreenClip }}
          >
            {/* Status Bar - Fixed size */}
            <StatusBar />

            {isLoggedIn ? (
              <>
                <div className="relative h-[calc(100%-36px)] overflow-hidden pb-[78px]">
                  {renderScreen()}
                </div>

                <div className="absolute inset-x-0 bottom-0 z-30">
                  <BottomNav onNavigate={handleNavigate} currentScreen={currentScreen} />
                </div>

                {showFallNotificationScreen && (
                  <div className="absolute inset-0 z-40 overflow-hidden bg-[radial-gradient(circle_at_top,_#d9e6ff,_#adc9f4_45%,_#7ca6d9_100%)]" style={{ borderRadius: phoneScreenRadius }}>
                    <div className="flex h-full flex-col px-4 pb-8 pt-2 text-[#0d274a]">
                      <div className="flex items-center justify-between text-sm text-[#0d274a]">
                        <span className="font-medium">9:41</span>
                        <div className="flex items-center gap-1.5">
                          <Signal className="h-4 w-4" />
                          <Wifi className="h-4 w-4" />
                          <Battery className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="mt-6 text-center">
                        <p className="text-6xl font-semibold tracking-tight">9:41</p>
                        <p className="mt-1 text-sm font-medium text-[#35577f]">Wednesday, April 15</p>
                      </div>

                      <div className="mt-8 grid grid-cols-4 gap-4 px-2 opacity-75">
                        {["Camera", "Maps", "Health", "Settings", "Mail", "Clock", "Call", "HomeSafe"].map((app) => (
                          <div key={app} className="flex flex-col items-center gap-2">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/55 shadow-sm backdrop-blur">
                              <div className="h-6 w-6 rounded-lg bg-[#003366]/20" />
                            </div>
                            <span className="text-[10px] font-medium text-white drop-shadow">{app}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={handleOpenFallAlert}
                        className="mt-8 rounded-[28px] bg-white/90 p-4 text-left shadow-xl backdrop-blur transition-transform hover:-translate-y-0.5"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#003366] text-white">
                              <Bell className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#003366]">HomeSafe Alert</p>
                              <p className="text-xs text-muted-foreground">now</p>
                            </div>
                          </div>
                          <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-semibold text-red-600">
                            Urgent
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-[#10233f]">{selectedUser.fullName} may have fallen.</p>
                        <p className="mt-1 text-sm text-muted-foreground">Tap to open emergency actions and location details.</p>
                      </button>

                      <button
                        onClick={() => setShowFallNotificationScreen(false)}
                        className="mt-auto flex items-center justify-center gap-1 text-sm font-medium text-white/90"
                      >
                        <ChevronUp className="h-4 w-4" />
                        Dismiss notification screen
                      </button>
                    </div>
                  </div>
                )}

                <FallAlertModal 
                  isOpen={showFallAlert} 
                  onDismiss={() => setShowFallAlert(false)}
                  onCallEmergency={() => openPhoneLink("1669")}
                  onOpenMap={openMapForUser}
                  user={selectedUser}
                />

                {showHistory && (
                  <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/55 p-4">
                    <div className="w-full rounded-[28px] border border-[#d9d9d9] bg-white p-5 shadow-2xl">
                      <div className="mb-4">
                        <h2 className="text-lg font-bold text-[#003366]">Recent History</h2>
                        <p className="text-sm text-muted-foreground">Latest activity for {selectedUser.fullName}</p>
                      </div>
                      <div className="space-y-3">
                        <div className="rounded-2xl border p-3">
                          <p className="font-medium text-[#003366]">Today, 08:40</p>
                          <p className="text-sm text-muted-foreground">
                            Sleeping, connected, battery {selectedUser.battery}%
                          </p>
                        </div>
                        <div className="rounded-2xl border p-3">
                          <p className="font-medium text-[#003366]">Yesterday, 21:15</p>
                          <p className="text-sm text-muted-foreground">
                            Routine movement detected in {selectedUser.location}
                          </p>
                        </div>
                        <div className="rounded-2xl border p-3">
                          <p className="font-medium text-[#003366]">Yesterday, 09:00</p>
                          <p className="text-sm text-muted-foreground">Device synced successfully</p>
                        </div>
                      </div>
                      <Button className="mt-4 h-11 w-full bg-[#003366] hover:bg-[#003366]/90" onClick={() => setShowHistory(false)}>
                        Close
                      </Button>
                    </div>
                  </div>
                )}

                {showEditName && (
                  <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/55 p-4">
                    <div className="w-full rounded-[28px] border border-[#d9d9d9] bg-white p-5 shadow-2xl">
                      <div className="mb-4">
                        <h2 className="text-lg font-bold text-[#003366]">Edit User Name</h2>
                        <p className="text-sm text-muted-foreground">Update the displayed account name for this wearer</p>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">Full name</label>
                        <Input value={editedFullName} onChange={(e) => setEditedFullName(e.target.value)} />
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => setShowEditName(false)}>
                          Cancel
                        </Button>
                        <Button className="flex-1 bg-[#003366] hover:bg-[#003366]/90" onClick={handleSaveEditedName}>
                          Save Name
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {showPairing && (
                  <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/55 p-4">
                    <div className="w-full rounded-[28px] border border-[#d9d9d9] bg-white p-5 shadow-2xl">
                      <div className="mb-4">
                        <h2 className="text-lg font-bold text-[#003366]">Add New Device</h2>
                        <p className="text-sm text-muted-foreground">Mock pairing flow for demo purposes</p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="mb-1 block text-sm font-medium">Device name</label>
                          <Input value={deviceName} onChange={(e) => setDeviceName(e.target.value)} />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium">Pairing code</label>
                          <Input
                            value={deviceCode}
                            onChange={(e) => setDeviceCode(e.target.value)}
                            placeholder="Enter 6-digit code"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => setShowPairing(false)}>
                          Cancel
                        </Button>
                        <Button className="flex-1 bg-[#003366] hover:bg-[#003366]/90" onClick={handleCompletePairing}>
                          Pair Device
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {showDeviceSetup && (
                  <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/55 p-4">
                    <div className="w-full rounded-[28px] border border-[#d9d9d9] bg-white p-5 shadow-2xl">
                      <div className="mb-4">
                        <h2 className="text-lg font-bold text-[#003366]">Device Setup</h2>
                        <p className="text-sm text-muted-foreground">
                          Finish setting up {deviceName || "your device"} before first use
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="mb-1 block text-sm font-medium">Wi-Fi SSID</label>
                          <Input value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium">Wi-Fi Password</label>
                          <Input
                            type="password"
                            value={wifiPassword}
                            onChange={(e) => setWifiPassword(e.target.value)}
                            placeholder="Enter Wi-Fi password"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium">Installation note</label>
                          <Input defaultValue="Living room / near caregiver phone" />
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => setShowDeviceSetup(false)}>
                          Cancel
                        </Button>
                        <Button className="flex-1 bg-[#003366] hover:bg-[#003366]/90" onClick={handleCompleteSetup}>
                          Save Setup
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-full flex-col bg-[#f4f7fb] px-5 py-8">
                <div className="mt-8 text-center">
                  <h1 className="text-3xl font-bold text-[#003366]">HomeSafe</h1>
                  <p className="mt-2 text-sm text-muted-foreground">Sign in to monitor your care recipients</p>
                </div>

                <div className="mt-10 rounded-[28px] border border-[#d9d9d9] bg-white p-5 shadow-sm">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#003366]">Email</label>
                      <Input defaultValue="caregiver@homesafe.app" aria-label="Email" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#003366]">Password</label>
                      <Input type="password" defaultValue="password123" aria-label="Password" />
                    </div>
                    <Button className="mt-2 h-11 w-full bg-[#003366] hover:bg-[#003366]/90" onClick={handleLogin}>
                      Sign in
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom frame mask keeps the app content visually clipped to the device curve. */}
        <div
          className="pointer-events-none absolute bottom-[22px] left-[10px] z-40 h-[34px] w-[34px]"
          style={{
            background: "radial-gradient(circle at top right, transparent 34px, rgb(23 23 23) 34.5px)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-[22px] right-[10px] z-40 h-[34px] w-[34px]"
          style={{
            background: "radial-gradient(circle at top left, transparent 34px, rgb(23 23 23) 34.5px)",
          }}
        />

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 z-50 h-1 w-24 -translate-x-1/2 rounded-full bg-white/20" />
      </div>
    </main>
  )
}
