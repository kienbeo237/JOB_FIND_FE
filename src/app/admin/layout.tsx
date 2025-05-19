"use client"

import type { ReactNode } from "react"
import AdminSidebar from "../../components/admin/sidebar"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import AdminHeader from "../../components/admin/header"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      // Auto-close sidebar on mobile
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    // Check on mount
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [pathname, isMobile])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar Backdrop */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 transform lg:relative lg:transform-none transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:w-16"
          }`}
        >
          <AdminSidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col w-full transition-all duration-300">
          <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
          <main className="flex-1 p-4 pb-24 lg:p-6 w-full overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}
