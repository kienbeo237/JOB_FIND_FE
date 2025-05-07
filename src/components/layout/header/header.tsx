"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Globe, Menu, X, MessageSquare } from "lucide-react"
import UserDropdown from "./user-dropdown"

const navItems = [
  {
    name: "Việc làm",
    href: "/viec-lam",
    dropdown: true,
    items: [
      { name: "Tìm việc làm", href: "/viec-lam/tim-kiem" },
      { name: "Việc làm hot", href: "/viec-lam/hot" },
      { name: "Việc làm gấp", href: "/viec-lam/gap" },
    ],
  },
  {
    name: "Hồ Sơ, CV",
    href: "/ho-so-cv",
    dropdown: true,
    items: [
      { name: "Tạo CV", href: "/ho-so-cv/tao-cv" },
      { name: "Cập nhật CV", href: "/ho-so-cv/cap-nhat" },
    ],
  },
  {
    name: "Công ty",
    href: "/cong-ty",
    dropdown: false,
  },
  {
    name: "Cẩm nang, công cụ",
    href: "/cam-nang",
    dropdown: true,
    items: [
      { name: "Cẩm nang", href: "/cam-nang/bai-viet" },
      { name: "Công cụ", href: "/cam-nang/cong-cu" },
    ],
  },
  {
    name: "Hành trình xanh",
    href: "/hanh-trinh-xanh",
    dropdown: true,
    items: [
      { name: "Bài viết", href: "/hanh-trinh-xanh/bai-viet" },
      { name: "Sự kiện", href: "/hanh-trinh-xanh/su-kien" },
    ],
  },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const [showHeader, setShowHeader] = useState(true)

  // Define the toggleMenu function before any potential returns
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // All useEffect hooks must be called unconditionally
  useEffect(() => {
    setShowHeader(!pathname?.includes("/employer"))
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Instead of returning null early, conditionally render the header
  return showHeader ? (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-all",
        isScrolled ? "shadow-sm" : "",
      )}
    >
      {/* Rest of the header JSX remains unchanged */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-green-500">JobFind.vn</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/jobs" className="text-gray-700 hover:text-green-500 flex items-center gap-1">
            <span>Việc làm</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </Link>
          <Link href="/cv" className="text-gray-700 hover:text-green-500 flex items-center gap-1">
            <span>Hồ Sơ, CV</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </Link>
          <Link href="/companies" className="text-gray-700 hover:text-green-500">
            Công ty
          </Link>
          <Link href="/tools" className="text-gray-700 hover:text-green-500 flex items-center gap-1">
            <span>Cẩm năng, công cụ</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </Link>
          <Link href="/green" className="text-gray-700 hover:text-green-500 flex items-center gap-1">
            <span>Hành trình xanh</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button className="text-gray-700 hover:text-green-500">
            <Globe size={20} />
          </button>
          <button className="text-gray-700 hover:text-green-500">
            <MessageSquare size={20} />
          </button>
          <UserDropdown type="candidate" />
          <UserDropdown type="employer" />
        </div>

        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link href="/jobs" className="text-gray-700 hover:text-green-500">
              Việc làm
            </Link>
            <Link href="/cv" className="text-gray-700 hover:text-green-500">
              Hồ Sơ, CV
            </Link>
            <Link href="/companies" className="text-gray-700 hover:text-green-500">
              Công ty
            </Link>
            <Link href="/tools" className="text-gray-700 hover:text-green-500">
              Cẩm năng, công cụ
            </Link>
            <Link href="/green" className="text-gray-700 hover:text-green-500">
              Hành trình xanh
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <Link href="/candidate/login" className="block py-2 text-green-500 hover:text-green-600">
                Đăng nhập ứng viên
              </Link>
              <Link href="/candidate/register" className="block py-2 text-green-500 hover:text-green-600">
                Đăng ký ứng viên
              </Link>
              <Link href="/employer/login" className="block py-2 text-emerald-600 hover:text-emerald-700">
                Đăng nhập nhà tuyển dụng
              </Link>
              <Link href="/employer/register" className="block py-2 text-emerald-600 hover:text-emerald-700">
                Đăng ký nhà tuyển dụng
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  ) : null
}
