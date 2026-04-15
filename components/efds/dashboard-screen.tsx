"use client"

import { Battery, CheckCircle2, Wifi } from "lucide-react"

interface DashboardScreenProps {
  users: readonly {
    id: string
    name: string
    fullName: string
    status: string
    battery: number
    connection: string
  }[]
  selectedUser: {
    name: string
    status: string
    battery: number
    connection: string
  }
  onSelectUser: (userId: string) => void
  fontSizeStyle: string
}

export function DashboardScreen({ users, selectedUser, onSelectUser, fontSizeStyle }: DashboardScreenProps) {
  return (
    <div className="h-full overflow-auto bg-[#f4f7fb] p-4">
      <div className="mb-4 rounded-3xl border border-[#d9d9d9] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-200 bg-green-50">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <div className="min-w-0">
            <h1 style={{ fontSize: `calc(${fontSizeStyle} + 5px)` }} className="font-bold text-[#003366]">
              {selectedUser.name}
            </h1>
            <p style={{ fontSize: fontSizeStyle }} className="font-semibold text-green-700">
              Safe
            </p>
            <p style={{ fontSize: fontSizeStyle }} className="text-muted-foreground">
              No fall detected within 24 hours
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-[#f8fafc] p-3 text-center">
            <p style={{ fontSize: "11px" }} className="text-muted-foreground">
              Battery
            </p>
            <p style={{ fontSize: fontSizeStyle }} className="font-semibold">
              {selectedUser.battery}%
            </p>
          </div>
          <div className="rounded-2xl bg-[#f8fafc] p-3 text-center">
            <p style={{ fontSize: "11px" }} className="text-muted-foreground">
              Device
            </p>
            <p style={{ fontSize: fontSizeStyle }} className="font-semibold text-green-700">
              {selectedUser.connection}
            </p>
          </div>
          <div className="rounded-2xl bg-[#f8fafc] p-3 text-center">
            <p style={{ fontSize: "11px" }} className="text-muted-foreground">
              Activity
            </p>
            <p style={{ fontSize: fontSizeStyle }} className="font-semibold">
              {selectedUser.status}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: fontSizeStyle }} className="mb-3 px-1 font-semibold text-[#003366]">
          Care Recipients
        </h2>
        <div className="space-y-3">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => onSelectUser(user.id)}
              className="w-full rounded-3xl border border-[#d9d9d9] bg-white p-4 text-left shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <div className="mb-2 flex items-center justify-between">
                <span style={{ fontSize: `calc(${fontSizeStyle} + 1px)` }} className="font-semibold">
                  {user.name}
                </span>
                <span
                  style={{ fontSize: "11px" }}
                  className="rounded-full bg-green-50 px-2 py-1 font-medium text-green-700"
                >
                  {user.status}
                </span>
              </div>
              <div style={{ fontSize: fontSizeStyle }} className="flex items-center justify-between text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Battery className="h-3.5 w-3.5" />
                  {user.battery}%
                </span>
                <span className="flex items-center gap-1.5 text-green-700">
                  <Wifi className="h-3.5 w-3.5" />
                  {user.connection}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
