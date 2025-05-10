"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type ActiveTab =
  | "dashboard"
  | "settings"
  | "packages"
  | "cart"
  | "orders"
  | "services"
  | "jobs"
  | "candidates"
  | "cv-labels"
  | "messages"
  | "activity"
  | "support"
  | "post-job"
  | "cv-filter"

interface DashboardContextType {
  activeTab: ActiveTab
  setActiveTab: (tab: ActiveTab) => void
  activeSettingsTab: string
  setActiveSettingsTab: (tab: string) => void
}

const DashboardContext = createContext<DashboardContextType>({
  activeTab: "dashboard",
  setActiveTab: () => {},
  activeSettingsTab: "",
  setActiveSettingsTab: () => {},
})

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard")
  const [activeSettingsTab, setActiveSettingsTab] = useState("")

  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeSettingsTab,
        setActiveSettingsTab,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = () => useContext(DashboardContext)
