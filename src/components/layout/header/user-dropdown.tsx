"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { User, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

type UserType = "candidate" | "employer"

interface UserDropdownProps {
  readonly type: UserType
}

interface DropdownItem {
  label: string
  href: string
  checkbox?: boolean
}

export default function UserDropdown({ type }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const candidateItems: DropdownItem[] = [
    { label: "Đăng nhập", href: "/candidate/login" },
    { label: "Đăng ký", href: "/candidate/register" },
    { label: "Dashboard ứng viên", href: "/candidate/dashboard" },
    { label: "Đang tìm việc", href: "/candidate/jobs", checkbox: true },
    { label: "Tìm kiếm CV", href: "/candidate/cv-search", checkbox: true },
  ]

  const employerItems: DropdownItem[] = [
    { label: "Đăng nhập", href: "/employer/login" },
    { label: "Đăng ký", href: "/employer/register" },
    { label: "Dashboard nhà tuyển dụng", href: "/employer/dashboard" },
    { label: "Đăng tuyển dụng", href: "/employer/post-job" },
    { label: "Tìm ứng viên", href: "/employer/find-candidates" },
  ]

  const items = type === "candidate" ? candidateItems : employerItems

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
          type === "candidate"
            ? "bg-green-50 text-green-600 hover:bg-green-100"
            : "bg-emerald-600 text-white hover:bg-emerald-700",
        )}
      >
        {type === "candidate" ? (
          <>
            <User size={18} />
            <span>Ứng viên</span>
          </>
        ) : (
          <>
            <Building2 size={18} />
            <span>Nhà tuyển dụng</span>
          </>
        )}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 py-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center justify-between"
              onClick={() => setIsOpen(false)}
            >
              <span>{item.label}</span>
              {item.checkbox && <div className="w-4 h-4 border border-gray-300 rounded"></div>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
