"use client"

import { useState } from "react"
import { Bell, Search, User, Menu, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function AdminHeader({
  onMenuClick,
  sidebarOpen = true,
}: {
  onMenuClick?: () => void
  sidebarOpen?: boolean
}) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    if (showProfile) setShowProfile(false)
    if (showSearch) setShowSearch(false)
  }

  const toggleProfile = () => {
    setShowProfile(!showProfile)
    if (showNotifications) setShowNotifications(false)
    if (showSearch) setShowSearch(false)
  }

  const toggleSearch = () => {
    setShowSearch(!showSearch)
    if (showNotifications) setShowNotifications(false)
    if (showProfile) setShowProfile(false)
  }

  return (
    <header
      className={`sticky top-0 z-10 bg-white border-b border-gray-200 transition-all duration-300 ${sidebarOpen ? "" : "sm:ml-0"}`}
    >
      <div className="h-12 px-4 flex items-center justify-between lg:px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            {showSearch && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 z-50">
                <div className="p-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                    <p className="text-sm font-medium">New employer registration</p>
                    <p className="text-xs text-gray-500 mt-1">Tech Solutions Inc. just registered</p>
                    <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                    <p className="text-sm font-medium">Payment received</p>
                    <p className="text-xs text-gray-500 mt-1">$299 received for premium package</p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm font-medium">Support ticket opened</p>
                    <p className="text-xs text-gray-500 mt-1">Ticket #4582 requires attention</p>
                    <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <a href="#" className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 rounded-full focus:outline-none"
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <User className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden lg:block">Admin</span>
              <ChevronDown className="h-4 w-4 text-gray-500 hidden lg:block" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                <Link
                  href="/admin/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfile(false)}
                >
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  Your Profile
                </Link>
                <Link
                  href="/admin/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfile(false)}
                >
                  Settings
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <Link
                  href="/logout"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => setShowProfile(false)}
                >
                  Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
